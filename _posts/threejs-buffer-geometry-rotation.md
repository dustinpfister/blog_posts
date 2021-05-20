---
title: Buffer Geometry Rotation in three.js
date: 2021-05-20 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 871
updated: 2021-05-20 09:48:57
version: 1.3
---

When it comes to rotating things in three.js there is the rotation property of the object3d class that stores an instance of the Euler class. When it comes to a Mesh object that is based off of Object3d that can be used as a way to rotate the mesh as a whole. However it is also worth pointing out that the geometry of a mesh object can also be rotated independently of a mesh objects orientation also.

<!-- more -->


## 2 - Rotation of a cone geometry and using object3d.lookAt to have the point of the cone face something

A good starting example of buffer geometry rotation in combination with mesh object rotation might be to start out with an instance of the built in cone geometry constructor, and rotating that geometry so that it will work as expected when using the look at method of a mesh object. The basic idea here is to create a cone geometry and then use the rotateX method to rotate that geometry on the x axis by one half of the value of Math.PI. I can then use this geometry with a mesh object, and then when using the look at method of the mesh instance the point of the cone will be pointing to the location in world space given to the look at method.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
    // geometry
    var geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
    // Mesh
    var cone = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());
 
    // USING BUFFER GEOMERTY ROTATEX METHOD
    cone.geometry.rotateX(Math.PI * 0.5);
 
    cone.add(new THREE.BoxHelper(cone)); // adding a box helper
    scene.add(cone); // add custom to the scene
 
    // adding a cube to have the cone point to
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube.position.set(3, 0, 3);
    scene.add(cube)
 
    cone.lookAt(cube.position); // using Object3d (base class of Mesh) lookAt
 
    // camera render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(6, 8, 6);
    camera.lookAt(cone.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```