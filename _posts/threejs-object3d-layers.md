---
title: Layers in threejs
date: 2021-06-04 10:21:00
tags: [three.js]
layout: post
categories: three.js
id: 882
updated: 2023-05-17 13:51:29
version: 1.25
---

There are a number of ways to have control over visibility in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) such as with the [visible property of the obejct3d class](https://threejs.org/docs/#api/en/core/Object3D.visible), or making the material used with an object transparent and lowering the opacity. There is also just simply not adding an object to a scene object, or having an object added to the scene, and another that is not and swapping objects to and from them as children. 

There are a whole lot of tricks for changing the visibility of objects, however in this post I will be making use of the [layers property of an object3d instance](https://threejs.org/docs/index.html#api/en/core/Object3D.layers). This layers property contains an instance of the [Layers class](https://threejs.org/docs/index.html#api/en/core/Layers) that can be used as a way to go about setting objects to different layers. It is then possible to [set what layers a camera should draw](https://stackoverflow.com/questions/34099808/how-to-make-objects-visible-to-only-one-camera-in-a-three-js-scene) which is then a way to go about having control over the visibility of objects.

Any object in threejs that is based on the [object3d class](/2018/04/23/threejs-object3d/) such as a [Mesh](/2018/05/04/threejs-mesh/), [Group](/2018/05/16/threejs-grouping-mesh-objects/), or [Camera](/2018/04/06/threejs-camera/) has a layers property that by default is set to just layer 0. When using the render function of a renderer such as the [web gl renderer](/2018/11/24/threejs-webglrenderer/) as [scene object](/2018/05/03/threejs-scene/) is passed as the first argument followed by a reference to a camera to use to render a view of the scene. When doing so the camera used will only render objects that are enabled for one or more of the layer index values enabled for the camera. So then it would make sense to work out at least a few examples of this object3d class feature to gain a sense as to why this would be useful when working on a threejs project.

<!-- more -->

## Layers in threejs and what else you show know about first

This is a post on the layers property of the object3d class that holds an instance of the Layers class in the javaScript library known as threejs. This is then a not so basic post on threejs and javaScript in general and I assume that you have at least some basic working knowledge when it comes to getting up and running with a threejs project. In any case in this section I will be going over a few things that you should be aware of before continuing to read the rest of this post.

### Layers are just one way to control visibility of objects

The layers property of an object is just one tool in the tool box of threejs when it comes to controlling the visibility of objects in threejs. There are a number of other features such as the [visible property](/2021/05/24/threejs-object3d-visible/) of an objects based on object3d that can be used to completely disable the visibility of an object all together for example. Another feature of interested has to do with materials when it comes to the [transparency Boolean, and the opacity property](/2021/04/21/threejs-materials-transparent/) of materials, as well as [alpha maps](/2019/06/06/threejs-alpha-map/). 

These material level features can be used to make objects look a little transparency, or completely invisible if the opacity value is set to a value that will result in that kind of effect. There is also just simply having more than one scene object and just having control over what scene object gets passed to a renderer at any given moment, or having a pool of objects that is not attached to any scene, but objects get swapped between a group that is attached to a scene object, and back to the pool as needed.

Still the layers property is a good option for setting certain objects to certain layers and then just having some way to control what layers get rendered.

### Source code examples are on Github

The source code examples that I am writing about in this post [can also be found on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-layers). This is also a repo where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### version numbers matter with threejs

When I first made these source code examples, and wrote this post I was using [threejs r127](https://github.com/mrdoob/three.js/releases/tag/r127), which was a late versions of threejs in late March of 2021. The last time I came around to do a little editing i was using r146 and was able to update the examples and get them working well with r146.

## 1 - Basic Object3d layers property example using Layers.enableAll and Layers.set

I like to try my best to keep the first example of something in a post like this as basic as possible while still being a full working example for the sake of being kind to people that are still a little new to threejs, as well as just getting to the basic idea which is nice anyway. In this example I am just creating a scene object, and then creating and adding a grid helper to the scene object. Before I add the grid helper to the scene object though I am calling the enable all method off of the layers property of the grid helper. This will result in the grid helper being active for all layers, not just the default layer 0.

I then also created and added a mesh object to the scene, and before adding the mesh to the scene I used the set method of the Layers instance to make it so the mesh will only be rendered with a camera that is enabled for layer 1. So in other words the set method will disable an object for all layers, except the layer index that is given as the first argument.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer(): new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
grid.layers.enableAll();
scene.add(grid);
//-------- ----------
// SINGLE MESH FOR LAYER 1
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
mesh.layers.set(1);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let cameraLayer = 0;
const update = function () {
    camera.layers.set(cameraLayer);
    renderer.render(scene, camera);
    cameraLayer += 1;
    cameraLayer %= 2;
};
update();
setInterval(update, 1000);
```

So now it is just a question of what layers the camera is enabled for, for this example I am once again using the set method of the layers property of the cameras to switch between layer 0 and layer 1. The result is then a situation where the grid is always drawn when the camera is set to layer 0 or 1, and the mesh is only drawn when the layer of the camera is set to 1. So you get the basic idea when it comes to layers, there is what layers an object in a scene is set to, and there is what layer index values a camera is set to. A camera that is used to render a scene will only render objects that are enabled for the layers to which the cameras is enabled for.

## 2 - Having a layers modes array, and using thr Layers.enable method

So there is the enable all method that will enable an object for all layers, and there is the set method that will enabled an object for just one layer, however what if I want to enable just a certain collection of layers? For this there is the disable all method that can be used to make it so all layers are disabled, then I can use the enable method rather than the set method to just switch on whatever layers I want to use.

So then in this example I am creating an array of layer numbers that I would like to each mode. Thai is a kind of layer modes array that is an an array of arrays where each nested array is a layer that is to be active for that mode index. I have one mode that is just layer 0, layer 1, layer 2, and another that is both layer 0 and 1. The idea here then is to just have a basic system working where I can set any object to one of these modes where the layers will be enabled for each layer index in a gievn array index number.

So at the top of the example I have this array of layer modes, and then a variable to hold the current mode index when it comes to looping over these for the camera. I then have a set to layer mode helper method that is the main method of interest with this example. Here I am calling the disable all method of the given object to make it so that the object is not enabled for any layer at all for starters. I then use the given index number to get the array of layer numbers to enable for the object and use the enable method of the Layers class rather than the set method.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer(): new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LAYER MODES
//-------- ----------
const layerModes = [[0], [1], [2], [0, 1]];
let layerModeIndex = 0;
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const setToLayerMode = function (obj, index) {
    obj.layers.disableAll();
    layerModes[index].forEach(function (layerNum) {
        obj.layers.enable(layerNum);
    });
};
const createBoxForLayer = function (layerMode, color, x) {
    const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: color
            }));
    const boxHelper = new THREE.BoxHelper(mesh);
    setToLayerMode(boxHelper, 3);
    mesh.add(boxHelper);
    mesh.position.set(x, 0, 0);
    setToLayerMode(mesh, layerMode);
    return mesh;
};
//-------- ----------
// GRID AND MESH OBJECTS
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
grid.layers.enableAll(); // enable all will set all layers true
scene.add(grid);
// ADDING A MESH FOR LAYER MODE 0 ONLY
scene.add(createBoxForLayer(0, 'red', 2));
// ADDING A MESH FOR LAYER MODE 1 ONLY
scene.add(createBoxForLayer(1, 'lime', -2));
// ADDING A MESH FOR LAYER MODE 2 ONLY
scene.add(createBoxForLayer(2, 'white', 0));
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let lt = new Date();
const loop = function () {
    const now = new Date(),
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
```

## Conclusion

That is all I have to write about when it comes to layers alone at least, if I get some time to edit this post I might expand this at some point with more examples, however the basic idea is there at least for now. If you are looking for some additional reading it might be a good idea to take a look at [my post on the object3d class](/2018/04/23/threejs-object3d/) in general. That is a post that I keep coming back to now and then each time I work out some more examples for all the little features that there are to work with when it comes to this base class in threejs. It is a good idea to gain a solid understanding of everything there is to work with when it comes to object3d because this is a class that is at the core of so many objects in the library such as Mesh objects Groups, and even a whole Scene object.

