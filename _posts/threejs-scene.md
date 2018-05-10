---
title: Working with Scenes in three.js
date: 2018-05-03 09:36:00
tags: [js,three.js]
layout: post
categories: three.js
id: 182
updated: 2018-05-03 16:31:43
version: 1.7
---

A [Scene](https://threejs.org/docs/index.html#api/scenes/Scene) in [three.js](https://threejs.org/) is a constructor that can be used to create an instance of Scene that can be used to place everything that makes up an environment in a three.js project. It can contain cameras, lights, and of course objects composed of a geometry and material.

<!-- more -->

In this post I will be covering Scenes in a bit of detail as I continue to expand, and improve [my content on three.js](/categories/three-js/)

## What to know

This is an advanced post on [three.js](https://threejs.org/) that covers just one little constructor known as [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene). If you are new to three.js you might want to start with my getting started post on three.js. If you are new to javaScript in general that is outside the scope of this whole collection of [posts on three.js](/categories/three-js/).

## Basic example of THREE.Scene

At a minimum you will want to have at least some kind of object to look at added to a Scene. This could just be a mesh that used a geometry from one of the built in geometry constructors in three.js such as [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry) with no material given to it.

Unless I aim to do something headless with a scene and one or more objects, I will also want a camera and a renderer to look at what it is that I am doing.

So a basic example of THREE.Scene might look something like this:

```js
(function () {
 
    // create a Scene
    var scene = new THREE.Scene();
 
    // add something to it
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1)));
 
    // add a CAMERA to it so we can see something
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
 
    // position The camera away from the origin
    // and have it look at the origin
    // by default that is where something goes.
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
 
    // we need a RENDERER to render the scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // render the scene with the camera
    renderer.render(scene, camera);
 
}
    ());
```

By default a Mesh will use the Basic material with a random color used to paint the faces of the geometry. Of course I could create an instance of some other material, or give a color or texture to another instance of basic material that I would then give as the second argument to the Mesh constructor, but this is a post on THREE.Scene so I will not be getting into that in depth. However I will be getting into the properties of THREE.Scene including the material override property, more on that later.

## Fog

my full [post on fog](/2018/04/16/threejs-fog/)

A property of interest in a scene instance is the fog Property which can be used to add a fog effect to a scene.

```js
var scene = new THREE.Scene(),
fogColor = new THREE.Color(0xffffff);
 
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.1);
```

There are two kinds of fog that can be added to a scene in three.js which are [Fog](https://threejs.org/docs/index.html#api/scenes/Fog), and [FogExp2](https://threejs.org/docs/index.html#api/scenes/FogExp2). The regular Fog constructor will add a fog that works in a linear way, while the FogExp2 constructor works in an exponential way. Check out my full [post on fog](/2018/04/16/threejs-fog/) for more on this.

## Changing the background of the Scene with Scene.background

It goes without saying that an important part of the scene instance is the background property. By default it is a solid black color, but it can be set to another solid color using THREE.Color.

```js
scene.background = THREE.Color(0xffffff);
```

If you want to use a texture, or a cube texture that can be used as well. I have written a [post on how to used a cube texture](/2018/04/22/threejs-cube-texture/) in which I get into how to go about doing just that in detail.

## Using Scene.overrideMaterial to add a material that overrides all materials

There is the scene override property of a scene that will do exactly as you would expect, override all materials used in the scene with the material given to the material override property of the scene instance.

```js
(function () {
 
    // create a Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);
 
    // can set an override material for everything
    scene.overrideMaterial = new THREE.MeshDepthMaterial();
 
    // just adding a 1x1x1 cube with the default
    // MeshBasicMaterial and random color for faces
    // when added to the scene like this
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
 
    // adding another 1x1x1 cube but this time I am giving
    // and instance of MeshBasicMaterial in which I am setting
    // the face color of the faces to red
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
 
            new THREE.MeshBasicMaterial({
 
                color: 0x00ff00
 
            }));
    cube2.position.set(-2, 0, 0);
    scene.add(cube2);
 
    // a sphere using the lamber material in wire frame mode
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
 
            new THREE.MeshLambertMaterial({
 
                emissive: 0x00004a
 
            }));
    sphere.position.set(0, 0, -2);
    scene.add(sphere);
 
    // add a CAMERA to it so we can see something
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
 
    // position The camera away from the origin
    // and have it look at the origin
    // by default that is where something goes.
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
 
    // we need a RENDERER to render the scene
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // render the scene with the camera
    renderer.render(scene, camera);
 
}
    ());
```

In the above demo I created a simple scene with a few instances of Mesh that each use a different material and or settings for the material. By setting an instance of THREE.MeshDepthMaterial as the value of Scene.overrideMaterial, all the other materials are ignored and the depth material is just used for everything.

This can be useful if you want to have a feature that allows for doing something like setting everything in the scene to wire frame mode.

```js
scene.overrideMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe:true
});
```

## Using Object3D methods in scene

read my full [post on Object3D](/2018/04/23/threejs-object3d/)

Like a lot of things in three.js the Scene Class inherits from [Object3D](/2018/04/23/threejs-object3d/). This gives THREE.Scene properties and methods like Object3D.position, Object3D.rotation and Object3D.add.

So if I play with the instance of [Vector3](/2018/04/15/threejs-vector3/) that is stored in the position property of my scene instance this will change the position of the whole Scene, and everything in it.

```js
    var frame = 0,
    maxFrame = 50,
    loop = function () {
 
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;
 
        requestAnimationFrame(loop);
 
        // using Object3D properties to change
        // the position and rotation of a scene
        scene.position.set(0, 1 * bias, 0);
        scene.rotation.set(Math.PI * 2 * per, 0, 0);
        renderer.render(scene, camera);
 
        frame += 1;
        frame %= maxFrame;
 
    };
 
    loop();
```
