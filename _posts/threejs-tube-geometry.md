---
title: Tube Geometry in threejs
date: 2023-06-02 10:42:00
tags: [three.js]
layout: post
categories: three.js
id: 1046
updated: 2023-06-03 16:44:01
version: 1.5
---

In threejs there is the base curve class, along with a number of built in options that extend this base curve class to create paths in 2D and also very much 3D space. There are a whole lot of use case examples for these curves such as using them to move objects along a path, or use any point along a curve as a point of reference to have an object look at. However there is also using them to make geometry also by getting an array of Vectors for a 3d curve and then quickly creating a geometry with just a position attribute that will work fine with THREE.Points, or THREE.Line. However things can prove to get a little involved when it comes to making the kind of geometry that will work well with THREE.Mesh. There is working out some kind of project that has to do with using curves as a way to create a custom geometry, however maybe a good starting point for this sort of thing would be to just use the [THREE.TubeGeometry class](https://threejs.org/docs/#api/en/geometries/TubeGeometry).

As the name suggests this built in geometry constructor will take a 3d curve as the first argument along with several other options arguments to create a geometry that is a kind of tube around a curve. As with many of the other built in options for geometry constructors it will also set up normal and uv attributes as well so one can quickly get up and running with this to create geometry around a curve. Also this kind of geometry can often serve as a nice replacement for THREE.Line or THREE.LineSegements as the full range options and features of mesh materials can be used, and also it can help to address the problem where line width will not always work on all platforms.

<!-- more -->

## Tube Goemetry and what to know first

I am making the assumption that you are beyond the basics when it comes to getting started with threejs and client side javaScript in general. If not sorry getting into that here is without question outside the scope of this post. However I do always like to take a moment to write about a few things that you might want to learn or refresh in these opening getting started typo sections of my threejs posts.

### Read up more on Curves in General

If you think you might need to learn more about curves in general I have a long, detailed [main blog post on curves](/2022/06/17/threejs-curve/) in which I think I cover most bases with curves in threejs. There is a whole lot to write about with them that I would like to now get into to much with this post as I would like to keep the focus more so with the nature of Tube Geometry alone.

### There is a lot to know with geometry in general as well

The Tube Geometry class is just one built in option for making geometry that extends the [base Buffer Geometry](/2021/04/22/threejs-buffer-geometry) class. What is nice about these built in options is that it can quickly help set up a position, normal, and uv attribute for a geometry. However in some cases these attributes might need to be adjusted, and also some times I might just need to make a full custom geometry from the ground up. There is also a lot to be aware of with both prototype methods of the buffer geometry class as well as values that are nested in a buffer geometry instance such as the buffer attribute class.

### Source Code is also up on Github

The source code examples in this post can also be found in the [folder that corresponds to this post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-tube-geometry) in my [test threejs repository](https://github.com/dustinpfister/test_threejs) on Github. This is also where I park the source code examples for all of [my other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers Matter

When I first wrote this blog post I was [using r152 of threejs and thus was following the style rules that I set for myself for that revision](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) of threejs when first writing these demos. This means that I am using module type script tags, and import maps when it comes to my html code. 

## 1 - Basic Tube Geometry examples

For this first section as always I will just be starting out with a few basic examples of Tube Geometry. Nothing fancy with curve paths, and updating the curve objects, and geometry over time. Just some simple, clean starting points.

### 1.1 - Tube Geometry Arguments

One has to start somewhere with everything, and when it comes to Tube Geometry apart from the usual objects that are needed for any threejs demo, I also need a curve to pass as the first argument. So with this first demo after creating the scene object, camera, and renderer I then create a curve object. For this curve object I went with [THREE.QuadraticBezierCurve3](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) which is a nice built in curve class extension that takes a start point, end point, and a single control point as arguments.

Once I have a curve to use I can just pass that as the first argument when calling THREE.TubeGeometry to create the buffer geometry that will be used with a mesh object. There are then a number of additional arguments that can be used to adjust how many sections there will be along the tube, as well as for each ring of the tube as well. Other arguments have to do with setting the radius, and also if the ends should be closed or not.

Now that I have a geometry I can use it to create a mesh object by just passing the geometry as the first argument for THREE.Mesh, along with a material as the second argument. For this first basic example I am not doing anything fancy with materials and I am just going with the [THREE.MeshNormalMaterial](/2021/06/23/threejs-normal-material/) as I find that this is a nice option for just quickly seeing some depth without having to do anything to complex with light and textures. When I made the Tube geometry I went with leaving the ends open though, so I am setting the side option of the material to THREE.DoubleSide.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(-5,0,0);
const v_end = new THREE.Vector3(5,0,0);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-4,3,-5) );
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.75;
const radial_segments = 16;
const closed = false;
const geometry = new THREE.TubeGeometry(curve, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(7, 2, 7);
camera.lookAt(2, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Adding a texture

One major improvement of using tube Geometry over that of THREE.Points, or THREE.Lines is that I can use the Mesh materials and all the various options of such materials. With that said in this example I am making a texture using a [canvas element](/2018/04/17/threejs-canvas-texture/) for the map option of the [Basic material](/2018/05/05/threejs-basic-material). When it comes to the code that I am using to draw the canvas it is just a little quick code for making a checkered pattern. I then just pass the canvas element to the THREE.CanvasTexture constructor and I then get a texture. I can then use this texture for options like the map option of the basic material.


```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// TEXTURE
// ---------- ----------
const canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;
const ctx = canvas.getContext('2d');
const w = 16;
const size = canvas.width / w;
const colors = 'white,red'.split(',');
const len = w * w;
let pi = 0;
while(pi < len){
    const gx = pi % w;
    const gy = Math.floor(pi / w);
    const x = size * gx;
    const y = size * gy;
    const ci = (pi + (gy % 2) ) % colors.length;
    ctx.fillStyle = colors[ci];
    ctx.fillRect(x, y, size, size );
    pi += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(-5,0,0);
const v_end = new THREE.Vector3(5,0,0);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-4,3,-5) );
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.75;
const radial_segments = 16;
const closed = false;
const geometry = new THREE.TubeGeometry(curve, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(7, 2, 7);
camera.lookAt(2, 0, 0);
renderer.render(scene, camera);
```

## 2 - Curve Paths and Tube Geometry

Often I will want to not make a tube geometry with just one curve object, but a path of curve objects. So in this section I am going to look into working out a few demos in which I am doing just that.

### 2.1 - Curve Path Example

For this example I started to explore the use of curve paths and tube geometry.  Two help make things simple I went with just one type of curve for each child of the curve path which is THREE.CubicBezierCurve3. This means that I will not have to bother checking the type for each child when making a more advanced example where I update the curves and the geometry of the tubes. Also this is a built in curve option where I have two control points to work with rather than just one.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const getCircleVector = (i = 0, id = 0, len = 4, radius = 4, y = 0) => {
    const radian = Math.PI * 2 * ( (i + id) % len / len);
    const x = Math.cos(radian) * radius,
    z = Math.sin(radian) * radius;
    return new THREE.Vector3( x, y, z );
};
// ---------- ----------
// CURVE Path
// ---------- ----------
let i = 0;
const len = 4;
const curve_path = new THREE.CurvePath();
const cp_radius = 4;
while(i < len){
    const a_child = i / len;
    const y = -0.5 + 1 * a_child;
    const v_start = getCircleVector(i, 0, len, cp_radius, y);
    const v_end = getCircleVector(i, 1, len, cp_radius, y);
    const c_radius = cp_radius * 1.0 + 2 * a_child;
    const v_control1 = getCircleVector(i, 0.25, len, c_radius, y);
    const v_control2 = getCircleVector(i, 0.75, len, c_radius, y);
    curve_path.add(new THREE.CubicBezierCurve3(v_start, v_control1, v_control2, v_end));
    i += 1;
}
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.75;
const radial_segments = 16;
const closed = true;
const geometry = new THREE.TubeGeometry(curve_path, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(2, 0, 0);
renderer.render(scene, camera);
```

### 2.2 - Update a curve path, and Tube Geometry

Working out a simple static demo of a Tube Geometry made from a curve path is one thing, but updating the curve path, and also the tube geometry made from the curve path is a whole other matter. This is where things will get a little involved as not only do I need to work out the logic I want to use to update the state of the curve path, but I also need to update the geometry made from the tube Geometry constructor function as well.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const getBiasAlpha = (a1 = 0, count = 1) => {
    return 1 - Math.abs( 0.5 - (a1 * count % 1)) / 0.5;
};
const getCircleVector = (i = 0, id = 0, len = 4, radius = 4, y = 0) => {
    const radian = Math.PI * 2 * ( (i + id) % len / len);
    const x = Math.cos(radian) * radius,
    z = Math.sin(radian) * radius;
    return new THREE.Vector3( x, y, z );
};
// update a single curve
const updateCurve = (i, len, curve, radius_path = 2, radius_control = 3) => {
    const y = 0;
    curve.v0.copy(  getCircleVector(i, 0, len, radius_path, y) );
    curve.v3.copy( getCircleVector(i, 1, len, radius_path, y) );
    curve.v1.copy( getCircleVector(i, 0.25, len, radius_control, y) );
    curve.v2.copy( getCircleVector(i, 0.75, len, radius_control, y) );
};
// create a curve path
const createCurvePath = () => {
    let i = 0;
    const len = 8;
    const curve_path = new THREE.CurvePath();
    while(i < len){
        const curve = new THREE.CubicBezierCurve3();
        updateCurve(i, len, curve, 4, 4.5)
        curve_path.add( curve );
        i += 1;
    }
    return curve_path;
};
const updateCurvePath = (curve_path, radius_path = 2, radius_control = 3) => {
    let i = 0;
    const len = 8;
    while(i < len){
        const curve = curve_path.curves[i];
        updateCurve(i, len, curve, radius_path, radius_control);
        i += 1;
    }
    return curve_path;
};
// update points
const updateGeometry = (geometry, geometry_source) => {
    const att_p = geometry.getAttribute('position');
    const att_ps = geometry_source.getAttribute('position');
    let i = 0;
    while(i < att_p.count){
        att_p.setXYZ( i, att_ps.getX(i), att_ps.getY(i),att_ps.getZ(i) );
        i += 1;
    }
    att_p.needsUpdate = true;
    geometry.computeVertexNormals();
};
// ---------- ----------
// CURVE Path
// ---------- ----------
const curve_path = createCurvePath();
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.75;
const radial_segments = 16;
const closed = true;
const geometry = new THREE.TubeGeometry(curve_path, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 8, 8);
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
    const a2 = getBiasAlpha(a1, 16);
    const a3 = getBiasAlpha(a1, 8);
    updateCurvePath(curve_path, 5 + 1 * a2, 6 - 1 * a2);
    const geometry_target = new THREE.TubeGeometry(curve_path, tubular_segments, radius, radial_segments, closed);
    updateGeometry(geometry, geometry_target);
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

The Tube Geometry class is then the only Built in Geometry class that will create a geometry from a curve, well at least a 3d curve anyway. When it comes to 2d curves there is getting into the use of shape geometry, extrude geometry and lathe geometry. However that all might be things that I should get into in another post.
