---
title: The normal material in threejs
date: 2021-06-23 12:54:00
tags: [three.js]
layout: post
categories: three.js
id: 895
updated: 2021-06-23 14:30:38
version: 1.20
---

One of the materials that I might use as a kind of place holder material in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) would be the [normal material](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial). The normal material will render colors to the faces of a geometry by way of the state of the normal attribute of the buffer geometry. The normal attribute is an array of values that corresponds with the position attribute that is used to set what the direction is of each vertex rather than the position. The normal attribute is a must have attribute when it comes to using any material that has to do with light as the normal material is used for that, but it is also needed for a material such as the normal material.
The normal material can be used as a way to find out if there are problems with the normal attribute of a geometry as there is a certain look that an object should have when using it. However it might not be the best took for the job as there are other things to work with in the core of the threejs library such as arrow helpers. In addition there are additional external files that can be used on top of threejs that will add a kind of normal helper which might be the best tool for the job.

<!-- more -->

## 1 - The normal material and what you should know first

In this post I am going over a few javaScript source code examples that make use of the normal material in the library known as threejs. So I trust that you have at least some knowledge of how to get up and running with the very basic of threejs when it comes to linking to the library and creating a scene object and so forth. I will not be getting into the very basics of threejs let alone JavaScript in general here, but I will be quickly going over some things that you show read up more on if you have not done so before hand at this point.

### 1.1 - read up more on what the normal attribute of a buffer geometry is

It might be a good idea to take some time to gain a deeper understanding of the normal attribute of  buffer geometry instance. I have wrote a post on the topic of the normal attribute alone that might be worth reading when it comes to getting that deeper understand of what the normal attribute is all about. Crossing that bridge is something that one will just need to do sooner or later when it comes to making custom geometry, but when it comes to sticking to the built in geometry constructors it is possible to wait on this one as the normal attributes are all ready set up for you when using these constructors.

### 1.2 - there is much more to geometry beyond that of the normal attribute of course

So there is the normal attribute of a buffer geometry instance, but then there are other major attributes of a buffer geometry such as the position and uv attributes along with a number of other attributes that might come into play also. There is also a wide range of additional prototype methods and properties of a buffer geometry that are also worth looking into more at some point sooner or later.

### 1.3 - there are other options when it comes to materials

### 1.4 - Version Numbers matter

When I first wrote this post I was using r127 of threejs.

## 2 - Basic example using the normal material

In this section I am going to be writing about a hello world of mesh normal material examples. So in a way this is just a very basic getting started example of threejs in general actually as I do still like to start out my threejs posts with very basic examples before getting into anything that might be a bot more advanced.

I start out the source code example by creating a scene object, and then after that I will want to create a mesh object and add that mesh object to the scene. When creating a mesh object I am going to want to pass a geometry as the first argument, and then a material as the second argument. There is getting into creating a custom geometry, but when doing so I will need to create the normal attribute manually. So for this basic example I will be using one of the built in geometry constructors such as the THREE.BoxGeometry constructor, this will have the normal attribute set up to begin with. After I have my geometry and pass it as the first argument to the mesh constructor, I then just need a material to use with the geometry of the mesh object, and for this I am of course using the Normal Material. For this example I am just calling the THREE.MeshNormalMaterial constructor by itself without passing any options to it.

```js
// scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
 
// BOX MESH USING THE NORMAL MATERIAL
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 3, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

Now that I have a scene object, and a mesh added to the scene with a geometry and a material I can now just create a camera and a renderer.

## 3 - Conclusion

The normal material is often by default go to material when I am working out things that do not have to do with materials and textures and lighting just yet. The normal material is often a set up from using the basic material with just a solid color and not much of anything else as just results in a blob of color in the canvas rather than something that looks like a solid shape. The mesh normal material is one way to show that there are sides to an object, however there are some additional options when it comes to a simple place holder material such as the depth material, or using the basic material just adding a simple place holder texture to it.

I can not say that I use the normal material when it comes to making any kind of final product though, unless that final product is to outline the nature of the normal attribute of a geometry. Even then I think I should add more to the example that just simply use the normal material. It is also called for to show the direction of each vertex in the geometry also, and that is something that would need to be done with arrow helpers, or better yet some kind of external library that can be used to create arrow helpers for all vertices's in the position attribute, or at least a few that are currently of interest when it comes to debugging things with a geometry.