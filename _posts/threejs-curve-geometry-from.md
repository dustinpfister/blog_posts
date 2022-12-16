---
title: Using the curve class to create geometry in threejs
date: 2022-12-16 11:09:00
tags: [three.js]
layout: post
categories: three.js
id: 1018
updated: 2022-12-16 12:26:51
version: 1.6
---

The Curve class is the base class for several core threejs Clases to create a Curve in space. There is then a Cuve class prototype method called the get point method that can then be used to get any point along a curve in the form of a Vector3 object by passing a zero to one value as an argument. For the most part thus far I have been using curves as a way to define paths than can then be used to set the position of object3d objects over time such as mesh objects, and cameras. I have also been using curves to get vector3 objects that can then be passed to the look at method to set the rotation for objects also. However I have not yet got into using curves as a way to define the position attributes of custom buffer geometry which is what this post will focus on.

<!-- more -->

## Making Custom geometry from Curves and what to know first

In this post I am writing about source code examples that have to do with creating custom buffer geometry by making use of curve objects to define paths in 3d space that are then used as a way to create the position attribute of a buffer geometry class instance in the JavaScript library known as threejs. After saying that it should go without saying that this is a post for people that have at least a fair amount of experience working with threejs, and client side JavaScript in general. If you are still fairly new to threejs and JavaScript I have wrote, and regularly edit getting started type posts on both [threejs](/2018/04/04/threejs-getting-started/) and [JavaScript](/2018/11/27/js-getting-started/). So I will not be getting into detail about the basics that you should know about before hand here. However I do still like to use these opening sections of posts to write about a thing or two that you might want to read up more on regardless of experience level.

## 1 - Basic examples of making Buffer Geometry with Curves

There is starting out by making one or more curves and then just finding a way, any way at all to make a position attribute for a buffer geometry. When first starting out there is just having the position attribute alone, that might not work well with Mesh objects, but be good enough for Point or Line objects. So in this section I will be going over a few examples that just have to do with doing just this by making use of any and all Curve and Buffer Geometry class features to do so. I will then leave the more advanced examples that have to do with making a full geometry that will work with mesh objects for later, more advanced sections of this post.

### 1.1 - The Curve.getPoints and BufferGeometry.setFromPoints methods

There is a get points method pf the curve class that when called will return an array of Vector3 objects along the path of the curve. The count of the number of points will differ depending on an argument that is given when calling the get points method. This is not to be confused with the get point method that will return just one Vector3 object by way of a given 0 to 1 value. I would generally prefer the get point method over the get points method as it allows for more flexibility. However when it comes to making a fairly simple hello world typo example of making geometry with curves this would be a good place to start.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(6.5, 6.5, 6.5);
camera.lookAt(0, -3.25, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const geoFromCurve = (curve, detail) => {
    detail = detail === undefined ? 100: detail;
    return new THREE.BufferGeometry().setFromPoints( curve.getPoints(detail) );
};
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 0);
scene.add(dl);
const dl2 = new THREE.DirectionalLight(0xffffff, 1);
dl2.position.set(2, -1, 0);
scene.add(dl2);
// ---------- ----------
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,5), 
c1_control = new THREE.Vector3(0, 5, 0), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(0, -5, 0), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// LINES
// ---------- ----------
const material_line = new THREE.LineBasicMaterial({ linewidth: 8, color: 0xff0000});
const line1 = new THREE.Line( geoFromCurve(curve1, 50), material_line );
scene.add(line1);
const line2 = new THREE.Line( geoFromCurve(curve2, 50), material_line );
scene.add(line2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

## 2 - Making a full Mesh Object Friendly custom geometry with curves

Now that I have some of the basics out of the way with this sort of thing I think that it is now time to have at least one if not more examples In which I make a full Mesh object friendly custom geometry using Curves to create the position attributes. There is a lot to be aware of when it comes to this sort of thing, so I will not be getting into detail with the various types of attributes of buffer geometry so forth. 

### 2.1 - Full Custom Geometry made with two QuadraticBezierCurve3 curve objects

For this example I am using the Quadratic Bezier Curve class in core threejs to create two curve objects both of which have start, end, and control points to create an update a buffer geometry. The goal here then is to first create the state of the position attribute by pushing in x,y, and z values for points along the curves, and to do so in a way in which the points stagger from one curve to the other. There is the order in which the points that are added that is important, however maybe what is really important is the state of the index that I will be making for this geometry as well as this will be an index geometry that I am making here.

While I am creating the array of numbers of the position attribute I am also pushing in values for another array that I will be using for the uv attribute while I am at it. Once I have my position and uv arrays of numbers set up just the way I want it to be I can then use them to set the attributes for the position an uv attributes of the buffer geometry.

I then create an index for my position attribute and just pass the array of index values to the set index method to get that working. After that the last major mush have attribute for the geometry to get it to work well with mesh is to create a normal attribute. In some cases I will have to do this by way of some JavaScript code. However for this kind of geometry just simply calling the compute vertex normal method works just fine to get this attribute created and in a good workable state.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(5, 9, -9);
camera.lookAt(0, -1.75, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 0);
scene.add(dl);
const dl2 = new THREE.DirectionalLight(0xffffff, 1);
dl2.position.set(2, -1, 0);
scene.add(dl2);
// ---------- ----------
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,5), 
c1_control = new THREE.Vector3(-2, 7, 0), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(0, 0, 0), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// GEO POSITION / UV
// ---------- ----------
const geo = new THREE.BufferGeometry();
// position attribute data
const pos_data = [];
const uv_data = [];
let pi = 0;
const points_per_line = 20;
while(pi < points_per_line){
    // position
    const a1 = pi / (points_per_line - 1);
    const v1 = curve1.getPoint(a1);
    const v2 = curve2.getPoint(a1);
    pos_data.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    // uv
    uv_data.push(a1, 0, a1, 1);
    pi += 1;
}
geo.setAttribute('position', new THREE.Float32BufferAttribute( pos_data, 3 ) );
geo.setAttribute('uv', new THREE.Float32BufferAttribute( uv_data, 2 ) );
// ---------- ----------
// GEO INDEX
// ---------- ----------
const data_index = [];
let pi2 = 0;
while(pi2 < points_per_line - 1){
    const a = pi2 * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    data_index.push(b,c,d,c,b,a);
    pi2 += 1;
}
geo.setIndex(data_index);
// ---------- ----------
// GEO NORMAL
// ---------- ----------
geo.computeVertexNormals();
// ---------- ----------
// TEXTURE
// ---------- ----------
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
const width = 128, height = 128;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4;
    // x and y pos
    const xi = i % width;
    const yi = Math.floor(i / width);
    const v2 = new THREE.Vector2(xi, yi);
    // alphas
    const a_rnd1 = THREE.MathUtils.seededRandom();
    const a_rnd2 = THREE.MathUtils.seededRandom();
    const a_rnd3 = THREE.MathUtils.seededRandom();
    let a_dist = v2.distanceTo( new THREE.Vector2( width * 0.25, height * 0.75) ) / (width / 16);
    a_dist = a_dist % 1;
    const a_x = xi / width;
    const a_y = yi / height;
    const cv = 255 * (a_dist);
    // red, green, blue, alpha
    data[ stride ] = cv;
    data[ stride + 1 ] = 0;
    data[ stride + 2 ] = 255 - cv;
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// ---------- ----------
// MATERIAL AND MESH
// ---------- ----------
const material = new THREE.MeshPhongMaterial({ map: texture, wireframe: false, side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
const line = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({linewidth: 4, color: 0x000000}));
mesh.add(line);
line.position.y = 0.025;
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 3.1 - Video1 animation loop example based on custom Geometry example

So like with just about almost every post that I write on threejs I like to make at least one if not more videos to embed into the blog post along with all the writing and source code examples. So with that said I made this example that is based on the custom geometry example that I made for my mesh friendly geometry section. I made a lot of changes to the source code with this one though by taking a lot of what I worked out and made a few helper functions in an effort to make things more fine grain. Also I wanted to have a function that will just create and return an array of numbers that is the position data values, not just for the sake of creating the geometry to begin with, but also to be used to update the state of the geometry as well.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, -8);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// get position data array helper
const getCurvePosData = (curve1, curve2, points_per_line) => {
    const pos_data = [];
    let pi = 0;
    while(pi < points_per_line){
        const a1 = pi / (points_per_line - 1);
        const v1 = curve1.getPoint(a1);
        const v2 = curve2.getPoint(a1);
        pos_data.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        pi += 1;
   }
   return pos_data;
};
// get uv data array helper
const getCurveUVData = (curve1, curve2, points_per_line) => {
    const uv_data = [];
    let pi = 0;
    while(pi < points_per_line){
        const a1 = pi / (points_per_line - 1);
        uv_data.push(a1, 0, a1, 1);
        pi += 1;
   }
   return uv_data;
};
// set index
const setCurveGeoIndex = (geo, points_per_line) => {
    const data_index = [];
    let pi2 = 0;
    while(pi2 < points_per_line - 1){
        const a = pi2 * 2;
        const b = a + 1;
        const c = a + 2;
        const d = a + 3;
        data_index.push(b, c, d, c, b, a);
        pi2 += 1;
    }
    geo.setIndex(data_index);
};
// create curve geo
const createCurveGeo = (curve1, curve2, points_per_line) => {
    const geo = new THREE.BufferGeometry();
    const uv_data = getCurveUVData(curve1, curve2, points_per_line);
    // position/index
    const pos_data = getCurvePosData(curve1, curve2, points_per_line);
    geo.setAttribute('position', new THREE.Float32BufferAttribute( pos_data, 3 ) );
    setCurveGeoIndex(geo, points_per_line);
    // uv
    geo.setAttribute('uv', new THREE.Float32BufferAttribute( uv_data, 2 ) );
    // normal
    geo.computeVertexNormals();
    return geo;
};
const updateCurveGeo = (geo, curve1, curve2, points_per_line) => {
    const pos_data = getCurvePosData(curve1, curve2, points_per_line);
    const pos = geo.getAttribute('position');
    pos.array = pos.array.map((n, i) => { return pos_data[i] });
    pos.needsUpdate = true;
    // normal
    geo.computeVertexNormals();
    return geo;
};
const QBC3 = (c1_start, c1_control, c1_end) => {
    return new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
};
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.25, 0.5, 0.5);
scene.add(dl);
// ---------- ----------
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,5), 
c1_control = new THREE.Vector3(0, 10, 0), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(0, -5, 0), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// GEO POSITION / UV
// ---------- ----------
const geo = createCurveGeo(
     QBC3(c1_start, c1_control, c1_end),
     QBC3(c2_start, c2_control, c2_end),
     50
);
// ---------- ----------
// TEXTURE
// ---------- ----------
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
const width = 128, height = 128;
const size = width * height;
const data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    const stride = i * 4;
    // x and y pos
    const xi = i % width;
    const yi = Math.floor(i / width);
    const v2 = new THREE.Vector2(xi, yi);
    // alphas
    const a_rnd1 = THREE.MathUtils.seededRandom();
    const a_rnd2 = THREE.MathUtils.seededRandom();
    const a_rnd3 = THREE.MathUtils.seededRandom();
    let a_dist = v2.distanceTo( new THREE.Vector2( width * 0.25, height * 0.75) ) / (width / 16);
    a_dist = a_dist % 1;
    const a_x = xi / width;
    const a_y = yi / height;
    const cv = 255 * (a_dist);
    // red, green, blue, alpha
    data[ stride ] = cv;
    data[ stride + 1 ] = 0;
    data[ stride + 2 ] = 255 - cv;
    data[ stride + 3 ] = 255;
}
const texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// ---------- ----------
// MATERIAL AND MESH
// ---------- ----------
const material = new THREE.MeshPhongMaterial({ map: texture, wireframe: false, side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// CONTROLS
// ---------- ----------
try{
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    c1_control.set(-10 + 20 * a2,-10 + 20 * a2,0);
    c2_control.set(0, 0, -10);
    updateCurveGeo(
        geo,
        QBC3(c1_start, c1_control, c1_end),
        QBC3(c2_start, c2_control, c2_end),
        50
    );
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```


## Conclusion

That will be it for now when it comes to making geometry from curves in threejs, at least until I come around to edit and expand this post a little. I might also want to make one or more [threejs project examples posts](/2021/02/19/threejs-examples/) in which I explore this topic a little deeper as I am sure there is a whole lot of directions I could take this when it comes to making custom geometry this way. That is not to say that I do not all ready have some threejs protect example ideas that are based off of the use of Curve objects all ready. I do have my [curve module that threejs example](/2022/11/18/threejs-examples-curves-module/) that I started all ready which might be a good thing to check out if you want to read even more about curves.



