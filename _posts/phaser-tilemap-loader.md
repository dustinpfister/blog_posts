---
title: loading tilemap data from external json in phaser ce
date: 2018-09-25 20:46:00
tags: [js,phaser]
layout: post
categories: phaser
id: 287
updated: 2018-09-26 12:06:04
version: 1.1
---

So tile maps are an important component of phaser that allows for making a map of fram index values from a sprite sheet, which is useful for many strategy and platform type games. In this post I will be covering how to load external data from a json file that can contain all kinds of data for a tile map which is useful for level design.

<!-- more -->



## 2 - Basic example that loads an external tile map

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


```js
// load json and images
var loadWorldData = function (game) {
    game.load.tilemap('map-world1', '/forpost/phaser-tilemap-loader/world2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('image-blocks', '/img/sheet_blocks.png');
};
```

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

```js
// create a stage from the map
var createStage = function (game, stageNum) {
 
    stageNum = stageNum || 1;
 
    var map = game.data.map;
 
    var stage = game.data.stage = map.createLayer('stage' + stageNum);
 
    return stage;
 
};
```

```js
// display the properties of a map
var displayMapProperties = function (game, textObj) {
 
    var props = game.data.map.properties;
 
    textObj.text = 'world: ' + props.world + '\/' + props.stages
 
};
```

```js
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
```