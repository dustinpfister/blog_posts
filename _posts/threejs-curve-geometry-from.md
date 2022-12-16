---
title: Using the curve class to create geometry in threejs
date: 2022-12-16 11:09:00
tags: [three.js]
layout: post
categories: three.js
id: 1018
updated: 2022-12-16 11:41:50
version: 1.1
---

The Curve class is the base class for several core threejs Clases to create a Curve in space. There is then a Cuve class prototype method called the get point method that can then be used to get any point along a curve in the form of a Vector3 object by passing a zero to one value as an argument. For the most part thus far I have been using curves as a way to define paths than can then be used to set the position of object3d objects over time such as mesh objects, and cameras. I have also been using curves to get vector3 objects that can then be passed to the look at method to set the rotation for objects also. However I have not yet got into using curves as a way to define the position attributes of custom buffer geometry which is what this post will focus on.

<!-- more -->


## 1 - Basic examples of making Buffer Geometry with Curves

There is starting out by making one or more curves and then just finding a way, any way at all to make a position attribute for a buffer geometry. When first starting out there is just having the position attribute alone, that might not work well with Mesh objects, but be good enough for Point or Line objects. So in this section I will be going over a few examples that just have to do with doing just this by making use of any and all Curve and Buffer Geometry class features to do so. I will then leave the more advanced examples that have to do with making a full geometry that will work with mesh objects for later, more advanced sections of this post.

### 1.1 - The Curve.getPoints and BufferGeometry.setFromPoints methods

There is a get points method pf the curve class that when called will return an array of Vector3 objects along the path of the curve. The count of the number of points will differ depending on an argument that is given when calling the get points method. This is not to be confused with the get point method that will return just one Vector3 object by way of a given 0 to 1 value. I would generally prefer the get point method over the get points method as it allows for more flexibility. However when it comes to making a fairly simple hello world typo example of making geometry with curves this would be a good place to start.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(6.5, 6.5, 6.5);
camera.lookAt(0, -3.25, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const geoFromCurve = (curve, detail) => {
    detail = detail === undefined ? 100: detail;
    return new THREE.BufferGeometry().setFromPoints( curve.getPoints(detail) );
};
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 0);
scene.add(dl);
const dl2 = new THREE.DirectionalLight(0xffffff, 1);
dl2.position.set(2, -1, 0);
scene.add(dl2);
// ---------- ----------
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,5), 
c1_control = new THREE.Vector3(0, 5, 0), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(0, -5, 0), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// LINES
// ---------- ----------
const material_line = new THREE.LineBasicMaterial({ linewidth: 8, color: 0xff0000});
const line1 = new THREE.Line( geoFromCurve(curve1, 50), material_line );
scene.add(line1);
const line2 = new THREE.Line( geoFromCurve(curve2, 50), material_line );
scene.add(line2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 2.1 - Full Custom Geometry

```js
```

### 3.1 - Video1 animation loop example based on custom Geometry example

```js
```


## Conclusion

