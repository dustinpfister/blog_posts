---
title: Three js Box Helper
date: 2019-06-10 21:11:00
tags: [js,three.js]
layout: post
categories: three.js
id: 475
updated: 2019-06-10 21:14:46
version: 1.1
---

In threejs there is a built in box helper that can be used to help when it comes to debugging things.

<!-- more -->

## 1 - Box helper basic example in threejs

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
var sphere = new THREE.SphereGeometry();
var object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
var box = new THREE.BoxHelper(object, 0xffff00);
scene.add(box);
 
var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
scene.add(mesh);
renderer.render(scene, camera);
```