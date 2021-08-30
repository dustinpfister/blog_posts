---
title: Kaboom game clone for the Atari 2600 canvas example 
date: 2020-04-10 19:49:00
tags: [canvas]
layout: post
categories: canvas
id: 644
updated: 2021-08-30 13:04:07
version: 1.25
---

Time for yet another one of my [canvas example](/2020/03/23/canvas-example/) posts, this time I thought I would make a canvas example that is a clone of the [classic video game called kaboom](https://en.wikipedia.org/wiki/Kaboom!_%28video_game%29) that was ported to systems like the Atari 2600. This is a game that involves a character at the top of the screen called the mad bomber that moves back and forth across the the screen dropping bombs. The object of the game then is to catch these bombs rather than avoid them with a player controlled bucket that moves from one side to another. If one of the bombs is missed then all the bombs on the screen blow up, and you loose a bucket. You keep playing until you loose all you buckets and like many of these classic games the object is all about just getting a hight score and that is about it.

The nice thing about cloning some of these other games is that doing so if often fairly simple in a modern javaScript environment. Back in the 1970s it was way hard to make games like these, but now I can often slap a working prototype of many of these games together in a single day often. In addition even with very simple games such as this there is much room for originality, not just when it comes to skinning the game, but the logic also. For example there is working out how many levels there should be until the player hits the max level, how many points a bomb is worth, and many other little details such as the rate at which bombs are dropped. 

So it can be fun, and interesting to clone a game like this, and play around with all the little details.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-kaboom-clone/0.0.0/pkg.js"></script>

## 1 - The utils library for this kaboom clone canvas example

I often start off many of my canvas example posts with a custom utility module that is used for this canvas example alone. Some times I might have reusable methods that are for this project alone as it grows, but often it is just a collection of usual suspects. 

When it comes to this kaboom clone I know that I am going to want bounding box collision detection, the distance formula, and my usual method that helps me get a canvas relative pointer position. So the module is just composed of those methods for now.

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

Any kind of method that I might use across two or more modules should be parked here.

## 2 - The kaboom module

Now that I have the utils module that I want it is time to get into the kaboom module. This module will be used to store the state of all kinds of values that have to do with the game logic. It is packed with all kinds of private helper methods and objects, but only provides a few public methods and properties that are used by additional modules outside of it when it comes to my draw module, and the main.js file that I will be getting to later in this post.

### 2.1 - The beginning of the kaboom.js module and some objects for the BOMBER and PLAYER

I start out the module with the start of an IIFE that will then be closed at the bottom of the module. If you are not familiar with this kind of module pattern yet now might be the time to look into it deeper.

At the very top I have some Objects that I am using for certain fixed properties for the bomber and player objects as well as some button objects.

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
```

### 2.2 - The LEVELS Object

Here I have some javaScript code that will generate an Object of Objects for each level in the game. This is one area where I find myself tweaking values all the time. Each level Object contains properties such as the Pixels per second speed of the bomber and the bombs that are dropped by the bomber.

```js
    var LEVELS = {};
    var i = 1,
    totalLevels = 10,
    per;
    while (i <= totalLevels) {
        per = (i - 1) / (totalLevels - 1);
        LEVELS[i] = {
            bombPPS: 64 + 236 * per,
            bombCount: 10 + 90 * per,
            bomber: {
                pps: 32 + 850 * per,
                changeRate: 0.5 - 0.3 * per,
                dropRate: 1 / (Math.floor(5 * per) + 1)
            }
        };
        i += 1;
    }
```

### 2.3 - Clamp an Object

This is a little helper method that I have made that helps to clamp and object such as the bomber object to the limits of the range of movement. In this kind of game the bomber object and the player object are fixed to a single axis so i only need to clamp them to that axis.

```js
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
```

### 2.4 - Movement methods

When it comes to display objects or sprites if you prefer for kaboom there us the bomber, the player, and then the bombs. Each of these display objects have there own movement helpers because of the differences in how they move, and how they are controlled.

```js
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
        // mouse
        if (inputPos.down) {
            if (x < player.x) {
                player.dir = dir * -1;
            }
            if (x > player.x) {
                player.dir = dir;
            }
        }
        // keyboard
        if (player.inputKeys.a) {
            player.dir = -1;
        }
        if (player.inputKeys.d) {
            player.dir = 1;
        }
        // AI Control
        if (player.inputAI) {
            var bomb = state.bombs[0];
            if (bomb) {
                var d = utils.distance(player.x + 16, PLAYER.y, bomb.x, PLAYER.y);
                dir = d < hw ? d / hw : 1;
                if (bomb.x < player.x + 16) {
                    player.dir = dir * -1;
                }
                if (bomb.x > player.x + 16) {
                    player.dir = dir;
                }
            }
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
```

When it comes to my move player helper method I worked out an AI control feature. The AI is a very crude yet effective way of going about simulating machine assisted input for this game, and for the nature of the game doing so is not so hard to work out.

### 2.5 - Some methods to use with bomb objects

There will be a need for some methods that are used to spawn bomb objects, as well as find out if a bomb has hot the player or reached the other side of the canvas matrix.

```js
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
```

### 2.6 - Level check and game over check helpers

Some methods for checking if the level is over, and if the player has lost.

```js
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
```

### 2.7 - Create state, and set level

Here I have the methods that are used to create a new state object, as well as set the state object to a given level.

```js
    // create a new state
    var createState = function (level) {
        level = level || 1;
        var state = {
            lt: new Date(),
            //pause: false,
            gameOver: false,
            pauseTime: 3,
            pauseMessage: '',
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
                    y: 0,
                    down: false
                },
                inputKeys: {
                    a: false,
                    b: false
                },
                inputAI: false,
                hp: 3,
                dir: -1,
                pps: 900
            }
        };
        setLevel(state, level);
        state.pauseMessage = 'level: ' + state.level;
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
        state.pauseTime = 1;
        state.bomber.dropTime = 0;
        state.bomber.changeTime = 0;
        state.pauseMessage = 'level: ' + state.level;
    };
```

### 2.8 - The public API and the end of the module

The Public API is just an Object literal that will be used to return a collection of methods and references to certain other things of interest in this module that I think should be public.

There is of course the create state method that I will wan to make public so that I can create a state of the kaboom module from a main.js file. That state object can then be passed to other public methods that act on such a state object. Mainly the pointer start method, and the update method.

```
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

## 3 - The draw module for the kaboom clone canvas example

The kaboom.js file is just for the state of the game, but not drawing the current state of the game. I have been working with javaScript and canvas long enough to know that it is important to separate the state of a game away from logic that is used to render the state of it by one way or another. So that is where the draw.js module for this canvas example comes into play.

```js
var draw = {};
 
// draw background
draw.back = function (ctx, canvas) {
    // draw background
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, kaboom.BOMBER.y, canvas.width, canvas.height - kaboom.BOMBER.y);
};
 
// draw bomber
draw.bomber = function (ctx, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(state.bomber.x, kaboom.BOMBER.y - 64, kaboom.BOMBER.w, 64);
};
// draw bombs
draw.bombs = function (ctx, state) {
    var i = state.bombs.length,
    bomb;
    ctx.fillStyle = 'red';
    while (i--) {
        bomb = state.bombs[i];
        ctx.fillRect(bomb.x, bomb.y, 32, 32);
    }
};
 
// draw player
draw.player = function (ctx, state) {
    ctx.fillStyle = 'lime';
    ctx.fillRect(state.player.x, kaboom.PLAYER.y, kaboom.PLAYER.w, kaboom.PLAYER.h);
};
 
// draw score
draw.score = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(state.score, 320, 20);
};
 
draw.ui = function (ctx, state) {
    var button = kaboom.BUTTON_PAUSE;
    ctx.fillStyle = 'white';
    ctx.fillRect(button.x, button.y, button.w, button.h);
    if (state.gameOver) {
        button = kaboom.BUTTON_NEW_GAME;
        ctx.fillStyle = 'white';
        ctx.fillRect(button.x, button.y, button.w, button.h);
    }
};
 
// draw pause overlay
draw.pauseOverlay = function (ctx, canvas, state) {
    if (state.pauseTime > 0 || state.pauseTime === -1) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText(state.pauseMessage, canvas.width / 2, 200);
    }
};
 
// draw debug info
draw.debug = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('level: ' + state.level, 10, 10);
    ctx.fillText('bombCount: ' + state.bombCount, 10, 20);
    ctx.fillText('bomber: { x: ' + state.bomber.x +
        ', dir: ' + state.bomber.dir +
        ', pps: ' + state.bomber.pps + ' }', 10, 30);
    ctx.fillText('player: { x: ' + state.player.x +
        ', hp: ' + state.player.hp +
        ', dir: ' + state.player.dir +
        ', inputAI: ' + state.player.inputAI +
        ', pps: ' + state.player.pps + ' }', 10, 40);
};
```

## 4 - The main.js file and index.html

I have a utils.js, kaboom.js, and draw.js file out of the way so now it is time to pull all this together with a main.js file and some html. In this main.js file I will be creating and injecting the canvas element into the html pages that I will be using. Here in the main.js file I will also be attaching event handlers for the game that will be used to control the player buckets.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;
 
var state = kaboom.createState(1);
 
canvas.addEventListener('mousedown', function (e) {
    state.player.inputPos.down = true;
    kaboom.pointerStart(state, e);
});
canvas.addEventListener('mousemove', function (e) {
    e.preventDefault();
    var pos = utils.getCanvasRelative(e),
    player = state.player;
    player.inputPos.x = pos.x;
    player.inputPos.y = pos.y;
});
canvas.addEventListener('mouseup', function (e) {
    state.player.inputPos.down = false;
});
 
window.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase(),
    player = state.player;
    player.inputKeys[key] = true;
    if (key === 'i') {
        player.inputAI = !player.inputAI;
    }
});
 
window.addEventListener('keyup', function (e) {
    var key = e.key.toLowerCase(),
    player = state.player;
    player.inputKeys[key] = false;
});
 
var loop = function () {
    requestAnimationFrame(loop);
    kaboom.update(state);
    draw.back(ctx, canvas);
    draw.bomber(ctx, state);
    draw.bombs(ctx, state);
    draw.player(ctx, state);
    draw.score(ctx, state);
    draw.ui(ctx, state);
    draw.pauseOverlay(ctx, canvas, state);
    draw.debug(ctx, state);
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas example kaboom</title>
    </head>
    <body style="margin:0px;">
        <div id="gamearea"></div>
        <script src="utils.js"></script>
        <script src="kaboom.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 5 - Conclusion and future ideas

So this canvas example was a lot of fun to work on, and so far I have to say that this canvas example might be one of the best candidates so far when it comes to working on it more to turn it into something that might be considered and actual project of some kind. There are of course many other such [canvas examples](/2020/03/23/canvas-example/) that are also competing for my attention so this one might still end up being left stuck where it is.