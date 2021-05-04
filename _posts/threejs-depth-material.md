---
title: The Depth Material in threejs
date: 2021-05-04 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 859
updated: 2021-05-04 13:41:56
version: 1.6
---

The depth material in [threejs](https://threejs.org/) is a material that shows depth of a mesh object, it is based on the near and far values of a camera and of course the distance of that camera from the mesh. So in this post I thought I would write about a few examples about this kind of material, and in the process of doing so I think I will be touching base on some things that have to do with cameras also. For example there is adjusting the near and far values of a camera as a way to change how the depth material looks and when doing so a method needs to be called each time to update the projection matrix.

<!-- more -->

## 1 - The Depth Material and what to know first

This is a post on the depth material in three.js, as such I expect for you to at least understand the basics of creating a three.js project. If not there is looking into one or more getting started type posts on three.js, and also maybe javaScript in general.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js, always be aware of what version of three.js is being used in an example code braking changes are introduced with three.js often.

## 2 - Basic Depth Material example

First off there is starting with a basic example of what the deal is with the depth material. So there is creating a mesh with a geometry and an instance of the depth material. For that I just call the THREE.Mesh constructor and pass an instance of the bx geometry as the first argument, followed by and instance of the depth material by calling the THREE.MeshDepthMatreial constructor. I then save the resulting mesh to a variable called something like box, and then I can position that box by way of the position property that is an instance of vector3 by calling the set method of that class.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1, 1.5),
        new THREE.MeshDepthMaterial());
box.position.set(-0.25, 0, -0.25);
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.8, 2.5);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Changing the near and far values of a camera

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1, 1.5),
        new THREE.MeshDepthMaterial());
box.position.set(-0.25, 0, -0.25);
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.8, 2.5);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 100,
fps = 30;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
 
    requestAnimationFrame(loop);
 
    if (secs > 1 / fps) {
        // adjusting near and far values of the camera
        camera.near = 0.4 + 0.4 * bias;
        camera.far = 1 + 2 * bias;
        camera.updateProjectionMatrix();
 
        renderer.render(scene, camera);
        lt = now;
        frame += 1;
        frame %= maxFrame;
    }
};
loop();
```

## 4 - Conclusion

So the  the depth material is as the name suggests it is a way to go about showing some depth of on object without having to bother with directional light.
