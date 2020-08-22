---
title: Monster Smash canvas game example
date: 2020-08-17 11:21:00
tags: [canvas]
layout: post
categories: canvas
id: 695
updated: 2020-08-22 07:06:37
version: 1.3
---

I will be making at least a few more [canvas examples](/2020/03/23/canvas-example/) this summer, some of which I might continue developing if some people show interest in them. Last week I started working on a project that I am currently just calling Monster Smash. The general idea is not clear, aside from just some very vague concepts. I would like to have at least one canvas example that is just a nice little RPG style game where you move a player object around and battle enemies and level up. Nothing to ground breaking or exciting, just a nice little RPG like that of dragon warrior maybe.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.bb=function(a,b){return!((a.y+a.h)<b.y||a.y>(b.y+b.h)||(a.x+a.w)<b.x||a.x>(b.x+b.w));};utils.angleToPoint=function(x1,y1,x2,y2,scale){scale=scale===undefined?Math.PI*2:scale;var aTan=Math.atan2(y1-y2,x1-x2);return(aTan+Math.PI)/(Math.PI*2)*scale;};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};};var mapMod=(function(){var api={};var createCells=function(map){var cells=[];var len=map.w*map.h,i=0;while(i<len){cells.push({i:i,x:i%map.w,y:Math.floor(i/map.w),unit:false});i+=1;}return cells;};api.get=function(map,x,y){if(x<0||y<0||x>=map.w||y>=map.h){return false;}return map.cells[y*map.w+x];};api.getCellByPointer=function(map,x,y){var cx=Math.floor((x-map.margin.x)/map.cellSize),cy=Math.floor((y-map.margin.y)/map.cellSize);return api.get(map,cx,cy)};api.create=function(opt){opt=opt||{};var map={w:opt.w||9,h:opt.h||7,cellSize:32,spawnEnabled:opt.spawnEnabled||false,spawnLimit:opt.spawnLimit||2,spawnCells:opt.spawnCells||[0],margin:{x:5,y:5},cells:[]};map.cells=createCells(map);return map;};return api;}());var gameMod=(function(){var createBaseUnit=function(){return{HP:100,maxHP:100,weaponIndex:0,sheetIndex:0,currentCell:false,active:false}};var createEnemyUnit=function(){var enemy=createBaseUnit();enemy.sheetIndex=1;return enemy;};var createPlayerUnit=function(){var player=createBaseUnit();player.sheetIndex=0;return player;};var createEnemyUnitPool=function(size){var pool=[];var i=0;while(i<size){pool.push(createEnemyUnit());i+=1;}return pool;};var getActiveCount=function(game,pool){pool=pool||game.enemyPool;return pool.reduce(function(acc,obj){acc=typeof acc==='object'?!!acc.active:acc;return acc+!!obj.active;});};var spawnEnemy=function(game){var map=getCurrentMap(game),e,spawnCell=map.cells[map.spawnCells[0]],activeCount;if(map.spawnEnabled){activeCount=getActiveCount(game,game.enemyPool);if(activeCount<map.spawnLimit&&spawnCell.unit===false){e=getNextInactive(game,game.enemyPool);if(e){placeUnit(game,e,spawnCell.x,spawnCell.y);}}}};var getNextInactive=function(game,pool){pool=pool||game.enemyPool;var i=0,len=pool.length;while(i<len){if(!pool[i].active){return pool[i];}i+=1;}return false;};var getCurrentMap=function(game){return game.maps[game.mapIndex];};var placeUnit=function(game,unit,x,y){var map=getCurrentMap(game);var newCell=mapMod.get(map,x,y);if(!unit){return;}if(newCell){if(unit.currentCell){map.cells[unit.currentCell.i].unit=false;}unit.active=true;unit.currentCell=newCell;map.cells[unit.currentCell.i].unit=unit;}};var removeUnit=function(game,unit){unit.active=false;getCurrentMap(game).cells[unit.currentCell.i].unit=false;unit.currentCell=false;};var setupGame=function(game){game.mapIndex=0;var map=getCurrentMap(game);placeUnit(game,game.player,0,0);placeUnit(game,getNextInactive(game),5,5);placeUnit(game,getNextInactive(game),2,5);};var moveEnemies=function(game){var i=0,cell,radian,map=getCurrentMap(game),e,p=game.player,len=game.enemyPool.length;while(i<len){e=game.enemyPool[i];if(e.active){cell=e.currentCell;radian=utils.angleToPoint(cell.x,cell.y,p.currentCell.x,p.currentCell.y);var cx=Math.round(cell.x+Math.cos(radian)),cy=Math.round(cell.y+Math.sin(radian));var newCell=mapMod.get(map,cx,cy);if(!newCell.unit){placeUnit(game,e,cx,cy);}}i+=1;}};var api={};api.create=function(opt){opt=opt||{};var game={mode:'map',maps:[],mapIndex:0,targetCell:false,player:createPlayerUnit(),kills:0,enemyPool:createEnemyUnitPool(5)};game.maps.push(mapMod.create({spawnEnabled:true}));setupGame(game);return game;};api.update=function(game,secs){var cell,map=getCurrentMap(game),radian,target;if(target=game.targetCell){cell=game.player.currentCell;if(target!=cell){radian=utils.angleToPoint(cell.x,cell.y,target.x,target.y);var cx=Math.round(cell.x+Math.cos(radian)),cy=Math.round(cell.y+Math.sin(radian));var newCell=mapMod.get(map,cx,cy);if(!newCell.unit){placeUnit(game,game.player,cx,cy);}else{var e=newCell.unit;e.active=false;removeUnit(game,e); game.kills+=1;placeUnit(game,game.player,cx,cy);} game.targetCell=false;moveEnemies(game);spawnEnemy(game);}}};return api;} ());var draw=(function(){var unitColors=['blue','red'];return{back:function(sm){var canvas=sm.canvas,ctx=sm.ctx;ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);},map:function(sm){var canvas=sm.canvas,ctx=sm.ctx,map=sm.game.maps[sm.game.mapIndex];var cs=map.cellSize,i=0,x,y,len=map.cells.length,cell;while(i<len){cell=map.cells[i];x=map.margin.x+cell.x*cs;y=map.margin.y+cell.y*cs;ctx.fillStyle='green';ctx.beginPath();ctx.rect(x,y,32,32);ctx.fill();ctx.stroke();if(cell.unit){if(cell.unit.active){ctx.fillStyle=unitColors[cell.unit.sheetIndex];ctx.beginPath();ctx.rect(x,y,32,32);ctx.fill();ctx.stroke();}} i+=1;}},info:function(sm){var ctx=sm.ctx,canvas=sm.canvas;ctx.fillStyle='white';ctx.font='10px courier';ctx.textBaseline='top';var pos=sm.input.pos;ctx.fillText('pointerDown: '+sm.input.pointerDown+' pos: '+pos.x+','+pos.y,5,5);ctx.fillText('kills: '+sm.game.kills,5,15);ctx.fillText('v'+sm.ver,1,canvas.height-11);}}} ());(function(){var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var sm={ver:'0.1.0',game:gameMod.create(),canvas:canvas,ctx:ctx,input:{pointerDown:false,pos:{x:0,y:0}}};var pointerHanders={start:function(sm,e){var pos=sm.input.pos;sm.input.pointerDown=true;var cell=mapMod.getCellByPointer(sm.game.maps[sm.game.mapIndex],pos.x,pos.y);if(cell){sm.game.targetCell=cell;}},move:function(sm,e){},end:function(sm,e){sm.input.pointerDown=false;}};var createPointerHandler=function(sm,type){return function(e){sm.input.pos=utils.getCanvasRelative(e);pointerHanders[type](sm,e);};};canvas.addEventListener('mousedown',createPointerHandler(sm,'start'));canvas.addEventListener('mousemove',createPointerHandler(sm,'move'));canvas.addEventListener('mouseup',createPointerHandler(sm,'end'));var loop=function(){requestAnimationFrame(loop);gameMod.update(sm.game);draw.back(sm);draw.map(sm);draw.info(sm);};loop();} ());</script>

## 1 - The utility library

To start things off I have a basic utility library for this canvas example. Here I have a distance formula, a method to get an angle to a point, and a method to help with getting a point relative to a canvas element rather than the window object.

```js
// UTILS
var utils = {};
// the distance formula
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// get angle from one point to another
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

## 2 - The map module

So then I have a module that will be used for creating a map object.

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
            spawnEnabled: opt.spawnEnabled || false,
            spawnLimit: opt.spawnLimit || 2,
            spawnCells: opt.spawnCells || [0], // cell index values where enemies can spawn
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

## 3 - The game module

```js
var gameMod = (function () {
 
    // create a base unit object
    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            sheetIndex: 0,
            currentCell: false,
            active: false
        }
    };
 
    // create an enemy Unit Object
    var createEnemyUnit = function () {
        var enemy = createBaseUnit();
        enemy.sheetIndex = 1;
        enemy.sight = 3; // sight radius in cells
        return enemy;
    };
 
    // create a player unit
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.sheetIndex = 0; // player sheet
        return player;
    };
    // create enemy pool
    var createEnemyUnitPool = function (size) {
        var pool = [];
        var i = 0;
        while (i < size) {
            pool.push(createEnemyUnit());
            i += 1;
        }
        return pool;
    };
    var getActiveCount = function (game, pool) {
        pool = pool || game.enemyPool;
        return pool.reduce(function (acc, obj) {
            acc = typeof acc === 'object' ? !!acc.active : acc;
            return acc + !!obj.active;
        });
    };
    var spawnEnemy = function (game) {
        var map = getCurrentMap(game),
        e,
        spawnCell = map.cells[map.spawnCells[0]], // just index 0 for now
        activeCount;
        if (map.spawnEnabled) {
            activeCount = getActiveCount(game, game.enemyPool);
            if (activeCount < map.spawnLimit && spawnCell.unit === false) {
                e = getNextInactive(game, game.enemyPool);
                if (e) {
                    placeUnit(game, e, spawnCell.x, spawnCell.y);
                }
            }
        }
    };
    // get next inactive
    var getNextInactive = function (game, pool) {
        pool = pool || game.enemyPool;
        var i = 0,
        len = pool.length;
        while (i < len) {
            if (!pool[i].active) {
                return pool[i];
            }
            i += 1;
        }
        return false;
    };
 
    // get the current map
    var getCurrentMap = function (game) {
        return game.maps[game.mapIndex];
    };
 
    // place a unit at a current map location
    var placeUnit = function (game, unit, x, y) {
        var map = getCurrentMap(game);
        var newCell = mapMod.get(map, x, y);
        if (!unit) {
            return;
        }
        if (newCell) {
            // clear old position if any
            if (unit.currentCell) {
                map.cells[unit.currentCell.i].unit = false;
            }
            // make sure the unit is active
            unit.active = true;
            // update to new location
            unit.currentCell = newCell; // unit ref to cell
            map.cells[unit.currentCell.i].unit = unit; // map ref to unit
        }
    };
 
    // remove a unit from any map location it may be at
    // this will not destroy the object if it is part of a pool, or reference elsewhere
    var removeUnit = function (game, unit) {
        unit.active = false;
        getCurrentMap(game).cells[unit.currentCell.i].unit = false;
        unit.currentCell = false;
    };
 
    // start game helper
    var setupGame = function (game) {
        game.mapIndex = 0;
        var map = getCurrentMap(game);
        placeUnit(game, game.player, 0, 0);
        placeUnit(game, getNextInactive(game), 5, 5);
        placeUnit(game, getNextInactive(game), 2, 5);
    };
 
    var moveEnemies = function (game) {
        var i = 0,
        cell,
        radian,
        map = getCurrentMap(game),
        e,
        cx,
        cy,
        p = game.player,
        len = game.enemyPool.length;
        while (i < len) {
            e = game.enemyPool[i];
            if (e.active) {
                cell = e.currentCell;
                if (utils.distance(cell.x, cell.y, p.currentCell.x, p.currentCell.y) <= e.sight) {
                    radian = utils.angleToPoint(cell.x, cell.y, p.currentCell.x, p.currentCell.y);
                } else {
                    radian = Math.PI * 2 * Math.random();
                }
                cx = Math.round(cell.x + Math.cos(radian));
                cy = Math.round(cell.y + Math.sin(radian));
                // get location before moving to it
                var newCell = mapMod.get(map, cx, cy);
                // if no unit just move there
                if (!newCell.unit) {
                    placeUnit(game, e, cx, cy);
                }
            }
            i += 1;
        }
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
            player: createPlayerUnit(),
            kills: 0,
            enemyPool: createEnemyUnitPool(5)
        };
        game.maps.push(mapMod.create({
                spawnEnabled: true
            }));
        setupGame(game);
 
        return game;
    };
    // update a game state object
    api.update = function (game, secs) {
        var cell,
        map = getCurrentMap(game),
        radian,
        target;
 
        // move player
        if (target = game.targetCell) {
            cell = game.player.currentCell;
            if (target != cell) {
                radian = utils.angleToPoint(cell.x, cell.y, target.x, target.y);
                var cx = Math.round(cell.x + Math.cos(radian)),
                cy = Math.round(cell.y + Math.sin(radian));
                // get location before moving to it
                var newCell = mapMod.get(map, cx, cy);
                // if no unit just move there
                if (!newCell.unit) {
                    placeUnit(game, game.player, cx, cy);
                } else {
                    // else there is an enemy there
                    var e = newCell.unit;
 
                    // just step a kill count for now
                    e.active = false;
                    removeUnit(game, e);
                    game.kills += 1;
                    placeUnit(game, game.player, cx, cy);
                }
                game.targetCell = false;
                // move active enemies
                moveEnemies(game);
                // enemies might spawn per turn
                spawnEnemy(game);
            }
        }
 
    };
 
    // return the public api
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
                    if (cell.unit.active) {
                        ctx.fillStyle = unitColors[cell.unit.sheetIndex];
                        ctx.beginPath();
                        ctx.rect(x, y, 32, 32);
                        ctx.fill();
                        ctx.stroke();
                    }
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
            ctx.fillText('pointerDown: ' + sm.input.pointerDown + ' pos: ' + pos.x + ',' + pos.y, 5, 5);
            ctx.fillText('kills: ' + sm.game.kills, 5, 15);
            ctx.fillText('v' + sm.ver, 1, canvas.height - 11);
        }
 
    }
}
    ());
```

## 5 - Main and index

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
        ver: '0.2.0',
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
            loop();
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
        //requestAnimationFrame(loop);
 
        gameMod.update(sm.game);
 
        draw.back(sm);
        draw.map(sm);
        draw.info(sm);
    };
 
    loop();
 
}
    ());
```

```html
<html>
    <head>
        <title>canvas example monster smash</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/map.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 6 - Conclusion

So far this game is working more or less like what it is that I had in mind. I do have the current state of my todo lost when it comes to additional features with this one though. I would like for there to be more than one map that the player can move to, and there are additional states that i would like to add. As of this writing the player just kills enemies when the player object comes in contact with an enemy object, so obviously there is more work to do when it comes to turning this one into something that people might actually like to play.