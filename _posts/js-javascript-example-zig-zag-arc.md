---
title: Linear percent values to other zig zag and arc percent values as a javaScript example
date: 2020-08-10 13:46:00
tags: [js]
layout: post
categories: js
id: 693
updated: 2021-04-15 14:53:45
version: 1.17
---
When making a javaScript project that is some kind of game or something to that effect I often end up working with percentage values that are in the from of a number between and including zero and one. So I thought I would work out a quick [javaScript example](/2021/04/02/js-javascript-example/) that makes use of some custom utility methods that take a percentage value and return another percentage value that does not go from zero to one in a linear way.

In other words there is just taking a value like 25 and diving it over 100 to get 0.25, and as I increase the first value that is the numerator by one on each update then the value between zero and one will go up in a way in which the change can be graphed as a straight line. Another way of thinking about this is having a box and having a straight line draw from the bottom left corner to the upper left corner. However sometimes I might want things to move or update in a way that would be graphed in a different way than that.

So then it would make sense to create at least one, if not a few javaScript examples where I just want to break free from updating things in a one up, and one over kind of way. In this post I will be doing just that with a little javaScript code, and I think I will also be making this a kind of canvas example of sorts also to really get an idea of what this is all about.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script> var utils={};utils.linPerToZigZagPer=function(linPer,waveCount){waveCount=waveCount===undefined?1:waveCount;var radian=Math.PI*waveCount*linPer;return 1-Math.abs(Math.cos(radian));};utils.linPerToArcPer=function(linPer){return utils.linPerToZigZagPer(linPer,1);};utils.linPerToBiasPer=function(linPer){return 1-Math.abs(0.5-linPer)/0.5;};var gameMod=(function(){var dispUpdateMethods=[function(disp,state,secs){var per=disp.i/disp.iMax,arcPer=utils.linPerToArcPer(per),h=state.mainBox.height-disp.h/2;disp.y=h-h*arcPer;},function(disp,state,secs){var per=disp.i/disp.iMax,zigPer=utils.linPerToZigZagPer(per,disp.waves),w=state.mainBox.width-disp.w/2,h=state.mainBox.height-disp.h;disp.x=disp.w/2+w*zigPer;disp.y=h*per;}];var api={};var createDispObject=function(){var disp={active:false,x:0,y:0,w:32,h:32,i:0,iMax:200,updateMethodIndex:1};return disp;};var createPool=function(count){var pool=[],i=0;while(i<count){pool.push(createDispObject());i+=1;} return pool;};var getNextInactive=function(pool){var i=0,len=pool.length;while(i<len){if(!pool[i].active){return pool[i];} i+=1;} return false;};api.create=function(mainBox){mainBox=mainBox||{width:320,height:240};var state={ver:'0.0.0',mainBox:mainBox,spawn:{rate:0.5,secs:0},pool:createPool(20)};return state;};api.update=function(state,secs){state.spawn.secs+=secs;if(state.spawn.secs>=state.spawn.rate){var disp=getNextInactive(state.pool),w;if(disp){disp.active=true;disp.i=0;disp.waves=2+Math.floor(3*Math.random());w=state.mainBox.width-(disp.w/2);disp.x=disp.w/2+w-w*Math.random();disp.updateMethodIndex=Math.floor(dispUpdateMethods.length*Math.random());} state.spawn.secs%=state.spawn.rate;} var i=0,len=state.pool.length,disp;while(i<len){disp=state.pool[i];if(disp.active){disp.i+=1;if(disp.i>=disp.iMax){disp.active=false;}else{dispUpdateMethods[disp.updateMethodIndex](disp,state,secs);}} i+=1;}};return api;} ());var draw={};draw.back=function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);};draw.pool=function(ctx,game){var pool=game.pool;ctx.fillStyle='red';ctx.strokeStyle='white';ctx.lineWidth=3;pool.forEach(function(disp){var bias=utils.linPerToBiasPer(disp.i/disp.iMax);if(disp.active){ctx.save();ctx.translate(disp.x,disp.y);ctx.globalAlpha=0.25+0.75*bias;ctx.beginPath();ctx.rect(disp.w/2* -1,disp.h/2* -1,disp.w,disp.h);ctx.fill();ctx.stroke();ctx.restore();}});};draw.info=function(ctx,game){ctx.fillStyle='gray';ctx.textBaseline='top';ctx.font='10px courier';ctx.fillText('v'+game.ver,5,game.mainBox.height-15);};var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var game=gameMod.create(canvas);var lt=new Date();var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);gameMod.update(game,secs);draw.back(ctx,canvas);draw.pool(ctx,game);draw.info(ctx,game);lt=now;};loop();</script>


## 1 - The utility module

So here I made a utilities module with a few methods that take a percentage value as a first argument and returns another percentage as a product. What I had in mind was a function that I can use to turn a percentage value that would otherwise go up in a linear kind of way, and get a percentage value that goes up by way of a curve instead. So I am going to want to just work out a few methods that make use of something like Math.cos, and or Math.log.

```js
var utils = {};
 
utils.linPerToZigZagPer = function (linPer, waveCount) {
    waveCount = waveCount === undefined ? 1 : waveCount;
    var radian = Math.PI * waveCount * linPer;
        return 1 - Math.abs(Math.cos(radian));
};
 
utils.linPerToArcPer = function (linPer) {
    return utils.linPerToZigZagPer(linPer, 1);
};
 
utils.linPerToBiasPer = function (linPer) {
    return 1 - Math.abs(0.5 - linPer) / 0.5;
};
```

## 2 - A Game module that makes use of the methods

So now that I have my utility module I now want to work out a quick module that will make use of the methods in it. I am thinking that I have a module that will create a basic [object pool](/2020/07/20/canvas-example-object-pool/), and then update the positions of the display objects in the pool using these methods that i have worked out in my utility module there.

So then this game module if you can call it that will contain just two public methods one to create a game state object and the other to update such an object. Inside the private area of the module I have an array of methods that are used to update the position of an active display object in the object pool that make used of the two methods that return percent values.

```js
var gameMod = (function () {
 
    var dispUpdateMethods = [
        function (disp, state, secs) {
            var per = disp.i / disp.iMax,
            arcPer = utils.linPerToArcPer(per),
            h = state.mainBox.height - disp.h / 2;
            disp.y = h - h * arcPer;
        },
        function (disp, state, secs) {
            var per = disp.i / disp.iMax,
            zigPer = utils.linPerToZigZagPer(per, disp.waves),
            w = state.mainBox.width - disp.w / 2,
            h = state.mainBox.height - disp.h;
            disp.x = disp.w / 2 + w * zigPer;
            disp.y = h * per;
        }
    ];
 
    var api = {};
 
    var createDispObject = function () {
        var disp = {
            active: false,
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            i: 0,
            iMax: 200,
            updateMethodIndex: 1
        };
        return disp;
    };
 
    var createPool = function (count) {
        var pool = [],
        i = 0;
        while (i < count) {
            pool.push(createDispObject());
            i += 1;
        }
        return pool;
    };
 
    var getNextInactive = function (pool) {
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
 
    // create
    api.create = function (mainBox) {
        mainBox = mainBox || {
            width: 320,
            height: 240
        };
        var state = {
            ver: '0.0.0',
            mainBox: mainBox,
            spawn: {
                rate: 0.5,
                secs: 0
            },
            pool: createPool(20)
        };
        return state;
    };
 
    // update
    api.update = function (state, secs) {
 
        state.spawn.secs += secs;
        if (state.spawn.secs >= state.spawn.rate) {
            // make inactive disps active
            var disp = getNextInactive(state.pool),
            w;
            if (disp) {
                disp.active = true;
                disp.i = 0;
                disp.waves = 2 + Math.floor(3 * Math.random());
                w = state.mainBox.width - (disp.w / 2);
                disp.x = disp.w / 2 + w - w * Math.random();
                disp.updateMethodIndex = Math.floor(dispUpdateMethods.length * Math.random());
            }
            state.spawn.secs %= state.spawn.rate;
        }
 
        // update disps
        var i = 0,
        len = state.pool.length,
        disp;
        while (i < len) {
            disp = state.pool[i];
            if (disp.active) {
                disp.i += 1;
                if (disp.i >= disp.iMax) {
                    disp.active = false;
                } else {
                    dispUpdateMethods[disp.updateMethodIndex](disp, state, secs);
                }
            }
            i += 1;
        }
 
    };
 
    return api;
 
}
    ());
```

## 3 - Draw to a canvas element

One way to go about drawing the state of things in a client side environment would be to use canvas, so I worked out a few quick draw methods to be used with canvas which is what I often do when going in that direction. I generally always like to separate javaScript code that has to do with the creating and mutation of a module away from code that draws that model to a canvas element.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.pool = function (ctx, game) {
    var pool = game.pool;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    pool.forEach(function (disp) {
        var bias = utils.linPerToBiasPer(disp.i / disp.iMax);
        if (disp.active) {
            ctx.save();
            ctx.translate(disp.x, disp.y);
            ctx.globalAlpha = 0.25 + 0.75 * bias;
            ctx.beginPath();
            ctx.rect(disp.w / 2 * -1, disp.h / 2 * -1, disp.w, disp.h);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    });
};
 
draw.info = function (ctx, game) {
    ctx.fillStyle = 'gray';
    ctx.textBaseline = 'top';
    ctx.font = '10px courier';
    ctx.fillText('v' + game.ver, 5, game.mainBox.height - 15);
};
```

## 4 - Main javaScript and HTML

Now for just a little more client side javaScript to make use of what it is that I have worked out with the game, and draw modules. I am going to want a little jaavScript code that will create and inject a canvas element that I will then use with my draw module along with a state object that I created with the game module.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var game = gameMod.create(canvas);
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    gameMod.update(game, secs);
 
    draw.back(ctx, canvas);
    draw.pool(ctx, game);
    draw.info(ctx, game);
    lt = now;
};
 
loop();
```

And just a little html to tie it all up together.

```html
<html>
    <head>
        <title>javaScript example zig zag arc</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When this javaScript example is up and running in the browser I have display objects become active, and follow one of the two update methods that are used to update position as expected. In this example I am using the methods as a way to help directly set position, but in other projects that could be used to set other values such as a pixels per second speed rate or something to that effect.

## 5 - Conclusion

So I just wanted to get together a quick javaScript example that makes use of some methods that will create and return percentage values that go up in a way that is different from just what is usual when diving a numerator type value over a denominator type value. Now from this post forward the question is how does any of this apply to some kind of real project. Well there are lots of things that come to mind, but thus far most of it is artful stuff rather that practical stuff.