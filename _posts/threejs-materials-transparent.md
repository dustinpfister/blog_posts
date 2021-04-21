---
title: Transparent Materials in threejs
date: 2021-04-21 14:03:00
tags: [three.js]
layout: post
categories: three.js
id: 850
updated: 2021-04-21 16:34:16
version: 1.4
---

In [threejs](https://threejs.org/) there are a few things to know about when it comes to making transparent materials, so I think it is called for to write a post on the topic. When it comes to working with just the Basic materials the process is not that hard at all actually. When creating the material I just need to set the transparent property of the material to true, and then it is just a matter of setting the desired opacity value for the material, and that is it.

<!-- more -->

## 1 - Basic Transparency of the whole mesh with the Basic Material

If I just want to make a whole mesh transparent, and I am not doing anything fancy with lights, alpha maps, and so forth. Then transparency is not that hard to get up and running, all I have to do is set the transparency boolean of the basic materials to true. After that all I have to do is set or change the opacity property of the mesh to set the level of transparency for the mesh.

```js
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
 
var materials = {};
 
materials.sand = new THREE.MeshBasicMaterial({
        color: 'yellow'
    });
 
materials.glass = new THREE.MeshBasicMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
 
var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);
 
// scene
var scene = new THREE.Scene();
 
scene.add(glassCube);
scene.add(cube);
 
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0.9, 0, 3.5);
camera.lookAt(-1, 0, 0);
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 2 - Using a light source and the standard material

Things get a little more involve when using a light source, when this is the case I will have to use a material that will respond to light. Once such material is the standard material rather than the basic material. Then I am going to need to add at least one light source, there are a number of options for that, the one I often go for is a point light. This is is a nice direction light that will shine light in all directions form the position at which it is located.

```js
// create a cube
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
 
var materials = {};
// Using the standard material
materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
 
var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);
 
// scene
var scene = new THREE.Scene();
 
// adding a point light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, -5, 5);
scene.add(pointLight);
 
// add cubes
scene.add(glassCube);
scene.add(cube);
 
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0.9, 0, 3.5);
camera.lookAt(-1, 0, 0);
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - canvas elements and alpha maps

Another kind of transparency is to get into using [alpha maps](/2019/06/06/threejs-alpha-map/) this is a kind of texture map that can be added to a mesh to set locations in a face that should be transparent.


## 4 - Conclusion

So then transparency is something that can be set for a material as a whole, but it can also be set in at a texture level also when it comes to alpha maps.