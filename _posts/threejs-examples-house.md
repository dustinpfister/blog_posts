---
title: Simple house model example in threejs
date: 2021-04-23 11:47:00
tags: [three.js]
layout: post
categories: three.js
id: 852
updated: 2021-04-23 12:08:56
version: 1.6
---

Today I thought I would make another [threejs example](/2021/02/19/threejs-examples/) type post, this time by making yet another simple model of something, this time of a basic house. I do not care to make anything that complex with this one just a very simple, basic house like model that might end up being part of a larger scene of some kind if a future project. My general idea that I have in mind is that if I make enough of these kinds of models I can use them to make an over all larger scene that will include a house model like this, along with some trees, cars, people and other similar objects that can then be used to make some kind of crude animation.

<!-- more -->

## 1 - What to know before continuing with this Three.js house model

## 2 - The House Module

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

## 3 - Now for a Demo of this

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

## 3 - Conclusion

So this is not much to look at for now, but as I make more models like this I think I will eventually start something where I am working with a bunch of models like this to produce an over all larger project. I am not interested in making games with three.js at this time, I think a project like that would end up eating up to much time, however simple crude animations might work it I am willing to put in enough time.

