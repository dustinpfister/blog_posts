---
title: Clamping a vector in threejs
date: 2021-06-16 12:45:00
tags: [three.js]
layout: post
categories: three.js
id: 890
updated: 2021-06-16 13:02:22
version: 1.4
---

When it comes to setting boundaries for objects in a threejs project there is often clamping the values of wrapping the values. That is that there is a situation in which there is a min value, a max value, and having a way to make sure that a value is always inside this range.

<!-- more -->

## 1 - What to know before hand

This is a post on using the Vector3 clamp method to clamp a vector between a min and max range.

## 2 - Basic example of the THREE.Vector3 clamp method.

So in this example I am using the Vector3 clamp method to just make it so that any value that I set for the position of a cube ends up getting clamped within a min and max Vector range.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(5, 5));
 
    // creating a mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    mesh.position.set(0, 0, -5);
    mesh.position.clamp(
        new THREE.Vector3(-2, 0, -2),
        new THREE.Vector3(2, 0, 2));
 
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