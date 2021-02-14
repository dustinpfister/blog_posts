---
title: A planet of mine canvas example clone
date: 2020-04-03 15:16:00
tags: [canvas]
categories: canvas
layout: post
id: 641
updated: 2021-02-14 14:10:23
version: 1.32
---

This week I wanted to aim for making at least one new [canvas example](/2020/03/23/canvas-example/) post even if it is just another clone of something, or even just an attempt at a clone of something. I have this idea in my head that if I make enough of these I will end up with one or two that I will end up moving forward with into some kind of long term, interesting project that will be worth further investment of time. In the process of doing so I will likely end up with a whole bunch of canvas examples that will never progress beyond a simple prototype state of sorts.

I do not spend that much time playing games these days, but I do have a few installed on my phone and one that I have been playing around with a little is called [a planet of mine](https://play.google.com/store/apps/details?id=com.tuesdayquest.myplanet&hl=en_US) for android.

The game is a pretty cool concept you have a starting world and two starting workers that can be used to build structures on land tiles of the world. There are many resources that can be gathered, one of which is used to power a rocket ship that can be used to go to another world in a solar system. There is even more to it than that, but that is the basic idea of the game.

I liked the game so much that I though I would start to work on a clone of the game that is not all that different from it. I was not able to clone every aspect of the game, but I did get to a very basic working first prototype of the concept thus far. If I get around to it I might come back to this one at some point in the future as i keep making canvas examples like these in a effort to try to find something that I would not mind working on for a while longer.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/a-planet-of-mine-clone/0.1.0/pkg.js"></script>


## 1 - The state machine for this clone of a planet of mine

For this canvas example I went with using a basic state machine design that I worked out in a previous [post on canvas and state machines](/2020/01/28/canvas-example-state-machine/). I added a few changes though so this will not just be a copy and past type thing from that project. I do not always bother with adding a state machine asset of some kind with many of these canvas examples, but I have found that this one might need it if I continue working on this one to the point that it would be a done deal.

```js
var Machine = (function () {
 
    // TOOLS
 
    // find out if the given to sets of
    // box areas overlap or not
    var boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(
            (y1 + h1) < y2 ||
            y1 > (y2 + h2) ||
            (x1 + w1) < x2 ||
            x1 > (x2 + w2));
    };
 
    // standard distance formula
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
 
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
        bx = canvas.getBoundingClientRect();
        var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
        return {
            x: x,
            y: y,
            bx: bx
        };
    };
 
    // attach a canvas event
    var attachCanvasEvent = function (sm, DOMType, smType) {
        sm.canvas.addEventListener(DOMType, function (e) {
 
            var stateObj = sm.states[sm.currentState],
            pt = {}, // pointer API
            handler,
            mode;
            pt.pos = getCanvasRelative(e);
 
            pt.overlap = function (x, y, w, h) {
                return boundingBox(pt.pos.x, pt.pos.y, 1, 1, x, y, w, h);
            };
 
            pt.distance = function (x, y) {
                return distance(pt.pos.x, pt.pos.y, x, y);
            };
 
            // prevent default
            e.preventDefault();
            // call top level if there
            if (stateObj.userPointer) {
                handler = stateObj.userPointer[smType];
                if (handler) {
                    handler(pt, sm, e);
                }
            }
            // call for current mode if there
            if (stateObj.modes && sm.currentMode) {
                mode = stateObj.modes[sm.currentMode];
                if (mode.userPointer) {
                    handler = mode.userPointer[smType];
                    if (handler) {
                        handler(pt, sm, e);
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
 
    // create a new state machine
    var api = function (container, w, h) {
 
        // state machine Object
        var sm = {
            currentState: null,
            currentMode: null,
            game: {},
            solar: {}, // solar object
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
 
    // append tools so they can be used outside of the module if need be
    api.boundingBox = boundingBox;
    api.distance = distance;
 
    // return the public API
    return api;
 
}
    ());
```

Now that I have my state machine I can get to work with a main game state object for this project. I will want a module that is used for a world object, and then another that will be for the solar system that will be a collection of world objects and thus will be a top level object.

## 2 - The world module

There will need to be a module that will contain all the logic that is needed to create, and update a state object for all the properties that have to do with a world. A world will contain a number of land objects, each land object might have one ore more workers on it.

A land Object might have one of several items built on it. the choice of items have to do with extracting resources from the land tile, or producing some kine of renewable resource.

### 2.1 - The start of the world module and the item database

At the top of the module I have a crude item database in the form of an array literal. I am not completely sure how this might evolve as I continue to work on this example now and then, so for now each item just has a description, a max workers property, and some additional values that outline what the item does.

```js
var worldMod = (function () {
 
    var itemDataBase = [
        // item objects
        {
            i: 0,
            desc: 'ship',
            maxWorkers: 2
        }, {
            i: 1,
            desc: 'house',
            maxWorkers: 0
        }, {
            i: 2,
            desc: 'mine',
            maxWorkers: 3,
            getSolids: true
        }, {
            i: 3,
            desc: 'farm',
            maxWorkers: 1
        }, {
            i: 4,
            desc: 'well',
            maxWorkers: 1,
            getLiquids: true
        }, {
            i: 5,
            desc: 'trees',
            maxWorkers: 1
        }, {
            i: 6,
            desc: 'berries',
            maxWorkers: 1
        }
    ];
```

### 2.2 - Create land and worker objects

So I have helpers that are used to create a single worker object, and a single land object. The worker object thus far is just values that have to do with the size of the display object that repentants the worker. Beyond that it is more about where the worker is rather than its values, at least so far when it comes to this canvas example.

```js
    // create a worker object
    var createWorkerObject = function (parent) {
        return {
            actionsPerTick: 1,
            parent: parent,
            pos: { // position relative to canvas
                x: 0,
                y: 0,
                w: 32,
                h: 32
            }
        };
    }
 
    // create a land object
    var createLandObject = function (opt) {
        opt = opt || {};
        opt.pos = opt.pos || {};
        return {
            itemIndex: opt.itemIndex === undefined ? null : opt.itemIndex,
            workers: [],
            maxWorkers: 0,
            actionRate: 3, // worker actions per rotation
            pos: {
                x: opt.pos.x || 0,
                y: opt.pos.y || 0,
                w: opt.pos.w || 64,
                h: opt.pos.h || 128
            },
            groundType: opt.groundType || 'grass',
            solidCount: opt.solidCount || 0,
            liquidCount: opt.liquidCount || 0
        };
    };
```

### 2.3 - Set land item and create worker helpers

These are methods for setting land tile index, and creating a new worker that is to be pushed to the free workers array.

```js
    // set the item index for the given land
    var setLandItem = function (land, itemIndex) {
        var item = itemDataBase[itemIndex];
        land.itemIndex = itemIndex;
        land.maxWorkers = item.maxWorkers;
    };
 
    // create a new worker
    var createWorker = function (world) {
        var fw = world.freeWorkers,
        len = fw.workers.length;
        if (len < fw.maxWorkers) {
            var worker = createWorkerObject(fw);
            worker.pos.x = fw.pos.x + len * (32 + 1);
            worker.pos.y = fw.pos.y;
            fw.workers.push(worker);
        }
    };
```

### 2.4 - Position Workers

Position the workers of the given area so that they are stacked relative to the current position of the area.

```js
    var positionWorkers = function (area) {
        var dx = 0,
        dy = 1;
        if (area.groundType === 'freearea') {
            dx = 1;
            dy = 0;
        }
        area.workers.forEach(function (worker, i) {
            worker.pos.x = area.pos.x + (i * 32 * dx);
            worker.pos.y = area.pos.y + (i * 32 * dy);
        });
    };
```

### 2.5 - The create world land helper

This helper method is what is called to create the lands array of the world object.

```js
    var createWorldLand = function (world) {
        var len = world.landCount || 8,
        lands = [],
        i = 0;
        while (i < len) {
            lands.push(createLandObject({
                    pos: {
                        x: 32 + i * (64 + 2),
                        y: 120,
                        w: 64,
                        h: 96
                    },
                    solidCount: 10,
                    liquidCount: 10
                }));
            i += 1;
        }
        // start with a ship on land 0 with two workers
        setLandItem(lands[0], 0);
        setLandItem(lands[1], 2);
        setLandItem(lands[2], 2);
        createWorker(world);
        createWorker(world);
        createWorker(world);
        return lands;
    };
```

### 2.6 - The public API of the World module

So for the public API of the world module thus far I just have a create method.

```
    return {
        create: function (solar) {
            var world = {
                solar: solar,
                landCount: 4,
                lands: [],
                moveWorker: null,
                rotationRate: 1,
                rotationPer: 0,
                deltaEXP: 100,
                freeWorkers: {
                    pos: {
                        x: 32,
                        y: 32,
                        w: 100,
                        h: 50
                    },
                    groundType: 'freearea',
                    maxWorkers: 3,
                    workers: [],
                }
            };
 
            // move a worker
            world.moveWoker = function (worker, newArea) {
                var i = worker.parent.workers.length;
                while (i--) {
                    var w = worker.parent.workers[i];
                    if (w === worker) {
                        worker.parent.workers.splice(i, 1);
                        positionWorkers(worker.parent);
                        worker.parent = newArea;
                        newArea.workers.push(worker);
                        positionWorkers(newArea);
                        break;
                    }
                }
                return true;
            };
 
            // create worker
            world.createWorker = function () {
                createWorker(world);
            };
 
            world.lands = createWorldLand(world);
 
            // what to do for each tick
            world.onTickEnd = function (solar, ticks) {
                world.lands.forEach(function (land) {
                    var item = itemDataBase[land.itemIndex] || {},
                    workerCount = land.workers.length;
                    if (item.getSolids && workerCount >= 1) {
                        if (land.solidCount > 0) {
                            if (land.solidCount >= workerCount) {
                                land.solidCount -= workerCount;
                                solar.resources.solid += workerCount;
                            } else {
                                solar.resources.solid += land.solidCount;
                                land.solidCount = 0;
                            }
                        }
                    }
                });
            };
 
            // what to do on main solar tick progress
            world.onTickProgress = function (solar, ticks, tickProgress) {
                world.rotationPer = (ticks + tickProgress) % world.rotationRate / world.rotationRate;
                world.rotationPer = world.rotationPer >= 1 ? 1 : world.rotationPer;
                if (tickProgress >= 1) {
                    console.log('yes');
                    // add world deltaEXP to main solar.exp
                    solar.exp += world.deltaEXP;
                }
            };
 
            return world;
        }
    }
 
}
    ());
```

## 3 - The solar module

Although I did not get around to developing this part of the game, here is the current standing solar module. If I get around to it this module will eventually turn into everything tht has to do with a collection of world objects.

```js
var solarMod = (function () {
 
    return {
 
        create: function () {
 
            var solar = {
                lt: new Date(),
                tickRate: 10000,
                ticks: 0,
                t: 0,
                tPer: 0,
                currentWorldIndex: 0,
                currentWorld: {},
                exp: 0,
                resources: {
                    solid: 0,
                    liquid: 0,
                    wood: 0,
                    raspberries: 500
                }
            };
 
            solar.worlds = [];
            solar.worlds.push(worldMod.create(solar));
            solar.currentWorld = solar.worlds[solar.currentWorldIndex];
            return solar;
        },
 
        update: function (solar) {
 
            var now = new Date(),
            t = now - solar.lt;
            solar.t = t;
            solar.tPer = t / solar.tickRate;
            solar.tPer = solar.tPer > 1 ? 1 : solar.tPer;
 
            // make sure current world, is also currentWorld Index
            solar.currentWorld = solar.worlds[solar.currentWorldIndex];
 
            // for each world
            solar.worlds.forEach(function (world) {
                world.onTickProgress(solar, solar.ticks, solar.tPer);
                if (solar.tPer === 1) {
                    world.onTickEnd(solar, solar.ticks);
                }
            });
 
            // if tPer === 1
            if (solar.tPer === 1) {
                solar.ticks += 1;
                solar.lt = now;
            }
 
        }
 
    }
 
}
    ())
```

## 4 - The draw module

Now for the draw module that is used to draw the current state of the solar and current world object.

```js
var draw = {};
 
draw.back = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.tickProgress = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    world = solar.currentWorld;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width * solar.tPer, 10);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 10, canvas.width * world.rotationPer, 10);
 
};
 
draw.world = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    i = 0,
    world = solar.currentWorld,
    land;
    // draw freeWokers area
    var pos = world.freeWorkers.pos;
    ctx.fillStyle = 'grey';
    ctx.fillRect(pos.x, pos.y, pos.w, pos.h);
    // draw land
    while (i < world.lands.length) {
        land = world.lands[i];
        ctx.fillStyle = 'green';
        ctx.fillRect(land.pos.x, land.pos.y, land.pos.w, land.pos.h);
        i += 1;
    }
    world.lands.forEach(function (land) {
        land.workers.forEach(function (worker) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(worker.pos.x, worker.pos.y, worker.pos.w, worker.pos.h);
        });
    });
    // draw free workers
    world.freeWorkers.workers.forEach(function (worker) {
        ctx.fillStyle = 'red';
        ctx.fillRect(worker.pos.x, worker.pos.y, worker.pos.w, worker.pos.h);
    });
};
 
draw.solar = function (sm) {};
 
// debug info for solar object properties
draw.debugSolar = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    world = sm.currentWorld;
 
    var text = '';
    Object.keys(solar.resources).forEach(function (resourceName) {
        text += resourceName + ':' + solar.resources[resourceName] + '; ';
    });
 
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText(text, 5, 15);
    ctx.fillText('exp: ' + solar.exp, 5, 30);
};
 
// debug info for land
draw.debugLand = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    world = solar.currentWorld;
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    world.lands.forEach(function (land) {
        var pos = land.pos;
        ctx.fillText('workers: ' + land.workers.length + '/' + land.maxWorkers, pos.x, pos.y);
        ctx.fillText('solids: ' + land.solidCount, pos.x, pos.y + 10);
        ctx.fillText('liquids: ' + land.liquidCount, pos.x, pos.y + 20);
    });
};
```

## 5 - The game.js state file and index.html

So now for the state object for the main game state, and some HTML to pull this all together into a working canvas example.

```js
var sm = Machine('gamearea');
 
sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {
 
        sm.solar = solarMod.create();
 
    },
    tick: function (sm) {
 
        var ctx = sm.ctx;
 
        solarMod.update(sm.solar);
 
        // draw background, world, and more
        draw.back(sm);
        draw.world(sm);
        draw.tickProgress(sm);
        draw.debugLand(sm);
        draw.debugSolar(sm);
 
    },
    userPointer: {
        start: function (pt, sm, e) {
 
            var world = sm.solar.currentWorld;
 
            // free worker area
            var fw = world.freeWorkers;
            if (pt.overlap(fw.pos.x, fw.pos.y, fw.pos.w, fw.pos.h)) {
                var len = fw.workers.length;
                if (len > 0) {
                    // select free worker?
                    var i = len;
                    while (i--) {
                        var worker = fw.workers[i],
                        pos = worker.pos;
                        if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                            world.moveWorker = worker;
                            break;
                        }
                    }
                } else {
                    // create new worker?
                    //console.log('new worker?');
                    world.createWorker();
                }
            }
 
            // land worker?
            var li = world.lands.length;
            lands: while (li--) {
                var land = world.lands[li],
                wi = land.workers.length;
                while (wi--) {
                    var worker = land.workers[wi],
                    pos = worker.pos;
                    if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                        world.moveWorker = worker;
                        break lands;
                    }
                }
            }
 
        },
        move: function (pt, sm, e) {
            var world = sm.solar.currentWorld;
 
            if (world.moveWorker) {
                world.moveWorker.pos.x = pt.pos.x - 16;
                world.moveWorker.pos.y = pt.pos.y - 16;
            }
 
        },
        end: function (pt, sm, e) {
            var world = sm.solar.currentWorld;
 
            if (world.moveWorker) {
 
                world.moveWoker(world.moveWorker, world.moveWorker.parent);
 
                // over land with moveWorker?
                var i = world.lands.length;
                while (i--) {
                    var land = world.lands[i],
                    pos = land.pos;
                    if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                        if (land.workers.length + 1 > land.maxWorkers) {
                            break;
                        }
                        world.moveWoker(world.moveWorker, land);
                        break;
                    }
                }
 
                // over freeWorkers
                var pos = world.freeWorkers.pos;
                if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                    if (!(world.freeWorkers.length + 1 > world.freeWorkers.maxWorkers)) {
                        world.moveWoker(world.moveWorker, world.freeWorkers);
                    }
                }
 
            }
 
            world.moveWorker = null;
 
        }
    }
});
 
sm.start();
```

```html
<html>
    <head>
        <title>canvas example a planet of mine clone</title>
    </head>
    <body style="margin:0px;">
        <div id="gamearea"></div>
        <script src="lib/state-machine.js"></script>
        <script src="lib/world.js"></script>
        <script src="lib/solar.js"></script>
        <script src="lib/draw.js"></script>
        <script src="states/game.js"></script>
    </body>
</html>
```

## 6 - Conclusion

Although at the time of this writing I was able to get the basic idea of the game working there is still much more work that would need to be done in oder to make this more of a true clone of the game. This is also taking the time to do what comes to mind when it comes to making the game more distinct so that it is not just a rip off of the original.

So far I am not happy with how this canvas example came out, it would need a lot more work, and maybe even a top to bottom overhaul in order to get it back on track. I might get around to doing that at some point in the future, but there are so many other ideas for projects, and so many other great ideas that I would like to clone as a starting point.