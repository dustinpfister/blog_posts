---
title: Working with Angles in threejs with the Euler Class and various other features.
date: 2021-04-28 14:31:00
tags: [three.js]
layout: post
categories: three.js
id: 855
updated: 2023-03-25 10:22:56
version: 1.39
---

In [threejs](https://threejs.org/) there is the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) that is an option for setting the local rotation of an object. The use of this class of object will also come into play for a wide range of other tasks that pop up now and then such as when using the [apply euler method of the vector3 class](/2021/06/18/threejs-vector3-apply-euler/).

The [rotation property of the Object3d class](/2022/04/08/threejs-object3d-rotation/) is an instance of Euler, and the [Object3d class](/2018/04/23/threejs-object3d/) is a base Class for many objects in threejs including things like Mesh, Group, and Camera objects just to name a few examples. Speaking of Scene objects that too is an example of an object that is based off of the Object3d Class and thus also has a rotation property that is an instance of Euler.

The Euler class goes hand in hand with the [Vector3 Class](/2018/04/15/threejs-vector3/) as the Euler class has to do with angles, while Vector3 has to do with a position. A great deal of what is done in threejs has to do with moving and rotating objects around, so Vector3 is what can be used to set a position, while Euler is a way to set the orientation of the object. There are however shortcommings with the Euler class, and as such there are a number of other options for setting orentation as well that I shoud mention in this post.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/6jCoOIWOV4g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Euler Class in threejs and what to know first

This is a post on the Euler Class in threejs, as such I trust that you have at least some background when it comes to the basics of threejsthreejs-getting-started and javaScript in general. So if you are new to threejs you might want to start with some kind of [getting started post on threejs](/2018/04/04/threejs-getting-started/) in general as a basic starting point for the basics of setting up a scene and so forth.

### There is also the Object3d look at method

The Euler Class is one of many basic classes that you should know about sooner or later, it might be best to learn a thing or two about Euler when you are first learning the basics of making mesh rotate around. However when it comes to getting started with rotation it might me best to start out with the [look at method of the object3d class](/2021/05/13/threejs-object3d-lookat/). This is a way to just pass a set of numbers that are a point in space to have an object look at. When it comes to Vector3 objects that can also be passed to the method as well in the form of a single Vector3 objects. More often than not the look at method works just fine, I still use it all the time in my code examples. However it does have drawbacks that can result in having to look into Euler objects as a way to set orentation.

### Know a thing or two about radians

The angles that are used with the Euler class will be in the form or [radians](https://en.wikipedia.org/wiki/Radian) which is something that you should be familiar with not just for the sake of the Euler class, but for the sake of just about anything that has to do with angles in a javaScript environment. If you have a hard time thinking in radians the expressions used to convert from degree to radian and back again are fairly simple, and there are also some methods in that [Math Utils object of threejs to help with angle unit conversion](/2022/04/11/threejs-math-utils/) as well.

### There are also quaternions for setting local rotation

Euler objects work great for the sake of rotation of objects most of the time. Another nice thing about Euler objects is that they are easy to understand compared to some more advanced options for doing object rotations. However if you spend enought time playing around with some code examples you will begin to run into probelms with them which may lean one to look into some of these more advanced options such as [quaternions](/2023/03/24/threejs-quaternion/).

### The source code examples here are on Github

The source code examples for this post can be found in my [test threejs Github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-euler). This is also where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers Matter with threejs

In this post I was using [threejs r127](https://github.com/mrdoob/three.js/releases/tag/r127), and the last time I cam around to do a little editing I was using r146. Make sure that you are using that version if the code examples here are breaking for you. I can not say that much has changed with the Euler class specifically sense I started using threejs many years ago now, but that is certainly not the case with everything else in the library.

## 1 - Some basic Examples of the Euler class in threejs

In this section I will be starting out with a few quick basic examples of the Euler class in threejs. For the most part this will involve the instance of the user class that is stored at the rotation property of an object3d based object such as a mesh object.

### 1.1 - Basic example of The Euler Class, and the copy method

This will aim to be a basic getting started example of the Euler Class where I am creating an instance of THREE.Euler directly. Once I have an instance of Euler there is the question of what to do with it in a threejs example. With that said there is the copy method of a Euler instance that can be used to copy the state of one Euler Class to another. So in this example I am creating a Mesh with the [Box Geometry](/2021/04/26/threejs-box-geometry/) Constructor and the Normal Material, and then making a few clones of the mesh with the [mesh clone method](/2019/12/18/threejs-mesh-copy/). After that I am then using the copy method of the Euler instance that is located at the rotation property of the mesh objects to set some of them to the value that I have set with the single Euler Class instance.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// EULER
//-------- ----------
// AN INSTANCE OF THREE.Euler
var euler = new THREE.Euler(Math.PI / 180 * 45, 0, 0)
// a Mesh
var meshA = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
// cloning this mesh
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
// add the box mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

For this example I am not doing anything fancy with an app loop, events, or anything to that effect. However the basic idea of what the Euler class is all about is there for what it is worth for starters. The copy method is one way to set the value of a Euler class instance such as the ones used for the rotation properties of these mesh clones as each one that I set with the Euler class instance that I made at the top is also rotated at a 45 degree angle. However maybe it would be a good idea to work out at least a few more examples that make use of the set method of the Euler class, and maybe a main app loop to start to make something interesting.

### 1.2 - The Euler x, y, and z props

One way to rotate objects would be to use the x, y, and z properties of the Euler instance that is located in the rotation projects of a Mesh, or anything that inherits from Object3d for that matter. This allows for a decent way to mutate values in place rather than setting them to a given set of values. For example I can just add a radian delta value to a given property to rotate the object on that axis.

In this example I once again have three mesh objects, this time though I have a basic application loop in which I am using request animation frame. Inside this loop function I am using the x, y, and z properties to rotate the mesh objects.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// EULER
//-------- ----------
// a Mesh
const meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// cloning ths mesh
const box1 = meshA.clone(),
box2 = meshA.clone(),
box3 = meshA.clone();
// adjusting positions
box2.position.set(-1.5, 0, 0);
box3.position.set(1.5, 0, 0);
// add the box mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const loop = function () {
    const now = new Date(),
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

### 1.3 - Using the set method

On top of the properties of the Euler class instance there is also the set method that is another way to go about setting what the angles are for a Euler Class instance. For this I just call the set method of the Euler Instance and then pass and x, y, and z value as arguments in that order by default. A fourth argument can be used to set the order of these values, but the default setting is what I always seem to use for this.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// EULER
//-------- ----------
// a Mesh
const meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// add the box mesh to the scene
scene.add(meshA);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = {
    x: 0,
    y: 0,
    z: 0
};
const loop = function () {
    const now = new Date(),
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

So now I have the basics of the Euler class out of the way, there are a few more methods but so far I can not say that I am using them that much in actual projects. For the most part I just want to use these methods to rotate some kind of object typically a mesh, but also groups and cameras.

## 2 - Vector3 objects and the Euler class

For this section I will now be looking into a few examples that have to do with setting the state of a Vector3 object using the Euler class. The general idea here is to just use the apply euler method to set the direction part of a vector3 object to the value of a Euler object. After that it is just a question of how to go about adjusting the vector unit length of the Vector3 object.

### 2.1 - The Vector3 apply Euler method and setting position from Euler

There is not just working with this instance of the Euler class that is stored in the rotation property of an object based off of Object3d, there is also creating a stand alone instance of Euler. There are then a number of things that can be done with this instance of Euler such as passing it to another method of another class that expects an instance of Euler as one of the arguments. A good example of that kind of method might be the apply Euler method of the Vector3 class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// Adding a Mesh
// ---------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// LOOP - Using Vector3.applyEuler with an instance of THREE.Euler
// ---------- ----------
const state = {
    lt: new Date(),
    fps: 24,
    radian : 0,
    euler : new THREE.Euler(0, 0, 0)
};
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / state.fps) {
        // updating state.euler, and using Vector3.applyEuler with state.euler
        // by way of mesh.position which is an instance of Vector3
        state.euler.z += THREE.MathUtils.degToRad(90) * secs;
        state.euler.z = THREE.MathUtils.euclideanModulo(state.euler.z, Math.PI * 2);
        mesh.position.set(1, 0, 0);
        mesh.position.applyEuler(state.euler);
        // doing a spin also
        mesh.rotation.y += THREE.MathUtils.degToRad(360) * secs;
        mesh.rotation.y = THREE.MathUtils.euclideanModulo(mesh.rotation.y, Math.PI * 2);
        // render
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
```

Although something like this might work okay for setting the position of a mesh object by way of the Euler class and the Vector3 class apply Euler methods there are additional ways of doing this sort of thing. In the [Vector3 class there is a set from spherical coords method](/2022/02/04/threejs-vector3-set-from-spherical-coords/) for example that takes a radius and two angles to set a position.

### 2.2 - Using multiply scalar method to adjust vector unit length as well as diection using Euler

After using the apply euler class to set the direction part of a vector there is then also how to go about setting the magnature, length, distance of whatever you call it. That is that although vector3 objects have an x, y, and z property they are often said to be of direction and magnature. In  other words two parts, and with that said we have all ready covered an example that has to do with setting the direction part with euler, now it is just a question of how to have control over magnature.

So for this demo I am once again using the apply euler method as a way to set direction with a Euler object. However now I am also making use of the [multiply scalar method](/2022/03/23/threejs-vector3-multiply-scalar/) as a way to change the vecotr unit length as well. Before doing anything though I am calling the set method and starting with a vector with a unit length of 1. If I am dealing with a Vector that does not have a length of one to begin with I can use the [Vector3 normalize method](/2021/06/14/threejs-vector3-normalize/) to set the Vector to a length of 1 while preserving the direction. In any case it is impoatant to not start with a Vector with a length of zero or else none of this is going to work.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(5,5) );
const group = new THREE.Group();
let i = 0;
while(i < 40){
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 20, 20),
        new THREE.MeshNormalMaterial());
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// LOOP - Using Vector3.applyEuler with an instance of THREE.Euler
// ---------- ----------
camera.position.set(5,5,5);
camera.lookAt(0, 0, 0);
const state = {
    lt: new Date(),
    fps: 24,
    frame: 0,
    frameMax: 900,
    euler : new THREE.Euler()
};
const update = (secs) => {
    const a1 = state.frame / state.frameMax;
    group.children.forEach( (mesh, i, arr) => {
        const a2 = (a1 + (1 / arr.length) * i) % 1;
        state.euler.y = Math.PI * 2 * a2;
        const radius = 3 + Math.sin( Math.PI * 10 * a2 );
        mesh.position.set(1, 0, 0).applyEuler(state.euler).multiplyScalar(radius);
    });
};
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / state.fps) {
        update(secs);
        renderer.render(scene, camera);
        state.lt = now;
        state.frame = ( state.frame += 1) % state.frameMax;
    }
};
loop();
```

## Conclusion

The Euler Class is something that I work with all the time when it comes to rotating an object in threejs. There is mainly just knowing the set and clone methods of the Class and that is it. At least those two methods are the ones that I find myself using in various projects thus far. There is also not just using the Euler class alone, but also working with the various other methods in the Vector3 class, as well as the Object3d class to preform all kinds of typical tasks that come up when working on a project that involves the use of threejs.

If you have not done so all ready it might make sense to also take a moment to look over the Vecor3 Class also when it comes to setting positions rather than the orientation of an object. Speaking of Objects there is also looking into the major base class of threejs that is Object3d, which contains the rotation property that is an instance of the Euler class used to rotate objects.
