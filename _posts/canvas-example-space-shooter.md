---
title: A Canvas Example that is a basic Space Shooter game
date: 2019-08-21 19:41:00
tags: [js, canvas]
layout: post
categories: canvas
id: 527
updated: 2019-11-14 08:30:52
version: 1.30
---

So this post might be the first of several [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), this one will be on a basic space shooter game. This is a project that I threw together in just a few hours, so it is not really a complete game at the time of this writing at least. Still I had some fun with this one, and I might get around to putting more time into the project at some point in the future if this new collection of posts gets some traction.

<!-- more -->

## 1 - The Space Shooter Canvas Example

This canvas example consists of several javaScript files and a single html file. The project seems to work just fine via the file protocol if you do want to get it up and running that way. I also made it so the canvas example does not depend on any external assets in terms of images, or scene data which seems to be the way that I make most of my canvas projects anyway. 

This project is an example of the canvas element in action as well as many other subjects that come up when developing a canvas game with client side javaScript. Many such projects involve the use of a framework such as phaser ce to help save time, but in this post I ma doing everything with native javaScript by itself.

## 2 - The html file

To start off with here is the html file that I have for the canvas example. For this one I am using a hard coded canvas element rather than creating and injecting a canvas element with javaScript. I am also linking to all the extremal javaScript files that I have worked out when it comes to handling display objects, a state machine, events, rendering and a main app loop.

```html
<html>
    <head>
        <title>canvas example space shooter</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="disp.js"></script>
        <script src="states.js"></script>
        <script src="events.js"></script>
        <script src="render.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

If I start to put together a project that is even just a little involved I often like to break things down a lot to keep everything better organized. So now that just the plain old boring HTML is out of the way lets get to the actual fun and interesting javaScript stuff.

## 2 - The Display Object Classes

The first javaScript file disp.js is a file that I worked out for display objects that will be used in this canvas example. A display object is often a sprite or graphic in the canvas that represents some kind of object that is used in the game such as a ship, enemy, power up, or anything to that effect. 

So then in this canvas example display objects are things like this player ship, enemy ships, and shots that are being fired from the player or enemy ships. So these objects have values like x and y that represent the current location of the object in the canvas matrix, but also values like the current heading.

This file is also an example of prototype based inheritance in javaScript, as there is a base class and then additional class that inherit from that base class but have additional properties and methods. So then there is a Base Display object class that creates objects that contains properties and methods that are common for all display objects for starters. Then in addition there are other classes that extend that base class for Ships and Shots to be used in this canvas game example.

### 2.1 - The Base Disp Class

So the file starts off with the Base Display Object class. Here I define a constructor function that will be used for all Display Objects in the canvas example. 

The base display object class of course has properties like x and y but also a heading in radians, and a value that reflects the current pixels per second rate of movement. This kind of game is a real time rather than turn base system game so it is best to move the display objects by way of the system clock rather than just stepping by a delta each frame tick.

So in this canvas example all display objects have these properties they have a 2d position in the canvas as well as a heading and speed in pixels per second. This class also has many methods that are common for all display objects such as the move object method that accepts a time arguments and then moves the object by its current heading and pixels per second value.

```js
// DISP BASE CLASS
var Disp = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
    this.w = opt.w === undefined ? 16 : opt.w;
    this.h = opt.h === undefined ? 16 : opt.h;
    this.heading = opt.heading === undefined ? 0 : opt.heading;
    this.pps = opt.pps === undefined ? 0 : opt.pps;
    // canvas
    this.canvas = opt.canvas || document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
};
// update method
Disp.prototype.update = function (t) {
    t = t === undefined ? 0 : t;
    this.moveObj(t);
    this.applyBounds(this, this.canvas);
};
// Base draw to a canvas method
Disp.prototype.draw = function () {
    var ctx = this.ctx,
    hw = this.w / 2,
    hh = this.h / 2;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.strokeRect(-hw, -hh, this.w, this.h);
    ctx.restore();
};
// apply canvas bounds
Disp.prototype.applyBounds = function () {
    var canvas = this.canvas;
    if (this.x < -this.w) {
        this.x = canvas.width + this.w - Math.abs(this.x) % (canvas.width + this.w);
    }
    if (this.x > canvas.width + this.w) {
        this.x = this.x % (canvas.width + this.w);
    }
    if (this.y < -this.h) {
        this.y = canvas.height + this.h - Math.abs(this.y) % (canvas.height + this.h);
    }
    if (this.y > canvas.height + this.h) {
        this.y = this.y % (canvas.height + this.h);
    }
};
// Move Disp Object by current heading and PPS
Disp.prototype.moveObj = function (t) {
    var s = t / 1000;
    var delta = this.pps * s;
    this.x += Math.cos(this.heading) * delta;
    this.y += Math.sin(this.heading) * delta;
};
// distance
Disp.prototype.distance = function (disp2) {
    return Math.sqrt(Math.pow(this.x - disp2.x, 2) + Math.pow(this.y - disp2.y, 2));
};
```

The methods here have to do with just moving a display object in a uniform way, and there is also a common method for applying boundaries, and the distance formula. So any property or method that should apply to all display object class should be placed in this class, as it would have the same effect as monkey patching something into the main javaScript Object prototype object only not to that extreme.

### 2.2 - The Shot Class

The Shot class is one of two classes that I have that extend the functionality of the Disp Class. A Shot Class is used with A Ship Class an as the name implies represents a shot from a ship that can hurt another ship.

```js
// SHOT CLASS
var Shot = function (opt) {
    opt = opt || {};
    // use Disp Base Constructor first
    Object.assign(this, new Disp(opt));
    // set Shot properties
    this.life = opt.life || 1000;
    this.damage = opt.damage === undefined ? 1 : opt.damage;
};
// inherit from Disp
Shot.prototype = new Disp();
```

For now there is not much to this class I am just adding a damage property that is the amount of damage that the shot will cause to a ship, and a lifespan property that will serve as away to flag the shot for removal if it has just been around for to long.

### 2.3 - The Ship Class

Here I have the Ship Class that is used for both the Player Ship as well as enemy ships. Here I add a lot of properties that have to do with shooting shot and getting hit by a shot, as well as a custom draw method that overrides the main generic draw method used for other display objects that just displays a white square.

```js
// SHIP CLASS
var Ship = function (opt) {
    opt = opt || {};
    // use Disp Base Constructor first
    Object.assign(this, new Disp(opt));
    // Ship props
    this.shotMax = opt.shotMax === undefined ? 5 : opt.shotMax; ;
    this.shotLife = opt.shotLife === undefined ? 1500 : opt.shotLife;
    this.shotDelay = opt.shotDelay === undefined ? 350 : opt.shotDelay;
    this.shotPPS = opt.shotPPS === undefined ? 128 : opt.shotPPS;
    this.shotDamage = opt.shotDamage === undefined ? 1 : opt.shotDamage;
    this.maxHP = opt.maxHP === undefined ? 10 : opt.maxHP;
    // internals
    this.shots = [];
    this.shotTime = 0;
    this.HP = this.maxHP;
};
// inherit from Disp
Ship.prototype = new Disp();
// ship update
Ship.prototype.update = function (t, shipPool) {
    // apply Disp update first
    //console.log(this.x,this.y);
    Disp.prototype.update.call(this, t);
    //console.log(this.x,this.y);

    // update shots
    this.updateShots(t, shipPool);
};
// What happens when a Ship is hit
Ship.prototype.hit = function (shot) {
    this.HP -= shot.damage;
    this.HP = this.HP < 0 ? 0 : this.HP;
};
// update shots
Ship.prototype.updateShots = function (t, shipPool) {
    var s = t / 1000,
    ship = this;
    this.shotTime += t;
    // create new shots
    var newShots = this.shotTime / this.shotDelay;
    if (newShots >= 1) {
        this.shotTime = this.shotTime % this.shotDelay;
        if (this.shots.length < this.shotMax) {
            this.shots.push(new Shot({
                    canvas: this.canvas,
                    x: this.x,
                    y: this.y,
                    heading: this.heading,
                    pps: this.shotPPS,
                    life: this.shotLife,
                    damage: 1
                }));
        }
    }
    // update shots
    this.shots.forEach(function (shot) {
        shot.moveObj(t);
        shot.life -= t;
        shot.applyBounds();
        if (shipPool) {
            shipPool.forEach(function (ship) {
                if (ship.distance(shot) <= ship.w) {
                    ship.hit(shot);
                    shot.life = 0;
                }
            });
        }
    });
    // purge old shots
    var i = this.shots.length;
    while (i--) {
        var shot = this.shots[i];
        if (shot.life <= 0) {
            this.shots.splice(i, 1);
        }
    }
};
// draw The Ship to a canvas context
Ship.prototype.draw = function (ctx, shipStyle, shotStyle) {
    var hw = this.w / 2,
    hh = this.h / 2;
    // draw ship
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-8, 8);
    ctx.lineTo(-8, -8);
    ctx.closePath();
    ctx.strokeStyle = shipStyle || 'white';
    ctx.stroke();
    ctx.restore();
    // draw shots
    ctx.fillStyle = shotStyle || 'white';
    this.shots.forEach(function (shot) {
        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);
    });
};
```

For now I am using this class as a way to also deal with a collection of shots. I am doing this as a way to help keep things simpler, but if I where to continue working on this example I might want to have a shot collection class, as well as a similar class for collections of ships. However for this example at least I decided to have an updateShots method in the Ship class, and for the Ship class to also work as a shot collection class by storing an array of Shot Class instances.

The update method of the ship class supersedes the Disp class update method so it is called first,  but within the body of that update method I am still calling the main Disp class update method. The reason why is I still want the same rules to apply for all display objects when it comes to movement. Alter that I call the update shots method.

## 3 - The State Machine

A state machine is a way to break an application such as this space shooter game into separate states, where each state is a method or collection of methods that define a set of logic that is to run for different states of the application or game play. For example A game might have a loading state, title screen state, menu state, game state, pause state, and game over state and it might not end there.

In this canvas example there is a main game state, as well as an initialization state, and a game over state. I did not put an awful lot of time into this canvas example, but if I where to continue working on this there would be a title state, as well as several other states that have to do with various menus to say the least.

```js
var States = (function () {
    var lt = new Date(),
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');
    // HELPERS
    // make enemies
    var makeEnemies = function (level, canvas) {
        var e,
        enemies = [];
        // cap things past level 30
        var cap = level / 30;
        cap = cap > 1 ? 1 : cap;
        var count = level;
        while (count--) {
            e = new Ship({
                    canvas: canvas,
                    x: Math.floor(canvas.width * Math.random()),
                    y: Math.floor(canvas.height * Math.random()),
                    pps: 16 + Math.floor(64 * cap),
                    shotPPS: 64 + Math.floor(128 * cap),
                    shotLife: 5000,
                    heading: Math.PI * 2 * Math.random(),
                    shotDelay: 3000 - Math.floor(2500 * cap),
                    maxHP: 1 + Math.floor(15 * cap)
                });
            enemies.push(e);
        };
        return enemies;
    };
    // purge
    var purgeEnemies = function (enemies) {
        var i = enemies.length;
        while (i--) {
            var enemy = enemies[i];
            if (enemy.HP === 0) {
                enemies.splice(i, 1);
            }
        }
    };
    // setup a level
    var setupLevel = function (api) {
        //api.eCount = api.level;
        api.disp.enemies = makeEnemies(api.level, api.canvas);
        var ship = api.disp.ship;
        ship.x = canvas.width / 2;
        ship.y = canvas.width / 2;
        api.win = false;
        api.reset = false;
    };
    // PUBLIC API
    return {
        canvas: canvas,
        ctx: ctx,
        win: false,
        reset: false,
        //eCount: 1,
        level: 1,
        disp: {}, // display Objects to be used with the renderer
        current: 'init', // current state
        // Initialize the Game State
        init: function () {
            // player ship
            this.disp.ship = new Ship({
                    canvas: canvas,
                    x: 0,
                    y: 0,
                    pps: 32,
                    heading: Math.PI / 180 * 0
                });
            //this.eCount = 1;
            this.level = 1;
            setupLevel(this);
            this.current = 'game';
        },
        // Main Game State
        game: function () {
            var now = new Date(),
            t = now - lt,
            ship = this.disp.ship,
            enemies = this.disp.enemies;
            ship.update(t, enemies);
            enemies.forEach(function (enemy) {
                enemy.update(t, [ship]);
            });
            purgeEnemies(enemies);
            if (enemies.length === 0) {
                this.win = true;
                this.current = 'gameOver';
            }
            if (ship.HP === 0) {
                this.current = 'gameOver';
            }
            lt = now;
        },
        // game over state
        gameOver: function () {
            if (this.reset) {
                if (this.win) {
                    this.level += 1;
                    setupLevel(this);
                    this.current = 'game';
                } else {
                    this.current = 'init';
                }
            }
        },
        // tick method to be called in the main app loop
        tick: function () {
            this[this.current]();
        }
    };
}
    ());
```

In here I also parked some logic that has to do with what might eventually be a Ship Collection class. I needed at least some logic for that, and it had to be parked somewhere.

## 4 - Events

In the events.js file I worked out a few event handlers for moving the player ship and continuing when the game is over. Nothing major for this canvas example just a crude yet functional solution for accepting user input and using it to move the player ship.
```js
// EVENTS
(function () {
    var canvas = States.canvas
        // move ship handler that will work with mouse
        // and touch events
        var moveShip = function (e) {
        var bx = e.target.getBoundingClientRect(),
        x = 0,
        y = 0,
        cx,
        cy;
        if (e.touches) {
            x = e.touches[0].clientX - bx.left;
            y = e.touches[0].clientY - bx.top;
            console.log(e.touches);
        } else {
            x = e.clientX - bx.left;
            y = e.clientY - bx.top;
        }
        cx = canvas.width / 2,
        cy = canvas.height / 2;
        States.disp.ship.heading = Math.PI + Math.atan2(cy - y, cx - x);
    };
    // start game check
    var startGame = function () {
        if (States.current === 'gameOver') {
            States.reset = true;
        }
    };
    // Attach events
    canvas.addEventListener('mousemove', moveShip);
    canvas.addEventListener('touchmove', moveShip);
    canvas.addEventListener('mousedown', startGame);
    canvas.addEventListener('touchstart', startGame);
}
    ());
```

## 5 - Renderer

So then there is also the renderer.js file. Here I have the code that will draw to the canvas. This returns a main draw method that will render one of many other draw methods depending on the current state of the game. 

It also have one helper draw method of sorts that is called just once in the main draw method, but methods like that could be used in many such draw method. So for now it is just an example of keeping this a little more fine grain by pulling it into a stand alone method.

```js
// RENDER
var draw = (function () {
    var canvas = States.canvas,
    ctx = States.ctx;
    // clear screen
    var cls = function () {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        // clear
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    var states = {
        none: function () {},
        game: function () {
            // draw player
            States.disp.ship.draw(ctx, 'blue', 'blue');
            // draw enemies
            States.disp.enemies.forEach(function (enemy) {
                enemy.draw(ctx, 'red', 'red');
            });
        },
        gameOver: function () {
            ctx.fillStyle = 'white';
            if (States.win) {
                ctx.fillText('Victory', 10, 10);
            } else {
                ctx.fillText('Game Over', 10, 10);
            }
        }
    };
    return function () {
        cls();
        var drawState = states[States.current] || states['none'];
        drawState();
    };
}
    ());
```

There is more that comes to mind, such as pulling the draw methods that I have in the classes out of the classes and place it here. Making the method at least a little more functional by making it so that the state object is passed as an argument to the factory function and make it so the factory function needs to be called in the state machine. However when it comes to making a first alpha state of a project those kinds of things take a back seat. The real concern here is if i am starting to make something that people will actually want to play or not.
## 6 - Main app loop

Then there is the main app of the canvas game example. Here I am using requestAnimatuonFrame to create the loop, and call the States tick method and the draw method for each frame over and over again.


```js
// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    States.tick();
    draw();
};
loop();
```

It goes without saying that I made this very basic, and it seems to work okay this way. The reason why is that I am figuring how much time has went by in the state machine, and then passing that value to the update methods that I am using for the display objects.

I would design this kind of loop all kinds of different ways. Ways where I would move display objects by just steeping by deltas each frame. Ways where I would use some other means to go about limiting the frame rate, but testing if a certain amount of time has elapses here in the main app loop, and then call my update and draw methods. However I have come to find that this kind of approach seems to work good when it comes to a real time space shooter type game. 

Other games could be event driven and when it comes to that kind of game I might not need a main app loop at all, however that f course is not the case here, so no matter what i am always going to need something like this, at least for the game state anyway.

## 7 - Conclusion

This canvas example is still pretty basic, If I get around to it I might put a little more time and effort into it. I often create projects like this where I get to the point where it is just starting to feel like a finished product, but stop and move on to the next thing. I would like to break that cycle some time, but only with something that is worth the investment.

A better user interface would be nice, and some animations, transitions and sound would be a nice touch. Still this was a good exercise for me, when it comes to working out how to structure a canvas example that is something not so basic. I think I will like to make a few more posts like this one, and put a great deal more effort into canvas examples that are worth more time and energy.