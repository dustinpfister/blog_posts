---
title: Kaboom game clone for the Atari 2600 canvas example 
date: 2020-04-10 19:49:00
tags: [canvas]
layout: post
categories: canvas
id: 644
updated: 2020-04-12 08:48:29
version: 1.3
---

TIme for yet another one of my [canvas example](/2020/03/23/canvas-example/) posts, this time I thought I would make a canvas example that is a clone of the classic game kaboom that was ported to systems like the Atari 2600.


<!-- more -->

## 1 - utils

```js
var utils = {}
// bounding box
utils.bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};
 
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        w: 1,
        h: 1,
        bx: bx
    };
};
```

## 2 - The kaboom module

```js
var kaboom = (function () {
 
    var BOMBER = {
        y: 100,
        w: 32
    },
    PLAYER = {
        y: 350,
        w: 64,
        h: 64
    },
    BUTTON_PAUSE = {
        x: 16,
        y: 432,
        w: 128,
        h: 32
    },
    BUTTON_NEW_GAME = {
        x: 320 - 64,
        y: 240 - 16,
        w: 128,
        h: 32
    };
 
    var LEVELS = {};
    var i = 1,
    per;
    while (i <= 7) {
        per = (i - 1) / 6;
        LEVELS[i] = {
            bombPPS: 64 + 300 * per,
            bombCount: 10 + 90 * per,
            bomber: {
                pps: 32 + 900 * per,
                changeRate: 0.5 - 0.3 * per,
                dropRate: 1 / (Math.floor(5 * per) + 1)
            }
        };
        i += 1;
    }
 
    // clamp boundaries for the given objState and objConstant
    // (state.bomber, BOMBER and state.player, PLAYER)
    var clampBoundaries = function (objState, objConst) {
        if (objState.x > 640 - objConst.w) {
            objState.x = 640 - objConst.w;
        }
        if (objState.x < 0) {
            objState.x = 0;
        }
    };
 
    // move the bomber
    var moveBomber = function (state, secs) {
        var bomber = state.bomber;
        // move bomber by secs and bomber dir property
        bomber.x += Math.floor(bomber.pps * secs * bomber.dir);
        // boundaries
        clampBoundaries(bomber, BOMBER);
        // update direction
        bomber.changeTime += secs;
        if (bomber.changeTime >= bomber.changeRate) {
            bomber.dir = 1 - Math.floor(Math.random() * 3);
            bomber.changeTime %= bomber.changeRate;
        }
    };
 
    // move the player
    var movePlayer = function (state, secs) {
        var player = state.player,
        inputPos = player.inputPos,
        hw = PLAYER.w / 2,
        x = inputPos.x - hw;
        player.dir = 0;
        var d = utils.distance(player.x, PLAYER.y, x, PLAYER.y);
        dir = d < hw ? d / hw : 1;
        if (x < player.x) {
            player.dir = dir * -1;
        }
        if (x > player.x) {
            player.dir = dir;
        }
        player.x += Math.floor(player.pps * secs * player.dir);
        clampBoundaries(player, PLAYER);
    };
 
    // move a bomb object
    var moveBomb = function (bomb, secs) {
        // move bomb
        bomb.y += bomb.pps * secs;
        if (bomb.y > 480) {
            bomb.y = 480;
        }
    };
 
    // drop bombs helper
    var dropBombs = function (state, secs) {
        var bomber = state.bomber;
        bomber.dropTime += secs;
        if (bomber.dropTime >= bomber.dropRate) {
            if (state.bombCount > 0) {
                state.bombs.push({
                    x: bomber.x,
                    y: BOMBER.y,
                    w: 32,
                    h: 32,
                    pps: state.bombPPS
                });
            }
            state.bombCount -= 1;
            state.bombCount = state.bombCount < 0 ? 0 : state.bombCount;
            bomber.dropTime %= bomber.dropRate
        }
    };
 
    // if a bomb hits the player
    var bombHit = function (state, bombIndex) {
        var bomb = state.bombs[bombIndex],
        player = state.player;
        if (bomb) {
            if (utils.bb({
                    x: player.x,
                    y: PLAYER.y,
                    w: PLAYER.w,
                    h: PLAYER.h
                }, bomb)) {
                state.score += 1 * state.level;
                state.bombs.splice(bombIndex, 1);
            }
        }
    };
 
    // a bomb has reached the other side
    var bombOut = function (state, bombIndex) {
        var bomb = state.bombs[bombIndex],
        player = state.player;
        if (bomb) {
            if (bomb.y === 480) {
                player.hp -= 1;
                player.hp = player.hp < 0 ? 0 : player.hp;
                state.bombs = [];
            }
        }
    };
 
    var levelOverCheck = function (state) {
        if (state.bombCount === 0 && state.bombs.length === 0) {
            setLevel(state, state.level += 1);
        }
    };
 
    var gameOverCheck = function (state) {
        if (state.player.hp === 0) {
            state.gameOver = true;
        }
    };
 
    // create a new state
    var createState = function (level) {
        level = level || 1;
        var state = {
            lt: new Date(),
            //pause: false,
            gameOver: false,
            pauseTime: 1,
            pauseMessage: 'paused',
            score: 0,
            level: level,
            bomber: {
                x: 320,
                dir: 1,
                pps: 0,
                changeTime: 0,
                changeRate: 0.5,
                dropTime: 0,
                dropRate: 1
            },
            bombPPS: 0,
            bombCount: 0,
            bombs: [],
            player: {
                x: 320,
                inputPos: {
                    x: 320,
                    y: 0
                },
                hp: 3,
                dir: -1,
                pps: 1024
            }
        };
        setLevel(state, level);
        return state;
    };
 
    // set the values for the current level / level change
    var setLevel = function (state, level) {
        var maxLevel = Object.keys(LEVELS).length;
        state.level = level === undefined ? state.level : level;
        state.level = state.level > maxLevel ? maxLevel : state.level;
        levelObj = LEVELS[state.level];
        state.bomber.pps = levelObj.bomber.pps;
        state.bomber.changeRate = levelObj.bomber.changeRate;
        state.bomber.dropRate = levelObj.bomber.dropRate;
        state.bombPPS = levelObj.bombPPS;
        state.bombCount = levelObj.bombCount;
    };
 
    var api = {
 
        LEVELS: LEVELS,
        BOMBER: BOMBER,
        PLAYER: PLAYER,
        BUTTON_PAUSE: BUTTON_PAUSE,
        BUTTON_NEW_GAME: BUTTON_NEW_GAME,
 
        createState: createState,
 
        pointerStart: function (state, e) {
            var pos = utils.getCanvasRelative(e);
            e.preventDefault();
            if (!state.gameOver && utils.bb(pos, BUTTON_PAUSE)) {
                if (state.pauseTime === -1) {
                    state.pauseTime = 0;
                    return;
                }
                if (state.pauseTime === 0) {
                    state.pauseTime = -1;
                    state.pauseMessage = 'paused';
                    return;
                }
            }
            if (state.gameOver && utils.bb(pos, BUTTON_NEW_GAME)) {
                Object.assign(state, createState(1));
            }
        },
 
        update: function (state) {
            var now = new Date(),
            t = now - state.lt,
            secs = t / 1000,
            bomber = state.bomber;
            // if game over
            if (state.gameOver) {
                state.pauseTime = -1;
                state.pauseMessage = 'Game Over';
            }
            // if pauseTime set lt to now and return out of function
            if (state.pauseTime === -1 || state.pauseTime > 0) {
                state.lt = now;
                if (state.pauseTime > 0) {
                    state.pauseTime -= secs;
                    state.pauseTime = state.pauseTime < 0 ? 0 : state.pauseTime;
                }
                return;
            }
            // movement
            moveBomber(state, secs);
            movePlayer(state, secs);
            // drop bombs
            dropBombs(state, secs);
            // update bombs
            var i = state.bombs.length,
            player = state.player,
            bomb;
            while (i--) {
                bomb = state.bombs[i];
                // move
                moveBomb(bomb, secs);
                // hit player, and bomb is out
                bombHit(state, i);
                bombOut(state, i);
            }
            // level over check
            levelOverCheck(state);
            gameOverCheck(state);
            state.lt = now;
        }
 
    };
 
    return api;
 
}
    ());
```

## 3 - draw

## 4 - main
