---
title: Fly Controls in threejs
date: 2021-05-05 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 860
updated: 2021-05-05 13:53:52
version: 1.9
---

There are a number of official camera controls that can be used with [threejs](https://threejs.org/) it is just that they are not built into the core of three.js itself. I wrote a post on one of these camera control options which was the orbit controls a long time ago, but I thought that I should take a moment to look into at least one of the other options to make use of in some examples such as the [three.js fly controls](https://threejs.org/docs/#examples/en/controls/FlyControls.dragToLook). So then this will be a quick post on use the official fly controls in a three.js project.

<!-- more -->

## 1 - Fly Controls in three.js and what to know first

In this post I am writing about the official three.js fly controls in three.js which is a javaScript library that can be used to work with 3d models. In this section I will be going over a few quick things to know about before continuing with the code examples that I am writing about here.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using [r127 of three.js](https://github.com/mrdoob/three.js/tree/r127). Code breaking changes are made to three.js every now and then so if the examples here are not working the first thing to check is what version of three.js is being used. After that there are some additional things to be aware of such as the fact that these code examples will break if you are not adding the official fly controls on top of three.js by itself.

### 1.2 - Make sure that you have added the fly controls after adding three.js in the html

The official fly controls can be found in the [examples folder of the official three.js github repository](https://github.com/mrdoob/three.js/blob/r127/examples/js/controls/FlyControls.js). When grabbing a copy from there make sure that it is for the version of three.js that you are using.

## 2 - Basic fly controls example

Now that I have the basic out of the way when it comes to getting started with things, lets take a look at a basic fly controls example. Like always I start off by creating a scene object just like with any other three.js example, and I am then also going to want to have something to look at. For this I made a few mesh objects one to serve as a kind of ground object, and then another as just some additional object at the center of the scene.

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

## 3 - Conclusion

So that is all that I have to say about the official fly controls in three.js so far, when I get some time to edit this post I will be sure to expand things when and if I get the time to do so. For now there is maybe taking a moment to look into some of the other official controls to worth with such as the orbit controls also, before considering to look into how to get started with making ones own custom camera controls.

