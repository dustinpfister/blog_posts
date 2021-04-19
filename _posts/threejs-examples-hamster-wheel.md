---
title: Hamster Wheel threejs example
date: 2021-04-19 17:13:00
tags: [three.js]
layout: post
categories: three.js
id: 848
updated: 2021-04-19 17:57:01
version: 1.10
---

This week I am going to pay a little attention to my [threejs](https://threejs.org/) content by editing some older posts, but also writing a [few new examples posts](/2021/02/19/threejs-examples/) also, as I feel that is the next real step forward for me at this point. Anyway when it comes to starting to make something that is starting to look like an actual project of one kind of another I have found that I like to just make very simple basic models that are just groups of the built in geometries. With that said todays post will be yet another one of those kinds of examples where I am just having a little fun with three.js.

With that said this post will be on an example where I have a simple little guy model that is walking inside a human sized hamster wheel. So this is a a fun little project that has to do with [something that is often used as an analogy for being stuck in a loop](https://lifecoachonthego.com/stuck-on-a-hamster-wheel-what-do-you-need-to-thrive/) where I keep doing the same things over and over again, and never really get anywhere which of course results in a kind of burn out. In other words getting stuck on a hamster wheel of life sort of speak, which then raises the question how does one get off this hamster wheel?

I am experiencing a kind of burn out because I spend a great deal of time doing what I think I need to do, rather than what I want to do. Sadly often I end up spending all day writing these posts, and simple source code examples for such posts. As such there often is no time left over for working on any kind of real project that I truly would like to work on. So I thought that this kind of threejs example would be a nice break from the usual kind of post where I am just writing about some kind of method in a framework, or some kind of native javaScript feature.

<!-- more -->

## What to know before hand

This is a threejs example that is intended for people that all ready have a solid grasp on the basics of threejs and are not looking to start making some actual projects of some kind. So this is not a getting stared post on threejs, let alone javaScript in general. So I assume that you have at least some basic working knowledge of threejs and javaScript and thus might gain something of value from reading this. If not you might want to start out with a getting started post on threejs, and maybe javaScript before starting to get into a framework like threejs.

### version numbers matter with threejs

For this example I was using threejs version r127, in many of my older posts I was using older versions of threejs in some of them I was using r91. There are some javaScript libraries where much has not changed in the last few years, and as such older code will still work just fine. However this is not the case with threejs, it is a very fast moving library in terms of development so if this code is breaking the first thing you should check is the version number of threejs that is being used.

## 1 - A Wheel Model

First off is my wheel module that will create an return a hamsetr wheel model. This module has just one public method that will create and return an object that contains a few instances of the [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/) constructor.

```js
(function (WheelMod) {
 
    var material = new THREE.MeshStandardMaterial({
        color: 0xafafaf
    });
 
    // create a base for the given wheel object
    var createBase = function(wheel){
        wheel.base = new THREE.Group();
        wheel.group.add(wheel.base);
        // BASE
        var parts = [{
                len: 1,
                rx: Math.PI / 2,
                rz: 0,
                px: 0,
                py: 0,
                pz: 0.5
            }, {
                len: 4,
                rx: 0,
                rz: Math.PI / 4,
                px: 1.4,
                py: -1.4,
                pz: 0.9
            }, {
                len: 6,
                rx: 0,
                rz: Math.PI / 2,
                px: 0,
                py: -2.8,
                pz: 0.9
            }, {
                len: 2,
                rx: Math.PI / 2,
                rz: 0,
                px: -2.9,
                py: -2.8,
                pz: 0
            }
        ];
        var self = wheel;
        parts.forEach(function (part) {
            var i = 0,
            len = 2;
            while (i < len) {
                var neg = 1;
                if (i === 1) {
                    neg = -1;
                }
                var cy = new THREE.Mesh(
                        new THREE.CylinderGeometry(.125, .125, part.len),
                        material);
                cy.rotation.x = part.rx;
                cy.rotation.z = part.rz;
                cy.position.set(
                    part.px,
                    part.py,
                    part.pz * neg - 2 * i);
                self.base.add(cy);
                i += 1;
            }
        });
    };
 
    // create the wheel with rims and tubes connected between them
    var createWheel = function(wheel){
        wheel.wheel = new THREE.Group();
        wheel.group.add(wheel.wheel);
        var geo = new THREE.TorusGeometry(2, .125, 20, 20);
        // RIMS
        var ct = 2,
        rim,
        i = 0;
        while (i < ct) {
            rim = new THREE.Mesh(
                    geo,
                    material);
            rim.position.set(0, 0, -2 + 2 * i);
            wheel.wheel.add(rim);
            var bar = new THREE.Mesh(
                    new THREE.CylinderGeometry(.125, .125, 4),
                    material);
            bar.position.set(0, 0, -2 + 2 * i);
            wheel.wheel.add(bar);
            i += 1;
        }
        var ct = 15,
        rim,
        i = 0;
        while (i < ct) {
            var r = Math.PI * 2 / ct * i;
            // TUBES connecting rims
            var cy = new THREE.Mesh(
                    new THREE.CylinderGeometry(.125, .125, 2),
                    material);
            cy.rotation.x = Math.PI / 2;
            cy.position.x = Math.cos(r) * 2;
            cy.position.y = Math.sin(r) * 2;
            cy.position.z = -1;
            wheel.wheel.add(cy);
            i += 1;
        }
    };
 
    // the Wheel constructor
    WheelMod.create = function () {
        var wheel = {};
        // a group that will hold all mesh objects
        wheel.group = new THREE.Group();
        createWheel(wheel);
        createBase(wheel);
        return wheel;
    };
 
}( this['WheelMod'] = {} ));
```

## 2 - A Guy Model

```js
(function (GuyMod) {
    // material used for the legs
    var material_leg = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
            emissive: 0x00001a
        }),
    // material used for the arms
    material_arm = new THREE.MeshLambertMaterial({
            color: 0xaf0000,
            emissive: 0x001a00
        });
    // material used for the body
    material_body = new THREE.MeshLambertMaterial({
            color: 0xff0000,
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
    GuyMod.create = function () {
        var guy = {};
        // a group that will hold all mesh objects
        guy.group = new THREE.Group();
        // HEAD
        guy.head = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials_head);
        guy.head.position.y = 1.6;
        // set material index
        guy.head.geometry.groups.forEach(function (face) {
            // set all to zero by default
            face.materialIndex = 0;
        });
        guy.head.geometry.groups[4].materialIndex = 1;
        // one side of face set to face material
        //this.head.geometry.groups[8].materialIndex = 1;
        //this.head.geometry.groups[9].materialIndex = 1;
        guy.head.castShadow = true;
        guy.group.add(guy.head);
        // BODY
        guy.body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 1),
                material_body);
        guy.body.castShadow = true;
        guy.group.add(guy.body);
        // RIGHT ARM
        guy.arm_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        guy.arm_right.geometry.translate(0,  - .5, 0);
        guy.arm_right.position.x = 1;
        guy.arm_right.position.y = .75;
        guy.arm_right.castShadow = true;
        guy.group.add(guy.arm_right);
        // LEFT ARM
        guy.arm_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        guy.arm_left.geometry.translate(0,  - .5, 0);
        guy.arm_left.position.x = -1;
        guy.arm_left.position.y = .75;
        guy.arm_left.castShadow = true;
        guy.group.add(guy.arm_left);
        // RIGHT LEG
        guy.leg_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        guy.leg_right.geometry.translate(0, -1, 0);
        guy.leg_right.position.x = .35;
        guy.leg_right.position.y = -1.1;
        guy.leg_right.castShadow = true;
        guy.group.add(guy.leg_right);
        // LEFT LEG
        guy.leg_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        guy.leg_left.geometry.translate(0, -1, 0);
        guy.leg_left.position.x =  - .35;
        guy.leg_left.position.y = -1.1;
        guy.leg_left.castShadow = true;
        guy.group.add(guy.leg_left);
        // retun the guy object
        return guy;
    };
    // move the arm of give id ('arm_right' or 'arm_left');
    // x and z should be a value between 0, and 1
    GuyMod.moveArm = function (guy, armId, x, z) {
        var arm = guy[armId];
        z = Math.PI / 2 * z;
        if (armId === 'arm_left') {
            z -= z * 2;
        }
        arm.rotation.set(Math.PI * 2 * x, 0, z);
    };
    // rotate head around
    // per is 0 to 1
    GuyMod.moveHead = function (guy, per) {
        guy.head.rotation.set(0, Math.PI * 2 * per, 0);
    };
    // move legs in respect to a walk cycle
    // where per is between 0, and 1.
    GuyMod.moveLegs = function (guy, per) {
        per %= 1;
        var bias = Math.abs(.5 - per) / .5;
        guy.leg_left.rotation.set(.75 - bias * 1.5, 0, 0);
        guy.leg_right.rotation.set( - .75 + bias * 1.5, 0, 0);
    };
    // walk
    GuyMod.walk = function (guy, per, swings) {
        per = per === undefined ? 0 : per;
        swings = swings === undefined ? 1 : swings;
        var r = Math.PI * 2 * per;
        var armPer = Math.cos(r * swings) + 1 / 2;
        GuyMod.moveArm(guy, 'arm_right',  - .1 + .2 * armPer, 0);
        GuyMod.moveArm(guy, 'arm_left', .1 - .2 * armPer, 0);
        GuyMod.moveLegs(guy, per * swings);
    };
    // return the Guy Class
    //return Guy;
}( this['GuyMod'] = {} ));
```

## 3 - A main.js file

```js
(function(){
    // SCENE
    var scene = new THREE.Scene();
    // WHEEL
    var wheel = WheelMod.create(); //new HamsterWheel();
    wheel.group.position.set(0, 0, 1);
    scene.add(wheel.group);
    // GUY
    var guy = GuyMod.create(); //new Guy();
    guy.group.scale.set(0.5, 0.5, 0.5);
    guy.group.position.set(0,  - .4, 0);
    guy.group.rotation.set(0, Math.PI / 2, 0)
    scene.add(guy.group);
    // Plane
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 30, 8, 8),
        new THREE.MeshBasicMaterial({
            color: 0x4a4a4a
        })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.9;
    scene.add(plane);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
    camera.position.set(4, 4, 9);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight());
    scene.add(camera);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    var container = document.getElementById('demo') || document.body;
    container.appendChild(renderer.domElement);
    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    // LOOP
    var frame = 0, 
    maxFrame = 200,
    fps_target = 24,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = ( now - lt ) / 1000;
        requestAnimationFrame(loop);
        if(secs >= 1 / fps_target){   
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = -Math.PI * 2 * per;
            wheel.wheel.rotation.z = r;
            GuyMod.walk(guy, per * 4);
            controls.update();
            renderer.render(scene, camera);
            frame += 1;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}());
```
