---
title: Canvas example of a cross hairs game
date: 2020-07-29 15:44:00
tags: [canvas]
layout: post
categories: canvas
id: 689
updated: 2021-05-13 11:12:02
version: 1.41
---

<!-- edit bookmark -->

For this weeks [canvas example](/2020/03/23/canvas-example/) post I made a quick little cross hairs type game idea that just popped into my head one day. This is a game where I just use the mouse or touch events to move a cross hairs or [Reticle](https://en.wikipedia.org/wiki/Reticle) if you prefer around the canvas, and depending on where the cross hairs is located will result in panning movement around a map, or firing of the current weapon at some map cells. That is the basic idea at least, but I have added much more to it then just that at this point when it comes to choosing this example as something to continue working on at least a little each day, or at least fairly often.

At the time that I started this not much thought went into the other aspects of this that can help turn the game into something that is a little fun, interesting, or just simply addictive. I think that it might be fun to have a game where you just go around and shoot at stuff below me, and just rack up a whole lot of damage on what there is below in a top down perspective. So far that is more or less what this is, but it could still use a little something more that I have not yet hammered down thus far I think. Maybe put some things in the map that fire back for one thing, so that it is a kind of game where it is possible to, you know, loose. 

However another thought was to make this just some kind of idle game where there are no such enemies that fight back, I am just blowing stuff up, and it keeps growing back. I all ready have some code worked out that automates the process of playing that I have enabled by default that will kick in after a moment of inactivity, but at any time the player can just take over and start playing. This is a kind of feature that I find myself enjoying when it comes to where I am at when it comes to playing video games, I can not say that I am that interested in playing them any more, but I sure have not lost interest in making them. The act of making the game has become the game sort of speak. So I seem to like games that involve things like away production, and games that to one extent or another play themselves.

So in this post I will be wring about all of the source code for the game thus far, so this will likely be a pretty lengthy post as it is over 1500 lines of code thus far. There are all ready a few modules, and I keep expanding them, and writing more modules as I keep adding features.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-crosshairs/0.22.0/pkg.js"></script>


So if you are just interested in playing I will inject a package here that reflects the state of the canvas example at the time that I last updated this posts content. I would recommend against spending to much time playing it so far at this time as I have not implement any way to have a save state, but that is on the todo list of course. Auto Play is enabled by default so if you want to can just watch the game play itself for a bit.

To check out the latest state of the source code with this example there is of course the [corresponding folder in my canvas examples repository at github](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-game-crosshairs) for cross hairs.

## 1 - The utility module

For the canvas example just like with many of my other examples this one has a custom utility library. I end up using this kind of library as a dumping ground for methods that are being used, or might end up being used in two or more modules in the over all project. There always seems to be a need for this kind of utility library that can be described as a kind of application specific, custom tailored lodash of sorts. In other words it is a collection of utility methods that I am actually going to use in one or more of the modules that compose the over all project.

One such method that I have here is a distance formula method that will just give me the distance between two points. This is a usual suspect that I have in many of these utility modules, and is often used in a number of expressions where and when needed. I am using the method in my cross module that I will be getting to later in this post that has to do with the major part of the user interface.

```js
// UTILS
var utils = {};
// get distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// return a percent value from another percent value using Math.log
utils.logPer = function (per, high) {
    high = high === undefined ? 2 : high;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + high - 2) + per) / Math.log(high);
};
// deep clone an object
utils.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
```

The logPer method is something that I worked out when it comes to havening a way to turn a linear percentage value into a percentage value that does not go up in a linear kind of way. As of this writing I am just using this method in my game module when it comes to the AI selecting a weapon. In time I might use this method, or something like it when it comes to maybe the experience point system which is something that I am sure I will be getting around to improve at some point if I do keep working on this project.

So now that I have the basic utility library out of the way lets move on to the modules that built on top of this to make a game modules that is used to create and update the main state of the game.

## 2 - The experience point system

So for this canvas example I want to have an experience point system. I did not work out anything that original for this project at least not of this writing, in fact I just copied over what I [workout out in another post that has to do with, you guessed it, experience point systems](/2020/04/27/js-javascript-example-exp-system/).

The module provided two public methods, one that can be used to create a level object by giving and experience point value, and another that does the inversion of that by giving a level value.

```js
var XP = (function () {
    var DEFAULTS = {
        level: 1,
        xp: 0,
        cap: 30,
        deltaNext: 50
    };
    // set level with given xp
    var set = function (xp, deltaNext) {
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXPtoLevel = function (level, deltaNext) {
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse by xp
    var parseByXP = function (xp, cap, deltaNext) {
        xp = xp === undefined ? DEFAULTS.xp : xp;
        cap = cap === undefined ? DEFAULTS.cap : cap;
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
        var l = set(xp, deltaNext);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXPtoLevel(level + 1, deltaNext);
        forNext = l === cap ? Infinity : forNext;
        var toNext = l === cap ? Infinity : forNext - xp;
        var forLast = getXPtoLevel(level, deltaNext);
        return {
            level: level,
            levelFrac: l,
            cap: cap,
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast,
            valueOf: function () {
                return this.level;
            }
        };
    };
 
    // THE PUBIC API
    var api = {};
 
    // create a levelObj by passing a level value
    api.parseByLevel = function (l, cap, deltaNext) {
        l = l === undefined ? DEFAULTS.level : l;
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
        var xp = getXPtoLevel(l, deltaNext);
        return parseByXP(xp, cap, deltaNext);
    };
 
    // create a levelObj by passing an XP value
    api.parseByXP = parseByXP;
 
    // XP.applySkillPointes helpers and Public method
    var getSkillPointsPer = function (skillPoints) {
        var per = 1 - (1 / (skillPoints + 1));
        return utils.logPer(per, 2, 2.5);
    };
    api.applySkillPoints = function (levelObj, skillPoints, opt) {
        opt = opt || {};
        opt.SPEffectMax = opt.SPEffectMax === undefined ? 1000 : opt.SPEffectMax;
        opt.levelEffectMax = opt.levelEffectMax === undefined ? 250 : opt.levelEffectMax;
        opt.baseValue = opt.baseValue === undefined ? 0 : opt.baseValue;
 
        var level = levelObj.level,
        spPer = getSkillPointsPer(skillPoints),
        spValue = opt.SPEffectMax * spPer;
        levelValue = opt.levelEffectMax * utils.logPer((level / levelObj.cap), 2, 2),
        n = opt.baseValue + spValue + levelValue;
 
        return {
            levelObj: levelObj,
            opt: opt,
            levelValue: levelValue,
            spValue: spValue,
            baseValue: opt.baseValue,
            n: n,
            valueOf: function () {
                return this.n;
            }
        };
    };
 
    // return the public api to the XP global
    return api;
}
    ());
```

I might get around to changing things around with this kind of system at a later point as I keep working on this example, so I do not want to write about this to much here if I am just going to need to rewrite everything extensively later. However for now it is working okay as a place holder of sorts until I get around to investing more time into developing this experience point system, and many of the other components.

In any case this experience point system is used in both the main game.js module, as well as the map.js module, and it goes without saying that this system will probably be used in a few more modules here and there as I keep working on additional minor releases of this project.

## 3 - The cross.js file

In this section I will be going over the module that will be used to create and update a state object for a cross hairs state object that is used as a major component for the user interface aside from the buttons module, and state machine that I will be getting to later in this post. This main cross hairs state object contains a bunch of additional objects and properties that help with many points of interest in the canvas matrix. One such point of interest is the center point of the cross hairs area, which is now and will likely continue to be the center of the canvas element. Another is the actual cross hairs cursor position in the canvas, and yet another is an offset point that can be used as a way to navigate a map. The state of these points of interest are stored in the object that this module creates, and the module is also used as a way to update the state of this object.

The idea of this module is when the cross hairs point object is within an inner radius, the  cross hairs object is just used as a way to set the position of where a weapon is going to fire at what might be around that area. While the outer radius is used as a zone to define angle and rate of movement in terms of pixels per second when it comes to updating that offset value that I mentioned that can then in turn be used as a way to update the position of a map when it comes to how this is used outside of this module. 

So when the cross hairs object is in the zone between inner and outer radius value that will effect the offset point in the cross state object. When the cross hairs object is within the inner radius then the offset value is not effected, and a isInner public method can be used as a way to find out if this is the case or not, and in that case the state of the object can be used differently in the case of this project it is being used as a means to determine where to shoot, however that is a matter that I will be getting to in detail later in the post when I get to the game module.

So with that said the module contains a number of private helper methods, some of which I have made public. There are helper methods that will return true or false if the cross hairs object is in the fire area, or in the movement area. There is also a helper method that has to do with moving the offset object based on the current values of the cross hairs object and a given value that is the number of seconds sense the last frame tick update.

```js
var crossMod = (function () {
 
    var isInInner = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) < cross.radiusInner;
    };
 
    var isInOuter = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusInner;
    };
 
    var isOutOfBounds = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusOuter;
    };
 
    var moveOffset = function (cross, secs) {
        var ch = cross.crosshairs,
        center = cross.center,
        per = {
            min: 0.1,
            max: 1,
            current: 0.1
        },
        d = utils.distance(ch.x, ch.y, center.x, center.y) - cross.radiusInner;
        per.current = per.min + (per.max - per.min) * (d / cross.radiusDiff);
        cross.offset.x += Math.cos(ch.heading) * cross.offset.pps * per.current * secs;
        cross.offset.y += Math.sin(ch.heading) * cross.offset.pps * per.current * secs;
    };
 
    return {
        isInInner: isInInner,
        isInOuter: isInOuter,
        // create a new cross
        create: function (opt) {
            opt = opt || {};
            var cross = {
                userDown: false,
                moveBackEnabled: false,
                pps: opt.pps || 128,
                radiusInner: opt.radiusInner || (240 / 4),
                radiusOuter: opt.radiusOuter || (240 / 2.125),
                radiusDiff: 0,
                center: {
                    x: opt.cx || (320 / 2),
                    y: opt.cy || (240 / 2)
                },
                crosshairs: {
                    x: 320 / 2,
                    y: 240 / 2,
                    heading: 0,
                    radius: 16
                },
                offset: {
                    x: opt.offsetX || 0,
                    y: opt.offsetY || 0,
                    pps: 256
                }
            };
            cross.radiusDiff = cross.radiusOuter - cross.radiusInner;
            return cross;
        },
        // update the cross
        update: function (cross, secs) {
            secs = secs || 0;
            var ch = cross.crosshairs,
            center = cross.center;
            ch.heading = Math.atan2(center.y - ch.y, center.x - ch.x);
            // set bounds
            if (isOutOfBounds(cross)) {
                ch.x = center.x;
                ch.y = center.y;
                cross.userDown = false;
            }
            if (isInOuter(cross)) {
                // move back to innerRdaius if in outer area and userDown is false
                if (!cross.userDown && cross.moveBackEnabled) {
                    ch.x += Math.cos(ch.heading) * cross.pps * secs;
                    ch.y += Math.sin(ch.heading) * cross.pps * secs;
                }
                // apply changes to offset
                moveOffset(cross, secs);
            }
        },
        // user pointer action
        userAction: function (cross, eventType, pos) {
            var ch = cross.crosshairs;
            //e.preventDefault();
            if (eventType === 'start') {
                cross.userDown = true;
                ch.x = pos.x;
                ch.y = pos.y;
            }
            if (eventType === 'end') {
                cross.userDown = false;
            }
            if (eventType === 'move') {
                if (cross.userDown) {
                    ch.x = pos.x;
                    ch.y = pos.y;
                }
            }
        },
        // center a cross
        center: function (cross, cw, ch, cs, n) {
            cw = cw || 8;
            ch = ch || 8;
            cs = cs === undefined ? 32 : cs;
            n = n == undefined ? -1 : n;
            cross.offset.x = cw * cs / 2 * n;
            cross.offset.y = ch * cs / 2 * n;
        }
    };
}
    ());
```

I then have my public API of this module that contains methods for both creating and updating a cross state object. In addition I have my userAction method that is used as a way to control the mutation of the cross hairs position. As you can see this is where my get canvas relative method is coming into play for now. When I first started working on this project I did not have the main state machine that I have now, and I have not yet transitioned everything over to just working out things like that there yet.

## 4 - The map.js file

So now that I have my cross hairs module I am also going to want to have a map file that will be used to create a map of cell objects. I can then move around the map with the state of a cross object created with the cross hairs modules create method when working out the game module. I went with having the offset values in the cross object rather than the map object, so I will be using a public method in this map module to get at cells by passing a cross object along with the map and canvas relative position values.

```js
var mapMod = (function () {
 
    var cellTypes = [{
            i: 0,
            type: 'grass',
            HP: {
                min: 5,
                max: 10,
                base: 1.05
            },
            autoHeal: {
                rate: 0.5,
                amount: 1
            }
        }, {
            i: 1,
            type: 'tree',
            HP: {
                min: 20,
                max: 30,
                base: 1.08
            },
            autoHeal: {
                rate: 1,
                amount: 5
            }
        }, {
            i: 2,
            type: 'rock',
            HP: {
                min: 35,
                max: 50,
                base: 1.15
            },
            autoHeal: {
                rate: 3,
                amount: 50
            }
        }
    ];
 
    // set a cell as a given type index
    var setCellType = function (cell, typeIndex, opt) {
 
        var level = cell.levelObj.level,
        min,
        max;
        opt = opt || {};
        typeIndex = typeIndex === undefined ? Math.round(cell.damagePer * (cellTypes.length - 1)) : typeIndex;
        // set type and type index by way o given type index
        cell.type = cellTypes[typeIndex];
        cell.typeIndex = typeIndex;
        // active flag should typically be set to true
        cell.active = opt.active === undefined ? true : opt.active;
        // HP
        //cell.maxHP = cell.type.HP.min + Math.round((cell.type.HP.max - cell.type.HP.min) * Math.random());
        min = Math.pow(level, cell.type.HP.base) * cell.type.HP.min;
        max = Math.pow(level, cell.type.HP.base) * cell.type.HP.max;
        cell.maxHP = min + Math.round((max - min) * Math.random());
        cell.HP = opt.HP === undefined ? cell.maxHP : opt.HP;
        // autoHeal
        cell.autoHeal.rate = cell.type.autoHeal.rate;
        cell.autoHeal.amount = cell.type.autoHeal.amount;
    };
    var getHighestDamageCell = function (map) {
        return Math.max.apply(null, map.cells.map(function (cell) {
                return cell.damage;
            }));
    };
    // get cell method
    var get = function (map, x, y) {
        if (x < 0 || y < 0) {
            return undefined;
        }
        if (x >= map.cellWidth || y >= map.cellHeight) {
            return undefined;
        }
        return map.cells[y * map.cellWidth + x];
    };
    // auto heal a cell
    var autoHeal = function (cell, secs) {
        cell.autoHeal.secs += secs;
        if (cell.autoHeal.secs >= cell.autoHeal.rate) {
            cell.autoHeal.secs %= cell.autoHeal.rate;
            cell.HP += cell.autoHeal.amount;
            cell.HP = cell.HP > cell.maxHP ? cell.maxHP : cell.HP;
        }
    };
    // get border cells helper
    var getBorderCells = function (map, cell) {
        var i = 8,
        borderCell,
        cells = [],
        r,
        x,
        y;
        if (!cell) {
            return [];
        }
        while (i--) {
            r = Math.PI * 2 / 8 * i;
            x = Math.round(cell.x + Math.cos(r));
            y = Math.round(cell.y + Math.sin(r));
            borderCell = get(map, x, y);
            if (borderCell) {
                cells.push(borderCell);
            }
        }
        return cells;
    };
    // get the count of active border cells for the given cell and active status
    var getBorderCellsActiveCount = function (map, cell, active) {
        active === undefined ? true : active;
        var borderCells = getBorderCells(map, cell);
        return borderCells.reduce(function (acc, cell) {
            acc = typeof acc === 'object' ? Number(acc.active === active) : acc;
            return acc += Number(cell.active == active);
        });
    };
    // get all cells with an active state of true or false, and also filter farther with an
    // optional condition
    var getAllCellActiveState = function (map, active, condition) {
        active = active === undefined ? true : active;
        condition = condition === undefined ? function (cell) {
            return true;
        }
         : condition;
        return map.cells.filter(function (cell) {
            if (cell.active === active && condition(map, cell)) {
                return true;
            }
            return false;
        });
    };
    // condition for gen cells
    var condition_gen_cell = function (map, cell) {
        var borderCells = getBorderCells(map, cell);
        return getBorderCellsActiveCount(map, cell, true) >= 1;
    };
    // get all potential gen cells
    var getGenCells = function (map) {
        return getAllCellActiveState(map, false, condition_gen_cell);
    };
    var popRandomCell = function (cells) {
        var i = Math.floor(Math.random() * cells.length);
        return cells.splice(i, 1)[0];
    };
    // generate new cells by way of given secs amount
    var gen = function (map, secs) {
        var cells,
        cell,
        i;
        map.gen.secs += secs;
        if (map.gen.secs >= map.gen.rate) {
            map.gen.secs %= map.gen.rate;
            cells = getGenCells(map);
            i = map.gen.count;
            if (cells.length - i < 0) {
                i = cells.length;
            }
            if (i > 0) {
                // activate 1 to map.gen.count cells
                while (i--) {
                    cell = popRandomCell(cells);
                    setCellType(cell);
                }
            } else {
                // if no active cells
                cells = getAllCellActiveState(map, true);
                if (cells.length === 0) {
                    cell = map.cells[map.gen.startCells[Math.floor(Math.random() * map.gen.startCells.length)]];
                    setCellType(cell);
                }
            }
        }
    };
    // STARTING DAMAGE
    var blastArea = function (map, x, y, r, maxDamage) {
        var cx,
        cy = y - r,
        d,
        cell;
        while (cy < y + r) {
            cx = x - r;
            while (cx < x + r) {
                cell = get(map, cx, cy);
                d = utils.distance(cx, cy, x, y);
                if (cell && d <= r) {
                    cell.damage += (1 - d / r) * maxDamage;
                }
                cx += 1;
            }
            cy += 1;
        }
        api.update(map, 0);
    };
    var startBlasts = function (map, opt) {
        opt = opt || {};
        var rMin = opt.blastRMin || map.cellWidth / 4,
        rMax = opt.blastRMax || map.cellWidth / 2,
        r = rMin + Math.round((rMax - rMin) * Math.random()),
        blastCount = opt.blastCount === undefined ? 10 : opt.blastCount,
        maxDamage = opt.blastMaxDamage || 10,
        x,
        y,
        i = 0;
        while (i < blastCount) {
            x = Math.floor(map.cellWidth * Math.random());
            y = Math.floor(map.cellHeight * Math.random());
            blastArea(map, x, y, r, maxDamage);
            i += 1;
        }
    };
    // PUBLIC API
    var api = {
        get: get,
        getAllCellActiveState: getAllCellActiveState,
        create: function (opt) {
            opt = opt || {};
            // create map object
            var map = {
                cellSize: 32,
                cellWidth: opt.cellWidth || 8,
                cellHeight: opt.cellHeight || 8,
                cells: [],
                cellLevel: {
                    cap: opt.cellLevelCap || 10,
                    deltaNext: opt.cellDeltaNext || 200
                },
                percentRemain: 1,
                gen: { // global cell generate values
                    rate: opt.genRate || 0.2,
                    secs: 0,
                    count: opt.genCount || 6,
                    // start cells for 32 x 16
                    // startCells: [0, 31, 480, 511] // corner cells
                    // startCells: [239, 240, 271, 272]// center cells
                    // startCells: [239, 240, 271, 272]
                    // 8 * 8 start cells
                    // [27, 28, 35, 36, 0, 63, 56, 7]
                    startCells: opt.startCells || [0]
                },
                highDamageCell: 0
            };
            // setup cells for first time
            var i = 0,
            cell,
            x,
            y,
            len = map.cellWidth * map.cellHeight;
            while (i < len) {
                cell = {
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth),
                    HP: 50,
                    maxHP: 100,
                    active: false,
                    typeIndex: 0,
                    typeName: cellTypes[0].name,
                    type: cellTypes[0],
                    autoHeal: {
                        rate: 1,
                        amount: 5,
                        secs: 0
                    },
                    damage: opt.startingCellDamage || 0,
                    damagePer: 0, // damage relative to highest damaged cell
                    levelObj: XP.parseByXP(0, map.cellLevel.cap, map.cellLevel.deltaNext)
                };
                //setCellType(cell, 0);
                map.cells.push(cell);
                i += 1;
            }
            // call an update to make sure certain values like damage per are set
            api.update(map, 0);
 
            // start damage
            startBlasts(map, opt);
 
            // starting types
            i = 0;
            while (i < len) {
                cell = map.cells[i];
                setCellType(cell);
                i += 1;
            }
            return map;
        },
        clampOffset: function (map, offset) {
            offset.x = offset.x > 0 ? 0 : offset.x;
            offset.y = offset.y > 0 ? 0 : offset.y;
            offset.x = offset.x < map.cellWidth * map.cellSize * -1 ? map.cellWidth * map.cellSize * -1 : offset.x;
            offset.y = offset.y < map.cellHeight * map.cellSize * -1 ? map.cellHeight * map.cellSize * -1 : offset.y;
        },
        // get all cells from a given cell position, and radius from that position
        getAllFromPointAndRadius: function (map, x, y, r) {
            //??? just do it the stupid way for now
            var i = map.cells.length,
            d,
            cell,
            cells = [],
            dists = [];
            while (i--) {
                cell = map.cells[i];
                d = utils.distance(cell.x, cell.y, x, y);
                if (d <= r) {
                    cells.push(cell);
                    dists.push(d);
                }
            }
            return {
                cells: cells,
                dists: dists
            };
        },
        getWithCanvasPointAndOffset: function (map, canvasX, canvasY, offsetX, offsetY) {
            var x = canvasX - 160 + Math.abs(offsetX),
            y = canvasY - 120 + Math.abs(offsetY);
            return get(map, Math.floor(x / map.cellSize), Math.floor(y / map.cellSize));
        },
        update: function (map, secs) {
            var i,
            cell;
            map.highDamageCell = getHighestDamageCell(map);
            map.percentRemain = 0;
            // update cells
            i = map.cells.length;
            while (i--) {
                cell = map.cells[i];
                // if HP is bellow or equal to zero set cell inactive
                if (cell.HP <= 0) {
                    cell.active = false;
                }
                // if cell is active
                if (cell.active) {
                    // apply auto heal
                    autoHeal(cell, secs);
                    // update percentRemain
                    map.percentRemain += cell.HP / cell.maxHP;
                }
                // figure damage percent
                if (cell.damage != 0) {
                    cell.damagePer = cell.damage / map.highDamageCell;
                }
                // update level
                cell.levelObj = XP.parseByXP(cell.damage, map.cellLevel.cap, map.cellLevel.deltaNext);
 
            }
            // figure percentRemain by diving tabulated total by total cells
            map.percentRemain /= map.cells.length;
            gen(map, secs);
        }
    };
    return api;
}
    ());
```

## 5 - A pool.js module for creating an object pool to be used for shots amd any other future display object pools

I made a another post in which I touched base on [object pools](/2020/07/20/canvas-example-object-pool/). I decided to include such a module in this project that for starters will be used to create shot objects that will move from the side of the canvas to the target area where an attack was made on the map. In future versions of the canvas example display object pools could be used for all kinds of additional things where a display object would be called for such as explosions, enemies, and power ups.

The module for now just has three public methods, one to create an object pool, one to update an object pool, and another that will call the spawn method of a display object that is inactive if any is available.

```js
var poolMod = (function () {
 
    return {
 
        create: function (opt) {
            opt = opt || {};
            opt.count = opt.count || 10;
            var i = 0,
            pool = [];
            while (i < opt.count) {
                pool.push({
                    active: false,
                    x: 0,
                    y: 0,
                    radius: 8,
                    heading: 0,
                    pps: 32,
                    lifespan: opt.lifespan || 3,
                    data: {},
                    spawn: opt.spawn || function (obj, state) {
                        obj.active = true;
                    },
                    purge: opt.purge || function (obj, state) {},
                    update: opt.update || function (obj, state, secs) {
                        obj.x += obj.pps * secs;
                        obj.lifespan -= secs;
                    }
                });
                i += 1;
            }
            return pool;
        },
 
        spawn: function (pool, game, opt) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (!obj.active) {
                    obj.active = true;
                    obj.spawn.call(obj, obj, game, opt);
                    break;
                }
            }
        },
 
        update: function (pool, state, secs) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (obj.active) {
                    obj.update(obj, state, secs);
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        obj.purge.call(obj, obj, state);
                    }
                }
            }
        },
        // set all to inActive or active state
        setActiveStateForAll: function (pool, bool) {
            bool = bool === undefined ? false : bool;
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                obj.active = bool;
            }
        }
 
    }
 
}
    ());
```

As of this writing I am using the pool module to create a pool of display objects for shots that the player can fire by clicking in the inner circle area of the cross object. So I need a way to have a pool of objects that can be reused for the display objects that will represent these shots, and this is for starters what the pool.js module is for.


## 6 - Buttons

I have a module that helps me with creating button objects that I place in the canvas to preform certain actions. This way I can pull a lot of code that has to do with checking if a pointer position is over a button display object, or common button tasks like looping an index value for an option and so forth away from the main state machine and into its own module.

As of this writing I have just three button types, but in future releases I intend to add additional types that have to do with contorting settings of things like an upgrades menu and so forth.

```js
var buttonMod = (function () {
    // setup a button object depending on type
    var setupType = function (button, opt) {
        // setup for 'options' type
        if (button.type === 'options') {
            button.options = opt.options || [];
            button.currentOption = 0;
            button.label = button.options[0];
        }
        // setup a 'toggle' type
        if (button.type === 'toggle') {
            button.bool = opt.bool || false;
            button.onActive = opt.onActive || function () {};
            button.onInactive = opt.onInactive || function () {};
        }
        // setup a 'upgrade' type
        if (button.type === 'upgrade') {
            button.onUpgrade = opt.onUpgrade || function () {};
            button.onDowngrade = opt.onDowngrade || function () {};
        }
    };
    // what to do before a button click for each type
    var beforeOnClick = {
        basic: function () {},
        options: function (button, api, point) {
            button.currentOption += 1;
            button.currentOption = button.currentOption >= button.options.length ? 0 : button.currentOption;
        },
        toggle: function (button, api, point) {
            button.bool = !button.bool;
        },
        upgrade: function (button, api, point) {
            if (point.y < button.y) {
                button.onUpgrade(button, api, point);
            }
            if (point.y > button.y) {
                button.onDowngrade(button, api, point);
            }
        }
    };
    // what to do after a click for each type
    var afterOnClick = {
        basic: function () {},
        options: function () {},
        toggle: function (button, api, point) {
            if (button.bool) {
                button.onActive(button, api, point);
            } else {
                button.onInactive(button, api, point);
            }
        },
        upgrade: function () {}
    };
 
    // the Public API
 
    var api = {};
 
    // create a new Button
    api.create = function (opt) {
            opt = opt || {};
            var button = {
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                r: opt.r === undefined ? 16 : opt.r,
                label: opt.label || '',
                info: opt.info || '',
                type: opt.type || 'basic',
                data: opt.data || {},
                frame: {
                    state: 'in',
                    current: 0,
                    max: opt.maxFrame || 30,
                    FPS: 24
                },
                onClick: opt.onClick || function () {},
                onFrame: opt.onFrame || function () {},
                onOutStart: opt.onOutStart || function () {},
                onOutEnd: opt.onOutEnd || function () {},
                onInStart: opt.onInStart || function () {},
                onInEnd: opt.onInEnd || function () {}
            };
            setupType(button, opt);
            return button;
    };
 
    // check the given button collection
    api.pointerCheckCollection = function (collection, point, gameAPI) {
            var keys = Object.keys(collection),
            i = keys.length,
            button,
            d;
            while (i--) {
                button = collection[keys[i]];
                d = utils.distance(point.x, point.y, button.x, button.y);
                if (d < button.r) {
                    beforeOnClick[button.type](button, gameAPI, point);
                    button.onClick(button, gameAPI, point);
                    afterOnClick[button.type](button, gameAPI, point);
                    button.frame.state = 'out';
                    button.frame.current = button.frame.max;
                }
            }
    };
 
    // update a single button
    api.update = function(button, secs, gameAPI){
        var fr = button.frame;
        // if button state is 'in'
        if(fr.state === 'in'){
            if(fr.current === 0){
                button.onInStart(button, gameAPI);
            }
            fr.current += fr.FPS * secs;
            fr.current = fr.current > fr.max ? fr.max: fr.current;
            button.onFrame(button, gameAPI, fr);
            if(fr.current === fr.max){
                fr.state = 'rest';
                button.onInEnd(button, gameAPI);
            }
        }
        // if button state is 'in'
        if(fr.state === 'out'){
            if(fr.current === fr.max){
                button.onOutStart(button, gameAPI);
            }
            fr.current -= fr.FPS * secs;
            fr.current = fr.current < 0 ? 0: fr.current;
            button.onFrame(button, gameAPI, fr);
            if(fr.current === 0){
                fr.state = 'rest';
                button.onOutEnd(button, gameAPI);
            }
            
        }
    };
 
    // update a button collection
    api.updateCollection = function(collection, secs, gameAPI){
 
        var keys = Object.keys(collection),
        i = keys.length;
        while (i--) {
            api.update(collection[keys[i]], secs, gameAPI);
        }
 
    };
 
    return api;
 
}
    ());
```

## 7 - The game.js file for creating a main game state object

So I ending up working out a main game module that will serve as a way to create and set up a main game state module for this canvas example. This module will create a main game state object that will contain an instance of the cross module object, along with a map object, and at least a single object pool for shot objects. This module will also attach a whole bunch of event handers for the canvas element.

```js
var gameMod = (function () {
 
    // public API object to be returned to gameMod
    var api = {};
 
    // hard coded settings
    var hardSet = {
        // max seconds for sec value used in updates
        maxSecs: 0.25,
        // deltaNext and levelCap for main game.levelObj
        deltaNext: 5000,
        levelCap: 1000,
        // save string
        saveStringVer: 'v1'
    };
 
    // WEAPONS
    var WeaponsDefaults = [{
            name: 'Blaster',
            locked: false,
            unLockAt: 0,
            pps: 256,
            shotRate: 0.125,
            blastRadius: 1,
            maxDPS: 10,
            accuracy: 0.75,
            hitRadius: 64,
            gunCount: 1,
            manaCost: 1,
            level: {
                maxDPS: {
                    SPEffectMax: 50,
                    levelEffectMax: 40,
                    baseValue: 10
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 2
                }
            }
        }, {
            name: 'Assault Blaster',
            locked: true,
            unLockAt: 5,
            pps: 512,
            shotRate: 0.125,
            blastRadius: 2,
            maxDPS: 5,
            accuracy: 0.5,
            hitRadius: 64,
            gunCount: 4,
            manaCost: 5,
            level: {
                maxDPS: {
                    SPEffectMax: 70,
                    levelEffectMax: 25,
                    baseValue: 5
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 5
                }
            }
        }, {
            name: 'Cannon',
            locked: true,
            unLockAt: 15,
            pps: 256,
            shotRate: 0.5,
            blastRadius: 3,
            maxDPS: 20,
            accuracy: 0.25,
            hitRadius: 32,
            gunCount: 2,
            manaCost: 10,
            level: {
                maxDPS: {
                    SPEffectMax: 300,
                    levelEffectMax: 180,
                    baseValue: 20
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 10
                }
            }
        }, {
            name: 'Atom',
            locked: true,
            unLockAt: 50,
            pps: 128,
            shotRate: 1,
            blastRadius: 10,
            maxDPS: 75,
            accuracy: 0,
            hitRadius: 64,
            gunCount: 1,
            manaCost: 35,
            level: {
                maxDPS: {
                    SPEffectMax: 500,
                    levelEffectMax: 450,
                    baseValue: 50
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 35
                },
                accuracy: {
                    SPEffectMax: 0.75,
                    levelEffectMax: 0.25,
                    baseValue: 0
                }
            }
        }
    ];
 
    // SKILL POINTS
    var setWeaponsToLevel = function (game) {
        var level = game.levelObj.level;
        game.weapons.forEach(function (weapon, i) {
            var lv = weapon.level,
            sp = game.skills['weapon_' + i].points;
            // use The applySkillPoints method in XP
            Object.keys(weapon.level).forEach(function (weaponStatName) {
                weapon[weaponStatName] = XP.applySkillPoints(game.levelObj, sp, weapon.level[weaponStatName]);
            });
            weapon.locked = true;
            // set lock property of weapon
            if (level >= weapon.unLockAt) {
                weapon.locked = false;
            }
        });
    };
 
    // SHOT Object Options
    var shotOptions = {
        count: 20,
        // when a shot becomes active
        spawn: function (shot, game, radian) {
            var offset = game.cross.offset,
            w = game.weapons[game.weaponIndex],
            ch = game.cross.crosshairs,
            center = game.cross.center,
            offset = game.cross.offset,
            r = Math.random() * (Math.PI * 2),
            d = w.hitRadius * (1 - w.accuracy) * Math.random(),
            x = Math.abs(offset.x) + ch.x + Math.cos(r) * d - center.x,
            y = Math.abs(offset.y) + ch.y + Math.sin(r) * d - center.y;
 
            shot.x = x + Math.cos(radian) * game.canvas.width;
            shot.y = y + Math.sin(radian) * game.canvas.width;
            shot.heading = Math.atan2(y - shot.y, x - shot.x);
            d = utils.distance(shot.x, shot.y, x, y);
            shot.pps = w.pps;
            shot.lifespan = d / shot.pps;
        },
        // when a shot becomes inactive
        purge: function (shot, game) {
            poolMod.spawn(game.explosions, game, shot);
        },
        // update method for a shot
        update: function (shot, game, secs) {
            shot.x += Math.cos(shot.heading) * shot.pps * secs;
            shot.y += Math.sin(shot.heading) * shot.pps * secs;
            shot.lifespan -= secs;
        }
    };
 
    // Explosion Options
    var explosionOptions = {
        count: 20,
        spawn: function (ex, game, shot) {
            var w = game.weapons[game.weaponIndex];
            ex.x = shot.x;
            ex.y = shot.y;
            ex.data.radiusEnd = game.map.cellSize * w.blastRadius;
            ex.data.explosionTime = 0.6;
            ex.data.maxDPS = w.maxDPS; ;
            ex.lifespan = ex.data.explosionTime;
            ex.per = 0;
        },
 
        purge: function (ex, game) {},
 
        update: function (ex, game, secs) {
            ex.per = (ex.data.explosionTime - ex.lifespan) / ex.data.explosionTime;
            ex.radius = ex.data.radiusEnd * ex.per;
            cellPos = {
                x: Math.floor(ex.x / game.map.cellSize),
                y: Math.floor(ex.y / game.map.cellSize)
            },
            blastRadius = Math.ceil((ex.radius + 0.01) / game.map.cellSize);
            var targets = mapMod.getAllFromPointAndRadius(game.map, cellPos.x, cellPos.y, blastRadius);
            targets.cells.forEach(function (cell, i) {
                // apply damage
                var damage = ex.data.maxDPS * (1 - (targets.dists[i] / blastRadius)) * secs;
                if (cell) {
                    if (cell.active) {
                        game.totalDamage += damage;
                        cell.HP -= damage;
                        cell.HP = cell.HP < 0 ? 0 : cell.HP;
                    }
                    cell.damage += damage;
                }
            });
            ex.lifespan -= secs;
        }
    };
 
    // shoot the current weapon
    var shoot = function (game) {
        var w = game.weapons[game.weaponIndex];
        // check shot rate and mana
        if (game.shotSecs >= game.shotRate && game.mana.current >= w.manaCost) {
            var i = 0,
            radian;
            while (i < w.gunCount) {
                radian = Math.PI * 2 / 4 * i + Math.PI / 4;
                poolMod.spawn(game.shots, game, radian);
                i += 1;
            }
            game.shotSecs = 0;
            // deduct mana
            game.mana.current -= w.manaCost;
        }
    };
 
    // AUTOPLAY
    var autoPlay = {
        setRandomTarget: function (game) {
            var ch = game.cross.crosshairs,
            os = game.cross.offset,
            ap = game.autoPlay,
            map = game.map,
            activeCells = mapMod.getAllCellActiveState(map, true),
            x = Math.floor(map.cellWidth * Math.random()),
            y = Math.floor(map.cellHeight * Math.random()),
            cell;
            if (activeCells.length >= 1) {
                cell = activeCells[Math.floor(activeCells.length * Math.random())];
                //cell = map.cells[map.cells.length - 1];
                x = cell.x;
                y = cell.y;
            }
            ap.target.x = (map.cellSize / 2 + (map.cellSize * x)) * -1;
            ap.target.y = (map.cellSize / 2 + (map.cellSize * y)) * -1;
        },
 
        setByPercentRemain: function (game) {
            var map = game.map,
            ap = game.autoPlay;
 
            // hard coded default for weapon index
            game.weaponIndex = game.highWeaponIndex;
 
            // stay on move mode if
            if (map.percentRemain < ap.stopAtPercentRemain) {
                ap.mode = 'move';
            }
        },
 
        modes: {
 
            // AI Move mode
            move: function (game, secs) {
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map,
                a = Math.atan2(os.y - ap.target.y, os.x - ap.target.x),
                cross = game.cross,
                d = utils.distance(os.x, os.y, ap.target.x, ap.target.y),
                delta = game.cross.radiusOuter - 1;
                maxDelta = cross.radiusInner + cross.radiusDiff - 1,
                minDelta = cross.radiusInner + 5,
                slowDownDist = map.cellSize * 4,
                minDist = map.cellSize / 2,
                per = 0;
                if (d < slowDownDist) {
                    per = 1 - d / slowDownDist;
                }
                ap.target.d = d;
                delta = maxDelta - (maxDelta - minDelta) * per;
                if (d < minDist) {
                    // set right to target
                    os.x = ap.target.x;
                    os.y = ap.target.y;
                    // done
                    ap.shootTime = ap.maxShootTime;
                    autoPlay.setRandomTarget(game);
                    ap.mode = 'shoot';
                } else {
                    ch.x = game.cross.center.x + Math.cos(a) * delta;
                    ch.y = game.cross.center.y + Math.sin(a) * delta;
                }
            },
 
            shoot: function (game, secs) {
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map;
                ch.x = game.cross.center.x;
                ch.y = game.cross.center.y;
                shoot(game);
                ap.shootTime -= secs;
                if (ap.shootTime <= 0) {
                    ap.mode = 'move';
                    autoPlay.setRandomTarget(game);
                }
            }
        },
 
        update: function (game, secs) {
            // if autoplay
            if (game.autoPlay.enabled) {
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map;
                game.autoPlay.delay -= secs;
                if (game.userDown) {
                    game.autoPlay.delay = game.autoPlay.maxDelay;
                }
                game.autoPlay.delay = game.autoPlay.delay < 0 ? 0 : game.autoPlay.delay;
                if (game.autoPlay.delay === 0) {
                    // disable cross move back
                    game.cross.moveBackEnabled = false;
                    // set by percent remain?
                    autoPlay.setByPercentRemain(game);
                    // apply current mode
                    autoPlay.modes[ap.mode](game, secs);
                }
            }
        }
    };
 
    // setup the map object for a game object based on current mapLevelObj settings,
    // and change the settings if needed
    var mapSizes = ['8x6', '16x8', '16x16', '32x16'].map(function (str) {
        var a = str.split('x');
        return {
            w: a[0],
            h: a[1]
        };
    });
    var setMap = function (game, xp, deltaNext, levelCap, startingCellDamage) {
        levelCap = levelCap || 50;
        if (xp >= 0 || deltaNext) {
            game.mapLevelObj = XP.parseByXP(xp, levelCap, deltaNext);
        }
        // create the map
        var mapL = game.mapLevelObj,
        capPer = mapL.level / levelCap;
        var size = mapSizes[Math.floor(capPer * (mapSizes.length - 1))];
        game.map = mapMod.create({
                cellWidth: size.w,
                cellHeight: size.h,
                cellLevelCap: 5 + Math.floor(capPer * 95),
                cellDeltaNext: 1000 - Math.round(capPer * 750),
                genRate: 10 - 9.5 * capPer,
                genCount: 1 + Math.floor(6 * capPer),
                blastRMin: 2,
                blastRMax: 2 + Math.floor(size.w / 6 * capPer),
                blastCount: 3 + Math.round(17 * capPer),
                blastMaxDamage: 10 + 1000 * capPer,
                startCells: [0],
                startingCellDamage: startingCellDamage
            });
        // make sure autoPlay has a new target
        autoPlay.setRandomTarget(game);
        // center cross hairs
        crossMod.center(game.cross, game.map.cellWidth, game.map.cellHeight);
        // set all shots and explosions to inactive state
        poolMod.setActiveStateForAll(game.shots, false);
        poolMod.setActiveStateForAll(game.explosions, false);
    };
 
    var setManaToLevel = function (game) {
        var level = game.levelObj.level,
        mLv = game.mana.level;
        // MPS
        game.mana.mps = mLv.mpsStart + mLv.mpsPerLevel * level;
        // MAX mana
        game.mana.max = mLv.maxStart + mLv.maxPerLevel * level;
    };
 
    // reset skills helper
    var resetSkills = function (game) {
        Object.keys(game.skills).forEach(function (skillKey) {
            var skill = game.skills[skillKey];
            skill.points = 0;
        });
        game.skillPoints.free = game.skillPoints.total;
        setWeaponsToLevel(game);
    };
    // set free skill points value from total of skills
    var setFreeFromSkills = function (game) {
        var total = 0;
        Object.keys(game.skills).forEach(function (skillKey) {
            var skill = game.skills[skillKey];
            total += skill.points;
        });
        game.skillPoints.free = game.skillPoints.total - total;
    };
    // set total skill points base on game.levelObj
    var setSkillPointTotal = function (game) {
        game.skillPoints.total = (game.levelObj.level - 1) * 5;
        setFreeFromSkills(game);
    };
 
    // SAVE STATES
 
    // create a save string from a game object
    var saveStringVersions = {
        v0: ['damage'],
        v1: ['damage', 'mapIndex', 'skillPoints']
    };
    var saveStringParts = {
        damage: {
            encode: function (game) {
                var damage = Math.floor(Number(game.totalDamage));
                return damage.toString(36);
            },
            apply: function (game, partString) {
                var damage = parseInt(partString, 36);
                if (damage > 0) {
                    game.totalDamage = damage;
                    console.log('applying damage: ' + game.totalDamage);
                }
            }
        },
        mapIndex: {
            encode: function (game) {
                return Number(game.mapLevelObj.level).toString(36);
            },
            apply: function (game, partString) {
                // set up map level from saveString part which should be a base36 level number
                var level = parseInt(partString, 36);
                if (level >= 1) {
                    game.mapXP = XP.parseByLevel(level, game.mapLevelCap, game.mapDeltaNext).xp;
                    setMap(game, game.mapXP, game.mapDeltaNext, game.mapLevelCap, game.startingCellDamage);
                    console.log('applying map level: ' + level);
                }
            }
        },
        skillPoints: {
            encode: function (game) {
                var str = '';
                // skill points
                Object.keys(game.skills).forEach(function (skillKey) {
                    str += game.skills[skillKey].points.toString(36) + '-';
                });
                return str;
            },
            apply: function (game, partString) {
                resetSkills(game);
                if (partString) {
                    var match = partString.match(/\w+/g);
                    if (match) {
                        console.log('applying skill point string:');
                        console.log(partString);
                        match.forEach(function (sp, i) {
                            game.skills['weapon_' + i].points = Number(parseInt(sp, 36));
                        });
                    }
                }
                setFreeFromSkills(game);
            }
        },
    };
    api.createSaveString = function (game, ver) {
        ver = ver || hardSet.saveStringVer;
        var str = '';
        saveStringVersions[ver].forEach(function (partKey) {
            str += saveStringParts[partKey].encode(game) + '.';
        });
        return ver + '.' + str;
    };
    // apply a save string to the given game object
    api.applySaveString = function (game, saveStr) {
        var parts = saveStr.split('.').map(function (part) {
                return part.replace(/\;/, '');
            });
        var ver = parts[0];
        saveStringVersions[ver].forEach(function (partKey, i) {
            saveStringParts[partKey].apply(game, parts[1 + i])
        });
    };
 
    api.WeaponsDefaults = WeaponsDefaults;
 
    api.setMap = setMap;
 
    // create a new game state object
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            levelObj: {}, // main level object for the player
            mapLevelObj: {}, // level object for the map
            mapXP: opt.mapXP === undefined ? 0 : opt.mapXP,
            mapDeltaNext: opt.mapDeltaNext || 50,
            mapLevelCap: opt.mapLevelCap || 50,
            startingCellDamage: opt.startingCellDamage || 0,
            map: {},
            canvas: opt.canvas,
            skillPoints: {
                total: 100,
                free: 50
            },
            skills: {
                weapon_0: {
                    points: 0
                },
                weapon_1: {
                    points: 0
                },
                weapon_2: {
                    points: 0
                },
                weapon_3: {
                    points: 0
                }
            },
            mana: {
                current: 50,
                max: 100,
                mps: 10,
                level: {
                    mpsStart: 9,
                    mpsPerLevel: 1,
                    maxStart: 90,
                    maxPerLevel: 10
                }
            },
            cross: {},
            shots: poolMod.create(shotOptions),
            explosions: poolMod.create(explosionOptions),
            shotRate: 1,
            shotSecs: 0,
            weaponIndex: 0, // the current weapon index
            highWeaponIndex: 0, // highest unlocked weapon index
            totalDamage: opt.totalDamage || 0,
            userDown: false,
            autoPlay: {
                enabled: true,
                behavior: 'total-kill',
                stopAtPercentRemain: 0,
                delay: 5,
                maxDelay: 5,
                mode: 'move',
                shootTime: 5,
                maxShootTime: 5,
                target: {
                    x: -16,
                    y: -16,
                    d: 0
                }
            }
        };
        // clone hard coded weapons defaults to game.weapons
        game.weapons = utils.deepClone(WeaponsDefaults);
        // setup game level object
        game.levelObj = XP.parseByXP(game.totalDamage, hardSet.levelCap, hardSet.deltaNext);
        // create cross object
        game.cross = crossMod.create();
        // set up map
        setMap(game, game.mapXP, game.mapDeltaNext, game.mapLevelCap, game.startingCellDamage);
        // set weapons to level for first time
        setWeaponsToLevel(game);
        // reset skills for now
        resetSkills(game);
        setSkillPointTotal(game);
        // save string
        if (opt.saveString) {
            api.applySaveString(game, opt.saveString);
        }
        // first autoPlay target
        autoPlay.setRandomTarget(game);
 
        return game;
    };
 
    // update a game state object
    api.update = function (game, secs) {
        // do not let secs go over hard coded max secs value
        secs = secs > hardSet.maxSecs ? hardSet.maxSecs : secs;
        // set shot rate based on current weapon
        game.shotRate = game.weapons[game.weaponIndex].shotRate;
        // cross object
        crossMod.update(game.cross, secs);
        // map
        mapMod.clampOffset(game.map, game.cross.offset);
        mapMod.update(game.map, secs);
        // update pools
        poolMod.update(game.shots, game, secs);
        poolMod.update(game.explosions, game, secs);
        // shoot
        game.shotSecs += secs;
        game.shotSecs = game.shotSecs >= game.shotRate ? game.shotRate : game.shotSecs;
        if (crossMod.isInInner(game.cross) && game.cross.userDown) {
            shoot(game);
        }
        // AutoPlay
        autoPlay.update(game, secs);
        // update level object
        game.levelObj = XP.parseByXP(game.totalDamage, hardSet.levelCap, hardSet.deltaNext);
 
        // apply game.level to weapons
        setWeaponsToLevel(game);
        // Mana
        setManaToLevel(game);
        game.mana.current += game.mana.mps * secs;
        game.mana.current = game.mana.current > game.mana.max ? game.mana.max : game.mana.current;
        // skill points
        setSkillPointTotal(game);
 
        // find high weapon index
        var wi = game.weapons.length,
        w;
        while (wi--) {
            w = game.weapons[wi];
            if (!w.locked) {
                game.highWeaponIndex = wi;
                break;
            }
        }
 
    };
 
    // CREATE SKILL BUTTONS to be used in the skill manager state
    // update button display helper
    var updateButtonDisplay = function (sm, button) {
        var sp = sm.game.skills['weapon_' + button.data.weaponIndex].points,
        w = button.data.weapon;
        button.info = sp + ' ' + Math.floor(w.maxDPS);
    };
    // set a skills sp value
    var setSkill = function (sm, skillKey, spValue) {
        var skill = sm.game.skills[skillKey],
        skillPoints = sm.game.skillPoints,
        delta = spValue - skill.points;
        if (skillPoints.free - delta >= 0 && skill.points + delta >= 0) {
            skillPoints.free -= delta;
            skill.points += delta;
        }
    };
    // public createSkillButton method
    api.createSkillButtons = function (sm) {
        // start with a buttons object
        var buttons = {
            toOptions: buttonMod.create({
                label: 'Options',
                x: 25,
                y: 200,
                r: 10,
                onClick: function (button, sm) {
                    // set state to options
                    sm.currentState = 'options';
                }
            }),
            resetSkills: buttonMod.create({
                label: 'Reset',
                x: 75,
                y: 200,
                r: 10,
                onClick: function (button, sm) {
                    // set state to options
                    //sm.currentState = 'options';
                    resetSkills(sm.game);
 
                    sm.game.weapons.forEach(function (weapon, weaponIndex) {
                        var button = buttons['weapon_' + weaponIndex];
                        updateButtonDisplay(sm, button);
                    });
                }
            })
        };
 
        // have a button for each weapon
        sm.game.weapons.forEach(function (weapon, weaponIndex) {
            var button = buttonMod.create({
                    label: weapon.name,
                    type: 'upgrade',
                    x: 50 + 60 * weaponIndex,
                    y: 120,
                    r: 25,
                    data: {
                        weaponIndex: weaponIndex,
                        weapon: weapon
                    },
                    onUpgrade: function (button, sm) {
                        var wi = button.data.weaponIndex,
                        skillKey = 'weapon_' + wi,
                        skill = sm.game.skills[skillKey];
                        setSkill(sm, skillKey, skill.points + 1);
                    },
                    onDowngrade: function (button, sm) {
                        var wi = button.data.weaponIndex,
                        skillKey = 'weapon_' + wi,
                        skill = sm.game.skills[skillKey];
                        setSkill(sm, skillKey, skill.points - 1);
                    },
                    onClick: function (button, sm) {
                        updateButtonDisplay(sm, button);
                    }
                });
            // set button to its index
            buttons['weapon_' + weaponIndex] = button;
            // update button display for first time
            updateButtonDisplay(sm, button);
 
        });
        return buttons;
    };
 
    return api;
 
}
    ());
```

## 8 - generate sprite sheets

I wanted to at east start some kind of system that will be used to create sprite sheets. For now I just work out this genSheets module that creates sheets just for map cells. I am not happy with it thus far, and will get around to making a lot of changes here at a point in the future so I do not want to write to much about it.

```js
var genSheets = (function () {
 
    var createSheet = function (cellSize, cw, ch) {
        var sheet = {},
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = cellSize * cw;
        canvas.height = cellSize * ch;
        ctx.translate(0.5, 0.5);
        sheet.canvas = canvas;
        sheet.ctx = ctx;
        sheet.cellWidth = cw;
        sheet.cellHeight = ch;
        sheet.cellSize = cellSize;
        return sheet;
    };
 
    var drawBasicBox = function (sheet, fill, stroke) {
        var canvas = sheet.canvas,
        ctx = sheet.ctx;
        ctx.fillStyle = fill || '#008800';
        ctx.fillRect(-1, -1, canvas.width + 1, canvas.height + 1);
        ctx.strokeStyle = stroke || 'lime';
        var i = 0,
        s;
        while (i < sheet.cellWidth) {
            ctx.save();
            ctx.translate(16 + 32 * i, 16);
            s = 28 - 14 * (i / sheet.cellWidth);
            ctx.beginPath();
            ctx.rect(-14, -14, s, s);
            ctx.stroke();
            ctx.restore();
            i += 1;
        }
    };
 
    var sheets = [];
 
    ['#005500', '#000088', '#880000'].forEach(function (fill) {
        var sheet = createSheet(32, 10, 1),
        canvas = sheet.canvas,
        ctx = sheet.ctx;
        drawBasicBox(sheet, fill, '#000000');
        sheets.push(sheet);
    });
 
    return {
        sheets: sheets
    };
 
}
    ());
```

## 9 - The draw.js file

So now that I have mt modules for creating state objects, I will now want a module with methods that are used to draw aspects of these state objects to a canvas element.

```js
var draw = (function () {
 
    var hpColors = ['red', 'orange', 'lime'];
 
    var getHpColor = function (per) {
        return hpColors[Math.floor((hpColors.length - 0.01) * per)];
    };
 
    var drawBar = function (ctx, game, per, rStart, rLength, fill) {
        var cross = game.cross,
        center = cross.center;
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.arc(center.x, center.y, cross.radiusInner + 5, rStart, rStart + rLength);
        ctx.stroke();
        ctx.strokeStyle = fill || 'lime';
        ctx.beginPath();
        ctx.arc(center.x, center.y, cross.radiusInner + 5, rStart, rStart + rLength * per);
        ctx.stroke();
    };
 
    // draw the inner and outer cross circles
    var drawCrossCircles = function (ctx, cross) {
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.fillStyle = 'rgba(255,0,0,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusInner, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusOuter, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cross.crosshairs.x, cross.crosshairs.y, cross.crosshairs.radius, 0, Math.PI * 2);
        ctx.stroke();
    };
 
    var drawCrossHairs = function (ctx, cross) {
        var ch = cross.crosshairs;
        ctx.strokeStyle = 'rgba(200,0,0,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - ch.radius * 1.5);
        ctx.lineTo(ch.x, ch.y + ch.radius * 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x - ch.radius * 1.5, ch.y);
        ctx.lineTo(ch.x + ch.radius * 1.5, ch.y);
        ctx.stroke();
    };
 
    var drawPercentRemainBar = function (ctx, game) {
        var cross = game.cross,
        center = cross.center,
        map = game.map;
        drawBar(ctx, game, map.percentRemain, Math.PI, Math.PI / 2, getHpColor(map.percentRemain));
    };
 
    var drawAutoPlayDelayBar = function (ctx, game) {
        var ap = game.autoPlay;
        drawBar(ctx, game, ap.delay / ap.maxDelay, 0, Math.PI / 4, 'cyan');
    };
 
    // draw the current weapon info
    var drawWeaponInfo = function (ctx, game) {
        var center = game.cross.center;
        var w = game.weapons[game.weaponIndex];
        ctx.fillStyle = '#ff6060';
        ctx.font = '10px courier';
        ctx.textAlign = 'center';
        ctx.fillText('Weapon: ' + w.name, center.x, center.y + 75);
        ctx.fillText('maxDPS: ' + Number(w.maxDPS).toFixed(2), center.x, center.y + 85);
    };
 
    // draw a health bar for a cell
    var drawCellHealthBar = function (ctx, map, cell, cross) {
        var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
        y = cell.y * map.cellSize + cross.offset.y + (240 / 2);
        //ctx.fillStyle = 'rgba(0,255,0,0.4)';
        ctx.fillStyle = getHpColor(cell.HP / cell.maxHP);
        ctx.globalAlpha = 0.5;
        ctx.fillRect(x, y, map.cellSize * (cell.HP / cell.maxHP), 5);
        ctx.globalAlpha = 1;
    };
 
    var setupDebug = function (ctx, game) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';
    };
 
    var cellLevel = function (ctx, cell, x, y) {
        if (cell.active) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '7px courier';
            ctx.fillText('L' + Math.floor(cell.levelObj.level), x + 3, y + 3);
        }
    };
    var debugModes = {
        none: function (sm) {},
        general: function (sm) {
            var ctx = sm.ctx,
            canvas = sm.canvas,
            game = sm.game;
            setupDebug(ctx, sm.game);
            ctx.fillText('pos: ' + game.cross.offset.x.toFixed(2) + ',' + game.cross.offset.y.toFixed(2), 10, 10);
            ctx.fillText('percent remain: ' + Number(game.map.percentRemain * 100).toFixed(2), 10, 20);
            ctx.fillText('weapon: ' + sm.game.weapons[game.weaponIndex].name, 10, 30);
            ctx.fillText('damage: ' + Math.floor(game.totalDamage), 10, 40);
            ctx.fillText('high damage cell: ' + Math.floor(game.map.highDamageCell), 10, 50);
        },
        weapon: function (sm) {
            var ctx = sm.ctx;
            setupDebug(ctx, sm.game);
            var w = sm.game.weapons[sm.game.weaponIndex];
            ctx.fillText('Current weapon: ', 10, 10);
            ctx.fillText('name: ' + w.name, 10, 20);
            ctx.fillText('maxDPS: ' + w.maxDPS, 10, 30);
            ctx.fillText('accuracy: ' + Number(w.accuracy).toFixed(2), 10, 40);
            ctx.fillText('locked: ' + w.locked, 10, 50);
            ctx.fillText('unLockAt: ' + w.unLockAt, 10, 60);
        },
        level: function (sm) {
            var ctx = sm.ctx,
            lv = sm.game.levelObj;
            setupDebug(ctx, sm.game);
            ctx.fillText('Current level: ' + lv.level, 10, 10);
            ctx.fillText('xp: ' + lv.xp, 10, 20);
            ctx.fillText('forNext level: ' + lv.forNext, 10, 30);
            ctx.fillText('toNext level: ' + lv.toNext, 10, 40);
            ctx.fillText('per: ' + lv.per.toFixed(2), 10, 50);
            ctx.fillText('forLast: ' + lv.forLast, 10, 60);
        },
        map: function (sm) {
            var ctx = sm.ctx,
            game = sm.game,
            map = game.map;
            setupDebug(ctx, game);
 
            ctx.fillText('map level: ' + game.mapLevelObj.level, 10, 10);
            ctx.fillText('map size: ' + map.cellWidth + 'x' + map.cellHeight, 10, 20);
            ctx.fillText('cellLevelCap: ' + map.cellLevel.cap, 10, 30);
            ctx.fillText('cellDeltaNext: ' + map.cellLevel.deltaNext, 10, 40);
            ctx.fillText('gen rate (count): ' + map.gen.rate + ' (' + map.gen.count + ')', 10, 50);
 
            ctx.fillText('map.percentRemain: ' + map.percentRemain.toFixed(2), 10, 100);
 
        }
    };
 
    var cellTypeColors = ['green', 'blue', 'red'],
    sheets = genSheets.sheets;
 
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // draw cross hairs
        cross: function (ctx, game) {
            // draw basic circles
            drawCrossCircles(ctx, game.cross);
            // bars
            drawPercentRemainBar(ctx, game); // percentRemain
            drawAutoPlayDelayBar(ctx, game); // autoPlay delay
            drawBar(ctx, game, game.levelObj.per, Math.PI * 1.69, Math.PI * 0.3, 'blue'); // next level
            drawBar(ctx, game, game.shotSecs / game.shotRate, Math.PI * 0.33, Math.PI * 0.15, 'red'); // shotRate
            drawBar(ctx, game, game.mana.current / game.mana.max, Math.PI * 0.5, Math.PI * 0.15, 'purple');
            // weapon info
            drawWeaponInfo(ctx, game);
            // draw cell and level info
            var cross = game.cross,
            map = game.map,
            ch = game.cross.crosshairs,
            cell = mapMod.getWithCanvasPointAndOffset(game.map, ch.x, ch.y, cross.offset.x, cross.offset.y),
            x = cross.center.x + cross.radiusOuter - 45,
            y = cross.center.y;
            // text style for info
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = '8px arial';
            // main game level info
            ctx.fillText('level: ' + game.levelObj.level + ' (' + Math.round(game.levelObj.per * 100) + '%)', x, y - 50);
            ctx.fillText('xp: ' + Math.floor(game.levelObj.xp), x, y - 40);
            ctx.fillText('next: ' + Math.floor(game.levelObj.toNext), x, y - 30);
            ctx.fillText('mana: ' + Math.floor(game.mana.current) + '/' + Math.floor(game.mana.max) + ' (' + game.mana.mps + '/s)', x, y - 20);
            // cell info
            if (cell) {
                ctx.fillText('pos: ' + cell.i + ' (' + cell.x + ',' + cell.y + ')', x, y);
                ctx.fillText('lv:' + cell.levelObj.level + ' (' + Math.round(cell.levelObj.per * 100) + '%)', x, y + 10);
                ctx.fillText('hp:' + Math.floor(cell.HP) + '/' + Math.floor(cell.maxHP), x, y + 20);
                ctx.fillText('dam: ' + Math.floor(cell.damage) + ' (' + Math.round(cell.damagePer * 100) + '%)', x, y + 30);
                // draw target cell
                ctx.strokeStyle = 'rgba(255,255,255,0.4)';
                ctx.lineWidth = 3;
                ctx.strokeRect(cell.x * map.cellSize + cross.offset.x + (320 / 2), cell.y * map.cellSize + cross.offset.y + (240 / 2), map.cellSize, map.cellSize);
            }
            // draw the cross hairs
            drawCrossHairs(ctx, game.cross);
        },
        // draw map
        map: function (ctx, map, cross) {
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 3;
            map.cells.forEach(function (cell) {
                var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
                y = cell.y * map.cellSize + cross.offset.y + (240 / 2),
                per = cell.HP / cell.maxHP;
                if (cell.active) {
                    // for active cell
                    ctx.drawImage(sheets[cell.typeIndex].canvas, 32 * Math.floor(9 - cell.HP / cell.maxHP * 9), 0, 32, 32, x, y, map.cellSize, map.cellSize);
                    if (per < 1) {
                        drawCellHealthBar(ctx, map, cell, cross);
                    }
                } else {
                    // for inactive cell
                    ctx.lineWidth = 1;
                    var c = 50 + Math.round(200 * cell.damagePer);
                    ctx.strokeStyle = 'rgba(0,128,128, 0.4)';
                    ctx.fillStyle = 'rgba(0,' + c + ',' + c + ', 0.7)';
                    ctx.beginPath();
                    ctx.rect(x, y, map.cellSize, map.cellSize);
                    ctx.fill();
                    ctx.stroke();
                }
                cellLevel(ctx, cell, x, y);
                //cellDebug(ctx, cell, x, y);
            });
        },
        shots: function (ctx, game) {
            var shots = game.shots,
            offset = game.cross.offset,
            x,
            y,
            i = shots.length,
            shot;
            while (i--) {
                shot = shots[i];
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                if (shot.active) {
                    ctx.beginPath();
                    x = shot.x + offset.x + (320 / 2);
                    y = shot.y + offset.y + (240 / 2);
                    ctx.arc(x, y, shot.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        explosions: function (ctx, game) {
            var exps = game.explosions,
            offset = game.cross.offset,
            i = exps.length,
            x,
            y,
            alpha = 0.5,
            ex;
            while (i--) {
                ex = exps[i];
                alpha = 1 - ex.per;
                ctx.fillStyle = 'rgba(255,255,0,' + alpha + ')';
                ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';
                if (ex.active) {
                    ctx.beginPath();
                    x = ex.x + offset.x + (320 / 2);
                    y = ex.y + offset.y + (240 / 2);
                    ctx.arc(x, y, ex.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        buttons: function (ctx, buttons) {
            Object.keys(buttons).forEach(function (key) {
                var b = buttons[key];
                ctx.fillStyle = 'red';
                if (b.type === 'toggle' && b.bool) {
                    ctx.fillStyle = 'lime';
                }
                ctx.strokeStyle = 'gray';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.font = (b.fontSize || 10) + 'px arial';
                if (b.type === 'options') {
                    var str = b.options[b.currentOption || 0];
                    ctx.fillText(str, b.x, b.y);
                }
                if (b.type === 'basic') {
                    ctx.fillText(b.label, b.x, b.y);
                }
                if (b.type === 'toggle') {
                    ctx.fillText(b.label, b.x, b.y);
                }
                if (b.type === 'upgrade') {
                    ctx.fillText(b.label, b.x, b.y);
                    ctx.font = '8px courier';
                    ctx.fillText(b.info, b.x, b.y + 10);
                }
            });
        },
        mapInfo: function (ctx, game) {
            var map = game.map,
            mapLevelObj = game.mapLevelObj;
            // draw mapLevel info
            ctx.textAlign = 'center';
            ctx.fillText('mapLevel : ' + mapLevelObj.level, 160, 80);
            ctx.fillText('size : ' + map.cellWidth + ' x ' + map.cellHeight, 160, 90);
            ctx.fillText('Max Cell Level : ' + map.cellLevel.cap, 160, 100);
            ctx.fillText('Level Up Rate : ' + map.cellLevel.deltaNext, 160, 110);
            ctx.fillText('Cell Gen Rate : ' + map.gen.rate.toFixed(2), 160, 120);
            ctx.fillText('Cell Gen Count : ' + map.gen.count, 160, 130);
        },
        debug: function (sm) {
            debugModes[sm.debugMode](sm, sm.ctx, sm.canvas);
        },
        skillPointInfo: function (ctx, sm) {
            var skillPoints = sm.game.skillPoints;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.fillText('skillPoints: ' + skillPoints.free + '/' + skillPoints.total, 10, 10);
        },
        ver: function (ctx, sm) {
            ctx.fillStyle = '#dfdfdf';
            ctx.textAlign = 'left';
            ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
        }
    }
}
    ());
```


## 10 - Now for a Main.js file along with a main app loop

So now I need some additional code to pull everything together here in a main.js file that will be used after everything else is in place to work with. Here I create and inject a canvas element into a hard coded container element that I have in my html. I create instances of a map and cross state objects, and attach a whole bunch of event handers for mouse and touch events using the create event method of the cross module.

I then have an attack method that I will likely work into the map module, or some kind of future module that has to do with a weapons or something to that effect. I do not want to get into to much detail with that because at some point in the future I will just have to re write what I have to say about it when it comes to putting a little more time into this canvas example, because I think this one needs and deserve more work.

Another method that I ended up parking here is the get canvas relative method that helps with getting a point that is relative to the canvas element rather than window. In this canvas example I am not doing anything with multi touch, so I went with a method that will just use the first touch object in the changed touches array of a touch event. I will not be getting into detail about this method here as I have [wrote a post on this topic of getting a canvas relative point in detail before hand](/2020/03/04/canvas-get-point-relative-to-canvas/).

```js
// MAIN file including state machine
(function () {
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
 
    // save string helpers
    var saveStateString = function (sm) {
        localStorage.setItem('game-crosshairs-save-0', gameMod.createSaveString(sm.game));
    };
    var loadStateString = function () {
        //return 'v1.0.1.0-0-0-0-.';
        return localStorage.getItem('game-crosshairs-save-0') //'v0.epz.'
    };
 
    // get a canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect();
        return {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
    };
 
    var states = {
 
        init: {
            // for each update tick
            update: function (sm, secs) {
                // create game object
                sm.game = gameMod.create({
                        canvas: canvas,
                        totalDamage: 0,
                        startingCellDamage: 0,
                        mapXP: 0,
                        mapDeltaNext: 50,
                        mapLevelCap: 20,
                        saveString: loadStateString()
                    });
                // createing skill manager buttons
                states.skillManager.buttons = gameMod.createSkillButtons(sm);
                sm.currentState = 'game';
            },
            // events
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = getCanvasRelative(e);
                // check buttons for options state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
            },
            pointerMove: function () {},
            pointerEnd: function () {}
        },
 
        // OPTIONS STATE
        options: {
            // button objects for the state
            buttons: {
                toGame: buttonMod.create({
                    label: 'game',
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        // set state to game
                        sm.currentState = 'game';
                    }
                }),
                toSkillsManager: buttonMod.create({
                    label: 'Skills',
                    x: 100,
                    y: 120,
                    r: 16,
                    onClick: function (button, sm) {
                        // set state to map
                        sm.currentState = 'skillManager';
                    }
                }),
                toMap: buttonMod.create({
                    label: 'Map',
                    x: 100 + 40,
                    y: 120,
                    r: 16,
                    onClick: function (button, sm) {
                        // set state to map
                        sm.currentState = 'map';
                    }
                }),
                debugMode: buttonMod.create({
                    x: 100 + 80,
                    y: 120,
                    r: 16,
                    type: 'options',
                    options: ['none', 'general', 'weapon', 'level', 'map'],
                    onClick: function (button, sm) {
                        sm.debugMode = button.options[button.currentOption];
                    }
                })
            },
            // for each update tick
            update: function (sm, secs) {
                var state = states[sm.currentState];
                draw.back(ctx, canvas);
                draw.buttons(ctx, state.buttons);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            // events
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = getCanvasRelative(e);
                // check buttons for options state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
            },
            pointerMove: function () {},
            pointerEnd: function () {}
        },
 
        // GAME STATE
        game: {
            buttons: {
                options: buttonMod.create({
                    label: 'options',
                    fontSize: 10,
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        //sm.currentState = 'options';
                    },
                    onFrame: function(button, sm, frame){
                        console.log(button.label, frame.current);
                    },
                    onInStart: function(button, sm){
                        console.log(button.label, 'in start');
                    },
                    onInEnd: function(button, sm){
                        console.log(button.label, 'in end');
                    },
                    onOutStart: function(button, sm){
                        console.log(button.label, 'out start');
                    },
                    onOutEnd: function(button, sm){
                        console.log(button.label, 'out end');
                        sm.currentState = 'options';
                    }
                }),
                changeWeapon: buttonMod.create({
                    label: 'Next Weapon',
                    fontSize: 8,
                    x: 280,
                    y: 210,
                    r: 16,
                    onClick: function (button, sm) {
                        sm.game.weaponIndex += 1;
                        sm.game.weaponIndex %= sm.game.highWeaponIndex + 1;
                    }
                }),
                autoPlay: buttonMod.create({
                    label: 'Auto Play',
                    type: 'toggle',
                    fontSize: 8,
                    x: 25,
                    y: 175,
                    r: 10,
                    bool: true,
                    onClick: function (button, sm) {
                        var ap = sm.game.autoPlay;
                        ap.delay = ap.maxDelay;
                    },
                    onActive: function (button, sm) {
                        sm.game.autoPlay.enabled = button.bool;
                    },
                    onInactive: function (button, sm) {
                        sm.game.autoPlay.enabled = button.bool;
                    }
                })
            },
            update: function (sm, secs) {
                var state = states[sm.currentState];
 
                // update game state
                gameMod.update(sm.game, secs);
                buttonMod.updateCollection(state.buttons, secs, sm);
 
                // auto save
                saveStateString(sm);
 
                // draw
                draw.back(ctx, canvas);
                draw.map(ctx, sm.game.map, sm.game.cross);
                draw.explosions(ctx, sm.game);
                draw.cross(ctx, sm.game);
                draw.shots(ctx, sm.game);
 
                //draw.damageBar(ctx, sm.game);
                draw.buttons(ctx, state.buttons);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = getCanvasRelative(e);
                // enable cross move back feature
                sm.game.cross.moveBackEnabled = true;
                crossMod.userAction(sm.game.cross, 'start', pos);
                sm.game.userDown = true;
                // check buttons for game state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
            },
            pointerEnd: function (em, e) {
                var pos = getCanvasRelative(e);
                crossMod.userAction(sm.game.cross, 'end', pos);
                sm.game.userDown = false;
            },
            pointerMove: function (sm, e) {
                var pos = getCanvasRelative(e);
                crossMod.userAction(sm.game.cross, 'move', pos);
            }
        },
 
        skillManager: {
 
            // use createSkillButtons gameMod method for buttons here
            buttons: {},
 
            update: function (sm, secs) {
                var state = states[sm.currentState];
                draw.back(ctx, canvas);
 
                // update game but with zero seconds
                gameMod.update(sm.game, 0);
 
                draw.buttons(ctx, state.buttons);
                draw.skillPointInfo(ctx, sm);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = getCanvasRelative(e);
                // check buttons for skillManager state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
 
                saveStateString(sm);
            },
            pointerEnd: function (em, e) {},
            pointerMove: function (sm, e) {}
        },
 
        // MAP STATE
        map: {
            buttons: {
                toOptions: buttonMod.create({
                    label: 'Options',
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        // set state to options
                        sm.currentState = 'options';
                    }
                }),
                levelUp: buttonMod.create({
                    label: 'Level +',
                    x: 160 - 30,
                    y: 180,
                    r: 20,
                    onClick: function (button, sm) {
                        var level = sm.game.mapLevelObj.level;
                        level += 1;
                        sm.game.mapXP = XP.parseByLevel(level, sm.game.mapLevelCap, sm.game.mapDeltaNext).xp;
                        gameMod.setMap(sm.game, sm.game.mapXP, sm.game.mapDeltaNext, sm.game.mapLevelCap);
                    }
                }),
                levelDown: buttonMod.create({
                    label: 'Level -',
                    x: 160 + 30,
                    y: 180,
                    r: 20,
                    onClick: function (button, sm) {
                        var level = sm.game.mapLevelObj.level;
                        level -= 1;
                        sm.game.mapXP = XP.parseByLevel(level, sm.game.mapLevelCap, sm.game.mapDeltaNext).xp;
                        gameMod.setMap(sm.game, sm.game.mapXP, sm.game.mapDeltaNext, sm.game.mapLevelCap);
                    }
                })
            },
            update: function (sm, secs) {
                var state = states[sm.currentState];
                draw.back(ctx, canvas);
                draw.buttons(ctx, state.buttons);
                draw.mapInfo(ctx, sm.game);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = getCanvasRelative(e);
                // check buttons for map state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
            },
            pointerEnd: function (em, e) {},
            pointerMove: function (sm, e) {}
        }
    };
 
    var sm = {
        ver: '0.22.0',
        canvas: canvas,
        ctx: ctx,
        debugMode: 'none',
        currentState: 'init',
        game: {},
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };
 
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos;
            sm.input.pointerDown = true;
            //console.log('start');
            states[sm.currentState].pointerStart(sm, e);
        },
        move: function (sm, e) {
            //console.log('move');
            states[sm.currentState].pointerMove(sm, e);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
            //console.log('end');
            states[sm.currentState].pointerEnd(sm, e);
        }
    };
 
    var createPointerHandler = function (sm, type) {
        return function (e) {
            sm.input.pos = getCanvasRelative(e);
            e.preventDefault();
            pointerHanders[type](sm, e);
        };
    };
 
    // attach for mouse and touch
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
 
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
 
}
    ());
```

I then of course have my main app loop where I am using the requestAnimationFrame method, inside the loop method. In this loop method I am updating the state of the cross object and drawing the state of the cross and map objects.


I then have just a little HTML and inline css for the container for the canvas element, or elements at some point in the future if I get into layering with this one.

```html
<html>
    <head>
        <title>canvas example game crosshairs</title>
    </head>
    <body>
 
        <!-- container -->
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
 
        <!-- game state -->
        <script src="./lib/utils.js"></script>
        <script src="./lib/exp_system.js"></script>
        <script src="./lib/cross.js"></script>
        <script src="./lib/map.js"></script>
        <script src="./lib/pool.js"></script>
        <script src="./lib/buttons.js"></script>
        <script src="./lib/game.js"></script>
 
        <!-- rendering -->
        <script src="./lib/gen_sheets.js"></script>
        <script src="./lib/draw.js"></script>
 
        <!-- state machine / DOM / events / main -->
        <script src="main.js"></script>
    </body>
</html>
```

So that is it when this canvas example is up and running I am able to move around and when I click on the map I cause damage to the areas that I click. Nothing to interesting at the point of this writing at least, but I think that this one has some decent potential when it comes to putting a little more time into it. I do have many other canvas examples in a state like this also that need more attention, but I am sure I will come back around to this one at some point.

## 11 - Conclusion

So now I have the basic idea of what I had in mind together at least, now it is just a question of what more I can do to it to make it more interesting. There is making it so that each time the player clicks or touches an area in the inner circle that causes a shot to fire from one side of the canvas or another to the point where such an event happened. So there is adding much more when it comes to weapons and what it is that we are shooting at. In addition there is doing something so that there are units in the map the shoot back at the player also.

I made [another canvas example that is like this one when it comes to moving around a map that I called just simply pointer movement](/2020/01/26/canvas-example-pointer-movement/). That one was programed a little differently from this one as that was just simply a means to move around a map by clicking and dragging away from the point that was clicked. Here I have a set of circles fixed at the center of the canvas, or any other location that I choose to fix these circle areas to. There is an outer circle area that is used to move around based on the distance from the end of the inner circle rather than the center point. In addition the inner circle area will not result in any movement, but is used as an area where I can shoot at things, but not move.