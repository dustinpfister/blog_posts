---
title: Biplane group threejs example
date: 2021-02-18 16:17:00
tags: [three.js]
layout: post
categories: three.js
id: 806
updated: 2021-02-18 16:55:27
version: 1.2
---

Today I think I will continue with my biplane modle in [threejs](https://threejs.org/) by making a model of models. That is to take the biplane module and make another modle that is just a group of these biplane modles. I do not thing I want to sink to much time into this, but it can still prove to be a little fun as a quick side project.


<!-- more -->

## 1 - Biplane Group model

First off is the biplane group that wil create a group of groups where each nested group is an instance of my bilane modle. I wrote a post on that yesterday, but I will be getting to the copy of the modle in the next section.

```js
var BiplaneGroup = (function () {
 
    var BIPLANE_COUNT = 3,
    MAX_FRAME = 75;
 
    var api = {};
 
    var bias = function(per){
        return Math.abs(0.5 - per) / 0.5;
    };
 
    // update
    api.update = function(group, secs){
        var i = 0,
        bi,
        radian,
        x,y,z,
        len = group.children.length;
        while(i < len){
            bi = group.children[i];
            radian = Math.PI * 2 / len * i;
            x = Math.cos(radian) * 10;
            y = -5 + 10 * bias(bi.userData.yFrame / MAX_FRAME);
            z = Math.sin(radian) * 10;
            bi.position.set(x,y,z);
            // make leader roll
            if(bi.userData.rotate){
                bi.rotation.set(bi.userData.r,0,0);
                bi.userData.r += Math.PI / 180 * bi.userData.rSpeed * secs;
                bi.userData.r %= (Math.PI * 2);
            }
            Biplane.update(bi, secs);
            bi.userData.yFrame += 1;
            bi.userData.yFrame %= MAX_FRAME;
            i += 1;
        }
    };
 
    // main create method
    api.create = function(opt){
        opt = opt || {};
        var group = new THREE.Group();
        var i = 0;
        while(i < BIPLANE_COUNT){
            var bi = Biplane.create();
            bi.userData.yFrame = Math.floor(MAX_FRAME * (i / BIPLANE_COUNT));
            bi.userData.rSpeed = 360;
            bi.userData.rotate = false;
            bi.userData.r = 0;
            group.add(bi);
            i += 1;
        }
        api.update(group, 0);
        return group;
    };
 
    return api;
}
    ());
```


## 2 - Biplane model

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

## 3 - The main javaScript file

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 1000);
    camera.position.set(40, 40, 180);
    //camera.lookAt(0, 0, 30);
 
    // light
    var pointLight = new THREE.PointLight('white');
    pointLight.position.set(28, 20, 40);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    scene.add(pointLight);
 
    var biGroups = [];
 
    var i = 0, group;
    while(i < 3){
        group = BiplaneGroup.create();
        group.position.z = 50 * i;
        biGroups.push(group);
        scene.add(group);
        i += 1;
    }
 
    group = biGroups[1];
    group.position.x = 30;
    var bi = group.children[0];
    bi.userData.rotate = true;
    bi.userData.rSpeed = 90;
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // Orbit Controls The DOM element must now be given as a second argument
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // loop
    var lt = new Date();
    function animate() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(animate);
        biGroups.forEach(function(biGroup){
            BiplaneGroup.update(biGroup, secs);
        });
        controls.update();
        renderer.render(scene, camera);
        lt = now;
    };
 
    animate();
 
}
    ());
```

## 4 - Conclusion

This was a fun quick little side projet where I continued with anothert quick simple side project with the biplane model. Still if I can not think of some kind of long term project with this, or something like this I do not think I will be putting to much time into something like this. I have a whole lot of other little side projects like this and some of them should get more attention. Maybe if I can think of some cool video type project to create with threejs that will help me get on track with continuing with this sort of thing.

