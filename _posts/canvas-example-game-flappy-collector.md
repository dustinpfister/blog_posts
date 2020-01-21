---
title: A Canvas game example called flappy collector
date: 2020-01-16 17:39:00
tags: [canvas]
categories: canvas
layout: post
id: 593
updated: 2020-01-21 11:43:00
version: 1.21
---

I want to make more [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), some of which might turn into interesting game prototype projects maybe. Today I though I would make something like flappy bird, only not a total clone that has nothing going on that sets it apart from that. I shall call it flappy collector, until I come up with some better working title.

The same basic idea is there though when it comes to having a display object at the far right side of the canvas and you click or tap the screen to have it jump up a little as it falls down constantly.

<!-- more -->

## 1 - This is a canvas example post that is a game like flappy bird and what to know before hand

This is a post on a canvas example of a game that is like flappy bird only I tried to find a slightly novel spin on the game. It is not a getting started post on canvas, or javaScript in general, so I assume that you have some background on those topics before hand.

## 2 - The game module for this canvas example

To start out with I made a game module that contains public and private methods that can be used to create a game state, and work with that state. This module follows the pattern of using a Immediately Invoked Function Expression to wrap up everything that is used internally and then return a public API that is used outside of the module.

### 2.1 - The beginning of the game module and a bounding box collision detection helper

To start off my game.js file I just wrote an IIFE to which I will return a public API with the return keyword that will then be stored in a global variable called game. I then started writing some helper methods that will be used internally for this game module, and one thing that I know that I will need for this kind of game is a collision detection method.

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
```

The subject of collision detection can quickly turn into a rabbit hole of sorts, but for this canvas example I am just going to use a method that I find myself copying and pasting from project to project and move on following the mantra of less code and more game. If you would still like to read into collision detection a bit more anyway I do have a post on the subject of [canvas hit regions and collision detection](/2019/12/01/canvas-hit-region/).

### 2.2 - The spawn berry helper

So in this game the object is to just collect berries or not. It is a silly idea sure, but never the less that is the idea that I want a prototype for and that is it. So with that said I am going to need a helper method that will spawn a berry that will or will not be collected by a bird that is controlled by the player.

```js
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
```

### 2.3 - The update berries method

Now that I have a method that will spawn berry objects I will also want a method that will update them.

```js
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
```

### 2.4 - Update bird pixels per second

the rate at which the bird moves is set by a pixels per second value. Over time I have found that this is the best way to go about moving display objects in any kind of real time game.

```
    // update bird Pixels per second
    var updateBirdPPS = function (bird, secs) {
        bird.pps = 128 - 256 * bird.flap;
        bird.flap = bird.flap > 0 ? bird.flap - 0.9 * secs : 0;
    };
```

### 2.5 - Starting the public API and the new bird method

Now that I have all my helper methods it is time to start working out my public API that will be returned to the game global variable that can then be used elsewhere in the canvas example. For this I just created an object literal to which I will append public methods.

```js
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
```

### 2.6 - The main update method

Now I have a main update method that is to be called in the main app loop or state machine.

```js
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
```

### 2.7 - The flap method

A simple flap method that will be called by an even handler outside of the game module.

```js
 
    // flap a bird
    api.flap = function (bird) {
        bird.flap = 1;
    };

    return api;
 
}
    ());
```

## 3 - Draw method module

So I have a game module worked out, and now I need something that can be used to render the state object that the game module is used to create and update.

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

## 4 - Lets test it out

Now for the main index html file and main javaScript file that will tie everything together.

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

## 5 - conclusion

So this canvas example when up and running is just a green box that will fall to the bottom of the canvas and then just stay there at the bottom. That is unless if a player clicks or touches the canvas and as such causes the green box to flap upwards sort of speak. As crude and silly as the canvas example may be, it is all ready starting to feel like a bit of a game, but more is clearly needed in oder to make this something that most people would actually want to play.