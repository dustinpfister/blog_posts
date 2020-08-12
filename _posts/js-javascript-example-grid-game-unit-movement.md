---
title: grid game unit movement javaScript example
date: 2020-08-11 09:40:00
tags: [js]
layout: post
categories: js
id: 694
updated: 2020-08-12 09:12:14
version: 1.2
---

So this week I started working on a new canvas example prototype, and the very first minor release of the prototype thus far strikes me as something good to write about as a simple stand alone javaScript example. Thus far it is just a simple example of having a grid, and having a unit move around i the grid when a player clicks on a given cell location. It may seem as a very simple, trivial example, and for a veteran javaScript developer I suppose it is. However there are still many topics that are covered when it comes to just getting to this simple starting point, and also even when it comes to being an experienced javaScript developer there is the topic of how to go about structuring a complex projects that might at one point in the future consist of thousands of lines of code.

The basic idea that I have together thus far with it could be taken in a whole range of different directions when it comes to making it into something that is more of a game beyond that of what I have in mind for the canvas example prototype. So I thought I would copy and past the source code over to another location and maintain it as just a simple starting point for a grid type game that involves moving a unit around one or more grids.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.bb=function(a,b){return!((a.y+a.h)<b.y||a.y>(b.y+b.h)||(a.x+a.w)<b.x||a.x>(b.x+b.w));};utils.clamp=function(obj,box){var xMax=box.x+box.w-obj.w,yMax=box.y+box.h-obj.h;obj.x=obj.x>xMax?xMax:obj.x;obj.y=obj.y>yMax?yMax:obj.y;obj.x=obj.x<box.x?box.x:obj.x;obj.y=obj.y<box.y?box.y:obj.y;};utils.angleToPoint=function(x1,y1,x2,y2,scale){scale=scale===undefined?Math.PI*2:scale;var aTan=Math.atan2(y1-y2,x1-x2);return(aTan+Math.PI)/(Math.PI*2)*scale;};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};};var mapMod=(function(){var api={};var createCells=function(map){var cells=[];var len=map.w*map.h,i=0;while(i<len){cells.push({i:i,x:i%map.w,y:Math.floor(i/map.w),unit:false});i+=1;}return cells;};api.get=function(map,x,y){if(x<0||y<0||x>=map.w||y>=map.h){return false;}return map.cells[y*map.w+x];};api.getCellByPointer=function(map,x,y){var cx=Math.floor((x-map.margin.x)/map.cellSize),cy=Math.floor((y-map.margin.y)/map.cellSize);return api.get(map,cx,cy)};api.create=function(opt){opt=opt||{};var map={w:opt.w||9,h:opt.h||7,cellSize:32,margin:{x:5,y:5},cells:[]};map.cells=createCells(map);return map;};return api;}());var gameMod=(function(){var createBaseUnit=function(){return{HP:100,maxHP:100,weaponIndex:0,sheetIndex:1,currentCell:false,active:false}};var createPlayerUnit=function(){var player=createBaseUnit();player.active=true;player.sheetIndex=0;return player;};var placeUnit=function(game,unit,x,y){var map=game.maps[game.mapIndex];var newCell=mapMod.get(map,x,y);if(newCell){if(unit.currentCell){map.cells[unit.currentCell.i].unit=false;}unit.currentCell=newCell;map.cells[unit.currentCell.i].unit=unit;}};var setupGame=function(game){game.mapIndex=0;var map=game.maps[game.mapIndex];placeUnit(game,game.player,0,0);};var api={};api.create=function(opt){opt=opt||{};var game={mode:'map',maps:[],mapIndex:0,targetCell:false,player:createPlayerUnit()};game.maps.push(mapMod.create());setupGame(game); return game;};api.update=function(game,secs){var cell,radian,target;if(target=game.targetCell){cell=game.player.currentCell;if(target!=cell){radian=utils.angleToPoint(cell.x,cell.y,target.x,target.y);var cx=Math.round(cell.x+Math.cos(radian)),cy=Math.round(cell.y+Math.sin(radian));placeUnit(game,game.player,cx,cy);game.targetCell=false;}}};return api;} ());var draw=(function(){var unitColors=['blue','red'];return{back:function(sm){var canvas=sm.canvas,ctx=sm.ctx;ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);},map:function(sm){var canvas=sm.canvas,ctx=sm.ctx,map=sm.game.maps[sm.game.mapIndex];var cs=map.cellSize,i=0,x,y,len=map.cells.length,cell;while(i<len){cell=map.cells[i];x=map.margin.x+cell.x*cs;y=map.margin.y+cell.y*cs;ctx.fillStyle='green';ctx.beginPath();ctx.rect(x,y,32,32);ctx.fill();ctx.stroke();if(cell.unit){ctx.fillStyle=unitColors[cell.unit.sheetIndex];ctx.beginPath();ctx.rect(x,y,32,32);ctx.fill();ctx.stroke();} i+=1;}},info:function(sm){var ctx=sm.ctx,canvas=sm.canvas;ctx.fillStyle='white';ctx.font='10px courier';ctx.textBaseline='top';var pos=sm.input.pos;ctx.fillText('pointerDown: '+sm.input.pointerDown+' pos: '+pos.x+','+pos.y,10,10);var cell=sm.game.targetCell;var target=cell?cell.x+','+cell.y:false;ctx.fillText('v'+sm.ver,1,canvas.height-11);}}} ());(function(){var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var sm={ver:'0.0.0',game:gameMod.create(),canvas:canvas,ctx:ctx,input:{pointerDown:false,pos:{x:0,y:0}}};var pointerHanders={start:function(sm,e){var pos=sm.input.pos;sm.input.pointerDown=true;var cell=mapMod.getCellByPointer(sm.game.maps[sm.game.mapIndex],pos.x,pos.y);if(cell){sm.game.targetCell=cell;}},move:function(sm,e){},end:function(sm,e){sm.input.pointerDown=false;}};var createPointerHandler=function(sm,type){return function(e){sm.input.pos=utils.getCanvasRelative(e);pointerHanders[type](sm,e);};};canvas.addEventListener('mousedown',createPointerHandler(sm,'start'));canvas.addEventListener('mousemove',createPointerHandler(sm,'move'));canvas.addEventListener('mouseup',createPointerHandler(sm,'end'));var loop=function(){requestAnimationFrame(loop);gameMod.update(sm.game);draw.back(sm);draw.map(sm);draw.info(sm);};loop();} ());</script>

## 1 -

```js
// UTILS
var utils = {};
// bounding box
utils.bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};
// clamp
utils.clamp = function (obj, box) {
    var xMax = box.x + box.w - obj.w,
    yMax = box.y + box.h - obj.h;
    obj.x = obj.x > xMax ? xMax : obj.x;
    obj.y = obj.y > yMax ? yMax : obj.y;
    obj.x = obj.x < box.x ? box.x : obj.x;
    obj.y = obj.y < box.y ? box.y : obj.y;
};
 
utils.angleToPoint = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? Math.PI * 2 : scale;
    var aTan = Math.atan2(y1 - y2, x1 - x2);
    return (aTan + Math.PI) / (Math.PI * 2) * scale;
};
 
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
```

## 2 - map

```js
var mapMod = (function () {
 
    var api = {};
 
    var createCells = function (map) {
        var cells = [];
        var len = map.w * map.h,
        i = 0;
        while (i < len) {
            cells.push({
                i: i,
                x: i % map.w,
                y: Math.floor(i / map.w),
                unit: false // reference to current unit here or false if empty
            });
            i += 1;
        }
        return cells;
    };
 
    // return a cell at the given position, or false for out of bounds values
    api.get = function (map, x, y) {
        if (x < 0 || y < 0 || x >= map.w || y >= map.h) {
            return false;
        }
        return map.cells[y * map.w + x];
    };
 
    // get a cell in the current map by way of 
    // a canvas relative x and y pixel pos
    api.getCellByPointer = function (map, x, y) {
        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);
        return api.get(map, cx, cy)
    };
 
    api.create = function (opt) {
        opt = opt || {};
        var map = {
            w: opt.w || 9,
            h: opt.h || 7,
            cellSize: 32,
            margin: {
                x: 5,
                y: 5
            },
            cells: []
        };
        map.cells = createCells(map);
        return map;
    };
    return api;
 
}
    ());
```

## 3 - game

```js
var gameMod = (function () {
 
    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            sheetIndex: 1,
            currentCell: false,
            active: false
        }
    };
 
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.active = true;
        player.sheetIndex = 0; // player sheet
        return player;
    };
 
    var placeUnit = function (game, unit, x, y) {
        var map = game.maps[game.mapIndex];
        var newCell = mapMod.get(map, x, y);
        if (newCell) {
            // clear old position if any
            if (unit.currentCell) {
                map.cells[unit.currentCell.i].unit = false;
            }
            // update to new location
            unit.currentCell = newCell; // unit ref to cell
            map.cells[unit.currentCell.i].unit = unit; // map ref to unit
        }
    };
 
    // start game helper
    var setupGame = function (game) {
        game.mapIndex = 0;
        var map = game.maps[game.mapIndex];
 
        placeUnit(game, game.player, 0, 0);
    };
 
    var api = {};
 
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mode: 'map',
            maps: [],
            mapIndex: 0,
            targetCell: false, // a reference to the current target cell to move to, or false
            player: createPlayerUnit()
        };
        game.maps.push(mapMod.create());
        setupGame(game);
        return game;
    };
 
    api.update = function (game, secs) {
 
        var cell,
        radian,
        target;
 
        // move player
        if (target = game.targetCell) {
            cell = game.player.currentCell;
            if (target != cell) {
                radian = utils.angleToPoint(cell.x, cell.y, target.x, target.y);
                var cx = Math.round(cell.x + Math.cos(radian)),
                cy = Math.round(cell.y + Math.sin(radian));
                placeUnit(game, game.player, cx, cy);
                game.targetCell = false;
            }
        }
    };
 
    return api;
 
}
    ());
```

## 4 - draw

```js
var draw = (function () {
 
    var unitColors = ['blue', 'red'];
 
    return {
        // draw background
        back: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        // draw a map
        map: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx,
            map = sm.game.maps[sm.game.mapIndex];
            var cs = map.cellSize,
            i = 0,
            x,
            y,
            len = map.cells.length,
            cell;
            while (i < len) {
                cell = map.cells[i];
                x = map.margin.x + cell.x * cs;
                y = map.margin.y + cell.y * cs;
                // draw base cell
                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.rect(x, y, 32, 32);
                ctx.fill();
                ctx.stroke();
                // if we have a unit
                if (cell.unit) {
                    ctx.fillStyle = unitColors[cell.unit.sheetIndex];
                    ctx.beginPath();
                    ctx.rect(x, y, 32, 32);
                    ctx.fill();
                    ctx.stroke();
                }
                i += 1;
            }
        },
 
        info: function (sm) {
            var ctx = sm.ctx,
            canvas = sm.canvas;
            ctx.fillStyle = 'white';
            ctx.font = '10px courier';
            ctx.textBaseline = 'top';
            var pos = sm.input.pos;
            ctx.fillText('pointerDown: ' + sm.input.pointerDown + ' pos: ' + pos.x + ',' + pos.y, 10, 10);
            var cell = sm.game.targetCell;
            var target = cell ? cell.x + ',' + cell.y : false;
 
            //ctx.fillText('target: ' + target, 10, 20);
 
            ctx.fillText('v' + sm.ver, 1, canvas.height - 11);
        }
 
    }
}
    ());
```

## 5 - main

```js
(function () {
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
 
    var sm = {
        ver: '0.1.0',
        game: gameMod.create(),
        canvas: canvas,
        ctx: ctx,
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };
 
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos;
            sm.input.pointerDown = true;
 
            var cell = mapMod.getCellByPointer(sm.game.maps[sm.game.mapIndex], pos.x, pos.y);
 
            if (cell) {
                sm.game.targetCell = cell;
            }
 
        },
        move: function (sm, e) {},
        end: function (sm, e) {
            sm.input.pointerDown = false;
        }
    };
 
    var createPointerHandler = function (sm, type) {
        return function (e) {
            sm.input.pos = utils.getCanvasRelative(e);
            pointerHanders[type](sm, e);
        };
    };
 
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
 
    var loop = function () {
        requestAnimationFrame(loop);
 
        gameMod.update(sm.game);
 
        draw.back(sm);
        draw.map(sm);
        draw.info(sm);
    };
 
    loop();
 
}
    ());
```