---
title: Three js Box Helper
date: 2019-06-10 21:11:00
tags: [js,three.js]
layout: post
categories: three.js
id: 475
updated: 2021-04-24 15:11:17
version: 1.11
---

In [three js](https://threejs.org/) there is a built in [box helper](https://threejs.org/docs/index.html#api/en/helpers/BoxHelper) that can be used to help when it comes to debugging tasks with a mesh, or anything else that inherits from the [Object3d Class](/2018/04/23/threejs-object32/) for that matter.

The box can be moved and rotated just like many other objects in three js, and it can also be resized as well. So lets take a look at some quick examples of the box helper in three js.

<!-- more -->

## 1 - Box helper basic example in threejs

A basic example of a box helper in three js might involve just calling the THREE.BoxHelper constructor by calling that constructor, however in order to do that I will first need something to use th box helper with. So to start off this example of the box helper I will first want something that inherits from the object3d class such as a mesh. With that said I will need a basic mesh consisting of some kind of geometry and a material, nothing fancy. So I just created a sphere geometry and used that with the normal material which does not require a light source to help keep things simple and to the point here.

Once I have my mesh object I can then pass that object as the first argument for the THREE.BoxHelper constructor, a second argument can then also be used to set the color of the box helper lines. Once the instance of the box helper is created it just needs to be added to the scene, or to a group or object that is in the scene. In this example I am adding the box helper to the mesh which also works.

```js
// a mesh
var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30), 
    new THREE.MeshNormalMaterial());
// add a box helper
mesh.add(new THREE.BoxHelper(mesh, 0xffffff));

// start a scene
var scene = new THREE.Scene();
// add the mesh to the scene
scene.add(mesh);

// everything else
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

This is a nice simple example of the box helper, but what about resizing the helper, and moving it as well. Lets take a look at some more examples of the box helper then.

## 2 - Moving an object with a Box Helper

When moving a box helper it is impotent to know if the box helper was added to a mesh or the scene. If a mesh that a box helper was created for is moved, but the box helper is added to the scene or any object or group outside of that mesh, then the box helper will not move with the mesh but will stay relative to the group or object that it was added to.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
var mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(2, 30, 30),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
scene.add(mesh1);
var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(2, 30, 30),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x0a0a0a
        }));
scene.add(mesh2);
 
// just add a helper to mesh1
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
 
var boxHelper = new THREE.BoxHelper(mesh2, 0xffffff);
scene.add(boxHelper);
 
// light
var light = new THREE.PointLight(0xffffff);
light.position.set(0, 3, 0);
scene.add(light);
 
var frame = 0, maxFrame = 48;
var loop = function () {
 
    setTimeout(loop, 1000 / 12);
 
    var per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
 
    // change position and rotation of mesh1
    // this also changes the position of the box helper
    // that is relative to the mesh
    mesh1.position.z = 5 * bias;
    mesh1.rotation.y = Math.PI * per;
 
    // when mesh2 is moved the boxHelper does not move
    // the reason why is that it was added to the scene
    // rather than mesh2
    mesh2.position.x = 10 * bias;
 
    renderer.render(scene, camera);
 
    frame += 1;
    frame %= maxFrame
 
};
loop();
```