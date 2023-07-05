---
title: Camera options in threejs, and other details such as updating and movement
date: 2018-04-06 11:14:00
tags: [three.js]
layout: post
categories: three.js
id: 168
updated: 2023-07-05 11:47:52
version: 1.37
---

If you want to make a [threejs](https://threejs.org/) project you are going to want to know a thing or two about how to go about working with cameras. A camera must be created with one of several constructor function options, once an instance of a camera is obtained it does not need to be added to the [scene object](/2018/05/03/threejs-scene/), although doing so might still generally be a good idea in some situations. In any case at least one camera needs to be created so that we have something that can be used with a [render method](/2018/11/24/threejs-webglrenderer) of the WebGL rendreer, or whatever renderer option you might be using

In threejs there are a few cameras to work with, but typically you will want to work with a perspective camera most of the time, at least that is the one that I actually used in most projects thus far. A camera like many other objects in threejs inherits from the object3d class, which contains properties that can be used to set the position and orientation of the camera. This post is then about the base camera class that is shared across all cameras, the various camera options, and so forth. In other words this can be thought of as a kind of home base for all content on cameras in threejs content on my site here at github pages.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/M-ouXl_5QA0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Camera Objects in three.js and what to know first

This is a post on cameras in general when working with threejs in a client side javaScript environment. There is a great deal more to be aware of beyond just that of working with cameras when it comes to working out even some basic examples of threejs, so if you are still pretty new it might be best to start out with some kind of [getting started with threejs type post](/2018/04/04/threejs-getting-started/). I will not be going over every little detail about threejs in general here then, but I will be going over some of the core things to be aware of that are relevant to that of cameras.

### The Camera Class

The actual [Camera Class](https://threejs.org/docs/index.html#api/cameras/Camera) is the base Class for all camera used in threejs. This class just gives a few properties and methods for doing things like cloning the camera. I never use is directly, but it is the base class for all cameras in threejs.

### Camera Class is based on the Object3D CLass

All instances of Camera gain a whole bunch of common properties and methods from The [Object3D class](/2018/04/23/threejs-object3d/), that is also a class that is worth checking out and learning about in detail. This allows for me to easily work with the camera by using methods like [lookAt](/2021/05/13/threejs-object3d-lookat/) to set the orientation of a camera to look at a point in world space. There is bunch of other methods and properties that apply to the use of cameras, but also many other objects that come compose a scene object in threejs. So learning about the Object3d class applies to use use of cameras but also a whole range of other objects to work with when making a project.

### Source code examples are also up on Github

The full collection of source code examples that I am writing about here can also be fond in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-camera) on Github. This is also where I place the source code examples for all the [other blog posts on threejs](/categories/three-js/) that I have wrote thus far.

### Always check your version numbers when using three.js

When I first wrote this post I was using threejs version r91, which is now a pretty old revision of threejs. However the last time I came around to edit this post I updated all the demos to [my r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) at least. I do have a more up to date style rules option, but thus far I am sticking with that one for now as the default when updating these older blog posts.

## 1 - Perspective Camera

The most commonly used camera might be the [perspective camera](/2018/04/07/threejs-camera-perspective/), and if you are only going to stick with one, it might be a good idea to make it this one. The perspective camera mimics the way that the human eye actually sees, and is thus often that is what is desired. When creating an instance of this kind of camera I need to pass a filed of view value, followed by a ratio and then a near and far render distance value.

### 1.1 - Basic perspective camera example

When it comes to using the perspective camera class I just need to call the THREE.perspectiveCamera constructor when doing so i will want to pass a few arguments to the constructor function. The first value is a field of view value, followed by an aspect ratio number, then near and far values for the camera when it comes to the render distance.

```js
//-------- ----------
// CAMERA
//-------- ----------
const fieldOfView = 40,
width = 4 * 160,
height = 3 * 160,
aspectRatio = 4 / 3,
near = 1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width, height, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(cube);
cube.position.set(0, 0, 0);
//-------- ----------
// RENDER SCENE WITH CAMERA
//-------- ----------
renderer.render(scene, camera);
```

### 1.2 - Changing aspect and field of view in a loop

One thing that I might want to do now and then is adjust the aspect ratio and field of view of a perspective camera in a loop. To do so I can just set the values for the aspect and fov properties of the camera instance, however there is one additional step that I must do after changing those values which is to call the update projection matrix method. Calling this update projection matrix method is something that must be preformed when it comes to changing just several other static values when it comes to a camera.

```js
//-------- ----------
// CAMERA
//-------- ----------
const fieldOfView = 45,
aspectRatio = 16 / 9,
near = 1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// add plane to the scene
const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500, 8, 8),
        new THREE.MeshBasicMaterial({
            color: 0x00afaf,
            side: THREE.DoubleSide
        }));
plane.rotation.x = Math.PI / 2;
scene.add(plane);
// add a cube to the scene
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200),
        new THREE.MeshNormalMaterial({}));
cube.position.set(0, 100, 0);
scene.add(cube);
// setting position of the camera
// position is a property of Object3D
// and the value is an instance of Vector3
camera.position.set(400, 400, 400);
camera.lookAt(0, 0, 0);
// setting a background color
scene.background = new THREE.Color(.7, .7, .7);
// 16:9 aspect ratio canvas


// loop
let frame = 0,
frameMax = 30 * 10,
fps = 30,
lt = new Date();
const update = function (per) {
    const bias = 1 - Math.abs(.5 - per) / .5;
    // changing aspect, and field of view
    camera.aspect = .5 + 1.5 * bias;
    camera.fov = 50 + 25 * bias;
    // I must call this to get it to work
    camera.updateProjectionMatrix();
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(frame / frameMax);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

## 2 - Orthographic camera

Another option when it comes to cameras that I might actually use in a project is the [orthographic camera](/2018/05/17/threejs-camera-orthographic/). This type of camera is more in tune with how objects actually exist in 3d space rather than how they look with the human eye when it comes to perspective.

### 2.1 - Basic Orthographic camera example

When calling the Orthographic camera constructor function the set of arguments differ from the perspective camera. In place of giving values that have to do with field of view, aspect ration and so forth I am giving values that define a cube like area in which the camera will view.

```js
//-------- ----------
// CAMERA
//-------- ----------
const left = -3.2,
right = 3.2,
top2 = 2.4,
bottom = -2.4,
near = 0.01,
far = 100,
camera = new THREE.OrthographicCamera(
        left,
        right,
        top2,
        bottom,
        near,
        far);
camera.position.set(2, 2, 2); // position camera
camera.lookAt(0, 0, 0); // have camera look at 0,0,0
//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 3 - Moving a Camera Around

The process of moving a camera around in a scene is where things can end up turning into a total time consuming black hole as there are all kinds of ways of doing this sort of thing of course. The good news is that just getting started is simple enough. The even better news is that what you learn that has to do with moving the camera around also very much applies to objects in general as well. I have wrote a main blog post on the subject of [moving the camera around](/2019/12/17/threejs-camera-move/) that you might want to read if you want to see a whole lot more on this topic. There is also the [post that I wrote on the position property of the object3d class](/2022/04/04/threejs-object3d-position/) in which I really went off the rails with this, and have still failed at even scratching the surface.
Still for this general overview of cameras type post I should go over at least one or two demos that have to do with the movement of cameras.
### 3.1 - Basic move camera example

One of the basic things that a developer would like to know how to do when first getting started with threejs is to move a camera. The Camera base class inherits from the object3d class so it has a position and rotation property just like any other object in threejs. The position property is what can be used to change the position of the camera, however you also typically want to use this in conjunction with the rotation property or a method like look at to set the rotation to a desired point of interest also.

```js
//-------- ----------
// CAMERA, SCENE, RENDERER
//-------- ----------
const width = 640,
height = 480,
fieldOfView = 40,
aspectRatio = width / height,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
renderer.setSize(width, height, false);
//-------- ----------
// HELPERS
//-------- ----------
const moveCamera = function (camera, per) {
    const rad = Math.PI * 2 * per,
    x = Math.cos(rad) * 3,
    y = -3 + 6 * (1 - Math.abs(per - 0.5) / 0.5),
    z = Math.sin(rad) * 3;
    // position property can be used to set
    // the position of a camera
    camera.position.set(x, y, z);
    // the rotation property or the lookAt method
    // can be used to set rotation
    camera.lookAt(0, 0, 0);
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })));
//-------- ----------
// LOOP
//-------- ----------
let frame = 0,
frameMax = 100,
lt = new Date();
const fps = 12;
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        moveCamera(camera, frame / frameMax);
        renderer.render(scene, camera);
        frame += 1;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

In this example I worked out a basic move camera method that moves the camera around and up and down a point of interest when I keep at the origin. At the origin I have a cube that I am just leaving static fixed at the origin of the scene, I could move the cube in the same way as they both share the same set of properties inherited from the object3d class.

If you have not done so all ready it might be a good idea to read up more on the Object3d class when it comes to these useful properties and methods as I use them all the time when working with things in a threejs scene.

## 4 - The near and far values and the depth material

Another thing that might come up when it comes to working with a camera is what values to give the constructor when it comes to the near and far values. I often just pass number literals for these values, but in some cases this is something that I might want to be able to adjust threw a user interface, an animation loop, or something to that effect. However even then the question is what to set when it comes to the range for these values. How close is to close, and how far is to far can be good questions for these values. One thing to do that might help is to use the depth material for all objects in the scene, and then adjust things until the situation looks good.

The depth material is a special kind of materials that will render in different ways depending on the distance of the camera and an object in the scene, but also the near and far values of the camera will also impact the rendering of the textures for mesh objects that make use of this depth material.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.7, 0.7, 0.7);
const fieldOfView = 45,
aspectRatio = 4 / 3,
near = 0.1,
far = 100,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshDepthMaterial({
            side: THREE.DoubleSide
        }));
plane.rotation.x = Math.PI / 2;
scene.add(plane);
// add a cube to the scene
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshDepthMaterial({}));
cube.position.set(0, 0.5, 0);
scene.add(cube);
camera.position.set(3.5, 4.5, 3.5);
camera.lookAt(0, 0, 0);

//-------- ----------
// LOOP
//-------- ----------
let frame = 0,
frameMax = 30 * 10,
fps = 30,
lt = new Date();
const update = function (per) {
    const bias = 1 - Math.abs(.5 - per) / 0.5;
    camera.far = 4.5 + 8.5 * bias;
    camera.near = 0.1 + 8.9 * bias;
    camera.updateProjectionMatrix();
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(frame / frameMax);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

## Conclusion

There is much more to cover when it comes to cameras in threejs, however hopefully this post will help cover the very basics of cameras at least. When it comes to additional reading it might be a good idea to look more into the [object3d class](/2018/04/23/threejs-object3d/) if you have not done so before hand, as this class applies to cameras and many other objects in three.js such as Mesh objects, Groups, and a whole scene for that matter.
