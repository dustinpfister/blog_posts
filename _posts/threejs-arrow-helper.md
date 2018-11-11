---
title: Arrow helpers in three.js
date: 2018-11-10 09:42:00
tags: [js,three.js]
layout: post
categories: three.js
id: 327
updated: 2018-11-10 19:25:09
version: 1.7
---

For todays post on [three.js](https://threejs.org/) I thought I would write a quick bit on arrow helpers. In three.js there are a number of built in helper methods than can be used to quickly create structures that helper to visualize what is going on with orientation of objects. The [THREE.ArrowHelper](https://threejs.org/docs/#api/en/helpers/ArrowHelper) constructor is one such helper that can be used for visualizing directions in three.js.

<!-- more -->

## 1 - What to know

This is a post on using the built in arrow helpers in three.js to get a visual on directions. This is a fairly simple post but it is still not a getting started post on three.js, let alone javaScript in general.

### 1.1 - Version numbers matter

In this post I am using revision 98 of three.js, which was released in late October 2018. Three.js is still a project that is being developed, and at a fairly fast rate with new revisions continuing out what seems like every month.

### 2 - Example of ArrowHelper

So a basic example of an Arrow helper would involve setting a direction, origin, length, and color by passing those values to the THREE.ArrowHelper constructor in that order. The direction and origin should be insistences of THREE.Vector3. The length should be a number value consistent with the desired length relative to the other values of the camera and objects in the scene, and the color should be a hex value.

```js
// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0, 0, 3);
camera.lookAt(0, 0, 0);

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

// just render once
renderer.render(scene, camera);
```

### 2.1 - Change direction

It might also be of interest in how to go about changing direction of the arrow helper when working out an animation of some kind or anything to that effect. For this there is the setDirection method of the arrow helper instance.

```js
var frame = 0,
maxFrame = 500,
loop = function () {
 
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

## 3 - Conclusion

Thats are there is to it when it comes to arrow helpers in three.js for now. if you enjoyed this post you might want to check out my many other posts on three.js. In any case thank you for reading.
