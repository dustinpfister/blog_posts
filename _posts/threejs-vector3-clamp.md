---
title: Clamping a vector in threejs
date: 2021-06-16 12:45:00
tags: [three.js]
layout: post
categories: three.js
id: 890
updated: 2023-07-11 10:24:29
version: 1.43
---

When it comes to setting boundaries for Vectors in a [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) project there is often clamping the values or wrapping the values. That is that there is a situation in which there is a min value, a max value, and having a way to make sure that a value is always inside this range. However there is the idea of having it so that a number out of range is clamped to a value that is closest to what is in range, and then there is the idea of warping the value back around from the opposite side of the range. In todays post I will be focusing on what there is to work with in the [Vector3 class](https://threejs.org/docs/#api/en/math/Vector3) prototype when it comes to clamping values. However I think that I should also have at least a few examples that have to do with wrapping vector3 objects as well.

When it comes to clamping Vectors there is the idea of having two Vectors that will be min and max Vectors, this results in some kind of box like area in which a vector can be clamped into. There is another general idea when it comes to clamping vectors that has to do more so with setting a limit in terms of the Euclidean length which will result in a sphere like area in which values can be clamped to. I suppose that there are all kinds of other ideas that come to mind when it comes to more complex examples of this sort of thing, but those are the two general basic ideas for starters. When it comes to these two general ideas there is the [Vector3.clamp](https://threejs.org/docs/index.html#api/en/math/Vector3.clamp), and [Vector3.clampLength](https://threejs.org/docs/index.html#api/en/math/Vector3.clampLength) methods in the Vector three class to work with.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/AWB-aC8stjg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Vector3 clamping What to know before hand

This is a post on using the Vector3 clamp methods to clamp a vector between a min and max range. And when doing so for this post at least I am sticking mainly with where there is to work with in the Vector3 prototype alone rather than looking into additional examples of this sort of thing. So then I trust that you have [covered the very basics when it comes to getting up and running with threejs](/2018/04/04/threejs-getting-started/) in general, and have not got to the point where you are just learning more about working with the Vector3 class.

### Look into the Vector3 class in general

In this post I am just going over a few methods in the [Vector 3 class](/2018/04/15/threejs-vector3/) that have to do with creating and working with one or more Vectors in threejs. FOr the most part I am just focusing on methods like clamp and clamp length. However there is a great deal more to learn about the class and Vectors in general.

### Source code is up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repo on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-clamp). This is also where I park the source code examples for all [my other blog posts on threejs as well](/categories/three-js/).

### Version numbers matter with threejs

When I first wrote this post I was using threejs r127, and the last time I came around to do some editing I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) when it comes to testing out the source code examples. I have got into the habit of making sure that I always mention the version of threejs that I am using when it comes to writing a post on threejs. The main reason why is because threejs is still a very fast moving project in terms of development and code breaking changes are happening all the time with it as a result.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/-5vH7bGHHvU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 1 - Some basic examples of Vector3 clamp

With this section I will be starting out with just a few very basic examples of the Vector3 clmap method, as well as other Vector3 methods such as clamp length. this will very much be a basic section so these examples should be fairly easy to get working on your end. However There are still a few basic things that you will need to be aware of before getting them to work. There is still things like knowing to use three.min.js over that of three.module.js for revisions where that is still an option, as well as a lot of other things like that which come to mind. Still in this section I will be keeping things as simple as possible for what it is worth.

### 1.1 - Basic example of the THREE.Vector3 clamp method.

So in this example I am using the Vector3 clamp method to just make it so that any value that I set for the [position](/2022/04/04/threejs-object3d-position/) of a [mesh object](/2018/05/04/threejs-mesh/) that ends up getting clamped within a min and max Vector range. So the way this works is I just call the Vector3.clamp method and pass the vector that I want to clamp as the first argument followed by two additional arguments that are the min and max ranges for the Vector if the form of additional Vector3 instances.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(5, 5));
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// Using Vector3 clamp
//-------- ----------
mesh.position.set(0, 0, -5);
mesh.position.clamp(
    new THREE.Vector3(-2, 0, -2),
    new THREE.Vector3(2, 0, 2));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Clamping Vectors by length rather than a box area with Vector3.clampLength

There is clamping vectors into a box like area with the clamp method, but another option is the clamp length method that is more of a sphere like area. This method is somewhat similar to the clamp method only in place of Vector3 instances for setting the min and max values for the range, there is just setting the min and max values with a length values in the from of just javaScript numbers. Another way of thinking about this is an inner and outer radius in terms of two spheres that are both centered over the same origin.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(5, 5));
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// Using clamp length
//-------- ----------
mesh.position.set(0, 5, -5);
mesh.position.clampLength(0.5, 1);
console.log(mesh.position);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

The subject of clamping a vector by length goes hand in hand with many other related topics such as what a length of a vector is, and also what a [normalized vector](/2021/06/14/threejs-vector3-normalize/) with a length of 1 is. Getting into this subject might be a little off topic, but the basic idea is that a length of 1 is a radius of 1 from the origin. So by clamping the length of a vector from 0.5 to 1 will make it so that the distance from the origin to the vector will always be between those values.

## 2 - Wrapping rather than clamping a vector3 object

There is clamping a vector3 object to a box like space, but then there is also the other general way of dealing with boundaries which is to wrap them back ground. I have wrote a [whole other blog post on the subject of wrapping](/2022/09/02/threejs-vector3-wrap/) rather than clamping vector3 objects. It would be best to read that post on the subject when it comes to this as the demos I have in this section might not really do the subject justice. There are a number of ways to go about doing this sort of thing which is very much the case, I am just covering a few ways of doing so here. The main thing or concern with this is how the modulo operator works in core javaScript when dealing with negative numbers.

### 2.1 - Basic wrap single number demo

Some times I might not want to have a vector clamped to a set of vectors that from a box, or using length values, but rather I would like to have things wrap around. Sadly it would seem that there is no wrap method in the Vector3 class, at least not of this writing with r140 of the library anyway. However there are some core tools to start out with in the math utils object such as the [Euclidean Modulo method](https://threejs.org/docs/#api/en/math/MathUtils.euclideanModulo) that will be a good start when it comes to wrapping values. 

```js
//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
//-------- ----------
// OBJECTS
//-------- ----------
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    mesh.position.x = -5 + 10 * a1;
    mesh.position.x = -1.5 + mod(mesh.position.x, 3);
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

### 2.2 - A wrap method helper

Now that I have a basic example of wrapping out of the way it is now just a question of doing this for all axis values. The solution that I would out for this is a little involved, but I managed to make ground with it by just thinking in terms of what I need to do on a axis by axis bases.

```js
//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(4, 4));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
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
// ---------- ----------
// OBJECTS
// ---------- ----------
const group = createGroup();
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    updateGroup(group, 0.025, a2);
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

### 2.3 - wraping vector unit length

There is not just wrapping the axis values of a vector, but also wrapping the unit length of a vector. In other words there is doing the same thing as the clamp length method that I covered in the basic section of this post, only just wrapping the value around rather than clamping it. For this demo then I am doing just that by once again using the THREE.MathUtils.euclideanModulo method of the math utils object to create an alpha value in the range of 0 to 1. I can then use this in the process of setting the length of the vector of the position of a mesh.

Speaking of setting the length of a vector to do so I am setting a starting position of the mesh that has a unit length of 1. I am then using the apply Euler method of the vector3 class as a way to adjust the direction rather than unit length of the vector. Anyway if I have a vector with a unit length of one I can then use the multiply scalar method to set the current vector length that I want. In this case it is a value created by way of an expression that uses the alpha value made with the help of the THREE.MathUtils.euclideanModulo method.

```js
//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method that wraps THREE.MathUtils.euclideanModulo
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(4, 4));
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshNormalMaterial({ transparent: true, opacity: 1 })
);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.2, wireframeLinewidth: 3 })
);
mesh2.geometry.rotateX( Math.PI * 1.5 );
scene.add(mesh2);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20,
FPS_MOVEMENT = 30;
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a_frame = frame / frameMax;
    const a_length = mod(32 * a_frame, 1);
    const vectorLength = 1.5 * a_length;
    const e = new THREE.Euler(0, Math.PI * 2 * a_frame, Math.PI * 8 * a_frame);
    mesh1.position.set(1, 0, 0).applyEuler(e).multiplyScalar( vectorLength );
    mesh1.lookAt(0, 0, 0);
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

## 3 - Animation Loop examples

For this section I will now be going over a few animation loop examples.These are often the startong points for one or more videos that I make for blog posts such as this.

### 3.1 - Animation loop example using Vector3.clamp

To get a real idea as to how the clamp method might come in handy I will want to have some kind of animation loop example. For this first animation loop example I have a whole bunch of mesh objects that start out at the center of a group and then move out my making use of a value that I use with the multiply scalar method. When moving the mesh objects I use the clamp method as a way to make sure that the mesh objects are not moving out of bounds and I am also resetting an alpha value while doing so to create a kind of crude animation loop type thing.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// get a random axis
const randAxis = function () {
    return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
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
                opacity: 0.50
            })
        );
        const ud = mesh.userData;
        const start_dir = ud.start_dir = new THREE.Vector3();
        ud.alpha = 0;
        ud.dr = 0.05 + 0.95 * Math.random();
        start_dir.x = randAxis();
        start_dir.y = randAxis();
        start_dir.z = randAxis();
        mesh.position.copy(start_dir.normalize().multiplyScalar(2));
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update group
const updateGroup = function (group, delta) {
    group.children.forEach(function (mesh, i) {
        const ud = mesh.userData;
        const start_dir = ud.start_dir;
        const pos = mesh.position;
        ud.alpha += delta * ud.dr;
        pos.copy(start_dir.clone().normalize().multiplyScalar(ud.alpha));
        pos.clamp(
            new THREE.Vector3(-2, -2, -2),
            new THREE.Vector3(2, 2, 2));
        if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
            ud.alpha = 0;
        }
    });
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const group = createGroup();
scene.add(group);
scene.add(new THREE.GridHelper(4, 4));
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    updateGroup(group, 0.1);
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

### 3.2 - Animation loop example two making use of clamp, clamp length, and my wrap method

For my next animation loop example I am making use of all of the core ideas that i have covered in this post. This is just a more advanced version of the first animation loop example where I can set a clamp type when creating a group of mesh objects. Inside the update method this clamp type is then used as a way to find out what kind of method should be used to make the mesh objects say in a given area.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 1, 2)
scene.add(dl);
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
// wrap a vector
const wrapVector = function (vec, vecMin, vecMax) {
    vecMin = vecMin || new THREE.Vector3(0, 0, 0);
    vecMax = vecMax || new THREE.Vector3(1, 1, 1);
    wrapAxis(vec, vecMin, vecMax, 'x');
    wrapAxis(vec, vecMin, vecMax, 'y');
    wrapAxis(vec, vecMin, vecMax, 'z');
};
// get a random axis
const randAxis = function () {
    return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
};
// create group
const createGroup = function (clampType, color) {
    clampType = clampType || 'clamp';
    color = color || 0xffffff;
    const group = new THREE.Group();
    let i = 0,
    len = 10;
    while (i < len) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.0, 1.0, 1.0), 
            new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.60
            })
        );
        const ud = mesh.userData;
        const start_dir = ud.start_dir = new THREE.Vector3();
        ud.alpha = 0;
        ud.dr = 0.05 + 0.95 * Math.random();
        ud.clampType = clampType;
        start_dir.x = randAxis();
        start_dir.y = randAxis();
        start_dir.z = randAxis();
        mesh.position.copy(start_dir.normalize().multiplyScalar(2));
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update group
const updateGroup = function (group, delta) {
    group.children.forEach(function (mesh, i) {
        const ud = mesh.userData;
        const start_dir = ud.start_dir;
        const pos = mesh.position;
        ud.alpha += delta * ud.dr;
        pos.copy(start_dir.clone().normalize().multiplyScalar(ud.alpha));
        // clamp type
        if(ud.clampType === 'clamp'){
            pos.clamp(
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
            if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
                ud.alpha = 0;
            }
        }
        // if clamp type is length
        if(ud.clampType === 'length'){
            pos.clampLength(0.1, 2);
            mesh.lookAt(group.position);
            if(pos.length() === 2){
                ud.alpha = 0;
            }
        }
        // if clamp type is wrap
        if(ud.clampType === 'wrap'){
            wrapVector(
                pos,
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
            //ud.alpha = ud.alpha % 2;
        }
    });
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(4, 4));
const group1 = createGroup('clamp', 0xff0000);
scene.add(group1);
const group2 = createGroup('length', 0x00ff00);
scene.add(group2);
const group3 = createGroup('wrap', 0x00ffff);
scene.add(group3);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 500;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    updateGroup(group1, 0.05);
    updateGroup(group2, 0.05);
    updateGroup(group3, 0.05);
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

### 3.3 - Clamp to grid animation demo

This far I can not say that any of the animation loops thus far do a good job of showcasing what the clamp method is really about. I started making just one animation after another that showcases clamp, but also other alternatives such as wrapping. So for this animation loop example I thought that I would make one where I just clamp all the children of a group to an area within a grid. This involves just creating a whole bunch of mesh objects and adding them as children of a group. While doing so I can add a heading value as well as some other values to the user data object of each mesh object. In an update method I can then use this user data to move the mesh objects by a given heading and speed. I can then also make use of the Vector3 clamp method to make sure that the mesh objects do not go out of bounds. I can then check to see if one of the mesh objects are along an edge and if so give them a new heading and also set the color depending on what side they hit.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight();
dl.position.set(1, 2, 3);
scene.add(dl);
//-------- ----------
// CONST
//-------- ----------
const V_MIN = new THREE.Vector3( -4.5, 0, -4.5 );
const V_MAX = new THREE.Vector3( 4.5, 0, 4.5 );
const COLORS = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xff00ff];
const CHECKS = ['x,1,180','x,2,0','z,3,270','z,4,90'].map((str) => { return str.split(',') });
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = (count) => {
    const group = new THREE.Group();
    let i = 0;
    while(i < count){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1,1 + Math.random(),1),
            new THREE.MeshPhongMaterial({
                transparent: true,
                opacity: 0.75
            })
        );
        const mud = mesh.userData;
        mud.heading = Math.PI * 2 * Math.random();
        mud.upd = 0.25 + 1.75 * Math.random();
        group.add(mesh);
        i += 1;
    }
    return group;
};
const getHeading = (degHome) => {
    return Math.PI / 180 * (degHome - 45 + 90 * Math.random());
};
const updateGroup = (group, delta) => {
    group.children.forEach( (mesh, i) => {
        const mud = mesh.userData;
        const v_delta = new THREE.Vector3();
        v_delta.x = Math.cos(mud.heading) * mud.upd * delta;
        v_delta.z = Math.sin(mud.heading) * mud.upd * delta;
        mesh.position.add(v_delta).clamp(V_MIN, V_MAX);
        let ic = 0;
        while(ic < 4){
            const axis = CHECKS[ic][0];
            const maxValue = ic % 2 === 0 ? V_MAX[axis]: V_MIN[axis];
            if(mesh.position[axis] === maxValue){
                mesh.material.color = new THREE.Color(COLORS[ CHECKS[ic][1] ]);
                mud.heading = getHeading(CHECKS[ic][2]);
                break;
            }
            ic += 1;
        }
    });
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group = createGroup(100);
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 12, 12);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 500;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
     updateGroup(group, 0.1)
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

So then these clamp methods are helpful for making sure that a given point will never leave a given range, but they are not the best choice for other applications that come to mind. One such other application would have to do with collision detection, where I do not always want to clamp or wrap a point to a rang, but to just simply know if the point is in or out of a given range.

I did not get around to every little detail when it comes to setting boundaries for Vector3 values in general. I think I did more or less cover what there is to work with when it comes to clamping values at least, but I did not get into solutions that have to do with [wrapping values](/2018/07/22/phaser-math-wrap-and-clamp/). When it comes to that it would seem that there is no built in solution for doing so in the Vector3 prototype by itself at least. So it would seem that in order to Wrap values I will need to come up with my own solutions for doing so. 

There is also getting into more advanced solutions when it comes to just clamping values also, as I just covered the two basic ways of doing so here. So hopefully at some point in the future I will get around to expanding this post with additional examples on clamping vector's, and possible also some warping examples to which would be nice.
