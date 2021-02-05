---
title: Adding over time and away production to a vuejs idle game example
date: 2021-01-26 11:03:00
tags: [vuejs]
layout: post
categories: vuejs
id: 789
updated: 2021-02-05 15:41:18
version: 1.11
---

In [yesterdays post on a basic vuejs powered idle game](/2021/01/25/vuejs-example-idle-game/) I started a very basic idle game with the [vuejs framework](https://vuejs.org/), and just a little vanilla javaScript to expand a collection of [vuejs examples](/2021/02/04/vuejs-example/) to help serve as starting points for projects using the framework. The example at the state it was in at that point lacks many of the core features that I think just about any idle game should have. The basic example was just manual production of a resource, and selling that resource for money, and that is it. 

I might get back to improving that post, and the corresponding code, but I think that maybe that specific example should say pretty basic with just that first step being the focal point. The next step forward could be a great number of things, but one feature that is needed is having over time production of a resource rather than just clicking manually. There is not just having production over time, but also away production, which is also a feature that I would like to at least start in this vue example. There are so many other little things that I would like to add even when it comes to just the very basics, but for now one more thing I would like to start at this point is save states.

Over time production is just one of many must have features for an idle game, in fact the first idle game example is not really an idle game because of the absence of over time production, so lets get this one out of the way and move on the next steps.

<!-- more -->

## Pull the source for this and all my other vuejs exmaples at my github

The best way to run this example locally might be to clone down the source and run it locally. The [source for this vuejs idle game can be found at my vuejs test repo](https://github.com/dustinpfister/test_vuejs/tree/master/public/forpost/vuejs-example-idle-game-over-time) at my github, along with all my other vuejs examples. When pulling it down npm can be used to install dependences for the repo and then the list script can be used to run a list for all the examples, including this one.

```
$ git clone --depth 1 https://github.com/dustinpfister/test_vuejs
$ cd text_vuejs
$ npm install
```

The list script can be used to serve a list for all examples.

```
$ npm run list 3000
```

At which point you can then view the list in a web browser at localhost:3000.

## 1 - The game module

There are just two files for this vuejs example thus far, the javaScript file that is the vuejs instance, and the vanilla javaScript game module where I will be placing the bulk of the game logic for this idle game. I started out my copying over the source code from the first post where I aimed to just work out the very core basics of this game when it comes to manual production of resources and selling those resources. From that point I added a whole bunch of methods, but also made some minor changes to existing features that I might include in the source code of the getting started post I did yesterday when it comes to editing.

Major introductions at this point include an update method that will update the game object by a given seconds. This method is intended to be used in a main update loop of one kind or another and is needed for the over time production features that I will be adding.

Additional major additions have to do with a few new helper methods that have to do with the action of mining. There is a mine helper method that is intended to be called just once that makes use of the Math.random method, another mine helper that called the one that uses Math.random a few times, and then another mine method that is intended to be used when dealing with a high count of mine actions.

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
    return {
      lt: opt.lt || new Date(),
      money: opt.money || 0,
      money_formatted: format_money(opt.money || 0),
      overTime: {
          secs: 0,
          per: 0,
          minesPerSec: 0.125
      },
      minerals: createMinerals(opt.minerals)
    };
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
 
  // preform a mine action
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
       console.log(count);
       api.mine(game, count);
       ot.secs = 0;
    }
  };
 
  // return public API
  return api;
}());
```

## 2 - The vuejs instance

Now for the vue instance for this idle game example, here I have an updated template that will display a progress bar that is the amount of time until the next mine count to be preformed. I also added a number of methods for loading, saving and reseting a save state which is another basic feature that I added at this point thus far. Yet another change that was made was the introduction of a basic app loop in the mounted lifecycle hook, I am not sure if this is the ideal way to go about having a main app loop for a project such as this but I will be needing something to that effect for the resource gain over time features.

```js
var vm = new Vue({
    el: '#app',
    template: '<div class="wrap_main">' +
        '<div class="disp">'+
            '<input id="button_mine" type="button" value="mine" v-on:click="click">'+
            '<span> {{ game.money_formatted }} </span>'+
        '</div>' +
        '<div class="probar" v-bind:style="\'width:\'+Math.round(game.overTime.per * 100)+\'%;\'" ></div>' +
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
            money: 100,
            minerals: [{type:'iron', unitCount: 20}]
        },
        appName: 'vuejs-example-idle-game-over-time'
    },
    methods: {
        // a button was clicked
        click: function (e) {
            var dat = this.$data;
            var buttonArr = e.target.id.split('_');
            if(buttonArr[1] == 'mine'){
                gameMod.mine(dat.game, 1);
            }
            if(buttonArr[1] == 'sellall'){
                var type = buttonArr[2];
                gameMod.sell(dat.game, type);
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

## 3 - The html file

When it comes to the hard coded html all I really did is add a little hard coded css for the new template. The root element that I mount to still has no additional hard coded html in it, and I might keep that the case moving forward. In additional examples based of of this I might eventually have some more javaScript files, but for now it is still just the game module, and the script for the vuejs instance. I am also of course linking to vuejs itself, the path to the script for that might have to be adjusted depending on how you might ho about hosting the files.

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
.probar{
  margin-top:10px;
  height:10px;
  background:white;
}
.minbox{
  position: relative;
  margin-top:10px;
  padding:5px;
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

This basic idle game using vuejs as a client side framework is coming together okay, but there is still a great deal missing even when it comes to just the basic set of features that just about any idle game should have. In additional posts on this subject i think the next step should be having a way to do something with the money that is begin made in the game, in other words upgrades.

When it comes ot the state at which the game is at thus far in relation to the topic of this post, there might still be some additional room for improvement such as having a welcome back message rather than just having the amount of resources given. So I might want to come back, and edit this post, and refine the code a little at some point, but the basic idea that I had in mind for this post today is more or less done.
