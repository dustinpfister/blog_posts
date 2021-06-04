---
title: Three js alpha maps
date: 2019-06-06 09:15:00
tags: [js,three.js]
layout: post
categories: three.js
id: 474
updated: 2021-06-04 14:25:59
version: 1.16
---

When working with materials in three js many of the materials support one or more types of maps for skinning the faces of a geometry, one such map is an [alpha map](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.alphaMap). An alpha map is a gray scale texture where white areas of the texture will result in a face being fully opaque while black areas will result in the face being fully transparent. So then an aplha map will come into play when it comes to working things out with [transparency in a three.js project](/2021/04/21/threejs-materials-transparent/) along with the the transparency and opacity properties of a material.

So then in this post I will be going over an example of an alpha map, and in order to do so I will also be touching base on how to go about creating a texture with a little javaScript code. One way to do so is to use canvas elements and the THREE.CanvasTexture method as a way to create a texture to use as an alpha map. This kind of thing can also be used as a way to create textures in general for all kinds of other maps that can be used with a material.

<!-- more -->

## 1 - Alpha maps and what to know before hand

This is a post on three js the javaScript powered 3d modeling library, in addition it is on a very specific topic with three js which is of course alpha maps. It is not a getting started post on three js of javaScript in general, I assume that you have at least some background with these topics otherwise you are going to have a hard time getting anything of value from this post.

### 1.1 - You might want to brush up on textures

In order to have an alpha map I need to have a texture, one way to have a texture is to load an external image file and use that as a texture. However another option would be to [use canvas elements as a way to create a texture](/2018/04/17/threejs-canvas-texture/) using a little javaScript code by way of the canvas 2d drawing context. Getting into this subject would be a little off topic, but one way or another a texture is needed to have an alpha map. Also the texture needs to be in gray scale as that is what is used to set the transparency values of the material with the texture used as an alpha map.
### 1.2 - There are many other ways to control visibility in threejs.

Alpha maps are a way to go about adjusting opacity of a material with a texture rather than setting the opacity of the material over all. When it comes to just setting the opacity of a material over all there is the transparent and opacity properties of a material. Also there are a number of features when it comes to just turning the visibility of an object on and off completely also. There is the [visible boolean](/2021/05/24/threejs-object3d-visible/) of the object3d base class of Mesh objects, and there is also getting into learning a thing or two about layers.

### 1.3 - Version Numbers matter with three.js

When I first wrote this post I was using three.js version r104, and the last time I edited this post I was using r127. Three.js is still being developed and is moving pretty fast, in the future there might come another time where this code might break. So if things are not working out for you with this example, and many other examples on the open Internet the first thing you should check is the version of three.js that you are using.

## 2 - Alpha map example in three js

So for a basic example of an alpha map in three js I have this example that makes used of a texture that is created from a canvas element. I just create a canvas and then make gray scale areas of the canvas by using the 2d drawing context. When drawing to the canvas any area that I draw as black will end up being totally transparent, and any area that is white will be fully opaque, shads of gray then set values between the two extremes. 

I then used the THREE.CanvasTexture constructor to create a texture that I can then use with the alpha map property of a material that supports alpha maps such as the Mesh basic Material.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.3, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// creating a texture with canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 64;
canvas.height = 64;
// drawing gray scale areas
ctx.fillStyle = '#404040';
ctx.fillRect(0, 0, 32, 32);
ctx.fillStyle = '#808080';
ctx.fillRect(32, 0, 32, 32);
ctx.fillStyle = '#c0c0c0';
ctx.fillRect(0, 32, 32, 32);
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(32, 32, 32, 32);
var texture = new THREE.CanvasTexture(canvas);
 
// creating a mesh that is using the Basic material
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            // using the alpha map property to set the texture
            // as the alpha map for the material
            alphaMap: texture,
            // I also need to make sure the transparent
            // property is true
            transparent: true,
            // even when opacity is one the alpha map will 
            // still effect transparency this can just be used to set it even lower
            opacity: 1,
            side: THREE.DoubleSide
        }));
scene.add(mesh);
renderer.render(scene, camera);
```

The transparent property of the material also needs to be set to true, and a renderer that supports transparency also needs to be used. The usual webGl renderer worked just fine for me in this example, but other renderers may not support this feature.

## 3 - Conclusion

There are a whole bunch of different maps to be aware of when it comes to skinning faces of a geometry with a material in three js. There is the plain old color map that can also be used, and with materials that respond to light sources there are many other maps of interest as well such as an emissive map that will be a color that will always show up regardless of the lighting situation. Still alpha maps are one of the many types of maps to be aware of, and they can be fun to play around with when working out details with the materials that are going to be used with objects in a scene.

