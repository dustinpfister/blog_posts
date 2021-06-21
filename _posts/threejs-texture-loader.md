---
title: The texture loader in threejs
date: 2021-06-21 15:51:00
tags: [three.js]
layout: post
categories: three.js
id: 893
updated: 2021-06-21 16:01:17
version: 1.3
---

There are still a great number of features that I have not got around to writing a post about when it comes to using threejs, many of them are basic things that I should have wrote about a long time ago. One of which is just using the [texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) to load external image assets to be used a as textures for the various maps of a material. There are a number of loaders built into threejs itself and the texture loader is one of them, there are also a number of official loaders in the examples folder that have to do with loading all kinds of external file formats used by various 3d model editing programs such as blender such as the dae file loader.

When it comes to my various threejs examples that I make for these posts I often like to use canvas elements are a way to create quick simple textures with javaScript code. However I am sure there will be times when it comes to starting to work on an actually project with threejs that I will want to use external image files rather than some kind of solution that involves a little javaScript code.

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
