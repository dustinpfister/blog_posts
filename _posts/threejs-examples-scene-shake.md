---
title: Scene Shake threejs example
date: 2021-05-06 14:11:00
tags: [three.js]
layout: post
categories: three.js
id: 861
updated: 2021-05-06 14:15:32
version: 1.1
---

Today I made another [threejs example](/2021/02/19/threejs-examples/) this time a scene shake module that can also be applied to anything that is based off of the object3d class.

<!-- more -->


## 2 - The shake module

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