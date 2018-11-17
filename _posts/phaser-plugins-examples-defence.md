---
title: Defense game phaser plug-in examples
date: 2018-11-12 16:20:00
tags: [js,phaser]
layout: post
categories: phaser
id: 329
updated: 2018-11-16 19:20:22
version: 1.2
---

So today I got around to making another example that involves [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) plugins. This time around the aim was to make a simple defense style game.

<!-- more -->

## 1 - what to know

[plugins in general](/2018/10/09/phaser-plugins/) 


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
 
    // create a tile
    var createTile = function (c, r, row, rows) {
        var grid = game.data.grid,
        tile = game.make.sprite(c * 32, 0, opt.sheetKeys.gameBoard, 0);
        tile.inputEnabled = true;
        tile.data = {
            c: c,
            r: r,
            row: row,
            rows: rows
        };
        tile.events.onInputDown.add(function (tile) {
            var data = tile.data;
            grid.onTileClick.dispatch(tile, data.c, data.r, data.row, data.rows);
        });
        return tile;
    };
 
    // create a tile group
    var createTileGroup = function (game) {
        var grid = game.data.grid,
        r = 0,
        c,
        row,
        tile,
        rows = grid.rows = game.add.group();
        grid.onTileClick = new Phaser.Signal();
        while (r < opt.rows) {
            row = game.make.group();
            row.y = r * 32;
            c = 0;
            while (c < opt.cols) {
                row.add(createTile(c, r, row, rows));
                c += 1;
            }
            rows.add(row);
            r += 1;
        }
        rows.x = opt.xOffset;
        rows.y = opt.yOffset;
    };
 
    var updateRows = function () {
 
        var grid = game.data.grid,
        player = game.data.player,
        enemies = game.data.grid.enemies;
 
        grid.rows.forEach(function (row) {
 
            var activeEnemies = row.filter(function (child) {
                    return child.data.type === 'enemy';
                });
 
            activeEnemies.list.forEach(function (enemy) {
 
                enemy.x += game.time.elapsed / 1000 * 32;
 
                // if the enemy reaches end of row
                if (enemy.x >= opt.cols * 32) {
 
                    player.health -= 10;
                    enemy.kill();
                    enemies.add(enemy);
 
                }
 
            });
 
        });
 
    };
 
    // create the enemies group
    var createEnemiesGroup = function (game) {
        var enemies = game.data.grid.enemies = game.add.group(),
        i = 10,
        enemy;
        while (i--) {
            enemy = enemies.create(-32, 0, opt.sheetKeys.enemies, 0);
            enemy.data.type = 'enemy';
            enemy.inputEnabled = true;
            enemy.events.onInputDown.add(function (enemy) {
 
                enemy.kill();
                enemy.x = -32;
 
                // add the enemy back to the pool
                enemies.add(enemy);
 
            })
            enemy.kill();
            enemies.add(enemy);
        }
    };
 
    // spawn an enemy
    var spawnEnemy = function (game) {
        var enemies = game.data.grid.enemies,
        enemy = enemies.getFirstDead();
        if (enemy) {
            enemy.revive(10);
            row = game.data.grid.rows.children[Math.floor(Math.random() * opt.rows)];
            enemy.x = 0;
            row.add(enemy);
        }
    };
 
    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);
 
    // call once
    plug.init = function (opt) {
 
        // create or append game.data
        game.data = game.data || {};
 
        var player = game.data.player = {
            health: 100
        };
        game.data.grid = {
 
            lastSpawn: 0
 
        };
 
        game.data.disp = game.add.text(10, game.world.height - 20, 'hello', {
                fill: 'white',
                font: '15px courier'
            });
 
        createTileGroup(game);
        createEnemiesGroup(game);
 
        spawnEnemy(game);
 
    };
 
    // call once
    plug.update = function (opt) {
 
        var player = game.data.player,
        grid = game.data.grid,
        enemies = game.data.grid.enemies;
 
        game.data.disp.text = 'health: ' + player.health;
 
        updateRows(game);
 
        grid.lastSpawn += game.time.elapsed;
 
        if (grid.lastSpawn >= 3000) {
 
            grid.lastSpawn = 0;
            spawnEnemy(game);
 
        }
 
    };
 
    // add the plugin to the game
    game.plugins.add(plug, opt);
 
};
```
