---
title: Compute Vertex Normals for Buffer Geometry in threejs
date: 2022-04-22 10:22:00
tags: [three.js]
layout: post
categories: three.js
id: 980
updated: 2022-04-22 10:31:56
version: 1.1
---

The process of creating a custom geometry, or mutating a built in geometry in threejs might be a little involved, but still there is only so much to be aware of to get started. The first step might be to work out the positions attribute which is the values for the actual points in space. However after that when it is also a good idea to work out what the deal should be with the normals attribute. In some cases I might have to work this out manually, however in most cases just calling the compute vertex normals method will work just fine, which is what this post is about today.


<!-- more -->


## 1 - Basic compute vertex normals method example

When working with one of the built in geometry constructors the normals are worked out for me as that is part of making a comprehensive geometry constructor function. However when making a custom geometry from the ground up I will of course have to make attribute one way or another. For this basic example of the compute vertex normals method I am then just making a very simple geometry of a single triangle, and then calling the compute vertex normals method of the buffer geometry as a way to go about creating the normals attribute.

```js
(function () {
     // SCENE, CAMERA, RENDERER, and LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 0, 3);
    scene.add(dl);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                -1.0, 0.0, 0.0,
                1.5, 0.0, 0.0,
                1.0, 1.0, 0.0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // COMPUTE VERTEX NORMALS FOR THE GEMOERTY
    geometry.computeVertexNormals();
    // MESH with GEOMETRY, and STANDARD MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                side: THREE.DoubleSide
            }));
    scene.add(custom);
    // RENDER
    renderer.render(scene, camera);
}
    ());
```