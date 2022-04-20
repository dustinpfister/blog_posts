---
title: Weird walk threejs example
date: 2022-04-18 12:06:00
tags: [three.js]
layout: post
categories: three.js
id: 979
updated: 2022-04-20 12:13:05
version: 1.20
---

Todays post on threejs will be just a new [project example post](/2021/02/19/threejs-examples/) on a simple example of an idea for a weird walk animation. This is just one of several ideas that have come to me that might project to me a quick fun project for a weird little walking guy model that is composed of a few [mesh objects](/2018/05/04/threejs-mesh/) that come together to from a [group of objects](/2018/05/16/threejs-grouping-mesh-objects/) that looks like a little guy model of sorts. The walk cycle that I had in mind is just having two mesh objects for legs, and using the [scale property](/2021/05/11/threejs-object3d-scale/) of the object3d class to set the scale of just the hight of the mesh objects from its full scale to zero and back again.

<!-- more -->

## Weird walk guy threejs example and what to know first

This is a post in which I am writing about a simple threejs project example of a weird walk guy module. This is a javaScript module that will cerate and return an instance of THREE.Group that I can then add to an over all threejs [scene object](/2018/05/03/threejs-scene/). I also add a few methods that helper with the process of updating the state of this group of objects. This is not the first example of this kind of module that I have made using threejs, and I also do not think it will be the last for at least a little while longer at least. I have come to like making models like this, but it there is the more professional way of doing this kind of thing with it comes to making something in blender and then exporting from there.

### Version numbers matter

When I first made this example I was using r135 of threejs, if the code examples here are breaking for you on your end that would be the first thing I would check. The threejs library is still a project that moves very fast in terms of its development and maintenance so code breaking changes happen often.

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

The end result here is then just a very simple walk cycle of my weird little guy model, and thus far this is more or less what I had in mind. When it comes to working on this at least a little more there is only s much more to do then such as what more needs to happen with the arms and face to make it look more interesting. There will then need to be at least a few more demos of this, and while I am at it maybe at least a few revisions of the weird guy model with that as well as I will want to least a few more features beyond just the simple walk cycle.

## 2 - Moving the arms, ground mesh, and data textures

I was off to a good start with the first form of this weird guy module, as well as the additional code that I was using to make a short dmeo of what I made. However I think that I should put at least a little more time into this one before moving on to the next thing. There is just a little more that I would like to see done with this example, and that is to also have moment for the arms, and also a better demo where the weird guy is walking along on a repeating background.

### 2.1 - the weird guy module

```js
// ********** **********
// WEIRD GUY MODULE
// r1 - adding a setArms method, and data textures
// ********** **********
var weirdGuy = (function(){
    // DATA TEXTURE FOR MATERIALS
    var width = 20, height = 100;
    var size = width * height;
    var data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        var stride = i * 4;
        //var x = i % width;
        //var y = Math.floor(i / width);
        var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        //var v = y % 2 === 0 ? 255 - 200 * (x / width) : 55 + 200 * (x / width);
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    var texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    // MATERIALS
    var materials = [
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0x9a8800, emissiveIntensity: 0.9, wireframe:false } ),
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0x00aaff, emissiveIntensity: 0.4 } ),
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0xffffff, emissiveIntensity: 0.8 } ),
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0x1a1a1a, emissiveIntensity: 0.1 } )
    ];
    var api = {};
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        var guy = new THREE.Group();
        guy.name = opt.guyID || 'guy';
        // BODY
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2.0, 1),
            materials[0]
        );
        body.position.y = 0.25;
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
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                materials[0]
            );
            arm.geometry.translate( 0, 0.5, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.5, 0);
            var tri = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                materials[0]
            );
            tri.geometry.translate( 0, 0.5, 0 );
            tri.name = guy.name + '_' + nameStr + '_tri';
            tri.position.set(0, 1, 0);
            tri.rotation.set(-1, 0, 0);
            arm.add(tri); 
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
    // set arms method
    api.setArm = function(guy, armNum, a1, a2){
        armNum = armNum === undefined ? 1 : armNum;
        armNum = armNum <= 0 ? 1: armNum;
        a1 = a1 === undefined ? 0 : a1;
        a2 = a2 === undefined ? 0 : a2;
        var arm = guy.getObjectByName(guy.name + '_arm' + armNum);
        arm.rotation.x = Math.PI / 180 * a1;
        // set tri rotation
        arm.children[0].rotation.x = Math.PI / 180 * a2;
    };
    // return the api
    return api;
}());
```

### 2.2 - The demo

```js
(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 1.5, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ********** **********
    // HELPER METHODS
    // ********** **********
    // give frame, maxframe, and count to get values like per, bias, ect
    var getFrameValues = function(frame, maxFrame, count){
        count = count === undefined ? 1 : count;
        var values = {
            frame: frame, 
            maxFrame: maxFrame
        };
        values.per = frame / maxFrame * count % 1;
        values.bias = 1 - Math.abs(0.5 - values.per) / 0.5;
        return values;
    };
    // ********** **********
    // GROUND MESH
    // ********** **********
    var width = 20, height = 100;
    var size = width * height;
    var data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        var stride = i * 4;
        var x = i % width;
        var y = Math.floor(i / width);
        //var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        var v = y % 2 === 0 ? 255 - 200 * (x / width) : 55 + 200 * (x / width);
        data[ stride ] = 0;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = 0;
        data[ stride + 3 ] = 255;
    }
    var texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    var ground = new THREE.Mesh( new THREE.BoxGeometry(20, 1, 100), new THREE.MeshStandardMaterial({
        map: texture
    }) );
    ground.position.y = -0.5;
    scene.add(ground);
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
    maxFrame = 300,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // update guy position over mesh
            var v = getFrameValues(frame, maxFrame, 1);
            guy.position.z = -10 + 20 * v.per;
            // set walk
            var v = getFrameValues(frame, maxFrame, 40);
            weirdGuy.setWalk(guy, v.bias);
            // setting arms
            var v1 = getFrameValues(frame, maxFrame, 10);
            var v2 = getFrameValues(frame, maxFrame, 80);
            var a2 = 360 - (80 + 20 * v2.bias);
            weirdGuy.setArm(guy, 1, 185 - 10 * v1.bias, a2 );
            weirdGuy.setArm(guy, 2, 175 + 10 * v1.bias, a2 );
            // body rotation
            var v = getFrameValues(frame, maxFrame, 1);
            var body = guy.getObjectByName(guy.name + '_body');
            body.rotation.y = -0.5 + 1 * v.bias;
            //var v = getFrameValues(frame, maxFrame, 40);
            //weirdGuy.setArm(guy, 1, 180 - 90 * v.bias, 300 );
            //weirdGuy.setArm(guy, 2, 90 + 90 * v.bias, 300 );
            // update camera
            var v = getFrameValues(frame, maxFrame, 1);
            camera.position.copy(guy.position).add(new THREE.Vector3(4, 2, 4));
            var a = new THREE.Vector3(0, 0, 0);
            guy.getWorldPosition(a);
            camera.lookAt(a.add(new THREE.Vector3( 1 - 2 * v.bias, -1, 0)));
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


## Conclusion

This is not the first kind of example that I have made that is like this, maybe the oldest example of this sort of thing would be my [guy one model](/2021/04/29/threejs-examples-guy-one/) that I first made a few years ago now. i have made a lot of other projects that are also like this one, but have not really got into using these to make some kind of final product. That might change moving forward, especially if I do start working on threejs related stuff alone when it comes to what kind of direction I take with this website. I have found myself stuck in a pattern of coming up with ideas just for the sake of having something to write about and that is something that I would like to stop in favor of doing the inversion of that. Making projects that are cool by themselves and then maybe writing about them a little.

When it comes to this specific example though I think the nest step is maybe working out at least a few more demos that make use of the module, and also maybe expand the model a little more. When it comes to the walk cycle I think I have things set and down, but I might want at least one more walk cycle method that I can use to transition from a walk state to a standing state, and maybe a few more methods that have to do with the movement of arms, and also the expression of the face. Aside from that I think I just about have a final done deal with much about what this idea was at least for what that is worth.
