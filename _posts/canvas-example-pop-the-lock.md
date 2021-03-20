---
title: Pop The Lock Canvas Example Game Clone
date: 2019-11-26 21:22:00
tags: [js, canvas]
layout: post
categories: canvas
id: 571
updated: 2021-03-20 16:13:01
version: 1.57
---

A long time ago I played a game called [pop the lock on android](https://play.google.com/store/apps/details?id=com.sm.popTheLock&hl=en_US), and managed to end up getting hooked for a while. It was a very simple game that just involved a circle moving along the path of another circle, and once it gets close to a target area you need to tap the screen or else you loose, you also loose if you tap to soon. I can then try again and the object is to repeat this process up to a certain count of times to unlock a lock.

I find myself making clones of this game now and then, in part because it is so easy to make a game like this. It is the kind of game where I can make a working clone within just about an hour or so when I am working at my best, sometimes even less than that when it comes to just the basic idea of what it is. However there is so much room of programing things a little differently so that I am making something new rather than something that is just a clone of the same game.

Many of the game prototypes that I have made so far are the kind of projects where it takes a long time to get something together that is just starting to look like a game, but things do not always have to be that way when it comes to this sort of thing, a game can be simple. It is also a great example of what really matters when making a game which is just to make something that is fun, or addictive in a distinct unique way. Often I think that I put way to much time and thought into a game, so it is nice to take a break from that are work on a game like this.

So todays [canvas example](/2020/03/23/canvas-example/) will be a game that is a clone of this pop the lock game to some extent, but a little different. I want to play around with the various values that come to mind when making a game like this, and maybe make it work a little differently altogether so it is not just a full rip off of the original. Sense the time that I have started this post I have updated the source code a few times, when I come back to this one I like to experiment with new game modes, and features.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pop-the-lock/1.0.1/pkg.js"></script>

## 1 - The game.js module for pop the lock

For this canvas example I made a game module that will be used to create and return a game state object, as well as provide methods to update that state object.

The game object contains values such as the current degree of the point in motion, and a value that reflects the total number of degrees in the main circle of the game. In addition there is also a target degree, and margin value that can be used to result in a range area in the circle. This range is the area where the payer will score if they make an action such as clicking or touching the canvas when the current degree is in that range. There are also a number of other values that have to do with the rate at which the current degree will move as well as the current direction, and a boolean that indicates that the current degree is in the range.

In recent version of this game I worked out a few methods for creating new target locations. One of which I like to use when it comes to creating trip up locations, and the other is for creating locations that end up farther away from the current degree location. Speaking of trip up locations this is another feature that I added that can help to make a game mode more challenging, when the trip up location feature is active new targets will spawn close to the current degree location give the player little time to react. I also mentioned modes when is another new feature where I am working out more than one way to go about creating this kind of game. I would like to write more about modes, but I think I am going to keep working on this example a great deal more in the coming days, and I would not like to get into it that much at this time.

```js
var gameMod = (function(){
    // MODES
    var modeAPI = {};
    var modes = {};
    // return the shortest distance to the target from the current position
    var getDistanceFromTarget = function(game){
        return utils.shortestDistance(game.deg.current, game.deg.target, game.deg.total);
    };
    // helpers
    var getInRange = function (game) {
        return game.deg.distance <= game.deg.margin;
    };
    // get a target degree, with degOrgin, percent, and range arguments
    var getTarget = function(game, degOrgin, per, rangePer){
        degOrgin = degOrgin === undefined ? game.deg.current: degOrgin;
        per = utils.mod(per === undefined ? 0 : per, 1);
        rangePer = utils.clampPer(rangePer === undefined ? 1 : rangePer);
        var halfDeg = game.deg.total / 2,
        halfRange = halfDeg * rangePer,
        homeDeg = utils.mod(degOrgin + halfDeg, game.deg.total),
        deg = homeDeg - halfRange + (halfRange * 2 * per);
        return utils.mod(Math.round(deg), game.deg.total);
    };
    // get a target degree from a given degOrigin (0 to deg.total) 
    // by a margin (0 to deg.total) in a direction (1, -1)
    var getTargetFrom = function(game, degOrgin, margin, dir){
        margin = margin === undefined ? 0 : margin;
        dir = dir === undefined ? 1 : dir;
        return utils.mod(Math.round(degOrgin + margin * dir), game.deg.total);
    };
    // get a random target
    var getTargetRandom = modeAPI.getTargetRandom = function(game){
        return getTarget(game, game.deg.current, Math.random(), game.range);
    };
    // get a random target that is a 'trip up' target
    var getTargetRandomTripUp = function(game){
        //var deltaDeg = utils.randomRange(game.tripUp.degMin, game.tripUp.degMax);
        var deltaDeg = utils.randomRange(game.tripUp.degRange);
        return getTargetFrom(game, game.deg.current + deltaDeg * game.dir);
    };
    // create and return a new target
    var newTarget = modeAPI.newTarget = function(game){
        if(game.tripUp.count > 0){
            game.tripUp.count -= 1;
            return getTargetRandomTripUp(game);
        }
        var roll = Math.random();
        if(roll < game.tripUp.chance){
            game.tripUp.count = Math.floor(utils.randomRange(game.tripUp.countRange));
            return getTargetRandomTripUp(game);
        }
        return getTargetRandom(game);
    };
    // public API
    var api = {};
    // make modes public
    api.modes = modes;
    // CREATE and return a main game object
    api.create = function(opt){
        opt = opt || {};
        var game = {                         // THE MAIN GAME OBJECT
            mode: opt.mode || 'freePlay',    // current game mode such as 'endurance', or 'freePlay' (see modes object)
            level: 1,
            targets: 1,
            deg: {                           // 'degree' object
               perSec: 30,                   // degrees per second
               current: 25,                  // the current 'degree'
               target: 0,                    // the target 'degree'
               total: 100,                   // total number of 'degrees'
               margin: 4,                    // the margin of 'degrees' +- from target that will still count as in range
               distance: 0                   // should be the shortest distance in 'degrees' from target
            },
            missTrack: {                     // Miss Tacking (missed target, not clicking to soon)
                canMiss: false,
                count: 0
            },
            clickTrack: {
                total: 0,                    // total number of clicks
                hits: 0                      // total number of clicks that are hits
            },
            tripUp: {                        // settings for 'tripUp' mode
                count: 5,
                chance: 0.12,
                countRange: [3, 10],
                degRange: [10, 20]
            },
            hp: {                            // hit points
                active: false,
                current: 5,
                max: 10
            },
            gameOver: false,
            win: false,
            pause: true,
            range: 0.5,                      // a number (0-1) that will set the range in which a new target can be
            dir: -1,                         // the direction in which the current degree will change
            inRange: false,                  // true if the current degree is in range of the target degree
            score: 0                         // player score
        };
        game.deg.target = newTarget(game);
        modes[game.mode].init(modeAPI, game, opt.modeSettings || {});
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        if(!game.pause && !game.gameOver){
            game.deg.current +=  game.deg.perSec * secs * game.dir;
        } 
        game.deg.current = utils.mod(game.deg.current, game.deg.total);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        if(game.inRange){
            game.missTrack.canMiss = true;
        }
        if(game.missTrack.canMiss && !game.inRange){
            // call onMiss for the current mode
            modes[game.mode].onMiss(modeAPI,game);
            game.missTrack.canMiss = false;
        }
        // call update method for the current mode
        modes[game.mode].update(modeAPI, game, secs);
    };
    // create click handler
    api.click = function (game, modeOptions) {
        if(!game.pause && !game.gameOver){
            game.clickTrack.total += 1;
            game.clickTrack.hits += game.inRange ? 1 : 0;
            if (game.inRange) {
                game.missTrack.canMiss = false;
                game.dir = game.dir === 1 ? -1 : 1;
                
            }
            // call on click for the current mode
            modes[game.mode].onClick(modeAPI, game, modeOptions);
        }
        game.pause = false;
    };
    // load a game mode file
    api.loadMode = function(gameMode){
        // props that should default to utils.noop
        ['init','update','onMiss','onClick', 'draw'].forEach(function(key){
            gameMode[key] = gameMode[key] || utils.noop;
        });
        gameMode.key = gameMode.key || 'nameMe-' + Object.keys(modes).length;
        gameMode.settings = gameMode.settings || [];
        gameMode.background = gameMode.background || '#4a4a4a';
        gameMode.createBackground = gameMode.createBackground || false;
        modes[gameMode.key] = gameMode;
    };
    // return public api
    return api;
}());
```

In this module I am making use of a utils library that contains many useful methods such as mathematical modulo. I will be getter to that in a later section in this post.

So now that I have a game module worked out I am going to want to have some additional code that is used to draw the state of one of these game state objects to the canvas. In additional I am also going to want to have some javaScript code that will provide a main app loop, and a state machine that will be needed when it comes to continuing to expand this.

## 2 - The game modes thus far

So now that I have a plug in system for game modes I can experiment with different kinds of game modes where I am switching up the rules and settings a little from one game mode to another. The basic idea of the game is simple enough, but I cant help but think that there is so much more that can be done to make the game more interesting. There is having game modes where the player does not have to worry about missing a target, and the smaller circle moves at a fixed speed. There is then ideas for other modes that they player will loose if they miss just a single target, and each target gained will make the smaller circle go faster, and maybe tweak other features to make the game even more intense. So I thought it would be a good idea to start at least a few game mode files to work out these different ideas when it comes to the core logic of the game.

### 2.1 - Free Play mode

The first mode that I put together is a way to just freely play the game without having to worry about missing a target, or clicking to soon. In this mode missing a taker by being to late, or clicking when the smaller circle is not over a target might still negatively impact the score, however it will not result in an automatic game over also. In fact in this mode the only way to loose is to quit once the player gets board.

```js
gameMod.loadMode({
    // each game mode should have a key
    key: 'freePlay',
    // gameMode state settings for modeSettings object
    settings:[
        {
            key: 'perSec',
            disp: 'speed',
            start: 35,
            range: [10, 100]
        }
    ],
    // what to do each time a new game object is created in gameMod.create
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.perSec = modeSettings.perSec || 10;
        game.win = true;
        game.score = 0;
        game.perHitScore = 0;
        // base bonus effect by speed setting
        game.baseBonus = 100 + Math.round(300  * ((modeSettings.perSec - 10) / (100 - 10)));
        console.log( game.baseBonus );
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits,
        total = game.clickTrack.total,
        hitPer = game.clickTrack.hits / total,
        missLoss = 1 - (1 / (game.missTrack.count + 1));
        hitPer = utils.isNaN(hitPer) ? 1 : hitPer;
        var bonus = Math.floor( game.baseBonus * hitPer * (1 - missLoss)) * (total < 100 ? total / 100: 1);
        game.score =  Math.floor(game.perHitScore + bonus);
    },
    onMiss: function(modeAPI,game){
        game.missTrack.count += 1;
    },
    onClick: function(modeAPI, game){
        if (game.inRange) {
           game.deg.target = modeAPI.newTarget(game);
           var hits = game.clickTrack.hits;
           var perHitScoreDelta = (1 - utils.getDimPer(hits, 0.125)) * 10;
           game.perHitScore += perHitScoreDelta;
           game.perHitScore = Number( game.perHitScore.toFixed(2) );
           game.perHitScore = game.perHitScore >= 100 ? 100: game.perHitScore;
        }
    },
    // not used by game.js, but used in draw.js
    background: 'gray',
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, Math.random());
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        draw.PTL(ctx, canvas, sm.game, 'black');
        draw.score(ctx, canvas, sm);
    }
});
```

### 2.2 - Sudden Death Mode

In sudden death mode the game will process to the game over state when the player misses a single target, or clicks to soon. The speed of the smaller circle will increase with each target clicked also, and the speed will continue until the player looses. The object then is to just keep playing until a single miss or early click event happens, and get as many targets in the process of doing so to get a high score.

```js
gameMod.loadMode({
    key: 'sudendeath',
    settings:[
        {
            key: 'perSecLower',
            disp: 'Start Speed',
            start: 30,
            range: [10, 40]
        },
        {
            key: 'perSecHigher',
            disp: 'End Speed',
            start: 80,
            range: [80, 100]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.current = 25;
        game.perSecLower = modeSettings.perSecLower || 20;
        game.perSecHigher = modeSettings.perSecHigher ||85;
        game.deg.perSec = game.perSecLower;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits;
        game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count = 1;
        game.gameOver = true;
    },
    onClick: function(modeAPI, game, modeSettings){
        if (game.inRange) {
            game.deg.target = modeAPI.getTargetRandom(game);
            game.level += 1;
            game.level = game.level > 100 ? 100 : game.level;
            game.deg.perSec = game.perSecLower + Math.round( (game.perSecHigher - game.perSecLower) * (game.level / 100));
        }else{
            game.gameOver = true;
        }
    },
    // Draw
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'black'],[1,'red']]);
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        draw.PTL(ctx, canvas, sm.game);
        draw.score(ctx, canvas, sm);
    }
});
```

### 2.3 - Classic Mode

The classic mode is called such because the aim in this mode is to reproduce the same game mechanics as the original pop the lock game. One of the main settings of interest is the level setting which can be set to a value between 1 and 100 which is the number of targets that need to be clicked to win the game. Just like sudden death mode the game will come to an end the vary moment that the player misses a single target, but the game will not continue until the game gets to hard to continue also. So in this mode it is possible to win the game, rather than being about how long the player can hold out for until they loose no matter what, or playing until they get board.

```js
gameMod.loadMode({
    key: 'classic',
    settings: [
        {
            key: 'level',
            disp: 'Level',
            start: 8,
            range: [1, 100]
        },
        {
            key: 'perSecLower',
            disp: 'Start Speed',
            start: 15,
            range: [10, 25]
        },
        {
            key: 'perSecHigher',
            disp: 'End Speed',
            start: 35,
            range: [30, 80]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.current = 25;
        game.tripUp.chance = 0.1;
        game.tripUp.degRange = [20, 30];
        game.perSecLower = modeSettings.perSecLower || 20;
        game.perSecHigher = modeSettings.perSecHigher ||70;
        game.deg.perSec = game.perSecLower;
        modeSettings.level = game.level = modeSettings.level || 1;
        game.targets = game.level;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits;
        game.score = hits;
        game.deg.perSec = game.perSecLower + Math.round( (game.perSecHigher - game.perSecLower) * (hits / game.level));
        game.deg.perSec = game.deg.perSec > game.perSecHigher ? game.perSecHigher : game.deg.perSec;
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count = 1;
        game.gameOver = true;
    },
    onClick: function(modeAPI, game, modeSettings){
        if (game.inRange) {
            game.deg.target = modeAPI.newTarget(game);
            game.targets -= 1;
            if(game.targets === 0){
                modeSettings.level += 1;
                modeSettings.level = modeSettings.level > 100 ? 100: modeSettings.level;
                game.gameOver = true;
                game.win = true;
            }
        }else{
            game.gameOver = true;
        }
    },
    // Draw
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'purple'],[1,'cyan']]);
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        draw.PTL(ctx, canvas, sm.game);
        draw.score(ctx, canvas, sm);
    }
});
```

### 2.4 - Endurance Mode

The endurance mode is like sudden death in that the game will keep getting harder with each target. However it is okay if the player misses a target or clicks to soon a few times. Such actions will not result in an automatic game over, however it will deduct health from a hit points bar of sorts.

```js
gameMod.loadMode({
    key: 'endurance',
    settings:[
        {
            key: 'perSecLower',
            disp: 'Start Speed',
            start: 15,
            range: [10, 40]
        },
        {
            key: 'perSecHigher',
            disp: 'End Speed',
            start: 85,
            range: [80, 100]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.hp.active = true;
        game.hp.current = game.hp.max * 0.5;
        game.hp.perSec = 0.8;
        game.deg.current = 25;
        game.perSecLower = modeSettings.perSecLower || 20;
        game.perSecHigher = modeSettings.perSecHigher ||85;
        game.deg.perSec = game.perSecLower;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game, secs){
        var hits = game.clickTrack.hits;
        game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;
        if(game.hp.current <= 0){
            game.gameOver = true;
        }else{
            game.hp.current += game.hp.perSec * secs;
            game.hp.current = game.hp.current >= game.hp.max ? game.hp.max : game.hp.current;
        }
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count += 1;
        game.hp.current -= 1;
    },
    onClick: function(modeAPI, game, modeSettings){
        if (game.inRange) {
            game.deg.target = modeAPI.getTargetRandom(game);
            game.level += 1;
            game.level = game.level > 100 ? 100 : game.level;
            game.deg.perSec = game.perSecLower + Math.round( (game.perSecHigher - game.perSecLower) * (game.level / 100));
        }else{
            game.hp.current -= 1;
        }
    },
    // Draw
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, 0.625, [[0,'black'],[1,'lime']]);
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        draw.PTL(ctx, canvas, sm.game);
        draw.score(ctx, canvas, sm);
    }
});
```

## 3 - The draw method

So now that I have the game state object worked out it is time to work out a draw method for it, as well as some additional draw methods for the project as a whole. In this example I am not doing anything fancy with layering, sprites, and so forth. So I just have a collection of draw methods for drawing things like a solid color background, the current version number, and the current state of things when it comes to the game state object of course. I took the time to break things down into a whole bunch of helper methods, and then have just a few public drawing methods that I will be using in my main.js file.

```js
var draw = (function(){
    var CIRCLE_RADIUS = 200;
    var text_base_center = function(ctx){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
    };
    var text_title_center = function(ctx){
        text_base_center(ctx);
        ctx.font='50px arial';
    };
    var text_big_center = function(ctx){
        text_base_center(ctx);
        ctx.font='40px arial';
    };
    var text_big_left = function(ctx){
        text_base_center(ctx);
        ctx.textAlign = 'left';
        ctx.font='40px arial';
    };
    var text_med_center = function(ctx){
        text_base_center(ctx);
        ctx.font='20px arial';
    };
    var text_small_center = function(ctx){
        text_base_center(ctx);
        ctx.font='15px arial';
    };
    var text_game_stats = function(ctx){
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.font='10px arial';
        ctx.textAlign = 'left';
    };
    // draw base circle
    var baseCircle = function(ctx, canvas, style){
        ctx.strokeStyle = style || 'white';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, CIRCLE_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw target range
    var targetRange = function(ctx, canvas, game){
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.arc(canvas.width / 2, canvas.height / 2, CIRCLE_RADIUS,
            utils.mod(game.deg.target - game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2,
            utils.mod(game.deg.target + game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2);
        ctx.stroke();
    };
    // draw current position
    var current_pos = function(ctx, canvas, game){
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.lineWidth = 6;
        var r = game.deg.current / game.deg.total * Math.PI * 2,
        x = Math.cos(r) * CIRCLE_RADIUS + canvas.width / 2,
        y = Math.sin(r) * CIRCLE_RADIUS + canvas.height / 2;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    };
    var hpBar = function(ctx, canvas, game){
        if(game.hp.active){
            ctx.fillStyle = 'black';
            ctx.fillRect(canvas.width / 2 - 50, 10, 100, 10);
            ctx.fillStyle = 'lime';
            var per = game.hp.current / game.hp.max;
            ctx.fillRect(canvas.width / 2 - 50, 10, 100 * per, 10);
        }
    };
    // public api
    var api = {};
    // create and return a gradient
    var default_stops = [
        [0, 'red'],
        [0.2, 'orange'],
        [0.4, 'yellow'],
        [0.6, 'blue'],
        [0.8, 'cyan'],
        [1, 'lime']
    ];
    api.createGradient = function(ctx, canvas, angelePer, stops){
        angelePer = angelePer === undefined ? 0.125 : angelePer;
        stops = stops || default_stops;
        var size = Math.min.apply(null, [canvas.width, canvas.height]),
        radius = size / 2,
        radian = Math.PI * 2 * angelePer,
        sx = canvas.width / 2 + Math.cos(radian) * radius,
        sy = canvas.height / 2 + Math.sin(radian) * radius,
        ex = canvas.width / 2 + Math.cos(radian + Math.PI) * radius,
        ey = canvas.height / 2 + Math.sin(radian + Math.PI) * radius,
        gradient = ctx.createLinearGradient(sx, sy, ex, ey);
        // Add color stops
        stops.forEach(function(st){
            gradient.addColorStop.apply(gradient, st);
        });
        return gradient;
    };
    // plain background method
    api.background = function(ctx, canvas, style){
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // background
    api.backgroundMode = function(ctx, canvas, sm){
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'black';
        var mode = gameMod.modes[sm.gameMode];
        if(mode){
            ctx.fillStyle = mode.background;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // Pop The Lock
    api.PTL = function (ctx, canvas, game, circleStyle) {
        baseCircle(ctx, canvas, circleStyle);
        targetRange(ctx, canvas, game);
        current_pos(ctx, canvas, game);
        hpBar(ctx, canvas, game);
    };
    // score
    var scoreModes = {
        classic: function(ctx, canvas, sm, game){
            text_big_center(ctx);
            // score
            ctx.fillText(game.targets, canvas.width / 2, canvas.height * 0.5);
        }
    };
    api.score = function(ctx, canvas, sm){
        var game = sm.game;
        if(sm.gameMode in scoreModes){
            scoreModes[sm.gameMode](ctx, canvas, sm, game);
        }else{
            text_big_center(ctx);
            // score
            ctx.fillText(game.score, canvas.width / 2, canvas.height * 0.25);
            // late and miss counts
            text_med_center(ctx);
            var miss = game.clickTrack.total - game.clickTrack.hits;
            ctx.fillText('late: ' + game.missTrack.count + ', miss: ' + miss, canvas.width / 2, canvas.height * 0.35);
            // high score for current mode
            text_small_center(ctx);
            var hs = sm.highScores[sm.game.mode];
            if(hs){
                ctx.fillText('High Score: ' + hs, canvas.width / 2, canvas.height * 0.65);
            }
        }
    };
    // draw title text
    api.text_title = function(ctx, canvas, obj){
        text_title_center(ctx);
        ctx.fillText('Pop The Lock', obj.x + obj.w / 2, obj.y + obj.h / 2 );
    };
    // draw game over text
    api.text_gameover = function(ctx, canvas, sm){
        var game = sm.game,
        sx = canvas.width * 0.25 - 120,
        sy = canvas.height / 2 - 25;
        text_big_left(ctx);
        ctx.fillText(game.win ? 'You Won!' : 'Game Over', sx, canvas.height * 0.25);
        text_game_stats(ctx);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, sx, sy + 10);
        ctx.fillText('miss count: ' + game.missTrack.count, sx, sy + 20);
        ctx.fillText('score: ' + game.score, sx, sy + 40);
    };
    // version
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.font='15px arial';
        ctx.textAlign = 'left';
        ctx.fillText('v' + sm.ver, 5, canvas.height - 15);
    };
    // draw object pool
    var drawPool = function (ctx, pool, globalDraw) {
        var i = pool.objects.length,
        obj;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                ctx.save();
                if(obj.data.draw){
                    obj.data.draw(ctx, obj, i);
                }else{
                    globalDraw(ctx, obj, i);
                }
                ctx.restore();
            }
        }
    };
    api.pool = function (ctx, pool) {
        drawPool(ctx, pool, function(ctx, obj, i){
                ctx.fillStyle = obj.data.fill || 'white';
                ctx.globalAlpha = obj.data.alpha || 1;
                ctx.translate(obj.x, obj.y);
                ctx.beginPath();
                ctx.rect(0, 0, obj.w, obj.h);
                ctx.fill();
                ctx.stroke();
                if(obj.data.disp){
                   ctx.fillStyle = 'black';
                   ctx.textBaseline = 'middle';
                   ctx.font = '20px arial';
                   ctx.textAlign = 'center';
                   ctx.fillText(obj.data.disp, obj.w / 2, obj.h / 2);
                }
        });
    };
    // info
    api.debugInfo = function(ctx, canvas, game){
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.globalAlpha = 0.35;
        ctx.font = '20px arial';
        ctx.fillText('deg.current ' + game.deg.current.toFixed(2), 10, 20);
        ctx.fillText('deg.target ' + game.deg.target, 10, 40);
        ctx.fillText('deg.distance ' + game.deg.distance.toFixed(2), 10, 60);
        ctx.fillText('deg.perSec ' + game.deg.perSec.toFixed(2), 10, 80);
        ctx.fillText('trip up count: ' + game.tripUp.count, 10, 100);
        ctx.fillText('inrange ' + game.inRange, 10, 120);
        ctx.fillText('miss count: ' + game.missTrack.count, 10, 140);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, 10, 160);
        ctx.fillText('paused: ' + game.pause, 10, 180);
        ctx.fillText('mode: ' + game.mode, 10, 200);
        ctx.fillText('level: ' + game.level, 10, 220);
    };
    // return public API
    return api;
}());
```

If I put more time into this project this will end up getting broken down into many methods and will be pulled into a file of its one which is often the case with many of these canvas examples.

## 4 - The utils lib

Like all my other canvas examples these days I have a utils library where I park functions that I will likely use in more than one file in a project, and also might copy and paste over to other utils libraries in other canvas examples. For pop the lock thus far as of version 0.0.0 I am just using my create canvas method that is more or less standard for canvas examples now.

```js
var utils = {};
// no operation ref
utils.noop = function(){};
// is NaN method
utils.isNaN = function (a) {
    return String(a) === 'NaN' && typeof a != 'string';
};
// get diminishing returns percent value for the given number and base
utils.getDimPer = function(n, base){
    base = base === undefined ? 2 : base;
    return Math.log(base - (base - 1) * 1 / (n + 1), base) / Math.log(base, base);
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
// clamp a 0 - 1 value
utils.clampPer = function (per) {
    per = per > 1 ? 1 : per;
    per = per < 0 ? 0 : per;
    return per;
};
// get a random number between the given range
utils.randomRange = function(a, b){
    var x = a, y = b;
    if(typeof a === 'object'){
        x = a[0];
        y = a[1];
    }
    return x + (y - x) * Math.random();
};
// normalizeHalf
utils.normalizeHalf = function(degree, scale) {
  var halfScale = scale / 2;
  return utils.mod(degree + halfScale, scale) - halfScale;
};
// shortest distance
utils.shortestDistance = function(a, b, scale) {
  var halfScale = scale / 2,
  diff = utils.normalizeHalf(a - b, scale);
  if (diff > halfScale){
    diff = diff - scale;
  }
  return Math.abs(diff);
};
// create a canvas
utils.createCanvas = function(opt){
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
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// get canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
// save a state
utils.save = function(appName, slotID, state){
    var key = appName + '-' + slotID;
    var str = JSON.stringify(state);
    localStorage.setItem(key, str);
};
// load a state
utils.load = function(appName, slotID){
    var key = appName + '-' + slotID;
    var str = localStorage.getItem(key);
    if(str){
        try{
            return JSON.parse(str);
        }catch(e){
            return false;
        }
    }
    return false;
};
```

## 5 - An Object pool module that I am using for buttons in the state machine

I wanted to add an object pool module, however for this canvas example the only reason why is more so for the sake of having animated buttons, and maybe a few additional effects. This module is based off of what i worked out in my other canvas example on objects pools, in fact I copied that source code and just made a few changes here and there that I might add in future versions of that canvas example.

```js
var poolMod = (function () {
    // Public API
    var api = {};
    // get next inactive object in the given pool
    var getInactive = function (pool) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        var i = 0,
        pool = {
            maxSecs: opt.maxSecs || 0.125,
            objects: [],
            data: opt.data || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {}
        };
        while (i < opt.count) {
            pool.objects.push({
                active: false,
                i: i,
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                w: opt.w === undefined ? 32 : opt.w,
                h: opt.h === undefined ? 32 : opt.h,
                heading: opt.heading === undefined ? 0 : opt.heading,
                pps: opt.pps === undefined ? 32 : opt.pps,
                lifespan: opt.lifespan || 3,
                data: {}
            });
            i += 1;
        }
        return pool;
    };
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || {};
        opt = opt || {};
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        }
        return false;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        secs = secs >= pool.maxSecs ? pool.maxSecs : secs;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                obj.lifespan -= secs;
                obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                if (obj.lifespan === 0) {
                    obj.active = false;
                    pool.purge.call(pool, obj, pool, state);
                }
            }
        }
    };
    // set all to inActive or active state
    api.setActiveStateForAll = function (pool, bool) {
        bool = bool === undefined ? false : bool;
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            obj.active = bool;
        }
    };
    // get an active object at the given position, or return false if nothing is there
    api.getObjectAt = function (pool, x, y) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                if (api.boundingBox(obj, {
                        x: x,
                        y: y,
                        w: 1,
                        h: 1
                    })) {
                    return obj;
                }
            }
        }
        return false;
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // move my frame percent object
    /*
{
    sx: -100,
    sy: 0,
    dist: 100,
    heading: 0,
    frame: 0,
    frameMax: 50,
    rev: false
    }
     */
    api.moveByFramePerObj = function (obj, fp) {
        var per = fp.frame / fp.frameMax;
        per = per > 1 ? 1 : per;
        per = per < 0 ? 0 : per;
        per = fp.rev ? 1 - per : per;
        obj.x = fp.sx + Math.cos(fp.heading) * fp.dist * per;
        obj.y = fp.sy + Math.sin(fp.heading) * fp.dist * per;
    };
    // check bounds for the given display object and canvas and return true if the object
    // is out of bounds and false if it is not.
    api.checkBounds = function (obj, canvas) {
        if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
            return false;
        }
        return true;
    };
    // bounding box
    api.boundingBox = function (a, b) {
        return utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
    };
 
    // return public method
    return api;
}
    ());
```

## 6 - The canvas, main app loop, and the html

So now to make use of everything I worked out in a main javaScript file that will proved the main app loop and the state machine. In this main.js file I create a canvas with the create canvas utils method, and get the drawing context to it.

In the main.js file I have started a basic state machine of sorts, as of version 1.0.1 I have a title state, as well as states for game mode settings, the game itself, and a game over state. As I continue working on this project I might get around to starting to break the main.js file down into the main.js file and a much of states define in stand alone javaScript files in a state folder.

In the main app loop I am calling the game module update method of my pop the lock game module, and passing the game object that I created with the game module create method. I am also using the draw method I have worked out to draw the current state of the game state object in the canvas element. I am also of course using request animation frame as always to create the app loop for the canvas example as with just about any other.

```js
(function () {
 
    // SETUP CANVAS
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
            width: 640,
            height: 480
        }),
    canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;
 
    // BUTTON OBJECT POOL
    var createButtonPool = function(count){
        return poolMod.create({
            count: count || 20,
            maxSecs: 0.25,
            spawn: function (obj, pool, sm, opt) {
                // just ref opt for the data object
                obj.data = opt;
                obj.x = opt.hx;
                obj.y = opt.hy;
                obj.w = opt.w || 128;
                obj.h = opt.h || 32;
            },
            // update the button
            update: function (obj, pool, sm, secs) {
                var fp = {
                    sx: obj.data.sx || 0,
                    sy: obj.data.sy || 0,
                    dist: obj.data.dist || 0,
                    heading: obj.data.heading || 0,
                    frame: Math.round(sm.trans.secs / sm.trans.secsTotal * 50),
                    frameMax: 50,
                    rev: !sm.trans.inState // use trans instate bool to ser rev
                };
                poolMod.moveByFramePerObj(obj, fp);
                obj.lifespan = Infinity; // keep setting lifespan to 1
            }
        });
    };
    // a spawn button helper
    var spawnButton = function(sm, bx, actionString, dispText, angle, poolKey){
        poolKey = poolKey === undefined ? 'buttons' : poolKey;
        angle = angle === undefined ? Math.PI * 0.5 : angle;
        var sx = bx.x + Math.cos(angle) * sm.canvas.width,
        sy = bx.y + Math.sin(angle) * sm.canvas.width;
        return poolMod.spawn(sm[poolKey], sm, {
            action: actionString,
            disp: dispText,
            sx: sx, //sm.canvas.width * 0.5 * -1,
            sy: sy, //sm.canvas.height * 0.4,
            w: bx.w || 256,
            h: bx.h || 64,
            dist: utils.distance(bx.x, bx.y, sx, sy), //sm.canvas.width - 128,
            heading: utils.mod(angle + Math.PI, Math.PI * 2)
        });
    };
    // get a button by id
    var getButtonByAction = function(buttonPool, action){
        var result = buttonPool.objects.filter(function(button){
            return button.active && button.data.action === action;
        });
        if(result.length >= 1){
            return result[0];
        }
        return false;
    };
 
    // STATE MACHINE
    var sm = {
        ver: '1.0.1',
        appName: 'canvas-example-pop-the-lock',
        debugMode: false,
        canvas: canvas,
        ctx: ctx,
        game: {},
        highScores: {},
        lt: new Date(),
        currentState: 'title',
        gameModeIndex: 0,
        gameMode: '',
        modeSettingsCollection: {},
        modeSettings: {}, // current modeSettingsObject in modeSettingsCollection
        trans: {
            active: true,
            inState: true,
            secs: 0,
            secsTotal: 0.75,
            onDone: utils.noop
        },
        states: {},
        buttons: createButtonPool(20),
        dispObjects: createButtonPool(2),
        background: 'blue'
    };
    // change the current state and set up a 'in' transition for the new state
    var changeState = function (sm, stateKey) {
        sm.currentState = stateKey;
        sm.trans.active = true;
        sm.trans.inState = true;
        sm.trans.secs = 0;
        // reset pools
        poolMod.setActiveStateForAll(sm.buttons, false);
        poolMod.setActiveStateForAll(sm.dispObjects, false);
        // call init method for the new state
        sm.states[sm.currentState].init(sm);
    };
    // start a 'out' transition to a state change
    var startStateChangeTrans = function(sm, stateKey){
        sm.trans.active = true;
        sm.trans.inState = false;
        sm.trans.secs = 0;
        sm.trans.onDone = function(sm){
            changeState(sm, stateKey);
            sm.trans.onDone = function(){};
            sm.trans.onDone = utils.noop;
        };
    };
    // update state by calling trans or update method
    var updateState = function (sm, secs) {
        if (sm.trans.active) {
            if (sm.trans.secs < sm.trans.secsTotal) {
                sm.trans.secs += secs;
                sm.trans.secs = sm.trans.secs > sm.trans.secsTotal ? sm.trans.secsTotal : sm.trans.secs;
                if (sm.trans.secs === sm.trans.secsTotal) {
                    sm.trans.active = false;
                    sm.trans.onDone(sm);
                }
            }
            sm.states[sm.currentState].trans(sm, secs);
        } else {
            sm.states[sm.currentState].update(sm, secs);
        }
    };
 
    // TITLE STATE
    sm.states.title = {
        init: function (sm) {
            // Buttons
            var x = sm.canvas.width / 2 - 128,
            y = sm.canvas.height / 2;
            spawnButton(sm, {x: x, y: y - 64}, 'start_state_gameMode', 'Play');
            spawnButton(sm, {x: x, y: y + 32}, 'goto_devsite_canvas_examples', 'More Games', Math.PI);
 
            // title display Object
            poolMod.spawn(sm.dispObjects, sm, {
                action: 'dispobj_title',
                disp: 'Pop The Lock',
                sx: sm.canvas.width * 1.7 * 1,
                sy: 8,
                w: 512,
                h: 128,
                dist: sm.canvas.width * 1.6,
                heading: Math.PI,
                draw: function(ctx, obj){
                    draw.text_title(ctx, sm.canvas, obj);
                }
            });
            // setup a background
            sm.background = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'#cc0000'],[0.25,'purple'],[1,'cyan']]);
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.pool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_state_gameMode'){
                    startStateChangeTrans(sm, 'gameMode');
                }
                if(button.data.action === 'goto_devsite_canvas_examples'){
                    console.log('to dev site');
                    document.location.href = 'https://dustinpfister.github.io/2020/03/23/canvas-example/';
                }
            }
        }
    };
 
    // GAME MODE STATE
    var spawnSettingsButton = function(sm, setting, bx, actionStringPart, dispText, angle, poolKey){
        var actionString = 'set_modesetting_' + actionStringPart + '_' + setting.key;
        var button = spawnButton(sm, bx, actionString, dispText, angle, poolKey);
        button.data.setting = setting;
        return button;
    };
    // set mode prop helper
    var setModeProp = function(sm, parts, button, dir){
        var modeProp = sm.modeSettings[parts[3]],
        settingObj = button.data.setting,
        range = settingObj.range;
        modeProp += 1 * dir;
        sm.modeSettings[parts[3]] = modeProp > range[1] ? range[0]: modeProp;
        sm.modeSettings[parts[3]] = modeProp < range[0] ? range[1]: modeProp;
        var dispButton = getButtonByAction(sm.buttons, 'set_modesetting_current_' + settingObj.key);
        dispButton.data.disp = settingObj.disp + ' ' + sm.modeSettings[parts[3]];
    };
    sm.states.gameMode = {
        init: function (sm) {
            // default to whatever key sm.gameModeIndex is for gameMode
            sm.gameMode = Object.keys(gameMod.modes)[sm.gameModeIndex];
            var mode = gameMod.modes[sm.gameMode];
            if(mode.createBackground){
                mode.background = mode.createBackground(sm, mode);
            }
            // ref mode settings object in sm.modeSettingsCollection
            sm.modeSettings = sm.modeSettingsCollection[sm.gameMode];
            // create settings buttons
            mode.settings.forEach(function(setting, i){
                // down button
                var w = 64,
                h = 64,
                x = 8,
                y = 64 + 64 * i;
                // + / -
                spawnSettingsButton(sm, setting, {x: x, y: y, w: w, h : h}, 'down', '-');
                spawnSettingsButton(sm, setting, {x: x + w * 5, y: y, w: w, h : h}, 'up', '+');
                // setting disp
                w = 64 * 4;
                spawnSettingsButton(sm, setting, 
                  {x: x + 64 * 1, y: y, w: w, h : h}, 
                  'current', 
                   setting.disp + ' ' + sm.modeSettings[setting.key]);
            });
            // next mode button
            var w = 64,
            h = 64;
            spawnButton(sm, {x: canvas.width - 80, y: 200, w: w, h: h}, 'set_mode_next', 'Next');
            // start game button
            var w = 250,
            h = 64;
            spawnButton(sm, {x: canvas.width - 275, y: canvas.height - 80, w: w, h: h}, 'start_game', 'Start');
            // back to title
            w = 125;
            spawnButton(sm, {x: canvas.width - 150, y: 32, w: w, h: h}, 'start_title', 'Title');
            // current mode display Object
            var disp = spawnButton(sm, {x: 8, y: 8, w: 200, h: 32}, 'dispobj_currentMode', sm.gameMode, 0, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.fillStyle = 'white';
                ctx.textBaseline = 'top';
                ctx.textAlign = 'left';
                ctx.font='50px arial';
                ctx.fillText(obj.data.disp, obj.x, obj.y);
            };
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_game'){
                    startStateChangeTrans(sm, 'game');
                }
                if(button.data.action === 'start_title'){
                    startStateChangeTrans(sm, 'title');
                }
                if(button.data.action === 'set_mode_next'){
                    sm.gameModeIndex += 1;
                    sm.gameModeIndex = utils.mod(sm.gameModeIndex, Object.keys(gameMod.modes).length);
                    startStateChangeTrans(sm, 'gameMode');
                }
                var parts = button.data.action.split('_');
                if(parts[0] === 'set'){
                    if(parts[2] === 'up'){
                        setModeProp(sm, parts, button, 1);
                    }
                    if(parts[2] === 'down'){
                        setModeProp(sm, parts, button, -1);
                    }
                }
            }
        }
    };
 
    // GAME STATE
    sm.states.game = {
        init: function (sm) {
            // Quit Button
            spawnButton(sm, {x: canvas.width - 72, y: 8, w: 64, h: 64}, 'set_state_gameover', 'Quit', Math.PI);
            // PTL area display Object
            var disp = spawnButton(sm, {x: 0, y: 0, w: canvas.width, h: canvas.height}, 
                'dispobj_ptl', sm.gameMode, Math.PI * 1.5, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.save();
                ctx.translate(obj.x, obj.y);
                gameMod.modes[sm.gameMode].draw(ctx, canvas, sm);
                ctx.restore();
            };
            // create a new game object
            sm.game = gameMod.create({
               mode: sm.gameMode,
               modeSettings: sm.modeSettings
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
            if(sm.game.gameOver){
                startStateChangeTrans(sm, 'gameOver');
            }
        },
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
            if(sm.debugMode){
                draw.debugInfo(ctx, canvas, sm.game);
            }
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_gameover'){
                    startStateChangeTrans(sm, 'gameOver');
                }
            } else {
                gameMod.click(sm.game, sm.modeSettings);
            }
        }
    };
 
    // GAME OVER STATE
    sm.states.gameOver = {
        init: function (sm) {
            // option buttons
            var dispText = ['Try Again', 'Settings', 'Title'];
            ['game', 'gameMode', 'title'].forEach(function(stateKey, i){
            var bx = {x: canvas.width - 176, y: canvas.height * 0.25 + 70 * i, w: 168, h: 64};
                spawnButton(sm, bx, 'set_state_' + stateKey, dispText[i], 0);
            });
            // Game Over text area display Object
            var disp = spawnButton(sm, {x: 0, y: 0, w: canvas.width, h: canvas.height}, 
                'dispobj_gameOver', sm.gameMode, Math.PI * 0.5, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.save();
                ctx.translate(obj.x, obj.y);
                draw.text_gameover(ctx, canvas, sm);
                ctx.restore();
            };
            // update any save that might be there
            var highScore = sm.highScores[sm.game.mode];
            if(!highScore || highScore < sm.game.score){
                sm.highScores[sm.game.mode] = sm.game.score;
                utils.save(sm.appName, 0, sm.highScores);
            }
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {
        },
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.background(ctx, canvas, 'rgba(0,0,0,0.8)');
            //draw.text_gameover(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                ['title', 'gameMode','game'].forEach(function(stateKey, i){
                    if(button.data.action === 'set_state_' + stateKey){
                        startStateChangeTrans(sm, stateKey);
                    }
                });
            }
        }
    };
 
    // LOOP
    // high scores
    var highScores = utils.load(sm.appName, '0');
    if(highScores){
        sm.highScores = highScores;
    }
    // mode settings collection object
    sm.modeSettingsCollection = {};
    Object.keys(gameMod.modes).forEach(function(modeKey){
        var mode = gameMod.modes[modeKey],
        settings = {};
        mode.settings.forEach(function(settingObj){
            settings[settingObj.key] = settingObj.start;
        });
        sm.modeSettingsCollection[modeKey] = settings;
    });
    // start state
    changeState(sm, 'title');
    // the loop
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        updateState(sm, secs);
 
        sm.states[sm.currentState].draw(sm, ctx, canvas);
        draw.ver(ctx, canvas, sm);
 
        sm.lt = now;
    };
    loop();
 
    // EVENTS
    canvas.addEventListener('mousedown', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
    canvas.addEventListener('touchstart', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
 
}
    ());
```

Now that I have covered everything that composes the main.js file I just need a little HTML to get this up and running. In my html I just have a div element that I am using for a container element to which the canvas element gets injected in when my main.js file runs, and then of course I have a script tag that links to my main.js file.

```html
<html>
    <head>
        <title>Pop The Lock canvas example </title>
        <style>
body{
  margin:0px;
  padding:0px;
  background:gray;
}
.canvas_example{
    display: block;
    width: auto;
    height: 100%;
    margin: 0 auto;
}
        </style>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/pool.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./modes/freeplay.js"></script>
        <script src="./modes/sudendeath.js"></script>
        <script src="./modes/endurance.js"></script>
        <script src="./modes/classic.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When the game is up and running I now have a title screen with animated buttons one of which will take me to the game mode settings state. When in the game mode settings state I can choose which game mode I want to play, the total number of games modes and settings for each will depend on the number of game modes I have loaded and the settings for each. Once I have a game mode that I want to play selected, and the settings for it just the way I want them, I can the play that game mode. 

Once I am playing the current game mode I can press the quit button of the game mode, or get a game over for one reason or another at which point i then progress to the game over state. In he game over state I have three options, one to play again with the current game mode and settings, one to go back to settings, and another to go back to the title screen.

## 7 - Conclusion

This canvas example started out as a a quick, and fun little project that I put together in a flash, but is all ready starting to feel like a finished game. However there is still a great deal of room for improvement with it also, and I have yet to find a way to turn this kind of project into something more distinct from what I am cloning so that it is not just a knock off. To some extent I think I have done that all ready with the introduction of additional game modes, while still preserving the original game with the classic mode.

I often like to try to keep the projects in these canvas examples posts fairly simple and basic though so that I do not have to write an extremely lengthly amount of written content outlining the example. However this one is starting to get a little involved and I also have a lot more ideas that I keep writing down on my todo list for this one. The original game that I cloned off of was all ready a little addictive, but I found myself loosing interest fairly quick still. I thought to myself, hey this game is pretty cool actually, and it is so simple too, but it would be even better if it had some additional features.

I will be continuing to work on this one at least a little while longer, because I think that it could use a few more game modes. In addition I think some of the game modes still have some ruff edges when it comes to the logic, and some of them could use some more features actually which is what I have in mind for the endurance mode. However what I really want to do is see if I can come up with new modes, and additional features to tweak these modes in order to come up with something that I think will be pretty cool. 

I think I should have some additional states, and even some basic features are still missing. I also have ideas of adding things like an experience point system and making game modes and settings features that must be unlocked. As I continue to work on this I hope to also work out a half way decent system when it comes to having a state machine, and user interface features to move from one state to another.

