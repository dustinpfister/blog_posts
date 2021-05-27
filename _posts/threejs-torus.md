---
title: Torus Geometry in threejs
date: 2021-05-27 11:33:00
tags: [three.js]
layout: post
categories: three.js
id: 876
updated: 2021-05-27 11:58:58
version: 1.4
---

Today I thought I world write another post on a built in geometry constructor in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), this time the [Torus Geometry Constructor](https://threejs.org/docs/#api/en/geometries/TorusGeometry) which results in a donut like shape. There are many interesting things about the [geometry of a torus in general](https://en.wikipedia.org/wiki/Torus) that are worth looking into in detail. It is a shape that is composed of a collection of circles where each circle is positioned and rotated around a point that results in the formation of a tube that in turn is a kind of 3d circle. So then there are two general arguments of concern that come up with this when it comes to the number of sides of each circle, and the number of circles, as one might expect these values can be tweaked when calling the geometry constructor.

<!-- more -->

## 1 - A donut or torus geometry in threejs and what to know first

This is a post on the Torus Geometry constructor in the javaScript library known as three.js. In addition to the constructor function itself I will also be making use of a whole bunch of other features of the threejs library in these code examples. So I trust that you have at least some background when it comes to the very basic of how to get up and running with a three.js project, if nit you might want to start out with some kind of getting started guide.

## 2 - basic Torus example

```js
// creating a donut mesh with the Torus Geometry constructor,
// and the normal material
var radius = 1,
tubeRadius = 0.25,
radialSegments = 16,
tubeSegments = 32;
var donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial());
 
// creating a scene
var scene = new THREE.Scene();
 
// add the donut mesh to the scene
scene.add(donut);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.5, 2);
camera.lookAt(0, 0.25, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Creating a group of mesh objects using a torus

```js
var createDonutChild = function(index, len){
    var per = index / len,
    radius = 0.6,
    tubeRadius = 0.25,
    radialSegments = 4 + Math.round(20 * per),
    tubeSegments = 4 + Math.round(20 * per);
    var donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial({wireframe:true}));
    return donut;
};
 
var createDonutGroup = function(){
    var i = 0,
    len = 10,
    group = new THREE.Group();
    while(i < len){
        var donut = createDonutChild(i, len);
        donut.position.set(0, 0, 4 - i * 1.125);
        group.add(donut);
        i += 1;
    }
    return group;
};
 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

var group = createDonutGroup();
scene.add(group);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 4 - camera moving threw holes animation

```js
var MAIN_RADIUS = 8,
DONUT_COUNT = 30;
 
var createDonutChild = function(index, len){
    var per = index / len,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    radius = 0.6 + 2.3 * bias,
    tubeRadius = 0.125 + 0.25 * bias,
    radialSegments = 32,
    tubeSegments = 32;
    var donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshStandardMaterial({
           color: 0xffffff,
           emissive: 0x2a0000
        }));
    donut.geometry.rotateY(Math.PI * 0.5);
    return donut;
};
 
var createDonutGroup = function(){
    var i = 0,
    len = DONUT_COUNT,
    group = new THREE.Group();
    while(i < len){
        var per = i / len,
        radian = Math.PI * 2 * per;
        var donut = createDonutChild(i, len);
        donut.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        donut.lookAt(0, 0, 0);
        group.add(donut);
        i += 1;
    }
    return group;
};
 
// creating a scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
//var grid = new THREE.GridHelper(10, 100);
//grid.rotation.z = Math.PI * 0.5;
//scene.add(grid);
 
var group = createDonutGroup();
scene.add(group);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
var light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(2, 0, 0);
camera.add(light);
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// loop
var lt = new Date(),
frame = 0,
maxFrame = 1200,
fps = 24;
var loop = function(){
    var now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        var radian = Math.PI * 2 * per;
        camera.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        camera.lookAt(Math.cos(radian + 0.5) * MAIN_RADIUS, Math.sin(radian) * 0.5, Math.sin(radian - 0.5) * MAIN_RADIUS);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 5 - Conclusion

The torus geometry constructor is fun geometry constructor to play around with when it comes to makin a few quick examples and getting a feel for how to make some interesting animations with three.js.