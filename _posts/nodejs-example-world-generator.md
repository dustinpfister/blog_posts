---
title: Node example of a world generator
date: 2020-03-20 19:37:00
tags: [node.js]
layout: post
categories: node.js
id: 632
updated: 2021-03-16 15:59:34
version: 1.8
---

I have a lot of ideas for game related projects, many of which will never see the light of day. However a great deal of them share certain things in common. One of which is a world map that exists as some kind of grid of map sections. That is a massive world map is broken down into smaller sub maps or sections, and each section has a max index of sorts. In other words a kind of grid within a grid. So this post will be a [nodejs example](/2021/03/16/nodejs-example/) on making a world map for a game.

Some ideas for world maps exist as collections of static or fixed width and height map sections others have width and height sections that are variable. Some ideas for game involve a world map that is generated each time a new game starts, and there is no need to save the state of the map necessarily. Other times I might want to save the map that is generated to then load again at a later time. 

Ideas for games range from RPG style games, to other games that are more like simulations, so there is a need to abstract away game specific logic away from any and all modules that generate these maps.

<!-- more -->

## 1 - The gen_map.js module node example

So I will want a nodejs module that will be used to build the game world in terms of the state in the form of objects, rather than files. It might be best to separate logic that generates a state from logic that writes the state to a file system in some form, because depending on the project I might want to store the state in all kinds of different ways, or I might not want to even store the state of the game world at all.

### 1.1 - The gen map module

So I broke the module down into two methods one of which is to create a map section, and another that is for generating the whole world map.

```js
let genMapSection = exports.genMapSection = (opt) => {
    opt = opt || {};
    let map = {};
    map.secIndex = opt.secIndex === undefined ? 0 : opt.secIndex;
    map.cells = [];
    if (opt.data) {
        map.data = opt.data;
    }
 
    opt.secWidth = opt.secWidth || 12;
    opt.secHeight = opt.secHeight || 8;
    opt.forCell = opt.forCell || function (cell) {
        return cell;
    };
 
    let len = opt.secWidth * opt.secHeight,
    i = 0;
    while (i < len) {
        let cell = {
            i: i,
            x: i % opt.secWidth,
            y: Math.floor(i / opt.secWidth)
        };
        cell = opt.forCell(cell);
        map.cells.push(cell);
        i += 1;
    }
 
    return map;
 
};
 
let genWorldMap = exports.genWorldMap = (opt) => {
 
    opt = opt || {};
    opt.forMapSecOptions = opt.forMapSecOptions || function (mapSec, world) {
        return mapSec;
    };
 
    let world = {};
    world.width = opt.width || 2;
    world.height = opt.height || 1;
    world.sections = [];
    if (opt.secWidth && opt.secHeight) {
        world.secWidth = opt.secWidth;
        world.secHeight = opt.secHeight;
    }
    let len = world.width * world.height,
    i = 0;
    while (i < len) {
        let msOptions = {
            secIndex: i,
            secWidth: opt.secWidth || 4,
            secHeight: opt.secHeight || 2
        };
        msOptions = opt.forMapSecOptions(msOptions, world);
        let mapSec = genMapSection(msOptions);
        world.sections.push(mapSec);
        i += 1;
    }
    return world;
};
```

### 1.2 - Static map

Here is a static map use case example. By static map I mean that each map section has a fixed or static width and height.

```js
let genMap = require('./lib/gen_map.js');
 
// variable map section size
let world = genMap.genWorldMap({
        width: 3,
        height: 3,
        secWidth: 2,
        secHeight: 2,
        forMapSecOptions: function (msOpt, world) {
            let i = msOpt.secIndex,
            cx = Math.floor(world.width / 2),
            cy = Math.floor(world.height / 2),
            secX = i % 2,
            secY = Math.floor(i / 2),
            d = Math.sqrt(Math.pow(secX - cx, 2) + Math.pow(secY - cy, 2));
            msOpt.data = {
                secX: secX,
                secY: secY,
                val: d * 10 + 5
            };
            msOpt.forCell = function (cell) {
                cell.val = msOpt.data.val / (world.secWidth * world.secHeight);
                return cell;
            };
            return msOpt;
        }
    });
 
console.log(JSON.stringify(world));
```

### 1.3 - variable map

Here is a variable map example where the section with and height of each map is set by way of a method rather than static values. This might be the best way to go about moving forward when it comes to creating a massive collection of maps where the size of the map depends on the state of some kind of grand input.

```js
let genMap = require('./lib/gen_map.js');
 
// variable map section size
let world = genMap.genWorldMap({
        width: 2,
        height: 2,
        forMapSecOptions: function (msOpt) {
            let secWidth = 1 + msOpt.secIndex;
            msOpt.secWidth = secWidth;
            msOpt.secHeight = 2;
            msOpt.data = {
                secWidth: secWidth
            };
            return msOpt;
        }
    });
 
console.log(JSON.stringify(world));
```

## 2 - Conclusion

In order for me to work out what I really had in mind with this I think I first need to work out a half way decent front end system for this. The idea for the full project was to have a canvas game that is some kind of RPG style thing like that of Dragon Warrior or something to that effect. Once I have the core of that kind of game world out there is then having a way to generate a map from nothing in the game itself, but I thought it would be pretty cool to have it so the game world is generated from the state of the content that I have made thus far for this website.