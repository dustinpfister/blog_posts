---
title: Box Geometry in Threejs
date: 2021-04-26 13:33:00
tags: [three.js]
layout: post
categories: three.js
id: 853
updated: 2021-04-26 14:06:00
version: 1.4
---

After looking over my old content on [three js](https://threejs.org/) it would seem that I never took a moment to write a post On the Box Geometry Constructor. I guess I thought that I knew what I need to know about it and thus I could move on to more advanced topics, if so maybe that was a mistake. Better late than never though so I thought I would take a moment to work out some examples centered around just using the basic Box Geometry constructor in three.js as a way to create a Geometry to be used with a Mesh in a three.js scene.

This will then be a basic post, or at least it will start out that way, for those of you that have some more experienced with three.js I might get into some more advanced topics towards then end of the post, just for the sake of not letting this post end up being to thin. There is just starting out with a simple moving cube example which is not so hard, but then there is getting into how to go about skinning a cube with textures, and not just simple solid color maps with the basic material in that regard.

<!-- more -->

## 1 - Box Geometry in thee.js and what to know first

This is a post on the Box Geometry Constructor in three.js, and many little related topics that branch off from that. This is not a getting started post on three.js, but many of the examples here will be not so far beyond that point. So I assume that you know how to set up a basic client side javaScript project using three.js, and so forth.

## 2 - Basic Box Geometry example using Normal Material

To create a basic Box three.js example using the Box Geometry Constructor the First thing I am going to want to do is create a Mesh. This Mesh will accept a geometry as the first argument such as one that is created using the Box Geometry Constructor. However I am also going to want to pass a material as the second argument for the Mesh also. For this example I have choses to go with the Normal Material as this is a nice quick choice for skinning a Mesh because the default Basic material will just show the whole area as one solid color.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```
