---
title: Nesting groups in groups in phaser
date: 2018-08-27 17:01:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 272
updated: 2018-09-02 19:43:43
version: 1.15
---

For the past few days I have been experimenting with [Groups](https://photonstorm.github.io/phaser-ce/Phaser.Group.html) in [Phaser ce](https://photonstorm.github.io/phaser-ce/). Today I worked out some examples that have to do with nesting groups. In other words a group is also a kind of display object, just like that of a Sprite, so another group can be added to a group, along with other display objects. So in this post I will be covering some examples of nesting groups inside of groups, from simple hello world examples, to some that are starting to resemble a game.

<!-- more -->

## 1 - What to know before continuing

This is a post on nesting groups in phaser ce, the community edition of the [phaser](https://phaser.io/) javaScript powered game framework. This is not event a comprehensive post on groups in general, let alone phaser, let alone javaScript, and any additional skills required. However This post might give a few pointers when it comes to nesting groups. If you are new to phaser, you might want to start with my [getting started post on phaser](/2017/10/04/phaser-getting-started/).

## 2 - A basic example of a nested group in phaser ce

The basic idea here is that I just add another group to a group with the Group.add method.

```js
var parent = game.add.group();
parent.name = 'parent';
 
// I can make another group nested,
var nested = game.add.group(parent);
nested.name = 'nested';
 
console.log(parent.children[0].name); // nested
```

In a nut shell thats all there is to it.

## 3 - Waves of enemies

For a more complex use case example of nested groups I made a module that might evolve into a solution for making a game that involves the release of waves of enemies over time. That is a game where I would want a collection of waves, and each wave would hold a collection of enemies. In this kind of game I might always want another group to hold a cache of enemies, that will be released at a certain rate into another group where the enemies will actually be updated on each frame tick.

### 3.1 - The round module

So to help with the complexities of all this I will want to make some kind of module that will house all nested groups, as well as a bunch of methods that help work with these groups. So In this sub section I will be writing about the round module, that will take care of all of this for me.

#### 3.1.1 - Creating the round module, and setup method.

So I start off by making an object literal that will house all the properties, and methods. The first methods that I make for these kinds of projects is a setup methods of some kind. Here I offset some logic that would otherwise go in the create methods of the phaser state object that uses this module.

```js
// round object
var round = {
 
    waves: {}, // the waves group will contain nested groups
    cache: {}, // the cache will hold enemies to be released
    active: {}, // active enemies in the game area
    game: null, // what will be a reference to Phaser.Game
    enemyCount: 0, // a count of enemies, use to set names
    playerHP: 1000 // player hp
 
};
 
// setup waves
round.setup = function (opt) {
 
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
 
};
```

When the setup method is called in the create methods groups will be created for waves, cache, and active. They will start out empty, but can be populated later in the create method, or elsewhere with another method round.genWaves.

#### 3.1.2 - The round.genWaves method for populating the nested groups of enemies

This is the method that will add a new nested group to the waves group. This nested group will then hold a collection of enemies, and I can also set up any additional stuff that I want to do for each enemy here as well, such as enabling input.

```js
// generate the waves
round.genWaves = function (waveCount, enemysPerWave) {
 
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
 
};
```

#### 3.1.3 - next wave, and release methods

There is then a need for methods that can be used to add all the enemies in a wave into a cache group, from there they will then be released into another group where the enemies will actually then be active in the game. For this there is the nextWave, and release methods.

```js
// add next wave to cache
round.nextWave = function () {
 
    if (this.waves.children.length > 0) {
 
        var wave = this.waves.children[0],
        enemy,
        cache = this.cache,
        i = wave.children.length;
        while (i--) {
            enemy = wave.children[i];
            cache.add(enemy);
        }
 
        wave.destroy();
 
    }
 
};
 
// release the next enemy from cache
round.release = function () {
 
    if (this.cache.children.length > 0) {
 
        var enemy = this.cache.children[0];
        enemy.x = Math.floor(Math.random() * (this.game.world.width - 32));
        enemy.y = -32;
        this.active.add(enemy);
 
    }
 
};
```

#### 3.1.4 - The round tick method

Finally I will want to add in a method that will be called from the update method of the game state that will be called for each frame tick. Here I am just defining the logic that is to apply to each enemy that is in the active group.

```js
// tick the active group, where the real action happens
round.tick = function () {
 
    var game = round.game;
 
    this.active.forEach(function (enemy) {
 
        enemy.y += 1;
 
        if (enemy.y >= game.world.height) {
 
            round.playerHP -= 5;
 
            enemy.destroy();
 
        }
 
    });
 
};
```

For this simple example the enemies are just moving from the top of the screen down to the bottom of the screen.

### 3.2 - The Phaser Game instance, and single state object

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
 
        // 3 waves of 5
        round.genWaves(3, 5);
 
        // 1 wave of ten
        round.genWaves(1, 10);
 
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