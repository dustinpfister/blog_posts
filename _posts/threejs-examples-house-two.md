---
title: House Model two threejs project example
date: 2023-01-27 09:44:00
tags: [three.js]
layout: post
categories: three.js
id: 1025
updated: 2023-01-27 12:06:49
version: 1.5
---

I have made a threejs example post way back in the day in which I [make a simple, crude house model](/2021/04/23/threejs-examples-house/) using only javaScript code on top of threejs itself. I do like to make those kinds of models as I can pack everything into a blog post, not just in terms of the javaScript code, but also the data that composes the various buffer geometry attributes as well. However when it comes to starting to work on some kind of real project with threejs, this is just not generally how things are done for the most part. Do not get my wrong though, some times it seems like the best way to do what I want to do will involve a whole lot of javaScript code to create geometry. However some times it seems like the best way forward is to create some kind of asset in a program like blender and then export from that program into a file format like that of the DAE file format. So in this [threejs project example](/2021/02/19/threejs-examples/) post, I am going to be writing about a new kind of house model where I am using an external file as a way to have the geometry for the house model.

<!-- more -->

## This house model example and what to know first

There are a whole lot of things that I assume you know a thing or two about before hand here. I will not be getting into the very basics of threejs let alone javaScript in general here. I have all ready wrote posts on [getting started with threejs](/2018/04/04/threejs-getting-started/) that I do get around to edit every now and then, so if you are still new to this sort of thing then there are other posts on my site here that might be a better starting point. Also even if you do have a fair amount of experience wit threejs there are a lot of things I think I need to write about in this opening section to begin with anyway as this is not at all a copy and paste friendly kind of project example here.

### In this example I am using the DAE loader

For this project example I am [loading an external DAE file](/2021/04/30/threejs-dae-collada-loader) as a way to pull load in buffer geometry data. What is nice about the DAE format is that it is a text format, and also I can use it to not just load in geometry but materials and textures as well. However there is a drawback and that is the fact that this DAE loader is not built into the core of the threejs library itself. In this project I have my dae loader helper file, but this is just a way to make use of the DAE loader which in turn is also an additional external file that is one of the many official asset loader options to work with when it comes to additional files to work with in the threejs Github Reposatory. So although there are a lot of things that I like about DAE rather than using the built in [buffer geometry loader](/2018/04/12/threejs-buffer-geometry-loader/), making use of it make the process of writing about a project like this a little more complex. However this is just often the case when it comes to start8ng to work on some kind of real project, and this is not a post that I am writing for people that are new to threejs and client side javaScript in general.

### I do have the additional assets up on my Github

In this project I am loading an external DAE file, and this DAE file along with any additional assets in terms of textures can be found in my test threejs repo on Github. There are a few folders of interest that are relevant to this post then one of which would as always be the [main for post folder for this blog post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-house-two). The other location of interst is the folder where I am storing the [DAE file of the house](https://github.com/dustinpfister/test_threejs/tree/master/views/dae/house_two) that I am using. On top of that I am also making use of a copy of my [dae helper from my post on the dae loader as well](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-dae-collada-loader). In this test threejs repo I also have copies of the official threejs files that I am using as well. When it comes to getting this up and running on your end the best way to do so might be to clone down the repo and run the server, but in any case I have all the assets that I am using for this project there.

### Version Numbers Matter

When I first wrote this post I was uing r146 of threejs.

## 1 - First revision of the house 2 source code

This threejs example has a whole lot to do with just a DAE file actually. So for this time around there much of the javaScript code I am using just has to do with how to do about using the DAE loader, and how to deal with various problems that come up when using it. This is something that I am still working on actually, and one way to find out what problems are to begin with, and then work out solutions for them, is to just start making projects like this.

### The DAE loader helper

When using a loader like the DAE loader there is not just simply loading one or more DAE files, but also setting what the resource path is for each file as well.

```js
// dae-helper.js - r0 - from threejs-dae-collada-loader
(function(global){
    // a hard coded default cloner function
    const DEFAULT_CLONER = function(obj, scene_source, scene_result, result){
        scene_source.add(obj.clone());
    };
    // The public DAE_loader function
    global.DAE_loader = function( opt ){
        opt = opt || {};
        opt.urls_dae = opt.urls_dae || [];
        opt.urls_resource = opt.resource_urls || [];
        // use given cloner or defult to add everything
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        const manager = new THREE.LoadingManager();
        const scene_source = new THREE.Scene();
        return new Promise( (resolve, reject) => {
            manager.onError = function(url){
                reject( new Error( 'error when loading: ' + url ) );
            };
            manager.onLoad = function(){
                resolve(scene_source);
            };
            opt.urls_dae.forEach((url, i) => {
                const loader = new THREE.ColladaLoader( manager );
                if(opt.urls_resource[i]){
                    loader.setResourcePath( opt.urls_resource[i] );
                }
                loader.load(url, function(result){
                    result.scene.traverse( (obj) => {
                          opt.cloner(obj, scene_source, result.scene, result);
                    });
                });
            });
        });
    };
}( window ));
```

### 1.1 - Basic example where I am just loading in the house model

So I have my DAE loader helper function that I am using on top of the official threejs DAE loader which I am then also using on top of threejs itself as well. Now that I have all that to work with along with the DAE file that I want to use set up just the way I like it, I just need a little additional javaScript code to just simply load the house and place this sucker in the scene.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.5, 2, -1)
scene.add(dl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source ) => {
        if(obj.type === 'Mesh'){
            const mat = new THREE.MeshPhongMaterial({
                
            });
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.name = obj.name;
            mesh.rotation.copy(obj.rotation);
            scene_source.add(mesh);
        }
    },
    urls_dae: [
        '/dae/house_two/house_2.dae'
    ],
    urls_resource: [
        '/dae/house_two/'
    ]
})
.then( (scene_source) => {
    console.log('done loading');
    camera.position.set(2, 1, -2);
    scene.add( new THREE.GridHelper(10, 40) )
    const mesh_house = scene_source.getObjectByName('house_0').clone();
    scene.add( mesh_house )
    camera.lookAt(mesh_house.position);
    loop();
})
.catch( (e) => {
    console.warn(e);
});
```

## Conclusion

This house model is just like the first one in the sense that the goal is to just create an object that looks like a house from the outside, but there is no need to model out the inside of the house. This is because for the most part all of my threejs projects thus far have to do with making little video projects, and when it comes to those kinds of projects often I do not need to go ll the way modeling things out at least when it comes to just the outside of the house anyway. So maybe at some point there will be a house three threejs example project and so forth, and when it comes to that maybe I will start going in the direction of modeling out some insides of a house as well, maybe even go so far as to make something that might even be up to code and can end up being built in real life but that is a major deal of course. For now I have not even worked out basic things like how to go about setting what the scale should be and so forth, still it goes without saying that this example is a step in that direction at least compared to the house one threejs project example.

