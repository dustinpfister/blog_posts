---
title: The Math Utils in threejs
date: 2022-04-11 14:18:00
tags: [three.js]
layout: post
categories: three.js
id: 977
updated: 2023-03-15 12:28:23
version: 1.31
---

Baked into threejs there are a number of [Math utilities](https://threejs.org/docs/#api/en/math/MathUtils) that can be used to help with various tasks such as clamping values for one example. Other things that can be done with the various methods include things such as converting a degree value to a radian value, or getting pseudo random values by way of the seeded random method. There are a lot of other great methods that help with the process of creating what is often referred to as an alpha value as well \( a number between 0 and 1 \).

However there is not just thinking in terms of what there is to work with, but also what is missing when it comes to a collection of methods such as this. With that said I think I should also write about one or more additional things that are not in this math utils object, but should maybe be there. I say maybe because I do not expect everything to be there of course. Even though there are some usual suspect type methods to work with here there is still going to be a need for some kind of additional utility library outside of threejs that is a kind of extension of what there is to work with in MathUtils. I still find myself writing my own code for various things in order to fill in the gap sort of speak.

Speaking of filling in the gap when it comes to making my own math utility module, I am always working on top of threejs, so I can just simply wrap many of the Math utils object methods. For one example of this there is the subject of clamping and wrapping values. When it comes to clamping I can just have an abstraction of THREE.MathUtils.clamp and be done with that. However things get a little messy when it comes to having a wrap method. There is an euclidean modulo method, but that alone does not work the way that I would want it to for such a method so there is having something that is maybe a bit more that just an abstraction for that one.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/NPQCgyjuMVI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The math utils method and what to know first

This is a post on some of the features of the Math utils object in the javaScript library known as threejs. I am assuming that you have all ready got up to speed with the basics when it comes to [getting started with threejs](/2018/04/04/threejs-getting-started/). I am also assuming that you have at least some background when it comes to client side web programming to begin with as well. I will not be getting into detail about many basic things that you should know at this point. However I do often use this first section of a post to outline at least a few things that you might want to also read up more on before getting to the rest of this.

### There is a Clamp method but no Wrap method in Math utils

Many libraries will have a clamp method that will clamp a value to the range of a given max and min value, and threejs is no exception with this as there is very much a clamp method in the math utils object. However there is not just clamping values but also wrapping values as well. That is that on top of having a method that will clamp a value between a min and max value in that it will just not let the value go lower or higher there would also be a wrap method that will wrap a value that goes beyond max back to the min value and vice versa. It would seem that there is no wrap method in the math utils object, thus I have to get this method by using or making something outside of the library. There is however an Euclidean Modulo method that is kind of similar to what I would expect, it is just that I also would like to have something that works a little differently when it comes to negative numbers.

I have wrote a [blog post on this subject of wrapping Vectors and primitives in threejs](/2022/09/02/threejs-vector3-wrap/) in which I was able to find a decent wrap method, and I also made [one of my threejs project examples that is a wrap module](/2022/09/09/threejs-examples-wrap-module/) in which I am building on top of this kind of thing. In the past I also wrote a [post on the wrap method of the grame framework called phaser](/2018/07/22/phaser-math-wrap-and-clamp/) which has a wrap method that works great.

<iframe class="youtube_video" src="https://www.youtube.com/embed/TQMbcHB89RY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Source code example in this post are on Github

The source code examples that I am writing about in this post [are up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-math-utils). This is also where I am parking the source code examples for all [my other various posts on threejs](/categories/three-js/).

### Version Numbers matter

When I first wrote this post I was using r135, and the last time I came around to do some editing of this post I made sure all the examples where still working okay with r140. Always check what version you are using when reproducing things on you end, as code breaking changes are made to threejs often.

## 1 - Basic example of threejs math utilities using degree to radian method when setting the position of a mesh

Maybe one of the methods that I find myself using the most often would be the degree to radians conversion method that there is to work with in this Object. Although it is not so hard to just do this with a simple expression because it is a such a common task of course there is a method for this in the Math utils method. 

The use of radians comes up a whole lot and not just with javaScript related features but with various core javaScript features as well such as the Math cos and sin methods. With that said that is what I am using the methods for in this example actually by converting a given degree value to a radian value and then using that to get the desired x and y values that will be use to set the position of a mesh object.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// SETTING POSITION OF THE MESH OBJECT
const radian = THREE.MathUtils.degToRad(20);
const x = Math.cos(radian) * 5;
const z = Math.sin(radian) * 5;
mesh.position.set(x, 0, z);
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

## 2 - The clamp and rand float methods

One thing that seems to come up a lot with threejs, and many javaScript projects in general actually is the subject of [clamping and wrapping values](/2018/07/22/phaser-math-wrap-and-clamp/). With that said here in threejs there is a clamp method that will clamp a given value to a given range that is all given by way of function arguments. On top of that there is also the subject of [random numbers in javaScript](/2020/04/21/js-math-random/) also, and with that said there is also a number of methods in this math utils object that have to dow with that also. So in this example I am also using the rand float method of the math utils to get random numbers in a range, and then using the clamp method to make sure that when using these values to set the position of mesh objects they say in a given area.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
// USING THE RANDFLOAT and CLAMP METHODs
let i = 0;
const len = 30;
while(i < len){
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    let x = THREE.MathUtils.randFloat(-7, 7);
    x = THREE.MathUtils.clamp(x, -4.5, 4.5);
    let z = THREE.MathUtils.randFloat(-100, 100);
    z = THREE.MathUtils.clamp(z, -4.5, 4.5);
    mesh.position.set(x, 0, z)
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

## 3 - Euclidean Modulo

As I have mentioned in the clamp example there is not just clamping, but also wrapping number values. In this example I am again doing more or less the same thing as in the clamp example, but now I am using the Euclidean Modulo method to wrap numbers rather than clamping them. 

A long time ago I wrote a post on the subject of [what is wrong with the modulo operator](/2017/09/02/js-whats-wrong-with-modulo/) in core javaScript syntax. The main thing about modulo in javaScript is that it is not that there is something wrong with the modulo operator, it is just that it goes by a process that is a little difference from hat some might have grown accustom to in other programming languages. So then there is becoming aware of what Euclidean Modulo is compared to what is used in javaScript and how this is what most might expect modulo to work with negative numbers.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
// USING THE RANDFLOAT and euclideanModulo METHODs
let i = 0;
const len = 30;
while(i < len){
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    let x = THREE.MathUtils.randFloat(-7, 7);
    x = -4.5 + THREE.MathUtils.euclideanModulo(x, 9);
    let z = THREE.MathUtils.randFloat(-100, 100);
    z = -4.5 + THREE.MathUtils.euclideanModulo(z, 9);
    mesh.position.set(x, 0, z)
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

## 4 - The seeded random method

There is using the plain old Math random method and also many other methods that are based off of it. However all of these options are not deterministic in nature, that is that when called they will not give the same numbers each time. In other words some times I might want to have some kind of solution where I have random numbers in a range, but each time I reload the page I get the same set of random numbers. So then they are not really random, but predictable, yet they look kind of random if that makes any sense.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
// USING THE SEEDED RANDOM
let i = 0,
len = 5;
while(i < len){
    let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    let x = -5 + THREE.MathUtils.seededRandom() * 10;
    let z = -5 + THREE.MathUtils.seededRandom() * 10;
    mesh.position.set(x, 0, z);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

## 5 - The smoothstep function

The smooth step function will return a value between 0 and 1 that is a percent kind of value based on a video value to evaluate as the first argument compared to min and max values given as additional arguments. However the value returned will be smoothed or slowed down depending on how close the value is to the min or max value. A good way to go about getting an idea of how this method works might involve having a group of objects that all move by a fixed pixels per second value, then have another group that moves by a variable pixels per second value.

In this example I then have a helper function that will create a group of mesh objects with differing max pixels per second values in the user data objects of each mesh. I then have a simple update method that will move a group of mesh objects by the max value on each frame tick, and another update method that uses the Vector3.distanceTo method and MathUtils.smoothstep to get a variable pixels per second rate. 

When this example is up and running group2 will just move at the fixed rate that is the max pixels per second value for the mesh object, while group1 will slow down and speed up based on distance and smooth stepping.


```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight();
dl.position.set(1, 2.5, 5);
scene.add(dl);
//-------- ----------
// HELPERS
//-------- ----------
// Wrap method based off of the method from Phaser3 
// ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
// * Added some code for case: Wrap(0, 0, 0)
// * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
//
let wrap = function (value, a, b){
    // get min and max this way
    let max = Math.max(a, b);
    let min = Math.min(a, b);
    // return 0 for Wrap(value, 0, 0);
    if(max === 0 && min === 0){
         return 0;
    }
    let range = max - min;
    return (min + ((((value - min) % range) + range) % range));
};
// UPDATE A GROUP USING THREE.mathUtils.smoothstep
const updateGroupSmooth = (group, secs) => {
    group.children.forEach( (mesh) => {
        const mud = mesh.userData;
        // variable pixles per second using THREE.MathUtils.smoothstep and Vector3.distanceTo
        const d = mesh.position.distanceTo( new THREE.Vector3(0, 0, mesh.position.z) );
        const pps = THREE.MathUtils.smoothstep(d, -2.5, 2.5) * mud.maxPPS;
        // stepping posiiton
        mesh.position.x -= pps * secs;
        // wrap
        mesh.position.x = wrap(mesh.position.x, -5, 5);
    });
};
// simple update group with fixed pixles per second for sake of something to compare to
const updateGroup = (group, secs) => {
    group.children.forEach( (mesh) => {
        const mud = mesh.userData;
        // stepping posiiton
        mesh.position.x -= mud.maxPPS * secs;
        // wrap
        mesh.position.x = wrap(mesh.position.x, -5, 5);
    });
};
// create a group
const createGroup = (size, color) => {
    size = size === undefined ? 1 : size;
    color = color || new THREE.Color(1, 1, 1);
    let i = 0;
    const len = 5, group = new THREE.Group();
    while(i < len){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.5
            }));
        mesh.userData.maxPPS = 1.25 + 1.5 * (i / len);
        const x = 5;
        const z = -4 + 10 * (i / len);
        mesh.position.set(x, 0, z);
        group.add(mesh);
        i += 1;
    }
    return group;
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group1 = createGroup( 1, new THREE.Color(0,1,0) );
scene.add(group1);
const group2 = createGroup( 0.75 );
scene.add(group2);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);
let frame = 0,
maxFrame = 90,
fps = 30,
lt = new Date();
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        updateGroupSmooth(group1, secs);
        updateGroup(group2, secs);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 6 - The lerp method

The lerp method can be used to change one value to another value over time. There is also a [lerp method of the vector3 class](/2022/05/17/threejs-vector3-lerp/) that is also worth checking out that does the same thing as this lerp method only with a vector3 object. So for this example I am makinguse of the vector3 lerp method, but also the math utils lerp method when it comes to dealing with alpha values that are just single number values rather than an vector3 object.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, -5);
const v_end = new THREE.Vector3(5, 0, 0);
const v_control1 = v_start.clone().lerp(v_end, 0.25).add( new THREE.Vector3(0,0,20) );
const v_control2 = v_start.clone().lerp(v_end, 0.75).add( new THREE.Vector3(0,10,-10) );
const curve = new THREE.CubicBezierCurve3(v_start, v_control1, v_control2, v_end);
//-------- ----------
// HELPERS
//-------- ----------
const updateMesh = (mesh, curve, alphaDelta) => {
    const mud = mesh.userData;
    mud.a = mud.a === undefined ? 0 : mud.a;
    mud.a_last = mud.a_last === undefined ? 0.5 : mud.a_last;
    mud.speed = mud.speed === undefined ? 0.2 + 0.8 * Math.random() : mud.speed;
    if(mud.a_target === undefined || mud.a === 1){
       mud.a_last = mud.a_target;
       mud.a_target = Math.random();
       mud.a = 0;
    }
    mud.v_current = curve.getPoint( THREE.MathUtils.lerp(mud.a_last, mud.a_target, mud.a) );
    mud.a += (alphaDelta * mud.speed);
    mud.a = THREE.MathUtils.clamp(mud.a, 0, 1);
    const a_scale = 0.25 + 0.75 * ( 1 - Math.abs(0.5 - mud.a) / 0.5 );
    mesh.scale.set( a_scale, a_scale, a_scale);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group = new THREE.Group();
scene.add(group);
let i = 0;
const geometry = new THREE.SphereGeometry(1.00, 20, 20);
const material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 });
while(i < 50){
    const mesh = new THREE.Mesh( geometry, material );
    updateMesh(mesh, curve, 0);
    group.add(mesh);
    i += 1;
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;

    group.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            const mesh = obj;
            const mud = mesh.userData;
            mesh.position.copy( mud.v_current );
            updateMesh(mesh, curve, 0.025);
        }
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

## Conclusion

The math utils object is then a whole bunch of useful methods that I find myself using often, however it does not have everything that I might expect to have in such a collection of methods. Although I guess I should not expect everything to be there actually because there is still what there is to work with in the core javaScript math object of course. Also there is a whole world of javaScript code out there on the open Internet to study, and with that said one great library that I keep checking out again and again is [angles.js](https://www.npmjs.com/package/angles), as such I made [my own javaScript module based off of the source code from that one](/2021/04/16/js-javascript-example-angles-module/) as it is a good one when it comes to various things with angles.

Speaking of the math object in core javaScript that is something that you show know a thing or two about at this time when it comes to using methods like Math.cos, and [Math.atan2](/2019/03/19/js-math-atan2/) for example. There is no need to add any of these such methods of course to the math utils object of threejs when it comes to all of these such methods as they are there to work with when it comes to native javaScript alone.

Also some of the things that come to mind are methods that I can not say that I use all that often such as an [nth root method](/2020/03/11/js-nth-root/) for example. That is an example of the kind of method that should not be in threejs because it is for the most part unneeded bulk. On the rare occasion that I do need an nth root method for whatever reason that is something that I can add by way of another library, or even a single stand alone method.
