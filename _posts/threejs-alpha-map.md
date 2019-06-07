---
title: Three js alpha maps
date: 2019-06-06 09:15:00
tags: [js,three.js]
layout: post
categories: three.js
id: 474
updated: 2019-06-06 21:39:59
version: 1.5
---

When working with materials in three js many of the materials support one or more types of maps for skinning the faces of a geometry one such map is an [alpha map](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.alphaMap). An alpha map is a gray scale texture where white areas of the texture will result in a face being fully opaque while black areas will result in the face being fully transparent.

<!-- more -->

## 1 - Alpha maps and what to know before hand

This is a post on three js the javaScript powered 3d modeling library, in addition it is on a very specific topic with three js which is of course alpha maps.

## 2 - Alpha map example in three js

So for a basic example of an alpha map in three js I have this example that makes used of a texture that is created from a canvas element. I just create a canvas and then make gray scale areas of the canvas, I then used the THREE.CanvasTexture constructor to create a texture that I can then use with the alpha map property of a material that supports alpha maps such as the Mesh basic Material.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.3, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// creating a texture with canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
// drawing gray scale areas
ctx.fillStyle = '#404040';
ctx.fillRect(0, 0, 32, 32);
ctx.fillStyle = '#808080';
ctx.fillRect(32, 0, 32, 32);
ctx.fillStyle = '#c0c0c0';
ctx.fillRect(0, 32, 32, 32);
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(32, 32, 32, 32);
var texture = new THREE.CanvasTexture(canvas);
 
// creating a mesh that is uing the Basic material
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            // using the alpha map property to set the texture
            // as the alpha map for the material
            alphaMap: texture,
            // I also need to make sure the transparent
            // property is true
            transparent: true,
            side: THREE.DoubleSide
        }));
scene.add(mesh);
renderer.render(scene, camera);
```

The transparent property of the material also needs to be set to true, and a renderer that supports transparency also needs to be used. The usual webGl renderer worked just fine fr me in this example.
