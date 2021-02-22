---
title: Point lights in threejs for shining light everywhere.
date: 2019-06-02 13:22:00
tags: [js,three.js]
layout: post
categories: three.js
id: 470
updated: 2021-02-22 13:56:52
version: 1.11
---

In three js there is a number of options when it comes to light sources for materials that respond to light, but my favorite option for the most part would be the three js [point light](https://threejs.org/docs/#api/en/lights/PointLight). This lighting option can be sued to shine light in all directions from a single given point. 

I often like to combine a point light with [ambient light](/2018/11/02/threejs-ambientlight/) as a way to have a base line amount of light for all materials, while still having a sense of depth that can be obtained by still having some kind of directional light source.

In this post I will be going over some quick examples of the point light in three js as well as touching base on some other three js related topics as well, so lets get to it.

<!-- more -->

## 1 - Point lights in threejs and what to know before hand

The example in this post is a little involved but so is any three.js project when it comes to all the various aspects of three.js that a developer needs understand in oder o do anything interesting with three.js. I assume that you have at least some background with three.js and javaScript in general as I will not be getting into the basics with three.js and javaScript here.

## 2 - A point light example in three.js

This example I put together makes use of a few point lights that shine light in all directions in a three.js scene. In addition to having some point lights in a scene there is also a need to have some objects in the scene as well, so for this example I also made a method that creates cubes as well. 

### 2.1 - The add point light method

Here I have a method that I used in this example to create a point light, add it to a given scene, and return a reference to that point light as well. A point light by itself will not display anything in the scene just shine light in all directions from the current location in which it is located. So for this example I added a Sphere for each point light as a way to see the current location of each point light in the example.

```js
var addPointLight = function (scene, color, x, y, z) {
    var pointLight = new THREE.PointLight(color);
    pointLight.position.set(x, y, z);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: color
            })));
    scene.add(pointLight);
    return pointLight;
};
```

### 2.2 - The add cube method

When creating any kind of mesh for these scene it is important to use a material that will respond to light of course, si I am using the standard material rather than the basic material for the cubes.

```js
// create some cubes
var addCube = function (scene, size, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x0f0f0f
        });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
};
```

### 2.3 - The scene setup

Now that I have some methods that I can used to create one or more point lights and some cubes for starters, lets used those methods to create a scene. I just create a new three.js scene with the THREE.Scebe constructor, and then I can use that scene with my add point light and add cube methods.

```js
var scene = new THREE.Scene();
// create some point lights and add it to the scene
var whitePointLight = addPointLight(scene, 0xffffff, 0, 0, 0),
redPointLight = addPointLight(scene, 0xff0000, 30, 0, 0),
greenPointLight = addPointLight(scene, 0x00ff00, 0, 30, 0),
bluePointLight = addPointLight(scene, 0x0000ff, 0, 0, 30);
// create some cubes
addCube(scene, 10, 15, 0, 0);
addCube(scene, 10, -15, 0, 0);
addCube(scene, 10, 0, 0, 15);
addCube(scene, 10, 0, 0, -15);
// need a camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(37, 37, 37);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
```

Here I can also setup a camera and the renderer as well. However I cam not calling the render method of the renderer here, I course if I just wanted to make it a static scene, but I want this example to be a cool little animation so I will do that in the loop of this project.

### 2.4 - The app loop

Here I have the loop of the project in which I will be rendering the current state of the scene as well as updating the scene as well.

```js
// loop
var frame = 0,
maxFrame = 180,
per,
bias,
loop = function () {
    setTimeout(loop, 33);
    per = frame / maxFrame;
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    r = Math.PI * 2 * per,
    sin = Math.sin(r) * 30,
    cos = Math.cos(r) * 30;
    // update point lights
    whitePointLight.position.y = 20 * bias;
    redPointLight.position.set(cos, sin, 0);
    greenPointLight.position.set(cos, 0, sin);
    bluePointLight.position.set(0, cos, sin);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= maxFrame;
};
loop();
```

## 3 - Conclusion

The point like is one of the typical light sources that I like to go with. Of often do like to add an additional mesh to the light so that I know where the light source is while I am at it. The other typical light source that I like to use is the ambient light, which is a way to just have a base amount of light for all the mesh objects in the scene.