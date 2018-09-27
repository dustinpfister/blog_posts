---
title: Basic scrolling with a tile map in phaser ce
date: 2018-09-26 20:49:00
tags: [js,phaser]
layout: post
categories: phaser
id: 289
updated: 2018-09-27 15:13:48
version: 1.3
---

So there are many ways to go about handing scrolling a tilemap in phaser ce, in this post I will be writing about one of the first ways to go about doing so when it comes to simple projects.

<!-- more -->

## 1 - what to know

This is a post where I am writing about a basic way to go about scrolling a tile map in phaser ce. This might be the quick and simple way to go about doing it but it might not always be best depending on the project. I still do not have as much experience with tile maps, and all that relates to them, but in the event that I find other ways of doing this that are better when it comes to large maps I will likely write a new post on it, and hopefully update this one.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser ce 2.11.0 of phaser the popular javaScript framework used to help make quick work of web based game development.

## 2 - A Basic tile map scrolling demo in phaser ce

### 2.1 - Create the map

```js
// create the map
var createMap = function (game, worldNum) {
 
    worldNum = worldNum || 1;
 
    game.data = game.data || {};
 
    var map = game.data.map = game.add.tilemap('map-world' + worldNum);
 
    map.addTilesetImage('blocks', 'image-blocks');
 
    return map;
 
};
```

### 2.2 - Create the layer

```js
// create the layer
createLayer = function (game, stageNum) {
 
    var map = game.data.map;
 
    var stage = game.data.stage = map.createLayer('stage' + stageNum);
 
    stage.resizeWorld();
 
    return stage;
 
};
```

### 2.3 - Create a little guy sprite

```js
// create the guy sprite
var createGuy = function (game) {
 
    var map = game.data.map;
 
    // create guy Sprite
    var guy = game.data.guy = game.add.sprite(0, 0, 'sheet-guy');
 
    // enable physics for the guy
    game.physics.enable([guy]);
 
    // guy physics settings
    guy.body.gravity.set(0, 100);
    guy.body.bounce.set(0.25);
    guy.body.linearDamping = 1;
 
    // guy start location
    var startAt = map.layer.properties.startat;
    guy.x = startAt.x * 32;
    guy.y = startAt.y * 32;
 
    // have camera follow the guy
    game.camera.follow(guy);
 
};
```

### 2.6 - The JSON file

```js
{
    "version": 1,
    "orientation": "orthogonal",
    "width": 16,
    "height": 18,
    "tileheight": 32,
    "tilewidth": 32,
    "properties": {
        "world": 1,
        "stages": 2
    },
    "layers": [{
            "name": "stage1",
            "width": 16,
            "height": 18,
            "data": [

                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1,
                1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,

                1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1,
                1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1,

                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

            ],
            "opacity": 1,
            "properties": {
                "startat": {
                    "x": 13,
                    "y": 2
                }
            },
            "type": "tilelayer",
            "visible": true,
            "x": 0,
            "y": 0
        }
    ],
    "tilesets": [{
            "firstgid": 1,
            "image": "sheet_blocks.png",
            "imageheight": 32,
            "imagewidth": 64,
            "margin": 0,
            "name": "blocks",
            "properties": {},
            "spacing": 0,
            "tileheight": 32,
            "tilewidth": 32,
            "tileproperties": {
                "12": {
                    "home": "true"
                }
            }
        }
    ]
}
```


### 2.5 - The Phaser.Game instance

```js
 
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    preload: function () {
 
        game.load.image('image-blocks', '/img/sheet_blocks.png');
        game.load.spritesheet('sheet-guy', '/img/sheet_guy_16_32.png', 16, 32, 1);
        game.load.tilemap('map-world1', '/json/littleguy-world3.json', null, Phaser.Tilemap.TILED_JSON);
 
    },
 
    create: function () {
 
        // load World one
        var map = createMap(game, 1);
        var stage = createLayer(game, 1);
 
        map.setCollisionByExclusion([0]);
 
        // will be using physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
 
        createGuy(game);
 
        game.data.cursors = game.input.keyboard.createCursorKeys();
 
    },
 
    update: function () {
 
        var p = game.data.guy,
        layer = game.data.stage,
        cursors = game.data.cursors;
 
        game.physics.arcade.collide(p, layer);
 
        p.body.velocity.x = 0;
 
        if (cursors.up.isDown) {
            if (p.body.onFloor()) {
                p.body.velocity.y = -150;
            }
        }
 
        if (cursors.left.isDown) {
            p.body.velocity.x = -150;
        }
 
        if (cursors.right.isDown) {
            p.body.velocity.x = 150;
        }
 
    }
 
});
 
game.state.start('boot');
```


