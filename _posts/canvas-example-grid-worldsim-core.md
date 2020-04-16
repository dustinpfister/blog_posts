---
title: Search destroy and spawn canvas example
date: 2020-04-15 17:18:00
tags: [canvas]
layout: post
categories: canvas
id: 646
updated: 2020-04-15 21:50:14
version: 1.2
---

I want to start making at least a few more [canvas examples](/2020/03/23/canvas-example/) that are the kind of example that I will be coming back to a few times. In other words the kind of canvas example that might prove to be a bit more that just a center piece to write about in a blog post before moving on to the next thing. I as happy with how my [grid gradient canvas example](/2020/03/26/canvas-example-grid-gradient/) came out as it is was a canvas example that I put a little more time and effort into than usual. The main reason why I liked working on it so much was the plug-in system. However that was just an eye candy type thing, it would be nice to start another canvas example that is something els like that only it is something maybe a little more interesting.

So this canvas example will be similar to the grid gradient example, but this time I will be aiming for the start of a world simulator type project.

<!-- more -->

## 1 The world.js file

The world.js file is the main module that will create all the cells for the gird that will make up the world.

```js
var world = (function () {
 
    var CELL_VALUES = {
        sx: 32,
        sy: 32,
        size: 32
    };
 
    // hard coded initObjects
    // this can be extend via a plug-in
    var init = {
        defaultValues: {
            before: function (state) {
                console.log('defualt values before hook');
                //state.cells = [];
            },
            forCell: function (state, cell) {
                cell.x = cell.i % state.width;
                cell.y = Math.floor(cell.i / state.width);
                console.log('default values forCell: ' + JSON.stringify(cell));
            },
            after: function (world) {
                console.log('default values after hook');
            }
        }
    };
 
    // call a hook
    var callHook = function (state, initObjKey, hookName, cell) {
        hookName = hookName || 'before';
        initObjKey = initObjKey || 'defaultValues';
        var initObj = init[initObjKey];
        if (initObj[hookName]) {
            initObj[hookName](state, cell);
        }
    };
 
    // create cells for the world
    var createCells = function (state) {
        var i = 0,
        len = state.width * state.height,
        cell;
        // set up cells with just index prop
        state.cells = [];
        while (i < len) {
            cell = {};
            cell.i = i;
            state.cells.push(cell);
            i += 1;
        }
        // call init methods for each initObj
        Object.keys(init).forEach(function (initObjKey) {
            callHook(state, initObjKey, 'before');
            i = 0;
            while (i < len) {
                callHook(state, initObjKey, 'forCell', state.cells[i]);
                i += 1;
            }
            callHook(state, initObjKey, 'after');
        });
    };
 
    // the public API
    return {
 
        CELL_VALUES: CELL_VALUES,
 
        // create a world state object
        create: function () {
            var state = {
                year: 0,
                cells: [],
                width: 10,
                height: 8
            };
            createCells(state);
            return state;
        },
 
        // load plug-in
        load: function (plug) {
            // just ref it in for now as long as that works
            if (plug.init) {
                init[plug.key] = plug.init;
            }
        },
 
        // tick year, and update world state for new year
        tickYear: function (state) {
            state.year += 1;
        }
    }
}
    ());
```
