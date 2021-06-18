---
title: Apply Euler angles to a Vector3 in threejs
date: 2021-06-18 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 892
updated: 2021-06-18 09:37:00
version: 1.4
---

When it comes to moving and rotating objects around in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are two general classed that come to mind [THREE.Vector3](https://threejs.org/docs/#api/en/math/Vector3), and [THREE.Euler](https://threejs.org/docs/#api/en/math/Euler). The Vector3 class has to do with creating an object that represents a Vector in Vector space, and as such the Vector3 class is great for working with a set of numbers that have to do with a specific position in space. 

However a Vector can also be though of as a way to go about having a direction in space when it comes to the distance of the vector from the origin. In fact Vectors are often descried as being a direction and a magnitude, that is a normalized set of values between 0 and one for each axis that is then raised to what is often called a euclidean distance from the origin. There is another way of thinking about this though, such as having angels using the Euler class and using that as a way to set the position, or direction and magnitude of a Vector if you prefer.

So in this post I will be looking at the Vector3.applyEuler method and how it can be combined with various other Vector3 prototype methods to accomplish some various tasks.

<!-- more -->

## 1 - Applying a Euler angle to a Vector and what to know first

This is a post on the Apply Euler method in the Vector3 class and any additional subjects that might come up when it comes to using this method. 

## 2 - Basic Vector3.applyEuler example

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    // creating a cube and adding it to the scene
    var cube = createCube();
    scene.add(cube);
    // USING THE APPLY EULER Vector3 METHOD
    var e = new THREE.Euler(
        THREE.MathUtils.degToRad(45),
        THREE.MathUtils.degToRad(0), 
        THREE.MathUtils.degToRad(0));
    var v = new THREE.Vector3(1, 0, 0).applyEuler(e).normalize().multiplyScalar(3);
    cube.position.copy(v);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Animation example

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    var vectorFromAngles = function(a, b, c, len){
        len = len = undefined ? 1 : len;
        var e = new THREE.Euler(
            THREE.MathUtils.degToRad(a),
            THREE.MathUtils.degToRad(b), 
            THREE.MathUtils.degToRad(c));
        var v = new THREE.Vector3(0, 1, 0).applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var cube = createCube();
    scene.add(cube);
 
    var v = vectorFromAngles(90, 0, 0, 1);
    console.log(v);
    cube.position.copy(v);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lt = new Date(),
    a = 0,
    b = 0,
    c = 90,
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
 
        requestAnimationFrame(loop);
 
        if(secs > 1 / fps){
            b += 90 * secs;
            b %= 360;
            var v = vectorFromAngles(a, b, c, 1.5);
            cube.position.copy(v);
 
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
```