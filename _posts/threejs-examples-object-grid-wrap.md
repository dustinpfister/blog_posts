---
title: Object grid wrap threejs javaScript module example
date: 2022-05-20 13:49:00
tags: [three.js]
layout: post
categories: three.js
id: 988
updated: 2022-05-21 07:41:42
version: 1.11
---

I have some ideas for videos that involve a gird of objects the position of which will move, but will also wrap around when also. In other words I would like to have some kind of simple javaScript module in which I can define an array of source objects, and then have an array of index values for tile location in the grid where each index value refers to an object to clone from the source objects array. So then this kind of module could be used in all kinds of ways when it comes to making some kind of looping world that I can then move around in. The module can be used with a number of other components that involve additional objects that might be elements of the main focus of the over all video, but this module would be a nice way to have some kind of repeating background.

So this post will be on what I have together at this time for what I am calling an object grid wrap module which will be yet another one of my [threejs project examples](/2021/02/19/threejs-examples/).

<!-- more -->

## The threejs object grid wrap module and what you should know first

This is a blog post on a javaScript module that I made that can be used to create a grid of objects, and move those objects in such a way that they will loop around again when they go out of bounds. I am making use of a lot of various features of the threejs library as well as core javaScript in the module itself as well as the additional demo code. This is then not at all a post on threejs example code that is for developers that are still new to threejs and javaScript in general. I will not be getting into every little thing that you should know before hand, but I will take a moment in this opening section to outline some general things you might want to read up more on before counting with the rest of this content.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/JqVIlrvMwHs
" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Version numbers matter

When I first made the source code examples that I am writing about in this post I was working on top of r135 of threejs.

### Source code is also up on Github

On Github I have my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-object-grid-wrap) where I have the source code that I am writing about here as well as the source code for many other such simple project examples.

## 1 - First revision of this object grid warp module and a demo of it thus far

In this section I will be going over the first revision of the object grid wrap module itself as well as demo code that helps to show that this will work they way I want it to. For this first revision I all ready have all of the core ideas that I wanted up and running and there may or may not be a need for an additional revision. I can create an instance of a THREE.Group using the create method of the object grid module that has children added and positioned from the array of source objects and index values that I give. The other core idea that I wanted also seems to be working well when it comes to moving these objects around and having them loop back.

### 1.1 - The object grid wrap module

Here I have the source code for the module that I had in mind that creates and returns a public API with a few useful methods. There is the create method that I can call to create and return a new grid object, as well as additional methods to change and update this grid object.

```js
//******** **********
// ObjectGridWrap module
//******** **********
var ObjectGridWrap = (function(){
    // public API
    var api = {};
    // some defaults
    var  DEFAULT_SOURCE_OBJECTS = [
        new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial()),
        new THREE.Mesh( new THREE.SphereGeometry( 0.5, 30, 30), new THREE.MeshNormalMaterial())
    ];
    var DEFAULT_OBJECT_INDICES = [1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1];
    // default cloner method
    var DEFAULT_CLONER = function(opt, objectIndex){
        var obj_root = opt.sourceObjects[objectIndex].clone();
        obj_root.traverse(function(obj){
            if(obj.material){
                obj.material = obj.material.clone();
            }
        });
        return obj_root;
    };
    // get a 'true' position in the form of a Vector2 for the given object index
    // by true position I mean how things are with the state of the objectIndices array
    // it can also be thought of as a kind of 'home position' as well
    var getTruePos = function(grid, objectIndex){
        var ud = grid.userData,
        trueX = objectIndex % ud.tw,
        trueZ = Math.floor(objectIndex / ud.tw);
        return new THREE.Vector2(trueX, trueZ);
    };
    // get the adjusted position in which alphaX, and alphaZ values are applyed
    var getAdjustedPos = function(grid, objectIndex){
        var ud = grid.userData,
        v_true = getTruePos(grid, objectIndex);
        // adjusted by alphas
        var ax = (v_true.x + ud.tw * ud.alphaX) % ud.tw;
        var az = (v_true.y + ud.th * ud.alphaZ) % ud.th;
        return new THREE.Vector2(ax, az);        
    };
    // The create method will create and return a new THREE.Group with desired source objects
    // and induces for where clones of these objects shall be placed
    api.create = function(opt){
        opt = opt || {};
        opt.sourceObjects = opt.sourceObjects || DEFAULT_SOURCE_OBJECTS;
        opt.objectIndices = opt.objectIndices || DEFAULT_OBJECT_INDICES;
        opt.tw = opt.tw === undefined ? 5: opt.tw; // tile width and height
        opt.th = opt.th === undefined ? 5: opt.th;
        opt.alphaX = 0; // alpha x and z values
        opt.alphaZ = 0;
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        var grid = new THREE.Group();
        var ud = grid.userData;
        ud.space = opt.space === undefined ? 1 : opt.space;
        ud.alphaX = opt.alphaX;
        ud.alphaZ = opt.alphaZ;
        ud.tw = opt.tw;
        ud.th = opt.th;
        ud.aOpacity = opt.aOpacity === undefined ? 1.0 : opt.aOpacity;
        var i = 0, len = opt.tw * opt.th;
        while(i < len){
            var objIndex = opt.objectIndices[i];
            var obj = opt.cloner(opt, objIndex);
            grid.add(obj);
            i += 1;
        };
        api.update(grid);
        return grid;
    };
    // set grid to alphas helper
    var setGridToAlphas = function(grid, objectIndex){
        var ud = grid.userData;
        var obj = grid.children[objectIndex];
        var v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        var x = v_adjust.x * ud.space;
        var z = v_adjust.y * ud.space;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.space / 2;
        z -= (ud.th - 1) * ud.space / 2;
        // set position
        obj.position.set(x, 0, z);
    };
    // set opacity for object and any and all nested objects
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
                obj.material.transparent = true;
                obj.material.opacity = alpha;
            }
        });
    };
    // Object opacity check
    var objectOpacityCheck = function(grid, objectIndex){
        var ud = grid.userData,
        obj = grid.children[objectIndex],
        v_center = new THREE.Vector2(ud.tw / 2, ud.th / 2),
        distMax = v_center.distanceTo( new THREE.Vector2(0.5, 0.5) );
        var v_adjust = getAdjustedPos(grid, objectIndex);
        var v2 = new THREE.Vector2(v_adjust.x + 0.5, v_adjust.y + 0.5),
        d = v2.distanceTo( v_center );
        d *= ud.aOpacity;        
        d = d < 0 ? 0 : d;
        d = d > distMax ? distMax : d;
        var b = d / distMax;
        b = 1 - b;
        b = parseFloat(b.toFixed(2));
        // call set opacity helper
        setOpacity(obj, b);
        //console.log(i, '(' + trueX + ',' + trueZ + ')', 'd=' + d.toFixed(2), distMax.toFixed(2), b);
    };
    // set position
    api.setPos = function(grid, x, z){
        var ud = grid.userData;
        ud.alphaX = THREE.MathUtils.euclideanModulo(x, 1);
        ud.alphaZ = THREE.MathUtils.euclideanModulo(z, 1);
    };
    // main update method
    api.update = function(grid){
        grid.children.forEach(function(obj, i){
            setGridToAlphas(grid, i);
            objectOpacityCheck(grid, i);
        });
    };
    // return public API
    return api;
 
}());
```

### 1.2 - Demo of the module

Now I am just going to want to have a little demo code then just to take this module for a text drive of sorts. For this demo I made custom arrays for the source objects as well as using the Math utils seeded random method as a way to generate index values when it comes to cloning what source objects for which tile location in the grid.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 5, 0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-2, 1, 3);
scene.add(dl);
//******** **********
// GRID OPTIONS
//******** **********
var tw = 20,
th = 20,
space = 1.25;
// source objects
var mkBox = function(color, h){
    var box = new THREE.Group();
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 1, h, 0.25 + 0.25),
        new THREE.MeshStandardMaterial({ color: color}) );
    mesh.position.y = h / 2;
    mesh.rotation.y = Math.PI / 180 * 20 * -1;
    var ground = new THREE.Mesh(
        new THREE.BoxGeometry( space, 0.1, space),
        new THREE.MeshStandardMaterial({ color: 0xffffff}) );
    ground.position.y = 0.05 * -1;
    box.add(mesh)  
    box.add(ground);
    return box;
};
var array_source_objects = [
    mkBox(0xff0000, 0.5),
    mkBox(0x00ff00, 1),
    mkBox(0x0000ff, 1.5),
    mkBox(0x00ffff, 2),
    mkBox(0xff00ff, 2.5)
];
var array_oi = [],
len = tw * th, i = 0;
while(i < len){
    array_oi.push( Math.floor( array_source_objects.length * THREE.MathUtils.seededRandom() ) );
    i += 1;
}
//******** **********
// CREATE GRID
//******** **********
var grid = ObjectGridWrap.create({
    space: space,
    tw: tw,
    th: th,
    aOpacity: 1.25,
    sourceObjects: array_source_objects,
    objectIndices: array_oi
});
scene.add(grid);
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000,
    ud = grid.userData;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        ObjectGridWrap.setPos(grid, (1 - per) * 2, Math.cos(Math.PI * bias) * 0.25 );
        ObjectGridWrap.update(grid);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```