---
title: Face3 and vertex color in threejs
date: 2019-06-03 18:46:00
tags: [js,three.js]
layout: post
categories: three.js
id: 471
updated: 2021-05-27 15:50:12
version: 1.15
---

It is time for me to revisit the [face3 constructor](/2018/05/11/threejs-face3/) in three.js, in fact I will be writing more content on threejs in general in the next few days. Todays post will be on [face3 color](https://stackoverflow.com/questions/51172095/change-the-color-of-mesh-created-using-face3), that is setting colors for each vertex in a face3 instance and how to use it with a material and mesh. In This post I will be going over some examples of the face3 constrictor in general, but this will mostly be on face3 color.

<!-- more -->

## 1 - What to know before hand

This is a post on using the Face3 Constructor to set custom vertex colors, and to use those colors with a material when using the geometry with a mesh. So then this is nit a getting started post on threejs, javaScript, and any additional skills that are required before hand to get something of value from this post. Also there are some additional talking points that I should mention here before continuing with the code examples.

## 1.1 - THE CODE HERE WILL BREAK IF YOU ARE USING A NEW VERSION OF THREEJS (r125+)

The old code examples here will break if you are using a late version of threejs. The reason why is that the Face3 Constructor was removed from threejs in version r126, and in r125 the Geometry constructor which was closely related to face3 was also removed. I will be keeping this post up because it does still apply to older versions of threejs, and also it might still be possible to get some of these older code examples working on later versions of threejs if one can find a way to bring back what was removed by way of external files beyond that of the threejs library by itself.
However it is possible to pull off a similar effect to what is worked out here with the Buffered Geometry constructor which is still part of the core of threejs. I worked out some new examples for that and will place those examples at the bottom of this post

## 1.2 - So yes version numbers matter when using threejs

When I first started writing content on threejs here I was using r91 of threejs, back when I first wrote this post I was using r104, and the last time I edited this post I was using r127. With that said at the time of this writing whe I was using r127 these code examples do not work with later versions of three.js. Features are constantly being added, and other features are being removed which often result in code breaking changes to examples like the ones here. If you are having problems with the examples here, or anywhere for that matter the first thing you should check is the version number of three.js that you are using.

## 2 - Face3 color in vertices 

In order to use face3 vertex colors the vertexColors property of the material that is being used must be set to the THREE.FaceColors constant. A quick example of the use of face3 vertex colors might look something like this.

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(0, 0, -2);
camera.lookAt(0, 0, 0);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// FACE 3
var geometry = new THREE.Geometry();
geometry.vertices = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(1, 0, 0)
];
var colors = [
    new THREE.Color(0xff0000),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff)];
var normal = new THREE.Vector3(0, 0, 1);
// set a single color for a face3 instance
geometry.faces.push(new THREE.Face3(0, 1, 2, normal, colors[0], 0));
// set an array of colors for each vertex
geometry.faces.push(new THREE.Face3(3, 2, 0, normal, colors, 0));
geometry.computeVertexNormals();
geometry.computeFaceNormals();
 
console.log(geometry);
 
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
 
renderer.render(scene, camera);
```

The fifth parameter of the THREE.face3 constructor can be a single color that will set a color to be used for the whole face3 instance, or it can also be an array of colors that will be a color for each vertex in the geometry of the face3. This can then be used as a crude yet effective way of styling faces in a project.

## 3- Set the vertex colors for an existing geometry

When creating a custom geometry the face3 constructor can be used directly and a single color or array of colors can be given when calling the face3 constructor. However when working with a geometry that all ready exists another way of setting the vertex colors or a single face color is by going over each instance of face3 and just set the color or vertexColors properties of each face3 instance.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.2, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// a box geometry
var box = new THREE.BoxGeometry(1, 1, 1);
// for each face3
box.faces.forEach(function (face3, i) {
    if (i % 2) {
        // vertex colors array
        face3.vertexColors = [
            new THREE.Color(0xff0000),
            new THREE.Color(0x00ff00),
            new THREE.Color(0x0000ff)];
    } else {
        // or just face color
        face3.color = new THREE.Color(0xffffff);
    }
});
 
var mesh = new THREE.Mesh(box,
        new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
renderer.render(scene, camera);
```

## 4 - Using the Buffered Geometry Constructor and then NOT Face3 (doing the same thing in r125+)

To do the same thing more or less with Buffered Geometry rather that the older and now removed Geometry constructor the process of doing so is just a little different. The basic process is that one additional attribute will need to be added to the Buffered Geometry that is custom, or made from one of the built in geometry constructors such as the PlaneGeometry constructor.

```js
// create a buffed geometry
var geometry = new THREE.PlaneGeometry(1, 2, 1, 1);
// add a colors prop to the geometry
var colors = new Uint8Array([
            255, 0, 0,
            0, 255, 0,
            0, 0, 255,
            0, 0, 255,
            0, 255, 0,
            255, 0, 0,
        ]);
// Don't forget to normalize the array! (third param = true)
geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3, true));
 
// SCENE
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
 
// MESH that uses the vertex colors
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: true
        }));
scene.add(mesh);
 
renderer.render(scene, camera);
```

## 5 - Conclusion

When it comes to Face3 color I can still use the Face3 constructor and set vertex colors to each instance of Face3 as a way to have a vertex color effect. However that will only work with older versions of threejs before that if the late version in which face3 was removed. It might be possible to bring back the Geometry constructor and Face3 by way of some extremal files as that is often the case when features are removed. However I think that it is best to just learn how to do everything that I want to do with threejs by using the Buffered Geometry Constructor and setting vertex colors by some other means such as when working with groups.

So then maybe a better post to read would be something on using the [buffer geometry](/2021/04/22/threejs-buffer-geometry/) constructor, and the groups array that is not the modern replacement for what face3 was all about. In my post on the buffer geometry constructor I have some examples that have to do with working with the groups array, but I also have some examples on my posts on the various geometry constructors such as the [plane geometry](/2019/06/05/threejs-plane/) constructor that might be a good starting point when it comes to learning about the groups array.