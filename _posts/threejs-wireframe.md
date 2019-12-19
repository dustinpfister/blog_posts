---
title: Wire frames in threejs the basic material property and custom solutions
date: 2019-12-19 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 584
updated: 2019-12-19 12:51:41
version: 1.2
---

It is often desirable to set a material in a [wire frame](https://en.wikipedia.org/wiki/Wire-frame_model) type mode so that just the basic form of the object is apparent. Many materials in threejs such as the Basic material have a [wireframe property](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.wireframe) that when set to true will render the mesh in a wirefarme mode of sorts. That will work fine most of the time, but another solution might involve creating custom textures that can then be applied to another property of a material ushc as the map property in the basic material.

<!-- more -->


## 1 - Basic wire frame example as well as canvas texture powered custom wire frame


```js
// create a basic write frame cube
var createBasicWireCube = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        }));
};
```

```js
// create a canvas texture
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    draw = draw || function (ctx, canvas) {
        ctx.lineWidth = 1;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    };
    draw(ctx, canvas);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};
```

```js
// create a cube with a canvas as a texture
// the material is transparent and rendering is done on
// both sides.
var createCanvasWireCube = function () {
    var texture = createCanvasTexture();
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.2,
            map: texture,
            side: THREE.DoubleSide
        }));
};
```

```js
// Scene
var scene = new THREE.Scene();
 
// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(5, 5, 5);
camera.lookAt(1, 0, 0);
 
scene.add(createBasicWireCube());
var cube = createCanvasWireCube();
cube.position.set(3, 0, 0)
scene.add(cube);
 
// Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```