---
title: Point lights in threejs for shining light everywhere.
date: 2019-06-02 13:22:00
tags: [js,three.js]
layout: post
categories: three.js
id: 470
updated: 2023-07-07 08:32:14
version: 1.32
---

In [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there is a [number of options when it comes to light sources](/2022/02/25/threejs-light/) for materials that respond to light. One of my favorite options for the most part would be the [point light](https://threejs.org/docs/#api/en/lights/PointLight). This point lighting option can be sued to shine light in all directions from a single given point in space so it is a light source where direction matters, but it is not restricted to a cone like area as with a [spot light](/2018/04/11/threejs-spotlights/). Also unlike with the directional light the unit length of the vector that is set for the point light also matters. However i would not say that it is a replacement for directional light, or spot lights by any means.

I often like to combine a point light with [ambient light](/2018/11/02/threejs-ambientlight/) as a way to have a base line amount of light for all materials, while still having a sense of depth that can be obtained by still having some kind of directional light source such as with a point light. Speaking of [directional light](/2019/06/04/threejs-directional-light/) that is yet another kind of lighting option that one might consider.

In this post I will be going over a quick examples of the point light in threejs as well as touching base on some other related topics as well when it comes to setting up mesh objects that will respond to light. So then this might prove to be a quick fun example of threejs and light as well as some other things that come up when making a three.js project in general

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/2TDkh51y7SM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Point lights in threejs and what to know before hand

The examples in this post are a little involved but so is any threejs project when it comes to all the various aspects of the library that a developer needs understand in order o do anything interesting with it. I assume that you have at least some background with threejs and javaScript in general as I will not be getting into the basics here. If you like you might want to check out [my getting started post on three.js](/2018/04/04/threejs-getting-started/), and also check out the official website when it comes to how to get up and running with the basics. However I do also take a moment to write about a few things at least in these getting started sections that you might want to read up more on first.

## Read up more on materials

There is not just adding a light source to a scene, but also knowing a thing or two about what [your options are with materials](/2018/04/30/threejs-materials/). Not all materials will respond to light sources, so make sure that you are making use of a material that will do so.

### Source code is on Github

I have the source code examples that I am [writing about in this post up on Github also](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-point-light). This test threejs repo is also where I park the source code examples for my many [other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first wrote this post I was using r104 of threejs, and the last time I came around to do a little editing in terms of both text and code I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). I can not say that much has changed with the point light alone between those two version numbers, but of course a great deal has changes with many other things in three.js. In any case always be mindful of what version of three.js you are using when playing around with threejs code examples on the open web not everything odes a good job of keeping their content up to date with this.

## 1 - Basic Point light examples

First off as always I would light to start out with some basic hello world style examples of the point light. These are examples that should work with just threejs alone added as part of the over all front end stack of javaScript files. I also did what I could so that they will work by just copied and pasting them into a js fiddle or something like that as long as you also add threejs of course by way of cdn. Anyway with these examples sense I will be doing what I can to keep things basic I will be just sticking with static render scenes, or simplified loops. The focus for the most part will just be on point lights, point light helpers, and not so much other threejs features.

### 1.1 - Basic Point Light example

Here I am starting out with the usual scene object followed by a camera, and a renderer as with any threejs example I will need these objects. After I have my typical set of objects to work with I can now create a point light and add it to my scene objects. To do this I call the THREE.PointLight [constructor function](/2019/02/27/js-javascript-constructor/) with the new keyword. When doing so I can pass a color as the first argument, and an intensity as a second argument when calling the constructor. The return product of calling the constructor will then be a new instance of the point light and I can then do things like setting the position of the light, and when I am ready I can go ahead and make it a child of the scene object.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// POINT LIGHT
// ---------- ----------
const pl = new THREE.PointLight(0xffffff, 1);
pl.position.set(0, 0.5, 0);
scene.add( pl );
// ---------- ----------
// MESH
// ---------- ----------
const mesh = new THREE.Mesh(
     new THREE.TorusGeometry(1, 0.5, 150, 150),
     new THREE.MeshPhongMaterial({wireframe:false})
);
mesh.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh);
camera.lookAt(mesh.position);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 3, 2);
camera.lookAt(0,-0.25,0);
renderer.render(scene, camera);
```

### 1.2 - Using the point light helper

Light with just about every object in threejs there is a helper class for point lights. This will help to give a visual idea of what is going on with a point light as it is moved around in an over all scene. There are a whole lot of other options with helpers, another one that i am using in this example is the grid helper.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
// point light object
const pl = new THREE.PointLight(0xffffff, 1);
pl.position.set(0, 1.5, 2);
scene.add( pl );
// helper for the point light
const pl_helper = new THREE.PointLightHelper(pl);
pl.add(pl_helper);
// grid helper
const grid_helper = new THREE.GridHelper( 10, 10 );
scene.add(grid_helper);
// mesh
const mesh = new THREE.Mesh(
     new THREE.TorusGeometry(1, 0.5, 150, 150),
     new THREE.MeshPhongMaterial({wireframe:false})
);
mesh.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

## 2 - An example using helper methods for creating point lights and mesh objects

Here I have a method that I am using in this example to create a point light, add it to a given scene, and return a reference to that point light also in the process of doing so. I often like to take a more functional approach with helper functions, but threejs is a more object oriented type library so there are a lot of functions that mutate objects in place and so forth. 

A point light by itself will not display anything in the scene, it will just shine light in all directions from the current location in which it is located. So for this example I added a Sphere for each point light as a way to see the current location of each point light in the example. When it comes to this mesh I can use something like the basic material if I want because it is a mesh that is closely related to a light source. However when it comes to mesh objects that I will be adding to the scene I will want to use some other material that will react to light, the basic material is not one such options with that. Now that I have this helpful add point light helper I think I will want another helper to add a mesh, then a setup where I create my scene object and so forth along with an animation loop in order to have a full example of some kind up and running.

Now that I have some methods that I can used to create one or more point lights and some cubes for starters, lets used those methods to add point lights and mesh objects to a scene object. So then first I will want a main scene object for that I just create a one with the THREE.Scene constructor. Once I have a scene object I can now use that add point light and add cube methods to add lights and cubes to the scene.

Once I have my scene and lights set up I can also setup a camera and a renderer as well that will be used to look at the scene from a given position and then render that view with the scene object using the renderer in the main animation loop that I will be getting to next

I have the loop of the project in which I will be rendering the current state of the scene as well as updating the scene also over time. When it comes to making animation loops I will just about always use the request animation frame method which is the typical go to method for these kinds of functions in client side javaScript. I will want to have a few variables with a scope outside of that of the function for storing things like the last time an update was preformed and so forth.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const addPointLight = function (scene, color, x, y, z) {
    const pointLight = new THREE.PointLight(color);
    pointLight.position.set(x, y, z);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: color
            })));
    scene.add(pointLight);
    return pointLight;
};
// create some cubes
const addCube = function (scene, size, x, y, z) {
    const geometry = new THREE.BoxGeometry(size, size, size),
    material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x0f0f0f
        });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
};
// ---------- ----------
// GRID
// ---------- ----------
const gridHelper = new THREE.GridHelper(40, 10);
scene.add(gridHelper);
// ---------- ----------
// LIGHTS
// ---------- ----------
// create some point lights and add it to the scene
const whitePointLight = addPointLight(scene, 0xffffff, 0, 0, 0),
redPointLight = addPointLight(scene, 0xff0000, 30, 0, 0),
greenPointLight = addPointLight(scene, 0x00ff00, 0, 30, 0),
bluePointLight = addPointLight(scene, 0x0000ff, 0, 0, 30);
// ---------- ----------
// MESH
// ---------- ----------
addCube(scene, 10, 15, 0, 0);
addCube(scene, 10, -15, 0, 0);
addCube(scene, 10, 0, 0, 15);
addCube(scene, 10, 0, 0, -15);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(37, 37, 37);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 16, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = Math.sin( Math.PI * 0.5 * a1 );
    const r = Math.PI * 2 * a1;
    const sin = Math.sin(r) * 30;
    const cos = Math.cos(r) * 30;
            // update point lights
            whitePointLight.position.y = 20 * a2;
            redPointLight.position.set(cos, sin, 0);
            greenPointLight.position.set(cos, 0, sin);
            bluePointLight.position.set(0, cos, sin);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

The result when this example is up and ruining is a cool little effect where I have all these point lights shining different colors on to cube objects that are skinned with a material that is while in color.

## Conclusion

The point like is one of the typical light sources that I like to go with just about all of the time when I make my own three.js examples. However often do like to add an additional mesh to the light so that I know where the light source is while I am at it like I did with the example in this post. The other typical light source that I like to use is the ambient light, which is a way to just have a base amount of light for all the mesh objects in the scene. So ambient light and point lights are mu usual go to light sources. However there are still some additional options that might prove to be a better choice in some situations. It is said that a directional light instance would be best to reproduce day light, and also now and then it might be a good idea to go with a spot light actually.
