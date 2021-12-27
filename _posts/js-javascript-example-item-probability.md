---
title: Item probability javaScript example
date: 2021-12-24 13:17:00
tags: [js]
layout: post
categories: js
id: 946
updated: 2021-12-27 09:06:34
version: 1.10
---

This [javaScript example](/2021/04/02/js-javascript-example/) post will be on a module that has to do with setting what the probability should be for various classes of items for a game of one kind or another, mostly RPG style games such as my [turn based RPG game prototype](/2021/12/10/js-javascript-example-turn-based-rpg/) that is another one of my javaScript examples. When it comes to such game projects they often contain item systems, and when it comes to such item systems one aspect of such systems is to have a class of item. That is that certain items are of low quality and as such they belong to a class often called common or something to that effect, and then there are items that are of the highest quality in the game and as such they belong to a class such as Epic. So then there is creating a system that can be used to set what the probability of a certain class of item occurring.

This item class module will then not be a whole item system then, let alone a full game prototype of any kind. However it is at least one little component of an item system that has to do with the probability of a certain class of item dropping. There is also the idea of having another set of probabilities for each item of a class also, but that might be a topic for another post that has to do with a more comprehensive over all system for dealing with items in a game.

<!-- more -->


## 1 - The Item class module

Here is the source code of the item class module as it currently stands as a [javaScript module](/2019/03/12/js-javascript-module/) that follows an [IIFE pattern](/2020/02/04/js-iife/).

```js
var itemClass = (function(){
    var DEFAULT_COLORS = ['#efefef', 'lime', 'blue', 'orange', 'purple'];
    // default pool of objects for each item class
    var DEFAULT_POOL = [
        { desc: 'Junk', range: [1000, 250] },
        { desc: 'Common', range: [300, 800] },
        { desc: 'Fair', range: [150, 500] },
        { desc: 'Rare', range: [50, 250] },
        { desc: 'Epic', range: [10, 100]}
    ];
    DEFAULT_POOL = DEFAULT_POOL.map(function(obj, i){ obj.color = DEFAULT_COLORS[i] || 'white'; return obj;  })
    // public api
    var api = {};
    // parse pool helper
    var parsePool = function(classes){
        return classes.pool.map(function(obj, i){
            obj.range = obj.range || [1, 1];
            var min = obj.range[0],
            max = obj.range[1], level;
            obj.levelPer = obj.levelPer === undefined ? 0 : obj.levelPer;
            level = classes.levelPer * classes.levelPerRatio + (1 - classes.levelPerRatio) * obj.levelPer;
            obj.points = min + (max - min) * level;
            obj.desc = obj.desc || '';
            obj.color = obj.color || DEFAULT_COLORS[i] || 'white';
            return obj;
        });
    };
    // create ITEM Classes object
    api.create = function(opt){
        opt = opt || {};
        var classes = {
            levelPer: opt.levelPer || 0,
            levelPerRatio: opt.levelPerRatio === undefined ? 1 : opt.levelPerRatio
        };
        // use given pool array or default starting pool
        classes.pool = opt.pool || DEFAULT_POOL;
        // parse given pool collection
        classes.pool = parsePool(classes);
        // get total points
        classes.totalPoints = classes.pool.reduce( function(acc, obj){ return acc + obj.points;}, 0);
        // set 0-1 numbs for each itemClasses object
        classes.pool = classes.pool.map( function(obj, i){ obj.per = obj.points / classes.totalPoints; obj.i = i; return obj; } );
        return classes;
    };
    // GET a random ITEM classes object
    api.getRandomItemClass = function(classes){
        var i = 0,
        len = classes.pool.length
        roll = Math.random(),
        n = 1
        while(i < len){
            var item = classes.pool[i];
            n -= item.per;
            if(roll > n){
                return item;
            }
            i += 1;
        }
        return item;
    };
    // return the public api
    return api;
}());
```

## 2 - Demo of the item class system

To make sure that this item class system is working the way that I would want it to I will want to work out at least one if not more demos of the module.

```html
<html>
    <head>
        <title>Math random</title>
    </head>
    <body>
        <canvas id="the-canvas" width="640" height="480"></canvas>
        <script src="item-class.js"></script>
        <script>
// DEMO
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// creating a item classes object
var items = itemClass.create({
   levelPer: 1,             // the current global level for item drops
   levelPerRatio: 0.25,     // the ratio 0-1 that is the amount that the global levelPer effects points for each item class
   pool: [                  // pool defining values for each class
     {desc: 'Junk', range: [1000, 300], levelPer: 0.25},
     {desc: 'Common', range: [100, 800], levelPer: 0.5},
     {desc: 'Epic', range: [10, 100], levelPer: 1}
   ]
});
// create bars array
var bars = items.pool.map(function(item){
    return {
       i: item.i,
       color: item.color,
       desc: item.desc,
       count: 0
    };
}),
bLen = bars.length;
var i = 0, len = 1000, bi;
while(i < len){
    var item = itemClass.getRandomItemClass(items);
    bi = item.i;
    var bar = bars[bi];
     bar.count += 1;
    i += 1;
}
// draw bars
var max = Math.max.apply(null, bars.map(function(bar){ return bar.count;}));
ctx.fillStyle = '#afafaf';
ctx.fillRect(0,0,canvas.width, canvas.height);
ctx.font = '20px arial';
ctx.lineWidth = 3;
var barHeight = canvas.height / bLen - 5;
bars.forEach(function(bar, i){
   var p = bar.count / max,
   y = canvas.height / bLen * i;
   ctx.fillStyle = bar.color || 'lime';
   ctx.strokeStyle = '#4a4a4a';
   ctx.beginPath();
   ctx.rect(0, y, canvas.width * p, barHeight );
   ctx.fill();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.textBaseline = 'middle';
   ctx.fillText(bar.i + ') ' +bar.desc, 10, y + barHeight / 2);
});
        </script>
    </body>
</html>
```

## 3 - Conclusion

This javaScript example worked out pretty well for me thus far, and I can not say that there is much more that I would what to add to it for what it is. When it comes to making additional changes and expanding on this example I think that will need to happen in terms of additional modules that make use of this item class module.