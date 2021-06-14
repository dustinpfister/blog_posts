---
title: Normalizing Vectors in threejs
date: 2021-06-14 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 888
updated: 2021-06-14 13:19:26
version: 1.10
---

The [Vector3 class](/2018/04/15/threejs-vector3/) in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) has many prototype methods one of which is the [Vector3 normalize](https://threejs.org/docs/#api/en/math/Vector3.normalize) method. Calling the normalize method of a Vector3 instance will preserve the direction of the vector, but it will reduce the euclidean distance of the vector to a length of one. A Vector with a euclidean distance of one is often referred to as a unit vector, and what is nice about this kind of vector is that it can quickly be scaled up by just simply multiplying the values of the normalized vector by a desired magnitude that is any value other than one to result in any vector that is along a given line that is the direction of the vector.

Vectors are often described as being a unit of direction, and magnitude, the direction can be thought of as what the normalized vector is in terms of numbers between 0 and 1 for x, y, and z. This direction can then be raised, or lowered actually towards zero, by a magnitude to get any point in space. So then in this post I think I will be going over some basic examples of the normalize method, and while I am at it also end up writing about a few other topics that are closely related to the normalize method.

<!-- more -->

## 1 - Normalizing Vectors and what to know before hand

This is a post on using the Vector3 normalize method, and other related features in the javaScript library know as threejs. There are a great number of things that you should be aware of before continuing to read this. For one thing this is not any kind of getting started type post on threejs let alone javaScript in general. However in this section I will be going over a few key details that you might want to read up on more in detail in order to gain a better understanding of what the Vector3 normalize method is all about.

## 2 - Basic Vector3 normalize example

In this basic example I am creating an instance of THREE.Vector3 that is not normalized, and then just calling the normalized method of the Vector3 instance to get a normalized vector. The value of the Vector before normalizing it was -20, 0, 0, and the value after normalizing it is -1, 0, 0. So in other words the direction of the Vector is preserved but the length of the vector is reduced to a magnitude of 1. Once the vector is normalized I cal call a method like multiply scalar off of the normalized vector to set any desired magnitude, or distance if you prefer while preserving the direction of the Vector.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));
 
    var dir = new THREE.Vector3(-20, 0, 0);
    // NORMALIZING DIR FROM -20,0,0 to -1,0,0
    dir.normalize();
    console.log(Object.values(dir)); // [-1, 0, 0]
 
    // cube
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // MULTIPLYING DIR BY 2
    cube.position.copy( dir.multiplyScalar(2) );
    scene.add(cube);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Some more on the concept of length

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    var setPosByDirAndLength = function(obj, dir, len){
        var v = dir.normalize().multiplyScalar(len);
        return obj.position.copy(v);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var cube = createCube();
    scene.add(cube);
    var dir = new THREE.Vector3(-5, 5, -5);
    setPosByDirAndLength(cube, dir, 4);
    console.log( cube.position.length() ); // 4
 
    // CAMERA
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

## 4 - Placing an object on the surface of a sphere example

```js
(function () {
 
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
 
    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };
 
    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(cube, x, y, z, alt);
    };
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
 
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);
 
    var cube = createCube();
    scene.add(cube);
 
    //setOnSphereFromPos(cube, 5, 0, 0, 2);
    setOnSphere(cube, 0.1, 0.3, 2);
 
    cube.lookAt(0, 0, 0);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var lat = 0.1,
    long = 0,
    latDir = 1,
    lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
 
        requestAnimationFrame(loop);
 
        if(secs > 1 / fps){
            // call set on sphere for cube
            setOnSphere(cube, lat, long, 2);
 
            lat += 0.25 * secs * latDir;
            if(lat >= 1){
                lat = 1;
                latDir = -1;
                long += 1 / 30;
            }
            if(lat <= 0){
                lat = 0;
                latDir = 1;
                long += 1 / 30;
            }
            long %= 1;
 
            cube.lookAt(0, 0, 0);
 
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
```