---
title: Basic Guy Model threejs example
date: 2021-04-29 14:15:00
tags: [three.js]
layout: post
categories: three.js
id: 856
updated: 2022-02-28 09:30:06
version: 1.21
---

I want to start thinking in terms of what the long term plan with [threejs](https://threejs.org/) might be for me if I am going to continue writing new posts on it, and also what to do when it comes to starting some kind of actual project using threejs rath than just quick simple tech demos that I write about in these [posts on threejs](/categories/three-js/). It would seem that I could write a lot more just when it comes to basic, and not so basic features of the library, and maybe with that alone there will always be something more to write about. However I think what I really need to start doing is making a [few examples](/2021/02/19/threejs-examples/) that are some kind of starting point for an actual project of some kind. With that said I think I will be writing about my first, basic guy, or person model using three.js that I made a while back, and then updated just a little for the sake of this post.

I actually have a number of crude modules that are really just a collection of mesh objects using the built in three.js geometries, rather than a professionally made model that is imported from something like blender such as by [loading exported dae files](/2021/04/30/threejs-dae-collada-loader/). I have nothing against making those kinds of modules, it is just that those kinds of modules can prove to be time consuming to make, and they do not always result in an over all better finished product in the end. Also I am taking into account what I want to really make with three.js and I am thinking more so in terms of animations in the fork of videos, rather than games. So all that matters in the end is if the final product looks the way I want it to when it comes to the final video and that is it. Crude modules might look crude, but if I am going for that kind of style to begin with, then they will work just fine and I can move on to other aspects of making that kind of content. What really matters most then is the over all finished product in terms of everything, not just the animation, and I am finding [content on youtube that I would say are examples of doing this kind of angle right](https://www.youtube.com/watch?v=3a1gCQzBQws).

So when it comes to the kinds of over all scenes that I would like to make, I will want to have at least one, if not a few basic guy, or person type models. With that said this post is on one of my first modules for this sort of thing. This kind of module, and several other variations of it, has all ready appears in some of my other examples. However in this post I think I will be just writing about the guy model by itself, and a single demo of the model.

<!-- more -->

## Basic three.js guy model and what to know before hand

This is a post on using three.js to make a very crude guy module using built in three.js features and geometries only along with a little javaScript code. There are other more standard ways of making a model that might prove to be a better option in the long run, but I kind of like just making simple modules like this with javaScript code alone.

This is not a getting started post on three.js, let along javaScript in general, so if you want to reproduce what I have worked out here I trust you have at least some grasp on the basics at least when it comes to doing something with three.js and a little client side javaScript.

### Version Numbers matter with three.js

This is something that I have found that I just need to repeat over and over again in every three.js post. When I first made this model I was using three.js version r91. I then just made a few quick, simple changes to the model to make it work with version r127, which was the version I was using when I wrote this. Always look at dates of posts when reading content on the open web that have to do with a javaScript library, especially such a fast moving one like three.js as code breaking changes are made often with this one.

### The source code examples in this post are on Github

The source code examples that I am writing about here can be found on Github at my [test threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-guy-one) repository. Also I am writing about something that I started in another project that I just called [threejs guy](https://github.com/dustinpfister/threejs_guy) that is also up on Gthub.

###  The guy.js file

Here I have the source code of my first basic guy model. When I made this I was thinking in terms of having a base class that I might built on top of when it comes to making additional variants of this kind of thing for better or worse. When it comes to actually using this though I have made other modules that are just like this only they take a more functional approach. However what I really care about is to just have a very crude basic guy, or person type module that I can just skin with some textures by hacking over the materials that are being used a little. With that said this is more or less what I hand in mind when it comes to having something to that effect.

```js
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

## 1 - A Basic demo of the guy.js module

Now to test out this guy model to see if things work out okay so far, and it would seem that they do. Here I am creating not one, not two, but three instances of this guy model. For each guy model I am doing something a little different, where one is just shaking there head, another is moving there arms up and down, and another is being really animated in a few ways.

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // GUY Instances
    var guy1 = new Guy();
    scene.add(guy1.group);
    var guy2 = new Guy();
    guy2.group.position.set(5, 0, 0);
    scene.add(guy2.group);
    var guy3 = new Guy();
    guy3.group.position.set(-5, 0, 0);
    scene.add(guy3.group);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var frame = 0,
    maxFrame = 200,
    lt = new Date();
    var loop = function () {
 
        var now = new Date(),
        secs = (now - lt) / 1000;
 
        requestAnimationFrame(loop);
 
        if (secs > 0.05) {
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = Math.PI * 2 * per;
 
            // guy1 walks around, and moves head
            guy1.walk(per, 8);
            guy1.moveHead(.25 - .25 * bias);
            guy1.group.position.set(
                Math.cos(r) * 5 - 5,
                0,
                Math.sin(r) * 5);
            guy1.group.lookAt(
                Math.cos(r + 0.5) * 5 - 5,
                0,
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

## 4 - Conclusion

I am happy with this basic kind of guy module, and moving forward with it from here might just involve adding a few more features when it comes to how I go about using in an other projects. I might want to make a slightly more advanced version of this kind of guy model, but once I have a few models like this it gets to the point where all I have to do is just skin them in different ways and that is about it.

I am all ready using this guy model, and many variations of this in other projects, and examples. I have a few in the works actually, but so far one that I am most happy with thus far is my [guy stuck on hamster wheel](/2021/04/19/threejs-examples-hamster-wheel/) example. I am sure that I will be making at least a few other examples here and there that make use of this, or other modules that are based on it, and as I do I will try to come back here and edit this post when I do so.



