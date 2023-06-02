---
title: Tube Geometry in threejs
date: 2023-06-02 10:42:00
tags: [three.js]
layout: post
categories: three.js
id: 1046
updated: 2023-06-02 11:29:40
version: 1.1
---

In threejs there is the base curve class, along with a number of built in options that extend this base curve class to create paths in 2D and also very much 3D space. There are a whole lot of use case examples for these curves such as using them to move objects along a path, or use any point along a curve as a point of reference to have an object look at. However there is also using them to make geometry also by getting an array of Vectors for a 3d curve and then quickly creating a geometry with just a position attribute that will work fine with THREE.Points, or THREE.Line. However things can prove to get a little involved when it comes to making the kind of geometry that will work well with THREE.Mesh. There is working out some kind of project that has to do with using curves as a way to create a custom geometry, however maybe a good starting point for this sort of thing would be to just use the THREE.TubeGeometry class.

As the name suggests this built in geometry constructor will take a 3d curve as the first argument along with several other options arguments to create a geometry that is a kind of tube around a curve. As with many of the other built in options for geometry constructors it will also set up normal and uv attributes as well so one can quickly get up and running with this to create geometry around a curve. Also this kind of geometry can often serve as a nice replacement for THREE.Line or THREE.LineSegements as the full range options and features of mesh materials can be used, and also it can help to address the problem where line width will not always work on all platforms.

<!-- more -->

## Tube Goemetry and what to know first

I am making the assumption that you are beyond the basics when it comes to getting started with threejs and client side javaScript in general. If not sorry getting into that here is without question outside the scope of this post. However I do always like to take a moment to write about a few things that you might want to learn or refresh in these opening getting started typo sections of my threejs posts.

### Read up more on Curves in General

If you think you might need to learn more about curves in general I have a long, detailed [main blog post on curves](/2022/06/17/threejs-curve/) in which I think I cover most bases with curves in threejs. There is a whole lot to write about with them that I would like to now get into to much with this post as I would like to keep the focus more so with the nature of Tube Geometry alone.

### There is a lot to know with geometry in general as well

The Tube Geometry class is just one built in option for making geometry that extends the [base Buffer Geometry](/2021/04/22/threejs-buffer-geometry) class. What is nice about these built in options is that it can quickly help set up a position, normal, and uv attribute for a geometry. However in some cases these attributes might need to be adjusted, and also some times I might just need to make a full custom geometry from the ground up. There is also a lot to be aware of with both prototype methods of the buffer geometry class as well as values that are nested in a buffer geometry instance such as the buffer attribute class.

### Source Code is also up on Github

The source code examples in this post can also be found in the [folder that corresponds to this post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-tube-geometry) in my [test threejs repository](https://github.com/dustinpfister/test_threejs) on Github. This is also where I park the source code examples for all of [my other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers Matter

When I first wrote this blog post I was [using r152 of threejs and thus was following the style rules that I set for myself for that revision](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) of threejs when first writing these demos. This means that I am using module type script tags, and import maps when it comes to my html code. 

### 1.1 - Basic Tube Geometry Example

One has to start somewhere with everything, and when it comes to Tube Geometry apart from the usual objects that are needed for any threejs demo, I also need a curve to pass as the first argument. So with this first demo after creating the scene object, camera, and renderer I then create a curve object. For this curve object I went with [THREE.QuadraticBezierCurve3](/2022/10/21/threejs-curve-quadratic-bezier-curve3/) which is a nice built in curve class extension that takes a start point, end point, and a single control point as arguments.

Once I have a curve to use I can just pass that as the first argument when calling THREE.TubeGeometry to create the buffer geometry that will be used with a mesh object. There are then a number of additional arguments that can be used to adjust how many sections there will be along the tube, as well as for each ring of the tube as well. Other arguments have to do with setting the radius, and also if the ends should be closed or not.

Now that I have a geometry I can use it to create a mesh object by just passing the geometry as the first argument for THREE.Mesh, along with a material as the second argument. For this first basic example I am not doing anything fancy with materials and I am just going with the [THREE.MeshNormalMaterial](/2021/06/23/threejs-normal-material/) as I find that this is a nice option for just quickly seeing some depth without having to do anything to complex with light and textures. When I made the Tube geometry I went with leaving the ends open though, so I am setting the side option of the material to THREE.DoubleSide.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(-5,0,0);
const v_end = new THREE.Vector3(5,0,0);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-4,3,-5) );
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.75;
const radial_segments = 16;
const closed = false;
const geometry = new THREE.TubeGeometry(curve, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(7, 2, 7);
camera.lookAt(2, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

The Tube Geometry class is then the only Built in Geometry class that will create a geometry from a curve, well at least a 3d curve anyway. When it comes to 2d curves there is getting into the use of shape geometry, extrude geometry and lathe geometry. However that all might be things that I should get into in another post.
