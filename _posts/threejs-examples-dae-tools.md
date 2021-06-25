---
title: A dae tools module threejs example
date: 2021-06-25 09:53:00
tags: [three.js]
layout: post
categories: three.js
id: 897
updated: 2021-06-25 13:25:30
version: 1.25
---

I have been getting into loading [dae files](https://en.wikipedia.org/wiki/COLLADA) as a way to go about getting started using external files in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) rather than just creating groups of mesh objects by way of javaScript code alone. In other words the way that I have been creating models for threejs up to this point was with the built in geometry and material constructors to create groups of mesh objects, and then having methods that mutate the position, rotation, and scale properties of these mesh objects. I do still like those kinds of models and I also thing that it is a good starting point at least when it comes to creating objects to work with in a scene, however I would like to start working on some kind of stepping stone from that to a more professional kind of model.

So a more advanced kind of model might be something where I am at least creating custom geometry, complete with hvs and textures with a program like blender. However maybe still creating animation that same old way that I have done so thus far by writing some javaScript code rather than getting into animation clips. In order to get started making these kinds of models I will want to chose some kind of container format, such as the default format when exporting from blender which is dae. The dae format is a great starting format, for one thing I would say that it is very front end developer friendly as it is a plain text rather than binary format.

In this post then I will be going over what I have thus far when it comes to a set of tools that have to do with loading, and processing the results that are loaded from a dae file.

<!-- more -->

## 1 - The ColladaLoader.js file, the dae tools

The source code that I am writing about in this post constitutes a javaScript module that I wrote that depends on threejs and one additional external file that can be found in the threejs github repository. This one additional file is a Collada, or dae file if you prefer, external asset loader. It also involves creating at least one dae file which is the default file format used when exporting something from blender.

So then this is a more advanced post on the subject of threejs rather than any kind of [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or javaScript in general. There are also many additional little things that you would need to be aware of before reading this that I will not be getting into detail with here. However I always like to start off a post on threejs with this kind of section where I outline what those additional things are that you should know before hand.

## 1.1 - A program like blender will need to be used to create or edit dae files

On top of using more than one external javaScript file not including my own code I will also want to have at least one if not more dea files to load, that also have additional textures to load.

## 1.2 - These source code examples require threejs, and ColladaLoader.js

These source code examples built on top of two files that should be loaded in a page first. Just like all other three.js examples of course three.js needs to be loaded in the page, but on top of that the Collada Loader also needs to be loaded. A copy of the [Collada Loader can be found in the examples folder](https://github.com/mrdoob/three.js/blob/r127/examples/js/loaders/ColladaLoader.js) of the github repository of threejs. When pulling a copy down from there make use it is a copy that will work with the version of threejs that you are using such as r127 which is what I was using when I first wrote this post.

## 1.3 - Version numbers matter

When I wrote this post i was mainly using r127 of threejs and the state of the Collada loader that was at the same tag point in the github repo.

## 2 - The source code for the dea tools module

First off I should go over the source code of my dae tools module that I was using at the time of this writing. The first thing that I would like to get solid is a public method that can be used to load a single dae file, and do so in a way that will work well with all typical use case examples. So for this I have a load one method that serves as an abstraction for what I currently see as a best use case example of the Collada loader.

One problem that I ran into right away when it came to writing an abstraction for the Collada Loader had to do with [a problem that comes up when it comes to having textures that need to be loaded on top of the dae file by itself](https://discourse.threejs.org/t/how-to-wait-for-a-loaders-textures-to-all-be-loaded-too/25304). The on done call back of the Collada loader will fire when the dae file is loaded, but before all the additional textures are loaded. This might not present a problem when it comes to a project in which the model will be used in an animation loop, it will just result in there not being any textures for the model until they are loaded. However in a use case example in which I just call the render method once, that will of course be a problem.

```js
(function (api) {
 
    // create aa daeObjects state object
    api.create = function () {
        var state = {
           results: []
        };
        return state;
    };
 
    // load one dae file
    api.loadOne = function(daeObjects, url, onDone){
        // I will want a manager for this
        var manager = new THREE.LoadingManager();
        // the collada loader instance
        var loader = new THREE.ColladaLoader(manager);
        onDone = onDone || function(){};
        // return a promise
        return new Promise(function(resolve, reject){
            // call on done, and resolve the promise only when the dae file AND all textures load
            manager.onLoad = function(){
                var len = daeObjects.results.length;
                onDone(daeObjects[len -1 ], daeObjects.results, daeObjects);
                resolve(daeObjects);
            };
            // load the dae file and any textures
            loader.load(url,
                // done
                function (result) {
                    daeObjects.results.push(result);
                },
                // progress
                function(xhr){
                  
                },
                // error
                function(e){
                    reject(e);
                }
             );
        });
    };
 
    // create a group from a dae result object
    api.createGroup = function(daeObjects, what){
        var result = typeof what === 'object' ? what : daeObjects.results[what];
        var group = new THREE.Group();
        // copy mesh objects only
        result.scene.children.forEach(function(obj){
            if(obj.type === 'Mesh'){
                group.add(obj.clone());
            }
        });
        // copy result.scene rotation to group
        group.rotation.copy(result.scene.rotation);
        return group;
    };
 
}
    (this['DAE'] = {}));
```

## 3 - Loading a single dae file with my dae tools module and ColladaLoader.js

The first thing that I am going to want to test out is that the load one method will work as expected when it comes to loading a single dae file with textures, and drawing to the canvas just once. So for this example I am just calling the load one method, loading just a single dae file which also has some textures to load, adding just the mesh objects of the result to a main scene object, and then calling the render method of the web gl renderer just once.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
 
    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    scene.add(pl);
 
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
    // USING DAE TOOLS TO LOAD THE *.dae file
    var daeObjects = DAE.create();
    DAE.loadOne(daeObjects, "/dae/rpi4/rpi4_start_box.dae")
    .then(function(daeObjects){
        var group = DAE.createGroup(daeObjects, 0);
        scene.add(group);
        renderer.render(scene, camera);
    })
    .catch(function(e){
        console.log(e);
    });
 
}
    ());
```

When this example runs the end result is what I want to happen, the model shows up with the textures on the surfaces of the model. When I do not use an instance of THREE.LoadingManager as a way to set an on load callback, and just use the dae loader alone, this is not the result that I have. So it would seem that I have the most important part of this sort of thing down, but there might still be a little more room for improvement when it comes to having a progress meter maybe for one thing.

## 4 - Conclusion

This dae tools module might prove to be just one of many additional works in progress when it comes to what I have together those far with respect to additional modules where I am working on top of threejs and the additional assets in the github repo. There are some additional features and changes that I might want to make with this module, but still only so much. In time I might get around to editing this post when I have a more up to date version of the dae tools module, and some additional use case examples, but for now this is all I have to write about.