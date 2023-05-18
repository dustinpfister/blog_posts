---
title: Orbit controls for threejs from the project itself
date: 2018-04-13 18:22:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 173
updated: 2023-05-18 15:34:47
version: 1.28
---

It would not be that hard to implement some camera controls for a [three.js](https://threejs.org/) project from scratch, it would just involve some [event handlers](/2019/01/16/js-event-listeners/) that would be used to set the [position](/2022/04/04/threejs-object3d-position/) and [rotation](/2022/04/08/threejs-object3d-rotation/) of the camera using some [Object3D](https://threejs.org/docs/#api/core/Object3D) class methods. However there is some additional resources in the three.js project repository itself that can be used to quickly set some orbit controls in a flash which can be found in the examples folder of the repository. In this post I will be covering how to quickly set up these orbit controls for the camera, so you do not have to keep changing hard coded values, or spend a great deal of time working on your own solution to just look around a scene this way.

The Orbit Controls solution that can be found in the threejs examples folder in the github repo of the project can be used to quickly set up a solution for panning, zooming, and changing the orientation of a camera with the mouse, keyboard, and touch events. So then these source code examples will need threejs, as well as OrbitControls.js on top of the additional code that I am going over in this post.

<!-- more -->

## Orbit controls in threejs and what to know before hand

This is an advanced post on one of the many useful time saving features that are found in the form of additional javaScript files in the threejs examples folder in the [three.js github repository](https://github.com/mrdoob/three.js/tree/r146). If you are looking for my take on [getting started with three.js](/2018/04/04/threejs-getting-started/) I have wrote a post on that topic before, and what I am writing about here is just a few steps beyond that. So in this post I assume you have a basic working knowledge of javaScript, and threejs, and are wondering if there is some kind of official solution for quickly adding some orbit controls to a threejs project. With that said yes there is, and I will be writing about at least a few examples that make use of these orbit controls.

### Where to get the file for orbit controls

The OrbitControls are not built into the core of threejs itself, rather it is one of many Offical Optional additional javaScript files that can be added to a project alone with threejs itself. However the process of adding it to a project can be a little involved depending on the revision number that is being used. With older revisions of threejs such as [r146 it is still possible to pull plain javaScript versions of the Orbit coltrols](https://github.com/mrdoob/three.js/blob/r146/examples/js/controls/OrbitControls.js) from the Github repo. However if newer revisions of threejs such as [r152 the javaScript Module form of the Orbit Controls](https://github.com/mrdoob/three.js/blob/r152/examples/jsm/controls/OrbitControls.js) must be used.

### The source code examples here are on github

The source code examples here that make use of threejs, and OrbitControls.js can also be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-orbit-controls). This is also where I park the source code examples for my many [other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers Matter, and code breaking changes

When I first wrote this post I was working with r91, and as of this writing when I took a moment to edit this post last I was using r152. Sense then some code breaking changes have happened with Orbit Controls, as well as many other threejs features, so be aware of what version of threejs you are using. 

One change that I have noticed sense r91 is that it is now required to give a dom element reference as the second argument when calling the main orbit controls constructor function. Now with r152 of threejs another major change is the removal of the js folder from the threejs repository. As such moving forward with future edits of this post the use of javaScript modules is now a must. 

I will still keep the old examples in this post just for the hell of it. It is just that I am going to need to start pulling these source code examples down into the bottom of the content as I start writing newer demos that sould be up at the top.

## 1 - Basic examples of Using Orbit Controls in threejs

In this opening basic section I will be going over basic examples of the use of Orbit Controls for both the r146, and r152 code styles that I hav2 set for myself. This is because r146 is the last revision that I am using where I observe that the js folder still exists in the threejs Github Repository. However I am now starting to use r152 as a later revision of threejs where the use of JSM is now needed when it comes to using official addons.

### 1.1 - Basic r152 demo of OrbitControls

Although there may still be regular javaScript file forms of threejs to work with in r152, the writing is on the wall when it comes to old school plain old javaScript tags. In order to say current with threejs one will just need to start working with module type script tags. There are a number of ways to get started with them, one way is to make use of the import map type script tag, along with a module type script tag.


So you might want to have somehting like this in your HTML

```html
<script type="importmap">
    {
        "imports": {
            "three": "/js/threejs/0.152.0/three.module.js",
            "OrbitControls": "/js/threejs/0.152.0/controls/OrbitControls.js"
        }
    }
</script>
<script type="module" src="/forpost/threejs-orbit-controls/s1-1-basic-r152/main.js"></script>
```

The URLS will of course need to change dpeding on how you have things set up, but this is more or less the basic idea. There might be some good reaons to not use an import map, but getting into that might be a bit off topic.


Once I have the script tags set up in the html I can then use import in my main.js file that is being loaded as a module type script tag. Sense I used an import map I can now use 'three', and 'OrbitControls' rather that what would otherwise have to be relative parts to the modules. In any case once I have the import situation worked out here I can now use threejs to create my usual set of objects such as the scene, camera, and renderer. Once I have a camera, and renderer I then have the Objects that I need to create an instance of Orbit Contorls as well. I can then add additional objects to the scene, and set up a basic animation loop.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CONTROLS
// ---------- ----------
let controls = new OrbitControls(camera, renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
// loop
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

Once this is up an running I can then move the camera around and view the cube with Orbit Controls.

### 1.2 - Basic r146 demo of OrbitControls

Now a fan of module script tags? I hear ya, for now at least I will keep it up with old school r146 style demos. When it comes this this revision of threejs the plain old javaScript form of Orbit Controls is still there to work with, and of course there is also using one of the options for the plain old javaScript file form of threejs as well while we are at it.

```html
<script src="/js/threejs/0.146.0/three.min.js"></script>
<script src="/js/threejs/0.146.0/controls/OrbitControls.js"></script>
<script src="/forpost/threejs-orbit-controls/s1-2-basic-r146/main.js"></script>
```

The process of using Orbit Controls is more or less the same as with JSM, with a few minor changes. I do not use import in plain old javaScript type script tags, and also the Orbit Contorls are appened to the main THREE Global Object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ORBIT CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
const loop = function () {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
};
loop();
```

## 2 - Old Basic demos of Orbit Controls

These are then the older Basic examples on the Use of the Offical Threejs Orbit Controls.

If you all ready know how to create a basic scene in threejs, and you have a copy of the orbit controls added to the page along with the corresponding version of threejs, then adding orbit controls is not all that hard. The THREE.OrbitControls constructor just needs to be called passing a camera that the orbit controls will be controlling as the first argument. On top of the camera a dom element reference might also have to be added if you are using a later version of three.js \( at least r125 forward as of this writing \)

### 2.1 - Example of the OrbitControls constructor (r127)

When using the orbit controls constructor in r125 I now need to pass a camera as the first argument like before, but now I also need to pass a dom element reference as the second argument. Once you have an instance of the controls you just need to call the update method of the controls in a render or update loop.


```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1.4, 2.8);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // Something to look at
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial()));
    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // loop
    camera.position.set(1.3, 1.5, 1.3);
    camera.lookAt(0, 0, 0);
    var loop = function () {
        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);
    };
    loop();
}
    ());
```

### 2.2 - Old example of the OrbitControls constructor (r91)

When I first wrote this post I was using r91. With that version of threejs I just need to call the constructor passing the instance of the camera I want to to control which will give me an instance of THREE.OrbitControls. However in late versions of threejs this might cause an error.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    // Something to look at
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial()));
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1.4, 2.8);
    camera.position.set(1.3, 1.5, 1.3);
    camera.lookAt(0, 0, 0);
    // add controls for the camera
    var controls = new THREE.OrbitControls(camera);
    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        // UPDATE CONTROLS
        controls.update();
        renderer.render(scene, camera);
    };
    loop();
}
    ());
```

## Conclusion

I have not covered everything that the Orbit controls has to offer. It looks like it has some methods for saving and loading camera save states among other things but you get the idea. If you are thinking about taking the time to make your own controls for something like this think again, chances are it has been done before, and there is so shame of just taking advantage of these things like this to save time. The focus on any three.js project, or any project for that matter should be whatever it is that sets your project apart from all others. Chances are that is not going to be the orbit controls is it? I didn't think so, just use this stuff and move on.

If you take a look at the [other controls](https://github.com/mrdoob/three.js/tree/r125/examples/js/controls) in the three.js examples folder it looks like there are some additional options for quickly adding some typical controls to a three.js project, including [fly controls](/2021/05/05/threejs-fly-controls/). I have not check out all of these options yet as there is a lot to get to when it comes to looking I to what there is to worth with in the official three.js repo, but I feel they might also come in handy at some point as well I am sure.
