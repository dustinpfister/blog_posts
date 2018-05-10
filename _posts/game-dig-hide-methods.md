---
title: Dig Game - Hide Methods
date: 2017-03-11 13:23:00
tags: [js,games]
layout: post
categories: games
id: 4
updated: 2017-04-28 09:59:22
version: 1.1
---

{% mytags_postwords phaser,framework,js,game,development,hide,methods %}

So as of late I have been working on my first [phaser](http://phaser.io) powered game, that so far I just simply call "dig". I will be hosting it [here on github pages](http://dustinpfister.github.io/game_dig) for now. If you care to read what it is all about in detail check out the [readme at the main branch on github](https://github.com/dustinpfister/game_dig). However for the sake of just this post I would like to write about what I am calling "hide methods"

<!-- more -->

## What is a "hide method"?

The object of the game is to dig a land tile which may or may not contain an amount of in game currency that I call "pebble". Once you dig a tile, you have the option of digging another tile on the same land stack layer, or drop down to a lower layer.

As you may have guessed a "hide method" is an algorithm that determines the distribution of a given amount of total land stack pebble.

## Some thoughts to consider before designing a hide method.

* How will the total stack pebble be distributed per stack layer?

* How will an amount of layer pebble be distributed to each tile?

* What does the design represent, as such what should it be called?

* Is the distribution of total stack pebble fair, or well balanced?

## Hide method "hello-world" example

So a hide method can be very simple say I just want to place all land stack pebble in tile 0,0 on the surface layer.

```js
land.addHideMethod({
 
    name : 'all-in-left-top-zero',
 
    method : function (hideKit) {
 
        // set total, and amount of cell 0 to the amount of total pebble for the stack
        hideKit.setAmount(land.getCell(0), land.totalPebble);
 
    }
 
});
```

Notice that I am using my hideKit API, this comes in handy for making quick work of repetitive tasks involved in the authoring of a hide method.

## The hideKit API.

This has lots of helpful little tools that aid in the process of writing a hide method. Such as hideKit.setAmount that as the name suggests it just sets the pebble total, and amount values of a tile. In addition it has other methods such as hideKit.makeOptions that returns an array of tile indexes for a given layer that can be spliced away when distributing an amount of pebble in a layer. I will do my best to keep an up to date list of all hideKit API features in the [readme]((https://github.com/dustinpfister/game_dig) file at the repository


## Some thoughts on distribution of available wealth.

As stated the purpose of a hide method is to distribute a total sum of pebble into a given land stack. With the general idea of what prompted the games development in the first place in mind. I have come to think that the main hide method in use should hide pebble in a "many but low, to few but high" dynamic. In other words there should be a lot of loot tiles on the surface layer, but each tile will contain very small amounts of pebble, while the bottom layer will be the opposite of that.

This is what comes to mind when I think of the possible returns of a lateral vs linear approach of personal development. Becoming a "jack of all trades" will likely result in payoff, but in low amounts as you are a jack, not a master. While becoming a master at something might give great payoffs, but it is risky if it turns out that it is something that is not that marketable.

So far I have been developing a hide method that I just simply call "normal1" which holds true to this idea. However It goes without saying that this is just one aspect of the game that I can have a whole lot of fun with.

## The normal1 hide method

here it is as it stands in game_dig 2.14.4:

```js
land.addHideMethod({
 
    name : 'normal1',
 
    method : function (hideKit, params) {
 
        console.log('I am the \"normal1\" hide method, but you can call me Jerry.');
 
        // can I find a way to do this by way of a single expression?
        var startLTCount = land.w * land.h * params.topLTPer,
 
        // find starting stats for the stack
        stats = (function () {
 
            var i = 0,
            layerCount,
            per,
            layers = [],
            totalLootTiles = 0;
 
            // find stats for each layer
            while (i < land.d) {
 
                per = (i + 1) / land.d;
 
                // loot tiles for the layer
                layerCount = Math.floor(startLTCount - (startLTCount - 1) * (i / (land.d - 1)));
 
                // min of one per layer
                layerCount = layerCount <= 0 ? 1 : layerCount;
 
                // push the layer count
                layers.push({
 
                    lootTileCount : layerCount
 
                });
 
                totalLootTiles += layerCount;
 
                i += 1;
 
            }
 
            // return stats
            return {
 
                layers : layers,
                totalLootTiles : totalLootTiles
 
            };
 
        }
            ());
 
        // loop threw layers from the bottom up, and find amounts
        var i = land.d,
        pebPer = 1,
        perLayer = land.totalPebble / land.d,
        layerAmount,
        totalUsed = 0,
        remain,
        layer;
        while (i--) {
 
            layer = stats.layers[i];
 
            pebPer = 1 - (land.d - i - 1) / land.d;
            layerAmount = Math.floor(perLayer * pebPer);
            totalUsed += layerAmount;
 
            //console.log('layer # : ' + i + ' pebble amount = ' + layerAmount);
 
            layer.amount = layerAmount;
 
        }
 
        // find remain, and stuff it into the bottom layer
        remain = land.totalPebble - totalUsed;
        stats.layers[land.d - 1].amount += remain;
 
        /*
        console.log('total stack pebble = ' + land.totalPebble);
        console.log('totalUsed = ' + totalUsed);
        console.log('remain = ' + remain);
        console.log('stats');
        console.log(stats);
         */
 
        hideKit.forDepth(function (layer, d) {
 
            var options = hideKit.makeOptions(d),
            layerAmount,
            tileAmount,
            ltCount,
            i,
            remain = 0,
            cell;
 
            layerAmount = stats.layers[d].amount;
            ltCount = stats.layers[d].lootTileCount;
 
            // set ltCount to pebble amount, if there is not enough to go around
            if (layerAmount / ltCount < 1) {
 
                ltCount = layerAmount;
 
            }
 
            tileAmount = Math.floor(layerAmount / ltCount);
            remain = layerAmount % ltCount;
            console.log('amount per lt for layer: ' + tileAmount);
            if (remain) {
 
                console.log('with a remainder of: ' + remain);
 
            }
 
            i = 0;
            while (i < ltCount) {
 
                cell = hideKit.spliceFromOptions(options);
 
                if (i === ltCount - 1 && remain) {
 
                    console.log('last one, and we have a remainder to stuff in it.');
                    hideKit.setAmount(cell, tileAmount + remain);
                } else {
 
                    hideKit.setAmount(cell, tileAmount);
 
                }
 
                i += 1;
            }
 
            console.log('');
 
        });
 
    }
});
```

It is not yet battle tested, but so far it does what I want.

## future concerns

I will be writing more hide methods as the game progresses. Hide methods might end up becoming a component of something that might come along in a few minor releases that so far I am calling a 'game mode'. The way I see it a game mode will have one or more hide methods that are used for that task, along with other components that have to do with game mechanics, and end game scenarios. However that is a whole other can of worms.

