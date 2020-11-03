---
title: Mr sun canvas example
date: 2020-11-03 12:24:00
tags: [canvas]
layout: post
categories: canvas
id: 735
updated: 2020-11-03 16:51:21
version: 1.12
---

I want a [canvas example](/2020/03/23/canvas-example/) that will be a simple [god game](https://en.wikipedia.org/wiki/God_game), or a kind of game where things move forward on there own, and there is just a little interaction from the player now and then. I have come to like to play, and make these kinds of games these days. Playing a game can end up eating up a lot of time, so I like games that just move along on there own, and I can just step in and make a few changes now and then. Games like sim city, and roller coaster tycoon come to mind when it comes to this.

Anyway the canvas example that I had in mind here is a game where there is this world where there is a sun at the center of a circle, and the rest of the world is along the circumference of this circle. By default the sun starts at the center of this circle world, but the player can move it to any location within this world. The circumference of the outer circle of this world is divided into sections, and each section object has a percentage value, and this percentage value is effected by the distance of the section to the sun object.

There is a lot that comes to mind when it comes to moving forward with this kind of project. but one must start somewhere right? So with that said lets take a look at what I have so far with this one.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));};var gameMod=(function(){var api={};api.create=function(opt){opt=opt||{};opt.canvas=opt.canvas||{width:320,height:240};var game={};game.centerX=opt.centerX||opt.canvas.width/2;game.centerY=opt.centerY||opt.canvas.height/2;game.sectionRadius=opt.sectionRadius||16;game.worldRadius=opt.worldRadius||100;game.sun={radius:16,x:game.centerX,y:game.centerY};var i=0,sections=[],total=opt.sectionCount||20,radian,cx=game.centerX,cy=game.centerY;while(i<total){radian=Math.PI*2/total*i;sections.push({x:Math.cos(radian)*game.worldRadius+cx,y:Math.sin(radian)*game.worldRadius+cy,radius:game.sectionRadius,per:1});i+=1;} game.sections=sections;gameMod.updateSections(game);return game;};api.updateSections=function(game){var sun=game.sun;game.sections.forEach(function(section){var ajust=section.radius+sun.radius;var d=utils.distance(section.x,section.y,sun.x,sun.y)-ajust;var per=d/(game.worldRadius*2-ajust*2);per=per>1?1:per;per=per<0?0:per;per=1-per;section.per=per;});};var boundToCircle=function(obj,cx,cy,radius){if(utils.distance(obj.x,obj.y,cx,cy)>radius){var a=Math.atan2(obj.y-cy,obj.x-cx);obj.x=cx+Math.cos(a)*radius;obj.y=cy+Math.sin(a)*radius;}};api.moveSun=function(game,pos){var ajust=game.sun.radius+game.sectionRadius;game.sun.x=pos.x;game.sun.y=pos.y;boundToCircle(game.sun,game.centerX,game.centerY,game.worldRadius-ajust);api.updateSections(sm.game);};return api;}());var draw=(function(){var api={};api.back=function(sm){sm.ctx.fillStyle='#202020';sm.ctx.fillRect(0,0,sm.canvas.width,sm.canvas.height);};api.sections=function(sm){var ctx=sm.ctx;sm.game.sections.forEach(function(section){var b=50+Math.round(section.per*128);ctx.fillStyle='rgb(0,0,'+b+')';ctx.beginPath();ctx.arc(section.x,section.y,section.radius,0,Math.PI*2);ctx.fill();ctx.fillStyle='white';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='10px arial';ctx.fillText(Math.round(section.per*100),section.x,section.y);});};api.sun=function(sm){var sun=sm.game.sun;sm.ctx.fillStyle='yellow';sm.ctx.beginPath();sm.ctx.arc(sun.x,sun.y,sun.radius,0,Math.PI*2);sm.ctx.fill();};api.ver=function(sm){var ctx=sm.ctx;ctx.fillStyle='white';ctx.textAlign='left';ctx.textBaseline='top';ctx.font='10px courier';ctx.fillText('v'+sm.ver,10,sm.canvas.height-15);};return api;} ());var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var states={game:{init:function(sm){sm.game=gameMod.create({canvas:sm.canvas,sectionCount:19,worldRadius:100});},update:function(sm,secs){draw.back(sm);draw.sections(sm);draw.sun(sm);draw.ver(sm);},pointerStart:function(sm,pos,e){},pointerMove:function(sm,pos,e){var sun=sm.game.sun;if(sm.input.pointerDown){gameMod.moveSun(sm.game,pos);}},pointerEnd:function(){}}};var sm={ver:'0.0.0',canvas:canvas,currentState:'game',ctx:ctx,game:{},input:{pointerDown:false,pos:{x:0,y:0}}};var pointerHanders={start:function(sm,pos,e){var pos=sm.input.pos;sm.input.pointerDown=true;states[sm.currentState].pointerStart(sm,pos,e);},move:function(sm,pos,e){states[sm.currentState].pointerMove(sm,pos,e);},end:function(sm,pos,e){sm.input.pointerDown=false;states[sm.currentState].pointerEnd(sm,pos,e);}};var createPointerHandler=function(sm,type){return function(e){var pos=utils.getCanvasRelative(e);sm.input.pos=pos;e.preventDefault();pointerHanders[type](sm,pos,e);};};canvas.addEventListener('mousedown',createPointerHandler(sm,'start'));canvas.addEventListener('mousemove',createPointerHandler(sm,'move'));canvas.addEventListener('mouseup',createPointerHandler(sm,'end'));canvas.addEventListener('touchstart',createPointerHandler(sm,'start'));canvas.addEventListener('touchmove',createPointerHandler(sm,'move'));canvas.addEventListener('touchend',createPointerHandler(sm,'end'));states[sm.currentState].init(sm);var lt=new Date(),FPS_target=30;var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);if(t>=1000/FPS_target){states[sm.currentState].update(sm,secs);lt=now;}};loop();</script>

## 1 - The utils module for Mr Sun

To start off this canvas example I will want to start a general utility module for it. As a canvas example grows I want a module where I can place methods that I might end up using in more than one location when it comes to having a bunch of modules that will make up the whole of the code.

```js
var utils = {};
 
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
 
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

For this canvas example I have my get canvas relative method that I want to help with getting a canvas relative position when it comes to working with pointer events. In addition I also have the distance formula, which is yet another usual suspect when it comes to these kinds of custom cut utility modules that I make for these examples.

## 2 - The game module for Mr Sun

So now for the game modules that will be used to create and update a game state module. For this canvas example there is the sun object, and then a collection of sections objects that are the main display objects of interest here. The public API of this main game module has a method for creating a new game object, updating the sections of the game object, and moving the sun object.

```js
var gameMod = (function(){
    // public API
    var api = {};
    // create a new game state object
    api.create = function(opt){
        opt = opt || {};
        opt.canvas = opt.canvas || {width: 320, height: 240 };
 
        // base object
        var game = {};
        game.centerX = opt.centerX || opt.canvas.width / 2;
        game.centerY = opt.centerY || opt.canvas.height / 2;
        game.sectionRadius = opt.sectionRadius || 16;
        game.worldRadius = opt.worldRadius || 100;
 
        // sun object
        game.sun = {
            radius: 16,
            x: game.centerX,
            y: game.centerY
        };
 
        // setup sections
        var i = 0,
        sections = [],
        total = opt.sectionCount || 20,
        radian,	
        cx = game.centerX,
        cy = game.centerY;
        while(i < total){
            radian = Math.PI * 2 / total * i;
            sections.push({
                x: Math.cos(radian) * game.worldRadius + cx,
                y: Math.sin(radian) * game.worldRadius + cy,
                radius: game.sectionRadius,
                per: 1
            });
            i += 1;
        }
        game.sections = sections;
        gameMod.updateSections(game);
        return game;
    };
    // update sections
    api.updateSections = function(game){
        var sun = game.sun;
        game.sections.forEach(function(section){
            var ajust = section.radius + sun.radius;
            var d = utils.distance(section.x, section.y, sun.x, sun.y) - ajust;
            var per = d / (game.worldRadius * 2 - ajust * 2);
            per = per > 1 ? 1: per;
            per = per < 0 ? 0: per;
            per = 1 - per;
            section.per = per;
        });
    };
    // move sun
    var boundToCircle = function(obj, cx, cy, radius){
        if(utils.distance(obj.x, obj.y, cx, cy) > radius){
            var a = Math.atan2(obj.y - cy, obj.x - cx);
            obj.x = cx + Math.cos(a) * radius;
            obj.y = cy + Math.sin(a) * radius;
        }
    };
    api.moveSun = function(game, pos){
        var ajust = game.sun.radius + game.sectionRadius;
        game.sun.x = pos.x;
        game.sun.y = pos.y;
        boundToCircle(game.sun, game.centerX, game.centerY, game.worldRadius - ajust);
        api.updateSections(sm.game);
    };
    // return the Public API
    return api;
 
}());
```

The main idea here is to keep the code that has to do with creating and mutating a game state object away from everything else.

## 3 - The draw module for Mr Sun

This is very much a canvas example so of course I have a draw.js module for it like always. I take a moment to break things down into a while much of draw methods, one for each little aspect of the view for this. I have a draw method just for the background, one to draw the sun, and another to draw the sections of the sun thus far.

```js
var draw = (function () {
    // public API
    var api = {};
    // draw background
    api.back = function (sm) {
        sm.ctx.fillStyle = '#202020';
        sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
    };
    // draw sections
    api.sections = function (sm) {
        var ctx = sm.ctx;
        sm.game.sections.forEach(function (section) {
            var b = 50 + Math.round(section.per * 128);
            ctx.fillStyle = 'rgb(0,0,' + b + ')';
            ctx.beginPath();
            ctx.arc(section.x, section.y, section.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '10px arial';
            ctx.fillText(Math.round(section.per * 100), section.x, section.y);
        });
    };
    // draw sun
    api.sun = function (sm) {
        var sun = sm.game.sun;
        sm.ctx.fillStyle = 'yellow';
        sm.ctx.beginPath();
        sm.ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        sm.ctx.fill();
    };
    // draw version number
    api.ver = function (sm) {
        var ctx = sm.ctx;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';
        ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
    };
    // return the Public API
    return api;
}
    ());
```

## 4 - Main.js

Now that I have mu utility library, a game module, and a draw module it is time to make use of it all in my main javaScript file. In this file I am creating the canvas element for the example, and appending it to the html. I am also starting the beginnings of a basic, yet effective state machine that so far is just a main game state. In addition I m also attaching events for pointer input for the example, and there is also the main app loop for the project.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var states = {
    game: {
        init: function(sm){
            // setup sun object
            sm.game = gameMod.create({
                canvas: sm.canvas,
                sectionCount: 19,
                worldRadius: 100
            });
        },
        // for each update tick
        update: function (sm, secs) {
            draw.back(sm);
            draw.sections(sm);
            draw.sun(sm);
            draw.ver(sm);
        },
        // events
        pointerStart: function (sm, pos, e) {},
        pointerMove: function (sm, pos, e) {
            var sun = sm.game.sun;
            if(sm.input.pointerDown){
                gameMod.moveSun(sm.game, pos);
            }
        },
        pointerEnd: function () {}
    }
};
 
var sm = {
    ver: '0.0.0',
    canvas: canvas,
    currentState: 'game',
    ctx: ctx,
    game: {},
    input: {
        pointerDown: false,
        pos: {
            x: 0,
            y: 0
        }
    }
};
 
// Pointer Events
var pointerHanders = {
    start: function (sm, pos, e) {
        var pos = sm.input.pos;
        sm.input.pointerDown = true;
        states[sm.currentState].pointerStart(sm, pos, e);
    },
    move: function (sm, pos, e) {
        states[sm.currentState].pointerMove(sm, pos, e);
    },
    end: function (sm, pos, e) {
        sm.input.pointerDown = false;
        states[sm.currentState].pointerEnd(sm, pos, e);
    }
};
var createPointerHandler = function (sm, type) {
    return function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.input.pos = pos;
        e.preventDefault();
        pointerHanders[type](sm, pos, e);
    };
};
 
// attach for mouse and touch
canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
 
// init current state
states[sm.currentState].init(sm);
 
// loop
var lt = new Date(),
FPS_target = 30;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= 1000 / FPS_target) {
        states[sm.currentState].update(sm, secs);
        lt = now;
    }
};
loop();
```

## 5 - Conclusion

When I have this canvas example up and running I have the very basic idea of what I had in mind working at least. So far so good, but now the next step is where to go from here. There are many ideas that I have in mind when it comes to moving forward with this example when it comes to turning it into an actual game of one kind or another. I am thinkg that I will want to have some code that serve as a more complex world generator, that will set different types for the various sections in the world. That is having a section that is a land type, ocean, swamp, mountain, ect. There would also be a process where life will spring up if conditions are right for it. Of course it goes without saying that moving the sun around will chnage the situation for that. 

So then the idea here is to have a world that can be left alone, or at any moment I can come along and move the sun around destroying everything, or make it so that one side is way to hot, and the other side is ice cold.