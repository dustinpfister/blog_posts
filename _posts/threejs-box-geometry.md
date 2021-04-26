---
title: Box Geometry in Threejs
date: 2021-04-26 13:33:00
tags: [three.js]
layout: post
categories: three.js
id: 853
updated: 2021-04-26 15:57:09
version: 1.17
---

After looking over my old content on [three js](https://threejs.org/) it would seem that I never took a moment to write a post On the Box Geometry Constructor. I guess I thought that I knew what I need to know about it and thus I could move on to more advanced topics, if so maybe that was a mistake. Better late than never though so I thought I would take a moment to work out some examples centered around just using the basic Box Geometry constructor in three.js as a way to create a Geometry to be used with a Mesh in a three.js scene.

This will then be a basic post, or at least it will start out that way, for those of you that have some more experienced with three.js I might get into some more advanced topics towards then end of the post, just for the sake of not letting this post end up being to thin. There is just starting out with a simple moving cube example which is not so hard, but then there is getting into how to go about skinning a cube with textures, and not just simple solid color maps with the basic material in that regard.

<!-- more -->

## 1 - Box Geometry in thee.js and what to know first

This is a post on the Box Geometry Constructor in three.js, and many little related topics that branch off from that. This is not a getting started post on three.js, but many of the examples here will be not so far beyond that point. So I assume that you know how to set up a basic client side javaScript project using three.js, and so forth.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using three.js r127, and many code breaking changes where made recently. Always take note of what version of three.js you are using.

## 2 - Basic Box Geometry example using Normal Material

To create a basic Box three.js example using the Box Geometry Constructor the First thing I am going to want to do is create a Mesh. This Mesh will accept a geometry as the first argument such as one that is created using the Box Geometry Constructor. However I am also going to want to pass a material as the second argument for the Mesh also. For this example I have choses to go with the Normal Material as this is a nice quick choice for skinning a Mesh because the default Basic material will just show the whole area as one solid color.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Position and rotation

Once that basic hello world cube example is up and running, the first thing I remember wanting to do next was to learn how to rotate and move the box. This is more so a subject of the Mesh Class than the Box Geometry Constructor, and even then it is really more of a subject of the Object3d class from which the Mesh Class inherits from. With that said reading up more on the Mesh Class and really Object3d would be best, but for the hell of it I will cover an example of this here.

```js
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
var scene = new THREE.Scene();
scene.add(box);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0,
    radian: 0,
    r: new THREE.Euler(0, 0, 0),
    p: new THREE.Vector3(0, 0, 0)
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
 
    requestAnimationFrame(loop);
 
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    state.radian = Math.PI * 2 * state.bias;
 
    state.p.z = -2 * Math.cos(Math.PI * 2 * state.bias);
    state.p.x = -2 * Math.sin(Math.PI * 8 * state.bias);
 
    // changing values
    state.r.x += 1 * secs;
    state.r.y += 2 * secs;
    state.r.z += 3 * secs;
 
    // copy the state of the THREE.Euler instance in the state object
    // as the new rotation value of the box
    box.rotation.copy(state.r);
 
    // using the copy method for Vector3 also
    box.position.copy(state.p);
 
    renderer.render(scene, camera);
 
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
 
    lt = now;
};
loop();
```

## 4 - Using an Array of Materials

An Array of materials can be passed to the Mesh constructor rather than just a single material. When doing so by default I would want to pass an array of six materials, one for each face. However it is possible to pass less than six materials when doing this, it is just that when doing so I might want to change what the material index values are for the Box geometry. In this section I will be going over a few quick basic cube examples using the Box Geometry constructor and an array of materials. 

For more on this kind of subject you might want to check out my post on [material index values when working with geometries and a array of materials with a mesh](/2018/05/14/threejs-mesh-material-index/). I do not care to get into this subject in depth here, but I think I should go over at least a few quick basic examples making use of just the box geometry.

### 4.1 - Using an array of six materials

A property of interest when working with a buffer geometry as of late versions of three.js is the groups array of the geometry. This is, or at least should be an array of objects where each objects is a material index for a side, or face if you prefer of the geometry. When making a custom geometry this groups array will have to be created manually by making use of the add group method, however with the built in Box Geometry constructor this array should all ready be there.

Out of the box there should be six objects in the groups array, and the material index values for each should go from  and including 0 to 5. So if I am doing going to change any of those values I will want to give an array of six materials, one for each side.

```js
var materials = [
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    })
];
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materials);

var scene = new THREE.Scene();
scene.add(box);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
state = {
    x: 0,
    y: 0,
    z: 0
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.x += 1 * secs;
    state.y += 2 * secs;
    state.z += 3 * secs;
    box.rotation.set(state.x, state.y, state.z);
    renderer.render(scene, camera);
    lt = now;
};
loop();
```

### 4.2 - Using an array of materials more or less than six

When using an array of materials that is more or less than six chances are that I am going to want to change what the material index values are for the Box Geometry. To do this I just need to loop over the groups array of the box geometry and set the material index values for each group t the desired index value in the array of the materials.

```js
// the array of materials that is only two materials
var materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshDepthMaterial()
];
// create the box geometry
var geo = new THREE.BoxGeometry(1, 1, 1);
// The objects in the groups array is what there is to
// use to set material index values for each face
geo.groups.forEach(function (face, i) {
    face.materialIndex = face.materialIndex % materials.length;
});
// now create the box like always passing the geometry first,
// and the array of materials second
var box = new THREE.Mesh(
        geo,
        materials);
 
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
scene.add(box);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
state = {
    x: 0,
    y: 0,
    z: 0
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.x += 1 * secs;
    state.y += 2 * secs;
    state.z += 3 * secs;
    box.rotation.set(state.x, state.y, state.z);
    renderer.render(scene, camera);
    lt = now;
};
loop();
```

## 5 - Conclusion

So then the Box geometry is a great starting point when it comes to starting to explore everything that there is to work with when it comes to three.js. Much of what applies for a Box geometry will also apply for other built in geometries when it comes to geometries and the index values for a geometry. However sooner or later it might be called for to get into creating a custom geometry using the [Buffer Geometry constructor](/2021/04/22/threejs-buffer-geometry/) directly rather than using one of the built in geometries. However it is also possible to just create simple, crude, yet effective models of things using just groups of the built in geometry constructors such as the Box Geometry constructor.


