---
title: Simple house model example in threejs
date: 2021-04-23 11:47:00
tags: [three.js]
layout: post
categories: three.js
id: 852
updated: 2021-04-23 11:52:56
version: 1.1
---

Today I thought I would make another [threejs](https://threejs.org/) eample type post, this time by making yet another simple model of something.

<!-- more -->

## 1 - The House Module

```js
(function (HouseMod) {
 
    // default materials
    var materials_default = {
        base: new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        tri: new THREE.MeshStandardMaterial({
            color: 0xaf0000,
            side: THREE.DoubleSide
        }),
        roof: new THREE.MeshStandardMaterial({
            color: 0x202020,
            side: THREE.DoubleSide
        })
    };
 
    // create a triangle part of the house
    var HouseTriangle = function(materials){
        materials = materials || materials_default;
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
                -1, 0, 0,
                0.5, 1.5, 0,
                2, 0, 0
            ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals(); // compute vertex normals
        geometry.addGroup(0, 3, 0); // just one group
        return new THREE.Mesh(
            geometry, 
            materials.tri);
    };
 
    // create and return a house
    HouseMod.create = function(materials){
        materials = materials || materials_default;
        // mian house group
        var house = new THREE.Group();
 
        // base of house is just a BOX
        var base = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 4), materials.base);
        house.add(base);
 
        // house triangle parts
        var tri1 = HouseTriangle(materials);
        tri1.position.set(-0.5, 1 , 2);
        house.add(tri1);
        var tri2 = HouseTriangle(materials);
        tri2.position.set(-0.5, 1 , -2);
        house.add(tri2);
 
        // roof
        var roof1 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof1.position.set(-1, 1.51, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        house.add(roof1);
        var roof2 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof2.position.set(1, 1.51, 0);
        roof2.rotation.set(Math.PI * 0.5, Math.PI * -0.25, 0);
        house.add(roof2);
 
        // house should cast a shadow
        house.castShadow = true;
        house.receiveShadow = false;
        return house;
    };
 
}
    (this['HouseMod'] = {}));
```

## 2 - Demo

```js
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);
 
// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.castShadow = true;
scene.add(dl);
 
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
 
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// add the house
var house = HouseMod.create();
house.position.set(-2, 1.05, 0);
scene.add(house);
 
// ground
var materials = {
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    })
};
var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
 
// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;
 
    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    controls.update();
 
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

