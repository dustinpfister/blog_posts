---
title: Capsule geometry in threejs
date: 2022-07-22 08:00:00
tags: [three.js]
layout: post
categories: three.js
id: 997
updated: 2022-07-22 08:20:07
version: 1.2
---

There are many built in geometry constructors in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) that can be used to create an instance of buffer geometry by way of calling a function and passing a few arguments to define certain aspects of the geometry that is created by way of a [javaScript constructor function](/2019/02/27/js-javascript-constructor/). One such option that I will be writing about today is the [capsule geometry constructor](https://threejs.org/docs/#api/en/geometries/CapsuleGeometry).

<!-- more -->


## 1 - basic hello world style example of the capsule geometry

```js
// SCENE, CAMERA, RENDERER
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// CREATEING A MESH WITH A CapsuleGeometry as The GEOMETRY
var mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 2, 20, 20),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
 
// RENDER THE SCENE
renderer.render(scene, camera);
```

## 2 - group of mesh objects using the capsule geometry

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 5, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// GROUP OF MESH OBJECTS
//******** **********
// array of vector values
var vectors = [
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
];
// turn vectors array into an array of vector3 instances
vectors = vectors.map(function(a){
    return new THREE.Vector3( a[0], a[1], a[2] );
});
// create a group and add that to the scene
var group = new THREE.Group();
scene.add( group );
// make mesh objects and add them to the group
var i = 0,
thickness = 0.75,
len = vectors.length;
while(i < len - 1){
    var v = vectors[i],
    nv = vectors[i + 1],
    d = v.distanceTo(nv); // distance from current vector to next vector
    var mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(thickness, d, 10, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
    // position should be a mid point between v and nv
    var mv = v.add(nv).divideScalar(2);
    mesh.position.copy(mv);
    // adjust geo to work well with lookAt
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.lookAt(nv)
    // add to group
    group.add(mesh);
    i += 1;
}
//******** **********
// RENDER THE SCENE
//******** **********
renderer.render(scene, camera);
```