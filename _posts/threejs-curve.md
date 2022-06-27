---
title: The Curve class and tube geometry in threejs
date: 2022-06-17 14:06:00
tags: [three.js]
layout: post
categories: three.js
id: 993
updated: 2022-06-27 11:19:53
version: 1.3
---

The curve class in threejs is a way to go about creating a curve with a little javaScript logic that can then be used with the tube geometry constructor as the first argument for the function. This curve class is composed of methods that are used to define the points in 3d space that define the curve, rather than a kind of class that acts on a collection of vertex3 class instances. This might then be one of the limitations of the curve class and also the closely corresponding tube geometry constructor when it comes to the idea of that kind of class. However there might be ways of getting around that limitation, or just making use of some kind of alternative to the curve class and tube geometry.

<!-- more -->


## 1 - Basic THREE.Curve and THREE.TubeGeometry example

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