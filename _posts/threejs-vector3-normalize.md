---
title: Normalizing Vectors in threejs
date: 2021-06-14 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 888
updated: 2023-07-10 10:32:48
version: 1.41
---

The Vector3 class in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) has many prototype methods one of which is the [Vector3 normalize](https://threejs.org/docs/#api/en/math/Vector3.normalize) method. Calling the normalize method of a Vector3 instance will preserve the direction of the vector, but it will reduce the distance of the vector from the origin to a vector unit length of one. 

A Vector with a [euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) of one is often referred to as a [unit vector](https://en.wikipedia.org/wiki/Unit_vector), and what is nice about this kind of vector is that it can quickly be scaled up by just simply multiplying the values of the normalized vector by a desired magnitude that is any value other than one to result in any vector that is along a given line that is the direction of the vector.

Vectors are often described as being a unit of direction, and magnitude, the direction can be thought of as what the normalized vector is in terms of numbers between 0 and 1 for x, y, and z. This direction can then be raised outward, or lowered, by a magnitude to get any point along a ray. So then in this post I think I will be going over some basic examples of the normalize method, and while I am at it also end up writing about a few other topics that are closely related to the normalize method.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/J-a47GrWEDA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Normalizing Vectors and what to know before hand

This is a post on using the Vector3 normalize method, and other related features in the javaScript library know as threejs. There are a great number of things that you should be aware of before continuing to read this. For one thing this is not any kind of [getting started type post on threejs](/2018/04/04/threejs-getting-started/) let alone [javaScript in general](/2018/11/27/js-getting-started/). However in this section I will be going over a few key details that you might want to read up on more in detail in order to gain a better understanding of what the Vector3 normalize method is all about.

### You might want to read up more on Vector3 in general

There is checking out my main post on the [Vector3 class](/2018/04/15/threejs-vector3/) where I am going over the Vector3 class in general. Normalizing a Vector is a major part of becoming proficient with the Vector3 class, but there is a great deal more to it when it comes to the basics of Vector3, as well as other various methods of the class. 

The thing to keep in mind here is that the normalize method will just set the length of a vector to one, while preserving the direction of the Vector, but that is it. What if I want to set direction of a Vector by a set of given angles in terms of radians or degrees for example? I will be going over some additional methods other than just the normalize method here, but you might still want to read more on theclass in general, and maybe some posts on other vector3 class features.

### Source code is also up on GitHub

On my GitHub account I have a repository in which I am parking all the source code examples for my [various posts on threejs](/categories/three-js/) including this one. With that said all the examples here can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-normalize) on Github.

### Version Numbers matter

When I first wrote this post I was using r127 of threejs which was a late version of threejs as or min 2021, and the last time I came around to do some editing all the demos are updated to my [r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). 

I have made a habit of mentioning what version of threejs I am using when writing new threejs posts, and also add a section like this to older posts when I get around to doing a little editing. Maybe this is something that I should do with just about any javaScript library actually, but threejs seems to be moving along real fast compared to other javaScript projects where development is very slow.


## 1 - Some Basic examples of Vector3 normalize

Like with all my other posts on threejs I like to start out with some very basic getting started type examples of the threejs feature. In this case the normalize method of the Vector3 class. So these examples will just involve static scenes, and I will be doing my best to not go to overboard with the over all volume of code. The focus here thine will mainly be just on the vector3 method itself, and to a lesser extent other closely related features.

### 1.1 - Getting started with the normalize method

For this first example I just want to normalize a vector and that is it. However in order to have something to look at I will need to still set up the usual collection of objects when it comes to the scene object, camera, and renderer. After that I create an instance of Vector3 and when doing so I can set any values that I want when it comes to the position. Tokeep things simple I am going to start with a position like 0,0,18 and after calling the normalize method of this new vector I end up with a position of 0,0,1. 

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
// VECTOR3
//-------- ----------
const v_dir = new THREE.Vector3(0, 0, 18).normalize();
console.log(v_dir.x, v_dir.y, v_dir.z); // 0, 0, 1
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(2, 2) );
const mesh1 = new THREE.Mesh( new THREE.SphereGeometry(0.1, 10, 10) );
mesh1.position.copy(v_dir);
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Using multiply scalar

There is also how to raise the unit length of an instance of THREE.Vector3. With that said I once again start out with a vector3 that is not normalized, and then just call the normalized method of the Vector3 instance to get a normalized vector. Once the vector is normalized I can call a [method like multiply scalar](/2022/03/23/threejs-vector3-multiply-scalar/) off of the normalized vector to set any desired magnitude, or distance if you prefer while preserving the direction of the Vector. This is the main thing about the normalize method, it will convert a vector to a unit length of one, and then from there it is very easy to increase the unit length.

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
// VECTOR3
//-------- ----------
const v_dir = new THREE.Vector3(0, 0, 18).normalize();
console.log(v_dir.x, v_dir.y, v_dir.z); // 0, 0, 1
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
// using vector3 normalize with vector3 multiply scalar to create
// a buch of mesh objects with the direciton of v_dir, but with differing unit lengths
[0, 0.25, 0.5, 0.75, 1, 2, 3].forEach( (length) => {
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.075, 10, 10) );
    mesh.position.copy(v_dir).multiplyScalar(length);
    scene.add(mesh);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 4, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Using the apply Euler method to change direction

So the multiply scalar method can be used to set the unit length after it has been normalized. However there is also the question of how to change the direction as well. Another great vector3 class method for this would be the apply Euler method.

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
// VECTOR3
//-------- ----------
const v_dir = new THREE.Vector3(0, 0, 18).normalize();
console.log(v_dir.x, v_dir.y, v_dir.z); // 0, 0, 1
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(6, 6) );
// using multiply scalar to set unit length, and apply euler to change direction
// on one axis
[
    [1.00, 0], [1.25, 45], [1.50, 90], [1.75, 135],
    [2.00, 180],   [2.25, 225], [2.75, 270], [3.00, 315]
].forEach( (data) => {
    const length = data[0], degree = data[1]
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.075, 10, 10) );
    const e = new THREE.Euler();
    e.y = THREE.MathUtils.degToRad(degree)
    mesh.position.copy(v_dir).applyEuler(e).multiplyScalar(length);
    scene.add(mesh);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 4, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.4 - Some more on the concept of vector length

The normalize method will set the length of any vector to a length of 1, and then from there the length can easily be adjusted to any desired length. Also when it comes to the subject of the length of a vector the Vector3.length method can be used to find out what the current length of any vector is. The normalize method combined with a method like multiply scalar can be used to set the length of a vector while the length method can be used as a way to get what that length is.

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
scene.add( new THREE.GridHelper(6, 6) );
const mesh1 = new THREE.Mesh( new THREE.SphereGeometry(0.1, 10, 10) );
mesh1.position.set(3, 0.5, 0);
scene.add(mesh1);
// using the length method to get the unit length of mesh1
// using normalize to get a vector with a length of one from that position
// and using the vector3 lerp method to get vector3 objects between the two
const mesh_unit_length = mesh1.position.length();
const v2 = mesh1.position.clone().normalize();
let i = 0, count = 5;
while(i < count){
    const alpha = ( i + 1 ) / count;
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.1, 10, 10) );
    mesh.position.copy(mesh1.position).lerp(v2, alpha);
    scene.add(mesh);
    i += 1;
};
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.5 - The clone method of Vector3 while using normalize

The clone method is another vector3 prototype method that I think I should write about in this section as well, sense that is another method that I find myself using often when doing something with the normalize method. Simply put if I am ever in a situation in which I would just like to have a copy of a vector3 object that there is all ready there to work with I can call the clone method to get a new vector3 object with the same values from this preexisting vector3 object.

For example say that I have this source mesh object and I would like to create a whole bunch of new mesh objects around the local position of this source mesh. I can just call the clone method off of the position property of this source mesh object, then I can normalize it, and use additional methods like apply Euler and so forth. This will all be relative to the parent object of the mesh though, in this case the scene object, however I can then use the add method to add the position of the source mesh again to get things where I need them to be again.

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
scene.add( new THREE.GridHelper(6, 6) );
const mesh_source = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 20, 20),
    new THREE.MeshNormalMaterial({
        transparent: true, opacity: 0.4
    })
);
mesh_source.position.set(-1,0.25,2);
scene.add( mesh_source );
let i = 0;
const len = 10;
while(i < len){
    const a_len = i / len;
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.MeshNormalMaterial()
    );
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * a_len;
    e.z = Math.PI / 180 * 180 * a_len;
    const v = mesh_source.position.clone().normalize().applyEuler(e).add( mesh_source.position );
    mesh.position.copy( v );
    mesh.lookAt( mesh_source.position );
    scene.add( mesh );
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.25, 0.5, 0);
camera.lookAt( mesh_source.position.clone().add( new THREE.Vector3(0,-0.25,0) ) );
renderer.render(scene, camera);
```

## 2 - Placing an object on the surface of a sphere example

So then one use case example for all of this would be to work out one or more methods that have to do with positioning an object on the surface of a sphere. That is that I can create a method in which I can pass values that will be used to create any point in space, and then normalized that point to a vector with the same direction but with a length of one. I can then set the length of the normalized vector to the radius of the sphere, plus one half the height of the object that I want on the surface of a sphere. That basic method seems to work pretty well, and it is then just a question of making other methods that serve as an abstraction for that kind of method, such as a method where I can just give a lat and long value in terms of values between 0 and 1 for each argument a a way to position something on to a sphere. This will then also serve as a way to take some kind of system that involves positioning things on a grid and make it so that it can also be used to position the same things on a corresponding sphere surface.

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
// HELPER FUNCTIONS
//-------- ----------
// simple create cube helper
const createCube = function(){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
// set on sphere helper
const setOnSphereFromPos = function(mesh, x, y, z, alt){
     const dir = new THREE.Vector3(x, y, z).normalize();
     const pos = new THREE.Vector3();
     pos.x = dir.x * alt;
     pos.y = dir.y * alt;
     pos.z = dir.z * alt;
     mesh.position.copy(pos);
};
// set on sphere helper
const setOnSphere = function(mesh, lat, long, alt){
    const latBias = Math.abs(lat - 0.5) / 0.5;
    const radian = Math.PI * 2 * long,
    x = Math.cos(radian) * (alt - alt * latBias),
    z = Math.sin(radian) * (alt - alt * latBias),
    y = alt * latBias * (lat > 0.5 ? -1 : 1);
    setOnSphereFromPos(cube, x, y, z, alt);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(9, 9));
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 30, 30),
    new THREE.MeshNormalMaterial({wireframe:true}));
scene.add(sphere);
const cube = createCube();
scene.add(cube);
setOnSphere(cube, 0.1, 0.3, 2);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
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
    const a2 = 0.1 + 0.8 * Math.sin( Math.PI * 1 * (a1 * 2 % 1))
    setOnSphere(cube, a2, a1, 2);
    cube.lookAt(0, 0, 0);
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

This is the sort of thing that I find myself coming back to now and then when it comes to working out new systems for placing objects onto the surface of a sphere. I have a [simple project example that I made a little while back](/2021/05/14/threejs-examples-position-things-to-sphere-surface/) in which I was able to work out a solution for doing this sort of thing but it was very different from this kind of example that I like better.

## 3 - Apply Euler example to change direction

There is normalizing a vector to a length of one, and keeping the direction, but what if I want to change the direction while I am at it as well on top of that? In other words what if I want some kind of helper function that will return a normalized vector, but I can also set the direction of that normalized vector with some angle arguments. In addition I can also set a length as a way to not return a normalized vector but a vector with an interested length, and also adjust what the starting vector is.

One way to make this kind of method would be to make use of the [apply Euler method](/2021/06/18/threejs-vector3-apply-euler/) that can be used to change the direction of a vector by way of using some angles to do so. The apply Euler vector3 prototype method accepts radian values, but if I want to use degrees there is a deg to rad convince method in the [math utils object](/2022/04/11/threejs-math-utils/). I will then just want a starting vector by which to use the apply Euler method with, and this vector should have a length greater than zero.

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
// HELPERS
//-------- ----------
// simple create cube helper
const createCube = function(){
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    return cube;
};
// vector from angles helper
const vectorFromAngles = function(a, b, c, len, start){
    len = len = undefined ? 1 : len;
    const e = new THREE.Euler(
        THREE.MathUtils.degToRad(a),
        THREE.MathUtils.degToRad(b), 
        THREE.MathUtils.degToRad(c));
    const v = start || new THREE.Vector3(0, 0, 1);
    v.applyEuler(e).normalize();
    return v.multiplyScalar(len);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10));
const cube = createCube();
scene.add(cube);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set(7, 7, 7);
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
    const a2 = 0.1 + 0.8 * Math.sin( Math.PI * 1 * (a1 * 2 % 1) );
    const a = 45 - 90 * a2;
    const b = 360 * a1;
    const c = 0;
    const length = 5 - 4 * a2;
    // using vector from angles helper to copy new position
    // to the cube mesh object that uses apply Euler and normalize
    cube.position.copy( vectorFromAngles(a, b, c, length) );
    cube.lookAt(0, 0, 0);
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

## 4 - Animation example 

Now for an example that might help to really visualize what the deal is with normalization and unit length of vector3 instances. This example involves creating a group of groups where each end child node is a mesh object that uses the capsule geometry. I am then using buffer geometry and object3d class methods and properties to make it so that each capsule geometry of each mesh is alight in such a way that each end is between 0 and a fixed end vector unit length.

<iframe class="youtube_video" src="https://www.youtube.com/embed/-bJmhnyPlus" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


The general idea here is to pick a few directions and use the capsule geometry as a way to mark those directions. I can then make one or more mesh objects and have them move along one or more of the directions.

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
// HELPERS
//-------- ----------
// create capsule group
const createCapsuleGroup = function(opt){
    opt = opt || {};
    opt.data = opt.data || [];
    const group = new THREE.Group();
    opt.data.forEach(function(opt, i, arr){
        // create a normalize vector based on the given options for x, y, and z
        // then apply the unit length option using multiplyScalar
        const v = new THREE.Vector3(opt.x, opt.y, opt.z).normalize().multiplyScalar(opt.ul);
        // UNIT LENGTH ( or distance to 0,0,0 ) can be used to 
        // set length attribute of capsule geometry based mesh object
        const geo = new THREE.CapsuleGeometry( 0.1, v.length(), 30, 30 );
        // translate geometry on y by half the vector length
        // also rotate on x by half of unit length
        geo.translate(0, v.length() / 2, 0);
        geo.rotateX(Math.PI * 0.5);
        // creating mesh object
        const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.6}));
        // copy vector to position of mesh object
        // and have the mesh look at the origin
        mesh.position.copy(v);
        mesh.lookAt(0, 0, 0);
        group.add(mesh);
    });
    return group;
};
// set to group helper
const setToGroup = function(groups, mesh, groupIndex, capsuleIndex, alpha){
    const v = new THREE.Vector3();
    const g = groups.children[groupIndex];
    g.children[capsuleIndex].getWorldPosition(v);
    const origin = g.position.clone();
    mesh.position.copy( origin.clone().lerp(v, alpha) );
    mesh.lookAt(g.position);
};
//-------- ----------
// ADD MESH OBJECTS
//-------- ----------
// create groups
const groups = new THREE.Group();
scene.add(groups);
// group index 0
const g1 = createCapsuleGroup({
    data: [
        {x: 0, y: 1, z: 0, ul: 3},
        {x: 1, y: 0, z: 0, ul: 5},
        {x: 0, y: 0, z: 1, ul: 5},
        {x: 1, y: 1, z: 1, ul: 2},
        {x: -1, y: 0, z: -1, ul: 5},
        {x: -1, y: -1, z: 1, ul: 4}
    ]
});
groups.add(g1);
// group index 1
const g2 = createCapsuleGroup({
    data: [
        {x: 0, y: 1, z: 0, ul: 4},
        {x: 1, y: 0, z: -1, ul: 3},
        {x: -5, y: 0, z: 0, ul: 3}
    ]
});
g2.position.set(-4, 0, -5);
groups.add(g2);
// MESH OBJECT
const s = 1.0;
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), new THREE.MeshNormalMaterial());
scene.add(mesh1);
const mesh2 = new THREE.Mesh(new THREE.SphereGeometry(s, 30, 30), new THREE.MeshNormalMaterial());
scene.add(mesh2);
const mesh3 = new THREE.Mesh(new THREE.ConeGeometry(s / 2, s * 2, 30, 30), new THREE.MeshNormalMaterial());
mesh3.geometry.rotateX(Math.PI * 1.5);
scene.add(mesh3);
//-------- ----------
// ANIMATION LOOP
//-------- ----------
camera.position.set(-2.5, 5, 10);
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
    const a2 = Math.abs(0.5 - a1) / 0.5;
    setToGroup(groups, mesh1, 0, 0, a2);
    setToGroup(groups, mesh2, 1, 1, 1 - 0.95 * a2);
    setToGroup(groups, mesh3, 0, 5, 0.5 + 0.5 * a2);
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

That will be it for now when it comes to the normalize method in the Vector3 class, but I am sure that I will come around to expand on this post at some point in the future when I have more to write about on this subject. There are many other methods in the Vector3 class that can be used with a normalized vector that I might get around to writing about sooner or later, but I need to get to working out some demos, and doing some more research first.

Never the less I think I did an okay job covering the basics of what a normalized vector is, now it is just a question of applying this to make some useful or interesting projects. Or improve some ones that I have made all ready, and I can think of a few that I would like to fix up now that I have a better understanding of this sort of thing.
