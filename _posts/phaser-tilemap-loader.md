---
title: loading tilemap data from external json in phaser ce
date: 2018-09-25 20:46:00
tags: [js,phaser]
layout: post
categories: phaser
id: 287
updated: 2018-09-27 08:17:01
version: 1.7
---

So tile maps are an important component of phaser that allows for making a map of tiles that contain among other things frame index values, that can then be skinned with sprite sheet. So tile maps are useful for many strategy and platform type games, and any other kind of project where they might come in handy. In this post I will be covering how to load external data from a json file that can contain all kinds of data for a tile map, such as frame index data and other useful properties.

<!-- more -->

## 1 - what to know

This is a post on loading an external json file that contains data for a tile map, which is a great way to quickly get started with level design in phaser ce. In this post I am making use of many aspects of phaser ce other then the tile map constructor, and some of the methods of that constructor. If you are new to phaser it might be best to start with my getting started with phaser post, and also check out my many other posts on various phaser related topics. Learning phaser is not something that is going to happen over night, it is a fairly complex framework that will take time to learn, but it sure is work the effort.

### 1.1 - This is a phaser 2.x post

In this post I am using phaser community edition 2.11.0.

## 2 - An example using an external tile map for level design


### 2.1 - The JSON file

For this example I am going to furnish a json file that follows one of two supported standards in phaser ce. The default format used by the tile map loader is Phaser.Tilemap.CSV, but in this post I will be using Phaser.Tilemap.TILED_JSON. This is a format used my the popular map editor known as [tiled](https://www.mapeditor.org/). I might get around to writing a post on this format in which I will get into this in further detail, but for now I will just link to the official docs on the [tiled json format](https://doc.mapeditor.org/en/stable/reference/json-map-format/).

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

```js
// load json and images
var loadWorldData = function (game) {
    game.load.tilemap('map-world1', '/forpost/phaser-tilemap-loader/world2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('image-blocks', '/img/sheet_blocks.png');
};
```

### 2.3 - Creates the tile map healper

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

### 2.4 - create a stage helper

```js
// create a stage from the map
var createStage = function (game, stageNum) {
 
    stageNum = stageNum || 1;
 
    var map = game.data.map;
 
    var stage = game.data.stage = map.createLayer('stage' + stageNum);
 
    return stage;
 
};
```

### 2.5 - display map properties

```js
// display the properties of a map
var displayMapProperties = function (game, textObj) {
 
    var props = game.data.map.properties;
 
    textObj.text = 'world: ' + props.world + '\/' + props.stages
 
};
```

### 2.6 - The Phaser.Game object

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