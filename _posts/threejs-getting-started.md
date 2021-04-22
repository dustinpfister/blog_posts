---
title: Getting started with three.js with a basic cube demo
date: 2018-04-04 20:48:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 167
updated: 2021-04-22 14:46:11
version: 1.16
---

I have been wanting to write a series of posts on [three.js](https://threejs.org/) for a while now, and I do not care to put it off any longer. I have fiddled with three.js in the past, but never really got into it. I have enough experience with it to know that it helps making projects that involve 3d objects very easy, yet it is still something that takes a significant investment of time to get fairly solid with.

Also three.js is one of those javaScript projects that is just plain awesome. Working with solid geometric space is one of the main reasons why I got into programing in the first place, so of course I need to write about this one, how can I not? So this will be a getting started post, that will kick off at least around ten [additional posts](/categories/three-js/) on this subject, and I can see it going beyond that easy.

<!-- more -->

## 1 - What to know before getting started with three.js

Of course it goes without saying that you need a decent understanding of front end javaScript, and  the related languages including HTML and CSS. However there are some additional things to be aware of as well, as this is a fairly complex library that can quickly lead in many additional directions.

There is a lot that should be covered first before moving on to three.js, and I do not think I can cover all of it in a single blog post such as this. However I will try my best to cover at least some of the most impotent topics that one should know about before getting started with three.js.

### 1.1 - make sure you are hosting what you are working on via HTTP rather than the file protocol

One think that I think should be worth mentioning is that three.js and any additional assets should be hosted via http rather than the file protocol. In other words it is not a good idea to just copy and past files into a folder and then open up an index html file in a browser by way of ctrl+o. So it is a good idea to host what is being worked on via http, even when working on it locally. To do this one will need some way to set up and run some back end code, or at least some kind of static web sever to host a public folder via http.

### 1.2 - A word about three.js versions

Three.js is a project where the version number matters a lot, very significant changes are still being made all the time. In this demo I am using [version r91](https://github.com/mrdoob/three.js/tree/r91/build).

It seems like new revisions come out as often as once a month, and when they do there are a whole lot of changes, so I decided to structure things in a way in which I can make demos for each revision.

### 1.3 - Some knowledge of topics outside of geometry and other topics outside of javaScript is helpful

It is worth mentioning that it is a good idea to at least know a thing or two about other topics that do not pertain to javaScript, or even computer programing in general, but classical mathematics. Subjects come to mind like [geometry](https://en.wikipedia.org/wiki/Geometry), [trigonometry](https://en.wikipedia.org/wiki/Trigonometry), and many others. Getting into those subjects goes beyond the scope of this simple getting started post, and are not the kind of things that one can become solid with overnight. However don't let that overwhelm you, as three.js is very easy to work with, and getting into three.js can lead to a desire to become more knowledgeable about those topics, and many more.

### 1.4 - You might also want to install blender

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
<!doctype html>
<html>
    <head>
        <title>test_threejs demos</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <div class="nav_container container">
            <div><h1>three.js demos</h1></div>
            <div> <a href="/">HOME</a> | <a href="/demos">DEMOS</a> </div>
        </div>
        <div class="content_container container">
            <h2>three.js demo page: </h2>
            demoName : camera-perspective <br>
            revision used : r91
 
            <!-- link to three.js -->
            <script src="/js/threejs/0.91.0/three.min.js" ></script>
            <h1>Three.js (r91) cube demo</h1>
 
            <!-- container for my demo -->
            <div id="demo"></div>
 
            <!-- link to the source code of my demo-->
            <script src="cube/js/main.js"></script>
        </div>
    </body>
</html>
```

### 3.2 - The basic three.js cube example

A very typical example for getting started with three.js indeed, but still it works to cover the basics of everything if you are new to three.js. Every project will involve a scene, a camera, at least one Object to look at which will be a mesh composed of a geometry, and a material. Also in order to actually see anything you will also need a render as well. That may seem like a lot at first, but once you get into this it all starts to make sense. Trust be this is one of the easiest ways to get into working with 3d objects, and can become a whole lot of fun if you give it a chance.


```js
(function () {
 
    // a scene is needed to place objects in
    var scene = new THREE.Scene(),
 
    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),
 
    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),
 
    // I will need a material for the cube
    material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });
 
    // I need a mesh that will tie a geometry and material together
    mesh = new THREE.Mesh(geometry, material),
 
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();
 
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // now that I have everything I need I can call some methods
    // of what I have to set up my scene, camera, and renderer.
    // I must at least add the mesh to the scene, and position the camera
    // in a way so that it is looking at the mesh
    scene.add(mesh);
    camera.position.z = 250;
    camera.position.x = 250;
    camera.lookAt(0,0,0);
    renderer.setSize(320, 240);
 
    // finally I call renderer.render to draw the current
    // state of the scene, from the perspective of the camera
    renderer.render(scene, camera);
 
}
    ());
```

This example will just draw a cube on the screen. So lets have a break down on everything that is going on here.

## 4 - The Scene

Full post on [Scene](/2018/05/03/threejs-scene/)

The [Scene](https://threejs.org/docs/index.html#api/scenes/Scene) is the space in which everything will go, your objects, cameras, and anything else that would be placed in a scene like a light source. Once you have a scene we will want to add things into it, like an object of some kind to look at with a camera. 

To do this I will want to call the Object3D add method, and give it a [Mesh](https://threejs.org/docs/index.html#api/objects/Mesh), that is composed of a [Geometry](https://threejs.org/docs/index.html#api/core/Geometry), and a [Material](https://threejs.org/docs/index.html#api/materials/Material). I will touch base on all of that, because you should have at least a basic knowledge of all of those things, but not get into depth here, as each of these things could use there own posts.

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

## 5 - The Camera

Full post on [Camera](/2018/04/06/threejs-camera/)

There is a core class Called [Camera](https://threejs.org/docs/index.html#api/cameras/Camera) that has some methods and properties that are shared across all camera types that are used in three.js. 

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

There are then four camera types to choose from, in this post I am only briefly covering the [perspective camera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera).

## 6 - Geometry, Material, and Mesh.

To make some kind of object to look at I need it's geometry, I will also want to skin that geometry with some kind Of Material, and I will want to tie those two things together into a Mesh. In the example in this Post I used BoxGeometry to quickly create a Cube, and Just a [basic Material](/2018/05/05/threejs-basic-material/) with a [Mesh](/2018/05/04/threejs-mesh/).

## 7 - Renderer

In order to see anything I will need to render it using something like Canvas, or webGL. In this post I just used the webGL renderer, but there are additional renderer's available in three.js, such as the canvas renderer that uses the 2d drawing context. That will be a lot slower, but it will give greater support on platforms that do not support webGL that well.

## 8 - Whats next?

Three.js is the kind of library where you really need to devote at least a solid month or more in order to start to get a little solid with it. I am still learning myself, but I think there are some additional aspects of this library that are very important, while others are kind of optional depending on the kind of projects you aim to make. For example if you want to make games you might want to know about the [lambert material](/2018/04/08/threejs-lambert-material/), as it is more efficient then the standard material. However if you aim to make something that does not need to run in real time you might choose to go with the standard material, as it gives a more realistic look.

For now I will cover some additional corners of three.js that I think stand out...

## 9 - Object3D

read my full [post on Object3D](/2018/04/23/threejs-object3d/)

Yet another Class to mention is the [Object3D](https://threejs.org/docs/index.html#api/core/Object3D) class, This is not something that you typically work with directly, but is a class that is used in many of the objects in three.js that helps to make working with three.js easy. It gives Objects like Camera, and Mesh methods like lookAT, and position.set.

## 10 - Vector3

Read my full [post on Vector3](/2018/04/15/threejs-vector3/)

Another class of interest that you should at least be aware of is [vector3](https://threejs.org/docs/index.html#api/math/Vector3), This is what you want to use when defining a point in 3d Space.

## 11 - Conclusion

There is a lot more to write about, but because this is just a getting started post, I thought I would just stick to writing about some of the most important aspects of three.js that one needs to be aware of in order to get anything done at all. I will likely update this post many times, as my content on three.js grows, and treat this as a good starting point to other posts of interest on three.js as I tinker with it more.