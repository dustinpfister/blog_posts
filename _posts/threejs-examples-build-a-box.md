---
title: Build a Box Helper Three.js example
date: 2021-05-17 13:57:00
tags: [three.js]
layout: post
categories: three.js
id: 868
updated: 2021-05-17 14:13:31
version: 1.4
---

I would like to start using three.js to work out a basic model when it comes to creating a simple wooden box. So with that said todays [threejs example](/2021/02/19/threejs-examples/) post will be on a quick module that I put together that will help me get an idea of what the situation will be when I cut a board into 5 equal lengths of wood. These equal lengths of wood that are created from the dimensions of a single board will then end up being represented by a collection of five mesh objects in a group. I can then rotate an position these lengths to form what would become a finished product that is just a simple open box.

<!-- more -->

## 1 - Building a box with three.js and what to know before hand

This is a post on a three.js example that helps be get a crude visual idea of what the situation will be if I cut a length of wood into 5 equal pieces to create an open box without a lid just for the sake of starting out with using three.js as a way to design some basic things that I can then build in real life using wood and simple hand tools maybe.

## 2 - The Build a Box module

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

## 4 - Conclusion

This example made me become aware of some things when it comes to making a box out of a single board of wood, however I really learned that I still need to figure out some additional things when it comes to working with three.js also. I would like to make custom geometry that is like that of the box geometry constructor, but with one or more sides cut at 45 degree angles for example. So in the not to distance future I will need to revisit how to create custom geometries.
