---
title: Cameras in three.js
date: 2018-04-06 11:14:00
tags: [three.js]
layout: post
categories: three.js
id: 168
updated: 2021-05-16 09:32:57
version: 1.23
---

If you want to make a [three.js](https://threejs.org/) project you are going to want to know a thing or two about how to go about working with cameras. A Camera must be created with one of several constructor options, once an instance of a camera is obtained it does not need to be added to the scene, although doing so might still generally be a good idea. However in any case at least one camera needs to be created that can be used with a render method in order to view anything in a scene.

In three.js there are a few cameras to work with, but typically you will want to work with a perspective camera most of the time, at least that is the one that I actually used in most projects thus far. A camera like many other objects in three.js inherits from the object3d class, which contains properties that can be used to set the position and orientation of the camera. In this post is about the camera class that is shared across all cameras, and can be thought of as a kind of home base for all content on cameras in three.js content on my site here at github pages.

<!-- more -->

## 1 - Camera Objects in three.js and what to know first

This is a post on cameras in general when working with three.js in a client side javaScript environment. There is a great deal more to be aware of beyond just that of working with cameras when it comes to working out even some basic examples of three.js, so if you are still pretty new to three.js it might be best to start out with some kind of getting started with three.js type post. I will not be going over every little detail about three.js in general here though, but I will be going over some of the core things to be aware of with cameras. In this section I will be outlining some things you should be aware of before getting into cameras in greater detail.

### 1.1 - Always check your version numbers when using three.js

When I first wrote this post I was using three.js version r91, and the last time I came around to do a little editing I was using r127.

### 1.2 - The Camera Class

The actual [Camera Class](https://threejs.org/docs/index.html#api/cameras/Camera) is the base Class for all camera used in three.js. This class just gives a few properties and methods for doing things like cloning the camera. I never use is directly, but it is the base class for all cameras in threejs.

### 1.3 - Camera Class is based on the Object3D CLass

All instances of Camera gain a whole bunch of common properties and methods from The Object3D class, that is also a class that is worth checking out and learning about in detail. This allows for me to easily work with the camera by using methods like lookAt to set the orientation of a camera to look at a point in world space. There is bunch of other methods and properties that apply to the use of cameras, but also many other objects that come compose a scene object in three.js. So learning about the Object3d class applies to use use of cameras but also a whole range of other objects to work with when making a project.

## 2 - Perspective Camera

The most commonly used camera might be the [perspective camera](/2018/04/07/threejs-camera-perspective/), and if you are only going to stick with one, it might be a good idea to make it this one. The perspective camera mimics the way that the human eye actually sees, and is thus often that is what is desired. When creating an instance of this kind of camera I need to pass a filed of view value, followed by a ratio and then a near and far render distance value.

### 2.1 - Basic perspective camera example

```js
(function () {
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
 
    // so here I am setting the values of the perspective camera
    var fieldOfView = 40,
    width = 4 * 160,
    height = 3 * 160,
    aspectRatio = 4 / 3,
    near = 1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
 
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // add a cube to the scene
    cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(cube);
    cube.position.set(0, 0, 0);
    camera.position.set(2, 2, 2);
    camera.lookAt(cube.position);
 
    renderer.render(scene, camera);
}
    ());
```

### 2.2 - Changing aspect and field of view in a loop

One thing that I might want to do now and then is adjust the aspect ratio and field of view of a perspective camera in a loop. To do so I can just set the values for the aspect and fov properties of the camera instance, however there is one additional step that I must do after changing those values which is to call the update projection matrix method. Calling this update projection matrix method is something that must be preformed when it comes to changing just several other static values when it comes to a camera.

```js
(function () {
 
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
 
    // so here I am setting the values of the perspective camera
    var fieldOfView = 45,
    aspectRatio = 16 / 9,
    near = 1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
 
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // initialize method
    var init = function () {
        // add plane to the scene
        var plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(500, 500, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: 0x00afaf,
                    side: THREE.DoubleSide
                }));
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);
        // add a cube to the scene
        cube = new THREE.Mesh(
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
        renderer.setSize(640, 480);
    };
 
    // update method
    var update = function (per) {
        var bias = 1 - Math.abs(.5 - per) / .5;
        // changing aspect, and field of view
        camera.aspect = .5 + 1.5 * bias;
        camera.fov = 50 + 25 * bias;
        // I must call this to get it to work
        camera.updateProjectionMatrix();
    };
 
    // loop
    var frame = 0,
    frameMax = 30 * 10,
    fps = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
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
 
    // call init, and start loop
    init();
    loop();
 
}
    ());
```

## 3 - Orthographic camera

Another option when it comes to cameras that I might actually use in a project is the [orthographic camera](/2018/05/17/threejs-camera-orthographic/). this type of camera is more in tune with how objects actually exist in 3d space rather than how they look with the human eye when it comes to perspective.

## 4 - Basic move camera example

One of the basic things that a developer would like to know how to do when first getting started with threejs is to move a camera. The Camera base class inherits from the object3d class so it has a position and rotation property just like any other object in threejs. The position property is what can be used to change the position of the camera, however you also typically want to use this in conjunction with the rotation property or a method like look at to set the rotation to a desired point of interest also.

```js
var moveCamera = function (camera, per) {
    var rad = Math.PI * 2 * per,
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
 
// CAMERA
var width = 360,
height = 180,
fieldOfView = 40,
aspectRatio = width / height,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
 
// SCENE
var scene = new THREE.Scene();
 
// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(width, height);
 
// MESH
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })));
 
// APP
var frame = 0,
frameMax = 100;
var loop = function () {
    requestAnimationFrame(loop);
    moveCamera(camera, frame / frameMax);
    renderer.render(scene, camera);
    frame += 1;
    frame %= frameMax;
};
loop();
```

In this example I worked out a basic move camera method that moves the camera around and up and down a point of interest when I keep at the origin. At the origin I have a cube that I am just leaving static fixed at the origin of the scene, I could move the cube in the same way as they both share the same set of properties inherited from the object3d class.

If you have not done so all ready it might be a good idea to read up more on the Object3d class when it comes to these useful properties and methods as I use them all the time when working with things in a threejs scene.

## 5 - Conclusion

There is much more to cover when it comes to cameras in threejs, however hopefully this post will help cover the very basics of cameras at least. When it comes to additional reading it might be a good idea to look more into the [object3d class](/2018/04/23/threejs-object3d/) if you have not done so before hand, as this class applies to cameras and many other objects in three.js such as Mesh objects, Groups, and a whole scene for that matter.