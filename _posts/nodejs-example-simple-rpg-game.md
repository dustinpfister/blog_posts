---
title: A simple nodejs powered RPG game
date: 2020-03-13 14:07:00
tags: [node.js]
layout: post
categories: node.js
id: 627
updated: 2021-03-15 16:25:35
version: 1.22
---

I have been wanting to get around to making a simple terminal based [RPG style game](https://en.wikipedia.org/wiki/Role-playing_video_game) with nodejs, and write about it as one of several [nodejs example](https://nodejs.org/api/synopsis.html) posts. So I finally got around to doing just that. The basic idea that I had in mind was just a simple turn based terminal RPG game that uses [ANSI escape codes](/2019/09/19/nodejs-ansi-escape-codes/) to draw the state of the game board. Nothing special in terms of item drops, enemy types, spells, and even leveling up as I want to keep this one pretty simple.

No name for this as of yet, I am horrible with names anyway, for not I will just call it simple RPG game. In time this example might server as a starting point for other more interesting projects, so I will want to try to keep everything neat and clean if I can.

<!-- more -->

## 1 - What to know about this simple RPG nodejs example before continuing

I am writing about the state of this nodejs example of a rpg game that I have worked out in a day or so. To understand what I am writing about I assume that you have some background with javaScript and node.js, if not you might have a hard time understanding some of this stuff.

If you are just interesting in playing the game you could clone it down from the repo on my git hub account and just call the main game.js file with nodejs in the command line.

## 2 - The utility library

I will want to have a custom trailered utility library with a bunch of methods that I will be using in at least one if not more other modules. Something like lodash only with methods that I will be using just for this project alone. So with this kind of project I will want things like a distance formula, as well as just about any other kind of method that will help with typical tasks.


### 2.1 - The distance formula

So I know that I will want a distance formula for this project. So I start off my utility module by making sure I am exporting that one for starters.

```js
// distance between two points
exports.distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 2.2 - get a new position for a display object with a given direction number (0-3)

I also ended up working out a method that will return a new position for a display object given a direction number in the range of zero to three.

```js
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
```

### 2.3 - Get a direction number (0-3) from a display object to another display object

I will want a method that can be used to find out what direction number a display object should move in oder to get to another display object. 

```js
// get a direction number (0 - 3) from one object to another
exports.getDirFromObjToObj = (obj1, obj2) => {
    let r = Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x) + Math.PI,
    per = r / (Math.PI * 2),
    dir = Math.floor(4 * per) % 4;
    return dir;
};
```

### 2.4 - Set bounds for a display object

There is a utility method for setting the boundaries for a display object.

```js
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

### 2.5 - isOverPlayer, get, and isOverNothing

I then also have methods for getting any display object that might be at a location or nothing if the location is empty.

```js
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
let u = require('./utils.js');
 
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
    let e2 = u.get(state, pos.oldX, pos.oldY, 'enemies');
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
        let e2 = u.get(state, e.oldX, e.oldY, 'enemies');
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

Now for the main game.js file that is called to get things started. Here I am suing my state module to load a game state file of there is one at the current working folder when the game starts. If not a new state and file is created.

The standard input is set to raw mode and I attach an event hander for the data event of the standard input via the process global. In the event hander for the data event I am using the input hander method in input.js that will handing the standard input, as well as fire some additional methods that i define here for when the player dies, and when a turn is over.

```js
#!/usr/bin/env node
 
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

## 9 - Conclusion

I had a general idea of what I wanted when I started working on this, and that is what this turned out to be. Of course there are all kinds of ideas that come to mind when it comes to continuing to work on this project, but I think that much of what that is should be a canvas game rather than a command line interface only type thing. However maybe it is not such a bad idea to keep working on this as a way to work out the core of what the logic is of a game itself.
