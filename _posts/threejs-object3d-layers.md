---
title: Layers in threejs
date: 2021-06-04 10:21:00
tags: [three.js]
layout: post
categories: three.js
id: 882
updated: 2021-06-04 12:24:05
version: 1.17
---

There are a number of ways to have control over visibility in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) such as with this visible property of the obejct3d class or just simple not adding an object to a scene object, or having more than one scene object, so forth and so on. This post however will be on making use of the [layers property of an object3d instance](https://threejs.org/docs/index.html#api/en/core/Object3D.layers) which contains an instance of the [Layers class](https://threejs.org/docs/index.html#api/en/core/Layers) that can be used as a way to go about setting objects to different layers. It is then possible to [set what layers a camera should draw](https://stackoverflow.com/questions/34099808/how-to-make-objects-visible-to-only-one-camera-in-a-three-js-scene) which is then a way to go about having control over the visibility of objects.

Any object in threejs that is based on the object3d class such as a Mesh, Group, or Camera has a layers property that by default is set to just layer 0. When using the render function of a renderer such as the web gl renderer as scene object is passed as the first argument followed by a reference to a camera to use to render a view of the scene. When doing so the camera used will only render objects that are enabled for one or more of the layer index values enabled for the camera.

<!-- more -->

## 1 - layers in threejs and what else you show know about first

This is a post on the layers property of the object3d class that holds an instance of the Layers class in the javaScript library known as threejs. This is then a not so basic post on threejs and javaScript in general and I assume that you have at least some basic working knowledge when it comes to getting up and running with a threejs project. In any case in this section I will be going over a few things that you should be aware of before continuing to read the rest of this post.

### 1.1 - Layers are just one way to control visibility of objects

The layers property of an object is just one tool in the tool box of threejs when it comes to controlling the visibility of objects in threejs. There are a number of other features such as the [visible property](/2021/05/24/threejs-object3d-visible/) of an objects based on object3d that can be used to completely disable the visibility of an object all together for example. Another feature of interested has to do with materials when it comes to the [transparency boolean, and the opacity property](/2021/04/21/threejs-materials-transparent/) of materials, as well as alpha maps. These material level features can be used to make objects look a little transparency, or completely invisible if the opacity value is set to a value that will result in that kind of effect. There is also just simply having more than one scene object and just having control over what scene object gets passed to a renderer at any given moment, or having a pool of objects that is not attached to any scene, but objects get swapped between a group that is attached to a scene object, and back to the pool as needed.

Still the layers property is a good option for setting certain objects to certain layers and then just having some way to control what layers get rendered.

### 1.2 - version numbers matter with threejs

When I made these source code examples I was using [threejs r127](https://github.com/mrdoob/three.js/releases/tag/r127), which was a late versions of threejs in late March of 2021.

## 2 - Basic Object3d layers property example using Layers.enableAll and Layers.set

I like to try my best to keep the first example of something in a post like this as basic as possible while still being a full working example for the sake of being kind to people that are still a little new to threejs, as well as just getting to the basic idea which is nice anyway. In this example I am just creating a scene object, and then creating and adding a grid helper to the scene object. Before I add the grid helper to the scene object though I am calling the enable all method off of the layers property of the grid helper. This will result in the grid helper being active for all layers, not just the default layer 0.

I then also created and added a mesh object to the scene, and before adding the mesh to the scene I used the set method of the Layers instance to make it so the mesh will only be rendered with a camera that is enabled for layer 1. So in other words the set method will disable an object for all layers, except the layer index that is given as the first argument.

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

So now it is just a question of what layers the camera is enabled for, for this example I am once again using the set method of the layers property of the cameras to switch between layer 0 and layer 1. The result is then a situation where the grid is always drawn when the camera is set to layer 0 or 1, and the mesh is only drawn when the layer of the camera is set to 1. So you get the basic idea when it comes to layers, there is what layers an object in a scene is set to, and there is what layer index values a camera is set to. A camera that is used to render a scene will only render objects that are enabled for the layers to which the cameras is enabled for.

## 3 - Having a layers modes array, and using thr Layers.enable method

So there is the enable all method that will enable an object for all layers, and there is the set method that will enabled an object for just one layer, however what if I want to enable just a certain collection of layers? For this there is the disable all method that can be used to make it so all layers are disabled, then I can use the enable method rather than the set method to just switch on whatever layers I want to use.

```js
(function () {
 
    var layerModes = [[0], [1], [2], [0, 1]],
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
        setToLayerMode(boxHelper, 3);
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
    // ADDING A MESH FOR LAYER MODE 2 ONLY
    scene.add(createBoxForLayer(2, 'white', 0));
 
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

## 4 - Conclusion

That is all I have to write about when it comes to layers alone at least, if I get some time to edit this post I might expand this at some point with more examples, however the basic idea is there at least for now. If you are looking for some additional reading it might be a good idea to take a look at [my post on the object3d class](/2018/04/23/threejs-object3d/) in general. That is a post that I keep coming back to now and then each time I work out some more examples for all the little features that there are to work with when it comes to this base class in threejs. It is a good idea to gain a solid understanding of everything there is to work with when it comes to object3d because this is a class that is at the core of so many objects in the library such as Mesh objects Groups, and even a whole Scene object.

