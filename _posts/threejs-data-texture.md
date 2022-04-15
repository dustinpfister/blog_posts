---
title: Creating textures with raw data in threejs
date: 2022-04-15 12:56:00
tags: [three.js]
layout: post
categories: three.js
id: 978
updated: 2022-04-15 13:07:47
version: 1.2
---

I have wrote a [number of posts on the use of canvas elements](/2020/03/23/canvas-example/), and also a post on [using canvas elements as a way to create textures](/2018/04/17/threejs-canvas-texture/) for mesh objects in threejs. However there is another built in way to create textures with javaScript code other than making use of canvas elements, and this option is [data textures](https://threejs.org/docs/#api/en/textures/DataTexture).

When it comes to using data textures as a way to create textures with javaScrript code in threejs I just need to know how to produce the texture that I want in terms of a [Unit8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) with a set of four values for each color channel. That is that I need to create an array with integer values between and including the range of 0 to 255 for red, green, blue and alpha color channels for each pixel.

<!-- more -->

## 1 - basic data texture example

```js
// scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
var width = 512, height = 512;
var size = width * height;
var data = new Uint8Array( 4 * size );
var per,r,g,b,a = 255;
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4;
    per = i / size;
    // set r, g, b, and alpha data values
    data[ stride ] = 32 + Math.floor(128 * per); // red
    data[ stride + 1 ] = 255 - 200 * per;        // green
    data[ stride + 2 ] = 255;                    // blue
    data[ stride + 3 ] = 255;                    // alpha
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
// creating a mesh with this texture as a color map
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture
    })
);
scene.add(box);
// render
renderer.render(scene, camera);
```
