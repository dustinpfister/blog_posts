---
title: Wire frames in threejs the basic material property and custom solutions
date: 2019-12-19 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 584
updated: 2021-05-07 12:46:39
version: 1.18
---

It is often desirable to set a material into a [wire frame](https://en.wikipedia.org/wiki/Wire-frame_model) type mode so that just the basic form of the object is apparent without any faces rendered. Many materials in threejs such as the Basic material have a [wireframe property](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.wireframe) that when set to true will render the mesh in a wireframe mode of sorts. That will work fine most of the time, but another solution might involve creating custom textures that can then be applied to another property of a material such as the map property in the basic material.

So then this post will be on wireframe mode in threejs, the basic use of the property of most materials that just involves setting a boolean value to true. So when it comes to doing that there is typically not much to it, as that is all that needs to happen to set a material into a wire frame mode. However just for the sake of having something more to write about I could also take a moment to get into some more complex solutions that will take a bit more to get working, but will result in a similar effect, but with some kind of added benefit when it comes to creating some kind of style.

<!-- more -->

## 1 - Wireframe mode of a material in three.js and what to know first

This is a post on wire frames in three.js which is a javaScript library for working with 3d modeling. This is not a getting started type post on three.js as well as many addition skills that might be needed in order to gain something of value from reading this.

### 1.1 - Version Numbers matter with three.js

When I first wrote this post I was using r111 of three.js, and the last time I cam around to do a little editing of this content I was testing things out on r127. Code breaking changes are introduced to three.js all the time, si I need to repate this in every three.js post regardless of what the post might be on. When it comes to just using the wire frame mode boolean of a material I can not say that has changed much, but other aspects of these examples might break in future versions of three.js.

## 2 - Basic wire frame example as well as canvas texture powered custom wire frame

In this section I will be going over some helper methods that create cubes that make use of materials that are in wireframe mode, or create a wireframe like effect using textures and various material properties.

In this post I was using version r111 of threejs, so if the code breaks it might be because you are using and older or newer version number than that. I also trust that you have at least some background with threejs, javaScript, and client side web programing in general. If not this is not a good starting point for the very basics.

### 2.1 - A create basic write cube helper

Here I have a basic create wire cube helper method. This helper returns a new mesh that uses a simple box geometry and a basic material that is in wire frame mode. To set a basic material in write frame mode I just need to set the wire frame property to true when  passing an options object to the Mesh Basic Material constructor.

```js
    // create a basic write frame cube
    var createBasicWireCube = function () {
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true
            }));
    };
```

### 2.2 - a Create canvas texture helper

Here I have a create canvas texture helper method that will return a texture using a canvas element by creating the canvas element, drawing to the 2d drawing context, and then used the THREE.Texture constructor to create and return a texture. When doing so all I need to do is pass the canvas element to the THREE.Texture constructor it as the first argument, save the resulting texture to a variable, and be sure to set the needs update boolean to true.

```js
    // create a canvas texture
    var createCanvasTexture = function (draw) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        draw = draw || function (ctx, canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
        };
        draw(ctx, canvas);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };
```

### 2.3 - A create canvas wire cube helper

Now I can make a more advanced canvas powered helper that creates a cube that uses a material with a texture for the map property that results in a wire frame like effect. The process involves more than just simply creating a texture where I am drawing lines at the corners of the texture. I need to make sure the texture is transparent, and I also want to draw the texture on both sides of a face.

```js
    // create a cube with a canvas as a texture
    // the material is transparent and rendering is done on
    // both sides.
    var createCanvasWireCube = function () {
        var texture = createCanvasTexture();
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0.8,
                map: texture,
                side: THREE.DoubleSide
            }));
    };
```

### 2.4 - create the scene and everything else

So now to test out what I put together for this section. I start out by creating a scene, camera, and renderer like always. However I now just call my create basic write cube, and create canvas wire cube helpers to created cubes that make use of the wire frame solutions. I then add them to the scene with the add method of the scene instance.

```js
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(1, 0, 0);
 
    scene.add(createBasicWireCube());
    var cube = createCanvasWireCube();
    cube.position.set(3, 0, 0)
    scene.add(cube);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
```

This results in two cubes that both have a write frame like look.

## 3 - Conclusion

For the most part just setting the wire frame property of a material to true will work just fine, however if I want a more custom look then I am going to need to do something with textures. The wire frame look is great for when I am just trying to work out a geometry and do not care about the file look of an object just yet.