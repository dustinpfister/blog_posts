---
title: Biplane group threejs example
date: 2021-02-18 16:17:00
tags: [three.js]
layout: post
categories: three.js
id: 806
updated: 2023-09-05 09:06:49
version: 1.35
---

Today I think I will continue with my biplane model in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) by making a model of models that will serve as another [threejs example](/2021/02/19/threejs-examples/) when it comes to working out some fun project examples of three.js in action. 

So in other words in this example I will take the [biplane model that I worked out in my last post](/2021/02/17/threejs-examples-biplane/) and make another model that is just a group of these biplane models. This is a comment theme in programing where I have a single instance of something, and then a collection of instances of that something. There are then methods that I use with a single instance of that something and then methods that i use with a collection of them. I will not be doing anything to advanced with this project though and for the most part this is just yet another examples where I am just building on top of previsions examples that I have all ready made before hand.

I do not think I want to sink to much time into this, but it can still prove to be a little fun as a quick side project, and this also might prove to be a learning experience as aways to say the least. Also I think that there is only so much more to write about when it comes to the basics of three.js, so when it comes to continuing to write about threejs the next steps forward are going to have to be about some actual projects, or simple examples at least, where I am making use of the library.


<!-- more -->

## The biplane group model and what to know first

This is a post on a three.js example where I am creating a Group of Groups, or [nested groups](/2021/05/10/threejs-examples-nested-groups/) if you prefer and then each child group is a collection of Mesh objects that come together to look like something that is a biplane. I am then creating a number of these bi plane groups so there is then yet another level of this going on when using it in a main javaScript file. So then the example here might prove to be a little advanced for people who are still [relatively new to three.js](/2018/04/04/threejs-getting-started/), but it might still not prove to be to complex. In any case in this section I will be going over a few things that you should be aware of before continuing to read the rest of this post.

<iframe class="youtube_video" src="https://www.youtube.com/embed/Mq37hBHx-Qc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Source code is also on Github

The Source code examples that I am writing about here are also [on Github in my test threejs repo](https://github.com/dustinpfister/test_threejs/blob/master/views/forpost/threejs-examples-biplane-group/README.md). This is also where I park the [source code for all the oter posts that I have wrote on threejs](/categories/three-js/) thus far as well.

### Version Numbers matter with three.js

When I first wrote this post I was using r125 of threejs, and the last time I cam around to do a little editing I was using [r146 of the library and thus updated tha main js file of the first demo to my style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) for that demo. I did not get around ro updating the mousle code though, or make any new revisions of the module so much of the code here is still in an older style.

Code breaking changes are made to threejs all the time so when working with code examples on the open web make sure that you keep that in mind. If you are using a late revision of threejs there is a good change that much of the code here will not work.

## 1 - Biplane Group model R0 and demo

For this section I am writing about R0 of the biplane group and the biplane module.

## 1.a - Biplane Group model R0

First off is the biplane group that will create a group of groups where each nested group is an instance of my biplane model. I wrote a post on that yesterday, but I will be getting to the copy of the model in the next section also anyway even though not much has changed with that for this example. So then in this section I will then be covering this new model that is actually just a collection of models where each model is one of my little biplane models.

I thought that maybe it would be a good idea to have a set number of biplanes for each biplane group for now when it comes to making something like this. So for now it is just a group of three biplane models each positioned in a circle around the origin point of the group.

Like many of my other modules like this there is a create method that will just create a single instance of this bi plane group model, and another method that will update the state of a biplane group. The create method will return an instance of THREE.Group, and each Child of that group will be a group of mesh objects created with the biplane module. Inside this create method I am also attaching a number of values for the user data objects for the main biplane group as well as for each bi plane group also.


```js
var BiplaneGroup = (function () {
 
    var BIPLANE_COUNT = 3,
    MAX_FRAME = 75;
 
    var api = {};
 
    var bias = function (per) {
        return Math.abs(0.5 - per) / 0.5;
    };
 
    var updateChildPositions = function (group, secs) {
        var i = 0,
        gud = group.userData,
        bi,
        radian,
        x,
        y,
        z,
        len = group.children.length;
        while (i < len) {
            bi = group.children[i];
            radian = Math.PI * 2 / len * i;
            x = Math.cos(radian) * 10;
            y = -5 + 10 * bias(bi.userData.yFrame / MAX_FRAME);
            z = Math.sin(radian) * 10;
            bi.position.set(x, y, z);
            // make leader roll
            if (bi.userData.rotate) {
                bi.rotation.set(0, 0, bi.userData.r);
                bi.userData.r += Math.PI / 180 * bi.userData.rSpeed * secs;
                bi.userData.r %= (Math.PI * 2);
            }
            Biplane.updateProp(bi, gud.propPer);
            bi.userData.yFrame += 1;
            bi.userData.yFrame %= MAX_FRAME;
            i += 1;
        }
    };
 
    // update
    api.update = function (group, secs) {
        var gud = group.userData;
        group.visible = false;
        if (gud.active) {
            group.visible = true;
            gud.propPer += 0.8 * secs;
            gud.propPer %= 1;
            updateChildPositions(group, secs);
        }
    };
 
    // main create method
    api.create = function (opt) {
        opt = opt || {};
        var group = new THREE.Group(),
        gud = group.userData;
        var i = 0,
        bi;
        while (i < BIPLANE_COUNT) {
            bi = Biplane.create();
            bi.userData.yFrame = Math.floor(MAX_FRAME * (i / BIPLANE_COUNT));
            bi.userData.rSpeed = 360;
            bi.userData.rotate = false;
            bi.userData.r = 0;
            group.add(bi);
            i += 1;
        }
        bi = group.children[0];
        bi.userData.rotate = true;
        bi.userData.rSpeed = 180;
 
        gud.active = true;
        api.update(group, 0);
        gud.active = false;
        gud.propPer = 0;
        gud.pps = 32;
        return group;
    };
 
    return api;
}
    ());
```

There is a great deal that I could do when it comes to working out what the logic should be when it comes to updating the position of each plane relative to the origin of the bi plane group. However I think for now I will do something simple were each biplane just moves up and down a little, and also have each first child of the group do a rotation. When it comes to making this kind of model I think what really matters first and foremost is to get the biplane model solid, and then this kind of module will change a little from one animation to the next.


### 1.b - Biplane model

Here is the source code of the biplane model that I am using in the biplane group model. The source code for this is not all that different from what I worked out in yesterdays post. It is just a way of creating a threejs group that is a collection of mesh objects each using the box geometry constructor to just slap something together that looks like a little bi plane. Just like many other modules like this I have a main create method that i can use to create just one group of mesh objects that will be one of the biplanes. I then have a number of methods that I can use to update the state of one of a given biplane.

```js
var Biplane = (function () {
 
    var materials = {
        plane: new THREE.MeshStandardMaterial({
            color: 0x0000af,
            emissive: 0x000044
        }),
        guy: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x444444
        }),
        prop: new THREE.MeshStandardMaterial({
            color: 0x404040,
            emissive: 0x202020
        })
    };
 
    var api = {};
 
    // create a wing
    var createWing = function (opt, y) {
        var wing = new THREE.Mesh(
                new THREE.BoxGeometry(10, 1, 2),
                opt.materials.plane || materials.plane);
        wing.position.y = y;
        wing.position.z = 2.5;
        return wing;
    };
 
    // create a body
    var createBody = function (opt) {
        var body = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 10),
                opt.materials.plane || materials.plane);
        return body;
    };
 
    // create a body
    var createTail = function (opt) {
        var body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 2),
                opt.materials.plane || materials.plane);
        body.position.z = -4.0;
        body.position.y = 2;
        return body;
    };
 
    // create guy
    var createGuy = function () {
        var guy = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials.guy);
        guy.position.z = 0;
        guy.position.y = 1.5;
        return guy;
    };
 
    // create prop
    var createProp = function () {
        var prop = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 4, 0.5),
                materials.prop);
        prop.position.set(0, 0, 5.25);
        return prop;
    };
 
    var createUserData = function (bp, opt) {
        var ud = bp.userData;
        ud.propData = {
            rotations: 80, // number of rotations
            radian: 0 // current radian of prop
        };
    };
 
    // main create method
    api.create = function (opt) {
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
        // box helper
        plane.add(new THREE.BoxHelper(plane, 0xffffff));
        // create user data object
        createUserData(plane, opt);
        return plane;
    };
 
    // set the prop for the given biplane using a (0 - 1) value
    api.updateProp = function (bp, per) {
        var ud = bp.userData;
        ud.propData.radian = Math.PI * ud.propData.rotations * per;
        ud.prop.rotation.set(0, 0, ud.propData.radian);
    };
 
    api.updateRoll = function (bp, per, dir) {
        dir = dir === undefined ? 1 : dir;
        // rotate whole group
        bp.rotation.z = Math.PI * 2 * per * dir;
    };
 
    api.updatePitch = function (bp, per, dir) {
        dir = dir === undefined ? 1 : dir;
        // rotate whole group
        bp.rotation.x = Math.PI * 2 * per * dir;
    };
 
    return api;
}
    ());
```

### 1.1 - A flyby basi demo of thre biplane group module

Now for some additional javaScript to make use of this new biplane group model. I start off with a scene and a camera like always with just about any of these examples like always. However with this example I am using materials that will respond to light so in this example I will want a light source, and when it comes to adding a light source I went with a [point light](/2019/06/02/threejs-point-light) and I also wanted to add at least a little [ambient light](/2018/11/02/threejs-ambientlight/) also. This is a typical situation with light where I have a baseline amount of light and then something like a point light to help show some depth with the materials that I am using with the biplanes.

I then went ahead and made a collection of these bi plane group models so there is yet another collection level of sorts when it comes to each instance of the biplane group model. I have to say that that [THREE.group](/2018/05/16/threejs-grouping-mesh-objects/) constructor is great for keeping things compartmentalized when working out things like this that might be many nested levels of objects.

I then set up my renderer and also a main application loop. It is inside this animation loop that I am going over the collection of bi plane groups and updating the position of each group. For now I am thinking that I should just have each group move from one side of the scene over to another side and then just have a way so that they reposition back on the starting side once they pass a given range.

```js
//-------- ----------
// SCENE, RENDERER, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 1000);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// grid
scene.add(new THREE.GridHelper(1000, 100, 0xff0000, 0x4a4a00));
// biplane groups
const biGroups = new THREE.Group();
scene.add(biGroups);
let i = 0;
while (i < 9) {
    const  group = BiplaneGroup.create();
    group.position.z = -50 + 50 * (i % 3);
    group.position.y = 50 - 50 * Math.floor(i / 3);
    group.rotation.y = Math.PI * 0.5;
    biGroups.add(group);
    i += 1;
}
// light
const dl = new THREE.DirectionalLight(0xffffff, 0.9);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(dl);
scene.add(al);
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(80, 80, 80);
let lt = new Date();
function loop() {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    biGroups.children.forEach(function (biGroup) {
        BiplaneGroup.update(biGroup, secs);
        if (!biGroup.userData.active) {
            biGroup.position.x = -200;
            biGroup.userData.pps = 32 + Math.round(64 * Math.random());
            biGroup.userData.active = true;
        } else {
            biGroup.position.x += biGroup.userData.pps * secs;
            if (biGroup.position.x >= 200) {
                biGroup.userData.active = false;
            }
        }
    });
    controls.update();
    renderer.render(scene, camera);
    lt = now;
};
loop();
```

The final result of all of this is having a cool little animation of sorts where there are all these bi plane groups moving from one side of the scene over to the other side at various speeds. I might want to add and change a whole lot of things here and there when it doe come to the idea of putting even more time into this one. However for now I think that this is more or less what I had in mind for this example that was just a little exercise of sorts and that is about it.

## Conclusion

This was a fun quick little side project where I continued with another quick simple side project with the biplane model. Still if I can not think of some kind of long term project with this, or something like this I do not think I will be putting to much time into something like this. I have a whole lot of other little side projects like this and some of them should get more attention. 

Maybe if I can think of some cool video type project to create with threejs that will help me get on track with continuing with this sort of thing. That is to make a whole bunch of other simple models like this some of which are just models of models like in this post, and create a scene that I can export as a video file.

Another idea is to start to create some very basic, yet maybe fun game out of models like this. That sort of thing might prove to be very time consuming though, and I all ready have a lot of canvas projects that are proving to be that kind of project all ready. So I would like to do something new with threejs maybe if I am going to put more time into this.

