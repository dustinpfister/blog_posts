---
title: Basic javaScript game example called just simply Egg Eater
date: 2021-04-15 16:13:00
tags: [js]
layout: post
categories: js
id: 846
updated: 2021-04-16 16:12:01
version: 1.25
---

For today I want to go in a new direction with these [javaScript example](/2021/04/02/js-javascript-example/) posts by starting the first of what might be a bunch of basic games using javaScript and canvas elements. This game is a simple idea where there are a bunch of display objects that spawn at the upper right corner of the canvas, and move to an object that represents a guy at the lower left corner of the canvas that likes to eat a whole lot of eggs. The good news is that most of these objects are eggs, the bad news is that now and then one of them is a bomb. When the player clicks the canvas and holds down onto the canvas the guy will start eating whatever it is that is hitting him. For each egg the player gains score, however if even one bomb is eaten the game is over.

The idea is simple enough and it should prove to be the kind of game to which I can get the basic idea working in less than a day. There are a lot of little things to cover when it comes to this though, and as silly as the idea might seem a lof of the ideas might carry over well into other projects. For example there is moving one display object to another over time, that alone is a topic that will come up over and over again in all kinds of other types of games.

<!-- more -->

## 1 - The game module

Here I have the main game module that I can use to create the main game state object of the game, as well as update such an object. Speaking of which the first public method returned by the module is a create method that will be used in my main javaScrit file to create the main game object. This method takes a single object as an argument that is a way to set a whole bunch of properties for the state of a new game. So far the main options of interest have to do with setting the rate, and count of objects that will be spawned at the stat location. In this create method I am also creating a display object for the guy that eats eggs, and the pool of objects that will be eggs as well as the occasional bomb. I am doing this with the simple display object module that I made for this example, which I will be getting to in a later section in this post.

I then have two helper methods for the main public update method, and then the update method itself. The two helper methods of the update method have to do with spawning new objects, and updating objects that are all ready active.

```js
(function(api){
 
    // create main game state
    api.create = function(opt){
       opt = opt || {};
       opt.canvas = opt.canvas || {width: 320, height: 240};
       var game = {
          canvas: opt.canvas,
          down: false,
          gameOver: false,
          gameOverSecs: 0,
          score: 0,
          spawn: {  // object spawn settings
              rate: opt.spawnRate || 1,
              objectsPerSpawn: opt.objectsPerSpawn || 5,
              bombChance: opt.bombChance === undefined ? 0.05 : opt.bombChance,
              secs: 0
          },
          guy : dispMod.createDisp({
              x: 32,
              w: 96,
              h: 96,
              fill: 'blue',
              y: canvas.height - 96 - 32
          }),
          pool: dispMod.createPool({
              count: 100,
              dispOptions: {}
          })
       };
       return game;
    };
 
    // update the pool
    var updatePool = function(game, secs){
        game.pool.disp.forEach(function(disp){
            // ajust heading
            var a =  anglesMod.getAngleToPoint(game.guy, disp),
            dir = anglesMod.shortestAngleDirection(disp.heading, a),
            delta = Math.PI / 180 * disp.degreesPS * secs;
            // apply delta to disp.heading
            disp.heading -= delta * dir;
            // move display object
            dispMod.moveDispByPPS(disp, secs);
            // check if disp object has hit guy
            if(utils.boundingBox(game.guy, disp) && disp.active){
                disp.x = 0;
                disp.y = 0;
                if(game.down){
                    if(disp.data.type === 'egg'){
                        game.score += 1;
                    }
                    if(disp.data.type === 'bomb'){
                        game.gameOver = true;
                    }
                }
                disp.active = false;
            }
            // out of bounds?
            if(disp.y >= canvas.height + disp.h){
                disp.active = false;
            }
            if(disp.x < 0 - disp.w){
                disp.active = false;
            }
        });
    };
 
    // spawn objects helper
    var spawn = function(game, secs){
        var spawn = game.spawn;
        spawn.secs += secs;
        if(spawn.secs >= spawn.rate){
            var i = spawn.objectsPerSpawn;
            while(i--){
                var disp = dispMod.getFreeDisp(game.pool),
                type = 'egg',
                roll = Math.random();
                if(roll < spawn.bombChance){
                    type = 'bomb';
                }
                if(disp){
                    // core disp values
                    disp.active = true;
                    disp.x = game.canvas.width - 64;
                    disp.y = 96;
                    disp.pps = 128 + 128 * Math.random();
                    disp.degreesPS = 60 + (90 - 60) * Math.random();
                    disp.heading = Math.PI * 1.5 - Math.PI * 1.25 * Math.random();
                    disp.fill = 'rgba(255,255,255,0.5)';
                    // game data
                    disp.data.type = type;
                    if(type === 'bomb'){
                        disp.fill = 'black';
                    }
                }
            }
            spawn.secs = utils.mod(spawn.secs, spawn.rate);
        }
    };
 
    // draw display object
    api.update = function(game, secs){
 
        if(!game.gameOver){
            // spawn objects
            spawn(game, secs);
 
            // update pool of objects
            updatePool(game, secs);
        }else{
            game.gameOverSecs += secs;
        }
 
    };
 
}(this['gameMod'] = {}));
```

## 2 - The utility module

I often have a generic utility module for examples such as this that is a kind of first and foremost dumping ground for methods that I do not yet know where else to park them. For this example I have a mathematical modulo method that I am using in my angles module that I will be getting to shortly. I also of course am going to want to have bounding box collision detection, which I am making use in the game module above to check if a display object has hit the guy or not. I then also have a method that will help me to quickly create a canvas element that is set up just the way that I like it.

```js
var utils = {};
 
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
 
utils.boundingBox = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
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
```

## 3 - The angles module

For this example I am going to want to have a module that will help me work with problems that have to do with angles. I have a method that will help me normalize an angle to a given scale, as well as methods that will help me get the angle from an object to the guy object. I also have a get shortest direction method that will help me find out which way to turn to rotate the heading of an object the right way, rather than just having it set to the angle to go to move to the location of the guy object.

```js
(function(anglesMod){
 
    anglesMod.PI2 = Math.PI * 2;
 
    anglesMod.normalizeHalf = function (n, scale) {
        var c = scale || anglesMod.PI2,
        h = c / 2;
        return utils.mod(n + h, c) - h;
    };
 
    // get the angle from one point to another
    anglesMod.getAngleToPoint = function (pt1, pt2, scale) {
        return anglesMod.normalizeHalf(Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x), scale || anglesMod.PI2);
    };
 
    // get -1, 1, or 0 depending on the the state of two angles
    anglesMod.shortestAngleDirection = function (a1, a2, scale) {
        var z = a1 - a2,
        x = anglesMod.normalizeHalf(z, scale || anglesMod.PI2);
        if (x < 0) {
            return -1; // Left
        }
        if (x > 0) {
            return 1; // Right
        }
        // if a1 === a2 or any other case
        return 0;
    };
 
}(this['anglesMod'] = {}));
```

## 4 - The display object module for single objects and pools of such objects

I made a new object pool library for this example, rather than just making use of one of the modules that I have made before hand. Some of the object pool modules that I have made are a little to complex, and for this example I just want to throw something together that is a little more easy to follow.

```js
(function(api){
 
    // create a single display object
    api.createDisp = function(opt){
        opt = opt || {};
        var obj = {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w || 32,
            h: opt.h || 32,
            heading : opt.heading === undefined ? Math.PI * 0.5 : opt.heading,
            degreesPS: opt.degreesPS === undefined ? 90 : opt.degreesPS,
            pps: opt.pps || 32
        };
        obj.hw = obj.w / 2;
        obj.hh = obj.h / 2;
        obj.cx = obj.x + obj.hw;
        obj.cy = obj.y + obj.hh;
        obj.fill = opt.fill || 'gray';
        obj.active = true;
        obj.data = opt.data || {};
        return obj;
    };
 
    // create a pool of display obejcts
    api.createPool = function(opt){
         opt = opt || {};
         var pool = {
             count: opt.count || 10,
             disp: []
         };
         var i = 0;
         while(i < pool.count){
             var disp = api.createDisp(opt.dispOptions || {});
             disp.active = false;
             pool.disp.push(disp);
             i += 1;
         };
         return pool;
    };
 
    // get a free disp object from a pool or return false if all are active
    api.getFreeDisp = function(pool){
        var i = 0, disp;
        while(i < pool.count){
            disp = pool.disp[i];
            if(!disp.active){
                return disp;
            }
            i += 1;
        }
        return false;
    };
 
    // move a display object by heading and PPS
    api.moveDispByPPS = function(disp, secs){
        disp.x += Math.cos(disp.heading) * disp.pps * secs;
        disp.y += Math.sin(disp.heading) * disp.pps * secs;
        disp.cx = disp.x + disp.hw;
        disp.cy = disp.y + disp.hh;
    };
 
}(this['dispMod'] = {}));
```

## 5 - The draw module

To display what is going on I am going to want to make use of a canvas element, so I have a module where I will be packing my methods that I will be using to draw to the canvas. As with just about any other module like this I have a method that will just draw a background for the canvas, and then a number of methods that help to display the current situation with the game object. I have a method that will draw a single display object, as well as another one that will draw the full pool of display objects. In addition I have a method that will draw the current state of some info, such as the score.

```js
(function(api){
 
    // draw background
    api.back = function(ctx, canvas){
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
 
    // draw display object
    api.disp = function(ctx, canvas, disp){
        ctx.fillStyle = disp.fill || 'white';
        ctx.fillRect(disp.x, disp.y, disp.w, disp.h);
    };
 
    // draw object pool
    api.pool = function(ctx, canvas, pool){
        pool.disp.forEach(function(disp){
            if(disp.active){
                api.disp(ctx, canvas, disp);
            }
        });
    };
 
    // info
    api.info = function(ctx, canvas, game){
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black';
        ctx.fillText('score: ' + game.score, 10, 10);
    };  
 
}(this['draw'] = {}));
```

## 6 - Main.js

Now that I have a game module as well as all the other modules that will help to support it I just need a little more javaScript code to pull everything together. Here in the main javaScript file I use the create canvas utility method to create the main canvas element that i will be drawing to. I then create a new game object, and some additional variables that I will be using with a simple application loop. Inside this main app loop I am updating the main game object, and drawing the current state of the main game object to the canvas with the draw module methods.

In full blown projects I might have a state machine, and a whole bunch more modules, but for this series of posts I do not want to go to nuts with things. I just wanted to create a simple prototype of something just to get a feel for what it is like to play this very simple game, and maybe go a little farther at some point with some additional features, or set again maybe not.

```js

var canvasObj = utils.createCanvas({
   width: 640,
   height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
var game = gameMod.create({canvas:canvas}),
lt = new Date(),
rate = 30;
 
var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / rate){
        lt = now;
        gameMod.update(game, secs);
        draw.back(ctx, canvas);
        draw.disp(ctx, canvas, game.guy);
        draw.pool(ctx, canvas, game.pool);
        draw.info(ctx, canvas, game);
    }
};
loop();
 
var pointerDown = function(){
    game.down = true;
    if(game.gameOver && game.gameOverSecs >= 3){
        game = gameMod.create({canvas:canvas});
    }
};
var pointerUp = function(){
    game.down = false;
};
 
canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mouseup', pointerUp);
canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('touchend', pointerUp);
```

Now I just need a little html to provide a container element, and to link to all the scripts that I worked out here.

```html
<html>
    <head>
        <title>javaScript example</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/angles.js"></script>
        <script src="./lib/disp.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="./main.js"></script>
    </body>
</html>
```

When this example is up and running the prototype works as expected. Display objects spawn and move to the guy object, when I click and hold the canvas element I rack up score eating the egg types objects, but once a bomb hits the guy while I am clicking and holding the canvas that will result in a game over.

## 7 - Conclusion

I was able to slap together the basic idea of this game in less than a days work of work, but now the question is do I want to keep working on this to make it more of a game? I would say that the answer is no, but I think that I might manage to get somewhere if I keep making more quick projects like this.
