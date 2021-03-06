---
title: loading tilemap data from external json in phaser ce
date: 2018-09-25 20:46:00
tags: [js,phaser]
layout: post
categories: phaser
id: 287
updated: 2018-10-01 20:44:34
version: 1.15
---

So tile maps are an important component of [phaser ce](https://photonstorm.github.io/phaser-ce/) that allows for making a map of tiles that contain among other things frame index values, that can then be skinned with sprite sheet. So tile maps are useful for many strategy and platform type games, and any other kind of project where they might come in handy. In this post I will be covering how to load external data from a json file that can contain all kinds of data for a tile map, such as frame index data and other useful properties. This can be done with the [tilemap method](https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#tilemap) of the loader in phaser ce.

<!-- more -->

## 1 - what to know

This is a post on loading an external json file that contains data for a tile map, which is a great way to quickly get started with level design in phaser ce. In this post I am making use of many aspects of phaser ce other then the tile map constructor, and some of the methods of that constructor. If you are new to phaser it might be best to start with my getting started with phaser post, and also check out my many other posts on various phaser related topics. Learning phaser is not something that is going to happen over night, it is a fairly complex framework that will take time to learn, but it sure is work the effort.

### 1.1 - This is a phaser 2.x post

In this post I am using phaser community edition 2.11.0 of [phaser](https://phaser.io/).

## 2 - An example using an external tile map for level design

For this example I am just going to make a simple example that just loads an external json file, an exteral sprite sheet, and just displays the tiles in the screen. Nothing fancy so this example may be a little boring, but might server as a good starting point for more advanced topics like tilemap collision, and working with more than one layer.

### 2.1 - The JSON file

I will need to furnish a json file that follows one of two supported standards in phaser ce. The default format used by the tile map loader is Phaser.Tilemap.CSV, but in this post I will be using Phaser.Tilemap.TILED_JSON. This is a format used my the popular map editor known as [tiled](https://www.mapeditor.org/). I might get around to writing a post on this format in which I will get into this in further detail, but for now I will just link to the official docs on the [tiled json format](https://doc.mapeditor.org/en/stable/reference/json-map-format/).

```js
{
    "version": 1,
    "orientation": "orthogonal",
    "width": 8,
    "height": 6,
    "tileheight": 32,
    "tilewidth": 32,
    "properties": {
        "world": 1,
        "stages": 2
    },
    "layers": [{
            "data": [
                1, 1, 1, 1, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 1, 1, 0, 1,
                1, 1, 0, 0, 1, 0, 0, 1,
                1, 1, 1, 0, 0, 0, 1, 1,
                1, 1, 1, 1, 0, 1, 1, 1
            ],
            "height": 6,
            "width": 8,
            "name": "stage1",
            "opacity": 1,
            "properties": {
                "start-index": "12"
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

### 2.2 - load the map and sheet

So in my main javaScript file I start off by writing some helper methods to help make things more fine grain. The first one is a method that calls game.load.tilemap. Here I call that method and pass a key, and a url where the json file is located. I also make sue to set the format to Phaser.Tilemap.TILED_JSON as that is not the default format for the tile map loader.

```js
// load json and images
var loadWorldData = function (game) {
    game.load.tilemap('map-world1', '/forpost/phaser-tilemap-loader/world2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('image-blocks', '/img/sheet_blocks.png');
};
```

The key that I give to the loader will be used when actually creating a tilemap instance later in the game, the loader just makes sure that I have the data downloaded to the client, ready be used in the project.

### 2.3 - Creates the tile map helper

The load world helper is what I use to create an instance of a tile map, and add an image to it to be used with the tilemap. It also returns the map when called, and also stores a reference to it in an object that I append to the Phaser.Game object.

```js
// load a give world number
var loadWorld = function (game, worldNum) {
 
    worldNum = worldNum || 1;
 
    game.data = game.data || {};
 
    var map = game.data.map = game.add.tilemap('map-world1');
 
    map.addTilesetImage('blocks', 'image-blocks');
 
    return map;
 
};
```

Calling this method alone will give me a tile map instance, but to actually display the tile map data I will need a layer.

### 2.4 - create a stage helper

So when I call my loadWorld method that will get things started, but to actually do something with the map data i will want at least one layer. A Layer is similar to a sprite, as it is a kind of display object that can be used in very much the same manner as one. So My createStae method will create this layer with the layer data in the map. In the JSON file I defined just one layer that I have called 'stage1', in a real project I would typically have more that one stage to a world, and have more than one JSON file, but for now it's just the one.

```js
// create a stage from the map
var createStage = function (game, stageNum) {
 
    stageNum = stageNum || 1;
 
    var map = game.data.map;
 
    var stage = game.data.stage = map.createLayer('stage' + stageNum);
 
    return stage;
 
};
```

Just like my loadWorld method I append a reference to the layer in my game data object, and return a reference as well.

### 2.5 - display map properties

The tiled json format can be used to store a whole lot more than just frame index information for each tile. It can also be used to store all kinds of data on a map, and per tile bases. I will be writing many more posts on tile maps in the near future as I seem to like getting into this, but for now I made a quick method that can be used to display just a world number and stages count.

```js
// display the properties of a map
var displayMapProperties = function (game, textObj) {
 
    var props = game.data.map.properties;
 
    textObj.text = 'world: ' + props.world + '\/' + props.stages
 
};
```

### 2.6 - The Phaser.Game object

So now I just need to get everything up and running with a Phaser.Game instance, and just one state object. In the preload method of the state object I call my loadWorldData method, in a real project I would use a loader that is way more advanced then that, but for this simple example it should work okay. In the create method I call my loadWorld method first to create the map with the data loaded with loader.tilemap in the loadWorldData method. Once I have the map ready it is okay to call the createStage method, and thats about it.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('basic', {
 
    preload: function () {
 
        loadWorldData(game);
 
    },
 
    create: function () {
 
        // load World one
        loadWorld(game, 1);
 
        createStage(game, 1);
 
        // text display object
        game.data.disp = game.add.text(10, 10, '', {
                fill: 'white',
                font: '15px courier'
            });
        displayMapProperties(game, game.data.disp);
 
    }
 
});
 
game.state.start('basic');
```

## 3 - Conclusion

If all goes well this will display the tiles in the canvas in the order that I defined in the JSON tile. Thats all this simple examples does, but these kinds of examples are just what one needs to bother with as a staring point right? After this there is of course getting into making an example that involves placing a player sprite in the world, enemies, and other objects depending on the nature of the project.