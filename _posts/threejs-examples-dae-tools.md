---
title: A dae tools module threejs example
date: 2021-06-25 09:53:00
tags: [three.js]
layout: post
categories: three.js
id: 897
updated: 2022-08-04 11:39:54
version: 1.46
---

I have been getting into loading [dae files](https://en.wikipedia.org/wiki/COLLADA) as a way to go about getting started using external files in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) rather than just creating groups of mesh objects, and textures by way of javaScript code alone. In other words the way that I have been creating models for threejs up to this point was with the built in geometry and material constructors to [create groups](/2018/05/16/threejs-grouping-mesh-objects/) of [mesh objects](/2018/05/04/threejs-mesh/), and then having methods that mutate the [position](/2022/04/04/threejs-object3d-position/), [rotation](/2022/04/08/threejs-object3d-rotation/), and [scale](/2021/05/11/threejs-object3d-scale/) properties of these mesh objects. One of my first examples of this kind of project would be my [guy one model](/2021/04/29/threejs-examples-guy-one/) that I started a long time ago. I do still like those kinds of models and I also think that it is a good starting point at least when it comes to creating objects to work with in a scene, however I would like to start working on some kind of stepping stone from that to a more professional kind of model.

So a more advanced kind of model might be something where I am at least creating custom geometry, complete with uvs and textures with a program like blender. However maybe still creating animation that same old way that I have done so thus far by writing some javaScript code rather than getting into animation clips, but thus is a start at least for sure. In order to get started making these kinds of models I will want to chose some kind of container format, such as the default format when exporting from blender which is dae, also known as the Collada format. The dae format is a great starting format, for one thing I would say that it is very front end developer friendly as it is a plain text rather than a binary format which is often the case with a lot of the other options.

In this post then I will be going over what I have thus far when it comes to a set of tools that have to do with loading, and processing the results that are loaded from a dae file. This will then be another one of my [threejs project example](/2021/02/19/threejs-examples/) type posts only this time it is more about just a single module rather than a full project of some kind.

<!-- more -->

## The ColladaLoader.js file, the dae tools

The source code that I am writing about in this post constitutes a javaScript module that I wrote that depends on threejs and one additional external file that can be found in the threejs github repository. This one additional file is a Collada, or dae file if you prefer, external asset loader that will load the xml data as well as any additional textures use in the file. It also involves creating at least one dae file which is the default file format used when exporting something from blender.

So then this is a more advanced post on the subject of threejs rather than any kind of [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or javaScript in general. There are also many additional little things that you would need to be aware of before reading this that I will not be getting into detail with here. However I always like to start off a post on threejs with this kind of section where I outline what those additional things are that you should know before hand.

### Source code for my dae tools module, test demos, and more is at my test threejs github repo

The [full source code of the dae tools module](https://github.com/dustinpfister/test_threejs/tree/master/views/js/utils/dae_tools) can be found at my test threejs github repository. When I first wrote this post I as writing about v0.2.0 of this dae tools module, if I work on the module more there might be later versions.

In addition to the source code of the dae tools module the test threejs repo also [holds all the test demos of dae tools module](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-dae-tools) that I am writing about here. In addition to that I also have the [dae files](https://github.com/dustinpfister/test_threejs/tree/master/views/dae) that I am loading, as well as much more that is all threejs related in the repo that I keep working on a little just about every day.

### A program like blender will need to be used to create or edit dae files

On top of using more than one external javaScript file not including my own code I will also want to have at least one if not more dea files to load, that also have additional textures to load. I am not going to be getting into the basic of blender here, also I am still fairly new to using blender anyway. At the time of this writing I learned enough to create a basic project in blender, and how to add textures and custom uvs to a mesh object. So you will want to get to that point at least when it comes to looking into additional resources on the web that have to do with learning blender.

### These source code examples require threejs, and ColladaLoader.js

These source code examples built on top of two files that should be loaded in a page first. Just like all other three.js examples of course three.js needs to be loaded in the page, but on top of that the Collada Loader also needs to be loaded. A copy of the [Collada Loader can be found in the examples folder](https://github.com/mrdoob/three.js/blob/r127/examples/js/loaders/ColladaLoader.js) of the github repository of threejs. When pulling a copy down from there make use it is a copy that will work with the version of threejs that you are using such as r127 which is what I was using when I first wrote this post.

### Version numbers matter

When I first wrote this post I was mainly using r127 of threejs, and the state of the Collada loader for that revision point in the github repo as well. In addition at the time that I came around to doing a little editing of this post I have found that the examples are still working okay with r135 as well, but thuse are the only revisions that I have tested with the source code examples here.

## 1 - The source code for the dea tools module

First off I should go over the source code of my dae tools module that I was using at the time of this writing. The first thing that I would like to get solid is a public method that can be used to load a single dae file, and do so in a way that will work well with all typical use case examples of thus module. So for this I have a load one method that serves as an abstraction for what I currently see as a best use case example of the Collada loader. However I am also going to want to have a way to create some kind of standard state object to be used with the load one method, and any additional methods that will need to work with such a state object.

So the first public method that I have is the DAE.create method that will create and return a new standard object that will be used with the various methods of this module. For now it has a results array that will hold the results objects that are loaded with the dae loader.

So then there is the load one method that I worked out which will be one of the main events of this kind of module. One problem that I ran into right away when it came to writing an abstraction for the Collada Loader had to do with [a problem that comes up when it comes to having textures that need to be loaded on top of the dae file by itself](https://discourse.threejs.org/t/how-to-wait-for-a-loaders-textures-to-all-be-loaded-too/25304). The on done call back of the Collada loader will fire when the dae file is loaded, but before all the additional textures are loaded when a dae file has additional textures that need to be loaded on top of the text of the dae file alone. This might not present a problem when it comes to a project in which the model will be used in an animation loop, it will just result in there not being any textures for the model until they are loaded. However in a use case example in which I just call the render method once, that will of course be a problem. So to resolve this I need to make use of the on load property of an instance of a [THREE.LoadingManager](https://threejs.org/docs/#api/en/loaders/managers/LoadingManager) and pass that instance as a argument to the Collada Loader constructor.

```js
// dae-tools.js - r3 - for threejs-examples-dae-tools
// * added methods for getting buffer geomerty text
(function (api) {
 
    // create a daeObjects state object
    api.create = function (opt) {
        opt = opt || {};
        var state = {
           results: [],
           onItemProgress : opt.onItemProgress || function(){},
           onFileLoad : opt.onFileLoad || function(){},
           onLoad : opt.onLoad || function(){}
        };
        return state;
    };
 
    // load one dae file
    api.loadOne = function(daeObjects, url, onFileLoad){
        // I will want a manager for this
        var manager = new THREE.LoadingManager();
        // the collada loader instance
        var loader = new THREE.ColladaLoader(manager);
        // result value to pass to onFileLoad
        var resultValue = {};
        onFileLoad = onFileLoad || function(){};
        // return a promise
        return new Promise(function(resolve, reject){
            // call on done, and resolve the promise only when the dae file AND all textures load
            var len = daeObjects.results.length;
            manager.onLoad = function(){
                onFileLoad(resultValue, daeObjects.results, daeObjects);
                resolve(daeObjects);
            };
            // load the dae file and any textures
            loader.load(url,
                // done
                function (result) {
                    resultValue = result;
                    daeObjects.results.push(result);
                },
                // progress
                function(xhr){
                  //console.log(xhr);
                },
                // error
                function(e){
                    reject(e);
                }
             );
        });
    };
 
    // load a collection of dea files
    api.loadAll = function(daeObjects, opt){
        opt = opt || {};
        opt.baseUrl = opt.baseUrl === undefined ? '/' : opt.baseUrl;
        opt.relUrls = opt.relUrls === undefined ? [] : opt.relUrls;
        opt.origin = opt.origin === undefined ? document.location.origin : opt.origin;
        // resolve urls
        var url_obj_base = new URL(opt.baseUrl, document.location.origin);
        var urls = opt.relUrls.map(function(relUrl){
            var url_obj_file = new URL(relUrl, url_obj_base.href + '/');
            return url_obj_file.href;
        });
        // create and return Promise.all of load one method called for each file
        var n = 0,
        d = urls.length;
        return Promise.all(urls.map(function(url, i){
            return api.loadOne(daeObjects, url, daeObjects.onFileLoad).then(function(){
                n += 1;
                daeObjects.onItemProgress(n / d, n , d);
            });
        })).then(function(){
            daeObjects.onLoad(daeObjects, daeObjects.results);
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
    
    api.getMeshObjects = function(daeObjects, resultIndex){
        resultIndex = resultIndex === undefined ? 0 : resultIndex;
        var result = daeObjects.results[resultIndex];
        var meshObjects = new THREE.Group();
        result.scene.traverse(function(obj){
            if(obj.type === 'Mesh'){
                meshObjects.add(obj);
            }
        });
        return meshObjects;
    };
    
    // get buffer geometry text that can then be used with the buffer geometry loader
    api.getBufferGeoText = function(daeObjects, resultIndex, meshIndex){
        resultIndex = resultIndex === undefined ? 0 : resultIndex;
        meshIndex = meshIndex === undefined ? 0 : meshIndex;
        var meshGroup = api.getMeshObjects(daeObjects, resultIndex);
        var mesh = meshGroup.children[meshIndex];
        // return text for the mesh
        return JSON.stringify( mesh.geometry.toNonIndexed().toJSON() );
    };
    // buffer geometry text to geomerry
    api.fromBufferGeoText = function(text){
        var loader = new THREE.BufferGeometryLoader();
        return loader.parse( JSON.parse(text) );
    };
}
    (this['DAE'] = {}));
```

The load one method might work okay when it comes to loading just one dae file, but in most projects where I am actually using this module I will want to load a whole bunch of these files. So then I have a load all on top of my load one method, in this load all method I am using [Promise.all](/2019/06/24/js-promise-all/) and [Array.map](/2020/06/16/js-array-map/) create create a promise that is an array of promise objects where each promise is a promise object returned by my load one method.

I will want to have a module that is more than just an abstraction of the dae loader and the built in loader manager class in the core of threejs. So far I have one additional public method beyond that load one method and the create method and that is the create group method. This is what I can call to create an [instance of THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/) with only the mesh objects of a dea result and not any additional objects that might be in the file such as a [camera](/2018/04/07/threejs-camera-perspective/) or a [point light](/2019/06/02/threejs-point-light/).

As of revision 3 of the dae tools file I have added a few more public metods that have to do with coverting dae files to buffer geomerty files. I will be getting into this in more detail in a later section of this post.

## 2 - Loading a single dae file with my dae tools module and ColladaLoader.js

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

## 3 - Load all method demo

For now I am also going to want at least one additional demo of the load all public method. This method is what I will typically be using in most projects sense I will typically be working with more than one dae file asset. With this load all method I pass an instance of the dae objects instance create with the DAE.create method like before, however things are a little different with the additional options. In the options object that I pass I can set a base urls, followed by an array of relative url paths to each file that I want to load.

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
 
    // can set an on onProgress, and onLoad callbacks 
    // when creating daeObjects state object
    var i = 0;
    var daeObjects = DAE.create({
        onItemProgress: function(per, n, d){
            console.log('progress: ' + per.toFixed(2) + ' ( ' + n + '/' + d + ' )');
        },
        onFileLoad: function(result, allResults, daeObjects){
            console.log('fileLoad');
        },
        onLoad: function(daeObjects, results){
            results.forEach(function(result, i){
                var group = DAE.createGroup(daeObjects, result);
                group.position.z = 3 - 6 * i;
                scene.add(group);
            });
            renderer.render(scene, camera);
        }
    });
 
    // load all should work like this
    // when doing so the onLoad method
    // will be called after any additional 
    // callbacks used here
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae',
        relUrls: [
            'rpi4/rpi4_start_box.dae',
            'obj/obj.dae'
        ]
    });
 
}
    ());
```

## 4 - Convert DAE to Buffer geometry

I have got around to ediing my post on the [buffer geomerty loader](/2018/04/12/threejs-buffer-geometry-loader/), and when doing so I was intersetd in looking into ways of going about converting dae files inot buffer geometry files. So I got around to updaing this dae tools example to include some quick methds that have to do with this kind of feature.

```js
(function () {
    //******** **********
    // SCENE, CAMERA RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // DAE OBJECTS
    //******** **********
    var i = 0;
    var daeObjects = DAE.create({
        onLoad: function(daeObjects, results){
             // THE getBufferGeoText method can be used to get buffer geometry text
             var text = DAE.getBufferGeoText(daeObjects, 1);
             // this text can then be used to create a JSON file that will work with the
             // THREE.BufferGeomertyLoader or I can pass it to the DAE.fromBufferGeoText method
             console.log(text);
             // back to geo
             var geo = DAE.fromBufferGeoText(text);
             console.log(geo);
             // mesh from geo
             var mesh = new THREE.Mesh(geo);
             scene.add(mesh);
             // render
             renderer.render(scene, camera);
        }
    });
    //******** **********
    // load all
    //******** **********
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae',
        relUrls: [
            'rpi4/rpi4_start_box.dae',
            'obj/obj.dae'
        ]
    });
}
    ());
```

## Conclusion

This dae tools module might prove to be just one of many additional works in progress when it comes to what I have together those far with respect to additional modules where I am working on top of threejs and the additional assets in the github repo. 

There are some additional features and changes that I might want to make with this module, but still only so much as I would like to not waste time making features that I think I will need only features that I will in fact actually use. So for now I think I will want to spend more time making some actual projects in terms of videos, and more models for such projects for now, when doing so I will get a better sense of what needs to be added or changed. 

In time I might get around to editing this post when I have a more up to date version of the dae tools module, and some additional use case examples, but for now this is all I have to write about.