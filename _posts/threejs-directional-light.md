---
title: directional light in three js
date: 2019-06-03 18:46:00
tags: [js,three.js]
layout: post
categories: three.js
id: 472
updated: 2019-06-05 13:32:24
version: 1.6
---

In [three js](https://threejs.org/) there is an option to use [directional light](https://threejs.org/docs/#api/en/lights/DirectionalLight) with is one of several types of light to choose from. A directional light is like ambient light in the sense that it is a good way to go about simulating day light, but it is not the same thing as the light is coming from a certain direction to a certain target location, rather than just a base light intensity for all materials in a scene as is the case with ambient light. A directional light is also like a spot light in the sense that it is coming from a certain location to a certain target location, but not in a cone like manner.

<!-- more -->

## 1 - Directional Light threejs example

So here we have a basic example of a directional light as a way to have some light in a scene that will work with a material that responds to light. To create an instance of directional light in three js I just need to call the THREE.DirectionalLight constructor. When calling the constructor I can pass a color as the fist argument, and an intensity level as a value between zero and one as the second argument.

```js
// SCENE
var scene = new THREE.Scene();
// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
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

By default the position of the directional light is 0,1,0 and the target of the directional light is the origin at 0,0,0.

## 2 - Moving a directional light

A directional light like most lights and objects that are placed in a scene in three js inherits from the object 3d class, so it has a position property than can be used to set the position of the directional light to a point other than that of the default position.

```js
var scene = new THREE.Scene();

// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 15, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
var material = new THREE.MeshStandardMaterial({color: 0xff0000,emissive: 0x0a0a0a});
var mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),material);
mesh.position.y=2;
scene.add(mesh);
var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), material);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane)

// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;
 
    // change directional light position
    dl.position.set(Math.cos(r)*10, 2, Math.sin(r)*10);
 
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

Changing the position of the directional light is just on f two points of interest when it comes to changing the direction of the light. The other point of interest is the target property of the directional light that can also be changed to something other than the default as well.