---
title: Setting the rotation of objects in threejs
date: 2022-04-08 12:53:00
tags: [three.js]
layout: post
categories: three.js
id: 976
updated: 2022-04-08 13:00:50
version: 1.1
---

The [rotation property of the object3d class in threejs](https://threejs.org/docs/#api/en/core/Object3D.rotation) stores and instance of the [THREE.Euler class](/2021/04/28/threejs-euler/) and stores the current rotation, or orientation of an object. Sense this is a property of the base class known as Object3d the rotation property can be used to set the rotation of Mesh Objects, Groups, Cameras, and just about anything else that is based off of the Object3D class including event a whole Scene Object.

<!-- more -->

## The rotation property of the object3d class and what to know first

### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs.

### The Source code example in this post are on github

## 1 - Basic example of the rotation property of Object3d

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCube = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    [-45, 0, 45, 20].forEach(function(d, i, arr){
        var cube = mkCube(),
        p = i / (arr.length - 1 );
        cube.position.set(-3 + 6 * p, 0, 0);
        cube.rotation.y = THREE.MathUtils.degToRad(d);
        scene.add(cube);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
 
}
    ());
```

## 2 - Animation example of rotation

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCube = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    var theCubes = new THREE.Group();
    scene.add(theCubes);
    [-45, 0, 45, 20].forEach(function(d, i, arr){
        var cube = mkCube(),
        p = i / (arr.length - 1 );
        cube.position.set(-3 + 6 * p, 0, 0);
        cube.rotation.y = THREE.MathUtils.degToRad(d);
        theCubes.add(cube);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
    // ---------- ----------
    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    // update
    var update = function(){
        var per = Math.round(frame) / frameMax,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        // rotating the group of cubes
        theCubes.rotation.y = Math.PI * 2 * per;
        // rotation of each child
        theCubes.children.forEach(function(cube, i){
            cube.rotation.x = Math.PI * 2 * ( 1 + i * 2) * per;
        });
    };
    // loop
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            update();
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 3 - Conclusion
