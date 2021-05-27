---
title: Torus Geometry in threejs
date: 2021-05-27 11:33:00
tags: [three.js]
layout: post
categories: three.js
id: 876
updated: 2021-05-27 13:43:31
version: 1.14
---

Today I thought I world write another post on a built in geometry constructor in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), this time the [Torus Geometry Constructor](https://threejs.org/docs/#api/en/geometries/TorusGeometry) which results in a donut like shape. There are many interesting things about the [geometry of a torus in general](https://en.wikipedia.org/wiki/Torus) that are worth looking into in detail. It is a shape that is composed of a collection of circles where each circle is positioned and rotated around a point that results in the formation of a tube that in turn is a kind of 3d circle. So then there are two general arguments of concern that come up with this when it comes to the number of sides of each circle, and the number of circles, as one might expect these values can be tweaked when calling the geometry constructor.

<!-- more -->

## 1 - A donut or torus geometry in threejs and what to know first

This is a post on the Torus Geometry constructor in the javaScript library known as three.js. In addition to the constructor function itself I will also be making use of a whole bunch of other features of the threejs library in these code examples. So I trust that you have at least some background when it comes to the very basic of how to get up and running with a three.js project, if nit you might want to start out with some kind of getting started guide.
## 2 - Starting out with a basic Torus example

To start out with there is just making a simple hello world tyoe demo of the Torus Constructor with a simple example that is just one mesh object. With that said when calling the THREE.TorusGeometry constructor function the first argument is the main radius of the torus as a whole, while the second argument is the radius of each circle in the torus or the tube radius if you prefer. The next two arguments of the constructor are to set the number of circles in the torus, and how many sides per circle.

Once I have my torus geometry I can then pass it as the first argument to the mesh constructor, and pass a material as the second argument for the mesh constructor and then add the resulting mesh to a scene object. After that I just need to set up a camera and a renderer for this example.

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

In this example I am creating a group of mesh objects where each mesh object is created with a create donut helper method to which I pass two arguments one of the current child index, and the other for the total number of children in the group.

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

## 4 - Camera moving threw holes animation

So now there is an idea that I just have to do with this because it is just a cool thing to do when it comes to just playing around with three.js. In this example I am once again creating a group of mesh objects that are using the torus geometry constructor but this time I am positing each of them in a circle, so then all the torus objects then begin to from another torus of sorts out of torus objects. I am then creating an animation loop, and moving the camera so that it passes along the the holes of each torus mesh object which results in a cool effect.

Just like my other group example of donut mesh objects I have a create donut child helper that also gets the same arguments. This time I am playing around with the expressions a little in a different way, and I am also making use of the standard material this time because I want to do something with light for this one. Another thing that I am doing differently with this create donut child method is that I am rotating the geometry of the torus so that when I create the group they are all aliened in a way that I want so that I can have a camera move threw them by just having the camera move along the circumference of a circle.

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

There are a great number of other ways that I can play around with this kind of example to make all kinds of interesting animations. Another idea that might be nice is to have the torus mesh objects rotated in a way so that all the holes are facing the center rather than each other and have the camera weave in and own in a sine wave like pattern.

## 5 - Conclusion

The torus geometry constructor is fun geometry constructor to play around with when it comes to making a few quick examples and getting a feel for how to make some interesting animations with three.js. There is many other little details to work with here and there also when it comes to a lot of these examples. For example there is learning how to work with not just the torus geometry, but geometry in general when it comes to rotating them, and working with the various properties of a geometry. There is also not just the geometry, but the objects that contain the geometry, and groups of such objects when it come to the Mesh constructor and the Object3d class that it is based on.

