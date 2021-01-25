---
title: Vue.js example of a basic Idle game
date: 2021-01-25 12:27:00
tags: [vuejs]
layout: post
categories: vuejs
id: 788
updated: 2021-01-25 12:52:29
version: 1.6
---

This week I think I would like to take a break from python to get back into writing a few new posts on vuejs. I have all ready wrote a number of posts on the basics of vuejs a while back, so now i think I should focus more on creating some actual simple projects with the framework. With that said I think it might be a good idea to make a few simple idle games with the framework, it just seems like something that might prove to be fun, and in the process I can also apply what I know so far when it comes to using vuejs as a client side framework.

Idel games seem to have a pretty addictive nature to them when they are well done, also making a basic one for starters is not so hard. There are many features that come to mind that I think just about any idle game should have, but for this one I am going to keep things very basic. In idle games there is often a way to get a kind of resource by way of a manual action such as clicking a button of some kind. There are also a wide range of other features that I think any idle game should have includinig resource gains over time, resource gains gained over time while away, upgrades, and so forth. However for now maybe I should focus on just what the core of the game is for starters.

<!-- more -->

## 1 - The main game module thus far

For this vue example I am goinf to want to have just a single vue instance, but I think I will also want to pull a lot of the logic into at least one other seperate object all togeather that will serve as a main game state object module of sorts. So then this game module will have to have at least one public method that wil create and return a new game state object. In addition to the main create method of the game module I am also goinf to want to have a few additional public methods that have to do with the mutation of that main state object. For now maybe just a public method that will prefrom a single mine event for the game state, and then another method that will be used to sell an amount of a mined resource.

```js
var gameMod = (function(){;
 
  // HELPERS
 
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
  var getMinObj = function(game, query){
    // if string get by type
    console.log(query);
    if(typeof query === 'string'){
      var i = game.minerals.length;
      while(i--){
          var minObj = game.minerals[i];
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
 
  // create a main game state object
  api.createState = function(){
    return {
      money: 0,
      money_formatted: format_money(0),
      minerals: [
        {type: 'iron', unitCount: 0, moneyPerUnit: 1, locked: false, chance: 1},
        {type: 'copper', unitCount: 0, moneyPerUnit: 3, locked: false, chance: 0.5},
        {type: 'silver', unitCount: 0, moneyPerUnit: 9, locked: false, chance: 0.25},
        {type: 'gold', unitCount: 0, moneyPerUnit: 25, locked: true, chance: 0.01}
      ]
    };
  };
  // prefrom a mine action
  api.mine = function(game){
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
  // sell
  api.sell = function(game, type){
      var minObj = getMinObj(game, type);
      game.money += minObj.unitCount * minObj.moneyPerUnit;
      game.money_formatted = format_money(game.money);
      minObj.unitCount = 0;
  };
  // return public API
  return api;
}());
```

## 2 - The vuejs instance

Now that I have a main game module I will now want to use that module with a vue instance. The main create state method of the game module is what I will be using to create a new vue data object for the vue instance. I will then want to have buttons in the template for this vue example, and for now there are just two kinds of buttons on that will prefrom a mine event for the game state, and others for each mineral that will be used to sell all of the mineral for money.

```js
new Vue({
    el: '#app',
    template: '<div>' +
        '<input id="button_mine" type="button" value="mine" v-on:click="click"> <span> {{ money_formatted }} </span> <br>' +
        '<div>' +
            '<div v-bind:id="\'minbox_\'+min.type" '+
                'class="wrap_minbox" v-bind:style="min.locked?\'display:none;\':\'display:block;\'" '+
                'v-for="min in minerals" '+
            '>' +
                 '<input v-bind:id="\'button_sellall_\' +min.type" type="button" value="sell all" v-on:click="click">' +
                 '<div><span>type: {{ min.type }}, count: {{ min.unitCount }}</span></div>' +
            '</div>' +
        '</div>' +
    '</div>',
    data: gameMod.createState(),
    methods: {
        // a button was clicked
        click: function (e) {
            var dat = this.$data;
            var buttonArr = e.target.id.split('_');
            if(buttonArr[1] == 'mine'){
                console.log('mine');
                gameMod.mine(dat);
            }
            if(buttonArr[1] == 'sellall'){
                var type = buttonArr[2];
                console.log('sell all ' + type);
                gameMod.sell(dat, type);
            }
        }
    }
});
```

## 3 - The html and css

I am now just going to want to have a little html and css in order to tie everything togetaher.

```html
<html>
  <head>
    <title>vue calculator example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
    <style>
.wrap_minbox{
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

That is it for now when it comes to this vuejs example of a basic idle game, this week I think I will be working on a few more examples and maybe nay of them should be additional examples like this. There is way more that can be added on top of this example just when it comes to a basic set of features for an idle game, and maybe I will but a little more time into this example, and this post as well. However I would like to have at least a few vue examples of idle games that are just very basic, clean, staring points actually. So if I am going to add more to this example I still think I will only want to add so much more, I have a bad habot of going overboard with fetures sometimes.
