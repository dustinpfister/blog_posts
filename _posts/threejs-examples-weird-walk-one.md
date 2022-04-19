---
title: Weird walk threejs example
date: 2022-04-18 12:06:00
tags: [three.js]
layout: post
categories: three.js
id: 979
updated: 2022-04-19 12:21:19
version: 1.16
---

Todays post on threejs will be just a new [project example post](/2021/02/19/threejs-examples/) on a simple example of an idea for a weird walk animation. This is just one of several ideas that have come to me that might project to me a quick fun project for a weird little walking guy model that is composed of a few [mesh objects](/2018/05/04/threejs-mesh/) that come together to from a [group of objects](/2018/05/16/threejs-grouping-mesh-objects/) that looks like a little guy model of sorts. The walk cycle that I had in mind is just having two mesh objects for legs, and using the [scale property](/2021/05/11/threejs-object3d-scale/) of the object3d class to set the scale of just the hight of the mesh objects from its full scale to zero and back again.

<!-- more -->

## Weird walk guy threejs example and what to know first

This is a post in which I am writing about a simple threejs project example of a weird walk guy module. This is a javaScript module that will cerate and return an instance of THREE.Group that I can then add to an over all threejs [scene object](/2018/05/03/threejs-scene/). I also add a few methods that helper with the process of updating the state of this group of objects. This is not the first example of this kind of module that I have made using threejs, and I also do not think it will be the last for at least a little while longer at least. I have come to like making models like this, but it there is the more professional way of doing this kind of thing with it comes to making something in blender and then exporting from there.

### Version numbers matter

Ween I first made this example I was using r135 of threejs, if the code examples here are breaking for you on your end that would be the first thing I would check.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post as well as with many others can be found in my [test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-walk-one).

## 1 - The weird guy module and basic demo

In this first section of the post I will be going over the javaScript module that I am using to create and return a THREE.Group instance that I can then use in a scene object of one or more demos that make use of the module. Speaking of that I will also be going over the source code of one such demo to start out with while I am at it.

### 1.1 - The weird guy module

The weird guy module that I made will return a few public methods, the main method of interest when it comes to using this would be the create method. In a threejs project where I make use of this I will call this method as a way to make an instance of this weird guy model. I will then want at least one of not more methods that help with changing the state of this weird guy model one of which can be used to set the walk cycle state of the guy.

```js
// ********** **********
// WEIRD GUY MODULE
// ********** **********
var weirdGuy = (function(){
    var materials = [
        new THREE.MeshStandardMaterial( { emissive: 0x9a8800, emissiveIntensity: 0.5, wireframe:false } ),
        new THREE.MeshStandardMaterial( { emissive: 0x00aaff, emissiveIntensity: 0.5 } ),
        new THREE.MeshStandardMaterial( { emissive: 0xffffff, emissiveIntensity: 0.5 } ),
        new THREE.MeshStandardMaterial( { emissive: 0x1a1a1a, emissiveIntensity: 0.5 } )
    ];
    var api = {};
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        var guy = new THREE.Group();
        guy.name = opt.guyID || 'guy';
        // BODY
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1.5, 1),
            materials[0]
        );
        body.name = guy.name + '_body';
        guy.add(body);
        // EYES
        ['eye1', 'eye2'].forEach(function(nameStr, i){
            var eye = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 30, 30),
                materials[2]
            );
            eye.name = guy.name + '_' + nameStr;
            eye.position.set(-0.2 + 0.4 * i, 0.2, 0.5);
            var innerEye = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 30, 30),
                materials[3]
            );
            innerEye.position.set(0, 0, 0.125);
            eye.add(innerEye);
            body.add(eye);
        });
        // ADD MOUTH
        var mouth = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.125, 0.25),
            materials[3]
        );
        mouth.name = guy.name + '_mouth';
        mouth.position.set(0, -0.3, 0.5);
        body.add(mouth);
        // ADD ARMS
        ['arm1', 'arm2'].forEach(function(nameStr, i){
            var arm = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 0.25),
                materials[0]
            );
            arm.geometry.translate( 0, 0.75, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.0, 0);
            body.add(arm);
        });
        // ADD PELVIS
        var pelvis = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 1),
            materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.0, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            var leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 1),
                materials[1]
            );
            leg.name = guy.name + '_' + nameStr;
            leg.position.set(-0.25 + 0.5 * i, -1, 0);
            pelvis.add(leg);
        });
        return guy;
    };
    // setWalk
    api.setWalk = function(guy, walkPer){
        var leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2')
        // set scale of legs
        leg1.scale.y = walkPer;
        leg2.scale.y = 1 - walkPer;
        // adjust position of legs
        leg1.position.y = -1.0 + 0.75 * (1 - walkPer);
        leg2.position.y = -1.0 + 0.75 * walkPer;   
    };
    // return the api
    return api;
}());
```

### 1.1 - basic demo of the weird guy module

Now for a simple demo of this weird guy module to start out with at least. For this I create my usual scene object, camera and renderer like with any other threejs project. On top of that I am also using a light source code this demo as I want to add light on top of the emissive values of the materials I am using to help show depth better. I then just call that create method to create and return a new group object that I can then add as a child of the scene object. After that is all set and down I have then call the set walk method in the body of my update loop that I am using to update and render the scene here.

```js
(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    //scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 1.75, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(0.1, 1.0, 0);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // WEIRD GUY INSTANCE
    // ********** **********
    var guy = weirdGuy.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy.setWalk(guy, 0);
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 60,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            var per = frame / maxFrame * 5 % 1,
            bias = Math.abs(0.5 - per) / 0.5;
            weirdGuy.setWalk(guy, bias);
            var arm1 = guy.getObjectByName(guy.name + '_arm1'),
            arm2 = guy.getObjectByName(guy.name + '_arm2');
            arm1.rotation.x = Math.PI / 180 * (180 - 20 + 40 * bias);
            arm2.rotation.x = Math.PI / 180 * (180 + 20 - 40 * bias);
            var per = frame / maxFrame * 1 % 1,
            bias = Math.abs(0.5 - per) / 0.5;
            guy.rotation.y = -0.5 + 2.5 * bias;
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

The end result here is then just a very simple walk cycle of my weird little guy model, and thus far this is more or less what I had in mind. When it comes to working on this at least a little more there is only s much more to do then such as what more needs to happen with the arms and face to make it look more interesting.

## 2 - Conclusion

This is not the first kind of example that I have made that is like this, maybe the oldest example of this sort of thing would be my [guy one model](/2021/04/29/threejs-examples-guy-one/) that I first made a few years ago now. i have made a lot of other projects that are also like this one, but have not really got into using these to make some kind of final product. That might change moving forward, especially if I do start working on threejs related stuff alone when it comes to what kind of direction I take with this website.

When it comes to this specific example though I think the nest step is maybe working otu at least a few more demos that make use of the module, and also maybe expand the model a little more. When it comes to the walk cycle I think I have things set and down, but I might want at least one more walk cycle method that I can use to transition from a walk state to a standing state, and maybe a few more methods that have to do with the movement of arms, and also the expression of the face. Aside from that I think I just about have a final done deal with much about what this idea was at least for what that is worth.
