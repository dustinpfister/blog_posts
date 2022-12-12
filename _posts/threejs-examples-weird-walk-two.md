---
title: Weird Walk Two threejs example
date: 2022-04-25 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 981
updated: 2022-12-12 10:37:39
version: 1.20
---

Last week I started a [weird walk guy threejs example](/2022/04/18/threejs-examples-weird-walk-one/), and as such this week I think I will make another [threejs example](/2021/02/19/threejs-examples/) where I just a continue with that example, but take it into a new direction. Of course The main changes that I have to do with how the walk happens. With the first weird walk I was thinking that it would be cool to just have to mesh objects for legs, and have just one axis of each leg scale up and down as a kind of crude yet amusing walk cycle. For this example I am thinking that it would be cool to have a walk cycle where the legs are two or more mesh objects that rotate at certain pivot locations. However as with the first weird walk cycle example I do so in a very weird way in which the thighs of the weird walk guy move forward from the rest of the body very far so the look is in no way natural. So in other words when it comes to this weird walk guy example, just like with the first example, I am going in a kind of weird for the sake of weird kind of direction.

This time I made some changes that have to do with how I go about adding textures to a module that I make this way my making another file that helps me with the process of making [data textures](/2022/04/15/threejs-data-texture/). This is however the kind of change that I might do with the weird walk one module as well though which it comes to maybe doing more to revise the source code with that example. So for the most part what stands alone here is what is added in terms of additional mesh objects and code that is used to update those mesh objects.

<!-- more -->

## This weird walk two example and what to know first

This is a post on a project example that make use of threejs, and consists of several javaScript files to create a crude yet effective informal model. This is not in any way a post on the [topic of getting started with threejs](/2018/04/04/threejs-getting-started/) as well as any additional skills that are required before hand in order to get something of value from reading this. In fact I assume that you have at fair amount of experience with threejs and javaScript in general.

This is not the first example that I have made that is like this, in fact I have made a few informal models as I have come to call them. The first one that I have made would be my [guy one module](/2021/04/29/threejs-examples-guy-one/) that I made many years ago now.

### Version numbers matter

When I first started writing this post I was using r135 of threejs with the source code examples. I was able to get this example up and ruining fine with that revision of threejs, but I am sure that it will end up breaking at some point in the future. I do take the tie to come around and do a little editing of each if these threejs posts, but it might be a while until I come around again.
### The source code of this example is on Github

I have the source code of this example parked on [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-walk-two).

## 1 - The crude idea up and running

In this section I will be going over the source code of the basic idea of this example, in the Github repository this is in the basic section folder the corresponds to what I am writing about here. The goal with this was to just start with what I all ready worked out with the first weird walk example, but now I just want to have a slightly different walk cycle, and also while I am at it make a javaScript file that has more to do with creating textures with the data texture constructor rather than that if the canvas texture constructor.

### 1.1 - The data textures module

Here I have the source code for the data textures module that I will be using to create textures for the weird walk guy, as well as additional mesh objects that I create in the main javaScript example for this. This module consists of a few public methods one of which will return a texture created from the given color channel data array in the form of a [unit8array](/2020/04/02/js-uint8array/), and the others are various way of going about creating that kind of an array. I have a for each pixel method that where I can given a function in which I can define logic that is to be used to create the red, green, blue, and alpha values for each color channel of each pixel. I then have additional options for creating textures with this, but the general idea is the same, one way or another crate a texture by way of the THREE.DataTexture constructor.

```js
// ********** **********
// data textures
// module for creating data textures
// ********** **********
var datatex = (function () {
    var api = {};
    // mk data texture helper
    api.mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        var width = w, //20,
        height = data.length / 4 / w;
        var texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = function (w, h, forEach) {
        var width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        var size = width * height;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var x = i % width;
            var y = Math.floor(i / width);
            var obj = forEach(x, y, w, h, i, stride, data);
            obj = obj || {};
            data[stride] = obj.r || 0;
            data[stride + 1] = obj.g || 0;
            data[stride + 2] = obj.b || 0;
            data[stride + 3] = obj.a === undefined ? 255: obj.a;
        }
        return api.mkDataTexture(data, width)
    };
    // from px data method
    api.fromPXDATA = function(pxData, width, palette){
        palette = palette || [
            [0,0,0,255],
            [255,255,255,255]
        ];
        var height = Math.floor(pxData.length / width);
        return api.forEachPix(width, height, function(x, y, w, h, i){
            var obj = {};
            var colorIndex = pxData[i];
            var color = palette[colorIndex];
            obj.r = color[0];
            obj.g = color[1];
            obj.b = color[2];
            obj.a = color[3];
            return obj;
        });
    };
    // simple gray scale seeded random texture
    api.seededRandom = function (w, h) {
        var width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        var size = width * height;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
            data[stride] = v;
            data[stride + 1] = v;
            data[stride + 2] = v;
            data[stride + 3] = 255;
        }
        return api.mkDataTexture(data, width);
    };
    // return the api
    return api;
}
    ());
```

### 1.2 - The weird guy module

Now that I have the texture module is out of the way I can not write about the weird guy two module that makes use of this data texture module to create the textures for the various materials that are used to skin the various parts of the guy. At the top of the module I am using the seeded random method as a way to create just a texture with random variations of black and write for each pixel. This is what I use to just add some kind of texture other than that of just a solid color which strokes me as just a kind of place holder type thing for some kind of better option for a texture, but for some things this might still work well.

```js
// ********** **********
// WEIRD GUY TWO MODULE
// 
// ********** **********
var weirdGuy2 = (function(){
 
    // simple random texture
    var textureRND = datatex.seededRandom(10, 10);
 
   var pxData = [
        1,1,1,1,
        1,0,0,1,
        1,0,0,1,
        1,1,1,1
    ];
    var width = 4;
    var palette = [
        [0,0,0,255],
        [255,255,255,255]
    ];
    var texturePants = datatex.fromPXDATA(pxData, width, palette);
 
    // MATERIALS
    var materials = [
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0x9a8800, emissiveIntensity: 0.9, wireframe:false } ),
        new THREE.MeshStandardMaterial( { map: texturePants, emissive: 0x00aaff, emissiveIntensity: 0.4 } ),
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0xffffff, emissiveIntensity: 0.8 } ),
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0x1a1a1a, emissiveIntensity: 0.1 } )
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
            new THREE.BoxGeometry(1, 1.0, 1),
            materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.25, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            // leg group pivot group
            var leg = new THREE.Group();
            leg.name = guy.name + '_' + nameStr;
            // thigh
            var thigh = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 3.0, 0.5),
                materials[1]
            );
            thigh.position.set(-0.37 + 0.75 * i, 0, 2.0);
            thigh.rotation.set(Math.PI * 0.5, 0, 0);
            // caff
            var caff = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 0.5),
                materials[1]
            );
            caff.rotation.x = Math.PI * 1.5;
            caff.position.y = 1.25;
            caff.position.z = 1;
            thigh.add(caff);
            leg.add(thigh);
            pelvis.add(leg);
        });
        return guy;
    };
    // setWalk
    api.setWalk = function(guy, walkPer){
        var leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2');
        leg1.rotation.x = Math.PI * (-0.05 + 0.1 * walkPer);
        leg2.rotation.x = Math.PI * (0.05 - 0.1 * walkPer);
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

### 1.3 - The main javaScript file for this

I have my data textures file, and I now also have my weird guy module that I can use to create an instance of this guy module that will have a weird and amusing walk cycle. So now I just need a little additional javaScript code that will create a simple animation loop in which I am using at least one instance of this guy module. On top of using the weird guy two module to create an instance of the weird walk guy I also am making use of the for each pixel method of the data texture module to create a custom texture for the ground mesh that I am also using in the scene.

```js
(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(7, 7, 7);
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
    var texture = datatex.forEachPix(20, 100, function(x, y, w, h, i){
        var obj = {};
        var v = y % 2 === 0 ? 255 - 200 * (x / w) : 55 + 200 * (x / w);
        obj.r = v;
        obj.b = v;
        return obj;
    });
    var ground = new THREE.Mesh( new THREE.BoxGeometry(20, 1, 100), new THREE.MeshStandardMaterial({
        map: texture
    }) );
    ground.position.y = -1.0;
    scene.add(ground);
    // ********** **********
    // WEIRD GUY INSTANCE
    // ********** **********
    var guy = weirdGuy2.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy2.setWalk(guy, 0);
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
            weirdGuy2.setWalk(guy, v.bias);
 
            // setting arms
            var v1 = getFrameValues(frame, maxFrame, 10);
            var v2 = getFrameValues(frame, maxFrame, 80);
            var a2 = 360 - (80 + 20 * v2.bias);
            weirdGuy2.setArm(guy, 1, 185 - 10 * v1.bias, a2 );
            weirdGuy2.setArm(guy, 2, 175 + 10 * v1.bias, a2 );
 
            // body rotation
            var v = getFrameValues(frame, maxFrame, 1);
            var body = guy.getObjectByName(guy.name + '_body');
            body.rotation.y = -0.5 + 1 * v.bias;
 
            //var v = getFrameValues(frame, maxFrame, 40);
            //weirdGuy2.setArm(guy, 1, 180 - 90 * v.bias, 300 );
            //weirdGuy2.setArm(guy, 2, 90 + 90 * v.bias, 300 );
 
            // update camera
            var v = getFrameValues(frame, maxFrame, 1);
            camera.position.copy(guy.position).add(new THREE.Vector3(5, 3, 5));
            var a = new THREE.Vector3(0, 0, 0);
            guy.getWorldPosition(a);
            camera.lookAt(a.add(new THREE.Vector3( 0, -1.0, 2.0)));
 
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

This weird guy module might be something to which I might make one or two more additional examples in which I am continuing to branch off and add even more to the over all state of what the example is. There is in time making another example like that of the [backyard scene example](/2021/05/07/threejs-examples-backyard/) that I made a while back in which I am creating an example that is actually a combination of many examples being used together to create an over all scene. This might be another future example post but for now I am thinking mainly in terms of making videos for each of these example posts including this one of course.

