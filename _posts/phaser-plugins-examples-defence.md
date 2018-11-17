---
title: Defense game phaser plug-in examples
date: 2018-11-12 16:20:00
tags: [js,phaser]
layout: post
categories: phaser
id: 329
updated: 2018-11-17 18:44:42
version: 1.27
---

So today I got around to making another example that involves [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) plugins. This time around the aim was to make a simple defense style game plugin. The process of even making a simple defense game can some times be a compacted one, a greate deal of logic needs to be in effect to govern things like when an enemy is to spawn, and what happens when it reaches a certain point, such as the side of the screen which is typical for most of these kinds of games. In this post I will be writing about a plugin that I made that contains much of the basic component of a simple defense style game.

<!-- more -->

## 1 - what to know

The plugin I am writing about here is not really a complete game by itself, but contains a fair amount of logic that can then be used in conjunction with other plugins that can produce a full game. This idea here is to offset blocks of logic into septate collections of code that can work by itself, but will work best of enhanced with additional options components.

This is not a getting started post with [plug-ins]([plugins in general](/2018/10/09/phaser-plugins/) ), or with phaser in general. I am also using a lot of other phaser features in this post as well, such as groups, and sprites that you should get up to speed with before hand if you have not done so all ready.

### 1.1 - This is a phaser ce 2.x post

In this post I am using [phaser](https://phaser.io/) community edition 2.11.1

## 2 - The defense plug-in

So the plug-in that I put together for this post is not a done deal necessarily, if I where to continue developed this is would likely eventually break apart into several plugins. Regardless if that is the case or not it would al least contain a few more features that I have just not got around to. However it should still serve the purpose of providing and example of the beginnings of what might eventually be a defense game. Pulling code into modules or plug-ins like this is just necessary for the purpose of keeping things well organized.

Anyway the plugin contains many helper functions that are used to do things like create, and update a pool of enemies, as well as the dimensions of a game board area. It can accept a few arguments from an options object that allow for me to change things like the position of the game board relative to the game world. In this section I will be covering all of these methods, what they do, and link to other posts that elaborate on the various phaser ce features that are used.

### 2.1 - Starting off the plugin

I started off the plug-in with a function literal assigned to a signal global variable. This function will be called once in the create method of a state object to setup the plug-in. After that I set up some defaults for sprite sheet keys, the col and row size of the grid, the offset position and spawn rate.

```js
var Plugin_defence = function (game, opt) {
 
    opt = opt || {};
 
    opt.sheetKeys = opt.sheetKeys || {
        gameBoard: 'sheet-gameboard',
        enemies: 'sheet-enemies'
    };
    opt.cols = opt.cols || 8;
    opt.rows = opt.rows || 6;
    opt.xOffset = opt.xOffset || 16;
    opt.yOffset = opt.yOffset || 16;
    opt.spawnRate = opt.spawnRate || 3000;
```

Later in development if I continue working on this I will likely add a great deal more in terms of these kinds of variables but for the sake of this post it might be best to keep things simple.

### 2.2 - The create tile helper

Here I have a method that will create tiles. Although I am not making much use of it in this post the reasoning is that I would eventually add buildings that can by constructed by the player. Here I am using sprite [data objects](/2018/09/14/phaser-sprite-data/) to store some values that can be quickly retrieve when making some else outside of this plug-in such as an interface.

```js
    // create a tile
    var createTile = function (c, r, row, rows) {
        var grid = game.data.grid,
 
        // create the tile sprite
        tile = game.make.sprite(c * 32, 0, opt.sheetKeys.gameBoard, 0);
 
        // input enable the tile
        tile.inputEnabled = true;
        tile.data = {
            c: c,
            r: r,
            row: row,
            rows: rows
        };
 
        // fire onTileClick event when clicked
        tile.events.onInputDown.add(function (tile) {
            var data = tile.data;
            grid.onTileClick.dispatch(tile, data.c, data.r, data.row, data.rows);
        });
 
        // return the tile
        return tile;
 
    };
```

For each tile I input enabled it so that when the player clicks a tile sprite it will fire a custom event I have made using [Phaser.signal](/2018/10/04/phaser-signal/).

### 2.3 - The create tile group method

So the create tile method that I mentioned above is used in this method that is used to create [nested groups](/2018/08/27/phaser-group-nesting/) of rows of tiles in another group. I decided to go this way rather than using a tile map. One of the reasons why was because I ran into difficulties when setting an offset for the tile map layer instance. if I really wanted to I could do it, but it makes things more complicated because the map data is still set relative to the game world rather than the offset that I give. So a solution involving nested groups of sprites proved to be a simpler solution to make a grid.

```js
    // create a tile group
    var createTileGroup = function (game) {
 
        var grid = game.data.grid,
        r = 0,
        c,
        row,
        tile,
 
        // make rows a new group
        rows = grid.rows = game.add.group();
 
        // add an onTileClick event that will be called each time
        // a tile is clicked
        grid.onTileClick = new Phaser.Signal();
 
        // while r is less than opt.rows
        while (r < opt.rows) {
 
            // make a new row
            row = game.make.group();
            row.y = r * 32;
            c = 0;
 
            // create tiles for the row
            while (c < opt.cols) {
                row.add(createTile(c, r, row, rows));
                c += 1;
            }
 
            //add row to rows group
            rows.add(row);
            r += 1;
        }
        rows.x = opt.xOffset;
        rows.y = opt.yOffset;
    };
```

### 2.4 - Create Enemies Group

So I also have a method that is used to create a group of enemy sprites.

```js 
    // create the enemies group
    var createEnemiesGroup = function (game) {
        var enemies = game.data.grid.enemies = game.add.group(),
        i = 3,
        enemy;
        while (i--) {
 
            // create an enemy
            enemy = enemies.create(-32, 0, opt.sheetKeys.enemies, 0);
 
            // type id used to help with filtering
            enemy.data.type = 'enemy';
 
            // 8 - 24 pixels per second
            enemy.data.pps = 8 + Math.floor(Math.random() * 16);
 
            // enemy is input enabled so the player can click on it
            enemy.inputEnabled = true;
            enemy.events.onInputDown.add(function (enemy) {
 
                enemy.kill();
                enemy.x = -16;
 
                // add the enemy back to the pool
                enemies.add(enemy);
                updateActiveEnemies(game);
 
            });
 
            // enemies are dead when they are in the enemy pool
            enemy.kill();
            enemies.add(enemy);
        }
    };
```

### 2.5 - Update enemies

So here is a method that updated enemies on each frame tick. For now all I do is just move the enemies from the left side to the right side of the grid. Once the enemy sprite reaches the right side of the grid the player looses health, and the enemy is killed and return to the pool of enemy sprites.

```js
    // what to do for enemies on each tick
    var updateEnemies = function (game) {
 
        var enemies = game.data.grid.enemies,
        player = game.data.player;
 
        // for all current active enemies in the grid
        game.data.grid.activeEnemies.forEach(function (enemy) {
 
            // move enemy
            enemy.x += game.time.elapsed / 1000 * enemy.data.pps;
 
            // if the enemy reaches end of row
            if (enemy.x >= opt.cols * 32) {
                // the player looses health
                // and returns to the enemy pool
                player.health -= 10;
                enemy.kill();
                enemies.add(enemy);
                updateActiveEnemies(game);
            }
        });
 
    };
```

### 2.6 - update active enemies list

I ended up working out a solution where enemies are moved from a pool of enemy sprite objects to the group that contains my rows of tiles. So I needed a method that updated a list of enemy sprites.

```js
    // update the list of active enemies in the grid
    var updateActiveEnemies = function (game) {
        var rows = game.data.grid.rows;
        game.data.grid.activeEnemies = rows.filter(function (child) {
                if (child.data) {
                    return child.data.type === 'enemy';
                }
            }).list;
    };
```

### 2.7 - Spawn an enemy

Here I have a method that spawns an enemy sprite by reviving a dead sprite from the pool of enemy sprites, and moving it to the group of rows of tile sprites.

```js
    // spawn an enemy
    var spawnEnemy = function (game) {
 
        var enemies = game.data.grid.enemies,
        rows = game.data.grid.rows,
 
        // get first dead from enemy pool
        enemy = enemies.getFirstDead();
 
        // if enemies.getFirstDead returns an enemy
        if (enemy) {
 
            // revive the enemy
            enemy.revive(10);
 
            //and add it to the rows group
            row = rows.children[Math.floor(Math.random() * opt.rows)];
            enemy.x = 0;
            enemy.y = row.y;
            rows.add(enemy);
 
            // update active enemies array
            updateActiveEnemies(game);
 
        }
    };
```

### 2.8 - The plug in object

So now that I have all my helpers worked out I can now create and append the plug-in object. For this plug-in I have an init, and update method.

```js
    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);
 
    // called once
    plug.init = function () {
 
        // create or append game.data
        game.data = game.data || {};
 
        // set up player and grid objects
        game.data.player = {
            health: 100
        };
        game.data.grid = {
            lastSpawn: 0,
            activeEnemies: []
        };
 
        // create tiles, and enemies
        createTileGroup(game);
        createEnemiesGroup(game);
 
    };
 
    // called on each frame tick
    plug.update = function () {
 
        var grid = game.data.grid,
        enemies = grid.enemies;
 
        // update enemies
        updateEnemies(game);
 
        // spawn enemies
        grid.lastSpawn += game.time.elapsed;
        if (grid.lastSpawn >= opt.spawnRate) {
            grid.lastSpawn = 0;
            spawnEnemy(game);
        }
 
    };
 
    // add the plugin to the game
    game.plugins.add(plug, opt);
 
};
```

## 3 - Using the plug-in

So to use the plug-in I just need to create an instance of Phaser.Game,a dn call the Plugin_defence global function, passing the instance of the game as well as an option options object.

### 3.1 - Making some sprite sheets

I can set keys for sprite sheets in the options object that I pass to the plug-in, but for this example I created sprites for the default keys that the plug-in looks for. like with many of the simple sprite sheets that I make for my blog posts on phaser I went with a canvas solution for making a sprite sheet.

```js
var createSheetGameBoard = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, 31, 31);
    game.cache.addSpriteSheet('sheet-gameboard', null, canvas, 32, 32, 1, 0, 0);
};
 
var createSheetEnemies = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 32, 32);
    game.cache.addSpriteSheet('sheet-enemies', null, canvas, 32, 32, 1, 0, 0);
};
```

### 3.2 - The Phaser.Game instance

Here I have the actual Phaser.game instance. In the create method of the state object I create my sprite sheets, and then call the plug-ins main function passing the instance of phaser.Game, and an options object. I also tested out my custom event that I have created that fires each time a tile is click by adding a hander to it, and create a text object to display the status of the players health.

```js
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        createSheetGameBoard(game);
        createSheetEnemies(game);
 
        Plugin_defence(game, {
            xOffset: 32,
            yOffset: 32,
            spawnRate: 2000
        });
 
        game.data.grid.onTileClick.add(function (tile, c, r, row, rows) {
            console.log(tile, c, r, row, rows);
        });
 
        game.data.disp = game.add.text(10, game.world.height - 20, 'hello', {
                fill: 'white',
                font: '15px courier'
            });
 
    },
 
    update: function () {
 
        game.data.disp.text = 'health: ' + game.data.player.health;
 
    }
 
});
 
game.state.start('demo');
```

## 4 - Conclusion

When all is up and working what I have so far is a situation in which enemy sprites spawn and move from one side of the grid to the other when they do that player looses health,and then end up back in a pool to be reused again later. I can also click on them to kill them as well. Not much to write about for now. Still plug-ins are a great way to keep my code well organized when making a project.