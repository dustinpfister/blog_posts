---
title: Reset feature for a vuejs idle game example
date: 2021-01-28 16:52:00
tags: [vuejs]
layout: post
categories: vuejs
id: 791
updated: 2021-01-28 17:00:00
version: 1.2
---

This week I am taking another look at my viewjs content and starting to edit and expand this week starting with a bunch of examples on making an idle game with just vuejs, and vanilla javaScript. I have made a few other posts on this topic starting with just working out the very basics whenit comes to manual production or resources. I then moved on to additional topics that include production over time, and starting an upgrade system. There is just one more basic feature that I think all idle games should have and that is having some kind of reset point system.

<!-- more -->


## 1 - The game module

I added a few additional helpers to the game module that will help with creating and updating values that have to do with reset points.

```js
var gameMod = (function(){;
 
    /********** ********** **********
        CONSTANTS
    ********** ********** **********/
    var RESET_POINT_DELTA_BASE = 1.2;
 
    /********** ********** **********
        HELPERS
    ********** ********** **********/
 
    // format number as money
    // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    var format_money = function(number){
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            // These options are needed to round to whole numbers if that's what you want.
            minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
        });
        return formatter.format(number); /* $2,500.00 */
    };
    // get a mineral object
    var getMinObj = function(minerals, query){
        // if string get by type
        if(typeof query === 'string'){
            var i = minerals.length;
                while(i--){
                    var minObj = minerals[i];
                    if(minObj.type === query.toLowerCase()){
                        return minObj;
                }
            }
        }
        // if number get by index
        if(typeof query === 'number'){
            return game.minerals[query];
        }
        return false;
    };
 
    // PUBLIC API
    var api = {};
 
/********** ********** **********
    CREATE
********** ********** **********/
 
    // create upgrades helper
    var createUpgrades = function(opt){
        opt = opt || []
        var upgrades = {
            manual : {
                key: 'manual',
                desc: 'The count of mine actions per click of the manual mine button',
                level: 0,
                cost: Infinity,
                figureCost: function(game, upgrade, level){
                    return 100 + Math.floor(100 * level + Math.pow(1.25, level));
                },
                applyToGame: function(game, upgradeObj, level){
                    game.manualMineCount = game.manualMineCountBase + Math.floor(1 * level);
                }
            }
        };
        // set levels from options array
        opt.forEach(function(upOpt){
            upgrades[upOpt.key].level = upOpt.level;
        });
        return upgrades;
    };
    // create minerals helper
    var createMinerals = function(opt){
        opt = opt || [];
        var minerals = [
          {type: 'iron', unitCount: 0, moneyPerUnit: 1, locked: false, chance: 1},
          {type: 'copper', unitCount: 0, moneyPerUnit: 3, locked: false, chance: 0.5},
          {type: 'silver', unitCount: 0, moneyPerUnit: 9, locked: false, chance: 0.25},
          {type: 'gold', unitCount: 0, moneyPerUnit: 25, locked: true, chance: 0.01}
        ];
        opt.forEach(function(minOpt){
          var minObj = getMinObj(minerals, minOpt.type);
          if(minObj){
              minObj.unitCount = minOpt.unitCount;
          }
        });
        return minerals;
    };
    // create a main game state object
    api.createState = function(opt){
      opt = opt || {};
      var game = {
        manualMineCount: 0,
        manualMineCountBase: 1,
        lt: opt.lt || new Date(),
        money: opt.money || 0,
        money_formatted: format_money(opt.money || 0),
        resetPoints: opt.resetPoints || 0,
        resetPointsDelta: 0,
        overTime: {
            secs: 0,
            per: 0,
            minesPerSec: 0.125
        },
        minerals: createMinerals(opt.minerals),
        upgrades: createUpgrades(opt.upgrades)
      };
      // call figure cost methods for all upgrades
      updateUpgradeCosts(game);
      // apply reset points
      applyResetPoints(game);
      // apply upgrades for first time
      Object.keys(game.upgrades).forEach(function(key){
          var upgrade = game.upgrades[key];
          upgrade.applyToGame(game, upgrade, upgrade.level);
      });
      // firgure resetPointsDelta for first time
      figureResetPointsDelta(game);
      return game;
    };
 
/********** ********** **********
    MINE
********** ********** **********/
 
    // a single min action using Math.random for each mineral
    var mineSingle = function(game){
      var i = 0,
      len = game.minerals.length,
      minObj;
      while(i < len){
        minObj = game.minerals[i];
        if(!minObj.locked){
            var roll = Math.random();
            if(roll < minObj.chance){
                minObj.unitCount += 1;
            }
        }
        i = i + 1;
      }
    };
    // call mineSingle a given count of times
    var mineLoop = function(game, count){
        var i = count;
        while(i--){
           mineSingle(game);
        }
    };
    // mine by chance and count
    var mineByChanceAndCount = function(game, count){
        game.minerals.map(function(minObj){
            minObj.unitCount += Math.floor(minObj.chance * count);
            return minObj;
        });
    };
    // prefrom a mine action
    api.mine = function(game, count){
        if(count === 1){
            mineSingle(game);
        }
        if(count > 1 && count <= 50){
            mineLoop(game, count);
        }
        if(count > 50){
            mineByChanceAndCount(game, count);
        }
    };
 
/********** ********** **********
    SELL
********** ********** **********/
 
    // sell
    api.sell = function(game, type){
        var minObj = getMinObj(game.minerals, type);
        game.money += minObj.unitCount * minObj.moneyPerUnit;
        game.money_formatted = format_money(game.money);
        minObj.unitCount = 0;
    };
 
/********** ********** **********
    UPDATE
********** ********** **********/
 
    // update method
    api.update = function(game, secs){
      var ot = game.overTime,
      mineSecs = 1 / ot.minesPerSec;
      ot.secs += secs;
      ot.per = ot.secs / mineSecs;
      ot.per = ot.per > 1 ? 1 : ot.per;
      if(ot.secs >= mineSecs){
         var count = Math.floor(ot.secs / mineSecs);
         api.mine(game, count);
         ot.secs = 0;
      }
    };
 
/********** ********** **********
    UPGRADES
********** ********** **********/
 
    var updateUpgradeCosts = function(game){
        Object.keys(game.upgrades).forEach(function(key){
            var upgrade = game.upgrades[key];
            upgrade.cost = upgrade.figureCost(game, upgrade, upgrade.level);
        });
    };
 
    api.upgradeCheck = function(game, key){
        console.log('upgrade check for ' + key);
        var upgrade = game.upgrades[key];
        if(game.money >= upgrade.cost){
            console.log('we have the money');
            upgrade.applyToGame(game, upgrade, upgrade.level);
            upgrade.level += 1;
            game.money -= upgrade.cost;
            game.money_formatted = format_money(game.money);
            upgrade.cost = upgrade.figureCost(game, upgrade, upgrade.level);
            figureResetPointsDelta(game);
        }else{
            console.log('need more money');
        }
    };
 
/********** ********** **********
    RESET
********** ********** **********/
 
    // apply reset points
    var applyResetPoints = function(game){
        // basic Diminishing returns expression
        game.manualMineCountBase = Math.round(1 + (1 - (1 / (1 + game.resetPoints / 1000000))) * 49);
    };
    // figure what the current game.resetPointsDelta is
    var figureResetPointsDelta = function(game){
        var ex = 0;
        Object.keys(game.upgrades).forEach(function(key){
            var upgrade = game.upgrades[key];
            ex += upgrade.level;
        });
        game.resetPointsDelta = Math.floor(Math.pow(RESET_POINT_DELTA_BASE, ex - 1));
    };
    // main public reset method
    api.reset = function(game){
        // make sure delta is up to date
        figureResetPointsDelta(game);
        // award delta
        game.resetPoints += game.resetPointsDelta;
        // create and return a new game object, but with current resetPoints
        return api.createState({
           resetPoints: game.resetPoints
        });
    };
    // return public API
    return api;
}());

```