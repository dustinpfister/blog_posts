---
title: Node example of a world generator
date: 2020-03-20 19:37:00
tags: [node.js]
layout: post
categories: node.js
id: 632
updated: 2020-03-22 18:17:47
version: 1.1
---

I have a lot of ideas for game related projects, many of which will never see the light of day. However a great deal of them share certain things in common. One of which is a world map that exists as some kind of gird.

<!-- more -->

## 1 - The gen_map.js module node example

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