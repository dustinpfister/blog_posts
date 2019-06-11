---
title: Three js Box Helper
date: 2019-06-10 21:11:00
tags: [js,three.js]
layout: post
categories: three.js
id: 475
updated: 2019-06-11 18:43:16
version: 1.6
---

In [three js](https://threejs.org/) there is a built in [box helper](https://threejs.org/docs/index.html#api/en/helpers/BoxHelper) that can be used to help when it comes to debugging tasks with a mesh, or an Object3d instance. The box can be moved and rotated just like many other objects in three js, and it can also be resized as well. So lets take a look at some quick examples of the box helper in three js.

<!-- more -->

## 1 - Box helper basic example in threejs

A basic example of a box helper in three js might involve just calling the THREE.BoxHelper constructor by calling that constructor, and then passing the object that is to be boxed in with the helper in as the first argument. A second argument can then also be used to set the color of the box helper lines. Once the instance of the box helper is created it just needs to be added to the scene, or to a group or object that is in the scene of course, such as in this example right here.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
var mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30), new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
// add a box helper
mesh.add(new THREE.BoxHelper(mesh, 0xffffff));
scene.add(mesh);
 
// light
var light = new THREE.PointLight(0xffffff);
light.position.set(0,2,2);
scene.add(light);
 
renderer.render(scene, camera);
```

This is a nice simple example of the box helper, but what about resizing the helper, and moving it as well. Lets take a look at some more examples of the box helper then.

## 2 - Moving an object with a Box Helper

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
var mesh = new THREE.Mesh(new THREE.SphereGeometry(2, 30, 30), new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
var box = new THREE.BoxHelper(mesh, 0xffff00);
mesh.add(box);
scene.add(mesh);
 
// light
var light = new THREE.PointLight(0xffffff);
light.position.set(0, 3, 0);
scene.add(light);
 
var frame = 0, maxFrame = 48;
var loop = function () {
 
    setTimeout(loop, 1000 / 12);
 
    var per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
 
    // change position and rotation
    mesh.position.z = 5 * bias;
    mesh.rotation.y = Math.PI * per;
 
    renderer.render(scene, camera);
 
    frame += 1;
    frame %= maxFrame
 
};
loop();
```