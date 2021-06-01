---
title: Shapes in threejs
date: 2021-06-01 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 879
updated: 2021-06-01 13:49:04
version: 1.7
---

Today I thought I would look into making a few quick examples of the [THREE.Shape](https://threejs.org/docs/#api/en/extras/core/Shape) constructor in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene). This Shape Constructor is a way to go about creating a 2d shape which can then in turn be used with THREE.ShapeGeometry, or THREE.ExtrudeGeometry. So then the shape geometry constructor might come in handy as a way to quickly and easily go about making some custom geometries that are just 2d geometries that can then be brought into a threejs project as a custom cut surface, or a solid object that is extended.

<!-- more -->

## 1 - The Shape Constructor and what to know first

This is a post on the THREE.Shape class in the javaScript library known as threejs, so it should go without saying that you should have at least some basic knowledge of these things in order to gain something of value from reading this post.

## 2 - Shape Constructor Basic example using the shape geometry

Maybe a good starting point with the Shape constructor would be to use it to create a simple triangle shape, and then use that with the Shape Geometry constructor.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
 
// make the shape
var tri = new THREE.Shape();
tri.moveTo(0, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
// geometry
var geometry = new THREE.ShapeGeometry(tri);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
// mesh
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Using the Extrude geometry constructor with THREE.Shape

The Shape geometry constructor works great if I want to create something that is just a flat surface, however another option would be to use the Extrude geometry constructor.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
 
// make the shape
var tri = new THREE.Shape();
tri.moveTo(0, 1);
tri.lineTo(1, -1);
tri.lineTo(-1, -1);
// geometry
var extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
var geometry = new THREE.ExtrudeGeometry(tri, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
// mesh
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.add(new THREE.BoxHelper(mesh));
// add the mesh to the scene
scene.add(mesh);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```