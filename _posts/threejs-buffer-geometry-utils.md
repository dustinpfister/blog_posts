---
title: Merge geometry and more with Buffer Geometry utilities in threejs
date: 2023-08-31 13:35:00
tags: [three.js]
layout: post
categories: three.js
id: 1069
updated: 2023-09-01 14:56:39
version: 1.2
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

For this section I will be starting out with just a few basic examples of what there is to work with in the buffer geometry utils module.

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

## Conclusion

That will be if for now when it comes to the buffer geometry utils module. I am sure that I will expand this post a bit more once in a while as I am going to be making my [main post on buffer geometry](/2021/04/22/threejs-buffer-geometry/) a lengthy deep dive content post. As such I will most likely want to have a section on this topic in that post, and in turn I am sure that I will have more to write about here when I do that.

