---
title: Using an array of materials, and setting material index values in three.js
date: 2018-05-14 09:54:00
tags: [js,three.js]
layout: post
categories: three.js
id: 187
updated: 2018-05-14 20:57:34
version: 1.2
---

When working with a [mesh](/2018/05/04/threejs-mesh/) in [three.js](https://threejs.org/) a single instance of some kind of mesh material can be passed to the mesh constructor as the second argument. This is fine if you are okay with every face in the [geometry](/2018/04/14/threejs-geometry/) being skinned with the same material, otherwise you might want to pass an array of [materials](/2018/04/30/threejs-materials/) instead. When working with an array of materials there is a property of a [face3](/2018/05/11/threejs-face3/) instance in the geometry of the mesh that is of interest when setting the material index property of the faces. In this post I will be covering some basic demos of how to work with more than one material, and how to go about setting the material index values of a geometry.

<!-- more -->

## Basic Example of an array of materials, and face material index values.

A basic example of this would be to just have an array of instances of some kind of Mesh Material such as the Mesh Basic Material. Once I have an array the materials can be used by setting the material index value of all face3 instances in the geometry that I am using to point to the corresponding index of the material in the array of materials that I want to use with a given face.

```js
// An array of Materials
var materialArray = [
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    }),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    }),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff
    })
];
 
// Sphere
var geometry = new THREE.SphereGeometry(1, 15, 15);
 
// looping over all faces and setting the material index property
geometry.faces.forEach(function (face, i) {
 
    face.materialIndex = Math.floor(i % materialArray.length);
 
});
 
var sphere = new THREE.Mesh(
 
        geometry,
 
        materialArray);
 
scene.add(sphere);
```

Using modulo to get the remainder when diving the current face index over the length of materials will result in an effect where each material is used in an alternating fashion. I can write different expressions to get different effects, but you should get the basic idea. The process is to have a collection of materials, and then do what is necessary to see that each face is painted with the desired material.
