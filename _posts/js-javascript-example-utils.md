---
title: JavaScript general utility module example
date: 2021-08-06 11:09:00
tags: [js]
layout: post
categories: js
id: 923
updated: 2021-08-29 14:00:38
version: 1.46
---

When I start a new project I often want to have a generic dumping ground for usual suspect type methods, in other words a kind of lodash like module only with methods that I am actually going to use in the project. Many methods that I might park in this kind of module might utility end up in some other module that has to do with something more specific such as working with angles, or creating and working with canvas elements, however when first starting out I just need a place to put them. So in todays post I will be going over a general utility module and the kind of methods that I might place in such a module that will serve as yet another one o my [javascript example](/2021/04/02/js-javascript-example/) type posts.

<!-- more -->

## 1 - The utils module

In this section I will then be going over a few usual suspect methods that I end up with in a generic utility module. It is important to stress that this is an example, and not the example, as the nature of this kind of module will differ fro one project to then next. For example in my [canvas example on a beach invasion type game prototype](/2020/04/24/canvas-example-game-beach/) I have the xp system as a stand alone method in the utils module of that example. This is one example of something that might start out in a module such as this, but should really maybe be in its own stand alone [experience point system module](/2020/04/27/js-javascript-example-exp-system/) actually.

### 1.1 - Start of the module and noop

When I make this kind of module often it is just one massive collection of public methods, so the [module pattern](/2019/03/12/js-javascript-module/) of just a simple object literal works more often than not. In some cases I might switch to a pattern that involves an [IIFE](/2020/02/04/js-iife/) or some other kind of option when it comes to this sort of thing, but that is often what I reserve for other kinds of specific modules that will contain at least a few private helper functions and objects that I do not need or want to make public.

One method that I might have in a utils module is just a simple noop function, or no operation function. This is just a function that does nothing actually, which may seem odd, but never the less it is something that I often used when it comes to setting a default value for a call back option for example.

```js
var utils = {};
// no operation ref
utils.noop = function(){};
```

### 1.2 - A distance formula

Another usual suspect that I might have in a module like this is a distance formula. In many of the projects that I make his is just a basic must have tool.

```js
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.3 - Bounding box collision detection

The distance formula can be used as a kind of collision detection, but only for a circle like area rather than a box like area. So another useful method to have in a generic utility module is a bounding box collision detection module.

```js
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
```

### 1.4 - Mathematical Modulo

The [built in JavaScript modulo operator may fall short](/2017/09/02/js-whats-wrong-with-modulo/), and not work as one might expect now and then in some situations. It is not that there is something wrong with it, it is just that the operator follows a different convention compared to other programing environments. So I often might want to have a module that provides an alternative convention, such as mathematical modulo on top of what is built into javaScript. Often this is the kind of convention I would prefer to use in most cases oddly enough so this is also often a kind of must have method in most projects.

```js
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
```

### 1.5 - Create a create canvas element method

I often like to make canvas projects so it is a good idea to have a method that will create and return a new canvas element with all the options set up just the way that I like it. There are many little details when it comes to canvas elements such as making it so that a context menu will not show up when the canvas is right clicked, adjusting the translation of the matrix and so forth.

```js
// create a canvas element
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
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
```

Using a method such as this is no replacement for a full blown canvas module of some kind though of course. There are many other little details surrounding canvas elements such as the topic of layering, and not always appending a canvas to a container that come to mind. Still this is a step in the right direction compared to starting over from the ground up each time I start a new project.

### 1.6 - Get a canvas relative position method

Another method that I might have in a general utilities module would be a method that I can use to adjust pointer positions.

```js
// get a canvas relative position that is adjusted for scale
utils.getCanvasRelative = function (e) {
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
```

### 1.7 - Create a canvas pointer handler

This is a method that will create and return a single handler that will work with a range of events given a single event object.

```js
// create and return a canvas pointer event handler
utils.canvasPointerEventHandler = function (state, events) {
    return function (e) {
        var pos = utils.getCanvasRelative(e),
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
            handler.call(e, e, pos, state);
        }
    };
};
```

### 1.8 - Attach pointer handlers for a canvas element

I then have a method that I can call from the source code of a project just once, and given it a canvas element, state object, and an object of events for pointer methods. It will then use the create pointer hander method once to create a uniform handler with methods given in the events object that will act on the given state object. It will then attach the handler for all relevant pointer events for the given canvas element.

```js
// attach canvas pointer events
utils.canvasPointerEvents = function (canvas, state, events) {
    var handler = utils.canvasPointerEventHandler(state, events),
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
```

### 1.9 - Having a basic EXP System

Many of my projects are basic game prototypes, and one thing I need to have in many of them is some kind of experience point system. It might be best to start to work out some kind of [full module for an experience point system](/2020/04/27/js-javascript-example-exp-system/), however the same could be used for many of the canvas methods that I have in this module also. This xp object contains two methods that I first worked out for my [beach canvas example](/2020/04/24/canvas-example-gam-beach/) game prototype, and further refined in my post on the [math pow method](/2019/12/10/js-math-pow/).

```js
// Basic experience point system methods
utils.XP = (function () {
    // default values
    var default_deltaNext = 50,
    defualt_cap = 100;
    // get level with given xp
    var getLevel = function (xp, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXP = function (level, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse a levelObj by XP
    var parseByXP = function (xp, cap, deltaNext) {
        //cap = cap === undefined ? default_cap : cap;
        var l = getLevel(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXP(level + 1);
        return {
            level: level,
            levelFrac: l,
            per: l % 1,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        // use getXP method and then pass that to parseXP for utils.XP.parseByLevel
        parseByLevel: function (l, cap, deltaNext) {
            return parseByXP(getXP(l, deltaNext), cap);
        },
        // can just directly use parseByXP for utils.XP.parseByXP
        parseByXP: parseByXP
    };
}
    ());
```

### 1.10 - Create state machine objects

In my canvas example on what I am just calling an Orb Module I am working out a lot of logic that has to do with these objects called orbs that are composed of a certain number of elements. I will not be getting into detail about he module here of course if you want to read more on it check out the post I wrote on it. However in the project folder of the orbs module I am starting to make a full game prototype that makes use of the module called orb match. As such when it comes to the utils library I am using in that game prototype I have started a bunch of methods that can be used to create and extend a basic state machine.

When it comes to using these methods the first thing I would wan to to is create a state machine object, for this I have two methods actually. One of which can be used to create a main state machine object that would be used in a main javaScript file. This main state machine object contains the main app loop, and has a number of other features that are appropriate for such a main state machine object. The other method can be used to create and return a far more minimal form of this kind of state machine object. This more minimal from of state machine object is what I have been using in various game logic modules as a way to go about creating sub states within a state.

```js
// create a minamal sm object ( For setting up a nested sm object, and the base of a main sm object )
utils.smCreateMin = function(opt){
    opt = opt || {};
    // return a base sm object
    var sm = {
        currentState: opt.currentState || '',
        states: opt.states || {},
        events: opt.events || {}
    };
    return sm;
};
// create the main sm object
utils.smCreateMain = function(opt){
    opt = opt || {};
    // create base sm object
    var sm = utils.smCreateMin(opt);
    // values that can be set by options
    sm.ver = opt.ver || '';
    sm.game = opt.game || {};
    sm.fps = sm.fps === undefined ? 30 : opt.fps;
    sm.canvasObj = opt.canvasObj || utils.createCanvas({
        width: 640,
        height: 480,
        container: document.getElementById('canvas-app')
    });
    sm.debugMode = opt.debugMode || false;
    // value that should not be set by options
    sm.secs = 0;
    sm.stopLoop = false;
    sm.lt = new Date();
    // events
    sm.events = {
        pointerStart: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerStart;
            if(handler){
                handler.call(sm, e, pos, sm);
            }
        },
        pointerMove: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerMove;
            if(handler){
                handler.call(sm, e, pos, sm);
            }
        },
        pointerEnd: function (e, pos, sm) {
            var handler = sm.states[sm.currentState].events.pointerEnd;
            if(handler){
                handler.call(sm, e, pos, sm);
            }
        }
    };
    utils.canvasPointerEvents(sm.canvasObj.canvas, sm, sm.events);
    // main loop
    sm.loop = function () {
        var now = new Date();
        sm.secs = (now - sm.lt) / 1000,
        state = sm.states[sm.currentState];
        if (sm.secs >= 1 / sm.fps) {
            // update
            var update = state.update;
            if(update){
                update.call(sm, sm, sm.secs);
            }
            // draw
            var ctx = sm.canvasObj.ctx,
            canvas = sm.canvasObj.canvas;
            var drawHook = state.draw;
            if(drawHook){
                drawHook.call(sm, sm, ctx, canvas);
            }
            sm.lt = now;
        }
        // if sm.stopLoop === false, then keep looping
        if(!sm.stopLoop){
            requestAnimationFrame(sm.loop);
        }
    };
    // stop loop on any page error
    window.addEventListener('error', function(e) {
        if(sm.debugMode){
            sm.stopLoop = true;
            console.log('error: ' + e.message);
            console.log(e);
            console.log('loop stoped');
        }
    });
    return sm;
};
```

### 1.10 - Push a new state object to a state machine object

I then have a utils method that I can use as a standard way to go about pushing state objects to a state machine object create with one of the create methods. For now this method is just used as a way to fill in blanks, but there may be a need to set up a few other things if I put more time into this.

```js
// push a new state object
utils.smPushState = function(sm, opt){
    var state = {
        name: opt.name || 'state_' + Object.keys(sm.states).length
    };
    state.buttons = opt.buttons || {};
    state.start = opt.start || function(){};
    state.end = opt.end || function(){};
    state.update = opt.update || function(){};
    state.draw = opt.draw || function(){};
    state.events = opt.events || {};
    sm.states[state.name] = state;
    return state;

};
```


```js
// set the current state
utils.smSetState = function(sm, newState){
    // get a ref to the old state
    var oldState = sm.states[sm.currentState];
    // call the on end hook for the old state if it has one
    var endHook = oldState.end;
    if(endHook){
        endHook.call(sm, sm);
    }
    // change to the new state, and call the start hook it it has one
    sm.currentState = newState;
    var newState = sm.states[sm.currentState];
    var startHook = newState.start;
    if(startHook){
        startHook.call(sm, sm);
    }
};
```

## 2 - Demos of the utils module

In this section I have some quick demos of this utility module just for the sake of having some use case examples of the methods in the module. These demos are just some quick code examples that I put together for the sake of this post alone, that make use of this rendition of a generic utility module. For some real project examples that make use of a utility module such as this you might want to check out my [canvas examples](/2020/03/23/canvas-example/). Many of my canvas examples will feature a module like the one I am using in this post, but what is it it will very from one project to the next.

### 2.1 - Using the create canvas method

Many of my projects will involve the use of one or more canvas elements. ALthough it may be best to go with some kind of canvas library when it comes to doing things from the ground up I am going to want to have something that will serve as at least some kind of crude starting point for what might eventuality be some kind of canvas module. When it comes to a serious protect the process of creating a canvas element is not always so simple, often I might want to create a canvas element that I will be drawing to and will need to be appended to the hard coded html. however in some cases I might want to use a canvas element to create a sprite sheet that was created by way of some javaScript code, and I want to use the canvas element as an image source to which I will then draw from to another canvas element, in that case I would want to not append such an canvas element to the hard coded html. However when it comes to just creating a simple game prototype of one kind or another I may not ever get to the point where I need to worry about these things. So A simple create canvas method that just created ans appends a single canvas element with everything set up just the way that I like it will work just fine.

```html
<html>
    <head>
        <title>javaScript example utils</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="../lib/utils.js"></script>
        <script>
// using the utils.createCanvas method to create a canvasObj
// with a canvas, and ctx ref
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx
// solid black background
ctx.fillStyle = 'black';
ctx.fillRect(0,0,canvas.width, canvas.height);
// some text
ctx.fillStyle = 'white';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '40px arial';
ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);

        </script>
    </body>
</html>
```

### 2.2 - Get canvas relative demo

Canvas elements are great not just for the sake of drawing to it by way of a little javaScript code that just runs but dos not do anything with user input. What is really cool about canvas is that it is not just a means of drawing to the screen, it is also a means by which a user can interact with a screen. In this example I ma making use of the get canvas relative method of the utils module to get a canvas rather than window relative pointer position. I am then just using that position to set the position of a circle.

```js
<html>
    <head>
        <title>javaScript example utils</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="../lib/utils.js"></script>
        <script>
// using the utils.createCanvas method
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx,
circle = {
  x: 160,
  y: 120,
  r: 16
};
// draw method
var draw = function(){
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // the circle
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fill();
};
// attaching an event
canvas.addEventListener('click', function(e){
   // using the utils.getCanvasRelative method to get the position of the click
   var pos = utils.getCanvasRelative(e);
   // setting the position of the circle to the position of the click
   circle.x = pos.x;
   circle.y = pos.y;
   draw();
});
draw();
        </script>
    </body>
</html>
```

### 2.3 - Bounding box collision detection demo

In all kinds of various projects I will want to make use of bounding box collision detection. Say I have two box areas on of which represents a shot from a gun, and the other represents some kind of enemy unit. If the shot object is fired from a player controlled unit I will want to know if the shot has hit an enemy unit or not, one way to fin out would be to use bounding box. In this example I am not going to do anything that advanced, but this is a simple example where I am using the bounding box method to set the color of box objects that over lap to a certain color.

For this example I have a create box helper function that will create and return an object that contains properties like x, y, width , and height. these are the properties that I need to find out if two areas over lap or not when calling this bounding box method. I then also have a get overlapping helper method that will use the [array reduce](/2021/07/13/js-array-reduce/) method to return an array of objects from an array of objects that overlay a given object.

```html
<html>
    <head>
        <title>javaScript example utils</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="../lib/utils.js"></script>
        <script>
 
var createBox = function(x, y, w, h){
    var box = {
        x: x === undefined ? 0: x,
        y: y === undefined ? 0: y,
        w: w === undefined ? 32: w,
        h: h === undefined ? 32: h,
        color: 'lime'
    };
    return box;
};
 
var getOverlaping = function(boxArr, a){
    return boxArr.reduce(function(acc, b){
        if(a === b){
            return acc;
        }
        if(utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h)){
            acc.push(b);
        }
        return acc;
    }, []);
};
 
// using the utils.createCanvas method
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx,
boxArr = [];
 
boxArr.push(createBox(12, 17));
boxArr.push(createBox(22, 35));
boxArr.push(createBox(147, 85));
boxArr.push(createBox(87, 105));
 
// set color of overlapping box objects to red
boxArr.forEach(function(a){
    getOverlaping(boxArr, a).forEach(function(b){
        b.color = 'red'
    })
});
 
// draw method
var draw = function(){
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // the circle
    boxArr.forEach(function(box){
        ctx.fillStyle = box.color;
        ctx.beginPath();
        ctx.rect(box.x, box.y, box.w, box.h);
        ctx.fill();
        ctx.stroke();
    });
};
draw();
        </script>
    </body>
</html>
```

### 2.3 - distance method example

The distance method is a usual suspect method that I will want to have in some kind of module if not a general utilities module such as this. The method just comes into play with all kinds of things, for example it can be used as a way to go about implanting a from of collision detection. In this demo of the module I will be using the distance method to do just this. Here in this example I am using the distance method as a way to go about fining out if a canvas relative pointer position is withing, or outside of the radius of a given circle.

```html
<html>
    <head>
        <title>javaScript example utils</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="../lib/utils.js"></script>
        <script>
// using the utils.createCanvas method to create a canvasObj
// with a canvas, and ctx ref
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx,
circle = {
  x: 160,
  y: 120,
  r: 64,
  colorIndex: 1,
  colors: ['red', 'green', 'blue']
};
// draw method
var draw = function(){
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // the circle
    ctx.fillStyle = circle.colors[circle.colorIndex];
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fill();
};
// attaching an event
canvas.addEventListener('click', function(e){
   // using the utils.getCanvasRelative method to get the position of the click
   var pos = utils.getCanvasRelative(e);
   // using utils.distance to get the distance between the click position and the center if the circle
   var d = utils.distance(circle.x, circle.y, pos.x, pos.y);
   // if distance is less than or equal to circle radius step color index
   if(d <= circle.r){
      circle.colorIndex -= 1;
      // using utils.mod to wrap color index value
      circle.colorIndex = utils.mod(circle.colorIndex, circle.colors.length);
   }
   draw();
});
draw();
        </script>
    </body>
</html>
```

### 2.4 - Pointer events example

On top of the create canvas method of the utils module there are also a number of other methods that I have that are closely related to using canvas elements. I covered some example that make use of the create canvas element, as well as the get canvas relative method. However I have also found that it is nice to have a few more methods that have to do with creating a kind of standard when it comes to handling pointer events.

```html
<html>
    <head>
        <title>javaScript example utils</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="../lib/utils.js"></script>
        <script>
var state = {
    pointerDown: false,
    canvasObj: utils.createCanvas(),
    circle: {
        x: 160,
        y: 120,
        r: 64,
        active: false,
        colorIndex: 1,
        colors: ['yellow', 'green', 'blue']
    }
};
/*
var canvas = state.canvasObj.canvas,
ctx = state.canvasObj.ctx,
circle = state.circle;
*/

// draw method
var draw = function(){
    var ctx = state.canvasObj.ctx,
    canvas = state.canvasObj.canvas,
    circle = state.circle;
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // the circle
    ctx.fillStyle = circle.colors[circle.colorIndex];
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fill();
};
var events = {
    pointerStart: function(e, pos, state){
       var d = utils.distance(state.circle.x, state.circle.y, pos.x, pos.y);
       state.pointerDown = true;
       // if distance is less than or equal to circle radius step color index
       if(d <= state.circle.r){
           state.circle.active = true;
        }
        draw();
    },
    pointerMove: function(e, pos, state){
        if(state.pointerDown && state.circle.active === true){
            state.circle.x = pos.x;
            state.circle.y = pos.y;
        }
        draw();
    },
    pointerEnd: function(e, pos, state){
        state.pointerDown = false;
        state.circle.active = false;
    }
}
utils.canvasPointerEvents(state.canvasObj.canvas, state, events);
draw();
        </script>
    </body>
</html>
```

## 3 - Conclusion

This is not the end all solution for this kind of module of course, in practice this kind of module will change from one project to another. Also the idea here is to just have a temporary dumping ground for methods that should ultimately be placed in a module that is not so generic. For example that canvas methods in this utils module might end up in a whole other module that has to do with creating and working with one or more canvas elements, and not much of anything else. This distance, and bounding box methods might end up being static methods in a module that is some kind of display object pool module maybe. However often I still end up with a few odd ball methods that I just do not know where to go with, so I place them in a module like this.