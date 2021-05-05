---
title: Fly Controls in threejs
date: 2021-05-05 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 860
updated: 2021-05-05 13:40:04
version: 1.3
---

There are a number of official camera controls that can be used with [threejs](https://threejs.org/) it is just that they are not built into the core of three.js itself. I wrote a post on one of these camera control options which was the orbit controls a long time ago, but I thought that I should take a moment to look into at least one of the other options to make use of in some examples such as the [three.js fly controls](https://threejs.org/docs/#examples/en/controls/FlyControls.dragToLook). So then this will be a quick post on use the official fly controls in a three.js project.

<!-- more -->

## 1 - Fly Controls in three.js and what to know first

In this post I am writing about the official three.js fly controls in three.js which is a javaScript library that can be used to work with 3d models.

## 2 - Basic fly controls example

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
 
    // Something to look at
    var groundBox = new THREE.Mesh(
            new THREE.BoxGeometry(10, 1, 10),
            new THREE.MeshDepthMaterial());
    groundBox.position.set(0, -1, 0);
    scene.add(groundBox);
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // FLY CONTROLS the camera is given as the first argument, and
    // the DOM element must now be given as a second argument
    var flyControls = new THREE.FlyControls(camera, renderer.domElement);
    flyControls.autoForward = false;
    flyControls.dragToLook = true;
    flyControls.rollSpeed = 0.1;
    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        // UPDATE CONTROLS
        flyControls.update(0.125);
        renderer.render(scene, camera);
    };
 
    loop();
 
}
    ());
```