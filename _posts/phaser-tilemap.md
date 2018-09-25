---
title: Starting out with Tile maps in phaser
date: 2018-09-20 18:06:00
tags: [js,phaser]
layout: post
categories: phaser
id: 284
updated: 2018-09-25 10:42:04
version: 1.9
---

When working with [Phaser ce](https://photonstorm.github.io/phaser-ce/) some projects might require the use of a time map. A tile map is a way of creating a an scene with a gird the contains a frame index for eac grid position, and each index refers to a standard texture in a sprite sheet. There is a lot to cover with tile maps, so this post will just be a quick overview of how to get started with them in phaser ce.

<!-- more -->

## 1 - What to know

There is a great deal to know about tile maps in phaser ce, both with tile maps themselves and what is required before hand. This post will just serve as a getting started post with tile maps, and as my content on tile maps grows I will update this post and link to more advanced topics as needed. I will not be getting into every little key detail about phaser of course, and assume that you have at least some background with phaser ce, and javaScript in general. If not you might choose to start with my getting started post on phaser ce, and check out my many other posts on phaser ce that cover other aspects of the framework.


## 2 - Basic tile sheet example

For a basic example of using a tile map, I made an example that is just a single layer, and will cycle throw all possible index values for a tile when it is clicked. The basic process is to create an instance of a tile map, add a sprite sheet to it that will be used to skin the tiles, create at least one layer, and then set some index values for the tiles.

### 2.1 - Create a tilemap instance

So first I need to have an instance of a tile map to get things started. For this example I have pulled this part of the process into a single helper method that will create the map with some values that are set with number literals, and then also adds a sprite sheet to the map that is assumed to be there, then returns the map. For this simple example it should work fine as long as it is used in the proper order after I have my sprite sheet, more on that laster.

```js
// just create a new map, add a tile set image, and return a
// reference to the map
var createMap = function (game) {
 
    // CREATE A TILEMAP
    var map = game.add.tilemap(null, 32, 32, 6, 6);
 
    // ADD A SPRITE SHEET
    map.addTilesetImage('sheet-blocks');
 
    return map;
 
};
```

When calling game.add.tilemap the first argument is a key to tilemap data that is stored in the cache, because in this example I am working with a blank tilemap, I leave this value as null. The next augments have to do with setting the tile size, and the grid size. So in this map I am working with tiles that are 32 by 32 pixles, and it is a 6 by 6 grid.

### 2.2 - Create at least one layer for the tilemap

Once I have a tile map I will want to create at least one layer. A layer is very similar to a Sprite, as it is another example of a kind of display object in phaser ce. As Such many of the properies and method that you may all ready be aware of with sprites are the same. For this example I create a new layer for the map by calling map.create, then enable input, and attach a single onInputDown event that will cycle the index values of a tile when clicked.

```js
// create a layer for the given map
var createLayer = function (map) {
 
    // CREATE A LAYER
    var layer = map.create('my-layer', 6, 6, 32, 32);
 
    // a layer is like a sprite
    // many of the properties and methods are the same
    layer.inputEnabled = true;
    layer.fixedToCamera = false;
    layer.x = 32;
    layer.y = 32;
    layer.events.onInputDown.add(function (layer, pt) {
        var x = Math.floor((pt.x - layer.x) / 32),
        y = Math.floor((pt.y - layer.y) / 32),
        tile = map.getTile(x, y);
        tile.index += 1;
        tile.index = tile.index % 3;
        map.putTile(tile.index, x, y);
    });
 
};
```

You might have noticed that I set fixed to camera to false in this example. By default this value is set to true, not a big deal in this example, and most projects that make use of time maps for that matter. If it is a project in which the tile map needs to scroll it may be better to change the index values of the tiles rather than making a tilemap that is larger than the canvas size, so it is okay that it is fixed to the camera. However this is one of the few little things to be aware of when working with tile maps.

### 2.3 - Generate some index data for the map

So now that I have a map with a sprite sheet, and at least one layer, I now want to have some index data for the map. So for starters I made a method that will generate a bunch of random index values in a range set by a number literal. Nothing fancy, but it will work okay for this simple getting started example.

```js
// set random index data
var setRandomMapIndexData = function (map) {
 
    // map.ForEach can be used to set all index values in
    // an area
    map.forEach(function (tile) {
        tile.index = Math.floor(Math.random() * 2);
    }, this, 0, 0, 6, 6);
 
};
```

The map.forEach method is one of the many tile map method that make working with a tile map a breeze compared to making my own solution from the ground up. The map.forEach method as the name suggests will run over each tile, in a given area. For this example I am setting index values for each tile in the whole map.

### 2.4 - Have a sprite sheet for the map

So now that I have all the helpers worked out in order for this all to work I will need that sprite sheet that I used in my helper that creates a map to begin with. So here is my mkSheet helper that I use to make a simple sprite sheet consisting of solid color blocks that is made via a canvas element.

```js
// make a sprite sheet for the tile sheet
var mkSheet = function () {
 
    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 96;
    canvas.height = 32;
 
    // green block
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 0, 32, 32);
 
    // red block
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(32, 0, 32, 32);
 
    // blue block
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(64, 0, 32, 32);
 
    // add a single sheet to cache
    game.cache.addSpriteSheet('sheet-blocks', null, canvas, 32, 32, 3, 0, 0);
 
};
```

In other real projects I might use a sprite sheet that is loaded from an external file, but for these simple hello world examples a simple solution like this works just fine. I also some times make more complex solutions like this as well for hyper casual style games, where graphics are not really the greatest selling point of a game.

### 2.5 - Making use of all this with Phaser.Game

Now that I have everything that I need to get this basic tile map example working all that is left is to make use of it all with an instance of Phaser.Game. For this example I will only need a single state object as well.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        // make the sheet
        mkSheet(game);
 
        // first create a map
        var map = createMap(game);
 
        // have at least one layer
        createLayer(map);
 
        // some index data is needed
        setRandomMapIndexData(map);
 
    }
 
});
 
game.state.start('boot');
```

I just need to create the sprite sheet first so that my createMap method will work, and then I will want to create a layer before adding index data as well. So the helpers should be called in this order. For this example the only action is event driven so there is no need for an update method, so I only need an create method in the single state object. 

If all goes well when this project runs there should be something that works like a basic pain program where clicking on each tile will result in the colors of the tiles cycling throw each possible index. Noting to get to excited over, but this was a basic example after all.

## 3 - Conclusion

There is a whole lot more to write about when it comes to tile maps, such as layering, working with external data via json, and the host of methods tips and tricks with just tile maps alone in phaser ce. If you have a particular aspect of tile maps that you would like for me to look into more please fell free to let me know in the comments, I would like to expand on this area more. In any case be sure to have fun with phaser ce, that is kind of the idea right?