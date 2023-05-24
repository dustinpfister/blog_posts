---
title: Quadratic Bezier Curves in threejs
date: 2022-10-21 07:42:00
tags: [three.js]
layout: post
categories: three.js
id: 1010
updated: 2023-05-24 11:49:43
version: 1.14
---

In threejs there is a base [Curve class](https://threejs.org/docs/#api/en/extras/core/Curve) as well as a number of classes that work on top of this Curve Class one of which is [THREE.QuadraticBezierCurve3](https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve3). This [Quadratic Bezier Curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) class creates a Curve that defines a Curve between a start point and end point along with a single control point that will effect the curve. This Can then be used for anything the requires a curve such as the tube geometry function. 

There are a number of other built in curve class methods to choose from, but more often than not one of the built in options will work just fine with what I want to do. Only in the event that I truly do need to work out some custom curve logic would I bother trying to make my own custom curve class. Thus far I can not say that I have found that I need to do that, so if this does not do what you want, look into some of the other built in options first before opening that can of worms.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/Flm1zCt-s1I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## THREE.QuadraticBezierCurve3 and what to know first

This is a blog post on the use of the THREE.QuadraticBezierCurve3 [constructor function](/2019/02/27/js-javascript-constructor/) in the javaScript library known as threejs. This is then not any kind of [getting started type post on threejs](/2018/04/04/threejs-getting-started/) let alone [javaScript](/2018/11/27/js-getting-started/) and any additional skills that are needed before hand. 

There is a whole lot of ground to cover first before getting into the use of Curves and I am not going to be getting into every little detail that you should know at this point. However I do always like to take a moment to write about a few key things you might want to learn about first, or brush up on once again when it comes to using the Quadratic Bezier Curve3 class.

### Read up more on the base Curve class

I wrote a post on the [base Curve class](/2022/06/17/threejs-curve/) all ready so that is something that you might want to read about a little first. The QuadraticBezierCurve3 class is a kind of Curve class so there is taking a moment to read about what there is to work with when it comes to curve objects in general. For the most part I do like to just use this QuadraticBezierCurve3 class for making curve objects, however there are a few other built in options for this, and if need be there is also making my own Curve classes as well based off the the main Curve class.

I also have a number of other posts on the subject of curves in threejs such as [my post where I am making an updating custom geometry using curves](/2022/12/16/threejs-curve-geometry-from/)

### The Vector3 class

The arguments that I give when calling the QuadraticBezierCurve3 function are instances of the [Vector3 class](/2018/04/15/threejs-vector3/), also I often want to create an array of Vector3 objects. This Vector3 class is worth checking out in detail then if you have not done so all ready.

### There is also the Cubic Bezier Curve class that takes two control points

The [THREE.CubicBezierCurve3](/2023/02/10/threejs-curves-cubicbeziercurve3/) class is another great option when it comes to 3d curves, and often I might go with this one over that of quadratic curves. The main feature of interset with this kind of curve is that I can use two controls points rather than just one. I can still get a simular end result as that with quadratic cuves by setting the control points a certain way, but I can also do more with two control points rather than one as well.


### Source Code is up on Github

The source code examples that I am writing about in this [post can also be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-curve-quadratic-bezier-curve3).

### Version Numbers matter

When I wrote this post I was using r140 of threejs.

## 1 - Basic examples of THREE.QuadraticBezierCurve3

To start out with this I will want to have at least one if not more basic examples of the THREE.QuadraticBezierCurve3 constructor that will return a Curve object and thus can be used anywhere such an object is called for. For now I will be sticking with just the Quadratic Bezier Curve alone as a way to create curves saving curve paths for a later section. I will be touching base on things like creating a geometry from this Curve object, but will not be getting into advanced topics like updating a geometry and so forth.

### 1.1 - Single Quadratic Bezier Curve and Points

One has to start somewhere with this sort of thing and with that said here I have a simply hello world style example where I am creating a Quadratic Bezier Curve and then using the Get Points method of the base curve class to create an array of vector3 objects. This array of vector3 objects can then be used to create a geometry by calling the Buffer Geometry constructor function and then using the set from points method. The returned result is then a Buffer Geometry with a position attribute alone, so this might not work well with a Mesh object which requires a few more attributes, but it will work well with say the THREE.Points constructor.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
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
const v3Array = curve.getPoints(50);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x00ff00, size: 0.25 }));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.2 - Making a tube geometry with a curve

One thing that can be done with a curve is that it can be used as the first argument for the tube geometry constructor.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
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
// MESH WITH TUBE GEOMETRY
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
const tubeSegements = 25;
const radius = 0.75;
const radialSegements = 25;
const closeTube = false;
const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, tubeSegements, radius, radialSegements, closeTube),
    new THREE.MeshNormalMaterial({ side: THREE.DoubleSide}) );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Curve Paths

The Curve Paths class is a way to create a Curve object that is not just one Curve but a collection of curves. I can create a single instance of this Curve Path class and then start adding curve objects to it, such as Curves created with the Quadratic Bezier Curve constructor. This sepeshail class that is curve that is then a collection of curves is then an impoatane t tool when it comes to using the Quadratic Bezier Curve class for one of the major use case examples that I would like to use if for as ofteh I will want to have not just one but many control points as well as start and end points that make up an over all curve. 

### 2.1 - Curve Path with Quadratic Bezier Curve and Points

There is creating an instance of a curve path by calling the [THREE.CurvePath](https://threejs.org/docs/#api/en/extras/core/CurvePath) constructor function, then I just need to start adding Curves to it with the add method of this class. For this I created an array with the values that I want to create a start point, and point and control point for each curve. In then just need to loop over this array and create the Vector3 objects that I then pass to the THREE.QuadraticBezierCurve3 constructor and then add each path to the Curve Path.

I can then use the Curve Path like that of any other Curve Object and as such all the Curve class methods are there to work with such as the Get Points method. However I have found that when using a method such as that the number that I give for the number of points will be for each curve object in the curve path rather than the curve path over all.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE PATH
//-------- ----------
const curvePath = new THREE.CurvePath();
[
    [5,0,5,0,2,-5,5,3,-5], // three each (x,y,z) for start, end, and control points
    [0,2,-5,0,1.5,0,-2,2,3],
    [0,1.5,0,3,1,1,0,-1,-11],
    [3,1,1,0,0,0,3,0,10]
].forEach((a)=>{
    const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
    const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
    const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
    curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// you can just use getPoints as a way to create an array of vector3 objects
// which can be used with the set from points method
const v3Array = curvePath.getPoints(200 / curvePath.curves.length);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x00ff00, size: 0.25 }));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 3 - Animation loop examples

One thing that I would really like to do with curves is to create paths that I can then use to set the position and rotation of objects. That is to define a path with one or more curves, and then use the get points method or some other means to create an array of points in the form of Vector3 class objects. This array of vector3 objects can then be used as a way to go about setting the position of a mesh object over time by copying the state of a current point to the position object of the mesh object. The same can be done when it comes to setting rotation by passing a current Vector3 object to the look at method of a mesh object, or any object3d based object for that matter.

So then the best way to go about showing this would be to create one or more animation projects about the Quadratic Bezier Curve3 class.

### 3.1 - Setting the position of a mesh object along the path of a curve

For this first animation example I would like to create a helper function to quickly create a curve path with the Quadratic Bezier Curve class for each curve of the curve path. I can then use this helper function to create a curve path that will be used for the current position of a mesh object. I can then use the get points method to create an array of vector3 objects and I can use that to create a geometry that I will then use with the THREE.Points class to get a visual idea of what is going on with these points. Also I can make the length of the array the same as the count of frames for the animation so that I have a point in space for each frame for the mesh object. So then in my animation loop I can use the current frame number to get the current Vector3 object that I want for the mesh object.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createCurvePath = (data) => {
        const curvePath = new THREE.CurvePath();
        data.forEach((a)=>{
            const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
            const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
            const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
            curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
        });
        return curvePath;
    };
    //-------- ----------
    // CURVE PATH
    //-------- ----------
    const POINT_COUNT = 300; // NUMBER OF POINTS
    const cp_pos = createCurvePath([
        [5,0,5, 0,2,-7,5,3,-5], // three each (x,y,z) for start, end, and control points
        [0,2,-7,0,1.5,0,-2,4,3],
        [0,1.5,0,3,1,1,5,-1,-4],
        [3,1,1,-12,0,0,3,7,10]
    ]);
    const v3Array = cp_pos.getPoints(POINT_COUNT / cp_pos.curves.length);
    //-------- ----------
    // POINTS
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    // you can just use getPoints as a way to create an array of vector3 objects
    // which can be used with the set from points method
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3Array);
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x00ff00, size: 0.125 }));
    scene.add(points);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = POINT_COUNT;  // MADE THE FRAME MAX THE SAME AS THE POINT COUNT
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a = frame / frameMax;
        const v1 = v3Array[ frame ];
        mesh.position.copy(v1);
        // looking at next in path
        const v2 = v3Array[ ( frame + 1 ) % frameMax ];
        mesh.lookAt(v2)
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
}());
```

Although I have the basic idea of what I want working fine here, I would also like to do this for setting rotation as well. Also I might want to look into other ways of getting the points that might prove to be more efficient and also get the index values for the point along the curve in a way that is different from that of the get points method. So I am going to want to create and write about at least a few more animation loop examples here I think.

### 3.2 - Using curves to set position an rotation of a camera

For this animation loop example I am doing more or less the same thing as the first one, only now I have to curve paths one of which I am using to set the position of a camera, and the other I am using to set the look at location for the camera. So then over time I can use these paths to define where an object will be, but also where it should be looking over time as well which is great. For this example I also expanding  the collection of helper functions to included methods that help with crating an array of vector3 objects as well as creating a collection of that help to show the state of the curve as well.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // make a curve path
    const createCurvePath = (data) => {
        const curvePath = new THREE.CurvePath();
        data.forEach((a)=>{
            const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
            const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
            const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
            curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
        });
        return curvePath;
    };
    // create a v3 array
    const createV3Array = (data, pointCount) => {
        const cp = createCurvePath(data);
        return cp.getPoints(pointCount / cp.curves.length);
    };
    // create points from v3 array
    const createPoints = (v3Array, color) => {
        color = color || 0xffffff;
        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(v3Array);
        return new THREE.Points(geometry, new THREE.PointsMaterial({color: color, size: 0.125 }));
    };
    //-------- ----------
    // CURVE PATHS
    //-------- ----------
    const POINT_COUNT = 300; // NUMBER OF POINTS
    const v3Array_pos = createV3Array([
        [5,0,5, 0,2,-7,5,3,-5], // three each (x,y,z) for start, end, and control points
        [0,2,-7,0,1.5,0,-2,4,3],
        [0,1.5,0,3,1,1,5,-1,-4],
        [3,1,1,-12,0,0,3,7,10]
    ], POINT_COUNT);
    const v3Array_look = createV3Array([
        [-10,0,5,10,3,20,0,-3,0]
    ], POINT_COUNT);
    //-------- ----------
    // POINTS
    //-------- ----------
    scene.add( createPoints( v3Array_pos, 0xff0000 ) );
    scene.add( createPoints( v3Array_look, 0x00ff00 ) );
    //-------- ----------
    // GRID, MESH
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = POINT_COUNT;  // MADE THE FRAME MAX THE SAME AS THE POINT COUNT
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a = frame / frameMax;
        const v1 = v3Array_pos[ frame ];
        const v2 = v3Array_look[ frame ];
        camera.position.copy(v1);
        camera.lookAt(v2);
        mesh.position.copy(v2);
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
}());
```

### 3.3 - Get Points method along with get alpha methods

The get points method is great for just quickly getting an array of vector3 objects from a curve, but there are still some situations in which I will want to create my own custom get points method actually. There is also the get point method of the curve class and this is what I can use to get a single point along a curve at a time. When calling the get point method the number value that i give is not a count of points that I want, but rather an alpha value between 0 and 1 that is a single point along the curve that I want. If I want to just use a index over total count type alpha value to get the same result that is what is given when using the get points method I can do that, however it would make sense to come up with custom alpha values for this.

So for this example I made changes to the helper functions so that I am using the get point method in place of the get points method. Also I am not just using the get points method but pulling it into a helper function that can be given an get alpha method. By default the get alpha method that is used is just like that of what is used by the get points method of the curve class and I am doing just that for one curve. However I am of course defining a number of custom get alpha methods that use various features of the math utils object of threejs , as well as another one where I am using a 2d curve to define  what the alpha value should be when getting a point a long a curve.


```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(-6, 6, 6);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // make a curve path
    const createCurvePath = (data) => {
        const curvePath = new THREE.CurvePath();
        data.forEach((a)=>{
            const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
            const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
            const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
            curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
        });
        return curvePath;
    };
    // get a point along a curve path using a getAlpha method
    const getPoint = (cp, rawAlpha, getAlpha) => {
        rawAlpha = rawAlpha === undefined ? 0 : rawAlpha;
        getAlpha = getAlpha || function(rawAlpha){
            return rawAlpha
        };
        const alpha = getAlpha(rawAlpha);
        return cp.getPoint(alpha);
    };
    // create a v3 array
    const createV3Array = (cp, pointCount, getAlpha) => {
        let i = 0;
        const v3Array = [];
        while(i < pointCount){
           const alpha = i / pointCount;
           v3Array.push( getPoint(cp, alpha, getAlpha) );
           i += 1;
        }
        return v3Array;
    };
    // create points from v3 array
    const createPoints = (cp, color, pointCount, getAlpha) => {
        color = color || 0xffffff;
        const geometry = new THREE.BufferGeometry();
        const points = createV3Array(cp, pointCount, getAlpha);
        console.log(points);
        geometry.setFromPoints(points);
        return new THREE.Points(geometry, new THREE.PointsMaterial({color: color, size: 0.025 }));
    };
    //-------- ----------
    // CURVE PATHS
    //-------- ----------
    const POINT_COUNT = 400;
    const cp_pos1 = createCurvePath([
        [5,0,5, 0,1,-5, 5,0.5,-5],
        [0,1,-5, -5,3,-5, -3,0.75,-5]
    ]);
    const cp_pos2 = createCurvePath([
        [5,1,5, 0,2,-5, 5,1.5,-5],
        [0,2,-5, -5,4,-5, -3,1.75,-5]
    ]);
    const cp_pos3 = createCurvePath([
        [5,2,5, 0,3,-5, 5,2.5,-5],
        [0,3,-5, -5,5,-5, -3,2.75,-5]
    ]);
    const cp_pos4 = createCurvePath([
        [5,3,5, 0,4,-5, 5,3.5,-5],
        [0,4,-5, -5,6,-5, -3,3.75,-5]
    ]);
    // damp alpha
    const dampAlpha = (rawAlpha) => {
        return 1 - THREE.MathUtils.damp(0, 1, 8, 1 - rawAlpha);
    };
    // smooth alpha
    const smoothAlpha = (rawAlpha) => {
        return THREE.MathUtils.smoothstep(rawAlpha, 0, 1);
    };
    // curve Alpha
    const curveAlpha = (function(){
        const curve = new THREE.QuadraticBezierCurve(
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( 2, 0 ),
            new THREE.Vector2( 10, 10 )
        );
        return function(rawAlpha){
            const pt = curve.getPoint(rawAlpha);
            return pt.y / 10;
        };
    }());
    //-------- ----------
    // POINTS
    //-------- ----------
    scene.add( createPoints( cp_pos1, 0xff0000, POINT_COUNT) );
    scene.add( createPoints( cp_pos2, 0x00ff00, POINT_COUNT, dampAlpha ) );
    scene.add( createPoints( cp_pos3, 0x0000ff, POINT_COUNT, smoothAlpha ) );
    scene.add( createPoints( cp_pos4, 0x00ffff, POINT_COUNT, curveAlpha ) );
    //-------- ----------
    // GRID, MESH
    //-------- ----------
    scene.add( new THREE.GridHelper(10, 10) );
    const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    const mesh3 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh3);
    const mesh4 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh4);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    const FPS_UPDATE = 20,    // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;        // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = POINT_COUNT;  // MADE THE FRAME MAX THE SAME AS THE POINT COUNT
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const alpha = frame / frameMax;
        const b = 1 - Math.abs(0.5 - alpha) / 0.5;
        // uisng the get Point method here
        const v1 = getPoint(cp_pos1, b);
        mesh1.position.copy(v1);
        mesh1.lookAt(0, 0, 0);
        const v2 = getPoint(cp_pos2, b, dampAlpha);
        mesh2.position.copy(v2);
        mesh2.lookAt(0, 0, 0);
        const v3 = getPoint(cp_pos3, b, smoothAlpha);
        mesh3.position.copy(v3);
        mesh3.lookAt(0, 0, 0);
        const v4 = getPoint(cp_pos4, b, curveAlpha);
        mesh4.position.copy(v4);
        mesh4.lookAt(0, 0, 0);
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
}());
```

## Conclusion

This Quadratic Bezier Curve class is then a great way to go about creating curves that can then be used to create lines and points for a scene. There is the idea of using this in conjunction with additional code to create a geometry that would be used with a mesh object, however my real interest with this thus far has to do with having a system for defining the position, and rotation of objects over time. While I was writing this I was also working on an updated revision of my [sequence hooks module](/2022/05/12/threejs-examples-sequence-hooks/) that I use in just about all of my video projects. While working on it I was adding a new feature that had to do with creating paths that I then use to move objects, so curves are of interest when it comes to the use of this module.

