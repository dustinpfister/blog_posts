---
title: A dae tools module threejs example
date: 2021-06-25 09:53:00
tags: [three.js]
layout: post
categories: three.js
id: 897
updated: 2021-06-25 12:57:30
version: 1.15
---

I have been getting into loading dae files as a way to go about getting started using external files in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) rather than just creating groups of mesh objects by way of javaScript code alone. In other words the way that I have been creating models for threejs up to this point was with the built in geometry and material constructors to create groups of mesh objects, and then having methods that mutate the position, rotation, and scale properties of these mesh objects. I do still like those kinds of models and I also thing that it is a good starting point at least when it comes to creating objects to work with in a scene, however I would like to start working on some kind of stepping stone from that to a more professional kind of model.


<!-- more -->

## 1 - The ColladaLoader.js file, the dae tools

The source code that I am writing about in this post constitutes a javaScript module that I wrote that depends on threejs and one additional external file that can be found in the threejs github repository. This one additional file is a Collada, or dae file if you prefer, external asset loader. It also involves creating at least one dae file which is the default file format used when exporting something from blender.

## 1.1 - Version numbers matter

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

The first thing that I am going to want to test out is that the load one method will work as expected when it comes to loading a single dae file with textures, and drawing to the canvas just once.

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

## 4 - Conclusion

This dae tools module might prove to be just one of many additional works in progress when it comes to what I have together those far with respect to additional modules where I am working on top of threejs and the additional assets in the github repo. There are some additional features and changes that I might want to make with this module, but still only so much. In time I might get around to editing this post when I have a more up to date version of the dae tools module, and some additional use case examples, but for now this is all I have to write about.