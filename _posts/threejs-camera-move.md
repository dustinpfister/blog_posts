---
title: Moving a camera in threejs over time
date: 2019-12-17 19:57:00
tags: [three.js]
layout: post
categories: three.js
id: 582
updated: 2023-01-16 15:07:30
version: 1.66
---

Every now and then I like to play around with [threejs](https://threejs.org/) a little, and when doing so I have found that one thing that is fun is working out expressions for handling the movement of a [camera](/2018/04/06/threejs-camera/) in a scene such as the [perspective camera](/2018/04/07/threejs-camera-perspective/). There are all kinds of ways to go about moving a camera such as having the position of the camera move around an object in a circular pattern while having the camera look at an object in the center over time in an animation loop.

Then there is also having the position and rotation of a camera be subject to event handlers that are attached for pointer events. In other words to control the camera with a mouse, and or keyboard which is nice when I am working on a project and I would like to see how things look from all kinds of different perspectives. There are some official controls that are in the threejs Github repository for this sort of thing in the form of [orbit controls](https://threejs.org/docs/#examples/en/controls/OrbitControls), and [fly controls](https://threejs.org/docs/#examples/en/controls/FlyControls) for example. However there is also of course making ones own custom controls for a project which is often a required part of working out an over all user interface for some kind of real time project.

So in this post I will be writing about some threejs examples that have to do with using the position and rotation properties of an instance of a camera along with some javaScript expressions as a way to move a camera around in a scene. What I work out here for a camera will also apply to just about anything in threejs that inherits from the [Object3d](https://threejs.org/docs/#api/en/core/Object3D) class as well. So much of this is just ways of moving and rotating objects in general actually, but still I will be keeping the emphasis on cameras alone for the most part here.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/ovlzYRxivjE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Moving a camera in three.js and what to know first

This is a post on how to move a camera in three.js a front end javaScript library that has to do with 3d modeling. This is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), or [javaScript in general](/2018/11/27/js-getting-started/) so I assume that you have at least some background on this to get started with, otherwise you might have a hard time gaining something of value from reading this content.

### You should really look into the Object3d class when it comes to movement of objects in general in three.js

A camera in threejs inherits from a base class in threejs called [Object3d](/2018/04/23/threejs-object3d/), which is also the case with many other objects that will be part of a scene such as Mesh, Group objects, and many helper objects. So my learning how to work with the Object3d class you in turn learn how to work with everything to which is built on top of Object3d which includes cameras.

The main property of interest with the Object3d class in the [position property](/2022/04/04/threejs-object3d-position/) which is an instance of a class known as [Vector3](/2018/04/15/threejs-vector3/), which in turn is another class of interest that applies to many things in three.js when it comes to positions of things. The set method of an instance of this Vector3 class is one way to set the position of a camera when it comes to the position property. However there is also changing the orientation of the camera when doing so, for this there is the rotation property that is also part of the Object3d class. This rotation property is an instance of the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) which is like Vector3, only we are taking angles rather than a matrix position. There is working with this instance of THREE.Euler directly, or there is making use of a method like the [Object3d.lookAt](/2021/05/13/threejs-object3d-lookat/) method.

All of these classes are worth looking into in depth in order to really know how to move things around, not just cameras but many objects in general.

### You might want to check out the Orbit Controls, and other official controls as a way to move a camera by way of user input

When it comes to moving a camera the first thing you might want to figure out is if you just want to move about in the scene using the mouse. I often use the Orbit Controls that are in the examples folder of the Three.js repository for many of my examples as a way to be able to have the basic typical movement right away. There are also a number of other options when it comes to official controls use in the official three.js examples, as well as many other useful libraries to work with in the examples folder.

However when it comes to moving a camera by way of some kind of application loop, or working out custom controls that will work a little differently from that of the orbit controls. Then it would make sense t start working out some examples like the ones in this post here. Still of you think that the official orbit controls will work okay, and you just want to move on to other things you might want to check out my post on [orbit controls](/2018/04/13/threejs-orbit-controls/).

### The source code that I am writing about in this post is on Github

The source code examples that I am writing about here can be found in my [test threejs github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-camera-move). This is a also a location in which I park the source code for my [many other blog posts on threejs](/categories/three-js/) beyond just this one.

### Version Numbers matter with threejs

When I first wrote this post I was using r111 of threejs, and the last time I edited this post I was using r146. Threejs is a fast moving project when it comes to development, so at some point in the future these threejs examples might break because of this. I do get around to fixing up my code every once in a while, but there will often be large gaps of time between major edits. So be sure to always check the version number of threejs when working with these examples, or any threejs examples on the open web for that matter.

## 1 - A Basic camera movement example with an animation loop function

In this section I will be starting out with some basic threejs examples that has to do with moving a camera by way of an animation loop. So nothing major or fancy here, just a kind of hello world when it comes to moving a camera around in a threejs project along with some other tipical things that come up when doing so. If this sort of thing is new to you in general with front end javaScript you might want to start out looking into the [request animation frame](/2018/03/13/js-request-animation-frame/) method in client side javaScrit alone.

### 1.1 - World relative position of camera

I started out this example like that of any other threejs example when it comes to the usual set of objects. What I mean by that is having a scene object, camera, and renderer set up. After that I just created a single mesh object that I will be leaving at the default origin location.

I then have the main app loop in which I will be moving the camera over time, and this is where things can get at least a little involved when it comes to moving a camera this way. There are many ways of making this kind of animation update loop, some of which are a lot less complex than what I am doing here. However I have found that there are at least a few key features that one should always have in this kind of loop in order to have something that is in better shape for production. 
The first and foremost thing that comes to mind is to not update the scene each time the loop function is called, rather a date should be used to find out how many seconds have based sense the last update and use that as a means to update the scene or not. This way the client running the threejs program is not getting slammed and I can adjust how low I want to fps to be for updating the scene. However fps values will result in using less CPU overhead, but at the cost of choppy rather than smooth motion.

On top of having a main FPS update value I can also have a septate FPS value for how to go about updating the frame rate of the animation. This way I can update the scene at a very low frame rate, but still update the position of the camera at a higher frame rate.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
lt = new Date(),
frame = 0;
const fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30,       // fps rate to move camera
frameMax = 300;
// update function
const update = () => {
    const per = frame / frameMax;
    const bias = (1 - Math.abs(per - 0.5) / 0.5);
    camera.position.set(3 * bias, 1 + 2 * bias, 10);
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        // MOVING THE CAMERA IN THE LOOP
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

When this example is up and running the end result is having the camera at a location away from a mesh, and the camera is still looking in the direction of the mesh. In most cases I will not just want to set the position of the camera but also adjust the rotation of the camera as well one way or another, however that will be something I will be getting into more so inn the nest example here. Over time the camera moves, and I am not doing anything to change the rotation of the camera over time so the camera does not stay fixed on the mesh.

### 1.2 - The look at method

There is more to moving the camera that just moving the position of the camera in world space, there is also setting the rotation of the camera that can also be tough of as a kind of movement as well. There is learning how to work out all kinds of ways to manual setting the state of the Euler instance of the rotation property of a camera, but maybe the easiest way to go about setting the rotation of a camera would be to make use of the look at method of the object3d class.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// APP LOOP
//-------- ----------
// SETTING CAMERA POSITION ONCE HERE
camera.position.set(0, 5, 5);
let secs = 0,
lt = new Date(),
frame = 0;
const fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30,       // fps rate to move camera
frameMax = 300;
// update function
const update = () => {
    const per = frame / frameMax;
    const bias = (1 - Math.abs(per - 0.5) / 0.5);
    // CALLING THE LOOKAT METHOD OF THE CAMERA
    camera.lookAt(mesh.position);
    // MOVEING THE MESH OBJECT BUT NOT THE CAMERA
    mesh.position.x = -5 + 10 * bias
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        // MOVING THE CAMERA IN THE LOOP
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

### 1.3 - Using the Vector3 lerp method along with other Vector3 class methods

A very useful method in the Vector3 object not just for moving a camera around, but objects in general, as well as points in space in general is the [lerp method of the vector3 class](/2022/05/17/threejs-vector3-lerp/). This is a method of vector3 in which I can call the method, then pass another vector3 object that I want to move to along with another argument that is an alpha value between 0 and 1. This alpha value will then set the value of the vector3 obect that I call the lerp method off of between the two vector3 objects based on the given alpha value.

This lerp method will mutate the vector3 object in place, so if I am in a situation in which I have two source vector3 objects that I do not want to mutate I can do something like call the copy method off of the vector3 object that is the position of the camera, and then pass the vector3 object that is the start point to the copy method. This will then copy the state of the start vector3 to the start point without mutating the start point, after that I can then call the lerp method, pass the end point that I want, and then the alpha value that I want to use to lerp between the start and end point.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(3, 20, 20),
    new THREE.MeshNormalMaterial());
mesh2.position.set(-5, 1, 5);
scene.add(mesh2);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
lt = new Date(),
frame = 0;
const fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30,       // fps rate to move camera
frameMax = 300;
// START AND END VECTOR3 OBJECTS
const vpos_start = new THREE.Vector3(5, 5, 5);
const vpos_end = new THREE.Vector3(1, 0, -4);
// update function
const update = () => {
    // alpha values
    const a1 = frame / frameMax;
    const a2 = (1 - Math.abs(0.5 - a1) / 0.5);
    // MOVE CAMERA BY WAY OF THE VECTOR3 LERP METHOD
    camera.position.copy(vpos_start).lerp(vpos_end, a2);
    // USING VECTOR3 LERP TO HELP CREATE A LOOK AT POINT OVER TIME ALSO
    camera.lookAt( mesh1.position.clone().lerp(mesh2.position, a2) )
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        // MOVING THE CAMERA IN THE LOOP
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

### 1.4 - Using Curves to get Vector3 objects along a curve, and using that to set the position of the camera

One great tool for setting the position of a camera would be to look into using [curves](/2022/06/17/threejs-curve/). The base class of curves has a get point method that allows for me to pass an alpha value and get a vector3 object that is at a corresponding point along the curve. The resulting vector3 object can then be used as a way to get the position of a camera. The same thing could also be done as a way to set the point for the camera to look at as well on top of that as well of course.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh1);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(-5, 0, -5);
const vControl = new THREE.Vector3(0, 5, 5);
const curve_pos = new THREE.QuadraticBezierCurve3( v1, vControl, v2);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
lt = new Date(),
frame = 0;
const fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30,       // fps rate to move camera
frameMax = 300;
// update function
const update = () => {
    // alpha values
    const a1 = frame / frameMax;
    const a2 = (1 - Math.abs(0.5 - a1) / 0.5);
    // USING THE getPoint METHOD OF THE CURVE CLASS TO
    // GET A Vector3 OBJECT ALONG A CURVE THAT CAN THEN BE USED TO
    // SET THE POSITION OF THE CAMERA
    camera.position.copy( curve_pos.getPoint(a2) );
    camera.lookAt(mesh1.position)
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        // MOVING THE CAMERA IN THE LOOP
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```


## 2 - Object relative position

So far I have covered some simple examples that have to do with just changing th rotation and the position of the camera. However when  it comes to setting the position of the camera I am doing so in terms of world space, or maybe a kind of relative space but relative to that is the scene object rather than a child of the scene object such as the one mesh object that I have in these examples thus far.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
fps_update = 20,
fps_movement = 30,
frame = 0,
frameMax = 300,
lt = new Date();
const update = (secs) => {
    const per = frame / frameMax,
    bias = (1 - Math.abs(per - 0.5) / 0.5);
    // MOVEING THE MESH OBJECT
    mesh.position.x = -5 + 10 * bias
    // SETTING POSITION OF THE CAMERA RELATIVE TO THE POSITION OF THE MESH
    camera.position.copy(mesh.position).add( new THREE.Vector3(3, 3 - 6 * bias, 3) );
    // CALLING THE LOOKAT METHOD OF THE CAMERA
    camera.lookAt(mesh.position);
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        update(secs);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

## 4 - Updating things by way of sequences

One thing that I have found that I like to do when making video type projects using threejs is to have some kind of system that can be used to break things down into many parts, or sequences if you prefer. This way I have have some kind of setup where I define an array of objects and each object can be given an update method. Each update method of each object would have access to a main sequence object with values that have to do with the progress of the over all video, but also values that have to do with the progress of the current part, or sequence.

### The sequences file

Here I have a javaScript file that I am using to define a system for this sort of thing when it comes to sequences. I have [made a whole other threejs project](/2022/05/12/threejs-examples-sequence-hooks/) centered around this kind of thing. In fact this is R2 of that very project that I am writing about here.

On top of having update methods for each sequence object, I will also want to be able to define hook functions that will be called before and after the call of the current update method in the objects array. This way I can use the before objects hook to update the state of a mesh object that will change over the whole span of the video, or set defaults for things. The after objects hook would be a good place to do anything that I would want to always do with the camera or an object for every frame and override anything that might happen before.

```js
/* seq-hooks.js - r2 - from threejs-examples-sequence-hooks
 *        * Made 'OTHER' publuc methods private helper
 *        * using this['seqHooks'] = {} in place of returning public api
 *        * using let and const
 *        * V3Paths
 */
(function (api) {
    //-------- ----------
    // SET PART FRAME FUNCTIONS
    //-------- ----------
    const partFrameFunctions = {
        // expressions used in r0
        r0: function(seq, per2, obj){
            seq.partFrameMax = Math.floor( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = seq.frame - Math.floor( seq.frameMax * obj.per );
        },
        r0cap: function(seq, per2, obj){
            partFrameFunctions['r0'](seq, per2, obj);
            seq.partFrame = seq.partFrame >= seq.partFrameMax ? seq.partFrameMax - 1 : seq.partFrame;
        },
        // new expression for r1
        r1: function(seq, per2, obj){
            seq.partFrameMax = Math.round( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = Math.floor(seq.frame - seq.frameMax * obj.per);
        }
    }
    //-------- ----------
    // HELPERS
    //-------- ----------
    // no operation
    const noop = function(){};
    // internal get per method
    const getPer = function(a, b){
        return a / b;
    };
    // internal get bias method
    const getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };
    // get total secs value helper
    const getTotalSecs = function(seq){
        return seq.objects.reduce(function(acc, obj){ return acc + (obj.secs || 0) }, 0);
    };
    // get sin bias helper
    const getSinBias = function(per){
        const b = getBias(per);
        return Math.sin( Math.PI * 0.5 * b );
    };
    // create and return a getPer method to be used as seq.getPer
    const createGetPerMethod = function(seq){
        return function(count, objectPer){
            // by default return current 1 count per value for the current sequence object
            count = count === undefined ? 1 : count;
            objectPer = objectPer === undefined ? true: objectPer;
            // if I want a objectPer value
            let a = seq.partFrame, b = seq.partFrameMax;
            // not object per
            if(!objectPer){
                a = seq.frame; 
                b = seq.frameMax;
            }
            // base p value
            let p = getPer(a, b);
            // return base p value effected by count
            return p * count % 1;
        };
    };
    // create a get bias method to be used for sm.getBias
    const createGetBiasMethod = function(seq){
        return function(count, objectPer){
            const per = seq.getPer(count, objectPer);
            return getBias(per);
        };
    };
    // create a get bias method to be used for sm.getBias
    const createGetSinBiasMethod = function(seq){
        return function(count, objectPer){
            const per = seq.getPer(count, objectPer);
            return getSinBias(per);
        };
    };
    // just get an array of per values based on sec values for each object, and DO NOT MUTATE the seq object
    const getPerValues = function(seq){
        const secsTotal = getTotalSecs(seq);
        const perValues = [];
        let i = 0, len = seq.objects.length;
        while(i < len){
            const per = perValues[i - 1];
            if( per === undefined ){
                perValues.push(0);
            }else{
                const perDelta = seq.objects[i - 1].secs / secsTotal;
                perValues.push( parseFloat( ( per + perDelta ).toFixed(4) ) );
            }
            i += 1;
        }
        return perValues;
    };
    // get a target frames value
    const getTargetFrames = function(seq, fps){
        fps = fps === undefined ? 30 : fps;
        const secsTotal = getTotalSecs(seq);
        return Math.ceil(secsTotal * fps);
    };
    // set per values
    const setPerValues = function(seq, fps){
        // set seq.totalSecs
        seq.totalSecs = getTotalSecs(seq);
        // set per values
        getPerValues(seq).forEach(function(per, i){
            seq.objects[i].per = per;
        });
        // set frameMax
        seq.frameMax = getTargetFrames(seq, fps);
        return seq;
    };
    //-------- ----------
    // CREATE - create and return a new seq object
    //-------- ----------
    // Parse a v3Paths object, filling in any blanks, anc convert forms other than v3array to v3array
    const parseV3PathsObject = (seq, v3Paths) => {
        // check each path object given
        v3Paths.forEach( (pathObj) => {
            // must have a key, array, and lerp bool
            pathObj.key = pathObj.key || 'unnamed_' + Object.keys(seq.v3Paths.paths).length;
            pathObj.array = pathObj.array || [];
            pathObj.lerp = pathObj.lerp === undefined ? false : pathObj.lerp; 
            // IF NUMBER ARRAY, convert to vector3 array
            if(typeof pathObj.array[0] === 'number'){
                let v3Array = [];
                let i = 0, len = pathObj.array.length;
                while(i < len){
                    v3Array.push(new THREE.Vector3(
                        pathObj.array[i],
                        pathObj.array[i + 1],
                        pathObj.array[i + 2]
                    ))
                    i += 3;
                }
                pathObj.array = v3Array;
            }
        });
    };
    // create new seq object method
    api.create = function(opt){
        opt = opt || {};
        opt.setPerValues = opt.setPerValues === undefined ? true : false;
        const seq = {};
        seq.objectIndex = 0;  // index of current sequence object in seq.objects
        seq.per = 0;          // main per and bias values
        seq.bias = 0;
        seq.frame = 0;        // frame and frameMax for the full video
        seq.frameMax = 100;
        seq.partFrameMax = 0; // partFrame and partFrame max are set by the Part Frame Function ( seq.pff )
        seq.partFrame = 0;
        seq.pff = opt.pff || 'r1';
        // parse hooks
        seq.beforeObjects = opt.beforeObjects || noop;
        seq.afterObjects = opt.afterObjects || noop;
        // setup sequence objects
        seq.objects = ( opt.objects || [] ).map(function(obj){
            obj.per = obj.per === undefined ? 0 : obj.per;
            obj.secs = obj.secs === undefined ? 0 : obj.secs;
            obj.data = obj.data || {};
            obj.update = obj.update || noop;
            obj.v3Paths = obj.v3Paths || [];
            // parse v3Paths into Vector3 objects if numbers are given
            parseV3PathsObject(seq, obj.v3Paths);
            return obj;
        });
        // set per values is part of the create process
        if(opt.setPerValues){
            setPerValues(seq, opt.fps === undefined ? 30: opt.fps);
        }
        // create get per method for this object
        seq.getPer = createGetPerMethod(seq);
        seq.getBias = createGetBiasMethod(seq);
        seq.getSinBias = createGetSinBiasMethod(seq);
        // MAIN seq.v3Paths object
        seq.v3Paths = {
            main: opt.v3Paths || [],
            paths: {}
        };
        // get pos helper
        seq.getPos = (key) => {
            return seq.v3Paths.paths[key];
        };
        // copy pos helper
        seq.copyPos = (key, target) => {
            target = target || {};
            const v3 = seq.v3Paths.paths[key];
            // if target is object3d assume copy to position
            if(target.isObject3D){
                target.position.copy(v3);
            }
            // if instance of Vector3 assume copy to that
            if(target instanceof THREE.Vector3){
                target.copy(v3)
            }
            return v3;
        };
        parseV3PathsObject(seq, seq.v3Paths.main );
        // CALL SET FRAME FOR FIRST TIME
        api.setFrame(seq, seq.frame, seq.frameMax);
        return seq;
    };
    //-------- ----------
    // SET FRAME
    //-------- ----------
    // set v3 paths for an object ( main seq object or a seq.objects object )
    const setV3PathsForObject = (seq, mainObj) => {
        const obj = mainObj ? seq : seq.objects[seq.objectIndex];
        const per = mainObj ? seq.per : seq.partPer;
        const v3Paths = mainObj ? seq.v3Paths.main : obj.v3Paths;
        const maxFrame = mainObj ? seq.frameMax: seq.partFrameMax;
        if(v3Paths){
            let i = 0, len = v3Paths.length;
             while(i < len){
                 const pathObj = v3Paths[i];
                 const array = pathObj.array;
                 const cv = new THREE.Vector3(); // current vector
                 const len = array.length - 1;
                 let vi1 = Math.floor( len * per );
                 let vi2 = vi1 + 1;
                 vi2 = vi2 > len ? len : vi2;
                 // if lerp mode is true I will want to have a Vector3 that
                 // is between two as there is not one on a frame by frame basic
                 if(pathObj.lerp && array.length < maxFrame){
                     const alpha =  len * per % 1;
                     cv.copy( array[ vi1 ] ).lerp( array[ vi2 ], alpha );
                 }else{
                     // if not lerp mode just copy a vector3 from
                     // the array is it is equal to or greater than
                     // the count of frames
                     let vi1 = Math.floor( array.length * per );
                     vi1 = vi1 > len ? len : vi1;
                     cv.copy( array[ vi1 ] );
                 }
                 // key in to seq.v3Paths
                 seq.v3Paths.paths[ pathObj.key ] = cv;
                 i += 1;
             }
        }
    };
    // set v3 paths for main seq and current object in seq.objects
    const setV3Paths = (seq) => {
        seq.v3Paths.paths = []; // clear paths to empty array
        setV3PathsForObject(seq, true);
        setV3PathsForObject(seq, false);
    };
    // update the given seq object by way of a frame, and maxFrame value
    api.setFrame = function(seq, frame, frameMax){
        seq.frame = frame === undefined ? 0 : frame;
        seq.frameMax = frameMax === undefined ? 100 : frameMax;
        // just making sure frame value is vaild
        seq.frame = seq.frame % frameMax;
        // set main per and bias values
        seq.per = getPer(seq.frame, seq.frameMax);
        seq.bias = getBias(seq.per);
        // update object index
        seq.objectIndex = 0;
        let i = 0, len = seq.objects.length;
        while(i < len){
            const obj = seq.objects[i];
            let per2 = 1;
            if(seq.objects[i + 1] != undefined){
                per2 = seq.objects[i + 1].per;
            }
            // if this is the current object update object 
            // index as well as other relevant values
            if(seq.per >= obj.per && seq.per < per2){
                seq.objectIndex = i;
                // fix for #0 still allows for using old methid for setting partFrame values if needed
                // while also allowing for addtional custom fix if needed by setting seq.pff to a function
                // see partFrameFunctions above for examples
                if(typeof seq.pff === 'function'){
                    seq.pff(seq, per2, obj);
                }else{
                    partFrameFunctions[seq.pff](seq, per2, obj);
                }
                // set partPer and partBias
                seq.partPer = getPer(seq.partFrame, seq.partFrameMax);
                seq.partBias = getBias(seq.partPer);
                seq.partSinBias = getSinBias(seq.partPer);
                break;
            }
            i += 1;
        }
        // V3 PATHS
        setV3Paths(seq);
        // call before hook
        seq.beforeObjects(seq);
        // call update for current object
        const obj = seq.objects[seq.objectIndex];
        if(obj){
            seq.obj = obj;
            obj.update(seq, seq.partPer, seq.partBias, seq.partSinBias, obj);
        }
        // call after objects hook
        seq.afterObjects(seq);
    };
    //-------- ----------
    // PUBLIC GET PER AND BIAS METHODS
    //-------- ----------
    api.getPer = function(a, b, count){
        a = a === undefined ? 0 : a;
        b = b === undefined ? 1 : b;
        count = count === undefined ? 1 : count;
        const per = a / b;
        return per * count % 1;
    };
    api.getBias = function(a, b, count){
        const per = api.getPer(a, b, count);
        return getBias(per);
    };
    api.getSinBias = function(a, b, count){
        const per = api.getPer(a, b, count);
        return getSinBias(per);
    };
}( this['seqHooks'] = {} ));
```

### 4.2 - main example of the the sequences file

I then just want to have some additional code that I can then use to demo this sequence module.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial());
scene.add(mesh2);
//-------- ----------
// SEQUENCE HOOKS OBJECT
//-------- ----------
const seq = seqHooks.create({
    fps: 30,
    frameMax: 90,
    // before calling current sequence object
    // move mesh2 around in a circle
    beforeObjects: function(seq){
        const r = Math.PI * 2 * seq.per;
        const x = Math.cos(r) * 4;
        const z = Math.sin(r) * 4;
        mesh2.position.set(x, 0, z);
    },
    afterObjects: function(seq){
        // camera always looks at the mesh object
        camera.lookAt(mesh.position);
    },
    // using objects to define what will change with camera position over time
    objects: [
        {
            secs: 5,
            update: function(seq, partPer, partBias){
                camera.position.set(10, 10, 10);
            }
        },
        {
            secs: 1,
            update: function(seq, partPer, partBias){
               camera.position.set(10 - 20 * partPer, 10, 10);
            }
        },
        {
            secs: 1,
            update: function(seq, partPer, partBias){
                camera.position.set(-10, 10 - 7 * partPer, 10);
            }
        },
        {
            secs: 5,
            update: function(seq, partPer, partBias){
                camera.position.set(-10, 3, 10);
                const x = 10 * partBias;
                camera.lookAt(mesh.position.clone().add(new THREE.Vector3(x, 0, 0)));
            }
        },
        {
            secs: 10,
            update: function(seq, partPer, partBias){
                camera.position.set(-10, 3 - 10 * partPer, 10 - 30 * partPer);
            }
        }
    ]
});
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
frame = 0,
fps_update = 10,
fps_movement = 30,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        seqHooks.setFrame(seq, seq.frame, seq.frameMax )
        renderer.render(scene, camera);
        seq.frame += fps_movement * secs;
        seq.frame %= seq.frameMax;
        lt = now;
    }
};
loop();
```

## 5 - Camera movement helper example that moves the camera via javaScript code

For this example I am making a more advanced version of my basic animation loop example that has to do with moving a camera. This time I have a move camera helper that takes a camera as an argument along with an update index number in the range of 0 to 1, and a function that will be used to create the values that will be used to change the camera position and orientation. So now the idea is more or less the same as the first animation loop example, but now I am creating additional code that has to do with creating a camera, with values attached to the [userData object](/2021/02/16/threejs-userdata/) of the camera. If you are not aware of the user data object of a camera or any object in threejs that is based off of the object3d class, the user data object is just simply an object where I can pack values that have to do with my own custom system for an object such as a camera.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const getBias = function(per){
    return 1 - Math.abs(per - 0.5) / 0.5;
};
// create camera helper
const createCamera = function(opt){
    opt = opt || {};
    const width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.userData.subject = new THREE.Vector3();
    return camera;
};
const camMoveMethod = {};
// follow subject1 method
camMoveMethod.followSubject1 = function(camera, per){
    const bias = getBias(per);
    return {
        position: new THREE.Vector3(-8, 5, -8 + 16 * bias), 
        lookAt: camera.userData.subject
    };
};
// follow subject2 method
camMoveMethod.followSubject2 = function(camera, per){
    const rad = Math.PI * 2 * per,
    x = Math.cos(rad) * 6,
    y = -4 + 8 * getBias(per),
    z = Math.sin(rad) * 6;
    return {
        position: new THREE.Vector3(x, y, z), 
        lookAt: camera.userData.subject
    };
};
// move camera update helper
const moveCamera = function (camera, per, moveFunc) {
    const camState = moveFunc(camera, per);
    // set the position and lookAt values with the
    // data in the returned camState object
    camera.position.copy(camState.position)
    camera.lookAt(camState.lookAt);
};
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
mesh.position.set(3, 0, 0);
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.userData.subject = mesh.position;
let secs = 0,
methodSecs = 0,
methodIndex = 0,
methodName = '',
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60, // fps rate to move camera
frame = 0,
frameMax = 600,
lt = new Date();
const loop = function () {
    let now = new Date(),
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
```

## Conclusion

So moving a camera is more or less the same as moving anything else in three.js that inherits from the Object3d class by making use of the position and rotation properties of the object, and cameras are no exception. So then I could get into making all kinds of examples that have to do with different ways to change the values of the position and rotation of a camera over time, but with the collection of examples thus far the basic idea, and much more beyond that has been covered in this post I think.

I do get around to editing my content on threejs from time to time, and this post is just one of many that I am sure I will come back to again at some point also. I all ready have many more ideas when it comes to additional examples, and improvements to the examples thus far. If you did enjoy what I have wrote about here, or thing that you have obtained something of value there is checking out one of [my other posts on threejs](/categories/three-js/).

