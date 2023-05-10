---
title: Face3 and vertex color in threejs
date: 2019-06-03 18:46:00
tags: [js,three.js]
layout: post
categories: three.js
id: 471
updated: 2023-05-10 12:18:59
version: 1.24
---

In this post I aim to revisit the [face3 constructor](/2018/05/11/threejs-face3/) in older versions of [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) as it would seem there is is now some confusion revolving around the topic because of the fact that it is now a removed feature. That is that the Face3 class, and also the Geometry class are no longer baked into the core of the threejs library, so all these code examples on the open web that make use of these features will now of course break.

Todays post will be on [face3 color](https://stackoverflow.com/questions/51172095/change-the-color-of-mesh-created-using-face3), that is setting colors for each vertex in a face3 instance and how to use it with a [material](/2018/04/30/threejs-materials/) and a [mesh object](/2018/05/04/threejs-mesh/). In this post I will be going over some examples of the face3 constrictor in general, but this will mostly be on face3 color. Also because these examples only apply to older versions of threejs now, I will also need to write about at least one example that has to do with how to do something similar with [buffer geometry](/2021/04/22/threejs-buffer-geometry/) rather than the now removed as of r125 face3 and geometry classes.

<!-- more -->

## What to know before hand

This is a post on using the Face3 Constructor to set custom vertex colors, and to use those colors with a material when using the geometry with a mesh object. So then this is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/), javaScript, and any additional skills that are required before hand to get something of value from this post. Also there are some additional talking points that I should mention here before continuing with the code examples.

## PLEASE LOOK INTO MY POSTS ON BUFFER GEOMETRY FOR MORE r125+ CODE EXAMPLE

Although I will have at least one demo in this post that is a more up to date code example for face3 color, it would be best to read my blog post on the [color attribute of th buffer geometry](/2023/01/20/threejs-buffer-geometry-attributes-color/) class. 

## MANY OF THE CODE EXAMPLES HERE WILL BREAK IF YOU ARE USING A NEW VERSION OF THREEJS ( r125+ )

The old code examples here will break if you are using a late version of threejs. The reason why is that the Face3 Constructor was removed from threejs in version r126, and in r125 the Geometry constructor which was closely related to face3 was also removed. I will be keeping this post up because it does still apply to older versions of threejs. Also it might still be possible to get some of these older code examples working on later versions of threejs if one can find a way to bring back what was removed by way of external files beyond that of the threejs library by itself.

However it is possible to pull off a similar effect to what is worked out here with the Buffered Geometry constructor which is still part of the core of threejs. I worked out a new example for that and will place that example at the bottom of this post.

## Source code is up on Github

The source code examples here can also be found in my [test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-face3-color). This is also where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

## SO YES VERSION NUMBERS MATTER WITH THREEJS AND THE DEAL OF FACE3 COLOR IS A GOOD EXAMPLE OF THAT

When I first started writing content on threejs in general on this site I was using r91 of threejs, back when I first wrote this post I was using r104. The last time I came around to do some editing of this post I cleaned up the face3 examples a little, and they seem to still be working finr with r111. The new source code example that I made that makes use of buffer geometry and the set attribute method was updated to work fine with r146 as well.

With that said at the time of this writing when I was using r146 some of these code examples do not work with later versions of three.js. Features are constantly being added, and other features are being removed which often result in code breaking changes to examples like the ones here. If you are having problems with the examples here, or anywhere for that matter the first thing you should check is the version number of three.js that you are using.

## 1 - Using the Buffered Geometry Constructor and then NOT Face3 (doing the same thing in r125+)

To do the same thing more or less with Buffered Geometry rather that the older and now removed Geometry constructor the process of doing so is just a little different. The basic process is that one additional attribute will need to be added to the Buffered Geometry that is a color attribute. This additional color attribute can be created with the help of the Uint8Array, and BufferAttribute constructors. Once I have the buffer attribute object that I want to set for my geometry I can use the set attribute method of the buffer geometry class to add this to the geometry.

In late versions of threejs all built in geometry constructors will return a Buffer Geometry rather than the nor deprecated Geometry class. Still for the sake of making things clear here I made a custom geometry by calling the THREE.BufferGeometry constructor function, and then adding at least a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) to it. If the aim here is to stick with the basic material, and vertex colors only, then it would seem that I do not need to bother with any other additional attribute for this sort of thing. I just want to make sure that I set the vertexColors property of the material that I am using to true.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// BUFFER GEOMERTY
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1, 0, 0,
     1, 0, 0,
     1, 1.25, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//-------- ----------
// COLORS
//-------- ----------
// add a colors prop to the geometry
const colors = new Uint8Array([
    255, 0, 0,
    0, 255, 0,
    0, 0, 255,
    0, 0, 255,
    0, 255, 0,
    255, 0, 0,
]);
// Don't forget to normalize the array! (third param = true)
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    vertexColors: true,
    side: THREE.DoubleSide
}));
scene.add(mesh);
//-------- ----------
// RENDERER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Setting Vertex colors with the Old Face3 class in older revisions of threejs \( r124- \)

In this section I have a number of older examples that make use of the Face3 class that was a feature in what is now fairly old revisons of threejs. I am leaving these examples up here but of course I am going to be kepping them down here at the lower part of the content which is just what the case should be as time goes on and if I continue to come around and edit these posts a little now and then.

### 2.1 - Face3 color in vertices 

In order to use face3 vertex colors the vertexColors property of the material that is being used must be set to the THREE.FaceColors constant. A quick example of the use of face3 vertex colors might look something like this.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(0, 0, -2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// FACE 3
//-------- ----------
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
//-------- ----------
// MESH
//-------- ----------
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

The fifth parameter of the THREE.face3 constructor can be a single color that will set a color to be used for the whole face3 instance, or it can also be an array of colors that will be a color for each vertex in the geometry of the face3. This can then be used as a crude yet effective way of styling faces in a project.

### 2.2 - Set the vertex colors for an existing geometry

When creating a custom geometry the face3 constructor can be used directly and a single color or array of colors can be given when calling the face3 constructor. However when working with a geometry that all ready exists another way of setting the vertex colors or a single face color is by going over each instance of face3 and just set the color or vertexColors properties of each face3 instance.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.2, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// FACE3
//-------- ----------
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
//-------- ----------
// MESH
//-------- ----------
var mesh = new THREE.Mesh(box,
        new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors
        }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## Conclusion

When it comes to Face3 color I can still use the Face3 constructor and set vertex colors to each instance of Face3 as a way to have a vertex color effect, but only if I am willing to stick to old versions of threejs which I might not be at this time. It might be possible to bring back the Geometry constructor and Face3 by way of some external files as that is often the case when features are removed. However I think that it is best to just learn how to do everything that I want to do with threejs by using the Buffered Geometry Constructor.

So then maybe a better post to read would be something on using the buffer geometry constructor, and the groups array that is not the modern replacement for what face3 was all about. In my post on the buffer geometry constructor I have some examples that have to do with working with the groups array, but I also have some examples on my posts on the various geometry constructors such as the [plane geometry](/2019/06/05/threejs-plane/) constructor that might be a good starting point when it comes to learning about the groups array.

If you are just looking for more three.js content to read I have a [post in which I outline a collection of simple threejs project examples](/2021/02/19/threejs-examples/) that I keep coming back to now that might be worth checking out. Playing around with simple little code examples is one thing but sooner or later it comes time to figure out what the long term plan should be with threejs aside from just making simple code examples and writing blog posts about them.

