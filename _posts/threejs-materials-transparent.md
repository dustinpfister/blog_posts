---
title: Transparent Materials in threejs
date: 2021-04-21 14:03:00
tags: [three.js]
layout: post
categories: three.js
id: 850
updated: 2021-05-27 14:18:48
version: 1.14
---

In [threejs](https://threejs.org/) there are a few things to know about when it comes to making transparent materials, so I think it is called for to write a post on the topic. When it comes to working with just the Basic materials the process is not that hard at all actually. When creating the material I just need to set the [transparent property of the material](https://threejs.org/docs/#api/en/materials/Material.transparent) to true, and then it is just a matter of setting the desired [opacity value](https://threejs.org/docs/#api/en/materials/Material.opacity) for the material, and that is it. However there might be a bit more to write about when it comes to a few more additional things that branch off from that s lets get to it.

<!-- more -->

## 1 - Making a mesh transparent, and what else to know

In this post I am mainly writing about the transparent and opacity properties of materials as a way to adjust the transparency of a material of a mesh object. However there are a whole lot of other ways to go about making a mesh object visible or not, and there are also a lot of other things that you should be aware of before continuing to read this.

### 1.1 - The visible property of the Object3d class

If I want to just make a mesh object, or just about any display object based off of object3d not visible for a while I can always just set the [visible boolean of the object](/2021/05/24/threejs-object3d-visible/) to false. There are also a number of other topics to cover when it comes to making an object completely not visible or not. There is just setting the visible boolean to false, but in some cases it might be a better idea to swap objects from a group that is attached to the scene and another group that is not that acts as a pool of sorts. In any case all of this is outside the scope of this post, here I assume that you just want to play around with the opacity of a material.

### 1.2 - Version Numbers matter with three.js

When I first wrote this post I was using version r127 of three.js which was a late version of threejs as of March of 2021. Code breaking changes might be made to three.js at some point in the future that might cause many of these examples to not work any more. Always be mindful of what the version of three.js is that you are using, and this is also something to always keep in mind when working with javaScript libraries in general actually.

## 2 - Basic Transparency of the whole mesh with the Basic Material

If I just want to make a whole mesh transparent, and I am not doing anything fancy with lights, alpha maps, and so forth. Then transparency is not that hard to get up and running, all I have to do is set the transparency boolean of the basic materials to true. After that all I have to do is set or change the opacity property of the mesh to set the level of transparency for the mesh.

```js
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
 
var materials = {};
 
materials.sand = new THREE.MeshBasicMaterial({
        color: 'yellow'
    });
 
materials.glass = new THREE.MeshBasicMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
 
var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);
 
// scene
var scene = new THREE.Scene();
 
scene.add(glassCube);
scene.add(cube);
 
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0.9, 0, 3.5);
camera.lookAt(-1, 0, 0);
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Using a light source and the standard material

Things get a little more involve when using a light source, when this is the case I will have to use a material that will respond to light. Once such material is the standard material rather than the basic material. Then I am going to need to add at least one light source, there are a number of options for that, the one I often go for is a point light. This is is a nice direction light that will shine light in all directions form the position at which it is located.

```js
// create a cube
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
 
var materials = {};
// Using the standard material
materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
 
var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);
 
// scene
var scene = new THREE.Scene();
 
// adding a point light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, -5, 5);
scene.add(pointLight);
 
// add cubes
scene.add(glassCube);
scene.add(cube);
 
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0.9, 0, 3.5);
camera.lookAt(-1, 0, 0);
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 4 - canvas elements and alpha maps

Another kind of transparency is to get into using [alpha maps](/2019/06/06/threejs-alpha-map/) this is a kind of texture map that can be added to a mesh to set locations in a face that should be transparent. One way to do so would be to load extremal images as a way to load some textures for this sort of thing. However when it comes to just using a little javaScript code I can use canvas elements as a way to create textures which in turn can be used for a alpha map.

So once again I added a bit more to what was once my basic example on transparency in threejs, by adding a method that will help me to make a texture for a map. There are a number of maps to work with when it comes to making a material, but for this example I will just be sticking to an alpha map for the glass cube. When drawing to the canvas element i will want to stick to using gray scale color values, when a color is black that will mean that area in the texture will be fully transparent, while white will mean fully opaque.

Things will get a little involve beyond just that of adding the alpha map to the glass material though, I will want to play around with some additional material properties to get things to work the way that I want them to. For example there is the question of drawing just the front sides of a cube, or all sides. I might want to also play around with the depth function that is used for the material.

For this example I also added an ambient light to make sure that there is always a certain amount of base light for all surfaces.

```js
// create a cube
var createCube = function (size, material, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
 
var createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 64;
    canvas.height = size || 64;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
 
var alphaMap = createCanvasTexture(function (ctx, canvas) {
        // drawing gray scale areas
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillStyle = '#000000';
        ctx.fillRect(32, 0, 32, 32);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 32, 32, 32);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(32, 32, 32, 32);
    });
 
var materials = {};
// Using the standard material
materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        alphaMap: alphaMap,     // using an alpha map
        side: THREE.DoubleSide,
        depthFunc: THREE.AlwaysDepth,
        transparent: true,
        opacity: 0.2
    });
 
var glassCube = createCube(1, materials.glass, 0, 0, 2),
cube = createCube(1, materials.sand, 0, 0, 0);
 
// scene
var scene = new THREE.Scene();
 
// adding a point light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, -5, 5);
scene.add(pointLight);
 
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.4;
scene.add(light);
 
// add cubes
scene.add(glassCube);
scene.add(cube);
 
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0.9, 0, 3.5);
camera.lookAt(-1, 0, 0);
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 5 - Conclusion

So then transparency is something that can be set for a material as a whole, but it can also be set in at a texture level also when it comes to alpha maps. So then transparency can be something that can be very simple if we are taking the use of the basic material, and just setting the transparency of the whole material at a global level. However things can get a little involved when it comes to adding alpha maps to the mix, as that can lead to all kinds of additional things when it comes to sides, and directional light.

