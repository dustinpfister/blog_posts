---
title: Sprite Objects, and 2d overlays in threejs
date: 2023-08-23 11:26:00
tags: [three.js]
layout: post
categories: three.js
id: 1068
updated: 2023-08-23 12:12:24
version: 1.2
---

There are [Sprite objects](https://threejs.org/docs/#api/en/objects/Sprite) in threejs that are a special kind of Object3d class based object that is a simple 2d image that always faces the camera. These kinds of objects will then come into play with certain kinds of tasks in which they might be called for such as making a 2d overlay, or making the lowest resource heavy kind of state of an object when working out Level Of Detail objects. These kinds of objects will not work with the usual mesh materials, as such there is a special kind of material that needs to be used called just simply the sprite material. There are then a lot of little features to be aware of when it comes to using these objects, and with that the material that is used with them. So I thought I would start at least one post on this subject to write about a few things that I have worked out thus far on the topic of sprite objects in threejs.

<!-- more -->

## Sprite Objects and what to know first

This is  a post in which I am writing about a few source code demos that I have worked out that have to do with sprite objects in the javaScript library known as threejs. I assume that you know at least [a thing or two about threejs](/2018/04/04/threejs-getting-started/), and with that additional skills that are needed when it comes to client side web development in general. As always I will not be getting into every little detail that you shroud know before hand here. However I will write a few things that are closely related to the use of sprite objects to which you might want to read up a bit more on before counting to read the rest of this content.

### Texture Objects and ways to obtain them

In order to do what most people will typically want to do with sprite objects one will need a texture to use with the map option of the sprite material. With that said there is looking into the common [texture class](/2023/06/27/threejs-texture/) a bit more to know how to create these kinds of objects directly and with that also all kinds of features of the base texture class. However there is also the question of how to get, or create, the image data to use with these kinds of objects. With that said there is looking into the [texture loader](/2021/06/21/threejs-texture-loader/), as well as ways to create textures by way of some javaScript code such as with [data textures](/2022/04/15/threejs-data-texture/), and [canvas textures](/2018/04/17/threejs-canvas-texture/).

### Know a thing or two about materials

Although there is only one material option of concern with sprite objects which is the sprite material, there is still a lot to be aware of when it comes to [materials in general](/2018/04/30/threejs-materials/). There is not just what there is to make use of in the sprite material, but also a great deal in the common base material class from which the sprite material extends from.

### There is also the common Object3d class

A sprite object is an example of an object that extends from the [object3d class](/2018/04/23/threejs-object3d/). Other examples of this kind of object include mesh, line, point, group, lights, cameras, various helper objects, and even whole scene objects. The point that I am driving at here is that there is a lot to be aware of when it comes to the common object3d class from which all of these objects, including sprites, extend from.

### Other ways of doing a 2d overlay

Sprite objects are a great way to go about doing a 2d overlay, and maybe more often then not it is the way that it should be done. There are however a number of other ways to do something to that effect that might also work okay, or even work better for a specific use case. The other two general ways of having a 2d overlay including having a collection of canvas elements, and making use of plan geometry with mesh objects.

When it comes to using mesh objects with plane geometry I went so far as to start one of my [threejs project examples around this subject](/2023/03/10/threejs-examples-camera-planes/).

### Source is up on Github also

The source code examples that I am writing about in this post can also be [found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-sprite). This is also where I have the source code exhales for all my [other blog posts on threejs](/categories/three-js) as well.

### Version Numbers Matter

When I first wrote this blog post I was using [r152 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md).

## 1 - Some Basic Sprite Object demos

As always I like to start out my blog posts on threejs topics with a basic section at the very least. That is to have a few very simple demos of the subject which in this case is sprite objects. With that said in this first section I will be doing just that, nothing fancy or two complex. Just nice, simple getting started type examples. So then these demos here will mainly just involve a single sprite object, and maybe a few other objects in the scene as well. There is also touching base on at least a few simple features of the sprite material such as the map option, and with that ways to create textures with a little javaScript code rather than loading an external asset.

### 1.1 - Sprite Object Hello World with data textures

For this first demo I am create a texture by way of Three.DataTexture, and then using that with the map option of a sprite material. I then create the sprite object by just calling THREE.Sprite, and then pass the sprite material as the first and only argument when doing so. I count make this example yet even more basic by just calling the sprite material constructor with no options at all and use just the color option of the material. However I am sure that most people will want to get started with textures right away with these as well and the use of data textures is a nice way to bake th texture into the code examples with something like this.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// TEXTURE
//-------- ----------
const data_texture = [
      0,  0,  0,  0,    255,255,255,128,    255,255,255,128,      0,  0,  0,  0,
    255,255,255,128,    255,255,255,255,    255,255,255,255,    255,255,255,128,
    255,255,255,255,    255,255,255,255,    255,255,255,255,    255,255,255,255,
    255,255,255,255,    255,255,255,255,    255,255,255,255,    255,255,255,255
];
const texture = new THREE.DataTexture( new Uint8Array(data_texture), 4, 4 );
texture.needsUpdate = true;
//-------- ----------
// SPRITE MATERIAL
//-------- ----------
const material = new THREE.SpriteMaterial({
    map: texture
});
//-------- ----------
// SPRITE
//-------- ----------
const sprite = new THREE.Sprite(  material );
sprite.scale.set( 1.2, 0.9, 1);
scene.add(sprite);
//-------- ----------
// OTHER OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) )
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2,2,2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Canvas Textures and depth test option of the sprite material

Another way to go about creating a texture with a little JavaScript code would be to make use of canvas textures. In many ways one might prefer to create textures this was as there is everything to work with in the 2d drawing context of canvas elements to sue to create the state of the texture. However another major part of this demo is the use of the depth test option of the common material class. This is a way to make it so that no depth test is preferred with the object which results in the sprite being rendered on top of everything else in the scene always. This is then useful if for example I want to use sprite objects as a way to define a simple 2d cursor that will always render on top of everything else in the scene.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a texture for the sprite
const createTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = 32, h = 32;
    canvas.width = w; canvas.height = h;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 3;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( 0, 0);
    ctx.lineTo( w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo( w, 0);
    ctx.lineTo( 0, h);
    ctx.stroke();
    const texture = new THREE.CanvasTexture( canvas );
    return texture;
};
// create a sprite object using the THREE.SpriteMaterial
const createCursorSprite = () => {
    const material = new THREE.SpriteMaterial({
        map: createTexture(),
        sizeAttenuation: false,
        depthTest: false,
        transparent: true,
        opacity: 1
    });
    const sprite = new THREE.Sprite(  material );
    return sprite;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const sprite = createCursorSprite();
sprite.scale.set(0.1, 0.1, 0.1);
sprite.position.set(0.5, 0, 0);
scene.add( sprite );
scene.add( new THREE.GridHelper(10, 10) );
scene.add( new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial()  ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Rotation

There is then the question of how to rotate these kinds of objects, with that said there is the rotation option of the sprite material that seems to work well with this kind of task.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a texture for the sprite
const createTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = 32, h = 32;
    canvas.width = w; canvas.height = h;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo( 0, 0);
    ctx.lineTo( w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo( w, 0);
    ctx.lineTo( 0, h);
    ctx.stroke();
    return new THREE.CanvasTexture( canvas );
};
const createSprite = () => {
    const material = new THREE.SpriteMaterial({
        map: createTexture(),
        sizeAttenuation: true,
        depthTest: false,
        transparent: true,
        rotation: 0,
        opacity: 1
    });
    const sprite = new THREE.Sprite(  material );
    return sprite;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const sprite = createSprite();
scene.add( sprite );
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
let deg = 0;
const dps = 20;  // degrees per second
const fps = 12;  // frames per second
let lt = new Date();
const loop = () => {
    const now = new Date();
    const secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        deg += dps * secs;
        deg %= 360;
        sprite.material.rotation = Math.PI / 180 * deg;
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

## Conclusion

That will have to be it for now when it comes to sprite objects until I come around to expand this post a little if I get to it. I have a lot of other posts on threejs that also need a lot more work in terms of expansion and I do not think that I am going to have the time and energy to give them all the royal treatment. The use of sprite objects might in time to prove to be an example of this though as I  can think of a lot of use cases for this kind of object.


