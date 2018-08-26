---
title: Getting started with Groups of Sprites in phaser
date: 2018-08-24 20:08:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 269
updated: 2018-08-26 12:01:12
version: 1.11
---

So in many games you end up with one or more collections or groups of sprites. In this case there is a need for all kinds of methods that help with managing that group of display objects. In todays post I will be writing about grops in [Phaser ce](https://photonstorm.github.io/phaser-ce/). There are many methods, and properties with groups, so this will be just a simple getting started post on groups for now.

<!-- more -->

## 1 - What to know before continuing

There is a great deal to know about phaser ce, as well as javaScript in general before hand. In this post I am writing just about the Phaser.Group Constructor, and even then I am not covering all bases with that, this is just a getting started post on Groups. Phaser is a fairly complex project, and it will take time to get up to speed with it, however it is worth the investment, because it goes without saying that this is one of the more fun, and exciting javaScript projects out on the open Internet.

## 2 - Some Basic examples of groups

In this section I will be covering some basic examples of using groups in a phaser project. These examples are just quick silly little demos that help to show how groups are useful, for keeping large collections of display objects organized.

### 2.1 - Just creating a Group, and adding a single child

So for starters a very basic example might be to juts create a single Group instance, and add a single display object to it. To do this I just need to call game.add.group, and save the reference to it in a variable. At which point I can add a display object to the group with the add method of the Group instance.

```js
// create a group with game.add.group
var aGroup = game.add.group();
 
var text = game.add.text(0, 0, 'foo');
 
// add a display object with Group.add;
aGroup.add(text);
 
// the display objects of a Group are stored in the children array
console.log(aGroup.children[0].text); // 'foo'
```

### 3 - Example 1 of Phaser.Group - A group of text objects

Text objects in phaser come in handy for just simply displaying information on the canvas. Of course there is the process of making your own custom fonts with a sprite sheet, but that is off topic. Anyway often it is desirable to just display the current state of some variables on the canvas, for debugging purposes, or even for the sake of game play.

In this example I am using the Group constructor to create an instance of a group in the create method of the state object, and then adding a bunch of text elements to it. I can then use these text objects in another method of the state object to display some data. 

### 3.1 - The text group example

I start off by creating the instance of the Group with game.add.group, along with the font I will be using, and other function level variables. 

I then gave the Group a name, this is something in phaser that is similar to that of ids, and getElementById when it comes to client side javaScript. There are other ways to gain, and stored references to display objects, and Groups, but this is one option for doing so that I tent to like.

I then create instances of text display objects with game.add.text, and add them to the Group with text.add. Before doing so I can set various initial values if desired, in this textame though I just set a name for each text object. After that

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example-1', {
 
    create: function () {
 
        // creating the text Group
        var textGroup = game.add.group(),
        font = {
            fill: 'red',
            font: '15px courier'
        },
        i = 0,
        len = 5,
        text;
 
        // giving th Group a Name
        textGroup.name = 'text-group';
 
        // make some Text objects
        while (i < len) {
 
            // adding the text object to the cache
            // and storing a refernce to it
            text = game.add.text(0, i * 15, '', font);
 
            // using Group.add to add a text
            // display object to the Group
            textGroup.add(text);
            text.name = 'text-' + i;
 
            i += 1;
        }
 
    },
 
    update: function () {
 
        // I can use getByName to grab a ref to the group
        // if I am using names rather than a global variable
        // or property of an object appended to the state or
        // game objects
        var textGroup = game.world.getByName('text-group'),
        text;
 
        // If I set names for the children of the group I can use
        // that to get a certain child element
        text = textGroup.getByName('text-0');
        text.text = 'Roll: ' + Math.round(Math.random() * 6);
 
        // or I can use one of the many Phaser.Group Class Methods
        // such as filter
        textGroup.filter(function (child, index) {
 
            // return any child that has an index greater than zero
            return index > 0;
 
        }).list.forEach(function (child, i) {
 
            // an instance of Phaser.ArraySet is returned
            // so the list property of an ArraySet instance
            // is the actual instance of Array in core js
 
            // so something with the text
            var exp = child.data.exp = child.data.exp || 1,
            base = 2 + i;
 
            // the text property of a text object is what can be used to set
            // the value of text
            child.text = base + '^' + exp + ' = ' + Math.pow(base, exp);
 
            exp += 1;
            exp %= 25;
            child.data.exp = exp;
 
        });
 
    }
 
});
 
game.state.start('example-1');
```

In the update loop I am grabbing a reference to the Group using game.world.getByName, once I have my reference to the Group that I created before hand in the create method, I can then then do a number of things with the group. In this example I am getting a reference to a single text object in the Group once again because I assigned names for everything, but I also demonstrated the use of a Group method called filter to gain a list of all the remaining text elements as well.


## 4 - Example 3 of Phaser.Group - An example involving blocks

### 4.1 - Sheet from canvas method


```js
// sheet from canvas helper
var sheetFromCanvas = function (opt) {
 
    var f,
    fd, // frame data
    sx,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
 
    opt = opt || {};
    opt.name = opt.name || 'sheet';
    opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.forFrame = opt.forFrame || function () {};
    opt.game = opt.game || {};
 
    canvas.width = opt.frameWidth * opt.frames;
    canvas.height = opt.frameHeight;
 
    // to store frame data
    opt.game.global = opt.game.global || {};
    opt.game.global.frameData = opt.game.frameData || {};
 
    fd = opt.game.global.frameData[opt.name] = [];
 
    f = 0;
    // for each frame
    while (f < opt.frames) {
 
        // find current percent
        per = f / opt.frames;
        sx = opt.frameWidth * f + 0.5;
 
        // push frame index to frame data
        fd.push(f);
 
        // call forFrame with api set to the value
        // of 'this' inside the forFrame function
        ctx.save();
        ctx.translate(sx, 0);
        opt.forFrame.call({
            f: f,
            p: Math.PI,
            p2: Math.PI * 2,
            hw: opt.frameWidth / 2,
            hh: opt.frameHeight / 2,
            sx: sx,
            per: per,
            canvas: canvas,
            ctx: ctx
        }, ctx);
        ctx.restore();
 
        // next frame
        f += 1;
 
    }
 
    // add a new sheet to cache if we have a game
    if (opt.game) {
 
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
 
    }
 
    //document.body.appendChild(canvas);
 
    // return the canvas
    return canvas;
 
};
```

### 4.2 - The SpriteDat Class

```js
// SpriteDat Class to be used with Sprite data objects
var SpriteDat = function (opt) {
 
    opt = opt || {};
 
    // will used the Phaser.Game instance given via the
    // options object, or assume a game variable exists at the global space
    this.game = opt.game || game;
 
    // ref to the sprite
    this.sprite = opt.sprite || {};
 
    // default percent done to zero
    this.per = 0;
 
    // default deltas to zero
    this.deltaX = 0;
    this.deltaY = 0;
 
    // full reset
    // this will set a new starting position,
    // along with deltas, and all other values
    this.reset();
 
};
 
// call to fully reset
SpriteDat.prototype.reset = function () {
 
    // first starting options
    this.startX = 32 + Math.random() * (game.world.width - 64);
    this.startY = 32 + Math.random() * (game.world.height - 64);
 
    // new deltas
    this.newDeltas();
 
};
 
// new starting position and deltas
SpriteDat.prototype.newDeltas = function () {
 
    this.startX += this.deltaX * this.per;
    this.startY += this.deltaY * this.per;
 
    // deltas (amount of change)
    this.deltaX = Math.random() * 50 - 25;
    this.deltaY = Math.random() * 50 - 25;
 
    // current tick, percent done, and tick count
    this.tick = 0;
    this.per = 0;
    this.tickCount = Math.floor(10 + 40 * Math.random());
};
 
// return a
SpriteDat.prototype.clamped = function (per) {
 
    per = per === undefined ? this.per : per;
 
    return {
 
        x: Phaser.Math.wrap(this.startX + this.deltaX * per, -32, game.world.width + 32),
        y: Phaser.Math.wrap(this.startY + this.deltaY * per, -32, game.world.height + 32)
 
    }
 
};
 
// start the nextTick
SpriteDat.prototype.nextTick = function (per) {
 
    this.per = this.tick / this.tickCount;
 
    var curPos = this.clamped();
 
    this.sprite.x = curPos.x;
    this.sprite.y = curPos.y;
 
    // step next tick
    if (this.tick < this.tickCount) {
        this.tick += 1;
    }
 
};
```


### 4.3 - The SpriteGroup Class

```js
// Sprite Group - The name should say it all
var SpriteGroup = function (opt) {
 
    opt = opt || {};
 
    // will used the Phaser.Game instance given via the
    // options object, or assume a game variable exists at the global space
    this.game = opt.game || game;
 
    // the key of the sprite sheet to use
    this.sheetKey = opt.sheetKey || '';
 
    this.group = this.game.add.group();
    this.group.name = opt.name || '';
 
    var i = 0,
    len = 32,
    sprite;
 
    // using group.create to create sprites for the group
    while (i < len) {
 
        sprite = this.group.create(0, 0, this.sheetKey);
        sprite.name = this.group.name + '-sprite-' + i;
        sprite.frame = Math.floor(Math.random() * 3);
 
        sprite.data = new SpriteDat({
                game: this.game,
                sprite: sprite
            });
 
        sprite.x = sprite.data.startX;
        sprite.y = sprite.data.startY;
 
        i += 1;
    }
 
};
 
SpriteGroup.prototype.newDeltas = function () {
 
    this.group.forEach(function (sprite) {
 
        // new deltas for all
        sprite.data.newDeltas();
 
    });
 
};
```

### 4.4 - The Phaser Game Instance, and example state

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example-3', {
 
    create: function () {
 
        // green block sheet
        sheetFromCanvas({
            name: 'block',
            game: game,
            frames: 3,
            frameWidth: 16,
            frameHeight: 16,
            forFrame: function (ctx) {
                var colors = ['red', 'white', 'blue'];
                ctx.fillStyle = colors[this.f];
                ctx.lineWidth = 3;
                ctx.fillRect(0, 0, 32, 32);
            }
        });
 
        // making the sprite Group
        var sg = new SpriteGroup({
                game: this.game,
                sheetKey: 'block',
                name: 'blocks'
            });
 
        // I can set up a timer for new deltas
        // I just need to make sure the context is the
        // instance of SpriteGroup
        game.time.events.loop(2000, sg.newDeltas, sg);
 
    },
 
    update: function () {
 
        // I can also grab the group by using getByName
        var blocks = game.world.getByName('blocks');
 
        // Group.forEach method example
        blocks.forEach(function (sprite) {
 
            // call next tick for each sprite in the group
            sprite.data.nextTick();
 
        });
 
    }
 
});
 
game.state.start('example-3');
```
