---
title: Cylinder Geometry threejs example
date: 2022-08-12 08:32:00
tags: [three.js]
layout: post
categories: three.js
id: 1000
updated: 2022-08-12 11:45:45
version: 1.8
---

I took the time to write a post or two on some of the various built in geometry [constructor functions](/2019/02/27/js-javascript-constructor/) that there are to work with in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) such as the [box geometry](/2021/04/26/threejs-box-geometry/) constructor. However I have not yet got around to writing one on [cylinder geometry](https://threejs.org/docs/#api/en/geometries/CylinderGeometry), so I though that this weeks post should be just a quick post on this constructor as well on top of the older ones that I have wrote. 

One interesting thing about the cylinder geometry constructor is that I can give both a top, and bottom radius and when doing so I can set a radius of zero for one of these which allows me to use this is a replacement for the [cone geometry](https://threejs.org/docs/#api/en/geometries/ConeGeometry) constructor. So like many of the other built in geometry constructors I can make a few shapes other than that of a cylinder actually depending on the argument values that I give when calling it.

<!-- more -->

## Cylinder Geometry and what to know first

This is a post on the Cylinder geometry constructor in the javaScript library known as threejs. Although I will be keeping many of the source code examples in this post fairly simple, this is not a getting started with threejs kind of post and I assume that you have at least a little experience with the library before hand. Although I will not be getting into every little detail that you should know at this point, I will take a moment to write about a few things that you migth want to read up more on before continuing to read the rest of this post.

### Read up more on Buffer Geometry in general

The cylinder geometry constructor is just one of many options to go about creating a geometry in treejs by calling a function and passing a few arguments. There are other options when it comes to built in geometry constructor functions of course, but there is also learning how to work with the constructor directly to create custom geometry with javaScript code as well as various common features with [buffer geometry in general](/2021/04/22/threejs-buffer-geometry/). There are also other options when it comes to getting a geometry by means of some kind of data source in the from of an external fine such as the buffer geometry loader and the DAE file loader.

### Source code is on Github

The source code examples that I am writing about here can also be found in [my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-cylinder-geometry).

### Version numbers matter

When I first wrote this post I was using r140 of threejs.

## 1 - A Basic Cylinder geometry example

To start out with I am going to have an example that is just the usual setup with a scene object, camera, and renderer along with just one mesh object. When it comes to the mesh object I will of course be using the Cylinder geometry constrictor and I will not be doing anything fancy with materials and lighting here.

When making a mesh object to add to the scene I first need a geometry and one way to do so would be to call the Cylinder geometry constructor. When doing so the first two arguments are for setting the top and bottom radius values for the cylinder. The third argument is for setting the length of the cylinder, and after that the fourth and firth arguments are for setting what the count should be for radial and height segments. There are additional arguments after that but for now I think I should just stick with these argument for the sake of this basic example.

```js
//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 3, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********
var geo = new THREE.CylinderGeometry(1, 1, 3, 10, 10);
var mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
scene.add(mesh);
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```

## 2 – Making a Cone with Cylinder Geometry

A while back I did write a [blog post on the cone geometry constructor](/2019/07/31/threejs-cone/) as a way to make cone shapes. However it would seem that the cylinder geometry constructor can also be used to make this kind of shape, and thus proves to be a little more flexible when it comes to making various typical shapes for a scene.

When calling the cylinder geometry constructor as covered in the basic example the first two arguments that I give are used to set the top, and bottom radius values. So then to make a cone shape I just need to set a value of zero for one of these first two arguments.

```js
//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********
 
// some values for a cone
var rTop = 0,
rBottom = 1,
length = 3;
 
// making a cone with CylinderGeometry
var geo1 = new THREE.CylinderGeometry(rTop, rBottom, length, 20, 20);
var mesh1 = new THREE.Mesh(geo1, new THREE.MeshNormalMaterial());
scene.add(mesh1);
 
// making a cone with ConeGeometry
var geo2 = new THREE.ConeGeometry(rBottom, length, 20, 20);
var mesh2 = new THREE.Mesh(geo2, new THREE.MeshNormalMaterial());
mesh2.position.set(0, 0, 3);
scene.add(mesh2);
 
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```

## 3 - Groups and cylinder geometry

One of many things to be aware of when it comes to geometry in threejs is the groups attribute of a geometry. This is something that comes into play when dealing with an array of materials rather than just one. When doing so the question comes up as to how to get about defining what material will be used where and this is what the groups property of the geometry is for.

I have [wrote a post on the material index property of the objects that are used in groups and arrays of materials](/2018/05/14/threejs-mesh-material-index/) before hand so I will not be getting into this one in two much detail here. However I think I should make at least one example that quickly shows what the deal is with the default state of groups when calling the constructor.

With that said I can give an array of three materials rather than just one for the materials argument when making the mesh object. When doing so the material at index value 0 will be used for the side of the cylinder, while the other two index values will be used for the top and bottom caps of the cylinder.

```js
//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(3, 4, 1);
scene.add(dl);
 
//******** **********
// MESH
//******** **********
 
var materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000}),
    new THREE.MeshStandardMaterial({ color: 0x00ff00}),
    new THREE.MeshStandardMaterial({ color: 0x00ffff})
];
 
var mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
scene.add(mesh1);
 
var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
mesh2.position.set(0, 0, 1);
mesh2.rotation.z = Math.PI * 0.6;
scene.add(mesh2);
 
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```

## 4 - Open caps and additional arguments

There are a few more arguments to work with when making a cylinder geometry when calling the constructor function. The one after the radian and height segments counts is a Boolean to set open caps as true or not, the default with this one is false which means that there will be caps for the cylinder. After that the last options  have to do with setting a starting radian position and a radian delta from that starting position.

There is the [Math utils object](/2022/04/11/threejs-math-utils/) that contains useful methods for quickly converting from degree to radians. Also if I am going to have open caps I might want to set the side property value of the material that I am using to a value that will be double side, so that both sides of a face are render rather than just the front side.

```js
//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********
var mesh1 = new THREE.Mesh(
     // Cylinder Geometry Constructor call using all arguments
     new THREE.CylinderGeometry(3, 3, 3, 20, 20,
        true, // true is for open caps
        THREE.MathUtils.degToRad(45), // start radian
        THREE.MathUtils.degToRad(220)   // rdaian length
     ),
     // Using the normals material and making sure to use Double side
     new THREE.MeshNormalMaterial({
         side: THREE.DoubleSide
     })
);
scene.add(mesh1);
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```

## Conclusion

That will be it for now at least when it comes to the cylinder geometry constructor in threejs. Every now and then I do come around to do a little editing so I am sure I will expand this post at some point in the future when doing so.
 However there might only be so much more to write about when it comes to the cone geometry constructor alone rather than topics that apply to geometry in general.

When it comes to additional related topics to read more about you might want to check out the many other built in constructors such as the [Sphere geometry](/2021/05/26/threejs-sphere/), [Edge geometry](/2021/05/31/threejs-edges-geometry/), and [Capsule geometry](/2022/07/22/threejs-capsule-geometry/) constructors just to name a few. There is also looking into the many other ways to create or load in geometry such as making a custom geometry with javaScript code by starting with the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/). When it comes to loading an external, fine there is the built in buffer geometry loader, but I tend to prefer the [DAE file loader](/2021/04/30/threejs-dae-collada-loader/) for that sort of thing.
