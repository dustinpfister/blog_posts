---
title: The Math Utils in threejs
date: 2022-04-11 14:18:00
tags: [three.js]
layout: post
categories: three.js
id: 977
updated: 2022-04-12 12:59:41
version: 1.4
---

Baked into threejs there are a number of Math utilities that can be  used to helper with various tasks. This object is packed with a whole bunch of useful methods for typical tasks such as converting a degree value to a radian value for example. However there is not just thinking in terms of what there is to work with, but also what is missing. With that said I think I should also write about one or more additional things that are not in this math utils object, but should maybe be there, or in any case might have to do with a kind of custom math utils object.

<!-- more -->


## 1 - Basic example of threejs math utilities using degree to radian method

Maybe one of the methods that I find myself using the most often would be the degree to radians conversion method that there is to work with in this Object. Although it is not so hard to just do this with a simple expression because it is a such a common task of course there is a method for this in the Math utils method. 

The use of radians comes up a whole lot and not just with javaScript related features but with various core javaScript features as well such as the Math cos and sin methods. With that said that is what I am using the methids for in this example actually by converting a given degree value to a radian value and then using that to get the desired x and y values that will be use to set the position of a mesh object.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // adding a mesh object
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT
    var radian = THREE.MathUtils.degToRad(20);
    var x = Math.cos(radian) * 5,
    z = Math.sin(radian) * 5;
    mesh.position.set(x, 0, z);
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```