---
title: Three js geometry cone examples
date: 2019-07-31 16:48:00
tags: [three.js]
layout: post
categories: three.js
id: 512
updated: 2019-07-31 17:28:00
version: 1.1
---

When it comes to [three js geometry](https://threejs.org/docs/#api/en/core/Geometry) there are a number of built in constructors that can be used to make most basic shapes. One of these is the cone geometry constructor.

<!-- more -->

## 2 - Three js geometry cone basic example

The cone Geometry constructor can accept a few arguments. However just the first two are the most important when it comes to a basic example at least. The first one is the radius of the base of the cone and then second is the height or length of the cone from the base to the tip.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
 
    // CONE
    var cone = new THREE.ConeGeometry(1, 7),
    matreial = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }),
    mesh = new THREE.Mesh(cone, matreial);
    scene.add(mesh);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```