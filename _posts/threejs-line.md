---
title: Working with lines in three.js
date: 2018-04-19 15:21:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 178
updated: 2021-05-03 10:57:24
version: 1.17
---

This month I have been working towards developing a solid understanding of the basics of [three.js](https://threejs.org/) as it is a great project that helps with everything, and anything 3d in a javaScript environment. As such it was only a matter of time until I would get around to working out a few quick demos about how to work with lines in three.js. Doing so is not that hard at all, and can quickly become very fun allowing me to draw in 3d.

<!-- more -->

There is only so much to write about with the [Line](https://threejs.org/docs/#api/en/objects/Line), and [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments) constructors in three.js, so to help keep this post from being to thin I will also be writing about LineLoop, Line3, and the Materials that can be used with Lines including the [LineBasicMatreial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial) and [LineDashedMaterial](https://threejs.org/docs/index.html#api/en/materials/LineDashedMaterial). There is also the Path constructor that can be used to make 2d shapes, making it similar to the 2d canvas drawing context. 

So there is a great deal to know about when it comes to making lines in three.js for both 3d, and 2d actually. I say that because there is also drawing lines in a 2d canvas using the 2d drawing context, and then using that as a way to skin the faces of a geometry. However in this post I will be briefly covering the Line Constructor and topics closely related to that.

## 1 - What you should know before hand

This is a post on just one little aspect of three.js which is a javaScript project that allows for doing things involving solid geometry. It is not a getting started post on three.js, or any additional aspects of javaScript in general that are required in order to work with the library. You will want to know about the Vector3 constructor as that is what is used to define points in 3d space in three.js. You should be aware of Materials, Cameras, Renderer's, and the Scene that are all needed to make a three.js project.

### 1.1 - Version Numbers matter

As I say in every three.js post of mine, three.js is a project where the version number matters big time. When I first wrote this post I was using [three.js 0.91.0](https://github.com/mrdoob/three.js/tree/r91) \( or just r91 for short \), and the last time I edited the post I was using three.s r127. Sense then many code breaking changes have happened in three.js with all sorts of things, and when it comes to lines the geometry now has to be an Instance of Buffer Geometry.

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

One of the best ways to go about getting started with lines in three.js is to just use the Line constructor. There is also the LineSegments constructor that works pretty much the same way only it uses a different rendering method. A basic example of one of these would be to just create a geometry, push points to an array, and then use that geometry with a line material to create an instance of Line that can then be added to a scene. However the process of doing so has changed a little when it comes to more recent versions of three.js

#### 1.4.1 - Using the BufferGeometry Constructor

In general I will want to use the Buffer Geometry constructor to create the geometry of a line. In fact in late versions of three.js this is the only way to do so now.

```js
    var points = [];
    points.push(
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(-10, 10, 0));
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    // CREATE THE LINE
    var line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
```

#### 1.4.2 - Using the Geometry Constructor \( removed as of r125+ \)

When I first wrote this post I was using r91 of three.js, back then I could make likes by using the geometry constructor. I guess I can still level these examples up but I will of course have to just make it clear that code like this will break on recent versions of three.js unless you can bring back the geometry constructor by some kind of means involving additional extremal files.

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

## 2 - Full basic line demo examples

As with any three.js example that is fully complete there must be a scene, camera, and renderer on top of the use of the Line constructor, geometry, and line materials.

### 2.1 - First off a new threejs r127 example using BufferGemoetry

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    var points = [];
    points.push(
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(-10, 10, 0));
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    // CREATE THE LINE
    var line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
    scene.add(line);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(649, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

### 2.2 - My old r91 example Using the now removed Geometry constructor as of r125+

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

## 3 - Using 2d lines made in a canvas project with three.js

I have wrote a [full post on using canvas to make a texture](/2018/04/17/threejs-canvas-texture/) in three.js, and when doing so there is drawing 2d lines on a canvas element and then using that to skin the face of a geometry. So then because I wrote a post on that in great detail I will not be getting into that here, but I think it is worth mentioning in this post.

How it is done in a nut shell is to use the 2d canvas drawing context line methods to draw a line like normal, then pass the canvas to the Texture constructor, or better yet the CanvasTexture constructor that is put in place for this specific purpose. The texture can then be used with a material that is used in a Mesh for the various types of maps such as the plain color map, alpha map, and so forth. The Mesh can then use any geometry that will have one or more faces that will make use of the texture.

### 3.1 - Example using canvas to draw a line for a texture

The Basic idea here is to just create a canvas, draw lines to the canvas using the 2d drawing context, and then create a texture with the canvas element. When it comes to using a canvas to create a texture in three.js there is the canvas texture constructor, but the regular texture constructor can also be used by just setting the needs update boolean to true. The resulting texture can the be used with a materials such as the basic material by making the texture the value of something like the map property of the material.

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

I will not be getting into the canvas 2d drawing api in detail here, but because it is another way of drawing lines in three.js it is sure worth mentioning to say the least.

## 4 - Conclusion

So that is it for now when it comes to drawing lines in three.js, I am sure that there might be more to write about on this topic in the future but I have to get some time to work on some more examples first. There is not just using the Line constructor, but also creating some kind of custom tube line geometry that can then be skeined with any of the materials that are used for solid geometries. That is something that I would like to look into more sooner or later whenI can get around to it.

