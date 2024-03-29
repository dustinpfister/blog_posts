---
title: threejs cube stack grid example
date: 2022-05-02 09:55:00
tags: [three.js]
layout: post
categories: three.js
id: 983
updated: 2023-01-04 11:22:37
version: 1.26
---

Last week I made a [cube stack threejs example](/2022/04/29/threejs-examples-cube-stack/ ) that was based off of an older example that I made for an [old post for the orthographic camera](/2018/05/17/threejs-camera-orthographic/). I made a whole lot of improvements to that dusty old example for that post, and now for today's [threejs example ](/2021/02/19/threejs-examples/) I thought it would be cool to start another project example that is a grid of these cube stack objects actually. So then this is another one of my threejs project examples where I am continuing to work off of one more more previous threejs examples to make an event larger over all project.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/5rQZM4X5fYA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## This cube stack module and what to know first

This is a post on some source code that I am using to create a grid where each grid is another nested grid where each tile location is a stack of one or more cubes. The nest result with this is then just a kind of cool looking visual effect that can be used in all kinds of different ways depending on additional code that I add that makes use of it. This is not in any way a kind of [getting started with threejs](/2018/04/04/threejs-getting-started/) and [javaScript](/2018/11/27/js-getting-started/) type post, I assume that you have a fair amounf of experience working with this library and language.

### I have other threejs project examples that Might prove to be better examples for this sort of thing

Shortly after I first wrote this post I starting another threejs project that is the same general idea of what I started here, only the goal was to have a grid that can be used with objects in general. I called this project [object grid wrap](/2022/05/20/threejs-examples-object-grid-wrap/) because I am bad at names and as such name things in a way in which I describe what they are. The project is a way to create a grid of objects, from a collection of source objects. Then the offset values can be changed and when doing so the location of the objects wrap around in two directions.

### The source code in this post is up on github

The source code for this post can be found in my [test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-cube-stack-grid).

### Version Numbers matter

When I first started this post I was using r135 of threejs, and the last time I came around to do some editing I was using r146.

## 1 - The first state of the cube stack grid module

This is an example that is a continuation of what I worked out in a previsions threejs example, and when it comes to the source code of that example I did not change much of anything. I will include that here in this section but it will just be more of the same when it comes to what I all ready wrote about in that post.

### 1.a - The cube stack grid module

So then here is the current state of the cube stack module that I can use to create a grid of cube stack objects. For now this module just has a single public methods that I use in my main javaScript file to create and instance of this cube stack grid object. The rest of what I have in the module is just hard coded defaults or options that I can or should set in the code that uses the module.

The general idea here is that I call the create method of this module and when doing so I pass some options for the create method. There are of course options for setting the width and height of the cube stack grid, but there are also options for setting what the width and height should be for each cube stack object also. There is then the question of how I go about setting what the options should be for each cube stack in the gird, for this I have something that is like a color palette, only it is for cube stack options rather than colors. I can then pass or generate and array of index values for this pallet of cube stack options then.

```js
// cube-stack-grid.js - r0 - from threejs-examples-cube-stack-grid
var CubeStackGrid = (function () {
    // default for each cell function
    var DEFAULT_FOR_EACH_TILE = function(sopIndex, i, csg, opt){};
    // defualt stack option palette
    var DEFAULT_STACK_OPTION_PALETTE = [
        { boxCount: 5 },
        { boxCount: 20 },
        { boxCount: 50 },
        { boxCount: 100 }
    ];
    var DEFAULT_SOP_INDICES = [];
    // parse stack option indices array
    var parseSOPIndices = function(csg, sopArray){
        sopArray = sopArray || [];
        var ud = csg.userData,
        len = ud.gw * ud.gh,
        i = 0,
        array = [];
        while(i < len){
            array[i] = sopArray[i] === undefined ? 0 : sopArray[i];
            i += 1;
        }
        return array;
    };
    // the public api
    var api = {};
    // create a new Cube Stack Grid (csg) object
    api.create = function (opt) {
        opt = opt || {};
        // cube stack grid object is an instance of THREE.Group
        var csg = new THREE.Group(),
        ud = csg.userData;
        ud.gw = opt.gw === undefined ? 4 : opt.gw;  // gw and gh value for the over all grid of cube stacks
        ud.gh = opt.gh === undefined ? 4 : opt.gh;
        ud.space = opt.space === undefined ? 1 : opt.space;
        ud.forEachTile = opt.forEachTile === undefined ? DEFAULT_FOR_EACH_TILE : opt.forEachTile;
        ud.stackOptionPalette = opt.stackOptionPalette === undefined ? DEFAULT_STACK_OPTION_PALETTE : opt.stackOptionPalette;
        ud.sopArray = opt.sopArray === undefined ? DEFAULT_SOP_INDICES : opt.sopArray;
        ud.stackGW = opt.stackGW === undefined ? 2 : opt.stackGW;
        ud.stackGH = opt.stackGH === undefined ? 2 : opt.stackGH;
        // create the CubeStacks
        var w = ud.gw;
        var sopArray = parseSOPIndices(csg, opt.sopArray);
        sopArray.forEach(function(sopIndex, i){
            var stackOpt = ud.stackOptionPalette[sopIndex];
            var stack = CubeStack.create({
                gw: ud.stackGW,
                gh: ud.stackGH,
                boxCount: stackOpt.boxCount || 0,
                getPos: stackOpt.getPos || 'seededRandom',
                posArray: stackOpt.posArray || [],
                colors: stackOpt.colors || [
                    [0,1,0, [128, 255]]
                ],
                planeColor: stackOpt.planeColor || 0
            });
            // position the stack group
            var x = i % w;
            var y = Math.floor(i / w);
            var sx = ( ( ud.stackGW + ud.space) * ud.gw - ud.stackGW - ud.space ) / 2 * -1;
            var sy = ( (ud.stackGH + ud.space) * ud.gh - ud.stackGH - ud.space) / 2 * -1;
            stack.position.set(
                sx + (ud.stackGW + ud.space) * x, 
                0.0, 
                sy + (ud.stackGH + ud.space) * y);
            csg.add(stack);
        });
        // return the csg object
        return csg;
    };
    // return public api
    return api;
}
    ());
```

### 1.b - The cube stack module \( Using r1 from threejs-examples-cube-stack \)

This is the source code for the other threejs example that I did before this to which I am using for each cell in the grid of cube stack objects here. I did not change much of anything with this when making this example I am just parking it here again just for the hell of it then.

There are still just two public methods one of which is a create method that will create a cube stack object, and the other is a way to apply one of several built in effects that mutate the state of one of these objects. When it comes to creating textures for the mesh objects that are added to each group of each tile I am making use of another javaScript file that I have made that will crate textures with javaScript code.

```js
// cube-stack.js - r1 - from threejs-examples-cube-stack
var CubeStack = (function () {
    // the public api
    var api = {};
    // create the plane
    var createPlane = function (opt) {
        opt = opt || {};
        var planeColor = opt.colors[opt.planeColor === undefined ? 1: opt.planeColor];
        var plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(opt.gw, opt.gh, opt.gw, opt.gh),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    //map: datatex.seededRandom(opt.gx * 4, opt.gy * 4, 0, 1, 0, [64, 255]),
                    map: datatex.seededRandom.apply(null, [opt.gw * 4, opt.gh * 4].concat( planeColor ) ),
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
    var getCubeStack = function(stack, x, y){
        var name = 'cubestack_' + x + '_' + y;
        return stack.userData.cubeGroups.getObjectByName(name);
    };
    // append cube groups for what should be a new stack group
    var appendCubeGroups = function(stack, opt){
        var i = 0,
        len = opt.gw * opt.gh;
        while(i < len){
            var x = i % opt.gw,
            y = Math.floor(i / opt.gw);
            // start new cube stack, set userData for it
            var cubeStack = new THREE.Group(),
            ud = cubeStack.userData;
            ud.x = x;
            ud.y = y;
            ud.i = i;
            // name for this cubeStack
            cubeStack.name = 'cubestack_' + x + '_' + y;
            // set postion of this cube stack group
            var px = (opt.gw / 2 * -1 + 0.5) + x,
            py = 0,
            pz = (opt.gh / 2 * -1 + 0.5) + y;
            cubeStack.position.set(px, py, pz);
            // add to cubeGroups group
            stack.userData.cubeGroups.add(cubeStack)
            i += 1;
        }
    };
    //******** **********
    //  APPEND MESH METHOD AND HELPERS
    //******** **********
    var getPos = {};
    // random get pos method
    getPos.random = function(stack, opt, i){
        return {
            x: Math.floor(opt.gw * Math.random()),
            z: Math.floor(opt.gh * Math.random())
        };
    };
    // random get pos method
    getPos.seededRandom = function(stack, opt, i){
        return {
            x: Math.floor(opt.gw * THREE.MathUtils.seededRandom()),
            z: Math.floor(opt.gh * THREE.MathUtils.seededRandom())
        };
    };
    var appendBoxMeshObjects = function (stack, opt) {
        opt = opt || {};
        opt.boxCount = opt.boxCount === undefined ? 30 : opt.boxCount;
        opt.posArray = opt.posArray || [];
        // default get pos method
        var getPosMethod = getPos.seededRandom;
        // if getPos option is a string
        if(typeof opt.getPos === 'string'){
            getPosMethod = getPos[opt.getPos];
        }
        if(typeof opt.getPos === 'function'){
            getPosMethod = opt.getPos;
        }
        var boxIndex = 0;
        while (boxIndex < opt.boxCount) {
            // get the cube stack group to place the new mesh by checking the posArray first
            var a = opt.posArray[boxIndex], pos;
            if(typeof a === 'number'){
                pos = {
                    x: a % opt.gw,
                    z: Math.floor(a / opt.gw)
                };
            }else{
                pos = getPosMethod(stack, opt, boxIndex);
            }
            var cubeStack = getCubeStack(stack, pos.x, pos.z);
            // if we have a cube stack
            if(cubeStack){
                var y = cubeStack.children.length;
                var cubeColor = opt.colors[Math.floor(opt.colors.length * Math.random())];
                var box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        map: datatex.seededRandom.apply(null, [8,8].concat( cubeColor ) ),
                        emissive: 0x1a1a1a
                    }));
                box.position.set(0, y , 0);
                cubeStack.add(box);    
            }
            boxIndex += 1;
        }
    };
    // public create method
    api.create = function (opt) {
        var stack = new THREE.Group();
        opt = opt || {};
        opt.gw = stack.userData.gw = opt.gw === undefined ? 5 : opt.gw;
        opt.gh = stack.userData.gh = opt.gh === undefined ? 5 : opt.gh;
        opt.colors = stack.userData.colors = opt.colors || [
            [1, 1, 1, [0, 255]],
            [0, 1, 0, [200, 255]]
        ];
        // main cube groups
        var cubes = stack.userData.cubeGroups = new THREE.Group();
        stack.add(cubes);
        // appedn cube groups
        appendCubeGroups(stack, opt);
        // append mesh objects for cube groups
        appendBoxMeshObjects(stack, opt);
        // create and app the plane
        var plane = stack.userData.plane = createPlane(opt);
        stack.add(plane);
        return stack;
    };
    var EFFECTS = {};
    // effect to scale all cubes up and down by scaling the y value of the cubes group
    EFFECTS.scaleCubeGroup = function(stack, opt){
        opt = opt || {};
        opt.yMax = opt.yMax === undefined ? 1 : opt.yMax;
        opt.yPer = opt.yPer === undefined ? 1 : opt.yPer;
        var cubes = stack.userData.cubeGroups;
        var y = opt.yMax * opt.yPer;
        cubes.scale.set(1, y ,1);
        cubes.position.set(0, (opt.yMax - y) * -1 / 2,0);
    };
    // scale all cubes on a cube by cube basis
    EFFECTS.scaleCubes = function(stack, opt){
        opt = opt || {};
        opt.scale = opt.scale === undefined ? 1: opt.scale;
        opt.per = opt.per === undefined ? 1: opt.per;
        // scale all cubes
        stack.userData.cubeGroups.children.forEach(function(cubeStack){
            var len = cubeStack.children.length;
            cubeStack.children.forEach(function(cube, i){
                cube.scale.set(opt.scale, opt.scale, opt.scale);
                cube.rotation.y = Math.PI * 4 * ( i / len) * opt.per;
            });
        });
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

### 1.c - The data textures module

I am using this data textures module to create textures for the cube stack module, which in turn is then use by the cube stack grid module. I have [wrote a post on data texture](/2022/04/15/threejs-data-texture/) alone if you would like to read up more on this specific thing alone when it comes to textures and materials. Another option for adding texture with just javaScript code alone would be to make use of [canvas elements](/2018/04/17/threejs-canvas-texture/), and there is also of course loading external image assets as well by making use of the build in [threejs texture loader](/2021/06/21/threejs-texture-loader/).

```js
// ********** **********
// data textures - r0 - from threejs-examples-cube-stack-grid
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

### 1.1 - The main javaScript file

So now finally for just a little more javaScript code that make use of the cube stack grid module and thus the additional javaScript modules to which the module is built on top of. For this file I set up my usual objects with any threeis project when it comes to things like the scene object, camera, and renderer. After that of course I am going to want to create an instance of my cube stack grid.

So then I am going to want to call that create method of the cube stack grid module, but first I will want to create some values for what I want to see when it comes to options for a cube stack instance. Then for this example I am just making  an array of number literals for the indices of each object in this pallet of cube stack options as I have come to call it. Now that I have that out of the way I can create my instance of the cube stack grid.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    const camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.05, 1000);
    camera.position.set(25, 25, 25);
    camera.lookAt(0, -5, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CUBE STACK GRID
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    //-------- ----------
    // CUBE STACK GRID
    //-------- ----------
    const soPalette = [
        { boxCount: 3, colors: [ [0,1,0, [64, 255]], [0,1,1, [64, 255]] ], planeColor: 1 },
        { boxCount: 20 },
        { boxCount: 60 },
        { boxCount: 120, colors: [ [1,0,0, [64, 255]], [1,1,0, [64, 255]] ] },
        { boxCount: 80, colors: [ [1,0,0, [64, 255]], [1,1,0, [64, 255]] ] }
    ];
    const sopArray = [
        4,4,4,4,4,4,4,4,4,4,
        2,2,2,2,2,3,2,2,2,2,
        1,1,1,1,1,2,1,1,1,1,
        0,0,0,0,1,1,1,1,0,0,
        0,0,0,0,1,1,1,1,1,0,
        0,0,0,0,1,2,2,2,1,0,
        0,1,0,0,1,2,3,2,1,0,
        0,1,1,1,0,2,2,2,1,0,
        0,0,0,0,1,1,1,0,1,0,
        0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,1,0,0,0,0,
        0,1,1,1,2,1,0,0,0,0,
        1,1,1,2,1,1,1,0,0,0,
        1,1,2,2,2,1,1,0,0,0,
        1,1,2,3,2,1,1,0,0,0
    ];
    const csg = CubeStackGrid.create({
        gw: 4, gh: 4,
        stackGW: 5, stackGH: 5, 
        stackOptionPalette: soPalette,
        sopArray: sopArray
    });
    scene.add(csg);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    if(THREE.OrbitControls){
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    let frame = 0,
    lt = new Date();
    const maxFrame = 300;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
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

So far I have all the basic features in place that I wanted with this threejs example when it comes to having control over what the size of each cube stack should be and the width and height of the grid of cube stacks. The long term plan with this was to just have a system for creating some kind of interesting looking visual thing, and to at least some extent I think I all ready have that. The next step would be to just add a few more features when it comes to effects, and batter control over how to go about generating textures to be used for one or more of the cubes in each stack.
