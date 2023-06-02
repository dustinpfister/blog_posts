---
title: Curve Paths in threejs
date: 2023-06-01 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 1045
updated: 2023-06-02 11:45:09
version: 1.3
---

There are a number of built in options for extensions of the [base curve class](https://threejs.org/docs/#api/en/extras/core/Curve) of threejs such as [CubicBezierCurve3](/2023/02/10/threejs-curves-cubicbeziercurve3/) just to name one. There is also creating ones own curve classes by extending the base curve class as well. These curves can then be used for all sorts of various tasks such as moving an object along the curve, having an object face a point of reference along the curve, creating and updating custom geometries and so forth. So they are great for all kinds of various situations however there is also the idea of having a whole bunch of these curve objects form a single kind of logical curve, and with that this is where [curve paths](https://threejs.org/docs/#api/en/extras/core/CurvePath) come into play.

<!-- more -->


## Curve Paths and what to be aware of

There is a fair amount of ground to cover first before getting into curve paths such as the base curve class to begin with, and at least a few options when it comes to built in extensions of the base class. The use of vectors is also a major topic of interest that one should have solid as they will come up a lot when it comes to creating, updating, and using curve paths. Also it should go without saying that this is not a post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) and client side javaScript in general so I assume that you have at least some experience when it comes to getting started with simple threejs projects. Regardless of what the case is there are a few things that you might want to read about more that are outside the scope of this post that I will touch base on in this opening section.

### Check out my Blog post on the Base Curve Class

There is [reading up on the Base Curve class](/2022/06/17/threejs-curve/) to be more aware of everything there is to work with when it comes to the core features of all curves in threejs. The main prototype method of interest with the base curve class is the get point method that will return a single vector along a curve. When it comes to curve paths I would say to avoid the use of the get points method as a quick way to get an array of vectors though, there is prototype method of the Curve Paths class that should be used in place of that. In any case in this post I will not be getting into every little detail about curves in general so to gain a better sense of curves in general that post might prove to be a better read.

### Source Code examples are up on Github

The source code examples that I write about here in this post can also be found [here in my test threejs reposaptry](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-curve-path) on github. This is also where I place all the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers Matter

When I first wrote this blog post I was [using r152 of threejs and thus was following the style rules that I set for myself for that revision](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) of threejs at that time. This means that I am using module type script tags, and import maps when it comes to my html code. Code breaking change are made to threejs all the time, also also major changes in how threejs is used are also made such a using module mime type script tags over that of th default text\/javaScript mime type.

## 1 - Basic examples of curve paths

I would like to start out this post with at least a few basic demos of curve paths as usual. So these examples will involve just getting started with curve paths and I will try my best to avoid going way off the rails as I sometimes do when it comes to the more advanced sections of posts. The main thing about curve paths compared to other curve class based objects is making use of the get points method as a quick, brainless way of getting an array of vectors to use in any situation that calls for them. I would avoid using that in favor of the get spaced points method of the curve path class prototype. Better yet would be to use the get point method of the base curve class as that gives a far greater degree of flexibility when it comes to the deltas between points, but that might be a matter for more advanced sections.

### 1.1 - Points created from a curve path

For the very first basic section example here I will be creating a geometry with just a position attribute using a curve path that will then be used to create an instance of [THREE.Points](/2023/02/23/threejs-points/) rather than the usual THREE.Mesh Object. However before I get into that I first need the curve path that will be used to create an array of vectors to then make such a geometry.

In the Curve Path section of this code example then I create a few vectors in space that I will then use for start points, end points, and control points. I then crate the curve path by just simply calling THREE.CurvePath and then I can start adding curve objects to the curve path. For now I will be sticking to THREE.LineCurve3 and THREE.QuadraticBezierCurve3 to just create curves that go from a start point to and end point, and then just one curve that will make use of a control point.

Once I have my curve path set up just fine I can then use the get Spaced Points method of the Curve Path class to create an array of Vector3 objects. This array of vector3 objects can then be used with the [set from points method of the buffer geometry class](/2023/01/05/threejs-buffer-geometry-set-from-points/) to create a geometry. When making a geometry this way it will just have a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/), but that is good enough for THREE.Points.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
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
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


### 1.2 - Move an object along a curve path

For this demo I am now using a curve path as a way to move an object along the curve path. This example is then very similar to the first one of this section, but now I am adding a mesh object, as well as an animation loop.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE PATH
// ---------- ----------
const v1 = new THREE.Vector3(-4, 0, 3);
const v2 = new THREE.Vector3(3, 0, 3);
const v3 = new THREE.Vector3(-4, 0, -5);
const vc1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector3(4,3,-1) );
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve3( v1, v2 ) );
curve.add( new THREE.QuadraticBezierCurve3( v2, vc1, v3 ) );
curve.add( new THREE.LineCurve3( v3, v1 ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// points
const points1 = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints(50) ),
    new THREE.PointsMaterial({ size: 0.4, color: 0xff0000 }));
scene.add(points1);
// mesh object
const mesh1 = new THREE.Mesh(
    new THREE.ConeGeometry( 0.5, 2, 20, 20),
    new THREE.MeshNormalMaterial()
);
mesh1.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 2, 8);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    const a2 = (a1 + 0.05) % 1;
    mesh1.position.copy( curve.getPoint(a1) );
    mesh1.lookAt( curve.getPoint(a2) );
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
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

## 2 - Update the State of a Curve Path

In this section I will now be going over how to go about updating a curve over time. Also while I am at it I will also have to at least write a little bit about how to go about updating geometry that is created from a curve as well. For now in many of these examples I am just using simple geometry that just has a position attribute with THREE.Points. So updating will just have to involve updating the state of that attribute alone after updating the curve of course.

### 2.1 - Getting started with Line Curves

For this first example on updating a curve path I will be making use of a curve path that is composed of just THREE.LineCurve3 objects alone. For now this helps to make things easier as all the curves in the path are of the same type, and it is a kind of curve where there are just two vectors that need to be updated.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// UPDATE CURVE PATH
// ---------- ----------
// update curve path
const updateCurvePath = (cp, a_phi = 0, a_theta = 0) => {
    let i = 0;
    const len = cp.curves.length;
    while(i < len){
        const a_child = i / len;
        const curve = cp.curves[i];
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * a_phi;
        e.x = Math.PI * 2 * a_theta;
        curve.v1.set(1, 0, 0).applyEuler(e).multiplyScalar(5);
        i += 1;
    }
};
// create points geometry
const createPointsGeometry = (cp, grain=50 ) => {
    return new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints( grain ) );
};
// update points
const updatePointsGeometry = (geometry, cp) => {
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    while(i < att_pos.count){
        const v = cp.getPoint(i / att_pos.count);
        att_pos.setXYZ( i, v.x, v.y, v.z );
        i += 1;
    }
    att_pos.needsUpdate = true;
};
// ---------- ----------
// CURVE PATH
// ---------- ----------
const v1 = new THREE.Vector3(0, 0, 0);
const v2 = new THREE.Vector3(0, 0, 0);
const v3 = new THREE.Vector3(0, 0, 0);
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve3( v1, v2 ) );
curve.add( new THREE.LineCurve3( v2, v3 ) );
curve.add( new THREE.LineCurve3( v3, v1 ) );
updateCurvePath(curve, 0);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// points
const points1 = new THREE.Points(
    createPointsGeometry(curve, 50),
    new THREE.PointsMaterial({ size: 0.4, color: 0xff0000 }));
scene.add(points1);
// mesh object
const mesh1 = new THREE.Mesh(
    new THREE.ConeGeometry( 0.5, 2, 20, 20),
    new THREE.MeshNormalMaterial()
);
mesh1.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 2, 8);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    const a2 = a1 * 5 % 1;
    const a3 = (a2 + 0.05) % 1;
    const a4 = 1 - Math.abs(0.5 - (a1 * 4 % 1) ) / 0.5;
    const a5 = 1 - Math.abs(0.5 - (a1 * 1 % 1) ) / 0.5;
    updateCurvePath(curve, a4, a5);
    updatePointsGeometry(points1.geometry, curve);
    mesh1.position.copy( curve.getPoint(a2) );
    mesh1.lookAt( curve.getPoint(a3) );
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
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

### 2.2 - More than one Type of Curve in the Path

Things can get a little involved if I am dealing with a curve path where there is more that one type of curve being used for differing parts of the over all curve. One way of addressing this would be to just choose a single option for making the over all curve which might be the best option over all as I see it at least. However there is still working out some kind of system where I just check the type string of each curve, and then call an update method for that type of curve. All of the built in curves have this type property that comes in handy for this sort of thing, and it is also something that I should but in place when making custom curve classes as well.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// UPDATE CURVE PATH
// ---------- ----------
// update curve path
const updateCurvePath = (cp, forType = {}, state = {} ) => {
    let i = 0;
    const len = cp.curves.length;
    while(i < len){
        const curve = cp.curves[i];
        const update = forType[curve.type];
        if(update){
            update(cp, curve, i, len, state);
        }
        i += 1;
    }
};
// create points geometry
const createPointsGeometry = (cp, grain=50 ) => {
    return new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints( grain ) );
};
// update points
const updatePointsGeometry = (geometry, cp) => {
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    while(i < att_pos.count){
        const v = cp.getPoint(i / att_pos.count);
        att_pos.setXYZ( i, v.x, v.y, v.z );
        i += 1;
    }
    att_pos.needsUpdate = true;
};
// ---------- ----------
// FOR TYPES
// ---------- ----------
const FOR_CURVE_TYPE = {
    // for line curve 3 type curves
    LineCurve3: ( cp, curve, i, len, state ) => {
        let a_child = i / len;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        // v1
        curve.v1.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
        a_child = (i + 1 % len) / len;
        // v2
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        curve.v2.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
    },
    // single control point curve
    QuadraticBezierCurve3: ( cp, curve, i, len, state ) => {
        let a_child = i / len;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        // start point ( v0 )
        curve.v0.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
        a_child = (i + 1 % len) / len;
        // end point ( v2 ) 
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        curve.v2.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
        // control point (v1)
        const v_delta = new THREE.Vector3(0, 2 - 4 * state.a2, 0);
        curve.v1.copy(curve.v0).lerp( curve.v2, 0.5 ).add(v_delta);
    }
};
// ---------- ----------
// CURVE PATH
// ---------- ----------
const v1 = new THREE.Vector3(0, 0, 0);
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.QuadraticBezierCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.QuadraticBezierCurve3( v1.clone(), v1.clone(), v1.clone() ) );
updateCurvePath(curve, FOR_CURVE_TYPE, { a1: 0, a2: 0, radius: 5 });
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// points
const points1 = new THREE.Points(
    createPointsGeometry(curve, 50),
    new THREE.PointsMaterial({ size: 0.4, color: 0xff0000 }));
scene.add(points1);
// mesh object
const mesh1 = new THREE.Mesh(
    new THREE.ConeGeometry( 0.5, 2, 20, 20),
    new THREE.MeshNormalMaterial()
);
mesh1.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 2, 8);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    const a2 = a1 * 12 % 1;
    const a3 = (a2 + 0.1) % 1;
    const a4 = 1 - Math.abs(0.5 - (a1 * 8 % 1) ) / 0.5;
    const a5 = 1 - Math.abs(0.5 - (a1 * 20 % 1) ) / 0.5;
    updateCurvePath(curve, FOR_CURVE_TYPE, { a1: a1, a2: a5, radius: 7 - 2 * a4 });
    updatePointsGeometry(points1.geometry, curve);
    mesh1.position.copy( curve.getPoint(a2) );
    mesh1.lookAt( curve.getPoint(a3) );
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
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

Curve paths are then a major part of doing a whole lot of interesting things with a threejs project. There is just creating static, fixed paths in spaces and moving objects along thous paths. There there are all kinds of projects where a stack of curves are being updated and used over  and over again in all kinds of differing ways. Paths are great for moving objects around, but they can also be used as a point of reference for setting the rotation of them as well. There are then all kinds of other various use case examples such as using them to create 2d shapes that can then be used to create an extrude geometry, and also working out interesting alpha values that can then be used to update just about  anything.
