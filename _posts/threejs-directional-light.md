---
title: directional light in three js
date: 2019-06-03 18:46:00
tags: [js,three.js]
layout: post
categories: three.js
id: 472
updated: 2019-06-05 11:23:05
version: 1.2
---

In three js there is an option to use directional light with is one of several types of light to choose from. A directional light is like ambient light in the sense that it is a good way to go about simulating day light, but it is not the same thing as the light is coming from a certain direction to a certain target location, rather than just a base light intensity for all materials in a scene as is the case with ambient light. A directional light is also like a spot light in the sense that it is coming from a certain location to a certain target location, but not in a cone like manner.

<!-- more -->

## 1 - Directional Light threejs example

So here we have a basic example of a directional light as a way to have some light in a scene that will work with a material that responds to light.

```js
// SCENE
var scene = new THREE.Scene();
// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,2,3);
scene.add(dl);
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, 0, 0);
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
// Something in the scene
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
scene.add(mesh);
// render
renderer.render(scene, camera);
```