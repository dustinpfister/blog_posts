---
title: The Clock constructor in threejs
date: 2021-05-28 10:33:00
tags: [three.js]
layout: post
categories: three.js
id: 877
updated: 2021-05-28 10:48:29
version: 1.3
---

When it comes to making an animation loop in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) I have been using the built in JavaScript Date class along with request animation frame, but have not been making use of the Built in [THREE.Clock](https://threejs.org/docs/#api/en/core/Clock) constructor. Turns out that there are still a whole lot of basic features that I have not got around to looking into with three.js when it comes to this constructor and why it might be a good idea to go with this in place of the way that I have been making animation loops thus far. Still better late than never, so in this post I will be looking into the THREE.Clock constructor and also touching base on some client side javaScript features that are closely related to the class such as the [performance global](https://developer.mozilla.org/en-US/docs/Web/API/Performance) mainly the [now method](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) of that.

<!-- more -->

## 1 - THREE.Clock and what to know first

This is a post on using the THREE.Clock class in the javaScript library known as three.js. In this post I am also using a lot of other features of the library that I will not be getting into detail here.

## 2 - Basic loop example using THREE.Clock

To start out with the THREE.Clock class I made a basic example where I am usin the THREE.Clock class as a way to replace the use of the javaScript Date constructor.

```js
// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};
// a scene
var scene = new THREE.Scene();
// a mesh
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
// camera render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// START CLOCK
state.clock.start();
// loop
var loop = function () {
    // USING THE GET DELTA METHOD
    var secs = state.clock.getDelta();
    state.per = state.frame / state.maxFrame;
    requestAnimationFrame(loop);
    box.rotation.y = Math.PI * 2 * state.per;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    renderer.render(scene, camera);
};
loop();
```

## 3 - Elapsed Time Demo

The get delta method is great for getting an amount of time that has elapse sense the last frame update, but if I want to get the total about of time that has elapsed sense the clock has started then there is the get elapsed time method. In this example I am still updating the rotation of a cube by way of the get delta method, but I am also rotating on anther axis over all time using get elapsed time.

```js
// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};
// a scene
var scene = new THREE.Scene();
// a mesh
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
// camera render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// START CLOCK
state.clock.start();
// loop
var loop = function () {
    // USING THE GET DELTA METHOD FOR SECS
    // AND GET ELAPSED TIME DELTA FOR TOTAL SECS
    var secs = state.clock.getDelta(),
    totalSecs = state.clock.getElapsedTime();
    requestAnimationFrame(loop);
    // rotating box on y by SECS
    state.per = state.frame / state.maxFrame;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    box.rotation.y = Math.PI * 2 * state.per;
 
    // rotating x by TOTAL SECS
    box.rotation.x = Math.PI / 180 * 45 * (1 / totalSecs);
 
    renderer.render(scene, camera);
};
loop();
```

## 4 - Conclusion

