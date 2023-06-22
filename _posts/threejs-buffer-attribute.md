---
title: Buffer Attributes in threejs
date: 2023-06-22 09:02:00
tags: [three.js]
layout: post
categories: three.js
id: 1054
updated: 2023-06-22 10:35:47
version: 1.5
---

In threejs buffer geometry objects are composed of at least one, but typically many instances of the [Buffer Attribute class](https://threejs.org/docs/#api/en/core/BufferAttribute). Each of the buffer attributes are used in the process of creating, and updating the [position of vertices](/2021/06/07/threejs-buffer-geometry-attributes-position/) in space, an [index to reuse such vertices](/2022/12/09/threejs-buffer-geometry-index/), [vertex normals](/2021/06/08/threejs-buffer-geometry-attributes-normals/), [uv mapping values](/2021/06/09/threejs-buffer-geometry-attributes-uv/), and much more actually. With that said having a solid grasp on what there is to work with, and be aware of in the buffer attribute class is necessary in order to create custom geometry, as well as update or extend, or debug problems with existing geometry.

<!-- more -->

## Buffer attribute objects and what to know first

This is a blog post on the subject of buffer attribute objects which is one of the kind of nested objects that one will find in an instance of buffer geometry when working with the javaScript library known as threejs. This is then not a post for people that are new to threejs, or client side javaScript in general. I will then not be getting into every little detail that you should know before hand in this post, however I do use these opening sections of my posts to write about a few closely related topics that you might want to read more about.

### Buffer Geometry Objects

As I have mentioned a few times now at this point, buffer attribute objects can be found in buffer geometry objects. These buffer attributes objects store the state of a geometry in the form of arrays of data for things like the points in space to begin with, and also just about everything else. Although I will be writing about a lot of examples that have to do with geometry here, this is still not a post that serves as an over all review of [buffer geometry in general as I have all ready wrote a blog post](/2021/04/22/threejs-buffer-geometry/) when it comes to that.

### Source code is up on Github

The source code examples that I write about in this blog post can also be [found in my test threejs repository](/https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-attribute) on Github. This is also the location where I place all the source code examples for the many other [blog posts that I have wrote on threejs](/categories/three-js/) as well.

### Be Aware of Version Numbers

When I first wrote this blog post I was using [r152 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md).


## 1 - Basic Examples of Buffer Attribute Objects.

For this first section of the post I will be starting out with just some basic examples of the buffer Attribute class. There are two general was of getting started with this kind of class, creating a custom geometry from the ground up, and mutation of a geometry that exists before hand. Sense this is very much a basic section custom geometries here will be very primitive and just contain a single attribute for the most part, mainly the position attribute. Other examples will involve working with buffer attributes that are contained in a buffer geometry object created with one of the many options when it comes to built in constructor functions such as the Sphere geometry constructor.

### 1.1 - Create custom geometry with just a position attribute and THREE.Points

When it comes to just creating a blank buffer geometry object by calling THREE.BufferGeomety buffer attributes must be crated from the ground up and then added to the geometry by making use of the set attribute method of the buffer geometry class. In order to use the set attribute method I first need to know what kind of attribute I want to add to the geometry, and then I also need a buffer attribute object.

For this demo I will just be creating a non indexed position attribute for a blank buffer geometry. When it comes to this kind of geometry it will not work so well with mesh objects, but it will work just fine with [THREE.Points](/2023/02/23/threejs-points/). In order to get a geometry to work well with a mesh object I will need more than just a position attribute.

Anyway in order to create this buffer attribute I will first need an array of points in space. There are a whole lot of ways to go about creating this kind of array, but for this basic example I will just be punching in a few values into a plain old javaScript array literal. However when it comes to passing data to the THREE.BufferAttribute constructor I can not just pass a plain old javaScript array, but rather a typed array. The kind of typed array to use might differ from one kind of attribute to another, but for the most part a Float32Array array will work just fine.

Once I have the array that I want to use together I can now call THREE.BufferAttribite, pass the array as the first argument, and then the item size of the attribute as the second argument. Sense this is a position attribute that I am creating I will want to pass the number 3 for the item size \( x,y,z \).

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
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// BUFFER ATTRIBUTE
// ---------- ----------
const data_pos = [ 0,0,0,  0,1,0,  1,0,0 ];
const array = new Float32Array( data_pos );
const item_size = 3;
const att_pos = new THREE.BufferAttribute( array, item_size );
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', att_pos);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points1 = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.25, color: 0x00ff00 }));
scene.add(points1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set( 2, 2, 2 );
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - The Vector3 from attribute method

There are a number of methods of various classes in threejs that will allow one to set the values of an instance of such an object bu passing a buffer attribute object and an item index of the attribute. For example say that I want to create a Vector3 object that has the values of the first vertex of a position attribute. To do so I can call the from buffer attribute method off of an instance of the Vector3 class, then pass the position attribute, and then the number zero which should be the first point in the attribute. The end result will the be a  vector3 object with the x, y, and z values having the sample values as that first point in the position attribute of the geometry.

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
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.SphereGeometry(0.25, 30, 30);
const att_pos = geometry.getAttribute('position');
let i = 0;
while(i < att_pos.count){
    const v = new THREE.Vector3().fromBufferAttribute( att_pos, i );
    v.normalize().multiplyScalar( 0.25 + 0.75 * Math.random() );
    att_pos.setXYZ(i,  v.x, v.y, v.z );
    i += 1;
}
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points1 = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.1, color: 0x00ff00 }));
scene.add(points1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set( 1.5, 1, 1.7 );
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - The needs update boolean of buffer attributes

The needs update boolean is what I will want to set to true when it comes to any kind of situation in which I am updating the state of an attribute and thus it will need to be resent to the GPU.

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
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
const att_pos = geometry.getAttribute('position');
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points1 = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.1, color: 0x00ff00 }));
scene.add(points1);
// ---------- ----------
// LOOP
// ---------- ----------
camera.position.set( 1.5, 1, 1.7 );
camera.lookAt(0, 0, 0);
const update = () => {
    let i = 0;
    while(i < att_pos.count){
        const v = new THREE.Vector3().fromBufferAttribute( att_pos, i );
        v.normalize().multiplyScalar( 0.25 + 0.75 * Math.random() );
        att_pos.setXYZ(i,  v.x, v.y, v.z );
        att_pos.needsUpdate = true;
        i += 1;
    }
};
const FPS = 4;
let lt = new Date();
const loop = () => {
    const now = new Date();
    const secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs >= 1 / FPS){
        update();
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```