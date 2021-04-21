---
title: Face3 and vertex color in threejs
date: 2019-06-03 18:46:00
tags: [js,three.js]
layout: post
categories: three.js
id: 471
updated: 2021-04-21 13:06:22
version: 1.7
---

It is time for me to revisit the [face3 constructor](/2018/05/11/threejs-face3/) in three.js, in fact I will be writing more content on threejs in general in the next few days. Todays post will be on [face3 color](https://stackoverflow.com/questions/51172095/change-the-color-of-mesh-created-using-face3), that is setting colors for each vertex in a face3 instance and how to use it with a material and mesh. In This post I will be going over some examples of the face3 constrictor in general, but this will mostly be on face3 color.

<!-- more -->

## THE CODE HERE WILL BREAK IF YOU ARE USING A NEW VERSION OF THREEJS (r125+)

The old code examples here will break if you are using a late version of threejs. The reason why is that the Face3 Constructor was removed from threejs in version r126, and in r125 the Geometry constructor which was closely related to face3 was also removed.

## 1 - Face3 color in vertices 

In order to use face3 vertex colors the vertexColors property of the material that is being used must be set to the THREE.FaceColors constant. A quick example of the use of face3 vertex colors might look something like this.

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(0, 0, -2);
camera.lookAt(0, 0, 0);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// FACE 3
var geometry = new THREE.Geometry();
geometry.vertices = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(1, 0, 0)
];
var colors = [
    new THREE.Color(0xff0000),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff)];
var normal = new THREE.Vector3(0, 0, 1);
// set a single color for a face3 instance
geometry.faces.push(new THREE.Face3(0, 1, 2, normal, colors[0], 0));
// set an array of colors for each vertex
geometry.faces.push(new THREE.Face3(3, 2, 0, normal, colors, 0));
geometry.computeVertexNormals();
geometry.computeFaceNormals();
 
console.log(geometry);
 
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
 
renderer.render(scene, camera);
```

The fifth parameter of the THREE.face3 constructor can be a single color that will set a color to be used for the whole face3 instance, or it can also be an array of colors that will be a color for each vertex in the geometry of the face3. This can then be used as a crude yet effective way of styling faces in a project.

## 2 - Set the vertex colors for an existing geometry

When creating a custom geometry the face3 constructor can be used directly and a single color or array of colors can be given when calling the face3 constructor. However when working with a geometry that all ready exists another way of setting the vertex colors or a single face color is by going over each instance of face3 and just set the color or vertexColors properties of each face3 instance.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.2, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// a box geometry
var box = new THREE.BoxGeometry(1, 1, 1);
// for each face3
box.faces.forEach(function (face3, i) {
    if (i % 2) {
        // vertex colors array
        face3.vertexColors = [
            new THREE.Color(0xff0000),
            new THREE.Color(0x00ff00),
            new THREE.Color(0x0000ff)];
    } else {
        // or just face color
        face3.color = new THREE.Color(0xffffff);
    }
});
 
var mesh = new THREE.Mesh(box,
        new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
renderer.render(scene, camera);
```