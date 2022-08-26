---
title: Tweening many objects at once threejs example
date: 2022-08-26 11:01:00
tags: [three.js]
layout: post
categories: three.js
id: 1002
updated: 2022-08-26 13:59:27
version: 1.4
---

Not to long ago I made a threejs example about a function that will update the values of one position attribute of a buffer geometry as a lerp between one geometry and another. However what if I am doing just that, but all of a sudden I need to stop, and then start lerping to yet another geometry? In other words a kind of many object tween between more than one state of similar geometries. I wanted to make my own kind of system for this sort of thing then that works by using a function similar to my lerp geometry function, but using it to lerp not just once, but a few times, and create a mean between all of the results. This mean between several lerps of geometries will then be what is used to update the geometry of a single mesh object. In this post I will then be writing about the current state of the source code of what I have together thus far for this system.

<!-- more -->


## 1 - First version of my tween-many module and demos of it

In this section then I will be going over the first version r0 of this tween many javaScript module, and in addition a few demos of the module as well of course. When it comes to this first revision I just wanted to still focus on just the position attribute for now, so when updating the normal attribute I am using the compute vertex normal method to do so in the demos. When it comes to getting this to work up to speed for the idea that I have in mind I will need to use the normal, in the DAE file as I am sure that there will be some objects where using the compute vertex normal method will not give me the result that I want. However getting into all of that, and additional things that might come up with textures will be a matter for future revisions when I get to them.

### 1.0 - The tween-many.js file source code ( r0 ) 

The current state of the tween many module consists of several public methods along with a number of internal helper functions. The general use case would be to use the create source object method or the load method to one way or another have a collection of source objects from a DAE file of objects to choose from. Then once I have that, use the create mesh method to make a new mesh object with cloned geometry from one of the source objects. I can then use the tween method to update the geometry using two or more options from the DAE file.

```js
/*   tween-many.js - r0 - from threejs-examples-many-object-tweening
 *   By Dustin Pfister - https://dustinpfister.github.io/
 */
var tweenMany = (function () {
 
    var api = {};
 
    // LERP GEO FUNCTION based off the method from threejs-examples-lerp-geo
    var lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // pos, and new pos
        let pos = geo.getAttribute('position');
        // positions for a and b
        let posA = geoA.getAttribute('position');
        let posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        var i = 0, len = pos.array.length;
        while(i < len){
            // creating Vector3 instances for current posA and PosB vertices
            var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            // lerping between v and v2 with given alpha value
            v.lerp(v2, alpha);
            // set pos vertex to state of v
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        // the needs update bool of pos should be set true
        pos.needsUpdate = true;
    };
 
    // names should always have at least one underscore like box_1
    var vaildNameCheck = function(obj){
        // object type is not a mesh!? return false
        if(obj.type.toLowerCase() != 'mesh'){
            return false;
        }
        // name is not a string!? Yeah return false.
        if(typeof obj.name != 'string'){
            return false;
        }
        // return false for empty string
        if(obj.name === ''){
            return false;
        }
        // check underscore count
        var uCount = obj.name.split('_').length;
        if(uCount < 1){
            return false;
        }
        // if we make it this far all checks are a pass
        return true;
    };
 
    // the main PUBLIC TWEEN Method
    api.tween = function(geo, states){
        states = states || [];
        // figure number to div by to get mean
        var a1 = states.reduce(function(acc, lgArgu){
            if(lgArgu[2] > 0){
                acc.push(lgArgu)
            }
            return acc;
        }, []);
        var d = states.length;
        // array of new geos that is the lerp between each given geo and alpha
        var a2 = states.map( function( lgArgu ){
            var n = geo.clone();
            lerpGeo.apply(null, [ n ].concat(lgArgu) );
            return n;
        });
        // get the mean of all, and update main geo while doing so
        var pos = geo.getAttribute('position');
        var i = 0, len = pos.array.length;
        while(i < len){
            var v = new THREE.Vector3();
            a2.forEach(function(nGeo){
                var nPos = nGeo.getAttribute('position');
                v.x += nPos.array[i];
                v.y += nPos.array[i + 1];
                v.z += nPos.array[i + 2];
            });
            v.divideScalar( d );
            // set pos vertex to state of v
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        pos.needsUpdate = true;
    };
 
    // create a new mesh from a source object
    api.createMesh = function(sourceObj, name){
        var mesh = sourceObj[name].clone();
        mesh.geometry = sourceObj[name].geometry.clone();
        return mesh;
    };
 
    // create a source object from a DAE file result object create with the DAE file loader
    // I have this public here so I can bypass using the load methid when I all ready have a result
    // object. This is the case when making a video with my videoground applaction.
    api.createSourceObj = function(result){
        // source object
        var sourceObj = {};
        // loop children of scene
        result.scene.children.forEach(function(obj, i, arr){
            // load all vaild mesh objects to sourceObj
            if(vaildNameCheck){
                console.log('keyed in: ', obj.name);
                // set position to 0, 0, 0
                obj.position.set(0, 0, 0);
                // add ref to sourceObj
                sourceObj[obj.name] = obj;
            }
        });
        return sourceObj;
    };
 
    // load the dae file with the given URL, and create a sourceObject from it
    // returns a Promsie
    api.load = function(url){
        // cusotm loading manager
        var manager = new THREE.LoadingManager();
        manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log('loading DAE File: ' + url);
        };
        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log(itemsLoaded + '/' + itemsTotal);
        };
        manager.onLoad = function ( a ) {
            console.log('done loading DAE File');
        };
        // retrun a promise
        return new Promise(function(resolve, reject){
            // on Error reject with custom generic error message
            manager.onError = function ( url, b ) {
               reject(  new Error('Error while loading DAE FILE') )
            };
            // create the loader
            var loader = new THREE.ColladaLoader(manager);
            // load the dae file and resolve with source object if all goes well
            loader.load(url, function (result) {
                // resolve with the source object
                resolve(api.createSourceObj(result));
            });
        });
    };
 
    // return the public API
    return api;
 
}
    ());
```

### 1.1 - Basic example of the tween method, as well as other public methods

For a basic example of the tween many module I made an example where I am using the load method to create the source object. Then I am making just one mesh, and updating that between just two options. So then there is not anything really special with this demo compared to just using the lerp geometry method by itself actually. However I do like to at least keep basic examples, well basic, and this also should that I can still do the same thing with the lerp method alone when I just give one set of arguments in the state array when calling the tween method.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1.4, 1.4, 1.4);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    //-------- ----------
    // LIGHT
    //-------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3);
    scene.add(dl);
    //-------- ----------
    // APP LOOP
    //-------- ----------
    var sObj = {}; // source objects
    var mesh;
    var lt = new Date();
    var f = 0, fm = 300;
    var loop = function () {
        var now = new Date();
        var secs = (now - lt) / 1000 ;
        requestAnimationFrame(loop);
        if(secs >= 1 / 30){
            var p = f / fm;
            var b1 = Math.abs(0.5 - ( p * 4 % 1) ) / 0.5;
            tweenMany.tween(mesh.geometry, [
                [ sObj.box_1.geometry, sObj.box_2.geometry, b1 ]
            ]);
            //!!! should use dae normals
            mesh.geometry.computeVertexNormals();
            // rotation
            mesh.rotation.y = Math.PI * 2 * p;
            mesh.rotation.x = Math.PI * 4 * p;
            lt = new Date();
            f += 1;
            f %= fm;
        }
        renderer.render(scene, camera);
    };
    //-------- ----------
    // LOAD DAE - start loop when done
    //-------- ----------
    tweenMany.load("/dae/many-object-tweening/many-object-tweening-1a.dae")
    .then( (sourceObj) => {
        sObj = sourceObj;
        // can create a new mesh like this now
        mesh = tweenMany.createMesh(sObj, 'box_1');
        scene.add(mesh);
        // start loop
        loop();
    })
    .catch((e)=>{
        console.warn(e.message);
    });
 
}
    ());
```

### 1.2 - tweening many objects at once

Now for at least one example of what this is really about with an example where I am giving more than one array of arguments when it comes to start, and end geometry and an alpha value. With this example I am tweeing between box1 and box2, while also doing so with box1 and box3. On top of that I am also doing a third tween between box1 and box4 as well, all at the same time. The end result of this is a fairly interesting effect.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1.8, 1.8, 1.8);
    camera.lookAt(0, 0.25, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    //-------- ----------
    // LIGHT
    //-------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3);
    scene.add(dl);
    //-------- ----------
    // Get Bias Helper
    //-------- ----------
    var getBias = function(per, count){
        count = count === undefined ? 1 : count;
        var b = Math.abs(0.5 - ( per * count % 1) ) / 0.5;
        return b;
    };
    //-------- ----------
    // APP LOOP
    //-------- ----------
    var sObj = {}; // source objects
    var mesh1, mesh2, mesh3, mesh4, mesh5;
    var lt = new Date();
    var f = 0, fm = 300;
    var loop = function () {
        var now = new Date();
        var secs = (now - lt) / 1000 ;
        requestAnimationFrame(loop);
        if(secs >= 1 / 30){
            var p = f / fm;
            // using tween with many object transitions
            tweenMany.tween(mesh1.geometry, [
                [ sObj.box_1.geometry, sObj.box_2.geometry, getBias(p, 1) ],
                [ sObj.box_1.geometry, sObj.box_3.geometry, getBias(p, 8) ],
                [ sObj.box_1.geometry, sObj.box_4.geometry, getBias(p, 32) ]
            ]);
            //!!! should use dae normals
            mesh1.geometry.computeVertexNormals();
            // rotation
            mesh1.rotation.y = Math.PI * 2 * p;
            lt = new Date();
            f += 1;
            f %= fm;
        }
        renderer.render(scene, camera);
    };
    //-------- ----------
    // LOAD DAE - start loop when done
    //-------- ----------
    tweenMany.load("/dae/many-object-tweening/many-object-tweening-1a.dae")
    .then( (sourceObj) => {
        sObj = sourceObj;
        mesh1 = tweenMany.createMesh(sObj, 'box_1');
        scene.add(mesh1);
 
        mesh2 = tweenMany.createMesh(sObj, 'box_1');
        mesh2.position.set(-6, 0, -2);
        scene.add(mesh2);
 
        mesh3 = tweenMany.createMesh(sObj, 'box_2');
        mesh3.position.set(-4, 0, -2);
        scene.add(mesh3);
 
        mesh4 = tweenMany.createMesh(sObj, 'box_3');
        mesh4.position.set(-2, 0, -2);
        scene.add(mesh4);
 
        mesh5 = tweenMany.createMesh(sObj, 'box_4');
        mesh5.position.set(0, 0, -2);
        scene.add(mesh5);
 
        // start loop
        loop();
    })
    .catch((e)=>{
        console.warn(e.message);
    });
}
    ());
```

## Conclusion


