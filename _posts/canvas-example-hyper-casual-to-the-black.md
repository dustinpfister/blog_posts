---
title: Canvas examples on animation basics and beyond
date: 2020-09-19 14:01:00
tags: [canvas]
layout: post
id: 708
categories: canvas
updated: 2021-02-27 16:33:18
version: 1.10
---

Time to take a new project with my [canvas examples](/2020/03/23/canvas-example/) series of posts and focus on making quick hyper casual style games. So this post will be on an simple idea for a project that I am just going to call _into the black_. The basic idea is to just have a display object that is moving threw space and the game is just about seeing how far one can get until they get board and move on to something else.

It seems like it is a good idea to do something to find out how long it will take for a player to play threw one of my idle games. I say this because when I play one of my own games, or write some code to automate that process it seems that I sometimes end up playing threw the game way to fast. I would want to have games designed in a way in which people would keep coming back rather than just play threw the game and then  stop playing. So an idea for this project came to mind where I just divide a distance by a distance per second rate to get the amount of time it will take to go that distance. I can then do things to increase the speed and wherefore reduce the amount of time it will take to move that distance.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.mod=function mod(x,m){return(x%m+m)%m;};utils.boundingBox=function(x1,y1,w1,h1,x2,y2,w2,h2){return!((y1+h1)<y2||y1>(y2+h2)||(x1+w1)<x2||x1>(x2+w2));};var poolMod=(function(){var api={};var getInactive=function(pool){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(!obj.active){return obj;}} return false;};api.create=function(opt){opt=opt||{};opt.count=opt.count||10;var i=0,pool={objects:[],data:opt.data||{},spawn:opt.spawn||function(obj,pool,state,opt){},purge:opt.purge||function(obj,pool,state){},update:opt.update||function(obj,pool,state,secs){}};while(i<opt.count){pool.objects.push({active:false,i:i,x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,w:opt.w===undefined?32:opt.w,h:opt.h===undefined?32:opt.h,heading:opt.heading===undefined?0:opt.heading,pps:opt.pps===undefined?32:opt.pps,lifespan:opt.lifespan||3,data:{}});i+=1;} return pool;};api.spawn=function(pool,state,opt){var obj=getInactive(pool);state=state||{};opt=opt||{};if(obj){if(!obj.active){obj.active=true;pool.spawn.call(pool,obj,pool,state,opt);return obj;}} return false;};api.update=function(pool,secs,state){var i=pool.objects.length,obj;state=state||{};while(i--){obj=pool.objects[i];if(obj.active){pool.update.call(pool,obj,pool,state,secs);obj.lifespan-=secs;obj.lifespan=obj.lifespan<0?0:obj.lifespan;if(obj.lifespan===0){obj.active=false;pool.purge.call(pool,obj,pool,state);}}}};api.setActiveStateForAll=function(pool,bool){bool=bool===undefined?false:bool;var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];obj.active=bool;}};api.moveByPPS=function(obj,secs){obj.x+=Math.cos(obj.heading)*obj.pps*secs;obj.y+=Math.sin(obj.heading)*obj.pps*secs;};api.checkBounds=function(obj,canvas){if(obj.x>=canvas.width||obj.x<obj.w* -1||obj.y>canvas.height||obj.y<obj.h* -1){return false;} return true;};api.boundingBox=function(a,b){return utils.boundingBox(a.x,a.y,a.w,a.h,b.x,b.y,b.w,b.h);};return api;} ());var gameMod=(function(){var hardCode={maxDistance:Number.MAX_SAFE_INTEGER,ppsArray:[32,64,128,256,512,1024,2048,4096]};var powerUpOptions={count:5,w:16,h:16,spawn:function(pu,pool,game,opt){var ps=game.playerShip;pu.x=utils.mod(ps.x+ps.w+1+Math.floor((canvas.width-ps.w-pu.w-2)*Math.random()),canvas.width);pu.y=pu.h* -1;pu.heading=Math.PI*0.5;pu.pps=64;pu.lifespan=1;},purge:function(pu,pool,game){},update:function(pu,pool,game,secs){poolMod.moveByPPS(pu,secs);pu.lifespan=1;if(pu.y>=game.canvas.height){pu.lifespan=0;} if(poolMod.boundingBox(pu,game.playerShip)){if(game.powerUps.stack.length<6){game.powerUps.stack.push({secs:0,maxSecs:10,ppsIndex:1});console.log('power up');console.log(game.powerUps.stack);} pu.lifespan=0;}}};var api={};var centerShip=function(game){var ship=game.playerShip;ship.x=game.canvas.width/2-ship.w/2;};api.create=function(opt){opt=opt||{};var game={canvas:opt.canvas||{width:320,height:240},ppsIndex:opt.ppsIndex===undefined?0:opt.ppsIndex,pps:hardCode.ppsArray[opt.ppsIndex===undefined?0:opt.ppsIndex],distance:0,gamePer:0,startTime:opt.startTime||new Date(),target:{distance:opt.targetDistance===undefined?hardCode.maxDistance:targetDistance,timeUnit:opt.targetTimeUnit===undefined?'years':opt.targetTimeUnit,ETA:0},input:{right:false,left:false},playerShip:{x:0,y:0,w:32,h:32},powerUps:{pool:poolMod.create(powerUpOptions),stack:[],secs:0,spawnRate:3},distObj:opt.distObj||{}};console.log(game.powerUps);centerShip(game);return game;};var secsToX=function(secs,x){x=x===undefined?'days':x;if(x==='minutes'){return secs/60;} if(x==='hours'){return secs/60/60;} if(x==='days'){return secs/60/60/24;} if(x==='years'){return secs/60/60/24/365.25;} return secs;};var setDistance=function(game,now){var storedSecs=0,storedDist=0;Object.keys(game.distObj).forEach(function(pps){var secs=game.distObj[pps];storedSecs+=secs;storedDist+=Number(pps)*secs;});var secs=(now-game.startTime)/1000-storedSecs,deltaDist=game.pps*secs;var current=game.distObj[game.pps];game.distObj[game.pps]=current===undefined?secs:current+secs;game.distance=storedDist+deltaDist;};var timeToDistance=function(game,distance){if(game.distance<distance){var secs=(distance-game.distance)/game.pps;return secs;} return 0;};api.update=function(game,secs,now){game.pps=hardCode.ppsArray[game.ppsIndex];setDistance(game,now);game.distance=game.distance>hardCode.maxDistance?hardCode.maxDistance:game.distance;game.gamePer=game.distance/hardCode.maxDistance;var secsToTarget=timeToDistance(game,game.target.distance);game.target.ETA=secsToX(secsToTarget,game.target.timeUnit);var xPPS=0;xPPS=game.input.right?xPPS+32:xPPS;xPPS=game.input.left?xPPS-32:xPPS;game.playerShip.x+=xPPS*secs;game.playerShip.x=game.playerShip.x<0?0:game.playerShip.x;game.playerShip.x=game.playerShip.x>game.canvas.width-game.playerShip.w?game.canvas.width-game.playerShip.w:game.playerShip.x;game.playerShip.y=game.canvas.height-64;var pow=game.powerUps;pow.secs+=secs;if(pow.secs>=pow.spawnRate){poolMod.spawn(pow.pool,game,{});pow.secs%=pow.spawnRate;} poolMod.update(pow.pool,secs,game);var i=pow.stack.length,stackItem;game.ppsIndex=0;while(i--){stackItem=pow.stack[i];stackItem.secs+=secs;if(stackItem.secs>=stackItem.maxSecs){pow.stack.splice(i,1);}else{game.ppsIndex+=1;}}};return api;} ());var draw=(function(){var setBasicText=function(ctx){ctx.textBaseline='top';ctx.textAlign='left';ctx.font='10px arial';ctx.fillStyle='white';};var backgroundSolid=function(ctx,game,canvas){var c=Math.round(128-game.gamePer*128);ctx.fillStyle='rgba(0,'+c+','+c+',1)';ctx.fillRect(0,0,canvas.width,canvas.height);};var backgroundGrid=function(ctx,game,canvas){ctx.lineWidth=3;ctx.strokeStyle='#5a5a5a';var cellW=Math.floor(canvas.width/32)+2,cellH=Math.floor(canvas.height/32)+2;var x,y,i=0,len=cellW*cellH,dy=game.distance%256/256*32;while(i<len){x=i%cellW;y=Math.floor(i/cellW);ctx.beginPath();ctx.rect(-32+x*32,-32+dy+y*32,32,32);ctx.stroke();i+=1;}};var objectMethods={box:function(ctx,obj,game){ctx.fillStyle='green';ctx.fillRect(obj.x,obj.y,obj.w,obj.h);}};var drawObject=function(ctx,obj,game,method){method=method||'box';objectMethods[method](ctx,obj,game);};return{back:function(ctx,game,canvas){backgroundSolid(ctx,game,canvas);backgroundGrid(ctx,game,canvas);},textETA:function(ctx,game,x,y){var text='Target ETA: '+Number(game.target.ETA).toFixed(2)+' '+game.target.timeUnit;setBasicText(ctx);ctx.fillText(text,x,y);},textPPS:function(ctx,game,x,y){var text='PPS: '+game.pps;setBasicText(ctx);ctx.fillText(text,x,y);},textDistance:function(ctx,game,x,y){var text='Distance: '+Math.floor(game.distance);setBasicText(ctx);ctx.fillText(text,x,y);},playerShip:function(ctx,game){drawObject(ctx,game.playerShip,game,'box');},ver:function(ctx,state,x,y){var text='v'+state.ver;setBasicText(ctx);ctx.fillText(text,x,y);},pool:function(ctx,pool){var i=pool.objects.length,obj;ctx.fillStyle='white';ctx.strokeStyle='black';ctx.lineWidth=3;while(i--){obj=pool.objects[i];if(obj.active){ctx.save();ctx.fillStyle=obj.data.fill||'white';ctx.globalAlpha=obj.data.alpha||1;ctx.beginPath();ctx.rect(obj.x,obj.y,obj.w,obj.h);ctx.fill();ctx.stroke();ctx.restore();if(obj.data.hp){var per=obj.data.hp.current/obj.data.hp.max;ctx.fillStyle='lime';ctx.fillRect(obj.x-16,obj.y,32*per,4);}}}}}} ());var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var state={ver:'0.2.0',lt:new Date(),pointerDown:false,pointerPos:{},game:gameMod.create({canvas:canvas,startTime:new Date(),distObj:{},ppsIndex:0,distance:0,targetTimeUnit:'years'})};var loop=function(){var now=new Date(),t=now-state.lt,secs=t/1000;requestAnimationFrame(loop);gameMod.update(state.game,secs,now);draw.back(ctx,state.game,canvas);draw.playerShip(ctx,state.game);draw.textDistance(ctx,state.game,10,10);draw.textPPS(ctx,state.game,10,20);draw.textETA(ctx,state.game,10,30);draw.pool(ctx,state.game.powerUps.pool);draw.ver(ctx,state,2,canvas.height-12);state.lt=now;};loop();var getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();var x=(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y=(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top;return{x:x,y:y,bx:bx};};var setInputs=function(pos){if(pos.x<canvas.width/2){state.game.input.left=true;state.game.input.right=false;}else{state.game.input.left=false;state.game.input.right=true;}};var onPointerStart=function(e){var pos=state.pointerPos=getCanvasRelative(e);state.pointerDown=true;setInputs(pos);};var onPointerMove=function(e){var pos=state.pointerPos=getCanvasRelative(e);if(state.pointerDown){setInputs(pos);}};var onPointerStop=function(e){state.pointerDown=false;state.game.input.left=false;state.game.input.right=false;};canvas.addEventListener('mousedown',onPointerStart);canvas.addEventListener('mousemove',onPointerMove);canvas.addEventListener('mouseup',onPointerStop);</script>

## 1 - The utils module for to the black

For the utils module in this canvas example I have a [mathematical modulo method](/2017/09/02/js-whats-wrong-with-modulo/), and a bounding box method for collesion detection. This is also a module where I will park any and all methods that I might use in more than one module, or that I might copy over to another canvas example.

```js
var utils = {};
 
utils.mod = function mod(x, m) {
    return (x % m + m) % m;
};
 
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
```

## 2 - object pools for power ups and anything else that might come up.

I made another [canvas example a while back in which I worked out a simple object pool](/2020/07/20/canvas-example-object-pool/) library. Here I just copied and pasted that module in as a part of what I will be using for this project.

```js
var poolMod = (function () {
    // Public API
    var api = {};
    // get next inactive object in the given pool
    var getInactive = function (pool) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        var i = 0,
        pool = {
            objects: [],
            data: opt.data || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {}
        };
        while (i < opt.count) {
            pool.objects.push({
                active: false,
                i: i,
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                w: opt.w === undefined ? 32 : opt.w,
                h: opt.h === undefined ? 32 : opt.h,
                heading: opt.heading === undefined ? 0 : opt.heading,
                pps: opt.pps === undefined ? 32 : opt.pps,
                lifespan: opt.lifespan || 3,
                data: {}
            });
            i += 1;
        }
        return pool;
    };
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || {};
        opt = opt || {};
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        }
        return false;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                obj.lifespan -= secs;
                obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                if (obj.lifespan === 0) {
                    obj.active = false;
                    pool.purge.call(pool, obj, pool, state);
                }
            }
        }
    };
    // set all to inActive or active state
    api.setActiveStateForAll = function (pool, bool) {
        bool = bool === undefined ? false : bool;
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            obj.active = bool;
        }
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // check bounds for the given display object and canvas and return true if the object
    // is out of bounds and false if it is not.
    api.checkBounds = function (obj, canvas) {
        if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
            return false;
        }
        return true;
    };
    // bounding box
    api.boundingBox = function (a, b) {
        return utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
    };
    // return public method
    return api;
}
    ());
```

## 3 - The game.js file

The game module of this example returns a public API with the usual create and update methods that are used to both create and update a game state model for this as is the case with many other canvas examples of mine thus far.

```js
var gameMod = (function () {
 
    var hardCode = {
        maxDistance: Number.MAX_SAFE_INTEGER, //1000000000000,
        ppsArray: [32, 64, 128, 256, 512, 1024, 2048, 4096]
    };
 
    var powerUpOptions = {
        count: 5,
        w: 16,
        h: 16,
        spawn: function (pu, pool, game, opt) {
            var ps = game.playerShip;
            pu.x = utils.mod(ps.x + ps.w + 1 + Math.floor((canvas.width - ps.w - pu.w - 2) * Math.random()), canvas.width);
            pu.y = pu.h * -1;
            pu.heading = Math.PI * 0.5;
            pu.pps = 64;
            pu.lifespan = 1;
        },
        purge: function (pu, pool, game) {},
        update: function (pu, pool, game, secs) {
            poolMod.moveByPPS(pu, secs);
            pu.lifespan = 1;
            // if power up reaches other side of canvas
            if (pu.y >= game.canvas.height) {
                pu.lifespan = 0;
            }
            // hits player object
            if (poolMod.boundingBox(pu, game.playerShip)) {
                if (game.powerUps.stack.length < 6) {
                    game.powerUps.stack.push({
                        secs: 0,
                        maxSecs: 10,
                        ppsIndex: 1
                    });
                    console.log('power up');
                    console.log(game.powerUps.stack);
                }
                pu.lifespan = 0;
            }
        }
    };
 
    var api = {};
 
    var centerShip = function (game) {
        var ship = game.playerShip;
        ship.x = game.canvas.width / 2 - ship.w / 2;
    };
 
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            canvas: opt.canvas || {
                width: 320,
                height: 240
            },
            ppsIndex: opt.ppsIndex === undefined ? 0 : opt.ppsIndex,
            pps: hardCode.ppsArray[opt.ppsIndex === undefined ? 0 : opt.ppsIndex], //opt.pps || hardCode.ppsArray[0],
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
            powerUps: {
                pool: poolMod.create(powerUpOptions),
                stack: [],
                secs: 0,
                spawnRate: 3
            },
            distObj: opt.distObj || {}
        };
        console.log(game.powerUps);
        centerShip(game);
        return game;
    };
 
    var secsToX = function (secs, x) {
        x = x === undefined ? 'days' : x;
        if (x === 'minutes') {
            return secs / 60;
        }
        if (x === 'hours') {
            return secs / 60 / 60;
        }
        if (x === 'days') {
            return secs / 60 / 60 / 24;
        }
        if (x === 'years') {
            return secs / 60 / 60 / 24 / 365.25;
        }
        return secs;
    };
 
    // set state distance based on startTime
    // and distObj of PPS and time key pairs
    var setDistance = function (game, now) {
        // before I credit I first need to know the amount of time
        // and distance thus far
        var storedSecs = 0,
        storedDist = 0;
        Object.keys(game.distObj).forEach(function (pps) {
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
 
    var timeToDistance = function (game, distance) {
        if (game.distance < distance) {
            var secs = (distance - game.distance) / game.pps;
            return secs;
        }
        return 0;
    };
 
    api.update = function (game, secs, now) {
 
        // speed
        game.pps = hardCode.ppsArray[game.ppsIndex];
 
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
        xPPS = game.input.right ? xPPS + 32 : xPPS;
        xPPS = game.input.left ? xPPS - 32 : xPPS;
        //game.playerShip.x = game.canvas.width / 2 - 16;
        game.playerShip.x += xPPS * secs;
        game.playerShip.x = game.playerShip.x < 0 ? 0 : game.playerShip.x;
        game.playerShip.x = game.playerShip.x > game.canvas.width - game.playerShip.w ? game.canvas.width - game.playerShip.w : game.playerShip.x;
        game.playerShip.y = game.canvas.height - 64;
 
        // power ups
        var pow = game.powerUps;
        // spawn
        pow.secs += secs;
        if (pow.secs >= pow.spawnRate) {
            poolMod.spawn(pow.pool, game, {});
            pow.secs %= pow.spawnRate;
        }
        // update
        poolMod.update(pow.pool, secs, game);
        // update stack
        var i = pow.stack.length,
        stackItem;
        game.ppsIndex = 0;
        while (i--) {
            stackItem = pow.stack[i];
            stackItem.secs += secs;
            if (stackItem.secs >= stackItem.maxSecs) {
                pow.stack.splice(i, 1);
            } else {
                game.ppsIndex += 1;
            }
        }
    };
 
    return api;
}
    ());
```

## 4 - The draw.js file

Now that I have the game module worked out I will now want a draw module where I place all my code that will draw the state of a game object to a canvas element.

```js
var draw = (function () {
    var setBasicText = function (ctx) {
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillStyle = 'white';
    };
 
    // background helpers
    var backgroundSolid = function (ctx, game, canvas) {
        var c = Math.round(128 - game.gamePer * 128);
        ctx.fillStyle = 'rgba(0,' + c + ',' + c + ',1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    var backgroundGrid = function (ctx, game, canvas) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#5a5a5a';
        var cellW = Math.floor(canvas.width / 32) + 2,
        cellH = Math.floor(canvas.height / 32) + 2;
        var x,
        y,
        i = 0,
        len = cellW * cellH,
        dy = game.distance % 256 / 256 * 32;
        while (i < len) {
            x = i % cellW;
            y = Math.floor(i / cellW);
            ctx.beginPath();
            ctx.rect(-32 + x * 32, -32 + dy + y * 32, 32, 32);
            ctx.stroke();
            i += 1;
        }
    };
 
    var objectMethods = {
        box: function (ctx, obj, game) {
            ctx.fillStyle = 'green';
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        }
    };
 
    var drawObject = function (ctx, obj, game, method) {
        method = method || 'box';
        objectMethods[method](ctx, obj, game);
    };
 
    return {
        // draw background
        back: function (ctx, game, canvas) {
            backgroundSolid(ctx, game, canvas);
            backgroundGrid(ctx, game, canvas);
        },
        textETA: function (ctx, game, x, y) {
            var text = 'Target ETA: ' + Number(game.target.ETA).toFixed(2) + ' ' + game.target.timeUnit;
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        textPPS: function (ctx, game, x, y) {
            var text = 'PPS: ' + game.pps;
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        textDistance: function (ctx, game, x, y) {
            var text = 'Distance: ' + Math.floor(game.distance);
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        playerShip: function (ctx, game) {
            drawObject(ctx, game.playerShip, game, 'box');
        },
        ver: function (ctx, state, x, y) {
            var text = 'v' + state.ver;
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        pool: function (ctx, pool) {
            var i = pool.objects.length,
            obj;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            while (i--) {
                obj = pool.objects[i];
                if (obj.active) {
                    ctx.save();
                    ctx.fillStyle = obj.data.fill || 'white';
                    ctx.globalAlpha = obj.data.alpha || 1;
                    //ctx.translate(obj.x, obj.y);
                    //ctx.rotate(obj.heading);
                    ctx.beginPath();
                    //ctx.rect(obj.w / 2 * -1, obj.h / 2 * -1, obj.w, obj.h);
                    ctx.rect(obj.x, obj.y, obj.w, obj.h);
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                    if (obj.data.hp) {
                        var per = obj.data.hp.current / obj.data.hp.max;
                        ctx.fillStyle = 'lime';
                        ctx.fillRect(obj.x - 16, obj.y, 32 * per, 4);
                        //ctx.fillText(obj.data.hp.current, obj.x, obj.y);
                    }
                }
            }
        }
    }
}
    ());
```

## 5 - The main.js file

Now I just want to make use of everything I put together in a main.js file.

```js
// create canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
// main state object
var state = {
    ver: '0.2.0',
    lt: new Date(),
    pointerDown: false,
    pointerPos: {},
    game: gameMod.create({
        canvas: canvas,
        startTime: new Date(), // new Date(1983, 4, 6, 10, 5),
        distObj: {
            //32: 900000000,
            //64: 100000000
        },
        //pps: 128,
        ppsIndex: 0, //6,
        distance: 0,
        targetTimeUnit: 'years'
    })
};
// main app loop
var loop = function () {
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    gameMod.update(state.game, secs, now);
    draw.back(ctx, state.game, canvas);
    draw.playerShip(ctx, state.game);
    draw.textDistance(ctx, state.game, 10, 10);
    draw.textPPS(ctx, state.game, 10, 20);
    draw.textETA(ctx, state.game, 10, 30);
    draw.pool(ctx, state.game.powerUps.pool);
    draw.ver(ctx, state, 2, canvas.height - 12);
    state.lt = now;
};
loop();
// events
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};
var setInputs = function (pos) {
    if (pos.x < canvas.width / 2) {
        state.game.input.left = true;
        state.game.input.right = false;
    } else {
        state.game.input.left = false;
        state.game.input.right = true;
    }
};
var onPointerStart = function (e) {
    var pos = state.pointerPos = getCanvasRelative(e);
    state.pointerDown = true;
    setInputs(pos);
};
var onPointerMove = function (e) {
    var pos = state.pointerPos = getCanvasRelative(e);
    if (state.pointerDown) {
        setInputs(pos);
    }
};
var onPointerStop = function (e) {
    state.pointerDown = false;
    state.game.input.left = false;
    state.game.input.right = false;
};
canvas.addEventListener('mousedown', onPointerStart);
canvas.addEventListener('mousemove', onPointerMove);
canvas.addEventListener('mouseup', onPointerStop);
```

## 6 - conclusion

I was able to get the basic idea in mind that i had working with this one fairly quickly, but there would still be a great deal more work to do in order to get this to start to feel like an actual game of some kind. I just wanted a project centered around estimating the amount of tie it would take for an object to move a given distance, and to make that distance a very large number. I did not have much in mind beyond that other than to just have a project where I am working out some code that has to do with topic that seems to come to mind whenever i start working on idle game prototypes.