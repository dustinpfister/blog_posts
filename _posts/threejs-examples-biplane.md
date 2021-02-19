---
title: Biplane threejs example
date: 2021-02-17 15:04:00
tags: [three.js]
layout: post
categories: three.js
id: 805
updated: 2021-02-19 15:01:13
version: 1.8
---

When it comes to [threejs](https://threejs.org/) maybe there is still a great deal more for me to learn about the framework itself. However for now I would like to make at least a [few examples](/2021/02/19/threejs-examples/) of what can be done with three.js when it comes to making some kind of actual project.

There is the prim and proper way of going about creating a 3d model of something, and that is all fine and good. However it also strikes me as something that would end up eating up a lot of time. So there is also the not so prim and proper way to go about creating a 3d model of something. It is the later that I will be going over today by making a simple crude yet effective 3d model of a Biplane.

<!-- more -->


## 1 - The biplane module

The idea here is to create a javaScript module that will create and return an instance of a [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/) which is just a way to pack a whole bunch of Mesh objects into a single group.

So then in this module I just have a bunch of helper methods that create and return mesh objects that are positioned and sized in a way in which when grouped together ends up looking like a biplane. It might be crude, but if I am okay with this kind of look and feel it will get the job done.

An instance of THREE.Group like a Mesh object also inherits from the [Object3d class](/2018/04/23/threejs-object3d/), and as such also has a userData object which is the standard object that is to be used to place app specific data. Such as the current radian value for a prop on a biplane.

```js
var Biplane = (function () {
 
    var materials = {
        plane: new THREE.MeshLambertMaterial({
            color: 0x00ff00
        }),
        guy: new THREE.MeshLambertMaterial({
            color: 0xffffff
        }),
        prop: new THREE.MeshLambertMaterial({
            color: 0x808080
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
 
    api.update = function(bi, secs){
        var ud = bi.userData;
        ud.propRadian += (Math.PI * 2 * ud.propRPS) * secs;
        ud.propRadian %= (Math.PI * 2);
        ud.prop.rotation.set(ud.propRadian,0,0)
    };
 
    return api;
}
    ());
 
```

## 2 - Very basic example making use of the biplane model so far

So then now it is just a question of having a very simple main javaScript file where I am making use of this model. In this file I will be doing all the usual when it comes to making a threejs project such as creating a scene, camera, and renderer. However when it comes to having a mesh I am going to be using this biplane module to create groups of mesh objects.

I can change the propRPS value of one of these biplane models userData objects to change the rate at which the prop rotates. Just about any additional properties that I might add if I do continue working on this can be changed that way.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 10);
 
    // light
    var pointLight = new THREE.PointLight('white');
    pointLight.position.set(28, 20, 40);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    scene.add(pointLight);
 
    var bi1 = Biplane.create();
    scene.add(bi1);
 
    var materials = {
        plane: new THREE.MeshLambertMaterial({
            color: 0xff0000
        })
    },
    bi2 = Biplane.create({
        materials: materials
    });
    bi2.userData.propRPS = 2;
    bi2.position.set(0,0,15);
    scene.add(bi2);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var lt = new Date();
    function animate() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(animate);
        Biplane.update(bi1, secs);
        Biplane.update(bi2, secs);
        renderer.render(scene, camera);
        lt = now;
    };
 
    animate();
 
}
    ());
```

The result of all of this then is having two biplane models one is the default lime color, and the other I made red. The props spin at two different speeds, and that is just about it for now. the next step would be to create another project where I am making use of this model, and maybe a few more just like it to create some kind of scene.

## 3 - Conclusion

I like to make models this way, I can just slap something together and it just works. I am sure that in a real project I might run into problems sooner or later. However yet again maybe not if the final project is some kind of video rather than a game. What really matters is how things look, and this kind of very low poly look is kind of nice I think.

There are many additional little details that I might want to add at some point if I do get around to putting more time into this. I could maybe add some ways to move the guys head in the plane, and also skin the mesh with a face of some kind also while I am at it. There is also maybe adding some additional code that has to do with moving the mesh objects within the group. For example if I use this in a project where the plane can end up being destroyed I can have some kind of effect where the parts fly all over the place. However maybe getting into all of that would be a matter for another post.
