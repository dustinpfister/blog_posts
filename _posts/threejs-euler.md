---
title: The Euler Class in Threejs
date: 2021-04-28 14:31:00
tags: [three.js]
layout: post
categories: three.js
id: 855
updated: 2021-04-28 16:35:19
version: 1.18
---

In [three js](https://threejs.org/) there is the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) that is the standard class in three.js that has to do with setting angles for the rotation of an object in three.js. For example the rotation property of the Object3d class is an instance of Euler, and the [Object3d class](/2018/04/23/theejs-object3d/) is a base Class for many objects in three.js including things like a Mesh, Groups, and Cameras.

The Euler class goes hand in hand with the [Vector3 Class](/2018/04/15/threejs-vector3/) as the Euler class has to do with angles, while Vector3 has to do with a position. A great deal of what is done in three.js has to do with moving and rotating objects around, so Vecor3 is what can be used to set a position while Euler is what one will need to use to set the orientation of the object.

<!-- more -->

## 1 - The Euler Class in Three.js and what to know first

This is a post On the Euler Class in three.js, as such I trust that you have at least some background when it comes to the basics of three.js and javaScript in general. So if you are new to three.js you might want to start with some kind of getting started post on three.js in general as a basic starting point for the basics of setting up a scene and so forth.

The Euler Class is one of many basic classes that you should know about sooner or later, it might be best to learn a thing or two about the Euler class when you are first learning the basics of making mesh objects move, and rotate around as this is the class to do so when it comes to rotating at least.

The angles that are passed to the Euler class will be in the form or [radians](https://en.wikipedia.org/wiki/Radian) which is something that you should be familiar with not just for the sake of the Euler class, but for the sake of just about anything that has to do with angles in a javaScript environment.

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

For this example I am not doing anything fancy with an app loop, events, or anything to that effect. However the basic idea of what the Euler class is all about is there for what it is worth for starters. The copy method is one way to set the value of a Euler class instance such as the ones used for the rotation properties of these mesh clones as each one that I set with the Euler class instance that I made at the top is also rotated at a 45 degree angle. However maybe it would be a good idea to work out at least a few more examples that make use of the set method of the Euler class, and maybe a main app loop to start to make something interesting.

## 3 - The Euler x, y, and z props

One way to rotate objects would be to use the x, y, and z properties of the Euler instance that is located in the rotation projects of a Mesh, or anything that inherits from Object3d for that matter. This allows for a decent way to mutate values in place rather than setting them to a given set of values. For example I can just add a radian delta value to a given property to rotate the object on that axis.

In this example I once again have three mesh objects, this time though I have a basic application loop in which I am using request animation frame. Inside this loop function I am using the x, y, and z properties to rotate the mesh objects.

```js
// a Mesh
var meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// cloning ths mesh
var box1 = meshA.clone(),
box2 = meshA.clone(),
box3 = meshA.clone();
 
// adjusting positions
box2.position.set(-1.5, 0, 0);
box3.position.set(1.5, 0, 0);
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 0.075) {
        lt = now;
        // USING EULER XYZ PROPS
        box2.rotation.x += 1 * secs;
        box2.rotation.x %= Math.PI * 2;
        box3.rotation.y += 1 * secs;
        box3.rotation.y %= Math.PI * 2;
        renderer.render(scene, camera);
    }
 
};
 
loop();
```

So then this is one way to go about rotating objects, but then there is also the set method that can also be used as a way to set the values of a Euler instance.

## 4 - Using the set method

On top of the properties of the Euler class instance there is also the set method that is another way to go about setting what the angles are for a Euler Class instance. For this I just call the set method of the Euler Instance and then pass and x, y, and z value as arguments in that order by default. A fourth argument can be used to set the order of these values, but the default setting is what I always seem to use for this.

```js
// a Mesh
var meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// creating a scene
var scene = new THREE.Scene();
// add the box mesh to the scene
scene.add(meshA);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date();
var state = {
    x: 0,
    y: 0,
    z: 0
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 0.075) {
        lt = now;
        state.x += 0.5 * secs;
        state.y += 1.0 * secs;
        state.z += 1.5 * secs;
        state.x %= Math.PI * 2;
        // USING EULER SET METHOD
        meshA.rotation.set(state.x, state.y, state.z);
        renderer.render(scene, camera);
    }
 
};
 
loop();
```

## 5 - Conclusion

The Euler Class is something that I work with all the time when it comes to rotating an object in three.js. There is mainly just knowing the set and clone methods of the Class and that is it. At least those two methods are the ones that I find myself actually using so far.

If you have not done so all ready it might make sense to also take a moment to look over the [Vecor3 Class](/2018/04/15/threejs-vector3/) also when it comes to setting positions rather than the orientation of an object. Speaking of Objects there is also looking into the major base class of threejs that is [Object3d](/2018/04/23/theejs-object3d/), which contains the rotation property that is an instance of the Euler class used to rotate objects.

