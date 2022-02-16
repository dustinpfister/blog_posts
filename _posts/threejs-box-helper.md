---
title: Three js Box Helper
date: 2019-06-10 21:11:00
tags: [three.js]
layout: post
categories: three.js
id: 475
updated: 2022-02-16 12:50:35
version: 1.33
---

In [three js](https://threejs.org/) there is a built in [box helper](https://threejs.org/docs/index.html#api/en/helpers/BoxHelper) that can be used to help when it comes to gaining some visual idea of what is going on with a [Mesh](/2018/05/04/threejs-mesh/), a [Group](/2018/05/16/threejs-grouping-mesh-objects/), or anything else that inherits from the [Object3d Class](/2018/04/23/threejs-object3d/) for that matter. Simply put, the box helper just draws a box outline around the area of an object that it is used with, and doing so will help to get a better visual idea of what is going on with position, size, and orientation of the object.

There are maybe a few little problems here and there that might come up when using the box helper though. For example one might expect that when a mesh is moved or rotated that box will move and rotate with the mesh object, however this is not always the case. Typically I will want to add a box helper to the object that I have created it for as a child, so that when I move or rotate that object the box helper will move or rotate with it. However even then there are some situations in which I will want to update the box helper when it comes to something like changing the side of the mesh object or something to that effect as that will not just update on its own. 

In this post I will be going over a few quick examples of the box helper in three.js that might help to address some of these issues that might pop up when unseeing it. As such I will not just be writing about the box helper, but also a wide range of other things that can be applied elsewhere when it comes to working with a three.js project in general.

<!-- more -->

## 1 - The Box helper in threejs and what to know first

The Box helper is one of several helper classes in threejs that help to gain a better visual understanding of the situation that is going on with a scene. Speaking of threejs, this is not in any way a getting started type post on threejs, or any additional skills that are requires to work with threejs and client side web development in general. I trust that you have at least a little basic understanding of how to get started with three.js, and the javaScript programing language, if not this post might still prove to be a little to advanced for now. I will not be going over the very basics of threejs here, but in this section I will be going over some things that you should understand at this point before continuing to read the other sections of this post.

### 1.1 - There are many other useful helpers in threejs use them

The box helper is great, but I often use it in conjunction with many other helpers such as the grid helper and [arrow helper](/2018/11/10/threejs-arrow-helper/). There are also a whole bunch of additional helpers that can be used to gain a better awareness of what the situation is with an object, or a whole scene that I might be working on. So then the box helper is just one of many tools in the threejs toolbox of sorts when it comes to this sort of thing.

### 1.2 - version numbers matter with threejs

When I first wrote this post I was using r104 of threejs, and the last time I came around to do a little editing I was using r127 of threejs. I do not think much has changed with the box helper between those two revision numbers, and many of the other helpers for a long time. However many code breaking changes have been made with many other things in threejs, and that trend will likely continue moving forward with later versions of the library. If you run into problems with these examples on your end the first and for most thing you should check is the revision number you are using.

### 1.3 - The source code for the examples in this post and many others is on Github

The source code for the examples I am writing about in this post can be found in my [test threejs git hub repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-box-helper). This is also the repository where I am parking the source code examples for all my [other posts on threejs beyond just this one](/categories/three-js/).

## 2 - Box helper basic example in threejs

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

## 3 - Moving an object with a Box Helper

When moving a box helper it is impotent to know if the box helper was added to a mesh or the scene. If a mesh that a box helper was created for is moved, but the box helper is added to the scene or any object or group outside of that mesh, then the box helper will not move with the mesh but will stay relative to the group or object that it was added to.

```js
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
 
var mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
// adding a helper to mesh1
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);
var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x0a0a0a
        }));
scene.add(mesh2);
// adding a helper to mesh2
mesh2.add(new THREE.BoxHelper(mesh1, 0xffff00));
 
var group = new THREE.Group();
// adding a box helper for the group
group.add(new THREE.BoxHelper(mesh2, 0xffffff));
scene.add(group);
 
// light
var light = new THREE.PointLight(0xffffff);
light.position.set(0, 3, 0);
scene.add(light);
 
// camera renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 8, 6);
camera.lookAt(1, 0, 1);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
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
        // that is relative to the mesh
        mesh1.position.z = 5 * bias;
        mesh1.rotation.y = Math.PI * per;
        // moving mesh2 also
        mesh2.position.x = 5 * bias;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
 
};
loop();
```

## 4 - A Box helper can be used with a group

I often like to use groups when working out a three.js project, they are a great way of making a few meshes all part of a given area. I can then move and rotate this collection of mesh objects just like that of a single mesh object. So it is important for me to find out if this box helper will work okay with a group of mesh objects, and not just a single  mesh. After taking a moment to play around with a simple example of this it would seem that it does in fact work as I would expect. The Box helper will enclose the area in which all of the mesh objects are.

```js
// create a GROUP
var group = new THREE.Group();
 
// add a Sphere to the group
var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30), 
    new THREE.MeshNormalMaterial());
group.add(sphere);
// add a Box to the group
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshNormalMaterial());
box.position.set(2,0,0);
group.add(box);
 
// add a BOX HELPER for the GROUP
var helper = new THREE.BoxHelper(group, 0xffffff);
group.add(helper);
 
// Once the helper is added I can then change the position
group.position.set(0,-1,0);
group.rotation.set(-1,1.57,2);
 
// start a scene
var scene = new THREE.Scene();
// add the GROUP to the scene
scene.add(group);
 
// everything else
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

However there are some things to be aware of such as what happens when I set the position of the group before adding meshes, and the box helper. There is also what happens when I add additional mesh objects to the group after the helper, and so forth.

## 5 - Conclusion

The box helper is then one of several kinds of helpers that can be used to gain a sense of what is going on with a three.js project by just simply adding a box like area around a mesh, group, or just about anything based off of the object3d class. Although the box helper will help to gain insight as to what is going on with an area, it will not help to shed light on what is going on in terms of directions, or other various factors that are at play. So then another useful helper is the [arrow helper](https://threejs.org/docs/#api/en/helpers/ArrowHelper) that can be used to know which way is what in a scene.

