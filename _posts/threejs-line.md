---
title: Working with lines in three.js
date: 2018-04-19 15:21:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 178
updated: 2021-05-03 09:42:17
version: 1.10
---

This month I have been working towards developing a solid understanding of the basics of [three.js](https://threejs.org/) as it is a great project that helps with everything, and anything 3d in a javaScript environment. As such it was only a matter of time until I would get around to working out a few quick demos about how to work with lines in three.js. Doing so is not that hard at all, and can quickly become very fun allowing me to draw in 3d.

<!-- more -->

There is only so much to write about with the [Line](https://threejs.org/docs/#api/en/objects/Line), and [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments) constructors in three.js, so to help keep this post from being to thin I will also be writing about LineLoop, Line3, and the Materials that can be used with Lines including the [LineBasicMatreial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial) and [LineDashedMaterial](https://threejs.org/docs/index.html#api/en/materials/LineDashedMaterial). There is also the Path constructor that can be used to make 2d shapes, making it similar to the 2d canvas drawing context. 

So there is a great deal to know about when it comes to making lines in three.js for both 3d, and 2d actually. I say that because there is also drawing lines in a 2d canvas using the 2d drawing context, and then using that as a way to skin the faces of a geometry. However in this post I will be briefly covering the Line Constructor and topics closely related to that.

## 1 - What you should know before hand

This is a post on just one little aspect of three.js which is a javaScript project that allows for doing things involving solid geometry. It is not a getting started post on three.js, or any additional aspects of javaScript in general that are required in order to work with the library. You will want to know about the Vector3 constructor as that is what is used to define points in 3d space in three.js. You should be aware of Materials, Cameras, Renderer's, and the Scene that are all needed to make a three.js project.

### 1.1 - Version Numbers matter

As I say in every three.js post of mine, three.js is a project where the version number matters big time. In this post I am using [three.js 0.91.0](https://github.com/mrdoob/three.js/tree/r91) \( or just r91 for short \)

### 1.2 -  A word On Materials when working with lines.

If you are just making lines, and nothing that will compose a solid object or face, then it does not make sense to use a material that is designed to be used with something that is just a string of points in space. So if you aim to just draw some lines, and not something that will compose a solid object there are two special materials in three.js that are intended to be used with just lines. There materials are the LineBasicMaterial, and the LineDashedMaterial materials.

### 1.3 -  Using the Dashed Line material

If you are trying to use the dashed line material rather than the basic material, but are scratching your head wondering why it is that it is not dashed, then changes are you have not called a

```js
var line = new THREE.Line(geometry, new THREE.LineDashedMaterial({
    color: 0x0000ff,
    linewidth: 3,
    scale: .1,
    dashSize: .3,
    gapSize: .1
}));
line.computeLineDistances();
scene.add(line);
```

Certain properties such as the line width might not work as expected on all platforms, as such it might be best to always expect a width of only 1, or at least be happy with how it looks when it is just 1.

### 1.4 - The Line, and LineSegments Constructors

One of the best ways to go about getting started with lines in three.js is to just use the Line constructor. There is also the LineSegments constructor that works pretty much the same way only it uses a different rendering method.

A basic example of one of these would be to just create a geometry, push vectors to its vertices array, and then use that geometry with a line material to create an instance of Line that can then be added to a scene.

```js
var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(0, 10, 0));
 
scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 0x0000ff
})));
```

## 2 - Full line demo example

As with any three.js example that is fully complete there must be a scene, camera, and renderer on top of the use of the Line constructor, geometry, and line materials.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);
 
    // GEOMETRY
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(0, 10, 0));
 
    // The Line
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
    scene.add(line);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

I often place these examples just to have a complete copy and paste, functioning example, and also to cover some additional things that must be done with respect to the other components that make up a three.js project. Although in this case nothing special needs to be done compared to any other example this time around. Just the usual pitfalls to look out for such as making sure the camera is positioned away from, and looking at, what you are working with.

```js
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // CANVAS
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    canvas.width = 8;
    canvas.height = 8;
 
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
 
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
 
    // MATERIAL
    var material = new THREE.MeshBasicMaterial({
            map: texture
        });
 
    // MESH
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
```

I will not be getting into the canvas 2d drawing api in detail here, but becuase it is another way of drawing lines in three.js it is sure worth mentioning to say the least.

## 3 - Using 2d lines made in a canvas project with three.js

I have wrote a [full post on using canvas to make a texture](/2018/04/17/threejs-canvas-texture/) in three.js, and when doing so there is drawing 2d lines on a canvas element and then using that to skin the face of a geometry. So then because I wrote a post on that in great detail I will not be getting into that here, but I think it is worth mentioning in this post.

How it is done in a nut shell is to use the 2d canvas drawing context line methods to draw a line like normal, then pass the canvas to the Texture constructor, or better yet the CanvasTexture constructor that is put in place for this specific purpose. The texture can then be used with a material that is used in a Mesh for the various types of maps such as the plain color map, alpha map, and so forth. The Mesh can then use any geometry that will have one or more faces that will make use of the texture.
