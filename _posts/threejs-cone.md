---
title: Three js geometry cone examples
date: 2019-07-31 16:48:00
tags: [three.js]
layout: post
categories: three.js
id: 512
updated: 2021-05-22 14:46:44
version: 1.20
---

When it comes to [three js geometry](https://threejs.org/docs/#api/en/core/Geometry) there are a number of built in constructors that can be used to make most basic shapes such as the Box GeoMetry Constructor, and the Sphere Geometry Constructor. These constructors can be used to quickly create a geometry that can then in turn be used with a materials to produce a mesh that can then be added to a scene. One of these is the [cone geometry constructor](https://threejs.org/docs/#api/en/geometries/ConeGeometry), that is yet another basic typical shape that I would like to use in basic projects.

There is also getting into ways to go about coming up with a custom geometry by way of an extremal file, or directly working with the buffered geometry constructor and a little javaScript code to create custom geometries. However I have come to find that I like to make simple crude yet effective modules that are just groups of these basic built in shapes. The Box and Sphere constructors are great basic tools for these kinds of models, but some of the other shapes can come into play also, so it makes sense to look into them also.

<!-- more -->

## 1 - This is a post on three js

This is a post on a built in geometry constructor in three js that can be used to make a cone shape buffer geometry that can then be used with a materials to compose a mesh object. This is not a getting started post on three js let alone javaScript in general so I assume that you have at least some exposure with three js. I will not be going over every little basic detail in this section, but I can take the time to cover some basic that you should know by now when looking into all the various built in geometry constructors to work with in three.js.

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

## 3 - Cone Segments

The first two arguments that the most important when it comes to creating a cone shape, so they of course come first. However there are a few additional arguments that are also of importance when making a cone shape, such as setting the number of segments relative to the base of the circle, and the length of the code. With that said, the next two arguments can be used to do just that.

```js
var coneGeo = new THREE.ConeGeometry(2, 4,
        60 // radian segments,
        20 // height segments),
coneMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00
    }),
cone = new THREE.Mesh(coneGeo, coneMaterial);
```

So then there is setting the radius of the base, the length of the cone, and the number of sections to use. There is then just the question of what that additional arguments do when using the cone geometry constructor.

## 4 - Making a half cone

To make a half cone I just need to use the last to arguments that are given to the cone geometry constructor that can be used to set a starting and ending angle for the base arc of the cone. So then this example will make use of all of the arguments that can be used when creating a cone geometry.

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
            false, // open ended or capped, false means capped
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

## 5 - Rotating the geometry of a cone so that it works as you might want it to when using the look at method of the mesh

Often a cone geometry might be used as a way to go about pointing to something in a scene, however be default the geometry of a cone will not line up as expected when using the look at method of a mesh that contains a cone geometry. This issue can easily be fixed by just rotating the cone geometry in a way so that the geometry of the cone will line up with the front of a containing mesh object. The rotateX method of the geometry instance of the cone is what can be used to make this kind of adjustment.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
    // geometry
    var geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
    // Mesh
    var cone = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());
 
    // USING BUFFER GEOMERTY ROTATEX METHOD
    cone.geometry.rotateX(Math.PI * 0.5);
 
    cone.add(new THREE.BoxHelper(cone)); // adding a box helper
    scene.add(cone); // add custom to the scene
 
    // adding a cube to have the cone point to
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube.position.set(3, 0, 3);
    scene.add(cube)
 
    cone.lookAt(cube.position); // using Object3d (base class of Mesh) lookAt
 
    // camera render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(6, 8, 6);
    camera.lookAt(cone.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

Getting into this subject in detail might be a little off topic, but if interested you might want to check out my post on [rotating buffer geometry](/2021/05/20/threejs-buffer-geometry-rotation/) in three.js. However I will just bring up one thing when it comes to rotating geometry in threejs and that is that it is something that such typically be done only once. When it comes to this issue the geometry just needs to be rotated so that things line up when using the object3d look at method of the mesh object. It is the object3d level methods and properties that should always be used to change the position and rotation of an over all mesh object.

## 6 - Conclusion

So the cone geometry constructor is yet another basic tool in the toolbox when it comes to quickly creating basic geometries in three.js. The various arguments can be tweaked to create other typical shapes also of course. For example to make a four sided pyramid I just need to set a value of 4 for the radial segments argument.

The next step with the cone geometry constructor would be to move on to making some kind of actual project of some kind with it rather than just a few quick simple hello world type examples. That of course is where things will start to get a little fun as simple examples like this can get boring at first, but it is a necessary step to get to working on something real. One simple, basic project that I have started is a crude [tree model that makes use of the cone geometry constructor](/2019/07/30/threejs-examples-tree/) along with the group constructor to make a simple tree model. This is just one of my mainly [three.js examples](/2021/02/19/threejs-examples/) that I have at least started, and might come back to at some point.

