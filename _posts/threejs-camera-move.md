---
title: Fun with moving a camera in threejs
date: 2019-12-17 19:57:00
tags: [three.js]
layout: post
categories: three.js
id: 582
updated: 2019-12-18 12:16:33
version: 1.3
---

Every now and then I like to play around with threejs a little, it is a fun project to work with and life is short after all. One thing that is fun is working out expressions for handing the movement of a camera in a scene. So in this post I will be writing about some threejs examples that have to do with using the position and rotation properties along with expressions as a way to move a camera around in a scene.

<!-- more -->

## 1 - Basic threejs camera movement example

In this section I will be starting out with a basic threejs example that has to do with moving a camera. I pulled everything that has to do with moving the camera into a function to help keep things more fine grain with this kind of task, and for now it is a move camera method that is always looking at the origin of the scene.

### 1.1 - A move camera method

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

### 1.2 - Create a camera

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

### 1.3 The rest of the example

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