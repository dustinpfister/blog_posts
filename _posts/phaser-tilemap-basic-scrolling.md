---
title: Basic scrolling with a tile map in phaser ce
date: 2018-09-26 20:49:00
tags: [js,phaser]
layout: post
categories: phaser
id: 289
updated: 2018-09-27 15:32:16
version: 1.10
---

So there are many ways to go about handing scrolling a [tilemap](https://photonstorm.github.io/phaser-ce/Phaser.Tilemap.html) in [phaser ce](https://photonstorm.github.io/phaser-ce/index.html), in this post I will be writing about one of the simplest ways to go about doing so that I have come across so far. This way of doing it should work okay for most projects, but with projects where map data is being generated on the fly at run tile, or projects that involve a very large collection of map data across many files, they way of doing here might not cut it.

<!-- more -->

## 1 - what to know

This is a post where I am writing about a basic way to go about scrolling a tile map in phaser ce. This might be the quick and simple way to go about doing it but it might not always be best depending on the project. I still do not have as much experience with tile maps, and all that relates to them, but in the event that I find other ways of doing this that are better when it comes to large maps I will likely write a new post on it, and hopefully update this one.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser ce 2.11.0 of [phaser](https://phaser.io/) the popular javaScript framework used to help make quick work of web based game development.

## 2 - A Basic tile map scrolling demo in phaser ce

So for this example I will just put together a quick little demo that involves an external map in the tiled json format, and following a sprite by just using game.camera.follow.

### 2.1 - Create a little guy sprite

So for starters I will want to start with a method that creates the sprite that the camera will follow first because of the nature of this post. If you are not aware of it to begin with game.camera.follow can be used to make the camera follow a sprite. This is what will be used to have the camera do that.

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

Once I have this method together then it is just a matter of setting everything else up including of course the tile map.

### 2.2 - Create the map

Here is the create map method that will be called once I have all other assets loaded during the preload state.

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

### 2.3 - Create the layer

When I create a map I will also need to create a layer. Notice that I am also resizing the game world to the size of that layer as well. This is one way to go about resizing the game world, the nice thing about this method is that it sets it to the size of the tile map layer that will be scrolling.

```js
// create the layer
createLayer = function (game, stageNum) {
 
    var map = game.data.map;
 
    var stage = game.data.stage = map.createLayer('stage' + stageNum);
 
    stage.resizeWorld();
 
    return stage;
 
};
```

### 2.4 - The JSON file

Here is the Json file that I will be using for this example. I will not be getting into this json format in detail here, but there is good [documentation on it](https://doc.mapeditor.org/en/stable/reference/json-map-format/) at the tiled website.

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

So now it is time to put it all together by working out what needs to get done with the main Phaser.Game instance.

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

## 3 - Conclusion

So when this project starts up I am able to move my little guy character around in the map, and things scroll around juts fine. A solution like this seems to work fine when it comes to simple little examples like this, but as things scale up it might fall short.
