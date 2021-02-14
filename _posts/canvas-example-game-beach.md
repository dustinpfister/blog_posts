---
title: canvas example of a beach war game
date: 2020-04-24 17:52:00
tags: [canvas]
layout: post
categories: canvas
id: 651
updated: 2021-02-14 17:51:26
version: 1.18
---

For this weeks [canvas example](/2020/03/23/canvas-example/) I started working on an idea that I had for a simple strategy type game. The basic idea of what I had in mind is just a simple 2d grid type game with three index values for ground types that are water, beach, and land. The player can build structures on land, but not on beach or water cells. In the water enemy boats can spawn and attempt to attack and invade the beach. 

I was not thinking in terms of much more beyond that, but there are several games that I have played in the past that come to mind that where kind of fun that where like that in one way or another. So I wanted to take a moment to throw together a basic prototype of some kind of game where the player is defending a beach.

The current state of this canvas example is not what I had in mind just yet as of the time of this writing, but it is turning into something interesting that is showing some potential. It is not the kind of project that involves user interaction at least for the moment, so for now it is a kind of game where the computer is playing against itself sort of speak. That feature of having the computer automate the process of playing is something that I often find myself putting in anyway.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-beach/0.5.0/pkg.js"></script>

## 1 - The utils library for canvas example beach

So with many of these canvas examples I end up making a utility library where I park methods that I think I will be using in more that one module at one point or another. Or another reason why I might place something there is to just reduce the complexity of another module such as the main game state module as those have a tenancy to get rather complicated. many methods and objects here might eventually get pulled into their own files at some point, but a general utility library seems like a good starting point to park these kinds of things. 

In any case this utils.js file is a collection of methods that are relevant to the modules for this canvas example that include the modules for state, rendering, and any plug-ins I might make at some point if I end up making a plug-in system.

```js
var utils = {};
 
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
utils.XP = (function () {
    // set level with given xp
    var set = function (xp) {
        //return Math.sqrt(xp);
        return (1 + Math.sqrt(1 + 8 * xp / 50)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var XPto = function (level) {
        //return Math.pow(level, 2);
        return ((Math.pow(level, 2) - level) * 50) / 2;
    };
    var parseByXP = function (xp, cap) {
        var l = set(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = XPto(level + 1);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        parseByLevel: function (l, cap) {
            return parseByXP(XPto(l, cap));
        },
        parseByXP: parseByXP
    };
}
    ());
```

For now the module consists of the distance formula, and a an experience point system that consists of two methods. The distance formula is a usual suspect for a lot of these canvas examples, but the experience point system is thus far something that I am just using in this project, at least at the point of this writing anyway.

The XP system of a game alone can often become a complex project on its own, however for now I just wanted a very simple basic system for this kind of thing. As I see it an XP system should have at least two methods one that can be used to create a state object for sorts by passing a level, and level cap to get a state object, and the other by passing an XP point value. The state object then contains properties like current level, the level in fraction form, the xp value, and values for the next level and to the next level.

## 2 - The game module

Here is the main game module that will return two public methods that are use to create a game state, as well as update that game state for this canvas example. The state object that the modules creates contains a grid as well as pools of display objects for player turrets, enemy ships, and shots. The main update method of this module accepts an instance of this state object and updates the state based on the amount of time that has elapsed sense the last update.

```js
var game = (function () {
 
    // HARD CODED SETTINGS
    // ********** ********** ********** ********** **********
 
    // GRID 'Constants'
    var GRID = {
        w: 16,
        h: 12,
        cellSize: 16
    };
 
    // SPAWN 'Constants'
    var SPAWN = {
        rate: 0.5, // spawn rate in secs
        playerMax: 5, // max player units
        enemyMax: 10,
        shotMax: 100,
        blastMax: 50
    };
 
    var TURRET = {
        maxKillLevel: 10,
        minAttack: 1,
        maxAttack: 10,
        minAttackRange: 3,
        maxAttackRange: 7,
 
        minAccuracy: 0.4,
        maxAccuracy: 0.9,
 
        maxInaccuracy: 2
    };
 
    // CELLS create and get
    // ********** ********** ********** ********** **********
 
    // create the array of cell objects
    var createCells = function (areaData) {
        var i = 0,
        len = GRID.w * GRID.h,
        cells = [];
        while (i < len) {
            cells.push({
                i: i,
                x: i % GRID.w,
                y: Math.floor(i / GRID.w),
                areaType: areaData[i] === undefined ? 0 : areaData[i],
                clear: true // nothing on it
            })
            i += 1;
        }
        return cells;
    };
 
    // get cell
    var getCell = function (state, x, y) {
        return state.cells[GRID.w * y + x];
    };
 
    var getRandomCell = function (pool) {
        return pool[Math.floor(pool.length * Math.random())];
    };
 
    // get areas of type and clear status (optional)
    // clear === undefined (clear and not clear tiles)
    // clear === true (only clear tiles)
    // clear === false (only not clear tiles)
    var getAreas = function (state, areaType, clear) {
        return state.cells.filter(function (cell) {
            return String(cell.areaType) === String(areaType) && (clear === undefined ? true : clear === cell.clear);
        });
    };
 
    // get cells near the cell
    var getNear = function (state, cell, range, areaType) {
        range = range || 1;
        areaType = areaType === undefined ? 0 : areaType;
        return state.cells.filter(function (target) {
            return utils.distance(cell.x, cell.y, target.x, target.y) <= range;
        }).filter(function (target) {
            return String(areaType) === String(target.areaType) && cell.i != target.i;
        }).filter(function (target) {
            return target.clear;
        })
    };
 
    // return a list of objects with landIndex values sorted by
    // most amount of water tiles in the given range
    var getBestTurretLands = function (state, range) {
        var waterAreas = getAreas(state, 0);
        return getAreas(state, 2, true).map(function (cell) {
            var count = 0;
            waterAreas.forEach(function (waterCell) {
                if (utils.distance(cell.x, cell.y, waterCell.x, waterCell.y) <= range) {
                    count += 1;
                }
            });
            return {
                i: cell.i,
                cell: cell,
                waterCount: count
            }
        }).filter(function (obj) {
            return obj.waterCount > 0;
        }).sort(function (a, b) {
            if (a.waterCount > b.waterCount) {
                return -1;
            }
            if (a.waterCount < b.waterCount) {
                return 1;
            }
            return 0;
        });
    };
 
    // get border waters
    var getBorderWaters = function (state) {
        return getAreas(state, 0, true).filter(function (cell) {
            return cell.x === 0 || cell.y == 0 || cell.x === GRID.w - 1 || cell.y === GRID.h - 1;
        });
    };
 
    // BOAT and TURRET helpers
    // ********** ********** ********** ********** **********
 
    // set values of the given turret object bu the current killLevel value
    var applyTurretKillLevel = function (tur) {
        var per = tur.killLevel.level / TURRET.maxKillLevel,
        delta;
        // attack
        delta = (TURRET.maxAttack - TURRET.minAttack) * per;
        tur.attack = TURRET.minAttack + delta;
        // attack range
        delta = (TURRET.maxAttackRange - TURRET.minAttackRange) * per;
        tur.attackRange = TURRET.minAttackRange + delta;
        // accuracy
        delta = (TURRET.maxAccuracy - TURRET.minAccuracy) * per;
        tur.accuracy = TURRET.minAccuracy + delta;
    };
 
    // SPAWN boats and turrets
    // ********** ********** ********** ********** **********
 
    // spawn units
    var spawn = function (state, secs) {
        state.spawnSecs += secs;
        if (state.spawnSecs >= SPAWN.rate) {
            state.spawnSecs %= SPAWN.rate;
            // player spawn
            if (state.pool.player.length < SPAWN.playerMax) {
                var freeLands = getBestTurretLands(state, TURRET.minAttackRange);
                if (freeLands.length >= 1) {
                    var land = freeLands[0].cell;
                    land.clear = false;
                    var turret = {
                        x: land.x,
                        y: land.y,
                        h: 0, // heading
                        kills: 0,
                        killLevel: 1,
                        killsToNext: 0,
                        attack: 5,
                        attackRange: TURRET.minAttackRange,
                        fireRate: 0.1,
                        fireSecs: 0.2,
                        accuracy: 0.0,
                        shotPPS: 4,
                        shotBlastRadius: 1.5,
                        shotAttack: 2
                    };
                    turret.killLevel = utils.XP.parseByXP(turret.kills, TURRET.maxKillLevel);
                    applyTurretKillLevel(turret);
                    state.pool.player.push(turret);
                }
            }
            // enemy
            if (state.pool.enemy.length < SPAWN.enemyMax) {
                var waters = getBorderWaters(state);
                if (waters.length >= 1) {
                    var water = getRandomCell(waters);
                    water.clear = false;
                    state.pool.enemy.push({
                        x: water.x,
                        y: water.y,
                        hp: 100,
                        hpMax: 100,
                        secs: 0,
                        speed: 3
                    });
                }
            }
        }
    };
 
    // UPDATE  boats and turrets
    // ********** ********** ********** ********** **********
 
    // update boats
    var updateBoats = function (state, secs) {
        var i = state.pool.enemy.length,
        boat;
        while (i--) {
            boat = state.pool.enemy[i];
            boat.secs += secs;
            if (boat.secs >= boat.speed) {
                boat.secs %= boat.speed;
                var near = getNear(state, boat, 1.5, 0);
                if (near.length >= 1) {
                    var water = getRandomCell(near),
                    current = getCell(state, boat.x, boat.y);
                    current.clear = true;
                    water.clear = false;
                    boat.x = water.x;
                    boat.y = water.y;
                }
            }
            // purge dead boats
            if (boat.hp === 0) {
                var cell = getCell(state, boat.x, boat.y);
                cell.clear = true;
                state.pool.enemy.splice(i, 1);
                state.kills += 1;
            }
        }
    };
 
    // update player turrets
    var updateTurrets = function (state, secs) {
        var i = state.pool.player.length,
        turret;
        while (i--) {
            turret = state.pool.player[i];
            turret.fireSecs -= secs;
            // fire
            if (turret.fireSecs <= 0) {
                turret.fireSecs = turret.fireRate + Math.abs(turret.fireSecs) % turret.fireRate;
                var targets = state.pool.enemy.filter(function (boat) {
                        return utils.distance(boat.x, boat.y, turret.x, turret.y) <= turret.attackRange;
                    });
                if (targets.length >= 1) {
                    var target = getRandomCell(targets);
                    // push shot
                    if (state.pool.shots.length < SPAWN.shotMax) {
                        var sx = turret.x + 0.5,
                        sy = turret.y + 0.5,
                        ma = TURRET.maxInaccuracy,
                        tx = target.x + 0.5 + (-ma + ma * 2 * Math.random()) * (1 - turret.accuracy),
                        ty = target.y + 0.5 + (-ma + ma * 2 * Math.random()) * (1 - turret.accuracy);
                        turret.h = Math.atan2(ty - sy, tx - sx);
                        state.pool.shots.push({
                            shotFrom: turret,
                            x: sx,
                            y: sy,
                            sx: sx,
                            sy: sy,
                            tx: tx,
                            ty: ty,
                            secs: 0,
                            d: utils.distance(sx, sy, tx, ty),
                            h: turret.h,
                            pps: turret.shotPPS,
                            blastRadius: turret.shotBlastRadius,
                            attack: turret.shotAttack
                        });
                    }
                }
            }
        }
    };
 
    // SHOTS ans BLASTS
    // ********** ********** ********** ********** **********
 
    // shot blast
    var spawnBlast = function (state, shot) {
        var i = state.pool.enemy.length,
        boat,
        dam,
        d;
        // apply damage
        while (i--) {
            boat = state.pool.enemy[i];
            d = utils.distance(shot.x, shot.y, boat.x + 0.5, boat.y + 0.5);
            if (d <= shot.blastRadius) {
                dam = shot.attack - d / shot.blastRadius * shot.attack;
                // attack but do not purge boat, that is done in updateBoats
                boat.hp -= dam;
                boat.hp = boat.hp < 0 ? 0 : boat.hp;
                // step kills for shotFrom if we have that value
                var disp = shot.shotFrom;
                if (boat.hp === 0 && disp != undefined) {
                    disp.kills += 1;
                    disp.killLevel = utils.XP.parseByXP(disp.kills, TURRET.maxKillLevel);
                    applyTurretKillLevel(disp);
                }
            }
        }
        // push blast
        if (state.pool.blasts.length < SPAWN.blastMax) {
            state.pool.blasts.push({
                x: shot.x,
                y: shot.y,
                secs: 0,
                secsMax: 1,
                radius: shot.blastRadius
            });
        }
    };
 
    // update shots in the shot pool
    var updateShots = function (state, secs) {
        var i = state.pool.shots.length,
        shot;
        while (i--) {
            shot = state.pool.shots[i];
            shot.secs += secs;
            var d = shot.pps * shot.secs;
            d = d > shot.d ? shot.d : d;
            shot.x = shot.sx + Math.cos(shot.h) * d;
            shot.y = shot.sy + Math.sin(shot.h) * d;
            if (d === shot.d) {
                spawnBlast(state, shot);
                state.pool.shots.splice(i, 1);
            }
        }
    };
 
    // PUBLIC API
    // ********** ********** ********** ********** **********
 
    var api = {
        GRID: GRID,
        SPAWN: SPAWN,
        TURRET: TURRET
    };
  
    // create a state object
    api.create = function (opt) {
        opt = opt || {};
        opt.areaData = opt.areaData || '';
        var state = {
            cells: createCells(opt.areaData),
            lt: new Date(),
            spawnSecs: 0,
            kills: 0,
            pool: {
                player: [],
                enemy: [],
                shots: [],
                blasts: []
            }
        };
        return state;
    };
 
    // update a state object
    api.update = function (state) {
        // time
        var now = new Date(),
        t = now - state.lt,
        secs = t / 1000;
        // spawn
        spawn(state, secs);
        //purge(state);
        updateBoats(state, secs);
        updateTurrets(state, secs);
        updateShots(state, secs);
        // update blasts
        var i = state.pool.blasts.length;
        while (i--) {
            var blast = state.pool.blasts[i];
            blast.secs += secs;
            if (blast.secs >= blast.secsMax) {
                state.pool.blasts.splice(i, 1);
            }
        }
        // set lt to now
        state.lt = now;
    };
 
    return api;
 
}
    ());
```

I do not want to write to much more about this module at this time, the reason why is that I might continue working on this example a bit more and as such the state of the module might change a lot, or break down into many modules actually.

## 3 - Draw.js

Now for the draw module that will help with rendering the current status of a game state object for this canvas example. The module contains usual suspects for many of my canvas example projects including methods that render a background, and debug info. As of this writing I am still just working out the core of what this project is, and as such I am not doing anything with sprite sheets. Instead I just have methods for drawing certain display objects by way of 2d drawing context calls for various canvas drawing methods.

```js
var draw = (function () {
 
    var api = {};
 
    api.back = function (ctx, canvas, op) {
        ctx.fillStyle = 'rgba(0,0,0,' + op + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
 
    api.cells = function (ctx, state) {
        var i = state.cells.length,
        colors = ['blue', 'yellow', 'green'],
        cellSize = game.GRID.cellSize,
        cell;
        while (i--) {
            cell = state.cells[i];
            ctx.fillStyle = colors[cell.areaType];
            ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
        }
    };
 
    // old simple draw pool method
    var drawPool = function (ctx, state, poolName) {
        var i = state.pool[poolName].length,
        colors = {
            player: 'purple',
            enemy: 'red'
        },
        cellSize = game.GRID.cellSize;
        while (i--) {
            disp = state.pool[poolName][i];
            ctx.fillStyle = colors[poolName];
            ctx.fillRect(disp.x * cellSize, disp.y * cellSize, cellSize, cellSize);
            if (disp.hp != undefined) {
                var per = disp.hp / disp.hpMax;
                ctx.fillStyle = 'lime';
                ctx.fillRect(disp.x * cellSize, disp.y * cellSize, cellSize * per, cellSize / 4);
            }
        }
    };
 
    // draw turrets method
    var drawTurrets = function (ctx, state) {
        var i = state.pool.player.length,
        tur,
        cellSize = game.GRID.cellSize;
        while (i--) {
            tur = state.pool.player[i];
            ctx.fillStyle = 'pink';
            ctx.save();
            ctx.translate((tur.x + 0.5) * cellSize, (tur.y + 0.5) * cellSize);
            ctx.rotate(tur.h);
            ctx.beginPath();
            ctx.moveTo(6, 0);
            ctx.lineTo(6 * -1, 6 * -1);
            ctx.lineTo(6 * -1, 6);
            ctx.fill();
            ctx.restore();
 
            // attack range
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.beginPath();
            ctx.arc((tur.x + 0.5) * cellSize, (tur.y + 0.5) * cellSize, tur.attackRange * cellSize, 0, Math.PI * 2);
            ctx.stroke();
 
            // info
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'top';
            ctx.font = '8px arial';
            ctx.fillText(tur.killLevel.level, tur.x * cellSize, tur.y * cellSize);
        }
 
    };
 
    api.units = function (ctx, state) {
        drawPool(ctx, state, 'enemy');
        drawPool(ctx, state, 'player');
        drawTurrets(ctx, state);
    };
 
    api.shots = function (ctx, state) {
        var i = state.pool.shots.length,
        cellSize = game.GRID.cellSize,
        shot;
        ctx.fillStyle = 'white';
        while (i--) {
            shot = state.pool.shots[i];
            ctx.beginPath();
            ctx.arc(shot.x * cellSize, shot.y * cellSize, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
 
    api.blasts = function (ctx, state) {
        var i = state.pool.blasts.length,
        cellSize = game.GRID.cellSize,
        blast;
        while (i--) {
            blast = state.pool.blasts[i];
            var per = blast.secs / blast.secsMax;
            per = per > 1 ? 1 : per;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,128,0,' + (0.6 - (0.55 * per)) + ')';
            ctx.arc(blast.x * cellSize, blast.y * cellSize, blast.radius * cellSize * per, 0, Math.PI * 2);
            ctx.fill();
        }
    };
 
    // basic info that I would want no matter what
    api.info = function (ctx, state, yi) {
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font = '10px arial';
        ctx.fillText('kills: ' + state.kills, 10, 10 * yi);
    };
 
    api.debugInfoTurrets = function (ctx, state, yi, op) {
        var i = state.pool.player.length;
        ctx.fillStyle = 'rgba(255,255,255,' + op + ')';
        ctx.textBaseline = 'top';
        ctx.font = '10px arial';
        ctx.lineWidth = 1;
        while (i--) {
            var tur = state.pool.player[i];
            if (tur) {
                var kl = tur.killLevel,
                text = i + ') turret: { ' +
                    'k: ' + tur.kills + ', ' +
                    'kl: ' + kl.level + ', ' +
                    //'killsToNext: ' + kl.toNext +
                    'at: ' + tur.attack + ', ' +
                    'r: ' + tur.attackRange + ', ' +
                    'ac: ' + tur.accuracy +
                    ' }';
                ctx.fillText(text, 10, 10 * (yi + i));
            }
        }
    };
 
    return api;
 
}
    ());
```

## 4 - Main.js and index.html

Time to pull all of this together with a main.js file and a little html for now. 

I have not got  around to making a map system for this just yet, so for now I am just using a hard coded map as a javaScript string. I pass this string to the create method as an areaData property of the argument object for the crate method of the game module.

Once I have my game state object I just pass it to the update method of the game module in the body of a main app loop.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var areaData = '' +
    '0000000000000000' +
    '0000000000000000' +
    '0000000001110000' +
    '0011111111210000' +
    '0012211222210000' +
    '0012222222211000' +
    '0011222222111000' +
    '0001122222111000' +
    '0001111122210000' +
    '0000001111110000' +
    '0000000000000000';
 
var state = game.create({
        areaData: areaData
    });
 
// frame rate capping for model
// update and drawing so that this does
// nit eat up as much CPU overhead
var lt = new Date(),
targetFPS = 24,
targetDelay = 1000 / targetFPS;
var loop = function () {
 
    var now = new Date(),
    t = now - lt;
 
    requestAnimationFrame(loop);
 
    if (t >= targetDelay) {
        game.update(state);
        draw.back(ctx, canvas, 1);
        draw.cells(ctx, state);
        draw.units(ctx, state);
        draw.shots(ctx, state);
        draw.blasts(ctx, state);
 
        draw.back(ctx, canvas, 0.2);
        draw.info(ctx, state, 1);
        //draw.debugInfoTurrets(ctx, state, 2, 0.5);
        lt = now;
    }
 
};
loop();
```

I then have some HTML that pulls this all together with a single hard coded canvas element.

```html
<html>
    <head>
        <title>canvas example game beach</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="./lib/utils.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

For niw the example is working as expected. Turrets show up on the tiles where turrets can be built, and boats spawn and move around. The turrets fire at the boats, and when the loose all hit points they are purged out from a display object pool. There is still much more I would want to get done with this example when it comes to turning it into something that is truly interesting. I think that this project might end up being one of my examples that I will be getting back to now and then when I get some time. It goes without saying that it still needs a lot of work, still the vague general idea that I had in mind is there up and running for what that is worth.

## 5 - Conclusion

This might end up being one of my canvas example that I might keep coming back to now and then in an effort to break the habit of starting a project but never really finishing it. I like how it is turning out so far, but this one does need a whole lot more work, and I am also not completely sure what the finished product will be if I keep working at it. The main thing I wanted t focus on with this one is to just try to make something that is fun.

With that being said maybe I will keep working on this canvas example, and if so I am sure i will come back and expand this post even further. I would like to break the habit once and for all, if not with this canvas example, [one of them at least](/2020/03/23/canvas-example/).
