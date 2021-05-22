---
title: Tree Sphere threejs example
date: 2021-05-19 17:07:00
tags: [three.js]
layout: post
categories: three.js
id: 870
updated: 2021-05-22 13:52:25
version: 1.16
---

I wrote a post on a [simple crude three model example](/2019/07/30/threejs-examples-tree/) using [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), but I thought I would come around to making another one of these just for the sake of doing the same thing a different way. The last tree model that I made involves making a whole bunch of cone geometries and then positioning them and rotating them in a way to make something that looks a little like an ever green tree. This is another model like that where I am just using a sphere geometry and a box geometry to create another kind of tree.

So it goes without saying that I am going for a kind of style where I am just making simple basic models using the built in three.js geometries. This is then a fairly basic example of this kind of model but there are still a few basic things that I need to work out when it comes to creating these kinds of groups of mesh objects. One thing to be aware of is what happens when I use the object3d look at method with out of these. For this tree model I would want for the look at method to make it so that the bottom of the trunk is what is facing the position that I give to the look at method. 

<!-- more -->

## 1 - A tree Sphere model example in three.js and what to know first

This is a post On using some built in geometry constructors and many other aspects of the three.js javaScript library to create a basic tree model for a scene. I am not going to go over the very basics of three.js and javaScript in this post, so I hope that you have at least some basic working knowledge of these topics before hand. However I will be going over a few things in this section, and like to some other resources that are work checking out. 

### 1.1 - Version Numbers matter with three.js

When I wrote this post, and tested out the code examples here I was using r127 of three.js. Changes are made to three.js all the time that often end up making code examples on the open web break, more so than usual compares to many other javaScript libraries where development moves a little slower.

### 1.2 - Groups and the Object3d class

In this three.js example I am making use of the [THREE.Group constructor](/2018/05/16/threejs-grouping-mesh-objects/) as a way to create a collection of mesh objects that compose something that looks a little like a tree. I am also using a lot of other features that are part of the object3d class such as the look at method of that class just to name on little feature. The [Object3d class](/2018/04/23/threejs-object3d/) is a base class of a whole lot of other classes in three.js that include Groups, but also things like Mesh Objects, and Cameras so the class is worth looking into in death if you have not done so before hand.

## 2 - The tree sphere module

So then here I have the tree sphere model as it currently stands as of this writing. There is not much to write about when it comes to a crude, simple static model that is created using the built in geometry constructors of three.js like this. However I think I have the few things that I should be ware of solid as it seems to be working the way I expect it to when it comes to how I intend to use it in an over all scene.

Like may of my javaScript modules I have everything wrapped up into an [IIFE](/2020/02/04/js-iife/) and I have a single global variable to which I will be attaching public methods. With the tree sphere module however there is going to just be one pubic method that will be the create method that I use outside of this module to create an instance of a sphere tree.

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

## 3 - A Simple demo of this tree sphere module

To make sure that this tree module works the way that I expect it to I am going to want to work out a little additional code that will make use of it. So then I made an additional main javaScript file in which I set up the usual scene object along with a camera, renderer, and animation loop.

```js
(function () {
 
    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
 
    // creating a tree
    var tree = TreeSphereMod.create({
            sphereSize: 1,
            trunkLength: 4
        });
    tree.add(new THREE.BoxHelper(tree));
    tree.position.set(0, 2, 0);
 
    tree.lookAt(0, -10, 0);
    scene.add(tree);
 
    var sun = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshBasicMaterial());
    sun.add(new THREE.PointLight(0xffff00, 1));
    sun.position.set(3, 3, -2);
    scene.add(sun);
 
    // camera and renderer
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(5, 8, 5);
    camera.lookAt(tree.position);
 
    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.domElement.width = 640;
    renderer.domElement.height = 480;
    renderer.setViewport(0, 0, 640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);
 
    var lt = new Date(),
    sunRadian = Math.PI,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            sunRadian += Math.PI / 180 * 45 * secs;
            sunRadian %= Math.PI * 2;
            sun.position.set(Math.cos(sunRadian) * 3, 4, Math.sin(sunRadian) * 3);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 4 - Conclusion 

This tree model might end up being used in a few additional three.js examples here and there when I want to have something that I can use to just quickly create some groups of objects that will look like trees. More often than not something like this will work just fine, however that is because I am going for a very simplistic art style when it comes to this sort of thing.

