---
title: State Machine canvas example
date: 2020-01-28 13:49:00
tags: [canvas]
categories: canvas
layout: post
id: 598
updated: 2020-04-19 07:34:39
version: 1.15
---

For todays [canvas example](/2020/03/23/canvas-example/) I made a state machine that helps to keep code broken down into many independent states. For simple canvas examples and projects a state machine is not needed, but if I am starting to make a serious project the use of a state machine becomes more important.

Say you want to make a project that is fairly complex and there are many states that the project needs to preform before it can even be used. For example content needs to be downloaded, and then some objects need to be initialized before the project can be started and the user can interact with it. In addition even when it is up and running there are many menus that the user can navigate between before starting a main application state. In that kind of situation some way to compartmentalize all these different states of sorts needs to be implemented and such a thing if often referred to as a state machine.

<!-- more -->

## 1 - The State Machine module for canvas examples

In this section I will be going over the source code of the state machine module that I worked out for this post, and might use in future canvas examples and projects. The module makes use of the IFFE pattern and returns a public API as a single function that creates a state machine object. Once I have a state machine object I can then call the load method as a way to start defining state objects.


### 1.1 - The start of the module, and a parse container argument helper

So I start out the module with the beginnings of an IIFE, and a parse container helper. When the main public function is called I can pass a container argument as the first argument. The argument can be an object which is assumed to be a container element, it can also be a string that is assumed to be an id to an element to use. All other possible values including undefined will result in the body element being used as the container element to attach to.

```js
var Machine = (function () {
 
    // PARSE arguments
 
    // Parse a container argument
    var parseContainer = function (container) {
        // if object assume element that is to be used as the container
        if (typeof container === 'object' && container != null) {
            return container;
        }
        // if string assume id
        if (typeof container === 'string') {
            return document.getElementById(container);
        }
        // if we get this far return document.body
        return document.body;
    };
```

### 1.2 - Create canvas helper

Here I have a helper that is used to create and append the canvas element to the given state object. This method assumes that a container element is attached to the state machine instance so that value should be parsed before this method is called.

```js
    // CANVAS
 
    // create a canvas for the given state machine
    var createCanvas = function (sm, w, h) {
        sm.canvas = document.createElement('canvas');
        sm.ctx = sm.canvas.getContext('2d');
        sm.container.appendChild(sm.canvas);
        sm.canvas.width = w || 320;
        sm.canvas.height = h || 240;
        // fill black for starters
        sm.ctx.fillStyle = 'black';
        sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
    };
```

For starters it draws a plain black background to the canvas, and the width and height can also be set via the arguments that are passed along from the arguments of the main public function that I will be getting to later.

### 1.3 - Get canvas relative position

This helper method just returns a canvas relative position from an event object that was gained from within an event hander. Without this I would end up with a window relative position which is the default for event handlers that have to do with mouse and touch events.

```js
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
```

I made it so that it should give a desired result regardless if it is a mouse or touch event. The method seems to work okay as far as I have tested it.

### 1.4 - Attach event handers to a canvas element

This is the method that I worked out for attaching events to the canvas for event types like mouse down. The state manager instance should be passed as the first argument, and the canvas element should be created and append before this method is used.

In the body of the hander that is attached for this given DOM event type the get canvas relative position helper that I wrote about earlier in this section is used to get a canvas relative position for the event. This position will be passed to the actual hander defined in the state object as the first argument for that kind of hander, along with the state machine instance and the original event object.

```js
    // attach a canvas event
    var attachCanvasEvent = function (sm, DOMType, smType) {
        sm.canvas.addEventListener(DOMType, function (e) {
            var pos = getCanvasRelative(e),
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

### 1.5 - The public function that creates a state machine object

So now it is time for the public function that is used to create the state machine instance when making a project with this state machine module.

```js
    // create a new state machine
    return function (container, w , h) {
 
        // state machine Object
        var sm = {
            currentState: null,
            currentMode: null,
            game: {},
            draw: {},
            states: {},
            canvas: null,
            container: parseContainer(container),
            ctx: null,
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
        createCanvas(sm, w, h);
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

## 2 - Simple use case example

So here is a simple use case example of the state machine module in action. This results in a very basic clicker type game example where some resources are given when the canvas is clicked, as well as just over time.

```js
var sm = Machine('gamearea');
 
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
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
 
        ctx.fillStyle = 'white';
        ctx.fillText('manual: ' + g.manual.toFixed(2), 10, 20);
        ctx.fillText('auto: ' + g.auto.toFixed(2), 10, 30);
 
    },
    userPointer: {
        start: function (pt, sm, e) {
            console.log(e.type, pt.x, pt.y);
            sm.game.manual += sm.game.perManual;
        }
    }
});
 
sm.start();
```

## 3 - Modes use case example

I wanted to make another example that makes use of my modes feature that I put together. This is a way to have a state within a state sort of speak. When a mode is active additional logic that is to happen when the mode is active will happen on top of the logic that will always run for the state.

```js
var sm = Machine('gamearea', 640, 480);
 
sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {
        var g = sm.game;
        g.ship = {
            x: sm.canvas.width / 2,
            y: sm.canvas.height / 2,
            heading: 0
        };
        g.userDown = false;
    },
    tick: function (sm) {
 
        var g = sm.game,
        ctx = sm.ctx;
 
        // set mode to nav conditions
        sm.currentMode = null;
        if (g.userDown) {
            if (new Date() - g.userDownST >= 1000) {
                sm.currentMode = 'nav';
            }
        }
 
        // draw
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillText(g.userDown, 10, 20);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(g.ship.x, g.ship.y, 5, 0, Math.PI * 2);
        ctx.stroke();
 
    },
    // global user pointer
    userPointer: {
        start: function (pt, sm, e) {
            sm.game.userDown = true;
            sm.game.userDownST = new Date();
        },
        end: function (pt, sm, e) {
            sm.game.userDown = false;
        }
    },
    // modes for this state
    modes: {
        nav: {
            // what to do for each tick, when nav mode is active
            tick: function (sm) {
                var g = sm.game,
                ship = g.ship;
                // move ship based on current heading
                ship.x += Math.cos(ship.heading) * 2;
                ship.y += Math.sin(ship.heading) * 2;
                // boundaries
                ship.x = ship.x < 0 ? sm.canvas.width : ship.x;
                ship.y = ship.y < 0 ? sm.canvas.height : ship.y;
                ship.x = ship.x > sm.canvas.width ? 0 : ship.x;
                ship.y = ship.y > sm.canvas.height ? 0 : ship.y;
            },
            // user pointer just for nav
            userPointer: {
                // mouse move event can change heading now
                move: function (pt, sm, e) {
                    var g = sm.game,
                    ship = g.ship;
                    ship.heading = Math.atan2(pt.y - ship.y, pt.x - ship.x);
                }
            }
        }
 
    }
});
 
sm.start();
```