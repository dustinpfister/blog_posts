---
title: The Curve class and tube geometry in threejs
date: 2022-06-17 14:06:00
tags: [three.js]
layout: post
categories: three.js
id: 993
updated: 2022-06-28 11:08:21
version: 1.5
---

The [curve class in threejs](https://threejs.org/docs/#api/en/extras/core/Curve) is a way to go about creating a curve with a little javaScript logic that can then be used with the tube geometry constructor as the first argument for the function. 

The curve class is a base class for making an object composed of methods that are used to define the points in 3d space that define the curve. This curve class and any additional class3s based off if it is then a little different from the idea of having a collection of Vector3 class instances that re crated by way of some logic, or just exists as some form of data that is hard coded into javaScript or in some kind of additional asset like a JSON file. This might then be one of the limitations of the curve class and also the closely corresponding tube geometry constructor when it comes to the idea of having data rather than a means of generating data. 

However there might be ways of getting around that limitation, or just making use of some kind of alternative to the curve class and tube geometry. A long time ago I wrote a post on the subject of so called fat lines that where a kind of additional line constructor that can be added to threejs by way of an additional javaScript file. However I am sure there are many other ways of getting a desired outcome when it comes to do things sort of thing such as using capsule geometry with a collection of vector3 class instances.

<!-- more -->


## 1 - Basic THREE.Curve and THREE.TubeGeometry example

When it comes to the curve and rub geometry constructors in threejs one has to start somewhere, so for this example I will be doing just that with the THREE.Curve constructor and the tube geometry constructor.

```js
//******** **********
// SCENE, CAMERA, RENDERER
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
// LIGHT
//******** **********
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05) )
//******** **********
// CURVE, TubeGeometry, Mesh
//******** **********
// basic cuve class extending three curve
class BasicCurve extends THREE.Curve {
    constructor() {
        super();
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        var tx = -2 + 4 * t,
        ty = Math.pow(2, 5 * t) / Math.pow(2, 5) * 7,
        tz = 0;
        return optionalTarget.set( tx, ty, tz );
    }
};
// creating a tube geometry with path and additional arguments using basic curve
let path = new BasicCurve(),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
let mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0xff0000, side: THREE.DoubleSide })
);
scene.add( mesh );
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
```