---
title: Game visibility change, and having code run when tabs change in phaser ce
date: 2018-11-13 11:21:00
tags: [js,phaser]
layout: post
categories: phaser
id: 330
updated: 2018-11-13 20:39:03
version: 1.5
---

When making a [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) project by default the game will pause when it is no loger in focus by the player. In most cases this is fine, but depending on the nature of the game that is being made some times this might present a problem. In this post I will be writing about a boolean property in the state object call game.state.disableVisibilityChange that can be used to change this default behavior so the game continues to run even when not in focus. 

In addition I will also be writing about the nature of setTimeout vs requestAnimationFrame. In some cases you might want to decouple some of your code away from phasers state loop if you want code to continue to run in the background.

<!-- more -->

## 1 - what to know

This is an advanced post on phaser ce, the javaScript powered game framework. I assume that you have at least some background with phaser ce, if you are new to phaser you might want to start with my getting started post on phaser ce.

## 2 - Using stage.disableVisibilityChange

```js
var titleLoger = function (text) {
    document.title = text;
};
 
var createBoxSheet = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 32, 32);
    game.cache.addSpriteSheet('sheet-box', null, canvas, 32, 32, 1, 0, 0);
};
 
// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        game.data = {};
 
        createBoxSheet(game);
 
        game.stage.disableVisibilityChange = true;
 
        var sprite = game.data.sprite = game.add.sprite(0, 0, 'sheet-box');
        sprite.y = 32;
        sprite.data.pps = 64;
 
    },
 
    update: function () {
 
        var sprite = game.data.sprite;
 
        sprite.x += game.time.elapsed / 1000 * sprite.data.pps;
        sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);
 
        titleLoger(Math.floor(sprite.x) + ':' + game.time.elapsed);
 
    }
 
});
 
game.state.start('demo');
```

## 3 - Having code continue to run during a tab change

```js
var createStateLoop = function (game) {
 
    var data = game.data;
 
    data.money = 0;
    data.moneyPerSecond = 15 / 60 / 60;
    data.startTime = new Date();
 
    var loop = function () {
 
        setTimeout(loop, 1000);
 
        var now = new Date(),
        time = now - data.startTime;
 
        data.money = time / 1000 * data.moneyPerSecond;
 
        // log money to title element
        titleLoger('m=' + game.data.money.toFixed(2));
 
    };
 
    loop();
 
};
 
var titleLoger = function (text) {
    document.title = text;
};
 
// the main game variable
var game = new Phaser.Game(500, 40, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        game.data = {};
 
        game.stage.disableVisibilityChange = true;
 
        createStateLoop(game);
 
        game.data.disp = game.add.text(10, 10, '', {
                fill: 'white',
                font: '10px courier'
            });
 
    },
 
    update: function () {
 
        game.data.disp.text = 'm: ' + game.data.money.toFixed(2) + ': st: ' + game.data.startTime;
 
    }
 
});
 
game.state.start('demo');
```