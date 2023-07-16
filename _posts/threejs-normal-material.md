---
title: The normal material in threejs
date: 2021-06-23 12:54:00
tags: [three.js]
layout: post
categories: three.js
id: 895
updated: 2023-07-16 08:39:50
version: 1.51
---

One of the materials that I might use as a kind of place holder material in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) would be the [normal material](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial), in fact I often seem to use if for that kind of task. One nice thing about it is that it is a way to quickly show some depth without having to do much of anything with textures and light sources. This is not the case when using the [basic material](/2018/05/05/threejs-basic-material/), which is the default material for a mesh, as it is just going to show up as a solid blob of color when just the color option is used. Other options such as the [standard material](/2021/04/27/threejs-standard-material/) will require a [light source](/2022/02/25/threejs-light/) in order to show some depth. However there are still a few other options for the task of having a simple place holder material such as the [depth material](/2021/05/04/threejs-depth-material/), or doing some kind of quick trick with lines as a child object or somehting to that effect.

The normal material will render colors to the faces of a geometry by way of the state of the [normal attribute of the buffer geometry geometry instance](https://stackoverflow.com/questions/35204824/three-buffergeometry-vertex-normals-and-face-normals) used with the [mesh object](/2018/05/04/threejs-mesh/). The normal attribute is an array of values that corresponds with the position attribute that is used to set an alternative direction independent of the state of position attribute of a geometry that holds the state of the actual points in space. The normal attribute is a must have attribute when it comes to using any material that has to do with light such as with the standard material, but it is also needed for a material such as the normal material which will help show what the deal is with the state of this kind of attribute.

The normal material can be used as a way to find out if there are problems with the normal attribute of a geometry as there is a certain look that an object should have when using it. However it might not be the best tool for the job as there are other things to work with in the core of the threejs library such as arrow helpers. In addition there are additional external files that can be used on top of threejs that will add a kind of normal helper which might be the best tool for debugging normal attributes of geometry.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/G5bD_dXg2M4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The normal material and what you should know first

In this post I am going over a few javaScript source code examples that make use of the normal material in the javaScript library known as threejs. So I trust that you have at least some knowledge of how to get up and running with the very [basics of threejs](/2018/04/04/threejs-getting-started/) when it comes to linking to the library and creating a scene object and so forth. So I will not be getting into the very basics of threejs, let alone [JavaScript in general here](/2018/11/27/js-getting-started/), but I will be quickly going over some things that you should read up more on if you have not done so before hand at this point.

### Read up more on what the normal attribute of a buffer geometry is

It might be a good idea to take some time to gain a [deeper understanding of the normal attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/) of a buffer geometry instance in general. I have wrote a post on the topic of the normal attribute alone that might be worth reading as one way to go about doing so. Crossing that bridge is something that one will just need to do sooner or later when it comes to making custom geometry, also when it comes to sticking to the built in geometry constructors there are some situations in which I might want to flip the normals, or make use of the side property of a material to get a desired outcome.

### There are other attributes to be aware of beyond just normals

So there is the normal attribute of a buffer geometry instance, but then there are other major attributes of a buffer geometry such as the [position](/2021/06/07/threejs-buffer-geometry-attributes-position/) and [uv attributes](/2021/06/09/threejs-buffer-geometry-attributes-uv/) along with a number of other attributes that might come into play also. The position, normal, and uv attributes are the core attributes that just about nay geometry should have, at least of the intention is to use it with mesh objects at least. There are also additional attributes that have to do with using [vertex colors](/2023/01/20/threejs-buffer-geometry-attributes-color/), ones that have to do with animation such as [morph attributes](/2023/02/03/threejs-buffer-geometry-morph-attributes/), weights, ect. Also there is getting into making your own custom attributes when doing so is called for.

There is also a wide range of additional prototype methods and properties of a [buffer geometry instance](/2021/04/22/threejs-buffer-geometry/) that are also worth looking into more at some point sooner or later. So on top of the core set of attributes there are also a lot of prototype methods to be aware of.

### Computing the vertex normals attribute

In this post the main focus is just simply the normal material, and not so much creating or updating a normal attribute of a geometry. I have wrote a [post on the compute vertex normals method](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) of the buffer geometry instance. This compute vertex normals method will work fine in most cases for the task of creating a normals attribute of one is not there, or updating one in the event that the position attribute chances a little. In some cases however I will need to work out a way to update the state manually though, in any case I might touch base on this a little here but for the most part that is a whole other can of worms as the expression goes.

### The other options when it comes to materials such also be considered

The mesh normal material is just one of [many material options in threejs](/2018/04/30/threejs-materials/) so it might be a good idea to read some post that serves as a general overview of all the options when it comes to materials. The main feature of interest with the normal material is just rendering textures for the faces of a geometry using the state of the normals of a geometry, but not taking into account anything that might be going on when it comes to light sources. 

### There are other tools for debugging the normals attribute

Often the normal material might be used as a way to help debug the state of a normal attribute. That is not such a bad idea as there is a certain way it should look if the normals are in a state that is often what is desired. However I will often use the normal material on top of the [vertex normal helper](https://threejs.org/docs/#examples/en/helpers/VertexNormalsHelper) that is my first and foremost tool that I would go with when it comes to the task of debugging vertex normals of a geometry.

### The source code examples in this post are up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-normal-material). This is also where I park the source code examples for my many other [blog posts on threejs](/2021/06/23/threejs-normal-material/) as well.

### Version Numbers matter

When I first wrote this post I was using r127 of threejs, and the last time I came around to do a little editing here I was [using r146 and thus followed the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) I have set for that revision. There are a lot of code breaking changes that are often made from one revision to the next. Also it looks like things are going in the direction of using JSM over that of traditional script tags as well. Concerns over version numbers do not end with threejs also, it is also important to be mindful of the browser vendor and version that you are using as well as your computers support for OpenGL.


## 1 - Basic example using the normal material

In this section I am going to be writing about a simple hello world style example of mesh normal material. So in a way this is just a very basic getting started example of threejs in general actually as I do still like to start out my threejs posts with very basic examples before getting into anything that might be a bit more advanced.

I start out the source code example by creating a [scene object](/2018/05/03/threejs-scene/), along with a [camera](/2018/04/06/threejs-camera) and a [renderer](/2018/11/24/threejs-webglrenderer) as I do with any threejs project. After I have my core set of objects set up  I will want to create a mesh object and add that mesh object to the scene as a child by using the add method of the scene object. When creating a mesh object I am going to want to pass a geometry as the first argument, and then a material as the second argument. So for this basic example I will be using one of the built in geometry constructors such as the THREE.BoxGeometry constructor, this will have the normal attribute set up to begin with. 

After I have my geometry and pass it as the first argument to the mesh constructor, I then just need a material to use with the geometry of the mesh object, and for this I am of course using the Normal Material. For this example I am just calling the THREE.MeshNormalMaterial constructor by itself without passing any options to it. I then pass this normal material instance as the second argument for the mesh object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// BOX MESH USING THE NORMAL MATERIAL
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 3, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So now that I have my scene object, camera, renderer, and mesh object all set up just the way I like it now I just need to call the render method off of the renderer object. When doing so I pass the scene object as the first argument and the camera as the second argument.

## 2 - Mutating the normal attribute to see how that changes the appearance when using the Normal Material

The normals are set up the way that they should be typically when using a built in geometry constructor such as the Box Geometry constructor that I am using in these examples. However when it comes to debugging problems with the normal attribute of a geometry there is knowing how it should look. To gain a sense of what this looks like there is taking a moment to just mutate a few values in the normal attribute of the geometry, just for the sake of seeing what happens when the normals are not in a state in which they should be in.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32/ 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH - using mutated normals attribute and normal material
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1),
normal = geo.getAttribute('normal');
normal.array[0] = -1;
normal.array[1] = -1;
normal.array[2] = -1;
const box = new THREE.Mesh(
    geo,
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 0.85, 0.75);
camera.lookAt(0, -0.125, 0);
renderer.render(scene, camera);
```

Although this example might help to show what happens when the normals are not set in a way in which they should be maybe, using the normal material alone might not be the best way to debug problems with the state of the normal material. There are a few additional tools in the core of the threejs library as well as some additional files in the repository that can be used as a way to really get to the bottom of what is going on with the state of this attribute of a buffer geometry instance.

## 3 - The vertex normals helper

If I need to debug something that is going on with a normals attribute the use of the normal material is a good start, but in order to really get a good visual idea of what is going on I will want to use the THREE.VertexNormalsHelper. This helper is not baked into the core of the threejs library and as such must be added to a project example by way of an additional file that can be found in the examples folder of the threejs Github repository. In this example I am also making use of the [orbit controls](/2018/04/13/threejs-orbit-controls/) which is another such external file that must be added to a project on top of that of threejs by itself.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// USING THE THREE.VertexNormalsHelper METHOD
//-------- ----------
const helper = new THREE.VertexNormalsHelper( box, 2, 0x00ff00, 1 );
scene.add(helper);
//-------- ----------
// UISNG ORBIT CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(2, 1, -3);
camera.lookAt(0, 0, 0);
let lt = new Date(),
state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0
};
const update = function (secs, per, bias, state) {
    helper.update();
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    update(secs, state.per, state.bias, state);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
```

## 4 - The side property of materials and normals

One thing to be aware of when it comes to normals and a material such as the normal material is the side property of a material. When it comes to the side property the default value is the value of the THREE.FrontSide constant in the threejs library. That is that it will only be the front side of each face that will be renderered. There is setting the side property to that of something like THREE.BackSide, or THREE.DoubleSide. However in any case the question might come up as to how to go about defining what side is the front side to begin with. Well the way to do so will be to change the values of the of the normal attribute which would be the alternative to changing what the value of the side property is.

<iframe class="youtube_video" src="https://www.youtube.com/embed/u67-NFiWfcg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshNormalMaterial({
        side: THREE.BackSide
    }));
scene.add(box);
//-------- ----------
// USING THE THREE.VertexNormalsHelper METHOD
//-------- ----------
const helper = new THREE.VertexNormalsHelper( box, 0.75, 0x00ff00, 1 );
helper.material.linewidth = 3;
scene.add(helper);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0,
    camUnitLength: 5,
    camDir: new THREE.Vector3(0.60, 0.75, 1.5).normalize(),
    camVec: new THREE.Vector3(),
    camLook: new THREE.Vector3(0, 0, -0.1)
};
const update = function (secs, per, bias, state) {
    helper.update();
    state.camUnitLength = 5 - 4.9 * bias;
    state.camVec.copy(state.camDir).multiplyScalar(state.camUnitLength);
    camera.position.copy(state.camVec);
    const vd = new THREE.Vector3(0,0,0);
    camera.lookAt(state.camLook);
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    update(secs, state.per, state.bias, state)
    renderer.render(scene, camera);
    state.frame += 30 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
```

## Conclusion

The normal material is often my default go to material when I am working out things that do not have to do with materials and textures and lighting just yet. The normal material is often a step up from using the basic material with just a solid color, and not much of anything else as just results in a blob of color in the canvas rather than something that looks like a solid shape. The mesh normal material is one way to show that there are sides to an object, however there are some additional options when it comes to a simple place holder material such as the [depth material](/2021/05/04/threejs-depth-material/), or using the basic material just adding a simple texture to it by way of a [data texture](/2022/04/15/threejs-data-texture/), or a [canvas texture](/2018/04/17/threejs-canvas-texture/).

I can not say that I use the normal material when it comes to making any kind of final product though, unless that final product is to outline the nature of the normal attribute of a geometry, then it goes without saying that this is the idea material to use. Even then I think I should add more to the example that just simply use the normal material, such as arrow helpers or the vertex helper to really show what the current state of things are with the normals. 

The vertex normals helper is the best tool for the job when it comes to showing the direction of each vertex in the geometry. Most of the time I would want all of them to just point outward form the center of the geometry, but in some cases I might need to do something weird.
