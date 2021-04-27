---
title: Copy a mesh in threejs
date: 2019-12-18 17:31:00
tags: [three.js]
layout: post
categories: three.js
id: 583
updated: 2021-04-27 10:51:23
version: 1.7
---

The process of copying an object in javaScript can be tricky business, as such I have wrote a few posts on this when it comes to [cloning objects with lodash methods](/2017/10/02/lodash_clone/) as well as native javaScript by itself such as my post on [copying an array](/2020/09/03/js-array-copy/). However if I am making a threejs project and I want to copy a mesh object then I just need to use the [clone method of a mesh](https://threejs.org/docs/#api/en/objects/Mesh.clone) instance.

So then this will be a quick post on the mesh clone method in threejs that can be used as a way to create copies of a mesh object in threejs. While I am at it it might touch base on a few other topics here and there, but that will be the focal point today.

<!-- more -->

## 1 - What to know first before getting into copying a mesh

This is a post on a method of the clone method of a THREE.Mesh class instance in three.js. As such you should have at least some background when it comes to the basics of getting started with three.js and client side javaScript in general. If not chnaces are you might not gain much of anything from reading this.

## 2 - Mesh copy basic example

To copy a mesh in threejs all I need to do is just call the clone method of a mesh object instance, and what will be returned is a copy of that mesh. Here I have a simple example where I am creating an original mesh with the THREE.Mesh constructor, and then creating a bunch of copies with the clone method of the Mesh instance.

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(360, 180);
 
// MESH
var original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(original);
 
// Copy the mesh a bunch of times
var i = 0, mesh, rad, x, z;
while (i < 10) {
    mesh = original.clone();
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    scene.add(mesh);
    i += 1;
}
 
renderer.render(scene, camera);
```