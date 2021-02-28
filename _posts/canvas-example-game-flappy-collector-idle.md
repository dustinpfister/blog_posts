---
title: A Canvas example of an idle game called flappy collector idle
date: 2020-01-21 18:05:00
tags: [canvas]
categories: canvas
layout: post
id: 594
updated: 2021-02-27 19:45:00
version: 1.27
---

This [canvas example](/2020/03/23/canvas-example/) will be a more advanced version of the [canvas example that I worked out that is a kind of flappy bird clone of sorts](/2020/01/16/canvas-example-game-flappy-collector/). In that post I made a canvas game example that is the basic idea of flappy bird where I just want to have a display object constantly drop down that is countered by the action of a player clicking or tapping the canvas. The canvas example is not a true clone of [flappy bird](https://en.wikipedia.org/wiki/Flappy_Bird) of course, but the basic idea is there and that is all I wanted as a starting point at least.

In this canvas example I am just expanding from that canvas example by making it so the game plays by itself. The player can still play manually if they want to, but after a period of inactivity the game will just play automatically. The direction I was going with this one was to make this canvas example into an idle game of sorts where the player can play manually, but there is also some kind of automatic action also that will kick in when the player just lets the game run.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-flappy-collector-idle/0.0.1/pkg.js"></script>

## 1 - What to know before continuing 

This is a post on a canvas game example, I assume that you have some background on canvas and javaScript in general. As such you are now at a point where you want to start creating more complex projects that at least start to feel like a finished product to some extent.

## 2 - The game module

In this section I will be going over all the code that is contained in a main game.js file. This is the file that is used to create and work with a game state that is then rendered to the canvas with an additional separate module. Many of the methods here are not all that much different from what i worked out in my other post that is a simpler version of this. Other methods are hacked over a little, and some are new.

### 2.1 - The start of the module and bounding box

I start off the module with an IIFE that will contain a bunch of private methods used only in the module, and then return a public api to a global variable that is used outside of the module. The first private method that I have here is a bounding box collision detection method that is not any different from the one that I am using in the other canvas example.

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
```

### 2.2 - The spawn berry method

The method that I use to spawn new berries is a little different from what I worked out before. Here I am not taking into account the current berry level value of the state object, and using that to set the point worth of the berry as well as the speed in pixels per second.

```js
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
```

### 2.3 - The update berries method

Just a very simple change has been made with the update berries method where I am adding points based on the worth of the berry that was collected rather that a static number literal.

```js
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
```

### 2.4 - Set next level and level check methods

In this canvas example I added two new methods that have to do with setting the current berry level.

```js
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
```

### 2.5 - Set the berry delay time

Another new method is one that can be used to set the berry delay time based on the current berry level.

```js
    // set the berries delay based on current berry level
    var setBerriesDelay = function (bird) {
        var l = bird.berryLevel - 1,
        p = (l > 16 ? 16 : l) / 16;
        bird.berriesDelay = 3 - 3.75 * p;
    };
```

### 2.6 - Update bird pps

the update bird pps method is not all the different from before. The one is just a place holder of sorts for what might eventually be a variable that is used to adjust things when it comes to auto play. That is if I continue working on this canvas example rather than others.

```js
    // BIRD
 
    // update bird Pixels per second
    var updateBirdPPS = function (bird, secs) {
        bird.pps = 128 - 256 * bird.flap;
        bird.flap = bird.flap > 0 ? bird.flap - secs * 1 : 0;
    };
```

### 2.7 - The get should flap method

A new feature that is added in this canvas example is an auto play mode. This method is used to just find out if the bird should flap or not when working out a very simple AI for doing just that. That is why a game example like this is great for getting started with AI there is just one action that needs to be preformed, and I just need to work out some basic logic that makes the choice of preforming that action.

```js
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
```

### 2.8 - The start of the public API and the new bird method.

Now it is time to to get to the public API. Here I have the same set of methods as before, but there are now a buncj of changes to make use of the new features.

The new bird method does the same as before, just returns a new bird state object that can then be used with all the other methods that act on such a state object.

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
```

### 2.8 - The update method

The main update method of the game module now checks to see if the berry level should be updated. In addition to this there are also some additional changes that have to do with auto play.

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
```

### 2.8 - The flap method

The flap method is now more than just a method that just sets the flap property to 1, making the method far less pointless.

```js
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

Now that we have the game module out of the way it is time to have a draw module that is used to draw the current state of a bird object to a canvas element.

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

## 4 - The html and main.js file

Now to tie everything together with html and a main.js file. In the html I just have a single container div, and link to the game.js file, draw.js file, and main.js files.

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

In the main.js file I create the canvas element, and create an instance of the game module. For this kind of game I just need to attach a single event handler to the canvas that will call the flap method of the game instance. In the main.js file I also have the main app loop of the program.

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

## 5 - Conclusion

I am generally happy with how this project has come together thus far, and I have to say that this project is one of several canvas examples that I might put more time into. With that said of course there is much more that needs to happen when it comes to making this into an actual project rather that just a simple canvas example for the sake of this post. 
Still the general idea that I had is up and working I just need to get around to adding some more features, skin it, and see about promoting it some how. I do think that if I am going to have some kind of game project on each page of my website which is something I am thing of doing it should be some kind of project like this. That is you can play manually if you want to, but you can also just let the computer play for you actually. I have come to find that those kinds of games are the kinds of games I still like paying because I can let the computer play for me and then I can focus on something else, such as making such a game.