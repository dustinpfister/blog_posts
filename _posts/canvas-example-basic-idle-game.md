---
title: Basic idle game canvas example
date: 2020-02-01 20:36:00
tags: [canvas]
categories: canvas
layout: post
id: 602
updated: 2021-02-27 20:13:23
version: 1.32
---

There is a lot that I like about [idle or incremental games](https://en.wikipedia.org/wiki/Incremental_game) as there is the artistic side of game development, and then there is the business side of things. When it comes to the artistic side maybe game development is about some kind of expression, making some kind of statement, or just simply having fun. However with the artistic side of game development aside there is also the business side of the endeavor, and when it comes to the business side all that really matters is if a game can make you money or not. Sp then when it comes to the business side of game development a game does not have to be some kind of ground breaking statement, emotional expression, or anything profound, it just needs to make money.

When it comes to the business side of game development I have found that a game does not only not need to be some kind of emotional expression, or some grand original idea that no one has really tough of before, no not at all in fact it does not even need to be fun or interesting actually oddly enough. With the business side of game development a game just needs to be addictive, people need to just start playing it and get hooked. So I thought I would make another [canvas example](/2020/03/23/canvas-example/) post that is a basic idle game. Nothing fancy with this one, just a bland, unbranded idle game starting point that is noting to write home about, but might still prove to be slightly addictive.

This canvas example makes use of a custom trailered utility library that has a method that creates a button layout, which is one way that I go about making menus in a canvas project. I [wrote a post in which I get into this button layout method](/2020/02/03/canvas-example-button-layout/) in detail, but will be covering it here also just not in detail. 

The game module has an upgrade system that I worked out that is worth writing a thing or two about so I will be getting into that a little here also. In any case this post should serve as a good starting point for making a basic idle game with the canvas element and javaScript so lets get to it.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/basic-idle-game/0.1.0/pkg.js"></script>

## 1 - The utils lib for the basic idle game canvas example

So in this section I will be gong over the utility library that I worked out for this canvas example of a basic idle game. Considering the nature of the game the user interface of the game will just consist of a static button layout in the canvas element. This button layout will be composed of buttons that preform a manual gather action, as well as upgrades and will be a box like area in the canvas. So  with that said I will need some methods for collision detection, and working with mouse and or touch events in addition to a method that can be used to create this button layout to be used as the games interface.

```js
var u = {};
 
u.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};
 
u.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
 
u.mkButtonLayout = function (opt) {
    var blObj = {};
    opt = opt || {};
    blObj.buttons = opt.buttons || [];
    blObj.attachTo = opt.attachTo || window;
    blObj.handler = function (e) {
        var pos = u.getCanvasRelative(e),
        i = opt.buttons.length,
        b;
        e.preventDefault();
        while (i--) {
            b = opt.buttons[i];
            if (u.boundingBox(pos.x, pos.y, 1, 1, b.x, b.y, b.w, b.h)) {
                if (b.onAction) {
                    b.onAction.call({
                        opt: opt,
                        pos: pos,
                        button: b,
                        e: e
                    }, pos, opt, b, e);
                }
                break;
            }
        }
    };
    blObj.attachTo.addEventListener('click', blObj.handler);
    return blObj;
};
```

Now that I have a utility module I can get to the game state module, and then the code that draws a state object created with that module to the canvas.

## 2 - The game module

Now to get into the actual game module of this basic idle game canvas example. This module is used to create and update a state object, but not to render that state object to the canvas. This way I am pulling logic that has to do with state away from logic that renders that state to the canvas.

### 2.1 - The start of the game module and the upgrade data array

The module follows an IIFE pattern and at the very top of the self executing function expression I have an upgrade data array. This array contains an object for each upgrade that I would like to have for the idle game. For now there is just an upgrade for the rate at which money is gathered manually, and for the rate at which it is gathered automatically. I do after all want to try to keep this canvas example basic.

```js
var game = (function () {
 
    // UPGRADES
 
    // upgrade data array
    var upgradeData = [{
            dispName: 'Manual Gather',
            cost: {
                base: 10,
                pow: 1.09,
                inc: 5
            },
            effect: function (state, level) {
                state.gatherRate.manual = 1 + level + Math.floor(Math.pow(1.05, level) - 1);
            }
        }, {
            dispName: 'Auto Gather',
            cost: {
                base: 1000,
                pow: 1.25,
                inc: 250
            },
            effect: function (state, level, us) {
                state.autoGatherActive = false;
                if (level >= 1) {
                    state.autoGatherActive = true;
                    state.gatherRate.auto = level + Math.floor(Math.pow(1.025, level) - 1);;
                }
            }
        }
    ];
```

### 2.2 - A Make upgrade state object

So the upgrade data array is an array of hard coded values for each upgrade, but it is not a current state object of sorts. I am going to need another object that is the current state of an upgrade, such as the current level, and values that have to do with the current cost of the next upgrade.

```js
    // make a new upgradeState object from an upgradeData object
    var makeUS = function (ud) {
        return {
            dispName: ud.dispName,
            ud: ud,
            level: 0,
            cost: Object.assign({
                current: ud.cost
            }, ud.cost)
        };
    };
```

### 2.3 - Set the cost of an upgrade state object

So I worked out some methods that are used to set the current cost of an upgrade. One method is used to get an object that is a breakdown of the base cost along with values for an incremental and power based value. The other method is used to set the current cost of an upgrade based on these values.

```js
    // get the breakdown for base, inc, and pow that sets current cost
    var getUSCostBreakdown = function (us) {
        return {
            base: us.cost.base,
            inc: us.cost.inc * us.level,
            pow: Math.floor(Math.pow(us.cost.pow, us.level))
        };
    };
 
    // set the given upgrade state to the given level
    var setUSCurrentCost = function (us, level) {
        var bd;
        level = level || 0;
        us.level = level;
        var bd = getUSCostBreakdown(us);
        us.cost.current = bd.base + bd.inc + bd.pow;
    };
```

### 2.4 - Set the current upgrade level

I have some methods for setting the level of an upgrade state object. There is setting the effect of an upgrade state object, setting the upgrade level, and applying for all.

```js
    // apply the effect of an upgrade
    var applyUSEffectToState = function (us, state, ud) {
        ud.effect(state, us.level, us);
    };
 
    // set the upgrade level
    var setUpgradeLevel = function (us, state, level) {
        setUSCurrentCost(us, level);
        applyUSEffectToState(us, state, us.ud);
    };
 
    // apply all the current states of a state
    var applyAllUSFromState = function (state, upgradeData) {
        state.US.forEach(function (us, i) {
            setUpgradeLevel(us, state, us.level);
        });
    };
```

Not happy with how this is, so in any future updates that may or may not happen with this project I am sure I will re work this one at that point. I might even go so far as to pull all of this logic into its one javaScript module also, as there is a great deal to manage when it comes to an upgrades system actually.

### 2.5 - Create a new state object helper

I have just one method that is used to create a new game state object as it currently stands.

```js
    // GAME STATE OBJECT CREATE
 
    // create and return a new game save state with the given upgradeData
    var createNewState = function (upgradeData) {
        return {
            money: 0,
            tickRate: 3000,
            lastTick: new Date(),
            autoGatherActive: false,
            gatherRate: {
                manual: 1,
                auto: 0
            },
            // just set zero for each upgrade
            US: upgradeData.map(function (ud) {
                return makeUS(ud);
            })
        };
    };
```

### 2.6 - The public API of the game module

Now that I have the private helper methods out of the way it is now time to get to the public api that is returned at the bottom of the IIFE.

```js
    return {
 
        // return the state object to use
        getState: function () {
            var state = createNewState(upgradeData);
            applyAllUSFromState(state, upgradeData);
            return state;
        },
 
        // buy the nest upgrade for the given upgrade
        buyUpgrade: function (state, usi) {
 
            usi = typeof usi === 'number' ? state.US[usi] : usi;
 
            if (state.money >= usi.cost.current) {
                state.money -= usi.cost.current;
                setUpgradeLevel(usi, state, usi.level += 1);
            }
        },
 
        // a manual gather action has happened to the given state
        manualGather: function (state) {
            state.money += state.gatherRate.manual;
        },
 
        // I would like to update the given state
        update: function (state) {
            var now = new Date(),
            t = now - state.lastTick,
            ticks = t / state.tickRate;
            if (state.autoGatherActive) {
                if (ticks >= 1) {
                    state.money += state.gatherRate.auto * ticks;
                    state.lastTick = now;
                }
            } else {
                state.lastTick = now;
            }
        }
 
    };
 
}
    ());
```

## 3 - The Draw module for drawing the button layout and other features.

Now for the draw module of this canvas example that is used to draw the current state of the button layout, as well as many other features thus far with this project.

```js
var draw = {};
 
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.stateStatusInfo = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('money: ' + state.money.toFixed(2) +
        ', manual: ' + state.gatherRate.manual +
        ', auto: ' + state.gatherRate.auto, 10, 10);
};
 
draw.tickProgressBar = function (ctx, canvas, state) {
    var t = new Date() - state.lastTick,
    per = t / state.tickRate;
    if (state.autoGatherActive) {
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, canvas.height - 10, canvas.width * per, 10);
    }
};
 
draw.debugUpgrades = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    state.US.forEach(function (uc, i) {
        ctx.fillText('upgrade: ' + uc.dispName + ', level: ' + uc.level, 10, 20 + 10 * i);
    });
};
 
draw.buttonLayout = function (ctx, blObj) {
    var i = blObj.buttons.length,
    b;
    while (i--) {
        b = blObj.buttons[i];
        ctx.fillStyle = 'red';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(b.label || '', b.x + b.w / 2, b.y + b.h / 2);
    }
};
```

## 4 - The main.js file and html

So now that I have my utility library, game module, and draw module it is time to tie everything together with a main.js file and a single HTML file. In the main.js file I create a canvas element and inject it into the html.

```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
 
// create state
var state = game.getState();
 
// create button layout
var buttons = state.US.map(function (us, i) {
        return {
            x: 170,
            y: 40 + 32 * i,
            w: 128,
            h: 32,
            label: us.dispName + ' (' + us.cost.current + ') ',
            onAction: function (pos, opt, b, e) {
                game.buyUpgrade(state, us);
                b.label = us.dispName + ' (' + us.cost.current + ') ';
            }
        };
    });
 
// push manual gather button
buttons.push({
    x: 16,
    y: 100,
    w: 64,
    h: 32,
    label: 'Gather',
    onAction: function (pos, opt, e) {
        game.manualGather(state);
    }
});
 
var blOptions = {
    attachTo: canvas,
    buttons: buttons
};
var blObj = u.mkButtonLayout(blOptions);
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.tickProgressBar(ctx, canvas, state);
    draw.stateStatusInfo(ctx, state);
    draw.buttonLayout(ctx, blObj);
    draw.debugUpgrades(ctx, state);
    game.update(state);
};
loop();
```

```html
<html>
    <head>
        <title>canvas example basic idle game</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="utils.js"></script>
        <script src="game.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 5 - Conclusion

Well I set out to make a basic Idle game and this is more or less what it is. The only question  now is where to go from here when it comes to making this a more interesting project even if it is to remain very basic and unbranded. There is adding a reset feature which is one major part of an idle game that I think the game should have. Also there is still adding very basic features such as just a save state system. Still when it comes to making a fork of this I will want to come up with at least some kind of theme also.