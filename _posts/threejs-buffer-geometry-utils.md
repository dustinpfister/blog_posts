---
title: Merge geometry and more with Buffer Geometry utilities in threejs
date: 2023-08-31 13:35:00
tags: [three.js]
layout: post
categories: three.js
id: 1069
updated: 2023-09-03 12:42:12
version: 1.5
---

There is the core threejs library itself and then there is a whole lot of additional tools to work with as well that can be pulled from the threejs Gitbub repository. One of the manly assets that there are to make use of there is the [buffer geometry utilities module](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils). This module is packed with a wide range of utility methods that are bot backed into the buffer geometry class itself, but might still prove to be useful for many various cases. One method that I have used thus far is the merge Geometries method which as the name suggests is just simply a way to create a single geometry from an array of geometry objects. There are of course a whole lot of other tools in this module a such a I have started this blog post as a way to park some notes on this subject.


<!-- more -->

## Buffer Geometry Utils and what to know first

In this post I am writing about some features that have to do with the buffer geometry utilities module which is one of many additional JavaScript modules that can be found in the Github repository of the JavaScript library. So then this is not just on threejs itself, but an additional file that must be added on top of threejs alone. I also assume that you have a lot of background with the basics of threejs and client side JavaScript in general as well. If not sorry I can not cover every little detail that should be known before hand here. However I will write about a few things that you might want to look into more in this opening section if you have not done so before hand.

### Read more about Buffer Geometry in general

You might want to read my [main blog post on buffer geometry](/2021/04/22/threejs-buffer-geometry/) in general in order to gain a solid general knowledge of buffer geometry objects. There is a whole lot to be aware of when it comes to these objects of course to begin with before getting into using the tools in this extra set of tools.


### Source examples can also be found in my test threejs github

I also keep copies of the examples I write about here in the [corresponding folder that I have in my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-utils). This repo is also where I park the source code examples that I have wrote on all the [other posts that I have wrote on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first wrote this post I was using [r152 of threejs, and with that I was following the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) that I have set for myself for that revision number. This also means that I am using the module format of threejs itself, and also when it comes to the additional buffer geometry utils as well. If you are using an older version of threejs you might be able to fine plain old javaScript mime type script tag friendly forms of the buffer geometry utils module, but that depends on how old. The js folder in the examples folder of the threejs repo was removed in r148. So if you are using r148+ you will need to use module type script tags.

## 1 - Basic Examples of Buffer Geometry Utils

For this section I will be starting out with just a few basic examples of what there is to work with in the buffer geometry utils module. Some of the tools to work with might require a lot of additional aspects of things to be aware of so I will not be getting to everything here. Even with the features that I will be getting to in this section there might end up being additional issues that will have to be addressed. For example there is just merging two geometries together as one, however I am sure there will be a lot of situations in which you will still want to edit things a bit more beyond that.

### 1.1 - The Merge Method

So say that you have to buffer geometry objects and you just simply want to merge them together into just one geometry. This might prove to be complicated and I am sure there will be many cases in which there will be additional issues that will need to be addressed. However in somecases if you are lucky, you might just be able to use the merge method in the buffer geometry utils module.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import * as BufferGeometryUtils from 'BufferGeometryUtils';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = BufferGeometryUtils.mergeGeometries([ new THREE.SphereGeometry(1, 30, 30), new THREE.BoxGeometry(1.4, 1.4, 1.4) ])
//-------- ----------
// GEOMETRY
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

### 1.2 - Estimate Bytes Used

There is a method that can be used to Estimate the number of bytes that is used by the geometry. The Docs say that this will just estimate the amount of space that the attributes used up, so it would stand to reason that the over all geometry will take up some more space beyond that depending on what else is added in the various propert8es of the geometry. Still this tool will help to get a ruff idea at least for starters.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import * as BufferGeometryUtils from 'BufferGeometryUtils';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry_1 = new THREE.PlaneGeometry(1, 1, 1, 1);
const geometry_2 = new THREE.PlaneGeometry(1, 1, 10, 10);
console.log( BufferGeometryUtils.estimateBytesUsed( geometry_1 ) ); // 140
console.log( BufferGeometryUtils.estimateBytesUsed( geometry_2 ) ); // 5072
//-------- ----------
// GEOMETRY
//-------- ----------
const material = new THREE.MeshNormalMaterial({ wireframe: true, wireframeLinewidth: 3 });
const mesh1 = new THREE.Mesh( geometry_1, material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry_2, material);
mesh2.position.x = -2;
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
```

## 2 - Indexed geometry and the to Triangles Draw Mode Method

One of the many methods I would like to look into more in this utilties module is the to triangles draw modle method. This will return a new indexed geometry from the given buffer geometry, and one of two options for triangle mode constants. Like always the threejs docs do not expand a lot on these methods and the related topics such as the constant options. So then it makes sense to try to look into these things more elsewhere, and also learn by doing by working out a few demos.

### 2.1 - Getting started with to triangles draw mode

For this demo I just started to get a crude idea of how this method works. The basic use of it is simple enough, just call the method, pass a geometry as the first argument, and then one of the two options for triangle mode constants. The two options for the triangle mode options are THREE.TriangleStripDrawMode, and THREE.TriangleStripDrawMode. One thing that I have found thus far is although the threejs docs say that this returns a new geometry, it does still mutate the one that is given by way of the argument by adding an index to it. So to deal with this I just call the clone method off of the source geometry so it mutates a copy of the source geometry.


```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import * as BufferGeometryUtils from 'BufferGeometryUtils';
//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// GEOMETRY
//-------- ----------
const geo_source_indexed = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const geo_source = geo_source_indexed.clone().toNonIndexed();
const geometry1 = BufferGeometryUtils.toTrianglesDrawMode(geo_source.clone(), THREE.TriangleStripDrawMode )
const geometry2 = BufferGeometryUtils.toTrianglesDrawMode(geo_source.clone(), THREE.TriangleStripDrawMode );
geometry1.computeVertexNormals();
geometry2.computeVertexNormals();
console.log( geo_source_indexed.index.count ); // 36
console.log( geo_source.index ); // null
console.log( geometry1.index.count );  // 102
console.log( geometry2.index.count );  // 102
//-------- ----------
// POINTS
//-------- ----------
const material =  new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geo_source, material);
scene.add(mesh);
const mesh1 = new THREE.Mesh(geometry1, material);
mesh1.position.set(-1, 0, 1.5);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geometry2, material);
mesh2.position.set(1, 0, 1.5);
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 3, 3);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

The good news is that this method does very much create an index for a geometry in the event that it odes have one. The bad news is that thus far this does not seem to work out so well when compared to what is set up to begin with in the box geometry I used here. The count of triangles is way higher, and also the end result does not look so great. This might very much be a user error on my part, I will have to look into this a bit more to be sure if I get some time to do so. However thus far I am thinking that this is not a magic wand when it comes to working out an index for a geometry. In some cases there will need to be custom logic for a geometry, or maybe even something that needs to be done manually in an editor.


## Conclusion

That will be if for now when it comes to the buffer geometry utils module. I am sure that I will expand this post a bit more once in a while as I am going to be making my [main post on buffer geometry](/2021/04/22/threejs-buffer-geometry/) a lengthy deep dive content post. As such I will most likely want to have a section on this topic in that post, and in turn I am sure that I will have more to write about here when I do that.

