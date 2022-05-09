---
title: The Box3 class in threejs.
date: 2022-05-09 08:57:00
tags: [js,three.js]
layout: post
categories: three.js
id: 985
updated: 2022-05-09 09:16:58
version: 1.4
---

The [box3 class in the javaScript library known as threejs](https://threejs.org/docs/#api/en/math/Box3) is a way to create a box in the from of a min and max instance of the Vector3 class. This Box can then be used for things like getting another Vector3 instance that is the size of the box. There is creating a new instance of the box3 class and then using that as a way to preform some kind of an action on an object such as scaling that object to the size of the instance of the box3 class. There is also creating an instance of box3 from an object that all ready exists in a scene, and doing something else with that kind of box such as suing it to position an object in space for example. There are many other use case examples of this class, so it goes without saying that I should write at least one if not a few posts on this class, so to start off with that I am writing this post.

<!-- more -->

## The Box3 class in threejs and what to know first

The content of this blod post has to do with a general overview of a single class in a javaScript library known as threejs. This is then not a post intended for people that have no experience at all with threejs, let alone with javaScript in general. You should have some background with javaScript and client side web development in general, also there are a lot of additional things you should be aware of with threejs also. I will nt be getting into detail with everything that you should be aware of at this point, but I often use this first section to quickly mention some things you might want to read up more on before hand if you have not done so.

## 1 - Basic scaling a mesh object example of the Box3 class 

I have wrote a [post a while back on the scale property of the object3d class](/2021/05/11/threejs-object3d-scale/) which is a way to go about setting the scale of any object based off of object3d, such as a Mesh object, or a Group object for example. This scale property contains an instance of the Vector3 class that by default should have a value of 1,1,1 which means the normal scale of the object. As one would expect by changing these values up or down that will change the scale up and down.

Anyway one basic use case example of the THREE.Box3 class would be to use it to create an instance of Box3 from scratch by creating two Vector3 instances for the min and max arguments of the Box3 constructor function. The get size method of the Box3 class can then be used to copy values to a Vector3 that are the size of the box, this in turn can be used with the copy method of the Vector3 class to set the scale property of a mesh object.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// CREATE A NEW BOX3
var min = new THREE.Vector3(-0.5, -0.75, -1.125),
max = new THREE.Vector3(0.125, 0.25, 0.5);
var box3 = new THREE.Box3(min, max);
// THE GET SIZE METHOD OF BOX 3
// can be used to copy a size to a Vector3 instance
var s = new THREE.Vector3();
box3.getSize(s);
// I CAN THEN USE THAT SIZE VECTOR TO DO
// SOMETHING LIKE SCALING A MESH OBJECT
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.scale.copy(s);
// render
renderer.render(scene, camera);
```
