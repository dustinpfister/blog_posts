---
title: Phaser Buttons
date: 2018-08-14 08:45:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 258
updated: 2018-08-14 08:49:34
version: 1.12
---

This post is on buttons in [phaser](http://phaser.io) that javaScript powered game framework for making web based games.

<!-- more -->


<div id="gamearea"></div>

<script>
// main
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
//game.transparent = true;

// demo state
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

// buttons state
game.state.add('buttons', {

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

        //document.body.appendChild(canvas);

        // add a new sheet to cache
        this.game.cache.addSpriteSheet('sheet-button', null, canvas, frameWidth, frameHeight, maxFrame * maxButton, 0, 0);

        game.state.start('game');

    }

});

// boot state
game.state.add('boot', {

    create: function () {

        game.global = game.global || {};
        game.global.money = 0;
        game.global.taskRate = 0.25;
        game.global.upgrades = 0;
        game.global.upgradeCost = 1;

        // disable scrollTo
        game.scale.compatibility.scrollTo = false;

        // start buttons state
        game.state.start('buttons');

    }

});

// start boot state
game.state.start('boot');
</script>


## 1 - what to know