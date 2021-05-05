---
title: Cameras in three.js
date: 2018-04-06 11:14:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 168
updated: 2021-05-05 16:51:01
version: 1.13
---

If you want to make a [three.js](https://threejs.org/) project you are going to want to know a thing or two about how to go about working with cameras. A Camera must be created with one of several constructor options, once an instance of a camera is obtained it does not need to be added to the scene, although doing so might still generally be a good idea. However in any case at least one camera needs to be created that can be used with a render method in order to view anything in a scene.

In three.js there are a few cameras to work with, but typically you will want to work with a perspective camera most of the time, at least that is the one that I actually used in most projects thus far. A camera like many other objects in three.js inherits from the object3d class, which contains properties that can be used to set the position and orientation of the camera. In this post is about the camera class that is shared across all cameras, and can be thought of as a kind of home base for all content on cameras in three.js content on my site here at github pages.

<!-- more -->

## 1 - The Camera Class

The actual [Camera Class](https://threejs.org/docs/index.html#api/cameras/Camera) is the base Class for all camera used in three.js. This class just gives a few properties and methods for doing things like cloning the camera. I never use is directly, but it is the base class for all cameras in threejs.

## 2 - Camera Class Inherits from Object3D

All instances of Camera gain a whole bunch of common properties and methods from Object3D. This allows for me to easily work with the camera by using methods like lookAt.

## 3.1 - Perspective Camera

read full post on [perspective Camera](/2018/04/07/threejs-camera-perspective/)

The most commonly used camera might be the perspective camera, and if you are only going to stick with one, it might be a good idea to make it this one. The perspective camera mimics the way that the human eye actually sees, and often that is what is desired.

## 3.2 - Orthographic camera

Another option when it comes to cameras that I might actually use in a project is the [orthographic camera](/2018/05/17/threejs-camera-orthographic/).

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

There is much more to cover when it comes to cameras in threejs, however hopefully this post will help cover the basic of cameras at least.