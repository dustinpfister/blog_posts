---
title: Getting started with three.js with a basic scene example
date: 2018-04-04 20:48:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 167
updated: 2023-07-26 14:25:39
version: 1.54
---

I have been wanting to write a series of posts on [threejs](https://threejs.org/) for a while now, and I do not care to put it off any longer. I have fiddled with threejs in the past, but never really got into it, that is until now. I have enough experience with it to know that it helps making projects that involve 3d objects very easy, yet it is still something that takes a significant investment of time to get fairly solid with. Also there is not just what there is to know about the various features of the library, but also what there is to known when it comes to working with 3d in general. For example when it comes to really getting into 3d at some point sooner or later I am going to want to also learn a thing or two about using [blender](https://www.blender.org/) as a way to go about [making external files](/2021/04/30/threejs-dae-collada-loader/) that I can then load into a scene.

Also threejs is one of those javaScript projects that is just plain awesome. Working with solid geometric space is one of the main reasons why I got into programming in the first place, so of course I need to write about this one, how can I not? So this will be a getting started post, that will kick off at least a first few [additional posts](/categories/three-js/) on this subject, and I can see myself going beyond that easy.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/ClD09l-Fu-I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## What to know before getting started with threejs

Of course it goes without saying that you need a decent understanding of [front end javaScript](/2018/11/27/js-getting-started/), and  the related languages including HTML and CSS. However there are some additional things to be aware of as well, as this is a fairly complex library that can quickly lead in many additional directions. There is a lot that should be covered first before moving on to threejs, and I do not think I can cover all of it in a single blog post such as this. However I will try my best to cover at least some of the most impotent topics that one should know about before getting started with three.js.

### Make sure you are hosting what you are working on via HTTP rather than the file protocol

One thing that I think should be worth mentioning is that threejs and any additional assets should be hosted via http rather than the [file protocol](/2020/09/21/js-getting-started-file-protocol/). In other words it is not a good idea to just copy and past files into a folder and then open up an index html file in a browser by way of ctrl + o. It might work okay in some situations, but I have found that often I will run into problems with the file protocol that need to be resolved by lossening by browser security settings, or hosting what I am working on over http.

To do this one will need some way to set up and run some back end code, or at least some kind of static web sever to host a public folder via http or https. There are a number of ways to go about doing this, but if you like javaScript as much as I do then you will want to have some sever side code that is a nodejs script of some kind. This is great because there is a how world of back end javaScript code for doing things in the back end without having to learn a whole other programing language. I have wrote a post on how to go about getting started with this sort of thing by just working with [nodejs by itself by making some kind of vanilla javaScript solution for a basic web sever](/2017/12/04/nodejs-simple-static-sever-file/). However it might be best to make use of some kind of [sever side framework like express](/2018/05/24/express-static/).

### Some knowledge of topics outside of geometry and other topics outside of javaScript is helpful

It is worth mentioning that it is a good idea to at least know a thing or two about other topics that do not pertain to javaScript, or even computer programming in general, but classical mathematics. Subjects come to mind like [geometry](https://en.wikipedia.org/wiki/Geometry), [trigonometry](https://en.wikipedia.org/wiki/Trigonometry), and many others. Getting into those subjects goes beyond the scope of this simple getting started post, and are not the kind of things that one can become solid with overnight. However don't let that overwhelm you, as three.js is very easy to work with, and getting into three.js can lead to a desire to become more knowledgeable about those topics, and many more.

### You might also want to install blender at some point

Although it is not required for getting started at least, at some point you might want to install a 3d modeling program of some kind such as [blender](https://www.blender.org/). As you get into the depth of threejs there will come a time where you will want to create assets externally, and then import theme into threejs. There are official plug-ins for doing so, and the best supported and easiest to use one I have found is the one for blender.

### Setup

So threejs is very much a front end resource, so installing will not likely involve npm, unless you want to do something involving [webpack](https://webpack.js.org/) in which I guess it would involve npm. For me I did not use any package manager, and I wanted to set up a situation in which I have multiple versions of three.js in a name space, so I just grab versions of three.js manually from the [github repo](https://github.com/mrdoob/three.js), and pasted them in all low tech like.

### The source code examples for this post are on Github

In my [test threejs Github repository I have the source code examples that I am using for this post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-getting-started). In now also have a corresponding for post folder for each of [my threejs posts](/categories/three-js/) as I get around to editing each of my older threejs posts. Also Cloining down the repo, installing the npm packages, and running the server are great ways to get these examples up and running fast.

### A word about threejs versions

This is one of the first blog posts that I have wrote on threejs way back in 2018, at that time I was using [r91 of the library](https://github.com/mrdoob/three.js/tree/r91). The last time I came around to do a little editing I made some major changes to the many examples here and they are [working fine with r146 of the library and thus followed the style rules I set for that revision](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). There is also one exception to this though as I now also have one demo that follows [my r152 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md). At this time I think I should have at least one getting started type demo on the use of module type script tags rather than the default text/javaScript type tags. There are a whole lot of major changes up ahead so sooner or later you are going to want to learn a thing or two about JSM.

Although I do what I can to keep my content on threejs up to date, many of the posts might still be a bit dated compared to what you might be using now. Always be mindful of what version of threejs you are using as this is still a fast moving project. It seems like new revisions come out as often as once a month, and when they do there are a whole lot of changes, some of which do very much break code. So I decided to structure things in a way in which I can make demos for each revision when I am working out my source code demos in my git hub repo where I store the source ode examples for this post.

## 1 - A basic overview of how to make a three.js project

Threejs will contain a whole lot of constructors that each have a certain importance. There is no way that I can even touch base on all of them, let alone do them justice without having this starting to resemble a dissertation rather than a blog post. However it is possible to touch base on all of the constructors that will be in use in just about any three.js project, including the most basic examples.

As such a three.js project will typically always contain at least one of the following:

* An instance of [THREE.Scene](/2018/05/03/threejs-scene/)
* At least one camera typically [THREE.PerspectiveCamera](/2018/04/07/threejs-camera-perspective/)
* There will need to be a renderer such as with [THREE.WebGLRenderer](/2018/11/24/threejs-webglrenderer/)
* A [Mesh](/2018/05/04/threejs-mesh/) that will contain a [Geometry](/2018/04/14/threejs-geometry/), and a [Material](/2018/04/30/threejs-materials/). Such as with THREE.Mesh, THREE.BoxGeometry, and THREE.MeshBasicMaterial.

In any case you want to get three.js available in the browser one way or another, including the plain old simple way of having a script tag linking to the location of three.js. In addition you might want some kind of container element in your layout where you will inject the dom element created by the renderer that is used, unless you are okay with just appending to body.

The [Scene](/2018/05/03/threejs-scene/) is the space in which everything will go, your objects, cameras, and anything else that would be placed in a scene like a light source. Once you have a scene we will want to add things into it, like an object of some kind to look at with a camera. To do this I will want to call the Object3D add method, and give it a [Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh), that is composed of a [Geometry](https://threejs.org/docs/index.html#api/en/core/BufferGeometry), and a [Material](https://threejs.org/docs/index.html#api/en/materials/Material). I will touch base on all of that, because you should have at least a basic knowledge of all of those things, but not get into depth here, as each of these things could use there own posts.

There is a core class Called [Camera](/2018/04/06/threejs-camera/) that has some methods and properties that are shared across all camera types that are used in three.js. Like most objects in three.js, a Camera inherits from Object3D which gives it methods to help make changing the position, and orientation of the Camera pretty easy. There are then four camera types to choose from, in this post I am only briefly covering the [perspective camera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera).

To make some kind of object to look at I need it's geometry, I will also want to skin that geometry with some kind Of Material, and I will want to tie those two things together into a Mesh. In the example in this Post I used BoxGeometry to quickly create a Cube, and Just a [basic Material](/2018/05/05/threejs-basic-material/) with a [Mesh](/2018/05/04/threejs-mesh/).

In order to see anything I will need to render it using something like Canvas, or webGL. In this post I just used the webGL renderer, but there are additional renderer's available in three.js, such as the canvas renderer that uses the 2d drawing context. That will be a lot slower, but it will give greater support on platforms that do not support webGL that well.

### 1.1 - The basic three.js cube example

A very typical example for getting started with three.js indeed, but still it works to cover the basics of everything if you are new to three.js. Every project will involve a scene, a camera, at least one Object to look at which will be a mesh composed of a geometry, and a material. Also in order to actually see anything you will also need a render as well. That may seem like a lot at first, but once you get into this it all starts to make sense. Trust be this is one of the easiest ways to get into working with 3d objects, and can become a whole lot of fun if you give it a chance.

```html
<html>
<head>
<title>test_threejs demos</title>
<link rel="stylesheet" href="/css/style.css">
<meta name="google" content="notranslate">
</head>
<body>
<div class="nav_container">
    <div class="nav_content">
        <div class="nav_title" ><h1>three.js demos</h1></div>
        <div class="nav_links"> 
            <a href="/">HOME</a> | 
            <a href="/demos">DEMOS</a> | 
            <a href="/videos">VIDEOS</a> | 
            <a href="/sprite-sheets">SPRITE SHEETS</a> | 
            <a href="/forpost">FOR POST</a>
        </div>
    </div>
</div>
<div class="content_container container">
<h1>ForPost: threejs-getting-started</h1>
<div id="demo"></div>
<br>
<script src="/js/threejs/0.140.0/three.min.js"></script>
<script src="/forpost/threejs-getting-started/s1-basic/js/main.js"></script>
<br>
<br>
<br>
</div>
</body>
</html>
```

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
// a scene is needed to place objects in
const scene = new THREE.Scene();
// I will need an camera to look at objects in the scene
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
// In order to see anything I will also need a renderer
// to use with my scene, and camera
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
// I must append the dom element used by the renderer to the html
// that I am using. 
// !!!HERE I AM USING document.body IN THEN EVENT THAT YOU ARE
// JUST COPYING THIS OVER BUT YOU SHOUD CHANGE THIS FOR WHAT IS GOING ON
// WITH YOUR HTML 
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// ADD A MESH
// ---------- ---------- ----------
// I will want to add at least one Mesh to the scene so that I have 
// something to look at. In order to add a Mesh I will need a Geometry, and
// a material to skin that geometry with to create the mesh.
const mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
// ---------- ---------- ----------
// CHANGE THINGS, AND CALL RENDER METHOD
// ---------- ---------- ----------
// now that I have everything I need I can call some methods
// of what I have to set up my scene, camera, and renderer.
// I must at least add the mesh to the scene, and position the camera
// in a way so that it is looking at the mesh
scene.add(mesh);
camera.position.set(250, 250, 250);
camera.lookAt(0,0,0);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
// finally I call renderer.render to draw the current
// state of the scene, from the perspective of the camera
renderer.render(scene, camera);
```

This example will just draw a cube on the screen. So lets have a break down on everything that is going on here.

### 1.2 - Using the JavaScript Module of plain text/javaScript script tags \(  r152 style demo \)

Plain javaScript mime type files of add ons where removed from the threejs github repository as of r148, and it looks like it is only a matter of time until three.js, and three.min.js will no longer be rendered in future revisions of threejs as well. Which means sooner or later three.module.js will need to be used in place of these options. Also if you want to make use of any official add one files from the Github repository such as Orbit Controls, the DAE file loader, so forth and so on, you will also need to use JSM as these files are no longer there for any revision of threejs that is at r148 or later.

To use the JSM I will want to load my main javaScript file of a project by setting the type attribute of the script tag that I use to "module" rather than leaving it at the default "text\/javaScript" mimie type.

```html
<script type="importmap">
    {
        "imports": {
            "three": "/js/threejs/0.152.0/three.module.js",
            "OrbitControls": "/js/threejs/0.152.0/controls/OrbitControls.js"
        }
    }
</script>
<script type="module" src="/forpost/threejs-getting-started/s1-2-jsm/main.js"></script>
```

I will the want to use import at the top of my javaScript file as a way to load in the core threejs library to use with the project. I will then also want to do this with any add on files as well as any of my own modules that are authored in this javaScript module fromat.

```js
// ---------- ----------
// IMPORT - threejs and any add ons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.querySelector('#demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```


## 2 - Animation loop examples

I am of course going to want to have at least one simple animation loop example for this getting started post, I just have to do that. Thinking back to when I was first starting out with this library, yeah that was a must. With that said there are a few things to be aware of when it comes to creating a basic animation loop, not just with threejs, but in general when it comes to any kind of canvas project. For one thing the method that is general used is the [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) method, rather than one of the alternatives methods such as setTimeout.

### 2.1 - Fixed frame by frame loop example

To start things off with this sort of thing the most basic kind of animation loop I think is one where I just step a frame on each call of the loo method. Maybe I do something to cap the frame rate or something to that effect, but for this first example I am not going to want to do anything to complex.

There are a number of things that I could do inside the body of the animation update function, but because this is a getting started post for now I am just updating the instance of [THREE.Euler](/2021/04/28/threejs-euler/) stored at the [rotation property of the mesh object](/2022/04/08/threejs-object3d-rotation/) to create a simple rotation effect of the mesh object.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
// ---------- ----------
// CONTROLS
// ---------- ----------
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   FPS_UPDATE: 30,    // FPS RATE
   FRAME_MAX: 450,
   secs: 0,
   frame: 0,         // 30 / 450
   tick: 0,          //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const degree = 360 * a1;
    box.rotation.x = THREE.MathUtils.degToRad(degree);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render
        update(sm);
        renderer.render(scene, camera);
        // step frame
        sm.frame = ( sm.frame += 1 ) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

This might work okay if I just want to work out some kind of animation loop idea, but there are a number of reasons why I would go with one of the other starting points in this section. The main reason why I have this here is because this is very much a getting started with threejs post. So I have a more basic kind of loop example here, but it lacks a lot of basic features that I think something like this should have.
### 2.2 - Using request Animation frame with an Update FPS and movement FPS rate

For this animation loop example I have two values for FPS, one of which will be used to set the target rate at which the update method will be called. The other FPS rate is used to update the rate at which a frame value will be stepped that will be used to update the state of things in the update method. This allows for me to set the rate at which the update method is called at a low rate as only about 12 frames per second, while updating the frame rate that is used to update state at a rate that is say 30 frames per second. For certian projects in which I am doing something in real time in a web page I might want to make a user interface that will allow the user to adjust the rate at which updating happens to allow them to set how much CPU overhead they would like to use or not, that is what this is all about.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
// ---------- ----------
// CONTROLS
// ---------- ----------
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   FPS_UPDATE: 20,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 450,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const degree = 360 * a1;
    box.rotation.x = THREE.MathUtils.degToRad(degree);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render
        update(sm);
        renderer.render(scene, camera);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

### 2.3 - 2d canvas draw down layer animation loop example

Often I find myself in a situation in which I would just like to have a simple 2d overlay to display some debug info. Also when it comes to making a full project of some kind I might just want to have a single threejs canvas layer between two or more plain old 2d canvas layers. When it comes to drawing a plain old 2d canvas to one of the canvas elements used by the WebGlrenderer, doing so is not so easy. There are ways of doing it of course such as having a canvas texture, and using that with a material for a mesh that uses plane geometry. I have made a [threejs project example](/2023/03/10/threejs-examples-camera-planes/) in which I am doing just that when it comes to doing something that way where I have one or more 2d layers as mesh objects in a scene. However for this demo I am doing things the other way around, that is to just have a simple 2d canvas, and then draw to that 2d canvas with the canvas of the webgl renderer.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const canvas_3d = renderer.domElement;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
// ---------- ----------
// CONTROLS
// ---------- ----------
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, canvas_2d);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   FPS_UPDATE: 12,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 450,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const degree = 360 * a1;
    box.rotation.x = THREE.MathUtils.degToRad(degree);
};
const render2d = (sm) => {
    ctx.clearRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('tick              : ' + sm.tick, 5, 5)
    ctx.fillText('frame_frac        : ' + sm.frame_frac.toFixed(3), 5, 20);
    ctx.fillText('frame / FRAME_MAX : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 35);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

## 3 - Stochastic animation loop example

Often I like to make projects that I will end up using in the process of making some kind of video project. However I think that I should have at least one or more demos that are good starting points for some kind of system that makes use of user input. For this first basic example of this kind of animation loop template I have something where I can define one or more items for an Alpha Controls object. This is a collection of values in the range of 0 to 1 that I can change by clicking an area of the canvas. That is the only way to have user input for this start point at least with one exception which is that it will also make use of Orbit controls if they are there to work with.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
// ---------- ----------
// CONTROLS
// ---------- ----------
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, canvas_2d);
}
// ---------- ----------
// ALPHA CONTROLS
// ---------- ----------
const ac = {
    x: 420, y:20,
    h: 100, w: 200,
    items: {}
};
ac.items.speed = { desc: 'speed', a: 0.75 };
ac.items.axisx = { desc: 'axisX', a: 0.25 };
ac.items.axisz = { desc: 'axisZ', a: 0.25 };
ac.itemCount = Object.keys(ac.items).length;
// for each item method
ac.forEachItem = (forItem) => {
    const keys = Object.keys(ac.items);
    keys.forEach( (key, i, arr) => {
        const item = ac.items[key];
        forItem(item, i, arr);
    });
};
// get an item by index
ac.getItem = (i) => {
    const keys = Object.keys(ac.items);
    return ac.items[keys[i]];
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   pointer: new THREE.Vector2(),
   uidown: false,
   pointerdown: false,
   FPS_UPDATE: 20,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const degree = 360 * (20 * ac.items.speed.a) * a1;
    box.rotation.x = THREE.MathUtils.degToRad( 90 * ac.items.axisx.a);
    box.rotation.y = THREE.MathUtils.degToRad(degree);
    box.rotation.z = THREE.MathUtils.degToRad( 90 * ac.items.axisz.a);
};
const render2d = (sm) => {
    // background
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // draw webGl renderer dom element
    ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
    // debug info
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left'
    ctx.font = '10px monospace';
    ctx.fillText('tick              : ' + sm.tick, 5, 5)
    ctx.fillText('frame_frac        : ' + sm.frame_frac.toFixed(3), 5, 20);
    ctx.fillText('frame / FRAME_MAX : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 35);
    ctx.fillText('pointer : ' + sm.pointer.x.toFixed(2) + ',' + sm.pointer.y.toFixed(2), 5, 50);
    // alpha controls
    ctx.fillStyle = 'gray';
    ctx.fillRect(ac.x, ac.y, ac.w, ac.h);
    ac.forEachItem( (item, i, arr) => {
        ctx.fillStyle = 'red';
        const h = ac.h / arr.length;
        ctx.fillRect(ac.x, ac.y + h * i + 2, ac.w * item.a, h - 2);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.desc, ac.x + ac.w / 2, ac.y + h / 2 + h * i);
    } );
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
// ---------- ----------
// EVENTS
// ---------- ----------
const boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
const pointerEventCommon = (e) => {
    const el = e.target;
    const bx = el.getBoundingClientRect();
    // update pointer
    sm.pointer.x = e.clientX - bx.left;
    sm.pointer.y = e.clientY - bx.top;
};
canvas_2d.addEventListener('pointerdown', (e) => {
    sm.pointerdown = true;
    sm.uidown = false;
    pointerEventCommon(e);
    if( boundingBox(sm.pointer.x, sm.pointer.y, 1, 1, ac.x, ac.y, ac.w, ac.h) && sm.pointerdown){
        sm.uidown = true;
        let a_y = (sm.pointer.y - ac.y) / ac.h;
        a_y = THREE.MathUtils.clamp(a_y, 0, 0.99);
        a_x = (sm.pointer.x - ac.x) / ac.w;
        a_x = THREE.MathUtils.clamp(a_x, 0, 0.99);
        sm.i_item = Math.floor(ac.itemCount * a_y);
        ac.getItem(sm.i_item).a = a_x;
    }
    if(THREE.OrbitControls){
        controls.enabled = !sm.uidown;
    }
});
canvas_2d.addEventListener('pointermove', (e) => {
    pointerEventCommon(e);
    if(sm.uidown){
        const a_x = (sm.pointer.x - ac.x) / ac.w;
        ac.getItem(sm.i_item).a = a_x;
    }
});
canvas_2d.addEventListener('pointerup', (e) => {
    sm.pointerdown = false;
    sm.uidown = false;
    pointerEventCommon(e);
    if(THREE.OrbitControls){
        controls.enabled = true;
    }
});
```

## Conclusion, and what to check out next

Three.js is the kind of library where you really need to devote at least a solid month or more in order to start to get a little solid with it. I am still learning myself, but I think there are some additional aspects of this library that are very important, while others are kind of optional depending on the kind of projects I aim to make. For example if I want to make games I might want to know about the [lambert material](/2018/04/08/threejs-lambert-material/), as it is more efficient then the standard material. However if I aim to make something that does not need to run in real time I might choose to go with the standard material, as it gives a more realistic look.

### This post is still a work in progress

I first wrote this post back in April of 2018, and as of this writing it is now February of 2022. Sense I first started this post much has changed with three.js sense then, and with that said I will continue to update this post when I get some time to do so. As my content on three.js grows, and I edit posts such as this one, I often will link to this post as a way to just pipe people to something that is a good starting point for threejs.

### More on the Box Geometry Constructor

If you are still fairly new to three.js but have some of the basics worked out maybe it would be a good idea to work out a whole bunch of examples where you are just using the Box Geometry Constructor. There is not just having a Cube on the screen, but doing a whole word of things with that cube. For example there is moving it, rotating it, using an array of materials rather than just one, changing what the index values are for those materials, doing things with light and shadow and so forth. With that said maybe [my post on the Box Geometry Constructor](/2021/04/26/threejs-box-geometry/) will be a good next step from here.

### Object3D

A real good class to start really learning a thing ot two about would be the Object3D class, I wrote a [post on Object3D](/2018/04/23/threejs-object3d/), and there is also of course the [official docs on Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D). This is not something that you typically work with directly, but is a class that is used in many of the objects in three.js that helps to make working with three.js easy. It gives Objects like Camera, and Mesh methods like lookAT, and position.set.

### Vector3

Read my full [post on Vector3](/2018/04/15/threejs-vector3/)

Another class of interest that you should at least be aware of is [vector3](https://threejs.org/docs/index.html#api/en/math/Vector3), This is what you want to use when defining a point in 3d Space.

### Check out my project examples

In the long run thought of course what really needs to happen sooner or later is to start making one or two real examples using three.js. That is some kind of game or animation type thing typically, so with that said maybe another step forward would be to [look at some of my basic project examples](/2021/02/19/threejs-examples/).

For now I will cover some additional corners of three.js that I think stand out...
