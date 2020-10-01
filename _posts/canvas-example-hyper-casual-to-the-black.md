---
title: Canvas examples on animation basics and beyond
date: 2020-09-19 14:01:00
tags: [canvas]
layout: post
id: 708
categories: canvas
updated: 2020-10-01 05:22:03
version: 1.2
---

Time to take a new turn with my [canvas examples](/2020/03/23/canvas-example/) series of posts and focus on making quick hyper casual style games. So this post will be on an simple idea for a project that I am just going to call _into the black_. The basic idea is to just have a display object that is moving threw space and the game is just about seeing how far one can get until they get board and move on to something else.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var gameMod=(function(){var hardCode={maxDistance:Number.MAX_SAFE_INTEGER,ppsArray:[32,64,128,256,512,1024,2048,4096]};var api={};var centerShip=function(game){var ship=game.playerShip;ship.x=game.canvas.width/2-ship.w/2;};api.create=function(opt){opt=opt||{};var game={canvas:opt.canvas||{width:320,height:240},ppsIndex:opt.ppsIndex===undefined?0:opt.ppsIndex,pps:hardCode.ppsArray[opt.ppsIndex===undefined?0:opt.ppsIndex],distance:0,gamePer:0,startTime:opt.startTime||new Date(),target:{distance:opt.targetDistance===undefined?hardCode.maxDistance:targetDistance,timeUnit:opt.targetTimeUnit===undefined?'years':opt.targetTimeUnit,ETA:0},input:{right:false,left:false},playerShip:{x:0,y:0,w:32,h:32},distObj:opt.distObj||{}};centerShip(game);return game;};var secsToX=function(secs,x){x=x===undefined?'days':x;if(x==='minutes'){return secs/60;} if(x==='hours'){return secs/60/60;} if(x==='days'){return secs/60/60/24;} if(x==='years'){return secs/60/60/24/365.25;} return secs;};var setDistance=function(game,now){var storedSecs=0,storedDist=0;Object.keys(game.distObj).forEach(function(pps){var secs=game.distObj[pps];storedSecs+=secs;storedDist+=Number(pps)*secs;});var secs=(now-game.startTime)/1000-storedSecs,deltaDist=game.pps*secs;var current=game.distObj[game.pps];game.distObj[game.pps]=current===undefined?secs:current+secs;game.distance=storedDist+deltaDist;};var timeToDistance=function(game,distance){if(game.distance<distance){var secs=(distance-game.distance)/game.pps;return secs;} return 0;};api.update=function(game,secs,now){setDistance(game,now);game.distance=game.distance>hardCode.maxDistance?hardCode.maxDistance:game.distance;game.gamePer=game.distance/hardCode.maxDistance;var secsToTarget=timeToDistance(game,game.target.distance);game.target.ETA=secsToX(secsToTarget,game.target.timeUnit);var xPPS=0;xPPS=game.input.right?xPPS+32:xPPS;xPPS=game.input.left?xPPS-32:xPPS;game.playerShip.x+=xPPS*secs;game.playerShip.x=game.playerShip.x<0?0:game.playerShip.x;game.playerShip.x=game.playerShip.x>game.canvas.width-game.playerShip.w?game.canvas.width-game.playerShip.w:game.playerShip.x;game.playerShip.y=game.canvas.height-64;};return api;} ());var draw=(function(){var setBasicText=function(ctx){ctx.textBaseline='top';ctx.textAlign='left';ctx.font='10px arial';ctx.fillStyle='white';};var backgroundSolid=function(ctx,game,canvas){var c=Math.round(128-game.gamePer*128);ctx.fillStyle='rgba(0,'+c+','+c+',1)';ctx.fillRect(0,0,canvas.width,canvas.height);};var backgroundGrid=function(ctx,game,canvas){ctx.lineWidth=3;ctx.strokeStyle='#5a5a5a';var cellW=Math.floor(canvas.width/32)+2,cellH=Math.floor(canvas.height/32)+2;var x,y,i=0,len=cellW*cellH,dy=game.distance%256/256*32;while(i<len){x=i%cellW;y=Math.floor(i/cellW);ctx.beginPath();ctx.rect(-32+x*32,-32+dy+y*32,32,32);ctx.stroke();i+=1;}};var objectMethods={box:function(ctx,obj,game){ctx.fillStyle='green';ctx.fillRect(obj.x,obj.y,obj.w,obj.h);}};var drawObject=function(ctx,obj,game,method){method=method||'box';objectMethods[method](ctx,obj,game);};return{back:function(ctx,game,canvas){backgroundSolid(ctx,game,canvas);backgroundGrid(ctx,game,canvas);},textETA:function(ctx,game,x,y){var text='Target ETA: '+Number(game.target.ETA).toFixed(2)+' '+game.target.timeUnit;setBasicText(ctx);ctx.fillText(text,x,y);},textPPS:function(ctx,game,x,y){var text='PPS: '+game.pps;setBasicText(ctx);ctx.fillText(text,x,y);},textDistance:function(ctx,game,x,y){var text='Distance: '+Math.floor(game.distance);setBasicText(ctx);ctx.fillText(text,x,y);},playerShip:function(ctx,game){drawObject(ctx,game.playerShip,game,'box');},ver:function(ctx,state,x,y){var text='v'+state.ver;setBasicText(ctx);ctx.fillText(text,x,y);},}} ());var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var state={ver:'0.1.0',lt:new Date(),pointerDown:false,pointerPos:{},game:gameMod.create({canvas:canvas,startTime:new Date(),distObj:{},ppsIndex:0,distance:0,targetTimeUnit:'years'})};var loop=function(){var now=new Date(),t=now-state.lt,secs=t/1000;requestAnimationFrame(loop);gameMod.update(state.game,secs,now);draw.back(ctx,state.game,canvas);draw.playerShip(ctx,state.game);draw.textDistance(ctx,state.game,10,10);draw.textPPS(ctx,state.game,10,20);draw.textETA(ctx,state.game,10,30);draw.ver(ctx,state,2,canvas.height-12);state.lt=now;};loop();var getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();var x=(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y=(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top;return{x:x,y:y,bx:bx};};var setInputs=function(pos){if(pos.x<canvas.width/2){state.game.input.left=true;state.game.input.right=false;}else{state.game.input.left=false;state.game.input.right=true;}};var onPointerStart=function(e){var pos=state.pointerPos=getCanvasRelative(e);state.pointerDown=true;setInputs(pos);};var onPointerMove=function(e){var pos=state.pointerPos=getCanvasRelative(e);if(state.pointerDown){setInputs(pos);}};var onPointerStop=function(e){state.pointerDown=false;state.game.input.left=false;state.game.input.right=false;};canvas.addEventListener('mousedown',onPointerStart);canvas.addEventListener('mousemove',onPointerMove);canvas.addEventListener('mouseup',onPointerStop);</script>

## 1 - The game.js file

The game module of this example returns a public API with the usual create and update methods that are used to both create and update a game state model for this as is the case with many other canvas examples of mine thus far.

```js
var gameMod = (function () {
 
    var hardCode = {
       maxDistance: Number.MAX_SAFE_INTEGER, //1000000000000,
       ppsArray: [32, 64, 128, 256, 512, 1024, 2048, 4096]
    };
 
    var api = {};
 
    var centerShip = function(game){
        var ship = game.playerShip;
        ship.x = game.canvas.width / 2 - ship.w / 2;
    };
 
    api.create = function(opt){
        opt = opt || {};
        var game = {
            canvas: opt.canvas || {width: 320, height: 240},
            ppsIndex: opt.ppsIndex === undefined ? 0: opt.ppsIndex,
            pps: hardCode.ppsArray[opt.ppsIndex === undefined ? 0: opt.ppsIndex],//opt.pps || hardCode.ppsArray[0],
            distance: 0, //opt.distance === undefined ? 0 : opt.distance,
            gamePer: 0,
            startTime: opt.startTime || new Date(),
            target: {
                distance: opt.targetDistance === undefined ? hardCode.maxDistance : targetDistance,
                timeUnit: opt.targetTimeUnit === undefined ? 'years' : opt.targetTimeUnit,
                ETA: 0
            },
            input: {
                right: false,
                left: false
            },
            playerShip: {
                x: 0,
                y: 0,
                w: 32,
                h: 32
            },
            distObj: opt.distObj || {}
        };
        centerShip(game);
        return game;
    };
 
    var secsToX = function(secs, x){
        x = x === undefined ? 'days' : x;
        if(x === 'minutes'){
            return secs / 60;
        }
        if(x === 'hours'){
            return secs / 60 / 60;
        }
        if(x === 'days'){
            return secs / 60 / 60 / 24;
        }
        if(x === 'years'){
            return secs / 60 / 60 / 24 / 365.25;
        }
        return secs;
    };
 
    // set state distance based on startTime
    // and distObj of PPS and time key pairs
    var setDistance = function(game, now){
        // before I credit I first need to know the amount of time
        // and distance thus far
        var storedSecs = 0,
        storedDist = 0;
        Object.keys(game.distObj).forEach(function(pps){
            var secs = game.distObj[pps];
            storedSecs += secs;
            storedDist += Number(pps) * secs;
        });
        // now I can subtract storedSecs from secs and
        // use that to set Delta distance for current PPS
        var secs = (now - game.startTime) / 1000 - storedSecs,
        deltaDist = game.pps * secs;
        // update distObj for current PPS
        var current = game.distObj[game.pps];
        game.distObj[game.pps] = current === undefined ? secs : current + secs; 
        // now I can set distance
        game.distance = storedDist + deltaDist;
    };
 
    var timeToDistance = function(game, distance){
        if(game.distance < distance){
            var secs = (distance - game.distance) / game.pps;
            return secs;
        }
        return 0;
    };
 
    api.update = function(game, secs, now){
 
        // distance
        //game.distance = game.distance + game.pps * secs;
        setDistance(game, now);
        game.distance = game.distance > hardCode.maxDistance ? hardCode.maxDistance : game.distance;
        game.gamePer = game.distance / hardCode.maxDistance;
 
        // target
        var secsToTarget = timeToDistance(game, game.target.distance);
        game.target.ETA = secsToX(secsToTarget, game.target.timeUnit);
 
        // player display object
        var xPPS = 0;
        xPPS = game.input.right ? xPPS + 32: xPPS;
        xPPS = game.input.left ? xPPS - 32: xPPS;
        //game.playerShip.x = game.canvas.width / 2 - 16;
        game.playerShip.x += xPPS * secs;
        game.playerShip.x = game.playerShip.x < 0 ? 0 : game.playerShip.x;
        game.playerShip.x = game.playerShip.x > game.canvas.width - game.playerShip.w ? game.canvas.width - game.playerShip.w : game.playerShip.x;
        game.playerShip.y = game.canvas.height - 64;
    };
 
    return api;
}
    ());

```

## 2 - The draw.js file

Now that I have the game module worked out I will now want a draw module where I place all my code that will draw the state of a game object to a canvas element.

```js
var draw = (function () {
    var setBasicText = function(ctx){
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillStyle = 'white';
    };
 
    // background helpers
    var backgroundSolid = function(ctx, game, canvas){
        var c = Math.round(128 - game.gamePer * 128);
        ctx.fillStyle = 'rgba(0,'+c+','+c+',1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    var backgroundGrid = function(ctx, game, canvas){
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#5a5a5a';
        var cellW = Math.floor(canvas.width / 32) + 2,
        cellH = Math.floor(canvas.height / 32) + 2;
        var x, y, i=0, len = cellW * cellH,
        dy = game.distance % 256 / 256 * 32;
        while(i < len){
            x = i % cellW;
            y = Math.floor(i / cellW);
            ctx.beginPath();
            ctx.rect(-32 + x * 32, -32 + dy + y * 32, 32, 32);
            ctx.stroke();
            i += 1;
        }
    };
 
    var objectMethods = {
        box: function(ctx, obj, game){
            ctx.fillStyle = 'green';
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        }
    };
 
    var drawObject = function(ctx, obj, game, method){
        method = method || 'box';
        objectMethods[method](ctx, obj, game);
    };
 
    return {
        // draw background
        back: function (ctx, game, canvas) {
            backgroundSolid(ctx, game, canvas);
            backgroundGrid(ctx, game, canvas);
        },
        textETA: function(ctx, game, x, y){
            var text = 'Target ETA: ' + Number(game.target.ETA).toFixed(2) + ' ' + game.target.timeUnit;
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        textPPS: function(ctx, game, x, y){
            var text = 'PPS: ' + game.pps;
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        textDistance: function(ctx, game, x, y){
            var text = 'Distance: ' + Math.floor(game.distance);
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        playerShip: function(ctx, game){
            drawObject(ctx, game.playerShip, game, 'box');
        },
        ver: function(ctx, state, x, y){
            var text = 'v' + state.ver;
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
    }
}
    ());
```