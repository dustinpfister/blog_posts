---
title: Biplane threejs example
date: 2021-02-17 15:04:00
tags: [three.js]
layout: post
categories: three.js
id: 805
updated: 2021-02-17 15:28:53
version: 1.3
---

When it comes to [threejs](https://threejs.org/) maybe there is still a great deal more for me to learn about the framework itself. However for now I would like to make at least a few examples of what can be done with three.js when it comes to making some kind of actual project.

There is the prim and proper way of going about creating a 3d model of something, and that is all fine and good. However it also strikes me as something that would end up eating up a lot of time. So there is also the not so prim and proper way to go about creating a 3d model of something. It is the later that I will be going over today by making a simple crude yet effective 3d model of a Biplane.

<!-- more -->


## 1 - The biplane module

The idea here is to create a javaScript module that will create and return an instance of a [THREE.Group](/2018/05/16/threejs-grouping-mesh-objects/) which is just a way to pack a whole bunch of Mesh objects into a single group.

So then in this module I just have a bunch of helper methods that create and return mesh objects that are positioned and sized in a way in which when grouped together ends up looking like a biplane. It might be crude, but if I am okay with this kind of look and feel it will get the job done.

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

## 3 - Conclusion

I like to make modles this way, I can just slap something togeather and it just works. I am sure that in a real project I might run into problems sooner or later. However yet angin maybe not if the final project is some kind of video rather than a game. What really matters is how things look, and this kind of very low poly look is kind of nice I think.
