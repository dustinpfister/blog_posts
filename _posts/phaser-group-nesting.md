---
title: Nesting groups in groups in phaser
date: 2018-08-27 17:01:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 272
updated: 2018-08-27 19:22:44
version: 1.4
---

For the past few days I have been experimenting with [Groups](https://photonstorm.github.io/phaser-ce/Phaser.Group.html) in [Phaser ce](https://photonstorm.github.io/phaser-ce/). Today I worked out some examples that have to do with nesting groups. In other words a group is also a kind of display object, just like that of a Sprite, so another group can be added to a group, along with other display objects. So in this post I will be covering some examples of nesting groups inside of groups, from simple hello world examples, to some that are starting to resemble a game.

<!-- more -->

## 1 - What to know before continuing

This is a post on nesting groups in phaser ce, the community edition of the [phaser](https://phaser.io/) javaScript powered game framework. This is not event a comprehensive post on groups in general, let alone phaser, let alone javaScript, and any additional skills required. However This post might give a few pointers when it comes to nesting groups. If you are new to phaser, you might want to start with my [getting started post on phaser](/2017/10/04/phaser-getting-started/).

## 2 - A basic example of a netsed group in phaser ce

```js
var parent = game.add.group();
parent.name = 'parent';
 
// I can make another group nested,
var nested = game.add.group(parent);
nested.name = 'nested';
 
console.log(parent.children[0].name); // nested
```

## 3 - Example 1 - Waves of enemies


### 3.1 - The round module

```js
// round object
var round = {
 
    waves: {},
    cache: {},
    active: {},
    game: {},
 
    enemyCount: 0,
 
    playerHP: 1000,
 
    // setup waves
    setup: function (opt) {
 
        var waveCount = 3,
        enemysPerWave = 5,
        wave,
        enemy,
        wi,
        ei;
 
        opt = opt || {};
 
        this.game = opt.game || game;
 
        this.waves = game.add.group();
        this.waves.name = 'waves';
        this.waves.x = -32;
 
        this.cache = game.add.group();
        this.cache.name = 'cache';
        this.cache.x = -32;
 
        this.active = game.add.group();
        this.active.name = 'active';
        this.active.x = 0;
 
        // 3 waves of 5
        this.genWaves(3, 5);
 
        // 1 wave of ten
        this.genWaves(1, 10);
 
    },
 
    // generate the waves
    genWaves: function (waveCount, enemysPerWave) {
 
        var wave,
        enemy,
        wi,
        ei;
 
        // for each
        wi = 0;
        while (wi < waveCount) {
 
            // add new wave as parent of this.waves (nesting)
            wave = game.add.group(this.waves);
            wave.name = 'wave-' + (wi + 1);
 
            ei = 0;
            while (ei < enemysPerWave) {
 
                enemy = wave.create(0, 0, 'badguys');
                enemy.name = 'enemy-' + this.enemyCount;
                enemy.inputEnabled = true;
 
                // enemies die when clicked
                enemy.events.onInputDown.add(function (enemy) {
 
                    enemy.destroy();
 
                });
 
                this.enemyCount += 1;
                ei += 1;
            }
 
            wi += 1;
 
        }
 
    },
 
    // add next wave to cache
    nextWave: function () {
 
        if (this.waves.children.length > 0) {
 
            var wave = this.waves.children[0],
            enemy,
            cache = this.cache,
            i = wave.children.length;
            while (i--) {
                enemy = wave.children[i];
                wave.remove(enemy);
                cache.add(enemy);
            }
 
            wave.destroy();
 
        }
 
    },
 
    // release the next enemy from cache
    release: function () {
 
        if (this.cache.children.length > 0) {
 
            var enemy = this.cache.children[0];
            enemy.x = Math.floor(Math.random() * (this.game.world.width - 32));
            enemy.y = -32;
 
            this.cache.remove(enemy, false);
 
            this.active.add(enemy);
 
        }
 
    },
 
    // tick the active group, where the real action happens
    tick: function () {
 
        var game = round.game;
 
        this.active.forEach(function (enemy) {
 
            enemy.y += 1;
 
            if (enemy.y >= game.world.height) {
 
                round.playerHP -= 5;
 
                enemy.destroy();
 
            }
 
        });
 
    }
 
};
```

### 3.2 - The Phaser game instance, and state object

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example-1', {
 
    create: function () {
 
        // basic block sprite sheet, made wwith canvas
        var canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 32, 32);
        this.game.cache.addSpriteSheet('badguys', null, canvas, 32, 32, 1, 0, 0);
 
        // setup
        round.setup({
            game: game
        });
 
        var font = {
            fill: 'white',
            font: '10px courier'
        };
 
        var text = game.add.text(5, 5, '', font);
        text.name = 'text1';
 
        var text2 = game.add.text(5, 15, '', font);
        text2.name = 'text2';
 
        // call next wave for first time, and every ten seconds
        round.nextWave.call(round);
        game.time.events.loop(7000, round.nextWave, round);
 
        // release a new enemy from cache every second
        game.time.events.loop(1000, round.release, round);
 
        // tick active group
        game.time.events.loop(33, round.tick, round);
 
    },
 
    update: function () {
 
        var text = game.world.getByName('text1'),
        text2 = game.world.getByName('text2');
 
        // wave info
        text.text = 'waves: ' + round.waves.children.length + ' | enemys: ' +
            round.active.children.length +
            '(+' + round.cache.children.length + ')';
 
        // player info
        text2.text = 'hp: ' + round.playerHP;
 
    }
 
});
 
game.state.start('example-1');
```