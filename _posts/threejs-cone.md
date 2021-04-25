---
title: Three js geometry cone examples
date: 2019-07-31 16:48:00
tags: [three.js]
layout: post
categories: three.js
id: 512
updated: 2021-04-25 10:23:14
version: 1.11
---

When it comes to [three js geometry](https://threejs.org/docs/#api/en/core/Geometry) there are a number of built in constructors that can be used to make most basic shapes such as the Box GeoMetry Constructor, and the Sphere Geometry Constructor. These constructors can be used to quickly create a geometry that can then in turn be used with a materials to produce a mesh that can then be added to a scene. One of these is the [cone geometry constructor](https://threejs.org/docs/#api/en/geometries/ConeGeometry), that is yet another basic typical shape that I would like to use in basic projects.

There is also getting into ways to go about coming up with a custom geometry by way of an extremal file, or directly working with the buffered geometry constructor and a little javaScript code to create custom geometries. However I have come to find that I like to make simple crude yet effective modules that are just groups of these basic built in shapes. The Box and Sphere constructors are great basic tools for these kinds of models, but some of the other shapes can come into play also, so it makes sense to look into them also.

<!-- more -->

## 1 - This is a post on three js

this is a post on a built in geometry constructor in three js that can be used with a bunch of other features in three js to make a cone shape. This is not a getting started post on three js let alone javaScript in general so I assume that you have at least some exposure with three js.

## 2 - Three js geometry cone basic example

The cone Geometry constructor can accept a few arguments, just like the box and sphere constructors. However just the first two are the most important when it comes to a basic example of the cone geometry constructor at least. The first one is the radius of the base of the cone and then second is the height or length of the cone from the base to the tip. The additional arguments might need to be used in a few cases here and there, but for the most part those are the two parameters that are most important so for a basic example I will be starting out with something where those tow are used, and everything else will be left to hard coded defaults.

```js
(function () {
 
    // CONE
    var coneGeo = new THREE.ConeGeometry(1, 7),
    coneMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }),
    cone = new THREE.Mesh(coneGeo, coneMaterial);
 
    // SCENE
    var scene = new THREE.Scene();
    // add cone to the scene
    scene.add(cone);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Making a half cone

To make a half cone I just need to use the last to arguments that are given to the cone geometry constructor that can be used to set a starting and ending angle for the base arc of the cone.

```js
    // CONE
    var radius = 1,
    height = 5,
    radSegs = 4,
    hightSegs = 1;
    var cone = new THREE.ConeGeometry(
            1, // radius
            5, // height
            4, //radial segments,
            1, // height segments
            false,
            0, // start angle
            Math.PI // angle length from start
        );
    material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        }),
    mesh = new THREE.Mesh(cone, material);
    scene.add(mesh);
```

## 4 - Conclusion

So the cone geometry constructor is yet another basic tool in the toolbox when it comes to quickly creating basic geometries in three.js.

