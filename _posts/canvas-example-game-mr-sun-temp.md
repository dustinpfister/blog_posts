---
title: Mr sun Temp and Fusion plug-ins canvas example
date: 2020-11-04 13:28:00
tags: [canvas]
layout: post
categories: canvas
id: 736
updated: 2020-11-05 20:13:02
version: 1.2
---

I am going to try something new when it comes to todays [canvas example](/2020/03/23/canvas-example/) post, I am not going to just start a whole new example from the ground up. Often I do borrow a little code here and there from other examples, and projects when and where doing so is called for. However today I am going to just copy the whole source code of my Mr sun example at version 0.1.0 and start from there by just adding a few plugins to it, and making any changes that are needed to the source in the process if any.

So this way I am not starting over from the beginning, but if I need to I can make some changes that will not effect the other project. I can however add them to it later on if I feel as though such changes should be added.

Anyway this canvas example will then be a continuation of sorts on my Mr Sun game that I think might have some potential if I put a bit more time into it. In the game the player controls the position of a Sun object that effects the other word section objects that are centered around the sun object. In this post I am using the same core source code more or less, but I am adding two plug-ins to it that have to do with setting an updating a temp property for each section. In addition I am also starting another plug-in that has to do with fusion in the game, which I think would be another cool feature.

<!-- more -->

## 2 - The temp.js plugin

```js
gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        game.maxTemp = 500;
        var td = game.sun.tempData = {
            i: 0,
            len: 100,
            base: 10,
            max: 500,
            years: 0,
            iAtYears: 100,
            temp: {}
        };
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        game.sun.temp = td.temp.valueOf();
        game.sections = game.sections.map(function(section){
            section.temp = 0;
            section.groundTemp = 0;
            return section;
        });
    },
    onDeltaYear: function(game, deltaYears){
        // sun will gain temp over time
        var td = game.sun.tempData;
        td.years += deltaYears;
        //td.i += deltaYears;
        td.i = Math.floor(td.years / td.iAtYears);
        td.i = td.i >= td.len ? td.len - 1 : td.i;
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        game.sun.temp = td.temp.valueOf();
 
        // update temp of sections
        var i = game.sections.length,
        section;
        while(i--){
            section = game.sections[i];
            if(Math.floor(section.per * 100) >= 50){
                section.groundTemp += game.sun.temp / 10 * section.per;
            }else{
                section.groundTemp -= section.groundTemp / 100;
            }
            section.groundTemp = section.groundTemp < 0.25 ? 0: section.groundTemp;
            section.groundTemp = section.groundTemp > game.maxTemp / 2 ? game.maxTemp / 2: section.groundTemp;
            section.temp = section.groundTemp + game.sun.temp / 2 * section.per;
        }
    }
});
```

## 3 - The fusion.js plugin

```js
gameMod.load((function(){
    var getMinDelta = function(section, rate, temp, deltaYears){
        return rate * Math.floor(section.temp / temp) * deltaYears;
    };
    return {
        name: 'fusion',
        callPriority: '1.1',
        create: function(game, opt){
            game.sections = game.sections.map(function(section){
                section.minerals = {
                    copper: 0, 
                    silver: 0 
                };
                return section;
            });
        },
        onDeltaYear: function(game, deltaYears){
            var i = game.sections.length,
            section;
            while(i--){
                section = game.sections[i];
                if(section.temp > 100){
                    section.minerals.copper += getMinDelta(section, 5, 100, deltaYears);
                }
                if(section.temp > 250){
                    section.minerals.silver += getMinDelta(section, 1, 250, deltaYears);
                }
            }
        }
    };
}()));
```

## 4 - utils.js

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
 
utils.logPer = function (per, a, b) {
    a = a === undefined ? 2 : a;
    b = b === undefined ? a : b;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + a - 2) + per) / Math.log(b);
};
 
utils.createLogPerObject = function(i, len, base, max, a, b){
    a = a === undefined ? 2: a;
    b = b === undefined ? a: b;
    base = base === undefined ? 0: base;
    max = max === undefined ? 1: max;
    var per = i / len,
    logPer = utils.logPer(per, a, b);
    return {
        i: i,
        len: len,
        per: per,
        logPer: logPer,
        n: base + logPer * ( max - base ),
        valueOf: function(){
            return this.n;
        }
    };
};
 
utils.createLogPerCollection = function(opt){
    opt = opt || {};
    opt.len = opt.len === undefined ? 100 : opt.len;
    opt.base = opt.base === undefined ? 0 : opt.base;
    opt.max = opt.max === undefined ? 50 : opt.max;
    opt.a = opt.a === undefined ? 2 : opt.a;
    opt.b = opt.b === undefined ? opt.a : opt.b;
    var i = 0, obj, collection = {
       len: opt.len,
       base: opt.base,
       max: opt.max,
       a: opt.a,
       b: opt.b
    };
    collection.data = [];
    while(i < opt.len){
        obj = utils.createLogPerObject(i, opt.len, opt.base, opt.max, opt.a, opt.b);
        collection.data.push(obj);
        i += 1;
    }
    return collection;
};
```

## 5 - game.js

```js
var gameMod = (function(){
    // the plug-in object
    var plugs = {};
    var getCallPrioritySorted = function(){
        var keys = Object.keys(plugs);
        return keys.sort(function(a, b){
            var plugObjA = plugs[a],
            plugObjB = plugs[b];
            if(plugObjA.callPriority > plugObjB.callPriority){
                return -1;
            }
            if(plugObjA.callPriority < plugObjB.callPriority){
                return 1;
            }
            return 0;
        });
    };
    // use plugins for the given method
    var usePlugs = function(game, methodName, args){
        methodName = methodName || 'create';
        args = args || [game]
        var keys = getCallPrioritySorted();
        keys.forEach(function(plugKey){
            var plugObj = plugs[plugKey],
            method = plugObj[methodName];
            if(method){
                method.apply(plugObj, args);
            }
        });
    };
    // public API
    var api = {};
    // create a new game state object
    api.create = function(opt){
        opt = opt || {};
        opt.canvas = opt.canvas || {width: 320, height: 240 };
        // create base game object
        var game = {};
        game.centerX = opt.centerX || opt.canvas.width / 2;
        game.centerY = opt.centerY || opt.canvas.height / 2;
        game.sectionRadius = opt.sectionRadius || 16;
        game.worldRadius = opt.worldRadius || 100;
        game.secs = 0;
        game.year = 0;
        game.yearRate = opt.yearRate || 1;
        // create sun object
        game.sun = {
            radius: 16,
            x: game.centerX,
            y: game.centerY,
            sunGrid: {}
        };
        // create sections
        var i = 0,
        sections = [],
        total = opt.sectionCount || 20,
        radian,	
        cx = game.centerX,
        cy = game.centerY;
        while(i < total){
            radian = Math.PI * 2 / total * i;
            sections.push({
                i: i,
                x: Math.cos(radian) * game.worldRadius + cx,
                y: Math.sin(radian) * game.worldRadius + cy,
                radius: game.sectionRadius,
                per: 1
            });
            i += 1;
        }
        game.sections = sections;
        // use 'create' method of all plug-ins
        usePlugs(game, 'create', [game, opt]);
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
    // get a section by canvas position
    api.getSectionByPos = function(game, x, y){
        var section,
        i = game.sections.length;
        while(i--){
            section = game.sections[i];
            if(utils.distance(section.x, section.y, x, y) <= section.radius){
                return section;
            }
        }
        return false;
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
    // update method
    api.update = function(game, secs){
        game.secs += secs;
        var deltaYears = Math.floor(game.secs / game.yearRate);
        if(deltaYears >= 1){
            game.year	 += deltaYears;
            game.secs %= game.yearRate;
            usePlugs(game, 'onDeltaYear', [game, deltaYears]);
        }
    };
    // load a plug-in
    api.load = function(plugObj){
        var len = Object.keys(plugs).length;
        // use given key name, or else use number of public keys in plugs
        plugObj.name = plugObj.name || len;
        // callPriority defaults to len
        plugObj.callPriority = plugObj.callPriority || len;
        // just reference the object for now
        plugs[plugObj.name] = plugObj;
    };
    // return the Public API
    return api;
}());
```

## 6 - draw.js

```js
```

## 7 - main.js

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var changeState = function(sm, stateKey, opt){
    opt = opt || {};
    var newState = sm.states[stateKey];
    if(newState.start){
        newState.start(sm, opt);
    }
    sm.currentState = stateKey;
};
 
var states = {
    game: {
        init: function(sm){
            // setup sun object
            sm.game = gameMod.create({
                canvas: sm.canvas,
                sectionCount: 19,
                worldRadius: 100,
                yearRate: 0.5
            });
        },
        // for each update tick
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
            draw.back(sm);
            draw.sections(sm);
            draw.sun(sm);
            draw.disp(sm);
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
        pointerEnd: function (sm, pos) {
             if(sm.input.d < 3){
                 // if section click
                 var section = gameMod.getSectionByPos(sm.game, pos.x, pos.y);
                 if(section){
                     changeState(sm, 'observe_section', {
                         section: section
                     });
                 }
                 // if sun click
                 if(utils.distance(sm.game.sun.x, sm.game.sun.y, pos.x, pos.y) <= sm.game.sun.radius){
                     changeState(sm, 'observe_sun', {});
                 }
             }
        }
    },
    observe_section: {
        data: {
            section:{}
        },
        start: function(sm, opt){
            sm.states['observe_section'].data.section = opt.section;
        },
        update: function(sm, secs){
            gameMod.update(sm.game, secs);
            draw.back(sm);
            draw.sectionData(sm, sm.states['observe_section'].data.section);
        },
        pointerEnd: function (sm) {
             changeState(sm, 'game', {});
        }
    },
    observe_sun: {
        data: {
            //sunGrid: []
        },
        start: function(sm, opt){
            
        },
        update: function(sm, secs){
            var state = sm.states['observe_sun'],
            td = sm.game.sun.tempData;
            gameMod.update(sm.game, secs);
            sm.game.sun.sunGrid = utils.createLogPerCollection({
               len: td.len,
               base: td.base,
               max: td.max
            });
            draw.back(sm);
            draw.sunData(sm, sm.game.sun);
        },
        pointerEnd: function (sm) {
             changeState(sm, 'game', {});
        }
    }
};
 
var sm = {
    ver: '0.2.0',
    canvas: canvas,
    currentState: 'game',
    ctx: ctx,
    game: {},
    states: states,
    input: {
        pointerDown: false,
        d:0,
        startPos:{
             x: 0,
             y: 0
        },
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
        sm.input.startPos = {
            x: pos.x,
            y: pos.y
        };
        sm.input.d = 0;
        var method = states[sm.currentState].pointerStart;
        if(method){
            method(sm, pos, e);
        }
    },
    move: function (sm, pos, e) {
        var method = states[sm.currentState].pointerMove,
        startPos = sm.input.startPos;
        sm.input.d = utils.distance(startPos.x, startPos.y, pos.x, pos.y);
        if(method){
            method(sm, pos, e);
        }
    },
    end: function (sm, pos, e) {
        sm.input.pointerDown = false;
        var method = states[sm.currentState].pointerEnd;
        if(method){
            method(sm, pos, e);
        }
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