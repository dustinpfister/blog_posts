---
title: Phaser Buttons
date: 2018-08-14 08:45:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 258
updated: 2018-08-14 16:23:26
version: 1.17
---

This post is on [buttons](https://photonstorm.github.io/phaser-ce/Phaser.Button.html) in [phaser](http://phaser.io) that javaScript powered game framework for making web based games. In phaser there is a special type of display object called a button, that is very mush like a sprite in many ways, but is geared towards the role of a button. Sprite sheets are handled a little differently, there is not just one frame index, but four indexes to set one for each button state (hover,out,down, and up). Input is enabled be default, and there are also a call back, and a context to set for it. In this post I will be covering buttons, and will also be putting together a basic clicker type game. These buttons are a great way to quickly implement a button compared to using just a plain old sprite, so lets take a look at buttons in phaser.

<!-- more -->


{% phaser 'phaser-buttons/main.js' %}


## 1 - what to know

This is a post on using buttons in phaser ce, it would be a good idea to gain some background in phaser in general if you have not done so before hand, the best place for that might be the [phaser ce docs](https://photonstorm.github.io/phaser-ce/). I have a [getting started post on phaser](/2017/10/04/phaser-getting-started/) that you might want to try, it would also be a good idea to learn a bit about [state machines](/2017/10/05/phaser-state-manager/), and [making sprite sheets with canvas](/2018/08/04/phaser-sprite-from-canvas/) as well. I will be using these things in this post, on top of buttons of course.

## 2 - Clicker game example

For a simple example that makes use of buttons I thought I would make a simple clicker game. These kinds of games often just involve clicking something to make some money to then spend to upgrade the rate at which money is made. So this makes it the best kind of game to experiment with buttons in phaser. This game will involve making a sprite sheet with canvas as well, and I will be breaking some things down in many [state objects](/2017/10/06/phaser-state-objects/).

## 2.1 - Making the game object, and boot state.

Like just about all of my phaser projects these days I start off by making an instance of the [main phaser constructor](/2017/10/11/phaser-main-game-constructor/), rather than just passing it a single state object as the fifth argument. This allows me to make more than one state object with game.state.add, and then choose which state I want to start first, when I want it to start.

Anyway this boot state is where I will set a few things up that will be used else where in the project, for this project I am just setting up a global object that will hold game state data, and setting some values that have to do with scaling. If you would like to know more about that scaling in phaser you might want to check out my post on [pseudo full screen](/2018/08/13/phaser-scale-fullscreen-pseudo/).

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// boot state
game.state.add('boot', {
 
    create: function () {
 
        // set some variables for a game state
        game.global = game.global || {};
        game.global.money = 0;
        game.global.taskRate = 0.25;
        game.global.upgrades = 0;
        game.global.upgradeCost = 1;
 
        // scale settings
        game.scale.compatibility.scrollTo = false;
        game.scale.pageAlignHorizontally = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.width = document.getElementById(game.parent).scrollWidth;
        game.scale.height = document.getElementById(game.parent).scrollHeight;
 
        // start buttons state
        game.state.start('button-sheet');
 
    }
 
});
```

Not much to write about with this state when it comes to buttons thought, so lets move on to the button-sheet state, that will be used to set up the sprite sheet that will be used for the games buttons.

## 2.2 - the button sheet state

```js
// button-sheet state
game.state.add('button-sheet', {
 
    create: function () {
 
        var frame = 0,
        maxFrame = 4,
        frameWidth = 64,
        frameHeight = 16,
        buttons = ['do task', 'upgrade'],
 
        // state colors [over,out,down,up]
        stateColors = ['#ffff00', '#00afaf', '#ff0000', '#00ff00'],
        button = 0,
        maxButton = buttons.length,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
 
        canvas.width = frameWidth * maxFrame;
        canvas.height = frameHeight * maxButton;
 
        // make button sheet
        while (button < buttons.length) {
 
            frame = 0;
            while (frame < maxFrame) {
 
                // figure startx, and percent done
                var sx = frameWidth * frame + 0.5,
                sy = frameHeight * button + 0.5;
 
                // draw for current button
                ctx.strokeStyle = '#0000af';
                ctx.fillStyle = stateColors[frame];
                ctx.strokeRect(sx, sy, frameWidth - 1, frameHeight - 1);
                ctx.fillRect(sx, sy, frameWidth - 1, frameHeight - 1);
 
                ctx.fillStyle = '#0000af';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(buttons[button], sx + frameWidth / 2, sy + frameHeight / 2)
 
                // next frame
                frame += 1;
 
            }
 
            // next button
            button += 1;
 
        }
 
        // add a new sheet to cache
        this.game.cache.addSpriteSheet('sheet-button', null, canvas, frameWidth, frameHeight, maxFrame * maxButton, 0, 0);
 
        game.state.start('game');
 
    }
 
});
```

### 2.3 - The game state

```js
// game state
game.state.add('game', {
 
    create: function () {
 
        var font = {
            fill: '#ffffff',
            font: '15px courier'
        },
        tx_money = game.add.text(100, 32, '', font),
        tx_upgrades = game.add.text(100, 64, '', font),
        tx_upcost = game.add.text(100, 96, '', font);
 
        updateInfo = function () {
 
            tx_money.text = '$' + Phaser.Utils.pad(this.money.toFixed(2), 6, 0, 1);
            tx_upgrades.text = 'Per task (' + this.upgrades + ') : ' + this.taskRate.toFixed(2);
            tx_upcost.text = 'upgrade cost: ' + this.upgradeCost.toFixed(2);
 
        },
 
        // on work callback
        onWork = function () {
 
            this.money = Phaser.Math.roundTo(this.money + 0.25 + 0.25 * this.upgrades, -2);
            this.money = Phaser.Math.clamp(this.money, 0, 999.99);
            updateInfo.call(this);
 
        },
 
        onUpgrade = function () {
 
            if (this.money >= this.upgradeCost) {
 
                this.money -= this.upgradeCost;
                this.upgrades += 1;
                this.upgradeCost = Math.pow(1.25, this.upgrades);
                this.taskRate = 0.25 + 0.25 * this.upgrades;
 
            }
            updateInfo.call(this);
 
        };
 
        updateInfo.call(game.global);
 
        game.add.button(10, 32, 'sheet-button', onWork, game.global, 0, 1, 2, 3);
        game.add.button(10, 64, 'sheet-button', onUpgrade, game.global, 4, 5, 6, 7);
 
    }
 
});
```