---
title: The dae or Collada file loader in threejs
date: 2021-04-30 11:44:00
tags: [three.js]
layout: post
categories: three.js
id: 857
updated: 2021-04-30 11:51:42
version: 1.1
---

I would like to look into the extremal file formats more with [threejs](https://threejs.org/), and maybe a good place to start would be with the dae file, also known as the Collada file loader.

<!-- more -->

## 1 - DAE AKA Collada files with three.js and what to know first

This is a post on using the ColladaLoader which can be added on top of three.js to load Collada files with a DAE file extension which is the default file format used in blender.

## 2 - Load a single dae file

```js
(function () {
 
    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    // scene
    var scene = new THREE.Scene();
    //scene.add(pl);
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    // controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        controls.update();
    };
 
    // CREATE A COLLADALOADER INSTANCE
    var loader = new THREE.ColladaLoader();
    // CALL THE LOAD METHOD, PASS THE ABSOLUTE OR RELATIVE PATH
    // TO THE *.DAE FILE AS THE FIRST ARGUMENT, AND A DONE CALLBACK
    // AS THE SECOND ARGUMENT
    loader.load("/dae/obj/obj.dae", function (result) {
        console.log(result);
        scene.background = new THREE.Color('cyan');
        scene.add(result.scene.children[2]);
        // start the app loop
        loop();
    });
 
}
    ());
```