---
title: A game framework JavaScript example
date: 2021-09-03 13:39:00
tags: [js]
layout: post
categories: js
id: 927
updated: 2021-09-03 15:19:34
version: 1.25
---

This week I made another major [JavaScript example](/2021/04/02/js-javascript-example/) this time it is a current standard game framework. This project is actually me using a whole bunch of different projects that I have made over time to create one massive central project of a javaScript example. The thing about this here is that I am getting tired of writing the same code over and over again each time I start a new project, which is often going to be the case when it comes to making the project a vanilla javaScript project. After all that term means I am writing all the code from the ground up rather than using some popular framework. So if I am getting tired of writing everything all over again each time I start a new project, but I do not want to use someone else framework, then I guess I just have to make my own.

As of this writing this game frame work has all the basic features that I would want to have in a game frame work at least. A must have feature of a project such as this would be a state machine which is in place all ready. On top of that there is a canvas module that supports layering, and an object pool that I can use to quickly create a collection of display objects.

<!-- more -->


## 1 - The utils lib

First off when  it comes to making any kind of major project like this I am going to want to have a main utility library. This is a place where I will park and and all methods that I might want to use across one or more modules in the over all project, and I can not thing of nay better place to park them. I have [wrote another javaScript example post on a general from of this kind of utility module](/2021/08/06/js-javascript-example-utils/), but I use a custom cut form of it for any given project.

For this game framework thus far I have made one important additional that I will likely add to my general from of this kind of utilizes lib, which is a basic http client. For this I quickly put together something that works okay thus far that just makes use of [XMLHttpRequest to preform http requests](/2018/03/28/js-xmlhttprequest/). One of the features that I want to have in this game framework is an external assets loader of some kind, so this is a much have method.

So far I just have some of the usual suspect methods when it comes to game development. With that said there is a bounding box methods, as well as a distance method. I also often end up needing a mathematical modulo method when working out game logic also.

```js
var utils = {};
 
/********* ********** ********** *********/
//  HTTP
 /********* ********** ********** *********/
 
// very simple http client
utils.http = function(opt){
    var opt = opt || {};
    // default options
    opt.url = opt.url || '';
    opt.method = opt.method || 'GET';
    opt.async = opt.async === undefined ? true: opt.async;
    opt.body = opt.body === undefined ? null: opt.body;
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    opt.responseType = opt.responseType || '';  // set to 'blob' for png
    // create and set up xhr
    var xhr = new XMLHttpRequest();
    xhr.responseType = opt.responseType;
    xhr.open(opt.method, opt.url, opt.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 400){
                opt.onDone.call(xhr, xhr.response, xhr);
            }else{
                opt.onError.call(xhr, xhr);
            }
        }
    };
    // send
    xhr.send(opt.body);
};
// load just a png file, this calls utils.http with proper settings, and the response is an Image
utils.httpPNG = function(opt){
    opt = opt || {};
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    utils.http({
        url: opt.url,
        responseType: 'blob',
        onDone : function(res, xhr){
            var imageURL = window.URL.createObjectURL(res);
            var image = new Image();
            image.src = imageURL;
            opt.onDone.call(xhr, image, xhr);
        },
        onError: opt.onError
    });
};
 
/********* ********** ********** *********/
//  MISCELLANEOUS METHODS
 /********* ********** ********** *********/
 
// no operation ref
utils.noop = function () {};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
 
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
 
/********* ********** ********** *********/
//  BASIC EXP SYSTEM
 /********* ********** ********** *********/
 
// Basic experience point system methods
utils.XP = (function () {
    // default values
    var default_deltaNext = 50,
    defualt_cap = 100;
    // get level with given xp
    var getLevel = function (xp, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXP = function (level, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse a levelObj by XP
    var parseByXP = function (xp, cap, deltaNext) {
        //cap = cap === undefined ? default_cap : cap;
        var l = getLevel(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXP(level + 1);
        return {
            level: level,
            levelFrac: l,
            per: l % 1,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        // use getXP method and then pass that to parseXP for utils.XP.parseByLevel
        parseByLevel: function (l, cap, deltaNext) {
            return parseByXP(getXP(l, deltaNext), cap);
        },
        // can just directly use parseByXP for utils.XP.parseByXP
        parseByXP: parseByXP
    };
}
    ());
```

## 2 - The object pool lib

A must have feature of any kind of game framework might be to have some kind of object pool module. For this I started out with what it is that I worked out for my [canvas example post on object pools](/2020/07/20/canvas-example-object-pool/), and I made just a few minor changes thus far.

The module is used by calling the main create method of the module, and when doing so I pass some options when it comes to how to go about setting up the object pool. One of the most impotent options of this would be the count option which is what the fixed size of the object pool module should be. I also can give methods that are to be fired when an object is spawned, updated and purged.

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
            secsCap: opt.secsCap === undefined ? Infinity : opt.secsCap,
            disableLifespan: opt.disableLifespan || false,
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
    api.spawnAll = function(pool, state, opt){
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        });
        return pool.objects;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        secs = secs > pool.secsCap ? pool.secsCap : secs;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                // if disableLifespan featre
                if(pool.disableLifespan){
                }else{
                    // else use lifespan feature
                    obj.lifespan -= secs;
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        pool.purge.call(pool, obj, pool, state);
                    }
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
    //api.boundingBox = function (a, b) {
    //    return utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
    //};
    // return public method
    return api;
}
    ());
```

## 3 - The canvas lib and plug-ins

I am going to want to have a canvas module as part of this game framework as that is just a major part of making any kind of html and javaScript game these days. The module should have at least a few basic features that such a module should have, and the first thing that comes to mind for this sort of thing is to have layers actually. Last week I started another javaScript example that is just this more or less which is of course my first [canvas module javaScript example](/2021/08/27/js-javascript-example-canvas-module). So I started with what I had for that post, and just started making a few changes here and there, and added some plug ins for it.

### 3.1 - The canvas lib

Here is the canvas lib source code as it currently stands as of this writing. In the body of the core source code of this module I have a few built in draw methods. One f which is to create a current layer, another is to draw a background. I also have built in draw methods for printing some text to a layer, as well as a collection of points created with one of the points methods built into this module or added by way of a plug in.

Speaking of points there are also just one built in points method which will create and return a box in the from of a collection of points. After that it is just a bunch of helper functions for the public methods of this module, one of which is for creating the main stack of layers that is used with this modules other public methods. On top of course having a pubic method for creating a stack of layers there is also the main draw and create points methods as well as a load method which is what I use ti extend the features of this module.

```js
(function (api) {
 
    var FEATURES = {};
 
/********* ********** *********
 Draw Methods
********** ********** *********/
 
    var drawMethods = FEATURES.drawMethods = {};
 
    // clear a layer
    drawMethods.clear = function(stack, ctx, canvas, layerObj){
        ctx.clearRect(-2, -2, canvas.width + 2, canvas.height + 2);
    };
 
    // draw a background
    drawMethods.background = function (stack, ctx, canvas, layerObj, background) {
        ctx.fillStyle = background || stack.background || 'black';
        ctx.fillRect(-2, -2, canvas.width + 2, canvas.height + 2);
    };
 
    // built in print method
    drawMethods.print = function(stack, ctx, canvas, layerObj, text, x, y, opt){
        opt = opt || {};
        opt.fontSize = opt.fontSize || 10;
        ctx.fillStyle = opt.fillStyle || 'black';
        ctx.textBaseline = opt.baseLine || 'top';
        ctx.textAlign = opt.align || 'left';
        ctx.font = opt.fontSize + 'px arial';
        ctx.fillText(text, x, y);    
    };
 
    // draw a points collection
    drawMethods.points = function (stack, ctx, canvas, layerObj, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    i += 1;
                }
            }
            ctx.lineWidth = lineWidth;
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };
 
/********* ********** *********
 Points Methods
********** ********** *********/
 
    var pointsMethods = FEATURES.pointsMethods = {};
 
    // create a box
    pointsMethods.box = function(sx, sy, w, h){
        var x = sx - w / 4,
        y = sy - h / 4;
        var points = [[
            x, y, x + w / 2, y,
            x + w / 2, y + h / 2, x, y + h / 2
        ]];
        return points;
    };
 
/********* ********** *********
 HELPERS
********** ********** *********/
 
    // get a canvas relative position that is adjusted for scale
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        pos = {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
        // adjust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        return pos;
    };
    // create and return a canvas pointer event handler for a stack
    var canvasPointerEventHandler = function (stack, state, events) {
        return function (e) {
            var pos = getCanvasRelative(e),
            handler = null;
            e.preventDefault();
            if (e.type === 'mousedown' || e.type === 'touchstart') {
                handler = events['pointerStart'];
            }
            if (e.type === 'mousemove' || e.type === 'touchmove') {
                handler = events['pointerMove'];
            }
            if (e.type === 'mouseup' || e.type === 'touchend') {
                handler = events['pointerEnd'];
            }
            if (handler) {
                handler.call(state, e, pos, state, stack);
            }
        };
    };
    // attach canvas pointer events
    var attachCanvasPointerEvents = function (stack) {
        var handler = canvasPointerEventHandler(stack, stack.state, stack.events),
        canvas = stack[stack.length - 1].canvas,
        options = {
            passive: false
        }
        canvas.addEventListener('mousedown', handler, options);
        canvas.addEventListener('mousemove', handler, options);
        canvas.addEventListener('mouseup', handler, options);
        canvas.addEventListener('touchstart', handler, options);
        canvas.addEventListener('touchmove', handler, options);
        canvas.addEventListener('touchend', handler, options);
    };
    // create a single layer object
    var createLayer = function (opt) {
        opt = opt || {};
        opt.append = opt.append === undefined ? true : opt.append;
        var layer = {};
        // a layer should have a container
        layer.container = opt.container || document.getElementById('canvas-app') || document.body;
        if (typeof layer.container === 'string') {
            layer.container = document.querySelector(layer.container);
        }
        layer.canvas = document.createElement('canvas');
        layer.ctx = layer.canvas.getContext('2d');
        // assign the 'canvas_layer' className
        layer.canvas.className = 'canvas_layer';
        // set native width
        layer.canvas.width = opt.width === undefined ? 320 : opt.width;
        layer.canvas.height = opt.height === undefined ? 240 : opt.height;
        // translate by 0.5, 0.5
        layer.ctx.translate(0.5, 0.5);
        // disable default action for onselectstart
        layer.canvas.onselectstart = function () {
            return false;
        }
        // append canvas to container
        if (opt.append) {
            layer.container.appendChild(layer.canvas);
        }
        return layer;
    };
 
/********* ********** *********
 PUBLIC API
********** ********** *********/
 
    // create a stack of layers as an 'Array Like' Object
    api.createLayerStack = function (opt) {
        opt = opt || {};
        // creating an array like object
        var stack = {
            length: opt.length === undefined ? 2 : opt.length,
            container: opt.container || document.getElementById('canvas-app') || document.body,
            events: opt.events || {},
            state: opt.state || {},
            background: opt.background || 'blue'
        };
        if (typeof stack.container === 'string') {
            stack.container = document.querySelector(stack.container);
        }
        // layer options
        var layerOpt = {
            container: stack.container,
            append: true,
            width: opt.width || 320,
            height: opt.height || 240
        };
        // create layers for the stack
        var i = 0;
        while (i < stack.length) {
            stack[i] = createLayer(layerOpt);
            stack[i].i = i;
            i += 1;
        }
        attachCanvasPointerEvents(stack);
        return stack;
    };
    // main draw method
    api.draw = function (stack, key, layerIndex) {
        // layer object
        var layerObj = stack[layerIndex];
        // CORE ARGUMENTS created from stack, and layerIndex arguments of canvasMod.draw
        var coreArgu = [stack, layerObj.ctx, layerObj.canvas, layerObj];
        // ADDITIONAL ARGUMNETS that will change depending on the draw method used with key argument of canvasMod.draw
        var addArgu = [];
        if (arguments.length > 3) {
            addArgu = Array.prototype.slice.call(arguments, 3, arguments.length);
        }
        FEATURES.drawMethods[key].apply(stack, coreArgu.concat(addArgu));
    };
    // create points
    api.createPoints = function (stack, key) {
        var coreArgu = [stack]; 
        var addArgu = Array.prototype.slice.call(arguments, 2, arguments.length);
        var points = pointsMethods[key].apply(stack, coreArgu.concat(addArgu));
        return points;
    };
    // load additional FEATURES
    api.load = function(plugObj){
         Object.keys(plugObj).forEach(function(featuresKey){
             var featureArray = plugObj[featuresKey];
             featureArray.forEach(function(feature){
                 FEATURES[featuresKey][feature.name] = feature.method;
             })   
         });
    };
}
    (this['canvasMod'] = {}));
```

### 3.2 - The buttons canvas plug-in

I made a buttons plug in for this canvas module when I started a buttons feature for this game framework. This canvas plug in will add two draw methods then, one of which will draw a single button object, the other will draw all buttons for the current state.

```js
canvasMod.load({
    drawMethods : [
        // draw a button
        {
            name: 'button',
            method: function(stack, ctx, canvas, layerObj, button){
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.beginPath();
                ctx.rect(button.x, button.y, button.w, button.h);
                ctx.fill();
                ctx.stroke();
            }
        },
        // draw a button collection for the current state object
        {
            name: 'stateButtons',
            method: function(stack, ctx, canvas, layerObj, sm){
                var state = sm.states[sm.currentState];
                Object.keys(state.buttons).forEach(function(buttonKey){
                    var button = state.buttons[buttonKey];
                    canvasMod.draw(stack, 'button', layerObj.i, button);
                });
            }
        }
    ]
});
```

### 3.3 - The mod-pool canvas plug-in

When I added the object pool to the over all project I also wanted to add a basic draw method for a pool of objects. This is something that will need to be refined at least a little more even when it comes to having a bland general form of this kind if draw method. The module however can also serve as a starting point for making another kind of canvas plug in that I might have to make on a per project basis. For example say I am making a game where I want to display hp bars for display objects, and other info that has to do with the specific nature of a game, I will need to go beyond something simple like this then.

```js
canvasMod.load({
    drawMethods : [
        // basic draw a pool method
        {
            name: 'pool',
            method: function(stack, ctx, canvas, layerObj, pool, opt){
                opt = opt || {}
                pool.objects.forEach(function(obj){
                    ctx.fillStyle = opt.fillStyle || obj.data.fillStyle || 'white';
                    ctx.strokeStyle = opt.strokeStyle || obj.data.strokeStyle || 'black';
                    if(obj.active || opt.drawAll){
                        ctx.beginPath();
                        ctx.rect(obj.x, obj.y, obj.w, obj.h);
                        ctx.fill();
                        ctx.stroke();
                    }
                });
            }
        }
    ]
});
```

### 3.4 - The points-circle plug-in

This points circle plug in is yet another plug in that I added just for the hell of it. I may make some of these features built into the canvas module itself at some point maybe, but for now I have them as optional pug ins outside of the canvas module. This plug in will add just to points methods to the canvas module that are circle and oval points method. So then that is it just having some methods for creating a circle and oval in terms of a collection of points.

```js
canvasMod.load({
    // points methods to add
    pointsMethods : [
        // a circle method
        {
            name: 'circle',
            method: function(stack, cx, cy, radius, pointCount){
                pointCount = pointCount === undefined ? 100 : pointCount;
                return canvasMod.createPoints(stack, 'oval', cx, cy, radius, radius, pointCount);
            }
        },
        // an oval method
        {
            name: 'oval',
            method: function(stack, cx, cy, radius1, radius2, pointCount){
                pointCount = pointCount === undefined ? 100 : pointCount;
                var points = [[]];
                var i = 0, x, y, radian;
                while(i < pointCount){
                    radian = Math.PI * 2 / pointCount * i;
                    x = cx + Math.cos(radian) * radius1;
                    y = cy + Math.sin(radian) * radius2;
                    points[0].push(x, y);
                    i += 1;
                }
                return points;
            }
        }
    ]
});
```

## 4 - The game frame lib

Now for the current state of the main game frame module that is what I will be using in demo files to create a main state machine object, and add state objects to it. In this module I have to create methods for creating state machine objects, one of which is to create the main state machine object, and the other is to create a more base object of a state machine object that is used for nested states when making a game module.

I then have a bunch of helper methods that are many used with the main create state machine public method. For example there is a helper that will create and add a state object to the main state object in the event that there is a loader option in the given options object. There are also helper methods that are used to check if a button has been click when it comes to the buttons collection feature of state objects.

The additional public methods thus far have to do with pushing additional state objects to a main state object, and setting what the current state is. The punch state object method is a way to make sure that empty properties of a state object are filled with something at least. The set state method should always be used to change states when and where needed to make sure that the end and start hooks of state objects will fire.

```js
(function (api) {
 
/********* ********** ********** ********** *********/
//  CREATE State Machine PUBLIC Methods and helpers
/********* ********** ********** ********** *********/
 
    // create a minimal sm object ( For setting up a nested sm object, and the base of a main sm object )
    api.smCreateMin = function(opt){
        opt = opt || {};
        // return a base sm object
        var sm = {
            currentState: opt.currentState || '',
            states: opt.states || {},
            events: opt.events || {}
        };
        return sm;
    };
 
    // helpers for main create method
    var callStateObjectPointerEvent = function(pointerType, e, pos, sm){
        var state = sm.states[sm.currentState],
        handler;
        if(state){
            handler = state.events[pointerType];
            if(handler){
                handler.call(sm, e, pos, sm);
            }
        }
    };
    // check if a button was clicked for the current state, if so call the onClick method for it
    var buttonCheck = function(e, pos, sm){
        var state = sm.states[sm.currentState];
        var buttonKeys = Object.keys(state.buttons);
        var i = 0, len = buttonKeys.length, button;
        while(i < len){
            button = state.buttons[buttonKeys[i]];
            if(utils.boundingBox(button.x, button.y, button.w, button.h, pos.x, pos.y, 1, 1)){
                button.onClick.call(sm, e, pos, sm, button);
            }
            i += 1;
        }
    };
 
    var pushLoaderState = function(sm){
        gameFrame.smPushState(sm, {
            name: 'loader',
            start: function(sm){
                canvasMod.draw(sm.layers, 'background', 0);
                // set up images array
                sm.images = [];
                var loaderObj = sm.loader;
                // if we have images to load start the requests for them
                if(sm.loader.images){
                    var i = 0;
                    while(i < sm.loader.images.count){
                        (function(imageIndex){
                           utils.httpPNG({
                                url: sm.loader.images.baseURL + '/' + imageIndex + '.png',
                                // set to sm images if all goes well
                                onDone : function(image, xhr){
                                    sm.images[imageIndex] = image;
                                },
                                // just a blank image for now if there is an error
                                onError: function(){
                                    sm.images[imageIndex] = new Image();
                                }
                            });
                        }(i));
                        i += 1;
                    }
                }
            },
            update: function(sm, secs){ 
                if(sm.loader.images){
                    // start game state when all images are loaded
                    if(sm.images.length === sm.loader.images.count){
                        gameFrame.smSetState(sm, 'game');
                    }
                }else{
                    // no images just progress to game state
                    gameFrame.smSetState(sm, 'game');
                }
            },
            draw: function(sm, layers){
                var ctx = layers[1].ctx,
                canvas = layers[1].canvas,
                cx = canvas.width / 2,
                cy = canvas.height / 2;
                // clear
                canvasMod.draw(layers, 'clear', 1);
                // if images
                if(sm.loader.images){
                    ctx.fillStyle = 'white'
                    ctx.strokeStyle = 'black';
                    ctx.beginPath();
                    ctx.rect(0, cy - 10, canvas.width * (sm.images.length / sm.loader.images.count) , 10);
                    ctx.fill();
                    ctx.stroke();
                    canvasMod.draw(layers, 'print', 1, sm.images.length + ' / ' + sm.loader.images.count, cx, cy + 15, {
                        align: 'center',
                        fontSize: 30
                    });
                }
            }
        });
    };
    // create the main sm object
    api.smCreateMain = function(opt){
        opt = opt || {};
        // create base sm object
        var sm = api.smCreateMin(opt);
        // values that can be set by options
        sm.ver = opt.ver || '';
        sm.game = opt.game || {};
        sm.fps = sm.fps === undefined ? 30 : opt.fps;
        sm.loader = opt.loader || {};
        sm.images = [];
        // events
        sm.events = opt.events || {
            pointerStart: function (e, pos, sm) {
                buttonCheck(e, pos, sm);
                callStateObjectPointerEvent('pointerStart', e, pos, sm);   
            },
            pointerMove: function (e, pos, sm) {
                callStateObjectPointerEvent('pointerMove', e, pos, sm);
            },
            pointerEnd: function (e, pos, sm) {
                callStateObjectPointerEvent('pointerEnd', e, pos, sm); 
            }
        };
        // set up stack of canvas layers using the canvas module
        sm.layers = canvasMod.createLayerStack({
            length: opt.canvasLayers === undefined ? 3 : opt.canvasLayers,
            container: opt.canvasContainer || document.getElementById('canvas-app') || document.body,
            events: sm.events,
            state: sm,
            width: opt.width,
            height: opt.height
        });
        sm.debugMode = opt.debugMode || false;
        // value that should not be set by options
        sm.secs = 0;
        sm.stopLoop = false;
        sm.lt = new Date();
        // if sm.loader.images push built in loader state
        if(sm.loader.images){
            pushLoaderState(sm);
        }
        // main loop
        sm.loop = function () {
            var now = new Date();
            sm.secs = (now - sm.lt) / 1000,
            state = sm.states[sm.currentState] || {};
            if (sm.secs >= 1 / sm.fps) {
                // update
                var update = state.update;
                if(update){
                    update.call(sm, sm, sm.secs);
                }
                // draw
                var drawMethod = state.draw;
                if(drawMethod){
                    drawMethod.call(sm, sm, sm.layers);
                }                
                sm.lt = now;
            }
            // if sm.stopLoop === false, then keep looping
            if(!sm.stopLoop){
                requestAnimationFrame(sm.loop);
            }
        };
        // stop loop on any page error
        window.addEventListener('error', function(e) {
            if(sm.debugMode){
                sm.stopLoop = true;
                console.log('error: ' + e.message);
                console.log(e);
                console.log('loop stoped');
            }
        });
        return sm;
    };
 
/********* ********** ********** ********** *********/
//  PUSH NEW STATE OBJECTS
/********* ********** ********** ********** *********/
 
    // push a new state object
    api.smPushState = function(sm, opt){
        var state = {
            name: opt.name || 'state_' + Object.keys(sm.states).length
        };
        state.buttons = opt.buttons || {};
        state.start = opt.start || function(){};
        state.end = opt.end || function(){};
        state.update = opt.update || function(){};
        state.draw = opt.draw || function(){};
        state.events = opt.events || {};
        sm.states[state.name] = state;
        return state;
    };
 
/********* ********** ********** ********** *********/
//  SET THE CURRENT STATE
/********* ********** ********** ********** *********/
 
    // set the current state
    api.smSetState = function(sm, newState){
        // get a ref to the old state
        var oldState = sm.states[sm.currentState];
        // call the on end hook for the old state if it has one
        if(oldState){
            var endHook = oldState.end;
            if(endHook){
                endHook.call(sm, sm);
            }
        }
        // change to the new state, and call the start hook it it has one
        sm.currentState = newState;
        var newState = sm.states[sm.currentState];
        var startHook = newState.start;
        if(startHook){
            startHook.call(sm, sm);
        }
    };  
}
    (this['gameFrame'] = {}));
```

## 5 - Demos thus far

So then Now that I have my game framework together I will want to make at least a few quick demos of this framework to make sure that it is working just the way that I would like to to with the features that I have added thus far.

### 5.1 - Basic hello world demo

So the the first demo that I put together is just the usual hello world type demo where the goal is to just print hello world on the screen. However for this demo I wanted to also test out a few of the other features of this game framework other than the print draw method that I have built into the canvas framework.

```js
// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'game', // set starting state object to use
    width: 640,
    height: 480,
    game: {
        text: 'Hello World',
        pool: poolMod.create({
            count: 8,
            secsCap: 0.25,
            disableLifespan: true,
            spawn: function(obj, pool){
                obj.data.homeRadian = Math.PI * 2 / pool.objects.length * obj.i;
                obj.data.deltaRadian = 0;
                obj.data.radian = obj.data.homeRadian;
                obj.data.radius = 200;
            },
            update: function (obj, pool, sm, secs){
               obj.data.deltaRadian = Math.PI / 180 * 45 * secs;
               obj.data.radian += obj.data.deltaRadian;
               obj.data.radian = utils.mod(obj.data.radian, Math.PI * 2);  
               obj.lifespan = 1;
               obj.x = 320 - obj.w / 2 + Math.cos(obj.data.radian) * obj.data.radius;
               obj.y = 240 - obj.h / 2 + Math.sin(obj.data.radian) * obj.data.radius;
            }
        }),
        cx: 320,
        cy: 240,
        x: 0,
        y: 0,
        dir: 1,
        dx: 0,
        printOptions: {
            align: 'center',
            baseLine: 'middle',
            fontSize: 40
        },
        pointerDown: false
    }
});
 
// add at least one state object
gameFrame.smPushState(sm, {
    name: 'game',
    // start hook will just fire once when the state object starts
    start: function(sm){
        // draw background once
        canvasMod.draw(sm.layers, 'background', 0);
        // spawn
        poolMod.spawnAll(sm.game.pool, sm, {});
    },
    // what to do on each update
    update: function(sm, secs){
        sm.game.dx += 64 * secs * sm.game.dir;
        if(sm.game.dx >= 32){
            sm.game.dx = 32;
            sm.game.dir = -1;
        }
        if(sm.game.dx <= -32){
            sm.game.dx = -32;
            sm.game.dir = 1;
        }
        sm.game.x = sm.game.cx + sm.game.dx;
        sm.game.y = sm.game.cy;
        // update game.pool
        poolMod.update(sm.game.pool, secs, sm);
    },
    // draw will be called after each update
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'pool', 1, sm.game.pool);
        canvasMod.draw(layers, 'print', 1, sm.game.text, sm.game.x, sm.game.y, sm.game.printOptions);
    },
    // events for this state
    events: {
        pointerStart: function(e, pos, sm){
            sm.game.pointerDown = true;
        },
        pointerMove: function(e, pos, sm){
            if(sm.game.pointerDown){
                sm.game.cx = pos.x;
                sm.game.cy = pos.y;
            }
        },
        pointerEnd: function(e, pos, sm){
            sm.game.pointerDown = false;
            sm.game.cx = 320;
            sm.game.cy = 240;
        }
    }
});
// start the state machine
gameFrame.smSetState(sm, 'game');
sm.loop();
```

### 5.1 - Demo of Menus

When I added buttons as a feature of the game framework I wanted to set start a demo to make sure that they are working the way that they should be. There is a bit more that I might want to add when it comes to this feature at some point but for now this is the basic demo of the buttons feature.

the basic idea of buttons is to just have the option of having a collection of button objects when creating a state object. When I create a button object I have the option to add an on click method that will be the logic that is to fire when one of these buttons are click by the user with the mouse or a touch screen. For now in this example i am just using these buttons to change the current state object.

```js
// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'mainMenu', 
    width: 640,
    height: 480,
    game: {}
});
 
// a main menu state
gameFrame.smPushState(sm, {
    name: 'mainMenu',
    buttons: {
        newGame: { x: 100, y: 100, w: 64, h:64, disp: 'New Game', onClick: function(e, pos, sm, button){
            gameFrame.smSetState(sm, 'game');
        }}
    },
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'stateButtons', 1, sm);
    }
});
// a game state
gameFrame.smPushState(sm, {
    name: 'game',
    buttons: {
        back: { x: 100, y: 100, w: 64, h:64, disp: 'New Game', onClick: function(e, pos, sm, button){
            gameFrame.smSetState(sm, 'mainMenu');
        }}
    },
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
    },
    update: function(sm, secs){
 
    },
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'stateButtons', 1, sm);
    },
    events: {
        pointerStart: function(e, pos, sm){},
        pointerMove: function(e, pos, sm){},
        pointerEnd: function(e, pos, sm){}
    }
});
// start the state machine
gameFrame.smSetState(sm, 'mainMenu');
sm.loop();
```

### 5.1 - Demo of the loader

I am going to want to start making games that make use of external image assets so I will want to have a assets loader in the game framework. As of this writing there is such an assets loader in the framework, and in order to use it I just need to add a loader object to the options object that I pass to the create main state machine object method of the game frame work.

```js
// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'loader', 
    width: 640,
    height: 480,
    game: {},
    loader: {
        images: { // load 0.png, and 1.png at ./img
            baseURL: './img',
            count: 2
        }
    }
});
 
// a game state
gameFrame.smPushState(sm, {
    name: 'game',
    buttons: {
        //back: { x: 100, y: 100, w: 64, h:64, disp: 'New Game', onClick: function(e, pos, sm, button){      
        //}}
    },
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
    },
    update: function(sm, secs){
 
    },
    draw: function(sm, layers){
        var canvas = layers[1].canvas,
        ctx = layers[1].ctx;
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.currentState, 10, 10);
        canvasMod.draw(layers, 'stateButtons', 1, sm);
        // drawing images to the canvas
        ctx.drawImage(sm.images[0], 29.5, 29.5);
        ctx.drawImage(sm.images[1], 100.5, 29.5);
    },
    events: {
        pointerStart: function(e, pos, sm){},
        pointerMove: function(e, pos, sm){},
        pointerEnd: function(e, pos, sm){}
    }
});
// start the state machine
gameFrame.smSetState(sm, 'loader');
sm.loop();
```

## 6 - Conclusion

So far this framework seems to be working okay, at least when it comes to the silly demos that I have made for it thus far. There may be a few more features and changes that I will want to make for this thing of course, however I do not want to go to nuts with this thing just yet. The core set of features that I would want to have in a game framework are there such as a state machine, basic canvas, and object pool modules. In order to really know what should be added on top of what I have all ready I am going to want to make more demos, and actual projects. However for the most part I am thing that what I will want to do is just further refine the features that are all ready in place.

I would like to keep this framework fairly minimal when it comes to features, but there is the idea of created a whole new framework only not from the ground up, as I would start with this source code thus far. There are features like a grid module, and various kinds of draw methods, and points methods that I might not want to add to a basic framework like this. However when it comes to making a certain set of games, with certain common features there is making a framework with things like that baked into the framework that is a kind of extinction of what I have work out here.


