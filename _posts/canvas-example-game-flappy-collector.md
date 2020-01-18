---
title: A Canvas game example called flappy collector
date: 2020-01-16 17:39:00
tags: [canvas]
categories: canvas
layout: post
id: 593
updated: 2020-01-18 09:46:17
version: 1.2
---

I want to make more canvas examples, some of which might turn into interesting game prototype projects maybe. Today I though I would make something like flappy bird, only not a total clone that has nothing going on that sets it apart from that. I shall call it flappy collector, until I come up with some better working title.

The same basic idea is there though when it comes to having a display object at the far right side of the canvas and you click or tap the screen to have it jump up a little as it falls down constantly.

<!-- more -->


## 1 - The game module for this canvas example

```js
var game = (function () {
 
    // bounding box
    var bb = function (a, b) {
        return !(
            ((a.y + a.size) < (b.y)) ||
            (a.y > (b.y + b.size)) ||
            ((a.x + a.size) < b.x) ||
            (a.x > (b.x + b.size)));
    };
 
    // spawn a new berry
    var spawnBerry = function (bird, canvas) {
        var count = bird.berries.length,
        now = new Date(),
        secs = (now - bird.berriesLastSpawn) / 1000;
        if (secs >= bird.berriesDelay) {
            if (count < bird.berriesMax) {
                var yRange = canvas.height - 64;
                bird.berries.push({
                    x: canvas.width + 32,
                    y: yRange - Math.random() * yRange,
                    size: 32,
                    pps: 64
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
                bird.points += 1;
                bird.berries.splice(i, 1);
            }
            if (berry.x <= berry.size * -1) {
                bird.berries.splice(i, 1);
            }
        }
    };
 
    // update bird Pixels per second
    var updateBirdPPS = function (bird, secs) {
        bird.pps = 128 - 256 * bird.flap;
        bird.flap = bird.flap > 0 ? bird.flap - 0.9 * secs : 0;
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
            pps: 64,
            lt: new Date(),
            berries: [],
            berriesLastSpawn: new Date(),
            berriesDelay: 1,
            berriesMax: 4,
            points: 0
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
        updateBerries(bird, secs, canvas);
        spawnBerry(bird, canvas);
        updateBirdPPS(bird, secs);
        bird.lt = new Date();
    };
 
    // flap a bird
    api.flap = function (bird) {
        bird.flap = 1;
    };

    return api;
 
}
    ());
```

## 2 - Draw method module

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
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
};
 
// draw info
draw.info = function (bird, ctx) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('points: ' + bird.points, 10, 10);
    ctx.fillText('bird pos: ( ' + Math.floor(bird.x) + ',' + Math.floor(bird.y) + ')', 10, 20);
};
 
// draw berries
draw.berries = function (bird, ctx) {
    ctx.fillStyle = 'red';
    bird.berries.forEach(function (berry) {
        ctx.fillRect(berry.x, berry.y, berry.size, berry.size);
    });
};
```

## 3 - Lets test it out

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
    game.update(bird, canvas);
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas example game flappy collector</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="game.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```