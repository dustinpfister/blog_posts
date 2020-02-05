---
title: Basic idle game canvas example
date: 2020-02-01 20:36:00
tags: [canvas]
categories: canvas
layout: post
id: 602
updated: 2020-02-04 20:18:12
version: 1.7
---

There is a lot that I like about idle games, so I thought I would make another [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) post that is a basic idle game. This canvas example makes use of a custom trailered utility library that has a method that creates a button layout, which is one way that I go about making menus in a canvas project. I [wrote a post in which I get into this button layout method](/2020/02/03/canvas-example-button-layout/) in detail, but will be covering it here also. The game module has an upgrade system that I worked out that is worth writing a thing or two about So I will be getting into that a little here also. In any case this post should server as a good starting point for making a basic idea game with canvas elements and javaScript.


<!-- more -->


## 1 - The utils lib

So in this section I will be gong over the utility library that I worked out for this canvas example.

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

## 2 - The game module

Now to get into the actual game module of this basic idle game canvas example.

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

So now that I have my utility library, game module, and draw module it is time to tie everything together with a main.js file and a a single HTML file.

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