---
title: Matrix4 Objects in threejs
date: 2023-08-02 11:47:00
tags: [three.js]
layout: post
categories: three.js
id: 1065
updated: 2023-08-03 10:19:26
version: 1.2
---

As of late I have wrote a new post on the [object loader](https://threejs.org/docs/#api/en/loaders/ObjectLoader) in threejs, and I noticed that when using the toJSON method of an object3d class based object a matrix key is created. In addition there are no keys for position, rotation, quaternion, or scale in this output. This is because all of this can be stored as a single array value that in turn can be used to create an instance of the [Matrix4 class](https://threejs.org/docs/#api/en/math/Matrix4) which is the value for the matrix property of an object3d class based object.

Turns out that I have not played around with these matrix4 objects much just yet, so I thought that it would be good form to at least start a blog post on this subject to start with.


<!-- more -->

## Matrix4 objects and what to know before getting started

In this post I am writing a thing or two just about the Matrix4 class for the most part along with some closely related topics while I am at it. I would say that the subject of Matrix4 objects is a more advanced topic of interest when it comes to the use of threejs, so there are some things that you might want to read up on more before hand if you have not done so. It should go without saying but yes this is not a post for people that are new to threejs, let along client side javaScript in general

### Vector3 class, Object3d.position, and Object3d.scale

A Matrix4 object can be used to store position and scale of objects and when it comes to the Object3d.position and Object3d.scale properties of Objecrt3d class based objects such as Mesh objects the values of these properties are Vector3 objects. There is a lot that one should be aware of when it comes to [Vector3 objects](/2018/04/15/threejs-vector3/) as well as with Vectors in general such as the Vector2 and Vector4 classes.

### Euler Objects, Quaternion, Object3d.rotation, and Object3d.quaternion

On top of storing position and scale, Matrix4 objects also store the orientation of objects as well in the form of a Quaternion component. If you have no idea what a Quaternion Object is then it would be a very good idea to [look into the Quaternion class](/2023/03/24/threejs-quaternion/) at this point. Also if you experience thus far with setting orientation is just using the [Obejct3d.lookAt method](/2021/05/13/threejs-object3d-lookat/), then it might be best to look into the [Euler class](/2021/04/28/threejs-euler) first before reading about Quaternion Objects. This all has to do with setting the local rotation of objects of course and with that said there is the Object3d.rotaiton property that stores the local rotation of the object in the from of a Euler Object. There is also the Object3d.quaternion property that stores the local rotation in the from of Quaternion as well.

### The Object Loader and Object3d.toJSON

For me what got me into Matrix3 objects is the fact that the toJSON method of the Object3d class will create JSON.stringify friendly objects that have a matrix property, and this property alone. The toJSON method then works that way rather than having a position, scale, and then rotation or quaternion key. So then there is learning a thing or two about matrix4 objects, or writing my own toJSON method that creates the alternative set of keys. The toJSON method of the Object3d class is one way to generate JSON data that will play nice with the [THREE.ObjectLoader class](/2023/07/19/threejs-object-loader/). What I like about this loader is that it is a way to load external data for objects and with that everything else of interest that built into the core of the threejs library itself.

### Source code is also up on Github

In my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-matrix4) there are also copies of the demos that I am writing about in this post. With that said this repo is also where I have all the other demos for every [other threejs post that I have wrote](/categories/three-js/) over the last few years. In some cases the versions of the examples there might be more up to date than what is here. In nay case this is also where I place additional notes where I outline plans for future edits of this post if any, and so forth.

### Version Numbers matter

When I first wrote the demos for this post I was following my r152 style rules, and with that I was also using that revision alone when testing these out. You can check out my [README on the details of my r152](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) style rules, but to save you a click the main thing about this is that I am now using three.module.js and with that module type script tags. It is not to hard to get these working with some older revisions of threejs, but there will be a point at which the examples will break. Also at some point in the future the demos where will also break with new revisions as well as threejs is still a very fast moving project.

## 1 - Basic Matrix4 Examples

One will need to start somewhere when it comes to these Matrix4 objects, and with that said this section will be just that for this general threejs topic. There are just a few methods and features that are needed to get started that I will at least be touching base on here. Also I will be doing my best to keep these examples as simple as possible, leaving more advanced examples for later sections in the post.

### 1.1 - Getting started with Matrix4 with the compose method, and Object3d.applyMatrix4

Thus far I think the best way to get started with this is to use the compose method of the Matrix4 class. This compose method can be used to set the state of a Matrix4 object by passing a Vector3 object as the first argument that will be the position value, a quatrenion object as the second argument that will be orientation, and a final Vector3 object that will be the scale of the object. Once I create a new Matrix4 object I can call this compose method and then pass the arguments that I want to set the matrix state that I want. Then I will want to do something with that matrix4 object such as using it to set position, orientation, and scale of an Object3d class based object such as a mesh object. For this task I can use the apply matrix4 method of the object3d class to so just that.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild( renderer.domElement );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh_box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial() );
scene.add(mesh_box);
// ---------- ----------
// MATRIX4
// ---------- ----------
const matrix = new THREE.Matrix4();
// using the compose method, and Object3d.applyMatrix4
const v3_pos = new THREE.Vector3(0, 0.8, 0);
const q_ori = new THREE.Quaternion().setFromEuler( new THREE.Euler( 1, -0.5, 0) );
const v3_scale = new THREE.Vector3( 1, 0.1, 1 );
matrix.compose(v3_pos, q_ori, v3_scale);
mesh_box.applyMatrix4( matrix );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set( 2, 2, 2 );
camera.lookAt( mesh_box.position );
renderer.render(scene, camera);
```

## Conclusion


