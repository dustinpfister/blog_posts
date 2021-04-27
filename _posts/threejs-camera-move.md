---
title: Fun with moving a camera in threejs
date: 2019-12-17 19:57:00
tags: [three.js]
layout: post
categories: three.js
id: 582
updated: 2021-04-27 09:17:25
version: 1.11
---

Every now and then I like to play around with [threejs](https://threejs.org/) a little, it is a fun project to work with and life is short after all. One thing that is fun is working out expressions for handing the movement of a [camera](/2018/04/06/threejs-camera/) in a scene such as the [perspective camera](/2018/04/07/threejs-camera-perspective/) which is the one I typically use in most projects thus far. 

So in this post I will be writing about some threejs examples that have to do with using the position and rotation properties of an instance of a camera along with some javaScript expressions as a way to move a camera around in a scene. What applies for a camera will also apply to just about anything in three.js that inherits from the [Object3d](/2018/04/23/threejs-object32/) class.

<!-- more -->

## 1 - Moving a camera in three.js and what to know first

This is a post on how to move a camera in three.js a front end javaScript library that has to do with 3d modeling. This is not a getting started post on three.js, or javaScript in general so I assume that you have at least some background on this to get started with, otherwise you might have a hard time gaining something of value from reading this.

### 1.1 - Version Numbers matter with three.js

When I first wrote this post I was using r111 of three.js, and the last time I edited this post I was using r127. Three.js is a fast moving target when it comes to development, at some point in the future these three.js examples might break become of this.

### 1.2 - You should really look into the Object3d class when it comes to movement of objects in general in three.js

A camera in three.js inherits from a base class in three.js called [Object3d](/2018/04/23/threejs-object32/), which is also the case with many other objects that will be part of a scene such as Mesh, Group objects, and many helper objects.

## 2 - Basic threejs camera movement example that moves the camera via javaScript code

In this section I will be starting out with a basic threejs example that has to do with moving a camera. I pulled everything that has to do with moving the camera into a function to help keep things more fine grain with this kind of task, and for now it is a move camera method that is always looking at the origin of the scene.

### 2.1 - A move camera method

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

### 2.2 - Create a camera

Now that I have a move camera method worked out I need to create a camera.

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

### 2.3 The rest of the example

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

## 3 - Conclusion

So moving a camera is more or less the same as moving anything else in three.js that inherits from the Object3d class by making use of the position and rotation properties of the object, and cameras are no exception.
