---
title: Inverting the normals of a sphere threejs example
date: 2022-05-31 14:05:00
tags: [three.js]
layout: post
categories: three.js
id: 990
updated: 2022-06-02 11:43:20
version: 1.9
---

As of late I have been editing some of my older threejs content and have got around to my post on [cube textures](/2018/04/22/threejs-cube-texture/) which in turn put me in the direction of exploring this topic and related topics. The process of just adding a cube texture to a scene is one thing, but the process of creating textures to use with a cube texture is a whole other matter. Thus far I have not found a sound way to go about creating these kinds of textures from a resource image because doing so is a little involved and I have a lot of pots boiling. There are a lot of issues that come up when trying to make one, for one thing I need to start with a texture that is seamless in all directions and on top of that I need to have a way to mutate the state of the texture so that It does not look like I am in inside a cube. While I look into the subject of aiming these kinds of textures though the thought occurred that there should be more than one way to go about doing this sort of thing, such as having a sphere and inverting the normals, then making a texture to use with the inner surface of this sphere. This is then a post on a [threejs example](/2021/02/19/threejs-examples/) in which I am doing this as an alternative way of making a kind of cube texture.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/nznbbT525Mk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 1 - First version of this inverted normals sphere DAE file example

In this section I will be going over what I have together thus far when it comes to the source code of this example. In this section I am just going over the source code as the state of the sphere as well as the state with textures is all something that I have worked out in an external dae file that I am loading with my DAE tools module that I worked out in another example.

### 1.1 - The main javaScript file

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 5, 10);
 
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
 
    // CONTROL
    //var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    var frame = 0, frameMax = 300;
 
    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
 
        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;
        var r = Math.PI * 2 * per;
        var x = Math.cos(r) * 10;
        var z = Math.sin(r) * 10;
 
        camera.lookAt(x, 15 - 15 * bias, z);
 
        frame += 1;
        frame %= frameMax;
 
        //controls.update();
    };
    // USING DAE TOOLS TO LOAD THE *.dae file
    var daeObjects = DAE.create();
    DAE.loadOne(daeObjects, "/dae/sphere-normal-invert/sphere-normal-invert.dae")
    .then(function(daeObjects){
        var group = DAE.createGroup(daeObjects, 0);
        scene.add(group);
 
        var mesh = group.children[0];
 
        // OPTION1 - REPLACE MATERIAL WITH BASIC MATERIAL?
        // A crude fix for this can be just be replacing the material
        // with the basic material, using the THREE.DoubleSide valu for the
        // side value
        //mesh.material = new THREE.MeshBasicMaterial({
        //    side: THREE.DoubleSide,
        //    map: null
        //});
 
        // OPTION2 - MUTATE PHONG MATERIAL 
        //var material = mesh.material;
        //material.side = THREE.DoubleSide;
 
        // OPTION3 - REPLACE WITH BASIC MATERIAL, USING MAP VALUE 
        // FROM DAE FILE IMPORT
        var sourceMaterial = mesh.material;
        var newMaterial = new THREE.MeshBasicMaterial({
            map: sourceMaterial.map
        });
        mesh.material = newMaterial;
 
        // BASE GROUND MESH
        var baseGround = new THREE.Mesh( new THREE.BoxGeometry(1, 0.1, 1), new THREE.MeshPhongMaterial({
             color: 0x00ff00
        }));
        baseGround.position.y = -0.125;
        baseGround.scale.set(60, 1, 60);
        scene.add(baseGround);
 
        // VERTEX NORMALS HELPER
        //var helper = new THREE.VertexNormalsHelper(mesh, 5, 0x00ff00, 3);
        //scene.add(helper);
 
        loop();
    })
    .catch(function(e){
        console.log(e);
        loop();
    });
}
    ());
```

### 1.2 - The dae tools file that I am using for this

This is the source code for the DAE tools module that I made a while back that I am using for this project. Sense this is a project in which I am just loading a single DAE file I am using just the load one method, but I also worked out a load all method for this module as well.

```js
// dae tools r2
(function (api) {
 
    // create aa daeObjects state object
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
 
}
    (this['DAE'] = {}));
```