---
title: Turret defense canvas example just the basic idea
date: 2020-01-10 18:04:00
tags: [canvas]
categories: canvas
layout: post
id: 590
updated: 2021-03-23 15:12:28
version: 1.28
---

Todays post will be on yet another [canvas example](/2020/03/23/canvas-example/), this time a [gun turret](https://en.wikipedia.org/wiki/Gun_turret) defense style game that will be just a turret at the center of the canvas that shoots at enemies coming in from all directions. There are a number of web based games that have come out over the years that involve a single player controlled turret, rather than a whole bunch of turrets all over the canvas and enemies that follow a path. In any case much of the basic logic is the same when it comes to using Math.atan2 to get an angle from one point to another and so forth. So the skills that are acquired here can be applied to just about any other kind of game that involves something to this effect.

As of this writing this canvas example is in need of a full work over as I am not doing a long of things the way that i would do them now. One thing I would do differently is take logic that has to do with an object pool and pull it out of the main gam.js file that I was using in this example. Also there is much that I would want to change when it comes to turning this into something that is an actual game, rather than something that plays on its own.

This example will make used of a lot of different methods some of which have to do with many concerns surrounding angles. So it will involve creating a utility module of sorts with methods that can be used for things like finding the distance between two points as well as the angular distance between two angles. Once that module is covered I will then be getting into the main game module, and then finally the module that is used to render the sate of this game to the canvas.

For now it will just be a game that plays itself, but if I get some more time to work on this one in the future I might get around to building something around it for real. The main thing I had in mind here was to just get the basic idea up and running and that is it.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/turret-defense/0.0.0/pkg.js"></script>

## 1 - The utility module of this canvas example of a turret defense game

So to start off with lets take a look the the custom utility module that I made for this canvas example. Here I have many methods for working with angles mostly, but it is still a general utility module of sorts that will be used in the game module that I will be going over in the next section.

### 1.1 - The mathematical modulo method and the start of the module

Here I have the mathematical module method. This is something that I covered in another post way back when it comes to something that is wrong with the built in javaScript module operator and how some might expect modulo to work.

```js
var u = {
    defaultAngleScale: Math.PI * 2
};
 
// mathematical modulo
u.mod = function (x, m) {
    return (x % m + m) % m;
};
```

### 1.2 - Normalize half

This can be used to normalize and angle to half.

```js
u.normalizeHalf = function (n, scale) {
    var c = scale || u.defaultAngleScale,
    h = c / 2;
    return u.mod(n + h, c) - h;
};
```

### 1.3 - The distance formula

I am going to want a method that can be used to find the distance between two points for the sake of collision detection.

```js
// distance
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.4 - The angle distance method

This is like the other distance formal only instead of getting the distance between two points, I am getting the distance between two angles.

```js
// the angular distance between two angles
u.angleDistance = function (a, b, scale) {
    var m = scale || u.defaultAngleScale,
    h = m / 2,
    diff = u.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};
```

### 1.5 - Get an angle to a point

Here I have a method where I am using atan2 to get an angle from one point to another.

```js
// get the angle from one point to another
u.getAngleToPoint = function (pt1, pt2) {
    return u.normalizeHalf(Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x));
};
```

### 1.6 - Get shortest direction

I will also want a method that will return -1, 1, or 0 depending on which way an object needs to rotate to face another object.

```js
// get -1, 1, or 0 depending on the the state of two angles
u.shortestAngleDirection = function (a1, a2) {
    var z = a1 - a2,
    x = u.normalizeHalf(z);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};
```

### 1.7 - Create a canvas element

I now make all of my canvas examples have this one standard utility function at least. It helps me to just quickly create and return a canvas element with everything set up just the way that I like it.

```js
u.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
```

## 2 - The game module

Now that I have my utility library together it is time to use them in my game module that will hold all the game business logic for this canvas example of a turret defense type game.

### 2.1 - The start of the module and the hold shots method

I start off the module with an IIFE, and then at the top of the module I have my hold shots helper method.

```js
var td = (function () {
 
    // SHOTS
 
    // hold shots
    var holdShots = function (game) {
        game.shots.forEach(function (shot) {
            if (!(shot.sx === shot.x && shot.sy === shot.y)) {
                shot.lifeSpanAjust = (new Date() - shot.shotTime) / 1000 * -1;
                shot.sx = shot.x;
                shot.sy = shot.y;
            }
            shot.shotTime = new Date();
        });
    };
```

### 2.2 - The spawn shots method

So I will want a method that will spawn shots into a shots array. The idea here is to have a method that is called from a main update method that is passed a game object and then a secs value that is the amount of time that has passed from the last frame tick. A shot time property of the game object is steeped with the secs value, and then the shot time is used with a shot delay property to know the number of shots to fire.

If the number of new shots to fire is greater than or equal to one then new shots are spawned into the shots array up to a certain shots max value.

```js
    // spawn new shots
    var spawnShots = function (game, secs) {
        game.shotTime += secs;
        var newShots = Math.floor(game.shotTime / game.shotDelay);
        if (newShots >= 1) {
            game.shotTime -= newShots * game.shotDelay;
            if (game.shots.length < game.shotsMax) {
                game.shots.push({
                    sx: game.cx,
                    sy: game.cy,
                    x: game.cx,
                    y: game.cy,
                    heading: game.heading,
                    dam: 1,
                    pps: 64,
                    hit: false,
                    lifeSpan: 3,
                    lifeSpanAjust: 0,
                    shotTime: new Date()
                });
            }
        }
    };
```

This is also the method where new shot object are created, a shot object has a starting point and current point, as well as other values such as the current heading of the shot, and the amount of damage it will cause when it hits and enemy. Shots move by a pixel per second rate, and there is also a life span value as well that is used alone with a hit property to know if the shot should be purged or not.

### 2.3 - Purge shots

So now that I have a method that is used to spawn new shots, it makes sense to have a method that will purge theme. There are two reason why a shot would be purged, one would be because its lifespan value shots that is has been around for two long, and the other is the hit boolean that means that it hit something.

```js
    // purge old shots
    var purgeShotCheck = function (game, i) {
        var now = new Date(),
        shot = game.shots[i],
        t = (now - shot.shotTime) / 1000;
        if (t >= shot.lifeSpan + shot.lifeSpanAjust || shot.hit) {
            game.shots.splice(i, 1);
        }
    };
```

### 2.4 - Shot enemy check

This method will check to see if A given shot has hit an enemy in the enemies array of the game object. In the event that a shot has hot an enemy the amount of damage that the shot can cause is subtracted from the enemies hit points value, and the hit property of the shot is set to true. After that the loop is broken for the shot, and nothing else is done, it is up to the purge methods for shots and enemies to remove things from arrays.
```js
    // check to see if a shot has hit an enemy
    var shotEnemyCheck = function (game, shot) {
        var i = game.enemies.length;
        while (i--) {
            var enemy = game.enemies[i];
            if (u.distance(shot.x, shot.y, enemy.x, enemy.y) <= enemy.size) {
                enemy.hp -= shot.dam;
                if (enemy.hp < 0) {
                    enemy.hp = 0;
                }
                shot.hit = true;
                break;
            }
        }
    };
```

### 2.5 - Update shots

So now for methods that update any shots in the game area. The update active shots method loops over all the shots, and moves them by the current heading an pixel per second rate. The shot shot enemy check method is called for the shot, along with the purge shot check method right after.

```js
    // loop over all shots, move them, and make a purge check
    var updateActiveShots = function (game) {
        // update active shots
        var i = game.shots.length,
        now = new Date(),
        shot;
        while (i--) {
            shot = game.shots[i];
            t = (now - shot.shotTime) / 1000;
            shot.x = shot.sx + Math.cos(shot.heading) * t * shot.pps;
            shot.y = shot.sy + Math.sin(shot.heading) * t * shot.pps;
            shotEnemyCheck(game, shot);
            purgeShotCheck(game, i);
        }
    };
 
    // Main update shots helper
    var updateTurretShots = function (game, secs) {
        // if the game is paused
        if (game.paused) {
            holdShots(game);
        } else {
            // the game is not paused
            spawnShots(game, secs)
            updateActiveShots(game);
        }
    };
```

### 2.6 - Spawn enemies

I will need a method for spawning enemies as on top of just shots. For this canvas example I am just spawning shots around the turret at random, and at a set distance. If I where to keep working on this example even more so I would do something different, but this canvas example is all ready getting a little involved, so I am just sticking with something simple for now.

```js
    // ENEMIES
 
    // spawn new enemies
    var spawnEnemies = function (game, secs) {
        // new enemy count
        var nec = Math.floor(game.enemyTime / game.enemyDelay);
        if (!game.paused) {
            game.enemyTime += secs;
            if (nec >= 1) {
                game.enemyTime -= nec * game.enemyDelay;
                if (nec + game.enemies.length > game.enemiesMax) {
                    nec = game.enemiesMax - game.enemies.length;
                }
                var i = nec,
                r,
                x,
                y;
                while (i--) {
                    r = Math.random() * (Math.PI * 2);
                    x = Math.cos(r) * 100 + game.cx;
                    y = Math.sin(r) * 100 + game.cy;
                    game.enemies.push({
                        x: x,
                        y: y,
                        hp: 1,
                        size: 10
                    });
                };
            }
        }
    };
```

For now enemies just have a location, hit point value, and size, they do not move or attack.

### 2.7 - Purge dead enemies

I also worked out a simple method for purging out dead enemies from the enemies array.

```js
    var purgeEnemies = function (game) {
        var i = game.enemies.length;
        while (i--) {
            var enemy = game.enemies[i];
            if (enemy.hp <= 0) {
                game.enemies.splice(i, 1);
            }
        }
    };
```

### 2.8 - Set turret radians per second

The turret moves one way or another by a radian per second value. This method will set that value depending on the location of the enemy in the enemies array with an index of zero, if there is one or more enemies.

```js
    // TURRET
 
    // set turret Radians Per Second based on enemies array
    var setTurretRPS = function (game) {
        game.rps = 0;
        if (game.enemies.length > 0) {
            // just target enemy index 0
            var target = game.enemies[0],
            a = u.getAngleToPoint({
                    x: game.cx,
                    y: game.cy
                }, target),
            d = u.angleDistance(game.heading, a),
            p = 1 - d / Math.PI,
            dir = u.shortestAngleDirection(game.heading, a);
            game.rps = 3 * p * dir;
        };
    };
```

### 2.9 - The public API and the create game object method

Now for the public API that is just a collection of methods that make use of all these other internal methods to create and work with a game object for this canvas example. The first method creates a new game object with all the properties of interest that are used for the example.

```js
    // PUBLIC API
    var api = {};
 
     // the game object
    api.createGameObject = function () {
        return {
            ver: '0.0.0',
            cx: canvas.width / 2,
            cy: canvas.height / 2,
            heading: 0,
            rps: 0, // radians per second
            lt: new Date(), // last time game was updated
            paused: false,
            shots: [],
            shotsMax: 13,
            shotDelay: 1,
            shotTime: 0,
            enemies: [],
            enemiesMax: 3,
            enemyDelay: 1,
            enemyTime: 0
        };
    };
```

### 2.10 - The update method

The next public method is an update method, that will update the state of the game object.

```js
    // update turret method
    api.update = function (game) {
        var now = new Date(),
        secs = (now - game.lt) / 1000;
        if (game.paused) {
            game.lt = now;
        } else {
            game.heading += game.rps * secs;
            game.heading %= Math.PI * 2;
            game.lt = now;
        }
        setTurretRPS(game);
        updateTurretShots(game, secs);
        spawnEnemies(game, secs);
        purgeEnemies(game);
    };
 
    return api;
 
}
    ());
```

## 3 - The draw module

So I have everything worked out when it comes to creating, and updating a game state. However this is a canvas example of course, so now onto the draw methods.

```js
var draw = {};
 
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// draw the turret
draw.turret = function (turret, ctx, canvas) {
    ctx.save();
    ctx.translate(turret.cx, turret.cy);
    ctx.rotate(turret.heading);
    ctx.fillStyle = 'green';
    ctx.fillRect(-8, -8, 16, 16);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 0);
    ctx.stroke();
    ctx.restore();
};
 
draw.turretShots = function (turret, ctx, canvas) {
    ctx.fillStyle = 'blue';
    turret.shots.forEach(function (shot) {
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
};
 
draw.turretInfo = function (turret, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('heading: ' + turret.heading.toFixed(2), 5, 5);
    ctx.fillText('shotTime: ' + turret.shotTime.toFixed(2), 5, 15);
    ctx.fillText('active shots: ' + turret.shots.length, 5, 25);
    ctx.fillText('active enemies: ' + turret.enemies.length, 5, 35);
    ctx.fillText('turret RPS: ' + turret.rps, 5, 45);
};
 
draw.ver = function (turret, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px arial';
    ctx.fillText('v' + turret.ver, 5, canvas.height - 15);
};
 
draw.enemies = function (game, ctx, canvas) {
    ctx.fillStyle = 'red';
    game.enemies.forEach(function (enemy) {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
    });
};
```

## 4 - Main.js and index.html

Now it is just time to pull everything together with a main.js file, and an index.html file.

```js
var canvasObj = u.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
var game = td.createGameObject();
 
// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    td.update(game);
 
    draw.background(ctx, canvas);
    draw.turret(game, ctx, canvas);
    draw.enemies(game, ctx, canvas);
    draw.turretInfo(game, ctx, canvas);
    draw.turretShots(game, ctx, canvas);
    draw.ver(game, ctx, canvas);
};
loop();
 
// focus and blur
canvas.tabIndex = 0;
canvas.addEventListener('focus', function () {
    game.paused = false;
});
canvas.addEventListener('blur', function () {
    game.paused = true;
});
canvas.focus();
canvas.blur();
```


```html
<html>
    <head>
        <title>canvas example turret defense</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="./lib/utils.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 5 - Conclusion

So although I have the basic idea of this canvas example of a turret invasion defense type game working okay, there is much more work I would need to do to get this one to start to feel like an actual game. I am not happy with how this one turned out at least at the time of this writing at least. I think I might need to get around to doing a full redo of the source code from the bottom up actually. After making a lot more canvas examples there are certain things that I think I need to just not do when working out a game module. For example I now have a half way decent object pool module that I keep improving as i use it in various other examples, so I would just use that and pull code that has to do with it out of the game.js module.

In any case working on this was not a total loss, much of what I have together here will still work just find, I just need a little more time to clean up what I did here. The bad news with this one though is that there are many other canvas examples that I have made that I think desire more attention, so I may or may not get back around to this one at some point in the future.
