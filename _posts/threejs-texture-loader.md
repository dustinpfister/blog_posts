---
title: The texture loader in threejs
date: 2021-06-21 15:51:00
tags: [three.js]
layout: post
categories: three.js
id: 893
updated: 2021-06-21 15:58:58
version: 1.2
---

There are still a great number of features that I have not got around to writing a post about when it comes to using threejs, many of them are basic things that I should have wrote about a long time ago. One of which is just using the texture loader to load external image assets to be used a as textures for the various maps of a material. There are a number of loaders built into threejs itself and the texture loader is one of them, there are also a number of official loaders in the examples folder that have to do with loading all kinds of external file formats used by various 3d model editing programs such as blender such as the dae file loader.

<!-- more -->

## 2 - Basic texture loader example

```js
// creating a scene
var scene = new THREE.Scene();
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var loader = new THREE.TextureLoader();
 
loader.load(
    // the first argument is the relative or absolute path of the file
    '/img/smile-face/smile_face.png',
    // the second argument is an on done call back
    function (texture) {
        // using the texture for a material and a Mesh
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: texture
            }));
        // add the box mesh to the scene
        scene.add(box);
        renderer.render(scene, camera);
    }
);
```
