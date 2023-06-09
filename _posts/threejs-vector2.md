---
title: The Vector2 class for 2D curves, mouse pointers, ect
date: 2023-06-09 07:13:00
tags: [three.js]
layout: post
categories: three.js
id: 1050
updated: 2023-06-09 07:59:55
version: 1.2
---

There are a number of Vector classes in threejs such as Vector3 that is a class for a 3D vector in space which is to be expected for such a library. However there is also a Vector4 class that comes up when starting to work with quaternion objects, and also a plain old Vector2 class as well. With that said in this post I am going to be writing a thing or two about the [Vector2 class](https://threejs.org/docs/#api/en/math/Vector2), and some typical situations in which this kind of class can prove to be useful.

<!-- more -->

## The Vector2 class and what to know first

I will not be getting into the [very basics of threejs](/2018/04/04/threejs-getting-started/), as well as client side javaScript here of course. However there are a whole lot of other topics to which I should at least mention in an opening getting started type section in this post. Creating a instance of THREE.Vector2 is simple enough, but there are a whole lot of other things that branch off from that when it ccomes to how these objects are used with various features of the over all library.

### Check out THREE.Shape, THREE.ShapeGeometry, THREE.ExtrudeGeometry, and THREE.LatheGeometry

There are a number of ways to go about making 3D geometry with 2D lines and curves that are created in part by using the THREE.Vector2 class. An array of Vector2 Objects can be passed to [THREE.Shape](/2021/06/01/threejs-shape/) as a way to make that kind of object which in turn can be passed to a built in geometry class like THREE.ShapeGeometry to create a kind of plain geometry of that shape. There is also the THREE.ExtrudeGeometry geometry that can also take that shape object and create and extrude geometry from it. Another real cool built in geometry constructor is [THREE.LatheGeometry](/2023/07/23/threejs-lathe-geometry/) that can be used to create a 3D shape by spinning the 2d shape along an axis of sorts by a given number of segments.

I will be touching base on some of these features in this post of course. However it is still worth reading more about these in detail as there is a lot to be aware of with them. For example there is just using the THREE.ExtrudeGeometry to create a 3D object from a 2d Shape, but then there is getting into writing a custom UV generator for it.

### Read up on the UV attribute of the Buffer Geometry class.

Most of the attributes of a Buffer Geometry have an item size of 3, which means it is for the most part the Vector3 class that is used as a tool to help in the process of creating and updating these kinds of attributes here and there. However there are some exceptions to this, and maybe the most note worthy attribute would be the [UV attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) which very much has an item size of 2. Thus it is the Vector2 class that would typically be used in the process of working with these kinds of attributes.

### Source code is up on Github

The source code examples that I am writing about in this post can also be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector2) on github. This is also where I park the source code examples for all the [other posts I have wrote on threejs](/categories/three-js/) as well.

### Version Numbers Matter

When I first wrote this post I was using [r152 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md).

## 1 - Basic examples of the Vector2 class

For this first Basic section I will be starting out with a few examples in which I am making 3D shapes by making use of the Vector2 class. There are a number of built in options for making quick work of this kind of thing without having to work out any kind of custom solution with a blank buffer geometry class. There are a lot of other use cases of THREE.Vector2 that I might get to in other sections, but one has to start somewhere.

### 1.1 - When using the THREE.LatheGeometry Constructor

The THREE.LatheGeometry constructor is a great way to make a 3D shape from an array of Vector2 objects that are created by one means or another.

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
const v2array = [
   new THREE.Vector2( 0, 1 ),
   new THREE.Vector2( 1, 0.5 ),
   new THREE.Vector2( 0, -1 )
];
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
const line1 = new THREE.Line(geometry);
scene.add(line1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 2, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Making 2D curves and using them with THREE.LatheGeometry

Another way to go about creating an array of vector2 objects would be to create a 2D curve, and then use the getPoints method of the curve to get the array. This will work fine as long as I am okay with having a fixed delta between each point alone the curve, and in the even that it is not there is using the get point method of the base curve class along with any custom logic that will give me the deltas that I want. However this is still very much a basic example so I will not be getting into any of that here.

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

That will be it for now when it comes to this general overview post of the Vector2 class. I am sure that I will be expand on this post a bot more now and then as I write new content, as well as edit older content that is relevant to the use of Vector2 Objects.

