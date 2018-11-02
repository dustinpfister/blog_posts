---
title: Exporting a three.js animation to webm using whammy
date: 2018-11-01 20:24:00
tags: [js,three.js]
layout: post
categories: three.js
id: 318
updated: 2018-11-01 20:57:39
version: 1.7
---

It has been a few months sense I wrote any new content on [three.js](https://threejs.org/) which is a shame because this project does deserve more attention. Anyway when I am playing around with three.js I often like to use it to make simple looping animations, and it would be nice to have at least one or two ways to export these projects to a reliable well supported [webm file format](https://en.wikipedia.org/wiki/WebM) making it easy to share. To help with this I have come across a project called [whammy](https://github.com/antimatter15/whammy) that seems to work okay for the sake of making a webm file on a frame by frame basis. In this post I will be outlining a simple example of doing just this using three.js, and whammy.

<!-- more -->

## 1 - What to know

This is a post on exporting a three.js animation to webm using an additional javaScript project called whammy. This is not a getting started post with three.js or javaScript in general, So i will not be getting into detail about each of the various details about making a three.js project in this post. However I will like to other relevant posts where appropriate.

### 1.1 - Version numbers matter

In this post I was using three.js r91,

## 2 - Exporting a simple rotating cube example

For the sake of keeping this post simple and to the point I will just be using a simple rotating cube example for this post. This will help to take the focus away from the animation and place it more so with the process of exporting an three.js animation to webm with whammy. Uising whammy is fairly simple, but there are a few pitfalls that I have ran into. Nothing major, but I will be going over them here.

### 2.1 - Create Whammy instance, and setup some variables

```js
// create encoder
var seconds = 20,
fps = 12,
i = 0,
maxI = 240,
encoder = new Whammy.Video(fps);
```

### 2.2 - The animate method

```js
// loop
var animate = function () {
 
    // find current percent
    // and set values based on that
    var per = i / maxI,
    r = Math.PI * 2 * per;
 
    // make changes to for new frame
    camera.position.set(Math.cos(r) * 200, Math.sin(r) * 200, 250);
    camera.lookAt(0, 0, 0);
 
    // render frame
    renderer.render(scene, camera);
 
    // add frame to encoder
    encoder.add(renderer.domElement.toDataURL('image/webp'));
 
    // if the animation is not over
    if (i < maxI) {
 
        // request the next frame
        requestAnimationFrame(animate);
    } else {
 
        // else comple, and export
        encoder.compile(false, function (output) {
            exportVid(output);
        });
 
    }
 
    i += 1;
 
};
```

### 2.3 - The export Video method

```js
// export video helper
var exportVid = function (blob) {
    const vid = document.createElement('video');
    vid.src = URL.createObjectURL(blob);
    vid.loop = true;
    vid.controls = true;
    document.body.appendChild(vid);
};
```

### 2.4 - The Three.js scene, camera, mesh, and renderer

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
 
// MESH
var mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }));
scene.add(mesh);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
animate();
```
