---
title: Wrapping a vector3 instance in threejs
date: 2022-09-02 07:09:00
tags: [three.js]
layout: post
categories: three.js
id: 1003
updated: 2023-07-12 13:18:40
version: 1.24
---

Often I might be in a situation with a [threejs project](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) in which I would like to apply some kind of rules for [Vector3 class instances](/2018/04/15/threejs-vector3/) that have to do with boundaries in terms of the possible range of values. There are two general ideas that come to mind with this clamping and wrapping.

In the past I have wrote one [blog post on the clamp method of the Vector3 class](/2021/06/16/threejs-vector3-clamp/), and that is one way to go about applying limitations. That is that when a vector goes out of a set range it will be clamped to a value that is within the range, and do so in a box kind of area as it is used by passing two vector3 class instances that define the lowermost and uppermost corners of the box. In that post I also wrote about the clamp length method that works by giving number values that define a min and max vector unit length. This is yet another option that works well, but then both work by clamping values rather than wrapping values. That is that some times when a Vector3 instance goes out of range I might not want to clamp it, but wrap it around to an opposite side of an area.

Sense I have all ready wrote a post on the subject of clamping Vector3 objects I thought that I should also write at least one point on the subject of wrapping them as well. It would seem that there are now such methods in the Vector3 class itself to do this sort of thing. However that is not to say that there are not tools to work with that are relevant to this as there are. Also there is just simply knowing a thing or two about how to go about wrapping values in general with a little vanilla javaScript code as well.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/ytQb0VdhTcw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Wrapping Vector3 class instances in threejs, and what to know first

There are a few things that you might want to read about first with threejs as well as core javaScript in general. When it comes to threejs there is of course the [very basics of getting started with the library](/2018/04/04/threejs-getting-started/), as well as specifics about the Vector3 class in general. When it comes to core javaScript there is a lot to wrote about when it comes to the built in modulo operator and what not to use in in many situations as well. I am not going to want to get into all of it in detail here in this post as I have done so in older posts on the subjects I am referring to. In this section I will just be briefly write about a few things to be aware of, and link to other content as needed.

### The deal with javaScript modulo

A long time ago I wrote a [blog post on the built in modulo operator](/2017/09/02/js-whats-wrong-with-modulo/) in core javaScript and what it wrong with it. In truth there is not really anything wrong with the operator actually it is just that it works a little differently from what many developers might be used to when it comes to dealing with negative numbers. So then there is knowing how to go about adding what is often called mathematical modulo, or euclidean modulo to a JavaScript environment. There are many quick copy and past methods when it comes to vanilla javaScript, however if threejs is there to work with there is all ready a [euclidean modulo method in the math utils object](https://threejs.org/docs/index.html#api/en/math/MathUtils.euclideanModulo) as well that can be used.

### The Math utils object in threejs

In these examples on wrapping a vector in threejs I am making use of a method in the math utils object in threejs that is a kind of modulo operation that differs from what is baked into javaScript itself. There are a number of other methods to be aware of in the math utils object also, so it would be a good idea to [look into the math utils object more](/2022/04/11/threejs-math-utils/) if you have not done so before hand. Many of the methods are usual suspect type methods that I would use, but there is also a few methods that I would like to see there but they are missing, one of which would be a wrap method at least as of r140 backward. That's okay though as maybe many of the methods should actaully be part of some other library actually that can be used with threejs or any javaScript project for that matter.

### Making a custom cut utility library with a wrap method

When I was working on a whole bunch of vanilla [javaScript projects I started a general utilities library](/2021/08/06/js-javascript-example-utils/) that just contains a collection of methods that I find myself copying and pasting from one project to another. One of the methods in the library is a wrap method, along with a clamp method as well. 

### Wrap methods in other libraries

In the Math object of the [Game Framework called Phaser there is a wrap method](/2018/07/22/phaser-math-wrap-and-clamp/), and I have found that method works okay with a few exceptions with certain sets of arguments. In any cases there is looking into the source code of various projects that have libraries like this to see how they are preforming a certain kind of task such as this.

### Source code is on Github

The source code examples that I am writing about here can also be found in my [test threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-wrap) repo. This is also where I park the source code for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version numbers matter

I was using r140 of threejs when I first wrote this post, and the last time I came around to do some editing I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md).


<iframe class="youtube_video"  src="https://www.youtube.com/embed/ytZkhOnqHCA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 1 - The deal with modulo and wrapping values

First off here is a quick example that helps to show what the deal is with the built in javaScript modulo operator compared to using the euclidean modulo method in the math utils object. I have two sets of mesh objects that I would like to wrap, and I am trying to do so by just using modulo alone. When I use the core javaScript modulo operator the end result is that I get the outcome that I want, but only with positive numbers, negative numbers result in the object going out of the desired range. When I use the euclidean modulo method I do get a desired outcome where the mesh object loops back around within the desired range.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh1.position.set(0, 0, -3);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh2.position.set(0, 0, -2);
scene.add(mesh2);
const mesh3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh3.position.set(0, 0, 2);
scene.add(mesh3);
const mesh4 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh4.position.set(0, 0, 3);
scene.add(mesh4);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    // javascript modulo
    mesh1.position.x = 0 - 100 * a1;
    mesh1.position.x %= 5;
    mesh2.position.x = 0 + 100 * a1;
    mesh2.position.x %= 5;
    // THREE.MathUtils.euclideanModulo
    mesh3.position.x = 0 - 100 * a1;
    mesh3.position.x = THREE.MathUtils.euclideanModulo(mesh3.position.x, 5);
    mesh4.position.x = 0 + 100 * a1;
    mesh4.position.x = THREE.MathUtils.euclideanModulo(mesh4.position.x, 5);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

However even though things are working the way that I want them to with the euclidean modulo method it is still working in a way that is relative to zero forward rather than in a way that can work with a range that might go into negative numbers. Still the general idea of wrapping is there, from here forward I just need to find ways to adjust the range.

## 2 - A Wrap Values method 

The process of making a wrap method from the ground up might prove to be a little involved, at least when it comes to making one from the ground up without looking into what is out there on the open internet at least. In any case there is taking an approach in which I am figuring out that I need to do on a axis by axis bases which just seems like the thing to do. What is good about this is that once I figure out something that works well for one axis, then it is generally just a mater of applying the same logic to all other axis values, at least that would seem to be the case with this anyway with respect to the way that I want to do it.

However I would not just want to use a wrap method with vectors alone mind you. So then this post will be on making a wrap method in general to begin with.

### 2.1 - Using MathUtils.euclideanModulo to create a wrap method

The basic idea of what I want does work very much so with the MathUtils.euclideanModulo method. However I want to have a wrap method where I pass a value, and then a min and max value rather than just two values. So then a wrap method can be made by just using the Math.max and Math.min methods with the a, and b values that are given after the first value. These min and max values can then be used to get a range which in turn can then be used to figure an alpha value by using THREE.MathUtils.euclideanModulo and then divining that over the range.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method that just wraps THREE.MathUtils.euclideanModulo
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
// wrap method using THREE.MathUtils.euclideanModulo mod
const wrap = function (value, a, b){
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    if(max === 0 && min === 0){
        return 0;
    }
    const range = max - min;
    const a_range = mod(value + Math.abs(min), range) / range;
    return min + range * a_range; 
};
// wrap and axis
const wrapAxis = function(vec, vecMin, vecMax, axis){
    axis = axis || 'x';
    vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
    return vec;
};
//-------- ----------
// MESH
//-------- ----------
scene.add(new THREE.GridHelper(3, 3));
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh1.position.set(0, 0, 0);
scene.add(mesh1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const vMin = new THREE.Vector3(-1.0, 0, 0),
vMax  = new THREE.Vector3(1.0, 0, 0);
let frame = 0,
lt = new Date();
const maxFrame = 900,
fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // warp one axis
        mesh1.position.x += (-5 + 10 * bias) * secs
        wrapAxis(mesh1.position, vMin, vMax, 'x');
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

I have not battle tested this mind you, however thus far it seems to work fine.

### 2.2 - Using the distance to method along with euclidean modulo

The code that I worked out for this solution involves making two instances of the Vector2 class and then calling the distance to method of each to get an idea of what the max distance from 0 is as well as the current distance is. Once I have these two values I can use them with the euclidean modulo method to get how mush I need to add to the min vector or subtract from the max vector for the current axis. Once again I did not battle test this, but also once again it seems to give me a desired result thus far to say the least.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
// wrap and axis
const wrapAxis = function(vec, vecMin, vecMax, axis){
    axis = axis || 'x';
    const maxD = new THREE.Vector2(vecMin[axis], 0).distanceTo( new THREE.Vector2(vecMax[axis], 0) );
    const d = new THREE.Vector2(vec[axis], 0).distanceTo( new THREE.Vector2(vecMin[axis], 0) );
    if(maxD === 0){
       vec[axis] = 0;
    }else{
        if(vec[axis] >= vecMax[axis]){
            vec[axis] = vecMin[axis] + mod(d, maxD);
        }
        if(vec[axis] < vecMin[axis]){
            vec[axis] = vecMax[axis] - mod(d, maxD);
        }
    }
};
//-------- ----------
// MESH
//-------- ----------
scene.add(new THREE.GridHelper(3, 3));
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh1.position.set(0, 0, 0);
scene.add(mesh1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const vMin = new THREE.Vector3(-1.0, 0, 0),
vMax  = new THREE.Vector3(1.0, 0, 0);
let frame = 0,
lt = new Date();
const maxFrame = 900,
fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // warp one axis
        mesh1.position.x += (-5 + 10 * bias) * secs
        wrapAxis(mesh1.position, vMin, vMax, 'x');
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

### 2.3 - Wrap Axis method based off the Math.Wrap method from Phaser

I have wrote a blog post or two on the game framework called Phaser in the past and I remember that the math object of the [framework has a wrap method](https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js). This method does seem to work the way that I would want it to, but with a few exceptions one of which has to do with NaN values when given the value 0 for the min or max values of the range that I would like to wrap to. This can be fixed fairly easily though of course by just adding some code that will return 0 for such a case of course.

The end result is a warp method that I like better that the more complex solution involving the distance to method, that still seems to give the same end results for the [domain that I given the function](/2021/07/27/js-function-domain/) thus far. Also sense this is based on code from the popular game framework I am pretty sure this will work well for just about any values that I throw at it. What is also nice about this wrap method is that it is also very much a vanilla javaScript solution then as I am just using javaScript alone in the body of the wrap function.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Wrap method based off of the method from Phaser3 
// ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
// * Added some code for case: Wrap(0, 0, 0)
// * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
//
const wrap = function (value, a, b){
    // get min and max this way
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    // return 0 for Wrap(value, 0, 0);
    if(max === 0 && min === 0){
        return 0;
    }
    const range = max - min;
    return (min + ((((value - min) % range) + range) % range));
};
// wrap an axis
const wrapAxis = function(vec, vecMin, vecMax, axis){
    axis = axis || 'x';
    vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
    return vec;
};
//-------- ----------
// MESH
//-------- ----------
scene.add(new THREE.GridHelper(3, 3));
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh1.position.set(0, 0, 0);
scene.add(mesh1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const vMin = new THREE.Vector3(-1, 0, 0),
vMax  = new THREE.Vector3(1, 0, 0);
let frame = 0,
maxFrame = 300,
fps = 20,
lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // warp one axis
        mesh1.position.x += (-5 + 10 * bias) * secs
        wrapAxis(mesh1.position, vMin, vMax, 'x');
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 3 - A Wrap method to work with vector3 objects

Now that I have a method that seems to work okay for one axis all I need to do to make a wrap method for Vector3 is to just call the method for each axis. What is great about this is that in order to make solutions that will also work for the Vector2 class the only major change is to just call the wrap axis for x and y only when making the wrap vector method. Also if I put more time into researching other solutions for this, and fine a better way of wrapping an axis, I can just recreate the wrap axis method, and leave everything else as is.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// Wrap method based off of the method from Phaser3 
// ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
// * Added some code for case: Wrap(0, 0, 0)
// * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
//
const wrap = function (value, a, b){
    // get min and max this way
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    // return 0 for Wrap(value, 0, 0);
    if(max === 0 && min === 0){
         return 0;
    }
    const range = max - min;
    return (min + ((((value - min) % range) + range) % range));
};
// wrap an axis
const wrapAxis = function(vec, vecMin, vecMax, axis){
    axis = axis || 'x';
    vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
    return vec;
};
// wrap a vector
const wrapVector = function (vec, vecMin, vecMax) {
    vecMin = vecMin || new THREE.Vector3(0, 0, 0);
    vecMax = vecMax || new THREE.Vector3(1, 1, 1);
    wrapAxis(vec, vecMin, vecMax, 'x');
    wrapAxis(vec, vecMin, vecMax, 'y');
    wrapAxis(vec, vecMin, vecMax, 'z');
};
// create group
const createGroup = function () {
    const group = new THREE.Group();
    let i = 0,
    len = 50;
    while (i < len) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.0, 1.0, 1.0), 
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.60
            })
        );
        mesh.position.x = -2 + 4 * Math.random();
        mesh.position.y = -2 + 4 * Math.random();
        mesh.position.z = -2 + 4 * Math.random();
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update a group
const updateGroup = function (group, secs, bias) {
    group.children.forEach(function(mesh){
        mesh.position.x += (2 - 4 * bias) * secs;
        mesh.position.y += (-2 + 4 * bias ) * secs;
        mesh.position.z += 2 * secs;
        wrapVector(
            mesh.position,
            new THREE.Vector3(-2, -2, -2),
            new THREE.Vector3(2, 2, 2));
    });
};
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const group = createGroup();
scene.add(group);
let frame = 0,
maxFrame = 300,
fps = 20,
lt = new Date();
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        updateGroup(group, secs, bias)
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 4 - A wrap Vector module and some demos

Having a wrap vector method seems like the kind of tool that I would want to take with me from project to project. So then in this section I will be writing about the start of a wrap vector module that I might turn into a separate full blown project that I will make one of my threejs example posts.  There are a few ideas that come to mind for advanced features, but for now I think this module might just need to have one public method that will wrap a vector that I give it. On top of that I might want to also make a wrap number method public as well while I am at it so for now maybe that will be it for this project, as far as this post goes at least anyway.

### 4.0 - A wrap Vector module

The module that I have together then thus far just makes use of the wrap method based off of the one from Phaser, along with the wrap axis method. I then create a public api that is a function and make the main function of the module the wrap vector method. I am thinking that will be the main feature of interest with this that I will be using over and over again in projects, so maybe that is all that I need to do with this one for the most part. The only other thing that I did is make the wrap method public as I might want to do this sort of thing with a number rather than a vector class instance in some cases.

```js
/* vector-wrap.js - r0 - A Wrap Vector Module prototype - from threejs-vector3-wrap
 * 
 *
 */
var wrapVector = (function () {
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //

    var wrap = function (value, a, b){
        // get min and max this way
        var max = Math.max(a, b);
        var min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        var range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    var wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
    };
    // Main wrap a vector method of public api
    var api = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(0, 0, 0);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        Object.keys(vec).forEach(function(axis){
            wrapAxis(vec, vecMin, vecMax, axis);
        });
        return vec;
    };
    // make wrap method public
    api.wrap = wrap;
    // return api
    return api;
}());
```

### 4.1 - Basic demo of the module

A basic example of the module will now work by setting something up like this one. Here I just have two mesh objects and I would like to wrap them both to the same set of vectors as I move them around. Thus far the module seems to work just fine with this simple hello world type example, but now I would like to move on to something a little more involved.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// TEST VECTOR2
//-------- ----------
// works well with Vector2
const v = new THREE.Vector2(5, 2);
console.log( wrapVector( v , new THREE.Vector2(-3, -3), new THREE.Vector2(3, 3) ) );
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh1.position.set(0, 0, 0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh2.position.set(0, 0, -1.5);
scene.add(mesh2);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const vMin = new THREE.Vector3(-2, -1, -2),
vMax  = new THREE.Vector3(2, 1, 2);
let frame = 0,lt = new Date();
const maxFrame = 300, fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // warp one axis
        mesh1.position.x += (-5 + 10 * bias) * secs;
        mesh2.position.y += (-5 + 10 * bias) * secs;
        // wrap vector
        wrapVector(mesh1.position, vMin, vMax);
        wrapVector(mesh2.position, vMin, vMax);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```


### 4.2 - Seeded Random example

For this example I made a few functions that will create and update a group of mesh objects. When I create a group I can set some data with the user data objects for the group as well as each mesh object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create group
const createGroup = function (count, spread, ppsMin, ppsMax, meshSize, boundSize, gitDir) {
    spread = spread === undefined ? 5 : spread;
    count = count === undefined ? 50 : count;
    ppsMin = ppsMin === undefined ? 0.5 : ppsMin;
    ppsMax = ppsMax === undefined ? 2 : ppsMax;
    meshSize = meshSize === undefined ? 1 : meshSize;
    boundSize = boundSize === undefined ? 4 : boundSize;
    const group = new THREE.Group();
    const gud = group.userData;
    gud.meshSize = meshSize;
    gud.boundSize = boundSize;
    let i = 0;
    while (i < count) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(gud.meshSize, gud.meshSize, gud.meshSize), 
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.60
            })
        );
        // start position
        mesh.position.x = spread * THREE.MathUtils.seededRandom();
        mesh.position.y = spread * THREE.MathUtils.seededRandom();
        mesh.position.z = spread * THREE.MathUtils.seededRandom();
        // user data values, pps and direction
        const ud = mesh.userData;
        ud.pps = ppsMin + (ppsMax - ppsMin) * THREE.MathUtils.seededRandom();
        ud.dir = gitDir ? gitDir(group, mesh, i) : new THREE.Vector3(0, 1, 0).normalize();
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update a group
const updateGroup = function (group, secs, bias) {
   const gud = group.userData;
   const bs = gud.boundSize / 2;
   const ms = gud.meshSize / 2;
   const a = bs * -1 + ms;
   const b = bs - ms;
   const vMin = new THREE.Vector3(a, a, a);
   const vMax = new THREE.Vector3(b, b, b);
   group.children.forEach(function(mesh){
        const ud = mesh.userData;
        mesh.position.x += ud.dir.x * ud.pps * secs;
        mesh.position.y += ud.dir.y * ud.pps * secs;
        mesh.position.z += ud.dir.z * ud.pps * secs;
        wrapVector(
            mesh.position,
            vMin,
            vMax);
    });
};
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
// group1 uses default values
const group1 = createGroup();
scene.add(group1);
// group2 uses custom values
const group2 = createGroup(100, 5, 0.125, 0.25, 0.25, 4, () => {
    return new THREE.Vector3(
        -5 + 10 * THREE.MathUtils.seededRandom(),
        -5 + 10 * THREE.MathUtils.seededRandom(),
        -5 + 10 * THREE.MathUtils.seededRandom());
});
group2.position.set(-7, 0, 0);
scene.add(group2);
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        updateGroup(group1, secs, bias);
        updateGroup(group2, secs, bias);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 5 - Animation Loop Demos

For this section I will not be going over the source code examples of a few animaiton loop demos that make use of the various wrapping features that I have wrote about this far in this post.

### 5.1 - Wrapping Vector unit length animation loop example

Here I have an animation loop example that is the basic for one of my videos for this blog post. The first video that I made was based on one of the module examples that I made with the wrap axis methods. For this example I wanted to just make something that has to do with wrapping vector unit length. I also wanted to make something that is a little more interesting than just a single mesh object having the length wrapped so I went a little overboard with expressions and so forth.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// LIGHT
// ---------- ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
// ---------- ---------- ----------
// CONST
// ---------- ---------- ----------
const TOTAL_LENGTH = 100;
const MAX_LENGTH = 15;
const COUNT = 400;
const SIN_LOOP_RANGE = [32, 64];
const Y_ROTATION_COUNT = 1;
const Y_ROTATION_OFFSET = 40;
const X_DEG = 10;
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group = new THREE.Group();
scene.add(group);
let i = 0;
while(i < COUNT){
    const a_index = i / COUNT;
    const color = new THREE.Color();
    color.r = 0.1 + 0.9 * a_index;
    color.g = 1 - a_index;
    color.b = Math.random();
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshPhongMaterial({color: color, transparent: true, opacity: 0.5})
    );
    group.add(mesh);
    i += 1;
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    group.children.forEach( (mesh, i, arr) => {
        const a2 = i / arr.length;
        const a3 = a1 + 1 / (TOTAL_LENGTH * 2.5) * i;
        const sin_loops = SIN_LOOP_RANGE[0] + (SIN_LOOP_RANGE[1] - SIN_LOOP_RANGE[0]) * a1;
        const a4 = Math.sin(Math.PI * sin_loops * (a2 * 1 % 1));
        let unit_length = TOTAL_LENGTH * a3;
        unit_length = THREE.MathUtils.euclideanModulo(unit_length, MAX_LENGTH);
        const e = new THREE.Euler();
        const yfc = Y_ROTATION_OFFSET;
        const degY = ( yfc * -1 + yfc * 2 * a2) + (360 * Y_ROTATION_COUNT ) * a1;
        const xd = X_DEG;
        const degX = xd * -1 + xd * 2 * a4;
        e.y = THREE.MathUtils.degToRad( degY);
        e.x = THREE.MathUtils.degToRad(degX);
        mesh.position.set(1, 0, 0).normalize().applyEuler(e).multiplyScalar(0.5 + unit_length);
        mesh.lookAt(0,0,0);
        mesh.rotation.y = Math.PI * 2 * ( (a2 + a2) * 64 % 1);
    });
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

### 5.2 - Wrap Grid Demo

A while back I made a threejs project example that I just called [object grid wrap](/2022/05/20/threejs-examples-object-grid-wrap) because I am very bad at names. Anyway the project is a fairly complex way of creating a grid of objects that I then move around by way of two offset values, and then they, well wrap around when the go out of bounds. The project works okay, but there are for sure a few ruff edges with it at least as of this writing anyway. To cut to the chase here I might get around to making a new revision of that project at some point and to help address some of the problems I am seeing with it I thought I would try to make a very simple form of what I want here as an animation loop demo.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/sDK9Uv205tQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method that just wraps THREE.MathUtils.euclideanModulo
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
// wrap method using THREE.MathUtils.euclideanModulo mod
const wrap = function (value, a, b){
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    if(max === 0 && min === 0){
        return 0;
    }
    const range = max - min;
    const a_range = mod(value + Math.abs(min), range) / range;
    return min + range * a_range; 
};
// position a group of child objects to a grid
const groupToGrid = function(group, size = 5, divisions = 5, offset = new THREE.Vector2( 0.5, 0.5 ), forChild ){
    let i = 0;
    const len = size * size;
    while(i < len){
        const obj = group.children[i];
        const gx = i % size;
        const gz = Math.floor( i / size );
        obj.position.x = size / 2 * -1 + gx + offset.x;
        obj.position.z = size / 2 * -1 + gz + offset.y;
        obj.position.x = wrap(obj.position.x, size / 2 * -1, size / 2);
        obj.position.z = wrap(obj.position.z, size / 2 * -1, size / 2);
        if(forChild){
            let a_dist = obj.position.distanceTo(group.position) / ( size / 2 );
            a_dist = s_dist = THREE.MathUtils.clamp(a_dist, 0, 1);
            forChild(obj, i, gx, gz, a_dist, group);
        }
        i += 1;
    }
};
// opacity for child effect
const forChild_opacity = (function(){
    const curve_path = new THREE.CurvePath();
    const v1 = new THREE.Vector2(0.00, 1.00);
    const v2 = new THREE.Vector2(0.80, 1.00);
    const v3 = new THREE.Vector2(1.00, 0.00);
    const c1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector2( 0.0, 1.00) );
    curve_path.add( new THREE.LineCurve( v1, v2 ) );
    curve_path.add( new THREE.QuadraticBezierCurve( v2, c1, v3 ) );
    return (obj, i, gx, gz, a_dist, group) => {
        const v = curve_path.getPoint(a_dist);
        //obj.material.opacity = 1 - a_dist;
        obj.material.opacity = v.y;
    };
}());
// ---------- ----------
// GROUP OF OBJECTS
// ---------- ----------
const size = 10, divisions = 10;
const group = new THREE.Group();
scene.add(group);
let i = 0;
const len = size * size;
while(i < len){
    const a_x = (i % size) / size;
    const a_y = Math.floor(i / size) / size;
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(1 - a_x, 0.25, a_y),
            transparent: true
        })
    );
    group.add(mesh);
    i += 1;
}
// ---------- ----------
// GRID HELPER
// ---------- ----------
scene.add( new THREE.GridHelper( size, divisions ) );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set( -8, 8, -8 );
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a_frame = frame / frameMax;
    const a_y = Math.sin( Math.PI * 2 * a_frame );
    const v_offset = new THREE.Vector2(0, 0);
    v_offset.x = 0.5 + size * a_frame;
    v_offset.y = 0.5 + size * a_y;
    groupToGrid( group, size, divisions, v_offset, forChild_opacity );
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion

Wrapping Vectors is something that I do find myself doing over and over again as a way to limit vectors to a given range. I have made a whole lot of projects that do something to this effect one of which I find myself using a whole lot when I make my various little video projects that I call my "object grid wrap module". When it comes to that project I am just using the Euclidean Modulo method to do so by wrapping given values to a range of 0 and 1 and then use those values to set the position of objects in a grid. That kind of system seems to work well also on top of having some kind of function that will wrap a vector directly like I did with my main wrap method example in this post.