---
title: Vector3 in three.js for points in space
date: 2018-04-15 20:18:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 175
updated: 2021-05-02 12:51:07
version: 1.12
---

In [Vector space](https://en.wikipedia.org/wiki/Vector_space) you have one or more objects that can be called Vectors. In [three.js](https://threejs.org/) there are a few constructors that can be used to created these objects which can be used for many properties of objects in three.js. One major property of interest is the position property of a mash, or anything that is based off of the Object3d class. The position property is an instance of vector3 and that instance can be used to set the position of the and object like a mesh, camera, group, r a whole scene actually.

This post is about the [Vector3](https://threejs.org/docs/index.html#api/math/Vector3) constructor that is useful in 3d space. A 3d Vector3 Instance consists of an x,y, and z value which makes it useful for plotting a single point in 3d space. It also has a few more uses, such as finding [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) via the length method of the Vector3 instance, which is the distance from the vector to the origin (0,0,0).

<!-- more -->

Vector3 instances are also used when creating geometry that will be used in a mesh, and there are also many properties in various objects that expect an instance of Vector3. There also have a whole bunch of useful methods that can be used for typical tasks such as finding the distance between two points in space.

## What to know

This is an advanced post on three.js in which I am writing about the Vector3 constructor, this is not a simple [getting started post](/2018/04/04/threejs-getting-started/) on three.js, or javaScipt in general. Vector3 instances are used in the process of making custom geometry, I will not be getting into that in depth, or many of the other use cases for Vector three. This post will focus on what there is to know about the constructor.

## Three.js version number matters.

Three.js is a project where the version number matters, in this post I am using [r91](https://github.com/mrdoob/three.js/tree/r91), if the code examples in this post or [any three.js post](/categories/three-js/) of mine that might be a reason why.

## Basic example of Vector3

To create a single instance of Vector3 I just need to call the constructor ans pass three arguments that are the x,y, and z values of the vector.

```js
    var r = Math.PI / 180 * 45,
    x = Math.cos(r),
    y = Math.sin(r),
 
    vec = new THREE.Vector3(x, y, 0);
 
    console.log(vec.isVector3); // true
    console.log(vec.x, vec.y, vec.z); // 0.70... 0.70... 0
    console.log(vec.length()); // 1
```

There are for the most part only 3 properties of a Vector3 instance that are of interest in most situations which of course is the x , y, and z properties. To my knowledge there are only four properties in total, the fourth being the isVector property which should always be true. Every thing else of interest in a Vector3 instance is a method, such as the length method that will give the current Euclidean distance, or distance from the origin.

## Setting the values of Vector3

Setting the values of a Vector3 instance can be done by just setting the values directly, there is also the set method.

```js
var vec = new THREE.Vector3();
v.set(7,12,3);
v.x += 3;
console.log(vec.x, vec.y, vec.z); // 10 12 3
```

## Object3d and vector3

A very important base class in three.js is [Object3D](https://threejs.org/docs/index.html#api/core/Object3D). Many constructors in three.js such as Camera, Mesh, ect inherit from Object3d. The reason why I bring this up is becuase there are a few properties in this base class the expect an instance of Vector3. Manly Object3D.position, and Object3D.scale.

```js
    var obj = new THREE.Object3D();
 
    // {"x":0,"y":0,"z":0}
    console.log(JSON.stringify(obj.position));
 
    obj.position.set(1, 2, 3);
 
    // {"x":1,"y":2,"z":3}
    console.log(JSON.stringify(obj.position));
```

Because Vector3 is the constructor that is used to represent a point in 3d space in three.js, it's use is to be expected in any situation in which its use is appropriate. Therefor it pays to have a solid foundational understanding of this constructor.

## Adding, diving, and multiplying Vectors

Vectors can be added together with the add method, which is pretty straight forward. There are also methods for diving, and multiplying as well.

```js
    var vec = new THREE.Vector3(.25, 1, 5);
    vec.add(new THREE.Vector3(.25, 1, 2));
 
    console.log(vec.x, vec.y, vec.z); // 0.5 2 7
```

To quickly add a scalar values to all three values there is addScalar.

```js
    // addScalar
    var vec = new THREE.Vector3(3, 3, 7);
    vec.addScalar(10);
 
    console.log(vec.x, vec.y, vec.z); // 13 13 17
```

## Finding the distance between two vectors.

The length method of Vector3 returns the distance from the origin, but what if you want the distance from another instance of Vector3? For that there is the distance method.

```js
var a = new THREE.Vector3(10, 10, 10),
b = new THREE.Vector3(10, 5, 10);
console.log(a.distanceTo(b)); // 5
```

## Clone, and Copy

If you want to make an independent copy of a vector you can use the clone method, and if you want to copy in the values of one vector into another there is the copy method.

```js
    // clone
    var original = new THREE.Vector3(10, 10, 10),
    copy = original.clone();
    copy.x += 5;
 
    console.log(copy.x); // 15
    console.log(original.x); // 10
 
    // copy
    var a = new THREE.Vector3(1, 2, 1),
    copy = new THREE.Vector3().copy(a);
    copy.z += 2;
 
    console.log(a.z); // 1
    console.log(copy.z); // 3
```

Remember that objects are copied by reference in in javaScript so you will want to use one of these methods or some other similar method to make copies of a vector.

## Normalize a Vector

Normalizing a vector will keep it's direction from the origin the same, but change its distance from it to 1.

```js
    var vec = new THREE.Vector3(7, 7, 7);
 
    console.log(vec.length()); // 12.12...
 
    vec.normalize();
 
    console.log(vec.x, vec.y, vec.z); // 0.57... 0.57... 0.57...
    console.log(vec.length()); // 1
```

## Create Geometry Vertices with Vector3

Although I will not be getting into making custom geometry in detail, doing so will often involve the use of Vector3 to create the array of vertices. The faces will then reference them by the index value of the vertex in the vertices array of the geometry.

```js
    var geometry = new THREE.Geometry();
 
    // create vertices with Vector3
    geometry.vertices.push(
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1));
 
    // faces are made with the index
    // values of from the vertices array
    geometry.faces.push(
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4));
 
    geometry.normalize();
    geometry.computeFlatVertexNormals();
```

## Making Lines with Vector3

Read my [full post on lines](/2018/04/19/threejs-line/).

So now that you have at least the basic idea of Vector3 down, another typical use example of the use of Vector3 is to make lines. There are a number of ways to make 3d, and 2d lines in three.js. However maybe the most important way to do so is with the Line constructor.

Doing so is not so different from making a custom geometry that will be used in a material that renders faces. The main difference is that you only really have to work about the array of vertacies, and not at all about the faces if there is not going to be any. There are two special materials that can be used with the Line constructor that are in place for this purpose that do not make use of faces, and are there purely for lines only.

```js
var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(0, 10, 0));
 
scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 0x0000ff
})));
```

## Changing a Vector3 value in a geometry

This can be done by having a reference to the vertex that you want to change, and then just go ahead and change it's position with the set method, or any other method that will have an impact on it's values. When doing this the changes might not take effect with respect to the instance of geometry, so you will need to make sure that the verticesNeedUpdate property of the geometry is set to true.

```js
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(0, 3, 3);
    camera.lookAt(0, 0, 0);
 
    // a SPHERE
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0x0f0f0f,
                wireframe: true
            }));
 
    scene.add(sphere);
 
    // THE VECTOR
    var v = new THREE.Vector3(1, 0, 0);
 
    // geometry that is using the VECTOR
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0), v);
 
    // using the geometry in a line
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
 
    scene.add(line);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var frame = 0,
    maxFrame = 100,
    per = 0,
    bias = 0;
    var loop = function () {
 
        requestAnimationFrame(loop);
 
        var radian = Math.PI * 2 * per,
        radius = .25 + .75 * bias,
        x = Math.cos(radian) * radius,
        y = Math.sin(radian) * radius,
        z = radius,
        s;
 
        // change the vector
        v.set(x, y, z);
        s = v.length();
 
        // geometry needs an update
        geometry.verticesNeedUpdate = true;
 
        sphere.geometry.normalize();
        sphere.geometry.scale(s, s, s);
 
        renderer.render(scene, camera);
 
        frame += 1;
        frame = frame % maxFrame;
        per = frame / maxFrame;
        bias = Math.abs(.5 - per) / .5;
 
    };
 
    loop();
}
    ());
```

It can go without saying that doing this can result in something that might eat up a lot of overhead, but is necessary from making things that mimic fabric, and the surface of water.

## Conclusion

Vectors are a big part of working with three.js, all the objects contain them as a way of defining points in space. Many properties of Objects are instances of Vector three as well such as Object3d.position that can be used to set the position of a Mesh, Camera or any other find of Object in a Scene. So having a solid understanding of where there is to work with when it comes to Vector three is important, as it will come up often.