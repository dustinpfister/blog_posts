---
title: Lathe Geometry in threejs
date: 2023-06-07 10:38:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1048
updated: 2023-07-31 10:44:50
version: 1.9
---

The [lathe geometry class](https://threejs.org/docs/#api/en/geometries/LatheGeometry) in threejs can be used to create a geometry using an array of 2d points that define a line that is to be repeated along an axis to form a solid shape. For example there is creating an array of vector2 objects that form an arc of a half circle and then using that as a way to form a sphere by passing this array of Vector2 object to the THREE.LatheGeometry constructor along with additional arguments that define the number of segments, and a start and length phi value.

There are all kinds of 3d shapes that can be formed by just coming up with a new 2d path of some kind, and passing it to the lathe geometry constructor. In fact the threejs core built in [capsule geometry](/2022/07/22/threejs-capsule-geometry/) class is just an extension of the Lathe Geometry class. When it comes to making an array of vector2 objects there is just working out some expressions and helper functions to create the array of THREE.Vector2 objects, or there is using a 2d curve and calling the getPoints method or some other means when working with curves.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/6by7fIcSfJA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Lathe Geometry and what to know first

In other to get started with lathe geometry there is a whole lot of things that you might want to read up more on before getting into it. Also in any case there might be some closely related subjects that you might want to refresh on, or at least be prepared to do so to say the least. I have all ready wrote a blog post on [getting started with threejs](/2018/04/04/threejs-getting-started/) that I come around to edit a bit often so I will assume that you have the very basics down at least. So in this section I will just touch base on a few topics that are very relevant to Lathe Geometry alone.

### Read About the Vector2 class and vectors in general

There is reading a thing or two about the [Vector2 class](https://threejs.org/docs/#api/en/math/Vector2) of threejs which is the kind of object that will be used to create all the elements of the points array that will be passed to THREE.LatheGeometry. There are a wide range of useful prototype methods to work with in this class that can be used when creating these kinds of arrays by way of some custom javaScript code rather than just using a curve alone with the getPoints method.

### There is knowing a thing or two about curves

Although what needs to be passed to the late geometry is an array of Vector2 objects that can be created by a wide range of ways. I have found that the [base curve class](/2022/06/17/threejs-curve/), and the various built in extensions of the base curve class are very useful tools for doing what I want to create a 2d path. The getPoints method of the base curve class, or the getSpacedPoints method of the [curve path class](/2023/06/01/threejs-curve-path/) can be used to quickly create an array of vector2 objects from a curve. Also if for some reason I need to do some custom spacing between points along the curve I can do so with the getPoint method of the base class. Just about all of the time the built in options for curves work just fine for what I want to do, and in the event that they do not there is cretaing a custom extension of the base curve class.

### Source code examples are up on Github

The source code examples that I am writing about for this post can also be found in [my test threejs repo up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-lathe-geometry). This is also the repo where I place the source code examples for all the [other blog posts that I have wrote on threejs](/categories/three-js) over the years.

### Version Numbers matter

When I first wrote this blog post I was [using r152 of threejs and this was following the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) that I set for that revision.

## 1 - Basic Lathe Geometry examples

For this section I will be starting out with some very simply lathe geometry examples. The first step is to one way or another find a way to create the array of vector2 objects that are to be used to be used as I will want to have that to pass as the first argument. Once I have the vector2 array there is then just the question of what the additional arguments are and what I might want to adjust when it comes to those values.

### 1.1 - Create a V2Array

First things first, before I even call the Lath Geometry constructor function I will first need an array of Vector2 objects to pass as the first argument. For this example I am using array split, [array map](/2020/06/16/js-array-map/), and parseFloat as ways to create the data that I will then feed to a few calls of THREE.Vector2 to get the values that I want. This way if I want to start making more complex shapes this way is just a matter of punching in more values in the string that I am creating the v2 array from. If you find this to be a little to involved for a basic example no problem if you would like to just call THREE.Vector2 for each element and use the array literal syntax that will work just fine also.

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
// V2ARRAY
// ---------- ----------
const v2array = '0,2:1,0:0,-2'.split(':').map((str) => {
    const a = str.split(',');
    return new THREE.Vector2( parseFloat( a[0]), parseFloat( a[1] ) );
});
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_lathe = 20;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const points1 = new THREE.Line(geometry);
scene.add(points1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 2, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Using an arc curve

For this example I am making use of an ArcCurve that is one of the built in options for 2d curves in threejs. When I use this Arc curve with certain values for the start and end radian values I can get a half circle. The use of the half circle as a way to create the Vector2 objects can then be used with the lathe geometry as another way to create a kind of [sphere geometry](/2021/05/26/threejs-sphere/).

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
const curve = new THREE.ArcCurve(0, 0, 5.5, Math.PI * 1.5, Math.PI * 0.5, false);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_curve = 10;
const v2array = curve.getPoints(segments_curve);
const segments_lathe = 10;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10, 10 ) );
const material = new THREE.MeshNormalMaterial({ wireframe: true, wireframeLinewidth: 3 });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(9, 6, 9);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Using an Ellipse Curve

The ArcCurve class is actually just an abstraction for the Ellipse Curve class, so there is skipping the middle man and just working with that in place of the ArcCurve class. If I still want to make a sphere this way I can just set the same value for both radius values. However I can also of course use differing values to end up getting [Oblate spheroid](https://simple.wikipedia.org/wiki/Oblate_spheroid) shapes.

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
const x = 0, y = 0;
const radius1 = 6, radius2 = 3;
const curve = new THREE.EllipseCurve(x, y, radius1, radius2, Math.PI * 1.5, Math.PI * 0.5, false);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_curve = 50;
const v2array = curve.getPoints(segments_curve);
const segments_lathe = 50;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
// light
const dl = new THREE.DirectionalLight(0xffffff, 0.8);
dl.position.set(-7,5,3)
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.005);
scene.add(al);
// mesh
const material = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0x8a8a8a});
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(9, 6, 9);
camera.lookAt(0, -1, 0);
renderer.render(scene, camera);
```

### 1.4 - Using Curve Paths

I do not have to just go with one kind of curve or another mind you, there is also curve path objects as well. This allows for me to make a curve of curves using such options as LineCurve and QuadraticBezierCurve to create for example a kind of bowl like shape.

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
// CURVE/V2ARRAY
// ---------- ----------
const v1 = new THREE.Vector2( 0, 0 );
const v2 = new THREE.Vector2( 0.5, 0 );
const v3 = new THREE.Vector2( 0.5, 0.5);
const v4 = new THREE.Vector2( 0.4, 0.5);
const v5 = new THREE.Vector2( 0.2, 0.1);
const v6 = new THREE.Vector2( 0, 0.1);
const vc1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector2(0.25,-0.1) );
const vc2 = v4.clone().lerp(v5, 0.5).add( new THREE.Vector2(0.25, 0) );
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve( v1, v2 ) );
curve.add( new THREE.QuadraticBezierCurve(v2, vc1, v3) );
curve.add( new THREE.LineCurve( v3, v4 ) );
curve.add( new THREE.QuadraticBezierCurve( v4, vc2, v5 ) );
curve.add( new THREE.LineCurve( v5, v6 ) );
const v2array = curve.getPoints(20);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_lathe = 80;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(1, 0, 3)
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.01) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0x8a8a8a, side: THREE.FrontSide }) );
scene.add(mesh1);
mesh1.scale.set(2,2,2)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 1);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
```

## Conclusion

The Late geometry class is then a very useful tool for quickly making just about any kind of shape that can be made from a 2d path that is then rotated around on an axis. There are limitations though and I have a few ideas for another kind of geometry that is like lathe geometry only with more features that have to do with having custom phi values.


