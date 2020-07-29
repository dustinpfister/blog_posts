---
title: Canvas example of a cross hairs game
date: 2020-07-29 15:44:00
tags: [canvas]
layout: post
categories: canvas
id: 689
updated: 2020-07-29 16:05:43
version: 1.2
---

For this weeks [canvas example](/2020/03/23/canvas-example/) post I made a quick little cross hairs type game. So far this is a game where I just use the mouse or touch events to move a cross hairs object around the canvas. The general idea here is that the cross hairs object is used to move around but also to fire. So the cross hairs object can be moved from an inner area in the center of the canvas to an outer area outside of this inner area, when that happens the cross hairs object is used to move around a map. The player can also just tap around in the inner area to do damage to cells in the map.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};};var crossMod=(function(){var isInOuter=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusInner;};var isOutOfBounds=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusOuter;};var moveOffset=function(cross,secs){var ch=cross.crosshairs,center=cross.center,d1=utils.distance(ch.x,ch.y,center.x,center.y),diff=cross.radiusOuter-cross.radiusInner,d2=d1-cross.radiusInner,per=d2/diff;if(d1>cross.radiusInner){cross.offset.x+=Math.cos(ch.heading)*cross.offset.pps*per*secs;cross.offset.y+=Math.sin(ch.heading)*cross.offset.pps*per*secs;}};return{create:function(opt){opt=opt||{};return{ver:'0.1.0',userDown:false,pps:opt.pps||128,radiusInner:opt.radiusInner||(240/4),radiusOuter:opt.radiusOuter||(240/2.125),center:{x:opt.cx||(320/2),y:opt.cy||(240/2)},crosshairs:{x:320/2,y:240/2,heading:0,radius:16},offset:{x:opt.offsetX||0,y:opt.offsetY||0,pps:256}};},update:function(cross,secs){secs=secs||0;var ch=cross.crosshairs,center=cross.center;ch.heading=Math.atan2(center.y-ch.y,center.x-ch.x);if(isInOuter(cross)){if(!cross.userDown){ch.x+=Math.cos(ch.heading)*cross.pps*secs;ch.y+=Math.sin(ch.heading)*cross.pps*secs;}moveOffset(cross,secs);}if(isOutOfBounds(cross)){ch.x=center.x+Math.cos(ch.heading+Math.PI)*cross.radiusOuter;ch.y=center.y+Math.sin(ch.heading+Math.PI)*cross.radiusOuter;}},createEvent:function(cross,eventType){return function(e){e.preventDefault();var pos=utils.getCanvasRelative(e);if(eventType==='start'){cross.userDown=true;cross.crosshairs.x=pos.x;cross.crosshairs.y=pos.y;}if(eventType==='end'){cross.userDown=false;}if(eventType==='move'&&cross.userDown){cross.crosshairs.x=pos.x;cross.crosshairs.y=pos.y;}};}}}());var mapMod=(function(){var get=function(map,x,y){return map.cells[y*map.cellWidth+x];};return{create:function(){var map={cellSize:32,cellWidth:32,cellHeight:16,cells:[],percentKilled:0};var i=0,x,y,len=map.cellWidth*map.cellHeight;while(i<len){map.cells.push({i:i,x:i%map.cellWidth,y:Math.floor(i/map.cellWidth),HP:100,maxHP:100});i+=1;}return map;},clampOffset:function(map,offset){offset.x=offset.x>0?0:offset.x;offset.y=offset.y>0?0:offset.y;offset.x=offset.x<map.cellWidth*map.cellSize* -1?map.cellWidth*map.cellSize* -1:offset.x;offset.y=offset.y<map.cellHeight*map.cellSize* -1?map.cellHeight*map.cellSize* -1:offset.y;},getWithCross:function(map,cross,canvasX,canvasY){var x=canvasX-cross.center.x+Math.abs(cross.offset.x),y=canvasY-cross.center.y+Math.abs(cross.offset.y);return get(map,Math.floor(x/map.cellSize),Math.floor(y/map.cellSize));}}}());var draw=(function(){return{back:function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);},cross:function(ctx,cross){ctx.strokeStyle='white';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusInner,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusOuter,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cross.crosshairs.x,cross.crosshairs.y,cross.crosshairs.radius,0,Math.PI*2);ctx.stroke();},map:function(ctx,map,cross){ctx.strokeStyle='grey';ctx.lineWidth=3;map.cells.forEach(function(cell){var x=cell.x*map.cellSize+cross.offset.x+(320/2),y=cell.y*map.cellSize+cross.offset.y+(240/2),per=cell.HP/cell.maxHP;ctx.beginPath();ctx.rect(x,y,map.cellSize,map.cellSize);ctx.stroke();ctx.fillStyle='rgba(0,200,0,'+per.toFixed(2)+')';ctx.fill();ctx.closePath();});},info:function(ctx,cross,map){ctx.fillStyle='lime';ctx.textBaseline='top';ctx.font='10px courier';ctx.fillText('v'+cross.ver,10,10);ctx.fillText(cross.offset.x+','+cross.offset.y,10,20);ctx.fillText(map.percentKilled,10,30);}}}());var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var map=mapMod.create(),cross=crossMod.create({offsetX:0,offsetY:0});canvas.addEventListener('mousedown',crossMod.createEvent(cross,'start'));canvas.addEventListener('mouseup',crossMod.createEvent(cross,'end'));canvas.addEventListener('mousemove',crossMod.createEvent(cross,'move'));canvas.addEventListener('touchstart',crossMod.createEvent(cross,'start'));canvas.addEventListener('touchend',crossMod.createEvent(cross,'end'));canvas.addEventListener('touchmove',crossMod.createEvent(cross,'move'));var attack=function(e){var pos=utils.getCanvasRelative(e),cell=mapMod.getWithCross(map,cross,pos.x,pos.y);e.preventDefault();if(cell){cell.HP-=5;cell.HP=cell.HP<0?0:cell.HP;map.percentKilled=0;map.cells.forEach(function(cell){map.percentKilled+=cell.HP/cell.maxHP;});map.percentKilled/=map.cells.length;}};canvas.addEventListener('mousedown',attack);canvas.addEventListener('touchstart',attack);var lt=new Date();var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);crossMod.update(cross,secs);mapMod.clampOffset(map,cross.offset);draw.back(ctx,canvas);draw.map(ctx,map,cross);draw.cross(ctx,cross);draw.info(ctx,cross,map);lt=now;};loop();</script>


## 1 - The utility module

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


## 2 - The cross.js file

```js
var crossMod = (function () {
 
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
        create: function (opt) {
            opt = opt || {};
            return {
                ver: '0.1.0',
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

## 3 - The map.js file


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
 
        getWithCross: function (map, cross, canvasX, canvasY) {
            var x = canvasX - cross.center.x + Math.abs(cross.offset.x),
            y = canvasY - cross.center.y + Math.abs(cross.offset.y);
            return get(map, Math.floor(x / map.cellSize), Math.floor(y / map.cellSize));
        }
 
    }
 
}
    ());
```

## 4 - The draw.js file

```js
var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // draw cross hairs
        cross: function (ctx, cross) {
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
        // draw info
        info: function (ctx, cross, map) {
            ctx.fillStyle = 'lime';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('v' + cross.ver, 10, 10);
            ctx.fillText(cross.offset.x + ',' + cross.offset.y, 10, 20);
            ctx.fillText(map.percentKilled, 10, 30);
        }
    }
}
    ());
```

## 5 - Main.js

```js
// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var map = mapMod.create(),
cross = crossMod.create({
        offsetX: 0, //map.cellWidth * map.cellSize / 2 * -1,
        offsetY: 0 //map.cellHeight * map.cellSize / 2 * -1,
    });
 
canvas.addEventListener('mousedown', crossMod.createEvent(cross, 'start'));
canvas.addEventListener('mouseup', crossMod.createEvent(cross, 'end'));
canvas.addEventListener('mousemove', crossMod.createEvent(cross, 'move'));
 
canvas.addEventListener('touchstart', crossMod.createEvent(cross, 'start'));
canvas.addEventListener('touchend', crossMod.createEvent(cross, 'end'));
canvas.addEventListener('touchmove', crossMod.createEvent(cross, 'move'));
 
// attack!
var attack = function (e) {
    var pos = utils.getCanvasRelative(e),
    cell = mapMod.getWithCross(map, cross, pos.x, pos.y);
    e.preventDefault();
    if (cell) {
        cell.HP -= 5;
        cell.HP = cell.HP < 0 ? 0 : cell.HP;
        // percent killed
        map.percentKilled = 0;
        map.cells.forEach(function (cell) {
            map.percentKilled += cell.HP / cell.maxHP;
        });
        map.percentKilled /= map.cells.length;
    }
};
canvas.addEventListener('mousedown', attack);
canvas.addEventListener('touchstart', attack);
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
 
    crossMod.update(cross, secs);
    mapMod.clampOffset(map, cross.offset);
 
    draw.back(ctx, canvas);
    draw.map(ctx, map, cross);
    draw.cross(ctx, cross);
    draw.info(ctx, cross, map);
    lt = now;
};
 
loop();
```