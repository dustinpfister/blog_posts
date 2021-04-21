---
title: Transparent Materials in threejs
date: 2021-04-21 14:03:00
tags: [three.js]
layout: post
categories: three.js
id: 850
updated: 2021-04-21 16:15:15
version: 1.2
---

In [threejs](https://threejs.org/) there are a few things to know about when it comes to making transparent materials, so I think it is called for to write a post on the topic. When it comes to working with just the Basic materials the process is not that hard at all actually. When creating the material I just need to set the transparent property of the material to true, and then it is just a matter of setting the desired opacity value for the material, and that is it.

<!-- more -->

## 1 - Basic Transparency of the whole mesh with the Basic Material

If I just want to make a whole mesh transparent, and I am not doing anything fancy with lights, alpha maps, and so forth. Then transparency is not that hard to get up and running, all I have to do is set the transparency boolean of the basic materials to true. After that all I have to do is set or change the opacity property of the mesh to set the level of transparency for the mesh.

```js
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
 
var materials = {};
 
materials.sand = new THREE.MeshBasicMaterial({
        color: 'yellow'
    });
 
materials.glass = new THREE.MeshBasicMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
 
var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);
 
// scene
var scene = new THREE.Scene();
 
scene.add(glassCube);
scene.add(cube);
 
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0.9, 0, 3.5);
camera.lookAt(-1, 0, 0);
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```