---
title: Biplane threejs example
date: 2021-02-17 15:04:00
tags: [three.js]
layout: post
categories: three.js
id: 805
updated: 2023-09-04 09:45:53
version: 1.24
---

When it comes to [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) maybe there is still a great deal more for me to learn about the framework itself, however for now I would like to make at least a [few examples](/2021/02/19/threejs-examples/) of what can be done with threejs when it comes to making some kind of actual project. 

With that said there is the prim and proper way of going about creating a 3d model of something, and that is all fine and good, but it also strikes me as something that would end up eating up a lot of time. So there is also the not so prim and proper way to go about creating a 3d model of something. It is the later that I will be going over today by making a simple crude yet effective 3d model of a [Biplane](https://en.wikipedia.org/wiki/Biplane) using just the built in threejs geometry constructors mainly the [box geometry](/2021/04/26/threejs-box-geometry/) constructor and [groups](/2018/05/16/threejs-grouping-mesh-objects/).

This example will involve creating a bunch of mesh objects, combining them into a group, and then positioning and skinning things to make something that looks like a little plane. It would then be fun to add a few more models to create a plane, and a main world object for a crude scene of some kind. For now I think I would like to have just one plane, and have it fly around in a circle, and move the camera around to have a nice neat looping animation.

<!-- more -->

## This biplane threejs example, and what to know first

This is a post on a full working three.js project example of a little looping animation of a simple biplane model made from mesh objects using the built in three.js geometry [constructor functions](/2019/02/27/js-javascript-constructor/). In this example I am also making use of a number of other features built into three.js such as groups. So this post is not intended for [developers that are still a little new to three.js](/2018/04/04/threejs-getting-started/), as I assume that you have at least covered some of the basics when it comes to using three.js and javaScript to create some kind of scene. So I will not be covering the very basic of three.js itself here, however I will be going over a few things that I think that you should have solid at this point before continuing to read this post.

<iframe class="youtube_video" src="https://www.youtube.com/embed/7XCiF36z0n8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Source code up on Github

The source code that I have together for this [post thus far is up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-biplane/). This is also where I have the source code examples for the [many other posts on threejs](/categories/three-js/) that I have made thus far as well.

### Version Numbers matter with three.js

When I first wrote this post I was using r125 of threejs and I have also been doing a fare amount or editing of this post as I continue to refine this code a little now and then. With that said the last time I edited this post then I was using threejs version r146 when updating the style of the mainjs file of what I am now calling the world section. So not all of the code in this example is updated to my r146 style rules just yet when it comes to the module itself, but that will be the style standard from here on put with any future edits at this point.

I have made a habit of mentioning what version numbers I am using in every threejs post that I write, and also make note of it as I edit older posts also. Code braking changes are made to threejs all the time, so I think doing so is called for.

### The biplane module

The idea here is to create a javaScript module that will create and return an instance of a [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/) which is just a way to pack a whole bunch of Mesh objects into a single group. An instance of THREE.Group like a Mesh object also inherits from the [Object3d class](/2018/04/23/threejs-object3d/), and as such also has a userData object which is the standard object that is to be used to place app specific data. Such as the current radian value for a prop on a biplane.

So then in this module I just have a bunch of helper methods that create and return mesh objects that are positioned and sized in a way in which when grouped together ends up looking like a biplane. It might be crude, but if I am okay with this kind of look and feel it will get the job done when it comes to a simplistic low poly art style.


```js
var Biplane = (function () {
    var materials = {
        plane: new THREE.MeshStandardMaterial({
            color: 0x88afaf
        }),
        guy: new THREE.MeshStandardMaterial({
            color: 0xffffff
        }),
        prop: new THREE.MeshStandardMaterial({
            color: 0x404040
        })
    };
    var api = {};
    // create a wing
    var createWing = function(opt, y){
        var wing = new THREE.Mesh(
            new THREE.BoxGeometry(2,1,10),
            opt.materials.plane || materials.plane
        );
        wing.position.y = y;
        return wing;
    };
    // create a body
    var createBody = function(opt){
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(10,2,2),
            opt.materials.plane || materials.plane
        );
        body.position.x = -2;
        return body;
    };
    // create a body
    var createTail = function(opt){
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(1,2,2),
            opt.materials.plane || materials.plane
        );
        body.position.x = -6.5;
        body.position.y = 2;
        return body;
    };
    // create guy
    var createGuy = function(){
        var guy = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            materials.guy
        );
        guy.position.x = -2;
        guy.position.y = 1.5;
        return guy;
    };
    // create prop
    var createProp = function(){
        var prop = new THREE.Mesh(
            new THREE.BoxGeometry(0.5,4,0.5),
            materials.prop
        );
        
        prop.position.x = 3.25;
        return prop;
    };
    // main create method
    api.create = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || {};
        var plane = new THREE.Group();
        // body and tail
        plane.add(createBody(opt));
        plane.add(createTail(opt));
        // ref to prop
        plane.userData.prop = createProp();
        plane.add(plane.userData.prop);
        // wings
        plane.add(createWing(opt, -1));
        plane.add(createWing(opt, 1));
        // guy
        plane.add(createGuy());
        // prop radian to move prop
        plane.userData.propRadian = 0;
        plane.userData.propRPS = 0.25;
        return plane;
    };
    api.update = function(bi, per){
        var ud = bi.userData;
        ud.propRadian = Math.PI * 64 * per;
        ud.prop.rotation.set(ud.propRadian,0,0)
    };
    return api;
}
    ());
```

## 1 - Basic Demos section

It would seem that when I first wrote this post I just made a single demo for this module that is way more complex that it should be for just a single demo. So at this time I have started a basic section for this post where I am just using the biplane module alone. 

### 1.1 - Hover demo

For this first basic section demo I just wanted to have a single instance of the biplane, add a directional light to the demo, and just move the prop and position of the plane up and down. I am using the biplane module update method for the updating of the prop, and I am then just setting the state of the position property of the main root object to move the biplane up and down.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// STATE
//-------- ----------
const state = {
    lt: new Date(),
    fps: 30,
    frame: 0,
    maxFrame: 900,
    bi: Biplane.create(),
    dl: new THREE.DirectionalLight(0xffffff, 1)
};
scene.add( state.dl );
scene.add( state.bi );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);
function loop() {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {

        const a_frame = state.frame / state.maxFrame;
        const a_prop = a_frame * 2 % 1;
        const a_hover = 1 - ( Math.sin( Math.PI * 2 *  (a_frame * 9 % 1) ) / Math.PI );
        Biplane.update(state.bi, a_prop);
        state.bi.position.y = -2 + 4 * a_hover;


        renderer.render(scene, camera);
        state.lt = now;
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
    }
};
loop();
```

## 2 - An example making use of the biplane model so far

So then now it is just a question of having a main javaScript file where I am making use of this model directly or indirectly by way of another main world module of some kind. In this section I will be doing all the usual when it comes to making a threejs project such as creating a scene, camera, and renderer when it comes to the typical main javaScript file where I often do such things. However before I get to write about that file there are a bunch of additional modules that I would like to use with this biplane module of mine. I will want to have a module to create something that will serve as some ground, and it should have something to sever as a texture so that I know that the plane is moving around. In other worlds it would be nice to have something to serve as a frame of reference. Also I am sure that when it comes to using this biplane module I am going to use it in a way where I will be creating one or more instances of it in a main world module that will contain the ground, lights, and anything else I might want to add to the over all scene.

So then in this section I will be going over all the additional files that I am using to do something interesting with this biplane module.

### 3.a - A utils module

I have a general utility module for this example that I am using in the main world module, and any additional areas in the over all example. Here in this module I have a get per values method that will create and return a collection of values that I use to update the position and rotation of objects by a frame over max frame values.

```js
var utils = {};
utils.pi2 = Math.PI * 2;
utils.getPerValues = function (frame, maxFrame, base) {
    frame = frame === undefined ? 0 : frame;
    maxFrame = maxFrame === undefined ? 100 : maxFrame;
    base = base || 2;
    var per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
    return {
        frame: frame,
        maxFrame: maxFrame,
        fps: 30,
        per: per,
        bias: bias,
        base: base,
        biasLog: Math.log(1 + bias * (base - 1)) / Math.log(base)
    };
};
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
utils.normalizeRadian = function (radian) {
    return utils.mod(radian, utils.pi2);
};
```

### 3.b -  a Tile Index module

This is a tile index module that I borrowed from [my post on the plane geometry constructor](/2019/06/05/threejs-plane/). This tile index module is a nice little module that I can use to quickly create a plane geometry with a checkered texture. As you might suspect I will be using this module to create a geometry and mesh that will serve as the ground of this little animation loop example of this biplane.

```js
(function (api) {
    var MATERIALS = [
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x00ff00,
            emissiveIntensity: 0.75,
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            emissive: 0x00ff00,
            emissiveIntensity: 0.2,
            side: THREE.DoubleSide
        })
    ];
    var planeTileGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
        var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh),
        tileIndex = 0,
        len = sw * sh,
        mi,
        y,
        i;
        while (tileIndex < len) {
            i = tileIndex * 6;
            mi = 0;
            planeGeo.addGroup(i, 3, mi);
            planeGeo.addGroup(i + 3, 3, mi);
            tileIndex += 1;
        }
        return planeGeo;
    };
    // create and return a plane with tile groups
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        // add a plane
        var plane = new THREE.Mesh(
                planeTileGeo(opt.w, opt.h, opt.sw, opt.sh),
                opt.materials);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
    // set checkerBoard material index values
    api.setCheckerBoard = function (plane) {
        var w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        tileIndex = 0,
        gi,
        len = w * h,
        mi,
        y;
        while (tileIndex < len) {
            if (w % 2) {
                mi = tileIndex % 2;
            } else {
                y = Math.floor(tileIndex / w);
                mi = y % 2 ? 1 - tileIndex % 2 : tileIndex % 2
            }
            gi = tileIndex * 2;
            plane.geometry.groups[gi].materialIndex = mi;
            plane.geometry.groups[gi + 1].materialIndex = mi;
            tileIndex += 1;
        }
    };
    // set checkerBoard material index values
    api.setBoxBoard = function (plane) {
        var w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        tileIndex = 0,
        len = w * h,
        gi,
        mi,
        x,
        y;
        while (tileIndex < len) {
            x = tileIndex % w;
            y = Math.floor(tileIndex / w);
            mi = 0;
            if (y > 0 && y < h - 1) {
                if (x > 0 && x < w - 1) {
                    mi = 1;
                }
            }
            gi = tileIndex * 2;
            plane.geometry.groups[gi].materialIndex = mi;
            plane.geometry.groups[gi + 1].materialIndex = mi;
            tileIndex += 1;
        }
    };
}
    (this['TileMod'] = {}));
```

### 3.c -  A world module

I will then want a main world module that will be used to wrap everything together. So then this is a situation in which I have a main world group object and then a whole bunch more objects that helper to create an over all world to look at beyond just that of the little biplane model.

```js
(function (api) {
    // create world
    api.create = function () {
        var world = new THREE.Group();
        // CREATING A BIPLANE and adding it to the world
        var bp = world.userData.bp = Biplane.create();
        world.add(bp);
        // Camera
        var camera = world.userData.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 150);
        camera.position.set(-15, 10, 0);
        bp.add(camera);
        // ground
        var ground = TileMod.create({
                w: 100,
                h: 100
            });
        ground.position.set(0, -5, 0);
        TileMod.setCheckerBoard(ground);
        world.add(ground);
        // point light
        var pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(28, 20, 40);
        pointLight.add(new THREE.Mesh(
                new THREE.SphereGeometry(0, 100, 10),
                new THREE.MeshBasicMaterial({
                    color: 'white'
                })));
        world.add(pointLight);
        // ambient light
        //world.add(new THREE.AmbientLight(0xffffff, 0.00))
        // return world group
        return world;
    };
    // update world
    api.update = function (world, frame, maxFrame) {
        var wud = world.userData;
        wud.perObj = utils.getPerValues(frame, maxFrame);
        // biplane
        Biplane.update(wud.bp, wud.perObj.per);
        var radian1 = utils.normalizeRadian(utils.pi2 * wud.perObj.per),
        radian2 = utils.normalizeRadian(radian1 + Math.PI / 180 * 1 + Math.PI * 1.5);
        wud.bp.position.set(
            Math.cos(radian1) * 30,
            5,
            Math.sin(radian1) * 30);
        wud.bp.lookAt(new THREE.Vector3(
                Math.cos(radian2) * 10,
                0,
                Math.sin(radian2) * 10));
        // camera
        wud.camera.position.set(-20, 10, -20 + 40 * wud.perObj.biasLog);
        wud.camera.lookAt(wud.bp.position);
    };
}
    (this['worldMod'] = {}));
```

### 3.1 - The main JavaScript file

Now I just need a little additional javaScript code to make use of the main world module and everythjng that it is built on top of, including of course the biplane module.

```js
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('cyan');
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// create state
const state = {
    lt: new Date(),
    fps: 30,
    frame: 0,
    maxFrame: 600,
    world: worldMod.create()
};
scene.add( state.world );
// loop
function loop() {
    const now = new Date(),
    secs = (now - state.lt) / 1000,
    wud = state.world.userData;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        worldMod.update( state.world, state.frame, state.maxFrame );
        renderer.render(scene, state.world.userData.camera);
        state.lt = now;
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
    }
};
loop();
```

The result of all of this then is having two biplane models one is the default lime color, and the other I made red. The props spin at two different speeds, and that is just about it for now. the next step would be to create another project where I am making use of this model, and maybe a few more just like it to create some kind of scene.

## Conclusion

I like to make models this way, I can just slap something together and it just works. I am sure that in a real project I might run into problems sooner or later. However yet again maybe not if the final project is some kind of video rather than a game. What really matters is how things look, and this kind of very low poly look is kind of nice I think.

There are many additional little details that I might want to add at some point if I do get around to putting more time into this. I could maybe add some ways to move the guys head in the plane, and also skin the mesh with a face of some kind also while I am at it. There is also maybe adding some additional code that has to do with moving the mesh objects within the group. For example if I use this in a project where the plane can end up being destroyed I can have some kind of effect where the parts fly all over the place. However maybe getting into all of that would be a matter for another post.
