---
title: Camera Kit module threejs example
date: 2022-08-05 08:32:00
tags: [three.js]
layout: post
categories: three.js
id: 999
updated: 2022-08-05 15:38:22
version: 1.7
---

This week I started a new [threejs project example](/2021/02/19/threejs-examples/) that I am calling camera kit, that aims to be my module for parking all kinds of methods that has to do with updating the position and target location of a camera such as a [perspective camera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera). The idea for this project came to me when working on last weeks threejs example which was my aplerp module which is a project that has to do with creating values to use for the alpha argument of the [lerp method of the vector3 class](). 

The aplerp module has to do with moving a point in space from one point to another in a way that is not so linear, that is not a fixed delta for each frame when updating a vector. So for this project I will be building on top of the aplerp module to create another module that is centered around tasks that have to do with updating a camera.


<!-- more -->

## The camera kit threejs example and what to be aware of

The camera kit module builds on top of additional projects that I have made along with threejs and many core and client side javaScript features. Simply put this is not a post intended for developers that are new to javaScript in general, the threejs library and some of my older projects that I am also making use of here to create an over all final result in terms of a video project. However I do still always take a moment to write a thing or two about what you might want to read up more on before continuing to read the rest of this content.

<iframe class="youtube_video" src="https://www.youtube.com/embed/C89ItzAIprQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### The aplerp module threejs example

Last week I wrote a post on the aplerp module. As of this writing I am using r0 of the module for some of the methods in this camera kit module, and will likely use it in a number of other future methods in any future revisions of this module. This camera kit project might very well get a few revisions as it strikes me as the kind of project that deserves at least a few more revisions and also that I will likely be using it in many if not all future video projects. However in any case I will not be getting into the state of the source code of the aplerp module here, if you want to read up more on that project [check out the post on aplerp](/2022/07/29/threejs-examples-aplerp/) and also made a [video that make used of r0 of that module](https://www.youtube.com/watch?v=p9KOw_y_1DA).

### Read up more on the perspective camera, the base camera class, and object3D

If you are still somewhat new to threejs you might want to read up more on [the perspective camera](/2018/04/07/threejs-camera-perspective/), the base [camera class](/2018/04/06/threejs-camera/), and the [object3d class](/2018/04/23/threejs-object3d/). The perspective camera in threejs is the camera option that renders a [scene object](/2018/05/03/threejs-scene/) in such a way that replacates the way that the human eye sees, thus it is often the typical camera that I use for most projects. 

However there are a number of other options when it comes to camera so it also makes sense to know what there is to work with when it comes to features shared across all cameras in the base camera class. Speaking of the base camera class there is also checking out the object3d class that is not only a base class of the camera class but many other objects such as mesh objects, groups, and whole scene objects actually. Even if you are not new to threejs you might still want to read up more on these now and then, as I find myself still doing so even though I have a lot of experience working with threejs, there is a lot to take in with this one after all.

### The Vector3 lerp method and the class in general

There is bypassing the use of the aplerp method that I made and just working directly with the [lerp method of the vector3 class](/2022/05/17/threejs-vector3-lerp/). I would be a good idea to work out at least a few demos using the method to get a first hand experience as to how it works as a way to transition one instance of Vector3 to another instance of Vector3. Also speaking of the vector3 class, yeah it would be a good idea to [check Vector3 out more](/2018/04/15/threejs-vector3/) at some point when you get the time as that is yet another major class in threejs that I find myself using all the time.

### source code is also up on github

I also have the source code of camera kit, all demos, and additional assets located in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-camera-kit).

### Version numbers matter

When I wrote this post I was using r140 of theejs and everything was working fine for me with that revision of threejs.

## 1 - First version of the camera kit module and demos

For the very first version of camera kit I started out with just a few methods that will work with any camera, and in fact any object that is based off of the object3d class actually. This will likely change with future revisions of the module, but for now I will just be writing about the first state of this threejs example. This will include a general overview of the module itself, as well as a few demos that make use of the public methods of the module. Once again I will not be getting into the aplerp module that I am using for the sin lerp method as I have covered that all ready in an older post.

### 1.1 - The source code of camera kit r0

I went with the tired yet true IIFE pattern as a way to make a javaScript module as I typically do for these sorts of things, and will be returning a public api to a single variable that may or may not be global depending on how I go about packing this when using it in a project. Thus far I have three public methods and a single private function that I am using for the apLerp lperp method as a get alpha function. The get alpha function is a big deal when it comes to using the aplerp method as this is a function that will create an alpha value that will then be used with vector3 lerp method in the internal code of the aplerp module.

Thus far when working with the aplerp module I have a few built in get alpha methods and a number of other such methods that I am making outside of the module and using with the aplerp lerp method by way of the getAlpha function option when calling the method. One of these was a demo in which I am using Math.sin in the process of working out an expressions to create the alpha values that seems to work well with a general idea of what I want to have in terms of camera movement.

```js
// cameraKit module - r0 - from threejs-examples-camera-kit
var cameraKit = (function () {
 
    // public api
    var api = {};
   
 
    // plain lper method
    // ex: cameraKit.plainLerp(camera, v1, v2, 0.5);
    api.plainLerp = function(camera, v1, v2, alpha){
        v1 = v1 || new THREE.Vector3();
        v2 = v2 || new THREE.Vector3();
        alpha = alpha === undefined ? 0 : alpha;
        // plain lerp expression
        camera.position.copy( v1.clone().lerp(v2, alpha) );
    };
 
    // sin lper method
    // ex: cameraKit.sinLerp(camera, v1, v2, 0.5, { bMulti: 0.1, piM: 2, aOffset: 0 } );
    var sinGetAlpha = function(state, param){
        param.piM = param.piM === undefined ? 2 : param.piM;
        param.bMulti = param.bMulti=== undefined ? 0.1 : param.bMulti;
        param.aOffset = param.aOffset=== undefined ? 0.5 : param.aOffset;
        var r = Math.PI * param.piM * state.p;
        var b = Math.sin( r );
        var a = state.p + b * param.bMulti;
        // apply aOffset
        a += param.aOffset;
        a %= 1;
        // clamp
        a = a < 0 ? 0 : a;
        a = a > 1 ? 1 : a;
        return a;
    };
    api.sinLerp = function(camera, v1, v2, alpha, param){
        v1 = v1 || new THREE.Vector3();
        v2 = v2 || new THREE.Vector3();
        alpha = alpha === undefined ? 0 : alpha;
        param = param || {};
        var v3 = apLerp.lerp(v1, v2, alpha, {
            getAlpha: sinGetAlpha,
            gaParam: {
              piM: param.piM === undefined ? 2: param.piM,
              bMulti: param.bMulti === undefined ? 0.1: param.bMulti,
              aOffset: param.aOffset === undefined ? 0: param.aOffset
            }
        })
        // sin lerp the camera
        camera.position.copy( v3 );
    };
 
    // circle around method
    // ex: cameraKit.circleAround(camera, new THREE.Vector3(), new THREE.Vector3(8, 8, 8), per);
    api.circleAround = function(camera, vTarget, v1, alpha, rOffset){
        rOffset = rOffset === undefined ? 0 : rOffset;
        var v3 = vTarget.clone();
        v3.y = v1.y;
        var d = camera.position.distanceTo( v3 );
        var r = Math.PI * rOffset + Math.PI * 2 * alpha;
        var x = Math.cos(r) * d,
        z = Math.sin(r) * d;
        camera.position.set(x, v1.y, z);
        camera.lookAt( vTarget );
    };
    // return public api
    return api;
}
    ());
```

### 1.2 - Plain lerp method demo

The plain lerp method of the camera kit module was added to just have a simple abstraction of a plain, normal, linear lerp movement 0f a camera from one Vector3 to another. This is the kind of camera movement that I have been doing thus far for many of my videos that I have been making for these posts on threejs. It would be nice to have a custom cut abstraction for a few lines of code that I find myself writing over and over again.

```js
// demo of camera-kit
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 90,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            var v1 = new THREE.Vector3(8, 4, 8);
            var v2 = new THREE.Vector3(-8, -4, 8);
            cameraKit.plainLerp(camera, v1, v2, bias);
            var v3 = new THREE.Vector3(0, 0, 0);
            camera.lookAt(v3);
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

### 1.3 - Sin Lerp method demo

Now that I have the plain lerp method example out of the way it is now time for a quick demo of the first method that really makes camera kit a little interesting which would be the sin lerp method. When using this method I might want to adjust the bMulti option a little which is a value that is used to adjust the spacing of points. When used well with tweaked values I get a nice effect where the camera starts out moving fast but slows down as the camera reaches a half way point, then picks up speed again.

```js
// demo of camera-kit
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 90,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            var v1 = new THREE.Vector3(8, 4, 8);
            var v2 = new THREE.Vector3(-8, -4, 8);
            cameraKit.sinLerp(camera, v1, v2, bias, { bMulti: 0.2 } );
            var v3 = new THREE.Vector3(0, 0, 0);
            camera.lookAt(v3);
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

### 1.4 - The circle around method demo

The circle around method helps with another typical task that I find myself doing often which is to just move the camera around a fixed target location from a given starting point.

```js
// demo of camera-kit
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 90,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // using circle around method
            var v1 = new THREE.Vector3(8, 8, 8);
            var vTarget = new THREE.Vector3(0, 0, 0);
            cameraKit.circleAround(camera, vTarget, v1, per, 0.25);
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

## Conclusion

When working on my various video projects that I am making so that I have some videos to embed for these posts I find myself repeating code over and over again for various tasks that have to do with camera movement and other camera update related tasks. So it makes total sense to at least start and revise a module such as this that I can make part of my personal stack of modules that I then use over and over again from one video to the next. There seems to be a growing list of modules such as this, one of which would be my [object grid wrap module](/2022/05/20/threejs-examples-object-grid-wrap/), as well as another module in which I built on top of that [module that has to do with creating a kind of land scene](/2022/07/15/threejs-examples-object-grid-wrap-land/). I am thinking that this camera kit module might prove to be another example of this kind of threejs example that I actually use, so then there is a good chance that there will be future revisions of this.

I have a lot of ideas for additional methods, and maybe some kind of standard format of an object that I can create and use with methods that work just with that kind of object. There is not just updating the position and rotation of a camera of course there is also playing around with the various parameters of a perspective camera such as the feild of view value, and doing a bunch of other things that might helper to create an over all kind of style for my video projects.




