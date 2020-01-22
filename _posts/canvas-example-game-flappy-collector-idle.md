---
title: A Canvas example of an idle game called flappy collector idle
date: 2020-01-21 18:05:00
tags: [canvas]
categories: canvas
layout: post
id: 594
updated: 2020-01-22 10:01:44
version: 1.3
---

This [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) will be a more advanced version of the [canvas example that I worked out that is a kind of flappy bird clone of sorts](/2020/01/16/canvas-example-game-flappy-collector/). In that post I made a canvas game example that is the basic ide of flappy bird where I just want to have a display object constantly drop down that is countered by the action of a player clicking or tapping the canvas. The canvas example is not a true clone of flappy bird of course, but the basic idea is there.

In this canvas example I am just expanding from that canvas example by making it so the game plays by itself. The player can still play manually if they want to, but after a period of inactivity the game will just play automatically. The direction I was going with this one was to make this canvas example into an idle game of sorts where the player can play manualy, but there is also some kind of automatic action also.

<!-- more -->


## 2 - The game module

```js
var game = (function () {
 
    // BOUNDING BOX
    var bb = function (a, b) {
        return !(
            ((a.y + a.size) < (b.y)) ||
            (a.y > (b.y + b.size)) ||
            ((a.x + a.size) < b.x) ||
            (a.x > (b.x + b.size)));
    };
 
    // BERRIES
 
    // spawn a new berry
    var spawnBerry = function (bird, canvas) {
        var count = bird.berries.length,
        now = new Date(),
        secs = (now - bird.berriesLastSpawn) / 1000;
        if (secs >= bird.berriesDelay) {
            if (count < bird.berriesMax) {
                var yRange = canvas.height - 64,
                l = bird.berryLevel - 1,
                p = (l > 16 ? 16 : l) / 16;
                bird.berries.push({
                    x: canvas.width + 32,
                    y: yRange - Math.random() * yRange,
                    size: 32,
                    pps: 32 + Math.floor(96 * p),
                    worth: 1 + 0.25 * l
                });
            }
            bird.berriesLastSpawn = now;
        }
    };
 
    // update berries
    var updateBerries = function (bird, secs, canvas) {
        var i = bird.berries.length,
        berry;
        while (i--) {
            berry = bird.berries[i];
            berry.x -= berry.pps * secs;
            if (bb(bird, berry)) {
                bird.points += berry.worth;
                bird.berries.splice(i, 1);
                bird.berriesCollected += 1;
            }
            if (berry.x <= berry.size * -1) {
                bird.berries.splice(i, 1);
            }
        }
    };
 
    // set berry next level property
    var berryNextLevelSet = function (bird) {
        var e = Math.floor(Math.log(bird.berriesCollected) / Math.log(2));
        bird.berriesNextLevel = e >= 6 ? Math.pow(2, bird.berryLevel + 5) : 64;
    };
 
    // check and set berry level
    var berryLevelCheck = function (bird) {
        var e = Math.floor(Math.log(bird.berriesCollected) / Math.log(2));
        berryNextLevelSet(bird);
        bird.berryLevel = e >= 6 ? e - 4 : 1;
        berryNextLevelSet(bird);
    };
 
    // set the berries delay based on current berry level
    var setBerriesDelay = function (bird) {
        var l = bird.berryLevel - 1,
        p = (l > 16 ? 16 : l) / 16;
        bird.berriesDelay = 3 - 3.75 * p;
    };
 
    // BIRD
 
    // update bird Pixels per second
    var updateBirdPPS = function (bird, secs) {
        bird.pps = 128 - 256 * bird.flap;
        bird.flap = bird.flap > 0 ? bird.flap - secs * 1 : 0;
    };
 
    // AUTO PLAY MODE
 
    // return true if the bird should flap in order to get
    // the next berry
    var getShouldFlap = function (bird) {
        var berry = bird.berries[0];
        if (berry) {
            return berry.y + 16 < bird.y ? true : false;
        }
        return false;
    };
 
    // public api
    var api = {};
 
    // create and return a new bird ( game object )
    api.newBird = function () {
        return {
            x: 32,
            y: 0,
            size: 32,
            flap: 0,
            pps: 0,
            lt: new Date(),
            // berries
            berries: [],
            berryLevel: 1,
            berriesCollected: 0, // used in level up
            berriesNextLevel: Infinity, // used in level up
            berriesLastSpawn: new Date(),
            berriesDelay: 3,
            berriesMax: 100,
            // points
            points: 0,
            // auto play
            shouldFlap: false,
            autoPlay: true,
            autoTime: 5,
            autoDelay: 5
        };
    };
 
    // update a bird ( game object )
    api.update = function (bird, canvas) {
        var now = new Date(),
        secs = (now - bird.lt) / 1000;
 
        bird.y += bird.pps * secs;
        if (bird.y >= canvas.height - bird.size) {
            bird.y = canvas.height - bird.size;
        }
        if (bird.y < 0) {
            bird.y = 0;
        }
 
        // berries
        updateBerries(bird, secs, canvas);
        spawnBerry(bird, canvas);
        berryNextLevelSet(bird);
        berryLevelCheck(bird);
        setBerriesDelay(bird);
 
        // bird pps
        updateBirdPPS(bird, secs);
 
        // auto play
        bird.shouldFlap = getShouldFlap(bird);
        if (bird.autoPlay && bird.shouldFlap) {
            bird.flap = 1;
        } else {
            bird.autoTime -= secs;
            bird.autoTime = bird.autoTime < 0 ? 0 : bird.autoTime;
            bird.autoPlay = bird.autoTime === 0 ? true : false;
        }
 
        bird.lt = new Date();
    };
 
    // flap a bird
    api.flap = function (bird) {
        //if (bird.autoPlay) {
 
        //}
        bird.autoPlay = false;
        bird.autoTime = bird.autoDelay;
        bird.flap = 1;
    };
 
    return api;
 
}
    ());
```

## 3 - The draw module

```js
// DRAW
var draw = {};
 
// draw the background
draw.background = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// draw the bird
draw.bird = function (bird, ctx) {
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'white';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
    ctx.strokeRect(bird.x, bird.y, bird.size, bird.size);
};
 
// draw info
draw.info = function (bird, ctx) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('points: ' + bird.points, 10, 10);
    ctx.fillText('berry level: ' + bird.berryLevel, 10, 20);
    ctx.fillText('berries collected: ' + bird.berriesCollected + '/' + bird.berriesNextLevel, 10, 30);
    ctx.fillText('berries delay: ' + bird.berriesDelay, 10, 40);
    if (bird.berries.length > 0) {
        berry = bird.berries[0];
        ctx.fillText('berry 0 worth: ' + berry.worth, 10, 50);
        ctx.fillText('berry 0 pps: ' + berry.pps, 10, 60);
    }
};
 
// draw berries
draw.berries = function (bird, ctx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    bird.berries.forEach(function (berry) {
        ctx.fillRect(berry.x, berry.y, berry.size, berry.size);
        ctx.strokeRect(berry.x, berry.y, berry.size, berry.size);
    });
};
 
// autoTime progress bar
draw.autoTimeProgressBar = function (bird, ctx, canvas) {
    var per = bird.autoTime / bird.autoDelay;
    if (bird.autoTime) {
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
        ctx.fillStyle = 'rgba(0,0,255,0.2)';
        ctx.fillRect(0, canvas.height - 10, canvas.width * per, 10);
    }
};
```

## 4 - 

```html
<html>
    <head>
        <title>canvas example game flappy collector idle</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="game.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

```js
// create a canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// Create new Game
var bird = game.newBird();
 
// INPUT
canvas.addEventListener('click', function () {
    game.flap(bird);
});
 
// Main APP Loop
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx);
    draw.berries(bird, ctx);
    draw.bird(bird, ctx);
    draw.info(bird, ctx);
    draw.autoTimeProgressBar(bird, ctx, canvas);
    game.update(bird, canvas);
};
 
loop();
```