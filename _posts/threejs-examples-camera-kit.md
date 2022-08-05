---
title: Camera Kit module threejs example
date: 2022-08-05 08:32:00
tags: [three.js]
layout: post
categories: three.js
id: 999
updated: 2022-08-05 09:32:57
version: 1.4
---

This week I started a new [threejs project example](/2021/02/19/threejs-examples/) that I am calling camera kit, that aims to be my module for parking all kinds of methods that has to do with updaing the position and target location of a camera such as a [persepective camera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera). The idea for this project came to me when woking on last weeks threejs example which was my aplerp module which is a project that has to do with cretaing values to use for the alpha argument of the [lerp method of the vector3 class](). 

The aplerp module has to do with moving a point in space from one point to another in a way that is not so linear, that is not a fixed delta for each frame when upading a vector. So for this project I will be building on top of the aplerp module to create another module that is centered around tasks that have to do with updating a camera.


<!-- more -->

## The camera kit threejs exmaple and what to be aware of

The camera kit module builds on top of addtional projects that I have made along with threejs and many core and client side javaScript featrues. Simply put this is not a post intedned for devlopers that are new to javaScript in general, the threejs library and some of my older projects that I am also making use of here to create an over all final result in terms of a video project. However I do still always take a moment to write a thing or two about what you might want to read up more on before contint to read the rest of this content.

### The aplerp mnodule threejs example

Last week I wrote a post on the aplerp module. As of this writing I am using r0 of the module for some of the methods in this camera kit module, and will likley use it in a number of other future methods in any future revisions of this module. This camera kit project might very well get a few revisions as it strikes me as the kind of project that desives at least a few more revisions and also that I will likley be using it in many if not all future video porjects. However in any case I will not be getting into the state of the source code of the aplerp module here, if you want to read up more on that project [check out the post on aplerp](/2022/07/29/threejs-examples-aplerp/) and also made a [video that make used of r0 of that module](https://www.youtube.com/watch?v=p9KOw_y_1DA).

### Read up more on the perspective camera, the base camera class, and object3D

If you are still somewhat new to threejs you might want to read up more on [the perspective camera](/2018/04/07/threejs-camera-perspective/), the base [camera class](/2018/04/06/threejs-camera/), and the [object3d class](/2018/04/23/threejs-object3d/). The perspective camera in threejs is the camera option that renders a [scene object](/2018/05/03/threejs-scene/) in such a way that replacres the way that the human eye sees, thus it is often the typical camera that I use for most projects. 

However there are a number of other options when it comes to camera so it also makes sesne to know what there is to work with when it comes to features shared accross all cameras in the base camera class. Speaking of the base camera class there is also checking out the object3d class that is not only a base class of the camera class but many other objects such as mesh objects, groups, and whole scene objects actually. Even if you are not new to threejs you might still want to read up more on these now and then, as I find myself still doing so even though I have a lot of experence working with threejs, there is a lot to take in with this one after all.

### The Vector3 lerp method and the class in general

There is bypassing the use of the aplerp method that I made and just working directly with the [lerp method of the vector3 class](/2022/05/17/threejs-vector3-lerp/). I would be a good idea to work out at leat a few demos using the method to get a first hand expernce as to how it works as a way to trasition one instance of Vector3 to another instance of Vector3. Also speaking of the vector3 class, yeah it would be a good idea to [check Vector3 out more](/2018/04/15/threejs-vector3/) at some point when you get the time as that is yet another major class in threejs that I find myself uisng all the time.

### source code is also up on github

I also have the source code of camera kit, all demos, and addtional assets located in my [test threejs reposaptory on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-camera-kit).

### Version numbers matter

When I wrote this post I was using r140 of theejs and everything was working fine for me with that revision of threejs.

## 1 - First version of the camera kit module and demos

### 1.1 - The source code of camera kit r0

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

When working on my various video projects that I am making so that I have some videos to embed for these posts I find myself repeating code over and over agaian for various tasks that have to do with camera movement and other camera update related tasks. So it makes total sense to at least start and revise a module such as this that I can make part of my personal stack of modules that I then use over and over again from one video to the next. There seems to be a growing list of modules such as this, one of which would be my [object grid wrap module](/2022/05/20/threejs-examples-object-grid-wrap/), as well as another module in which I built on top of that [module that has to do with cretaing a kind of land scene](/2022/07/15/threejs-examples-object-grid-wrap-land/).



