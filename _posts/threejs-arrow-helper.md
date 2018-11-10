---
title: Arrow helpers in three.js
date: 2018-11-10 09:42:00
tags: [js,three.js]
layout: post
categories: three.js
id: 327
updated: 2018-11-10 09:58:45
version: 1.1
---

For todays post on [three.js](https://threejs.org/) I thought I would write a quick bit on arrow helpers. In three.js there are a number of built in helper methods than can be used to quickly create structures that helper to visualize what is going on with orientation of objects. The [THREE.ArrowHelper](https://threejs.org/docs/#api/en/helpers/ArrowHelper) constructor is one such helper that can be used for visualizing directions in three.js.

<!-- more -->

## 1 - What to know


```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
 
scene.add(new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the orgin
        new THREE.Vector3(0, 0, 0),
        // length
        2.5,
        // color
        0x00ff00));
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```


```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0, 0, 3);
camera.lookAt(0, 0, 0);

// Arrow helper
var arrow = new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the orgin
        new THREE.Vector3(0, 0, 0),
        // length
        2.2,
        // color
        0x00ff00);
 
scene.add(arrow);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
```

```js
var frame = 0,
maxFrame = 500;
var loop = function () {
 
    requestAnimationFrame(loop);
 
    var per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad),
    y = Math.sin(rad);
 
    var dir = new THREE.Vector3(x, y, 0).normalize();
    arrow.setDirection(dir);
 
    renderer.render(scene, camera);
 
    frame += 1;
    frame %= maxFrame;
 
};
 
loop();
```