---
title: Torus Geometry in threejs for making donut shapes
date: 2021-05-27 11:33:00
tags: [three.js]
layout: post
categories: three.js
id: 876
updated: 2022-09-19 09:27:36
version: 1.22
---

Today I thought I world write another post on a built in geometry constructor in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), this time the [Torus Geometry Constructor](https://threejs.org/docs/#api/en/geometries/TorusGeometry) which results in a donut like shape. There are many interesting things about the [geometry of a torus in general](https://en.wikipedia.org/wiki/Torus) that are worth looking into in detail. It is a shape that is composed of a collection of circles where each circle is positioned and rotated around a point that results in the formation of a tube that in turn is a kind of 3d circle. So then there are two general arguments of concern that come up with this when it comes to the number of sides of each circle, and the number of circles, as one might expect these values can be tweaked when calling the geometry constructor.

<!-- more -->

## A donut or torus geometry in threejs and what to know first

This is a post on the Torus Geometry constructor in the javaScript library known as three.js. In addition to the constructor function itself I will also be making use of a whole bunch of other features of the threejs library in these code examples. So I trust that you have at least some background when it comes to the very basic of how to get up and running with a three.js project, if not you might want to start out with some kind of [getting started guide on threejs](/2018/04/04/threejs-getting-started/).

### Do not just stop with the Torus Constructor of course

The torus geometry constructor is of course just one option when it comes to the many built in geometry constrictors there are to work with in three.js. The [Sphere](/2021/05/26/threejs-sphere/), [plane](/2019/06/05/threejs-plane/), and [Box geometry](/2021/04/26/threejs-box-geometry/) constructors are all also worth checking out in detail if you have not done so before hand. There is a lot to learn about these constructors and not just with respect to how to just call the function and pass a few arguments when calling them. In the long run sooner or later in make sense to look into the [buffer geometry constructor](/2021/04/22/threejs-buffer-geometry/) and how to create a custom geometry.

### Source code exmaples are up on Github

The source code examples that I am writing about in this post are [also on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-torus).

### Version Numbers matter with three.js

When I first made the source code for these examples and wrote this post I was using r127 of three.js, and the last time I came around to do some editing I was using r140. I do not think a lot of changes have been made to the torus geometry constructor that will case code breaking changes, but still in the future many such changes might happen to other features of the library that I am using.

## Some Basic exmaples

To start out with there is just making a simple hello world type demo of the Torus Constructor with a simple example that is just one mesh object. So in this getting started type section I will be starting out with an example just like that. After that I will want to also write about a few more basic examples that mainly just have to do with the arguments that there are to work with when calling the torus geometry constructor function.

### 1.1 - Starting out with a basic Torus example

When calling the THREE.TorusGeometry constructor function the first argument is the main radius of the torus as a whole, while the second argument is the radius of each circle in the torus or the tube radius if you prefer. The next two arguments of the constructor are to set the number of circles in the torus, and how many sides per circle.

Once I have my torus geometry I can then pass it as the first argument to the mesh constructor, and pass a material as the second argument for the mesh constructor and then add the resulting mesh to a scene object. After that I just need to set up a camera and a renderer for this example.

```js
//-------- ----------
// MESH - Using THREE.TorusGeometry for geometry
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 16,
tubeSegments = 32;
const donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial());
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(donut); // add mesh to scene
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.5, 2);
camera.lookAt(0, 0.25, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
renderer.render(scene, camera);

```

### 1.2 - The copy method of Buffer Geometry

Now that I have the very basic, easy exmaple out of the way I think I should get into at least one or more additonal examples that are maybe not so basic. For this example I am using the copy method of the buffer geometry class to copy the state of a new torus geometry to the older torus geometry of a mesh object. I can not say that this is the best way to go about updating a geometry, however it will still work okay when it comes to having a way to run threw a range of values when it comes to the varioys torus geometry arguments.

```js
//-------- ----------
// HELPERS
//-------- ----------
// create a donut geo
const createDonutGeo = (opt) => {
    opt = opt || {};
    opt.r = opt.r === undefined ? 0.5 : opt.r;
    opt.tr = opt.tr === undefined ? 0.25 : opt.tr;
    opt.rs = opt.rs === undefined ? 30 : opt.rs;
    opt.ts = opt.ts === undefined ? 30 : opt.ts;
    const geo = new THREE.TorusGeometry(opt.r, opt.tr, opt.rs, opt.ts);
    geo.rotateX(Math.PI * 0.5);
    return geo;
};
// create a donut Mesh
const createDonutMesh = (opt) => {
    opt = opt || {};
    const geo = createDonutGeo(opt)
    // create mesh
    const donut = new THREE.Mesh(
        geo,
        opt.material || new THREE.MeshNormalMaterial());
    return donut;
};
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD MESH TO SCENE
//-------- ----------
const mesh1 = createDonutMesh({});
scene.add(mesh1);
const mesh2 = createDonutMesh({});
mesh2.position.x = -2;
scene.add(mesh2);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
frame = 0;
const maxFrame = 300,
fps = 30;
const loop = function(){
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000,
    bias = THREE.MathUtils.pingpong(per - 0.5, 1) * 2;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // copying new geos to old geo of mesh objects
        mesh1.geometry.copy( createDonutGeo({
            rs: 3 + 27 * bias, 
            ts: 3 + 27 * bias}));
        mesh2.geometry.copy( createDonutGeo({
            r: 0.75 + 0.125 * bias,
            tr: 0.25 - 0.125 * bias }));
        // render step
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 2 - Points example using Torus Geometry

An altherative to using a Mesh object would be to use the Points Constrcutor. When doing so I am restrteiced to using just the points material that just has a few options such as setting the size and color.

```js
//-------- ----------
// POINTS - Using THREE.TorusGeometry and PointsMaterial
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 64,
tubeSegments = 256;
const donut = new THREE.Points(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.PointsMaterial({size: 0.0125, color: 0x00ff00}));
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(donut); // add mesh to scene
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0.25, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Groups of mesh objects using Torus Geometry

In this section I will now be going over some examples that have to do with creating and working with a group of mesh objects using the torus geometry constructor. There are all kinds of ideas that come to mind when it comes to having a little fun with this kind of geometry constrcutor. Such as having a collection of donut shape mesh objects aranged in a circle and having the camera move threw the holes of each of them. There is also just creating a collection of mesh objects with all kinds of different values for the various argumnets for radius and the number of sections. There is really gettting into this sort of things and making cool animations and so forth, but for this section I will be keeping this with just a few examples to start out with.

### 3.1 - Camera moving threw holes animation

So now there is an idea that I just have to do with this because it is just a cool thing to do when it comes to just playing around with three.js. In this example I am once again creating a group of mesh objects that are using the torus geometry constructor but this time I am positing each of them in a circle, so then all the torus objects then begin to from another torus of sorts out of torus objects. I am then creating an animation loop, and moving the camera so that it passes along the the holes of each torus mesh object which results in a cool effect.

Just like my other group example of donut mesh objects I have a create donut child helper that also gets the same arguments. This time I am playing around with the expressions a little in a different way, and I am also making use of the standard material this time because I want to do something with light for this one. Another thing that I am doing differently with this create donut child method is that I am rotating the geometry of the torus so that when I create the group they are all aliened in a way that I want so that I can have a camera move threw them by just having the camera move along the circumference of a circle.

```js
//-------- ----------
// HELPERS
//-------- ----------
const MAIN_RADIUS = 8,
DONUT_COUNT = 30;
// create a donut child for a group
const createDonutChild = (index, len) => {
    const per = index / len,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    radius = 0.6 + 2.3 * bias,
    tubeRadius = 0.125 + 0.25 * bias,
    radialSegments = 32,
    tubeSegments = 32;
    const donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshStandardMaterial({
           color: 0xffffff,
           emissive: 0x2a0000
        }));
    donut.geometry.rotateY(Math.PI * 0.5);
    return donut;
};
// create a group of donuts
const createDonutGroup = () => {
    let i = 0;
    const len = DONUT_COUNT,
    group = new THREE.Group();
    while(i < len){
        const per = i / len,
        radian = Math.PI * 2 * per;
        const donut = createDonutChild(i, len);
        donut.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        donut.lookAt(0, 0, 0);
        group.add(donut);
        i += 1;
    }
    return group;
};
//-------- ----------
// SCENE, CAMERA, LIGHT, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(2, 0, 0);
camera.add(light);
scene.add(camera);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADDING GROUP TO SCENE
//-------- ----------
const group = createDonutGroup();
scene.add(group);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
frame = 0;
const maxFrame = 1200,
fps = 24;
const loop = function(){
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        const radian = Math.PI * 2 * per;
        camera.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        camera.lookAt(Math.cos(radian + 0.5) * MAIN_RADIUS, Math.sin(radian) * 0.5, Math.sin(radian - 0.5) * MAIN_RADIUS);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

There are a great number of other ways that I can play around with this kind of example to make all kinds of interesting animations. Another idea that might be nice is to have the torus mesh objects rotated in a way so that all the holes are facing the center rather than each other and have the camera weave in and own in a sine wave like pattern.

### 3.2 - Creating a group of mesh objects using a torus

In this example I am creating a group of mesh objects where each mesh object is created with a create donut helper method to which I pass two arguments one of the current child index, and the other for the total number of children in the group. Then for each child I am increasing the number of segments for the radial and tube segments for each child as the child index value goes up.

```js
//-------- ----------
// HELPERS
//-------- ----------
const createDonutChild = function(index, len){
    const per = index / len,
    radius = 0.6,
    tubeRadius = 0.25,
    radialSegments = 4 + Math.round(20 * per),
    tubeSegments = 4 + Math.round(20 * per);
    const donut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial({wireframe:true}));
    return donut;
};
const createDonutGroup = function(){
    let i = 0;
    const len = 10,
    group = new THREE.Group();
    while(i < len){
        const donut = createDonutChild(i, len);
        donut.position.set(0, 0, 4 - i * 1.125);
        group.add(donut);
        i += 1;
    }
    return group;
};
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD GROUP TO SCENE
//-------- ----------
const group = createDonutGroup();
scene.add(group);
//-------- ----------
// RENDER SCENE
//-------- ----------
renderer.render(scene, camera);
```

## Conclusion

The torus geometry constructor is fun geometry constructor to play around with when it comes to making a few quick examples and getting a feel for how to make some interesting animations with three.js. There is many other little details to work with here and there also when it comes to a lot of these examples. For example there is learning how to work with not just the torus geometry, but geometry in general when it comes to rotating them, and working with the various properties of a geometry. There is also not just the geometry, but the objects that contain the geometry, and groups of such objects when it come to the Mesh constructor and the Object3d class that it is based on.

