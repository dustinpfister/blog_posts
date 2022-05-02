---
title: threejs cube stack grid example
date: 2022-05-02 09:55:00
tags: [three.js]
layout: post
categories: three.js
id: 983
updated: 2022-05-02 15:46:01
version: 1.2
---

Last week I made a cube stack [threejs example](/2021/02/19/threejs-examples/) that was based off of an older example that I made for an old post for the orographic camera. I made a whole lot of improvements to that dusty old example for that post, and not for todays threejs example I thought it would be cool to start another project example that is a grid of these cube stack objects actually.

<!-- more -->


<iframe class="youtube_video" src="https://www.youtube.com/embed/5rQZM4X5fYA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 1 - The first stae of the cube stack grind module

```js
// Cube Stack Grid example from threejs-examples-cube-stack-grid
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