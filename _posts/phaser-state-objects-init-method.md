---
title: Whats cool about init methods in Phaser State objects.
date: 2017-10-10 13:16:00
tags: [js,phaser,games]
layout: post
categories: phaser
updated: 2017-10-22 13:49:04
version: 1.1
id: 57
---

Because of the relationship with initialization methods of State Objects and the start method of the StateManager in [phaser](http://phaser.io), it occurred to me that this is something that needs it's own post.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## A quick demo that will help understand why init methods are cool

So I would like to put together a real example, but making a game is something that takes a while, for for the sake of this post I will just throw together a stupid demo that is just some circles moving around a center point.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('circles',
 
    // so I want to place some stuff in a closure
    (function () {
 
        var conf,
        rOff = 0,
        i = 0,
        circles,
 
        setCircle = function (cr, ci, rOff) {
            var r;
 
            rOff = rOff || 0;
 
            r = Math.PI * 2 / conf.count * ci + rOff;
            cr.x = conf.cx + Math.cos(r) * conf.radius,
            cr.y = conf.cy + Math.sin(r) * conf.radius
 
        };
 
        // the State object that will get returned
        return {
 
            // so here is the init method
            init : function (opt) {
 
                var prop,
 
                // the defaults
                defaults = {
 
                    count : 3,
                    cx : 160,
                    cy : 120,
                    size : 32,
                    radius : 64,
                    color : 0x00ff00
 
                };
 
                opt = opt || {};
 
                // apply defaults to anything that is missing
                for (prop in defaults) {
 
                    if (opt[prop] === undefined) {
 
                        opt[prop] = defaults[prop];
 
                    }
 
                }
 
                // ref opt to the variable that will be shared across methods.
                conf = opt;
 
            },
 
            // the create method
            create : function () {
 
                var ci = 0,
                r,
                cir;
 
                // set up the circles based on conf settings
                circles = [];
                while (ci < conf.count) {
 
                    cir = game.add.graphics(0, 0);
 
                    cir.beginFill(conf.color);
                    cir.drawCircle(0, 0, conf.size);
                    cir.endFill();
 
                    setCircle(cir, ci);
 
                    circles.push(cir);
 
                    ci += 1;
 
                }
 
            },
 
            // showtime
            update : function () {
 
                var ci = 0;
 
                rOff = Math.PI * 2 / 100 * i;
                while (ci < conf.count) {
 
                    setCircle(circles[ci], ci, rOff);
 
                    ci += 1;
                }
 
                i++;
                if (i >= 100) {
 
                    i = 0;
 
                }
 
            }
 
        };
 
    }
        ()));
 
// start with default settings
game.state.start('circles');
```

When I call game.state.start with just the key of the state, the demo will go by everything I put in the defaults object I defined in the init method, but as you can see the method accepts an argument. This argument can be used to set some different settings other than the default.

## The param argument of StateManager.start

What makes init methods cool is that I can bass a config object of sorts to a state every time I start the state. 

```js
// start with default settings
game.state.start('circles', true, true, {

    count : 8,
    size : 16,
    color : 0x00afff

});
```

This will change some of the default values and make the demo behave different.

## real examples

A real example would be having a game state that accepts an object in its init method that can set up the game in a way that would otherwise me a new game. This is why init methods come in handy, mainly I use them with my main game states in this way.

## Conclusion

There are of course the core methods of state objects in phaser, but in some states an init method is called for as a means to set things up in a certain way before anything else is done.

happy coding.

{% phaser_bottom %}
