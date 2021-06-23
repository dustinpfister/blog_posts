---
title: The normal material in threejs
date: 2021-06-23 12:54:00
tags: [three.js]
layout: post
categories: three.js
id: 895
updated: 2021-06-23 13:58:40
version: 1.12
---

One of the materials that I might use as a kind of place holder material in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) would be the [normal material](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial). The normal material will render colors to the faces of a geometry by way of the state of the normal attribute of the buffer geometry. The normal attribute is an array of values that corresponds with the position attribute that is used to set what the direction is of each vertex rather than the position. The normal attribute is a must have attribute when it comes to using any material that has to do with light as the normal material is used for that, but it is also needed for a material such as the normal material.
The normal material can be used as a way to find out if there are problems with the normal attribute of a geometry as there is a certain look that an object should have when using it. However it might not be the best took for the job as there are other things to work with in the core of the threejs library such as arrow helpers. In addition there are additional external files that can be used on top of threejs that will add a kind of normal helper which might be the best tool for the job.

<!-- more -->

## 1 - The normal material and what you should know first

In this post I am going over a few javaScript source code examples that make use of the normal material in the library known as threejs. So I trust that you have at least some knowledge of how to get up and running with the very basic of threejs when it comes to linking to the library and creating a scene object and so forth. I will not be getting into the very basics of threejs let alone JavaScript in general here, but I will be quickly going over some things that you show read up more on if you have not done so before hand at this point.

### 1.1 - Version Numbers matter

When I first wrote this post I was using r127 of threejs.

## 2 - Basic example using the normal material

In this section I am going to be writing about a hello world of mesh normal material examples. So in a way this is just a very basic getting started example of threejs in general actually as I do still like to start out my threejs posts with very basic examples before getting into anything that might be a bot more advanced.

I start out the source code example by creating a scene object, and then after that I will want to create a mesh object and add that mesh object to the scene. When creating a mesh object I am going to want to pass a geometry as the girst argument, and then a material as the second argument. There is getting into creating a custom geometry, but when doing so I will need to create the normal attribute manually. So for this basic example I will be using one of the built in geometry constructors such as the THREE.BoxGeometry constructor, this will have the normal attribute set up to begin with.

```js
// scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
 
// BOX MESH USING THE NORMAL MATERIAL
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 3, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```