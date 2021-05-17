---
title: Build a Box Helper Three.js example
date: 2021-05-17 13:57:00
tags: [three.js]
layout: post
categories: three.js
id: 868
updated: 2021-05-17 15:23:33
version: 1.17
---

I would like to start using three.js to work out a basic model when it comes to creating a simple wooden box. So with that said todays [threejs example](/2021/02/19/threejs-examples/) post will be on a quick module that I put together that will help me get an idea of what the situation will be when I cut a board into 5 equal lengths of wood. These equal lengths of wood that are created from the dimensions of a single board will then end up being represented by a collection of five mesh objects in a group. I can then rotate an position these lengths to form what would become a finished product that is just a simple open box.

<!-- more -->

## 1 - Building a box with three.js and what to know before hand

This is a post on a three.js example that helps be get a crude visual idea of what the situation will be if I cut a length of wood into 5 equal pieces to create an open box without a lid just for the sake of starting out with using three.js as a way to design some basic things that I can then build in real life using wood and simple hand tools maybe. So then this is not a getting started type post for three.js or any additional skills that are required in order to get something of values from reading this.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using three.js r127 of three.js, and this example was working fine for me with the version. However it is true that changes are being made to three.js all the time that might cause this comes example to break when it comes to using it with a future version of three.js.

### 1.2 - Look into Groups and Object3d if you have not done so yet

In this example I am creating a crude model of a box with a collection of Mesh objects that are pulled together into a group. This is how I often go about making simple, basic models with three.js rather that doing something with an extremal file format, at least for now. So it might be a good idea to read up more on the [THREE.Group constructor](/2018/05/16/threejs-grouping-mesh-objects/) as well as the [Object3d base class](/2018/04/23/threejs-object3d/) in general if you are still fairly new to three.js

## 2 - The Build a Box module

The first thing that I will want is a build a box module that will create a collection of mesh objects based on the dimensions of a single board. The idea here is that I have an object that is the length height and width of a single board and then that data is used to create a collection of mesh objects where the length, which should be the longest side, is divided by 5 and then that length is used to create a collection of five mesh objects with one side being this new computed length while all the other sides are the same. I will then just want to rotate and position these mesh objects in a proper way so that they from a box, and that will be just about it for this module.

So then this module has a main create method that will create and return a group of mesh objects that are created from a build in hard coded value that is the size of a piece of scrap wood that I got my hands on. If I did this right though I should be able to pug in any values for that and get the same result that I wanted when it comes to this crude idea of a three.js project for a very basic wood working project.

I also have an update method that can be used to create this basic animation loop with the pieces that is an exposition of all the pieces moving out from a single piece that will be the bottom of the box.

```js
(function(api){
 
    // the board to work with
    var board = {
        len: 24.25,
        height: 0.75,
        width : 7.25
    };
 
    var rotations = [
       [0,0,0],
       [1.57,0,0],
       [1.57,0,0],
       [0,0,1.57],
       [0,0,1.57]
    ];
 
    var default_positions = [
       [0, 0, 0],
       [0, 0, 1],
       [0, 0, -1],
       [1, 0, 0],
       [-1, 0, 0]
    ];
 
    var adjustPositions = function(positions, cutLen, dist){
        dist = dist === undefined ? 4: dist;
        // sides x and z adjust
        positions[1][2] = board.width / 2 - board.height / 2 + dist;
        positions[2][2] = (board.width / 2 - board.height / 2 + dist) * -1;
        positions[3][0] = cutLen / 2 - board.height / 2 + dist;
        positions[4][0] = (cutLen / 2 - board.height / 2 + dist) * -1;
        // sides y adjust
        positions[1][1] = board.width / 2 - board.height / 2;
        positions[2][1] = board.width / 2 - board.height / 2;
        positions[3][1] = cutLen / 2 - board.height / 2;
        positions[4][1] = cutLen / 2 - board.height / 2;
    };
 
    var setPositions = function(box, positions){
        var i = 0,
        len = 5;
        while(i < len){
            box.children[i].position.set(
                positions[i][0], 
                positions[i][1], 
                positions[i][2]);
           i += 1; 
        }
    };
 
    // update
    api.update = function(box, dist, per){
        var positions = JSON.parse(JSON.stringify(default_positions));
        adjustPositions(positions, box.userData.cutLen, dist * per);
        setPositions(box, positions);
    };
 
    // create a box group
    api.create = function(){
        var box = new THREE.Group(),
        positions = JSON.parse(JSON.stringify(default_positions));
        var i = 0,
        len = 5,
        cutLen = box.userData.cutLen = board.len / (len * 1);
        while(i < len){       
            var boardCut = new THREE.Mesh(
                new THREE.BoxGeometry(cutLen, board.height, board.width),
                new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                })
            );
            boardCut.rotation.set(rotations[i][0], rotations[i][1], rotations[i][2]);
            box.add(boardCut);
            i += 1;
        }
        api.update(box, 0, 0);
        return box;
    };
 
}(this['buildBox'] = {}));
```

## 3 - Using the build a box module

Now that I have my build a box module I will just want a little additional javaScript code to make use of this module. In this main javaScript file I can just create my scene object, and then create and add an instance of this box group to the scene by calling the create method of the build a box module. I then have the usual camera and renderer just like that of every other three.js project, and I also have an animation loop function for this demo of the module.

```js
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
 
var box = buildBox.create();
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
// loop
var lt = new Date(),
frame = 0,
maxFrame = 300,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        buildBox.update(box, 4, bias);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
```

Then end result of this when it is up and running is a simple animation of the mesh objects moving in and out of position. On e thing that I have learned off the bat is that I am going to end up with some scrap pieces if I cut things the way that I intend to do so. There are a few additional touches that I might want to make to this source code when and if I get to it, but I do not thing that there is much more to get done with this one. I had a crude, basic idea of what it is that I wanted to do and this is more or less it for what it is worth.

## 4 - Conclusion

This example made me become aware of some things when it comes to making a box out of a single board of wood, however I really learned that I still need to figure out some additional things when it comes to working with three.js also. I would like to make custom geometry that is like that of the box geometry constructor, but with one or more sides cut at 45 degree angles for example. So in the not to distance future I will need to revisit how to create custom geometries with the buffer geometry class as I have a bot more to learn with that one to make geometries just the way I want them for this type of thing.

When it comes to really getting into creating models for wood working projects I guess I am really going to have to learn how to use blender or some other 3d modeling program. However I do like three.js a lot, and I like making animations and simple client side javaScript projects with three.js and a little javaScript. So Maybe it would not be such a bad thing to learn how to use three.js as a way to create some modules of sorts for this sort of thing. If I get fairly professional with this sort of thing I can end up posting the three.js examples up on my website here, and it will then be possible to interact with them in certain ways which could be fun.

