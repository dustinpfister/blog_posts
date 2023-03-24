---
title: Quaternion rotation objects in threejs
date: 2023-03-24 06:28:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1033
updated: 2023-03-24 07:51:11
version: 1.1
---

There is a lot of ground to cover when it comes to quaternions in threejs, but one has to start somewhere with them so here we are.

<!-- more -->

## 1 - Some basic getting started examples of Quaternion objects

### 1.1 - Directly setting the quaternion of a mesh object using the set from axis method

When it comes to mesh objects, and any object3d class based object for that matter, there is directly working with the [quaternion property of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.quaternion). This is an alternative to the object3d rotation property which is an instance of Euler. As such any change to the quaternion should also update the state of the rotation property and vice versa.

Maybe the best way to get started with quaternion objects would be to start working with the set from axis angle method of the quaternion class. There is also diretcly working with the various properties but doing so is not as easy as what you might be used to with the Euler class.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// SETTING ROTATION WITH QUATERNION
// ---------- ----------
const axis = new THREE.Vector3( 1, 0, 0 );
const degree = 45;
mesh1.quaternion.setFromAxisAngle( axis.normalize(), THREE.MathUtils.degToRad(degree) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```
