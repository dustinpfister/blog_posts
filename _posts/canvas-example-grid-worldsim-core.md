---
title: Search destroy and spawn canvas example
date: 2020-04-15 17:18:00
tags: [canvas]
layout: post
categories: canvas
id: 646
updated: 2020-04-19 19:44:58
version: 1.4
---

I want to start making at least a few more [canvas examples](/2020/03/23/canvas-example/) that are the kind of example that I will be coming back to a few times. In other words the kind of canvas example that might prove to be a bit more that just a center piece to write about in a blog post before moving on to the next thing. I as happy with how my [grid gradient canvas example](/2020/03/26/canvas-example-grid-gradient/) came out as it is was a canvas example that I put a little more time and effort into than usual. The main reason why I liked working on it so much was the plug-in system. However that was just an eye candy type thing, it would be nice to start another canvas example that is something els like that only it is something maybe a little more interesting.

So this canvas example will be similar to the grid gradient example, but this time I will be aiming for the start of a world simulator type project.

<!-- more -->

## 1 - utils.js

```js
// UTILS
var u = {};
 
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

## 2 The world.js file

The world.js file is the main module that will create all the cells for the gird that will make up the world. It also contains some internal objects that can be expanded with optional plug-ins via a public load method. So I aim to try to keep the world.js file as slim as possible, pulling much of what I think might need to happen for this project out of the world.js module and into external plug-ins.

```js
var world = (function () {
 
    var CELL_VALUES = {
        sx: 32,
        sy: 32,
        size: 32
    };
 
    // hard coded initObjects
    // this can be extend via a plug-in
    var init = {
        defaultValues: {
            before: function (state) {
                //console.log('defualt values before hook');
            },
            forCell: function (state, events, cell) {
                cell.x = cell.i % state.width;
                cell.y = Math.floor(cell.i / state.width);
                //console.log('default values forCell: ' + JSON.stringify(cell));
            },
            after: function (state) {
                //console.log('default values after hook');
            }
        }
    };
    // events and forTick objects
    var events = {};
    var ticks = {};
    // call a hook
    var callHook = function (state, initObjKey, hookName, cell) {
        hookName = hookName || 'before';
        initObjKey = initObjKey || 'defaultValues';
        var initObj = init[initObjKey];
        if (initObj[hookName]) {
            initObj[hookName](state, events, cell);
        }
    };
 
    // create cells for the world
    var createCells = function (state) {
        var i = 0,
        len = state.width * state.height,
        cell;
        // set up cells with just index prop
        state.cells = [];
        while (i < len) {
            cell = {};
            cell.i = i;
            state.cells.push(cell);
            i += 1;
        }
        // call init methods for each initObj
        Object.keys(init).forEach(function (initObjKey) {
            callHook(state, initObjKey, 'before');
            i = 0;
            while (i < len) {
                callHook(state, initObjKey, 'forCell', state.cells[i]);
                i += 1;
            }
            callHook(state, initObjKey, 'after');
        });
    };
 
    // the public API
    return {
        CELL_VALUES: CELL_VALUES,
        // create a world state object
        create: function () {
            var state = {
                year: 0,
                lt: new Date(),
                yearRate: 1,
                cells: [],
                width: 10,
                height: 8
            };
            createCells(state);
            return state;
        },
 
        // load plug-in
        load: function (plug) {
            // just ref it in for now as long as that works
            if (plug.init) {
                init[plug.key] = plug.init;
            }
            if (plug.events) {
                Object.keys(plug.events).forEach(function (eventKey) {
                    events[eventKey] = plug.events[eventKey];
                });
            }
            if (plug.tick) {
                ticks[plug.key] = plug.tick;
            }
            console.log('plugin: ' + plug.key + ' loaded.');
            console.log(init);
            console.log(events);
            console.log(ticks);
        },
 
        // tick year, and update world state for new year
        update: function (state) {
            var now = new Date(),
            t = now - state.lt,
            years = 0,
            secs = t / 1000;
            if (secs >= state.yearRate) {
                years = secs / state.yearRate;
                state.year += years;
                state.lt = now;
                Object.keys(ticks).forEach(function (plugKey) {
                    var tick = ticks[plugKey];
                    if (tick.before) {
                        tick.before(state, events, years);
                    }
                    if (tick.forCell) {
                        state.cells.forEach(function (cell) {
                            tick.forCell(state, events, years, cell);
                        });
                    }
                    if (tick.after) {
                        tick.after(state, events, years);
                    }
                });
            }
        }
    }
}
    ());
```

## 3 - The draw module

```js
var draw = (function () {
 
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        worldCells: function (ctx, state) {
            var i = state.cells.length,
            x,
            y,
            r,
            g,
            b,
            per,
            cell;
            while (i--) {
                cell = state.cells[i];
                per = 1 - (cell.land.fert / 10);
                r = Math.floor(100 + 100 * per);
                g = Math.floor(75 + 75 * per);
                b = Math.floor(25 + 25 * per);
                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ',1)';
                x = cell.x * world.CELL_VALUES.size + world.CELL_VALUES.sx;
                y = cell.y * world.CELL_VALUES.size + world.CELL_VALUES.sy;
                ctx.fillRect(x, y, world.CELL_VALUES.size, world.CELL_VALUES.size);
            }
        }
 
    }
}
    ());
```

## 4 - First land_base plug-in

```js
world.load({
    key: 'land_base',
    // events to add
    events: {
        // name of event
        fertup: {
            // what to do right away for the event when it starts
            init: function (state, x, y) {
                var i = state.cells.length,
                d,
                per,
                cell;
                while (i--) {
                    cell = state.cells[i];
                    d = u.distance(cell.x, cell.y, x, y);
                    per = 0;
                    if (d <= 3) {
                        per = (3 - d) / 3;
                    }
                    cell.land.fert += Math.floor(10 * per);
                }
            }
        }
    },
    // what do do when
    init: {
        before: function (state, events) {
            console.log('land_base before hook');
        },
        forCell: function (state, events, cell) {
            console.log('land_base forCell hook');
            var land = cell.land = {};
            land.fert = 0;
        },
        after: function (state, events) {
            console.log('land_base after hook');
            // fertup events
            var i = 6;
            while (i--) {
                var x = Math.floor(state.width * Math.random()),
                y = Math.floor(state.height * Math.random());
                events.fertup.init(state, x, y);
            }
            // cap fert
            state.cells.forEach(function (cell) {
                if (cell.land.fert > 10) {
                    cell.land.fert = 10;
                }
            });
        }
    },
    // what to do for each tick
    tick: {
        before: function (state, events, years) {},
        forCell: function (state, events, years, cell) {
            if (cell.land.fert > 5) {
                cell.land.fert -= 1;
            }
        },
        after: function (state) {}
    }
});
```

## 5 - index.html and Main.js

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 640;
canvas.height = 480;
ctx.translate(0.5, 0.5);
 
var state = world.create();
 
var loop = function () {
    requestAnimationFrame(loop);
    world.update(state);
    draw.back(ctx, canvas);
    draw.worldCells(ctx, state);
 
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas example world sim core</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/world.js"></script>
        <script src="./plugins/land_base.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```