---
title: Matrix4 Objects in threejs
date: 2023-08-02 11:47:00
tags: [three.js]
layout: post
categories: three.js
id: 1065
updated: 2023-08-02 12:02:07
version: 1.0
---

As of late I have wrote a new post on the object loader in threejs, and I noticed that when using the toJSON method of an object3d class based object a matrix key is created. In addition there are no keys for position, rotation, quaternion, or scale in this output. This is because all of this can be stored as a single array value that in turn can be used to create an instance of the [Matrix4 class](https://threejs.org/docs/#api/en/math/Matrix4) which is the value for the matrix property of an object3d class based object.

Turns out that I have not played around with these matrix4 objects much just yet, so I thought that it would be good form to at least start a blog post on this subject to start with.


<!-- more -->

## 1 - Basic Matrix4 Examples

One will need to start somewhere when it comes to these Matrix4 objects, and with that said this section will be just that for this general threejs topic. There are just a few methods and features that are needed to get started that I will at least be touching base on here. Also I will be doing my best to keep these examples as simple as possible, leaving more advanced examples for later sections in the post.

### 1.1 - Getting started with Matrix4 with the compose method, and Object3d.applyMatrix4

Thus far I think the best way to get started with this is to use the compose method of the Matrix4 class. This compose method can be used to set the state of a Matrix4 object by passing a Vector3 object as the first argument that will be the position value, a quatrenion object as the second argument that will be orientation, and a final Vector3 object that will be the scale of the object. Once I create a new Matrix4 object I can call this compose method and then pass the arguments that I want to set the matrix state that I want. Then I will want to do something with that matrix4 object such as using it to set position, orientation, and scale of an Object3d class based object such as a mesh object. For this task I can use the apply matrix4 method of the object3d class to so just that.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild( renderer.domElement );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh_box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial() );
scene.add(mesh_box);
// ---------- ----------
// MATRIX4
// ---------- ----------
const matrix = new THREE.Matrix4();
// using the compose method, and Object3d.applyMatrix4
const v3_pos = new THREE.Vector3(0, 0.8, 0);
const q_ori = new THREE.Quaternion().setFromEuler( new THREE.Euler( 1, -0.5, 0) );
const v3_scale = new THREE.Vector3( 1, 0.1, 1 );
matrix.compose(v3_pos, q_ori, v3_scale);
mesh_box.applyMatrix4( matrix );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set( 2, 2, 2 );
camera.lookAt( mesh_box.position );
renderer.render(scene, camera);
```
