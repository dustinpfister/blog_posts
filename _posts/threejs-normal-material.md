---
title: The normal material in threejs
date: 2021-06-23 12:54:00
tags: [three.js]
layout: post
categories: three.js
id: 895
updated: 2021-06-23 12:56:57
version: 1.1
---

One of the materials that I might use as a kind of place holder material in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) would be the normal material.

<!-- more -->

## 2 - Basic example using the normal material

```js
// scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
 
// BOX MESH USING THE NORMAL MATERIAL
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 3, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```