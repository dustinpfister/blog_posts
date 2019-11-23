---
title: Node event emitter class
date: 2019-11-21 16:58:00
tags: [node.js]
layout: post
categories: node.js
id: 568
updated: 2019-11-23 10:14:27
version: 1.9
---

This will be a post on the [node event](https://nodejs.org/api/events.html#events_class_eventemitter) emitter class for making custom events in nodejs. It can come in handy now and then to make my own custom events, and attach handers for them, I just need to know where and when to call the emit method in my code when a custom event happens. However maybe it would be best to learn by doing, and to do so it might be best to just jump ahead to the code examples here on the node event emitter class.
This is a nodejs core build in module that is in node itself, so no npm package of any kind needs to be installed to get started with this, you just need node itself.

<!-- more -->

## 1 - Basic node event emitter class example

So for a basic example of the node event emitter class, here is an example that just involves stepping an object property. Each time the object property is stepped an update event is emitted, and a overload event is also emitted when that property reaches a defined max value. 

So To set up my own events I just need to require in the events module that exports a constructor method that can be used to create an instance of the node event emitter class. Once I have that emitter class instance I can call the emit method of that instance in my code where I want a kind of event to happen, I then pass a name for the event as the first argument, followed by one or more arguments for it.

```js
let Emitter = require('events'),
events = new Emitter();
 
events.on('update', (obj) => {
    console.log(obj.i)
});
 
events.on('overload', (obj) => {
    obj.i %= obj.iMax;
});
 
let obj = {
    i: 0,
    iMax: 10
};
 
let updateObject = function (obj) {
    obj.i += 1;
    if (obj.i > obj.iMax) {
        events.emit('overload', obj);
    }
    events.emit('update', obj);
};
 
setInterval(function () {
    updateObject(obj);
}, 250);
```

So when this example starts it counts up to 10 at which point the overload event is used to set the count back to zero. This is a silly pointless example, but you get the general idea. The node event emitter class is a way to go about defining my own events. I just need to have a way to go about calling the emit method where and when doing so is called for, setting a name, and passing arguments that are needed.

## 2 - Game board example of a node event emitter

Okay great now that we have the boring part out of the way lets do something fun, or at least something where there is a potential for fun anyway.

In this example I worked out a basic game board module. It contains the beginnings of two classes one for a unit, and another for a game board that will also function as a unit collection class. The Board class will contain an instance of the node event emitter class that I can use to define some events for certain events, such as when a unit moves, or goes out of bounds for the game board.

### 2.1 - The game board lib

So here is the game board module that I put together for this post. Here I define my Unit Class, and my Board class, and have just a plain object that is exported as public api. The public api of this module is just two references to the Unit and Board Classes.

In the Board class Constructor I created an instance of a node event emitter, and make that one of the properties of a Board class instance. That way when I use the Class in a project I can define event handlers for the Board class instance for certain events of interest that will happen as I move a unit around the board.

```js
let Emitter = require('events');
 
let c = 0;
let genUID = () => {
    return Number(100 + c).toString('hex');
};
 
// A Unit Class
let Unit = function (opt) {
    opt = opt || {};
    this.uid = opt.uid || genUID();
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
};
 
// A Board Class
let Board = function (opt) {
    opt = opt || {};
    this.width = opt.width || 8;
    this.height = opt.height || 8;
    this.units = opt.units || [];
    this.events = new Emitter();
};
 
// get Unit method
Board.prototype.getUnit = function (u) {
    // if object assume it is a unit
    // all ready and just return
    if (typeof u === 'object' && u != null) {
        return u;
    }
 
    // if string get unit by it
    if (typeof u === 'string') {
        let i = this.units.length,
        unit;
        while (i--) {
            unit = this.units[i];
            if (unit.uid === u) {
                return unit;
            }
        }
        this.events.emit('error', new Error('unit uid ' + u + ' not found'))
        return false;
    }
    // if number assume it is an index
    if (typeof u === 'number') {
        let unit = this.units[u];
        if (typeof unit === 'object') {
            return unit;
        }
        this.events.emit('error', new Error('Unit index ' + u + ' is out of range'));
        return false;
    }
    // if all fails emit an error event, and return and empty object
    this.events.emit('error', new Error('Attempt to get a unit with invalid value: ' + u));
    return false;
 
};
 
Board.prototype.moveUnit = function (u, dx, dy) {
    // get unit
    let unit = this.getUnit(u);
    // if unit move it
    if (unit) {
        let ox = unit.x,
        oy = unit.y,
        x = unit.x = unit.x + dx,
        y = unit.y = unit.y + dy;
        // emit a 'unit-move' event
        this.events.emit('unit-move', unit, ox, oy);
        // if unit is out of bounds emit an out-of-bounds event
        if (unit.x < 0 || unit.y >= this.width || unit.y < 0 || unit.y >= this.height) {
            this.events.emit('unit-out-of-bounds', unit);
        }
    }
}
 
module.exports = {
    Board: Board,
    Unit: Unit
};
```

### 2.2 - A simple demo

So now for a simple demo of this Board Class in action. In a new javaScript file I require in my board class module. I then create an instance of the Board Class, and then make a single unit for it. I then add some handlers to the node event emitter class instance that is attached to the events property of the Broad Class instance.

```js
let board = require('./lib_board_class.js');
 
let gameBoard = new board.Board({
        width: 5,
        height: 5,
        units: [
            new board.Unit({
                x: 1,
                y: 1,
                uid: 'player'
            })
        ]
    });
 
// set some handlers for my events
gameBoard.events.on('error', function (e) {
    console.log('')
    console.log('Error:')
    console.log(e.message);
    console.log('');
});
gameBoard.events.on('unit-move', function (unit, ox, oy) {
    console.log('')
    console.log('Unit moved:');
    console.log('from: ' + ox + ',' + oy);
    console.log('to: ' + unit.x + ',' + unit.y);
    console.log('')
});
gameBoard.events.on('unit-out-of-bounds', function (unit) {
    console.log('')
    console.log('Unit is out of bounds:');
    console.log('unit uid: ' + unit.uid);
    console.log('')
});
 
gameBoard.moveUnit('player', -1, 0);
gameBoard.moveUnit('player', -1, 0);
gameBoard.moveUnit(null, -1, 0);
```