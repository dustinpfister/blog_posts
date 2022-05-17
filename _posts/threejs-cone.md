---
title: Cone geometry examples in threejs
date: 2019-07-31 16:48:00
tags: [three.js]
layout: post
categories: three.js
id: 512
updated: 2022-05-17 10:34:00
version: 1.28
---

When it comes to [three js geometry](https://threejs.org/docs/#api/en/core/Geometry) there are a number of built in [constructor functions](/2019/02/27/js-javascript-constructor/) that can be used to make most basic shapes such as the [Box geometry Constructor](/2021/04/26/threejs-box-geometry/), and the [Sphere Geometry Constructor](/2021/05/26/threejs-sphere/) just to name a new. These constructors can be used to quickly create a [buffer geometry](/2021/04/22/threejs-buffer-geometry/) that can then in turn be used with a materials to produce an over all [mesh object](/2018/05/04/threejs-mesh/) that can then be added to a [scene object](/2018/05/03/threejs-scene/) of an over all threejs project. 

One of these is the [cone geometry constructor](https://threejs.org/docs/#api/en/geometries/ConeGeometry), that is yet another basic typical shape that I would like to use in basic projects. This will then be a post on some of the details of the cone geometry constructor as well as some things that Branch off from the use of it. One major thing that I have come across in my travels is using the rotation methods of the buffer geometry instance that is returned by the cone geometry constructor to adjust the rotation of the geometry so that it works the way that I want it to when using the look at method of the object3d class for example.

There is also getting into ways to go about coming up with a custom geometry by way of an extremal file, or directly working with the buffered geometry constructor and a little javaScript code to create custom geometries. However I have come to find that I like to make simple crude yet effective modules that are just groups of these basic built in shapes. The Box and Sphere constructors are great basic tools for these kinds of models, but some of the other shapes can come into play also, such as of course the cone geometry, so it makes sense to look into them also.

<!-- more -->

## Cone geometry in threejs and what to know first

This is a post on a built in geometry constructor in three js that can be used to make a cone shape buffer geometry that can then be used with a materials to compose a mesh object. This is not a [getting started post on three js](/2018/04/04/threejs-getting-started/) let alone javaScript in general so I assume that you have at least some exposure with three js. I will not be going over every little basic detail in this section, but I can take the time to cover some basic that you should know by now when looking into all the various built in geometry constructors to work with in three.js.

### Check your version numbers

When I first wrote this post I was using version r106 of three.js and the last time I got around to do a little editing with this post I as using r135. When it comes to the cone geometry constructor alone it would seem that not much has changes from an user perspective. However code breaking changes are made to three.js all the time, so if things are not working on your end with code examples in this post, or any three.js post on the open web for that matter take into account what version you are using and the version that the author of the example was using first
### Source code examples are also on Github

The source code examples that I made for this post are also up on Github in my [test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-cone).

## 1 - Three js geometry cone basic example

The cone Geometry constructor can accept a few arguments, just like the box and sphere constructors. However just the first two are the most important when it comes to a basic example of the cone geometry constructor at least. The first one is the radius of the base of the cone and then second is the height or length of the cone from the base to the tip. The additional arguments might need to be used in a few cases here and there, but for the most part those are the two parameters that are most important so for a basic example I will be starting out with something where those tow are used, and everything else will be left to hard coded defaults.

```js
(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    // CONE
    var coneGeo = new THREE.ConeGeometry(1, 7),
    coneMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }),
    cone = new THREE.Mesh(coneGeo, coneMaterial);
    // add cone to the scene
    scene.add(cone);
    // render
    renderer.render(scene, camera);
}
    ());
```

## 2 - Cone Segments

The first two arguments that the most important when it comes to creating a cone shape, so they of course come first. However there are a few additional arguments that are also of importance when making a cone shape, such as setting the number of segments relative to the base of the circle, and the length of the code. With that said, the next two arguments can be used to do just that.

```js
(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    // CONE
    var coneGeo = new THREE.ConeGeometry(2, 4,
        60, // radian segments,
        20 // height segments
    ),
    coneMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00
    }),
    cone = new THREE.Mesh(coneGeo, coneMaterial);
    // add cone to the scene
    scene.add(cone);
    // render
    renderer.render(scene, camera);
}
    ());
```

So then there is setting the radius of the base, the length of the cone, and the number of sections to use. There is then just the question of what that additional arguments do when using the cone geometry constructor.

## 3 - Making a half cone

To make a half cone I just need to use the last to arguments that are given to the cone geometry constructor that can be used to set a starting and ending angle for the base arc of the cone. So then this example will make use of all of the arguments that can be used when creating a cone geometry.

```js
(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
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
    // render
    renderer.render(scene, camera);
}
    ());
```

## 4 - Rotating the geometry of a cone so that it works as you might want it to when using the look at method of the mesh

Often a cone geometry might be used as a way to go about pointing to something in a scene, however be default the geometry of a cone will not line up as expected when using the look at method of a mesh that contains a cone geometry. This issue can easily be fixed by just rotating the cone geometry in a way so that the geometry of the cone will line up with the front of a containing mesh object. The rotateX method of the geometry instance of the cone is what can be used to make this kind of adjustment.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(6, 8, 6);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OBJECTS
    // geometry
    var geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
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
    camera.lookAt(cone.position);
    // camera render
    renderer.render(scene, camera);
}
    ());
```

Getting into this subject in detail might be a little off topic, but if interested you might want to check out my post on [rotating buffer geometry](/2021/05/20/threejs-buffer-geometry-rotation/) in three.js. However I will just bring up one thing when it comes to rotating geometry in threejs and that is that it is something that such typically be done only once. When it comes to this issue the geometry just needs to be rotated so that things line up when using the object3d look at method of the mesh object. It is the object3d level methods and properties that should always be used to change the position and rotation of an over all mesh object.

## Conclusion

So the cone geometry constructor is yet another basic tool in the toolbox when it comes to quickly creating basic geometries in three.js. The various arguments can be tweaked to create other typical shapes also of course. For example to make a four sided pyramid I just need to set a value of 4 for the radial segments argument.

The next step with the cone geometry constructor would be to move on to making some kind of actual project of some kind with it rather than just a few quick simple hello world type examples. That of course is where things will start to get a little fun as simple examples like this can get boring at first, but it is a necessary step to get to working on something real. One simple, basic project that I have started is a crude [tree model that makes use of the cone geometry constructor](/2019/07/30/threejs-examples-tree/) along with the group constructor to make a simple tree model. This is just one of my mainly [three.js examples](/2021/02/19/threejs-examples/) that I have at least started, and might come back to at some point.

