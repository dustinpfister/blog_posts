---
title: A simple nodejs powered RPG game
date: 2020-03-13 14:07:00
tags: [node.js]
layout: post
categories: node.js
id: 627
updated: 2020-03-15 17:27:40
version: 1.4
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
```

If I take the time to continue to develop this nodejs example into a more complex game, this library will of course expand. Generally any kind of methods that will be used in more than one other library should be parked here.

## 3 - The state object module

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

```js
let u = require('./utils.js');
 
const ENEMIES_MAX = 6,
ENEMIES_SPAWN_MIN = 5,
ENEMIES_ATTACK_RANGE = 1;
 
let isOverPlayer = (state, x, y) => {
    return x === state.player.x && y === state.player.y;
};
 
let isOverNothing = (state, x, y) => {
    return !isOverPlayer(state, x, y) && !getEnemy(state, x, y);
};
 
// get the direction to the player with the given state object
// and enemy object or index in state object
let getDirToPlayer = exports.getDirToPlayer = (state, eIndex) => {
    let e = typeof eIndex === 'object' ? eIndex : state.enemies[eIndex],
    player = state.player,
    r = Math.atan2(e.y - player.y, e.x - player.x) + Math.PI,
    per = r / (Math.PI * 2),
    dir = Math.floor(4 * per) % 4;
    return dir;
};
 
// check if an enemy is at the given pos
// return false if nothing is there
// or a reference to the enemy object if there
// is one
let getEnemy = exports.getEnemy = (state, x, y) => {
    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i];
        if (e.x === x && e.y === y) {
            return e;
        }
    }
    return false;
};
 
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
        //let playerOver = x === state.player.x && y === state.player.y;
        if (state.enemies.length < ENEMIES_MAX && !isOverPlayer(state, x, y)) {
            let e = getEnemy(state, x, y);
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
    return u.dirToPos(e, getDirToPlayer(state, e));
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
        if (isOverNothing(state, pos.x, pos.y)) {
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

```js
let u = require('./utils.js'),
enemies = require('./enemies.js');
 
let moveOrAttack = (state, tempX, tempY) => {
    // move or attack enemy
    let e = enemies.getEnemy(state, tempX, tempY),
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

```js
let enemyMod = require('./enemies.js');
 
let setCur = (x, y, out) => {
    x = x || 0;
    y = y || 0;
    out.write('\u001b[' + y + ';' + x + 'H');
}

let clearScreen = (out) => {
    out.write('\u001b[2J');
}
let colorsSet = (out) => {
    out.write('\u001b[47m');
    out.write('\u001b[30m');
};
let colorsDefault = (out) => {
    out.write('\u001b[39m\u001b[49m');
};

let drawPlayerStats = function (state, out) {
    let p = state.player,
    text = 'hp: ' + p.hp + '/' + p.hpMax +
        ', exp: ' + p.exp;
    setCur(1, state.h + 1, out);
    out.write(new Array(state.w).fill(' ').join(''));
    setCur(1, state.h + 1, out);
    out.write(text);
};
 
let drawDotMap = function (state, out) {
    let dotLine = new Array(state.w).fill('.').join('') + '\n',
    i = state.h;
    while (i--) {
        out.write(dotLine);
    }
};

let drawPlayer = function (state, out) {
    let pos = state.player;
    setCur(pos.oldX, pos.oldY, out);
    let e2 = enemyMod.getEnemy(state, pos.oldX, pos.oldY);
    out.write(e2 ? 'E' : '.');
    setCur(pos.x, pos.y, out);
    out.write('@');
};
 
let drawEnemies = function (state, out) {
    let enemies = state.enemies,
    i = enemies.length;
    while (i--) {
        let e = enemies[i];
        setCur(e.oldX, e.oldY, out);
        let e2 = enemyMod.getEnemy(state, e.oldX, e.oldY);
        out.write(e2 ? 'E' : '.');
        setCur(e.x, e.y, out);
        out.write('E');
    }
};
 
let updateScreen = exports.updateScreen = (state, out) => {
    out = out || process.stdout;
    colorsSet(out);
    // draw enemies and player
    drawEnemies(state, out);
    drawPlayer(state, out);
    drawPlayerStats(state, out);
    // set default colors and set cursor to the bottom
    colorsDefault(out);
    setCur(0, state.h + 2, out);
};
 
exports.newScreen = (state, out) => {
    out = out || process.stdout;
    // draw a dot map for the whole render area
    clearScreen(out);
    setCur(1, 1, out);
    colorsSet(out);
    drawDotMap(state, out);
    // first update
    updateScreen(state, out);
};
```

## 8 - The main game.js file at root

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