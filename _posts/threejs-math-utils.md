---
title: The Math Utils in threejs
date: 2022-04-11 14:18:00
tags: [three.js]
layout: post
categories: three.js
id: 977
updated: 2022-04-12 13:27:30
version: 1.9
---

Baked into threejs there are a number of Math utilities that can be  used to helper with various tasks. This object is packed with a whole bunch of useful methods for typical tasks such as converting a degree value to a radian value for example. However there is not just thinking in terms of what there is to work with, but also what is missing. With that said I think I should also write about one or more additional things that are not in this math utils object, but should maybe be there, or in any case might have to do with a kind of custom math utils object.

<!-- more -->

## The math utils method and what to know first

This is a post on some of the features of the Math utils method in the javaScript library known as threejs. I am assuming that you have all ready got up to speed with the basics when it comes to [getting started with threejs](/2018/04/04/threejs-getting-started/), and also have at least some background when it comes to client side web programing to begin with.

### Version Numbers matter

When  I first wrote this post I was using r135 of threejs.

### Source code example in this post are on Github

The source code examples that I am writing about in this post [are up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-math-utils).

## 1 - Basic example of threejs math utilities using degree to radian method when setting the position of a mesh

Maybe one of the methods that I find myself using the most often would be the degree to radians conversion method that there is to work with in this Object. Although it is not so hard to just do this with a simple expression because it is a such a common task of course there is a method for this in the Math utils method. 

The use of radians comes up a whole lot and not just with javaScript related features but with various core javaScript features as well such as the Math cos and sin methods. With that said that is what I am using the methods for in this example actually by converting a given degree value to a radian value and then using that to get the desired x and y values that will be use to set the position of a mesh object.

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

## 2 - The clamp and rand float methods

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
 
    // USING THE RANDFLOAT and CLAMP METHODs
    var i = 0,
    len = 30;
    while(i < len){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        scene.add(mesh);
        var x = THREE.MathUtils.randFloat(-7, 7);
        x = THREE.MathUtils.clamp(x, -4.5, 4.5);
        var z = THREE.MathUtils.randFloat(-100, 100);
        z = THREE.MathUtils.clamp(z, -4.5, 4.5);
        mesh.position.set(x, 0, z)
        i += 1;
    }
    camera.position.set(8, 8, 8);
    camera.lookAt( 0, 0, 0 );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```