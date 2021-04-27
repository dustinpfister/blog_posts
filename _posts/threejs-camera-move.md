---
title: Fun with moving a camera in threejs
date: 2019-12-17 19:57:00
tags: [three.js]
layout: post
categories: three.js
id: 582
updated: 2021-04-27 09:54:23
version: 1.21
---

Every now and then I like to play around with [threejs](https://threejs.org/) a little, it is a fun project to work with and life is short after all. One thing that is fun is working out expressions for handing the movement of a [camera](/2018/04/06/threejs-camera/) in a scene such as the [perspective camera](/2018/04/07/threejs-camera-perspective/) which is the one I typically use in most projects thus far. 

So in this post I will be writing about some threejs examples that have to do with using the position and rotation properties of an instance of a camera along with some javaScript expressions as a way to move a camera around in a scene. What applies for a camera will also apply to just about anything in three.js that inherits from the [Object3d](/2018/04/23/threejs-object32/) class.

<!-- more -->

## 1 - Moving a camera in three.js and what to know first

This is a post on how to move a camera in three.js a front end javaScript library that has to do with 3d modeling. This is not a getting started post on three.js, or javaScript in general so I assume that you have at least some background on this to get started with, otherwise you might have a hard time gaining something of value from reading this.

### 1.1 - Version Numbers matter with three.js

When I first wrote this post I was using r111 of three.js, and the last time I edited this post I was using r127. Three.js is a fast moving target when it comes to development, at some point in the future these three.js examples might break because of this. So be sure to always check the version number of three.js when working with these examples, or any three.js examples on the open web for that matter.

### 1.2 - You should really look into the Object3d class when it comes to movement of objects in general in three.js

A camera in three.js inherits from a base class in three.js called [Object3d](/2018/04/23/threejs-object32/), which is also the case with many other objects that will be part of a scene such as Mesh, Group objects, and many helper objects. So my learning how to work with the Object32 class you in turn learn how to work with everything to which is built on top of Object3d which includes cameras.

The main property of interest with the Object3d class in the position property which is an instance of a class known as [Vector3](/2018/04/15/threejs-vector3/), which in turn is another class of interest that applies to many things in three.js when it comes to positions of things. The set method of an instance of this Vector3 class is one way to set the position of a camera when it comes to the position property. However there is also changing the orientation of the camera when doing so, for this there is the rotation property that is also part of the Object3d class. This rotation property is an instance of the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) which is like Vector3, only we are taking angles rather than a matrix position. There is working with this instance of THREE.Euler dirrectly, or there is making use of a method like the [Object3d.lookAt](https://threejs.org/docs/#api/en/core/Object3D.lookAt) method.

All of these classes are worth looking into in depth in order to really know how to move things around, not just cameras but many objects in general.

### 2 - You might want to check out the Three.js orbit controls, and other official controls first

When it comes to moving a camera the first thing you might want to figure out is if you just want to move about in the scene using the mouse. I often use the Orbit Controls that are in the examples folder of the Three.js repository for many of my examples as a way to be able to have the basic typical movement right away. There are also a number of other options when it comes to official controls use in the official three.js examples, as well as many other useful libraries to work with in the examples folder.

However when it comes to moving a camera by way of some kind of application loop, or working out custom controls that will work a little differently from that of the orbit controls. Then it would make sense t start working out some examples like the ones in this post here. Still of you think that the official orbit controls will work okay, and you just want to move on to other things you might want to check out my post on [orbit controls](/2018/04/13/threejs-orbit-controls/).

## 3 - Basic threejs camera movement example that moves the camera via javaScript code

In this section I will be starting out with a basic threejs example that has to do with moving a camera. I pulled everything that has to do with moving the camera into a function to help keep things more fine grain with this kind of task, and for now it is a move camera method that is always looking at the origin of the scene by using the look at method. So nothing major or fancy here, just a kind of hello world when it comes to moving a camera.

### 3.1 - A move camera method

Here is the move camera method for this example. I made it so that I just have to pass a reference to the camera that I want to move, and then a percent value in the form of a value between zero. The percent value is what is used to set the position of the camera by making it so a radian value is set between 0 and PI2. This radians value is then used in additional expressions to find x y and z.

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
```

### 3.2 - Create a camera

Now that I have a move camera method worked out I need to create a camera to pass to this helper function. When doing so there are a number of arguments to be aware of when using the perspective camera. There is the field of view, aspect ratio, and the near and far render settings for the camera.

```js
// CAMERA
var width = 360,
height = 180,
fieldOfView = 40,
aspectRatio = width / height,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
```

### 3.3 The rest of the example

So then now I just need to work out the rest of the example when it comes to a scene, renderer, a mesh to look at, and a main app loop that makes use of the move camera method.

```js
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

This results in the camera moving around the mesh at the origin, and having the camera continue to look at the origin. A similar effect could be achieved by keeping the camera fixed, and rotating the mesh rather than the camera. However never the less this is one way to go about seeing all sides of the mesh.

## 4 - Conclusion

So moving a camera is more or less the same as moving anything else in three.js that inherits from the Object3d class by making use of the position and rotation properties of the object, and cameras are no exception.
