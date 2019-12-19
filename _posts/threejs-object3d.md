---
title: The Object3D Base Class in three.js
date: 2018-04-23 19:35:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 180
updated: 2019-12-19 10:28:21
version: 1.17
---

The [Object3D](https://threejs.org/docs/index.html#api/core/Object3D) base class in [three.js](https://threejs.org/) is one of the most important classes to be aware of when making some kind of project involving three.js. It is in use in many objects in three.js including things like cameras, lights, and the the Meshes that are placed in a Scene. 

The Object3d class adds a whole bunch of common properties, and methods for any kind of object in a project that needs to have a position in the scene. Properties of the Object3d class can be used to set the position, and rotation of an object along with many other common things that are shared across all such objects in a scene. Once you know a thing or two about Object3D the same methods will work with any and all objects that inherent from Object3D, which is a lot so lets get started.

<!-- more -->

## 1 - What to know before hand

This is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), or javaScript in general. This post is on an advanced topic on [three.js](/categories/three-js/) and I expect that you have some basic working knowledge of what there is to know before hand. 

As with any post on three.js the version number matters a lot, in this post I am using [three.js r91](https://github.com/mrdoob/three.js/tree/r91). Threejs is a project in motion so if any code in this post or any other threejs post breaks it might very well be because of the version number.

## 2 - Basic example of Object3d using the position property

Typically I do not work with the class directly, I work with something that inherits properties and methods from Object3d. Still if for some reason I want to work with the class directly I can do so via the THREE.Object3d constructor.

```js
    // Object 3d position
    var obj3d = new THREE.Object3D();
 
    // {"x":0,"y":0,"z":0}
    console.log(JSON.stringify(obj3d.position));
 
    obj3d.position.set(3, 4, 5);
 
    // {"x":3,"y":4,"z":5}
    console.log(JSON.stringify(obj3d.position));
```

Here I made just a simple example where I am just playing with the position property, which is an instance of [Vector3](/2018/04/15/threejs-vector3/). Vector3 is yet another class in threejs that a developer should be familiar with as it has to do with a single point in 3d space, so it goes without saying that class will come up a lot also.

The position property of Object3d can be used to set the center point of the object in a Scene. In the case that the Object is a child of another object it would be the position relative to the parent Object.

## 3 - Rotation of an Object

Another property of the Object3D base class that I use often is the rotation property. This property expects an instance of the [Euler Class](https://threejs.org/docs/index.html#api/math/Euler), Which is the Class used in three.js that has anything to do with a set of [Euler Angles](https://en.wikipedia.org/wiki/Euler_angles).

```js
// creating an instance of Object3D
var obj = new THREE.Object3D();

//{"_x":0,"_y":0,"_z":0,"_order":"XYZ"}
console.log(JSON.stringify(obj.rotation));

obj.rotation.set(0, 0, Math.PI * 1.75);

// {"_x":0,"_y":0,"_z":5.497787143782138,"_order":"XYZ"}
console.log(JSON.stringify(obj.rotation));
```

I will not get into the Euler Class in detail here, but it is similar to [Vector3](/2018/04/15/threejs-vector3/) only when using the set method you want to give [radians](https://en.wikipedia.org/wiki/Radian) rather than, and x, y, z position in the scene.

## 4 - Examples of use in other constructors

There are many objects in three.js that inherit from object3D, which is why this is a good class to have a solid understanding of.

Camera's such as the perspective camera inherit from Object3D

```js
// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
// changing position of a camera
camera.position.set(3, 1, 3);
```

Anything that is contained in a mesh also inherits from the Object3d class.

```js
var low = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        emissive: 0x002a00
    }));
// changing position of a mesh
low.position.y = -1;
```

There are also various lights and helper objects also that all inherit from Object3d. So the Object3d class is a common class that can be used to move, and rotate any and all objects in a scene. 

## 5 - Full demo of Object3D that uses the class as a way to group

The [Three.Group](/2018/05/16/threejs-grouping-mesh-objects/) constructor also inherits from Object3d and is a way of grouping objects together into a collection. However the add method of Object3d is in all objects that inherit from Object3d, and as such grouping can be done with any such object, including just a stand alone instance of Object3d.

I try to make it a habit to have at least one copy and past working demo of what it is that I am writing about in each blog post of mine. In this demo I am making use of an instance of Object3D to group some cubes together. I am also working with many other objects that inherit from Object3D, using the position, and rotation properties often.

### 5.1 - A Create Cube Stack method

```js
// create cube stack method
var createCubeStack = function (original) {
    var stack = {},
    original = original || new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()),
    cube;
    // the group
    stack.group = new THREE.Object3D();
    // set method
    stack.set = function (per) {
        var bias = 1 - Math.abs(0.5 - per) / 0.5,
        arr = stack.group.children,
        len = arr.length;
        arr.forEach(function (cube, i) {
            var y = -len / 2 + i + 2 * bias;
            cube.position.set(0, y, 0);
            cube.rotation.set(0, Math.PI * 2 * (i / len) + Math.PI * 2 * per, 0);
        });
    };
    // create cubes for the group
    var i = 0,
    len = 3,
    per;
    while (i < len) {
        per = i / len;
        cube = original.clone();
        cube.position.set(0, -len / 2 + i, 0);
        cube.rotation.set(0, Math.PI * 2 * per, 0);
        stack.group.add(cube)
        i += 1;
    }
    return stack;
};
```

### 5.2 - The rest of the Object3d example

```js
// Scene
var scene = new THREE.Scene();
 
// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
 
var stack = createCubeStack();
 
scene.add(stack.group);
 
// Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// loop
var frame = 0,
maxFrame = 100;
var loop = function () {
 
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
 
    stack.set(frame / maxFrame);
 
    frame += 1;
    frame = frame % maxFrame;
 
};
 
renderer.render(scene, camera);
loop();
```

It may be true that Object3D by itself is not intended to be used from grouping as there is a separate constructor for that, called simply enough [Group](https://threejs.org/docs/index.html#api/objects/Group). Still Object3D by itself seems to work okay by itself good enough for this simple demo on Object3D.

## 6 - Conclusion

From here you might choose to make some more demos that have to do with exercising the use of working with objects in three.js. If you enjoyed this post you might also like to check out my [many other posts](/categories/three-js/) on the subject of threejs and javaScript.
