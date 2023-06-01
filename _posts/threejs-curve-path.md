---
title: Curve Paths in threejs
date: 2023-06-01 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 1045
updated: 2023-06-01 11:37:57
version: 1.1
---

There are a number of built in options for extensions of the [base curve class](https://threejs.org/docs/#api/en/extras/core/Curve) of threejs such as [CubicBezierCurve3](/2023/02/10/threejs-curves-cubicbeziercurve3/) just to name one. There is also creating ones own curve classes by extending the base curve class as well. These curves can then be used for all sorts of various tasks such as moving an object along the curve, having an object face a point of reference along the curve, creating and updating custom geometries and so forth. So they are great for all kinds of various situations however there is also the idea of having a whole bunch of these curve objects form a single kind of logical curve, and with that this is where [curve paths](https://threejs.org/docs/#api/en/extras/core/CurvePath) come into play.

<!-- more -->


## Curve Paths and what to be aware of

There is a fair amount of ground to cover first before getting into curve paths such as the base curve class to begin with, and at least a few options when it comes to built in extensions of the base class. The use of vectors is also a major topic of interest that one should have solid as they will come up a lot when it comes to creating, updating, and using curve paths. Also it should go without saying that this is not a post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) and client side javaScript in general so I assume that you have at least some experience when it comes to getting started with simple threejs projects. Regardless of what the case is there are a few things that you might want to read about more that are outside the scope of this post that I will touch base on in this opening section.

### Check out my Blog post on the Base Curve Class

There is [reading up on the Base Curve class](/2022/06/17/threejs-curve/) to be more aware of everything there is to work with when it comes to the core features of all curves in threejs. The main prototype method of interest with the base curve class is the get point method that will return a single vector along a curve. When it comes to curve paths I would say to avoid the use of the get points method as a quick way to get an array of vectors though, there is prototype method of the Curve Paths class that should be used in place of that. In any case in this post I will not be getting into every little detail about curves in general so to gain a better sense of curves in general that post might prove to be a better read.

### Source Code examples are up on Github

The source code examples that I write about here in this post can also be found [here in my test threejs reposaptry](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-curve-path) on github. This is also where I place all the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

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


