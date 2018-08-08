---
title: Using Phaser time events
date: 2018-08-07 10:54:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 252
updated: 2018-08-08 12:32:03
version: 1.5
---

So there are many ways to go about working with time in Phaser. Yes if I really want to I can just create my own date objects, and use them as a way to control frame rate, and when certain events will happen when making a project. That is a fine and good when it comes to making a game vanilla js style, however if I am using a frame work I should use what is given in that in order to help save time with making my own solutions. In most cases the framework built in solution for something works just fine, and I should only bother making my own solutions if doing so is called for. In any case this post is about time events in phaser, and how working with them can help make quick work of setting up things that need to happen every now and then when making my game logic.


<!-- more -->

## 1 - What to know before continuing.

This is a post on time events in phaser ce, a popular html5 game framework. Time events are a way of defining some code that is to fire after a delay, just once, or over and over again. Time events are one of several ways to go about defining game logic that is to fire after a delay, or in a loop. These events can be used in conjunction with those other methods, however I will not be getting into those in detail here.

The nice thing about these timer events is that they are subject to pausing of the game state. So in other words I do not have to adjust manually, phaser does this for me, making phaser timers one of the many little features that make using the framework a major time saver.

## 2 - Some basic examples of time events in phaser CE

For some basic examples I will just give some example that involve just a single state, and creating method, using phaser in headless mode. I think one of the best ways to learn something new with phaser, javaScript, and many things in general is to just start exparementing with some basic exercises so lets get at it.

### 2.1 - Making A delay that fires once with game.time.events

So if I just want to make a timer that will fire after a given millisecond amount of time that would look something like this.

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

Here I am using the instance of Phaser.Timer that is bound to the master clock at game.time.events.

### 2.2 - Defining loops in the create method of a state


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

### 2.3 - adding a Timer class object to the timer pool with game.time.add

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