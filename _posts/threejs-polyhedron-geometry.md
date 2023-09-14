---
title: Polyheadron Geometry in threejs
date: 2023-09-14 05:43:00
tags: [three.js]
layout: post
categories: three.js
id: 1071
updated: 2023-09-14 05:57:57
version: 1.0
---

There are a number of built in geometry classes that extend from the base geometry class such as BoxGeometry and SphereGeometry. There are also a number of such built in geometry classes that are an extension of an extension in this regard then as well. With that said and Dodecahedron, Icosahedron, Octahedron, and Tetrahedron are all extensions of the Polyhedron Geometry class. These geometry class work by passing a radius and a level of detail, but with one exception which is the root class of them all, Polyhedron Geometry, which takes additional arguments that are used to define the nature of the Polyhedron.

<!-- more -->


## 1 - Basic example of a Polyhedron

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
// GEOMETRY
// ---------- ----------
const vertices = [
    1,1,1,    -1,1,1,    1,-1,1,   1,1,-1
];
const indices_of_faces = [
    0,1,2,
    0,3,1,
    0,2,3,
    1,2,3
];
const radius = 1;
const detail = 3;
const geometry = new THREE.PolyhedronGeometry(vertices, indices_of_faces, radius, detail);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
```

## 2 - Built in Extensions of Polyhedron Geometry

### 2.1 - Dodecahedron Geometry


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
// GEOMETRY1 using PolyhedronGeometry to create a Dodecahedron
// ---------- ----------
const t = ( 1 + Math.sqrt( 5 ) ) / 2;
const r = 1 / t;
const vertices = [
    // (±1, ±1, ±1)
    - 1, - 1, - 1,   - 1, - 1, 1,
    - 1, 1, - 1, - 1, 1, 1,
     1, - 1, - 1, 1, - 1, 1,
     1, 1, - 1, 1, 1, 1,
     // (0, ±1/φ, ±φ)
    0, - r, - t, 0, - r, t,
    0, r, - t, 0, r, t,
    // (±1/φ, ±φ, 0)
    - r, - t, 0, - r, t, 0,
    r, - t, 0, r, t, 0,
    // (±φ, 0, ±1/φ)
    - t, 0, - r, t, 0, - r,
    - t, 0, r, t, 0, r
];
const indices = [
    3, 11, 7,    3, 7, 15,   3, 15, 13,
    7, 19, 17,   7, 17, 6,   7, 6, 15,
    17, 4, 8,   17, 8, 10,   17, 10, 6,
    8, 0, 16,    8, 16, 2,   8, 2, 10,
    0, 12, 1,    0, 1, 18,   0, 18, 16,
    6, 10, 2,    6, 2, 13,   6, 13, 15,
    2, 16, 18,   2, 18, 3,   2, 3, 13,
    18, 1, 9,   18, 9, 11,   18, 11, 3,
    4, 14, 12,   4, 12, 0,   4, 0, 8,
    11, 9, 5,   11, 5, 19,   11, 19, 7,
    19, 5, 14,  19, 14, 4,   19, 4, 17,
    1, 12, 14,   1, 14, 5,   1, 5, 9
];
const radius = 1.5;
const detail = 0;
const geometry1 = new THREE.PolyhedronGeometry(vertices, indices, radius, detail);
// ---------- ----------
// GEOMETRY2 using DodecahedronGeometry to create a Dodecahedron
// ---------- ----------
const geometry2 = new THREE.DodecahedronGeometry(radius, detail);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry1, new THREE.MeshNormalMaterial() );
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geometry2, new THREE.MeshNormalMaterial() );
mesh2.position.x = -4;
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5, 2, 5);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
```