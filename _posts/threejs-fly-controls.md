---
title: Fly Controls in threejs
date: 2021-05-05 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 860
updated: 2022-04-20 07:38:17
version: 1.19
---

There are a number of official camera controls that can be used with [threejs](https://threejs.org/) it is just that they are not built into the core of three.js itself. I wrote a post on one of these camera control options which was the orbit controls a long time ago, but I thought that I should take a moment to look into at least one of the other options to make use of in some examples such as the [three.js fly controls](https://threejs.org/docs/#examples/en/controls/FlyControls.dragToLook). So then this will be a quick post on use the official fly controls in a three.js project.

<!-- more -->

## Fly Controls in three.js and what to know first

In this post I am writing about the official three.js fly controls in three.js which is a javaScript library that can be used to work with 3d models. So then this is not a getting started type post with three.js as I have wrote a post on that topic before. However in this section I will be going over a few quick things to know about before continuing with the code examples that I am writing about here with the three.js fly controls.

### Make sure that you have added the fly controls after adding three.js in the html

The official fly controls can be found in the [examples folder of the official three.js github repository](https://github.com/mrdoob/three.js/blob/r127/examples/js/controls/FlyControls.js). When grabbing a copy from there make sure that it is for the version of three.js that you are using. Changes are rare with many of these controls, but I have found that they do happen once in a while.

### Version Numbers matter with three.js

When I wrote this post I was using [r127 of three.js](https://github.com/mrdoob/three.js/tree/r127). Code breaking changes are made to three.js every now and then so if the examples here are not working the first thing to check is what version of three.js is being used. After that there are some additional things to be aware of such as the fact that these code examples will break if you are not adding the official fly controls on top of three.js by itself.

## 1 - Basic fly controls example

Now that I have the basic out of the way when it comes to getting started with things, lets take a look at a basic fly controls example. Like always I start off by creating a scene object just like with any other three.js example, and I am then also going to want to have something to look at. For this I made a few mesh objects one to serve as a kind of ground object, and then another as just some additional object at the center of the scene. Nothing special this is a post on fly controls after all so I really do just want something to look at and that is all. After that I set up the renderer that I want to use for this example and for that I went with the typical web gl renderer.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
 
    // Something to look at
    var groundBox = new THREE.Mesh(
            new THREE.BoxGeometry(10, 1, 10),
            new THREE.MeshDepthMaterial());
    groundBox.position.set(0, -1, 0);
    scene.add(groundBox);
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // FLY CONTROLS the camera is given as the first argument, and
    // the DOM element must now be given as a second argument
    var flyControls = new THREE.FlyControls(camera, renderer.domElement);
    flyControls.dragToLook = true;
    flyControls.movementSpeed = 10;
    flyControls.rollSpeed = 1;
    // loop
    var lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        lt = now;
        requestAnimationFrame(loop);
        // UPDATE CONTROLS
        flyControls.update(1 * secs);
        renderer.render(scene, camera);
    };
 
    loop();
 
}
    ());
```

So now that I have all the basic stuff in place when it comes to having a scene object as well as something to look at in terms of one or more mesh objects, a camera object, and a renderer all in place now I can get to the actual fly controls. To use the Fly Controls I just need to call the THREE.FlyControls constructor that is added by way of the additional files in the examples folder of the three.js github repo that I mentioned in the basic section of this post. When calling the constructor the first argument that I am going to want to pass is a reference to the camera object that I want to control with the fly controls, followed by a dom element reference that should typically be the dom element used by the renderer that I am using. AFter that I am more often than not going to want to save the returned instance of fly controls to a variable or object property to set some additional values, and also to call the update method in a main app loop method.

When it comes to the additional properties there is the draw to look boolean that I have chose to set to true from the default false value of the controls. There is also the movement speed, and rotation speed values that I have played around with a little and it would seem that these are the per second deltas to use when passing a time delta value when calling the update method.

After that I have my main app loop in which I am getting a seconds value each time the loop method is called and I am then of course passing that to the update method of the fly controls each time.

There is then how to go about using the fly controls when and if you do get them up and running, with that said there are the w,a,s,d keys along with the q, and e keys on the keyboard that should be of interest for you. The wasd keys can be used to change the camera position along a forward backward and up and down kind of movement. The q and e keys are then ways to adjust rotation with the keyboard rather than the mouse. The mouse then can be used as a way to look around from the current camera position.

## 2 - Conclusion

So that is all that I have to say about the official fly controls in three.js so far, when I get some time to edit this post I will be sure to expand things when and if I get the time to do so. For now there is maybe taking a moment to look into some of the other official controls to worth with such as the [orbit controls](/2018/04/13/threejs-orbit-controls/) also, before considering to look into how to get started with making ones own custom camera controls. I think that I will be getting around to working one or two demos about making custom controls sooner or later, but for now I just like to make use of what there is to work with that is official to just save some time.

