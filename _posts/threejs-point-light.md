---
title: Point lights in threejs for shining light everywhere.
date: 2019-06-02 13:22:00
tags: [js,three.js]
layout: post
categories: three.js
id: 470
updated: 2022-08-23 15:31:22
version: 1.26
---

In [three js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there is a [number of options when it comes to light sources](/2022/02/25/threejs-light/) for materials that respond to light, but my favorite option for the most part would be the three js [point light](https://threejs.org/docs/#api/en/lights/PointLight). This lighting option can be sued to shine light in all directions from a single given point so it is a light source where direction matters, but it is not restricted to a clone like area as with a [spot light](/2018/04/11/threejs-spotlights/).

I often like to combine a point light with [ambient light](/2018/11/02/threejs-ambientlight/) as a way to have a base line amount of light for all materials, while still having a sense of depth that can be obtained by still having some kind of directional light source such as with a point light. Speaking of [directional light](/2019/06/04/threejs-directional-light/) that is yet another kind of lighting option that one might consider.

In this post I will be going over a quick examples of the point light in three js as well as touching base on some other three js related topics as well when it comes to setting up mesh objects that will respond to light. So then this might prove to be a quick fun example of three.js and light as well as some other things that come up when making a three.js project in general

<!-- more -->

## Point lights in threejs and what to know before hand

The example in this post is a little involved but so is any three.js project when it comes to all the various aspects of three.js that a developer needs understand in order o do anything interesting with three.js. I assume that you have at least some background with three.js and javaScript in general as I will not be getting into the basics with three.js and javaScript here. If you like you might want to check out [my getting started post on three.js](/2018/04/04/threejs-getting-started/), and also check out the official website when it comes to how to get up and running with the basic of three.js.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/2TDkh51y7SM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Source code is on Github

I have the source code examples that I am [writing about in this post up on github also](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-point-light).

### Version Numbers matter

When I first wrote this post I was using r104 of threejs, and the last time I came around to do a little editing in terms of both text and code I was using r127 of three.js. I can not say that much has changed with the point light alone between those two version numbers, but of course a great deal has changes with many other things in three.js. In any case always be mindful of what version of three.js you are using when playing around with threejs code examples on the open web not everything odes a good job of keeping their content up to date with this.

## 1 - Basic Point Light example

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f1f1f);
    var camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
    camera.position.set(2, 3, 2);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // POINT LIGHT
    // ---------- ----------
    var pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(0, 0.5, 0);
    scene.add( pl );
    // ---------- ----------
    // MESH
    // ---------- ----------
    var mesh = new THREE.Mesh(
         new THREE.TorusGeometry(1, 0.5, 150, 150),
         new THREE.MeshPhongMaterial({wireframe:false})
    );
    mesh.geometry.rotateX(Math.PI * 0.5);
    scene.add(mesh);
    camera.lookAt(mesh.position);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 2 - An example using helper methods for createing point lights and mesh objects

This example I put together makes use of a few point lights that shine light in all directions in a three.js scene. In addition to having some point lights in a scene there is also a need to have some objects in the scene as well, so for this example I also made a method that creates cubes as well. 

### 2.1 - The add point light method

Here I have a method that I am using in this example to create a point light, add it to a given scene, and return a reference to that point light also in the process of doing so. I often like to take a more functional approach with helper functions, but three.js is a more object oriented type library so there are a lot of functions that mutate objects in place and so forth. 

A point light by itself will not display anything in the scene, it will just shine light in all directions from the current location in which it is located. So for this example I added a Sphere for each point light as a way to see the current location of each point light in the example. When it comes to this mesh I can use something like the basic material if I want because it is a mesh that is closely related to a light source. However when it comes to mesh objects that I will be adding to the scene I will want to use some other material that will react to light, the basic material is not one such options with that.

```js
var addPointLight = function (scene, color, x, y, z) {
    var pointLight = new THREE.PointLight(color);
    pointLight.position.set(x, y, z);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: color
            })));
    scene.add(pointLight);
    return pointLight;
};
```

Now that I have this helpful add point light helper I think I will want another helper to add a mesh, then a setup where I create my scene object and so forth along with an animation loop in order to have a full example of some kind up and running.

### 2.2 - The add cube method

When creating any kind of mesh for a scene it is important to use a material that will respond to light of course, so I am using the standard material rather than the basic material for the cubes. For this example I am using a helper method that will create and add a cube for a given scene object like this.

```js
// create some cubes
var addCube = function (scene, size, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size, size),
    material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x0f0f0f
        });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
};
```

### 2.3 - The scene setup

Now that I have some methods that I can used to create one or more point lights and some cubes for starters, lets used those methods to add point lights and mesh objects to a scene object. So then first I will want a main scene object for that I just create a one with the THREE.Scene constructor. Once I have a scene object I can now use that add point light and add cube methods to add lights and cubes to the scene.

```js
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);
var gridHelper = new THREE.GridHelper(40, 10);
scene.add(gridHelper);
// create some point lights and add it to the scene
var whitePointLight = addPointLight(scene, 0xffffff, 0, 0, 0),
redPointLight = addPointLight(scene, 0xff0000, 30, 0, 0),
greenPointLight = addPointLight(scene, 0x00ff00, 0, 30, 0),
bluePointLight = addPointLight(scene, 0x0000ff, 0, 0, 30);
// create some cubes
addCube(scene, 10, 15, 0, 0);
addCube(scene, 10, -15, 0, 0);
addCube(scene, 10, 0, 0, 15);
addCube(scene, 10, 0, 0, -15);
// need a camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(37, 37, 37);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
```

One I have my scene and lights set up I can also setup a camera and a renderer as well that will be used to look at the scene from a given position and then render that view with the scene object using the renderer in the main animation loop that I will be getting to next

### 2.4 - The app loop

Here I have the loop of the project in which I will be rendering the current state of the scene as well as updating the scene also over time. When it comes to making animation loops I will just about always use the request animation frame method which is the typical go to method for these kinds of functions in client side javaScript. I will want to have a few variables with a scope outside of that of the function for storing things like the last time an update was preformed and so forth.

```js
// loop
var frame = 0,
maxFrame = 180,
lt = new Date(),
fps = 30,
per,
bias,
loop = function () {
    requestAnimationFrame(loop);
    var r = Math.PI * 2 * per,
    sin = Math.sin(r) * 30,
    cos = Math.cos(r) * 30,
    now = new Date(),
    secs = (now - lt) / 1000;
 
    per = frame / maxFrame;
    bias = 1 - Math.abs(0.5 - per) / 0.5;
 
    if (secs > 1 / fps) {
 
        // update point lights
        whitePointLight.position.y = 20 * bias;
        redPointLight.position.set(cos, sin, 0);
        greenPointLight.position.set(cos, 0, sin);
        bluePointLight.position.set(0, cos, sin);
 
        // render
        renderer.render(scene, camera);
        lt = new Date();
 
        // step frame
        frame += fps * secs;
        frame %= maxFrame;
 
    }
 
};
loop();
```

The result when this example is up and ruining is a cool little effect where I have all these point lights shining different colors on to cube objects that are skinned with a material that is while in color.

## Conclusion

The point like is one of the typical light sources that I like to go with just about all of the time when I make my own three.js examples. However often do like to add an additional mesh to the light so that I know where the light source is while I am at it like I did with the example in this post. The other typical light source that I like to use is the ambient light, which is a way to just have a base amount of light for all the mesh objects in the scene. So ambient light and point lights are mu usual go to light sources. However there are still some additional options that might prove to be a better choice in some situations. It is said that a directional light instance would be best to reproduce day light, and also now and then it might be a good idea to go with a spot light actually.