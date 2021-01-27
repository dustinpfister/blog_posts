---
title: Upgrades for a vuejs idle game example
date: 2021-01-27 14:52:00
tags: [vuejs]
layout: post
categories: vuejs
id: 790
updated: 2021-01-27 15:00:47
version: 1.1
---

Today I am continuing with making a basic idle game useing vuejs as a framework. In the last two posts on this subject I started out with a very basic example that I just manual production or resources, and selling those reasources for money. In yesterdays post I work out the very basics of over time production or resources, and at this post I also have a single save state working. There is just one more very basic feature that an idle game should have before moving on to more advanced topics that might help to turn this into soemthing interesting, and that is having some kind of system for upgrades.

The topic of upgrades alone can quickly turn into a major habit hole if I let it do so, but for this example I just want to work out a simple system and move on.

<!-- more -->

## 1 - The game module now

```js
var gameMod = (function(){;
 
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
                  game.manualMineCount = 5 + Math.floor(1 * level);
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
      manualMineCount: 5,
      lt: opt.lt || new Date(),
      money: opt.money || 0,
      money_formatted: format_money(opt.money || 0),
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
        }else{
            console.log('need more money');
        }
    };
 
    // return public API
    return api;
}());
```

## 2 - The vuejs instance

```js
var vm = new Vue({
    el: '#app',
    template: '<div class="wrap_main">' +
        '<div class="disp">'+
            '<input id="button_mine" type="button" value="mine" v-on:click="click">'+
            '<span> {{ game.money_formatted }} </span>'+
        '</div>' +
        '<div class="probar" v-bind:style="\'width:\'+Math.round(game.overTime.per * 100)+\'%;\'" ></div>' +
        '<div class="upgrades">'+
            '<div v-for="upgrade in game.upgrades">' +
                '<input v-bind:id="\'button_upgrade_\'+upgrade.key"'+ 
                    'type="button" v-bind:value="\'upgrade (\'+upgrade.level+\')\'" v-on:click="click"'+
                '>'+
                '<span> Level: {{ upgrade.level }} | </span>' +
                '<span> cost: {{ upgrade.cost }} | </span>' +
                '<span> desc: {{ upgrade.desc }} </span>' +
            '</div>'+
        '</div>' +
        '<div>' +
            '<div v-bind:id="\'minbox_\'+min.type" '+
                'class="minbox"' +
                'v-bind:style="min.locked?\'display:none;\':\'display:block;\'" '+
                'v-for="min in game.minerals" '+
            '>' +
                 '<input v-bind:id="\'button_sellall_\' +min.type" type="button" value="sell all" v-on:click="click">' +
                 '<div><span>type: {{ min.type }}, count: {{ min.unitCount }}</span></div>' +
            '</div>' +
        '</div>' +
    '</div>',
    data: {
        game: gameMod.createState(),
        newGameOptions: {
            money: 200,
            minerals: [{type:'iron', unitCount: 20}],
            upgrades: [{key: 'manual', level: 0}]
        },
        appName: 'vuejs-example-idle-game-upgrades'
    },
    methods: {
        // a button was clicked
        click: function (e) {
            var dat = this.$data;
            var buttonArr = e.target.id.split('_');
            console.log(buttonArr);
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

## 2 - The html

```html
<html>
  <head>
    <title>vue calculator example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
    <style>
.wrap_main{
  padding:10px;
  background: #0f0f0f;
}
.disp{
  margin-top:10px;
  color: white;
}
.upgrades{
  padding:5px;
  margin-top:10px;
  height:100px;
  background:gray;
}
.probar{
  margin-top:10px;
  height:10px;
  background:white;
}
.minbox{
  padding:5px;
  position: relative;
  margin-top:10px;
  background: gray;
}
    </style>
  </head>
  <body>
  <div id="app"></div>
  <script src="game.js"></script>
  <script src="vue.js"></script>
  </body>
</html>
```

## 4 - Conclusion

