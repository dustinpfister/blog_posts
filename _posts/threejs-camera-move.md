---
title: Fun with moving a camera in threejs
date: 2019-12-17 19:57:00
tags: [three.js]
layout: post
categories: three.js
id: 582
updated: 2022-02-17 10:29:28
version: 1.26
---

Every now and then I like to play around with [threejs](https://threejs.org/) a little, it is a fun project to work with and life is short after all, so having some fun with threejs now and then is called for. One thing that is fun is working out expressions for handing the movement of a [camera](/2018/04/06/threejs-camera/) in a scene such as the [perspective camera](/2018/04/07/threejs-camera-perspective/) which is the one I typically use in most projects thus far.

There are all kinds of ways to go about moving a camera such as having the position of the camera move around an object in a circular pattern while having the camera look at an object in the center, and having this happen in the body of an animation loop method. then there is also having the position and rotation of a camera be subject to events, so I can control the camera with my mouse and or keyboard which is nice when I am working on a project and I would like to see how things look from all kinds of different perspectives.

So in this post I will be writing about some threejs examples that have to do with using the position and rotation properties of an instance of a camera along with some javaScript expressions as a way to move a camera around in a scene. What applies for a camera will also apply to just about anything in three.js that inherits from the [Object3d](/2018/04/23/threejs-object3d/) class.

<!-- more -->

## Moving a camera in three.js and what to know first

This is a post on how to move a camera in three.js a front end javaScript library that has to do with 3d modeling. This is not a getting started post on three.js, or javaScript in general so I assume that you have at least some background on this to get started with, otherwise you might have a hard time gaining something of value from reading this.

### Version Numbers matter with three.js

When I first wrote this post I was using r111 of three.js, and the last time I edited this post I was using r127. Three.js is a fast moving target when it comes to development, at some point in the future these three.js examples might break because of this. So be sure to always check the version number of three.js when working with these examples, or any three.js examples on the open web for that matter.

### You should really look into the Object3d class when it comes to movement of objects in general in three.js

A camera in three.js inherits from a base class in three.js called Object3d, which is also the case with many other objects that will be part of a scene such as Mesh, Group objects, and many helper objects. So my learning how to work with the Object32 class you in turn learn how to work with everything to which is built on top of Object3d which includes cameras.

The main property of interest with the Object3d class in the position property which is an instance of a class known as [Vector3](/2018/04/15/threejs-vector3/), which in turn is another class of interest that applies to many things in three.js when it comes to positions of things. The set method of an instance of this Vector3 class is one way to set the position of a camera when it comes to the position property. However there is also changing the orientation of the camera when doing so, for this there is the rotation property that is also part of the Object3d class. This rotation property is an instance of the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) which is like Vector3, only we are taking angles rather than a matrix position. There is working with this instance of THREE.Euler directly, or there is making use of a method like the [Object3d.lookAt](https://threejs.org/docs/#api/en/core/Object3D.lookAt) method.

All of these classes are worth looking into in depth in order to really know how to move things around, not just cameras but many objects in general.

### You might want to check out the Three.js orbit controls, and other official controls first

When it comes to moving a camera the first thing you might want to figure out is if you just want to move about in the scene using the mouse. I often use the Orbit Controls that are in the examples folder of the Three.js repository for many of my examples as a way to be able to have the basic typical movement right away. There are also a number of other options when it comes to official controls use in the official three.js examples, as well as many other useful libraries to work with in the examples folder.

However when it comes to moving a camera by way of some kind of application loop, or working out custom controls that will work a little differently from that of the orbit controls. Then it would make sense t start working out some examples like the ones in this post here. Still of you think that the official orbit controls will work okay, and you just want to move on to other things you might want to check out my post on [orbit controls](/2018/04/13/threejs-orbit-controls/).

## 2 - Camera movement helper example that moves the camera via javaScript code

In this section I will be starting out with a basic threejs example that has to do with moving a camera. I pulled everything that has to do with moving the camera into a function to help keep things more fine grain with this kind of task, and for now it is a move camera method that is always looking at the origin of the scene by using the look at method. So nothing major or fancy here, just a kind of hello world when it comes to moving a camera.

Here is the move camera method for this example. I made it so that I just have to pass a reference to the camera that I want to move, and then a percent value in the form of a value between zero. The percent value is what is used to set the position of the camera by making it so a radian value is set between 0 and PI2. This radians value is then used in additional expressions to find x y and z.

Now that I have a move camera method worked out I need to create a camera to pass to this helper function. When doing so there are a number of arguments to be aware of when using the perspective camera. There is the field of view, aspect ratio, and the near and far render settings for the camera.

So then now I just need to work out the rest of the example when it comes to a scene, renderer, a mesh to look at, and a main app loop that makes use of the move camera method.

This results in the camera moving around the mesh at the origin, and having the camera continue to look at the origin. A similar effect could be achieved by keeping the camera fixed, and rotating the mesh rather than the camera. However never the less this is one way to go about seeing all sides of the mesh.

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
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but chopy video )
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

So moving a camera is more or less the same as moving anything else in three.js that inherits from the Object3d class by making use of the position and rotation properties of the object, and cameras are no exception. So then I could get into making all kinds of examples that have to do with different ways to change the values of the position and rotation of a camera over time, but doing so is something that I should reserve for the object3d class in general not just cameras.
