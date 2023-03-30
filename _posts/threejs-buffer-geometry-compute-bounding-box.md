---
title: Computing Bounding Box for buffer geometries in threejs
date: 2022-10-07 08:30:00
tags: [three.js]
layout: post
categories: three.js
id: 1008
updated: 2023-03-30 07:40:45
version: 1.13
---

With the buffer geometry class in threejs there is a bounding box property that stores an instance of the Box3 class, and the [compute bounding box method of the buffer geometry class](https://threejs.org/docs/#api/en/core/BufferGeometry.computeBoundingBox) is what can be used to create or update this instance of Box3. This bounding box can then be used to help with things like getting the size of the area in which the object takes up, and as such it can often be helpful when positioning objects to the surface of another object.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/pvhCG2MczdI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Compute Bounding Box, and what to know first

This is a post on the compute bounding box method of the buffer geometry class in the javaScript library called threejs. With that said there is a lot of subjects that you should know a thing or two about before hand that I will not be getting into detail here as I have wrote those kinds of posts on [threejs](/2018/04/04/threejs-getting-started/) and [javaScript](/2018/11/27/js-getting-started/) a long time ago. However regardless of how much experience you might have at this point I will take a moment to outline a few things you might want to learn or refresh with when it comes to compute bounding box of buffer geometry.

### Buffer Geometry

There is the compute bounding box method alone of the buffer geometry class and then there is [everything else that branches off from an instance of buffer geometry](/2021/04/22/threejs-buffer-geometry/). There is a whole lot of ground to cover when it comes to this class in the library of course when it comes to creating and updating a geometry to begin with.

### The Box3 class in detail

When I call the compute bounding box method of a buffer geometry class instance [an instance of the box3 class](/2022/05/09/threejs-box3/) will be crated and assigned to the bounding box property of the geometry. I will be covering many of the features of this class in this post, but it still might be a good idea to get a better sense of how to work with this class outside of the use of the compute bounding box method of buffer geometry.

### Source is on Github

The source code examples that I am writing about here can also be [found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-compute-bounding-box)

### Version Numbers

When I first wrote this post I was using r140 of threejs.

## 1 - Basic Compute Bounding Box examples

For this first section I will be starting out with a few basic examples of the compute bounding box method just for the sake of gaining a sense of how to use this to preform various typical tasks in which it will become useful.

### 1.1 - Min and Max Values of box3

After I call the compute bounding box method there will be an instance of box3 at the bounding box property of the geometry. Two of the core properties of this box3 class are the min and max values that are used to store the lowest and highest corners of the box. In this example I am then using the values of this box3 class to create new mesh objects at the lowest and highest points.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_box = new THREE.BoxGeometry(4.5, 3, 4.5);
const geo_sphere = new THREE.SphereGeometry(1.0, 30, 30);
// COMPUTE THE BOUNDING BOX
geo_box.computeBoundingBox();
//-------- ----------
// MESH, MATERIAL
//-------- ----------
// main mesh object using geo_box
const mesh = new THREE.Mesh( geo_box, new THREE.MeshNormalMaterial({wireframe: true}) );
scene.add(mesh);
// getting a ref to bounding box of geo_box
// and using that to set the position of other mesh objects
const bb = geo_box.boundingBox;
const material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});
const mesh1 = new THREE.Mesh( geo_sphere, material );
scene.add(mesh1);
mesh1.position.copy(bb.min);
const mesh2 = new THREE.Mesh( geo_sphere, material );
scene.add(mesh2);
mesh2.position.copy(bb.max);
//-------- ----------
//  RENDER
//-------- ----------
camera.position.set(3, 5, 5);
camera.lookAt(0, -0.75, 0);
renderer.render(scene, camera);
```

Although this might help to gain a visual sense of what is going on here to some extent, there is a better way of doing this by making use of a special helper class that works with box3 objects. The main thing here though is that these min and max values are instances of the vector3 class that are the same objects that are used for the position properties of object3d based objects such as mesh objects. So if I want to I can quickly place mesh objects at these locations by making use of the copy method of the Vector3 class.

### 1.2 - The Box3 Helper

The best tool for getting a visual idea of what is going on with a Box3 class such as the one that i crated by calling the compute bounding box method would be to use the [box3 helper](https://threejs.org/docs/#api/en/helpers/Box3Helper).

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_sphere = new THREE.SphereGeometry(3.25, 30, 30);
// COMPUTE THE BOUNDING BOX
geo_sphere.computeBoundingBox();
// ADDING A BOX HELPER
const helper = new THREE.Box3Helper(geo_sphere.boundingBox);
helper.material.linewidth = 6;
scene.add(helper)
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const mesh = new THREE.Mesh( geo_sphere, new THREE.MeshNormalMaterial({}) );
scene.add(mesh);
//-------- ----------
//  RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
renderer.render(scene, camera);
```

### 1.3 - Size and Position

The get size method of the box3 class can be used to copy values to an instance of Vector3 that are values that correspond to the size of the geometry. If the origin of the geometry is more or less at the center of box, then this can also be used to easily position a mesh object to a flat surface by just dividing the y value of the vector3 by half and then use that to offset the mesh object when positioning objects in a scene.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const positionMesh = (mesh, x, z) => {
    const geo = mesh.geometry;
    // COMPUTE THE BOUNDING BOX AND GET bb REF TO IT
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    // GET SIZE, and use size to position MESH
    const v_size = new THREE.Vector3();
    bb.getSize(v_size);
    mesh.position.set(x, v_size.y / 2, z);
    return mesh;
};
//-------- ----------
// MESH, MATERIAL
//-------- ----------
const m = new THREE.MeshNormalMaterial();
scene.add( positionMesh(
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 3.25, 3), m),
        -4.5, -3.5));
scene.add( positionMesh(
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 5, 1), m),
        3.5, 1.5));
scene.add( positionMesh(
    new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2), m),
        -3.0, 3.0));
//-------- ----------
//  RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
renderer.render(scene, camera);
```

Although this might work well when it comes to thins kind of situation in which I want to position mesh objects with box geometries to a flat surface, often the situation will not be so simple. However when it comes to just simply getting the size of a geometry alone this works great.

## 2 - Animation Loop Examples

I like to make at least one if not more videos for most if not all of my blog posts on threejs, so in this section I will be going over the source code that I am using to make the videos for this post. I could go on and on about the basics of animation loops, and so forth here but I assume that you know at least a thing or two about them. The main thig here is that in this section the aim is frame by frame style animation that is good for making a demo video for this subject, but not one or more stochastic type systems that respond to user input and so forth.

### 2.1 - Size and position animation

This is a quick animation that I made in which I continued to work off of the size and position basic example. I started out by making the code better organized in the form of a number of helper functions. The main helper function of interest of which would be the get mesh ground position helper function that will create and return an instance of the Vector3 class that will be the ground position that is desired. Sense this will just create and return a Vector3 class instance I then also have a set mesh helper function that will call this get mesh ground position method and use the resulting vecotr3 along with a starting vector to set the position of a mesh object by making use of the [Vecotr3 class lerp method](/2022/05/17/threejs-vector3-lerp/).

Speaking of the set mesh method that takes a mesh object with custom [user data object](/2021/02/16/threejs-userdata/) and an alpha value that is used with the lerp method I should take a moment to write about my make mesh and get alpha helper methods that I made for this animation example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const getMeshGroundPosition = (mesh, x, z) => {
    const geo = mesh.geometry;
    // COMPUTE THE BOUNDING BOX AND GET bb REF TO IT
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    // GET SIZE, and return new Vector3
    const v_size = new THREE.Vector3();
    bb.getSize(v_size);
    return new THREE.Vector3(x, v_size.y / 2, z);
};
// Make Mesh
const makeMesh = (w, h, d, x, z, sh, p1, p2, m) => {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d), m);
    mesh.userData.v_start = new THREE.Vector3(x, sh, z);
    mesh.userData.p1 = p1;
    mesh.userData.p2 = p2;
    return mesh
};
// set mesh animation state for the given alpha
const setMesh = (mesh, alpha) => {
    let mud = mesh.userData;
    let b = getAlpha(alpha, 1, mud.p1, mud.p2);
    let v_start = mud.v_start;
    let v_ground = getMeshGroundPosition(mesh, v_start.x, v_start.z);
    mesh.position.copy(v_start).lerp(v_ground, b);
};
// get alpha helper
const getAlpha = (n, d, p1, p2) => {
    let a = n / d;
    let b = 0;
    if(a < p1){ b = a * (1 / p1);}
    if(a >= p1 && a < p2){ b = 1;}
    if(a >= p2){
        b = (1 - a) / (1 - p2);
    }
    return b;
};
//-------- ----------
// GROUP, MESH, MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial();
let group = new THREE.Group();
[
    [1, 1, 1, 0.5, 0.5, 12, 0.65, 0.8, material],
    [1, 3, 1, -4.5, -4.5, 10, 0.75, 0.9, material],
    [1, 3.25, 3, -4.5, 0.5, 8, 0.25, 0.5, material],
    [2, 2, 2, 3, -2, 8, 0.15, 0.4, material]
].forEach((argu) => {
    let mesh = makeMesh.apply(null, argu);
    group.add(mesh);
});
scene.add(group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = FPS_MOVEMENT * 5; // 5 sec animation
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    group.children.forEach((mesh)=>{
        setMesh(mesh, frame / frameMax);
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

That will be it for now at least when it comes to the compute bounding box method of buffer geometry and a few quick use case examples of it. I have not yet done this post justice at all when it comes to all the additional use case examples that come up, such as positioning objects to the surface of a torus geometry or other custom geometry created in an external 3D modulating program. There are some more advanced examples that I have just started working on when it comes to editing my [post on the raycaster class](/2021/05/18/threejs-raycaster/) that I might in time write about in this post in future edits. Also I would like to wrote more about collision detection and other not so typical use case examples of compute bonding box, but there are only so many hours in a day.

