---
title: Reset feature for a vuejs idle game example
date: 2021-01-28 16:52:00
tags: [vuejs]
layout: post
categories: vuejs
id: 791
updated: 2021-01-28 17:01:59
version: 1.3
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

## 2 - The vuejs instance

I made a few additions to the template in the vuejs instance.

```js
var vm = new Vue({
    el: '#app',
    template: '<div class="wrap_main">' +
        '<div class="disp">'+
            '<span> {{ game.money_formatted }} </span>'+
            '<div class="probar" v-bind:style="\'width:\'+Math.round(game.overTime.per * 100)+\'%;\'" ></div>' +
            '<div class="navbar">'+
                '<span><input id="button_nav_manual" type="button" value="Manual" v-on:click="click"> | ' +
                '<input id="button_nav_minerals" type="button" value="Minerals" v-on:click="click"> | ' +
                '<input id="button_nav_upgrades" type="button" value="Upgrades" v-on:click="click"> | ' + 
                '<input id="button_nav_reset" type="button" value="Reset Points" v-on:click="click"></span>'+
            '</div>' +
        '</div>' +
        '<div class="manual wrap_menu" v-if="currentMenu===\'manual\'">'+
            '<input id="button_mine" type="button" value="mine" v-on:click="click">'+
            '<p>Base Mine count per click: {{ game.manualMineCountBase }}</p>'+
            '<p>Total Mine count per click: {{ game.manualMineCount }}</p>'+
            '<table>'+
                '<tr v-for="min in game.minerals"><td> {{min.type}}: </td><td> {{ min.unitCount }} </td></tr>' +
            '</table>' +
        '</div>'+
        '<div class="upgrades wrap_menu" v-if="currentMenu===\'upgrades\'">'+
            '<div v-for="upgrade in game.upgrades">' +
                '<input v-bind:id="\'button_upgrade_\'+upgrade.key"'+ 
                    'type="button" v-bind:value="\'upgrade (\'+upgrade.level+\')\'" v-on:click="click"'+
                '>'+
                '<span> Level: {{ upgrade.level }} | </span>' +
                '<span> cost: {{ upgrade.cost }} | </span>' +
                '<span> desc: {{ upgrade.desc }} </span>' +
            '</div>'+
        '</div>' +
        '<div class="minerals wrap_menu" v-if="currentMenu===\'minerals\'">' +
            '<div v-bind:id="\'minbox_\'+min.type" '+
                'class="minbox"' +
                'v-bind:style="min.locked?\'display:none;\':\'display:block;\'" '+
                'v-for="min in game.minerals" '+
            '>' +
                 '<input v-bind:id="\'button_sellall_\' +min.type" type="button" value="sell all" v-on:click="click">' +
                 '<div><span>type: {{ min.type }}, count: {{ min.unitCount }}</span></div>' +
            '</div>' +
        '</div>' +
        '<div class="reset wrap_menu" v-if="currentMenu===\'reset\'">' +
            '<input id="button_reset_now" type="button" value="Reset Now" v-on:click="click">' +
            '<p>You have {{ game.resetPoints }} Reset Points, '+
                'and reseting now will give you {{ game.resetPointsDelta }} more Reset Points</p>' +
        '</div>' +
    '</div>',
    data: {
        game: gameMod.createState(),
        newGameOptions: {
            money: 10000,
            minerals: [{type:'iron', unitCount: 20}],
            upgrades: [{key: 'manual', level: 0}]
        },
        currentMenu: 'reset',
        appName: 'vuejs-example-idle-game-reset'
    },
    methods: {
        // a button was clicked
        click: function (e) {
            var dat = this.$data;
            var buttonArr = e.target.id.split('_');
            // The manual mine button
            if(buttonArr[1] == 'mine'){
                gameMod.mine(dat.game, dat.game.manualMineCount);
            }
            // a sell all button
            if(buttonArr[1] == 'sellall'){
                var type = buttonArr[2];
                gameMod.sell(dat.game, type);
            }
            // an upgrade button
            if(buttonArr[1] == 'upgrade'){
                gameMod.upgradeCheck(dat.game, buttonArr[2]);
            }
            // if a nav button
            if(buttonArr[1] == 'nav'){
                dat.currentMenu = buttonArr[2];
            }
            // if a reset button
            if(buttonArr[1] == 'reset'){
                console.log( 'reset' );
                dat.game = gameMod.reset(dat.game);
            }
        },
        // away production
        away: function(){
            var dat = this.$data;
            var now = new Date();
            var secs = (now - dat.game.lt) / 1000;
            var ot = dat.game.overTime,
            mineSecs = 1 / ot.minesPerSec,
            mineCount = Math.floor(secs / mineSecs);
            console.log('It has been ' + secs + ' seconds since last save');
            console.log('This results in a mine count of ' + mineCount);
            gameMod.mine(dat.game, mineCount);
            dat.game.lt = new Date();
        },
        // load a save state
        load: function(){
            var dat = this.$data;
            var jsonStr = localStorage.getItem(dat.appName);
            if(jsonStr){
                var opt = JSON.parse(jsonStr);
                opt.lt = new Date(opt.lt);
                dat.game = gameMod.createState(opt);
            }else{
                dat.game = gameMod.createState(dat.newGameOptions);
            }
        },
        // save a save state
        save: function(){
            var dat = this.$data;
            var jsonStr = JSON.stringify({
                money: dat.game.money,
                resetPoints: dat.game.resetPoints,
                minerals: dat.game.minerals.map(function(minObj){
                    return {
                        type: minObj.type,
                        unitCount: minObj.unitCount
                    };
                }),
                upgrades: Object.keys(dat.game.upgrades).map(function(upKey){
                    var upgrade = dat.game.upgrades[upKey];
                    return {
                        key: upgrade.key,
                        level: upgrade.level
                    };
                }),
                lt: dat.game.lt
            });
            localStorage.setItem(dat.appName, jsonStr);
        },
        // reset save and current game (can use from javaScript console as > vm.reset() )
        reset: function(){
            var dat = this.$data;
            localStorage.removeItem(dat.appName);
            dat.game = gameMod.createState(dat.newGameOptions);
        }
    },
    // on mounted life cycle hook
    mounted: function(){
        console.log('mounted, started app loop');
        var vm = this,
        dat = vm.$data,
        game;
        // load progress
        vm.load();
        vm.away();
        // app loop calling gameMod.update
        var loop = function(){
            var now = new Date(),
            secs = (now - dat.game.lt) / 1000;
            gameMod.update(dat.game, secs);
            // save progress
            vm.save();
            setTimeout(loop, 33);
            dat.game.lt = now;
        };
        loop();
    }
});
```

### 3 - The html

```html
```