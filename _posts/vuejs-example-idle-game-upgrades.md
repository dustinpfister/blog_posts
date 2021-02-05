---
title: Upgrades for a vuejs idle game example
date: 2021-01-27 14:52:00
tags: [vuejs]
layout: post
categories: vuejs
id: 790
updated: 2021-02-05 15:41:19
version: 1.10
---

Today I am continuing with making a basic idle game using vuejs as a framework to help expand my collection of [vuejs examples](/2021/02/04/vuejs-example/). In the last two posts on this subject I started out with a very basic example that I just manual production or resources, and selling those resources for money. In [yesterdays post](/2021/01/26/vuejs-example-idle-game-over-time/) I work out the very basics of over time production or resources, and at this post I also have a single save state working. There is just one more very basic feature that an idle game should have before moving on to more advanced topics that might help to turn this into something interesting, and that is having some kind of system for upgrades.

The topic of upgrades alone can quickly turn into a major rabbit hole if I let it do so, but for this example I just want to work out a simple system and move on, at least for now anyway. I have made a a few other games over the years that include an upgrade system, and this is something that I never get worked out just the way that I want it. There are a lot of things that come to mind when it comes to things like the expressions used to figure upgrade cost, as well as expressions that update the game object properties that are effected up the upgrade and so forth. However generally I think that an upgrade system should be an array of objects, and each object should have a method that is called that will be used to apply the upgrade to the main game state object.

There is a lot more to an upgrade system if I go wild with ideas when it comes to all the various ways that I can go about designing such a system. However for this vuejs example of a basic idle game I think I am going to want to keep things fairly basic.

<!-- more -->

## 1 - The game module now

The main game module now has a few more helper methods that have to do with creating an updating an object of upgrade objects of the main game state object. 

I now have a create upgrades helper along with the main public create state public method. This is the helper that is used to create the object of upgrade objects for a game state object. Just like the create minerals helper it can take an array of option objects that can be used to set the level for each upgrade. This array of upgrade options will be created each time the save method of the vue instance is called that is used to save the game state.

I also have a check upgrade public method that is the public method that will be called in the click method of the vue instance each time an upgrade button is clicked.

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

The vuejs instance has just a few additions made to the template to create a new upgrades div that will act as a menu for all upgrades. Beyond that I just made a few changes to the click method so that it will call the new game module public method that will upgrade a given upgrade when clicked. 

I also made a change in the save method of the vue instance when it comes to the save state json. I am going to want to have something for upgrades in the save state object, but all that really needs to be stored is an array of objects for the upgrade key, and the current level of the upgrade.

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

There is then the html of that I have for this example. I still just have a single hard coded html element that is for a mount point, and then just some css worked out for the template.

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

So far this idle game is starting to come together, but I think I am going to want to write at least one or two more posts on this subject before moving on to something else. I might come back to editing this post, and the underlaying source code at some point in the future. There are at least a few more additions I would like to make when it comes ti just the current set of features, but for the sake of this post I will not be adding any more features to this example, for this post at least. There is the question of what is next in additional posts when it comes to additional features that I might want to add to a game such as this, however that is a matter for another post.
