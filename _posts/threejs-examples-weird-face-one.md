---
title: Weird face one threejs example
date: 2022-07-08 15:10:00
tags: [three.js]
layout: post
categories: three.js
id: 995
updated: 2022-07-14 15:58:23
version: 1.11
---

This week the main [threejs project](/2021/02/19/threejs-examples/) that I worked on a little was my weird face one example in which I am making a kind of hybrid model between the kind of models that I have made thus far, and a more professional kind of model that I still have not got around to learning how to make just yet that has to do with bones and skeletons. That is that so far I have been making informal models in the form of having mesh objects with geometries that are created using the built in geometry constructors, the oldest example of this would be my [guy one model](/2021/04/29/threejs-examples-guy-one/).
Although these kinds of informal models that are just groups of mesh objects with built in geometries work okay when it comes to a very crude kind of style, I am thinking that I should make an effort to go in the direction of making a more professional kind of model to at least some extent. This kind of hybrid model that I have in mind involves geometries that are created in a program like blender, and then I use my lerp geometry method to allow for animation of certain features, for this weird face one model I am doing this with the mouth.

<!-- more -->

## The Weird face one example and what to know first

There are a number of things that you might want to look into first before reading more about this specific threejs example as this example goes beyond the [very basics of threejs](/2018/04/04/threejs-getting-started/) a fare amount. For one thing this example does not just use threejs alone but also the dae file loader as well as orbit controls. So there is more than one javaScript file being used just when it comes to what there is to work with in the threejs repository on github alone. Although I will not be going over every little detail that you should know before hand I do use this first section to mention at least a few things you might want to read up more on first.

<iframe class="youtube_video" src="https://www.youtube.com/embed/AzuB6ExUE64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Check out the dae file loader as a way to load assets that are exported from blender

This example makes use of a DAE file that I have made for it alone with a fair amount of javaScript code. In order to load dae files I need to add the DAE file loader on top of just threejs alone. I have wrote a [blog post on this topic of loading DAE files](/2021/04/30/threejs-dae-collada-loader/) before a long time ago so I will not be getting into this in detail here.

### Full source code and additional DAE assets are at github

The full source code as well as the DAE files that I am using for this example can be found in my [test threejs github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-face-1).

## 1 - The weird face module

```js
// WERID FACE CONTROLS
var weridFace = {};
 
weridFace.getBias = function(per, count){
    count = count === undefined ? 1 : count;
    return 1 - Math.abs( ( per * count % 1 ) - 0.5) / 0.5;
};
 
// set mouth state
weridFace.setMouth = function(nose, alpha, m0, m1){
    var mouth = nose.getObjectByName('mouth');
    lerpGeo(mouth.geometry, m0.geometry, m1.geometry, alpha);
};
 
weridFace.setEye = function(nose, eyeIndex, a, b, scale){
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    scale = scale === undefined ? 1 : scale;
    var eye = nose.getObjectByName('eye' + eyeIndex);
    var pupil = nose.getObjectByName('pupil' + eyeIndex);
    var radius = 0.2;
    var e = new THREE.Euler();
    e.x = Math.PI * 2 * b;
    e.z = Math.PI * 2 * a;
    // using set and apply euler to set position of pupil
    pupil.position.set(0, radius * -1, 0).applyEuler( e );
    pupil.scale.set(scale, scale, scale);
    var v = new THREE.Vector3();
    eye.getWorldPosition( v );
    pupil.lookAt( v );
};
```

## 2 - The lerp geo function

```js
let lerpGeo = function(geo, geoA, geoB, alpha){
    alpha = alpha || 0;
    // pos, and new pos
    let pos = geo.getAttribute('position');
    let norm = geo.getAttribute('normal');
    // positions for a and b
    let posA = geoA.getAttribute('position');
    let posB = geoB.getAttribute('position');
    // normals for a and b
    let normA = geoA.getAttribute('normal');
    let normB = geoB.getAttribute('normal');
    // update position
    let i = 0, len = pos.array.length;
    while(i < len){
        let v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
        let v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
        v.lerp(v2, alpha);
        pos.array[i] = v.x;
        pos.array[i + 1] = v.y;
        pos.array[i + 2] = v.z;      
        i += 3;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
};
```

## 3 - Dae tools module

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

## 4 - Main javaScript file

```js
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER, LIGHT
    //******** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#444444');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(1.5, 0.25, 1.5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
    //******** **********
    // CONTROL
    //******** **********
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //******** **********
    // APP LOOP
    //******** **********
    var frame = 0, frameMax = 300,
    nose, m0, m1;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax;
        // UPDATE EYES
        var eBias = weridFace.getBias(per, 2);
        var pBias = weridFace.getBias(per, 8);
        var a = -0.10 + 0.20 * eBias;
        weridFace.setEye(nose, 1, a, 0, 0.75 + 0.25 * pBias);
        weridFace.setEye(nose, 2, a, 0, 0.75 + 0.25 * pBias);
        // UPDATE MOUTH
        var mBias = weridFace.getBias(per, 16);
        weridFace.setMouth(nose, mBias, m0, m1);
        // UPDATE NOSE
        var nBias = weridFace.getBias(per, 1);
        nose.position.y = 0.2 + -0.1 + 0.2 * nBias;
        nose.rotation.y = 1 - 1.2 * nBias;
        // step frame
        frame += 1;
        frame %= frameMax;
    };
    //******** **********
    // USING DAE TOOLS TO LOAD THE *.dae FILE CONTENTS
    //******** **********
    var daeObjects = DAE.create({
        onItemProgress: function(per, n, d){
            console.log('progress: ' + per.toFixed(2) + ' ( ' + n + '/' + d + ' )');
        },
        onFileLoad: function(result, allResults, daeObjects){
            console.log('fileLoad');
        },
        onLoad: function(daeObjects, results){
            results.forEach(function(result){
                var rScene = result.scene;
                // nose object?
                if(rScene.getObjectByName('nose')){
                    nose = rScene.getObjectByName('nose');
                    scene.add(nose);
                }
                // mouth object?s
                if(rScene.getObjectByName('mouth-0')){
                    m0 = rScene.getObjectByName('mouth-0');
                    m1 = rScene.getObjectByName('mouth-1');
                }
            });
            loop();
        }
    });
    // load dae files
    DAE.loadAll(daeObjects, {
        baseUrl: '/dae/weird-face-1',
        relUrls: ['weird-face-1c.dae', 'mouths-1c.dae']
    });
}());
```

## Conclusion

