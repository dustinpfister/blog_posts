---
title: The Face3 constructor in three.js
date: 2018-05-11 12:58:00
tags: [js,three.js]
layout: post
categories: three.js
id: 185
updated: 2018-05-11 14:17:09
version: 1.0
---

The [Face3 constructor](https://threejs.org/docs/#api/core/Face3) in [three.js](https://threejs.org/) is used to define a Face when [making a custom geometry](/2018/04/14/threejs-geometry/). When using any kind of built in geometry, instances of Face3 are created automatically, but whenever making a custom geometry from code, or trying to figure out some problems that may exist with how faces are being rendered it is necessary to understand a few things about Face3.

<!-- more -->

## Basic Example of Face3

For a basic demo of face3 I put together an example where I am just making a single triangle from an array of just three vertices. The [Geometry constructor](/2018/04/14/threejs-geometry/) is used to create an instance of geometry, once I have that I will want to populate the instnace of geometry with vertices by adding an array of [Vector3](/2018/04/15/threejs-vector3/) instances. Vector3 of course is another constructor that is used in three.js to create a point in space.

Once I have an array of vertices I will want a way to define faces that exist between them, this is where Face3 comes into play. The first three arguments given to Face3 are the index values in the vertices array that I want to make a triangular face with. The order of the index values does matter as it is used to determine the orientation of the face when it comes to rendering a texture to the face, more on that later.

So for now I have something like this:

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 2, 1);
    camera.lookAt(0, 0, 0);
 
    // GEOMETRY
    var geometry = new THREE.Geometry();
 
    // vertices made with Vector3
    geometry.vertices = [
        new THREE.Vector3(-1, -1, 0),
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(1, 1, 0)
    ];
 
    // face 3 arguments assigned to variable with comments
    var a = 0, // vert index a
    b = 1, // vert index b
    c = 2, // vert index c
    normal = new THREE.Vector3(0, 0, 1), // this sets the face normal
    color = new THREE.Color(0xffaa00), // sets a face color
    materialIndex = 0, // useful when working with an array of materials
 
    // FACE3 example
    face = new THREE.Face3(a, b, c, normal, color, materialIndex);
 
    //add the face to the geometry's faces array
    geometry.faces.push(face);
 
    // compute face and vertex normals
    geometry.computeVertexNormals();
    geometry.computeFaceNormals();
 
    // create a mesh using the geometry
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    // adding face and vertex normals helper so I can
    // see what is going on with the normals
    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```