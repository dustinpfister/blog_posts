---
title: Points in threejs
date: 2023-02-23 08:44:00
tags: [three.js]
layout: post
categories: three.js
id: 1029
updated: 2023-02-23 09:25:58
version: 1.2
---

When it comes to adding content to a scene for the most part one will want to make use of Mesh objects, and with that geometry and materials that work with such objects. However when it comes to first starting out learning how to make custom geometry, and for other various reasons one might want to make use of an alternative such as THREE.Points. The THREE.Points class is a way to create a content object with a geometry that can just have a position attribute and nothing else. The position attribute is the first and foremost attribute that one will want to work out when making a custom geometry as it is the actual points in space. So often I might start out using THREE.Points when making a custom geometry when starting out. Once I have the position attribute worked out well I can then move on to working out the various other attributes that will get the geometry to work well with Mesh Objects.

There are a number of other reasons why one might want to use the THREE.Points class. One thing that I find myself using it for all the time is to get a visual idea of what is going on with the state of a Curve Path for example. In any case in this post I will be writing about a general overview of the THREE.Points class, and while I am at it write about a lot of other things that will come up in the process such as position attributes of buffer geometry objects.

<!-- more -->


## 1 - Some basic examples of THREE.Points

To start out this post in this section I will be getting a few basic examples out of the way. The general idea here with THREE.Points is very similar to that of THREE.Mesh in that I need to create a geometry, and then pass that geometry as the first argument when calling the THREE.Points constructor function. However when it comes to passing a material as the second argument I can not make use of any of the materials that are made for mesh objects. Aside from that once I have a points objects I can add that object to my main scene object, just like that of any other Object3d class based object.

### 1.1 - Just using a THREE.BoxGeometry

Just like with all my other posts on threejs I have to start somewhere, and for this basic example of the THREE.Points class I will be starting out with a very basic hello world type example of THREE.Points. Just like with any other threejs example I need to start out with a scene object, camera, and renderer. Once I have the usual set of objects I can then create a THREE.Points object and add that to the scene. When it comes to doing so I need a geometry and for this first example I am just making a box geometry wit the built in THREE.BoxGeometry constructor and passing that as the first argument when calling THREE.Points.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2);
const points = new THREE.Points(geo);
scene.add(points);
scene.add( new THREE.GridHelper( 10,10 ) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

After I create my Points object and add that to the scene I then position my camera and call the render method of the webgl renderer passing the scene object, and the camera to render the current state of this scene. The end result is then four points in the canvas, or at least that is what it looks like anyway. More on this in this section as I at least touch base on the position attribute of buffer geometry objects.

### 1.2 - Using a Plane Geometry and Edges Geometry

For this next basic demo I will be making use of a PlaneGeometry, and also demo what happens when using Edge Geometry as well.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo_plane = new THREE.PlaneGeometry(10, 10, 10, 10);
geo_plane.rotateX(Math.PI * 1.5);
const geo_edges = new THREE.EdgesGeometry(geo_plane);
// ---------- ----------
// OBJECTS
// ---------- ----------
const points_plane = new THREE.Points(geo_plane);
points_plane.position.y = -3;
scene.add(points_plane);
const points_edges = new THREE.Points(geo_edges);
points_edges.position.y = 3;
scene.add(points_edges);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.3 - The Points Material

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo_plane = new THREE.PlaneGeometry(10, 10, 10, 10);
geo_plane.rotateX(Math.PI * 1.5);
const geo_edges = new THREE.EdgesGeometry(geo_plane);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material_points_1 = new THREE.PointsMaterial({color: 0xff0000, size: 0.75, transparent: true, opacity: 0.025});
const material_points_2 = new THREE.PointsMaterial({color: 0x00ff00, size: 0.25});
// ---------- ----------
// OBJECTS
// ---------- ----------
const points_plane = new THREE.Points(geo_plane, material_points_1);
points_plane.position.y = -3;
scene.add(points_plane);
const points_edges = new THREE.Points(geo_edges, material_points_2);
points_edges.position.y = 3;
scene.add(points_edges);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```


### 1.4 - Starting out with the position attribute

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const att_pos = geometry.getAttribute('position');
console.log(att_pos.count) // 24
let i = 0;
while(i < att_pos.count){
    const a1 = i / att_pos.count;
    const x2 = -10 + 20 * a1;
    att_pos.setX(i, x2);
    i += 1;
}
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5}));
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 8, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 2 - The set from points method

### 2.1 - Basic Set from Points example

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// create a count of THREE.Vector3 objects with a given for point method
const createV3Array = (count, forPoint) => {
    count = count === undefined ? 100 : count;
    forPoint = forPoint || function(v, i, count){};
    const v3_array = [];
    let i = 0;
    while(i < count){
        const v = new THREE.Vector3();
        forPoint(v, i, count);
        v3_array.push(v);
        i += 1;
    };
    return v3_array;
};
// create a geometry from an array of Vector3 objects with setFromPoints method
const createGeometryFromV3Array = (v3_array) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3_array);
    return geometry;
};
// ---------- ----------
// GEOMETRY
// ---------- ----------
// simple circle example of v3_array
const v3_array = createV3Array(20, function(v, i, count){
    const a1 = i / count;
    const radian = Math.PI * 2 * a1;
    v.x = Math.cos(radian) * 5;
    v.z = Math.sin(radian) * 5;
});
const geometry = createGeometryFromV3Array(v3_array);
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```