---
title: Color in threejs
date: 2021-05-03 12:32:00
tags: [three.js]
layout: post
categories: three.js
id: 858
updated: 2021-05-03 12:45:38
version: 1.6
---

When it comes ton[threejs](https://threejs.org/) it looks like I never got around to writing a quick post about some examples of the [THREE.Color](https://threejs.org/docs/#api/en/math/Color) constructor. This constructor can be used to create a class object instance that represents a specific color. When it comes to color in three.js there are a number of places here and there where I might want to use this constructor to create a color. Such as setting the background color, a fog color, and the plain color and emissive colors of a material. So in this post I will be going over a number of typical use case examples of the THREE.Color constructor, and will also likely touch base on a number of other topics while in the process of doing so.

<!-- more -->

## 1 - THREE.Color and what to know first

This is a post on the THREE.Color constructor in three.js that is used to create an object that represents a certain color. This is not a post on the basics of getting started with three.js, and client side javaScript in general, so I assume that you have at least some background, and just want to learn more about color in three.js.

### 1.1 Version Numbers matter with three.js

When I first wrote this post I was using r127 of three.js.

## 2 - Basic color example

So first things first how about a basic use case example of the THREE.COlor constructor where I am just setting the regular color of a materials of a cube created with the Box geometry constructor.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 0, 0)
        }));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.2, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Color and Emissive Color

```js
// creating a scene
var scene = new THREE.Scene();
 
// Box With a material that uses a color, and emissive color
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            emissiveIntensity: 0.8,
            emissive: new THREE.Color(1, 0, 0)
        }));
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
renderer.render(scene, camera);
```

## 4 - Background and Fog

```js
// creating a scene
var scene = new THREE.Scene();
var fogColor = new THREE.Color(0, 1, 0);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
 
// Box With a material that uses a color, and emissive color
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: fogColor,
            emissiveIntensity: 0.8,
            emissive: new THREE.Color(1, 0, 0)
        }));
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 100,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        box.position.set(0, 0, -1 - 4 * bias);
        box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
 
};
loop();
```

## 5 - Random Color example

```js
var randomColor = function () {
    var r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
var randomPosition = function () {
    var x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};
 
// creating a scene
var scene = new THREE.Scene();
 
// creating a group of mesh object with random colors
var group = new THREE.Group();
var i = 0,
len = 15;
while (i < len) {
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: randomColor(),
                emissiveIntensity: 0.8,
                emissive: randomColor()
            }));
    box.position.copy(randomPosition());
    group.add(box);
    i += 1;
}
scene.add(group);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group.children.forEach(function (box) {
            box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        });
        group.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
 
};
loop();
```