---
title: Making a turn based RPG game javaScript project example
date: 2021-12-10 10:02:00
tags: [js]
layout: post
categories: js
id: 944
updated: 2021-12-10 11:32:55
version: 1.8
---

This week the plain is to expand my collection of simple [JavaScript project examples](/2021/04/02/js-javascript-example/), this time a simple turned based rpg based on the source code of another [javaScript project example that has to do with grid unit movement](/2020/08/11/js-javascript-example-grid-game-unit-movement/). When it comes to the source code of the grid unit movement example I mad a whole lot of improvements to the source code of that example, and I thought that I should take the time to continue to expand on that source code but as a whole other project folder. This example is then that project as it currently stands, and as of this writing I still have a lot of work to do with this when it comes to turning this source code into yet another project that might end up being some kind of final product.

I have a lot of ideas of what I would like the final product to be when I get to that point. This time around I may in fact make a final product with this one because I still seem to still be stuck in that awful start something but never finish something loop, and I want to break out of it. So I will be getting into making art assets, and external json files that hold things like scene data and so forth, but at the time of this writing that just happens to be what I am working on now.

So when it comes to writing a blog post about what I have together at this point the focus will be on the various features that I have added at the time that I stopped working on my improved form of the previous example, and started working on this example. With that said one improvement thus far has to do with breaking things down a little when it comes to units, pulling logic out of the main game state module and into a units module. Another talking point has to do with starting a custom state machine, and a few files that are state objects for said state machine. The main feature thus far though is my game state menu system that is inspired by the circle menu system in from the super Nintendo game called Secret of Mana. As of this writing it is not a clone of that just yet, and I will want to make chances that will work well when it comes to having a web based game version of it, but thus far I would say that is the best feature thus far with this one.

<!-- more -->

## - What to know first before reading more

This is a javaScript example that aims to be a kind of turn based RPG game, the source code of which is still not in a finished state. However there is a whole lot to write about it when it comes to what I have worked out thus far, and there is only so much more to do when it comes to further refining what I have in place. The example is as of revision 5 starting to feel like a finished game, but I still have at lase a little more work to do with it to ay the least when it comes to new features.

So there are two main points to take into account with this, one of which is that this is not at all any kind of [getting started with javaScript type post](/2018/11/27/js-getting-started/). So if you are new to javaScript this post may prove to be a little to advanced. The other main point that I think I should cover in this section is that I am still very much working on this example and intend to continue doing so for at least a little while longer so the source code examples in this post do not reflect the current state of the example.

### The up to date source code, and any additional assets ca be found at my test vjs repository

The up to date source code, along with any additional assets that I am not writing about here can be found in the [folder that corresponds to this post in my test vjs repository on Github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-turn-based-rpg). As of this writing I am writing about revision 5 of the source code there, I am currently working on r6, and have things planed out to at least r15 for now and I do not have everything written down just yet when it comes to the todo list. This test vjs repository is also where I park many other javaScript project examples, as well as the [examples for my various posts on javaScript in general](/categories/js/).

## 1 - The game javaScript file and renderer

In this section I will be writing about that main game module that is used to create and mutate a main game state object, as well as the library that I use to draw various parts of this state to a canvas element.

### 1.1 - game.js

```js
var gameMod = (function () {
    var api = {};
/********** **********
     TO MAP OBJECT
*********** *********/
    // Is a given cell at a corner? Used to get adjust goto point for game.toMap object
    var isAtCorner = function(game, cell){
        var map = game.maps[game.mapIndex],
        w = map.w - 1,
        h = map.h - 1;
        return (cell.x === 0 && cell.y === 0) || 
            (cell.x === w && cell.y === h) || 
            (cell.x === 0 && cell.y === h) || 
            (cell.x === w && cell.y === 0);
    };
    // return a toIndexOptions array for the given map position in the current game map
    var getToIndexOptions = function(game, x, y, ox, oy){
        var toIndex = null,
        dir = '',
        p = game.player,
        map = game.maps[game.mapIndex],
        cell = mapMod.get(map, x, y),
        mwx = game.mapIndex % game.mapWorldWidth,                 // map world x and y
        mwy = Math.floor(game.mapIndex / game.mapWorldWidth ),
        options = [];
        if(isAtCorner(game, cell)){
            if(x === 0 && y === 0){
                return getToIndexOptions(game, 0, 1, x, y).concat(getToIndexOptions(game, 1, 0, x, y));
            }
            if(x === map.w - 1 && y === 0){
                return getToIndexOptions(game, map.w - 1, 1, x, y).concat(getToIndexOptions(game, map.w - 2, 0, x, y));
            }
            if(x === map.w - 1 && y === map.h - 1){
                return getToIndexOptions(game, map.w - 1, map.h - 2, x, y).concat(getToIndexOptions(game, map.w - 2, map.h - 1, x, y));
            }
            if(x === 0 && y === map.h - 1){
                return getToIndexOptions(game, 0, map.h - 2, x, y).concat(getToIndexOptions(game, map.w - 2, map.h - 1, x, y));
            }
        }else{
            // if player cell x equals 0 ( left side )
            if(x === 0){
                var x = mwx - 1;
                x = x < 0 ? game.mapWorldWidth - 1 : x;
                toIndex = mwy * game.mapWorldWidth + x;
                dir = 'west';
            }
            // if player cell x equals map.w - 1 ( right side )
            if(x === map.w - 1){
                var x = mwx + 1;
                x = x >= game.mapWorldWidth ? 0 : x;
                toIndex = mwy * game.mapWorldWidth + x;
                dir = 'east';
            }
            // if player cell y equals 0 ( top side )
            if(y === 0){
                var y = mwy - 1;
                y = y < 0 ? game.maps.length / game.mapWorldWidth - 1 : y;
                toIndex = y * game.mapWorldWidth + mwx;
                dir = 'north';
            }
            // if player cell y map.h - 1 ( bottom side )
            if(y === map.h - 1){
                var y = mwy + 1;
                y = y >= game.maps.length / game.mapWorldWidth ? 0 : y;
                toIndex = y * game.mapWorldWidth + mwx;
                dir = 'south';
            }
        }
        // return array with index and dir text
        return dir === '' ? [] : [{
           mi: toIndex,
           dir: dir,
           x: ox === undefined ? x : ox,
           y: oy === undefined ? y : oy
        }];
    };
    // get a toMap object that can be set to the game.toMap propery
    var getToMap = function(game){
        var toMap = {index: null, x: null, y: null};
        var pCell = api.getPlayerCell(game);
        var map = game.maps[game.mapIndex];
        var options = toMap.options = getToIndexOptions(game, pCell.x, pCell.y);
        options = options.map(function(opt){
            if(opt.dir === 'north'){
                opt.y = map.h - 1;
            }
            if(opt.dir === 'south'){
                opt.y = 0;
            }
            if(opt.dir === 'east'){
                opt.x = 0;
            }
            if(opt.dir === 'west'){
                opt.x = map.w - 1;
            }
            return opt;
        });
        // assume first index
        if(options.length >= 1){
            toMap.index = options[0].mi;
            toMap.x = options[0].x;
            toMap.y = options[0].y;
        }
        return toMap;
    };
/********** **********
     MOVEMENT PATHS
*********** *********/
    // get a move path in the from of a path created using mapMod.getPath that is cut
    // based on the maxCellsPerTurn value of the unit in the given start cell if any
    var getMovePath = function(game, startCell, targetCell){
        // get current map
        var map = game.maps[game.mapIndex],
        unit = startCell.unit || null;
        // get the raw path to that target cell
        var path = mapMod.getPath(map, startCell.x, startCell.y, targetCell.x, targetCell.y);
        // get a slice of the raw path up to unit.maxCellsPerTurn
        if(unit){
            path = path.reverse().slice(0, unit.maxCellsPerTurn);
        }
        // return the path
        return path;
    };
    // get an arary of cell index values
    var getMoveCells = function(game, startCell, targetCell){
        var map = game.maps[game.mapIndex];
        return getMovePath(game, startCell, targetCell).map(function(pos){
            var cell = mapMod.get(map, pos[0], pos[1]);
            return cell.i;
        });
    };
    // get enemy move cells options
    var getEnemeyMoveCells = function(game, eCell){
        var pCell = api.getPlayerCell(game),
        map = game.maps[game.mapIndex];
        // get neighbor cells of the player unit
        var pCellNeighbors = mapMod.getNeighbors(map, pCell).filter(function(cell){
            return cell.walkable;
        });
        // get an array of path options 
        var mtcOptions = pCellNeighbors.map(function(cell){
            return getMoveCells(game, eCell, cell)
        }).filter(function(mtcOptions){
            return mtcOptions.length > 0;
        });
        // rteurn first path or empty array
        return mtcOptions[0] || [];
    };
/********** **********
     UNITS
*********** *********/
    // place a unit at the given location in the current map
    var placeUnit = function (game, unit, x, y) {
        var map = game.maps[game.mapIndex];
        var newCell = mapMod.get(map, x, y);
        if (newCell) {
            // any old cellIndex that may need to have walkable
            // set back to true?
            if (unit.currentCellIndex != null) {
                var oldCell = map.cells[unit.currentCellIndex];
                oldCell.walkable = true;
                // set unit ref back to null
                map.cells[unit.currentCellIndex].unit = null;
            }
            // set new cell to not walkable as a unit is now located here
            newCell.walkable = false;
            // set current cell index for the unit
            unit.currentCellIndex = newCell.i;
            // place a ref to the unit in the map cell
            map.cells[unit.currentCellIndex].unit = unit; // map ref to unit
        }
    };
    // place player helper that is called when setting up a new game, and when the player
    // moves to a new map
    var placePlayer = function(game){
        var map = game.maps[game.mapIndex],
        toMap = game.toMap,
        toCell = null,
        i = map.cells.length;
        // get a toCell ref if we have a pos in game.toMap
        if(toMap.x != null && toMap.y != null){
            toCell = mapMod.get(map, toMap.x, toMap.y);
        }
        // if we have a toCell
        if(toCell){
            if(!toCell.unit){
                placeUnit(game, game.player, toCell.x, toCell.y);
                game.toMap = getToMap(game);
                return;
            }
        }
        // if we get this far just find a spot
        while(i--){
            var cell = map.cells[i];
            if(cell.unit === null){
                placeUnit(game, game.player, cell.x, cell.y);
                game.toMap = getToMap(game);
                return;
            }
        }
    };
    // move a unit by way of any cell index values in unit.moveCells
    var moveUnit = function(game, unit){
        if(unit.moveCells.length > 0){
            var ci = unit.moveCells.shift();
            var moveToCell = mapMod.get(game.maps[game.mapIndex], ci);
            // if no unit at the move to cell
            if(!moveToCell.unit){
                placeUnit(game, unit, moveToCell.x, moveToCell.y);
            }
            // !!! might not hurt to do this for all units
            // also this might not belong here but where this method
            // is called for the player unit maybe
            if(unit.type === 'player'){
                game.toMap = getToMap(game);
            }
        }
    };
/********** **********
     MAP HELPERS
*********** *********/
// get an array of cell objects by a given unit type string in the given map
var getCellsByUnitType = function(map, type){
    return map.cells.reduce(function(acc, cell){
        if(cell.unit){
            if(cell.unit.type === type){
                acc.push(cell);
            }
        }
        return acc;
    },[]);
};
 
    var changeMap = function(game){
        var pCell = api.getPlayerCell(game);
        game.mapIndex = game.toMap.index;
        pCell.unit = null;
        pCell.walkable = true;
        game.player.currentCellIndex = null;
        placePlayer(game);
        game.toMap = getToMap(game);
    };
 
/********** **********
     SETUP GAME
*********** *********/
    // setUp game helper with game object, and given maps
    var setupGame = api.setupGame = function (game, newGame) {
        newGame = newGame === undefined ? true : newGame;
        var playerPlaced = false,
        startMapIndex = 0;
        game.mapIndex = 0;
        // set player HP to max
        game.player.HP = game.player.maxHP;
        if(newGame){
            game.remainingEnemies = 0;
        }
        // make sure mode starts out on map mode
        game.mode = 'map';
        // set up maps
        game.maps = game.maps.map(function(map, mi){
            var mapStr = game.mapStrings[mi] || '';
            game.mapIndex = mi;
            map.cells = map.cells.map(function(cell, ci){
                var cellIndex = parseInt(mapStr[ci] || '0'),
                x = ci % map.w,
                y = Math.floor(ci / map.w);
                if(cellIndex === 0 && newGame){
                    var cell = mapMod.get(map, ci);
                    cell.unit = null;
                    cell.walkable = true;
                }
                // wall blocks set for new games and not
                if(cellIndex === 1){
                    var wall = unitMod.createUnit('wall');
                    placeUnit(game, wall, x, y);
                }
                // player always set
                if(cellIndex === 2){
                    playerPlaced = true;
                    startMapIndex = mi;
                    placeUnit(game, game.player, x, y);
                }
                // enemy
                if(cellIndex === 3 && newGame){
                    game.remainingEnemies += 1;
                    var enemy = unitMod.createUnit('enemy');
                    enemy.HP = enemy.maxHP;
                    placeUnit(game, enemy, x, y);
                }
                return cell;
            });
            return map;
        });
        // if player is not palced then place the player unit
        // at a null cell
        if(!playerPlaced){
            placePlayer(game);
        }
        game.mapIndex = startMapIndex;
        game.toMap = getToMap(game);
    };
/********** **********
     MENU POOL
*********** *********/
var menuPool = {
    count: 8,
    disableLifespan: true,
    data: {
        outerRadius: 75,
        innerRadius: 25,
        outerTotal: 1,
        frame: 0,
        maxFrame: 15,
        activeButton: null, // a ref to the active button to use on 'exit' mode end
        mode: 'enter'       // current mode of the menuPool 'enter', 'exit'
    }
};
 
menuPool.spawn = function(button, options, sm, spawnOpt){
    var bd = button.data,
    pd = options.data;
    // button data
    bd.desc = spawnOpt.desc || false;
    bd.cx = button.x = sm.canvas.width / 2 - button.w / 2;
    bd.cy = button.y = sm.canvas.height / 2 - button.h / 2;
    bd.radius = 0;
    bd.a = 0;
    bd.ta = spawnOpt.ta === undefined ? Math.PI * 2: spawnOpt.ta;
    bd.outer = spawnOpt.outer === undefined ? true : spawnOpt.outer;
    bd.onClick = spawnOpt.onClick || function(){};
    // pool data
    pd.frame = 0;
    pd.outerTotal = spawnOpt.outerTotal === undefined ? 1 : spawnOpt.outerTotal
};
 
menuPool.update = function(button, options, sm, secs){
    var pd = options.data,
    bd = button.data;
    // !!! updating pool data here is not so great
    if(button.i === options.objects.length - 1){
        // if we are in enter mode
        if(pd.mode === 'enter'){
            pd.frame += 30 * secs;
            pd.frame = pd.frame >= pd.maxFrame ? pd.maxFrame : pd.frame;
        }
        // if we are in exit mode
        if(pd.mode === 'exit'){
            pd.frame -= 30 * secs;
            pd.frame = pd.frame < 0 ? 0 : pd.frame;
            if(pd.frame === 0 && pd.activeButton){
                pd.activeButton.data.onClick.call(sm, sm, pd.activeButton);
            }
        }
    }
    var per = pd.frame / pd.maxFrame;
    var radius = bd.outer ? pd.outerRadius : pd.innerRadius;
    bd.a = bd.ta * per;
    button.x = bd.cx + Math.cos(bd.a) * radius * per;
    button.y = bd.cy + Math.sin(bd.a) * radius * per;
};
 
/********** **********
     gameMod.create PUBLIC METHOD
*********** *********/
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        //var mapStrings = opt.maps || ['2'];
        var game = {
            mode: 'map', // 'map' for the game in action, and 'menu' for the circle options menu
            turn: 0,
            turnState: 'wait',
            maps: [],
            mapIndex: 0,
            mapWorldWidth: 3, // used to find toIndex
            toMap: {
                index: null,
                x: null,
                y: null
            },
            mapStrings: opt.maps || ['2'],
            player: unitMod.createUnit('player'),
            remainingEnemies: 0,
            options: new poolMod.create(menuPool), // pool of objects used for the circle menu
            pointerDownTime: new Date()            // used to find out if we are dealing with a long press or not
        };
        game.mapStrings.forEach(function(){
            game.maps.push(mapMod.create({
                marginX: opt.marginX === undefined ? 32 : opt.marginX,
                marginY: opt.marginY === undefined ? 32 : opt.marginY,
                w:  opt.w === undefined ? 4 : opt.w,
                h:  opt.h === undefined ? 4 : opt.h
            }));
        });
        setupGame(game, true);
        return game;
    };
/********** **********
     gameMod.update PUBLIC METHOD
*********** *********/
    var processMeele = function(game, unit){
        var targetCellIndex = unit.meleeTarget,
        map = game.maps[game.mapIndex];
        if(targetCellIndex != null){
            var targetCell = mapMod.get(map, targetCellIndex),
            tUnit = targetCell.unit;
            if(tUnit){
                // unitMod meleeAttack method
                unitMod.meleeAttack(unit, tUnit);
                // enemy unit death check
                if(tUnit.HP <= 0 && tUnit.type === 'enemy'){
                    targetCell.walkable = true;
                    targetCell.unit = null;
                }
            }
            unit.meleeTarget = null;
        }
    };
    // get remaining Enemies helper used to update game.remainingEnemies in 'end' process turn state
    var getRemainingEnemies = function(game){
        return game.maps.reduce(function(acc, map){
            var eCells = getCellsByUnitType(map, 'enemy');
            return acc + eCells.length;
        }, 0);
    };
    // process turn method used in gameMod.update
    var processTurn = function(game, secs){
        var map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game),
        eCells = getCellsByUnitType(map, 'enemy');
        // do nothing for 'wait' state
        if(game.turnState === 'wait'){
            return;
        }
        // starting a new turn
        if(game.turnState === 'start'){
            // let enemy units figure paths
            eCells.forEach(function(eCell){
                var d = utils.distance(eCell.x + 16, eCell.y + 16, pCell.x + 16, pCell.y + 16);
                if( d <= 1.5){
                    // in melee range player
                    eCell.unit.meleeTarget = pCell.i;
                }else{
                    // not in melee range of player
                    eCell.unit.moveCells = getEnemeyMoveCells(game, eCell);
                }
                //console.log(eCell.unit.moveCells);
            });
            game.turnState = 'move';
        }
        // move state
        if(game.turnState === 'move'){
            // move player unit
            moveUnit(game, game.player);
            eCells.forEach(function(eCell){
                moveUnit(game, eCell.unit);
            });
            var eCells = getCellsByUnitType(map, 'enemy');
            // if moveCells array length of all units === 0 the move state is over
            if(game.player.moveCells.length === 0 && eCells.every(function(eCell){
                return eCell.unit.moveCells.length === 0;
            })){
                game.turnState = 'melee';
            }
        }
        // melee attack
        if(game.turnState === 'melee'){
            // process any player melee attack
            processMeele(game, game.player);
            // process melee attacks for enemy units
            var eCells = getCellsByUnitType(map, 'enemy');
            eCells.forEach(function(eCell){
                processMeele(game, eCell.unit);
            });
            game.turnState = 'end';
        }
        // for end state step game.turn and set game.turnState back to wait
        if(game.turnState === 'end'){
            game.turn += 1;
            game.turnState = 'wait';
            // check for player death
            if(game.player.HP <= 0){
                // !!! for now just call setupGame
                pCell.unit = null;
                pCell.walkable = true;
                setupGame(game, false);
            }
            // check for all enemies dead
            game.remainingEnemies = getRemainingEnemies(game);
            if(game.remainingEnemies === 0){
                setupGame(game, true);
            }
        }
    };
    // update a game object
    api.update = function (sm, secs) {
        var game = sm.game;
        // in map mode just call process turn
        if(game.mode === 'map'){
            processTurn(game, secs);
        }
        if(game.mode === 'menu'){
            poolMod.update(game.options, secs, sm);
        }
    };
    // get player cell
    api.getPlayerCell = function(game){
        var p = game.player,
        map = game.maps[game.mapIndex];
        return map.cells[p.currentCellIndex];
    };
    // preform what needs to happen for a player pointer event for the given pixel positon
    api.pointerStart = function(sm, x, y){
        var game = sm.game;
        // pointerDownTime should start at now
        game.pointerDownTime = new Date();
    };
 
    var BUTTON = {};
 
    BUTTON.quit = {
        desc: 'quit',
        outer: true,
        onClick: function(sm, button){
           sm.setState('title');
        }
    };
 
    BUTTON.resume = {
        desc: 'resume',
        outer: true,
        onClick: function(sm, button){
           sm.game.mode = 'map';
        }
    };
 
    var createMapButtonOnClick = function(dir){
        return function(sm, button){
            var tm = sm.game.toMap;
            sm.game.mode = 'map';
            tm.options.forEach(function(opt){
                if(opt.dir === dir){
                   tm.index = opt.mi;
                   tm.x = opt.x;
                   tm.y = opt.y;
                }
            });
            changeMap(sm.game);
        };
    };
 
    BUTTON.map_south = {
        desc: 'South',
        outer: false,
        ta: Math.PI * 0.5,
        onClick: createMapButtonOnClick('south')
    };
 
    BUTTON.map_north = {
        desc: 'North',
        outer: false,
        ta: Math.PI * 1.5,
        onClick: createMapButtonOnClick('north')
    };
 
    BUTTON.map_east = {
        desc: 'East',
        outer: false,
        ta: Math.PI * 2,
        onClick: createMapButtonOnClick('east')
    };
 
    BUTTON.map_west = {
        desc: 'West',
        outer: false,
        ta: Math.PI * 1,
        onClick: createMapButtonOnClick('west')
    };
 
    BUTTON.dum1 = {
        desc: 'dummy1',
        outer: true,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };
 
    BUTTON.dum2 = {
        desc: 'dummy2',
        outer: false,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };
 
    BUTTON.dum3 = {
        desc: 'dummy2',
        outer: false,
        onClick: function(sm, button){
           sm.game.mode = 'map';           
        }
    };
 
    var getButtonKeyValueCount = function(buttonKeys, prop, value){
        return buttonKeys.reduce(function(acc, buttonKey){
            var buttonDATA = BUTTON[buttonKey];
            if(buttonDATA[prop] === value){
                acc += 1;
            }
            return acc;
        }, 0);
    };
    // create a menu for the current game state
    var createMenu = function(game){
        // purge all buttons first
        game.options.objects.forEach(function(button){
            button.active = false;
        });
        // default buttonKeys array
        //var buttonKeys = ['quit', 'resume', 'map_south', 'map_north', 'map_east', 'map_west'];
        var buttonKeys = ['quit', 'resume'];
        // appending options
        buttonKeys = buttonKeys.concat(game.toMap.options.map(function(opt){
             return 'map_' + opt.dir;
        }));
        var oi = 0, 
        ii = 0,
        oc = getButtonKeyValueCount(buttonKeys, 'outer', true), //3,
        ic = getButtonKeyValueCount(buttonKeys, 'outer', false); //2;
        // spawn buttons 
        buttonKeys.forEach(function(buttonKey){
            var buttonDATA = BUTTON[buttonKey],
            len = (buttonDATA.outer ? oc : ic),
            i = (buttonDATA.outer ? oi : ii),
            ta = Math.PI * 2 / len * (i + 1);
            // use buttonDATA.ta if there is one
            ta = buttonDATA.ta != undefined ? buttonDATA.ta : ta;
            // spawn buttons
            poolMod.spawn(game.options, sm, {
                desc: buttonDATA.desc,
                onClick: buttonDATA.onClick,
                outer: buttonDATA.outer,
                ta: ta
            });
            if(buttonDATA.outer){
               oi += 1;
            }else{
               ii += 1;
            }
        });
    };
    // call when a pointer has ended
    api.pointerEnd = function(sm, x, y){
        var game = sm.game,
        now = new Date(),
        clickedCell = mapMod.getCellByPointer(game.maps[game.mapIndex], x, y),
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        secs = (now - game.pointerDownTime) / 1000;
        // long press
        if( secs >= 0.5 ){
            console.log('long press!');
            // if we are in map mode switch to menu mode
            if(game.mode === 'map'){
                game.mode = 'menu';
                game.options.data.mode = 'enter';
                createMenu(game);
            }
        }
        // short press
        if(secs < 0.5 ){
            if (game.mode === 'map' && clickedCell) {
                // if player cell is clicked and there is a toIndex value
                if(clickedCell === pCell && game.toMap.index != null){
                    if(game.toMap.options.length > 1){
                        game.mode = 'menu';
                        game.options.data.mode = 'enter';
                        createMenu(game);
                    }else{
                        changeMap(game);
                    }
                    return;
                }
                // if cell has a unit on it
                if(clickedCell.unit){
                    var unit = clickedCell.unit; 
                    if(unit.type === 'enemy'){
                        // set meleeTarget index
                        game.player.meleeTarget = clickedCell.i;
                        game.turnState = 'start';
                        return;
                    }
                }
                // default action is to try to move to the cell
                game.player.moveCells = getMoveCells(game, pCell, clickedCell);
                game.turnState = 'start';
            }
 
            if(game.mode === 'menu'){
                var clicked = poolMod.getOverlaping({active: true, w:1, h:1, x: x, y: y}, game.options);
                if(clicked.length >= 1){
                    game.options.data.mode = 'exit';
                    game.options.data.activeButton = clicked[0];
                    //clicked[0].data.onClick(sm, clicked[0]);
                }else{
                   // no button was clicked
                   game.mode = 'map';
                }
            }
        }
    };
 
    // return the public API
    return api;
}
    ());
```

### 1.2 - draw.js

```js
var draw = (function () {
    // public api
    var api = {};
    // unit colors
    var unitColors = ['green', 'gray', 'blue', 'red'];
 
/********** **********
     HELPERS
*********** *********/
 
// draw an hp bar for the given cell, if it has a vaild unit
var drawHPBar = function(sm, cell){
    var unit = cell.unit;
    var ctx = sm.ctx;
    var map = sm.game.maps[sm.game.mapIndex];
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    if (unit) {
        if(unit.type == 'player' || unit.type === 'enemy'){
             // hp bar back
             ctx.fillStyle = 'gray';
             ctx.beginPath();
             ctx.rect(x, y, cs, 5);
             ctx.fill();
             ctx.stroke();
             // current hp
             var per = unit.HP / unit.maxHP;
             ctx.fillStyle = 'lime';
             ctx.beginPath();
             ctx.rect(x, y, cs * per, 5);
             ctx.fill();
             ctx.stroke();
        }
    }
};
 
// draw a cell helper
var drawCell = function(sm, cell){
    var map = sm.game.maps[sm.game.mapIndex];
    var ctx = sm.ctx;
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    // draw base cell
    ctx.fillStyle = unitColors[0];
    // if we have a unit
    if (cell.unit) {
        ctx.fillStyle = unitColors[cell.unit.sheetIndex];
    }
    ctx.beginPath();
    ctx.rect(x, y, cs, cs);
    ctx.fill();
    ctx.stroke();
    drawHPBar(sm, cell);
};
 
/********** **********
     PUBLIC API
*********** *********/
 
    // draw background
    api.back = function (sm, style) {
        var canvas = sm.canvas,
        ctx = sm.ctx;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    api.options = function (sm) {
        var canvas = sm.canvas,
        pool = sm.game.options,
        ctx = sm.ctx,
        opt = {};
        // based off of pool-solid draw method in mod-pool.js in Clucker
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = opt.fillStyle || obj.data.fillStyle || 'white';
            ctx.strokeStyle = opt.strokeStyle || obj.data.strokeStyle || 'black';
            if (obj.active || opt.drawAll) {
                var cx = obj.x + obj.w / 2,
                cy = obj.y + obj.h / 2;
                ctx.beginPath();
                ctx.arc(cx, cy,  (obj.w + obj.h) / 2 / 2 , 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                if(obj.data.desc){
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(obj.data.desc, cx, cy);
                }
            }
        });
    };
    // bland place holder title text
    api.titleText = function(sm){
        var canvas = sm.canvas,
        ctx = sm.ctx;
        // text style
        ctx.fillStyle = 'white';
        ctx.font = '20px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        var x = canvas.width / 2,
        y = canvas.height * 0.25;
        ctx.fillText('Turn Based RPG Prototype', x, y);
    };
    // draw the map
    api.map = function (sm) {
        var map = sm.game.maps[sm.game.mapIndex],
        i = 0,
        len = map.cells.length;
        while (i < len) {
            drawCell(sm, map.cells[i]);
            i += 1;
        }
    };
    // draw version number
    api.ver = function(sm, style){
        var ctx = sm.ctx,
        canvas = sm.canvas;
        // text style
        ctx.fillStyle = style || 'white';
        ctx.font = '8px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // version number
        ctx.fillText('v' + sm.ver, 1, canvas.height - 10);
    };
    // draw info
    api.info = function (sm) {
        var ctx = sm.ctx,
        pos = sm.input.pos,
        pCell = gameMod.getPlayerCell(sm.game),
        canvas = sm.canvas,
        dy = 12;
        // text style
        ctx.fillStyle = 'yellow';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // draw current pointer position
        ctx.fillText('pos: ' + pos.x + ',' + pos.y, 5, 5 + dy * 0);
        // player cell pos
        ctx.fillText('player pos: ' + pCell.x + ',' + pCell.y, 5, 5 + dy * 1);
        // to map values
        var tm = sm.game.toMap;
        ctx.fillText('toMap: mi:' + tm.index + ', x: ' + tm.x + ', y: ' + tm.y, 5, 5 + dy * 2);
        ctx.fillText('toMap.options:' + JSON.stringify(tm.options.map(function(opt){ 
            return opt.dir + '(' + opt.x + ',' + opt.y + ');' + opt.mi;
        })) , 5, 5 + dy * 3);
        // turn number and turnChange bool
        ctx.fillText('turn:' + sm.game.turn + ', turnState: ' + sm.game.turnState, 5, 5 + dy * 4);
        // enemies
        ctx.fillText('enemies:' + sm.game.remainingEnemies, 5, 5 + dy * 5);
    };
    // return the public api to draw variable
    return api;
}
    ());
```

## 2 - Core libraries of this example

### 2.1 - utils.js

```js
// UTILS
var utils = {};
// get a value by way of a per value (0-1), and a min and max value
utils.valueByRange = function(per, nMin, nMax){
    per = per === undefined ? 0 : per;
    nMin = nMin === undefined ? 0 : nMin;
    nMax = nMax === undefined ? 1 : nMax;
    return nMin + Math.round(per * (nMax - nMin));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// angle from one point to another
utils.angleToPoint = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? Math.PI * 2 : scale;
    var aTan = Math.atan2(y1 - y2, x1 - x2);
    return (aTan + Math.PI) / (Math.PI * 2) * scale;
};
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: Math.floor((e.touches ? e.touches[0].clientX : e.clientX) - bx.left),
        y: Math.floor((e.touches ? e.touches[0].clientY : e.clientY) - bx.top),
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};
// deep clone using JSON
utils.deepCloneJSON = function (obj) {
    try{
       return JSON.parse(JSON.stringify(obj));
    }catch(e){

        console.log(e.message);
        console.log(obj);
        return {};
    }
};
```

### 2.2 - units.js

```js
var unitMod = (function () {
    
    // PUBLIC API
    var api = {};
 
/********** **********
     SET STAT HELPER
*********** *********/
 
   var setStat = {};
   
   setStat.attack = function(unit){
       unit.attack = unit.baseAttack.map(function(ba, i){
           // ref to 'current' weapon if any
           var cw = unit.currentWeapon != null ? unit.currentWeapon.attack[i]: 0;
           // base attack value + current attack
           return ba + cw;
           
       });
   };
 
/********** **********
     CREATE A UNIT
*********** *********/
 
    // create a base unit object
    var createBaseUnit = function () {
        var unit = {
            // current unit stats
            maxHP: 1,             // max number of hit points for the unit
            maxCellsPerTurn: 0,   // the max number of cells a unit can move
            baseAttack: [1, 1],   // base attack
            baseDefense: [0, 0],  // base defense
            attack: [0, 0],
            // equipment
            meleeWeapon: null,
            currentWeapon: null,  // the current active weapon
            // current values
            HP: 1,
            weaponIndex: 0,
            sheetIndex: 0,
            type: null,
            meleeTarget: null, // cell index to attack in 'melee' processTurn state
            moveCells: [], // array of cells to move in 'move' processTurn state
            currentCellIndex: null,
            active: true
        };
        setStat.attack(unit);
        return unit;
    };
 
    var UNIT_TYPES = {};
    // player type
    UNIT_TYPES.player = {
        create : function(player){
            player.maxCellsPerTurn = 3;
            player.sheetIndex = 2; // player sheet
            player.maxHP = 50;
            player.baseAttack = [1, 3];
            player.baseDefense = [1, 2];
            player.currentWeapon = {
                attack: [5, 7]
            };
            setStat.attack(player);
        }
    };
    // enemy type
    UNIT_TYPES.enemy = {
        create : function(enemy){
            enemy.maxCellsPerTurn = 2;
            enemy.sheetIndex = 3;
            enemy.maxHP = 8;
            enemy.baseAttack = [2, 5];
            enemy.baseDefense = [1, 2];
            setStat.attack(enemy);
        }
    };
    // wall type
    UNIT_TYPES.wall = {
        create : function(wall){
            wall.sheetIndex = 1;
        }
    };
 
    // Public unitMod.create method
    api.createUnit = function(type){
        var unit = createBaseUnit();
        unit.type = type;
        // call create method for the type
        UNIT_TYPES[type].create(unit);
        // return the unit
        return unit;
    };
 
/********** **********
     MELEE ATTACK
*********** *********/
 
    // do a melee attack with the given units
    api.meleeAttack = function(attacker, target){
        // make sure attack stat is up to date
        setStat.attack(attacker);
        // figure raw attack
        var fa = attacker.attack,
        ra = utils.valueByRange(Math.random(), fa[0], fa[1]);
        // figure target defense
        var bd = target.baseDefense,
        d = utils.valueByRange(Math.random(), bd[0], bd[1]);
        // figure attack value
        var a = ra - d;
        // attack can not go below zero
        a = a < 0 ? 0 : a;
        // take hp from target
        target.HP -= a;
        target.HP = target.HP < 0 ? 0 : target.HP;
    };

    // return the public API
    return api;
}
    ());
```

### 2.3 - map.js

```js
var mapMod = (function () {
    // create Cells helper
    var createCells = function (map) {
        var cells = [];
        var len = map.w * map.h,
        i = 0;
        while (i < len) {
            cells.push({
                i: i,
                x: i % map.w,
                y: Math.floor(i / map.w),
                walkable: true,
                closed: false,
                data: {},
                unit: null // reference to current unit here or null if empty
            });
            i += 1;
        }
        return cells;
    };
    // PUBLIC API
    var api = {};
    // create a new map object
    api.create = function (opt) {
        opt = opt || {};
        var map = {
            w: opt.w || 9,
            h: opt.h || 7,
            cellSize: 32,
            margin: {
                x: opt.marginX == undefined ? 5 : opt.marginX,
                y: opt.marginY == undefined ? 5 : opt.marginY
            },
            cells: []
        };
        map.cells = opt.cells || createCells(map);
        return map;
    };
    // return a cell at the given position, or false for out of bounds values
    api.get = function (map, xi, y) {
        if(arguments.length === 2){
            return map.cells[xi];
        }
        if (xi < 0 || y < 0 || xi >= map.w || y >= map.h) {
            return false;
        }
        return map.cells[y * map.w + xi];
    };
    // get a cell in the current map by way of
    // a canvas relative x and y pixel pos
    api.getCellByPointer = function (map, x, y) {
        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);
        return api.get(map, cx, cy)
    };
 
/***
PATHS
***/
 
    // sort a list of open nodes
    var sortOpen = function (opened) {
        return opened.sort(function (nodeA, nodeB) {
            if (nodeA.weight < nodeB.weight) {
                return 1;
            }
            if (nodeA.weight > nodeB.weight) {
                return -1;
            }
            return 0;
        });
    };
 
    // set weight for a node
    var setWeight = function (endNode, neighbor) {
        return utils.distance(endNode.x, endNode.y, neighbor.x, neighbor.y);
    };
 
    // build a path based an parent property
    var buildPath = function (node) {
        var path = [];
        while (node.parent) {
            path.push([node.x, node.y]);
            node = node.parent;
        }
        //path.push([node.x, node.y]);
        return path;
    };
 
    // for Each Neighbor for the given grid, node, and open list
    var forNeighbors = function (grid, node, endNode, opened) {
        //var neighbors = grid.getNeighbors(node);
        var neighbors = mapMod.getNeighbors(grid, node);
        var ni = 0,
        nl = neighbors.length;
        while (ni < nl) {
            var neighbor = neighbors[ni];
            // if the neighbor is closed continue looping
            if (neighbor.closed) {
                ni += 1;
                continue;
            }
            // set weight for the neighbor
            neighbor.weight = setWeight(endNode, neighbor);
            // if the node is not opened
            if (!neighbor.opened) {
                neighbor.parent = node;
                opened.push(neighbor);
                neighbor.opened = true;
            }
            ni += 1;
        }
    };
 
    api.getPath = function (grid, sx, sy, ex, ey) {
        // copy the given grid
        //var grid = Grid.fromMatrix(givenGrid.nodes),
        var grid = utils.deepCloneJSON(grid),
        //var grid = utils.deepClone(grid, {
        //    forRecursive: function(){ return {} }
        //}),
        nodes = api.chunk(grid),
        path = [],
        opened = [],
        node;
        // set startNode and End Node to copy of grid
        var startNode = nodes[sy][sx];
        endNode = nodes[ey][ex];
        // push start Node to open list
        opened.push(startNode);
        startNode.opened = true;
        startNode.weight = 0;
        // start walking
        while (opened.length > 0) {
            // pop out next Node from open list
            node = opened.pop();
            node.closed = true;
            // if the node is the end node
            if (node === endNode) {
                return buildPath(node);
            }
            // loop current neighbors
            forNeighbors(grid, node, endNode, opened);
            // sort the list of nodes be weight value to end node
            sortOpen(opened);
        }
        // return an empty array if we get here (can not get to end node)
        return [];
    };
 
    // get a chunk form of a grid
    api.chunk = function (grid) {
        var arr = [],
        row,
        i = 0;
        while (i < grid.cells.length) {
            row = grid.cells.slice(i, i + grid.w);
            arr.push(row);
            i += grid.w;
        }
        return arr;
    };
 
    // return true if the given x and y position is in bounds
    api.isInBounds = function (grid, x, y) {
        return (x >= 0 && x < grid.w) && (y >= 0 && y < grid.h);
    };
 
    // is the given cell location walkable?
    api.isWalkable = function (grid, x, y) {
        if (api.isInBounds(grid, x, y)) {
            return api.get(grid, x, y).walkable; //grid.nodes[y][x].walkable;
        }
        return false;
    };
 
    // get the four Neighbors of a node
    api.getNeighbors = function (grid, node) {
        var x = node.x,
        y = node.y,
        neighbors = [];
        if (api.isWalkable(grid, x, y - 1)) {
            //neighbors.push(this.nodes[y - 1][x]);
            neighbors.push(mapMod.get(grid, x, y - 1));
        }
        if (api.isWalkable(grid, x, y + 1)) {
            //neighbors.push(this.nodes[y + 1][x]);
            neighbors.push(mapMod.get(grid, x, y + 1));
        }
        if (api.isWalkable(grid, x - 1, y)) {
            //neighbors.push(this.nodes[y][x - 1]);
            neighbors.push(mapMod.get(grid, x - 1, y));
        }
        if (api.isWalkable(grid, x + 1, y)) {
            //neighbors.push(this.nodes[y][x + 1]);
            neighbors.push(mapMod.get(grid, x + 1, y));
        }
        return neighbors;
    };

    // return the public API
    return api;
}
    ());
```

### 2.4 - pool.js

```js
var poolMod = (function () {
    // Public API
    var api = {};
    // get next inactive object in the given pool
    var getInactive = function (pool) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        var i = 0,
        pool = {
            objects: [],
            secsCap: opt.secsCap === undefined ? Infinity : opt.secsCap,
            disableLifespan: opt.disableLifespan || false,
            data: opt.data || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {}
        };
        while (i < opt.count) {
            pool.objects.push({
                active: false,
                i: i,
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                w: opt.w === undefined ? 32 : opt.w,
                h: opt.h === undefined ? 32 : opt.h,
                heading: opt.heading === undefined ? 0 : opt.heading,
                pps: opt.pps === undefined ? 32 : opt.pps,
                lifespan: opt.lifespan || 3,
                data: {}
            });
            i += 1;
        }
        return pool;
    };
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || {};
        opt = opt || {};
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        }
        return false;
    };
    // spawn all objects
    api.spawnAll = function(pool, state, opt){
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        });
        return pool.objects;
    };
    // purge an object ( make it inactive and call the purge method for the pool )
    api.purge = function(pool, obj, state){
        obj.active = false;
        pool.purge.call(pool, obj, pool, state);
    };
    // spawn all objects
    api.purgeAll = function(pool, state, opt){
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active =  false;
                pool.purge.call(pool, obj, pool, state);
            }
        });
        return pool.objects;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        secs = secs > pool.secsCap ? pool.secsCap : secs;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                // if disableLifespan featre
                if(pool.disableLifespan){
                }else{
                    // else use lifespan feature
                    obj.lifespan -= secs;
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        //pool.purge.call(pool, obj, pool, state);
                        api.purge.call(pool, pool, obj, state);
                    }
                }
            }
        }
    };
    // set all to inActive or active state
    api.setActiveStateForAll = function (pool, bool) {
        bool = bool === undefined ? false : bool;
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            obj.active = bool;
        }
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // check bounds for the given display object and canvas and return true if the object
    // is out of bounds and false if it is not.
    api.checkBounds = function (obj, canvas) {
        if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
            return false;
        }
        return true;
    };
    // bounding box
    api.boundingBox = function (a, b) {
        return utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
    };
    // wrap an object to an area like a canvas
    api.wrap = function(obj, area, space){
        area = area || {x: 0, y: 0, width: 640, height: 480 };
        space = space === undefined ? 32 : space;
        if(!utils.boundingBox(obj.x, obj.y, obj.w, obj.h, space * -1, space * -1, area.width + space, area.height + space)){
            obj.x = utils.mod(obj.x + space, area.width + space * 2) - space;
            obj.y = utils.mod(obj.y + space, area.height + space * 2) - space;
        }
    };
    // get a collection of overlaying active objects from a pool, that overlap with the gievn object
    api.getOverlaping = function(obj, pool){
        var i = 0,
        obj2,
        overlap = [];
        len = pool.objects.length;
        if(obj.active){
            while(i < len){
                obj2 = pool.objects[i];
                if(obj != obj2 && obj2.active){
                    if(utils.boundingBox(obj.x, obj.y, obj.w, obj.h, obj2.x, obj2.y, obj2.w, obj2.h)){
                         overlap.push(obj2);
                    }
                }
                i += 1;
            }
        }
        return overlap;
    };
    // get a current active count for a pool
    api.getActiveCount = function(pool){
        return pool.objects.reduce(function(acc, obj){
            return obj.active ? acc += 1: acc;
        }, 0);
    };
    // get active objects from a pool
    api.getActiveObjects = function(pool){
        return pool.objects.reduce(function(acc, obj){
            if(obj.active){
                acc.push(obj);
            }
            return acc;
        }, []);
    };
    // get distance to object method
    api.getDistanceToObj = function(obj1, obj2){
        var x1 = obj2.x + obj2.w / 2,
        y1 = obj2.y + obj2.h / 2,
        x2 = obj1.x + obj1.w / 2,
        y2 = obj1.y + obj1.h / 2;
        return utils.distance(x1, y1, x2, y2);
    };
 
    // return public method
    return api;
}
    ());
```

## 3 - The state machine, and main.js

### 3.1 - The root sm.js file

```js
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    canvas.className = 'canvas-layer'
    ctx.translate(0.5, 0.5);
 
    // disable default action for onselectstart
    canvas.onselectstart = function () { return false; }
 
    // state machine object
    var sm = {
        ver: '0.5.0',
        fps: 12,
        lt: new Date(),
 
        // states
        states:{},            // collection of state objects
        stateObj: null,       // ref to current state object
        currentState: '',     // current state object key name (see setState call in main.js)
 
        game: gameMod.create({
            marginX : 14,
            marginY : 7,
            w: 9,
            h: 7,
            maps: [
                // TOP
                '111111111' + 
                '100000000' + 
                '103030000' + 
                '100000000' + 
                '100000000' + 
                '100000000' + 
                '100000001',
 
                '111111111' +
                '000000000' +
                '000000300' + 
                '000000000' + 
                '000000000' +
                '000000000' +
                '100100000',
 
                '111111111' +
                '000000001' +
                '000000301' +
                '000000001' +
                '000000301' +
                '000000001' +
                '000000301',
                
                // middle
                '100000001' +
                '103000001' + 
                '100000000' + 
                '100000001' + 
                '100000001' + 
                '103000001' + 
                '100000001',
 
                '100100000' +
                '100111010' +
                '000001010' +
                '100101030' +
                '100100111' +
                '100100200' +
                '100100000',
 
                '000000001' +
                '000000001' +
                '000000031' +
                '000111111' +
                '111100031' +
                '000000001' +
                '000000001',
                
                // bottom   
                '100000001' + 
                '100000001' + 
                '100000001' + 
                '103000000' + 
                '100000000' + 
                '103030000' + 
                '111111111',
 
                '100100000' + 
                '100000000' + 
                '100000000' + 
                '000000000' + 
                '000000000' + 
                '000000300' + 
                '111111111',
 
                '000000001' + 
                '000000001' + 
                '000000001' + 
                '000000301' + 
                '000000001' + 
                '000000301' + 
                '111111111'
                
            ]
        }),
        canvas: canvas,
        ctx: ctx,
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };
 
    // set the current state
    sm.setState = function(newStateKey){
        sm.currentState = newStateKey;
        sm.stateObj = sm.states[sm.currentState];
    };
 
    // call the given eventKey in the events object of the current state object
    sm.callStateEvent = function(eventKey, e, opt){
        if(sm.stateObj){
            var events = sm.stateObj.events;
            if(events){
                if(events[eventKey]){
                    events[eventKey].call(sm, e, opt, sm)
                }
            }
        }
    };
 
    // pointer events
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos = utils.getCanvasRelative(e);
            if(e.type === 'touchstart'){
                e.preventDefault();
            }
            sm.input.pointerDown = true;
            sm.callStateEvent('pointerStart', e, pos);
        },
        move: function (sm, e) {
            var pos = sm.input.pos = utils.getCanvasRelative(e);
            sm.callStateEvent('pointerMove', e, pos);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
            sm.callStateEvent('pointerEnd', e, sm.input.pos);
        }
    };
    var createPointerHandler = function (sm, type) {
        return function (e) {
            pointerHanders[type](sm, e);
        };
    };
    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
```

### 3.2 - The title state object

```js
sm.states.title = {
    key: 'title',
    update: function(sm, secs){
    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.titleText(sm);
        draw.ver(sm);
    },
    events: {
        pointerEnd: function(e, pos, sm){
            // set up a new game
            gameMod.setupGame(sm.game, true);
            // change to game state
            sm.setState('game');
        }
    }
};
```

### 3.3 - The game state object

```js
sm.states.game = {
    key: 'game',
    update: function(sm, secs){
        gameMod.update(sm, secs);
    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.map(sm);
        if(sm.game.mode === 'map'){
            draw.info(sm);
        }
        if(sm.game.mode === 'menu'){
            draw.back(sm, 'rgba(0,0,0,0.5)');
            draw.options(sm);
        }
        draw.ver(sm);
    },
    events: {
        pointerStart: function(e, pos, sm){
            gameMod.pointerStart(sm, pos.x, pos.y);
        },
        pointerEnd: function(e, pos, sm){
            gameMod.pointerEnd(sm, pos.x, pos.y);
        }
    }
};
```

### 3.4 - The main.js file

```js
// set the current state
sm.setState('game');
 
// loop with frame capping set by sm.fps value
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(secs >= 1 / sm.fps){
        sm.stateObj.update.call(sm, sm, secs);
        sm.stateObj.draw.call(sm, sm, {}); // empty object for 'layers' at least for now
        sm.lt = now;
    }
};
loop();
```

## 4 - Conclusion

