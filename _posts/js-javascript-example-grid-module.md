---
title: JavaScript example of a grid module
date: 2021-08-20 07:53:00
tags: [js]
layout: post
categories: js
id: 925
updated: 2021-08-24 11:46:40
version: 1.15
---

I made a canvas example a while back on how to go about making a grid, but that post was more so on drawing one, not having something that is a state object, and methods that act on that state object. So then in this [JavaScript example](/2021/04/02/js-javascript-example/) post today I thought I would go about writing about a simple javaScript grid module. 
There are many basic features that a grid module should have, such as a public method that can be used to get a cell by way of a canvas pixel position for example. There are also more advanced features such as [path detection](/2019/08/27/js-path-find/) that maybe should be a part of a grid module, or maybe a part of an optional module that can be used on top of a grid module. In any case for this example I am going to just be sticking with the very basics of this sort of thing. However do not let that fool you, even when it comes to the very basics of a grid module there is still a fare about of ground to cover.


<!-- more -->

## 1 - The grid module

So then the first thing I would like to get to is the current state of the grid module that I have made for this post.  When it comes to making a choice as to what kind of pattern I should go with when it comes to making a [javaScript module](/2019/03/12/js-javascript-module/) I went with an [IIFE](/2020/02/04/js-iife/).

### 1.1 - The create method

The main basic method of interest is the create method of this grid module that will create and return a new grid object. So right off the bat there is the question of how to go about structuring a grid object as there are so many different ways of going about doing that sort of thing in javaScript. For example many javaScript developers might like to create a grid as an array of arrays, however others present company included like to use a linear array and use expressions to get and set values of cells. This alone can prove to end up being a situation that can get a developer stuck on something that is trivial, however I often think it is basic to just make a decision and move forward when it comes to things like this. Also I can alter on make additional create methods that can be used to create my standard grid object from other kinds of gird object formats if I end up in a situation in which I need to.

So then the start of my grid module is the beginnings of an IIFE, and the create method.

```js
(function (api) {
    // create a grid object
    api.create = function (opt) {
        opt = opt || {};
        var grid = {
            cellSelected: null, // selected cell ref
            cells: []
        };
        grid.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
        grid.w = opt.w === undefined ? 8 : opt.w;
        grid.h = opt.h === undefined ? 8 : opt.h;
        grid.xOffset = opt.xOffset === undefined ? 0 : opt.xOffset;
        grid.yOffset = opt.yOffset === undefined ? 0 : opt.yOffset;
        var i = 0,
        cell,
        len = grid.w * grid.h;
        while (i < len) {
            cell = {
                i: i, // store index for this cell
                cellX: i % grid.w, // grid index pos values as uppercase X, and Y
                cellY: Math.floor(i / grid.w),
                data: {} // user data object
            };
            // cell pixel pos values as lowercase x, and y
            cell.x = grid.xOffset + cell.cellX * grid.cellSize;
            cell.y = grid.yOffset + cell.cellY * grid.cellSize;
            grid.cells.push(cell);
            i += 1;
        }
        return grid;
    };
```

### 1.2 - The get cell by pixel position method

```js
    // get a cell by the given pixel position
    api.getCellByPixlePos = function (grid, x, y) {
        var cellX = Math.floor( (x - grid.xOffset) / grid.cellSize ),
        cellY = Math.floor( (y - grid.yOffset) / grid.cellSize ),
        cell;
        if(cellX >= 0 && cellY >= 0 && cellX < grid.w && cellY < grid.h){
            return grid.cells[cellY * grid.w + cellX];
        }
        return null;
    };
```

### 1.3 - selected check method

```js
    // selected cell check
    api.selectedCheck = function (grid, x, y, onSelect, onUnselect) {
        var cell = api.getCellByPixlePos(grid, x, y);
        if (cell) {
            if (cell === grid.cellSelected) {
                onUnselect(cell, grid, x, y);
                grid.cellSelected = null;
            } else {
                if (grid.cellSelected) {
                    onUnselect(grid.cellSelected, grid, x, y);
                }
                grid.cellSelected = cell;
                onSelect(cell, grid, x, y);
            }
        } else {
            if (grid.cellSelected) {
                onUnselect(grid.cellSelected, grid, x, y);
                grid.cellSelected = null;
            }
        }
    };
}
    (this['gridMod'] = {}))
```

## 2 - The utils module for this over all example

```js
var utils = {};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
// create a canvas element
utils.createCanvas = function (opt) {
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () {
        return false;
    }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// get a canvas relative position that is adjusted for scale
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};
// create and return a canvas pointer event handler
utils.canvasPointerEventHandler = function (state, events) {
    return function (e) {
        var pos = utils.getCanvasRelative(e),
        handler = null;
        e.preventDefault();
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            handler = events['pointerStart'];
        }
        if (e.type === 'mousemove' || e.type === 'touchmove') {
            handler = events['pointerMove'];
        }
        if (e.type === 'mouseup' || e.type === 'touchend') {
            handler = events['pointerEnd'];
        }
        if (handler) {
            handler.call(e, e, pos, state);
        }
    };
};
// attach canvas pointer events
utils.canvasPointerEvents = function (canvas, state, events) {
    var handler = utils.canvasPointerEventHandler(state, events),
    options = {
        passive: false
    }
    canvas.addEventListener('mousedown', handler, options);
    canvas.addEventListener('mousemove', handler, options);
    canvas.addEventListener('mouseup', handler, options);
    canvas.addEventListener('touchstart', handler, options);
    canvas.addEventListener('touchmove', handler, options);
    canvas.addEventListener('touchend', handler, options);
};
```

## 3 - The draw lob for the example

I have just a few draw methods that I will be using for this example.

```js
var draw = {};
// draw a background
draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw the given grid object
draw.grid = function (grid, ctx, canvas) {
    grid.cells.forEach(function (cell) {
        ctx.fillStyle = cell.data.fillStyle || 'white';
        ctx.fillRect(cell.x, cell.y, grid.cellSize, grid.cellSize);
    });
};
```

## 4 - The main JavaScript file of this example

I then also have a main javaScript file that will make used of my grid module, as well as all the other JavaScript files that I have covered in this post.

```js
var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    canvasObj: utils.createCanvas({
        width: 640,
        height: 480
    }),
    grid: gridMod.create({
        xOffset: 32,
        yOffset: 32
    }),
    currentState: 'game',
    states: {}
};
 
var onSelected = function(cell, grid, x, y){
    cell.data.fillStyle = 'red';
};
var onUnselected = function(cell, grid, x, y){
    cell.data.fillStyle = 'white';
};
 
// game state
sm.states.game = {
    update: function (sm, secs) {
    },
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
        draw.grid(sm.grid, ctx, canvas);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            gridMod.selectedCheck(sm.grid, pos.x, pos.y, onSelected, onUnselected);
        },
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
    }
};
 
utils.canvasPointerEvents(sm.canvasObj.canvas, sm, {
    pointerStart: function (e, pos, sm) {
        var state = sm.states[sm.currentState];
        var handler = state.events['pointerStart'];
        if (handler) {
            handler.call(e, e, pos, sm);
        }
    }
});
 
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000,
    state = sm.states[sm.currentState];
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        state.update(sm, secs);
        state.draw(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        sm.lt = now;
    }
};
 
loop();
```

## 5 - Conclusion

That will be it for now when it comes to this grid module, however this might prove to be one of my many javaScript posts in which I will be coming back to do some editing now and then. There are a lot of other features that I would want to add to this kind of module, but the features will differ a little from one project to the next.