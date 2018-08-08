---
title: Using Phaser timer events
date: 2018-08-07 10:54:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 252
updated: 2018-08-08 14:16:17
version: 1.11
---

So there are many ways to go about working with time in [Phaser](https://phaser.io/). Yes if I really want to I can just create my own date objects, and use them as a way to control frame rate, and when certain events will happen when making a project. That is a fine and good when it comes to making a game vanilla js style, however if I am using a frame work I should use what is given in that in order to help save time with making my own solutions. In most cases the framework built in solution for something works just fine, and I should only bother making my own solutions if doing so is called for. In any case this post is about [timer events](https://phaser.io/docs/2.6.2/Phaser.Timer.html) in [phaser ce](https://photonstorm.github.io/phaser-ce/), and how working with them can help make quick work of setting up things that need to happen every now and then when making my game logic.


<!-- more -->

## 1 - What to know before continuing.

This is a post on time events in [phaser ce](https://photonstorm.github.io/phaser-ce/), the community addition of [phaser](https://phaser.io/) a popular html5 game framework. Time events are a way of defining some code that is to fire after a delay, just once, or over and over again. Time events are one of several ways to go about defining game logic that is to fire after a delay, or in a loop. These events can be used in conjunction with those other methods, however I will not be getting into those in detail here.

The nice thing about these timer events is that they are subject to pausing of the game state. So in other words I do not have to adjust manually, phaser does this for me, making phaser timers one of the many little features that make using the framework a major time saver.

## 1.1 - The Phaser Timer Class

This post is mainly about the phaser [Timer class](https://photonstorm.github.io/phaser-ce/Phaser.Timer.html), as well as the Time Class that is closely associated with it. I might briefly write about other related aspects of phaser as well, however the emphasis is there.

## 1.2 - The Time class

This post is about using Timers that are used in the [Time class](https://photonstorm.github.io/phaser-ce/Phaser.Time.html). In this post I will not be writing about everything that has to do with this class, just adding timers to it's timer pool, and it's events property which is an instance of a timer that


## 2 - Some basic examples of time events in phaser CE

For some basic examples I will just give some example that involve just a single state, and creating method, using phaser in headless mode. I think one of the best ways to learn something new with phaser, javaScript, and many things in general is to just start exparementing with some basic exercises so lets get at it.

### 2.1 - Making A delay that fires once with game.time.events

So if I just want to make a timer that will fire after a given millisecond amount of time, one way to do that would be to add a Timer via game.time.events.add. I do so by passing the millisecond about as the first argument, and then give a callback as the second argument.

```js
var game = new Phaser.Game(320,240,Phaser.HEADLESS);
 
game.state.add('delay', {
 
    create: function () {
 
        console.log('create method called');
        // fire the given callback every 100ms
        game.time.events.add(5000, function () {
 
            console.log('five secs passed');
 
        });
 
    }
 
});
```

Here I am using the instance of Phaser.Timer that is bound to the master clock at game.time.events, and instance of timer that is bound to the master game clock found at game.time which is an instance of Phaser.Time.

### 2.2 - Adding a Timer class object to the timer pool with game.time.add

Another way to work with timers in phaser is to create a instance of the Phaser.Timer class manually, and then add that to the games pool of timers with the add method of the Time class (via game.time.add).

```js
game.state.add('timer-pool', {
 
    create: function () {
 
        // making a new timer for this game that will auto destroy
        var timer = new Phaser.Timer(game, true);
 
        console.log('just a sec...');
 
        // add a one sec delay
        timer.add(1000, function () {
 
            console.log('okay.');
 
        });
 
        // start the timer
        timer.start();
 
        // add it to the timer pool
        game.time.add(timer);
 
    }
 
});
```

### 2.3 - Defining loops in the create method of a state

It is often desirable to have a way to have some code that will execute every set duration of time over and over again, for this I would use the loop property of a timer class.

```js
var game = new Phaser.Game(320,240,Phaser.HEADLESS);
 
game.state.add('basic-loops', {
 
    create: function () {
 
        game.time.events.loop(100, function () {
 
            console.log('tick 100:');
 
        });
 
        game.time.events.loop(1000, function () {
 
            console.log('tick 1000:');
 
        });
 
    }
 
});
 
game.state.start('basic-loops');
```

## 3 - Comparing the use of a timer to just doing nothing in an update loop

When making a phaser project it is important to do something to make it so the game runs at a consistent speed across different devices that are capable of processing javaScript at different speeds. The use of timers are one such way to do this. In this example I made a project that demonstrates the difference between using timers to set frame rate compared to just letting things flow in the main update loop of a phaser state.

### 3.1 - Making the game object, and adding a global object

I start off my making a new instance of a phaser game, and define a global object that will contain anything that I would use across state methods, and state objects when making a more complex phaser project. In this example this object contains properties that will be the min and max boundaries of two display objects, and some methods that will be used to create, and move those objects.

```js
// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// some global stuff
game.global = {
 
    xMax: 32,
    xMin: 0,
 
    // a move sprite method
    moveSprite: function (sprite) {
 
        // step based on a boolean in the sprites data object
        // that may or may not be there
        if (sprite.data.goRight) {
            sprite.x += 5;
        } else {
            sprite.x -= 5;
        }
 
        // find of the sprite is out of bounds, setting the boolean
        // in it's data object if not there in the process.
        if (sprite.x >= this.xMax) {
            sprite.data.goRight = false;
            sprite.data.x = this.xMax;
        }
        if (sprite.x <= this.xMin) {
            sprite.data.goRight = true;
            sprite.data.x = this.xMin;
        }
 
    },
 
    // make a simple sprite sheet
    mkSheet: function (game) {
 
        // using canvas to make a sprite sheet
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        spriteGT,
        spriteRT;
 
        // will hold two frames that are 32 x 32
        canvas.width = 64;
        canvas.height = 32;
 
        // drawing the frames
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(32, 0, 32, 32);
 
        // adding the sheet to the phaser cache
        game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 2, 0, 0);
 
    }
 
};
```

If you would like to read more about sprite sheets I have written a [post on them in general a while back](/2017/10/12/phaser-spritesheets/), however I also have a newer one in which I write about [making sprite sheets with canvas](/2018/08/04/phaser-spritesheet-from-canvas/) like this without having to load an external asset first which is nice when making quick examples like this.

### 3.2 - The state object

In the state object of this example I am creating two sprites in the create method of the state, one is using a timer for its movement, and it is also using the phaser built in animation system to loop over the frames in the sheet rather than doing so manually by stepping the frameIndex property of the sprite. Then there is of course another sprite that is using the same sheet, as well as the same simple method that defines it's basic movement, but is being updated in the main update loop without anything governing it's frame rate.

```js
// compare-real-time demo
game.state.add('compare-real-time', {
 
    // create method for compare-real-time demo state
    create: function () {
 
        var spriteGT,
        spriteRT; // sprite game time, and sprite real time
 
        // calling my method that will give me a sprite sheet
        game.global.mkSheet(game);
 
        // create game time sprite
        spriteGT = game.add.sprite(0, 32, 'sheet', 0);
        spriteGT.name = 'box_game_time';
 
        // create an play an animation using phasers animation manager
        spriteGT.animations.add('flash', [0, 1], 6, true);
        spriteGT.play('flash');
 
        // Here is the time event example in action
        // move 'box_game_time' sprite every 100ms
        game.time.events.loop(100, function () {
 
            game.global.moveSprite(game.world.getByName('box_game_time'));
 
        });
 
        // real time sprite
        spriteRT = game.add.sprite(0, 64, 'sheet', 0);
        spriteRT.name = 'box_real_time';
 
        game.global.xMax = game.world.width - 32;
 
    },
 
    // update method for compare-real-time demo state
    update: function () {
 
        var spriteRT = game.world.getByName('box_real_time');
 
        // moving 'box_real_time' by whatever speed the update loop ticks at.
        game.global.moveSprite(spriteRT);
 
        // doing the same with animation
        spriteRT.frame += 1;
        if (spriteRT.frame >= 3) {
            spriteRT.frame = 0;
            spriteRT.frame = 0;
        }
 
    }
 
});
 
// start the demo
game.state.start('compare-real-time');
````

### 3.4 - The example in action

When starting this project up the 'box_game_time' sprite moves, and animates in a way that is expected white the other one moves and flashes real fast as it is doing so by the raw speed at which the update loop is going.

This is a subject that comes up a lot with javaScript related game development, in short it is just important to find some kind of way to make sure that things are flowing by the system clock, rather than the speed at which the computer can run instructions.
