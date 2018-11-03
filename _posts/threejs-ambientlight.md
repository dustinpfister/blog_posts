---
title: Setting some ambient light in three.js
date: 2018-11-02 20:04:00
tags: [js,three.js]
layout: post
categories: three.js
id: 319
updated: 2018-11-02 20:46:12
version: 1.5
---

When making a [three.js](https://threejs.org/) project, and working with materials that respond to light such as the standard material it might be desirable to add some [ambient light](https://threejs.org/docs/index.html#api/en/lights/AmbientLight) to a scene. Ambient Light differs from other light sources in that it will evenly illuminate materials even;y from all directions. This is very different from spot lights or point lights that radiant out light from a certain point in space and only illuminate surfaces that strike the surfaces that they come in contact with.
<!-- more -->

## 1 - What to know

This is a post on adding [ambient light](https://en.wikipedia.org/wiki/Shading#Ambient_lighting) to a three.js project. This is not a getting started post on three.js or javaScript in general, but being aware of ambient light is just one of several options when it comes to adding a light source to a three.js project, so it is something that one should at least be aware of.

## 2 - Basic example of ambient light

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
 
// MESH
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);
 
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
//renderer.physicallyCorrectLights = true;
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```
