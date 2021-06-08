---
title: The normal attribute for buffer geometries in threejs
date: 2021-06-08 14:41:00
tags: [three.js]
layout: post
categories: three.js
id: 884
updated: 2021-06-08 15:00:08
version: 1.4
---

Yesterday I wrote a post on the position attribute of a [buffer geometry](https://threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html) in threejs, and today I thought I would continue the trend by writing another post on an attribute of buffer geometry this time the normal attribute. the values in this attribute are used to find out what the direction is of each point of each triangle in an instance of buffer geometry. These values are then used when it comes to rendering textures for various materials such as with the normal material.

<!-- more -->

## 1 - The normals attribute in a buffer geometry, and what to know first

This is a post on the nature of the normal attribute in an instance of buffer geometry in the javaScript library known as threejs. This is just one of several core attributes of any given geometry in the library alone with position, and the uvs attribute. This is not a post on buffer geometry in general let alone any kind of getting started post on threejs and javaScript in general. So I assume that you have worked out at least some basic examples of threejs projects, and are not just at the point where you want to learn more about what the deal is with the normals attribute of a geometry.

## 2 - basic example of the normals attribute


```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                side: THREE.FrontSide //THREE.DoubleSide
            }));
 
    // check out the normal attribute of a cube
    var normal = geometry.getAttribute('normal');
    var position = geometry.getAttribute('position');
 
    // create and set up an arrow helper to find the direction of the first normal value
    var dir = new THREE.Vector3(normal.array[0], normal.array[1], normal.array[2]),
    origin = new THREE.Vector3(position.array[0], position.array[1], position.array[2]);
    var helper = new THREE.ArrowHelper(dir, origin, 1, 0x00ff00);
    helper.position.copy(origin);
 
    scene.add(mesh);
    scene.add(helper);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
 
}
    ());
```

## 2 - Mutating the values of the normals array

```js
(function () {
 
    var setNormal = function (geometry, normalIndex, pos) {
        var normal = geometry.getAttribute('normal');
        normal.array[normalIndex * 3] = pos.x;
        normal.array[normalIndex * 3 + 1] = pos.y;
        normal.array[normalIndex * 3 + 2] = pos.z;
        normal.needsUpdate = true;
    };
 
    // set a given arrow helper to the given normal index
    var setArrowHelperToNormal = function (geometry, arrowHelper, normalIndex) {
        // check out the normal attribute of a cube
        var normal = geometry.getAttribute('normal');
        var position = geometry.getAttribute('position');
        var values = normal.array.slice(normalIndex * 3, normalIndex * 3 + 3);
        var dir = new THREE.Vector3(values[0], values[1], values[2]);
        var values = position.array.slice(normalIndex * 3, normalIndex * 3 + 3);
        var origin = new THREE.Vector3(values[0], values[1], values[2]);
        arrowHelper.setDirection(dir);
        arrowHelper.position.copy(origin);
        arrowHelper.setColor(0x00ff00);
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                side: THREE.FrontSide //THREE.DoubleSide
            }));
    scene.add(mesh);
 
    var pos = {
        x: -1,
        y: -1,
        z: 0
    };
 
    var helper1 = new THREE.ArrowHelper();
    var helper2 = new THREE.ArrowHelper();
    var helper3 = new THREE.ArrowHelper();
    scene.add(helper1);
    scene.add(helper2);
    scene.add(helper3);
 
    var update = function () {
        setNormal(geometry, 0, pos);
        setNormal(geometry, 1, pos);
        setNormal(geometry, 2, pos);
        setArrowHelperToNormal(geometry, helper1, 0);
        setArrowHelperToNormal(geometry, helper2, 1);
        setArrowHelperToNormal(geometry, helper3, 2);
    };
    update();
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var radian = 0,
    dps = 22.5,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 30) {
            radian += Math.PI * 2 / 180 * dps * secs;
            pos.y = Math.sin(radian);
            pos.x = Math.cos(radian);
            update();
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```