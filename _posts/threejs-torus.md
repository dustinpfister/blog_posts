---
title: Torus Geometry in threejs for making doughnut shapes
date: 2021-05-27 11:33:00
tags: [three.js]
layout: post
categories: three.js
id: 876
updated: 2023-07-18 10:47:04
version: 1.34
---

Today I thought I would write another post on a built in geometry constructor in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), this time the [Torus Geometry Constructor](https://threejs.org/docs/#api/en/geometries/TorusGeometry) which results in a doughnut like shape.

There are many interesting things about the [geometry of a torus in general](https://en.wikipedia.org/wiki/Torus) that are worth looking into in detail. It is a shape that is composed of a collection of circles where each circle is positioned and rotated around a point that results in the formation of a tube that in turn is a kind of 3d circle. So then there are two general arguments of concern that come up with this. One argument is the radius from the origin to the center of the tube that will form the over all doughnut shape, and then the other is the radius for each circle along this path as well. After that there are some additional arguments of concern that have to do with the number of sides for each circle, and the number of circles that will effect the over all point density of the geometry.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/GRlJjfzq_lk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## A doughnut or torus geometry in threejs and what to know first

This is a post on the Torus Geometry constructor in the javaScript library known as threejs. In addition to the constructor function itself I will also be making use of a whole bunch of other features of the threejs library in these code examples. So I trust that you have at least some background when it comes to the very basic of how to get up and running with a three.js project, if not you might want to start out with some kind of [getting started guide on threejs](/2018/04/04/threejs-getting-started/).

### Do not just stop with the Torus Constructor of course

The torus geometry constructor is of course just one option when it comes to the many built in geometry constrictors there are to work with in threejs. The [Sphere](/2021/05/26/threejs-sphere/), [plane](/2019/06/05/threejs-plane/), and [Box geometry](/2021/04/26/threejs-box-geometry/) constructors are all also worth checking out in detail if you have not done so before hand. There is a lot to learn about these constructors and not just with respect to how to just call the function and pass a few arguments when calling them. 

### There is also a lot to be aware of woth buffer geometry in general

Although the built in constrictor are a great starting pint to just quickly create geometry by calling a constrictor function. In the long run sooner or later in make sense to look into the [buffer geometry constructor](/2021/04/22/threejs-buffer-geometry/) and how to create a custom geometry. A starting point for doing so would be to add a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) to the clean, new geometry object. However that would be how to create geometry with javaScript code, there is also starting to look inti all the various options for loading external data files that contain geometry. When it comes to geometry loaders that are built into threejs itself there is the [buffer geometry loader](/2018/04/12/threejs-buffer-geometry-loader/), but there are also a lot of other official options that can be added on top of threejs as well such as the [Collada loader](/2021/04/30/threejs-dae-collada-loader/).

### Source code examples are up on Github

The source code examples that I am writing about in this post are [also on Github in my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-torus). This is also where I park the source code examples for my [many other blog posts](/categories/three-js/) on threejs.

### Version Numbers matter with three.js

When I first made the source code for these examples and wrote this post I was using r127 of three.js, and the last time I came around to do some editing I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). I do not think a lot of changes have been made to the torus geometry constructor that will case code breaking changes, but still in the future many such changes might happen to other features of the library that I am using.

## Some Basic examples

To start out with there is just making a simple hello world type demo of the Torus Constructor with a simple example that is just one mesh object. So in this getting started type section I will be starting out with an example just like that. After that I will want to also write about a few more basic examples that mainly just have to do with the arguments that there are to work with when calling the torus geometry constructor function.

### 1.1 - Starting out with a basic Torus example

When calling the THREE.TorusGeometry constructor function the first argument is the main radius of the torus as a whole, while the second argument is the radius of each circle in the torus or the tube radius if you prefer. The next two arguments of the constructor are to set the number of circles in the torus, and how many sides per circle. Once I have my torus geometry I can then pass it as the first argument to the mesh constructor, and pass a material as the second argument for the mesh constructor and then add the resulting mesh to a scene object. After that I just need to set up a camera and a renderer for this example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH - Using THREE.TorusGeometry for geometry
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 16,
tubeSegments = 32;
const doughnut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial());

scene.add(doughnut); // add mesh to scene
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 1.5, 2);
camera.lookAt(0, 0.25, 0);
renderer.render(scene, camera);
```

### 1.2 - The copy method of Buffer Geometry

Now that I have the very basic, easy example out of the way I think I should get into at least one or more additional examples that are maybe not so basic. For this example I am using the copy method of the buffer geometry class to copy the state of a new torus geometry to the older torus geometry of a mesh object. I can not say that this is the best way to go about updating a geometry, however it will still work okay when it comes to having a way to run threw a range of values when it comes to the various torus geometry arguments.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a Doughnut geo
const createDoughnutGeo = (opt) => {
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
const createDoughnutMesh = (opt) => {
    opt = opt || {};
    const geo = createDoughnutGeo(opt)
    // create mesh
    const doughnut = new THREE.Mesh(
        geo,
        opt.material || new THREE.MeshNormalMaterial());
    return doughnut;
};
//-------- ----------
// ADD MESH TO SCENE
//-------- ----------
const mesh1 = createDoughnutMesh({});
scene.add(mesh1);
const mesh2 = createDoughnutMesh({});
mesh2.position.x = -2;
scene.add(mesh2);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
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
        mesh1.geometry.copy( createDoughnutGeo({
            rs: 3 + 27 * bias, 
            ts: 3 + 27 * bias}));
        mesh2.geometry.copy( createDoughnutGeo({
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

An alternative to using a Mesh object would be to use the Points Constructor. When doing so I am restricted to using just the points material that just has a few options such as setting the size and color. Although using the points constructor might be cool for just getting an idea of what is going on with the points of a geometry it might not be the best option as far as how things look. There is doing something where I am creating a mesh object for every point in a torus geometry and then doing whatever I want when it comes to all the various options with mesh materials, but that will be a log of objects and other resources.

### 2.1 - Basic Points example with Torus Geometry

The basic idea of this with the THREE.Points Constructor is not all that different from that of the mesh object in the scene that I just pass the geometry as the first argument. The main difference is that I only have one option when it comes to materials which is the points material. When using the points material I will often want to reduce the side of the points to something fairly small, this is really true if I make a geometry that has a great number of points in it.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// POINTS - Using THREE.TorusGeometry and PointsMaterial
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 64,
tubeSegments = 256;
const doughnut = new THREE.Points(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.PointsMaterial({size: 0.0125, color: 0x00ff00}));
scene.add(doughnut); // add mesh to scene
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0.25, 0);
renderer.render(scene, camera);
```

### 2.2 - Mesh for each Point in a Torus Geometry

Although the Points constructor is great it does have its draw backs when it comes to how things look. So then there is the question of using the position attribute of the buffer geometry made with the Torus geometry constructor to create a mesh for each point in the position attribute. For this example I am using the getX, getY, and getZ methods of the buffer Attribute class of the position attribute of a torus geometry to set the position for mesh objects that will be created for each point in the torus geometry.

This might take some leg work, and also eat up some resources compared o using the THREE.Points constructor. But now I am using mesh objects which means that I can make a sphere geometry fro each mesh, and also using any materials that I want such as the phong material. For this I am also adding some light sources using a directional light and some ambient light.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-2, 1, 3);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(al);
//-------- ----------
// CREATING MESH OBEJCTS FOR EACH POINT IN TORUS GEOMERTY
//-------- ----------
const radius = 1,
tubeRadius = 0.25,
radialSegments = 15,
tubeSegments = 60;
const sourceGeo = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments);
const pos = sourceGeo.getAttribute('position');
let i = 0, len = pos.count;
while(i < len){
    const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.025, 10, 10), new THREE.MeshPhongMaterial() )
    mesh.position.copy(v);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0.25, 0);
renderer.render(scene, camera);
```

## 3 - Groups of mesh objects using Torus Geometry

In this section I will now be going over some examples that have to do with creating and working with a group of mesh objects using the torus geometry constructor. There are all kinds of ideas that come to mind when it comes to having a little fun with this kind of geometry constructor. Such as having a collection of doughnut shape mesh objects arranged in a circle and having the camera move threw the holes of each of them. There is also just creating a collection of mesh objects with all kinds of different values for the various arguments for radius and the number of sections. There is really getting into this sort of things and making cool animations and so forth, but for this section I will be keeping this with just a few examples to start out with.

### 3.1 - Camera moving threw holes animation

So now there is an idea that I just have to do with this because it is just a cool thing to do when it comes to just playing around with three.js. In this example I am once again creating a group of mesh objects that are using the torus geometry constructor but this time I am positing each of them in a circle, so then all the torus objects then begin to from another torus of sorts out of torus objects. I am then creating an animation loop, and moving the camera so that it passes along the the holes of each torus mesh object which results in a cool effect.

Just like my other group example of doughnut mesh objects I have a create doughnut  child helper that also gets the same arguments. This time I am playing around with the expressions a little in a different way, and I am also making use of the standard material this time because I want to do something with light for this one. Another thing that I am doing differently with this create doughnut  child method is that I am rotating the geometry of the torus so that when I create the group they are all aliened in a way that I want so that I can have a camera move threw them by just having the camera move along the circumference of a circle.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(2, 0, 0);
camera.add(light);
//-------- ----------
// HELPERS
//-------- ----------
const MAIN_RADIUS = 8,
DOUGHNUT_COUNT = 30;
// create a DOUGHNUT child for a group
const createDoughnutChild = (index, len) => {
    const per = index / len,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    radius = 0.6 + 2.3 * bias,
    tubeRadius = 0.125 + 0.25 * bias,
    radialSegments = 32,
    tubeSegments = 32;
    const doughnut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshStandardMaterial({
           color: 0xffffff,
           emissive: 0x2a0000
        }));
    doughnut.geometry.rotateY(Math.PI * 0.5);
    return doughnut;
};
// create a group of DOUGHNUTs
const createDoughnutGroup = () => {
    let i = 0;
    const len = DOUGHNUT_COUNT,
    group = new THREE.Group();
    while(i < len){
        const per = i / len,
        radian = Math.PI * 2 * per;
        const doughnut = createDoughnutChild(i, len);
        doughnut.position.set(Math.cos(radian) * MAIN_RADIUS, 0, Math.sin(radian) * MAIN_RADIUS);
        doughnut.lookAt(0, 0, 0);
        group.add(doughnut);
        i += 1;
    }
    return group;
};
//-------- ----------
// ADDING GROUP TO SCENE
//-------- ----------
const group = createDoughnutGroup();
scene.add(group);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
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

In this example I am creating a group of mesh objects where each mesh object is created with a create doughnut helper method to which I pass two arguments one of the current child index, and the other for the total number of children in the group. Then for each child I am increasing the number of segments for the radial and tube segments for each child as the child index value goes up. This is then another example in which I want to get an idea of what the differences are when adjusting the various arguments when making a torus geometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createDoughnutChild = function(index, len){
    const per = index / len,
    radius = 0.6,
    tubeRadius = 0.25,
    radialSegments = 4 + Math.round(20 * per),
    tubeSegments = 4 + Math.round(20 * per);
    const doughnut = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubeSegments),
        new THREE.MeshNormalMaterial({wireframe:true}));
    return doughnut;
};
const createDoughnutGroup = function(){
    let i = 0;
    const len = 10,
    group = new THREE.Group();
    while(i < len){
        const doughnut = createDoughnutChild(i, len);
        doughnut.position.set(0, 0, 4 - i * 1.125);
        group.add(doughnut);
        i += 1;
    }
    return group;
};
//-------- ----------
// ADD GROUP TO SCENE
//-------- ----------
const group = createDoughnutGroup();
scene.add(group);
//-------- ----------
// RENDER SCENE
//-------- ----------
camera.position.set(6, 4, 4.5);
camera.lookAt(0, 0, 0.5);
renderer.render(scene, camera);
```

## 4 - The Lathe Goemetry and using that to create a Torus

I assumed that the Torus Geometry constructor might very well extent the [LatheGeometry class](/2023/06/07/threejs-lathe-geometry/), however after taking a look at the source code it would seem that is not the case. In reality the Torusgeometry class is its own thing that extends diretcly from the BufferGeometry class. Still I think that I should have a section on the Lathe Goemetry class in this post as it is possible to make simular shapes with that.

### 4.1 - Basic Tours shape with Lathe Geometry

The Lathe Geometry works by passing an array of vector2 objects that will form a 2d shape that will then be used to create a 3d shapes around an axis. So to make a torus like shape with this I just need to create a curve of a circle, and then just offset the center position of that circle from the origin. This offset would then be like the radius argument that is the one from the origin, and then it would be the radius of the circle that would then be the other radius value of interest with this. After that there is how many Vector2 points that would be how many sides of each circle sense I am using a curve here that would be the value that I given when calling the get points method of the base curve class. The last value of interest when it comes to point density would be the segments value when calling the Lathe geometry constructor function.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const radius_origin = 4;
const radius_tube = 1.00;
const curve = new THREE.ArcCurve(radius_origin, 0, radius_tube, 0, Math.PI * 2, false);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_curve = 50;
const v2array = curve.getPoints(segments_curve);
const segments_lathe = 50;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

The torus geometry constructor is a fun geometry constructor to play around with when it comes to making a few quick examples and getting a feel for how to make some interesting animations with three.js. There is many other little details to work with here and there also when it comes to a lot of these examples. For example there is learning how to work with not just the torus geometry, but geometry in general when it comes to rotating them, and working with the various properties of a geometry. There is also not just the geometry, but the objects that contain the geometry, and groups of such objects when it come to the Mesh constructor and the Object3d class that it is based on.

I have wrote down a lot of notes in my todo list for this post, and next time I come around to editing this post I sure I will expand this content once again with even more examples of the various things to be aware of with geometry using the torus geometry constructor. There are of course a lot of other built in constructors with threejs also though and much of what I would write about would also apply to them.


