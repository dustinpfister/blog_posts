---
title: Setting collsion in a tilemap with phaser
date: 2018-09-26 20:46:00
tags: [js,phaser]
layout: post
categories: phaser
id: 288
updated: 2018-09-27 12:08:48
version: 1.12
---

These days I have been playing around with [tilemaps](https://photonstorm.github.io/phaser-ce/Phaser.Tilemap.html) a lot in [phaser ce](https://photonstorm.github.io/phaser-ce/). When doing so for some projects I will want to set collision detection for some tiles. In this post I will be covering doing just that with a method that woulds by setting collision tile index values by giving what index values I do not want to result in collision. This can be done with a helpful little method in the tilemap class called [Tilemap.setCollisionByExclusion](https://photonstorm.github.io/phaser-ce/Phaser.Tilemap.html#setCollisionByExclusion)

<!-- more -->

## 1 - What to know

This is a post on setting up tile map collision detection, which is a necessary step in the process of making just about any kind of platform game with phaser ce and tile maps. I will not be covering tile maps in depth in this post, and assume that you have at least some background with phaser ce, and javaScript in general.

### 1.1 - This is a phaser ce 2.x post

In this post I am using [phaser community edition](https://photonstorm.github.io/phaser-ce/) 2.11.0, and not the newer phaser 3.x major release of [phaser](https://phaser.io/) the javaScript powered game framework.

## 2 - Example of setting tile map collision by frame index exclusion

So there are a few ways to set up collision detection with a tile map, most if not all will involve setting an array of tile index values in an instance of a tile map. This could be done manually, but why bother with that if one of the tile map instance methods will work just fine? One such method is map.setCollisionByExclusion. This method works by just calling it and passing an array of tile index values in the map data that should be excluded from collision detection.

In this example I will be using map.setCollisionByExclusion to set the collision index values of a tile map, and have a little guy sprite run around in the map.

### 2.1 - The create stage method

I start off my main.js file with some helpers, this helps to break my code down and make it more fine grain which helps to make debugging easier when I run into problems, and I also find it helps to make code more readable for examples like this.

Anyway the first helper is my createStage helper that will be used to create a layer for a map that I will create before calling this, more on that later. In any case once I have a least one layer in the map, and that map is the current layer of the map, I just need to call map.setCollisionByExclusion and pass the frame index values that I do not want collision to happen for.

```js
// load a stage from the current map
createStage = function (game, stageNum) {
 
    var map = game.data.map;
 
    var stage = game.data.stage = map.createLayer('stage' + stageNum);
 
    // set collision by excluding only indexes of zero or -1
    map.setCollisionByExclusion([0, -1]);
 
    stage.cameraOffset.set(0, 0);
 
    return stage;
 
};
```

This helper will of course be used in conjunction with many others, but for the most part the main subject matter of this post happens here.

### 2.2 - The create map method

Here I have the create map method, that when called will create an instance of a tile map and appedn a reference to it in a object that I appedn to the Phaser.Game instance. This method will of course be called before I call createStage, but after I load all the assets that I need including the external json file that will contain the frame index data for each tile.

```js
// create the tilemap
var createMap = function (game, worldNum) {
 
    worldNum = worldNum || 1;
 
    game.data = game.data || {};
 
    var map = game.data.map = game.add.tilemap('map-world' + worldNum);
 
    map.addTilesetImage('blocks', 'image-blocks');
 
    return map;
 
};
```

### 2.3 - Create the guy sprite

Next I have a helper that will create a sprite of a little guy character that I put together in a flash for the sake of these demos. The method creates the sprite using the key of a sprite sheet that I load before calling this. Once I have the instance of the sprite I enable physics for the sprite, and set some additional settings including the start location from the json data.

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

In order to confirm that collision is working the little guy sprite is necessary, in a real project there would be much more to do with this, but for now he should serve this example well.

### 2.4 - The JSON file

So here I have the JSON file that I will be using that will contain the frame index data along with many other things. As of this writing I have not yet wrote a post in which I get into this json file standard, but there is the [official documentation](https://doc.mapeditor.org/en/stable/reference/json-map-format/) on it at the [tiled website](https://www.mapeditor.org/).

```js
{
    "version": 1,
    "orientation": "orthogonal",
    "width": 12,
    "height": 10,
    "tileheight": 32,
    "tilewidth": 32,
    "properties": {
        "world": 1,
        "stages": 2
    },
    "layers": [{
            "name": "stage1",
            "width": 12,
            "height": 10,
            "data": [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
                1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
                1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1,
                1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ],
            "opacity": 1,
            "properties": {
                "startat": {
                    "x": 4,
                    "y": 1
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

### 2.5 - The Phaser.Game instance and state object

Now to get the project up and running by bringing everything together with a Phaser.Game instance and a single state object with a preload, create, and update methods. In the preload method I load all my assets, such as the sprite sheets for the tile map, and the little guy, along with the json data with to load.tilemap.

In the create method I resize the world, create the map, create the stage, and enable physics. Then I create the little guy sprite that will end up at a start location define in the json file. I also set up some keyboard cursors to use to move the little guy around to confirm that collision is working, event though the little guy would fall through the blocks if it wasn't. Still I like to make these demos at least a little interesting, have to move him around at least.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    // load assets
    preload: function () {
 
        // load images
        game.load.image('image-blocks', '/img/sheet_blocks.png');
        game.load.spritesheet('sheet-guy', '/img/sheet_guy_16_32.png', 16, 32, 1);
 
        // load json
        game.load.tilemap('map-world1', '/forpost/phaser-tilemap-set-collision-by-exclusion/world.json', null, Phaser.Tilemap.TILED_JSON);
 
    },
 
    // create the world
    create: function () {
 
        game.world.resize(640, 480);
 
        // create map, and map layer
        var map = createMap(game, 1);
        var stage = createStage(game, 1);
 
        // I will be using physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
 
        createGuy(game);
 
        game.data.cursors = game.input.keyboard.createCursorKeys();
 
    },
 
    // update
    update: function () {
 
        var guy = game.data.guy,
        layer = game.data.stage,
        cursors = game.data.cursors;
 
        // check for collision
        game.physics.arcade.collide(guy, layer);
 
        guy.body.velocity.x = 0;
 
        if (cursors.up.isDown) {
            if (guy.body.onFloor()) {
                guy.body.velocity.y = -125;
            }
        }
 
        if (cursors.left.isDown) {
            guy.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            guy.body.velocity.x = 150;
        }
 
    }
 
});
 
game.state.start('boot');
```

There is also the update method as well there I am just updating the little guys position based on keyboard input.

## 3 - Conclusion

So if all goes well when this project starts up the little guy sprite will start at the starting location that I have defined in the json data, and collision detection does indeed seem to work. He does not fall threw the tiles, and the example seems to work as expected. Of course this is not everything there is to cover with collision detection and tile maps in phaser. I might still need to write more content event attachment, and have some other things going on such as enemies, and death traps. However just getting to this point is a major step forward in making a nice little platform game.

