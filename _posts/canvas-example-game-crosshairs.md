---
title: Canvas example of a cross hairs game
date: 2020-07-29 15:44:00
tags: [canvas]
layout: post
categories: canvas
id: 689
updated: 2020-07-31 09:09:47
version: 1.14
---

For this weeks [canvas example](/2020/03/23/canvas-example/) post I made a quick little cross hairs type game. So far this is a game where I just use the mouse or touch events to move a cross hairs object around the canvas. The general idea here is that the cross hairs object is used to move around but also to fire. So the cross hairs object can be moved from an inner area in the center of the canvas to an outer area outside of this inner area, when that happens the cross hairs object is used to move around a map. The player can also just tap around in the inner area to do damage to cells in the map for now when it just comes to having something to do with this.

The idea beyond just how to go about moving around and attacking, and doing so with just touch events is the main thing I had in mind with this one. So at the time that I started this not much thought went into the other aspects of this that can help turn it into more of an actually game. I think that it might be fun to have a game where you just go around and shoot at stuff below you and just rack up a whole lot of damage on what there is below you. Maybe put some things in the fire back also so that it is a kind of game where it is possible to, you know loose. In any case at the tie of this writing at least the main focus was just making a module that just creates, and updates an object that is used to move around a map.

I made [another canvas example that is like this one that I called just simply pointer movement](/2020/01/26/canvas-example-pointer-movement/). That one was programed a little differently from this one as that was just simply a means to move around a map by clicking and dragging away from the point that was clicked. Here I have a set of circles fixed at the center of the canvas, or any other location that I choose to fix these circle areas to.There is an outer circle area that is used to move around based on the distance from the end of the inner circle rather than the center point. In addition the inner circle area will not result in any movement, but is used as an array where you can shoot at things, but not move. So I guess this kind of interface can be programed a whole bunch of different ways, but it is still more or less the same basic thing.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};};var crossMod=(function(){var isInOuter=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusInner;};var isOutOfBounds=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusOuter;};var moveOffset=function(cross,secs){var ch=cross.crosshairs,center=cross.center,d1=utils.distance(ch.x,ch.y,center.x,center.y),diff=cross.radiusOuter-cross.radiusInner,d2=d1-cross.radiusInner,per=d2/diff;if(d1>cross.radiusInner){cross.offset.x+=Math.cos(ch.heading)*cross.offset.pps*per*secs;cross.offset.y+=Math.sin(ch.heading)*cross.offset.pps*per*secs;}};return{create:function(opt){opt=opt||{};return{ver:'0.1.0',userDown:false,pps:opt.pps||128,radiusInner:opt.radiusInner||(240/4),radiusOuter:opt.radiusOuter||(240/2.125),center:{x:opt.cx||(320/2),y:opt.cy||(240/2)},crosshairs:{x:320/2,y:240/2,heading:0,radius:16},offset:{x:opt.offsetX||0,y:opt.offsetY||0,pps:256}};},update:function(cross,secs){secs=secs||0;var ch=cross.crosshairs,center=cross.center;ch.heading=Math.atan2(center.y-ch.y,center.x-ch.x);if(isInOuter(cross)){if(!cross.userDown){ch.x+=Math.cos(ch.heading)*cross.pps*secs;ch.y+=Math.sin(ch.heading)*cross.pps*secs;}moveOffset(cross,secs);}if(isOutOfBounds(cross)){ch.x=center.x+Math.cos(ch.heading+Math.PI)*cross.radiusOuter;ch.y=center.y+Math.sin(ch.heading+Math.PI)*cross.radiusOuter;}},createEvent:function(cross,eventType){return function(e){e.preventDefault();var pos=utils.getCanvasRelative(e);if(eventType==='start'){cross.userDown=true;cross.crosshairs.x=pos.x;cross.crosshairs.y=pos.y;}if(eventType==='end'){cross.userDown=false;}if(eventType==='move'&&cross.userDown){cross.crosshairs.x=pos.x;cross.crosshairs.y=pos.y;}};}}}());var mapMod=(function(){var get=function(map,x,y){return map.cells[y*map.cellWidth+x];};return{create:function(){var map={cellSize:32,cellWidth:32,cellHeight:16,cells:[],percentKilled:0};var i=0,x,y,len=map.cellWidth*map.cellHeight;while(i<len){map.cells.push({i:i,x:i%map.cellWidth,y:Math.floor(i/map.cellWidth),HP:100,maxHP:100});i+=1;}return map;},clampOffset:function(map,offset){offset.x=offset.x>0?0:offset.x;offset.y=offset.y>0?0:offset.y;offset.x=offset.x<map.cellWidth*map.cellSize* -1?map.cellWidth*map.cellSize* -1:offset.x;offset.y=offset.y<map.cellHeight*map.cellSize* -1?map.cellHeight*map.cellSize* -1:offset.y;},getWithCross:function(map,cross,canvasX,canvasY){var x=canvasX-cross.center.x+Math.abs(cross.offset.x),y=canvasY-cross.center.y+Math.abs(cross.offset.y);return get(map,Math.floor(x/map.cellSize),Math.floor(y/map.cellSize));}}}());var draw=(function(){return{back:function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);},cross:function(ctx,cross){ctx.strokeStyle='white';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusInner,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusOuter,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cross.crosshairs.x,cross.crosshairs.y,cross.crosshairs.radius,0,Math.PI*2);ctx.stroke();},map:function(ctx,map,cross){ctx.strokeStyle='grey';ctx.lineWidth=3;map.cells.forEach(function(cell){var x=cell.x*map.cellSize+cross.offset.x+(320/2),y=cell.y*map.cellSize+cross.offset.y+(240/2),per=cell.HP/cell.maxHP;ctx.beginPath();ctx.rect(x,y,map.cellSize,map.cellSize);ctx.stroke();ctx.fillStyle='rgba(0,200,0,'+per.toFixed(2)+')';ctx.fill();ctx.closePath();});},info:function(ctx,cross,map){ctx.fillStyle='lime';ctx.textBaseline='top';ctx.font='10px courier';ctx.fillText('v'+cross.ver,10,10);ctx.fillText(cross.offset.x+','+cross.offset.y,10,20);ctx.fillText(map.percentKilled,10,30);}}}());var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var map=mapMod.create(),cross=crossMod.create({offsetX:0,offsetY:0});canvas.addEventListener('mousedown',crossMod.createEvent(cross,'start'));canvas.addEventListener('mouseup',crossMod.createEvent(cross,'end'));canvas.addEventListener('mousemove',crossMod.createEvent(cross,'move'));canvas.addEventListener('touchstart',crossMod.createEvent(cross,'start'));canvas.addEventListener('touchend',crossMod.createEvent(cross,'end'));canvas.addEventListener('touchmove',crossMod.createEvent(cross,'move'));var attack=function(e){var pos=utils.getCanvasRelative(e),cell=mapMod.getWithCross(map,cross,pos.x,pos.y);e.preventDefault();if(cell){cell.HP-=5;cell.HP=cell.HP<0?0:cell.HP;map.percentKilled=0;map.cells.forEach(function(cell){map.percentKilled+=cell.HP/cell.maxHP;});map.percentKilled/=map.cells.length;}};canvas.addEventListener('mousedown',attack);canvas.addEventListener('touchstart',attack);var lt=new Date();var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);crossMod.update(cross,secs);mapMod.clampOffset(map,cross.offset);draw.back(ctx,canvas);draw.map(ctx,map,cross);draw.cross(ctx,cross);draw.info(ctx,cross,map);lt=now;};loop();</script>


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

I then have my public API of this module that contains methods for both creating and updating a cross state object. In addition I have a methd that can be used as a way to create event handers for a cross object that can be used for both mouse and touch events. this is where by utility method that has to do with getting a canvas relative position comes into play.

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

So now that I have mt modules for creating state objects, I will now want a module with methods that are used to draw aspects of these state objects to a canvas element.

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

## 5 - Now for a Main.js file along with a main app loop

So now I need some additional code to pull everything together here in a main.js file that will be used after everything else is in place to work with. Here I create and inject a canvas element into a hard coded container element that I have in my html. I create instances of a map and cross state objects, and attach a whole bunch of event handers for mouse and touch events using the create event method of the cross module.

I then have an attack method that I will likely work into the map module, or some kind of future module that has to do with a weapons or something to that effect. I do not want to get into to much detail with that because at some point in the future I will just have to re write what I have to say about it when it comes to putting a little more time into this canvas example, because I think this one needs and deserve more work.

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
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So that is it when this canvas example is up and running I am able to move around and when I click on the map I cause damage to the areas that I click. Nothing to interesting at the point of this writing at least, but I think that this one has some decent potential when it comes to putting a little more time into it. I do have many other canvas examples in a state like this also that need more attention, but I am sure I will come back around to this one at some point.

## 6 - Conclusion

So now I have the basic idea of what I had in mind together at least, now it is just a question of what more I can do to it to make it more interesting. There is making it so that each time the player clicks or touches an area in the inner circle that casues a shot to fire from one side of the canvas or another to the point where such an event happened. So there is adding much more when it comes to weapons and what it is that we are shooting at. In addition there is doing something so that there are units in the map the shoot back at the player also.