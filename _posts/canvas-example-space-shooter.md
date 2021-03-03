---
title: A Canvas Example that is a basic Space Shooter game
date: 2019-08-21 19:41:00
tags: [js, canvas]
layout: post
categories: canvas
id: 527
updated: 2021-03-03 12:42:36
version: 1.37
---

So this post might be the first of several [canvas examples](/2020/03/23/canvas-example/), this one will be on a [basic space shooter](https://medium.com/jared-mills/creating-a-simple-space-shooter-game-for-the-browser-401f8adde1ad) game for starters. So this example is just a simple little game that involves a player ship that moves around and shoots at other player ships and that is it. Nothing to interesting maybe, but hey you have to start somewhere when it comes to these.
So then this is a project that I threw together in just a few hours, so it is not really a complete game at the time of this writing at least. I did not get around to polishing every little thing about it, but if this post gets enough traction maybe aI will get around to working on this one a little more. There is much more work to do when it comes to getting this to even start to look like some kind of finished product when it comes to things like at least having a basic menu system, and displaying all player stats of interest. However the initial goal was not to really make a finished product, I just want to get to a very simple starting point.

Still I had some fun with this one, and I might get around to putting more time into the project at some point in the future if this new collection of posts gets some traction.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/space-shooter/0.0.0/pkg.js"></script>

## 1 - The Space Shooter Canvas Example

This canvas example consists of several javaScript files and a single html file. The project seems to work just fine via the file protocol if you do want to get it up and running that way. I also made it so the canvas example does not depend on any external assets in terms of images, or scene data which seems to be the way that I make most of my canvas projects anyway. 

This project is an example of the canvas element in action as well as many other subjects that come up when developing a canvas game with client side javaScript. Many such projects involve the use of a framework such as phaser ce to help save time, but in this post I ma doing everything with native javaScript by itself.

## 2 - The Display Object Classes

The first javaScript file disp.js is a file that I worked out for display objects that will be used in this canvas example. A display object is often a sprite or graphic in the canvas that represents some kind of object that is used in the game such as a ship, enemy, power up, or anything to that effect. 

Sense the time that I first started this example and wrote this post, I have made a number of other canvas examples that also include some kind of system like this. I found myself making this kind of system over and over again, and got sick of doing so. So now I have a canvas example where the focus is just on this very part of the development of a canvas game which is a canvas example on the subject of an [object pool](/2020/07/20/canvas-example-object-pool/).

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
    return utils.distance(this.x, this.y, disp2.x, disp2.y);
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
```

In here I also parked some logic that has to do with what might eventually be a Ship Collection class. I needed at least some logic for that, and it had to be parked somewhere.

## 4 - Events

In the events.js file I worked out a few event handlers for moving the player ship and continuing when the game is over. Nothing major for this canvas example just a crude yet functional solution for accepting user input and using it to move the player ship.
```js
```

## 5 - Renderer

So then there is also the renderer.js file. Here I have the code that will draw to the canvas. This returns a main draw method that will render one of many other draw methods depending on the current state of the game. 

It also have one helper draw method of sorts that is called just once in the main draw method, but methods like that could be used in many such draw method. So for now it is just an example of keeping this a little more fine grain by pulling it into a stand alone method.

```js
```

There is more that comes to mind, such as pulling the draw methods that I have in the classes out of the classes and place it here. Making the method at least a little more functional by making it so that the state object is passed as an argument to the factory function and make it so the factory function needs to be called in the state machine. However when it comes to making a first alpha state of a project those kinds of things take a back seat. The real concern here is if i am starting to make something that people will actually want to play or not.

## 6 - Main app loop

Then there is the main app of the canvas game example. Here I am using requestAnimatuonFrame to create the loop, and call the States tick method and the draw method for each frame over and over again.


```js
```

It goes without saying that I made this very basic, and it seems to work okay this way. The reason why is that I am figuring how much time has went by in the state machine, and then passing that value to the update methods that I am using for the display objects.

I would design this kind of loop all kinds of different ways. Ways where I would move display objects by just steeping by deltas each frame. Ways where I would use some other means to go about limiting the frame rate, but testing if a certain amount of time has elapses here in the main app loop, and then call my update and draw methods. However I have come to find that this kind of approach seems to work good when it comes to a real time space shooter type game. 

Other games could be event driven and when it comes to that kind of game I might not need a main app loop at all, however that f course is not the case here, so no matter what i am always going to need something like this, at least for the game state anyway.

## 7 - The utils module

Like all my other canvas examples I have got into the habit of having a general utility library for all of theme. I am not using a framework of any kind, and I am treating each example as its own stand alone project. However there is some code that I find myself using across most of not all canvas examples, and as such I have started packing code like that here. This utils module will change a little from one example to another, but there are some methods such as my create canvas method that I am using in just about all of them. In future collections of canvas examples, I might stick to using some kind of common library though.

```js
var utils = {};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// create a canvas
utils.createCanvas = function(opt){
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
// get canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

## 8 - The html file

Now for the html file that I have for the canvas example where I am linking everything together. For this one I am using a hard coded canvas element rather than creating and injecting a canvas element with javaScript. I am also linking to all the extremal javaScript files that I have worked out when it comes to handling display objects, a state machine, events, rendering and a main app loop.

```html
```

If I start to put together a project that is even just a little involved I often like to break things down a lot to keep everything better organized. So now that just the plain old boring HTML is out of the way lets get to the actual fun and interesting javaScript stuff.

## 9 - Conclusion

This canvas example is still pretty basic, If I get around to it I might put a little more time and effort into it. I often create projects like this where I get to the point where it is just starting to feel like a finished product, but stop and move on to the next thing. I would like to break that cycle some time, but only with something that is worth the investment.

A better user interface would be nice, and some animations, transitions and sound would be a nice touch. Still this was a good exercise for me, when it comes to working out how to structure a canvas example that is something not so basic. I think I will like to make a few more posts like this one, and put a great deal more effort into canvas examples that are worth more time and energy.