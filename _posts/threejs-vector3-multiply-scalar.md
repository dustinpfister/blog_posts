---
title: The multiply scalar Vector3 prototype method in threejs
date: 2022-03-23 11:54:00
tags: [three.js]
layout: post
categories: three.js
id: 971
updated: 2023-03-14 10:53:54
version: 1.25
---

One major part of doing anything interesting with threejs is learning how to go about positioning things when it comes to working with the Vector3 class in the library. There are the very basics with this class when it comes to starting out with the set, and copy methods for example. However there are also a number of other useful methods in this class including methods like the [multiply scalar method](https://threejs.org/docs/#api/en/math/Vector3.multiplyScalar) which will be the main focal point of this post today.

The multiply scalar method is a way to adjust the unit length of the vector without changing anything with the direction of the vector. In other words it is a way to change the position of the vector, but only along a ray that comes out from an origin that is found by way of the current values of the Vector. I often use this multiply scalar method in combination with other Vector3 methods such as the normalize method that will set the unit length of the vector to that of one, which would be a good starting point before using a method like the multiply scalar.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/lNvsC4Zjbi8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The multiply scalar methods of the Vector3 class and what to know first

This is not a getting [started type post with threejs](/2018/04/04/threejs-getting-started/), and I also assume that you have at least a little experience with [client side javaScript in general](/2018/11/27/js-getting-started/) also. There are a few other topics beyond the basics of threejs that you should also be aware of at this point as well. I am not going to be going over all of this from one blog post to the next of course, however I do still like to use these opening sections to write about a few things that you might want to brush up on regardless of skill level or experience that is relevant to the use of the multiply scalar method of the vector3 class in threejs.

### Be Aware of the normalize method as well

I have wrote a post on the [normalize method](/2021/06/14/threejs-vector3-normalize/) of the Vector3 class a while back also which is something that is worth looking into more if you have not done so. What this method does is it sets the unit length of a vector to that of one while preserving the direction of the vector. From there a method like that of multiply scalar can be used to easily set any desired vector unit length. In other words think in terms of a ray starting at an origin and then moving outward into space from there. Every point that lays on this ray going outward has the same direction, but the length is what will be different.

### Read up more on the vector3 class in general

There are many other useful methods in the [Vector3 class](/2018/04/15/threejs-vector3/) that can be used together in a chain such as the add method that can be used to translate from a given vector with another vector. I will be touching base on a lot of these methods in this post but it would be best to look into Vector3 as a whole in greater detail.

### The source code examples in this post are also on Github

I have the source code examples in this post up on [my test threejs Github Repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-multiply-scalar). This is also where I am packing the source code examples for my [many oter posts on threejs](/categories/three-js) as well.

### Be mindful of version numbers

The version of threejs that I was using when I first wrote this post was r135, and the last time I came around to do some editing I was using r140. Code breaking changes are made to threejs often so check your version numbers first and for most if any of these code examples are breaking on versions of threejs later than r140.


## 1 - Basic Vector3 multiply scalar example

For a basic example of this multiply scalar method there is starting out with just using the typical set method to set an initial length for the vector that is greater than 0. Once I have a non zero length for the vector I can then use the multiply scalar method to multiply that length by any desired value that I give as the first argument when calling the multiply scalar method.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
const cube2 = cube1.clone();
scene.add(cube1);
scene.add(cube2); 
// SETTING POSITION WITH Vector3.set
cube1.position.set(1, 0, 0);
cube1.position.multiplyScalar(1.5);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.1 - Copy and normalize, then use scalar

The copy method of the Vector 3 class allows for me to copy the values of one instance of Vector3 over to another instance. The normalize method of the Vector3 class is also a very useful one that will set the length of a vector to 1 while preserving the direction of the vector. So then I can create a new Instance of Vector3, then copy that to another such as the position object of a mesh, and the normalize the position to a length of one with the same direction of the vector that I copied from. Sense the length is now one, I can then use the multiply scalar method to set a desired length from there easily.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
const cube2 = cube1.clone();
const cube3 = cube1.clone();
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
//-------- ----------
// SETTING POSITION WITH Vector3.copy, normalize, and Vector3.multiplyScalar
//-------- ----------
const radian = THREE.MathUtils.degToRad(90 + 45);
const radius = 4;
const vec = new THREE.Vector3(
    Math.cos(radian) * radius,
    0,
    Math.sin(radian) * radius
);
cube1.position.copy(vec);
const scalar = 1 + Math.round( 2 * Math.random() )
cube2.position.copy(vec).normalize().multiplyScalar(scalar);
// adjust rotation of cubes
cube1.lookAt(0, 0, 0);
cube2.lookAt(0, 0, 0);
cube3.lookAt(cube1.position);
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.2 - Translate, normalize and scalar

One additional method that I might also pull into the mix is the add method that can be used to translate from a set point. This add method can be used to add another Vector to the vector value after the use of a method like that of copy or set if I want to make adjustments to direction before normalizing and scaling. Or it can be used after doing so as a way to adjust things after normalizing and scaling.

For this example I am not also creating and positioning mesh objects in the body of a function that I am passing to the [array for each method](/2019/02/16/js-javascript-foreach/). The array that I am calling for each off of then contains data for each method object that I want in the form of nested arrays with number values that can be used to set position and a scalar value to use after normalizing that position..

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATING ANSD POSITIONING MESH OBJECTS WITH Vector3 METHODS
// including copy, add, normalize, and multiplyScalar
//-------- ----------
const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
const radian = THREE.MathUtils.degToRad(90 + 25), radius = 4;
const vec = new THREE.Vector3(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
[[0,0,0,0], [-2,1,0,1.5], [-4,2,0,3], [-8,3,0,4.5]].forEach(function(data){
    const mesh = cube1.clone(),
    x = data[0], y = data[1], z = data[2], scalar = data[3];
    mesh.position.copy(vec).add(new THREE.Vector3(x, y, z) ).normalize().multiplyScalar(scalar);
    mesh.lookAt(cube1.position);
    scene.add(mesh);
});
scene.children[1].lookAt(scene.children[2].position)
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - Apply Euler and setting direction along with length

Another Vector3 class method that has proven to be useful is the apply Euler method. Where a vector3 class is used to define a direction and a unit length from the direction, or just simply a position in space, the Euler class is all about angles. So then say that I want to have a way to set the position of a mesh in space by giving a vector unit length, and then a few more arguments that are used to define what the direction is. Such a method can be made by making use of the apply Euler method along with the multiply scalar method.

In this example I have a helper function called set by length where I give a mesh object, and then a vector unit length that I want. After that I can give two angles and if I want a custom start direction to adjust from.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// set position of mesh based on vector unit length along with a and b values
// relative to a standard start position
const setByLength = function(mesh, len, a, b, startDir){
    startDir = startDir || new THREE.Vector3(1, 0, 0);
    const pi2 = Math.PI * 2,
    eul = new THREE.Euler(
        0, 
        a % 1 * pi2,
        b % 1 * pi2);
    // using copy to start at startDir, then applying the Euler. After that normalize and multiplyScalar
    return mesh.position.copy( startDir ).applyEuler( eul ).normalize().multiplyScalar(len);
};
// get a bias value
const getBias = function(n, d, count){
    let per = n / d * count % 1;
    return 1 - Math.abs(0.5 - per) / 0.5;
};
//-------- ----------
// OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 300,
fps = 20,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // USING SET BY LENGTH HELPER
        let len = 1 + 4 * getBias(frame, maxFrame, 6);
        let a = frame / maxFrame;
        let b = -0.125 + 0.25 * getBias(frame, maxFrame, 10);
        setByLength(mesh1, len, a, b);
        // look at, render, step, ...
        mesh1.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
```

### 4.1 - Art Animaiton loop example for video one

I think I have the basic idea of the multiply scalar method covered now and then some when it comes to some additional methods that will often come into play along with it. In this example I want to make a kind of art project type thing where the goal is to just make a collection of mesh objects that look interesting when they move around in the scene. As with by apply Euler example in this post I am once gain using that helper function that I worked out in that example, but now with some additional helper functions that can be used to create and update a standard kind of group object.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-10, 3, -5);
scene.add(dl);
let al = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(al);
//-------- ----------
// HELPERS
//-------- ----------
// set position of mesh based on vector unit length along with a and b values
// relative to a standard start position
const setByLength = function(mesh, len, a, b, startDir){
    startDir = startDir || new THREE.Vector3(1, 0, 0);
    const pi2 = Math.PI * 2,
    eul = new THREE.Euler(
        0, 
        a % 1 * pi2,
        b % 1 * pi2);
    // using copy to start at startDir, then applying the Euler. After that normalize and multiplyScalar
    return mesh.position.copy( startDir ).applyEuler( eul ).normalize().multiplyScalar(len);
};
// get a bias value
const getBias = function(alpha, count){
    let per = alpha * count % 1;
    return 1 - Math.abs(0.5 - per) / 0.5;
};
// update a group
//const updateGroup = function(group, gAlpha, alphaAdjust, lenBiasCount, bBiasCount){
const updateGroup = function(group, gAlpha, opt){
    gAlpha = gAlpha === undefined ? 0 : gAlpha; 
    opt = opt || {};
    opt.alphaAdjust = opt.alphaAdjust === undefined ? 1 : opt.alphaAdjust;
    opt.lenBiasCount = opt.lenBiasCount === undefined ? 5 : opt.lenBiasCount;
    opt.bBiasCount = opt.bBiasCount === undefined ? 5 : opt.bBiasCount;
    opt.lenRange = opt.lenRange || [3, 8];
    opt.bRange = opt.bRange || [-0.125, 0.125];
    let i = 0, count = group.children.length;
    while(i < count){
        let mesh = group.children[i];
        let iAlpha = i / count;
        let alpha = ( iAlpha + gAlpha ) / opt.alphaAdjust;
        let len = opt.lenRange[0] + (opt.lenRange[1] - opt.lenRange[0]) * getBias(alpha, opt.lenBiasCount);
        let a = alpha;
        let b = opt.bRange[0] + (opt.bRange[1] - opt.bRange[0]) * getBias(alpha, opt.bBiasCount);
        setByLength(mesh, len, a, b);
        // next child
        nextChild = group.children[i + 1];
        if(i === count - 1){
           nextChild = group.children[i - 1];
        }
        mesh.lookAt(nextChild.position);
        i += 1;
    }
    return group;
};
// create a group
const createGroup = function(count, s){
    count = count === undefined ? 10 : count;
    s = s === undefined ? 1 : s;
    let i = 0;
    let group = new THREE.Group();
    while(i < count){
        let mesh = new THREE.Mesh(
            new THREE.BoxGeometry(s, s, s),
            new THREE.MeshPhongMaterial({
            }));
        group.add(mesh);
        i += 1;
    }
    updateGroup(group, 0);
    return group;
};
//-------- ----------
// OBJECTS
//-------- ----------
let group1 = createGroup(120, 0.6);
scene.add(group1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 900,
fps = 20,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000,
    fAlpha = frame / maxFrame;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        updateGroup(group1, fAlpha, {
            lenRange: [1, 6],
            bRange: [-0.125, 0.2 * getBias(fAlpha, 8)]
        });
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
```

## Conclusion

So then the multiply scalar method is one of many tools in the toolbox that is the Vector3 class. This Vecotr3 class comes up when it comes to just about anything that has to do with a single point in space, so it is used for the value of the position attribute of the [Object3d class](/2018/04/23/threejs-object3d/) as well as with many other features in the over all library. With that said the multiply scalar method is a great tool for increasing the unit length of a vector without messing around with the direction of it.
