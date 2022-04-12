---
title: The Math Utils in threejs
date: 2022-04-11 14:18:00
tags: [three.js]
layout: post
categories: three.js
id: 977
updated: 2022-04-12 08:04:13
version: 1.2
---

Baked into threejs there are a number of Math utilities that can be  used to helper with various tasks. This object is packed with a whole bunch of useful methods for typical tasks such as converting a degree value to a radian value for example. However there is not just thinking in terms of what there is to work with, but also what is missing. With that said I think I should also write about one or more additional things that are not in this math utils object, but should maybe be there, or in any case might have to do with a kind of custom math utils object.

<!-- more -->


## 1 - Basic example of threejs math utilities using degree to radian method

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // adding a mesh object
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT
    var radian = THREE.MathUtils.degToRad(20);
    var x = Math.cos(radian) * 5,
    z = Math.sin(radian) * 5;
    mesh.position.set(x, 0, z);
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```