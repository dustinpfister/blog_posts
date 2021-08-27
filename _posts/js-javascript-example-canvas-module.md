---
title: Canvas Module JavaScript example
date: 2021-08-27 15:06:00
tags: [js]
layout: post
categories: js
id: 926
updated: 2021-08-27 16:14:17
version: 1.9
---

Many of my projects that I make involve working with canvas elements, and I also like to make vanilla javaScript projects where most if not all of the code is my own. Still I would like to stop making everything all over again each time I start a new project, so in todays [JavaScript example](/2021/04/02/js-javascript-example/) post I will be going over a kind of canvas module that so far works okay for what I want to use such a module for.

There are at least a few basic features that a canvas module should have and one of them is to create and return not just one canvas element, but a collection of canvas elements. So the main create method of the canvas module should have an array of canvas elements as one of the properties. There should also be some additional features that have to do with attaching pointer event handers to at least one of the container of the canvas elements, or one of the canvas elements. There are a whole bunch of other features that might be a good idea also, for example one of my [older JavaScript examples posts was on a draw points method](/2021/04/01/js-javascript-draw-points/), which I think should be adding into this kind of module.


<!-- more -->

## 1 - The canvas module

In this section I will be going over the source code of the canvas module that I have together for this post, and also what I might use in one or more additional projects in the future. Like many of my vanilla javaScript projects I went with a [module design](/2019/03/12/js-javascript-module/) that packs all of the code in a single [IIFE](/2020/02/04/js-iife/).

```js
(function (api) {
 
    // draw methods to use with canvasMod.draw
 
    var drawMethods = {};
 
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
 
    // Points methods
 
    var pointsMethods = {};
 
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
 
    // HELPERS
 
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
 
    // PUBLIC API
 
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
        drawMethods[key].apply(stack, coreArgu.concat(addArgu));
    };
    // create points
    api.createPoints = function (stack, key) {
        var coreArgu = Array.prototype.slice.call(arguments, 2, arguments.length);
        var points = pointsMethods[key].apply(stack, coreArgu);
        return points;
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

## 3 - A basic box example of the canvas module

Now to work out at least one if not a few basic examples of this canvas module just for the sake of making sure the project works the way that it should.

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

## 4 - Conclusion

The current state of the canvas module seems to work okay thus far, but there are a few more features that I would like to add. However I think most of this functionality should be added in the form of optional plug ins rather than making the module itself more bloated.