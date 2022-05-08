---
title: Three js Box Helper
date: 2019-06-10 21:11:00
tags: [three.js]
layout: post
categories: three.js
id: 475
updated: 2022-05-08 09:40:27
version: 1.39
---

In [three js](https://threejs.org/) there is a built in [box helper](https://threejs.org/docs/index.html#api/en/helpers/BoxHelper) that can be used to help when it comes to gaining some visual idea of what is going on with a [Mesh](/2018/05/04/threejs-mesh/), a [Group](/2018/05/16/threejs-grouping-mesh-objects/), or anything else that inherits from the [Object3d Class](/2018/04/23/threejs-object3d/) for that matter. Simply put, the box helper just draws a box outline around the area of an object that it is used with, and doing so will help to get a better visual idea of what is going on with position, scale, and orientation of the object.

There are maybe a few little problems here and there that might come up when using the box helper though. For example one might expect that when a mesh is moved or rotated that box will move and rotate with the mesh object, however this is not always the case. Typically I will want to add a box helper to the object that I have created it for as a child, so that when I move or rotate that object the box helper will move or rotate with it. Another way would be to use a method that can update the state of this box helper object by using a set from object method that is a prototype method of this box helper class. 

In this post I will be going over a few quick examples of the box helper in three.js that might help to address some of these issues that might pop up when unseeing it. As such I will not just be writing about the box helper, but also a wide range of other things that can be applied elsewhere when it comes to working with a three.js project in general.

<!-- more -->

## The Box helper in threejs and what to know first

The Box helper is one of several helper classes in threejs that help to gain a better visual understanding of the situation that is going on with a scene. Speaking of threejs, this is not in any way a getting started type post on threejs, or any additional skills that are requires to work with threejs and client side web development in general. I trust that you have at least a little basic understanding of how to get started with three.js, and the javaScript programing language, if not this post might still prove to be a little to advanced for now. I will not be going over the very basics of threejs here, but in this section I will be going over some things that you should understand at this point before continuing to read the other sections of this post.

### There are many other useful helpers in threejs use them

The box helper is great, but I often use it in conjunction with many other helpers such as the grid helper and [arrow helper](/2018/11/10/threejs-arrow-helper/). There are also a whole bunch of additional helpers that can be used to gain a better awareness of what the situation is with an object, or a whole scene that I might be working on. So then the box helper is just one of many tools in the threejs toolbox of sorts when it comes to this sort of thing.

### version numbers matter with threejs

When I first wrote this post I was using r104 of threejs, and the last time I came around to do a little editing I was using r135 of threejs. I do not think much has changed with the box helper between those two revision numbers, and many of the other helpers for a long time. However many code breaking changes have been made with many other things in threejs, and that trend will likely continue moving forward with later versions of the library. If you run into problems with these examples on your end the first and for most thing you should check is the revision number you are using.

### The source code for the examples in this post and many others is on Github

The source code for the examples I am writing about in this post can be found in my [test threejs git hub repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-box-helper). This is also the repository where I am parking the source code examples for all my [other posts on threejs beyond just this one](/categories/three-js/).

## 1 - Box helper basic example in threejs

A basic example of a box helper in three js might involve just calling the THREE.BoxHelper constructor by calling that constructor, however in order to do that I will first need something to use the box helper with. So to start off this example of the box helper I will first want something that inherits from the object3d class such as a Mesh object. With that said I will need a basic mesh consisting of some kind of geometry and a material, nothing fancy just something to sever for the purpose of this basic example. So I just created a [sphere geometry](/2021/05/26/threejs-sphere/) and used that with the [Normal Material](/2021/06/23/threejs-normal-material/) which does not require a light source to help keep things simple.

Once I have my mesh object I can then pass that object as the first argument for the THREE.BoxHelper constructor, a second argument can then also be used to set the color of the box helper lines. Once the instance of the box helper is created it just needs to be added to the scene, group or whatever object3d based object I want the box helper to be a child of. In this example I am adding the box helper to the mesh object of the sphere, and then adding the sphere as a child of the main scene object.

```js
// a mesh
var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30), 
    new THREE.MeshNormalMaterial());
// add a box helper
mesh.add(new THREE.BoxHelper(mesh, 0xffffff));
// start a scene
var scene = new THREE.Scene();
// add the mesh to the scene
scene.add(mesh);
// everything else
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

This is a nice simple example getting started type example of the box helper, but when using this in a real project of some kind there can be a lot going on. With that said what about resizing the helper, moving it relative to the mesh object or not actually. There is also updating the state of the box helper as needed when it comes to some kind of animation loop and so forth. So then it is called for to take a look at at least a few more examples of this kind of helper in threejs.

## 2 - Moving an object with a Box Helper by making it a child of the object

When moving a box helper it is good to know if the box helper was added to a mesh, the scene, or some other object. If a mesh that a box helper was created for is moved, but the box helper is added to the scene or any object or group outside of that mesh, then the box helper will not move with the mesh but will stay relative to the group or object that it was added to. This is the same deal with just about any other kind of object3d based object in threejs actually, the positions that are set are relative to whatever the child object is.

```js
// scene and grid helper
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
 
// A MESH OBJECT WITH A BOX HELPER OF THE MESH
// ADDED AS A CHILD OF THE MESH
var mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);
 
// ADDING A BOX HELPER DIRECTLY TO THE SCENE
scene.add(new THREE.BoxHelper(mesh1, 0xffffff));
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(1, 0, 1);
// render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// app loop
var frame = 0,
maxFrame = 90,
fps = 30,
lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // change position and rotation of mesh1
        // this also changes the position of the box helper
        // that is relative to the mesh as it is a child of mesh1 
        // rather than the scene
        mesh1.position.z = 5 * bias;
        mesh1.rotation.y = Math.PI * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 3 - A Box helper can be used with a group

I often like to use groups when working out a three.js project, they are a great way of making a few meshes all part of a given area. I can then move, rotate, scale and so forth this collection of mesh objects just like that of a single mesh object and the effects will update the group and all children of the group. So it is important for me to find out if this box helper will work okay with a group of mesh objects, and not just a single mesh. After taking a moment to play around with a simple example of this it would seem that it does in fact work as I would expect. The Box helper will enclose the area in which all of the mesh objects are.

```js
// create a GROUP
var group = new THREE.Group();
 
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
group.add(new THREE.BoxHelper(group, 0xffffff));
 
// Once the helper is added I can then change the position
group.position.set(0,0,0);
group.rotation.set(0,1,1);
 
// start a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8, 8, 0xffffff, 0xff0000));
// add the GROUP to the scene
scene.add(group);
 
// everything else
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

However there are some things to be aware of such as what happens when I set the position of the group before adding meshes, and the box helper. There is also what happens when I add additional mesh objects to the group after the helper, and so forth.

## 4 - Using the scale property of an object

Thus far I have covered examples that involve changing the position and rotation of mesh objects, and groups of mesh objects and if these changes update the box helper that is a child of such objects. There is yet another property of an object3d based object that would be used with a box helper that is of interest and the is the scale property. Asi with with position property the scale property is also an instance of the Vecvor3 class. By default the scale property vectror3 instance values are 1,1,1 which means the original size of the geometry, but these can be set to any value lower, lower or higher to change the scale of the mesh or group.

```js
// scene and grid helper
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));

// a mesh with a box helper as a child of the mesh
var mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);

// helper that is not a child of the object that I
// create the box helper for
var helper = new THREE.BoxHelper(mesh1);
scene.add(helper);
 
// changing position of mesh1
mesh1.position.set(-2, 0, 0);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(mesh1.position);
// render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// app loop
var frame = 0,
maxFrame = 90,
fps = 30,
lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        var v = new THREE.Vector3(0.5, 1, 0.5 + 2 * bias);
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

## 5 - using the set from object method as a way to update the box helper

In one above example I fixed issues that have to do with updating an object by maing the box helper a child of the object to which I want to use the box helper with. Although this might work okay in most situations maybe the best way to go about handling this sort of thing would be to use the set from object method of the box helper class. This way I can just call this method each time I update an object, and I do not have to make the helper a child of the object when doing this. Also if I want to I can change what object I am using the helper with all together.

```js
// scene, camera, grid helper
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(1, 0, 1);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// A MESH OBJECT WITH A BOX HELPER OF THE MESH
// ADDED AS A CHILD OF THE MESH
var mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 3, 30, 30),
        new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ADDING A BOX HELPER TO THE SCENE OBJECT
var boxHelper = new THREE.BoxHelper(mesh1, 0xffff00);
scene.add(boxHelper);
// LOOP
var frame = 0,
maxFrame = 90,
fps = 30,
lt = new Date();
var loop = function () {
    var now = new Date(),
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

## Conclusion

The box helper is then one of several kinds of helpers that can be used to gain a sense of what is going on with a three.js project by just simply adding a box like area around a mesh, group, or just about anything based off of the object3d class. Although the box helper will help to gain insight as to what is going on with an area, it will not help to shed light on what is going on in terms of directions, or other various factors that are at play. So then another useful helper is the [arrow helper](https://threejs.org/docs/#api/en/helpers/ArrowHelper) that can be used to know which way is what in a scene.

