---
title: Threejs tree sphere world example
date: 2021-05-21 10:52:00
tags: [three.js]
layout: post
categories: three.js
id: 872
updated: 2021-05-22 09:10:04
version: 1.4
---

Earlier this week I wrote a post on a simple tree model in three.js, so today I thought I would write a post on another example in which I am using that tree model to create a simple world of sorts with these trees all over it. The idea here is to just have instances of this simple tree model positioned on the surface of a sphere. So todays three.js example is actually now just one example but a combination of several examples that I have worked out all ready in the past.

<!-- more -->

## 2 - The World model

```js
(function (api) {
 
    var MATERIALS_TREE = {
        sphere: new THREE.MeshNormalMaterial(),
        trunk: new THREE.MeshNormalMaterial()
    };
 
    var MATERIALS_LIGHTS = {
        sun: new THREE.MeshNormalMaterial(),
        moon: new THREE.MeshNormalMaterial()
    };
 
    var MATERIALS_GROUND = {
        grass: new THREE.MeshNormalMaterial()
    };
 
    var createTrees = function (count, radius, MATERIALS_TREE) {
        count = count === undefined ? 5 : count;
        radius = radius === undefined ? 4 : radius;
        var group = new THREE.Group();
        var i = 0;
        while (i < count) {
            // create a tree
            var tree = TreeSphereMod.create({
                    sphereSize: 0.25 + 0.75 * Math.random(),
                    trunkLength: 1 + 4 * Math.random(),
                    materials: MATERIALS_TREE
                });
            // position and rotate the tree
            var per = i / count,
            radian = Math.PI * 2 * per;
            tree.position.set(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
            tree.lookAt(0, 0, 0);
            //tree.rotation.set(0, Math.PI * 2 - Math.PI / (count / 2) * i, Math.PI * 1.5);
            group.add(tree);
            i += 1;
        }
        return group;
    };
 
    // create and return a lights group
    var createLights = function (MATERIALS_LIGHTS) {
        var lights = new THREE.Group();
        var sun = new THREE.Mesh(
                new THREE.SphereGeometry(1, 20, 20),
                MATERIALS_LIGHTS.sun);
        sun.add(new THREE.PointLight(0xffff00, 1));
        sun.position.set(11, 0, 0);
        lights.add(sun);
        var moon = new THREE.Mesh(
                new THREE.SphereGeometry(0.25, 20, 20),
                MATERIALS_LIGHTS.moon);
        moon.add(new THREE.PointLight(0x0040ff, 1));
        moon.position.set(-11, 0, 0);
        lights.add(moon);
        // add AmbientLight
        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.intensity = 0.1;
        lights.add(ambientLight);
        return lights;
    };
 
    api.create = function (opt) {
        opt = opt || {};
        opt.MATERIALS_GROUND = opt.MATERIALS_GROUND || MATERIALS_GROUND;
        opt.MATERIALS_TREE = opt.MATERIALS_TREE || MATERIALS_TREE;
        opt.MATERIALS_LIGHTS = opt.MATERIALS_LIGHTS || MATERIALS_LIGHTS;
 
        var world = new THREE.Mesh(
                new THREE.SphereGeometry(4, 30, 30),
                opt.MATERIALS_GROUND.grass);
        world.position.set(0, 0, 0);
        var trees = createTrees(8, 4, opt.MATERIALS_TREE);
        trees.rotation.z = Math.PI / 180 * 0;
        world.add(trees);
 
        var trees2 = createTrees(8, 4, opt.MATERIALS_TREE);
        trees2.rotation.y = Math.PI / 180 * 20;
        trees2.rotation.x = Math.PI / 180 * 0;
        trees2.rotation.z = Math.PI / 180 * 90;
        world.add(trees2);
        world.userData.lights = createLights(opt.MATERIALS_LIGHTS);
        world.add(world.userData.lights);
        world.userData.lightsDPS = {
            x: opt.lightsDPSX || 0,
            y: opt.lightsDPSY || 0,
            z: opt.lightsDPSZ || 0
        };
        world.userData.worldRotation = opt.worldRotation || 0;
        return world;
    };
 
    api.update = function (world, secs) {
        var ud = world.userData;
        world.rotation.y += Math.PI / 180 * ud.worldRotation * secs;
        world.rotation.y %= Math.PI * 2;
 
        var lights = ud.lights;
        lights.rotation.x += Math.PI / 180 * ud.lightsDPS.x * secs;
        lights.rotation.y += Math.PI / 180 * ud.lightsDPS.y * secs;
        lights.rotation.z += Math.PI / 180 * ud.lightsDPS.z * secs;
        lights.rotation.x %= Math.PI * 2;
        lights.rotation.y %= Math.PI * 2;
        lights.rotation.z %= Math.PI * 2;
    };
 
    return api;
}
    (this['WorldMod'] = {}));
```

## 3 - The tree model

Here I have the source code of the tree sphere model that i will be using in the world module. The state of the source code is not all the different form what I world out for my example on this tree model by itself. It is just that this time around I am writing a whole bunch more code around this as a way to do something more with it.

```js
(function (api) {
 
    // default materials
    var materials_default = {
        sphere: new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x004f00,
            side: THREE.DoubleSide
        }),
        trunk: new THREE.MeshStandardMaterial({
            color: 0xffaf00,
            emissive: 0x442200,
            side: THREE.DoubleSide
        })
    };
 
    var createSphere = function (opt, materials) {
        var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(opt.sphereSize, opt.widthSegments, opt.heightSegments),
                materials.sphere);
        var adjust = (opt.trunkLength / 2 + opt.sphereSize * 0.75);
        sphere.position.set(0, 0, adjust * -1);
        return sphere;
    };
 
    var createTrunk = function (opt, materials) {
        var trunk = new THREE.Mesh(
                new THREE.BoxGeometry(opt.trunkSize, opt.trunkLength, opt.trunkSize),
                materials.trunk);
        trunk.position.set(0, 0, 0);
        trunk.rotation.set(1.57, 0, 0);
        return trunk;
    };
 
    // create and return a house
    api.create = function (opt) {
 
        opt = opt || {};
        opt.trunkLength = opt.trunkLength === undefined ? 2 : opt.trunkLength;
        opt.sphereSize = opt.sphereSize === undefined ? 1 : opt.sphereSize;
        opt.trunkSize = opt.trunkSize === undefined ? 0.25 : opt.trunkSize;
        opt.widthSegments = opt.widthSegments === undefined ? 15 : opt.widthSegments;
        opt.heightSegments = opt.heightSegments === undefined ? 15 : opt.heightSegments;
 
        var materials = opt.materials || materials_default;
        var tree = new THREE.Group();
 
        var sphere = createSphere(opt, materials);
        tree.add(sphere);
        var trunk = createTrunk(opt, materials);
        tree.add(trunk);
 
        return tree;
    };
 
}
    (this['TreeSphereMod'] = {}));
```
