---
title: Mr sun Temp and Fusion plug-ins canvas example
date: 2020-11-04 13:28:00
tags: [canvas]
layout: post
categories: canvas
id: 736
updated: 2020-11-06 17:17:22
version: 1.20
---

I am going to try something new when it comes to todays [canvas example](/2020/03/23/canvas-example/) post, I am not going to just start a whole new example from the ground up. Often I do borrow a little code here and there from other examples, and projects when and where doing so is called for. However today I am going to just copy the whole source code of my Mr sun example at version 0.1.0 and start from there by just adding a few plug-ins to it, and making any changes that are needed to the source in the process if any.

So this way I am not starting over from the beginning, but if I need to I can make some changes that will not effect the other project. I can however add them to it later on if I feel as though such changes should be added.

Anyway this canvas example will then be a continuation of sorts on my Mr Sun game that I think might have some potential if I put a bit more time into it. In the game the player controls the position of a Sun object that effects the other word section objects that are centered around the sun object. In this post I am using the same core source code more or less, but I am adding two plug-ins to it that have to do with setting an updating a temp property for each section. In addition I am also starting another plug-in that has to do with fusion in the game, which I think would be another cool feature.

<!-- more -->

## 1 - What to know before hand

This canvas example is a fork of my starting Mr Sun canvas example. The source code is not to different from that example at least when it comes to the core of the application itself. I have made a few changes here that I might add to the core example at a later point, but for now this post, and example is more about the plug-ins.

I wanted to create at least two plug-ins as a way to test out how the system works thus far, and maybe add some features as needed. This far as of 0.2.0 of this example I have just added a way to set a call priory for plug-ins which is just a way to make sure that a plug-in that depends on smoother plug in is called in the proper order.

## 2 - The sun.js plug-in

The sun plug-in has to do with adding, and updating some additional advanced properties for the sun object. mainly thus far it has to do with spawning the sun object from a dead state to an alive state, and also back again once it reaches the end of its life cycle.


```js
// sun.js plug-in
// append advanced properties to the sun
// object made with gameMod.create
gameMod.load({
    name: 'sun',
    callPriority: '0',
    create: function(game, opt){
        var sun = game.sun;
        sun.state = 'dead';
        sun.spawnRate = 20;
        sun.deadYears = 0;
        sun.toAlivePer = 0;
        sun.lifeSpan = 0;
    },
    onDeltaYear: function(game, deltaYears){
        var sun = game.sun;
        if(sun.state === 'explode'){
            sun.deadYears = 0;
            sun.toAlivePer = 0;
            sun.state = 'dead';
        }
        if(sun.state === 'dead'){
            sun.deadYears += deltaYears;
            sun.deadYears = sun.deadYears > sun.spawnRate ? sun.spawnRate: sun.deadYears;
            sun.toAlivePer = sun.deadYears / sun.spawnRate;
            if(sun.toAlivePer >= 1){
                sun.state = 'alive';
                sun.lifeSpan = 1000;
            }
        }
        if(sun.state === 'alive'){
            sun.lifeSpan -= deltaYears;
            sun.lifeSpan = sun.lifeSpan < 0 ? 0 : sun.lifeSpan;
            if(sun.lifeSpan === 0){
                sun.state = 'explode';
            }
        }
    }
});
```

## 3 - The temp.js plug-in

One of the core reasons of this fork of Mr Sun is to work out the plug-in that will be used to set a temperature value for the sun object itself, as well as all the sections around the sun. The current distance between the Sun object, and a section is of course the core feature of the game that will impact this, as well as many other things in the game. However there is more to it then just working out a single expression and moving on with this, there are a few things that come to mind when it comes to how temperature will be set for the sections actually, and this plug-in alone will probably eat up a fair amount of time to get just right.

```js
gameMod.load((function(){
 
    // update sun temp
    var updateSun = function(game, deltaYears){
        var td = game.tempData;
        if(game.sun.state === 'dead'){
            game.sun.temp = 0;
            td.years = 0;
            td.i = 0;
            td.globalMaxGroundTemp = game.tempData.max;
        }
        if(game.sun.state === 'alive'){
            updateLiveSun(game, deltaYears);
        }
    };
    // update a live sun
    var updateLiveSun = function(game, deltaYears){
        // sun will gain temp over time
        var td = game.tempData;
        td.years += deltaYears;
        td.i = Math.floor(td.years / td.iAtYears);
        td.i = td.i >= td.len ? td.len - 1 : td.i;
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        // SET SUN TEMP
        game.sun.temp = td.temp.valueOf();
        // I think globalMaxGroundTemp should not be fixed, but should also not be the same as the sun
        // something crude like just dividing by 10 might work for now.
        td.globalMaxGroundTemp = game.sun.temp / 10;
    };
    // update temp for sections
    var updateTempSections = function(game, deltaYears){
        // update temp of sections
        var i = game.sections.length,
        td = game.tempData,
        section;
        while(i--){
            section = game.sections[i];
            // ground temp goes up when section.per >= 49
            if(Math.floor(section.per * 100) >= 49){
                section.groundTemp += game.sun.temp / 10 * section.per;
            }else{
                section.groundTemp -= section.groundTemp / 100;
            }
            // section max ground temp set by section.per and global max ground temp value
            section.maxGroundTemp = td.globalMaxGroundTemp * section.per;
            section.groundTemp = section.groundTemp < 0.25 ? 0: section.groundTemp;
            section.groundTemp = section.groundTemp > section.maxGroundTemp ? section.maxGroundTemp: section.groundTemp;
            // SET SECTION TEMP
            section.temp = section.groundTemp + game.sun.temp * section.per;
        }
    };
    // plugObj for temp.js
    return {
        name: 'temp',
        callPriority: '1.0',
        create: function(game, opt){
            // create tempData object
            var td = game.tempData = {
                i: 0,
                len: 100,
                base: 10,
                max: 500,
                years: 0,
                iAtYears: 100,
                temp: {},
                globalMaxGroundTemp: 0
            };
            // update for first time
            updateSun(game, 0);
            // set section temp values
            game.sections = game.sections.map(function(section){
                section.temp = 0;
                section.groundTemp = 0;
                return section;
            });
        },
        onDeltaYear: function(game, deltaYears){
            updateSun(game, deltaYears);
            updateTempSections(game, deltaYears);
        }
    };
 
}()));
```

## 4 - The fusion.js plug-in

Another idea I have for a plug-in was a fusion plug-in that is a way for minerals to be produce in the game. I am thinking that minerals will just be one aspect of what will need to happen in this little game world of mine, and like the temp plug-in, it is another core aspect of the game mechanics that other future plug-ins will depend on. In time I aim to create additional plug-ins that will have to do with geology, the atmosphere, basic life, and civilization all of which have to do with elements, and molecules composed of elements. So in this game it makes sense to have a plug-in that serves as a way to create these resources.

The plug-in design started out with making fusion something that happens in the world sections, rather than the sun. In this game I am not making an effort to make some kind of realistic simulation of course, this is very much just a game, and the goal is to just simply have fun. So this mechanic of having fusion just be something that happens in the world sections does strike me as one way to go about handling this aspect of the game mechanics. However the idea of making fusion something that happens in the sun object would make more sense when it comes to a real world understanding of fusion, so with that said I chose to take things in that direction.

So then this plug-in creates mineral count objects for both the sun object, and each world section object. Fusion is then something that takes place in the sun object where minerals are produced. Minerals can then end up in the world section by two different ways. One way is when the sun dies, when this happens all mineral get transferred to the world sections. The other way is when the sun object gets real close to a world section minerals transfer to the section that way.

```js
// fusion.js
gameMod.load((function(){
 
    // helper for creating a delta value for mineral production
    var getMinDelta = function(sun, rate, temp, deltaYears){
        return rate * Math.floor(sun.temp / temp) * deltaYears;
    };
 
    // create a minerals object
    var createMineralsObj = function(){
        return {
            copper: 0, 
            iron: 0 
        };
    };
 
    // the plugObj for fusion
    return {
        name: 'fusion',
        callPriority: '1.1',
        create: function(game, opt){
            // minerals object for the sun
            game.sun.minerals = createMineralsObj();
            // minerals objects for each section
            var i = game.sections.length,
            section;
            while(i--){
                section = game.sections[i];
                section.minerals = createMineralsObj();
            }
        },
        onDeltaYear: function(game, deltaYears){
            var sun = game.sun;
 
            // fusion happens in the sun
            if(sun.state === 'alive'){
                if(sun.temp >= 10){
                    sun.minerals.iron += getMinDelta(sun, 1, 10, deltaYears);
                }
                if(sun.temp >= 25){
                    sun.minerals.copper += getMinDelta(sun, 0.5, 25, deltaYears);
                }
                // transfer to sections
                var i = game.sections.length,
                section;
                while(i--){
                    section = game.sections[i];
                    if(section.per > 0.95){
                       Object.keys(sun.minerals).forEach(function(minKey){
                           var minCount = sun.minerals[minKey];
                           var transferAmount = 1 * deltaYears;
                           if(minCount >= transferAmount){
                               section.minerals[minKey] += transferAmount;
                               sun.minerals[minKey] -= transferAmount;
                           }
                       });
                    }
                }
            }
 
            if(sun.state === 'explode'){
                Object.keys(sun.minerals).forEach(function(minKey){
                    var minCount = sun.minerals[minKey],
                    i = game.sections.length,
                    section;
                    if(minCount > 0){
                        while(i--){
                            section = game.sections[i];
                            section.minerals[minKey] += Math.floor(minCount / game.sections.length * section.per);
                        }
                        sun.minerals[minKey] = 0;
                    }
                });
            }
 
        }
    };
}()));
```

## 5 - utils.js

I wanted to add a few methods to the utils.js module for mr sun that I worked out in another canvas example, mainly the utils.logPer method. I have not yet worked out an experience point system that I am truly happy with, but that is not to say that I do not have systems work out for that. There is my post an an experience point system module, and also the canvas example that has to do with creating a logarithmic percentage value from a linear one.

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

## 6 - The game.js module

In this fork of the Mr Sun source code I made just a few basic changes to the main game module. I think that it would be best to only make changes as they are needed rather than spending time adding features that I might not really want or need for this project.

Another method that I ended up working out this time is a simple get section by position helper. This method is used to get a section by way of an x and y position relative to the canvas element. In time I might want to add additional methods such as this, but for now this one alone was truly needed. I added some new states to the state machine in the main.js file that make use of it when it comes to switching to other states that are views for the sun and a single given section object.

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
                return 1;
            }
            if(plugObjA.callPriority < plugObjB.callPriority){
                return -1;
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
        // create base sun object
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

## 7 - The draw.js module

The draw module is back with some of the usual suspects when it comes to one of my canvas example projects, such as a draw background method. One note worth additional that was added in this fork is sunData draw method in which I am drawing a graph that illustrates the current and future status of the sun.

```js
var draw = (function () {
 
    // public API
    var api = {};
 
    // HELPERS
    var drawMineralList = function(ctx, obj, startY, fontSize){
        startY = startY === undefined ? 0 : startY;
        fontSize = fontSize || 10;
        if(obj.minerals){
            ctx.font = fontSize + 'px arial';
            Object.keys(obj.minerals).forEach(function(min, i){
                ctx.fillText(min + ': ' + obj.minerals[min].toFixed(2), 10, startY + i * fontSize);
            });
        }
    };
 
    // SECTIONS:
    api.sectionData = function(sm, section){
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '15px arial';
        ctx.fillText('section ' + section.i, 10, 10);
        ctx.font = '10px arial';
        ctx.fillText('groundTemp: ' + section.groundTemp.toFixed(2), 10, 30);
        ctx.fillText('temp: ' + section.temp.toFixed(2), 10, 40);
        drawMineralList(ctx, section, 50, 10);
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
            ctx.font = '8px arial';
            ctx.fillText(section.per.toFixed(2), section.x, section.y-5);
            //ctx.fillText(section.groundTemp.toFixed(2) + ':' + section.temp.toFixed(2), section.x, section.y+5);
            //var min = section.minerals;
            //ctx.fillText(min.copper + ':' + min.gold, section.x, section.y-5);
            ctx.fillText(section.temp.toFixed(2), section.x, section.y + 5);
        });
    };
 
    // SUN
    api.sunData = function(sm, sun){
        var game = sm.game;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '15px arial';
        ctx.fillText('Sun Status: ', 10, 10);
        ctx.font = '10px arial';
        ctx.fillText('status: ' + game.sun.state, 10, 30);
        ctx.fillText('years: ' + game.tempData.years, 10, 40);
        ctx.fillText('temp: ' + sun.temp.toFixed(2), 10, 50);
        ctx.fillText('tempLevel: ' + game.tempData.i + '/' + Number(game.tempData.len - 1), 10, 60);
 
        drawMineralList(ctx, sun, 70, 10);
 
        // draw graph
        var h = 100,
        w = 100,
        sy = 150,
        sx = 200;
        ctx.fillStyle = '#5f5f5f';
        ctx.fillRect(sx, sy - h, w, h);
        ctx.beginPath();
        sun.sunGrid.data.forEach(function(tempObj){
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'black';
            var temp = tempObj.valueOf(),
            y = sy - h * (temp / sun.sunGrid.max),
            x = sx + w * tempObj.per;
            if(tempObj.i === 0){
                ctx.moveTo(x, y);
            }else{
                ctx.lineTo(x, y);
            }
            if(tempObj.i === game.tempData.i){
                ctx.stroke();
                ctx.beginPath();
                ctx.arc( x, y, 2, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
                ctx.beginPath();
            }
        });
        ctx.stroke();
    };
    // draw sun
    api.sun = function (sm) {
        var sun = sm.game.sun,
        color = 'yellow',
        textColor = 'black',
        ctx = sm.ctx;
        if(sun.state === 'dead'){
            color = 'black';
            textColor = 'white';
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.font = '10px arial';
        if(sun.state === 'alive'){
            ctx.fillText(Math.round(sun.temp), sun.x, sun.y);
        }
        if(sun.state === 'dead'){
            ctx.fillText(Math.round(sun.toAlivePer * 100), sun.x, sun.y);
        }
    };
 
    // MISC
 
    // draw background
    api.back = function (sm) {
        sm.ctx.fillStyle = '#202020';
        sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
    };
    // display
    api.disp = function (sm) {
        var ctx = sm.ctx;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';
        ctx.fillText('year: ' + sm.game.year, 3, 3);
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

## 8 - main.js

Some additional have been made to the main.js of the Mr Sun source code in this fork also. For the most part it was just the addition of two new state objects for the current state machine, but no radical changes have been made to it beyond that. In future forks of this I thnk I am going to need to do something similar to what I have done with the game module, but for now I am taking a more monolithic approach here, like I did in crosshairs.

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
                yearRate: 0.01
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
            //td = sm.game.sun.tempData;
            td = sm.game.tempData;
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
    ver: '0.5.0',
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

## 9 - Conclusion

So far I am Liking how this project is going, but there is indeed much more work that needs to be done until I have something that I can call a done deal. I think I will continue working on just this fork alone when it comes to working out additional changes that need to happen with the temp plug-in, and at least one or two additional plug-ins that are closely related to it. The focus here is on a single core plug-in that has to do with temperature, and as I move forward with additional forks.

Speaking of additional forks, I have started one additional fork off of this example that I am calling [Mr Sun Geo](/2020/110/06/canvas-example-game-mr-sun-geo/). This example just strikes me as the next logic step from here, not that I have some of the core basics of the game worked out. So then Mr Sun Geo is just a few additional improvements to the source code of the core of the application, and yet even more plug-ins that add additional features to the game. features that have to do with Geology, the water cycle, and the Atmosphere of the game world.