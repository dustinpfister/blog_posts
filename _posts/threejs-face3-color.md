---
title: Face3 and vertex color in threejs
date: 2019-06-03 18:46:00
tags: [js,three.js]
layout: post
categories: three.js
id: 471
updated: 2019-06-03 22:16:20
version: 1.2
---

It is time for me to revisit the face3 constructor in three.js, in fact I will be writing more content on threejs in general in the next few days. Todays post will be on [face3 color](https://threejs.org/docs/#api/en/core/Face3.color), that is setting colors for each vertex in a face3 instance and how to use it with a material and mesh. In This post I will be going over some examples of the face3 constrictor in general, but this will mostly be on face3 color.

<!-- more -->

## 1 - Face3 color in vertices 

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(0, 0, -2);
camera.lookAt(0, 0, 0);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// FACE 3
var geometry = new THREE.Geometry();
geometry.vertices = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0)
];
geometry.faces.push(new THREE.Face3(0, 1, 2, new THREE.Vector3(0, 0, 1), new THREE.Color(0x00ff00), 0));
geometry.computeVertexNormals();
geometry.computeFaceNormals();
 
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
 
renderer.render(scene, camera);
```
