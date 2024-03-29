---
title: threejs cube stack example
date: 2022-04-29 10:01:00
tags: [three.js]
layout: post
categories: three.js
id: 982
updated: 2023-01-04 11:21:01
version: 1.22
---

A long time ago now I made a cube stack module that I used in my [post on the orographic camera](/2018/05/17/threejs-camera-orthographic/). As of late I was doing some editing and while doing so fixed up the source code a little for that post, but now I am thinking that this cube stack model should be the main event for one of my [threejs example posts](/2021/02/19/threejs-examples/). So I copied over the current state if the cube stack module into a new folder, and started making some changes to it just for the sake of having a little fun, and to lay down a ground work for even more features with this.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/uxYi8UyITU8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The cube stack module threejs example, and what to know first

This is a post on a JavaScript module that created and returns an object that is a group with additional groups and mesh objects attached working on top of the JavaScript library known as threejs. I assume that you have at least a fair amount of experience working with threejs, as well as core javaScript and additional client side web development related stuff, if not you might find this post hard to follow. I have [getting started type posts on threejs](/2018/04/04/threejs-getting-started/), as well as [javaScript in general](/2018/11/27/js-getting-started/) that you might want to check out if you are still new to this sort of thing, as I will not be covering basics here.

### The source code in this post and many others is no Github

The soucre code examples in this post and many others is [up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-cube-stack).

### version Numbers matter

I was using r135 when I first started writing this post and the source code examples. I do come around to edit my threejs content now and then, and the last time I did so I was using r146. Things where working fine on my end with these revisions of threejs, but the code may very well break with new revisions if i do not come around to making needed changes in the future.

## 1 - First state of this cube Stack threejs example \( r0 \)

In this section I will be going over the cube stack example as it was when I first wrote this blog post. Over time I will likely come around to doing a little editing of this post, and when doing so I also often make some changes to the state of the source code of the example as well.

When I first started this project I just wanted to make a few changes to what I all ready had when it comes to the example for my blog post on the orthographic camera. I wanted to make any needed changes when it comes to things like arguments for the create method of the module, but I also wanted to start an object that will contain effects that can be used to change the state of the cube stacks.

### 1.a - The data textures module \( r0 \)

For this example I wanted to have a module that I would use to add textures to the cubes with [data textures](/2022/04/15/threejs-data-texture/). This is a module that I have worked out for other projects actually and have been copied it form one project to another, making little changes as needed here and there. The basic idea with this is that I am just creating textures from javaScript code rather than that of making use of an exterior image assets that must be loaded first. Another way of doing this sort of thing would be to make use of [canvas textures](/2018/04/17/threejs-canvas-texture/) which is also a way to create textures with javaScript code, only with the 2d drawing context of canvas elements rather than raw color channel data.

```js
// ********** **********
// datatex.js - r0 - from threejs-examples-cube-stack
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

### 1.b - The cube stack module \( r0 \)

Now for the source code for the cube stack module which at this time has two public methods of interest, one of which is the crate method, and the other is the apply effect method. The create method as the name suggests is what I will be calling in the code that makes use of this module to create a single instance of this cube stack object. There is then making use of what is now just one, but in time might prove to be a full effects that are built into the module itself. In future revisions of this example I might also allow for a way to create external plug ins as a way to extend the effects object, but for now I just have one such effect in the effects object that scales the group that contains all the cubes rather that each cube.

I then have a number of private helper functions for creating the plane on which the cubes will be stacked, as well as for appending cubes to the cube group of the main group object.

```js
// cube-stack.js - r0 - from threejs-examples-cube-stack
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

### 1.1 - Main javaScript file

Now that I have my cube stack module in decent shape I will want to have a little more javaScript code that make use of the module to create one of these cube stack objects in a scene object of an over all threejs project.

For this demo I made just a single instance of the cube stack object with custom values for the grid size, box count, and I am also defining some custom values when it comes to setting the colors to use for the seeded random method of my data texture module.

In the update loop I am then applying the effect that I have thus far, and I am also rotating the whole main group object around on the y axis.

```js
(function () {
    // ********** **********
    // SCENE, CAMERA, RENDERER
    // ********** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    var camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ********** **********
    // LIGHT
    // ********** **********
    var dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
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

Thus far this module seems to be working great when it comes to just having a way to create a kind of object that is Just a collection of nested objects that I can then change and mutate in all kinds of different ways. I all ready have a lot of ideas when it comes to additional changes for future revisions of this cube stack module, but the core idea of what I want with this seems to all ready be working well.

## Conclusion

What is the next step with this cube stack example is the question now at this point. I have been making a number of videos for each of my blog posts that I have wrote thus far, this post is one such post that I have made for that can be viewed at the top of this content here. I am thinking that I might want to make at least one more threejs example that is a kind of grid where each tile location in the gird is a single instance of this cube stack object. There is then working out much more in terms of effects that can be applied for all instances of this kind of object as well as on an instance by instance bases. The main goal I have in mind here is to start a new series of videos where I am creating videos first and foremost and then maybe writing one or two blog posts about them rather than the other way around.