---
title: Normalizing Vectors in threejs
date: 2021-06-14 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 888
updated: 2021-06-14 13:04:12
version: 1.4
---

The [Vector3 class](/2018/04/15/threejs-vector3/) in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) has many prototype methods one of which is the [Vector3 normalize](https://threejs.org/docs/#api/en/math/Vector3.normalize) method. Calling the normalize method of a Vector3 instance will preserve the direction of the vector, but it will reduce the euclidean distance of the vector to a length of one. A Vector with a euclidean distance of one is often referred to as a unit vector, and what is nice about this kind of vector is that it can esley be scaled up by just multiplying the values by a desired magnitude that is any value other than one.

<!-- more -->

## 2 - Basic Vector3 normalize example

In this basic example I am creating an instance of THREE.Vector3 that is not normalized, and then just calling the normalized method of the Vector3 instance to get a normalized vector.

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