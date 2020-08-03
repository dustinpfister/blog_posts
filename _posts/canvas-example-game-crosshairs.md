---
title: Canvas example of a cross hairs game
date: 2020-07-29 15:44:00
tags: [canvas]
layout: post
categories: canvas
id: 689
updated: 2020-08-03 16:58:45
version: 1.17
---

For this weeks [canvas example](/2020/03/23/canvas-example/) post I made a quick little cross hairs type game. So far this is a game where I just use the mouse or touch events to move a cross hairs object around the canvas. The general idea here is that the cross hairs object is used to move around but also to fire. So the cross hairs object can be moved from an inner area in the center of the canvas to an outer area outside of this inner area, when that happens the cross hairs object is used to move around a map. The player can also just tap around in the inner area to do damage to cells in the map for now when it just comes to having something to do with this.

The idea beyond just how to go about moving around and attacking, and doing so with just touch events is the main thing I had in mind with this one. So at the time that I started this not much thought went into the other aspects of this that can help turn it into more of an actually game. I think that it might be fun to have a game where you just go around and shoot at stuff below you and just rack up a whole lot of damage on what there is below you. Maybe put some things in the fire back also so that it is a kind of game where it is possible to, you know loose. In any case at the tie of this writing at least the main focus was just making a module that just creates, and updates an object that is used to move around a map.

I made [another canvas example that is like this one that I called just simply pointer movement](/2020/01/26/canvas-example-pointer-movement/). That one was programed a little differently from this one as that was just simply a means to move around a map by clicking and dragging away from the point that was clicked. Here I have a set of circles fixed at the center of the canvas, or any other location that I choose to fix these circle areas to.There is an outer circle area that is used to move around based on the distance from the end of the inner circle rather than the center point. In addition the inner circle area will not result in any movement, but is used as an array where you can shoot at things, but not move. So I guess this kind of interface can be programed a whole bunch of different ways, but it is still more or less the same basic thing.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};};var crossMod=(function(){var isInInner=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)<cross.radiusInner;};var isInOuter=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusInner;};var isOutOfBounds=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusOuter;};var moveOffset=function(cross,secs){var ch=cross.crosshairs,center=cross.center,d1=utils.distance(ch.x,ch.y,center.x,center.y),diff=cross.radiusOuter-cross.radiusInner,d2=d1-cross.radiusInner,per=d2/diff;if(d1>cross.radiusInner){cross.offset.x+=Math.cos(ch.heading)*cross.offset.pps*per*secs;cross.offset.y+=Math.sin(ch.heading)*cross.offset.pps*per*secs;}};return{isInInner:isInInner,isInOuter:isInOuter,create:function(opt){opt=opt||{};return{userDown:false,pps:opt.pps||128,radiusInner:opt.radiusInner||(240/4),radiusOuter:opt.radiusOuter||(240/2.125),center:{x:opt.cx||(320/2),y:opt.cy||(240/2)},crosshairs:{x:320/2,y:240/2,heading:0,radius:16},offset:{x:opt.offsetX||0,y:opt.offsetY||0,pps:256}};},update:function(cross,secs){secs=secs||0;var ch=cross.crosshairs,center=cross.center;ch.heading=Math.atan2(center.y-ch.y,center.x-ch.x);if(isInOuter(cross)){if(!cross.userDown){ch.x+=Math.cos(ch.heading)*cross.pps*secs;ch.y+=Math.sin(ch.heading)*cross.pps*secs;}moveOffset(cross,secs);}if(isOutOfBounds(cross)){ch.x=center.x+Math.cos(ch.heading+Math.PI)*cross.radiusOuter;ch.y=center.y+Math.sin(ch.heading+Math.PI)*cross.radiusOuter;}},createEvent:function(cross,eventType){return function(e){e.preventDefault();var pos=utils.getCanvasRelative(e);if(eventType==='start'){cross.userDown=true;cross.crosshairs.x=pos.x;cross.crosshairs.y=pos.y;}if(eventType==='end'){cross.userDown=false;}if(eventType==='move'&&cross.userDown){cross.crosshairs.x=pos.x;cross.crosshairs.y=pos.y;}};}}}());var mapMod=(function(){var get=function(map,x,y){return map.cells[y*map.cellWidth+x];};return{create:function(){var map={cellSize:32,cellWidth:32,cellHeight:16,cells:[],percentKilled:0};var i=0,x,y,len=map.cellWidth*map.cellHeight;while(i<len){map.cells.push({i:i,x:i%map.cellWidth,y:Math.floor(i/map.cellWidth),HP:100,maxHP:100});i+=1;}return map;},clampOffset:function(map,offset){offset.x=offset.x>0?0:offset.x;offset.y=offset.y>0?0:offset.y;offset.x=offset.x<map.cellWidth*map.cellSize* -1?map.cellWidth*map.cellSize* -1:offset.x;offset.y=offset.y<map.cellHeight*map.cellSize* -1?map.cellHeight*map.cellSize* -1:offset.y;},getWithCanvasPointAndOffset:function(map,canvasX,canvasY,offsetX,offsetY){var x=canvasX-160+Math.abs(offsetX),y=canvasY-120+Math.abs(offsetY);return get(map,Math.floor(x/map.cellSize),Math.floor(y/map.cellSize));}}}());var poolMod=(function(){return{create:function(opt){opt=opt||{};opt.count=opt.count||10;var i=0,pool=[];while(i<opt.count){pool.push({active:false,x:0,y:0,radius:8,heading:0,pps:32,lifespan:opt.lifespan||3,spawn:opt.spawn||function(obj,state){obj.active=true;},purge:opt.purge||function(obj,state){},update:opt.update||function(obj,state,secs){obj.x+=obj.pps*secs;obj.lifespan-=secs;}});i+=1;}return pool;},spawn:function(pool,game){var i=pool.length,obj;while(i--){obj=pool[i];if(!obj.active){obj.active=true;obj.spawn.call(obj,obj,game);break;}}},update:function(pool,state,secs){var i=pool.length,obj;while(i--){obj=pool[i];if(obj.active){obj.update(obj,state,secs);obj.lifespan=obj.lifespan<0?0:obj.lifespan;if(obj.lifespan===0){obj.active=false;obj.purge.call(obj,obj,state);}}}}}}());var gameMod=(function(){var shotOptions={count:20,spawn:function(shot,game){var offset=game.cross.offset,ch=game.cross.crosshairs,d;shot.x=game.canvas.width;shot.y=game.canvas.height;shot.heading=Math.atan2(ch.y-shot.y,ch.x-shot.x);d=utils.distance(shot.x,shot.y,ch.x,ch.y);shot.pps=256;shot.lifespan=d/shot.pps;shot.offset=offset;},purge:function(shot,game){var cell=mapMod.getWithCanvasPointAndOffset(game.map,shot.x,shot.y,shot.offset.x,shot.offset.y);if(cell){cell.HP-=5;cell.HP=cell.HP<0?0:cell.HP;game.map.percentKilled=0;game.map.cells.forEach(function(cell){game.map.percentKilled+=cell.HP/cell.maxHP;});game.map.percentKilled/=game.map.cells.length;}},update:function(shot,game,secs){shot.x+=Math.cos(shot.heading)*shot.pps*secs;shot.y+=Math.sin(shot.heading)*shot.pps*secs;shot.lifespan-=secs;}};return{create:function(opt){opt=opt||{};var game={ver:'0.2.0',canvas:canvas,map:mapMod.create(),cross:{},shots:poolMod.create(shotOptions),shotRate:0.125,shotSecs:0,userDown:false};game.cross=crossMod.create({offsetX:game.map.cellWidth*game.map.cellSize/2* -1,offsetY:game.map.cellHeight*game.map.cellSize/2* -1,});game.canvas.addEventListener('mousedown',crossMod.createEvent(game.cross,'start'));game.canvas.addEventListener('mouseup',crossMod.createEvent(game.cross,'end'));game.canvas.addEventListener('mousemove',crossMod.createEvent(game.cross,'move'));game.canvas.addEventListener('touchstart',crossMod.createEvent(game.cross,'start'));game.canvas.addEventListener('touchend',crossMod.createEvent(game.cross,'end'));game.canvas.addEventListener('touchmove',crossMod.createEvent(game.cross,'move'));game.canvas.addEventListener('mousedown',function(e){e.preventDefault();game.userDown=true;});game.canvas.addEventListener('mouseup',function(e){e.preventDefault();game.userDown=false;});game.canvas.addEventListener('touchstart',function(e){e.preventDefault();game.userDown=true;});game.canvas.addEventListener('touchend',function(e){e.preventDefault();game.userDown=false;});return game;},update:function(game,secs){crossMod.update(game.cross,secs);mapMod.clampOffset(game.map,game.cross.offset);poolMod.update(game.shots,game,secs);game.shotSecs+=secs;game.shotSecs=game.shotSecs>=game.shotRate?game.shotRate:game.shotSecs;if(game.shotSecs>=game.shotRate&&game.userDown&&crossMod.isInInner(game.cross)){poolMod.spawn(game.shots,game);game.shotSecs=0;}}}}());var draw=(function(){var drawCrossCircles=function(ctx,cross){ctx.strokeStyle='white';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusInner,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusOuter,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cross.crosshairs.x,cross.crosshairs.y,cross.crosshairs.radius,0,Math.PI*2);ctx.stroke();};return{back:function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);},cross:function(ctx,cross){var ch=cross.crosshairs;drawCrossCircles(ctx,cross);ctx.strokeStyle='rgba(200,0,0,0.5)';ctx.beginPath();ctx.moveTo(ch.x,ch.y-ch.radius*1.5);ctx.lineTo(ch.x,ch.y+ch.radius*1.5);ctx.stroke();ctx.beginPath();ctx.moveTo(ch.x-ch.radius*1.5,ch.y);ctx.lineTo(ch.x+ch.radius*1.5,ch.y);ctx.stroke();},map:function(ctx,map,cross){ctx.strokeStyle='grey';ctx.lineWidth=3;map.cells.forEach(function(cell){var x=cell.x*map.cellSize+cross.offset.x+(320/2),y=cell.y*map.cellSize+cross.offset.y+(240/2),per=cell.HP/cell.maxHP;ctx.beginPath();ctx.rect(x,y,map.cellSize,map.cellSize);ctx.stroke();ctx.fillStyle='rgba(0,200,0,'+per.toFixed(2)+')';ctx.fill();ctx.closePath();});},shots:function(ctx,game){var shots=game.shots,i=shots.length,shot;while(i--){shot=shots[i];ctx.fillStyle='white';ctx.strokeStyle='black';if(shot.active){ctx.beginPath();ctx.arc(shot.x,shot.y,shot.radius,0,Math.PI*2);ctx.fill();ctx.stroke();}}},info:function(ctx,game){ctx.fillStyle='rgba(0,0,0,0.4)';ctx.fillRect(0,0,game.canvas.width,game.canvas.height);ctx.fillStyle='yellow';ctx.textBaseline='top';ctx.font='10px courier';ctx.fillText('v'+game.ver,10,10);ctx.fillText('pos: '+game.cross.offset.x.toFixed(2)+','+game.cross.offset.y.toFixed(2),10,20);ctx.fillText('percent kiled: '+game.map.percentKilled,10,30);ctx.fillText('shotSecs: '+game.shotSecs,10,40);}}}());var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var game=gameMod.create({canvas:canvas});var lt=new Date();var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);gameMod.update(game,secs);draw.back(ctx,canvas);draw.map(ctx,game.map,game.cross);draw.cross(ctx,game.cross);draw.shots(ctx,game);draw.info(ctx,game);lt=now;};loop();</script>

## 1 - The utility module

For like with many of these canvas examples this one has a utility library. In this one I am just using the distance formula, and a method that will help me to get a canvas relative position when it comes to working with event handers for pointer events. There always seems a need for this kind of utility library that can be described as a kind of application specific custom tailors lodash of sorts. That is a collection of utility methods that I am actually going to use in one or more of the module that compose the project.

```js
// UTILS
var utils = {};
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
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

So now that I have the basic utility library out of the way lets move on to the actual modules that make this project diferent from all the others.

## 2 - The cross.js file

So now for the module that will be used to create and update a state object for a cross hairs state object. This main cross hairs state object contains a bunch of additional objects and properties that contain many points of interest in the canvas matrix. One point of interest is the center point of the cross hairs area, another is the actual cross hairs cursor position, and yet another is an offset point that can be used as a way to navigate a map. 

The idea of this module is when the cross hairs point object is within an inner radius that cross hairs object is just used as a way to set the position of where a weapon is going to fire. While the difference between the inner and outer radius is then used as a zone to define angle and rate of movement when it comes to moving around that map. So when the cross hairs object is in the zone between inner and outer radius value that will effect another offset point in the main cross state object. This offset value can then be used as a map offset value when it comes to navigating the map. When it comes to the map module that is another matter that I will be getting to later, but for now in this section I will just be going over the cross hairs module.

SO with that said the module contains a number of private helper methods. There are helper methods that will return true or false if the cross hairs object is in the fire area, or in the movement area. There is also a helper method that has to do with moving the offset object based on the current values of the cross hairs object and a given value that is the number of seconds sense the last frame tick update.

```js
var crossMod = (function () {
 
    var isInInner = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) < cross.radiusInner;
    };
 
    var isInOuter = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusInner;
    };
 
    var isOutOfBounds = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusOuter;
    };
 
    var moveOffset = function (cross, secs) {
        var ch = cross.crosshairs,
        center = cross.center,
        d1 = utils.distance(ch.x, ch.y, center.x, center.y),
        diff = cross.radiusOuter - cross.radiusInner,
        d2 = d1 - cross.radiusInner,
        per = d2 / diff;
        if (d1 > cross.radiusInner) {
            cross.offset.x += Math.cos(ch.heading) * cross.offset.pps * per * secs;
            cross.offset.y += Math.sin(ch.heading) * cross.offset.pps * per * secs;
        }
    };
 
    return {
        isInInner: isInInner,
        isInOuter: isInOuter,
        create: function (opt) {
            opt = opt || {};
            return {
                userDown: false,
                pps: opt.pps || 128,
                radiusInner: opt.radiusInner || (240 / 4),
                radiusOuter: opt.radiusOuter || (240 / 2.125),
                center: {
                    x: opt.cx || (320 / 2),
                    y: opt.cy || (240 / 2)
                },
                crosshairs: {
                    x: 320 / 2,
                    y: 240 / 2,
                    heading: 0,
                    radius: 16
                },
                offset: {
                    x: opt.offsetX || 0,
                    y: opt.offsetY || 0,
                    pps: 256
                }
            };
        },
 
        update: function (cross, secs) {
            secs = secs || 0;
            var ch = cross.crosshairs,
            center = cross.center;
            ch.heading = Math.atan2(center.y - ch.y, center.x - ch.x);
            if (isInOuter(cross)) {
                // move back to innerRdaius if in outer area and userDown is false
                if (!cross.userDown) {
                    ch.x += Math.cos(ch.heading) * cross.pps * secs;
                    ch.y += Math.sin(ch.heading) * cross.pps * secs;
                }
                // apply changes to offset
                moveOffset(cross, secs);
            }
            // set bounds
            if (isOutOfBounds(cross)) {
                ch.x = center.x + Math.cos(ch.heading + Math.PI) * cross.radiusOuter;
                ch.y = center.y + Math.sin(ch.heading + Math.PI) * cross.radiusOuter;
            }
        },
 
        createEvent: function (cross, eventType) {
            return function (e) {
                e.preventDefault();
                var pos = utils.getCanvasRelative(e);
                if (eventType === 'start') {
                    cross.userDown = true;
                    cross.crosshairs.x = pos.x;
                    cross.crosshairs.y = pos.y;
                }
                if (eventType === 'end') {
                    cross.userDown = false;
                }
                if (eventType === 'move' && cross.userDown) {
                    cross.crosshairs.x = pos.x;
                    cross.crosshairs.y = pos.y;
                }
            };
        }
 
    }
}
    ());
```

I then have my public API of this module that contains methods for both creating and updating a cross state object. In addition I have a method that can be used as a way to create event handers for a cross object that can be used for both mouse and touch events. this is where by utility method that has to do with getting a canvas relative position comes into play.

## 3 - The map.js file

So now that I have my cross hairs module I am also going to want to have a map file that will be used to create a map of cells. I can then move around the map with the state of a cross object created with the cross hairs module. I went with having the offset values in the cross object rather than the map object, so I will be using a public method in this map module to get at cells by passing a cross object along with the map and canvas relative position values.

```js
var mapMod = (function () {
 
    var get = function (map, x, y) {
        return map.cells[y * map.cellWidth + x];
    };
 
    return {
 
        create: function () {
            var map = {
                cellSize: 32,
                cellWidth: 32,
                cellHeight: 16,
                cells: [],
                percentKilled: 0
            };
            var i = 0,
            x,
            y,
            len = map.cellWidth * map.cellHeight;
            while (i < len) {
                map.cells.push({
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth),
                    HP: 100,
                    maxHP: 100
                });
                i += 1;
            }
            return map;
        },
 
        clampOffset: function (map, offset) {
            offset.x = offset.x > 0 ? 0 : offset.x;
            offset.y = offset.y > 0 ? 0 : offset.y;
            offset.x = offset.x < map.cellWidth * map.cellSize * -1 ? map.cellWidth * map.cellSize * -1 : offset.x;
            offset.y = offset.y < map.cellHeight * map.cellSize * -1 ? map.cellHeight * map.cellSize * -1 : offset.y;
        },
 
        getWithCanvasPointAndOffset: function (map, canvasX, canvasY, offsetX, offsetY) {
            var x = canvasX - 160 + Math.abs(offsetX),
            y = canvasY - 120 + Math.abs(offsetY);
            return get(map, Math.floor(x / map.cellSize), Math.floor(y / map.cellSize));
        }
 
    }
 
}
    ());
```

## 4 - A pool.js module for creating an object pool to be used for shots amd any other future display object pools

I made a another post in which I touched base on [object pools](/2020/07/20/canvas-example-object-pool/). I decided to include such a module in this project that for starters will be used to create shot objects that will move from the side of the canvas to the target area where an attack was made on the map. In future versions of the canvas example display object pools could be used for all kinds of additional things where a display object would be called for such as explosions, enemies, and power ups.

The module for now just has three public methods, one to create an object pool, one to update an object pool, and another that will call the spawn method of a display object that is inactive if any is available.

```js
var poolMod = (function () {
 
    return {
 
        create: function (opt) {
            opt = opt || {};
            opt.count = opt.count || 10;
            var i = 0,
            pool = [];
            while (i < opt.count) {
                pool.push({
                    active: false,
                    x: 0,
                    y: 0,
                    radius: 8,
                    heading: 0,
                    pps: 32,
                    lifespan: opt.lifespan || 3,
                    spawn: opt.spawn || function (obj, state) {
                        obj.active = true;
                    },
                    purge: opt.purge || function (obj, state) {},
                    update: opt.update || function (obj, state, secs) {
                        obj.x += obj.pps * secs;
                        obj.lifespan -= secs;
                    }
                });
                i += 1;
            }
            return pool;
        },
 
        spawn: function (pool, game) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (!obj.active) {
                    obj.active = true;
                    obj.spawn.call(obj, obj, game);
                    break;
                }
            }
        },
 
        update: function (pool, state, secs) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (obj.active) {
                    obj.update(obj, state, secs);
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        obj.purge.call(obj, obj, state);
                    }
                }
            }
        }
 
    }
 
}
    ());
```

## 5 - The game.js filr for creating a main game state object

So I ending up working out a main game module that will serve as a way to create and set up a main game state module for this canvas example.

```js
var gameMod = (function () {
 
    var shotOptions = {
        count: 20,
        // when a shot becomes active
        spawn: function (shot, game) {
            var offset = game.cross.offset,
            ch = game.cross.crosshairs,
            d;
            shot.x = game.canvas.width;
            shot.y = game.canvas.height;
            shot.heading = Math.atan2(ch.y - shot.y, ch.x - shot.x);
            d = utils.distance(shot.x, shot.y, ch.x, ch.y);
            shot.pps = 256;
            shot.lifespan = d / shot.pps;
            shot.offset = offset;
        },
        // when a shot becomes inactive
        purge: function (shot, game) {
            var cell = mapMod.getWithCanvasPointAndOffset(game.map, shot.x, shot.y, shot.offset.x, shot.offset.y);
            if (cell) {
                cell.HP -= 5;
                cell.HP = cell.HP < 0 ? 0 : cell.HP;
                // percent killed
                game.map.percentKilled = 0;
                game.map.cells.forEach(function (cell) {
                    game.map.percentKilled += cell.HP / cell.maxHP;
                });
                game.map.percentKilled /= game.map.cells.length;
            }
        },
        // update method for a shot
        update: function (shot, game, secs) {
            shot.x += Math.cos(shot.heading) * shot.pps * secs;
            shot.y += Math.sin(shot.heading) * shot.pps * secs;
            shot.lifespan -= secs;
        }
    };
 
    return {
 
        create: function (opt) {
            opt = opt || {};
            var game = {
                ver: '0.2.0',
                canvas: canvas,
                map: mapMod.create(),
                cross: {},
                shots: poolMod.create(shotOptions),
                shotRate: 0.125,
                shotSecs: 0,
                userDown: false
            };
 
            game.cross = crossMod.create({
                    offsetX: game.map.cellWidth * game.map.cellSize / 2 * -1,
                    offsetY: game.map.cellHeight * game.map.cellSize / 2 * -1,
                });
 
            game.canvas.addEventListener('mousedown', crossMod.createEvent(game.cross, 'start'));
            game.canvas.addEventListener('mouseup', crossMod.createEvent(game.cross, 'end'));
            game.canvas.addEventListener('mousemove', crossMod.createEvent(game.cross, 'move'));
 
            game.canvas.addEventListener('touchstart', crossMod.createEvent(game.cross, 'start'));
            game.canvas.addEventListener('touchend', crossMod.createEvent(game.cross, 'end'));
            game.canvas.addEventListener('touchmove', crossMod.createEvent(game.cross, 'move'));
 
            game.canvas.addEventListener('mousedown', function (e) {
                e.preventDefault();
                game.userDown = true;
            });
            game.canvas.addEventListener('mouseup', function (e) {
                e.preventDefault();
                game.userDown = false;
            });
            game.canvas.addEventListener('touchstart', function (e) {
                e.preventDefault();
                game.userDown = true;
            });
            game.canvas.addEventListener('touchend', function (e) {
                e.preventDefault();
                game.userDown = false;
            });
 
            return game;
 
        },
 
        update: function (game, secs) {
            crossMod.update(game.cross, secs);
            mapMod.clampOffset(game.map, game.cross.offset);
            poolMod.update(game.shots, game, secs);
            game.shotSecs += secs;
            game.shotSecs = game.shotSecs >= game.shotRate ? game.shotRate : game.shotSecs;
            if (game.shotSecs >= game.shotRate && game.userDown && crossMod.isInInner(game.cross)) {
                poolMod.spawn(game.shots, game);
                game.shotSecs = 0;
            }
        }
 
    }
 
}
    ());
```

## 4 - The draw.js file

So now that I have mt modules for creating state objects, I will now want a module with methods that are used to draw aspects of these state objects to a canvas element.

```js
var draw = (function () {
    var drawCrossCircles = function (ctx, cross) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusInner, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusOuter, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cross.crosshairs.x, cross.crosshairs.y, cross.crosshairs.radius, 0, Math.PI * 2);
        ctx.stroke();
    };
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // draw cross hairs
        cross: function (ctx, cross) {
            var ch = cross.crosshairs;
            drawCrossCircles(ctx, cross);
            ctx.strokeStyle = 'rgba(200,0,0,0.5)';
            ctx.beginPath();
            ctx.moveTo(ch.x, ch.y - ch.radius * 1.5);
            ctx.lineTo(ch.x, ch.y + ch.radius * 1.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ch.x - ch.radius * 1.5, ch.y);
            ctx.lineTo(ch.x + ch.radius * 1.5, ch.y);
            ctx.stroke();
        },
        // draw map
        map: function (ctx, map, cross) {
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 3;
            map.cells.forEach(function (cell) {
                var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
                y = cell.y * map.cellSize + cross.offset.y + (240 / 2),
                per = cell.HP / cell.maxHP;
                ctx.beginPath();
                ctx.rect(x, y, map.cellSize, map.cellSize);
                ctx.stroke();
                ctx.fillStyle = 'rgba(0,200,0,' + per.toFixed(2) + ')';
                ctx.fill();
                ctx.closePath();
            });
        },
        shots: function (ctx, game) {
            var shots = game.shots,
            i = shots.length,
            shot;
            while (i--) {
                shot = shots[i];
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                if (shot.active) {
                    ctx.beginPath();
                    ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        // draw info
        info: function (ctx, game) {
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
            ctx.fillStyle = 'yellow';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('v' + game.ver, 10, 10);
            ctx.fillText('pos: ' + game.cross.offset.x.toFixed(2) + ',' + game.cross.offset.y.toFixed(2), 10, 20);
            ctx.fillText('percent kiled: ' + game.map.percentKilled, 10, 30);
            ctx.fillText('shotSecs: ' + game.shotSecs, 10, 40);
        }
    }
}
    ());
```

## 5 - Now for a Main.js file along with a main app loop

So now I need some additional code to pull everything together here in a main.js file that will be used after everything else is in place to work with. Here I create and inject a canvas element into a hard coded container element that I have in my html. I create instances of a map and cross state objects, and attach a whole bunch of event handers for mouse and touch events using the create event method of the cross module.

I then have an attack method that I will likely work into the map module, or some kind of future module that has to do with a weapons or something to that effect. I do not want to get into to much detail with that because at some point in the future I will just have to re write what I have to say about it when it comes to putting a little more time into this canvas example, because I think this one needs and deserve more work.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var game = gameMod.create({
        canvas: canvas
    });
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
 
    gameMod.update(game, secs);
 
    draw.back(ctx, canvas);
    draw.map(ctx, game.map, game.cross);
    draw.cross(ctx, game.cross);
    draw.shots(ctx, game);
    draw.info(ctx, game);
    lt = now;
};
 
loop();
```

I then of course have my main app loop where I am using the requestAnimationFrame method, inside the loop method. In this loop method I am updating the state of the cross object and drawing the state of the cross and map objects.


I then have just a little HTML and inline css for the container for the canvas element, or elements at some point in the future if I get into layering with this one.

```html
<html>
    <head>
        <title>canvas example game crosshairs</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/cross.js"></script>
        <script src="./lib/map.js"></script>
        <script src="./lib/pool.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So that is it when this canvas example is up and running I am able to move around and when I click on the map I cause damage to the areas that I click. Nothing to interesting at the point of this writing at least, but I think that this one has some decent potential when it comes to putting a little more time into it. I do have many other canvas examples in a state like this also that need more attention, but I am sure I will come back around to this one at some point.

## 6 - Conclusion

So now I have the basic idea of what I had in mind together at least, now it is just a question of what more I can do to it to make it more interesting. There is making it so that each time the player clicks or touches an area in the inner circle that casues a shot to fire from one side of the canvas or another to the point where such an event happened. So there is adding much more when it comes to weapons and what it is that we are shooting at. In addition there is doing something so that there are units in the map the shoot back at the player also.