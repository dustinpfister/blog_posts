---
title: What to know about the state manager in phaser
date: 2017-10-05 09:32:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 54
updated: 2017-10-22 13:49:04
version: 1.1
---

When I start making a javaScript project they almost always involve some kind of main game loop, and in more advanced projects an array of objects that contain methods for each game state. In [Phaser](http://phaser.io/) there is the StateManager, and State objects that are of concern when it comes to getting this done with phaser, rather than my usual vanilla js solutions.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## The state manager object

Typically there is a single instance of StateManager that ends up being stored at game.state, and a "default" game State instance at game.state.states.default. In this post I will be mainly writing about the StateManager, but I will also be touching base on State Objects as well.

## A very simple demo

For starters lets take a look at a stupid simple phaser project that is just a single create method, attached to a single State Object that will be the default state for the StateManager.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea',
 
    {
 
        // create method
        create : function () {
 
            // game.state is a reference to the State Manager in phaser
            console.log(game.state); // the state manager object
 
            // game.state.states is where state objects are stored
            // including this one
            console.log(game.state.states.default); // this state object
 
            // this is a reference to this very function
            console.log(game.state.states.default.create); // this function
 
        }
 
    }
 
);
```

When I make a new instance of a phaser game, the object that I pass to the main Phaser.game constructor, after the id of the container element, will become the default game state object.

## StateManager.add(key, State, autoStart)

There are many methods for an instance of StateManager one of the most important of them, may be StateManger.add, as it allows me to write more than one State object for a project. With the add method the above demo can also me written like this.

```js
// I did not give a default State
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// I can add one with StateManager.add
game.state.add('default',
 
    {
 
        // create method
        create : function () {
 
            // game.state is a reference to the State Manager in phaser
            console.log(game.state); // the state manager object
 
            // game.state.states is where state objects are stored
            // including this one
            console.log(game.state.states.default); // this state object
 
            // this is a reference to this very function
            console.log(game.state.states.default.create); // this function
 
        }
 
    }
 
);
 
// start the default State
game.state.start('default');
```

This approach may be more desirable as it allows me to break things down into many separate files, one for each State Object. Instead of having everything in my main.js file, I could have a default.js (or maybe boot.js), load.js, title.js, game.js, ect.

In the above example I am just giving a plain old Object as the State, but it can also be An Instance of a Phaser State Object, or even a function.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO,'gamearea');
 
game.state.add('func', function(){
 
    console.log('yes I am just a function');
 
},true);
```

Still I do not mainly make my states that way, I just give them a key that descibes the state, and will be used in other states to start it when needed, object that at a minimum has at least a create method, and maybe use the AutoState bool as the last argument in place of a game.state.start(key).

## StateManager.start(key, clearWorld, clearCache,param)

The start method is another must know, for both starting a state, as well as for changing between them. This allows for flow between many different States in one of my projects.

When starting a state at a minamum I must give the key of there state to start

```js
game.state.start('theState');
```

But I can give up to four arguments that have to do with clearing caches, and also the option to pass a param object to an init method of the state if it has one. This is very useful when it comes to any kind of state in which there are different ways in which the state can be initialized, such as a game state in which there is a player progress object that can be passed to it to set up the game where the play left off in the game.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('setup',
 
    (function () {
 
        var box = {},
        cr;
 
        // return the state object
        return {
 
            // an init method with a param object
            init : function (param) {
 
                console.log(param);
 
                box = {
 
                    sx : param.x === undefined ? 0 : param.x,
                    sy : param.y === undefined ? 0 : param.y,
                    dx : param.dx === undefined ? 1 : param.dx,
                    dy : param.dy === undefined ? 0 : param.dy
 
                };
 
                box.x = box.sx;
                box.y = box.sy;
 
            },
 
            create : function () {
 
                cr = game.add.graphics(box.x, box.y);
 
                cr.beginFill(0x00ff00);
                cr.drawCircle(50, 50, 100);
                cr.endFill();
 
            },
 
            // a core update method
            update : function () {
 
                // move box x, by its delta
                box.x += box.dx;
                box.y += box.dy;
 
                cr.x = box.x;
                cr.y = box.y;
 
                // set some conditions for the circle to come back home
                if (box.x > 1000 || box.x < -1000 || box.y > 1000 || box.y < -1000) {
 
                    box.x = box.sx;
                    box.y = box.sy;
 
                }
 
            }
 
        };
 
    }
        ()));
 
// staring moveCircle with  a param object
game.state.start('setup', true, false, {
 
    x : 100,
    y : 60,
    dx : 5,
    dy : -1
 
});
```

## Conclusion

Thats it with the state manager for now, so far I do not have a lot of posts on phaser, but 
rest assure this post will be updated in the future as my content on phaser grows. In time there Will be a collection of posts that I will be linking together.

If you are new to phaser start by playing around with state machines, you might also want to check out [my getting started post](/2017/10/04/phaser-getting-started/) on phaser.

{% phaser_bottom %}