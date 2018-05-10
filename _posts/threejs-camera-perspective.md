---
title: Working with a perspective camera in three.js
date: 2018-04-07 10:49:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 169
updated: 2018-04-07 15:41:51
version: 1.1
---

One of the most important things to understand when making a [three.js](https://threejs.org/) project, is at least the basics of working with a [perspective camera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera). There are other types of cameras to work with in three.js, but a perspective camera is the most common one that mimics the way the human eye sees the world.

<!-- more -->

In this post I will be covering some basic demos that have to do with a perspective camera, [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum), the base [Camera Class](https://threejs.org/docs/index.html#api/cameras/Camera), and some additional things that are inherited from the [Object3D Class](https://threejs.org/docs/index.html#api/core/Object3D)

## What to know before hand

This is not an introduction to three.js, or any additional skills that are required first in order to start working with something like three.js such as javaScript, and web programing in general. I assume that you have working knowledge of javaScript, and have started working with some basic three.js examples. however if you feel that you could stand to gain a deeper understanding of perspective cameras in three.js this post might be of interest.

## The perspective camera constructor

The main method of interest in this blog post is the three.js [perspective camera constructor](](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera). ). This constructor also inherits from [Camera](https://threejs.org/docs/index.html#api/cameras/Camera), and the Camera constructor also inherits from [Object3D](https://threejs.org/docs/index.html#api/core/Object3D).

It is a good idea to have a strong foundational understanding of all of these constructors, but in this post I will be mainly focusing on the Perspective Camera Constructor.

```js
var fieldOfView = 45,
aspectRatio = 16 / 9,
near = 1,
far = 1000,
 
// I can now make an instance of Perspective Camera
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
```

### Understanding Viewing frustum.

[Viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum) cam be thought of as a pyramid of vision that exists in front of a camera. Any object that lays inside of the pyramid will be rendered. This pyramid can be defined by an [field of view](https://en.wikipedia.org/wiki/Field_of_view) in terms of an angle in y direction. As well as additional values that define the aspect ratio of this view, as well as values that define where the top of the pyramid begins, and ends (view distance).

#### Field of view

The first argument that is given to the three.js perspective camera constructor is the field of view. The value expected should be a Number representing an angle in degrees not radians.

#### Aspect ratio

The aspect ratio is the second argument that is given to the three.js perspective camera constructor. This value is the width divided by the height of the desired ratio. Typically you might want to set this to something like 16 / 9, or 4 / 3. Whatever value you set will be used to determine the width and height of the near, and far rectangles of the pyramid of vision.

#### Near distance

This is the near bound of the frustum, any object that is from this distance, outward to the far distance will be rendered if it is inside the pyramid of vision.

#### Far distance

This is for course the far distance of the view pyramid. It is also the distance at which the aspect ratio of the field of view will be at it's largest, the bottom of the pyramid. If you are ever asking yourself, how far is to far, this value is of interest, as anything the exists beyond this distance will not be rendered.

## Changing the pyramid of vision during runtime with the updateProjectionMatrix method

With most projects typically I will be setting some values for the camera just once, and then change values that are part of the Object3D class for instance if I want to move the position, and orientation of the camera.

Still If you want to change any of the properties that are used to create the geometry of the view pyramid, you may thing that there is some kind of method that needs to be called to reconfigure that when you change a value, and you are right. The method you want to call is updateProjectionMatrix.

If you do not call this method, any change that is made to values like camera.fov, or camera.aspect will not take effect.

A full list of the properties that correspond with the arguments that you give to the constructor are:

* camera.fov
* camera.aspect
* camera.near
* camera.far

If you change a property you will need to call updateProjectionMatrix in order to re generate the pyramid geometry. like so:

```js
    camera.fov = Math.floor(25 + 50 * bias);
    camera.updateProjectionMatrix();
```

## Camera Constructor

Perspective Camera inherits from the Camera constructor, as such the perspective Camera shares certain properties, and methods with all other cameras in three.js. I will not be getting into this class in depth with this post, but for now it is important to know that this class adds some properties and methods that are uniform across all cameras used in three.js, including a method that can be used to clone a camera.

## Object3D constructor

The Camera class in turn also inherits from Object3D, this class is what helps to make Objects including a camera easy to work with in three.js. Like the Camera Class I will not get into detail as it is a little off topic, and it deserves a post of it's own. However if you are interested in learning how to move the camera, or change it's orientation this is the Class of interest for that.

## An Example of Perspective Camera use

```js
(function () {
 
    // a scene is needed to place objects in
    var scene = new THREE.Scene(),
 
    // so here I am setting the values of the perspective camera
    fieldOfView = 45,
    aspectRatio = 16 / 9,
    near = 1,
    far = 1000,
    cam = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far),
 
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();
 
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('cube').appendChild(renderer.domElement);
 
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
        cam.position.set(400, 400, 400);
        cam.lookAt(0, 0, 0);
 
        // setting a background color
        scene.background = new THREE.Color(.7, .7, .7);
 
        // 16:9 aspect ratio canvas
        renderer.setSize(320, 180);
 
    },
 
    // update method
    i = 0,
    iMax = 100,
    lt = new Date(),
    fr = 100,
    update = function () {
 
        var per = i / iMax,
        now = new Date(),
        bias = 1 - Math.abs(.5 - per) / .5;
 
        if (now - lt >= fr) {
 
            // changing aspect, and field of view
            cam.aspect = .5 + 1.5 * bias;
            cam.fov = 50 + 25 * bias;
 
            // I must call this to get it to work
            cam.updateProjectionMatrix();
 
            i += 1;
            i = i % iMax;
 
            lt = now;
 
        }
 
    },
 
    // loop
    loop = function () {
 
        requestAnimationFrame(loop);
 
        update();
        renderer.render(scene, cam);
 
    };
 
    // call init, and start loop
    init();
    loop();
 
}
    ());
```