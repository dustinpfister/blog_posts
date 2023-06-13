---
title: Extrude Geometry in threejs
date: 2023-06-13 09:32:00
tags: [three.js]
layout: post
categories: three.js
id: 1051
updated: 2023-06-13 09:57:22
version: 1.0
---

The [THREE.ExtrudeGeometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) class in threejs is one of the built in geometry classes that can be used to create a buffer geometry from a [THREE.Shape](https://threejs.org/docs/#api/en/extras/core/Shape) object. The other built in option to create a geometry form a shape is the [THREE.ShapeGeometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry) class that is just a simple plain of the 2d shape.

Getting started with this feature of threejs is easy enough when it comes to just creating a simple shape object and passing that as the first argument and just going with that. However there is a whole lot more beyond just that of course and just like everything else in threejs this can quickly turn into a major time and energy sucking black hole if one allows it to turn into that. This might prove to be the case with far more advanced topics that branch off from Extrude geometry when it comes to the topic of the custom UV generator option of the geometry constructor for example.

<!-- more -->


## 1 - Basic examples of Extrude Geometry

For this Basic section I am going to just write about a few basic examples of extrude geometry. This will then have to involve at least a few examples of how to create a Shape Object to begin with, as well as touch base on some of the additional options when calling THREE.ExtrudeGeometry. However I will not be writing about some of the options, mainly the option for a custom UV generator as that is without question way to complex for a basic section.

### 1.1 - Create the Shape from a vector2 array

One way or another, in order to create an Extrude Geometry I first need to have a Shape object to pass as the first option. One way to create a shape object is to call THREE.Shape, and pass an array of vector2 objects as the first argument.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// VECTOR2 POINTS / SHAPE
// ---------- ----------
const v2array = [
    new THREE.Vector2( 0.0,  -0.8),
    new THREE.Vector2( 0.5,   0.0),
    new THREE.Vector2( 0.0,   0.8),
    new THREE.Vector2(-1.5,   0.0)
];
const shape = new THREE.Shape(v2array);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.ExtrudeGeometry(shape);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial() );
scene.add(mesh1)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(-0.3, 0, 0);
renderer.render(scene, camera);
```

### 1.1 - Create The Shape by way of using Paths

Taking a look at the threejs source code for THREE.Shape it would seem that the Shape class does in fact extend the base THREE.Path class. So one way to create a shape object to use to make extrude geometry would very much be to pass an array of vector2 objects, however another way is to just create a blank THREE.Shape object and just start using these [Path class prototype methods](https://threejs.org/docs/#api/en/extras/core/Path).

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHAPE / PATH
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo(  0,-1 );
shape.bezierCurveTo( 0.25,-0.25,    0.25,0,    1,0 );
shape.lineTo(  1,1 );
shape.lineTo( -1,1 );
shape.bezierCurveTo(-2,0,   -2,-1,   0,-1 );
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.ExtrudeGeometry(shape);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial() );
scene.add(mesh1)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(-0.3, 0, 0);
renderer.render(scene, camera);
```

