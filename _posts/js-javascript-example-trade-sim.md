---
title: Trade Sim javaScript example
date: 2021-04-07 15:17:00
tags: [js]
layout: post
categories: js
id: 840
updated: 2021-04-07 15:27:43
version: 1.2
---

Today I would like to work out another simple [javaScript example](/2021/04/02/js-javascript-example/), this time I wanted to start a very simple trade simulator example. Nothing major as I like to just work out simple basic examples of things when it comes to many of these javaScript examples, that I may, or may not continue to work on when it comes to truing it into something that I might use in a real project of some kind.

<!-- more -->

## 1 - The trade sim librray

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

## 3 - Conclusion

