---
title: Inverting the normals of a sphere threejs example
date: 2022-05-31 14:05:00
tags: [three.js]
layout: post
categories: three.js
id: 990
updated: 2023-07-16 13:00:32
version: 1.22
---

When editing some of my older [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) content and have got around to my post on [cube textures](/2018/04/22/threejs-cube-texture/) which in turn put me in the direction of exploring this topic and related subjects and also alternatives. The process of just adding a cube texture to a scene is one thing, but the process of creating textures to use as cube texture is a whole other matter. Thus far I have not found a sound way to go about creating these kinds of textures from a resource image because doing so is a little involved, and I have a lot of pots boiling on top of this that makes me want to look for a kind of simple place holder solution for now. 

There are a lot of issues that come up when trying to make one of these cube textures, for one thing I need to start with a texture that is seamless in all directions, and on top of that I need to have a way to mutate the state of the texture so that it does not look like I am in inside a cube but rather a sphere of sorts even though it is a cube.

While I look into the subject of making these kinds of textures the thought occurred that there should be more than one way to go about doing this sort of thing that will have the same visual outcome at least. One such idea would be to just have a sphere, and inverting the normal attribute values so that the effect of the rendering of the textures is inverted. Also I might want to change the order of the points in the position attribute, or use the THREE.BackSide constant for the side property of the material. 

Then there is making a texture to use with the inner surface of this sphere, and making all of this part of a [DAE file](https://en.wikipedia.org/wiki/COLLADA) that I can then just load, scale up as needed, and have fixed at the center of the scene object. I can then have a situation in which the camera and all additional objects of interest are inside this kind of sky sphere, and I can then just draw on the surface of this sphere as a way to create a kind of background for one or more over all projects. 

Although this kind of alternative might have its advantages it is will not at all a replacement for making a cube texture, which does stroke me as the best way to go about doing this sort of thing with threejs projects. One reason why is that cubes textures are not jst use for backgrounds, but environment maps also. Still this kind of alternative might still work okay of I do not care about environment maps for now. So then this a post on a [threejs example](/2021/02/19/threejs-examples/) in which I am using a DAE file of a sphere with inverted normal, and custom uv mapping and textures as an alternative way of making a kind of cube texture.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/nznbbT525Mk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Inverting Sphere normals, and what to know before hand

This is an advanced post on the subject of using the javaScript library known as threejs as well as a number of additional assets to create a kind of sky sphere. This sky sphere will then serve as a kind of background for a threejs project other than that of a solid color or fixed single texture. I am then taking a lot of liberties here and assuming that you have at least a fair amount of experience with threejs, javaScript, and also using blender as a way to create and export DAE files as a preferred way of creating external assets to load into a scene object. I will not be getting into detail with basics here, but I will still take a moment to write about a few things that one might want to read up more on before continue to read the rest of this post.

### This example makes use of the DAE loader that must be added on top of threejs

This example makes use of the DAE file, or Collada File, the loader of which can be found in the threejs repository example folder. I have all ready [wrote a blog post on this DAE loader a while back](/2021/04/30/threejs-dae-collada-loader/) and thus assume that you know a thing or two about these various additional assets to work with in the threejs repository. Also I am making use of an [additional module that I made a while back](/2021/06/25/threejs-examples-dae-tools/) where I am building on top of this DAE loader, but this is mainly just some abstractions and additional methods that I have found that I like to have when working with DAE assets thus far.

### Source code and DAE assets are up on Guthub

On top of using threejs and additional javaScript files such as the DAE loader, I am also loading an extremal DAE file that I exported from a blender file. It would be best to learn how to do reproduce this kind of thing in blender, but I also have [a copy of the dae file](https://github.com/dustinpfister/test_threejs/tree/master/views/dae/sphere-normal-invert) that I am loading in my test threejs repository. In the for post folder of this repo [I also have copies of the source code examples](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-dae-tools-sphere-normals-invert) I am writing about here, and this is also where I am parking the source code for my [many other posts on threejs](/categories/three-js/) that I write about on this website.

### Version numbers matter

When I first wrote this blog post I was using r135 of threejs, and the last time I came around to do some editing I was using r146.

## 1 - First version of this inverted normals sphere DAE file example

In this section I will be going over what I have together thus far when it comes to the source code of this example. In this section I am just going over the source code as the state of the sphere as well as the state with textures is all something that I have worked out in an external dae file that I am loading with my DAE tools module that I worked out in another example. There is just then the question of how to load the DAE file, and also what to do with the result object that the DAE Loader will give.

For this first revision of this sphere normal invert example I am making use of threejs, the Collada file loader, r2 of my DAE tools file, and a main.js file the works on top of all of this. 

### 1.1 - The main javaScript file

In the main javaScript file of this example I am creating my scene object, camera, renderer, just like that of any other typical threejs example. I am then also working out an animation loop in which I will want to have a camera just look around as a way to just make sure that the end result of what I am making looks okay at least.

The main thing that stands out as far as this example goes is that I am calling the load one method of my DAE tools module that I made in a previous example. I will be going over a copy of the source code of this module in the next sub section, but for now the main thing here is that this is just the way that I thus far like to load not just a dae file, but also any additional textures that the dae file needs to load also. This load one method will return a promise that should resolve when the dae file as well as all textures used in the dae file are finished loading.

```js
// Sphere Normals invert demo - r0 - from threejs-examples-dae-tools-sphere-normals-invert
(function () {
    //------ ----------
    // SCENE
    //------ ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 5, 10);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //------ ----------
    // LOOP
    //------ ----------
    let frame = 0;
    const frameMax = 300;
    const loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        const per = frame / frameMax, bias = 1 - Math.abs( per - 0.5) / 0.5;
        const r = Math.PI * 2 * per;
        camera.lookAt(Math.cos(r) * 10, 15 - 15 * bias, Math.sin(r) * 10);
        frame += 1;
        frame %= frameMax;
    };
    // USING DAE TOOLS TO LOAD THE *.dae file
    const daeObjects = DAE.create();
    DAE.loadOne(daeObjects, "/dae/sphere-normal-invert/sphere-normal-invert.dae")
    .then(function(daeObjects){
        const group = DAE.createGroup(daeObjects, 0);
        scene.add(group);
        const mesh = group.children[0];
        // REPLACE WITH BASIC MATERIAL, USING MAP VALUE 
        // FROM DAE FILE IMPORT
        const sourceMaterial = mesh.material;
        const newMaterial = new THREE.MeshBasicMaterial({
            map: sourceMaterial.map
        });
        mesh.material = newMaterial;
        // BASE GROUND MESH
        const baseGround = new THREE.Mesh( new THREE.BoxGeometry(1, 0.1, 1), new THREE.MeshBasicMaterial({
             color: 0x008800
        }));
        baseGround.position.y = -0.125;
        baseGround.scale.set(60, 1, 60);
        scene.add(baseGround);
        loop();
    })
    .catch(function(e){
        console.log(e);
        loop();
    });
}
    ());
```

When I have the DAE result object to work with, by default the phong material is what is used. For this example I am not making use of any light source and am therefor replacing the phong material with the basic material. I am then just using the map texture from the old phong material for this new basic material. When it comes to the ground mesh object I am also using the mesh basic material as well.

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

## Conclusion

As of late the direction I seem to be going in with threejs is using the library to make Videos, and when it comes to this kind of application the bottom line with whatever I am doing is how the frames turn out. With that said this seems to be a kind of solution that I would say works out okay when it comes to that, and the kind of style that I have in mind. However I would not say that this is an end when it comes to looking into this sort of thing more.

Creating a background for scenes in threejs strikes me as just one of many things that can end up being a total time consuming rabbit hole if I do not first find a half way decent place holder solution for it which is what this is. If I am happy with the idea of manly creating textures that I then use with the uv map of a sphere that has inverted normals then I can go with this and move on to the next thing. With that said I think I can go with something like this when it comes to just making some that works okay and moving on, at least when it comes to making my videos at least. However I am sure that this is yet another topic that I will have to come back to again at some point when it comes to slowly moving forward with every little thing that comes up when doing this kind of work.
