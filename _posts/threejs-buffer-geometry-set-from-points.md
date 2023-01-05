---
title: Set From Points Buffer Geometry method in threejs
date: 2023-01-05 09:20:00
tags: [three.js]
layout: post
categories: three.js
id: 1022
updated: 2023-01-05 10:44:31
version: 1.2
---

The [set from points method of the buffer geometry class in threejs](https://threejs.org/docs/#api/en/core/BufferGeometry.setFromPoints) is a way to create a new buffer geometry from an array of [vector3 class objects](/2018/04/15/threejs-vector3/). This new buffer geometry instance will just have a position attribute alone, which is okay when it comes to creating Points, or Lines, but not so much for Mesh objects. That is unless additional steps are taken to add the additional attributes that are needed to get the geometry to work well with mesh objects.

Even if one is just interested in creating a buffer geometry with a position attribute only to be used to just draw lines are points I have found that the set from points method might work okay for creating a geometry, but does not work so great as a way to update a geometry over time in a loop. If I want to not just create a geometry, but also update it over time, then I am not going to want to do so by directly working with a position attribute. And when doing so it would make sense to also just create and set the position attribute the hard way also. 

As far as I can tell, it would seem that this set from points method was added for the sake of making things easier when it comes to quickly creating a geometry from an array of points in the form of Vector3 objects. In this regard I would say that the set from points method is very easy to use. I just create an array of vector3 objects by one means or another, create a blank buffer geometry object, call the set from points method off of the buffer geometry passing the array of points as an argument and I am done. Simple enough sure, but it comes at a cost compared to doing it the hard way. Maybe the hard way of doing this can be avoided when it comes to creating the geometry to begin with, but in any case the hard way is still how it needs to happen when it comes to updating. Also the hard way of doing it is not actually that much harder, so then one might as well just do that actually. Still in this post I will be going over a few basic examples of this set from points method, before getting into more advanced examples.

<!-- more -->


## 1 - Some basic examples of the Set From Points Buffer Geometry class method in threejs

A basic example of the set from points method is easy enough. That is one of the nice things about this method as I have to say that it does make the process of doing this easy. However creating an array of Vector3 objects that are the points in space that I want, and just simply passing that to the set from points method is just a crude begining of course. If I want to use the geometry with the THREE.Points class then maybe this crude begining will be enough actually. However typicaly I will at least want to use this with THREE.Line, and even THREE.Mesh, in which case a crude begining is not enough. Still for this section at least I will be keeping the examples fairly basic as a way to just have some examples of this set from points method. 

While I am at it I will also be writign about the addtional attribites of the buffer geometry class, and how to add these addtional attribites to create a geometry that will work well with THREE.Mesh.

### 1.1 - Basic position attribute, and index Set From Points example for use with THREE.Line

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 0.0, 0.0, 0.0),
    new THREE.Vector3(-1.0, 0.3,-3.5),
    new THREE.Vector3( 1.0, 0.3,-3.5)
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points);
geometry.setIndex( [0,1,2,0] );
// ---------- ----------
// Line, LineBasicMaterial
// ---------- ----------
const material = new THREE.LineBasicMaterial({ linewidth: 6, color: 0xffff00 });
const line = new THREE.Line(geometry, material);
scene.add(line);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.2 - Adding a normal attribute and using it with THREE.Mesh, and the THREE.MeshNormalMaterial

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 1.5,-1.5, 0.0),
    new THREE.Vector3(-1.5,-1.5, 0.0),
    new THREE.Vector3( 0.0, 1.5, 0.0),
    new THREE.Vector3( 0.0, 0.0,-6.0),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
// geo one with index using only 4 points
const geo1 = new THREE.BufferGeometry();
geo1.setFromPoints(points);
geo1.setIndex([ 2,1,0, 0,1,3, 1,2,3, 2,0,3 ]);
geo1.computeVertexNormals();
// non indexd geo from an indexed one
const geo2 = geo1.toNonIndexed();
geo2.computeVertexNormals();
// ---------- ----------
// Mesh, MeshNormalMaterial
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geo1, material);
mesh1.position.set(-2,0,0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo2, material);
mesh2.position.set(2,0,0);
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.3 - Adding a UV Attribute and using that with Light, THREE.Mesh, and THREE.MeshPhongMaterial

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(-0.5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const draw_tri = function(ctx, canvas){
    const w = 10;
    const hw = w / 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = w;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(hw, hw);
    ctx.lineTo(canvas.width - w, hw);
    ctx.lineTo(hw, canvas.height - w);
    ctx.lineTo(hw, hw);
    ctx.stroke();
};
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 1.5,-1.5, 0.0),
    new THREE.Vector3(-1.5,-1.5, 0.0),
    new THREE.Vector3( 0.0, 1.5, 0.0),
    new THREE.Vector3( 0.0, 0.0,-6.0),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
// geo one with index using only 4 points
const geo_source = new THREE.BufferGeometry();
geo_source.setFromPoints(points);
geo_source.setIndex([ 2,1,0, 0,1,3, 1,2,3, 2,0,3 ]);
// non indexd geo from an indexed one
const geo = geo_source.toNonIndexed();
geo.computeVertexNormals();
// uv attribute
const pos = geo.getAttribute('position');
let i = 0;
const uv = [];
const a = 1, b = 0;
while(i < pos.count){
   uv.push(a,a,b,a,b,b);
   i += 3;
}
geo.setAttribute('uv', new THREE.BufferAttribute( new Float32Array(uv), 2 ))
console.log(geo)
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.2,1,0.1)
scene.add(dl);
//-------- ----------
// TEXTURE
//-------- ----------
const texture = createCanvasTexture(draw_tri, 128);
// ---------- ----------
// Mesh, MeshPhongMaterial
// ---------- ----------
const material = new THREE.MeshPhongMaterial({map: texture});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

