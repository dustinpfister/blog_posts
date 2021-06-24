---
title: Making a normal map in threejs
date: 2021-06-24 13:38:00
tags: [three.js]
layout: post
categories: three.js
id: 896
updated: 2021-06-24 14:53:32
version: 1.15
---

In [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is the normal attribute of a geometry which will come into play when it comes to figuring out how light should effect a surface. However it todays post I will be writing about a special kind of texture that can be added to some materials in threejs that can also be used to adjust lighting called a [normal map](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.normalMap).

A normal map is just one of many options to work with when it comes to the various kinds of texture maps such as emissive maps, alpha maps, and just plain old color maps.

<!-- more -->

## 1 - What to know first before getting into normal maps

This is not a getting started type post on threejs, I assume that you have at least some background working with threejs, javaScript, and client side web development in general. So I will not be getting into every little detail about the very basics of what you should know at this point. However in this section I will be quickly going over some things that you might want to read up more on if you need to.

### 1.1 - Look into the texture loader, or canvas texture constructor to create textures

In order to do anything with a normal map, or any kind of texture map for that matter I am going to want a texture to use for the map. One way to go about getting a texture to work with would be to use the threejs built in texture loader, and another way would be to load images by some other means and then use the texture constructor to create a texture object to be used in a material. However there are ways to go about creating textures with just javaScript conde alone without having to bother with exteral images, and one way would be to use [canvas elements, and the THREE.Canvas Texture](/2018/04/17/threejs-canvas-texture/) constructor.

### 1.2 - There are many other options for texture maps

In this post I am looking into normal maps, but there are many other kinds of maps that you should also be aware of. 

### 1.3 - Know your options with materials

The normal map is a kind of map that effects lighting, so it does not make sense to use a normal map when it comes to using a material such as the basic material, the normal material, or any kind of material that does not support normal maps. In the source code examples here I am sticking to using just the [standard material](/2021/04/27/threejs-standard-material/) which is one options that supports the normal map feature, there are some other options to be aware of so be sure to [read up more on materials in general](/2018/04/30/threejs-materials/) if you have not done so.

### 1.4 - Me mindful of the version numbers used with three.js

When I wrote this post I was using r127 of threejs which was a later version of threejs in early 2021. As time goes by yet even more code breaking changes might be made to the library that will cause the source code examples here to no longer work.

## 2 - Basic normal map example

In order to make even a basic getting started type example of the use of a normal map, I am first going to need a texture. So then I am going to want to either load an external image file with something like the texture loader, or create a texture with javaScriot code alone using something like canvas elements. When it comes to writing examples for these kinds of threejs features I like to stick to pure javaScript solutions so I will be using a canvas element to create the texture that I will be using for the normal map. So at the top of the source code of this example I have a create canvas texture helper that will create a canvas element, draw to it with a given draw function, and then return a texture using the THREE.CanvasTexture constructor.

I then have a create normal map helper that will create and return a texture that I want by calling my create canvas texture helper and passing the draw function to use. The next helper function that I worked out just creates and returns a Mesh object that uses the box geometry constructor for the geometry, and the standard materials for a material which of course supports normal maps. When creating the instance of the standard material in this helper I of course call my create normal map helper and just set the resulting texture as the value for the normal map property of the material.

```js
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
 
var createNormalMap = function(){
    return createCanvasTexture(function (ctx, canvas) {
        ctx.lineWidth = 1;
        ctx.fillStyle = new THREE.Color(1.0, 1.0, 1.0).getStyle();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = new THREE.Color(1.0, 1.0, 0.0).getStyle();
        ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.strokeStyle = new THREE.Color(0.0, 1.0, 1.0).getStyle();
        ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
    });
};
 
var createNormalMapCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            normalMap: createNormalMap()
        }));
};
 
// scene
var scene = new THREE.Scene();
 
// mesh
var box = createNormalMapCube();
scene.add(box);
 
// light
var light = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
light.position.set(8, 6, 2);
scene.add(light);
 
// camera, render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Animation loop example

In order to gain a better sense of what kind of effect the normal map has to the surface of a mesh I am going to want to make some kind of animation loop, and change some values over time.

```js
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    draw(ctx, canvas);
    return {
        texture: new THREE.CanvasTexture(canvas),
        canvas: canvas,
        ctx: ctx
    };
};
 
var draw = function (ctx, canvas, x, y, color) {
    x = x === undefined ? 1 : x;
    y = y === undefined ? 1 : y;
    color = color === undefined ? new THREE.Color(1.0, 1.0, 0.0) : color;
    ctx.lineWidth = 1;
    ctx.fillStyle = new THREE.Color(1.0, 1.0, 1.0).getStyle();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    ctx.strokeStyle = color.getStyle();
    ctx.strokeRect(x, y, canvas.width - ( x * 2 ), canvas.height - ( y * 2));
};
 
var canvasObj = createCanvasTexture(draw);
 
var createNormalMapCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            normalMap: canvasObj.texture
        }));
};
 
// scene
var scene = new THREE.Scene();
 
// mesh
var box = createNormalMapCube();
scene.add(box);
 
// light
var light = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
light.position.set(8, 6, 2);
scene.add(light);
 
// camera, render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// UPDATE
var update = function(secs, per, bias, frame, maxFrame){
    var a = 1 + Math.round(15 * bias),
    color = new THREE.Color(1.0, bias, 0.0);
    draw(canvasObj.ctx, canvasObj.canvas, a, a, color);
    canvasObj.texture.needsUpdate = true;
    renderer.render(scene, camera);
};
 
// LOOP
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 90;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        update(secs, per, bias, frame, maxFrame);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 4 - Conclusion

So far I can not say that I am using normal maps that often, in fact thus far I am not using them at all. However if I really truly get into 3d modeling at some point I am sure that I might want to create these kinds of maps now and then to adjust things a little when it comes to lighting.

For now as of this writing at last I am still sticking to simple color maps, and also I like to play around with emissive maps. Those two kinds of maps just seem to be what comes first naturally when it comes to learning about all the various texture maps that there are to work with materials. Also in just about any project I am typically going to always want to use those two in most cases.