---
title: State Machine canvas example
date: 2020-01-28 13:49:00
tags: [canvas]
categories: canvas
layout: post
id: 598
updated: 2021-03-01 17:56:25
version: 1.27
---

For todays [canvas example](/2020/03/23/canvas-example/) I made a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine) that helps to keep code broken down into many independent state objects. For simple canvas examples and projects a state machine is not needed, but if I am starting to make a serious project the use of a state machine becomes more important as a way to keep things better organized.

Say you want to make a project that is fairly complex and there are many states that the project needs to preform before it can even be used. For example content needs to be downloaded, and then some objects need to be initialized before the project can be started at which point the user can interact with it. 

In addition even when a game is up and running there are many menus that the user can navigate between before starting a main game state. Once a game is over there are often two kind of outcomes to the end of the game, and how they should be treated when updating a game save. So in that kind of situation some way to compartmentalize all these different states of sorts needs to be implemented and such a thing if often referred to as a state machine.

Many frameworks such as phaser will have a state machine as part of the functionality of the framework, but when it comes to starting a vanila javaScript project this aspect of the game would need to be created from the ground up. When it comes to making a canvas framework I often think that a state machine should be a part of such a framework, but I guess it does not have to be when it comes to making such a project. In any case this post will be on just one way to go about making a state machine by itself without much more beyond that.

<!-- more -->

## 1 - The utils module

First off just like any other canvas example of mine I want to start out with a genearic utility library. This utility librray contains methods that I might use accross diferent modules, and also methods that I might share accross other canvas examples. So they are all a bunch of stand alone methods that do soemthing specfic, and are often pure function like. For this utility library I am just using my ushual create canvas method, and another typical methods that I use to get a canvas relative pointer position.

```js
var utils = {};
 
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
 
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

## 2 - The State Machine module for canvas examples

In this section I will be going over the source code of the state machine module that I worked out for this post, and might use in future canvas examples and projects as is, or in a custom mutated form. The module makes use of the IFFE pattern and returns a public API as a single function that creates a state machine object. Once I have a state machine object I can then call the load method as a way to start defining state objects.

### 2.1 - Attach event handers to a canvas element

This is the method that I worked out for attaching events to the canvas for event types like mouse down. The state manager instance should be passed as the first argument, and the canvas element should be created and append before this method is used.

In the body of the hander that is attached for this given DOM event type the get canvas relative position helper that I wrote about earlier in this section is used to get a canvas relative position for the event. This position will be passed to the actual hander defined in the state object as the first argument for that kind of hander, along with the state machine instance and the original event object.

```js
var Machine = (function () {

    // attach a canvas event
    var attachCanvasEvent = function (sm, DOMType, smType) {
        sm.canvas.addEventListener(DOMType, function (e) {
            var pos = utils.getCanvasRelative(e),
            stateObj = sm.states[sm.currentState],
            handler,
            mode;
            // prevent default
            e.preventDefault();
            // call top level if there
            if (stateObj.userPointer) {
                handler = stateObj.userPointer[smType];
                if (handler) {
                    handler(pos, sm, e);
                }
            }
            // call for current mode if there
            if (stateObj.modes && sm.currentMode) {
                mode = stateObj.modes[sm.currentMode];
                if (mode.userPointer) {
                    handler = mode.userPointer[smType];
                    if (handler) {
                        handler(pos, sm, e);
                    }
                }
            }
        });
    };
 
    // attach canvas events for the given state machine
    var attachAllCanvasEvents = function (sm) {
        attachCanvasEvent(sm, 'mousedown', 'start');
        attachCanvasEvent(sm, 'mousemove', 'move');
        attachCanvasEvent(sm, 'mouseup', 'end');
        attachCanvasEvent(sm, 'touchstart', 'start');
        attachCanvasEvent(sm, 'touchmove', 'move');
        attachCanvasEvent(sm, 'touchend', 'end');
    };
```

### 2.2 - The public function that creates a state machine object

So now it is time for the public function that is used to create the state machine instance when making a project with this state machine module.

```js
    // create a new state machine
    return function (container, w, h) {
        var canvasObj = utils.createCanvas();
        // state machine Object
        var sm = {
            ver: '0.0.0',
            currentState: null,
            currentMode: null,
            game: {},
            draw: {},
            states: {},
            canvas: canvasObj.canvas,
            container: canvasObj.container,  //parseContainer(container),
            ctx: canvasObj.ctx,
            load: function (stateObj) {
                // just reference the object for now as long as
                // that works okay
                sm.states[stateObj.name || 'game'] = stateObj;
                if (stateObj.bootState) {
                    sm.currentState = stateObj.name;
                }
            },
            start: function (stateName) {
                sm.currentState = stateName || sm.currentState;
                var init = sm.states[sm.currentState].init || null;
                if (init) {
                    init(sm);
                }
                loop();
            }
        };
        // create canvas and attach event handlers
        //createCanvas(sm, w, h);
        attachAllCanvasEvents(sm);
        // main loop
        var loop = function () {
            requestAnimationFrame(loop);
            var stateObj = sm.states[sm.currentState] || {};
            // call top level tick
            if (stateObj.tick) {
                stateObj.tick(sm);
            }
            // call mode tick
            if (stateObj.modes && sm.currentMode) {
                var mode = stateObj.modes[sm.currentMode];
                if (mode.tick) {
                    mode.tick(sm);
                };
            }
        };
        return sm;
    };
 
}
    ());
```

## 3 - Simple use case example

So here is a simple use case example of the state machine module in action. This results in a very basic clicker type demo of what it is that I have worked out thus far. I am just creating a single state object for now that will also be the boot state called game. In the init method I set up some starting values for a main game object, and in the tick method I mutate that game object. For now I am also drawing to the canvas in the tick methods, also but in any future versions that I might make for this that will of course change. I am also able to define what will happen for pointer events.

```js
var sm = Machine('canvas-app');
 
sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {
 
        var g = sm.game;
        g.manual = 0;
        g.perManual = 0.25;
        g.auto = 0;
        g.autoTickRate = 3000;
        g.perAutoTick = 1;
        g.pos = {x:0,y:0};
        g.lt = new Date();
 
    },
    tick: function (sm) {
 
        var g = sm.game,
        ctx = sm.ctx,
        now = new Date(),
        t = now - g.lt;
 
        if (t >= g.autoTickRate) {
            var ticks = t / g.autoTickRate;
            g.auto += ticks * g.perAutoTick;
            g.lt = now;
        }
 
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
 
        ctx.fillStyle = 'white';
        ctx.fillText('manual: ' + g.manual.toFixed(2), 10, 20);
        ctx.fillText('auto: ' + g.auto.toFixed(2), 10, 30);
        ctx.fillText('pos: ' + g.pos.x.toFixed(2) + ', ' + g.pos.y.toFixed(2), 10, 40);
 
        // ver
        ctx.font = '10px arial';
        ctx.fillText('v' + sm.ver, 5, sm.canvas.height - 15 );
 
    },
    userPointer: {
        start: function (pt, sm, e) {
            var g = sm.game;
            g.manual += sm.game.perManual;
            g.pos.x = pt.x;
            g.pos.y = pt.y;
        }
    }
});
 
sm.start();
```

So when it comes to this there is not much to write about just yet, but I have the basic idea of what I wanted up and running at least.

## 4 - Conclusion

So with this canvas example I have together what looks like a somewhat useful state machine module. I have not battle tested this though, so I would not really go about using this just yet aside from a hobby project maybe. If I get around to it I might get to sining some more time into this one though, and also pull this together with a whole bunch of other components that I am working out to make my own canvas framework or sorts that I might use to make a few games with. Do not hold your breath with that one though, I have way to many competing ideas when it comes to what I want to focus on.