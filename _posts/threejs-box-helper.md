---
title: Three js Box Helper
date: 2019-06-10 21:11:00
tags: [three.js]
layout: post
categories: three.js
id: 475
updated: 2023-06-18 14:53:58
version: 1.49
---

In [threejs](https://threejs.org/) there is a built in [box helper](https://threejs.org/docs/index.html#api/en/helpers/BoxHelper) that can be used to help gain some visual idea of what is going on with a [Mesh](/2018/05/04/threejs-mesh/), a [Group](/2018/05/16/threejs-grouping-mesh-objects/), or potentially anything else that inherits from the [Object3d Class](/2018/04/23/threejs-object3d/) for that matter. I say potentially because it must be an object that has a buffer geometry, or in the case of groups child objects that do. Simply put, the box helper just draws a box outline around the area of an object that it is used with.

There are maybe a few little problems here and there that might come up when using the box helper though. For example one might expect that when a mesh is moved or rotated that box will move and rotate with the mesh object, however this is not always the case. Typically I will want to add a box helper to the object that I have created it for as a child, so that when I move or rotate that object the box helper will move or rotate with it. Another way would be to use a method that can update the state of this box helper object by using a set from object method that is a prototype method of this box helper class. 

In this post I will be going over a few quick examples of the box helper in threejs that might help to address some of these issues that might pop up when unseeing it. As such I will not just be writing about the box helper, but also a wide range of other things that can be applied elsewhere when it comes to working with a three.js project in general.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/LvRUbSqwJ4Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Box helper in threejs and what to know first

The Box helper is one of several helper classes in threejs that help to gain a better visual understanding of the situation that is going on with a scene. Speaking of threejs, this is not in any way a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or any additional skills that are requires to work with threejs and client side web development in general. I trust that you have at least a little background with the basics, if not this post might still prove to be a little to advanced for now. I will not be going over every little detail that you show know before hand here, but in this section I will be going over some things that you should understand at this point before continuing to read the other sections of this post.

### There are many other useful helpers in threejs use them

The box helper is great, but I often use it in conjunction with many other helpers such as the [grid helper](/2022/02/18/threejs-grid-helper/) and [arrow helper](/2018/11/10/threejs-arrow-helper/). There are also a whole bunch of additional helpers that can be used to gain a better awareness of what the situation is with an object, or a whole scene that I might be working on. So then the box helper is just one of many tools in the threejs toolbox of sorts when it comes to this sort of thing.

### Read up more on the object3d class, and buffer geometry

The Box helper can be used with any [object3d class based object](/2018/04/23/threejs-object3d/) that has [buffer geometry](/2021/04/22/threejs-buffer-geometry/), or has child objects that contain such. Typically this means mesh objects, and groups of mesh objects. However other options would be Lines, and Points as well.

### There is also the box3 class

There is also looking into the [Box3 class alone](/2022/05/09/threejs-box3/) which is a major part of the box helper. There are many use case examples of the Box3 class that have to do with things like getting the size of a mesh object. The size of an object can then in turn be used in the process of helping to position an object in space as well.

### The source code for the examples in this post and many others is on Github

The source code for the examples I am writing about in this post can be found in my [test threejs git hub repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-box-helper). This is also the repository where I am parking the source code examples for all my [other posts on threejs beyond just this one](/categories/three-js/).

### version numbers matter with threejs

When I first wrote this post I was using r104 of threejs, and the last time I came around to do a little editing I was using r146 of threejs. I do not think much has changed with the box helper between those two revision numbers, and many of the other helpers for a long time. However many code breaking changes have been made with many other things in threejs, and that trend will likely continue moving forward with later versions of the library. If you run into problems with these examples on your end the first and for most thing you should check is the revision number you are using.

## 1 - Box helper basic example in threejs

A basic example of a box helper in three js might involve just calling the THREE.BoxHelper constructor by calling that constructor, however in order to do that I will first need something to use the box helper with. So to start off this example of the box helper I will first want something that inherits from the object3d class such as a Mesh object. With that said I will need a basic mesh consisting of some kind of geometry and a material, nothing fancy just something to sever for the purpose of this basic example. So I just created a [sphere geometry](/2021/05/26/threejs-sphere/) and used that with the [Normal Material](/2021/06/23/threejs-normal-material/) which does not require a light source to help keep things simple.

Once I have my mesh object I can then pass that object as the first argument for the THREE.BoxHelper constructor, a second argument can then also be used to set the color of the box helper lines. Once the instance of the box helper is created it just needs to be added to the scene, group or whatever object3d based object I want the box helper to be a child of. In this example I am adding the box helper to the mesh object of the sphere, and then adding the sphere as a child of the main scene object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30),  new THREE.MeshNormalMaterial());
scene.add( mesh );
//-------- ----------
// BOX HELPER OF MESH
//-------- ----------
mesh.add( new THREE.BoxHelper(mesh, 0xffffff) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

This is a nice simple example getting started type example of the box helper, but when using this in a real project of some kind there can be a lot going on. With that said what about resizing the helper, moving it relative to the mesh object or not actually. There is also updating the state of the box helper as needed when it comes to some kind of animation loop and so forth. So then it is called for to take a look at at least a few more examples of this kind of helper in threejs.

## 2 - Moveing the box helper to keep in up to date with the object

One major isshue of concern is how to go about kepping the box helper up to date with the object that it was created for. There are a few ways to go about doing this so it would be a good idea to take a look at a few demos of doing just that.

### 2.1 - Moving an object with a Box Helper by making it a child of the object

When moving a box helper it is good to know if the box helper was added to a mesh, the scene, or some other object. If a mesh that a box helper was created for is moved, but the box helper is added to the scene or any object or group outside of that mesh, then the box helper will not move with the mesh but will stay relative to the group or object that it was added to. This is the same deal with just about any other kind of object3d based object in threejs actually, the positions that are set are relative to whatever the child object is.

So one way to go about dealing with this would be to just make the box helper a child of the parent object which is what I am doing in this demo. However this might not be the best way to go about doing this sort of thing depeding on what you want to use the box helper for. Just thought I would get this one out of the way first.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4,4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH AND BOX HELPER
//-------- ----------
// A MESH OBJECT WITH A BOX HELPER OF THE MESH
// ADDED AS A CHILD OF THE MESH
const mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);
// ADDING A BOX HELPER DIRECTLY TO THE SCENE
scene.add(new THREE.BoxHelper(mesh1, 0xffffff));
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 90, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // change position and rotation of mesh1
        // this also changes the position of the box helper
        // that is relative to the mesh as it is a child of mesh1 
        // rather than the scene
        mesh1.position.z = 2 * bias;
        mesh1.rotation.y = Math.PI * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

### 2.2 - The update method of the Box Helper class

There is an update method of the box helper class also, and this in many cases might be what you will want to do actually in order to keep the geometry up to date of the helper. When adding the box helper of the object as a child to the object that might work okay if I just want to have a box around the object, and also have the box rotate with the object also. However often what is wanted is a box area that will not rotate but rather just resize and say in line with world space, or at least relative to the scene object for that matter assuming that it is still aligned with world space. 

<iframe class="youtube_video" src="https://www.youtube.com/embed/xdrL60u098U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


So with that said there is using the update method of the box helper class as a way to keep the geometry up to date. To do this I will want to add the helper as a child of the scene object. Then as I move the object to which the box helper was create for I just call the update method each time as a way to keep this up to date.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 3),
        new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 }));
scene.add(mesh1);
// helper
const helper1 = new THREE.BoxHelper(mesh1, 0xffffff);
helper1.material.linewidth = 8;
helper1.material.vertexColors = true;
helper1.material.transparent = true;
const data_color = [];
const att_pos = helper1.geometry.getAttribute('position');
let i = 0;
while(i < att_pos.count){
    const a_vertex = i / att_pos.count;
    const a_opacity = (a_vertex * 4) % 1;
    data_color.push(1 * a_vertex, 1, 1 - a_vertex, 0.8 * 0.9 * Math.random());
    i += 1;
}
helper1.geometry.setAttribute('color', new THREE.BufferAttribute( new Float32Array( data_color ), 4));
scene.add(helper1);
// grid
const grid = new THREE.GridHelper(10, 10);
grid.material.linewidth = 4;
scene.add(grid);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, -3, 0);
let frame = 0, lt = new Date();
const maxFrame = 900, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    a_frame = frame / maxFrame,
    a_z = Math.sin( Math.PI * (a_frame * 2 % 1) ),
    a_x = Math.sin( Math.PI * (a_frame * 8 % 1) );
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        mesh1.position.x = -2  + 4 * a_x;
        mesh1.position.z = -2  + 4 * a_z;
        mesh1.rotation.y = Math.PI * (a_frame * 8 % 1);
        mesh1.rotation.z = Math.PI * (a_frame * 24 % 1);
        // using the update method as a way to update the geometry of the box
        helper1.update();
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 3 - A Box helper can be used with a group

I often like to use groups when working out a threejs project, they are a great way of making a few meshes all part of a given area. I can then move, rotate, scale and so forth this collection of mesh objects just like that of a single mesh object and the effects will update the group and all children of the group. So it is important for me to find out if this box helper will work okay with a group of mesh objects, and not just a single mesh. After taking a moment to play around with a simple example of this it would seem that it does in fact work as I would expect. The Box helper will enclose the area in which all of the mesh objects are.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GROUP
//-------- ----------
// create a GROUP
const group = new THREE.Group();
// adding a Sphere, and box to the group, and
// adjusting the position of one of the children of the group
group.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30), 
    new THREE.MeshNormalMaterial()));
group.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshNormalMaterial()));
group.children[1].position.set(2, 0, 0);
// BOX HELPER
group.add( new THREE.BoxHelper(group, 0xffffff) );
// Once the helper is added I can then change the position
group.position.set(0,0,0);
group.rotation.set(0,1,1);
// add the GROUP to the scene
scene.add(group);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

However there are some things to be aware of such as what happens when I set the position of the group before adding meshes, and the box helper. There is also what happens when I add additional mesh objects to the group after the helper, and so forth.

## 4 - Using the scale property of an object

Thus far I have covered examples that involve changing the position and rotation of mesh objects, and groups of mesh objects and if these changes update the box helper that is a child of such objects. There is yet another property of an object3d based object that would be used with a box helper that is of interest and the is the scale property. As with the position property the scale property is also an instance of the Vecvor3 class. By default the scale property vectror3 instance values are 1,1,1 which means the original size of the geometry, but these can be set to any value lower, lower or higher to change the scale of the mesh or group.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH, BOX HELPER
//-------- ----------
// a mesh with a box helper as a child of the mesh
const mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);
// helper that is not a child of the object that I
// create the box helper for
const helper = new THREE.BoxHelper(mesh1);
scene.add(helper); 
// changing position of mesh1
mesh1.position.set(-2, 0, 0);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 90, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        const v = new THREE.Vector3(0.5, 1, 0.5 + 2 * bias);
        mesh1.scale.copy(v);
        mesh1.rotation.y = Math.PI * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 5 - Using the set from object method as a way to update the box helper

In one above example I fixed issues that have to do with updating an object by making the box helper a child of the object to which I want to use the box helper with. Although this might work okay in most situations maybe the best way to go about handling this sort of thing would be to use the set from object method of the box helper class. This way I can just call this method each time I update an object, and I do not have to make the helper a child of the object when doing this. Also if I want to I can change what object I am using the helper with all together.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH, BOX HELPER
//-------- ----------
// A MESH OBJECT WITH A BOX HELPER OF THE MESH
// ADDED AS A CHILD OF THE MESH
const mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 3, 30, 30),
        new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ADDING A BOX HELPER TO THE SCENE OBJECT
const boxHelper = new THREE.BoxHelper(mesh1, 0xffff00);
scene.add(boxHelper);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 90, fps = 30;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        mesh1.position.z = 5 * bias;
        mesh1.rotation.x = Math.PI * 2 * per;
        // UPDAING BOX HELPER FOR THE OBJECT
        boxHelper.setFromObject(mesh1);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 6 - Using the THREE.Points Class, and custom geometry

So the box helper with work fine with mesh objects, and also groups of mesh objects, but there are also objects like that of Points. The object used, or at least one child object used, needs a buffer geometry. Also when it comes to making a custom geometry there needs to at least be a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/). So then in this example I am creating a quick custom geometry by just crating an array of numbers for each x, y, and z value of each point that I want in space. Then I just need to create a buffer attribute and then set the attribute as the position attribute of a new buffer geometry object instance.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - custom buffer geometry with only a position attribute
//-------- ----------
const point_count = 300;
const point_array = [];
let i = 0;
while(i < point_count){
    const x = -2 + 4 * Math.random();
    const y = Math.random();
    const z = -2 + i / point_count * 4;
    point_array.push(x, y, z);
    i += 1;
}
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute( new Float32Array(point_array), 3 ) );
//-------- ----------
// Points
//-------- ----------
const points = new THREE.Points( geo,  new THREE.PointsMaterial({ size: 0.25 }));
scene.add( points );
//-------- ----------
// BOX HELPER OF POINTS
//-------- ----------
points.add( new THREE.BoxHelper(points, 0xffffff) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## Conclusion

The box helper is then one of several kinds of helpers that can be used to gain a sense of what is going on with a threejs project by just simply adding a box like area around a mesh, group, or just about anything based off of the object3d class. Although the box helper will help to gain insight as to what is going on with an area, it will not help to shed light on what is going on in terms of directions, or other various factors that are at play. So then another useful helper is the [arrow helper](https://threejs.org/docs/#api/en/helpers/ArrowHelper) that can be used to know which way is what in a scene.
