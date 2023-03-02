---
title: The Perspective camera in threejs
date: 2018-04-07 10:49:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 169
updated: 2023-03-02 14:02:04
version: 1.56
---

One of the most important things to understand when making a [threejs](https://threejs.org/) project, is working with a [perspective camera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera) which will be needed in order to draw a scene object with a renderer. There are other types of cameras to work with in threejs that are all based off the core [Camera Class](https://threejs.org/docs/index.html#api/cameras/Camera), but a perspective camera is the most common one that mimics the way the human eye sees the world. So then the perspective camera it is the typical choice for most projects, and for the most part it is a good one to start with also.

When creating an instance of a perspective camera it is a good idea to be aware of the values that are passed when calling the THREE.PerspectiveCamera constructor for the fist time that have to do with the creating of what might be called a [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum). The values that are passed have to do with field of view, aspect ratio, and the near and far render distance. It is also called for to know how to go about changing these values after creating an instance of the camera as it is not just a question of setting new values to a property of interest. 

There are also things like knowing how to position a camera, and set the orientation of a camera, much of that has to do with the [Object3D Class](https://threejs.org/docs/index.html#api/core/Object3D) class of which the base camera class is based off of. The Object3d class is a major class in threejs that is not just the base class for cameras, but also Mesh objects, Groups, and even whole Scene objects. So maybe getting into the object3d class in detail would be a bit off topic, but I should cover at least some basics with that, and maybe many other related topics in this post.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/8kc1egTCLrE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The perspective camera, and what to know before hand

This is not an [introduction to threejs](/2018/04/04/threejs-getting-started/), or any additional skills that are required first such as [javaScript, and web programing in general](/2018/11/27/js-getting-started/). I assume that you have working knowledge of javaScript, and have started working with some basic threejs examples. However if you feel that you could stand to gain a deeper understanding of perspective cameras in threejs this post might be of value to you. In this section I will still be going over a few things that you might want to read up more on if you are still fairly new to threejs, or have still not picked up every little detail just yet that might be good to know.

### There is also looking into the base Camera Class and what the other options are with cameras

There is also looking into the [base camera class](/2018/04/06/threejs-camera/) in threejs, as well as what the other options are with cameras. For the most part though I have to say that I almost always just use the perspective camera in just about every source code example, and project. Still there are some other options, and one option that I might want to use once in a while would be the [orthographic camera](/2018/05/17/threejs-camera-orthographic/).

### Read up more on the Object3d base class, Vector3, and Euler

It might be a good idea to read up more on the [object3d class](/2018/04/23/threejs-object3d/) that is a base class of a Camera, and many other objects in threejs. In this post I will be going over some examples that [make use of the position](/2022/04/04/threejs-object3d-position/), and [rotation properties](/2022/04/08/threejs-object3d-rotation/) of a Perspective Camera object which are properties that are inherited by the Object3d class. There is also the nature of the values of these position and rotation properties where they are instances of the [Vector3](/2018/04/15/threejs-vector3/), and [Euler](/2021/04/28/threejs-euler/) classes, which are also worth checking out in detail at one point or another.

### The source code examples in this post and many more are on my Github account

The source code examples for this post, as well as my many other posts can be found in [my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-camera-perspective). If for some reason you want to make a pull request that would be where to do it, there is also the comments section of this blog post that can be used to bring something up. This is also where I [park the source code examples for my many other blog posts on threejs](/categories/three-js/).

### Version Numbers Matter

When I first wrote this post I was using threejs version r91, and the last time I cam around to do some editing I started updating some of the examples to my r146 style rules. There have been an awful lot of changes that have happened to threejs between the two version numbers, which have resulted in a lot of code breaking changes. it is also safe to assume that this trend will continue moving forward, so I got into the habit of always making sure that I mention what the version numbers are when I wrote a post as well as when I edited the post last as well.

## 1 - Basic example of the perspective camera constructor

In this section I will be going over just the perspective camera class for the most part, but will also be touching base slightly on many other topics on threejs while I am at it. Although this is not a getting started with threejs type post, this will very much be a basic section. As such I will be keeping these examples as simple as possible with just a the most basic striped down core set of objects. I will also be keeping these as simple static render scenes avoiding the use of an update loop, and also keep these examples very copy and paste friendly assuming that you do still have a revision of threejs alone as that will still be needed of course.

### 1.a - Understanding Viewing frustum.

A [Viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum) cam be thought of as a pyramid of vision that exists in front of a camera. Any object that lays inside of the pyramid will be rendered, while anything outside of it will not which will help to reduce overhead in very complex scenes that may contain a great number of mesh objects. This pyramid can be defined by a [field of view](https://en.wikipedia.org/wiki/Field_of_view) in terms of an angle in y direction. As well as additional values that define the aspect ratio of this view, as well as values that define where the top of the pyramid begins, and ends, in other words view distance, or range of you prefer.

### 1.b - Field of view

The first argument that is given to the three.js perspective camera constructor is the field of view. The value expected should be a Number representing an angle in degrees not radians. I am not always so sure what the best value might be for this, the general way of dealing with it has been to just play around with different static values until I get something that looks okay. However looking at all [kinds of various examples on this on the open web](https://stackoverflow.com/questions/57959190/three-js-update-the-fov-value-of-a-perspective-camera-and-keep-the-same-camera-d) I am sure there are ways of coming up with or finding some kind of system that will work well for setting this value as well as the aspect ratio value.

### 1.c - Aspect ratio

The aspect ratio is the second argument that is given to the three.js perspective camera constructor. This value is the width divided by the height of the desired ratio and as such can often be created by just dividing the width and height of the dome element canvas, or the values that will be set for such as canvas when setting up a renderer. Typically you might want to set this to something like 16 over 9, or 4 over 3. Whatever value you set will be used to determine the width and height of the near, and far rectangles of the pyramid of vision, but not the distance between these rectangles as that is what the nest arguments are for.

### 1.d - Near distance

This is the near bound of the frustum, any object that is from this distance, outward to the far distance will be rendered if it is inside the pyramid of vision.

### 1.e - Far distance

This is for course the far distance of the view pyramid. It is also the distance at which the aspect ratio of the field of view will be at it's largest, the bottom of the pyramid. If you are ever asking yourself, how far is to far, this value is of interest, as anything the exists beyond this distance will not be rendered.

### 1.1 - A Basic source code example

So then here is a very basic threejs example of the threejs perspective camera where I am just creating a Camera, as well as a [Scene Object](/2018/05/03/threejs-scene/), a [Mesh object](/2018/05/04/threejs-mesh/) with a [Geometry](/2021/04/22/threejs-buffer-geometry/) and a [Material](/2018/04/30/threejs-materials/), and a [renderer](/2018/11/24/threejs-webglrenderer/). Every threejs project will typically need a scene object, a camera, and a renderer that can be used to render a current view of a scene with a camera. There will also typically need to be at least one object to look at as well, and there is not just sticking with mesh objects, but also using basic mesh materials that will work without a light source.

I am just creating an instance of the perspective camera with, and when doing so I need to pass arguments for field of view, aspect ratio, as well as near and far render distances. These are all values that have to do with the perspective camera, and as such they differ from other values that might be from a base class other than then base camera class and other camera options. When it comes to changing this arguments at run time doing so is not so straight forward compared to other values and often a special update method must be used to update the values at run time, more on that later as this is just a basic example where I will not be getting into any kind of animation or mutation of values in a loop here. 

```js
//-------- ---------
// SCENE, RENDERER
//-------- ---------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const renderer = new THREE.WebGL1Renderer();
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ---------
// CAMERA
//-------- ---------
const fieldOfView = 50,
aspectRatio = 4 / 3,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
//-------- ---------
// MESH
//-------- ---------
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ---------
// RENDER
//-------- ---------
camera.position.set(2, 2, 2); // position camera
camera.lookAt(0, 0, 0);       // have camera look at 0,0,0
renderer.render(scene, camera);
```

Once I have a camera instance I can pass that to the render method that I am using along with a scene to view the scene with that camera. I should make sure that the camera is positioned, and rotated in a way in which I am looking at something in the scene. One way is to use the position property, and [look at methods](/2021/05/13/threejs-object3d-lookat/) of the camera instance both of which are Object3d class features.

## 2 - Changing the pyramid of vision during runtime with the updateProjectionMatrix method

With most projects typically I will be setting some values for the camera just once, and then change values that are part of the Object3D class for instance if I want to move the position, and orientation of the camera. Still if I want to change any of the properties that are used to create the geometry of the view pyramid, I might need to make use of a method that needs to be called after I change those values in order to update the projection matrix. The method to do this is then called the [update projection matrix method](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix) which will need to be called when changing values like field of view, aspect, near, and far. If this method is not called then any changes made to these values will not take effect.

A full list of the properties that correspond with the arguments that you give to the constructor are:

* camera.fov
* camera.aspect
* camera.near
* camera.far

However if I make a change to a value that has to do with the position, rotation, or any kind of Object3d level class property such as the name of the camera for example, then there is no need to call the update projection matrix method. Changes to those kinds of values will always have the same result as with any other object in threejs such as a Mesh, or Group.

### 2.1 - Change FOV example

For this first example I am just changing the Field of view of a camera. Inside the body of the update method of the loop of this example I am just changing the fov property on each call. After doing so I just call the update projection matrix method, and after doing so the new fov value takes effect.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(320, 240, false);
//-------- ----------
// MESH
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8,8,8);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 60;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera.fov = 20 + 30 * a2;
    camera.updateProjectionMatrix();
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

### 2.2 - Mutation of near and far values and the depth material

The near and far values are used to set the the range in terms of how close is to close, and how far is to far when it comes to rendering something in a scene. There is also the depth material that can be used with a mesh as a way to gain a better sense of what is going on with these values. So in this example I am using the depth material to skin a mesh, and also mutating the near and far values of the camera over time.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 15);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// INIT
// ---------- ----------
const init = function () {
    // add a cube to the scene
    const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial({}));
    cube.position.set(0, 0.5, 0);
    scene.add(cube);
    // camera pos
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0.5,0);
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 60;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera.near = 0.1 + 3 * a2;
    camera.far = 15 - 13 * a2;
    camera.updateProjectionMatrix();
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
init();
loop();
```

### 2.3 - The zoom property

Although mutation of the field of view property of a camera can result in a kind of zoom effect, it might be better to use the zoom property as a way to adjust thins over time. The default value for this zoom property is 1 and it can be set to values below and above one as a way to set a kind of zoom effect for the camera.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);
// MESH
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera.zoom = 0.50 + 14.50 * a2;
    camera.updateProjectionMatrix();
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

## 3 - The camera helper, and more than one camera

There is also making use of a camera helper as a way to gain a good idea as to what is going on with the current state of the view pyramid of a perspective camera. However in order to gain a good view of what is going on it might also be a good idea to have more than one camera, one that will have the helper, and the other to get an outside perspective of what is going on with that camera. So in this example I have two cameras one of which is making use of the camera helper, and the other I am using to gain this outside perspective of what is going on with this camera and its current values for near, far, fov, and so forth.

```js
// ---------- ----------
// SCENE, CAMERAS, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(50, 4 / 3, 1, 15);
camera1.position.set(2, 2, 2);
camera1.lookAt(0, 0.5, 0);
scene.add(camera1);
const helper = new THREE.CameraHelper(camera1);
scene.add(helper);
const camera2 = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 15);
scene.add(camera2);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// INIT
// ---------- ----------
const init = function () {
    scene.add( new THREE.GridHelper(10, 10) );
    // add a cube to the scene
    const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial({}));
    cube.position.set(0, 0.5, 0);
    scene.add(cube);
    // camera pos
    camera2.position.set(2, 2, 2);
    camera2.lookAt(0, 0.5, 0);
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera2.position.x = 2 + 10 * a2;
    camera2.position.z = 2 - 5 * a2;
    camera2.lookAt(0, 0.5, 0);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera2);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
init();
loop();
```

### 4.1 - Perspective Camera and mutation of View, Position, and rotation values.

So for a threejs example of the perspective camera I threw together this full copy and past style example. When up and running there is a cube, and a plain added to a scene, and the perspective camera is used to look at it. In addition there is a loop in which I am changing the aspect ratio and field of view of the camera, via the cameras properties for these values. When doing so I of course need to call the update projection matrix method of the camera, or else the changes to values that have to do with the view will not take effect. In this example I am also making use of the position property and the look at at methods of the camera to change the position of the camera over time, and also make sure that the camera is always looking at the center of the scene.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 1, 15);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// INIT METHOD
// ---------- ----------
const init = function () {
    // add plane to the scene
    const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5, 8, 8),
            new THREE.MeshDepthMaterial({
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // add a cube to the scene
    const cube = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshDepthMaterial({}));
    cube.position.set(0, 1.1, 0);
    scene.add(cube);
    // setting position of the camera
    // position is a property of Object3D
    // and the value is an instance of Vector3
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    // update aspect and fov
    camera.aspect = .5 + 1.5 * a2;
    camera.fov = 50 + 25 * a2;
    camera.updateProjectionMatrix();
    // change position
    const radian = Math.PI * 2 * a1;
    camera.position.set(
        Math.cos(radian) * 5, 
        5 * Math.sin(Math.PI * 4 * a1), 
        Math.sin(radian) * 5);
    camera.lookAt(0, 0, 0);
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
init();
loop();
```

### 4.2 - Plane geometry as '2d layer' and aspect ratio

One thing that I have found is that I would like to have a way to do some layering with canvas elements actually. That is to have one or more canvas elements where I am using threejs and the webgl context, and then one or more layers where I am just using the plain old 2d drawing context. I could then position all of these canvas elements on top of each other, or use each of them as resources in the process of drawing down to a single canvas. However I might not need to do that as there might be an option that involves just using a [plane geometry](/2019/06/05/threejs-plane/) for a mesh object and have it always face the camera. I can then use [canvas textures](/2018/04/17/threejs-canvas-texture/) for the diffuse map, and I can also use them for alpha maps to create transparent areas.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.05, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
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
//-------- ----------
// GRID
//-------- ----------
const grid = new THREE.GridHelper(30, 30);
scene.add(grid);
//-------- ----------
// TEXTURE
//-------- ----------
const texture_map = createCanvasTexture( (ctx, canvas ) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'cyan';
    ctx.fillRect(64 - 32, 64, 64, 64);
}, 128);
const texture_alpha = createCanvasTexture( (ctx, canvas ) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = '#888888';
    ctx.fillRect(64 - 32, 64, 64, 64);
}, 128);
//-------- ----------
// MESH
//-------- ----------
const material_plane = new THREE.MeshBasicMaterial({
    map: texture_map, 
    alphaMap: texture_alpha,
    transparent: true
});
const geometry_plane = new THREE.PlaneGeometry(1, 1, 1, 1);
const mesh_plane_1 = new THREE.Mesh(geometry_plane, material_plane);
mesh_plane_1.scale.set(
   camera.aspect,
   1,
   1
);
const group = new THREE.Group();
group.add(mesh_plane_1);
group.add(camera);
scene.add(group);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set( 0, 0, 10 );
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;

    mesh_plane_1.position.z = 8.9 - a2 * 8.9;
    group.position.y = 1;
    group.position.z = 10 - 20 * a2;
    group.rotation.y = Math.PI / 180 * 45 * a2;
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

The perspective camera is my default go to camera for just about every three.js code example, and project that I have made thus far with threejs and a little additional javaScript code. I can not say that this is a subject that I want to get to deep into, because there is so much more to be aware of when it comes to using three.js and cameras are just one little part of the library as a whole. So I would not go nuts with really getting into cameras, as there are so many other topics that might be of greater importance first. Such as getting into blender to create external assets in the form of dae files, or some other container format, and loading them into a project as a way to create custom geometry. There is then so much more when it comes to materials, textures, and the various kinds of maps of materials that can make use of textures. The list goes on and on, so that is why I generally just like to go with the perspective camera and move on, because there is a great deal more to move on to in order to become professional with threejs.

### Camera Constructor

Perspective Camera inherits from the Camera constructor, as such the perspective Camera shares certain properties, and methods with all other cameras in three.js. I will not be getting into this class in depth with this post, but for now it is important to know that this class adds some properties and methods that are uniform across all cameras used in three.js, including a method that can be used to clone a camera.

### Object3D constructor

The Camera class in turn also inherits from Object3D, this class is what helps to make Objects including a camera easy to work with in three.js. Like the Camera Class I will not get into detail as it is a little off topic, and it deserves a post of it's own. However if you are interested in learning how to move the camera, or change it's orientation this is the Class of interest for that.
