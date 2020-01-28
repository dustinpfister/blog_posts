---
title: State Machine canvas example
date: 2020-01-28 13:49:00
tags: [canvas]
categories: canvas
layout: post
id: 598
updated: 2020-01-28 15:10:22
version: 1.1
---

For todays [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) I made a state machine that helps to keep code broken down into many independent states. For simple canvas examples and projects a state machine is not needed, but if I am starting to make a serious project the use of a state machine becomes more important.

<!-- more -->

## 1 - The State Machine module for canvas examples

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
 
    // get canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        return {
            x: x,
            y: y,
            bx: bx
        };
    };
 
    // attach a canvas event
    var attachCanvasEvent = function (sm, DOMType, smType) {
        sm.canvas.addEventListener(DOMType, function (e) {
            var pos = getCanvasRelative(e),
            stateObj = sm.states[sm.currentState],
            handler,
            mode;
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
    };
 
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