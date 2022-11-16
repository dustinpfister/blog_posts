---
title: Basic Guy Model threejs example
date: 2021-04-29 14:15:00
tags: [three.js]
layout: post
categories: three.js
id: 856
updated: 2022-11-16 12:59:22
version: 1.32
---

I want to start thinking in terms of what the long term plan with [threejs](https://threejs.org/) might be for me if I am going to continue writing new posts on it. Also I what to known what to do when it comes to starting some kind of actual project using threejs rather than the simple tech demos that I write about for the most part when writing these [posts on threejs](/categories/three-js/). However I think what I really need to start doing is making a [few examples](/2021/02/19/threejs-examples/) that are some kind of starting point for an actual project of some kind. With that said I think In this post I will be writing about my first, basic guy, or person model using three.js that I made a while back, and then updated just a little for the sake of this post.

I actually have a number of crude modules that are really just a collection of mesh objects using the built in three.js geometries, rather than a professionally made model that is imported from something like blender. When it comes to doing that there is getting into how to go about [loading exported dae files](/2021/04/30/threejs-dae-collada-loader/), or some other kind of file format. I have nothing against making those kinds of modules, it is just that those kinds of modules can prove to be time consuming to make, and they do not always result in an over all better finished product in the end actually. Also I am taking into account what I want to really make with three.js and I am thinking more so in terms of animations in the form of videos, rather than games. 

So when it comes to making videos all that matters in the end is if the final product looks the way I want it to when it comes to the final video and that is it. Also it is not just how a video looks that is important really but the over all subject matter, and so may other things that go beyond the scope of this blog post. Crude modules might look crude, but if I am going for that kind of style to begin with, then they will work just fine and I can move on to other aspects of making that kind of content. What really matters most then is the over all finished product in terms of everything, not just the animation, and I am finding [content on youtube that I would say are examples of doing this kind of thing right](https://www.youtube.com/watch?v=3a1gCQzBQws).

So when it comes to the kinds of over all scenes that I would like to make, I will want to have at least one, if not a few basic guy, or person type models. With that said this post is on one of my first modules for this sort of thing. This kind of module, and several other variations of it, has all ready appears in some of my other examples. However in this post I think I will be just writing about the guy model by itself, and a single demo of the model.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/qquR4ehWTAk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Basic three.js guy model and what to know before hand

This is a post on using three.js to make a very crude guy module using built in three.js features along with a little javaScript code. There are other more standard ways of making a model that might prove to be a better option in the long run, but I kind of like just making simple modules like this with javaScript code alone thus far.

This is not a [getting started post on three.js then](/2018/04/04/threejs-getting-started/), let alone javaScript in general, and any additional skills that are required before hand in other to really get something of value from reading this. So if you want to reproduce what I have worked out here I trust you have at least some grasp on the basics at least when it comes to doing something with three.js and a little client side javaScript.

### Version Numbers matter with three.js

This is something that I have found that I just need to repeat over and over again in every three.js post. When I first made this model I was using three.js version r91. Sense then I made some changes to get this to work find with version r127, which had to do with changes with how to do about using more than one material with a mesh object. Also the last time I cam around to do some editing I had to make some changes to the demos to get this working without error to get them working okay for r146.

It should go without saying that one should always look at dates of posts when reading content on the open web that have to do with a javaScript library. This is especially true with such a fast moving library like three.js, as code breaking changes are made often with this one more so then other projects where things might move a little slower.

### The source code examples in this post are on Github

The source code examples that I am writing about here can be found on Github at my [test threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-guy-one) repository. Also I am writing about something that I started in another project that I just called [threejs guy](https://github.com/dustinpfister/threejs_guy) that is also up on Gthub.


## 1 - guy.js r0 and demo

This is a section on the first revision of the guy.js module that I started a long time ago now. I might add one or two more demos makijg use of this, and in time might also make changes to the code actaully. However at this point any chnages will just to be to make it work with newer verions of threejs and that is it.

### 1.0 - The guy.js file

Here I have the source code of my first basic guy model. When I made this I was thinking in terms of having a base class that I might built on top of when it comes to making additional variants of this kind of thing for better or worse. When it comes to actually using this though I have made other modules that are just like this only they take a more functional approach. However what I really care about is to just have a very crude basic guy, or person type module that I can just skin with some textures by hacking over the materials that are being used a little. With that said this is more or less what I hand in mind when it comes to having something to that effect.

```js
// guy.js - r0 - from threejs-examples-guy-one
// By Dustin Pfister
// https://dustinpfister.github.io/2021/04/29/threejs-examples-guy-one/
// 
var Guy = (function () {
    // material used for the legs
    var material_leg = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
            emissive: 0x00001a
        }),
    // material used for the arms
    material_arm = new THREE.MeshLambertMaterial({
            color: 0x00ff00,
            emissive: 0x001a00
        });
    // material used for the body
    material_body = new THREE.MeshLambertMaterial({
            color: 0x00ff00,
            emissive: 0x001a00
        }),
    // array of materials used for the head
    materials_head = [
        // 0 default material
        new THREE.MeshLambertMaterial({
            color: 0xffff00,
            emissive: 0x1a1a00
        }),
        // 1 used for the face
        new THREE.MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0x1a1a1a
        })
    ];
    // the guy constructor
    var Guy = function () {
        // a group that will hold all mesh objects
        this.group = new THREE.Group();
        // HEAD
        this.head = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials_head);
        this.head.position.y = 1.6;
        // set material index
        this.head.geometry.groups.forEach(function (face) {
            // set all to zero by default
            face.materialIndex = 0;
        });
        // one side of face set to face material
        this.head.geometry.groups[4].materialIndex = 1;
        this.head.castShadow = true;
        this.group.add(this.head);
        // BODY
        this.body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 1),
                material_body);
        this.body.castShadow = true;
        this.group.add(this.body);
        // RIGHT ARM
        this.arm_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        this.arm_right.geometry.translate(0,  - .5, 0);
        this.arm_right.position.x = 1;
        this.arm_right.position.y = .75;
        this.arm_right.castShadow = true;
        this.group.add(this.arm_right);
        // LEFT ARM
        this.arm_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        this.arm_left.geometry.translate(0,  - .5, 0);
        this.arm_left.position.x = -1;
        this.arm_left.position.y = .75;
        this.arm_left.castShadow = true;
        this.group.add(this.arm_left);
        // RIGHT LEG
        this.leg_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        this.leg_right.geometry.translate(0, -1, 0);
        this.leg_right.position.x = .35;
        this.leg_right.position.y = -1.1;
        this.leg_right.castShadow = true;
        this.group.add(this.leg_right);
        // LEFT LEG
        this.leg_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        this.leg_left.geometry.translate(0, -1, 0);
        this.leg_left.position.x =  - .35;
        this.leg_left.position.y = -1.1;
        this.leg_left.castShadow = true;
        this.group.add(this.leg_left);
    };
    // move the arm of give id ('arm_right' or 'arm_left');
    // x and z should be a value between 0, and 1
    Guy.prototype.moveArm = function (armId, x, z) {
        var arm = this[armId];
        z = Math.PI / 2 * z;
        if (armId === 'arm_left') {
            z -= z * 2;
        }
        arm.rotation.set(Math.PI * 2 * x, 0, z);
    };
    // rotate head around
    // y is 0 to 1
    Guy.prototype.moveHead = function (y) {
        this.head.rotation.set(0, Math.PI * 2 * y, 0);
    };
    // move legs in respect to a walk cycle
    // where per is between 0, and 1.
    Guy.prototype.moveLegs = function (per) {
        per %= 1;
        var bias = Math.abs(.5 - per) / .5;
        this.leg_left.rotation.set(.75 - bias * 1.5, 0, 0);
        this.leg_right.rotation.set( - .75 + bias * 1.5, 0, 0);
    };
    // walk
    Guy.prototype.walk = function (per, swings) {
        per = per === undefined ? 0 : per;
        swings = swings === undefined ? 1 : swings;
        var r = Math.PI * 2 * per;
        var armPer = Math.cos(r * swings) + 1 / 2;
        this.moveArm('arm_right',  - .1 + .2 * armPer, 0);
        this.moveArm('arm_left', .1 - .2 * armPer, 0);
        this.moveLegs(per * swings);
    }
    // just return an instance of guy for now
    return Guy;
}
    ());
```

So then the whole idea is to just have a way to create an instance of one of these, and then just use the prototype methods to work with the model in a project. With that said maybe I should take the moment to go over just one little demo that makes use of this for what it is worth.

### 1.1 - Single guy one r0 model hello world exmple

Now to test out this guy model to see if things work out okay so far, and it would seem that they do. For this first getting started type example I am just creating a static scene in which I create a single guy object and then use the built in methods to chnage the state of the arms.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    //-------- ----------
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const guy1 = new Guy();
    guy1.group.position.set(0, 3, 0)
    scene.add(guy1.group);
    guy1.moveArm('arm_right', 0, 1.25);
    guy1.moveArm('arm_left', 0.1, 1.25);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

### 1.2 - Using more than one guy.js r0 module demo

Here I am creating not one, not two, but three instances of this guy model. For each guy model I am doing something a little different, where one is just shaking there head, another is moving there arms up and down, and another is being really animated in a few ways. So then this seems to work okay at least for making little video projects that might involve a few of these, or maybe even a lot of them actually.
<iframe class="youtube_video" src="https://www.youtube.com/embed/u5tRAChrMfM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


What I worked out here when it comes to the guy model that is fairly animated might prove to be a good starting point for another helper method for setting position of one of these. However there is a bit more than just that of course so I think at least a few more demos are called for when it comes to setting position and rotation of something like this.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(28, 7) );
    const camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // ADDING GUY OBJECTS TO SCENE
    //-------- ----------
    const guy1 = new Guy();
    guy1.group.position.set(0, 3, 0)
    scene.add(guy1.group);
    const guy2 = new Guy();
    guy2.group.position.set(5, 3, 0);
    scene.add(guy2.group);
    const guy3 = new Guy();
    guy3.group.position.set(-5, 3, 0);
    scene.add(guy3.group);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let frame = 0,
    lt = new Date();
    const maxFrame = 200;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 0.05) {
            const per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = Math.PI * 2 * per;
            // guy1 walks around, and moves head
            guy1.walk(per, 8);
            guy1.moveHead(.25 - .25 * bias);
            guy1.group.position.set(
                Math.cos(r) * 5 - 5,
                3,
                Math.sin(r) * 5);
            guy1.group.lookAt(
                Math.cos(r + 0.5) * 5 - 5,
                3,
                Math.sin(r + 0.5) * 5);
            // guy 2 shakes his head
            guy2.moveHead(.125 - .25 * bias);
            // guy 3 just moves arms
            guy3.moveArm('arm_right', 0, bias * 2);
            guy3.moveArm('arm_left', 0, bias * 2);
            // draw
            renderer.render(scene, camera);
            frame += 30 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

So now I think what I need to do is make some examples that are not just about a single model like this, but a number of models like this. I will want to have one or more of these kinds of models in a scene, along with some additional models that are other objects to place in the scene. Then there is just working out what the over all project is from that point forward when it comes to the animation, and things that are outside of animation all together like having a script, or a storyboard, but maybe getting into that kind of thing is a matter for a whole other post.

For now I just want to have a very basic, crude, guy model, and with that said I think I have something. Maybe when I start to use this I will want to add at least a few more methods, mesh objects, and so forth, but I think I want to keep this very basic and crude. For wherever the reason I seem to like that kind of style actually.

### 1.3 - Scale and position r0 demo

In future revisions of this guy one module that I may or may not get to at some point I am sure that I will want to have better methods for helping me with the process of positioning one of these little guys to the surface of something. I am thinking that when I use this module it will be for some very simple crude scenes where I will just have everything positioned on top of a plane geometry for now maybe. So for this demo I made a simple helper function that I can call to just set the y value of the Vector3 class instance stored at the position property of the main group object.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 5, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set to plain surface by subtracting by known values
    // for legSize, bodSize, and space that work well
    const setYToPlainSurface = (guy, scale) => {
        scale = scale === undefined ? 1 : scale;
        const legSize = 2 * scale;
        const bodSize = 2 * scale;
        const space = 0.1 * scale;
        guy.group.position.y = legSize + bodSize / 2 + space * 2;
    };
    //-------- ----------
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const guy1 = new Guy();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    scene.add(guy1.group);
    // using set to plain surface
    setYToPlainSurface(guy1, 0.5);
    const guy2 = new Guy();
    guy2.group.scale.set(0.75, 0.75, 0.75);
    scene.add(guy2.group);
    // using set to plain surface
    setYToPlainSurface(guy2, 0.75);
    guy2.group.position.x = 3;
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

### 1.4 - Box3 scale position, and rotation r0 demo

Here I now have another helper for setting the position of the guy, but this time I am using the box3 class to do so which might prove to be a better way to go about doing this sort of thing. I also worked out a helper function for setting the rotation of the guy model as well where I have some things worked out that might be just what I want to happen when using this in a project when it comes to rotation.

By default I will want for the y value of the Vector3 that I given to use for the look at value to be ignored and use the y position of the main group object for the y value. This will allow me to have the guy model face a given direction but only with respect to the x and z values of the given Vector3 object. I can disable this of course and then use the y value, but do so in a way in which things are adjusted to it looks right.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 5, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create guy helper
    const createGuy = (scale) => {
        const guy = new Guy();
        const gud =  guy.group.userData;
        gud.scale = scale;
        guy.group.scale.set(scale, scale, scale);
        // using set to plain surface
        setGuyPos(guy);
        return guy;
    };
    // get guy size helper
    const getGuySize = (guy) => {
        const b3 = new THREE.Box3();
        b3.setFromObject(guy.group);
        const v3_size = new THREE.Vector3();
        b3.getSize(v3_size);
        return v3_size;
    };
    // set guy pos using box3 and userData object
    const setGuyPos = (guy, v3_pos) => {
        v3_pos = v3_pos || new THREE.Vector3();
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        guy.group.position.copy(v3_pos);
        guy.group.position.y = ( v3_size.y + gud.scale ) / 2 + v3_pos.y;
    };
    // a set guy rotation helper
    const setGuyRotation = (guy, v3_lookat, ignoreY) => {
        ignoreY = ignoreY === undefined ? true: ignoreY;
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        const v3 = v3_lookat.clone();
        v3.y = guy.group.position.y;
        if(!ignoreY){
            v3.y = v3_lookat.y + ( v3_size.y + gud.scale ) / 2;
        }
        guy.group.lookAt( v3 );
    };
    //-------- ----------
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const scale_h1 = 1 / getGuySize( createGuy(1) ).y;
    // height 1
    const guy1 = createGuy(scale_h1);
    setGuyPos(guy1, new THREE.Vector3(-2,0,0));
    scene.add(guy1.group);
    // height 2
    const guy2 = createGuy(scale_h1 * 2);
    setGuyPos(guy2, new THREE.Vector3(0,0,0));
    scene.add(guy2.group);
    // height 4, also moving arms and testing out etGuyRotation helper
    const guy3 = createGuy(scale_h1 * 4);
    guy3.moveArm('arm_left', -0.125, 0);
    guy3.moveArm('arm_right', 0.125, 0);
    setGuyPos(guy3, new THREE.Vector3(2,0,0));
    setGuyRotation(guy3, new THREE.Vector3(3,0,2), false);
    scene.add(guy3.group);
    // height 6
    const guy4 = createGuy(scale_h1 * 6);
    setGuyPos(guy4, new THREE.Vector3(6,0,0));
    scene.add(guy4.group);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

### 1.5 - Curve path animaiton r0 demo

Here I now have a new animation loop example involving curves in which I am testing out everything that I have made thus far when it comes to the guy module as well as the additional helper functions that I have made. I have a whole bunch of these guys actually and I am having them all move along a curve path.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 5, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    const al = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create guy helper
    const createGuy = (scale) => {
        const guy = new Guy();
        const gud =  guy.group.userData;
        gud.scale = scale;
        guy.group.scale.set(scale, scale, scale);
        // using set to plain surface
        setGuyPos(guy);
        return guy;
    };
    // get guy size helper
    const getGuySize = (guy) => {
        const b3 = new THREE.Box3();
        b3.setFromObject(guy.group);
        const v3_size = new THREE.Vector3();
        b3.getSize(v3_size);
        return v3_size;
    };
    // set guy pos using box3 and userData object
    const setGuyPos = (guy, v3_pos) => {
        v3_pos = v3_pos || new THREE.Vector3();
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        guy.group.position.copy(v3_pos);
        guy.group.position.y = ( v3_size.y + gud.scale ) / 2 + v3_pos.y;
    };
    // a set guy rotation helper
    const setGuyRotation = (guy, v3_lookat, ignoreY) => {
        ignoreY = ignoreY === undefined ? true: ignoreY;
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        const v3 = v3_lookat.clone();
        v3.y = guy.group.position.y;
        if(!ignoreY){
            v3.y = v3_lookat.y + ( v3_size.y + gud.scale ) / 2;
        }
        guy.group.lookAt( v3 );
    };
    // just a short hand for THREE.QuadraticBezierCurve3
    const QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
        let vs = x1;
        let ve = y1;
        let vc = z1;
        if(arguments.length === 9){
            vs = new THREE.Vector3(x1, y1, z1);
            ve = new THREE.Vector3(x2, y2, z2);
            vc = new THREE.Vector3(x3, y3, z3);
        }
        return new THREE.QuadraticBezierCurve3( vs, vc, ve );
    };
    // QBDelta helper using QBC3
    // this works by giving deltas from the point that is half way between
    // the two start and end points rather than a direct control point for x3, y3, and x3
    const QBDelta = function(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        const vs = new THREE.Vector3(x1, y1, z1);
        const ve = new THREE.Vector3(x2, y2, z2);
        // deltas
        const vDelta = new THREE.Vector3(x3, y3, z3);
        const vc = vs.clone().lerp(ve, 0.5).add(vDelta);
        const curve = QBC3(vs, ve, vc);
        return curve;
    };
    // create guy collection
    const createGuyCollection = (guyCount, hScale) => {
        const scale_h1 = 1 / getGuySize( createGuy(1) ).y;
        // height 1
        const guys = [];
        let gi = 0;
        while(gi < guyCount){
            const guy = createGuy(scale_h1 * hScale);
            // head
            guy.head.material = [
               // 0 default material
               new THREE.MeshPhongMaterial({
                   color: 0xffff00, transparent: true
               }),
               // 1 used for the face
               new THREE.MeshPhongMaterial({
                    color: 0xffffff, transparent: true
                })
            ];
            guy.body.material = new THREE.MeshPhongMaterial({
                color: 0x00ff00, transparent: true
            });
            guy.arm_right.material = new THREE.MeshPhongMaterial({
                color: 0x00ff00, transparent: true
            });
            guy.leg_right.material = new THREE.MeshPhongMaterial({
                color: 0x00ffff, transparent: true
            });
            guy.arm_left.material = guy.arm_right.material;
            guy.leg_left.material = guy.leg_right.material;
            guys.push(guy);
            scene.add(guy.group);
            gi += 1;
        }
        return guys;
    };
    // update a guy collection
    const updateGuyCollection = (guys, f, fMax) => {
        guys.forEach((guy, i, arr)=>{
            const offset = i / arr.length;
            const a1 = f / fMax;
            let a2 = (f + 0.05) / fMax;
            a2 = a2 > 1 ? 1 : a2;
            // position and rotation
            const a3 = (a1 + offset) % 1;
            setGuyPos(guy, curvePath.getPoint( a3 ));
            setGuyRotation(guy, curvePath.getPoint( (a2 + offset) % 1 ) );
            guy.walk(a1, 10);
            // opacity
            const a4 = 1 - Math.abs(0.5 - a3) / 0.5;
            guy.head.material[0].opacity = a4;
            guy.head.material[1].opacity = a4;
            guy.body.material.opacity = a4;
            guy.arm_right.material.opacity = a4;
            guy.leg_right.material.opacity = a4;
        });
    };
    //-------- ----------
    // CURVE PATH
    //-------- ----------
    const curvePath = new THREE.CurvePath();
    curvePath.add( QBDelta(-5, 0, -5, 5, 0, 0, 5, 0, -2.5) );
    curvePath.add( QBDelta(5, 0, 0, 2, 0, 5, 2, 0, 2) );
    curvePath.add( QBDelta(2, 0, 5, -5, 0, 5, 0, 0, 0) );
    curvePath.add( QBDelta(-5, 0, 5, -10, 0, -5, -5, 0, 5) );
    // PATH DEBUG POINTS
    const v3Array_path = curvePath.getPoints(20);
    const points_debug = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(v3Array_path),
        new THREE.PointsMaterial({size: 0.25, color: new THREE.Color(0,1,0)})
    );
    scene.add(points_debug);
    //-------- ----------
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const guys = createGuyCollection(16, 2);
    ///-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let f = 0,
    lt = new Date();
    const fMax = 200;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 0.05) {
            // update guys
            updateGuyCollection(guys, f, fMax)
            // draw
            renderer.render(scene, camera);
            f += 30 * secs;
            f %= fMax;
            lt = now;
        }
    };
    loop();
}
    ());
```

### 1.6 - Explosion Effect r0 demo

Another little demo project that I wanted to work out using the old module thus far is a little addtional code that I can use to create a kind of explosion effect.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // MATERIALS
    //-------- ----------
    const material_leg = new THREE.MeshLambertMaterial({
            color: 0x000000, emissive: 0x00001a, side: THREE.DoubleSide
        });
    // material used for the arms
    const material_arm = new THREE.MeshLambertMaterial({
            color: 0x00ffff, emissive: 0x001a00, side: THREE.DoubleSide
        });
    // material used for the body
    const material_body = new THREE.MeshLambertMaterial({
            color: 0x00ffff, emissive: 0x001a00, side: THREE.DoubleSide
        });
    // array of materials used for the head
    const material_head = [
        // 0 default material
        new THREE.MeshLambertMaterial({
            color: 0xffaf00, emissive: 0x1a1a00, side: THREE.DoubleSide
        }),
        // 1 used for the face
        new THREE.MeshLambertMaterial({
            color: 0xffffff, emissive: 0x1a1a1a, side: THREE.DoubleSide
        })
    ];
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    const al = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create guy helper
    const createGuy = (scale, maxUnitDelta, maxRotation) => {
        const guy = new Guy();
        const gud =  guy.group.userData;
        gud.scale = scale;
        gud.maxUnitDelta = maxUnitDelta === undefined ? 1 : maxUnitDelta;
        gud.maxRotation = maxRotation === undefined ? 1 : maxRotation;
        guy.group.scale.set(scale, scale, scale);
        // for each mesh
        guy.group.traverse(( obj ) => {
            if(obj.type === 'Mesh'){
                const mesh = obj;
                const mud = mesh.userData;
                // I WANT A NON INDEX GEOMETRY
                mesh.geometry = mesh.geometry.toNonIndexed();
                // store refs to pos and a clone of the pos
                const pos = mesh.geometry.getAttribute('position');
                mud.pos = pos;
                mud.pos_home = pos.clone();
            }
        });
        // use materials in this file
        guy.head.material = material_head.map( (m) => { return m.clone(); });
        guy.body.material = material_body.clone();
        guy.arm_left.material = material_arm.clone();
        guy.arm_right.material = material_arm.clone();
        guy.leg_right.material = material_leg.clone();
        guy.leg_left.material = material_leg.clone();
        // using set to plain surface
        setGuyPos(guy);
        return guy;
    };
    // create a guy by way of a hight scale value
    const createGuyHScale = (HScale, maxUnitDelta, maxRotation) => {
        const scale_h1 = 1 / getGuySize( createGuy(1) ).y;
        const guy = createGuy(HScale * scale_h1, maxUnitDelta, maxRotation);
        return guy;
    };
    // get guy size helper
    const getGuySize = (guy) => {
        const b3 = new THREE.Box3();
        b3.setFromObject(guy.group);
        const v3_size = new THREE.Vector3();
        b3.getSize(v3_size);
        return v3_size;
    };
    // set guy pos using box3 and userData object
    const setGuyPos = (guy, v3_pos) => {
        v3_pos = v3_pos || new THREE.Vector3();
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        guy.group.position.copy(v3_pos);
        guy.group.position.y = ( v3_size.y + gud.scale ) / 2 + v3_pos.y;
    };
    // a set guy rotation helper
    const setGuyRotation = (guy, v3_lookat, ignoreY) => {
        ignoreY = ignoreY === undefined ? true: ignoreY;
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        const v3 = v3_lookat.clone();
        v3.y = guy.group.position.y;
        if(!ignoreY){
            v3.y = v3_lookat.y + ( v3_size.y + gud.scale ) / 2;
        }
        guy.group.lookAt( v3 );
    };
    // update guy method
    const updateGuyEffect = (guy, globalAlpha, effect) => {
        const group = guy.group;
        const gud = group.userData;
        group.traverse( (obj) => {
            if(obj.type === 'Mesh'){
                const mesh = obj;
                const mud = mesh.userData;
                let ti = 0;
                const ct = mud.pos.array.length;
                // for each trinagle
                while(ti < ct){
                    // for each point of a triangle
                    let pi = 0;
                    while(pi < 3){
                        const i = ti + pi * 3;
                        // create vector3 from pos_home
                        const x = mud.pos_home.array[ i ];
                        const y = mud.pos_home.array[ i + 1];
                        const z = mud.pos_home.array[ i + 2];
                        const v_pos_home = new THREE.Vector3(x, y, z);
                        // figure out the delta
                        let v_delta = new THREE.Vector3(0, 0, 1);
                        v_delta = effect(ti, pi, v_pos_home, globalAlpha, mesh, group, mud, gud, v_delta);
                        // update pos
                        const v_pos = v_pos_home.clone().add( v_delta );
                        mud.pos.array[ i ] = v_pos.x;
                        mud.pos.array[ i + 1] = v_pos.y;
                        mud.pos.array[ i + 2] = v_pos.z;
                        pi += 1;
                    }
                    ti += 9;
                }
                mud.pos.needsUpdate = true;
            }
        });
    };
    //-------- ----------
    // EFFECTS
    //-------- ----------
    // EFFECT 1
    const EFFECT1 = (ti, pi, v_pos_home, globalAlpha, mesh, group, mud, gud, v_delta) => {
        const a1 = ti / mud.pos.array.length;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * gud.maxRotation * globalAlpha * (0.25 + a1);
        v_delta.applyEuler(e).normalize().multiplyScalar( globalAlpha * gud.maxUnitDelta);
        return v_delta;
    };
    //-------- ----------
    // CREATE GUY
    //-------- ----------
    // guy1
    const guy1 = createGuyHScale(3, 0.25, 8);
    scene.add(guy1.group);
    ///-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let f = 0,
    lt = new Date();
    const fMax = 200;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 0.05) {
            const a1 = f / fMax;
            const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
            guy1.walk(a1, 8);
            setGuyPos(guy1, new THREE.Vector3(0,0,0));
            setGuyRotation(guy1, new THREE.Vector3(1, 0, 5 * a2));
            updateGuyEffect(guy1, a2, EFFECT1);
            // draw
            renderer.render(scene, camera);
            f += 30 * secs;
            f %= fMax;
            lt = now;
        }
    };
    loop();
}
    ());
```

## Conclusion

I am happy with this basic kind of guy module, and moving forward with it from here might just involve adding a few more features when it comes to how I go about using in an other projects. I might want to make a slightly more advanced version of this kind of guy model, but once I have a few models like this it gets to the point where all I have to do is just skin them in different ways and that is about it.

I am all ready using this guy model, and many variations of this in other projects, and examples. I have a few in the works actually, but so far one that I am most happy with thus far is my [guy stuck on hamster wheel](/2021/04/19/threejs-examples-hamster-wheel/) example. I am sure that I will be making at least a few other examples here and there that make use of this, or other modules that are based on it, and as I do I will try to come back here and edit this post when I do so.



