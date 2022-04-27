---
title: Working with a perspective camera in three.js
date: 2018-04-07 10:49:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 169
updated: 2022-04-27 09:52:01
version: 1.42
---

One of the most important things to understand when making a [three.js](https://threejs.org/) project, is working with a [perspective camera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera) which will be needed in order to draw a scene object with a renderer. There are other types of cameras to work with in three.js that are all based off the core [Camera Class](https://threejs.org/docs/index.html#api/cameras/Camera), but a perspective camera is the most common one that mimics the way the human eye sees the world, so it is the typical choice for most projects for this reason.

When creating an instance of a perspective camera it is a good idea to be aware of the values that are passed when calling the THREE.PerspectiveCamera constructor for the fist time that have to do with the creating of what might be called a [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum. The values that are passed have to do with field of view, aspect ration, and the near and far render distance. It is also called for to know how to go about changing these values after creating an instance of the camera as it is not just a question of setting new values to a property of interest. 

There are also things like knowing how to position a camera, and set the orientation of a camera, much of that has to do with the [Object3D Class](https://threejs.org/docs/index.html#api/core/Object3D) class of which the base camera class is based off of. The Object3d class is a major class in threejs that is not just the base class for cameras, but also Mesh objects, Groups, and even a whole Scene object. So maybe getting into the object3d class in detail would be a bit off topic, but I should cover at least some basics with that, and maybe many other related topics in this post.

<!-- more -->

## The perspective camera, and what to know before hand

This is not an [introduction to three.js](/2018/04/04/threejs-getting-started/), or any additional skills that are required first in order to start working with something like three.js such as javaScript, and web programing in general. I assume that you have working knowledge of javaScript, and have started working with some basic three.js examples. However if you feel that you could stand to gain a deeper understanding of perspective cameras in three.js this post might be of value to you. In this section I will still be going over a few things that you might want to read up more on if you are still fairly new to threejs, or have still not picked up every little detail just yet that might be good to know.

### The source code examples in this post and many more are on my github account

The source code examples for this post, as well as my many other posts can be found in [my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-camera-perspective). If for some reason you want to make a pull request that would be where to do it, there is also the comments section of this blog post that can be used to bring something up

### There is also looking into the base Camera Class and what the other options are with cameras

there is also looking into the [base camera class](/2018/04/06/threejs-camera/) in threejs, as well as what the other options are with cameras. For the most part though I have to say that I almost always just use the perspective camera in just about every source code example, and project. Still there are some other options, and one option that I might want to use once in a while would be the [orthographic camera](/2018/05/17/threejs-camera-orthographic/).

### Read up more on the Object3d base class

It might be a good idea to read up more on the [object3d class](/2018/04/23/threejs-object3d/) that is a base class of a Camera, and many other objects in threejs. In this post I will be going over some examples that make use of the position, and rotation properties of a Perspective Camera object which are properties that are inherited by the Object3d class. There is also the nature of the values of these position and rotation properties where they are instances of the [Vector3](/2018/04/15/threejs-vector3/), and [Euler](/2021/04/28/threejs-euler/) classes, which are also worth checking out in detail at one point or another.

### Version Numbers Matter

When I first wrote this post I was using threejs version r91, and the last time I cam around to do some editing and make sure the source code examples are working I was using r127. There have been an awful lot of changes that have happened to threejs between the two version numbers, which have resulted in an awful lot of code breaking changes. it is also safe to assume that this trend will continue moving forward, so I got into the habit of always making sure that I mention what the version numbers are when I wrote a post as well as when I edited the post last.


## 1 - Basic example of the perspective camera constructor

In this section I will be going over just the perspective camera class for the most part, but will also be touching base slightly on many other topics on threejs while I am at it. It is still a good idea to have a strong foundational understanding of all of the typical constructors that are used to even create a simple starting example such as the one in this section, so I will see about linking to other posts as needed with this. 

### 1.1 - A Basic source code example

So then here is a very basic copy and past threejs example of the threejs perspective camera where I am just creating a Camera, as well as a [Scene Object](/2018/05/03/threejs-scene/), a [Mesh object](/2018/05/04/threejs-mesh/) with a [Geometry](/2021/04/22/threejs-buffer-geometry/) and a [Material](/2018/04/30/threejs-materials/), and a [renderer](/2018/11/24/threejs-webglrenderer/). 

I am just creating an instance of the perspective camera with the constructor, and when doing so I need to pass arguments for field of view, aspect ratio, as well as near and far render distances. These are all values that have to do with a camera in general, or the perspective camera and as such they differ from other values that might be from a base class other than then base camera class, such as Object3d. As such when it comes to changing this arguments at run time doing so is not so straight forward compared to other values and often a special update method must be used to update the values at run time, more on that later as this is just a basic example where I will not be getting into any kind of animation or mutation of values in a loop here. 

```js
(function () {
    // CAMERA
    var fieldOfView = 40,
    aspectRatio = 4 / 3,
    near = 0.1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.position.set(2, 2, 2); // position camera
    camera.lookAt(0, 0, 0);       // have camera look at 0,0,0
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    // mesh
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
    // renderer
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    renderer.render(scene, camera);
}
    ());
```

Once I have a camera instance I can pass that to the render method that I am using along with a scene to view the scene with that camera. I should make sure that the camera is positioned, and rotated in a way in which I am looking at something in the scene. One way is to use the position property, and [look at methods](/2021/05/13/threejs-object3d-lookat/) of the camera instance both of which are Object3d class features.

### 1.2 - Understanding Viewing frustum.

A [Viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum) cam be thought of as a pyramid of vision that exists in front of a camera. Any object that lays inside of the pyramid will be rendered, while anything outside of it will not which will help to reduce overhead in very complex scenes that may contain a great number of mesh objects. This pyramid can be defined by a [field of view](https://en.wikipedia.org/wiki/Field_of_view) in terms of an angle in y direction. As well as additional values that define the aspect ratio of this view, as well as values that define where the top of the pyramid begins, and ends, in other words view distance, or range of you prefer.

### 1.3 - Field of view

The first argument that is given to the three.js perspective camera constructor is the field of view. The value expected should be a Number representing an angle in degrees not radians. I am not always so sure what the best value might be for this, the general way of dealing with it has been to just play around with different static values until I get something that looks okay. However looking at all [kinds of various examples on this on the open web](https://stackoverflow.com/questions/57959190/three-js-update-the-fov-value-of-a-perspective-camera-and-keep-the-same-camera-d) I am sure there are ways of coming up with or finding some kind of system that will work well for setting this value as well as the aspect ratio value.

### 1.4 - Aspect ratio

The aspect ratio is the second argument that is given to the three.js perspective camera constructor. This value is the width divided by the height of the desired ratio and as such can often be created by just dividing the width and height of the dome element canvas, or the values that will be set for such as canvas when setting up a renderer. Typically you might want to set this to something like 16 over 9, or 4 over 3. Whatever value you set will be used to determine the width and height of the near, and far rectangles of the pyramid of vision, but not the distance between these rectangles as that is what the nest arguments are for.

### 1.5 - Near distance

This is the near bound of the frustum, any object that is from this distance, outward to the far distance will be rendered if it is inside the pyramid of vision.

### 1.6 - Far distance

This is for course the far distance of the view pyramid. It is also the distance at which the aspect ratio of the field of view will be at it's largest, the bottom of the pyramid. If you are ever asking yourself, how far is to far, this value is of interest, as anything the exists beyond this distance will not be rendered.

## 2 - Changing the pyramid of vision during runtime with the updateProjectionMatrix method

With most projects typically I will be setting some values for the camera just once, and then change values that are part of the Object3D class for instance if I want to move the position, and orientation of the camera. Still if I want to change any of the properties that are used to create the geometry of the view pyramid, I might need to make use of a method that needs to be called after I change those values in order to update the projection matrix. The method to do this is then called the update projection matrix method which will need to be called when changing values like field of view, aspect, near, and far. If this method is not called then any changes made to these values will not take effect.

A full list of the properties that correspond with the arguments that you give to the constructor are:

* camera.fov
* camera.aspect
* camera.near
* camera.far

However if I make a change to a value that has to do with the position, rotation, or any kind of Object3d level class property such as the name of the camera for example, then there is no need to call the update projection matrix method. Changes to those kinds of values will always have the same result as with any other object in threejs such as a Mesh, or Group.

```js
(function () {
    // CAMERA
    var fieldOfView = 40,
    aspectRatio = 4 / 3,
    near = 0.1,
    far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.position.set(2, 2, 2); // position camera
    camera.lookAt(0, 0, 0);       // have camera look at 0,0,0
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    // mesh
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
    // renderer
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
 
    // loop
    var state = {
        per: 0,
        bias: 0,
        frame: 0,
        maxFrame: 600,
        fps: 30,
        lt: new Date()
    };
    var loop = function(){
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        requestAnimationFrame(loop);
        if(secs > 1 / state.fps){
            camera.fov = Math.floor(25 + 75 * state.bias);
            camera.updateProjectionMatrix();
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            renderer.render(scene, camera);
            state.lt = new Date();
        }
    };
    loop();
 
}
    ());
```

## 3 - Mutation of near and far values and the depth material

The near and far values are used to set the the range in terms of how close is to close, and how far is to far when it comes to rendering something in a scene. There is also the depth material that can be used with a mesh as a way to gain a better sense of what is going on with these values. So in this example I am using the depth material to skin a mesh, and also mutating the near and far values of the camera over time.

```js
(function () {
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    // so here I am setting the values of the perspective camera
    var fieldOfView = 45,
    aspectRatio = 4 / 3,
    near = 1,
    far = 15,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
 
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // initialize method
    var init = function () {
        // add a cube to the scene
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshDepthMaterial({}));
        cube.position.set(0, 0.5, 0);
        scene.add(cube);
        // camera pos
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0.5, 0);
    };
    // update method
    var update = function (per, bias, secs) {
        // update aspect and fov
        camera.near = 0.1 + 3 * bias;
        camera.far = 15 - 13 * bias;
        camera.updateProjectionMatrix();
    };
    // loop
    var per = 0,
    bias = 0,
    now = new Date(),
    secs = 0,
    lt = now,
    frame = 0,
    frameMax = 90,
    fps = 30;
    var loop = function () {
        now = new Date();
        secs = (now - lt) / 1000;
        per = frame / frameMax;
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            update(per, bias, secs);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    // call init, and start loop
    init();
    loop();
}
    ());
```

## 4 - The camera helper, and more than one camera

There is also making use of a camera helper as a way to gain a good idea as to what is going on with the current state of the view pyramid of a perspective camera. However in order to gain a good view of what is going on it might also be a good idea to have more than one camera, one that will have the helper, and the other to get an outside perspective of what is going on with that camera. So in this example I have two cameras one of which is making use of the camera helper, and the other I am using to gain this outside perspective of what is going on with this camera and its current values for near, far, fov, and so forth.

```js
(function () {
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    // so here I am setting the values of the perspective camera
    var fieldOfView = 45,
    aspectRatio = 4 / 3,
    near = 1,
    far = 15,
    camera1 = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera1.position.set(2, 2, 2);
    camera1.lookAt(0, 0.5, 0);
    scene.add(camera1);
    // CAMERA HELPER FOR CAM1
    var helper = new THREE.CameraHelper(camera1);
    scene.add(helper);
 
    var camera2 = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 50);
    scene.add(camera2);
 
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // initialize method
    var init = function () {
        // add a cube to the scene
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshDepthMaterial({}));
        cube.position.set(0, 0.5, 0);
        scene.add(cube);
        // camera pos
        camera2.position.set(2, 2, 2);
        camera2.lookAt(0, 0.5, 0);
    };
    // update method
    var update = function (per, bias, secs) {
        camera2.position.x = 2 + 10 * bias;
        camera2.position.z = 2 - 5 * bias;
        camera2.lookAt(0, 0.5, 0);
    };
    // loop
    var per = 0,
    bias = 0,
    now = new Date(),
    secs = 0,
    lt = now,
    frame = 0,
    frameMax = 300,
    fps = 30;
    var loop = function () {
        now = new Date();
        secs = (now - lt) / 1000;
        per = frame / frameMax;
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            update(per, bias, secs);
            renderer.render(scene, camera2);
            frame += fps * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    // call init, and start loop
    init();
    loop();
}
    ());
```

## 5 - Perspective Camera and mutation of View, Position, and rotation values.

So for a threejs example of the perspective camera I threw together this full copy and past style example. When up and running there is a cube, and a plain added to a scene, and the perspective camera is used to look at it. In addition there is a loop in which I am changing the aspect ratio and field of view of the camera, via the cameras properties for these values. When doing so I of course need to call the update projection matrix method of the camera, or else the changes to values that have to do with the view will not take effect. In this example I am also making use of the position property and the look at at methods of the camera to change the position of the camera over time, and also make sure that the camera is always looking at the center of the scene.

```js
(function () {
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    // so here I am setting the values of the perspective camera
    var fieldOfView = 45,
    aspectRatio = 4 / 3,
    near = 1,
    far = 15,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);
    // initialize method
    var init = function () {
        // add plane to the scene
        var plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(5, 5, 8, 8),
                new THREE.MeshDepthMaterial({
                    side: THREE.DoubleSide
                }));
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);
        // add a cube to the scene
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshDepthMaterial({}));
        cube.position.set(0, 1.1, 0);
        scene.add(cube);
        // setting position of the camera
        // position is a property of Object3D
        // and the value is an instance of Vector3
        camera.position.set(4, 4, 4);
        camera.lookAt(0, 0, 0);
    };
    // update method
    var update = function (per, bias, secs) {
        // update aspect and fov
        camera.aspect = .5 + 1.5 * bias;
        camera.fov = 50 + 25 * bias;
        camera.updateProjectionMatrix();
        // change position
        var radian = Math.PI * 2 * per;
        camera.position.set(
            Math.cos(radian) * 5, 
            5 * Math.sin(Math.PI * 4 * per), 
            Math.sin(radian) * 5);
        camera.lookAt(0, 0, 0);
    };
    // loop
    var per = 0,
    bias = 0,
    now = new Date(),
    secs = 0,
    lt = now,
    frame = 0,
    frameMax = 300,
    fps = 30;
    var loop = function () {
        now = new Date();
        secs = (now - lt) / 1000;
        per = frame / frameMax;
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            update(per, bias, secs);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    // call init, and start loop
    init();
    loop();
}
    ());
```

## 6 - Camera Constructor

Perspective Camera inherits from the Camera constructor, as such the perspective Camera shares certain properties, and methods with all other cameras in three.js. I will not be getting into this class in depth with this post, but for now it is important to know that this class adds some properties and methods that are uniform across all cameras used in three.js, including a method that can be used to clone a camera.

## 7 - Object3D constructor

The Camera class in turn also inherits from Object3D, this class is what helps to make Objects including a camera easy to work with in three.js. Like the Camera Class I will not get into detail as it is a little off topic, and it deserves a post of it's own. However if you are interested in learning how to move the camera, or change it's orientation this is the Class of interest for that.

## Conclusion

The perspective camera is my default go to camera for just about every three.js code example, and project that I have made thus far with threejs and a little additional javaScript code. I can not say that this is a subject that I want to get to deep into, because there is so much more to be aware of when it comes to using three.js and cameras are just one little part of the library as a whole. So I would not go nuts with really getting into cameras, as there are so many other topics that might be of greater importance first. Such as getting into blender to create external assets in the form of dae files, or some other container format, and loading them into a project as a way to create custom geometry. There is then so much more when it comes to materials, textures, and the various kinds of maps of materials that can make use of textures. The list goes on and on, so that is why I generally just like to go with the perspective camera and move on, because there is a great deal more to move on to in order to become professional with threejs.

