---
title: Getting started with three.js with a basic scene example
date: 2018-04-04 20:48:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 167
updated: 2022-05-05 10:30:50
version: 1.36
---

I have been wanting to write a series of posts on [three.js](https://threejs.org/) for a while now, and I do not care to put it off any longer. I have fiddled with three.js in the past, but never really got into it, that is until now. I have enough experience with it to know that it helps making projects that involve 3d objects very easy, yet it is still something that takes a significant investment of time to get fairly solid with. Also there is not just what there is to know about the various feature of the library, but also what there is to known when it comes to working with 3d in general. For example when it comes to really getting into 3d at some point sooner or later I am going to want to also get into using blender as a way to go about making external files that I can then load into a scene.

Also three.js is one of those javaScript projects that is just plain awesome. Working with solid geometric space is one of the main reasons why I got into programing in the first place, so of course I need to write about this one, how can I not? So this will be a getting started post, that will kick off at least a first few [additional posts](/categories/three-js/) on this subject, and I can see it going beyond that easy.

<!-- more -->

## 1 - What to know before getting started with three.js

Of course it goes without saying that you need a decent understanding of front end javaScript, and  the related languages including HTML and CSS. However there are some additional things to be aware of as well, as this is a fairly complex library that can quickly lead in many additional directions.

There is a lot that should be covered first before moving on to three.js, and I do not think I can cover all of it in a single blog post such as this. However I will try my best to cover at least some of the most impotent topics that one should know about before getting started with three.js.

<iframe class="youtube_video" src="https://www.youtube.com/embed/ClD09l-Fu-I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 1.1 - Make sure you are hosting what you are working on via HTTP rather than the file protocol

One thing that I think should be worth mentioning is that three.js and any additional assets should be hosted via http rather than the [file protocol](/2020/09/21/js-getting-started-file-protocol/). In other words it is not a good idea to just copy and past files into a folder and then open up an index html file in a browser by way of ctrl + o. It is then a good idea to host what is being worked on via http, even when working on it locally. 

To do this one will need some way to set up and run some back end code, or at least some kind of static web sever to host a public folder via http. There are a number of ways to go about doing this, but if you like javaScript as much as I do then you will want to have some sever side code that is a nodejs script of some kind. I have wrote a post on how to go about getting started with this sort of thing by just working with [nodejs by itself by making some kind of vanilla javaScript solution for a basic web sever](/2017/12/04/nodejs-simple-static-sever-file/). However it might be best to make use of some kind of [sever side framework like express](/2018/05/24/express-static/).

### 1.2 - A word about three.js versions

Three.js is a project where the version number matters a lot, very significant changes are still being made all the time. When I first wrote this post I was using [version r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I cam around to do a little editing I was using [version r127](https://github.com/mrdoob/three.js/tree/r127).

It seems like new revisions come out as often as once a month, and when they do there are a whole lot of changes. So I decided to structure things in a way in which I can make demos for each revision when I am working out my source code demos in my git hub repo where I store the source ode examples for this post.

### 1.3 - The source code examples for this post are on Github

In my [test threejs Github repository I have the source code examples that I am using for this post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-getting-started). In time I aim to hav a corresponding for post folder for each of my threejs posts as I get around to editing each of my older threejs posts.

### 1.4 - Some knowledge of topics outside of geometry and other topics outside of javaScript is helpful

It is worth mentioning that it is a good idea to at least know a thing or two about other topics that do not pertain to javaScript, or even computer programing in general, but classical mathematics. Subjects come to mind like [geometry](https://en.wikipedia.org/wiki/Geometry), [trigonometry](https://en.wikipedia.org/wiki/Trigonometry), and many others. Getting into those subjects goes beyond the scope of this simple getting started post, and are not the kind of things that one can become solid with overnight. However don't let that overwhelm you, as three.js is very easy to work with, and getting into three.js can lead to a desire to become more knowledgeable about those topics, and many more.

### 1.5 - You might also want to install blender

Although it is not required for getting started at least, at some point you might want to install a 3d modeling program of some kind such as [blender](https://www.blender.org/). As you get into the depth of three.js there will come a time where you will want to create assets externally, and then import theme into three.js. There are official plug-ins for doing so, and the best supported and easiest to use one I have found is the one for blender.


## 2 - Setup

So three.js is very much a front end resource, so installing will not likely involve npm, unless you want to do something involving [webpack](https://webpack.js.org/) in which I guess it would involve npm. For me I did not use any package manager, and I wanted to set up a situation in which I have multiple versions of three.js in a name space, so I just grab versions of three.js manually from the [github repo](https://github.com/mrdoob/three.js), and pasted them in all low tech like.

## 3 - A basic overview of how to make a three.js project

Three.js will contain a whole lot of constructors that each have a certain importance. There is no way that I can even touch base on all of them, let alone do them justice without having this starting to resemble a dissertation rather than a blog post.

However it is possible to touch base on all of the constructors that will be in use in just about any three.js project, including the most basic examples.

As such a three.js project will typically always contain at least one of the following:

* An instance of [THREE.Scene](/2018/05/03/threejs-scene/)
* At least one camera typically [THREE.PerspectiveCamera](/2018/04/07/threejs-camera-perspective/)
* There will need to be a renderer such as with THREE.WebGLRenderer
* A [Mesh](/2018/05/04/threejs-mesh/) that will contain a [Geometry](/2018/04/14/threejs-geometry/), and a [Material](/2018/04/30/threejs-materials/). Such as with THREE.Mesh, THREE.BoxGeometry, and THREE.MeshBasicMaterial.

### 3.1 - HTML

In any case you want to get three.js available in the browser one way or another, including the plain old simple way of having a script tag linking to the location of three.js. In addition you might want some kind of container element in your layout where you will inject the dom element created by the renderer that is used, unless you are okay with just appending to body.

As such the html of one of my demos looks like this for the moment.

```html
<html>
  <head>
    <title>test_threejs demos</title>
    <link rel="stylesheet" href="/css/style.css">
    <meta name="google" content="notranslate">
  </head>
  <body>
    <div class="nav_container container">
      <div><h1>three.js demos</h1></div>
      <div> 
        <a href="/">HOME</a> | 
        <a href="/demos">DEMOS</a> | 
        <a href="/videos">VIDEOS</a> | 
        <a href="/sprite-sheets">SPRITE SHEETS</a> | 
        <a href="/forpost">FOR POST</a>
      </div>
    </div>
    <div class="content_container container">
      <h1>ForPost: threejs-getting-started</h1>
      <div id="demo"></div>
      <br>
      <script src="/js/threejs/0.127.0/three.min.js"></script>
      <script src="/forpost/threejs-getting-started/s3-basic-overview/js/main.js"></script>
      <br>
      <br>
      <br>
    </div>
  </body>
</html>
```

### 3.2 - The basic three.js cube example

A very typical example for getting started with three.js indeed, but still it works to cover the basics of everything if you are new to three.js. Every project will involve a scene, a camera, at least one Object to look at which will be a mesh composed of a geometry, and a material. Also in order to actually see anything you will also need a render as well. That may seem like a lot at first, but once you get into this it all starts to make sense. Trust be this is one of the easiest ways to get into working with 3d objects, and can become a whole lot of fun if you give it a chance.

```js
(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    // a scene is needed to place objects in
    let scene = new THREE.Scene();
    // I will need an camera to look at objects in the scene
    let camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    let renderer = new THREE.WebGLRenderer();
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // ADD A MESH
    // ---------- ---------- ----------
    // I will want to add at least one Mesh to the scene so that I have 
    // something to look at. In order to add a Mesh I will need a Geometry, and
    // a material to skin that geometry with to create the mesh.
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
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
    renderer.setSize(640, 480);
    // finally I call renderer.render to draw the current
    // state of the scene, from the perspective of the camera
    renderer.render(scene, camera);
}
    ());
```

This example will just draw a cube on the screen. So lets have a break down on everything that is going on here.

### 3.3 - The Scene

Full post on [Scene](/2018/05/03/threejs-scene/)

The [Scene](https://threejs.org/docs/index.html#api/en/scenes/Scene) is the space in which everything will go, your objects, cameras, and anything else that would be placed in a scene like a light source. Once you have a scene we will want to add things into it, like an object of some kind to look at with a camera. 

To do this I will want to call the Object3D add method, and give it a [Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh), that is composed of a [Geometry](https://threejs.org/docs/index.html#api/en/core/BufferGeometry), and a [Material](https://threejs.org/docs/index.html#api/en/materials/Material). I will touch base on all of that, because you should have at least a basic knowledge of all of those things, but not get into depth here, as each of these things could use there own posts.

```js
var scene = new THREE.Scene(); // Scene
scene.add(new THREE.Mesh( // Mesh
    new THREE.BoxGeometry(200, 200, 200), // Geometry
    new THREE.MeshBasicMaterial({ // Material
        color: 0xff0000,
        wireframe: true
    })
));
```

### 3.4 - The Camera

Full post on [Camera](/2018/04/06/threejs-camera/)

There is a core class Called [Camera](https://threejs.org/docs/index.html#api/en/cameras/Camera) that has some methods and properties that are shared across all camera types that are used in three.js. 

Like most objects in three.js, a Camera inherits from Object3D which gives it methods to help make changing the position, and orientation of the Camera pretty easy.

```js
var fieldOfView = 45,
aspectRatio = 16 / 9,
near = 1,
far = 1000,
 
// I can now make an instance of Perspective Camera
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
 
// move the camera to 250,250,250, and look at the origin.
camera.position.set(250,250,250);
camera.lookAT(0,0,0);
```

There are then four camera types to choose from, in this post I am only briefly covering the [perspective camera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera).

### 3.5 - Geometry, Material, and Mesh.

To make some kind of object to look at I need it's geometry, I will also want to skin that geometry with some kind Of Material, and I will want to tie those two things together into a Mesh. In the example in this Post I used BoxGeometry to quickly create a Cube, and Just a [basic Material](/2018/05/05/threejs-basic-material/) with a [Mesh](/2018/05/04/threejs-mesh/).

### 3.6 - Renderer

In order to see anything I will need to render it using something like Canvas, or webGL. In this post I just used the webGL renderer, but there are additional renderer's available in three.js, such as the canvas renderer that uses the 2d drawing context. That will be a lot slower, but it will give greater support on platforms that do not support webGL that well.

## 4 - Basic Animation loop example

I am of course going to want to have at least one simple animation loop example for this getting started post, I just have to do that. Thinking back to when I was first starting out with this library, yeah that was a must. With that said there are a few things to be aware of when it comes to creating a basic animation loop, not just with threejs, but in general when it comes to any kind of canvas project. For one thing the method that is general used is the [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) method, rather than one of the alternatives methods such as setTimeout.

### 4.1 - The updated javaScript for an animation loop example

For a basic animation loop example I then took the source code for the general overview example that I start this post with, and just added an animation loop function at the end. There are a number of things that I could do inside the body of the animation loop function, but because this is a getting started post for now I am just updating the instance of THREE.Euler to create a simple rotation effect.

```js
(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    let scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),
    renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // ADD A MESH
    // ---------- ---------- ----------
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // ---------- ---------- ----------
    // ANIMATION LOOP
    // ---------- ---------- ----------
    camera.position.set(250, 250, 250);
    camera.lookAt(0,0,0);
    renderer.setSize(640, 480);
    let degree = 0, degreesPerSecond = 90, lt = new Date();
    let loop = function(){
        let now = new Date(), secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        degree += degreesPerSecond * secs;
        degree %= 360;
        mesh.rotation.x = THREE.MathUtils.degToRad(degree);
        renderer.render(scene, camera);
        lt = now;
    };
    loop();
}());
```

## 5 - Conclusion, and what to check out next

Three.js is the kind of library where you really need to devote at least a solid month or more in order to start to get a little solid with it. I am still learning myself, but I think there are some additional aspects of this library that are very important, while others are kind of optional depending on the kind of projects I aim to make. For example if I want to make games I might want to know about the [lambert material](/2018/04/08/threejs-lambert-material/), as it is more efficient then the standard material. However if I aim to make something that does not need to run in real time I might choose to go with the standard material, as it gives a more realistic look.

### 5.1 - This post is still a work in progress

I first wrote this post back in April of 2018, and as of this writing it is now February of 2022. Sense I first started this post much has changed with three.js sense then, and with that said I will continue to update this post when I get some time to do so. As my content on three.js grows, and I edit posts such as this one, I often will link to this post as a way to just pipe people to something that is a good starting point for threejs.

### 5.2 - More on the Box Geometry Constructor

If you are still fairly new to three.js but have some of the basics worked out maybe it would be a good idea to work out a whole bunch of examples where you are just using the Box Geometry Constructor. There is not just having a Cube on the screen, but doing a whole word of things with that cube. For example there is moving it, rotating it, using an array of materials rather than just one, changing what the index values are for those materials, doing things with light and shadow and so forth. With that said maybe [my post on the Box Geometry Constructor](/2021/04/26/threejs-box-geometry/) will be a good next step from here.

### 5.3 - Object3D

A real good class to start really learning a thing ot two about would be the Object3D class, I wrote a [post on Object3D](/2018/04/23/threejs-object3d/), and there is also of course the [official docs on Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D). This is not something that you typically work with directly, but is a class that is used in many of the objects in three.js that helps to make working with three.js easy. It gives Objects like Camera, and Mesh methods like lookAT, and position.set.

### 5.4 - Vector3

Read my full [post on Vector3](/2018/04/15/threejs-vector3/)

Another class of interest that you should at least be aware of is [vector3](https://threejs.org/docs/index.html#api/en/math/Vector3), This is what you want to use when defining a point in 3d Space.

### 5.5 - Check out my project examples

In the long run thought of course what really needs to happen sooner or later is to start making one or two real examples using three.js. That is some kind of game or animation type thing typically, so with that said maybe another step forward would be to [look at some of my basic project examples](/2021/02/19/threejs-examples/).

For now I will cover some additional corners of three.js that I think stand out...


