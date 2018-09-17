---
title: The Phaser on destroy event
date: 2018-09-15 15:04:00
tags: [js,phaser]
layout: post
categories: phaser
id: 280
updated: 2018-09-17 15:59:57
version: 1.21
---

Recently I wrote a post on the onKilled event that can be used to attach event handlers to display objects in [Phaser ce](https://photonstorm.github.io/phaser-ce/) that will fire when the kill method is called. In phaser ce the kill method is very different from the destroy method in that the kill method will just put a sprite in a dead state, while the destroy method will completely destroy a sprite all together.

<!-- more -->

## 1 - What to know

This is a post on the [onDestroy event](https://photonstorm.github.io/phaser-ce/Phaser.Events.html#onDestroy) in phaser ce that can be used to define some javaScript that is to be called when a display object such as a sprite is completely removed from phaser using the destroy method. In this post I am also using a lot of other phaser ce features such as groups, and timers. So this is not a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/), or javaScript in general.

### 1.1 - This is a phaser ce (phaser 2.x) post.

As of this writing all of my posts on phaser, including this one, are on [Phaser ce](https://photonstorm.github.io/phaser-ce/) also known as phaser 2.x. This is the second major release of the javaScript powered game framework known as [phaser](https://phaser.io/), which might be one of the most popular and best supported options to go with when it comes to html5 game development. I have not started playing with phaser 3 yet, but when I do that will likely have to be a completely separate collection of posts as a lot has changed.

## 2 - A phaser example using sprite.events.onDestroy

For a full working example of using the onDestroy event I put together something that is very similar to the example that I made for my other post on the onKilled event. There is at least one significant difference though, this example does not involve a group of sprites there where created once and then reused. In this example I am adding sprites to a group as needed, and when they are destroyed there are completely removed. In most projects I might prefer to use a set pool of sprites that I reuse, but never the less this is a different approach that in some ways may be a better solution for working with a group of sprites.

### 2.1 - The enemies.js file

For this example I made an enemies.js file that will be a collection of methods that pull a lot of logic out of my state objects resulting in more fine grain code examples. These methods setup a main game data object, make a sprite sheet with canvas, and of course provides a handler to be used with the onDestry event.

#### 2.1.1 - Staring off the module with Enemy.setup

I start off this module by just making a object literal to which I will be appending the methods. I often have a setup method in these finds of modules that is to be called in the create method of a boot state, that is used to set up some values that will be used in the other methods.

```js
var Enemy = {};
 
// setup a game.data object
Enemy.setup = function (game) {
 
    game.data = {
 
        maxEnemies: 5,
        enemies: game.add.group(),
        score: 0
 
    };
 
};
```

One of the values game.data.score is a value that will be incremented in my onDestroy handler that will be coming up later in this example..


#### 2.1.2 - The Enemy.onDestroy handler that will be attached to sprite.events.onDestroy

here is the is handler that I will be attaching to sprite.events.onDestroy when creating a new sprite with my spawn method that I will be getting to shortly.

```js
// The onDestroy method that will be called each time an enemy is killed
Enemy.onDestroy = function (sprite) {
 
    var game = this.game,
    spriteSpeed = (sprite.data.dx + sprite.data.dy) / 8,
    speedBonus = 175, // points bonus for speed.
    perKill = 25; // points per kill
 
    // score formula
    game.data.score += perKill + Math.floor(spriteSpeed * speedBonus);
 
};
```

When using sprite.events.onDestroy I can set the value of the this keyword using one of the arguments when calling sprite.events.onDestroy. In this example each time the onDestroy handler is called the players score will increase with the formula outlined in the method, a common task to happen each time an enemy is destroyed.

#### 2.1.3 - The Enemy.onInputDown handler

Here I have an onInputdown handler that will also be attached to sprites when they are generated in my spawn method.

```js
// What happens when the player clicks an enemy
Enemy.onInputDown = function (enemy) {
 
    enemy.data.hp -= 1;
 
    if (enemy.data.hp === 1) {
        enemy.frame = 1;
    }
 
    // call destroy
    if (enemy.data.hp <= 0) {
 
        enemy.destroy();
 
    }
 
};
```

In this example I am not using the phaser built in health system, I have nothing against it, I just find myself conflicted between making health a part of my Class that I develop when making a game or not. Because I do not have anything else going on in this example that will result in a sprite being destroyed other than clicking it, I made it so the destroy method is called here. In a more complex project where I have things going on like damage over time, I would of course want to handle that elsewhere.

#### 2.1.4 - Generating a Sprite.data object

Sprite data objects are an official way of attaching some properties, and methods that should be associated with a given sprite. Say you are developing an adventure game, and you have developed a Class that contains properties an methods to be used with a sprite, the data object is the typical standard way of attaching an instance of that class to a sprite in phaser.

```js
// generate a data object for a sprite
Enemy.genSpriteData = function () {
 
    return {
        dx: Math.random() * 3.5 + 0.5,
        dy: Math.random() * 3.5 + 0.5,
        hp: 2
    };
 
};
```

In this example I am just storing some delta values, and a health value. In a real project I would have one or more complex classes attached to the data object.

#### 2.1.5 - Making a sheet with canvas

For this example I am making a simple sprite sheet made with canvas. This works fine if I just want to skin an area with solid color box when it comes to these simple demos. In addition it event works okay when making some not so simple sheets by way of the 2d canvas drawing context.

```js
// make a sprite sheet
Enemy.mkSheet = function (game) {
 
    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
 
    // blue frame
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 32, 32);
 
    // red frame
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(32, 0, 32, 32);
 
    game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 2, 0, 0);
 
};
```

For more info on this approach of making a sprite sheet with canvas, you might want to [check out my post](/2018/08/04/phaser-spritesheet-from-canvas/) on that subject.

#### 2.1.6 - The Spawn method that will create a new Sprite and attach Enemy.onDestroy

So here is the method where I will be using sprite.events.onDestroy to attach my handler that I defined in Enemy.onDestroy above. I also attach my onInputDown hander as well, and generate a data object for the sprite.

```js
// re-spawn a dead enemy
Enemy.spawn = function (a) {
 
    var data = this.game.data,
    enemies = data.enemies;
 
    if (enemies.children.length < data.maxEnemies) {
 
        var enemy = data.enemies.create(0, 0, 'sheet-block');
 
        // attach onDestroy event
        enemy.events.onDestroy.add(Enemy.onDestroy, this);
 
        // attach on input down event
        enemy.inputEnabled = true;
        enemy.events.onInputDown.add(Enemy.onInputDown, this);
 
        enemy.data = Enemy.genSpriteData();
 
    }
 
};
```

So in this example I am creating sprites as needed rather than generating a reusable pool of sprites like I did on my post on onKilled. This method will be called every so often by way of a timer, rather than on every frame tick.

#### 2.1.7 - The Enemy.update method to be called on each frame tick

When I make a module like this there is almost always an update method where I define some logic that is to be called on each frame tick in the main update method of a game state that uses the module.

```js
// What needs to happen for each frame tick
Enemy.update = function (game) {
 
    var data = game.data,
    game = game;
 
    // loop all enemies
    data.enemies.forEach(function (enemy) {
 
        // step position based on current deltas
        enemy.x = Phaser.Math.wrap(enemy.x += enemy.data.dx, -32, game.world.width + 32);
        enemy.y = Phaser.Math.wrap(enemy.y += enemy.data.dy, -32, game.world.height + 32);
 
    });
 
};
```

For this example I am just moving the sprites based on there current deltas that are set in there data objects when spawned.

### 2.2 - The Phaser.Game instance, and state objects

Time to tie everything together with some state objects, and make the magic happen. It is common practice for me in many of these demos to have a boot state, that among many other things calls methods that setup my modules, and creates assets from canvas. In real projects I also do scaling and fix certain issues in the boot state as well.

#### 2.2.1 - The boot state

Here in the boot state I call my setup method, and make the sprite sheet, and then proceed to the demo state.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        // setup game data object
        Enemy.setup(this.game);
 
        Enemy.mkSheet(this.game);
 
        // start demo, and do not clear the world
        game.state.start('demo',false,false);
 
    }
 
});
```

#### 2.2.2 - The demo state

Here in the demo state I set up a timer loop event that will call my spawn method every second, and also set up a text element to display the current score. The score is of course what is updated every time a sprite is destroyed.

```js
game.state.add('demo', {
 
    create: function () {
 
        // call Enemy.spawn every second
        game.time.events.loop(1000, Enemy.spawn, this);
 
        // text display object to show score
        var text = game.add.text(5, 5, '', {
                fill: 'white'
            });
        text.name = 'disp-score';
 
    },
 
    update: function () {
 
        var data = this.game.data;
 
        Enemy.update(game);
 
        game.world.getByName('disp-score').text = 'score: ' + data.score;
 
    }
 
});
 
game.state.start('boot');
```

## 3 - Conclusion

The onDestroy event is a great way to set up some logic that is to be executed when a sprite is completely destroyed with the destroy sprite method. It can be used with onKilled, or as a complete replacement. The process of creating sprites on demand rather than making a reusable pool of sprites might have some advantages in terms of speed in some cases. As such this kind of approach might be desirable over the alternative, but really matters most to me is the nature of the game itself regardless of how it works.