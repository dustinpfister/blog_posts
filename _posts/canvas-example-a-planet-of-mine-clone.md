---
title: A planet of mine canvas example clone
date: 2020-04-03 15:16:00
tags: [canvas]
categories: canvas
layout: post
id: 641
updated: 2020-04-13 10:23:02
version: 1.3
---

This week I wanted to aim for making at least one new [canvas examples](/2020/03/23/canvas-example/) post even if it is purely just for the sake of having some fun. I do not spend that much time playing games these days, but I do have a few installed on my phone and one that I have been playing around with a bit is called [a planet of mine](https://play.google.com/store/apps/details?id=com.tuesdayquest.myplanet&hl=en_US).

<!-- more -->


## 1 - The state machine for this clone of a planet of mine

For this canvas example I went with using a basic state machine design that I worked out in a previous post. I added a few changes though so this will not just be a copy and past type thing from that project.

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

## 2 - The world module

There will need to be a module that will contain all the logic that is needed to create, and update a state object for all the properties that have to do with a world.

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