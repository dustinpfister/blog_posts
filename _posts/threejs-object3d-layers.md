---
title: Layers in threejs
date: 2021-06-04 10:21:00
tags: [three.js]
layout: post
categories: three.js
id: 882
updated: 2021-06-04 11:46:47
version: 1.8
---

There are a number of ways to have control over visibility in threejs such as with this visible property of the obejct3d class or just simple not adding an object to a scene object, or having more than one scene object, so forth and so on. This post however will be on making use of the layers property of an object3d instance as a way to go about setting objects to different layers. It is then possible to set what layers a camera should draw and then use this as a way to have control over visibility.

Any object in threejs that is based on the object3d class such as a Mesh, Group, or Camera has a layers property that by default is set to just layer 0. When using the render function of a renderer such as the web gl renderer as scene object is passed as the first argument followed by a reference to a camera to use to render a view of the scene. When doing so the camera used will only render objects that are enabled for one or more of the layer index values enabled for the camera.

<!-- more -->

## 1 - layers in threejs and what else you show know about first

This is a post on the layers property of the object3d class that holds an instance of the Layers class in the javaScript library known as threejs. This is then a not so basic post on threejs and javaScript in general and I assume that you have at least some basic working knowledge when it comes to getting up and running with a threejs project. In any case in this section I will be going over a few things that you should be aware of before continuing to read the rest of this post.

### 1.1 - Layers are just one way to control visibility of objects

layers are just one tool in the tool box of threejs when it comes to controlling the visibility of objects in threejs. There are a number of other features such as the visible property of an objects based on object3d that can be used to completely disable the visibility of an object all together for example. Another feature of interested has to do with materials when it comes to the transparency boolean, and the opacity property of materials, as well as alpha maps. These material level features can be used to make objects look a little transparency, or completely invisible if the opacity value is set to a value that will result in that kind of effect. There is also just simply having more than one scene object and just having control over what scene object gets passed to a renderer at any given moment, or having a pool of objects that is not attached to any scene, but objects get swapped between a group that is attached to a scene object, and back to the pool as needed.

Still the layers property is a good option for setting certain objects to certain layers and then just having some way to control what layers get rendered.

## 2 - Basic Object3d layers property example

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    var grid = new THREE.GridHelper(10, 10);  // ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
    grid.layers.enableAll();
    scene.add(grid);
    var mesh = new THREE.Mesh(  // SINGLE MESH FOR LAYER 1
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh.layers.set(1);
    scene.add(mesh);
 
    // camera, and renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // update
    var cameraLayer = 0;
    var update = function () {
        camera.layers.set(cameraLayer);
        renderer.render(scene, camera);
        cameraLayer += 1;
        cameraLayer %= 2;
    };
    update();
    setInterval(update, 1000);
}
    ());
```

## 3 - Having a layers modes array.

```js
(function () {
 
    var layerModes = [[0], [1], [0, 1]],
    layerModeIndex = 0;
 
    var setToLayerMode = function (obj, index) {
        obj.layers.disableAll();
        layerModes[index].forEach(function (layerNum) {
            obj.layers.enable(layerNum);
        });
    };
 
    var createBoxForLayer = function (layerMode, color, x) {
        var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: color
                }));
        var boxHelper = new THREE.BoxHelper(mesh);
        setToLayerMode(boxHelper, 2);
        mesh.add(boxHelper);
        mesh.position.set(x, 0, 0);
        setToLayerMode(mesh, layerMode);
        return mesh;
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
    var grid = new THREE.GridHelper(10, 10);
    grid.layers.enableAll(); // enable all will set all layers true
    scene.add(grid);
    // ADDING A MESH FOR LAYER MODE 0 ONLY
    scene.add(createBoxForLayer(0, 'red', 2));
    // ADDING A MESH FOR LAYER MODE 1 ONLY
    scene.add(createBoxForLayer(1, 'lime', -2));
 
    // camera, and renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1) {
            setToLayerMode(camera, layerModeIndex);
            layerModeIndex += 1;
            layerModeIndex %= layerModes.length;
            renderer.render(scene, camera);
            lt = now;
        }
    };
    setToLayerMode(camera, layerModeIndex);
    renderer.render(scene, camera);
    loop();
 
}
    ());
```