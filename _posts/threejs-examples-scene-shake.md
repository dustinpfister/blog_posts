---
title: Scene Shake threejs example
date: 2021-05-06 14:11:00
tags: [three.js]
layout: post
categories: three.js
id: 861
updated: 2021-05-06 15:50:00
version: 1.7
---

Today I made another [threejs example](/2021/02/19/threejs-examples/) this time a scene shake module that can be used to shake the whole scene. When I do so that way I just need to pass the scene object to a method that will apply the current state of a shake object to the scene object, and if I do not add the camera to the scene I can see the shake. In the event that I do need to add the camera to the scene then the shake object can be applied to ny object in three.js that is based off of the object3d class such as a group or a camera.

<!-- more -->

## 1 - The shake module three.js example and what to know first

In this post I am writing about a module that works on top of three.js to proved a way to create and update a screen or object shake effect. This is not a getting started type post on three.js, or any additional skills that are required in order to extract something of value from reading this. However in this section I will be briefly writing about a few things that you should know about before reading more.

### 1.1 - Version Numbers matter with three.js

When I made this shake module and the demos that make use of it I was using three.js version r127. In the future it is possible that the code examples here will break on newer versions of three.js as code breaking changes are made all the time to three.js. Always take care to note how old a post is, or any mentions of versions of external assets used when making use of code examples on the open web.

## 2 - The shake module

First off I will want to go over the shake module first before getting into any kind of demo that makes use of this module. This module had a public create method that I can use in a project to create an instance of a shake object, this object will contain data about the current state of the shake object. Main value of interest with the shake object are the active flag and values that have to do with the current intensity of the position and angle range of the shake effect.

```js
(function (api) {
 
    // degree to radian
    var deg = function (deg) {
        return Math.PI / 180 * deg;
    };
    // random pos value for an axis
    var rndPos = function (state) {
        var min = state.pos * -1,
        max = state.pos * 2;
        return min + max * Math.random();
    };
    // random pos value for an axis
    var rndDeg = function (state) {
        var min = deg(state.deg * -1),
        max = deg(state.deg * 2);
        return min + max * Math.random();
    };
 
    // create
    api.create = function (opt) {
        opt = opt || {};
        var shake = {
            pos: opt.pos === undefined ? 0.5 : opt.pos,
            deg: opt.deg === undefined ? 2.25 : opt.deg,
            euler: new THREE.Euler(0, 0, 0),
            vector: new THREE.Vector3(0, 0, 0),
            active: opt.active || false
        };
        return shake;
    };
 
    // just make a roll
    api.roll = function (shake) {
        shake.euler.x = rndDeg(shake);
        shake.euler.y = rndDeg(shake);
        shake.euler.z = rndDeg(shake);
        shake.vector.x = rndPos(shake);
        shake.vector.y = rndPos(shake);
        shake.vector.z = rndPos(shake);
    };
 
    // apply a new shake to object3d
    api.applyToObject3d = function (shake, obj3d) {
        // save home data
        if (!obj3d.userData.shakeData) {
            obj3d.userData.shakeData = {
                homeVector: new THREE.Vector3().copy(obj3d.position),
                homeEuler: new THREE.Euler().copy(obj3d.rotation)
            };
        }
        // if shake is active
        if (shake.active) {
            // copy shake.euler, and shake.vector to object
            obj3d.rotation.copy(shake.euler);
            obj3d.position.copy(shake.vector);
        } else {
            var sd = obj3d.userData.shakeData;
            obj3d.rotation.copy(sd.homeEuler);
            obj3d.position.copy(sd.homeVector);
        }
    }
 
}
    (this['ShakeMod'] = {}));
```

## 3 - base demo of the shake module where I am shaking the whole scene

Now that I have my shake module together I am going to want a little more javaScript code that will serve as a way to test this module out.

```js
(function () {
    // scene and grid helper
    var scene = new THREE.Scene();
    var gridHelper = new THREE.GridHelper(5, 5);
    scene.add(gridHelper);
    // box is a MESH base off of OBJECT3D
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0.5, 0);
    scene.add(box);
    // camera DO NOT ADD TO SCENE
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // state object
    var state = {
        frame: 0,
        maxFrame: 3000,
        fps: 30,
        lt: new Date(),
        shake: ShakeMod.create({
            deg: 5.25,
            pos: 0.1,
            active: true
        })
    };
 
    // events
    var pointerDown = function () {
        state.shake.active = false;
    };
    var pointerUp = function () {
        state.shake.active = true;
    };
    renderer.domElement.addEventListener('mousedown', pointerDown);
    renderer.domElement.addEventListener('mouseup', pointerUp);
 
    // update
    var update = function (state, secs) {
        if (state.shake.active) {
            state.shake.pos = 0.05 + 1.9 * state.bias;
            state.shake.deg = 0.50 + 18 * state.bias;
            ShakeMod.roll(state.shake);
        } else {
            state.frame = 0;
        }
        //ShakeMod.update(state.shake, secs);
        ShakeMod.applyToObject3d(state.shake, scene);
    };
 
    // loop
    var loop = function () {
        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        var now = new Date();
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {
            update(state, secs);
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
```