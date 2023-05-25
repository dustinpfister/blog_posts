---
title: 2D Quadratic Bezier Curves in threejs
date: 2023-05-25 07:43:00
tags: [three.js]
layout: post
categories: three.js
id: 1044
updated: 2023-05-25 13:57:35
version: 1.5
---

When it comes to curves in threejs there is the [base Curve class](https://threejs.org/docs/#api/en/extras/core/Curve), and then there are a number of both 3D as well as 2D curve classes that extend this base curve class. In this post I will be writing about one of the 2D built in options for curves which is the [Quadratic Bezier Curve class](https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve). This is a kind of curve in which I can give a start point, end point, and a single control point each of which are instances of the Vector2 class. It can be used by itself, or in combination with other options to create a curve path that will then be used in a number of situations in which I need a 2d path.

<!-- more -->


## The THREE.CurveQuadraticBezierCurve class in threejs and what to know first

There are a lot of things that I assume that you know a thing or two about before hand with threejs, as well as client side javaScript in general. Simply put this is not a post for people that are new to threejs as well as various other skills that are required before using any kind of javaScript library for that matter. I will not be getting into every little detail that should be known before hand in this post of course. However I do always like to write about a few subjects that you might want to read about more.

### Be sure to get solid with the base Curve class if you have not done so

The 2D Quadratic Bezier Curves is just one built in curve class that extends the base Curve class in threejs. So with that said it makes sense to learn at least a little about what there is to work with when it comes to the [base Curve class](/2022/06/17/threejs-curve/) in threejs.

### There is also the 3D form of the Quadratic Bezier Curve class

There is also a [3D form of quadraic bezier curves](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) which is often the case with many of these built in curve classes. This works more or less the same way as the 2d version only I will want to pass Vector3 objects rather than Vector2 objects, and the end result will be a 3D Curve that I would use for the various reasons why I would want that kind of curve.

### Source code is up on Github

The source code exmaples that I write about in this blog post can also [be found in my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-curve-quadratic-bezier-curve) on Github. This is also where I have the source code exmaples for my [many other blog posts on threejs](/categories/three-js/) that I have wrote over the years.

### Version Numbers matter

When I first wrote this blog post I was using r152 of threejs.

## 1 - Some Basic examples of 2D Quadratic Bezier Curves

These will then be a few getting started types examples of the 2D Quadratic Bezier Curve class. The main focus in this section then will be just creating an instance of the Curve to begin with, and not so much with other aspects of the library. With that said there are three arguments that must be given when making one of these kinds of curves each of which are instances of the Vector2 class. So I will have to cover at least a thing or two about Vector2 class features while I am at it here.

### 1.1 - Creating some Points

For this first example I will be creating an instance of the THREE.Points Object3d class based object rather that the usual Mesh object. When doing so I can use the set from points method of the buffer geometry class to create a geometry from a 2d curve. However in order to do so I will beed to call the getPoints method of the curve to do so first. And with that said in order to call that method I fill first need an instance of a curve to call the getPoints method.

So then with all of that said and put aside there is just creating the curve object to begin with. So then I will need three instances of the Vector2 class. The first one is the point in which the 2d curve will start, the second is a single control point, and the final one will be the end point. There are a great number of methods to work with to help in the process of creating a Vector2 object, such as the clone, lerp, and add methods that I am using to get the control point that I want here.

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
// CURVE
// ---------- ----------
const v_start = new THREE.Vector2(0, 0);
const v_end = new THREE.Vector2(5, 2);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector2(-5, 5) );
const curve = new THREE.QuadraticBezierCurve(v_start, v_control, v_end);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const points_along_curve = 20;
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( points_along_curve ) );
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const material = new THREE.PointsMaterial({ size: 0.3, color: 0xff0000 });
const points1 = new THREE.Points(geometry, material);
scene.add(points1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Shape Geometry example

Points are often a great way to start, but there is also having a way to go about making a geometry that will work okay with mesh objects. One option would be to make a Shape with some points created from a curve, and then use that to make an instance of shape geometry. When using shape geometry I will want to make sure that I set the side value of the mesh material that I use to THREE.DoubleSide as the mesh will not show up when viewed at certain angles otherwise.

When calling the THREE.Shape constructor I can pass an array of Vector2 objects as the first argument as a way to define the points of the 2d shape. So I can create a curve object with THREE.QuadraticBezierCurve, then use the getPoints method to get an array of Vector2 objects from that curve, which I can then use for this argument of THREE.Shape. Once I have the Shape Object I can then use that with HREE.ShapeGeometry to get a final buffer geometry which I can then in turn use with a mesh object.

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
// CURVE
// ---------- ----------
const v_start = new THREE.Vector2(0, 0);
const v_end = new THREE.Vector2(5, 3);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector2(-2, 1) );
const curve = new THREE.QuadraticBezierCurve(v_start, v_control, v_end);
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const v2array = curve.getPoints(50);
v2array.push( new THREE.Vector2(5, 0) );
const shape = new THREE.Shape( v2array  );
const geometry = new THREE.ShapeGeometry(shape);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({  side: THREE.DoubleSide }));
scene.add(mesh1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Some Lathe Geometry examples

Now that I have some basic examples out of the way, I should now start to go over a few examples in which many other aspects of the over all threejs library are used with this curve class feature. One thing that will come up in which I will want to use one or more 2d curves would be when working out something that makes use of the Lathe Geometry Constructor. This is a way to create a 3D geometry by way of a 2D shape that is then rotated around by a number of segments. For example I can create a sphere with this by creating a 2D curve of a half circle, and then create a number of sections with that. However when it comes to using Quadratic Bezier Curves this allows for a single control point  that can be used in turn to make some interesting shapes.

### 2.1 - Weird cone like shape with lathe geometry and a 2d curve

For this demo the aim is to just get started with the lathe geometry constructor and A Quadratic Bezier Curve. As always I will want to work out the curve that I want with the various Vector2 objects. Once I have a Curve I can then in turn use that to get an array of Vector2 objects which in turn can be passed as the first argument when calling the Lath Geometry constructor.

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
// CURVE
// ---------- ----------
const v_start = new THREE.Vector2(0, -2.5);
const v_end = new THREE.Vector2(0, 2.5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector2(5, 7) );
const curve = new THREE.QuadraticBezierCurve(v_start, v_control, v_end);
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const v2array = curve.getPoints(64);
const geometry = new THREE.LatheGeometry( v2array, 40 );
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({  side: THREE.DoubleSide }));
scene.add(mesh1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

That will be it for now when it comes to the 2D Quadratic Bezier Curve class in threejs at least. There is a whole lot more to write about when it comes to curves in both the 2D and 3D form in threejs, it is just that I think that there might only be so much to write about with this built in option for curves. There are other options of course such as [THREE.CubicBezierCurve](https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve) which allows for the use of two control points othe than that of just one. There are also a few more other options in terms of 2d curves, and also making a curve that is a colleciton of these curves when it comes ot the use of curve paths.

