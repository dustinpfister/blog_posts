---
title: threejs example
date: 2022-04-29 10:01:00
tags: [three.js]
layout: post
categories: three.js
id: 982
updated: 2022-04-30 13:39:27
version: 1.6
---

A long time ago now I made a cube stack module that I used in my [post on the orographic camera](/2018/05/17/threejs-camera-orthographic/). As of late I was doing some editing and while doing so fixed up the source code a little for that post, but now I am thinking that this cube stack model should be the main event for one of my [threejs example posts](/2021/02/19/threejs-examples/). So I copied over the current state if the cube stack module into a new folder, and started making some chances to it just for the sake of having a little fun, and to lay down a ground work for even more features with this.

<!-- more -->



## 1 - First state of this cube Stack threejs example

In this section I will be going over the cube stack example as it was when I first wrote this blog post. Over time I will likely come around to doing a little editing of this post, and when doing so I also often make some changes to the state of the source code of the example as well.

When I first started this project I just wanted to make a few changes to what I all ready had when it comes to the example for my blog post on the orthographic camera. I wanted to make any needed changes when it comes to things like arguments for the create method of the module, but I also wanted to start an object that will contain effects that can be used to change the state of the cube stacks.

### 1.1 - The data textures module

For this example I wanted to have a module that I would use to add textures to the cubes with data textures.

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
    api.seededRandom = function (w, h, rPer, gPer, bPer, range) {
        w = w === undefined ? 5 : w,
        h = h === undefined ? 5 : h;
        rPer = rPer === undefined ? 1 : rPer;
        gPer = gPer === undefined ? 1 : gPer;
        bPer = bPer === undefined ? 1 : bPer;
        range = range || [0, 255]
        var size = w * h;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var v = Math.floor(range[0] + THREE.MathUtils.seededRandom() * (range[1] - range[0]));
            data[stride] = v * rPer;
            data[stride + 1] = v * gPer;
            data[stride + 2] = v * bPer;
            data[stride + 3] = 255;
        }
        return api.mkDataTexture(data, w);
    };
    // return the api
    return api;
}
    ());
```

### 1.2 - The cube stack module

Now for the source code for the cube stack module which at this time has two public methods of interest, one of which is the crate method, and the other is the apply effect method.

```js
// Cube Stack example for s3-compare-to-perspective example in threejs-camera-orthographic
var CubeStack = (function () {
    // the public api
    var api = {};
    // create the plane
    var createPlane = function (opt) {
        opt = opt || {};
        var planeColor = opt.colors[opt.planeColor === undefined ? 1: opt.planeColor];
        var plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(opt.gx, opt.gy, opt.gx, opt.gy),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    //map: datatex.seededRandom(opt.gx * 4, opt.gy * 4, 0, 1, 0, [64, 255]),
                    map: datatex.seededRandom.apply(null, [opt.gx * 4, opt.gy * 4].concat( planeColor ) ),
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
    // append mesh objects
    var appendBoxMeshObjects = function (group, opt) {
        opt = opt || {};
        opt.boxCount = opt.boxCount === undefined ? 30 : opt.boxCount;
        var boxIndex = 0,
        boxArray = [],
        x,
        y,
        z,
        box;
        // place some boxes on the plane
        while (boxIndex < opt.boxCount) {
           var cubeColor = opt.colors[Math.floor(opt.colors.length * Math.random())];
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        //map: datatex.seededRandom(8, 8, 1, 1, 1, [180, 255]),
                        map: datatex.seededRandom.apply(null, [8,8].concat( cubeColor ) ),
                        emissive: 0x1a1a1a
                    }));
            x = Math.floor(opt.gx * Math.random());
            y = 0;
            z = Math.floor(opt.gy * Math.random());
            if (boxArray[z] === undefined) {
                boxArray[z] = [];
            }
            if (boxArray[z][x] === undefined) {
                boxArray[z][x] = [];
            }
            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;
            box.position.set(
                (opt.gx / 2 * -1 + 0.5) + x,
                y,
                (opt.gy / 2 * -1 + 0.5) + z)
            group.add(box);
            boxIndex += 1;
        }
    };
    // public create method
    api.create = function (opt) {
        var stack = new THREE.Group();
        opt = opt || {};
        opt.gx = opt.gx === undefined ? 5 : opt.gx;
        opt.gy = opt.gy === undefined ? 5 : opt.gy;
        opt.colors = stack.userData.colors = opt.colors || [
            [1, 1, 1, [0, 255]],
            [0, 1, 0, [200, 255]]
        ];
        var cubes = stack.cubes = new THREE.Group();
        // scale cubes effect
        stack.add(cubes)
        appendBoxMeshObjects(cubes, opt);
        var plane = stack.plane = createPlane(opt);
        stack.add(plane);
        return stack;
    };
    var EFFECTS = {};
    // effect to scale all cubes up and down by scaling the y value of the cubes group
    EFFECTS.scaleCubes = function(stack, opt){
        opt = opt || {};
        opt.yMax = opt.yMax === undefined ? 1 : opt.yMax;
        opt.yPer = opt.yPer === undefined ? 1 : opt.yPer;
        var cubes = stack.cubes;
        var y = opt.yMax * opt.yPer;
        cubes.scale.set(1, y ,1);
        cubes.position.set(0, (opt.yMax - y) * -1 / 2,0);
        //cubes.scale.set(1, 0.25 ,1);
        //cubes.position.set(0, -0.75 / 2,0);
    };
    // apply effect method
    api.applyEffect = function(stack, effectKey, opt){
        EFFECTS[effectKey](stack, opt);
    };
    // return public api
    return api;
}
    ());
```

### 1.3 - Main javaScript file

Now that I have my cube stack module in decent shape I will want to have a little more javaScript code that make use of the module to create one of these cube stack objects in a scene object of an over all threejs project.

```js
(function () {
    // ********** **********
    // SCENE, CAMERA, LIGHT, and RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // STACK
    var stack = CubeStack.create({
            gx: 7,
            gy: 4,
            boxCount: 35,
            colors: [
                [1,1,0, [0, 255]],
                [0,1,0, [128, 255]],
                [0,1,0.5, [128, 255]],
                [1,0,0, [128, 255]],
                [0,1,1, [128, 255]]
            ],
            planeColor: 2
        });
    stack.position.set(0, 0.6, 0);
    scene.add(stack);
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 90,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // apply effect
            CubeStack.applyEffect(stack, 'scaleCubes', {
                yPer: bias
            });
            stack.rotation.y = Math.PI * 2 * per;
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