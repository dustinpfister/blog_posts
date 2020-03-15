---
title: A simple nodejs powered RPG game
date: 2020-03-13 14:07:00
tags: [node.js]
layout: post
categories: node.js
id: 627
updated: 2020-03-15 19:05:05
version: 1.12
---

I have been wanting to get around to making a simple terminal based RPG style game with nodejs. So I finally got around to doing just that. The basic idea that I had in mind was just a simple turn based terminal RPG game that uses [ANSI escape codes](/2019/09/19/nodejs-ansi-escape-codes/) to draw the state of the game board. Nothing special in terms of item drops, enemy types, spells, and even leveling up as I want to keep this one pretty simple.

No name for this as of yet, I am horrible with names anyway, for not I will just call it simple RPG game. In time this example might server as a starting point for other more interesting projects, so I will want to try to keep everything neat and clean if I can.

<!-- more -->

## 1 - What to know about this simple RPG nodejs example before continuing

I am writing about the state of this nodejs example of a rpg game that I have worked out in a day or so. To understand what I am writing about I assume that you have some background with javaScript and node.js, if not you might have a hard time understanding some of this stuff.

If you are just interesting in playing the game you could clone it down from the repo on my git hub account and just call the main game.js file with nodejs in the command line.

## 2 - The utility library

I will want to have a custom trailered utility library with a bunch of methods that I will be using in at least one if not more other modules. Something like lodash only with methods that I will be using just for this project alone.

So with this like of file I will want a distance formula, as well just a few other methods that have to do with updating the position of objects for the player and enemies in the game. For now just one that will return an updated position for an object based on a given direction, and another that will apply boundaries.

```js
// distance between two points
exports.distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// return an x and y position that is the
// next step from the position in 'obj' based
// off the given 'dir' in 0 to 3 form
exports.dirToPos = (obj, dir) => {
    let r = Math.PI * 2 / 4 * dir,
    dx = Math.round(Math.cos(r)),
    dy = Math.round(Math.sin(r));
    return {
        x: obj.x + dx,
        y: obj.y + dy
    };
};
 
// get a direction number (0 - 3) from one object to another
exports.getDirFromObjToObj = (obj1, obj2) => {
    let r = Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x) + Math.PI,
    per = r / (Math.PI * 2),
    dir = Math.floor(4 * per) % 4;
    return dir;
};
 
// use the given 'map' object with a w and h prop
// to create an object with x and y props set to values
// that are in bounds for an 'obj' that might be out of bounds
exports.setBounds = (state, obj) => {
    let point = {};
    point.x = obj.x > state.w ? state.w : obj.x;
    point.y = obj.y > state.h ? state.h : obj.y;
    point.x = obj.x < 1 ? 1 : point.x;
    point.y = obj.y < 1 ? 1 : point.y;
    return point;
};
 
// is the given location over the player?
let isOverPlayer = exports.isOverPlayer = (state, x, y) => {
    return x === state.player.x && y === state.player.y;
};
 
// check if there is something at the given location
// if so return it
let get = exports.get = (state, x, y, mode) => {
    mode = mode || 'any';
    // if player is at location return that
    if (isOverPlayer(state, x, y) && (mode === 'any' || mode === 'player')) {
        return state.player;
    }
    // check enemies array
    if (mode === 'any' || mode === 'enemies') {
        let i = state.enemies.length;
        while (i--) {
            let e = state.enemies[i];
            if (e.x === x && e.y === y) {
                return e;
            }
        }
    }
    return false;
};
 
// is the given location over nothing?
exports.isOverNothing = (state, x, y) => {
    return !get(state, x, y);
};
```

If I take the time to continue to develop this nodejs example into a more complex game, this library will of course expand. Generally any kind of methods that will be used in more than one other library should be parked here.

## 3 - The state object of the simple rpg canvas example

I am going to want to have some kind of state object for the game. This object will of course hold the current state of a player object along with other data for enemies, and the nature of the game board.

I will want methods that can be used to both load and save a state object as well as create a new one. The load state method should just return a new state object in the event of an error, or the loaded state object if all goes well.

```js
let path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
read = promisify(fs.readFile),
write = promisify(fs.writeFile);
 
let newState = exports.newState = (opt) => {
    opt = opt || {};
    opt.w = opt.w || 31;
    opt.h = opt.h || 11;
    return {
        player: {
            x: Math.floor(opt.w / 2),
            y: Math.floor(opt.h / 2),
            oldX: 1,
            oldY: 1,
            attack: 1,
            hp: 10,
            hpMax: 100,
            autoHeal: 1,
            autoHealEvery: 3,
            autoHealTicks: 0,
            exp: 0
        },
        enemies: [],
        lastSpawn: 0,
        w: opt.w,
        h: opt.h
    };
};
 
exports.loadState = (root, fileName) => {
    root = root || process.cwd();
    fileName = fileName || 'simple-rpg.json';
    return read(path.join(root, fileName), 'utf8')
    .then((json) => {
        let state = JSON.parse(json);
        return state;
    })
    .catch(() => {
        return newState();
    });
};
 
exports.saveState = (state, root, fileName) => {
    root = root || process.cwd();
    fileName = fileName || 'simple-rpg.json';
    return write(path.join(root, fileName), JSON.stringify(state), 'utf8');
};
```

## 4 - The enemies module

So in this game there will be enemy objects in the game board area. So I will want a module that can be used to spawn enemies into an array fro a spawn location in the game board. In addition there will need to be all kinds of other methods that can be used to create a primitive yet function AI.

```js
let u = require('./utils.js');
 
const ENEMIES_MAX = 6,
ENEMIES_SPAWN_MIN = 5,
ENEMIES_ATTACK_RANGE = 1;
 
// purge any dead enemies
exports.purgeDead = (state) => {
    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i];
        if (e.hp <= 0) {
            state.player.exp += 1;
            state.enemies.splice(i, 1);
        }
    }
};
 
exports.spawnEnemy = (state, x, y) => {
    x = x === undefined ? 1 : x;
    y = y === undefined ? Math.floor(state.h / 2) : y;
    if (state.lastSpawn >= ENEMIES_SPAWN_MIN) {
        if (state.enemies.length < ENEMIES_MAX && !u.isOverPlayer(state, x, y)) {
            let e = u.get(state, x, y, 'enemies');
            if (!e) {
                state.enemies.push({
                    x: x,
                    y: y,
                    oldX: x,
                    oldY: y,
                    hp: 3,
                    sight: 4,
                    attack: 1
                });
            }
        }
        state.lastSpawn = 0;
    }
    state.lastSpawn += 1;
};
 
let toPlayerPos = (state, e) => {
    let dir = u.getDirFromObjToObj(e, state.player);
    return u.dirToPos(e, dir);
};
 
let toRandomPos = (state, e) => {
    return u.dirToPos(e, Math.floor(Math.random() * 4));
};
 
exports.updateEnemies = (state) => {
    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i],
        player = state.player,
        d = u.distance(e.x, e.y, player.x, player.y),
        pos = d <= e.sight ? toPlayerPos(state, e) : toRandomPos(state, e);
        if (u.isOverNothing(state, pos.x, pos.y)) {
            e.oldX = e.x;
            e.oldY = e.y;
            e.x = pos.x;
            e.y = pos.y;
        }
        // set bounds
        e = Object.assign(e, u.setBounds(state, e));
        // attack player
        if (d <= ENEMIES_ATTACK_RANGE) {
            player.hp -= e.attack;
            player.hp = player.hp < 0 ? 0 : player.hp;
        };
    }
};
```

## 5 - The player module

So because I have an enemies module it would make sense that I also have a player module as well.

```js
let u = require('./utils.js'),
enemies = require('./enemies.js');
 
let moveOrAttack = (state, tempX, tempY) => {
    // move or attack enemy
    let e = u.get(state, tempX, tempY, 'enemies'),
    player = state.player;
    if (!e) {
        player.oldX = player.x;
        player.oldY = player.y;
        player.x = tempX;
        player.y = tempY;
    } else {
        e.hp -= player.attack;
        enemies.purgeDead(state);
    }
    // player bounds
    player = Object.assign(player, u.setBounds(state, player));
};
 
let autoHeal = (state) => {
    let player = state.player;
    // player auto heal
    if (player.autoHeal) {
        player.autoHealTicks += 1;
        if (player.autoHealTicks >= player.autoHealEvery) {
            player.hp += player.autoHeal;
            player.hp = player.hp > player.hpMax ? player.hpMax : player.hp;
            player.autoHealTicks = 0;
        }
    }
};
 
exports.update = (state, tempX, tempY) => {
    moveOrAttack(state, tempX, tempY);
    autoHeal(state);
};
```

## 6 - The input handler method

I will need a way to process input from that standard input which will be the way that this game will be played. In the main game.js file there will be some code that will fire each time a key is pressed in the command line. Here I have my input.js file that returns one method that will be used in the event hander that will fire for key presses in the main game.js file that I will be getting to shortly.

```js
let playerMod = require('./player.js'),
enemies = require('./enemies.js');
 
module.exports = (state, input, opt) => {
    let player = state.player,
    tempX = player.x,
    tempY = player.y;
    if (input === 'd') {
        tempX += 1;
    }
    if (input === 'a') {
        tempX -= 1;
    }
    if (input === 'w') {
        tempY -= 1;
    }
    if (input === 's') {
        tempY += 1;
    }
    if (input === 'x') {
        process.exit();
    }
    // update player, and enemies
    playerMod.update(state, tempX, tempY);
    enemies.spawnEnemy(state);
    enemies.updateEnemies(state);
    // events
    if (player.hp === 0) {
        opt.onPlayerDead(state);
    }
    opt.onTurnOver(state);
};
```

## 7 - The draw module

Here I have the draw module that will be used to draw the current state of the state object to the command line using ANSI escape codes. There are two public methods, one of which will be called once during certain events to start all over, and then another that will be called to update that state rather than drawing the whole screen all over again. I have come to find that I need to do something like this so that there is not this screen flashing effect going on for each move.

```js

```

## 8 - The main game.js file at root

Now for the main game.js file that is called to get things started.

```js
let draw = require('./lib/draw.js'),
stateMod = require('./lib/state.js'),
inputHandler = require('./lib/input.js');
 
stateMod.loadState()
.then((state) => {
    //set in raw mode and capture key strokes
    process.stdin.setRawMode(true);
    // for each data event from the standard input
    process.stdin.on('data', (data) => {
        // use the input handler
        inputHandler(state, data.toString().trim(), {
            onPlayerDead: (state) => {
                let player = state.player;
                if (player.hp === 0) {
                    let newState = stateMod.newState();
                    state = Object.assign(state, newState);
                    draw.newScreen(state);
                }
            },
            onTurnOver: (state) => {
                draw.updateScreen(state);
                stateMod.saveState(state);
            }
        });
    });
    draw.newScreen(state);
});
```