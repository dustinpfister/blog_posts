---
title: Quaternion slerp method
date: 2023-04-14 08:34:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1036
updated: 2023-04-14 09:33:58
version: 1.3
---

The [slerp method of the quaternion class in threejs](https://threejs.org/docs/#api/en/math/Quaternion.slerp) is a way to go about transitioning from one quaternion state to another. The method can be called off of an instance of a quaternion object, then another quaternion object to transition to can be given as the first argument, followed by an alpha value. The alpha value is then a number between 0 and 1 that is used to transition the quaternion object. This slerp method will mutate in place, however it can be used in conjunction with other methods like copy and clone to address that.

<!-- more -->

## The slerp method of the quaternion class and what to know first

In this post I am writing about just one little method of a Quaternion class in the javaScript library known as threejs. There is then a whole lot of things that I assume that you know a thing or two about before hand if not you might want to do some additional reading before reading the rest of this post. I have [getting started posts on threejs](/2018/04/04/threejs-getting-started/) and [javaScript in general](/2018/11/27/js-getting-started/), but there is also a lot of other things that I should write about in this first what to know first type section.

### Read My main blog post on the quaternion class

I have wrote a [main blog post on the Quaternion class in general](/2023/03/24/threejs-quaternion/) that you might want to read if you are new to this kind of class. Getting started with these was a little intense, but there is only so much to be aware of when it comes to getting started with a core set of methods and using these to help with tasks that have to do when setting the orientation of obejcts.

### Start out with Object3d.lookAt, Euler, and Buffer Geometry Rotation Methods

Quaternion objects are a more advanced option for setting the orientation of things in threejs. There are situations that come up where one of these kinds of objects will help, but still there are easier to work with options that one should know about first before getting into these kinds of objects. When it comes to [Object3d class based objects](/2018/04/23/threejs-object3d/) there is the [Object3d.lookAt](/2021/05/13/threejs-object3d-lookat/) method and the [Object3d.rotation](/2022/04/08/threejs-object3d-rotation/) property that stores and instance of the [Euler class](/2021/04/28/threejs-euler/) for setting the local rotation of an object. Also when it comes to mesh objects there is also the geometry of the mesh and with that there are a [number of rotation methods in the buffer geometry class](/2021/05/20/threejs-buffer-geometry-rotation/) for preforming a rotation on geometry rather than an object3d class based object such as mesh, camera, and so forth.

### Source code is up on Github

The source code examples that I am [writing about here can also be found up on github in my test threehs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-quaternion-slerp). This is also where I park the source code examples for my many [other blog posts on threejs](/categories/three-js/) that I have wrote thus far.

### Version Numbers matter

When I first wrote this blog post I was using r146 of threejs. There is a whole lot that has changed from older revisions of threejs, and also looking forward it would seem that many more code breaking changes will also happen in the future as well. Always be mindful of what the revision number of threejs is being used when looking at source code examples on various resources as this is a very fast moving project still.

## 1 - Basic example of the slerp method

For this first basic example of the slerp I create two quatrenion objects and slerp from one to another when setting the quaternion state of a mesh object. To create these quaternion objects I am making use of the set from axis angle method to do so as one way or another I need to set the state of the objects first. Once I have two quaternion objects I can then use them to update the quaternion object of the mesh object by copying the first quaternion to the quaternion of the mesh, after which I can then call the slerp method and pass the second one. I then pass an alpha value as the second argument for the slerp method of 0.5 which should result in the state of the mesh object being between the two quaternions and it is.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    material);
scene.add(mesh);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const axis1 = new THREE.Vector3(0,1,0);
const q1 = new THREE.Quaternion().setFromAxisAngle(axis1, 0);
const axis2 = new THREE.Vector3(1,0,0);
const q2 = new THREE.Quaternion().setFromAxisAngle(axis2, THREE.MathUtils.degToRad(90) );
mesh.quaternion.copy(q1).slerp(q2, 0.5)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3,3,3);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```