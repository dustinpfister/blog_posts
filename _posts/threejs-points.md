---
title: Points in threejs
date: 2023-02-23 08:44:00
tags: [three.js]
layout: post
categories: three.js
id: 1029
updated: 2023-02-23 09:04:53
version: 1.1
---

When it comes to adding content to a scene for the most part one will want to make use of Mesh objects, and with that geometry and materials that work with such objects. However when it comes to first starting out learning how to make custom geometry, and for other various reasons one might want to make use of an alternative such as THREE.Points. The THREE.Points class is a way to create a content object with a geometry that can just have a position attribute and nothing else. The position attribute is the first and foremost attribute that one will want to work out when making a custom geometry as it is the actual points in space. So often I might start out using THREE.Points when making a custom geometry when starting out. Once I have the position attribute worked out well I can then move on to working out the various other attributes that will get the geometry to work well with Mesh Objects.

There are a number of other reasons why one might want to use the THREE.Points class. One thing that I find myself using it for all the time is to get a visual idea of what is going on with the state of a Curve Path for example. In any case in this post I will be writing about a general overview of the THREE.Points class, and while I am at it write about a lot of other things that will come up in the process such as position attributes of buffer geometry objects.

<!-- more -->


## 1 - Some basic examples of THREE.Points

To start out this post in this section I will be getting a few basic examples out of the way. The general idea here with THREE.Points is very similar to that of THREE.Mesh in that I need to create a geometry, and then pass that geometry as the first argument when calling the THREE.Points constructor function. However when it comes to passing a material as the second argument I can not make use of any of the materials that are made for mesh objects. Aside from that once I have a points objects I can add that object to my main scene object, just like that of any other Object3d class based object.

### 1.1 - Just using a THREE.BoxGeometry

Just like with all my other posts on threejs I have to start somewhere, and for this basic example of the THREE.Points class I will be starting out with a very basic hello world type example of THREE.Points. Just like with any other threejs example I need to start out with a scene object, camera, and renderer. Once I have the usual set of objects I can then create a THREE.Points object and add that to the scene. When it comes to doing so I need a geometry and for this first example I am just making a box geometry wit the built in THREE.BoxGeometry constructor and passing that as the first argument when calling THREE.Points.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2);
const points = new THREE.Points(geo);
scene.add(points);
scene.add( new THREE.GridHelper( 10,10 ) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

After I create my Points object and add that to the scene I then position my camera and call the render method of the webgl renderer passing the scene object, and the camera to render the current state of this scene. The end result is then four points in the canvas, or at least that is what it looks like anyway. More on this in this section as I at least touch base on the position attribute of buffer geometry objects.

