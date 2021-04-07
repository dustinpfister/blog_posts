---
title: Trade Sim javaScript example
date: 2021-04-07 15:17:00
tags: [js]
layout: post
categories: js
id: 840
updated: 2021-04-07 15:54:35
version: 1.12
---

Today I would like to work out another simple [javaScript example](/2021/04/02/js-javascript-example/), this time I wanted to start a very simple trade simulator example. Nothing major as I like to just work out simple basic examples of things when it comes to many of these javaScript examples, that I may, or may not continue to work on when it comes to truing it into something that I might use in a real project of some kind.

What I wanted to make is just a very simple starting point for a system where there are a number of items at a game market of some kind. At any given moment each item can be bought or sold at the market, and the current price of the items will go up and down within a certain range. The player can then buy an item at the market at a low price, and then later on sell it back when they are worth more to make money.

This trade simulator might just be a feature of a game, or I guess it could be the central focal point of the game actually. There are a lot of little details here, and there when it comes to something like this, such as the logic at play that will set prices, and how often prices will change. However I have to start somewhere when it comes to something like this, so in this post I will just be going over a very simple, basic, example of this sort of thing.

<!-- more -->

## 1 - The trade sim library

So here I have a simple trade module that contains the base idea of what I had in mind for this trade simulator javaScript example. I am going to want to have some kind of Item database, for this example I am just using some hard coded data in the module itself for this. Each item should have a value range at least, or some set of properties that are used to set the total range of what an item can end up being worth.

I will then want to create a main state object for this module that will hold current market process for these items in the database. In addition it can also be used as a way to create, and mutate a players collection of these items, and mutate a state object that contains a money property.

```js
var tradeMod = (function () {
 
    var ITEMS = {};
 
    ITEMS.raspberry = {
        desc : 'Raspberry ',
        valueRange: [1, 10]
    };
 
    ITEMS.apple = {
        desc : 'Apple     ',
        valueRange: [3, 18]
    };
 
    ITEMS.kiwi = {
        desc : 'kiwi      ',
        valueRange: [1, 3]
    };
 
    var api = {};
 
    // create a player item object that will
    // contain data for the players collection
    // of items
    var createPlayerItemObject = function(opt){
        opt = opt || {};
        return {
            desc: opt.desc || '',
            count: opt.count || 0
        };
    };
 
    var createItemsObject = function(){
        var itemsObj = {};
        Object.keys(ITEMS).forEach(function(itemKey){
            var item = ITEMS[itemKey],
            vg = item.valueRange;
            itemsObj[itemKey] = {
                desc: item.desc,
                current: Math.round(vg[0] + (vg[1] - vg[0]) * Math.random())
            };
        });
        return itemsObj;
    };
 
    api.create = function () {
        // main state object
        var trade = {
            items_player: {},
            items: createItemsObject()
        };
        Object.keys(ITEMS).forEach(function(itemKey){
            var item = ITEMS[itemKey];
            trade.items_player[itemKey] = createPlayerItemObject({
                desc: item.desc
            });
        });
        return trade;
    };
 
    api.newValues = function(trade){
        trade.items = createItemsObject();
        return trade;
    };
 
    // buy the given itemKey and count, if there is enough state.money
    api.buy = function(trade, itemKey, count, state){
        var item = trade.items[itemKey],
        playerItem = trade.items_player[itemKey],
        totalCost = item.current * count;
        if(state.money >= totalCost){
            state.money -= totalCost;
            playerItem.count += count;
        }
    };
 
    api.sell = function(trade, itemKey, count, state){
        var item = trade.items[itemKey],
        playerItem = trade.items_player[itemKey];
        if(playerItem.count < count){
           count = playerItem.count
        }
        state.money += count * item.current;
        playerItem.count -= count;
    };
 
    return api;
 
}
    ());
```

## 2 - Simple console only use example

TO start off with I created a very simple way of going about using this that works by just calling methods in the javaScript console. So For now this is all I have to work with the trade module that is just a nice way to work with it in the javaScript console only.

This module is just used to create a main game state, and does so once when it first starts. I can then call TradeSim.startNew to create a new game in the console if I want to. The main way that I work with this then is to call the action method of this module, I can then pass a buy, or sell value for a kind of action, then an item key followed by a count of that item.

```js
var TradeSim = (function(){
 
    var api = {};
 
    var game = {};
 
    // create a simple plain text view
    var plainText = function(game){
        var text = '';
        text += 'money: ' + game.money + '\n\n';
        Object.keys(game.trade.items).forEach(function(itemKey){
            var item = game.trade.items[itemKey],
            item_player = game.trade.items_player[itemKey];
            text += itemKey + ':\n';
            text += '    current cost : $' + item.current + '\n';
            text += '    on hand : ' + item_player.count + '\n\n';
        });
        return text;
    };
 
    api.startNew = function(money){
        game = {
            money: money || 100,
            trade : tradeMod.create()
        };
    };
 
    api.info = function(){
        console.log(plainText(game));
    };
 
    api.action = function(action, itemKey, count){
        if(action === 'buy' || action === 'sell'){
            tradeMod[action](game.trade, itemKey, count, game);
        }
        tradeMod.newValues(game.trade);
        api.info();
    };
 
    api.startNew(150);
    api.info();
 
    return api;
 
}());
```

So when it comes to playing around with this in the javaScript console, if I keep buying low, and selling high, I make money in the game. That is it when it comes to the basic idea that i had in mind with this, now the question is do I want to put more time into this? I can not see this by itself taking off as a stand alone game, but my thinking is that I have something like this as a feature of a game as a way to go about making some play money in the game, along with at least a few other options.

## 3 - Conclusion

So that is it for now when it comes to this little javaScript example at least, at some point in the future I might use this in a larger game, and when I do maybe I will come around to edit this post. The source of the module would of course change a little here and there depending on the nature of the project, but the core idea of being able to buy something at a certain rate and then sell it later would likely remain the same.

One thing that might work would be to create some kind of life simulator type game, and this kind of feature might pop up in one or more places in the game. For example there could be a stock exchange type place, and something not all that more involve than this could be one way to go about buying and selling shares of places in the game. In that kind of situation I might use something just a little more advanced than this where certain actions can be preformed at the corresponding places in the game to increase and decrease the stock prices of the places. Also I could have it so that the stocks will pay out dividends over time, so it would make sense to just sit on stock and wait. this is of course just one idea that comes to mind that i may or may not get to at some point.

