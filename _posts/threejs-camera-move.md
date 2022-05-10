---
title: Moving a camera in threejs over time
date: 2019-12-17 19:57:00
tags: [three.js]
layout: post
categories: three.js
id: 582
updated: 2022-05-10 06:51:00
version: 1.43
---

Every now and then I like to play around with [threejs](https://threejs.org/) a little, and when doing so I have found that one thing that is fun is working out expressions for handing the movement of a [camera](/2018/04/06/threejs-camera/) in a scene such as the [perspective camera](/2018/04/07/threejs-camera-perspective/).

There are all kinds of ways to go about moving a camera such as having the position of the camera move around an object in a circular pattern while having the camera look at an object in the center, and having this happen in the body of an animation loop method that will do this sort of thing over time. Then there is also having the position and rotation of a camera be subject to event handlers that are attached to a kind of input element, or they are fired by a user input device of one kind or another. So then I can control the camera with my mouse, and or keyboard which is nice when I am working on a project and I would like to see how things look from all kinds of different perspectives by changing what that is.

So in this post I will be writing about some threejs examples that have to do with using the position and rotation properties of an instance of a camera along with some javaScript expressions as a way to move a camera around in a scene. What applies for a camera will also apply to just about anything in three.js that inherits from the [Object3d](/2018/04/23/threejs-object3d/) class, so what I am writing about here can also be applied to all kinds of objects in threejs beyond just that of cameras.

<!-- more -->

## Moving a camera in three.js and what to know first

This is a post on how to move a camera in three.js a front end javaScript library that has to do with 3d modeling. This is not a getting started post on three.js, or javaScript in general so I assume that you have at least some background on this to get started with, otherwise you might have a hard time gaining something of value from reading this content.

If you are still very new to threejs I have all ready wrote a [getting started with threejs post](/2018/04/04/threejs-getting-started/) a long time ago now. I also have a post for [beginners of javaScript in general](/2018/11/27/js-getting-started/) that I have wrote, and edit every so often also.

### Version Numbers matter with three.js

When I first wrote this post I was using r111 of three.js, and the last time I edited this post I was using r127. Three.js is a fast moving target when it comes to development, at some point in the future these three.js examples might break because of this. So be sure to always check the version number of three.js when working with these examples, or any three.js examples on the open web for that matter.

### The source code that I am writing about in this post is on Github

The source code examples that I am writing about here can be found in my [test threejs github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-camera-move).

### You should really look into the Object3d class when it comes to movement of objects in general in three.js

A camera in three.js inherits from a base class in three.js called Object3d, which is also the case with many other objects that will be part of a scene such as Mesh, Group objects, and many helper objects. So my learning how to work with the Object32 class you in turn learn how to work with everything to which is built on top of Object3d which includes cameras.

The main property of interest with the Object3d class in the position property which is an instance of a class known as [Vector3](/2018/04/15/threejs-vector3/), which in turn is another class of interest that applies to many things in three.js when it comes to positions of things. The set method of an instance of this Vector3 class is one way to set the position of a camera when it comes to the position property. However there is also changing the orientation of the camera when doing so, for this there is the rotation property that is also part of the Object3d class. This rotation property is an instance of the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) which is like Vector3, only we are taking angles rather than a matrix position. There is working with this instance of THREE.Euler directly, or there is making use of a method like the [Object3d.lookAt](https://threejs.org/docs/#api/en/core/Object3D.lookAt) method.

All of these classes are worth looking into in depth in order to really know how to move things around, not just cameras but many objects in general.

### You might want to check out the Three.js orbit controls, and other official controls first

When it comes to moving a camera the first thing you might want to figure out is if you just want to move about in the scene using the mouse. I often use the Orbit Controls that are in the examples folder of the Three.js repository for many of my examples as a way to be able to have the basic typical movement right away. There are also a number of other options when it comes to official controls use in the official three.js examples, as well as many other useful libraries to work with in the examples folder.

However when it comes to moving a camera by way of some kind of application loop, or working out custom controls that will work a little differently from that of the orbit controls. Then it would make sense t start working out some examples like the ones in this post here. Still of you think that the official orbit controls will work okay, and you just want to move on to other things you might want to check out my post on [orbit controls](/2018/04/13/threejs-orbit-controls/).

## 1 - A Basic camera movement example with an animation loop function

In this section I will be starting out with a basic threejs example that has to do with moving a camera by way of an animation loop. So nothing major or fancy here, just a kind of hello world when it comes to moving a camera. If this sort of thing is new to you in general with front end javaScript you might want to start out looking into the [request animation frame](/2018/03/13/js-request-animation-frame/) method in client side javaScrit alone.

I started out with just making an instance of the perspective camera like always when it comes to most typical projects. After that I want to have a scene with a gird helper, a renderer, and a mesh object to have something to look at other than the grid helper. I can then set a new position for the camera by just calling the set method of the Vetor3 instance as the value of the position property of the camerae. When doing so I often will also want to use the look at method of the camera also to make sure that the camera is also looking in the direction that I want at the new position.

I then have the main app loop in which I will be moving the camera over time, and this is where things can get at least a little involved when it comes to moving a camera this way. There are many ways of making this like of animation update loop, some of which are a lot less complex than what I am doing here. However I have found that there are at least a few key features that one should always have in this kind of loop in order to have something that is in better shape for production. The first and foremost thing that comes to mind is to not update the scene each time the loop function is called, rather a date should be used to find out how many seconds have based sense the last update and use that as a means to update the scene or not. This way the client running the threejs program is not getting slammed and I can adjust how low I want to fps to be for updating the scene. However fps values will result in using less CPU overhead, but at the cost of choppy rather than smooth motion.

On Top of having a main FPS update value I can also have a septate FPS value for how to go about updating the frame rate of the animation. This way I can update the scene at a very low frame rate, but still update the position of the camera at a higher frame rate.

```js
(function () {
    // CAMERA
    var width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8))
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(width, height);
    // MESH
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // starting pos for camera
    camera.position.set(10, 0, 0);
    camera.lookAt(mesh.position);
    // APP LOOP
    var secs = 0,
    fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 30, // fps rate to move camera
    frame = 0,
    frameMax = 90,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / frameMax,
        bias = (1 - Math.abs(per - 0.5) / 0.5);
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            // moving the camera
            camera.position.set(10, -2 + 4 * bias, 0);
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());
```

When this example is up and running the end result is having the camera at a location away from a mesh, and the camera is looking in the direction of the mesh. Over time the camera moves up and down, but only on the y axis, and I am not doing anything to change the rotation of the camera over time so the creating does not stay fixed on the mesh.

## 2 - Camera movement helper example that moves the camera via javaScript code

For this example I am making a more advanced version of my basic animation loop example that has to do with moving a camera. This time I have a move camera helper that takes a camera as an argument along with an update index number in the range of 0 to 1, and a function that will be used to create the values that will be used to change the camera position and orientation. So now the idea is more or less the same as the first animation loop example, but now I am creating additional code that has to do with creating a camera, with values attached to the [userData object](/2021/02/16/threejs-userdata/) of the camera. If you are not aware of the user data object of a camera or any object in threejs that is based off of the object3d class, the user data object is just simply an object where I can pack values that have to do with my own custom system for an object such as a camera.

```js
(function () {
 
    var getBias = function(per){
        return 1 - Math.abs(per - 0.5) / 0.5;
    };
 
    // create camera helper
    var createCamera = function(opt){
        opt = opt || {};
        var width = 640, height = 480,
        fieldOfView = 40, aspectRatio = width / height,
        near = 0.1, far = 1000,
        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
        camera.userData.subject = new THREE.Vector3();
        return camera;
    };
 
    var camMoveMethod = {};
 
    // follow subject1 method
    camMoveMethod.followSubject1 = function(camera, per){
        var bias = getBias(per);
        return {
            position: new THREE.Vector3(-8, 5, -8 + 16 * bias), 
            lookAt: camera.userData.subject
        };
    };
 
    // follow subject2 method
    camMoveMethod.followSubject2 = function(camera, per){
        var rad = Math.PI * 2 * per,
        x = Math.cos(rad) * 6,
        y = -4 + 8 * getBias(per),
        z = Math.sin(rad) * 6;
        return {
            position: new THREE.Vector3(x, y, z), 
            lookAt: camera.userData.subject
        };
    };
 
    // move camera update helper
    var moveCamera = function (camera, per, moveFunc) {
        var camState = moveFunc(camera, per);
        // set the position and lookAt values with the
        // data in the returned camState object
        camera.position.copy(camState.position)
        camera.lookAt(camState.lookAt);
    };
 
    // CAMERA
    var camera = createCamera();
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8))
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // MESH
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    mesh.position.set(3, 0, 0);
    scene.add(mesh);
    camera.userData.subject = mesh.position;
    // APP LOOP
    var secs = 0,
    methodSecs = 0,
    methodIndex = 0,
    methodName = '',
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = Math.round(frame) / frameMax,
        bias = getBias(per);
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            methodSecs += secs;
            if(methodSecs >= 5){
                methodSecs = 0;
                methodIndex += 1;
                methodIndex %= Object.keys(camMoveMethod).length;
            }
            // calling camera update method
            methodName = Object.keys(camMoveMethod)[methodIndex];
            moveCamera(camera, per, camMoveMethod[methodName]);
            // moving mesh
            mesh.position.x = -2 + 4 * bias;
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());
```

## 3 - Conclusion

So moving a camera is more or less the same as moving anything else in three.js that inherits from the Object3d class by making use of the position and rotation properties of the object, and cameras are no exception. So then I could get into making all kinds of examples that have to do with different ways to change the values of the position and rotation of a camera over time, but with the collection of examples thus far the basic idea, and much more beyond that has been covered in this post I think.

I do get around to editing my content on threejs from time to time, and this post is just one of many that I am sure I will come back to again at some point also. I all ready have many more ideas when it comes to additional examples, and improvements to the examples thus far. If you did enjoy what I have wrote about here, or thing that you have obtained something of value there is checking out one of [my other posts on threejs](/categories/three-js/).

