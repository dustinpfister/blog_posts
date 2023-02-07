---
title: Weird face one threejs example
date: 2022-07-08 15:10:00
tags: [three.js]
layout: post
categories: three.js
id: 995
updated: 2023-02-07 10:32:15
version: 1.27
---

This week the main [threejs project](/2021/02/19/threejs-examples/) that I worked on a little was my weird face one example in which I am making a kind of hybrid model between the kind of models that I have made thus far, and a more professional kind of model that I still have not got around to learning how to make just yet that has to do with loading Geometry stored in an external file that I made with blender. That is that so far I have been making informal models in the form of having mesh objects with geometries that are created using the built in geometry constructors, the oldest example of this would be my [guy one model](/2021/04/29/threejs-examples-guy-one/).

Although these kinds of informal models that are just [groups of mesh objects](/2018/05/16/threejs-grouping-mesh-objects/) with built in geometries work okay when it comes to a very crude kind of style, I am thinking that I should make an effort to go in the direction of making a more professional kind of model to at least some extent. This kind of hybrid model that I have in mind involves geometries that are created in a program like blender, and then I use my lerp geometry method to allow for animation of certain features. I am sure that this will not be the last kind of module like this as I learn more about threejs, as well as other topics that have to do with 3d modeling in general. However I have to start somewhere when it comes to getting away from what I have been doing thus far that is just not what I want to do all the time for every project idea this far.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/AzuB6ExUE64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Weird face one example and what to know first

There are a number of things that you might want to look into first before reading more about this specific threejs example as this example goes beyond the [very basics of threejs](/2018/04/04/threejs-getting-started/) a fare amount. For one thing this example does not just use threejs alone but also the dae file loader as well as other suech files. So there is more than one javaScript file being used just when it comes to what there is to work with in the threejs repository on Github alone, and on top of that I am also using a few of my own files as well. Although I will not be going over every little detail that you should know before hand I do use this first section to mention at least a few things you might want to read up more on first.

### There are morph attributes of buffer geometry also

This is a threejs project example that I started before I got around to looking into [morph attributes of buffer geometry objects](/2023/02/03/threejs-buffer-geometry-morph-attributes). Although I will be observing this feature of buffer geometry with any future revisions of this that may or may not come to pass, this might not be such a good post to read when it comes to really learning a thing or two about animation at this time. The R0 version of lerp geo that I used in R0 of this example which as this writing is still the latest will use the vector3 lerp method to tradition all of the points of a geometry from one position to another. Although this works okay the same can be done with morph attributes, and it is also a great way to make these kinds of transitions not just with a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) but all buffer geometry attributes as well.

### Check out the dae file loader as a way to load assets that are exported from blender

This example makes use of a DAE file that I have made for it alone with a fair amount of javaScript code. In order to load dae files I need to add the DAE file loader on top of just threejs alone. I have wrote a [blog post on this topic of loading DAE files](/2021/04/30/threejs-dae-collada-loader/) before a long time ago so I will not be getting into this in detail here.

### This is an example in which I am building off of an additional threejs project that has to do with animating geometry

Recently I completed another threejs example project that has to do with creating a method that lerps all of the points of the position attribute of a geometry from one state to another. That is that I create a mesh object with a geometry as well as two or more additional geometries with a similar, or ideally identical count of vertices and then use this lerp method to transition from one position state to another. I have all ready wrote a [post on this lerp geometry method](/2022/07/01/threejs-examples-lerp-geo/) so I will not be getting into that in detail at least in this post.

### Full source code and additional DAE assets are at github

The full source code as well as the DAE files that I am using for this example can be found in my [test threejs github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-face-1). This is also the repo where I park the source code for my [many other blog posts on threejs](/categories/three-js/) as well. Also when it comes to complex projects such as this, cloning down the repo and getting the sever running might just be the best way to get this up and running on your end as it allows for controls over the versions of all the files that are being used and so forth.

### Version numbers matter

When I was first writing this post I was using r140 of threejs along with recent versions of the DAE file loader and orbit controls and everything was working just fine on my end. In addition to this the last time I cam around to do a little editing I was using r146 of threejs and was some to get everything working just file with that version as well. At this time there are a whole lot of major code breaking changes being made up ahead, at some point I might get around to editing this post yet again but if you are having a hard time getting this working on your end the first thing to check is the version number.

## 1 - The Weird face module, addtional files, and demos R0

In this section I am writing about R0 of the weird face module that I started before I learned a thing or two about morph attributes. The weird face module works on top of R0 of my lerp geo module to which as of this writing there is an R1 of the module that does make use of morph attributes. However also as of the time of this writing I have not made an updated revision of weird face as I still want to refine some things in that supporting module first.

### 1.a - The weird face module

For the weird face module I have just a few methods that are used to update the state of one of these weird face objects that I load into a project by way of a DAE file loader. When doing so the main root object of the weird face object is the nose object to which the eyes and mouth are children off. So then I have a set mouth method and set eye method that both take the nose object as the first argument along with the additional values that are use to update the state of the weird face object.

When it comes to the mouth I am suing my new lerp geometry method and when calling the method I need to give a m0 argument that is the current state of the geometry, and also a m1 argument that is the geometry that I want to lerp to. When it comes to moving the eyes of the model this is where I am still just changing object3d values of the eyes as a way to change the state of them.

```js
// weird-face.js - R0 - from threejs-examples-weird-face-one
const weridFace = {};
// get bias helper
weridFace.getBias = function(per, count){
    count = count === undefined ? 1 : count;
    return 1 - Math.abs( ( per * count % 1 ) - 0.5) / 0.5;
};
// set mouth state
weridFace.setMouth = function(nose, alpha, m0, m1){
    const mouth = nose.getObjectByName('mouth');
    lerpGeo(mouth.geometry, m0.geometry, m1.geometry, alpha);
};
// set eye
weridFace.setEye = function(nose, eyeIndex, a, b, scale){
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    scale = scale === undefined ? 1 : scale;
    const eye = nose.getObjectByName('eye' + eyeIndex);
    const pupil = nose.getObjectByName('pupil' + eyeIndex);
    const radius = 0.2;
    const e = new THREE.Euler();
    e.x = Math.PI * 2 * b;
    e.z = Math.PI * 2 * a;
    // using set and apply euler to set position of pupil
    pupil.position.set(0, radius * -1, 0).applyEuler( e );
    pupil.scale.set(scale, scale, scale);
    const v = new THREE.Vector3();
    eye.getWorldPosition( v );
    pupil.lookAt( v );
};
```

### 1.b - The lerp geo function

Here is the source code of the [lerp geometry function that I worked on in an older threejs project example](/2022/07/01/threejs-examples-lerp-geo/). It works by passing the geometry that I want to update as the first argument, then I pass a starting and ending geometry state alone with an alpha value between the two that will be 0 to 1 value between the two geometries to set the first geometry that I am updating. I am then using the [lerp method of the vector3 class](/2022/05/17/threejs-vector3-lerp/) to set the position of each vertex by way of a simple linear lerp between the points, and while I am also at it I update the normal attribute as well by just calling the [compute vertex normals method](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/).

```js
// lerpgeo.js - r0 - from threejs-examples-lerp-geo
(function (global) {
    // THE OLD R0 LERP GEO FUNCTION
    global.lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // get refs to position attributes
        const pos = geo.getAttribute('position');
        const posA = geoA.getAttribute('position');
        const posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        let i = 0; 
        const len = pos.array.length;
        while(i < len){
            const v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            const v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            v.lerp(v2, alpha);
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
    };
}(this));
```

### 1.c - Dae tools module

Another file that I am using for this example is my [DAE tools file](/2021/06/25/threejs-examples-dae-tools/), this is yet another file on top of the DAE loader itself that is an additional threejs file that can be found in the threejs github repository. This is yet another one of my threejs examples that is a kind of work in progress, I have found that there are often some additional things that I want to do with DAE files beyond that of just loading them but I am not fully sure what that all is at this point so the module is a little thin and is for the most part just some abstractions for using the loader that help be to make sure that I am using it in a way that works well when loading one or more dae files along with any additional texture assets.

```js
// dae-tools.js - R2 = from threejs-examples-dae-tools
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

### 1.1 - Basic Demo of werid face module and additional tools

Now I can load the DAE files that I want to use, set up some local variables, along with an animation loops and the usual threejs objects to create a scene. At the bottom of this first demo of the weird face module I am using the create and load all method of my DAE tools module to load two DAE files one of which is the main file, and the additional one contains mouth geometry options. This is just the way that I made the model thus far and in any future revisions of this I might go with some kind of standard where I have all the objects that I want in a single DAE file. There is still a great deal of things that I would like to refine more when it comes to not just this project but any and all kinds of projects like this one.

```js
//******** **********
// SCENE, CAMERA, RENDERER, LIGHT
//******** **********
const scene = new THREE.Scene();
scene.background = new THREE.Color('#444444');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 3)
scene.add(dl);
//******** **********
// CONTROL
//******** **********
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}
//******** **********
// APP LOOP
//******** **********
camera.position.set(1.5, 0.25, 1.5);
camera.lookAt(0, 0, 0);
let frame = 0, nose, m0, m1; 
const frameMax = 300;
const loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    const per = frame / frameMax;
    // UPDATE EYES
    const eBias = weridFace.getBias(per, 2);
    const pBias = weridFace.getBias(per, 8);
    const a = -0.10 + 0.20 * eBias;
    weridFace.setEye(nose, 1, a, 0, 0.75 + 0.25 * pBias);
    weridFace.setEye(nose, 2, a, 0, 0.75 + 0.25 * pBias);
    // UPDATE MOUTH
    const mBias = weridFace.getBias(per, 16);
    weridFace.setMouth(nose, mBias, m0, m1);
    // UPDATE NOSE
    const nBias = weridFace.getBias(per, 1);
    nose.position.y = 0.2 + -0.1 + 0.2 * nBias;
    nose.rotation.y = 1 - 1.2 * nBias;
    // step frame
    frame += 1;
    frame %= frameMax;
};
//******** **********
// USING DAE TOOLS TO LOAD THE *.dae FILE CONTENTS
//******** **********
const daeObjects = DAE.create({
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
```

## Conclusion

This has turned out to be a fun project and I like how the end result has turned out when it comes to making a video at least with the code thus far. Also what is real nice about making videos is that I do not have to care so much about the state of the code as long as the frames come out the way that I like them then I have a final product.

Still I am not sure if I can say that this is the way that I will want to make assets for various kinds of models at this time. I do think that for now I want to make assets that are more or less just collections of static geometries for the most part, it is just that for video projects there is the idea of having a collection of geometries for a single object such as a mouth of a face and having a way to transition between them. This then seems to work okay so far, but I am sure I will run into problems when it comes to battle testing this.