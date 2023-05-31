---
title: The Curve class in threejs a general overview
date: 2022-06-17 14:06:00
tags: [three.js]
layout: post
categories: three.js
id: 993
updated: 2023-05-31 12:09:43
version: 1.45
---

The [curve class in threejs](https://threejs.org/docs/#api/en/extras/core/Curve) is a way to go about creating a curve with a little javaScript logic when it comes to working directly with the curve base class. There is also a number of built in classes that extend the curve base class which might be the best starting point for this sort of thing actually. However there might end up being a situation now and then where I might want to create my own class that extends the curve base class. Also even if I just work with the built in options that extend the curve base class I still want to have a solid grasp on what there is to work with when it comes to the common methods of curves that can be found in this base curve class.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/mXbSwt-06lk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The curve class and what to know first.

The main focus of this post is on the curve class in threejs, and using the objects cerated with this class and other classes based off of it with the tube geometry constructor. There is a whole lot of ground to cover when it comes to this class, and also an awful lot more to cover when it comes to all kinds of various things that you should be aware of before hand. I will not be getting into detail about every little thing that comes up with the [basics of threejs](/2018/04/04/threejs-getting-started/) as well as the core javaScript itself. However I do still use this first section to quickly go over some things that you might want to read up more on.

### There is looking into lines first, maybe

Getting into the use of the curve class and the typically corresponding tube geometry constructor seems like the next step from [creating lines](/2018/04/19/threejs-line/). One nice thing about lines is that I am create them by making an array of [vector3 class](/2018/04/15/threejs-vector3/) instances by making use of the set from points method of the buffer geometry class. However there are limitations with lines compared to what there is work with when it comes to mesh objects, so that leads one to look into the curve class and tube geometry.

### Check out my other posts on curves in threejs

I have a number of other posts that I have wrote on curves now such as my post where I am [using curves to create and update custom geometry](/2022/12/16/threejs-curve-geometry-from/). I also started a threejs example post that is on a [curves module](/2022/11/18/threejs-examples-curves-module/).

### Source Code is up on Github

I have the source code that I am writing about in this post also up on my [test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-curve). This is also where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first started this post I was using r140 of threejs, and the last time I came around to do some editing of the post I was able to get all the examples working just fine with r146.

## 1 - Basic Curve Examples

To start out with Curves in this section I will be going over some fairly simple getting started type examples of Curves. This will include some examples that make use of built in curve function examples, as well as at least one that has to do with creating a custom curve class.

### 1.1 - Line Curve Example with Points

There is a Line Curve 3 class that is one built in option for creating a curve. This is just making an instance of a curve that is just a line between two points, but it is still an instance of a curve. So then this can be used in any situation that i need a curve object that is just a line actually. 

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(-5, 0, -5);
const curve = new THREE.LineCurve3( v1, v2);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
// points
const v3Array = curve.getPoints(20);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff0000, size: 0.25 }));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Bezier Curve Example with Points

Although I can quickly create a curve that is a line actually I will typically want to use the [Bezier Curve Built in Curve object function](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) to create lines as well as curves in general. I make the kinds of curves that I will like to make as well as a straight line depending on the control point that I give when calling it.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(-5, 0, -5);
const vControl = new THREE.Vector3(5, 0, -5);
const curve = new THREE.QuadraticBezierCurve3( v1, vControl, v2);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
// points
const v3Array = curve.getPoints(20);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff0000, size: 0.25 }));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Making a Custom THREE.Curve and THREE.TubeGeometry example

When it comes to the curve and tube geometry constructors in threejs one has to start somewhere, so for this example I will be doing just that with the THREE.Curve constructor and the tube geometry constructor. For this example I am starting out with the usual features when it comes to things like setting up a scene object, camera, and renderer. In additional the the usual features I am also adding a [light source](/2022/02/25/threejs-light/) as I will be going with the [standard material](/2021/04/27/threejs-standard-material/) for this example when setting  up the mesh object that will use the tube geometry later.

When it comes to using the curve base class I will want to extend the base class and define a constructor as well as a get point method. It is in this get point method that I will be defining the logic that is used to create the curve. For this basic example I am just making as simple curve using the Math.pow method for the y values for each point, alone with just simple linear stepping for x values, and for now just leaving z values at zero.

Once I have a new class created by extending the base curve class I can then use this class to create a new curve object. This curve object can then be passed to the tube geometry constructor as the first argument for that constructor. The resulting geometry from calling the tube geometry class constructor can then in turn be used with a mesh object just like that with the various other built in geometry constructor functions.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05) )
//-------- ----------
// CURVE, TubeGeometry, Mesh
//-------- ----------
// basic cuve class extending three curve
class BasicCurve extends THREE.Curve {
    constructor() {
        super();
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        var tx = -2 + 4 * t,
        ty = Math.pow(2, 5 * t) / Math.pow(2, 5) * 7,
        tz = 0;
        return optionalTarget.set( tx, ty, tz );
    }
};
// creating a tube geometry with path and additional arguments using basic curve
let path = new BasicCurve(),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
let mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0xff0000, side: THREE.DoubleSide })
);
scene.add( mesh );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 3, 0);
renderer.render(scene, camera);
```

## 2 - More on Vector3 object arrays, Points and curves curves

When it comes to the Base Curve class there are some key methods of interest that are very useful for creating an array of Vector3 objects, or getting a single Vector3 object at any point along a curve. I touched based on this topic in the Basic section of this blog post, but I have to say that this is without question a topic that I should expand on with the curve class to say the learn about it.

There are a lot of reasons why I would want to create an array of Vector3 objects that are points along a curve, or get a single point along a curve. There is creating an instance of THREE.Points with a geometry that has a position attribute of vertices along the curve for example. When doing so there is not just the question of getting a number of points along the curve, but also the spacing between each point when doing so. The getPoints method of the base curve class can get a number of points along a curve just fine, but it will always be a fixed delta value between each point. With that said there is also the getPoint method that will just give me a single Vector3 object along the curve by way of a given alpha value. This getPoint method can then be used to address problems with this fixed delta problem with the getPoints method.

### 2.1 - The curve.getPoints method and THREE.Points

For this first example of Points and the base Curve class I will be using the GetPoints method to just get a fixed number of points along a curve. Once again this example is fairly similar to what I covered in the basic section all ready, but I would like to start off with an example such as this before moving on to more complex examples.

Once I have a curve class based object by any means I can call the getPoints method of the base curve class to get an array of Vector3 objects. Although this might work okay for many situations in which I might need to do something like this there is one draw back about using this and that is that the spacing between each point will be the same for each vector3 object along the curve.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(5, 0, 5);
const v_end = new THREE.Vector3(-5, 0, -5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-5,0,5) );
const curve = new THREE.QuadraticBezierCurve3( v_start, v_control, v_end);
//-------- ----------
// v3_array
//-------- ----------
const v3array = curve.getPoints(50);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry().setFromPoints(v3array);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
const material = new THREE.PointsMaterial({ size: 0.25, color: 0xffff00})
const points1 = new THREE.Points(geometry, material);
scene.add(points1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.2 - Get a single Vector3 object at a time, and use custom alpha values with the getPoint method

Although the get points method of the curve class will work just fine for getting an array of Vector3 objects, there is still the matter of having custom spacing between the points when it comes to this kind of array of objects. So with that said often I will use the getPoint method over that of the getPoints method as it gives me greater flexibility with this. I can get the same result as with the getPoints method if I want by just giving a linear style alpha value for each point alone the curve. However I can also get any other kind of spacing that I might want by making use of various functions in threejs that help with the process of getting an alpha values, or using another other various expressions or means to do so.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(5, 0, 5);
const v_end = new THREE.Vector3(-5, 0, -5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-5,0,5) );
const curve = new THREE.QuadraticBezierCurve3( v_start, v_control, v_end);
//-------- ----------
// v3_array
//-------- ----------
const v3array = [];
let i = 0;
const len = 50;
while(i < len){
   // use some kind of expression, method, or whatever means
   // to get an alpha value ( 0 - 1 ) that will be the point along
   // the curve
   const a_point = i / ( len - 1 );
   const a_smooth = THREE.MathUtils.smootherstep(a_point, 0, 1);
   v3array.push( curve.getPoint( a_smooth ) );
   i += 1;
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry().setFromPoints(v3array);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
const material = new THREE.PointsMaterial({ size: 0.25, color: 0xffff00})
const points1 = new THREE.Points(geometry, material);
scene.add(points1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.3 - Updating an alpha value, and also a geometry over time

For this example I am not just creating a static geometry with a curve object, but also updating the [position attribute of that geometry](/2021/06/07/threejs-buffer-geometry-attributes-position/) over time as well. The set from points method of buffer geometry objects will work fine for making a geometry with a position attribute in the first place, but I have found that I will run into problems when using it to update a geometry over time.

The main thing about this example here is that I am using the get point method to get a Vector3 object for each point along the curve with a custom alpha value. I am not creating an array of Vector3 objects now, but rather directly mutating the state of the position attribute by making use of the setXYZ method of the buffer attribute class.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// the get alpha method
const get_alpha = (n, d, a = 1) => {
   const a_lin = n / ( d - 1 );
   const a_smooth = THREE.MathUtils.smootherstep(a_lin, 0, 1);
   return THREE.MathUtils.lerp( a_lin, a_smooth, a);
};
// create a geometry
const createCurveGeometry = ( curve, count = 50 ) => {
    return new THREE.BufferGeometry().setFromPoints( curve.getPoints(count) );
};
// create a geometry
const updateCurveGeometry = ( curve, geometry, alpha = 1 ) => {
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    const len = att_pos.count;
    while(i < len){
        const a = get_alpha(i, len, alpha);
        const v = curve.getPoint( a );
        att_pos.setXYZ(i, v.x, v.y, v.z);
        i += 1;
    }
    att_pos.needsUpdate = true;
};
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(5, 0, 5);
const v_end = new THREE.Vector3(-5, 0, -5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-5,0,5) );
const curve = new THREE.QuadraticBezierCurve3( v_start, v_control, v_end);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = createCurveGeometry(curve, 25); //new THREE.BufferGeometry().setFromPoints(v3array);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
const material = new THREE.PointsMaterial({ size: 0.25, color: 0xffff00})
const points1 = new THREE.Points(geometry, material);
scene.add(points1);

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
const sm = {
   FPS_UPDATE: 20,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 100,
   secs: 0,
   frame_frac: 0,
   frame: 0,
   tick: 0,
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    updateCurveGeometry(curve, geometry, a2 );
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render
        update(sm);
        renderer.render(scene, camera);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

Then end result of all of this is then a situation in which the spacing between the points will change from something that is similar to the use of the getPoints method to a custom spacing that is created with the smoother step method of the [math utils object](/2022/04/11/threejs-math-utils/).

## 4 - Using 2D curves

There are a number of built in options for curves, many of which are 3d curves, but there are also a few that are very much 2d curves. For example there is an EllipseCurve that will create a 2d curve of an ellipse and it can also be used to create 2d Arcs and circles, in fact ArcCurve is just an Alias for EllipseCurve. There are also a number of built in curve options that are there to work with in both 3D, and 2D form as well such as [CubicBezierCurve3](https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve3), and [CubicBezierCurve](https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve).

There are a number of little situations here and there where I might want to make use of a 2D curve rather than a 3D one. I often might be in a situation in which I will want to just have a simple 2D shape, and then make an extrude geometry of that shape. I will not be touching base on every little detail that might come up with 2d curves in this section as much of it might need to be a whole other topic in this post. However I think I should at least start out with some of the usual basic examples of 2d curves here.

### 4.1 - 2D curve Shape example

One Basic use case example of a 2D curve might be to use one to create an instance of THREE.Shape. Once I have a Shape object I can  then pass that to something like THREE.ShapeGeometry or THREE.ExtrudeGeometry to create a geometry that I can then use with a Mesh object.

The first step is to just create a 2D curve such as with the 2D form of the Quadratic Bezier Curve. Once I have the 2D curve I can then create an array of Vector2 objects by just calling the get Points method of the base curve class. This array of vector2 objects can then be passed as the first argument of the THREE.Shape constructor to create the Shape object. For this example I am then making a ShapeGeometry for a mesh object that will take a shape as the first argument. When using this geometry with a Mesh object I typically like to set the side option of the material to DoubleSide to make sure that both sides will render.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector2(0, 0);
const v_end = new THREE.Vector2(5, 3);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector2(-2, 1) );
const curve = new THREE.QuadraticBezierCurve(v_start, v_control, v_end);
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const v2array = curve.getPoints(50);
v2array.push( new THREE.Vector2(5, 0) );
const shape = new THREE.Shape( v2array  );
const geometry = new THREE.ShapeGeometry(shape);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({  side: THREE.DoubleSide }));
scene.add(mesh1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 4.2 - 2D Curves and Lathe Geometry

Another option for making a geometry to use with a mesh object with a 2d curve would be to make use of THREE.LatheGeometry. Think of a 2d object for a moment and then think of what happens when you spin that 2d object along on a axis, the end result is something that more or less looks like a kind of 3D object, and that is what the lathe geometry is all about. For this demo I am making use of the ArcCurve 2d curve class to create an arc. I can then use the get points method to create an array of vector2 objects that I then pass as the first argument of the LatheGeometry constructor, I can then pass another argument that is the number of segments that I want for the lathe geometry. The end result here is then a kind of Sphere like geometry, but with holes on the top and bottom of the geometry. I can then adjust the start and end radian values to close or expand the holes.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const radian_start = Math.PI * 1.8;
const radian_end = Math.PI * 0.2;
const curve = new THREE.ArcCurve(0, 0, 5, radian_start, radian_end, false );
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const geometry = new THREE.LatheGeometry( curve.getPoints(64), 40 );
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({  side: THREE.DoubleSide }));
scene.add(mesh1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 12, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - Curve Paths

Often I will find myself in a situation in which I will want to make not just one curve, but a whole bunch of them, and link them all together into one sort of logical path. With that said there is the built in curve path class of threejs that can be used to create this kind of curve of curves. I can then use the get point method to get a single point along one of these curve paths. However if I want a collection of Vector3 objects I might want to go with the get spaced points method of the curve path class.

### 3.1 - Basic Curve Path example using THREE.Points and CurvePath.getSpacedPoints

One way to start out with these curve paths would be to create a collection of THREE.Points by using the getSpacedPoints method of the CurvePath class. However before doing that I will need a CurvePath to begin with, with at least one curve added to it. So there is just calling the THREE.CurvePath constructor to get a new CurvePath to start things off. Once I have the curve path stored to a variable I can then start adding other curves to it by just simply calling the add method and passing a curve that I would like to add to it. For this example I am just making use of some line curves and a single Quadratic Bezier Curve.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CURVE PATH
// ---------- ----------
const v1 = new THREE.Vector3(-4, 0, 3);
const v2 = new THREE.Vector3(3, 0, 3);
const v3 = new THREE.Vector3(-4, 0, -5);
const vc1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector3(4,0,-1) );
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve3( v1, v2 ) );
curve.add( new THREE.QuadraticBezierCurve3( v2, vc1, v3 ) );
curve.add( new THREE.LineCurve3( v3, v1 ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points1 = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints(50) ),
    new THREE.PointsMaterial({ size: 0.4, color: 0xff0000 }));
scene.add(points1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


## 5 - The CustomSinCurve class Demos

When I first started writing this post the main over all subject of the post was to extend the base curve class to create a custom curve class. This is then a number of older demos that have to do with making a custom Sin Curve class by extending the base class. They also have a lot to do with the TubeGeometry constructor. In time if I keep editing this post a little more now and then I might eventualy removed these demos. However for the most part I often prefer to just keep pushing older demos such as this down to the bottom of the every growing content.

### 5.1 - CustomSinCurve Class Spiral example

So now that I have a basic example out of the way that involves creating a custom curve class by extending the base curve class out of the way I think I will want to have at least one more example that involves something like a spiral of sorts. I then came up with this custom sin curve class as a way to further explore just making custom curve classes. I also wanted to start working out at least a few basic demos of the tube geometry constructor as well while I was at it with this sort of thing.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
//-------- ----------
// LIGHT
//-------- ----------
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05) )
//-------- ----------
// CURVE, TubeGeometry, Mesh
//-------- ----------
class CustomSinCurve extends THREE.Curve {
    constructor( scale = 1 ) {
        super();
        this.scale = scale;
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        let tx = t * 3 - 1.5,
        ty = Math.sin( 24 * Math.PI * t ) * 0.5,
        tz = Math.cos( 24 * Math.PI * t ) * 0.25;
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    }
};
let path = new CustomSinCurve( 5 ),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
// creating a tube geometry with path and additional arguments
let mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0xff0000, side: THREE.DoubleSide })
);
scene.add( mesh );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 5.1 - CustomSinCurve and the buffer geometry copy method to update geometry

Thus far I just have some static scene examples of this curve class out of the way, so then I should have at least one example that involves an animation loop then. One way to go about doing this might involve creating a new curve object with update arguments in the body of the loop that I can then use to make an updated geometry. In can then make use of the copy method of the buffer geometry instance in the mesh object to copy this update geometry to the geometry object instance of the mesh objects as a way to update the geometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05) )
//-------- ----------
// CURVE CLASS
//-------- ----------
class CustomSinCurve extends THREE.Curve {
    constructor( a = 0.5, b = 0.25, scale = 1 ) {
        super();
        this.scale = scale;
        this.a = a;
        this.b = b;
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        let tx = t * 3 - 1.5,
        ty = Math.sin( 20 * Math.PI * t ) * (this.a * t),
        tz = Math.cos( 20 * Math.PI * t ) * (this.b * t);
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    }
};
//-------- ----------
// MESH
//-------- ----------
let path = new CustomSinCurve( 5 ),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
// creating a tube geometry with path and additional arguments
let mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0xff0000, side: THREE.DoubleSide })
);
scene.add( mesh );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let fps = 30,
frame = 0,
frameMax = 90,
lt = new Date();
let loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        let path = new CustomSinCurve( 0.25 + 0.75 * bias, 0.25, 5 );
        let geo = new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false );
        mesh.geometry.copy(geo);
        renderer.render(scene, camera);
        lt = now;
        frame += Math.floor( fps * secs );
        frame %= frameMax;
    }
};
loop();
```

The use of the copy method might now always be the best way to go about updating geometry over time though. I have found that often the best way to update the state of geometry often involves mutation of the various buffer attributes of a geometry rather than copied a new one over each time. 

## Conclusion

The curve geometry and tube geometry in threejs is then yet another option on tip of using lines and points when it comes to adding content to a scene object. For the most part using curves and tubes will work okay for various demo projects, but one major drawback is that I need to always generate curves with javaScript code rather than a data source of one kind or another. There may be ways of addressing this, and I do have some draft demos in the works that seem to work somewhat okay when it comes to this sort of thing, but I think they might need a little more work before writing about them here. Also there might be better ways of doing the source of things I world like to do with mesh objects rather than lines, such as some kind of system involving capsule geometry.

A long time ago I [wrote a post on the subject of so called fat lines](/2018/11/07/threejs-line-fat-width/) that where a kind of additional line constructor that can be added to threejs by way of an additional javaScript file. However I am sure there are many other ways of getting a desired outcome when it comes to do things sort of thing such as using capsule geometry with a collection of vector3 class instances.