---
title: Set From Points Buffer Geometry method in threejs
date: 2023-01-05 09:20:00
tags: [three.js]
layout: post
categories: three.js
id: 1022
updated: 2023-07-01 12:56:04
version: 1.16
---

The [set from points method of the buffer geometry class in threejs](https://threejs.org/docs/#api/en/core/BufferGeometry.setFromPoints) is a way to create a new buffer geometry from an array of [vector3 class objects](/2018/04/15/threejs-vector3/). This new buffer geometry instance will just have a position attribute alone, which is okay when it comes to creating Points, or Lines, but not so much for Mesh objects. That is unless additional steps are taken to add the additional attributes that are needed to get the geometry to work well with mesh objects.

Even if one is just interested in creating a buffer geometry with a position attribute only to be used to just draw lines are points I have found that the set from points method might work okay for creating a geometry, but does not work so great as a way to update a geometry over time in a loop. If I want to not just create a geometry, but also update it over time, then I am not going to want to do so by directly working with a position attribute. When doing so it would make sense to also just create and set the position attribute the hard way also while I am at it.

As far as I can tell, it would seem that this set from points method was added for the sake of making things easier when it comes to quickly creating a geometry from an array of points in the form of Vector3 objects for each point in space. In this regard I would say that the set from points method is very easy to use. I just create an array of vector3 objects by one means or another, create a blank buffer geometry object, call the set from points method off of the buffer geometry passing the array of points as an argument and I am done. Simple enough sure, but it comes at a cost compared to doing it the hard way. 

Maybe the hard way of doing this can be avoided when it comes to creating the geometry to begin with, but in any case the hard way is still how it needs to happen when it comes to updating. Also the hard way of doing it is not actually that much harder, so then one might as well just do that actually. Still in this post I will be going over a few basic examples of this set from points method, before getting into more advanced examples about buffer attributes, mainly the position attribute.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/ptUUbspJj6c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Set from points method of Buffer Geometry and what to know first

This is a post on just one method in the buffer geometry class of a JavaScript library known as threejs. I am assuming that you know at least a little about client side JavaScript and the various underlying skills that are also needed with HTML, and CSS. I also assume that you have worked out at least a few basic [getting started type examples of threejs](/2018/04/04/threejs-getting-started/) as well, and are now interested in how to go about making custom geometry using an array of vector3 objects. If not changes are you are going to have a hard time following what I am writing about here. In any case regardless of experience with threejs and JavaScript I like to use these opening sections to write about some things  that you may want to learn more about, or refresh on before continue to read the rest of the content.

### There is a lot more to buffer geometry

As I said the set from points method is just one little method in the [buffer geometry class](/2021/04/22/threejs-buffer-geometry/), there are a whole lot of other methods and properties. There is also a whole lot more to write about when it comes to additional classes of objects that are the values properties of a buffer geometry object as well.

### The Vector3 class

The array that is passed to the set from points method should be an array of [Vector3 objects](/2018/04/15/threejs-vector3/). There is another major class in threejs that comes up all the time, and not just for this specific task. For example when it comes to setting the position of an [object3d class based object](/2018/04/23/threejs-object3d/) they way to do so is by way of the [position property of the object3d class](/2022/04/04/threejs-object3d-position/) which is, use guessed it, and instance of Vector3.

### Source code in also up on Github

I have the source code examples that I am writing about here also up on Github in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-set-from-points). This is also where I path the source code exmaples for [all the other blog posts that I have wrote on threejs](/categories/three-js/) over the years as well.

### Version Numbers matter

When I first wrote this blog post I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md), and this is also what I am still using as of the last edit in July of 2023. I have more up to date style rules, but I have not updated the source code examples to those new rules at that time. In any case there are a whole lot of code breaking changes coming up ahead, and I have found that I need to write a thing or two about versions in each post.

## 1 - Basic examples of the set from points method

As with just about all of the other posts that I have wrote on threejs I like to start out with a basic section. When it comes to using the set from points method of the buffer geometry class the typical situation in that by one means or another I have an array of vector3 objects, and I would like to just quickly make a geometry with that array of vector3 objects. Starting with this is simple enough if I am to stick with THREE.Points, or THREE.Lines which is what I will be using in this section. Things get a bit more complex when it comes to turning a geometry made by this means into something that will work well with mesh objects though, and that is something that I will get to in more complex sections in this post.

### 1.1 - Using set from points, and THREE.Points

To get started with the set from points method one way or another I will need to create an array of Vector3 objects. Once I have that array of Vector3 objects I can then create a blank buffer geometry, call the set from points method, and pass the array of vector3 objects to the method. The end result will then be a buffer geometry with a position attribute that is set up using the array of Vector3 objects. This kind of geometry will not work so great with mesh objects, but will be good enough for say the THREE.Points class.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0.5, 0, 0.5);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS - array of Vector3 Objects
// ---------- ----------
const points_array = [
    new THREE.Vector3( 0, 0, 0),
    new THREE.Vector3( 0, 0, 1),
    new THREE.Vector3( 1, 0, 1)
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method to create one from points_array
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points_array);
// ---------- ----------
// Points - using geometry with THREE.Points rather than THREE.Mesh
// ---------- ----------
const material = new THREE.PointsMaterial({ color: 0xffff00, size: 0.25 });
scene.add( new THREE.Points(geometry, material) );
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.2 - Using Lines demo

Another option for making use of a geometry that is just composed of a position attribute would be to use THREE.Line, or THREE.LineSegements. With that I would also make use of one of the Line material options to style these line objects.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS - array of Vector3 Objects
// ---------- ----------
const points_array = [
    new THREE.Vector3( -1.0,  0.0,  1.0),
    new THREE.Vector3( -1.0,  0.0, -1.0),
    new THREE.Vector3( -1.0,  1.0, -1.0),
    new THREE.Vector3(  1.0,  1.0, -1.0),
    new THREE.Vector3(  1.0,  0.0, -1.0),
    new THREE.Vector3(  1.0,  0.0,  1.0),
    new THREE.Vector3(  1.0, -1.0,  1.0),
    new THREE.Vector3( -1.0, -1.0,  1.0),
    new THREE.Vector3( -1.0,  0.0,  1.0)
];
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points_array);
// ---------- ----------
// Line
// ---------- ----------
const material = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 3 });
scene.add( new THREE.Line(geometry, material) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Making a geometry with set from points that will work with a Mesh Object

A basic example of the set from points method is easy enough. That is one of the nice things about this method as I have to say that it does make the process of doing this easy. However creating an array of Vector3 objects that are the points in space that I want, and just simply passing that to the set from points method is just a crude beginning of course. If I want to use the geometry with the THREE.Points class then maybe this crude beginning will be enough actually. However typically I will at least want to use this with THREE.Line, and even THREE.Mesh, in which case a crude beginning is not enough. So in this section I will also be writing about the additional attributes of the buffer geometry class, and how to add these additional attributes to create a geometry that will work well with THREE.Mesh.

### 2.1 - Set From Points example of a closed trangle with index for use with THREE.Line

This is a set from points example in which I am adding an index for the buffer geometry so that I will have a closed line that will result in a triangle that will be used with THREE.Line. I create the points in space that I want by directly calling the THREE.Vector3 class and adding the Vector3 objects to an array. Once I have the state of this array of Vector3 objects just the way that I like it I can create a blank Buffer geometry object, call the set from points method, and then pass the points array. I now have a buffer geometry with a position attribute, but there is no index for it.

If I just pass the buffer geometry without an index to THREE.Line, it will work just fine but the line will not be closed. One way to fix this would be to add a duplicate point in the points array, however sooner of later it would be a good idea to at least be aware of what the [index property of a buffer geometry](/2022/12/09/threejs-buffer-geometry-index/) is for. This index allows for me to result the same points in the position attribute by passing an array of index values for points in the position attribute. So then I can pass an array of index values that is like 0,1,2,0 in this case which would give me the closed triangle that I wanted.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 0.0, 0.0, 0.0),
    new THREE.Vector3(-1.0, 0.3,-3.5),
    new THREE.Vector3( 1.0, 0.3,-3.5)
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points);
geometry.setIndex( [0,1,2,0] );
// ---------- ----------
// Line, LineBasicMaterial
// ---------- ----------
const material = new THREE.LineBasicMaterial({ linewidth: 6, color: 0xffff00 });
const line = new THREE.Line(geometry, material);
scene.add(line);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 2.2 - Adding a normal attribute and using it with THREE.Mesh, and the THREE.MeshNormalMaterial

The bar is not that high when it comes to creating a geometry that will work okay with THREE.Points, or THREE.Line. However when it comes to making any kind of real project I am going to want to create geometry that will work with Mesh objects. The next step with making a custom geometry this way would be to add a [normal attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/) for the geometry. Just like with the position attribute this can end up being a little involved, but also like with the set from points method there is a method that helps to make this easily. The method that can work okay most of the time to quickly create a normal attribute is the [compute vertex normal method](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/).

An index is a great tool to help reuse points, however there are still only so many points in the position attribute and thus there are also only so many normal vectors as well then. This can present a problem then when it comes to the state of the normal attribute. If you take the time to study the nature of some of the built in geometries such as the box geometry you will find that typically what is desired is not a fully indexed or non indexed geometry, but rather a kind of happy medium between the two. I could get into detail about this but for now there is just being aware of the to non indexed method of the buffer geometry class that can be used to quickly create a fully non indexed geometry from an indexed one.

Here in this example I will create one geometry with an index, and create a non indexed geometry from that one. I will then call the compute vertex normals method for both of these geometries, and then use them both with mesh objects that use the [mesh normal material](/2021/06/23/threejs-normal-material). When looking at these two geometries the one that is not indexed will look more like one will expect with a built in geometry, while the indexed one will not. The reason why is by making the geometry non indexed the count of the position attribute goes from 4, to 12. That is from 4 points in space, to 12 points in space. Which means there is a single, stand alone point for every triangle. Which also means that there is a single stand alone Vector for each item in the normal attribute when allows for setting a custom set of vertex normal values for each point of each triangle.


```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 1.5,-1.5, 0.0),
    new THREE.Vector3(-1.5,-1.5, 0.0),
    new THREE.Vector3( 0.0, 1.5, 0.0),
    new THREE.Vector3( 0.0, 0.0,-6.0),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
// geo one with index using only 4 points
const geo1 = new THREE.BufferGeometry();
geo1.setFromPoints(points);
geo1.setIndex([ 2,1,0, 0,1,3, 1,2,3, 2,0,3 ]);
geo1.computeVertexNormals();
// non indexd geo from an indexed one
const geo2 = geo1.toNonIndexed();
geo2.computeVertexNormals();
// ---------- ----------
// Mesh, MeshNormalMaterial
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geo1, material);
mesh1.position.set(-2,0,0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo2, material);
mesh2.position.set(2,0,0);
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 2.3 - Adding a UV Attribute and using that with Light, THREE.Mesh, and THREE.MeshPhongMaterial

I would say that there is just one final attribute that is needed to have a geometry that will work well with THREE.Mesh. There are a lot more of course that will come up when getting into animation, Vertex coloring, and so forth but the last core attribute that comes to mind would be a [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv). The mesh normal material will work fine with geometries that just have a position and normal attribute, but if I want to do anything with texture chances are I am going to want to add a uv attribute. Simply put the UV attribute is a way to define what the offsets are for each point of each triangle in a 2d image to store how to go about applying a 2d texture to a 3d object.

To create a texture by way of some JavaScript code I am going with [canvas textures](/2018/04/17/threejs-canvas-texture/) as a way to do so here. I am then going to go with the [Mesh Phong material](/2022/12/29/threejs-phong-material/) and sense this is a material that will respond to light sources I am going to what at least one light source in the scene. There are a lot of options when it comes to light sources, but the typical go to solution for me these days with this would be the directional light.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(-0.5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const draw_tri = function(ctx, canvas){
    const w = 10;
    const hw = w / 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = w;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(hw, hw);
    ctx.lineTo(canvas.width - w, hw);
    ctx.lineTo(hw, canvas.height - w);
    ctx.lineTo(hw, hw);
    ctx.stroke();
};
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 1.5,-1.5, 0.0),
    new THREE.Vector3(-1.5,-1.5, 0.0),
    new THREE.Vector3( 0.0, 1.5, 0.0),
    new THREE.Vector3( 0.0, 0.0,-6.0),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
// geo one with index using only 4 points
const geo_source = new THREE.BufferGeometry();
geo_source.setFromPoints(points);
geo_source.setIndex([ 2,1,0, 0,1,3, 1,2,3, 2,0,3 ]);
// non indexd geo from an indexed one
const geo = geo_source.toNonIndexed();
geo.computeVertexNormals();
// uv attribute
const pos = geo.getAttribute('position');
let i = 0;
const uv = [];
const a = 1, b = 0;
while(i < pos.count){
   uv.push(a,a,b,a,b,b);
   i += 3;
}
geo.setAttribute('uv', new THREE.BufferAttribute( new Float32Array(uv), 2 ))
console.log(geo)
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.2,1,0.1)
scene.add(dl);
//-------- ----------
// TEXTURE
//-------- ----------
const texture = createCanvasTexture(draw_tri, 128);
// ---------- ----------
// Mesh, MeshPhongMaterial
// ---------- ----------
const material = new THREE.MeshPhongMaterial({map: texture});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

## 3 - Updating the position attribute and using the set from points method

The set from points method works okay when it comes to creating a buffer geometry from an array of points once. However I have run into problems when using it as a way to update a geometry object. In general it is a good idea to create a fixed array of points and then update the state of those points over time rather than creating a new buffer geometry over and over again. So the general idea here is that it is okay to call the set from points method once, but after that I will want to mutate the state of the position attribute to update the values of the points over time.

### 3.1 - Creating with set from points, but not updating with it

Here I then have an example here I have a helper function that will create an array of vector3 objects with a given set of arguments. I can then create another helper function that will use that method, along with the set from points method to create a geometry object to begin with. I can then use another helper method that does not use the set from points method to update the state of the geometry with a new set of arguments.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// a function that creates and returns an array of vector3 objects
const myV3Array = (point_count, sec_count, rotation_count, y_mag, radius) => { 
    const v3array = [];
    for ( let i = 0; i < point_count; i ++ ) {
        const a1 = i / point_count;
        const a2 = a1 * sec_count % 1;
        const a3 = Math.floor(sec_count * a1) / sec_count;
        const a4 = 1 - Math.abs(0.5 - a1) / 0.5;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * rotation_count * a2;
        const v = new THREE.Vector3(1, 0, 0);
        v.applyEuler(e).multiplyScalar(radius * a4);
        v.y = y_mag * -1 + (y_mag * 2) * a3;
        v3array.push(v);
    }
    return v3array;
};
// create a geometry to begin with
const createGeometry = (point_count, sec_count, rotation_count, y_mag, radius) => {
    const v3array =  myV3Array(point_count, sec_count, rotation_count, y_mag, radius);
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3array);
    // adding vertex color to while I am at it
    let i = 0;
    const att_pos = geometry.getAttribute('position');
    const len = att_pos.count;
    const data_color = [];
    while(i < len){
        const n = 0.25 + 0.75 * (i / len);
        data_color.push(0, 1 - n, n);
        i += 1;
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(data_color, 3));
    return geometry;
};
// update a geometry
const updateGeometry = (geometry, sec_count, rotation_count, y_mag, radius) => {
    const att_pos = geometry.getAttribute('position');
    const v3array =  myV3Array(att_pos.count, sec_count, rotation_count, y_mag, radius);
    let i = 0;
    const len = att_pos.count;
    while(i < len){
        const v = v3array[i];
        att_pos.setX(i, v.x);
        att_pos.setY(i, v.y);
        att_pos.setZ(i, v.z);
        i += 1;
    }
    att_pos.needsUpdate = true;
};
//-------- ----------
// OBJECTS
//-------- ----------
const geometry = createGeometry(400, 1, 2, 1, 3);
const points1 = new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 0.5,
    transparent: true,
    opacity: 0.8,
    vertexColors: true
}));
scene.add(points1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, -1, 0);
const FPS_UPDATE = 20,  // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = THREE.MathUtils.smoothstep(a1, 0, 1)
    const sec_count = 2 + 3 * a2;
    const rotation_count = 1 + 3 * a2;
    const y_mag = 0.5 + 1.5 * a2;
    const radius = 1 + 4 * a2;
    updateGeometry(geometry, sec_count, rotation_count, y_mag, radius);
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

## Concision

The set from points method is then a nice easy way to go about creating a geometry from an array of points in the form of an array of Vector3 objects. However the there is a lot more to this in order to create a geometry that will work well with mesh objects. Also when it comes to updating geometry over time I will still want to directly mutate the position attribute anyway rather than calling set from points over and over again. Which in turn raises the question as to why not just create it in the first place by doing it the hard way also. Still in some cases it might be a nice fact way to create a position attribute to begin with from a points array, and for that alone it might work just fine.

