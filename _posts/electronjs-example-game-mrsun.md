---
title: Idle Game Electionjs project example 
date: 2023-04-28 08:19:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1037
updated: 2023-05-05 11:44:32
version: 1.9
---

When it comes to my collection of electronjs examples thus far I do not have an example that is some kind of game project, so I have started one project that is a kind of [Idle Game](https://en.wikipedia.org/wiki/Incremental_game). The game prototype idea is called MrSun, and the general idea is to have a single object that is a sun, and a bunch of objects around the sun that are land sections. Each land section is then composed of a grid of slots, each of which can contain a block that will generate the main game currently which in this case is mana.

The sun can then be moved into other locations in the area between all the land section objects. When doing so the distance from the sun to each land section object will change which will result in temperature changes for each land section. The changes in temperature will then effect the rate at which mana for each block in a given land section is. That is that I have a base mana amount, and a temperature mana amount that together compose the total mana delta amount for each block in each slot in each land section.

I have made a whole lot of game prototypes in the past when it comes to my collection of html canvas examples, but this time around with my electionjs examples I would like to focus more so on quality rather than quantity. For this game prototype I have stayed in my lane for the good part of a month, and on top of that I have plans to continue working on this project in a stand alone repository as well. So then this will not just be yet another prototype but a game that I will keep working on, and playing myself, for a little while every day.

What I have in mind here then is not just another idle game, but a game that also pulls in elements of strategy, simulation, and sandbox type games. The core features of an idle game are there is the prototype all ready, and as I keep working on this as a stand alone project I will be seeking to further refine the features in place as well as take additional steps with various other ideas that I think will add more value to this project.

<!-- more -->

## The MrSun Idle Game Prototype and what to know first

In this post I am writing about a electionjs project example that is my first electionjs game project that is an example of an idle game project. I really went off the deep end with this one when it comes to the client system which is composed of many modules of my own design. I did not write all of them from the ground up though, many are based on source code exmaples that I have started for many other projects, others are hacked over threejs source code files. I have also borrowed code from a few other projects as well, and it would look like I will need to relpease any final product based on this under the MIT Liceses becuase of it. In any case this is not a post for people that are [new to using electronjs](/2022/02/07/electronjs-hello-world/)

### The full up to date source code for the prootype can be found on Github

The best way to get things up and running with the prototype that I am writing about in this post might be to [clone down my elecitonjs examples repo](https://github.com/dustinpfister/examples-electronjs) and then do an npm install for the [electronjs-example-mrsun project](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun) in the for post folder. This will install the version of elecitonjs I was using and as of this writing that is the only npm package that is being used for this one.

## 1 - Electionjs Files

As with just about any electionjs project there are two general things to write about, electionjs code and the client system code. In this section I am going to be writing about what it is that I have in place when it comes to the typical electionjs files such as the main.js and [preload.js](/2022/02/21/electronjs-context-bridge/) files. On top of those two files I also have one addtional nodejs script that I should write about also while I am at it.

### 1.1 - The main.js file

There is not much to write about when it comes to the main.js file with this one actualy. For this project I really went off the deep end when it comes to the client side code, but not so much when it comes to the front end code. So I just have a create main window helper functon, a custom menu, and then a few events here.


### 1.2 - The preload.js file

While working on this project I ran into a problem that had to do with a race condition when saving a game state file to the file system. If a save was in progress and I quit or reloaded the game before the save was finished I would loose my save state. There might be a number of ways to go about adressing this problem but the way that I solved it was by just making use of an additonal nodejs file and using the [fork method](/2019/08/07/nodejs-child-process-fork/) of the [nodejs child process module](/2018/02/04/nodejs-child-process/) to lanunch a save as a whole other detached process on the client system. This way the detached process will continue even if the main game porcess was killed, or the game was reloaded.

### 1.3 - The save file script savefile.js

As I have covered in the section on the preload.js file for this game prototype. Nothing major with this script as it just needs to be a very basic script that will just write a file using the write file method of the [nodejs file system module](/2019/06/14/nodejs-filesystem-write-file/).


## 2 - The Client system

Now that I have covered all the code that has to do with the electionjs files there is now going over all the code that has to do with the client system for this game. This is where things get a little involved with this as I worked on this game prototype a little each day for the good part of a month. There are a lot of javaScript modules that compose the game code thus far then. The onces that I have not done much with I will just write about and link to where you can see the copies of the modules that I am using in the github project folder. Others I have hacked over a lot, or have wrote from the ground up and as such I might post the code here then.

## 3 - Using a copy of Decimal.js for high percision math

I have went with [decimal.js](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/decimal) as a module for working with very big numbers. If you have coded with javaScript as long as I have then chances are I do not need to lecture you as to why it is a good idea to use a librray like this when making any kind of project that involves working with very big numbers which is often the case with idel games. If not then there is reading up more on what [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) is to get an idea with what the limits are with regular javaScript numbers. A possible native altertaive to bothering with a user space module would be to use [big integers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), however I find them lacking when it comes to math methods.

## 4 - Using event-dispatcher from threejs

I am using the [event-dispatcher source code](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/event-dispatcher) files from the threejs project. I have decided to make this a 2d game, but I have found that I would still like to use some features from threejs by just making use of some of the source code files. The [event dispatcher](https://threejs.org/docs/index.html#api/en/core/EventDispatcher) in threejs is a way to go about createing custom user space events for plain old javaScript objects rather that elements. I am using this to create events for my main game object.

## 5 - Using lz-string to compess save state data

I have went with [lz-string](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/lz-string) to compess save state data. For this project I have made a cusotm hack job of the file in order to turn it into a javaScript module, and while I was at it I removed all the code that I was not using.


## 6 - A hacked over THREEJS Vector2 Class

I made a [copy of the Vector2 class](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/vector2) and hacked over it a little. One major change that I made has to do with the methods for getting angles between two points as I have found that the angle to method that comes with the class is not working the way that I would like it to. I thus went with an angle to method that is just an abstraction for the ushual deal with the Math.atan2 method that is often what will be used for this kind of task in some way. The angle to method in the threejs vector2 class also makes use of a single method in that math utils object, so the options are then to add the whole math utils module also, copy over the source code for this single method, or just start removing code that I am not using from this custom cut Vector2 class module.


```js
// Vector2 class for electionjs-example-mrsun
// Based on the source code from the Vector2 class from r151 of threejs
// https://raw.githubusercontent.com/mrdoob/three.js/r151/src/math/Vector2.js
//-------- ----------
// EXPORT
//-------- ----------
class Vector2 {
    constructor(x = 0, y = 0) {
        Vector2.prototype.isVector2 = true;
        this.x = x;
        this.y = y;
    }
    get width() {
        return this.x;
    }
    set width(value) {
        this.x = value;
    }
    get height() {
        return this.y;
    }
    set height(value) {
        this.y = value;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    // added a radianTo method becuse the angleTo method is not working a certain way that I need it to.
    radianTo(v){
        const r = Math.atan2(this.y - v.y, this.x - v.x);
        return r < 0 ? Math.PI * 2 + r  : r;
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        const dx = this.x - v.x,
        dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
     * [Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}
//-------- ----------
// EXPORT
//-------- ----------
export { Vector2 };
```

## 7 - Object2d

I [started an Object2d class](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/object2d) which I would like to make like that of the Object3d class in threejs. Maybe not so much in this prototype, but as I start to work on a final game based off of this I am sure I will expand on this class a whole lot.

```js
// Object2d class based on the Object3d class of threejs
// https://raw.githubusercontent.com/mrdoob/three.js/r151/src/core/Object3D.js
import { Vector2 } from '../vector2/vector2.mjs';
import { EventDispatcher } from '../event-dispatcher/EventDispatcher.mjs';
 
class Object2D extends EventDispatcher {
    constructor() {
        super();
        this.name = '';
        this.type = 'Object3D';
        this.parent = null;
        this.children = [];
        // position
        const position = new Vector2();
        const size = new Vector2();
        Object.defineProperties( this, {
            position: {
            configurable: true,
                enumerable: true,
                value: position
            }
        } );
        this.userData = {};
    }
};
 
export { Object2D };
```


## 8 - Object2d-sprite

For this prototype thus far I have one addtional module in which I [extend from my base object2d class that is a sprite class](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-mrsun/html/js/object2d-sprite).

```js
import { Vector2 } from '../vector2/vector2.mjs';
import { Object2D } from '../object2d/object2d.mjs';
class SpriteSheet {
    constructor(image) {
        this.image = image || null;
        this.cell_data = [];
        this.cell_count = 0;
    }
    // set the cell data to a grid using the current image, and a given cellSize Vector2
    setCellDataToGrid( cellSize = new Vector2(32, 32) ){
        this.cell_data = [];
        let i = 0;
        const grid_w = Math.floor( this.image.width / cellSize.x );
        const grid_h = Math.floor( this.image.height / cellSize.y );
        const len = this.cell_count = grid_w * grid_h;
        while(i < len){
            const gx = i % grid_w;
            const gy = Math.floor(i / grid_w );
            const x = gx * cellSize.x;
            const y = gy * cellSize.y;
            this.cell_data.push(x, y, cellSize.x, cellSize.y);
            i += 1;
        }
    }
    getCell( index = 0 ){
        const cd = this.cell_data;
        return {
           sx: cd[ index * 4 + 0 ],
           sy: cd[ index * 4 + 1 ],
           sw: cd[ index * 4 + 2 ],
           sh: cd[ index * 4 + 3 ]
        };
    }
};
class Sprite extends Object2D {
    constructor() {
        super();
        this.type = 'Sprite';
        // size
        const size = new Vector2();
        Object.defineProperties( this, {
            size: {
                configurable: true,
                enumerable: true,
                value: size
            }
        } );
        this.sheets = [];
        this.cellIndices = [];
        this.userData = {};
    }
    getCell(sheetIndex){
        return this.sheets[ sheetIndex ].getCell( this.cellIndices[ sheetIndex] );
    }
};
export { Sprite, SpriteSheet };
```

## 9 - Canvas

I started a custom canvas module for this game based on what I made for my [blog post on canvas textures in threejs](/2018/04/17/threejs-canvas-texture/). I removed a lot of the built in draw functions that I will not be using in this project, and also turned it into a javaScript module rather than the IIFE format that is was in.

```js
// canvas.mjs - a canvas module
// based on r2 of my canvas module from my blog post on canvas textures from threejs-canvas-texture
import { LZString }  from "../lz-string/1.4.4/lz-string.mjs"
const canvasMod = {};
//-------- ----------
// HELEPRS
//-------- ----------
// parse draw option helper
const parseDrawOption = (opt) => {
    // if opt.draw is false for any reason return DRAW.square
    if(!opt.draw){
        return DRAW.rnd;
    }
    // if a string is given assume it is a key for a built in draw method
    if(typeof opt.draw === 'string'){
        return DRAW[opt.draw];
    }
    // assume we where given a custom function
    return opt.draw;
};
// parse state data objects
const parseStateData = (canObj, opt) => {
    const data = canObj.state.data
    // all of this only applys to data strings
    if(typeof data != 'string'){
        return;
    }
    // plain data string ex '0,0,0,0,0,0,0,0'
    if(opt.dataParse === 'string'){
        canObj.state.data = data.split(',');
        return;
    }
    // try to use LZString if it is there
    if(opt.dataParse === 'lzstring'){
        try{
           const str = LZString.decompress(data);
           canObj.state.data = str.split(',');
           return;
        }catch(e){
           console.log('some error with lz-string.js');
           console.log(e);
        }
    }
    // try to use LZString if it is there base64 style
    if(opt.dataParse === 'lzstring64'){
       try{
           const str = LZString.decompressFromBase64(data);
           canObj.state.data = str.split(',');
           return;
       }catch(e){
           console.log('some error with lz-string.js');
           console.log(e);
       }
    }
};
// draw grid helper for built in draw methods 'grid_palette' and 'rnd'
const draw_grid_fill = (ctx, canvas, iw, ih, getColor) => {
    getColor = getColor || function(color){ return color };
    const len = iw * ih;
    const pxW = canvas.width / iw;
    const pxH = canvas.height / ih;
    let i = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    while(i < len){
        const x = i % iw;
        const y = Math.floor(i / iw);
        ctx.fillStyle = getColor(x, y, i);
        const px = x * pxW;
        const py = y * pxH;
        ctx.fillRect(px, py, pxW, pxH);
        i += 1;
    }
};
//-------- ----------
// built in draw methods
//-------- ----------
const DRAW = {};
// draw a grid with palette data
DRAW.grid_palette = (canObj, ctx, canvas, state) => {
    const w =  state.w === undefined ? 16 : state.w;
    const h =  state.h === undefined ? 16 : state.h;
    const data = state.data || [];
    const len = w * h;
    const pxW = canObj.size / w;
    const pxH = canObj.size / h;
    draw_grid_fill(ctx, canvas, w, h, function(x, y, i){
        const ci = data[i];
        return canObj.palette[ci];
    });
};
// random using palette colors
DRAW.rnd = (canObj, ctx, canvas, state) => {
    let i = 0;
    const gSize =  state.gSize === undefined ? 5 : state.gSize;
    const len = gSize * gSize;
    const pxSize = canObj.size / gSize;
    draw_grid_fill(ctx, canvas, gSize, gSize, function(x, y, i){
        const ci = Math.floor( canObj.palette.length * Math.random() );
        return canObj.palette[ci];
    });
};
//-------- ----------
// PUBLIC API
//-------- ----------
// create and return a canvas texture
canvasMod.create = function (opt) {
    opt = opt || {};
    // create canvas, get context, set size
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d', { willReadFrequently: true } );
    opt.size = opt.size === undefined ? 16 : opt.size;
    opt.dataParse = opt.dataParse || 'string'; // parse data strings into arrays 
    canvas.width = opt.size;
    canvas.height = opt.size;
    // create canvas object
    const canObj = {
        texture: null,
        texture_data: null,
        update_mode: opt.update_mode || 'canvas',
        size: opt.size,
        canvas: canvas, 
        ctx: ctx,
        palette: opt.palette || ['black', 'white'],
        state: opt.state || {},
        draw: parseDrawOption(opt)
    };
    // parse data strings into arrays
    parseStateData(canObj, opt);
    // update for first time
    canvasMod.update(canObj);
    return canObj;
};
// update
const UPDATE = {};
// update canvas only update mode
UPDATE.canvas = (canObj) => {
    // update canvas texture
    canObj.draw.call(canObj, canObj, canObj.ctx, canObj.canvas, canObj.state);
};
canvasMod.update = (canObj) => {
    UPDATE[canObj.update_mode](canObj);
};
export { canvasMod };
```


## 10 - Mrsun-constant

When I first started working on this I ended up with a lot of constant values up at the top of my main game state module. I then ran into a situation in which I need to get at these constant values from one of my other modules that has to do with the state machine or some render function. So I have found that it might just be best to have some kind of main module that is just one big collection of constant values that are used in the game state, as well as all over the programe in general. I then import this module in my game module, and then everywhere else where I would need to do so as well.

```js
// constant.mjs - for electionjs-example-mrsun
import { Decimal }  from "../decimal/10.4.3/decimal.mjs"
import { Vector2 }  from "../vector2/vector2.mjs"
//-------- ----------
// CONSTANT OBJECT
//-------- ----------
const constant = {};
constant.SUN_RADIUS = 40;
constant.LAND_RADIUS = 40;
constant.SUNAREA_RADIUS = 150;
constant.SUN_CENTER = new Vector2(320, 240);
constant.SUN_DMAX = constant.SUNAREA_RADIUS * 2 - constant.SUN_RADIUS * 2;
constant.LAND_OBJECT_COUNT = 12;
constant.LAND_RADIUS_TOCENTER = constant.LAND_RADIUS + constant.SUNAREA_RADIUS;
constant.BLOCK_MAX_LEVEL = 99;
constant.MANA_MAX = new Decimal('1e100');
constant.MANA_START = '5';
constant.TEMP_MAX = 999;
constant.MAX_BLOCK_POW = Math.log(10000000) / Math.log(2);
constant.SLOT_UNLOCK_MAXEXP = 30;
constant.SLOT_GRID_WIDTH = 10;
constant.SLOT_GRID_HEIGHT = 8;
constant.SLOT_GRID_LEN = constant.SLOT_GRID_WIDTH * constant.SLOT_GRID_HEIGHT;
constant.SLOT_RADIUS_DELTA = 68 / constant.SLOT_GRID_HEIGHT;
constant.SLOT_RADIAN_DELTA = Math.PI / 180 * 15;
constant.BLOCK_LAND_MAX = Math.round(constant.SLOT_GRID_LEN); //!!! might do away with this
constant.LANDS_START_SECTION_DATA = [];
constant.SUNSPOTS_WORLDVALUE_BASE_MAX = 10;
constant.SUNSPOTS_WORLDVALUE_BASE_MIN = 1.0005;
constant.SUNSPOTS_WORLDVALUE_MAXMANA = Math.pow(10, 10);
constant.DEFAULT_CREATE_OPTIONS = {
    mana: constant.MANA_START,
    mana_spent: '0',
    mana_level: 1,
    supernova_count: 0,
    sunspots: '0', 
    sectionData: constant.LANDS_START_SECTION_DATA
};
constant.DECIMAL_OPTIONS = { 
    precision: 40,
    maxE: 100,
    minE: -100
};
//-------- ----------
// SUPERNOVA
//-------- ----------
constant.SUPERNOVA_STARTCOST_BASE = 2;
constant.SUPERNOVA_STARTCOST_MAXPOW = 40;
constant.SUPERNOVA_STARTCOST_NUM = 10000;
//-------- ----------
// BLOCK TYPES
//-------- ----------
constant.BLOCKS = {};
constant.BLOCKS.blank = {
    type: 'blank',
    mana_base: 0,
    mana_temp: 0
};
constant.BLOCKS.rock = {
    type: 'rock',
    mana_base: 1.00,
    mana_temp: 0.75
};
//-------- ----------
// IMG DATA OBJECTS ( used to render slots / blocks )
//-------- ----------
const IMG = constant.IMG = {};
IMG.locked = {
    palette: ['blue', 'cyan'],
    w: 2, h: 2,
    color_indices: [
        0, 1,
        1, 0
    ]
};
IMG.blank = {
    palette: ['black'],
    w: 1, h: 1,
    color_indices: [0]
};
// 2 by 2 rock
IMG.rock = {
    palette: [
        '#2a2a2a', 
        '#664400', '#442200', 
    ],
    w: 4, h: 4,
    color_indices: [
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 2, 1, 2,
        2, 1, 2, 1
   ]
};
//-------- ----------
// HARD CODED SAVE? - add lz-string compessed save, or set as empty string
//-------- ----------
constant.SAVE_STRING = '';
//-------- ----------
// EXPORT
//-------- ----------
export { constant };
```


## 11 - mrsun-game

I have a folder that contains that main game state module, as well as a number of other supporting files for this. The main game module create method is what I call to create a main game state object. I then have also took code that has to do with the state of the sun object, as well as the land objects broken down into other files.

### 11.1 - The sun module

This module contains that main sun class which I use to create the object the stores the current position of the sun. I also have a number of methods in this class that have to do with updating the animation state of the sun, as well as the position of the sun relative to a fixed center position.

```js
// sun.mjs - for electionjs-example-mrsun
import { Vector2 } from '../vector2/vector2.mjs'
import { canvasMod } from '../canvas/canvas.mjs'
import { Sprite, SpriteSheet } from '../object2d-sprite/sprite.mjs'
import { constant } from '../mrsun-constant/constant.mjs'
//-------- ----------
// Decimal
//-------- ----------
//Decimal.set(constant.DECIMAL_OPTIONS);
//-------- ----------
// Canvas Objects for Sun Class
//-------- ----------
const can1 = canvasMod.create({
    size: 128,
    palette: ['yellow', '#ff0000', '#880000', '#440000'],
    state: {},
    draw: (canObj, ctx, canvas, state) => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.strokeStyle = 'black';
        let i = 0;
        const len = 16;
        const tri_count = 16;
        const radian_step = Math.PI * 2 / tri_count;
        while(i < len){
            const x = i % 4;
            const y = Math.floor(i / 4);
            const cx = 16 + 32 * x;
            const cy = 16 + 32 * y;
            // draw triangles
            let i_tri = 0;
            while(i_tri < tri_count){
               const radian = radian_step * i_tri + radian_step * 3 * (i / len);
               const x = cx + Math.cos(radian) * 16;
               const y = cy + Math.sin(radian) * 16;
               ctx.fillStyle = canObj.palette[1 + i_tri % 3];
               ctx.beginPath();
               ctx.moveTo(x, y);
               ctx.lineTo(
                   cx + Math.cos(radian - Math.PI / 180 * 12) * 10,
                   cy + Math.sin(radian - Math.PI / 180 * 12) * 10
               );
               ctx.lineTo(
                   cx + Math.cos(radian + Math.PI / 180 * 12) * 10,
                   cy + Math.sin(radian + Math.PI / 180 * 12) * 10
               );
               ctx.fill();
               i_tri += 1;
            }
            // draw base yellow circle
            ctx.beginPath();
            ctx.arc(cx, cy, 10, 0, Math.PI * 2);
            ctx.fillStyle = canObj.palette[0];
            ctx.fill();
            ctx.stroke();
            i += 1;
        }
    }
});
const can2 = canvasMod.create({
    size: 128,
    palette: ['black', 'white'],
    state: {},
    draw: (canObj, ctx, canvas, state) => {
        ctx.fillStyle = canObj.palette[0];
        ctx.strokeStyle = canObj.palette[0];
        ctx.beginPath();
        ctx.arc(13, 16, 2, 0, Math.PI * 2);
        ctx.arc(19, 16, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(12, 20);
        ctx.lineTo(14, 22);
        ctx.lineTo(18, 22);
        ctx.lineTo(20, 20);
        ctx.stroke();
    }
});
//-------- ----------
// Sun Class
//-------- ----------
class Sun extends Sprite {
    constructor () {
        super();
        this.type = 'Sun';
        const center = constant.SUN_CENTER.clone();
        Object.defineProperties( this, {
            center: {
                configurable: true,
                enumerable: true,
                value: center
            }
        });
        this.radius = constant.SUN_RADIUS;
        this.size.set(64, 64);
        const sheet1 = new SpriteSheet(can1.canvas);
        sheet1.setCellDataToGrid();
        const sheet2 = new SpriteSheet(can2.canvas);
        sheet2.setCellDataToGrid();
        this.sheets.push(sheet1);
        this.sheets.push(sheet2);
        this.cellIndices[0] = 0;
        this.cellIndices[1] = 0;
        this.centerPos();
    }
    // step the base animation forward one cell
    stepBaseAnimation () {
        let i_cell = this.cellIndices[0];
        i_cell += 1;
        i_cell = i_cell >= this.sheets[0].cell_count ? 0 : i_cell;
        this.cellIndices[0] = i_cell;
    }
    // set sun position by a given vector2 object
    setPosByVector2 (v) {
        this.position.copy(v);
        const d = this.position.distanceTo(this.center);
        const md = constant.SUNAREA_RADIUS - this.radius;
        if(d >= md){
            const a = this.position.radianTo(this.center);
            this.position.x = this.center.x + Math.cos(a) * md;
            this.position.y = this.center.y + Math.sin(a) * md;
        }
        this.zeroLengthCheck();
    }
    // 'center' th sun
    centerPos () {
        this.position.copy(this.center);
        this.zeroLengthCheck();
    }
    // check for zero vector unit length and if so set a direction
    zeroLengthCheck () {
        if(this.getLengthAlpha() === 0){
            this.position.x = this.center.x + 0.001;
        }
    }
    getLength () {
        return this.position.clone().sub(this.center).length();
    }
    getLengthAlpha(){
        const length_max = constant.SUNAREA_RADIUS - this.radius;
        return this.getLength() / length_max;
    }
    // set just the vector unit length of the sun position by way of an alpha value
    setPosLength (alpha) {
        //const a2 = 0.00001 + 0.99999 * alpha
        const length_max = constant.SUNAREA_RADIUS - this.radius;
        const v = this.position.clone().sub(this.center);
        v.setLength(length_max * alpha);
        this.position.copy(this.center).add(v);
        this.zeroLengthCheck();
    }
    setPosDir (radian) {
        const v = this.position.clone().sub(this.center);
        v.applyRadian(radian);
        this.position.copy(this.center).add(v);
        this.zeroLengthCheck();
    }
    stepLengthByIndex(index_delta, range){
        const a_lencurrent = this.getLengthAlpha();
        let len_index = Math.round( a_lencurrent * range );
        len_index = len_index + index_delta;
        len_index = len_index > range ? range : len_index;
        len_index = len_index < 0 ? 0 : len_index;
        let alpha = len_index / range;
        this.setPosLength(alpha);
    }
    stepDirByIndex(index_delta = 0, grain = 1){
        const len = constant.LAND_OBJECT_COUNT * grain;
        const dir = this.position.radianTo( this.center );
        const a = dir / ( Math.PI * 2 );
        let section_index = Math.round( a * len ) % len;
        section_index += index_delta;
        section_index %= len;
        section_index = section_index < 0 ? len - 1 : section_index;
        const radian = Math.PI * 2 / len * section_index;
        this.setPosDir(radian);
    }
};
//-------- ----------
// EXPORT
//-------- ----------
export { Sun };
```

### 11.2 - The Land Module

The land module then contains mosy of the code that I use to create an update the various objects that compose a land section object as well as the whole collection of these land section objects, and also the various slots of each land section as well. So there is then a main Land class, then a LandSection class, Slot class, and then a Block class.

```js
// lands.mjs - for electionjs-example-mrsun
import { Decimal }  from "../decimal/10.4.3/decimal.mjs"
import { Vector2 } from '../vector2/vector2.mjs'
import { canvasMod } from '../canvas/canvas.mjs'
import { Sprite, SpriteSheet } from '../object2d-sprite/sprite.mjs'
import { utils }  from "../mrsun-utils/utils.mjs"
import { constant } from "../mrsun-constant/constant.mjs"
//-------- ----------
// Decimal
//-------- ----------
Decimal.set(constant.DECIMAL_OPTIONS);
//-------- ----------
// SpriteLandSectonWorld Class ( for world state )
//-------- ----------
// draw a single texel for a single slot ( in world state )
const drawSectionSlotTexel = (ctx, slot, v2, rad_center, texelX, texelY) => {
    // get block and image
    const block = slot.block;
    let img = constant.IMG.locked;
    if(!slot.locked){
        img = constant.IMG[block.type];
    }
    const rad_edge = rad_center - constant.SLOT_RADIAN_DELTA;
    const rad_slot_start = rad_edge + Math.PI / 180 * ( 30 / 10 * slot.x );
    const rad_delta_texel = constant.SLOT_RADIAN_DELTA * 2 / 10 / img.w;
    const rad_start = rad_slot_start + rad_delta_texel * texelX;
    const rad_end = rad_start + rad_delta_texel;
    const radius_slot_low = constant.LAND_RADIUS_TOCENTER - constant.LAND_RADIUS + constant.SLOT_RADIUS_DELTA  * slot.y;
    const radius_texel_delta = constant.SLOT_RADIUS_DELTA  / img.h;
    const radius_low = radius_slot_low + radius_texel_delta * texelY;
    const radius_high = radius_low + radius_texel_delta;
    // draw arcs
    ctx.beginPath();
    ctx.arc(v2.x, v2.y, radius_low, rad_start, rad_end  );
    ctx.arc(v2.x, v2.y, radius_high, rad_end, rad_start, true  );
    ctx.closePath();
    // get fill style, and fill
    const i_ci = texelY * img.w + texelX;
    ctx.fillStyle = img.palette[ img.color_indices[ i_ci ] ];
    ctx.fill();
};
// create a render sheet for the given section object
const createSectionRenderSheet = (section, drawSectionSlot) => {
    const can = canvasMod.create({
        size: 1024,
        state: {
            section: section
        },
        draw: (canObj, ctx, canvas, state) => {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            const section = state.section;
            const sprite = section.sprite_world;
            let i = 0;
            while(i < constant.SLOT_GRID_LEN){
                const bx = i % constant.SLOT_GRID_WIDTH;
                const by = Math.floor(i / constant.SLOT_GRID_WIDTH);
                const i_slot = by * constant.SLOT_GRID_WIDTH + bx;
                const slot = section.slots[i_slot];
                drawSectionSlot(ctx, section, slot)
                i += 1;
            }
        }
    });
    const sheet = new SpriteSheet(can.canvas);
    sheet.setCellDataToGrid( new Vector2(128, 128) );
    sheet.can = can;
    return sheet;
};
class SpriteLandSectionWorld extends Sprite {
    constructor (section) {
        super();
        this.section = section;
        this.type = 'SpriteLandSectonWorld';
        this.size.set(128, 128);
        this.sheets[0] = createSectionRenderSheet(this.section, this.drawSectionSlot);
        this.cellIndices[0] = 0;
    }
    // draw a section arc for a single slot object to be used in world state
    drawSectionSlot (ctx, section, slot) {
        const block = slot.block;
        let img = constant.IMG.locked;
        if(!slot.locked){
            img = constant.IMG[block.type];
        }
        const radian = Math.PI + Math.PI * 2 / constant.LAND_OBJECT_COUNT  * section.i;
        // get a vector2 that is on the edge of the sun area
        const v1 = new Vector2(64 + Math.cos(radian) * constant.radius_land, 64 + Math.sin(radian) * constant.radius_land );
        // get a vector2 that is the center location
        const v2 = new Vector2(
            64 + Math.cos(radian) * constant.LAND_RADIUS_TOCENTER, 
            64 + Math.sin(radian) * constant.LAND_RADIUS_TOCENTER);
        let rad_center = Math.PI * 2 / constant.LAND_OBJECT_COUNT * section.i;
        // draw texels
        const len = img.w * img.h;
        let i_texel = 0;
        while(i_texel < len){
            const x = i_texel % img.w;
            const y = Math.floor(i_texel / img.w);
            drawSectionSlotTexel(ctx, slot, v2, rad_center, x, y);
            i_texel += 1;
        }
    }
    update(){
        canvasMod.update(this.sheets[0].can);
    }
};
//-------- ----------
// SpriteLandSectonLand Class ( for land state )
//-------- ----------
class SpriteLandSectionLand extends Sprite {
    constructor(section) {
        super();
        this.section = section;
        this.type = 'SpriteLandSectonLand';
        this.size.set(500, 280);
        this.sheets[0] = createSectionRenderSheet( this.section, this.drawSectionSlot );
        this.cellIndices[0] = 0;
    }
    // draw a single slot for the section object
    drawSectionSlot(ctx, section, slot){
        const block = slot.block;
        let img = constant.IMG.locked;
        if(!slot.locked){
            img = constant.IMG[block.type];
        }
        // draw texels
        const len = img.w * img.h;
        const block_width = 128 / 10;
        const block_height = 128 / 8;
        const texel_width = block_width / img.w;
        const texel_height = block_height / img.h;
        let i_texel = 0;
        while(i_texel < len){
            const texelX = i_texel % img.w;
            const texelY = Math.floor(i_texel / img.w);
            const i_ci = texelY * img.w + texelX;
            ctx.fillStyle = img.palette[ img.color_indices[ i_ci ] ];
            ctx.fillRect(
                slot.x * block_width + texel_width * texelX, 
                slot.y * block_height + texel_height * texelY, 
                texel_width, texel_height);
            i_texel += 1;
        }
    }
    update(){
        canvasMod.update(this.sheets[0].can);
    }
};
//-------- ----------
// BLOCK CLASS
//-------- ----------
class Block {
    constructor(opt) {
        opt = opt || {};
        this.type = opt.type || 'blank';
        this.mana_base = 0;
        this.mana_temp = 0;
        this.mana_value = null;
        this.upgradeCost = 0;
        this.setLevel(opt.level, this.type, 1);
    }
    // set the mana value object for this block
    setManaValue () {
        const mv_level = utils.addPows(10, this.level - 1);
        this.mana_value = {
           mv_level: new Decimal(mv_level),
           valueOf: function(){
               return this.mv_level;
            }
        };
    }
    // get the upgrade cost AT the given CURRENT block level
    getUpgradeCost (level_current, level_target) {
        level_target === undefined ? level_current + 1 : level_target;
        return new Decimal( utils.addPows(10, level_target - 1, level_current) );
        //return Decimal.pow(10, level_current === undefined ? this.level : level_current);
    }
    getMaxLevel (mana, level_current) {
        level_current = level_current === undefined ? this.level : level_current;
        let level_target = level_current;
        let mana_cost = 0;
        while(mana_cost <= mana){
            level_target += 1;
            mana_cost = this.getUpgradeCost(level_current, level_target).toNumber();
        }
        return level_target - 1;
    }
    // set mana stats without doing anything with level or type
    setManaStats (sunspot_multi = 1) {
        const TYPE_DEF = constant.BLOCKS[this.type];
        this.mana_base = TYPE_DEF.mana_base * sunspot_multi * this.level;
        this.mana_temp = Math.pow(TYPE_DEF.mana_temp * sunspot_multi, this.level);
    }
    // set the current level of the block, can also change type
    setLevel (level, type, sunspot_multi = 1 ) {
        this.level = level === undefined ? 1 : parseInt(level);
        this.type = type || this.type;
        this.setManaStats(sunspot_multi);
        this.mana_value = null;
        this.upgradeCost = this.getUpgradeCost(this.level, this.level + 1);
        this.setManaValue();
    }
    // copy some other block to this block
    copy (block) {
        this.setLevel(block.level, block.type, 1);
    }
    // clear a block to blank type
    clear () {
        this.setLevel(1, 'blank', 1);
    }
};
//-------- ----------
// SLOT CLASS
//-------- ----------
class Slot {
    constructor(opt) {
        opt = opt || {};
        this.i = opt.i === undefined ? 0 : opt.i;
        this.x = opt.x === undefined ? 0 : opt.x;
        this.y = opt.y === undefined ? 0 : opt.y;
        this.block = new Block({ type: 'blank'});
        this.locked = true;
    }
};
//-------- ----------
// Land Section
//-------- ----------
class LandSection {
    constructor(i, cx, cy, sectionData) {
        sectionData = sectionData || {};
        this.i = i;
        this.a = Math.PI * 2 * ( i / constant.LAND_OBJECT_COUNT);
        // use the vector2 class
        this.position = new Vector2();
        this.position.x = cx + Math.cos(this.a) * ( constant.SUNAREA_RADIUS + constant.LAND_RADIUS );
        this.position.y = cy + Math.sin(this.a) * ( constant.SUNAREA_RADIUS + constant.LAND_RADIUS );
        this.r = constant.LAND_RADIUS;
        this.slots = [];
        this.slot_unlock_count = 0;
        // counts_of_block_types/next_cost_of_somehting.
        this.bt_counts = {};  // counts for all block types for all slots 'blank, rock, ect'
        // temp
        this.d_alpha = 0;
        this.temp = 0;
        this.createSlotGrid();
        // starting unlock slots
        this.applySectionData(sectionData)
        // update the counts
        this.setBlockTypeCounts();
        // world state sprite object
        this.sprite_world = new SpriteLandSectionWorld(this);
        this.sprite_world.position.set(this.position.x, this.position.y);
        // land sprite sprite object
        this.sprite_land = new SpriteLandSectionLand(this);
        this.sprite_land.position.set(320, 240);
        // total mana value
        this.mana_total = new Decimal(0);
    }
    // apply section data
    applySectionData(sectionData){
        const unlock = sectionData.cols_unlock_slots;
        const blockdata = sectionData.cols_block_data || [];
        if(unlock){
            let x = 0;
            while(x < constant.SLOT_GRID_WIDTH){
                let y = constant.SLOT_GRID_HEIGHT - 1;
                let ct = unlock[x];
                let bd = [];
                if(blockdata[x]){
                    bd = blockdata[x].split(';');
                }
                while(ct > 0){
                    const slot = this.getSlot(x, y);
                    slot.locked = false;
                    const i_bd = unlock[x] - ct;
                    if( bd[ i_bd] ){
                        const str = bd[ i_bd];
                        const arr = str.split(',');
                        if(arr[0] === 'b'){
                            slot.block.clear();
                        }
                        if(arr[0] === 'r'){
                            slot.block.setLevel(arr[1], 'rock', 1);
                        }
                    }
                    y -= 1;
                    ct -= 1;
                }
                x += 1;
            }
        }
    }
    // get a section data object used for save states
    getSectionData(){
        const sectionData = {
            cols_unlock_slots: [],
            cols_block_data: []
        };
        let x = 0;
        while(x < constant.SLOT_GRID_WIDTH){
            let y = constant.SLOT_GRID_HEIGHT -  1;
            let unlock_ct = 0;
            let bd_str = '';
            while(y >= 0){
                const slot = this.getSlot(x, y);
                unlock_ct = slot.locked ? unlock_ct : unlock_ct + 1;
                if(!slot.locked){
                   if(slot.block.type === 'rock'){
                       bd_str += 'r,' + slot.block.level + ';'
                   }
                   if(slot.block.type === 'blank'){
                       bd_str += 'b,1;'
                   }
                }
                y -= 1;
            }
            sectionData.cols_block_data.push( bd_str );
            sectionData.cols_unlock_slots.push( unlock_ct );
            x += 1;
        }
        return sectionData;
    }
    // get a slot object by index or grid position
    getSlot(xi, y){
        let i = xi;
        if(y != undefined){
            i = this.getSlotIndex(xi, y);
        }
        return this.slots[i];
    }
    // get a slot index number if x and y are known
    getSlotIndex(x, y){
        return y * constant.SLOT_GRID_WIDTH + x;
    }
    // get a slot i, x, y object when just i is known
    getSlotXY (i) {
        return {
            i: i,
            x: i % constant.SLOT_GRID_WIDTH,
            y: Math.floor(i / constant.SLOT_GRID_WIDTH)
        }
    }
    // for each slot
    forEachSlot(func) {
        let i_slot = 0;
        const len = this.slots.length;
        while(i_slot < len){
            const slot = this.slots[i_slot];
            func.call(this, slot, i_slot, this);
            i_slot += 1;
        }
    }
    // set block type counts
    setBlockTypeCounts() {
        const bt_counts = this.bt_counts = Object.keys(constant.BLOCKS).reduce( (acc, typeKey) => {
            acc[typeKey] = 0;
            return acc;
        }, {});
        let slot_unlock_count = 0;
        this.forEachSlot( (slot) => {
            const ct = bt_counts[ slot.block.type ];
            bt_counts[ slot.block.type ] = ct === undefined ? 1 : ct + 1;
            slot_unlock_count += slot.locked ? 0 : 1;
        });
        this.slot_unlock_count = slot_unlock_count;
    }
    // create the Slot Grid
    createSlotGrid() {
        let i_slot = 0;
        this.slots = [];
        while(i_slot < constant.SLOT_GRID_LEN){
            const slot = new Slot( this.getSlotXY(i_slot) );
            this.slots.push(slot);
            i_slot += 1;
        }
    }
    // drop down blocks at a given slot
    dropDownBlocks(slot) {
        let y = slot.y;
        while(y >= 1){
            const slot_current = this.slots[ this.getSlotIndex( slot.x, y ) ];
            const slot_up = this.slots[ this.getSlotIndex( slot.x, y - 1 ) ];
            if(slot_up.block.type != 'blank'){
                slot_current.block.copy(slot_up.block);
                slot_up.block.clear();
            }
            y -= 1;
        }
    }
};
//-------- ----------
// Lands Class
//-------- ----------
class Lands {
    constructor(opt) {
        opt = opt || {};
        opt = Object.assign({}, { sectionData: [] }, opt);
        this.sections = [];
        this.bt_counts = {}; // block type grand total counts
        this.slot_unlock_cost = 0;
        this.slot_unlock_count = 0;
        this.slot_total = constant.SLOT_GRID_LEN * constant.LAND_OBJECT_COUNT;
        // total mana value
        this.mana_total = new Decimal(0);
        let i = 0;
        while(i < constant.LAND_OBJECT_COUNT){
            const sectionData = opt.sectionData[i] || {};
            const section = new LandSection(i, constant.SUN_CENTER.x, constant.SUN_CENTER.y, sectionData);
            this.sections.push(section);
            i += 1;
        }
        this.setBlockTypeCounts();
    }
    // call a function for each slot, of each land Section
    forEachSection (func) {
        let si = 0;
        const len = this.sections.length;
        while(si < len){
            const section = this.sections[si];
            func.call(this, section, si, this);
            si += 1;
        }
    }
    getSectionDataArray(){
        const array = [];
        this.forEachSection( (section) => {
           array.push(section.getSectionData());
        });
        return array;
    }
    // set grand total block type counts, slot unlock counts, and update slot unlock cost
    setBlockTypeCounts() {
        const bt_counts = this.bt_counts = Object.keys(constant.BLOCKS).reduce( (acc, typeKey) => {
            acc[typeKey] = 0;
            return acc;
        }, {});
        let slot_unlock_count = 0;
        this.forEachSection( (section) => {
            section.setBlockTypeCounts();
            Object.keys(constant.BLOCKS).forEach((typeKey)=>{
                bt_counts[typeKey] += section.bt_counts[typeKey];
            });
            slot_unlock_count += section.slot_unlock_count;
        });
        this.slot_unlock_count = slot_unlock_count;
        // update slot unlock cost
        const n = this.slot_unlock_count;
        const d = this.slot_total;
        this.slot_unlock_cost = Decimal.pow(10, constant.SLOT_UNLOCK_MAXEXP * ( n / d ) ).ceil().sub(1);
    }
};

//-------- ----------
// EXPORT
//-------- ----------
export { Lands, LandSection, Slot, Block };
```

### 11.3 - The game module

The main game module then makes use of the sun and land modules as well as the constant module and is thus what I use to create a game state object as well as update it over time. There is the main create method that I call in the init state, and then also with a supernova event in my supernova state. More on all of this in my seciton on the state machine.

```js
// game.mjs - for electionjs-example-mrsun
// create and update a game state object
import { Decimal }  from '../decimal/10.4.3/decimal.mjs'
import { LZString }  from '../lz-string/1.4.4/lz-string.mjs'
import { EventDispatcher } from '../event-dispatcher/EventDispatcher.mjs'
import { Vector2 } from '../vector2/vector2.mjs'
import { canvasMod } from '../canvas/canvas.mjs'
import { Sprite, SpriteSheet } from '../object2d-sprite/sprite.mjs'
import { utils }  from '../mrsun-utils/utils.mjs'
import { constant } from '../mrsun-constant/constant.mjs'
import { Lands } from './lands.mjs'
import { Sun } from './sun.mjs'
//-------- ----------
// Decimal
//-------- ----------
Decimal.set(constant.DECIMAL_OPTIONS);
//-------- ----------
// MAIN GAME MOD OBJECT TO EXPORT
//-------- ----------
const gameMod = {};
//-------- ----------
// GAME EVENTS
//-------- ----------
const GAME_EVENTS = new EventDispatcher();
// The mana_total_zero event will fire if a player has 0 mana and 0 mana per tick income
GAME_EVENTS.addEventListener('mana_total_zero', (evnt) => {
    evnt.game.mana = evnt.game.mana.add(constant.MANA_START);
});
// autosave delay event
GAME_EVENTS.addEventListener('autosave_delay', (evnt) => {
    evnt.game.autosave_ticks = 3;
});
//-------- ----------
// HELPERS
//-------- ----------
// get the current mana cap value for a game object, or a cap value for the given level
const getManaCap = (a) => {
    let mana_level = 1;
    if(typeof a === 'number'){
       mana_level = a;
    }
    if(typeof a === 'object' && a != null){
       mana_level = a.mana_level;
    }
    if( Decimal.isDecimal(a) ){
       mana_level = a.round();
    }
    return Decimal.pow(10, 3 + (mana_level - 1) );
};
// credit a mana delta to game.mana, upgrade mana level if cap is 
// reached as long as then next cap is below MAX MANA const
const manaCredit = (game, mana_delta ) => {
    game.mana = game.mana.add( mana_delta );
    if( game.mana.gte(game.mana_cap) ){
        const new_level = game.mana_level + 1;
        const new_cap = getManaCap( new_level );
        if( new_cap.lt( constant.MANA_MAX ) ){
            game.mana_level = new_level;
            game.mana_cap = new_cap;
        }
    }
    game.mana = game.mana.gt(game.mana_cap) ?  new Decimal( game.mana_cap ) : game.mana;
};
// debit game.mana
const manaDebit = (game, mana_delta) => {
    game.mana = game.mana.sub( mana_delta );
    game.mana_spent = game.mana_spent.add(mana_delta);
    //game.mana = game.mana.lt(0) ? new Decimal(0) : game.mana;
    // test for mana and mana per tick === 0
    if( game.mana_per_tick.eq(0) && game.mana.eq(0)){
        // do an update
        gameMod.updateByTickDelta(game, 0, true);
        // if income is still 0, fire a mana_total_zero event
        if(game.mana_per_tick.eq(0)){
            GAME_EVENTS.dispatchEvent({
                type: 'mana_total_zero',
                game: game
            });
        }
    }
};
// get the base that is used to figure sunspot world value base
const getSunspotWorldValueBase = (world_mana_value) => {
    world_mana_value = world_mana_value <= 0 ? 1 : world_mana_value;
    const base_min = constant.SUNSPOTS_WORLDVALUE_BASE_MIN;
    const base_max = constant.SUNSPOTS_WORLDVALUE_BASE_MAX;
    let alpha = Math.log( world_mana_value ) / Math.log( constant.SUNSPOTS_WORLDVALUE_MAXMANA);
    alpha = alpha > 1 ? 1 : alpha;
    return base_max - (base_max - base_min) * alpha;
};
//-------- ----------
// PUBLIC API
//-------- ----------


// get the start cost of a super nova event
const getSupernovaStartcost = (supernova_count) => {
    const num = constant.SUPERNOVA_STARTCOST_NUM;
    const base = constant.SUPERNOVA_STARTCOST_BASE;
    const mp = constant.SUPERNOVA_STARTCOST_MAXPOW;
    let pow = supernova_count < mp ? supernova_count : mp;
    return num * Math.pow(base, pow);
};
// get the current supernova mana cost based on the count of supernova events,
// and an impact mana value that will reduce the current start cost
//gameMod.getSupernovaCost = ( supernova_count, impact_value ) => {
gameMod.getSupernovaCost = ( game ) => {
    const supernova_count = game.supernova_count;
    const impact_value = game.mana_spent.toNumber();
    const startcost = getSupernovaStartcost(supernova_count)
    let a_reduction = impact_value / startcost;
    a_reduction = ( a_reduction > 1 ? 1 : a_reduction);
    const cost_dec = new Decimal( Math.floor(startcost * ( 1  - a_reduction) ) );
    return {
        startcost: startcost,
        a_reduction: a_reduction,
        cost : cost_dec.toNumber(),
        cost_dec: cost_dec
    };
};
// check how much time has passed and credit any away production
gameMod.awayCheck = (game, ticks_per_sec = 1) => {
    const now = new Date();
    const secs = ( now - game.last_update ) / 1000;
    const ticks = Math.ceil(ticks_per_sec * secs);
    const mana_delta = Decimal.mul(game.mana_per_tick, ticks);
    manaCredit(game, mana_delta);
    console.log('********** Alway Check **********');
    console.log('now: ' + now);
    console.log('game.last_update: ' + game.last_update );
    console.log('secs: ' + secs);
    console.log('ticks_per_sec: ' + ticks_per_sec);
    console.log('ticks: ' + ticks);
    console.log('mana_delta: ' + utils.formatDecimal( mana_delta, 4) );
    console.log('game start date: ' + sm.game.start_date );
    console.log('game tick: ' + sm.game.tick );
    console.log('mana_spent: ' + utils.formatDecimal( game.mana_spent , 4) );
    console.log('********** *********** **********');
};

// update the game by a given tick delta
gameMod.updateByTickDelta = (game, tickDelta, force) => {
    game.tick_last = game.tick;
    game.tick_frac += tickDelta;
    game.tick = Math.floor(game.tick_frac);
    const tick_delta = game.tick - game.tick_last;
    if(tick_delta >= 1 || force){
        game.mana_per_tick = new Decimal(0);
        // update temp, block data, mana per tick, credit mana,
        game.lands.forEachSection( (section) => {
            const d_sun = section.position.distanceTo(game.sun.position);
            const d_adjusted = d_sun - section.r - game.sun.radius;
            section.d_alpha = 1 - d_adjusted / constant.SUN_DMAX;
            section.temp = constant.TEMP_MAX * section.d_alpha;
            section.temp = game.sun.getLengthAlpha() < 0.1 ? Math.ceil(section.temp): Math.round(section.temp);
            let mana_total = new Decimal(0);
            section.forEachSlot( (slot ) => {
                const a_temp = section.temp / constant.TEMP_MAX;
                const block = slot.block;
                if(!slot.locked && block.type != 'blank'){
                    // update block here
                    block.setManaStats(game.sunspot_multi);
                    const mana_delta = Math.round(block.mana_base + block.mana_temp * a_temp);
                    game.mana_per_tick = game.mana_per_tick.add( mana_delta );
                    mana_total = mana_total.add( block.mana_value.valueOf() );
                }
            });
            section.mana_total = mana_total;
        });
        // lands mana total
        let mtl = new Decimal(0);
        game.lands.forEachSection( (section) => {
            mtl =  mtl.add(section.mana_total);
        });
        game.lands.mana_total = mtl;
        // credit current mana per tick
        const mana_delta = Decimal.mul(game.mana_per_tick, tick_delta);
        manaCredit(game, mana_delta);
        // auto save check
        if(game.autosave_ticks > 0){
            game.autosave_ticks -= tick_delta;
            game.autosave_ticks = game.autosave_ticks < 0 ? 0 : game.autosave_ticks;
            if(game.autosave_ticks === 0){
                gameMod.saveGame(game);
            }
        }
    }
    // step the sun animation
    game.sun.stepBaseAnimation();
    // sunspots delta
    game.sunspots_delta_mana_level = Decimal.pow(2, game.mana_level);
    //!!! sunspot world value base (1.005 to 10 maybe? )
    //const sunspot_world_value_base = 10;
    const sunspot_world_value_base = getSunspotWorldValueBase(game.lands.mana_total.add(1));
    game.sunspots_delta_world_value = Decimal.log(game.lands.mana_total.add(1), sunspot_world_value_base).toFixed(4);
    const spd = new Decimal(0);
    game.sunspots_delta = spd.add(game.sunspots_delta_mana_level).add(game.sunspots_delta_world_value).round();
    // set last update prop used for away production
    if(!force){
        game.last_update = new Date();
    }
};
// get sunspot multi method
gameMod.getSunSpotMulti = (sunspots) => {
    return 1 + Math.log( 1 + sunspots ) / Math.log(10);
};
// create a new game state object
gameMod.create = (opt) => {
    opt = opt || {};
    opt = Object.assign({}, constant.DEFAULT_CREATE_OPTIONS, opt);
    const game = {
       start_date: opt.start_date || new Date(),
       platform: opt.platform || null,  // MUST GIVE A PLATFORM FOR gameMod.saveGame to work
       mana: new Decimal(opt.mana),
       mana_level: opt.mana_level,
       mana_cap: 0,      // set by calling getManaCap Helper
       mana_per_tick: new Decimal(0),
       mana_spent: new Decimal(opt.mana_spent),
       supernova_count: parseInt( opt.supernova_count ),
       sunspots: new Decimal(opt.sunspots),
       sunspots_delta: new Decimal(0),
       sunspots_delta_mana_level: new Decimal(0),
       sunspots_delta_world_value: new Decimal(0),
       sunspots_multi: 1,
       tick_frac: opt.tick_frac === undefined ? 0 : opt.tick_frac,
       tick: 0,           // game should update by a main tick count
       tick_last: 0,      // last tick can be subtracted from tick to get a tick delta
       last_update: opt.last_update || new Date(),
       autosave_ticks: 0 // 1 or more ticks is the number of ticks to the next game save
    };
    game.tick = Math.floor(game.tick_frac);

    // figure sunspots_multi once here in create
    game.sunspot_multi = gameMod.getSunSpotMulti( game.sunspots.toNumber() );
    // parse last_update if string
    if(typeof game.last_update === 'string'){
         game.last_update = new Date(game.last_update);
    }
    // create sun object
    game.sun = new Sun();
    const x = opt.x === undefined ? game.sun.center.x : opt.x;
    const y = opt.y === undefined ? game.sun.center.y : opt.y;
    const v2 = new Vector2(x, y);
    game.sun.setPosByVector2(v2);

    // land objects
    game.lands = new Lands({
        sectionData: opt.sectionData
    });
    game.mana_cap = getManaCap(game);
    gameMod.updateByTickDelta(game, 0, true);
    return game;
};
// set the sun position
gameMod.setSunPos = (game, pos) => {
    game.sun.setPosByVector2(pos);
    GAME_EVENTS.dispatchEvent({ type: 'autosave_delay', game: game });
};
// get land object by x, y pos or false if nothing there
gameMod.getSectionByPos = (game, pos) => {
    let i = 0;
    while(i < constant.LAND_OBJECT_COUNT){
        const section = game.lands.sections[i];
        const d = section.position.distanceTo(pos);
        if(d < section.r){
            return section;
        }
        i += 1;
    }
    return false;
};
// unlock a slot
gameMod.unlockSlot = (game, i_section, i_slot) => {
    const section = game.lands.sections[i_section];
    const slot_clicked = section.slots[i_slot];
    const x = slot_clicked.x;
    let y = constant.SLOT_GRID_HEIGHT;
    while(y--){
        const slot = section.getSlot(x, y);
        // is the block locked?
        if(slot.locked){
            if( game.mana.gte( game.lands.slot_unlock_cost ) ){
                manaDebit(game, game.lands.slot_unlock_cost);
                slot.locked = false;
                game.lands.setBlockTypeCounts();
                break;
            }
        }
    }
    GAME_EVENTS.dispatchEvent({ type: 'autosave_delay', game: game });
};
// buy a block for the given land section and slot indices
gameMod.createBlock = (game, i_section, i_slot, level) => {
    const section = game.lands.sections[i_section];
    const slot_clicked = section.slots[i_slot];
    const x = slot_clicked.x;
    let y = constant.SLOT_GRID_HEIGHT;
    while(y--){
        const slot = section.getSlot(x, y);
        // check if the unlocked slot is blank
        if(!slot.locked && slot.block.type === 'blank'){
            const block = slot.block;
            const blockCost = 1;
            gameMod.updateByTickDelta(game, 0, true);
            if(section.bt_counts.rock < constant.BLOCK_LAND_MAX){
                if(game.mana.gte( blockCost )){
                    slot.block.setLevel(level, 'rock', 1);
                    game.lands.setBlockTypeCounts();
                    manaDebit(game, blockCost);
                    GAME_EVENTS.dispatchEvent({ type: 'autosave_delay', game: game });
                }
            }
            return;
        }
    }
    console.log('all slots are locked, there is no blank slots, or there is no mana.');
};
// upgrade block
gameMod.upgradeBlock = (game, i_section, i_slot, level_delta) => {
    level_delta = level_delta === undefined ? 1 : level_delta;
    const section = game.lands.sections[i_section];
    const slot = section.slots[i_slot];
    const block = slot.block;
    if( level_delta === 'max' ){
        level_delta = block.getMaxLevel(game.mana) - block.level;
    }
    if( String(level_delta).match(/mod/)){
        const m = parseInt(level_delta.split('mod')[1]);
        level_delta =  Math.round(m - m * ( (block.level / m % m) % 1 ));
    }
    // might not need this as long as I use this method as I should
    if(typeof level_delta === 'string'){
        console.log('level delta is still a string!? that is a problem.');
        return;
    }
    let level_target = block.level + level_delta;
    const upgrade_cost = block.getUpgradeCost(block.level, level_target);
    if(slot.locked){
        console.log('slot is locked can not upgrade.');
        return;
    }
    if( game.mana.lt( upgrade_cost ) ){
        console.log( 'Not Enough mana to upgrade.' );
        console.log( 'mana: ' + game.mana.toNumber() );
        console.log( 'upgrade cost: ' + ( utils.formatDecimal( new Decimal(upgrade_cost) ) ) );
        return;
    }
    if(block.type === 'rock' && block.level < constant.BLOCK_MAX_LEVEL && game.mana.gte( upgrade_cost ) ){
        manaDebit(game, upgrade_cost );
        block.setLevel(level_target, 'rock', 1);
        GAME_EVENTS.dispatchEvent({ type: 'autosave_delay', game: game });
    }
};
// set the given land and block index back to blank, and absorb the mana value to game.mana
gameMod.absorbBlock = (game, i_section, i_slot) => {
    const section = game.lands.sections[i_section];
    const slot = section.slots[i_slot];
    const block = slot.block;
    if(slot.locked){
        return;
    }
    if(block.type != 'blank'){
        manaCredit(game, block.mana_value.valueOf());
        block.clear();
        section.dropDownBlocks(slot);
        game.lands.setBlockTypeCounts();
    }
    GAME_EVENTS.dispatchEvent({ type: 'autosave_delay', game: game });
};
// create a save string
gameMod.createSaveString = (game) => {
    const save = {};
    save.mana = game.mana.toString();
    save.mana_spent = game.mana_spent.toString();
    save.mana_level = game.mana_level;
    save.supernova_count = game.supernova_count;
    save.sunspots = game.sunspots.toString();
    save.x = game.sun.position.x;
    save.y = game.sun.position.y;
    save.sectionData = game.lands.getSectionDataArray();
    save.last_update = game.last_update;
    save.start_date = game.start_date.toString();
    save.tick_frac = game.tick_frac;
    const text_json = JSON.stringify(save);
    const text_lz = LZString.compressToBase64(text_json);
    return text_lz
};
// save game method using whatever MS.auto_save is...
gameMod.saveGame = (game) => {
    if(game.platform){
        return game.platform.auto_save( gameMod.createSaveString( game ) );
    }
    return null;
};
// parse a save string into an options object
gameMod.parseSaveString = (text_lz) => {
    if(!text_lz){
        console.log('looks like the save string is not valid!');
        return {};
    }
    const text_json = LZString.decompressFromBase64(text_lz);
    const opt = JSON.parse(text_json);
    return opt;
};
//-------- ----------
// EXPORT
//-------- ----------
export { gameMod };
```

## 12 - Mrsun-statemachine

One major component of a game, or most applactions in general is to have somehting to serve as a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine). Simply put there is not just having a single update method called in a loop, but rather a collection of update methods to which only a single one is called at any given moment. While we are at it there is also not just having a collection of update methods but also input event handers, render funcitons, and additional hook functions also. In MrSun I have a main state machine module, and then also a collction of state objects for several states of the over all game.

### 12.1 - The Main state machine module

This is what I have togetaher for my main state machine moduoe for the game. This then contains that main update loop for the over all game, as well as the varuous functions that compose what the unaform logic is that will apply to all state objects. Speaking of the state objects I thus far have an init state, world state, and a supernova state that is the start of the Prestige mechanic of this idle game.

```js
// sm.mjs - for electionjs-example-mrsun - The main state machine module
import { gameMod }  from "../mrsun-game/game.mjs"
import { utils }  from "../mrsun-utils/utils.mjs"
import { Vector2 } from '../vector2/vector2.mjs'
import { constant } from "../mrsun-constant/constant.mjs"
//-------- ----------
// STATE OBJECTS
//-------- ----------
import { state_init } from "./state_init.mjs";
import { state_world } from "./state_world.mjs";
import { state_land } from "./state_land.mjs";
import { state_supernova } from "./state_supernova.mjs";
//-------- ----------
// DEFAULT "NOOP" PLATFORM OBJECT
//-------- ----------
const PLATFORM_NOOP = {};
// dummy auto load
PLATFORM_NOOP.auto_load = () => {
  const err = new Error('No auto load feature with this dummy MS API');
  return Promise.reject(err)
};
PLATFORM_NOOP.auto_save = () => {
    const err = new Error('No auto save feature with this dummy MS API');
    return Promise.reject(err);
};
PLATFORM_NOOP.log = (mess) => {};
//-------- ---------
// HELPER FUNCTIONS
//-------- ---------
const getPointerPos = (e) => {
    const canvas = e.target;
    const bx = canvas.getBoundingClientRect();
    const pos = new Vector2(e.clientX - bx.left, e.clientY - bx.top);
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos
};
const commonPointerAction = (sm, type, e) => {
    sm.position = getPointerPos(e);
    if(sm.currentState){
        const events = sm.currentState.events;
        if(events){
            if(events[type]){
                events[type](sm, sm.position, e, sm.currentState.data);
            }
        }
    }
};
// what to do for any keyboard action
const commonKeyboardAction = (sm, type, e) => {
    sm.keydown = type === 'keydown' ? true : false;
    let events = null;
    if(sm.currentState){
        const obj = sm.currentState.events;
        if(obj){
            events = obj;
        }
    }
    if(e.key != sm.key){
        sm.key = e.key;
        if(events.onkeyfirst){
            events.onkeyfirst(sm, sm.key, sm.keydown, e, sm.currentState.data );
        }
    }else{
        if(events.onkeyrepeat){
            events.onkeyrepeat(sm, sm.key, sm.keydown, e, sm.currentState.data );
        }
    }
    if(events.onkey){
        events.onkey(sm, sm.key, sm.keydown, e, sm.currentState.data );
    }
    
};
//-------- ---------
// PUBLIC API
//-------- ---------
const StateMachine = {};
// create and return an sm object
StateMachine.create = (opt_create) => {
    opt_create = opt_create || {};
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let container = document.body;
    if(typeof opt_create.el === 'string'){
        container = document.querySelector(opt_create.el)
    }
    if(typeof opt_create.el === 'object'){
        container = opt_create.el;
    }
    container.appendChild(canvas);
    canvas.width = 640;
    canvas.height = 480;
    const sm = {
        platform: opt_create.PLATFORM || PLATFORM_NOOP,
        canvas: canvas,
        ctx: ctx,
        game: null,
        currentStateKey: '',
        currentState: null,
        states: {},
        fps_target: 12,
        now: null,
        pointer: new Vector2(0, 0),
        keydown: false,
        key: '',
        landIndex: 0,
        ticksPerSec: 1,    // game speed is something that I think should be set here
        secs: 0,           // secs and lt are just used as a way to update game.tick count
        lt: new Date()
    };
    // Methods
    sm.setState = function(key, opt) {
        opt = opt || {};
        sm.currentStateKey = key;
        const state = sm.currentState = sm.states[sm.currentStateKey];
        state.start(sm, opt, state.data);
    };
    // APPEND STATE OBJECTS
    sm.states.init = state_init;
    sm.states.world = state_world;
    sm.states.land = state_land;
    sm.states.supernova = state_supernova;
    // POINTER EVENTS
    sm.canvas.addEventListener('pointerdown', (e) => {
        commonPointerAction(sm, 'pointerdown', e);
    });
    sm.canvas.addEventListener('pointermove', (e) => {
        commonPointerAction(sm, 'pointermove', e);
    });
    sm.canvas.addEventListener('pointerup', (e) => {
        commonPointerAction(sm, 'pointerup', e);
    });
    // document events
    // VISIBILITY CHANGE EVENT
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
    document.addEventListener("visibilitychange", (evnt) => {
        // final save on quit, or any visibilitychange event
        if(sm.game){
            gameMod.saveGame(sm.game);
        }
    });
    // WINDOW EVENTS
    // canvas resize
    const setCanvasScale = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if(w / 4 < h / 3){
            sm.canvas.style.width = w + 'px';
            sm.canvas.style.height = Math.floor(3 * w / 4) + 'px';
        }
        if(w / 4 > h / 3){
            sm.canvas.style.width = Math.floor(h / 3 * 4) + 'px';
            sm.canvas.style.height = h + 'px';
        }
    };
    setCanvasScale();
    window.addEventListener('resize', (e) => {
        setCanvasScale();
    });
    window.addEventListener('keydown', (e) => {
        commonKeyboardAction(sm, 'keydown', e);
    });
    window.addEventListener('keyup', (e) => {
        commonKeyboardAction(sm, 'keyup', e);
    });
    // MAIN APP LOOP
    sm.loop = () => {
        sm.now = new Date();
        sm.secs = ( sm.now - sm.lt ) / 1000;
        requestAnimationFrame(sm.loop);
        if(sm.secs > 1 / sm.fps_target){
           const state = sm.currentState;
           const data = state.data;
           state.update(sm, sm.secs, data);
           state.render(sm, sm.ctx, sm.canvas, data);
           sm.lt = sm.now;
        }
    };
    return sm;
};
// start the state machine
StateMachine.start = (sm) => {
    Object.keys(sm.states).forEach( (stateKey) => {
        const state = sm.states[stateKey];
        if(state.init){
             state.init.call(state, sm, state.data, state)
        }
    });
    sm.setState('init', {});
    sm.loop();
};
//-------- ----------
// EXPORT
//-------- ----------
export { StateMachine };

```

### 12.2 - The init state

The init state is what will be used just once when the game starts up for the very first time. In this state I do things likie check of there is a save state, and if not start a new game. Once the init state is done with what it needs to do I then just start the main world state.

```js
// state_init.mjs - for electionjs-example-mrsun
import { gameMod }  from "../mrsun-game/game.mjs"
import { constant } from "../mrsun-constant/constant.mjs"
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const load_game = (sm) => {
    return sm.platform.auto_load()
    .then( (text_lz) => {
        console.log('Autoload worked, looks like we have a string to parse...');
        const opt_game = gameMod.parseSaveString(text_lz);
        sm.game = gameMod.create(Object.assign(opt_game, { platform: sm.platform }));
        gameMod.awayCheck(sm.game, sm.ticksPerSec);
        sm.setState('world', {});
    })
    .catch((e) => {
        console.log('Error with autoload. Starting new game.');
        console.log('message: ' + e.message);
        const opt_game = gameMod.parseSaveString(constant.SAVE_STRING);
        sm.game = gameMod.create(Object.assign(opt_game, { platform: sm.platform }));
        sm.setState('world', {});
    });
}
//-------- ----------
// STATE OBJECT FOR INIT
//-------- ----------
const state_init = {
    data: {
        stuck_ct: 0
    },
    start: (sm, opt) => {
       console.log('init of mr sun.');
       load_game(sm);
    },
    update: (sm, secs) => {
        const data = sm.states.init.data;
        if(!sm.game){
            data.stuck_ct += 1;
            if(data.stuck_ct >= 20){
               console.log('stuck in init state for some reason...');
               data.stuck_ct = 0;
            }else{
                //console.log(data.stuck_ct);
            }
        }
    },
    render: (sm, ctx, canvas) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
};
//-------- ----------
// EXPORT
//-------- ----------
export { state_init };
```

### 12.3 - The world state

The world state is where I can chnage the position of the sun relative to the other land sections objects that are around it. It is also where I can get an over all view of each land state object, but in order to do anything with a given land state object I must switch to the land state.

```js
// state_world.mjs - for electionjs-example-mrsun
import { gameMod }  from "../mrsun-game/game.mjs"
import { utils }  from "../mrsun-utils/utils.mjs"
import { Vector2 } from '../vector2/vector2.mjs'
import { constant } from "../mrsun-constant/constant.mjs"
//-------- ----------
// RENDER FUNCTIONS 
//-------- ----------
// render the background
const render_background = (sm, ctx, canvas, data) => {
    ctx.lineWidth = 1;
    ctx.font = '15px arial';
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0, canvas.width, canvas.height);
};
// render the sunarea
const render_sunarea = (sm, ctx, canvas, data) => {
    const sun = sm.game.sun;
    // sun area
    const md = constant.SUNAREA_RADIUS;
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(sun.center.x, sun.center.y, md, 0, Math.PI * 2);
    ctx.fill();
    // sun back
    ctx.fillStyle = 'rgba(255,255,0,0.5)';
    ctx.beginPath();
    ctx.arc(sun.position.x, sun.position.y, sun.radius, 0, Math.PI * 2);
    ctx.fill();
};
// render the world state display
const render_display = (sm, ctx, canvas, data) => {
    // disp
    utils.drawCommonDisp(sm, ctx, canvas);
    // world disp
    ctx.font = '9px monospace';
    const sx = 10, sy = 45, yd = 9;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('rocks: ' + sm.game.lands.bt_counts.rock, sx, sy);
    ctx.fillText('slots unlocked: ' + sm.game.lands.slot_unlock_count + '/' + sm.game.lands.slot_total,sx, sy + yd * 1);
    ctx.fillText('mana level: ' + sm.game.mana_level, sx, sy + yd * 2);
    ctx.fillText('world mana total: ' + utils.formatDecimal(sm.game.lands.mana_total), sx, sy + yd * 3);
    ctx.fillText('ss mana  : ' + sm.game.sunspots_delta_mana_level, sx, sy + yd * 4);
    ctx.fillText('ss value : ' + sm.game.sunspots_delta_world_value, sx, sy + yd * 5);
    ctx.fillText('ss delta : ' + sm.game.sunspots_delta, sx, sy + yd * 6);
    utils.drawButton(sm, data.button_supernova, sm.ctx, sm.canvas);
};
// render just the text for the given land section object
const render_section_text = (ctx, section) => {
    ctx.font = 'bold 30px arial';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(section.temp, section.position.x, section.position.y);
    ctx.strokeText(section.temp, section.position.x, section.position.y);
};
// RENDER BASIC AND DETAIL
const render_basic = (sm, ctx, canvas, data) => {
    render_background(sm, ctx, canvas, data);
    render_sunarea(sm, ctx, canvas, data);
    sm.game.lands.sections.forEach((section, i) => {
        render_section_text(ctx, section);
    });
    render_display(sm, ctx, canvas, data)
};
const render_detail = (sm, ctx, canvas, data) => {
    render_background(sm, ctx, canvas, data);
    render_sunarea(sm, ctx, canvas, data);
    utils.drawSprite(sm.game.sun, ctx, canvas);
    sm.game.lands.sections.forEach((section, i) => {
        //section.sprite_world.update();
        utils.drawSprite(section.sprite_world, ctx, canvas);
        render_section_text(ctx, section);
    });
    render_display(sm, ctx, canvas, data)
};
//-------- ----------
// STATE OBJECT FOR WORLD 
//-------- ----------
const state_world = {
    data: {
        button_supernova : {  desc: 'Supernova', position: new Vector2(580, 420), r: 40 },
    },
    start: (sm, opt) => {
        const sun = sm.game.sun;
        // as long as I do not have to update on a tick by tick basis
        // I can call the sprite_world update method here in the start hook
        sm.game.lands.sections.forEach((section, i) => {
            section.sprite_world.update();
        });
    },
    update: (sm, secs) => {
       gameMod.updateByTickDelta(sm.game, sm.ticksPerSec * secs, false);
    },
    render: (sm, ctx, canvas, data) => {
        render_detail(sm, ctx, canvas, data);
    },
    events: {

        pointerdown : (sm, pos, e, data) => {
            const sun = sm.game.sun;
            const d = pos.distanceTo(sun.center);
            // clicked in the sun area?
            if(d < constant.SUNAREA_RADIUS){
                gameMod.setSunPos(sm.game, pos);
                return;
            }
            // clicked land object?
            const land = gameMod.getSectionByPos(sm.game, pos);
            if(land){
                sm.landIndex = land.i;
                sm.setState('land', {});
                return;
            }
            // was supernova button clicked?
            utils.button_check(data, 'button_supernova', pos, () => {
                sm.setState('supernova', {});
            });
        },
        onkey: (sm, key, down, e, data) => {
            const sun = sm.game.sun;
            if(down){
                const a_lencurrent = sun.getLengthAlpha();
                if(key ==='ArrowRight'){
                    sun.stepDirByIndex(1, 1);
                }
                if(key ==='ArrowLeft'){
                    sun.stepDirByIndex(-1, 1);
                }
                if(key ==='ArrowUp'){
                    sun.stepLengthByIndex(1, 10);
                }
                if(key ==='ArrowDown'){
                    sun.stepLengthByIndex(-1, 10);
                }
                if(key.toLowerCase() ==='c'){
                    sun.centerPos();
                }
            }
        },
        onkeyfirst: (sm, key, down, e, data) => {},
        onkeyrepeat: (sm, key, down, e, data) => {}
    }
};
//-------- ----------
// EXPORT
//-------- ----------
export { state_world };
```

### 12.4 - The land state

The land state is where I can get into the world building aspect of this game that I have in mind. Here I can unlock slot objects, and when doing so I can create or absorbe a rock type block. These blocks are then what will generate mana which is the main currency of interest in this. The rate at which mana is gained is then impacted by the position of the sun with resptect to a tempature mana gain value.

```js
// state_land.mjs - for electionjs-example-mrsun
import { gameMod }  from "../mrsun-game/game.mjs"
import { utils }  from "../mrsun-utils/utils.mjs"
import { Vector2 } from '../vector2/vector2.mjs'
import { constant } from "../mrsun-constant/constant.mjs"
//-------- ----------
// STATE OBJECT FOR LAND
//-------- ----------
const state_land = {
    data: {
        block_mode: 'unlock',    // 'unlock', 'create', 'absorb', 'upgrade', and 'info' modes
        block_info_disp: false,  // display block info or not?
        block: null,
        button_back : {  desc: 'Back', position: new Vector2(600, 38), r: 32 },
        button_next : {  desc: 'Next', position: new Vector2(640 - 60, 430), r: 30 },
        button_last : {  desc: 'Last', position: new Vector2(60, 430), r: 30 },
        // 'Block Mode' buttons
        button_bm_unlock :  {  active: true, desc: 'Unlock', position: new Vector2(35, 125), r: 25 },
        button_bm_create :  {  active: false, desc: 'Create', position: new Vector2(35, 180), r: 25 },
        button_bm_absorb :  {  active: false, desc: 'Absorb', position: new Vector2(35, 235), r: 25 },
        button_bm_upgrade : {  active: false, 
                               options: ['1x', '2x', '5x', 'mod5', 'max'],
                               i_option: 3,
                               desc: 'Upgrade',
                               position: new Vector2(35, 290), r: 25 },
        button_bm_info :    {  active: false, desc: 'Info', position: new Vector2(35, 345), r: 25 },
        grid_cx: 320,
        grid_cy: 240,
        grid_w: 0, grid_h:0,
        block_width: 50,
        block_height: 35,
        grid_radian: 0,
        block_infodisp: true
    },
    // the init hook will ONLY BE CALLED ONCE when the state machine is started
    init: (sm, data) => {
        console.log('init hook for land state');
        data.grid_w = data.block_width * constant.SLOT_GRID_WIDTH;
        data.grid_h = data.block_height * constant.SLOT_GRID_HEIGHT;
    },
    // the start hook will be called each time this state is started
    start: (sm, opt, data) => {
        console.log('land state start...');
        const lands = sm.game.lands;
        const bt_counts = sm.game.lands.bt_counts;
        utils.button_set(data, 'unlock');
        if(lands.slot_unlock_count > 0 && bt_counts.rock === 0 ){
            console.log('more than zero slots unlocked, but no rocks? So create then yes.');
            utils.button_set(data, 'create');
        }
        if(bt_counts.rock > 0){
            console.log('more than 1 rock, so upgrade then maybe.');
            utils.button_set(data, 'upgrade');
        }
    },
    // update called in main app loop function
    update: (sm, secs, data) => {
        gameMod.updateByTickDelta(sm.game, sm.ticksPerSec * secs, false);
    },
    render: (sm, ctx, canvas, data) => {
        ctx.lineWidth = 1;
        const sun = sm.game.sun;
        const section = sm.game.lands.sections[sm.landIndex];
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        // the sprite object for land state
        section.sprite_land.update();
        utils.drawSprite(section.sprite_land, ctx, canvas);
        // render blocks
        //ctx.globalAlpha = 1;
        utils.drawLandSection(sm, ctx, canvas, section, data);
        //ctx.globalAlpha = 1;
        // buttons
        utils.drawButton(sm, data.button_back, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_next, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_last, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_bm_unlock, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_bm_create, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_bm_absorb, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_bm_upgrade, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_bm_info, sm.ctx, sm.canvas);
        // common disp
        utils.drawCommonDisp(sm, ctx, canvas);
        // land disp
        ctx.font = '10px arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('temp: ' + section.temp, 15, 45);
        ctx.fillText('rocks: ' + section.bt_counts.rock, 15, 55);
        ctx.fillText('slot unlock cost: ' + utils.formatDecimal(sm.game.lands.slot_unlock_cost, 4), 15, 65);
        ctx.fillText('section mana value: ' +  utils.formatDecimal(section.mana_total) +
                     ', sunspots delta world value: ' + sm.game.sunspots_delta_world_value + '', 15, 75);
        // current land index
        ctx.font = '50px arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('LAND ' + sm.landIndex, 320, 430);
        if(data.block_info_disp){
            const sx = 320 - 150, sy = 240 - 100;
            const block = data.block;
            ctx.fillStyle = 'rgba(0,0,0, 0.5)';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillRect(sx, sy, 300, 200)
            ctx.font = '20px arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'black';
            ctx.fillText('type: ' + block.type, 320, sy + 20);
            ctx.fillText('mana_value: ' + utils.formatDecimal(block.mana_value.valueOf(), 4),320, sy + 40   );
            ctx.fillText('mana_base: ' + block.mana_base.toFixed(2), 320, sy + 60   );
            ctx.fillText('mana_temp: ' + block.mana_temp.toFixed(2), 320, sy + 80   );
        }
    },
    events: {
        pointerdown: (sm, pos, e, data) => {
            const section = sm.game.lands.sections[sm.landIndex];
            if(data.block_info_disp){
                data.block_info_disp = false;
            }else{
                // check buttons
                utils.button_check(data, 'button_back', pos, () => {
                    sm.setState('world', {});
                });
                utils.button_check(data, 'button_next', pos, () => {
                    sm.landIndex = (sm.landIndex + 1) % 12;
                });
                utils.button_check(data, 'button_last', pos, () => {
                    let n = sm.landIndex - 1;
                    n = n < 0 ? 11 : n;
                    sm.landIndex = n;
                });
                utils.button_check_blockmode(data, 'unlock', pos);
                utils.button_check_blockmode(data, 'create', pos);
                utils.button_check_blockmode(data, 'absorb', pos);
                utils.button_check_blockmode(data, 'upgrade', pos);
                utils.button_check_blockmode(data, 'info', pos);
                // grid clicked?
                const sx = data.grid_cx - data.grid_w / 2;
                const sy = data.grid_cy - data.grid_h / 2;
                if( utils.boundingBox(pos.x, pos.y, 1, 1, sx, sy, data.grid_w, data.grid_h) ){
                    const bx = Math.floor( ( pos.x - sx - 0.01) / data.block_width );
                    const by = Math.floor( ( pos.y - sy - 0.01) / data.block_height );
                    const i = by * constant.SLOT_GRID_WIDTH + bx;
                    const slot = section.slots[i];
                    const block = slot.block;
                    // action will differ based on block mode
                    if(data.block_mode === 'unlock'){
                        gameMod.unlockSlot(sm.game, sm.landIndex, i);
                    }
                    if(data.block_mode === 'create'){
                        gameMod.createBlock(sm.game, sm.landIndex, i, 1);
                    }
                    if(data.block_mode === 'absorb'){
                        gameMod.absorbBlock(sm.game, sm.landIndex, i);
                    }
                    if(data.block_mode === 'upgrade'){
                        const button = data.button_bm_upgrade;
                        if(button.i_option === 0){
                            console.log('1x upgrade');
                            gameMod.upgradeBlock(sm.game, sm.landIndex, i, 1);
                        }
                        if(button.i_option === 1){
                            console.log('2x upgrade');
                            gameMod.upgradeBlock(sm.game, sm.landIndex, i, 2);
                        }
                        if(button.i_option === 2){
                            console.log('5x upgrade');
                            gameMod.upgradeBlock(sm.game, sm.landIndex, i, 5);
                        }
                        if(button.i_option === 3){
                            console.log('mod5 upgrade');
                            gameMod.upgradeBlock(sm.game, sm.landIndex, i, 'mod5');
                        }
                        if(button.i_option === 4){
                            console.log('Max Upgrade!');
                            gameMod.upgradeBlock(sm.game, sm.landIndex, i, 'max');
                        }
                    }
                    if(data.block_mode === 'info'){
                        data.block_info_disp = true;
                        data.block = block;
                        gameMod.saveGame(sm.game);
                    }
                }
            }
        }
    }
};
//-------- ----------
// EXPORT
//-------- ----------
export { state_land };
```

### 12.5 - The super nova state \( Prestige mechanic \)

A common machanic to have in idle games is something that is often refered to as a [Prestige mechanic](https://www.youtube.com/watch?v=aYFHUq-8gPY). For my Mr Sun electionjs example prototype I am calling this kind of machanic a [supernova event](https://en.wikipedia.org/wiki/Supernova) which just strikes me as a good name for it with resptect to the over all theme of this project.

```js
// state_supernova.mjs - for electionjs-example-mrsun
import { gameMod }  from "../mrsun-game/game.mjs"
import { utils }  from "../mrsun-utils/utils.mjs"
import { Vector2 } from '../vector2/vector2.mjs'
import { constant } from "../mrsun-constant/constant.mjs"
//-------- ----------
// RENDER FUNCTIONS 
//-------- ----------
// render the background
const render_background = (sm, ctx, canvas, data) => {
    ctx.lineWidth = 1;
    ctx.font = '15px arial';
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0, canvas.width, canvas.height);
};
//-------- ----------
// STATE OBJECT FOR SUPERNOVA
//-------- ----------
const state_supernova = {
    data: {
        button_back : {  desc: 'Back', position: new Vector2(600, 38), r: 32 },
        button_newgame : {  desc: 'New Game', position: new Vector2(580, 420), r: 40 }
    },
    start: (sm, opt) => {},
    update: (sm, secs) => {
       gameMod.updateByTickDelta(sm.game, sm.ticksPerSec * secs, false);
    },
    render: (sm, ctx, canvas, data) => {
        // super nova cost object
        const snc = gameMod.getSupernovaCost(sm.game);
        // background
        render_background(sm, ctx, canvas, data);
        utils.drawButton(sm, data.button_back, sm.ctx, sm.canvas);
        utils.drawButton(sm, data.button_newgame, sm.ctx, sm.canvas);
        // disp
        utils.drawCommonDisp(sm, ctx, canvas);
        const sx = 10, sy = 100, yd = 25;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '20px monospace';
        ctx.fillText('current sunspots : ' + utils.formatDecimal(sm.game.sunspots, 4), sx, sy);
        ctx.fillText('sunspots delta   : ' + utils.formatDecimal(sm.game.sunspots_delta, 4), sx, sy + yd * 1);
        const dec = sm.game.sunspots.add( sm.game.sunspots_delta );
        const m = gameMod.getSunSpotMulti( dec.toNumber() );
        ctx.fillText('new sunspots   : ' + utils.formatDecimal(dec, 4), sx, sy + yd * 4 );
        ctx.fillText('new multiplier   : ' + m.toFixed(4) + 'x', sx, sy + yd * 5 );
        const ts = utils.formatDecimal(sm.game.mana_spent, 2)
        ctx.fillText('total mana spent   : ' + ts, sx, sy + yd * 6 );
        ctx.fillText('supernova count   : ' + sm.game.supernova_count, sx, sy + yd * 7 );
        ctx.fillText('supernova cost   : ' + utils.formatDecimal(snc.cost_dec, 2), sx, sy + yd * 8 );
    },
    events: {
        pointerdown : (sm, pos, e, data) => {
            // was the back button clicked?
            utils.button_check(data, 'button_back', pos, () => {
                sm.setState('world', {});
            });
            // was supernova button clicked?
            utils.button_check(data, 'button_newgame', pos, () => {
                const snc = gameMod.getSupernovaCost(sm.game);
                if( sm.game.mana.gte( snc.cost_dec ) ){
                    const sp = sm.game.sunspots.add(sm.game.sunspots_delta);
                    const start_date = sm.game.start_date;
                    sm.game = gameMod.create({ 
                        platform: sm.platform,
                        supernova_count: parseInt(sm.game.supernova_count) + 1,
                        sunspots: sp.toString(),
                        start_date: start_date
                    });
                    console.log('starting a new game with: ');
                    console.log( sm.game.sunspots );
                    console.log( sm.game.start_date );
                    sm.setState('world', {});
                }else{
                    console.log('not enough mana!');
                }
            });
        }
    }
};
//-------- ----------
// EXPORT
//-------- ----------
export { state_supernova };
```

## 13 - mrsun-utils

I have a general utilties module which is where I just pack all kinds of metghods that I might use more than once accross a bunch of files, but can not think of any other place to park it. Seems that lots of popular libaries have a module such as this that is just a function junk drawer.

```js
// utils.js - for electionjs-example-mrsun
import { Decimal }  from "../decimal/10.4.3/decimal.mjs"
import { constant } from "../mrsun-constant/constant.mjs"
//-------- ----------
// MAIN UTILS PUBLIC OBJECT
//-------- ----------
const utils = {};
//-------- ----------
// BUTTON METHODS
//-------- ----------
// set the current button by mode string
utils.button_set = (data, mode) => {
    const key = 'button_bm_' + mode;
    const button = data[key];
    data['button_bm_' + data.block_mode].active = false;
    button.active = true;
    data.block_mode = mode;
};
utils.button_check = (data, key, pos, onClick) => {
    const button = data[key];
    if( button.position.distanceTo( pos ) <= button.r ){
        onClick(button, data, key, pos);
    }
};
utils.button_check_blockmode = (data, new_block_mode, pos) => {
    const key = 'button_bm_' + new_block_mode;
    utils.button_check(data, key, pos, (button) => {
        const button_bm_current = data['button_bm_' + data.block_mode];
        if(button_bm_current === button){
            console.log('block mode button all ready selected.');
            if(button.options){
                console.log('we have options though. I can step that.');
                button.i_option += 1;
                button.i_option %= button.options.length;
            }
        }
        if(button_bm_current != button){
            console.log('block mode switch');
            button_bm_current.active = false;
            button.active = true;
            data.block_mode = new_block_mode;
        }
    });
};
//-------- ----------
// MATH UTILIES
//-------- ----------
utils.logOnce = (function(){
    let count = 0;
    return (mess) => {
       if(count < 1){
           console.log(mess)
       }
       count += 1;
    };
}());
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
// format a decimal object
utils.formatDecimal = (function(){
    const NAMES = [ 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc' ];
    return (n, dp) => {
        dp = dp === undefined ? 2 : dp;
        if(n.e < 3){
            return n.toString();
        }
        const er = n.e % 3;
        const i_name = Math.floor( n.e / 3 ) - 1;
        const a = parseFloat( n.toExponential(dp, Decimal.ROUND_DOWN).split('e')[0] );
        if(i_name < NAMES.length){
            let dp2 = dp - er;
            dp2 = dp2 < 0 ? 0: dp2;
            return (a * Math.pow( 10, er ) ).toFixed( dp2 ) + '' + NAMES[i_name];
        }
        return n.toExponential(dp);
    };
}());
// add up pows from start exp down to zero
utils.addPows = (base, exp_start, exp_end) => {
    exp_end = exp_end === undefined ? 0 : exp_end;
    let e = exp_start;
    let n = 0;
    while(e >= exp_end){
        const p = Math.pow(base, e);
        n += p;
        e -= 1;
    }
    return n;
};
//-------- ----------
// RENDER UTILIES
//-------- ----------
// draw a button
utils.drawButton = ( sm, button, ctx, canvas ) => {
    ctx.fillStyle = button.active ? '#004400' : '#444444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(button.position.x, button.position.y, button.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // desc
    ctx.fillStyle = 'white';
    ctx.font = '12px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(button.desc || 'foo', button.position.x, button.position.y);
    // if options draw text for current option
    if(button.options){
        ctx.font = '10px arial';
        const str = button.options[button.i_option];
        ctx.fillText(str, button.position.x, button.position.y + 14);
    }
};
utils.drawSprite = (sprite, ctx, canvas) => {
    ctx.strokeStyle = '#00ff00';
    ctx.save();
    ctx.translate( sprite.position.x, sprite.position.y );
    if(sprite.sheets){
        let i_sheet = 0, len = sprite.sheets.length;
        while(i_sheet < len){
            const source = sprite.getCell(i_sheet);
            ctx.drawImage(sprite.sheets[i_sheet].image, 
                source.sx, source.sy, source.sw, source.sh,
                sprite.size.x / 2 * -1, sprite.size.y / 2 * -1, sprite.size.x, sprite.size.y 
            );
            i_sheet += 1;
        }
    }
    if(sprite.sheets.length === 0){
        ctx.beginPath();
        ctx.rect(sprite.size.x / 2 * -1, sprite.size.y / 2 * -1, sprite.size.x, sprite.size.y);
        ctx.stroke();
    }
    ctx.restore();
};
// draw a common display that you would want to have over all states
utils.drawCommonDisp = (sm, ctx, canvas) => {
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    // mana bar
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(10, 4, 250, 17);
    ctx.fillStyle = '#0044dd';
    const a_mana = sm.game.mana.div(sm.game.mana_cap);
    ctx.fillRect(10, 4, 250 * a_mana, 17);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('mana: ' + utils.formatDecimal(sm.game.mana, 2) + ' / ' +
         utils.formatDecimal(sm.game.mana_cap, 2) + 
         ' (+' + utils.formatDecimal(sm.game.mana_per_tick, 4) + ') ', 15, 5);
    // sunspots count
    ctx.fillStyle = '#888888';
    ctx.fillText('sunspots: ' + utils.formatDecimal( sm.game.sunspots, 2 ) + ' (' + sm.game.sunspot_multi.toFixed(2) + 'X)', 275, 5);
    // tick count
    ctx.fillText('tick: ' + sm.game.tick, 10, 25);
};
// draw the state of a given LandSection object
utils.drawLandSection = (sm, ctx, canvas, section, opt ) => {
    opt = opt || {};
    opt.block_infodisp = opt.block_infodisp || false;
    ctx.save();
    ctx.translate(opt.grid_cx , opt.grid_cy);
    ctx.rotate(opt.grid_radian);
    const sx = opt.grid_w / 2 * -1;
    const sy = opt.grid_h / 2 * -1;
    let i = 0;
    ctx.font = '10px arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    while(i < constant.SLOT_GRID_LEN){
        const bx = i % constant.SLOT_GRID_WIDTH;
        const by = Math.floor(i / constant.SLOT_GRID_WIDTH);
        const i_slot = by * constant.SLOT_GRID_WIDTH + bx;
        const slot = section.slots[i_slot];
        const block = slot.block;
        ctx.fillStyle = 'cyan';
        if(!slot.locked){
            ctx.fillStyle = block.type === 'blank' ? 'black' : 'red';
        }
        // render a block
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        const x = sx + opt.block_width * bx;
        const y = sy + opt.block_height * by;
        ctx.rect(x, y, opt.block_width, opt.block_height);
        //ctx.fill();
        ctx.stroke();
        // level text
        if(block.type === 'rock' && opt.block_infodisp){
            ctx.fillStyle = 'white';
            ctx.fillText(block.level, x + 5, y + 5);
        }
        i += 1;
    }
    ctx.restore();
};
//-------- ----------
// FORMAT DECIMAL TEST
//-------- ----------
/*
const total = 960;
let unlock_count = 0;
while(unlock_count < total){
    const n = Decimal.pow(10, 30 * ( unlock_count / total ) ).ceil().sub(1);
    console.log( unlock_count, utils.formatDecimal(n, 2), n.toExponential(8) );
    unlock_count += 1;
}
*/
//-------- ----------
// EXPORT
//-------- ----------
export { utils };
```

## 14 - main electionjs

I then just have one main module where I create a main state machine object, and then just start that object once I have that. For now with this prototype I just have this working as an Electronjs applaction. However when I do start to work on the final project of this I am going to want to at least have a Browser version of the game as well. This is why I pass a PLATFROM option when calling the main state machine create method. For Electionjs this is the API that I define in my preload.js file, but with a Browser version I am going to what to have another platform that will be a pure web only version of that API. 

I can also if need be make more that one preload.js file if need be for certian Operating systems that might prove to be problamatic allowing me to make one that will work well with that platform without breaking somehting that works fine for others.

```js
import { StateMachine }  from "./js/mrsun-statemachine/sm.mjs"
// create sm object that will use PLATFORM_ELECTRON
const sm = window.sm = StateMachine.create({
    el: document.getElementById('wrap_main'),
    PLATFORM: PLATFORM_ELECTRON
});
// start it up
StateMachine.start(sm);
```


## Conclusion

So that is the general overview for this electronjs project exmaple of an idel game. I really put a whole lot of time into this one so it is safe to say that I will be treating this exmaple the same way as I have with my [video creation tool project example](/2022/03/10/electronjs-example-videoground). Simply put this means that it is going to get its own repo and I am going to continig working on it a little more now and then which is not always the case with some of these electionjs exmaple projects that I have made thus far. Many of them are just prototypes, but some of them I continue working on if they are software tools that I use everyday, or enought people start to show interest. This game might prove to be one of those projects as I find myself getting addicted to my own game Tony Montana style.




