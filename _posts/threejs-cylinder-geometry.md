---
title: Cylinder Geometry threejs example
date: 2022-08-12 08:32:00
tags: [three.js]
layout: post
categories: three.js
id: 1000
updated: 2022-08-12 10:30:13
version: 1.2
---

I took the time to write a post or two on some of the various built in geometry constructor functions that there are to work with in threejs such as the box geometry constructor. However I have not yet got around to writing one on cylinder geometry, so I though that this weeks post should be just a quick post on this constructor as well on top of the older ones that I have wrote. One interesting thing about the cylinder geometry constructor is that I can give both a top, and bottom radius and when doing so I can set a radius of zero for one of these which allows me to use this is a replacement for the cone geometry constructor. So like many of the other built in geometry constructors I can make a few shapes other than that of a cylinder actually depending on the argument values that I give when calling it.

<!-- more -->

## Cylinder Geometry and what to know first

### Source code is on Github

### Version numbers matter

## 1 - A Basic Cylinder geometry example

```js
//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 3, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********
var geo = new THREE.CylinderGeometry(1, 1, 3, 10, 10);
var mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
scene.add(mesh);
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```

## 2 – Making a Cone with Cylinder Geometry

A while back I did write a blog post on the cone geometry constructor as a way to make cone shapes. However it would seem that the cylinder geometry constructor can also be used to make this kind of shape, and thus proves to be a little more flexible when it comes to making various typical shapes for a scene.

When calling the cylinder geometry constructor as covered in the basic example the first two arguments that I give are used to set the top, and bottom radius values. So then to make a cone shape I just need to set a value of zero for one of these first two arguments.

```js
//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********
 
// some values for a cone
var rTop = 0,
rBottom = 1,
length = 3;
 
// making a cone with CylinderGeometry
var geo1 = new THREE.CylinderGeometry(rTop, rBottom, length, 20, 20);
var mesh1 = new THREE.Mesh(geo1, new THREE.MeshNormalMaterial());
scene.add(mesh1);
 
// making a cone with ConeGeometry
var geo2 = new THREE.ConeGeometry(rBottom, length, 20, 20);
var mesh2 = new THREE.Mesh(geo2, new THREE.MeshNormalMaterial());
mesh2.position.set(0, 0, 3);
scene.add(mesh2);
 
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```

## 3 - Groups and cylinder geometry

```js
//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(3, 4, 1);
scene.add(dl);
 
//******** **********
// MESH
//******** **********
 
var materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000}),
    new THREE.MeshStandardMaterial({ color: 0x00ff00}),
    new THREE.MeshStandardMaterial({ color: 0x00ffff})
];
 
var mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
scene.add(mesh1);
 
var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
mesh2.position.set(0, 0, 1);
mesh2.rotation.z = Math.PI * 0.6;
scene.add(mesh2);
 
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```

## Conclusion

