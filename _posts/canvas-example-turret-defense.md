---
title: A Canvas example of a turret defense game
date: 2020-01-10 18:04:00
tags: [canvas]
categories: canvas
layout: post
id: 590
updated: 2020-01-27 10:20:07
version: 1.13
---

Todays post will be on yet another [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), this time a turret defense style game demo type thing that might be fun. This example will make used of a lot of different methods some of which have to do with many concerns surrounding angles. So it will involve creating a utility module of sorts with methods that can be used for things like finding the distance between two points as well as the angular distance between two angles. Once that module is covered I will then be getting into the main game module, and then finally the module that is used to render the sate of this game to the canvas.

<!-- more -->


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

### 2.7 - Purge dead enemies

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

```js
    // PUBLIC API
    // public api
    var api = {};
 
    // the game object
    api.createGameObject = function () {
        return {
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