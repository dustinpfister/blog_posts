---
title: Canvas Module JavaScript example
date: 2021-08-27 15:06:00
tags: [js]
layout: post
categories: js
id: 926
updated: 2021-08-28 10:10:33
version: 1.18
---

Many of my projects that I make involve working with canvas elements, and I also like to make vanilla javaScript projects where most if not all of the code is my own. Still I would like to stop making everything all over again each time I start a new project, so in todays [JavaScript example](/2021/04/02/js-javascript-example/) post I will be going over a kind of canvas module that so far works okay for what I want to use such a module for.

There are at least a few basic features that a canvas module should have and one of them is to create and return not just one canvas element, but a collection of canvas elements. So the main create method of the canvas module should have an array of canvas elements as one of the properties. There should also be some additional features that have to do with attaching pointer event handers to at least one of the container of the canvas elements, or one of the canvas elements. There are a whole bunch of other features that might be a good idea also, for example one of my [older JavaScript examples posts was on a draw points method](/2021/04/01/js-javascript-draw-points/), which I think should be adding into this kind of module.


<!-- more -->

## 1 - The canvas module

In this section I will be going over the source code of the canvas module itself before moving on to some additional code examples that make use of the module. Like many of my vanilla javaScript projects I went with a [module design](/2019/03/12/js-javascript-module/) that packs all of the code in a single [IIFE](/2020/02/04/js-iife/), this might not always be the best option in all situations but for now it is still how I make my modules.

The canvas module is designed in a way in which I have a single private object called FEATURES inside the body of the IIFE. This FEATURES object contains a number of built in features for creating an array of points, and drawing to a canvas layer in a stack of layers created with the main create layer stack method of this module. Also as mentioned with the create canvas layers method there are a number of public methods, for creating an array of points, and loading additional features. So on top of the built in features there is also a load method of the canvas module that can be used to add on top of the built in features.

### 1.1 - The beginning of the module, and built in draw methods

At the top of the module I create the FEATURES object as just a single object with the object literal syntax. I when then be appending additional objects to the FEATURES object in the module itself for draw methods and, and methods for creating a collection of points.

```js
(function (api) {
 
    var FEATURES = {};
 
/********* ********** *********
 Draw Methods
********** ********** *********/
 
    var drawMethods = FEATURES.drawMethods = {};
 
    // clear a layer
    drawMethods.clear = function(stack, ctx, canvas, layerObj){
        ctx.clearRect(-1, -1, canvas.width + 1, canvas.height + 1);
    };
 
    // draw a background
    drawMethods.background = function (stack, ctx, canvas, layerObj, background) {
        ctx.fillStyle = background || stack.background || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
 
    // draw a points collection
    drawMethods.points = function (stack, ctx, canvas, layerObj, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    i += 1;
                }
            }
            ctx.lineWidth = lineWidth;
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };
```

### 1.2 - built in points method

```js
/********* ********** *********
 Points Methods
********** ********** *********/
 
    var pointsMethods = FEATURES.pointsMethods = {};
 
    // create a box
    pointsMethods.box = function(sx, sy, w, h){
        var x = sx - w / 4,
        y = sy - h / 4;
        var points = [[
            x, y, x + w / 2, y,
            x + w / 2, y + h / 2, x, y + h / 2
        ]];
        return points;
    };
```

### 1.3 - Helper functions

```js
/********* ********** *********
 HELPERS
********** ********** *********/
 
    // get a canvas relative position that is adjusted for scale
    var getCanvasRelative = function (e) {
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
    // create and return a canvas pointer event handler for a stack
    var canvasPointerEventHandler = function (stack, state, events) {
        return function (e) {
            var pos = getCanvasRelative(e),
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
                handler.call(state, e, pos, state, stack);
            }
        };
    };
    // attach canvas pointer events
    var attachCanvasPointerEvents = function (stack) {
        var handler = canvasPointerEventHandler(stack, stack.state, stack.events),
        canvas = stack[stack.length - 1].canvas,
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
    // create a single layer object
    var createLayer = function (opt) {
        opt = opt || {};
        opt.append = opt.append === undefined ? true : opt.append;
        var layer = {};
        // a layer should have a container
        layer.container = opt.container || document.getElementById('canvas-app') || document.body;
        if (typeof layer.container === 'string') {
            layer.container = document.querySelector(layer.container);
        }
        layer.canvas = document.createElement('canvas');
        layer.ctx = layer.canvas.getContext('2d');
        // assign the 'canvas_layer' className
        layer.canvas.className = 'canvas_layer';
        // set native width
        layer.canvas.width = opt.width === undefined ? 320 : opt.width;
        layer.canvas.height = opt.height === undefined ? 240 : opt.height;
        // translate by 0.5, 0.5
        layer.ctx.translate(0.5, 0.5);
        // disable default action for onselectstart
        layer.canvas.onselectstart = function () {
            return false;
        }
        // append canvas to container
        if (opt.append) {
            layer.container.appendChild(layer.canvas);
        }
        return layer;
    };
```

### 1.4 - The public API

```js
 
/********* ********** *********
 PUBLIC API
********** ********** *********/
 
    // create a stack of layers as an 'Array Like' Object
    api.createLayerStack = function (opt) {
        opt = opt || {};
        // creating an array like object
        var stack = {
            length: opt.length === undefined ? 2 : opt.length,
            container: opt.container || document.getElementById('canvas-app') || document.body,
            events: opt.events || {},
            state: opt.state || {},
            background: opt.background || 'blue'
        };
        if (typeof stack.container === 'string') {
            stack.container = document.querySelector(stack.container);
        }
        // layer options
        var layerOpt = {
            container: stack.container,
            append: true
        };
        // create layers for the stack
        var i = 0;
        while (i < stack.length) {
            stack[i] = createLayer(layerOpt);
            i += 1;
        }
        attachCanvasPointerEvents(stack);
        return stack;
    };
    // main draw method
    api.draw = function (stack, key, layerIndex) {
        // layer object
        var layerObj = stack[layerIndex];
        // CORE ARGUMENTS created from stack, and layerIndex arguments of canvasMod.draw
        var coreArgu = [stack, layerObj.ctx, layerObj.canvas, layerObj];
        // ADDITIONAL ARGUMNETS that will change depending on the draw method used with key argument of canvasMod.draw
        var addArgu = [];
        if (arguments.length > 3) {
            addArgu = Array.prototype.slice.call(arguments, 3, arguments.length);
        }
        FEATURES.drawMethods[key].apply(stack, coreArgu.concat(addArgu));
    };
    // create points
    api.createPoints = function (stack, key) {
        var coreArgu = Array.prototype.slice.call(arguments, 2, arguments.length);
        var points = pointsMethods[key].apply(stack, coreArgu);
        return points;
    };
    // load additional FEATURES
    api.load = function(plugObj){
         Object.keys(plugObj).forEach(function(featuresKey){
             var featureArray = plugObj[featuresKey];
             featureArray.forEach(function(feature){
                 FEATURES[featuresKey][feature.name] = feature.method;
             })   
         });
         console.log(FEATURES);
    };
}
    (this['canvasMod'] = {}));
```

## 2 - Some css to use with the module

I have some css together that should be used with the canvas module. When I create a stack the default id name for a container is canvas-app, and I also assign a canvas\_layer class name to every canvas element that is part of a stack of layers created with the canvas module create layer stack method. I might want to adjust the css a little now and then here and there, but in the project folder I have this css worked out that seems to work out well thus far.

```css
#canvas-app{
    position: relative;
}
.canvas_layer {
    position:absolute;
  }
@media (max-width: 599px) {
  #canvas-app {
    margin: -10px;
    width: 240px;
    height: 180px;
    margin-left: auto;
    margin-right: auto;
  }
  .canvas_layer {
    width: 240px;
    height: 180px;
  }
}
@media (min-width: 600px) and (max-width: 999px) {
  #canvas-app {
    margin: 0px;
    width: 320px;
    height: 240px;
    margin-left: auto;
    margin-right: auto;
  }
  .canvas_layer {
    width: 320px;
    height: 240px;
  }
}
@media (min-width: 1000px) {
  #canvas-app {
    margin: 0px;
    width: 640px;
    height: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  .canvas_layer {
    width: 640px;
    height: 480px;
  }
}
```

## 3 - A box demo of the canvas module

Now to work out at least one if not a few basic examples of this canvas module just for the sake of making sure the project works the way that it should. For this example the goal was to just make a quick project that just makes use of the built in box method in the create points object. I wanted to still test out all the basic features of the module though so even though this is a basic example, it is still the beginnings of something that is not so basic. Many of my canvas project prototype examples make use of a state machine, in fact I have one [canvas example where a state machine that was the focus of the example](/2020/01/28/canvas-example-state-machine/).

```js
// helpers
 
var updateGame = function(sm, secs){
    sm.game.size += 32 * secs;
    if(sm.game.size > 128){
        sm.game.size = 64;
    }
    sm.game.w = sm.game.size;
    sm.game.h = sm.game.size;
    sm.game.points = canvasMod.createPoints(sm.layers, 'box', sm.game.x, sm.game.y, sm.game.w, sm.game.h);
};
 
// state object
 
var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    currentState: 'game',
    game: {},
    layers: {},
    events: {
        pointerStart: function (e, pos, sm) {
            sm.states[sm.currentState].events.pointerStart.call(sm, e, pos, sm);
        },
        pointerMove: function (e, pos, sm) {
            sm.states[sm.currentState].events.pointerMove.call(sm, e, pos, sm);
        },
        pointerEnd: function (e, pos, sm) {
            sm.states[sm.currentState].events.pointerEnd.call(sm, e, pos, sm);
        }
    },
    states: {}
};
sm.layers = canvasMod.createLayerStack({
    container: '#canvas-app',
    events: sm.events,
    state: sm
});
sm.game = {
    x: 160,
    y: 120,
    w: 256,
    h: 256,
    size: 32,
    points: []
};
updateGame(sm, 0);
 
// game state
 
sm.states.game = {
    // this start hook will be called just once
    // here I can draw a static background to the canvas just once
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0, 'red');
    },
    update: function (sm, secs) {
        updateGame(sm, secs);
    },
    draw: function (sm, stack) {
        canvasMod.draw(stack, 'clear', 1);
        canvasMod.draw(stack, 'points', 1, sm.game.points, 0, 0);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            // change loction of box
            sm.game.x = pos.x;
            sm.game.y = pos.y;
        },
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
    }
};
 
// loop
 
// call start just once
sm.states.game.start(sm);
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000,
    state = sm.states[sm.currentState];
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        state.update(sm, secs);
        state.draw(sm, sm.layers);
        sm.lt = now;
    }
};
loop();
```

## 4 - Testing out the plug in system with a circle create points method

I am going to want to have at least one additional demo in which I am testing out the load method of this canvas module. When it comes to using this module in any kind of project I am going to want to define some custom draw methods, and also some methods that will create an array of points also. In this example I am adding a circle create points method, along with an additional oval create points method. When creating a plug in object for the canvas module I can define more than one new method when it comes to points methods, as well as draw methods, so I just wanted to quickly make sure that this feature is working as it should with this demo basically.

### 4.1 - points-circle.js method

Here I have the points circle javaScript file of this demo in which I am extending the features of the canvas module by adding a circle and over method for creating an array of points. In addition to this I also have added a single new draw method that can be sued to draw text to a layer of a stack.

```js
canvasMod.load({
    // points methods to add
    pointsMethods : [
        // a circle method
        {
            name: 'circle',
            method: function(cx, cy, radius, pointCount){
                pointCount = pointCount === undefined ? 100 : pointCount;
                var points = [[]];
                var i = 0, x, y, radian;
                while(i < pointCount){
                    radian = Math.PI * 2 / pointCount * i;
                    x = cx + Math.cos(radian) * radius;
                    y = cy + Math.sin(radian) * radius;
                    points[0].push(x, y);
                    i += 1;
                }
                return points;
            }
        },
        // an oval method
        {
            name: 'oval',
            method: function(cx, cy, radius1, radius2, pointCount){
                pointCount = pointCount === undefined ? 100 : pointCount;
                var points = [[]];
                var i = 0, x, y, radian;
                while(i < pointCount){
                    radian = Math.PI * 2 / pointCount * i;
                    x = cx + Math.cos(radian) * radius1;
                    y = cy + Math.sin(radian) * radius2;
                    points[0].push(x, y);
                    i += 1;
                }
                return points;
            }
        }
    ],
    drawMethods: [
        {
            name: 'print',
            method: function(stack, ctx, canvas, layerObj, text, x, y, opt){
                opt = opt || {};
                opt.fontSize = opt.fontSize || 10;
                ctx.fillStyle = opt.fillStyle || 'black';
                ctx.textBaseline = 'top';
                ctx.font = opt.fontSize + 'px arial';
                ctx.fillText(text, x, y);
            }
        }
    ]
});
```

### 4.2 - The main.js file for this points circle demo

When I test this out everything seems to work the way it should. So then I can create all kinds of additional files that I might reuse from one project to the next with this. Also when it comes to just about any kind of project there will need to be at least a few custom draw methods for various kinds of things. So then I can use the canvas modules load methods as a way to add these draw methods in.

```js
var sm = {};
// testing out oval
sm.points = canvasMod.createPoints(sm.layers, 'oval', 0, 0, 150, 75, 20)
sm.stack = canvasMod.createLayerStack({
    container: '#canvas-app',
    state: sm
});
canvasMod.draw(sm.stack, 'background', 0, 'red');
canvasMod.draw(sm.stack, 'clear', 1);
canvasMod.draw(sm.stack, 'points', 1, sm.points, 160, 120);
// custom draw method works
canvasMod.draw(sm.stack, 'print', 1, 'hello world', 5, 5, {fillStyle: 'white', fontSize: 20 });
```

## 5 - Conclusion

The current state of the canvas module seems to work okay thus far, but there are a few more features that I would like to add. However I think most of this functionality should be added in the form of optional plug ins rather than making the module itself more bloated. In my [canvas example posts](/2020/03/23/canvas-example/) I have one [example that is just drawing stars with a canvas element](/2020/02/12/canvas-example-star/) and a little javaScript code, I think I would like to have that to work with as a draw points method but I do not think I want to hard code it into the canvas module itself. There is also another [canvas example where I worked out a standard for making sprite sheets without loading external images](/2021/01/29/canvas-example-animation-pixmaps/) that is another project that I might want to work into this also.

