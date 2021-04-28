---
title: The Euler Class in Threejs
date: 2021-04-28 14:31:00
tags: [three.js]
layout: post
categories: three.js
id: 855
updated: 2021-04-28 15:36:35
version: 1.12
---

In [three js](https://threejs.org/) there is the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) that is the standard class in three.js that has to do with setting angles for the rotation of an object in three.js. For example the rotation property of the Object3d class is an instance of Euler, and the [Object3d class](/2018/04/23/theejs-object3d/) is a base Class for many objects in three.js including things like a Mesh, Groups, and Cameras.

The Euler class goes hand in hand with the [Vector3 Class](/2018/04/15/threejs-vector3/) as the Euler class has to do with angles, while Vector3 has to do with a position. A great deal of what is done in three.js has to do with moving and rotating objects around, so Vecor3 is what can be used to set a position while Euler is what one will need to use to set the orientation of the object.

<!-- more -->

## 1 - The Euler Class in Three.js and what to know first

This is a post On the Euler Class in three.js, as such I trust that you have at least some background when it comes to the basics of three.js and javaScript in general. So if you are new to three.js you might want to start with some kind of getting started post on three.js in general as a basic starting point for the basics of setting up a scene and so forth.

The Euler Class is one of many basic classes that you should know about sooner or later, it might be best to learn a thing or two about the Euler class when you are first learning the basics of making mesh objects move, and rotate around as this is the class to do so when it comes to rotating at least.

### 1.1 - Version Numbers Matter with three.js

In this post I was using three.js r127, make sure that you are using that version if the code examples here are breaking for you.

## 2 - Basic example of The Euler Class, and the copy method

This will aim to be a basic getting started example of the Euler Class where I am creating an instance of THREE.Euler directly. Once I have an instance of Euler there is the question of what to do with it in a three.js example. With that said there is the copy method of a Euler instance that can be used to copy the state of one Euler Class to another. So in this example I am creating a Mesh with the [Box Geometry](/2021/04/26/threejs-box-geometry/) Constructor and the Normal Material, and then making a few clones of the mesh with the [mesh clone method](/2019/12/18/threejs-mesh-copy/). After that I am then using the copy method of the Euler instance that is located at the rotation property of the mesh objects to set some of them to the value that I have set with the single Euler Class instance.

```js
// AN INSTANCE OF THREE.Euler
var euler = new THREE.Euler(Math.PI / 180 * 45, 0, 0)
 
// a Mesh
var meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// cloning ths mesh
var box1 = meshA.clone(),
box2 = meshA.clone(),
box3 = meshA.clone();
 
// USING THE INSTANCE OF EULER TO SET THE STATE
// OF THE EULER INSTANCES OF THESE MESH CLONES
box2.rotation.copy(euler);
box3.rotation.copy(euler);
 
// adjusting positions
box2.position.set(-1,0,0);
box3.position.set(1,0,0);

// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Conclusion

The Euler Class is something that I work with all the time when it comes to rotating an object in three.js. There is mainly just knowing the set and clone methods of the Class and that is it. At least those two methods are the ones that I find myself actually using so far.

If you have not done so all ready it might make sense to also take a moment to look over the [Vecor3 Class](/2018/04/15/threejs-vector3/) also when it comes to setting positions rather than the orientation of an object. Speaking of Objects there is also looking into the major base class of threejs that is [Object3d](/2018/04/23/theejs-object3d/), which contains the rotation property that is an instance of the Euler class used to rotate objects.

