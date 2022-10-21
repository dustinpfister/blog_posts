---
title: Quadratic Bezier Curves in threejs
date: 2022-10-21 07:42:00
tags: [three.js]
layout: post
categories: three.js
id: 1010
updated: 2022-10-21 09:00:16
version: 1.6
---

In threejs there is a base [Curve class](https://threejs.org/docs/#api/en/extras/core/Curve) as well as a number of classes that work on top of this Curve Class one of which is [THREE.QuadraticBezierCurve3](https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve3). This [Quadratic Bezier Curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) class creates a Curve that defines a Curve between a start point and end point along with a control point that will effect the curve. This Can then be used for anything the requires a curve such as the tub geometry constrictor function. There are also base curve class methods like the two points method that will return an array of vector3 objects that can then be used to define movement over time, or create a geometry by making use of the set from points method for example.

<!-- more -->

## THREE.QuadraticBezierCurve3 and what to know first

This is a blog post on the use of the THREE.QuadraticBezierCurve3 [constructor function](/2019/02/27/js-javascript-constructor/) in the javaScript library known as threejs. This is then not any kind of [getting started type post on threejs](/2018/04/04/threejs-getting-started/) let alone [javaScript](/2018/11/27/js-getting-started/) and any additional skills that are needed before hand. There is a whole lot of ground to cover first before getting into the use of Curves and I am not going to be getting into every little detail that you should know at this point. However I do always like to take a moment to write about a few key things you might want to learn about first, or brush up on once again when it comes to using the Quadratic Bezier Curve3 class.

### Read up more on the base Curve class

I wrote a post on the [base Curve class](/2022/06/17/threejs-curve/) all ready so that is something that you might want to read about a little first. The QuadraticBezierCurve3 class is a kind of Curve class so there is taking a moment to read about what there is to work with when it comes to curve objects in general. For the most part I do like to just use this QuadraticBezierCurve3 class for making curve objects, however there are a few other built in options for this, and if need be there is also making my own Curve classes as well based off the the main Curve class.

### The Vector3 class

The arguments that I give when calling the QuadraticBezierCurve3 function are instances of the [Vector3 class](/2018/04/15/threejs-vector3/), also I often want to create an array of Vector3 objects. This Vector3 class is worth checking out in detail then if you have not done so all ready.

### Source Code is up on Github

The source code examples that I am writing about in this [post can also be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-curve-quadratic-bezier-curve3).

### Version Numbers matter

When I wrote this post I was using r140 of threejs.

## 1 - Basic examples of THREE.QuadraticBezierCurve3

To start out with this I will want to have at least one if not more basic examples of the THREE.QuadraticBezierCurve3 constructor that will return a Curve object and thus can be used anywhere such an object is called for. For now I will be sticking with just the Quadratic Bezier Curve alone as a way to create curves saving curve paths for a later section. I will be touching base on things like creating a geometry from this Curve object, but will not be getting into advanced topics like updating a geometry and so forth.

### 1.1 - Single Quadratic Bezier Curve and Points

One has to start somewhere with this sort of thing and with that said here I have a simply hello world style example where I am creating a Quadratic Bezier Curve and then using the Get Points method of the base curve class to create an array of vector3 objects. This array of vector3 objects can then be used to create a geometry by calling the Buffer Geometry constructor function and then using the set from points method. The returned result is then a Buffer Geometry with a position attribute alone, so this might not work well with a Mesh object which requires a few more attributes, but it will work well with say the THREE.Points constrcuor.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(-5, 0, -5);
const vControl = new THREE.Vector3(5, 0, -5);
const curve = new THREE.QuadraticBezierCurve3( v1, vControl, v2);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
// points
const v3Array = curve.getPoints(50);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x00ff00, size: 0.25 }));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Curve Paths

The Curve Paths class is a way to create a Curve object that is not just one Curve but a collection of curves. I can create a single instance of this Curve Path class and then start adding curve objects to it, such as Curves created with the Quadratic Bezier Curve constructor. This sepeshail class that is curve that is then a collection of curves is then an impoatane t tool when it comes to using the Quadratic Bezier Curve class for one of the major use case examples that I would like to use if for as ofteh I will want to have not just one but many control points as well as start and end points that make up an over all curve. 

### 2.1 - Curve Path with Quadratic Bezier Curve and Points

There is creating an instance of a curve path by calling the [THREE.CurvePath](https://threejs.org/docs/#api/en/extras/core/CurvePath) constructor function, then I just need to start adding Curves to it with the add method of this class. For this I created an array with the values that I want to create a start point, and point and control point for each curve. In then just need to loop over this array and create the Vector3 objects that I then pass to the THREE.QuadraticBezierCurve3 constructor and then add each path to the Curve Path.

I can then use the Curve Path like that of any other Curve Object and as such all the Curve class methods are there to work with such as the Get Points method. However I have found that when using a method such as that the number that I give for the number of points will be for each curve object in the curve path rather than the curve path over all.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE PATH
//-------- ----------
const curvePath = new THREE.CurvePath();
[
    [5,0,5,0,2,-5,5,3,-5], // three each (x,y,z) for start, end, and control points
    [0,2,-5,0,1.5,0,-2,2,3],
    [0,1.5,0,3,1,1,0,-1,-11],
    [3,1,1,0,0,0,3,0,10]
].forEach((a)=>{
    const v1 = new THREE.Vector3(a[0], a[1], a[2]);       // start
    const v2 = new THREE.Vector3(a[3], a[4], a[5]);       // end
    const vControl = new THREE.Vector3(a[6], a[7], a[8]); // control
    curvePath.add( new THREE.QuadraticBezierCurve3( v1, vControl, v2) );
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// you can just use getPoints as a way to create an array of vector3 objects
// which can be used with the set from points method
const v3Array = curvePath.getPoints(200 / curvePath.curves.length);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3Array);
const points = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x00ff00, size: 0.25 }));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## Conclusion

This Quadratic Bezier Curve class is then a great way to go about creating curves that can then be used to create lines and points for a scene. There is the idea of using this in conjunction with additional code to create a geometry that would be used with a mesh object, however my real interest with this thus far has to do with having a system for defining the position, and rotation of objects over time. While I was writing this I was also working on an updated revision of my [sequence hooks module](/2022/05/12/threejs-examples-sequence-hooks/) that I use in just about all of my video projects. While working on it I was adding a new feature that had to do with creating paths that I then use to move objects, so curves are of interest when it comes to the use of this module.

