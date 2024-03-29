---
title: Touch events in javaScript.
date: 2019-02-13 08:49:00
tags: [js]
layout: post
categories: js
id: 378
updated: 2021-11-08 10:55:03
version: 1.37
---

There are [touch events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) in client side javaScript than can be used to bring interactivity to a javaScript project via touch screens rather than just using mouse and keyboard events only. There are several events of interest when it comes to touch events namely [touch start](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event), [touch move](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event), and [touch end](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event).

There is of course also using mouse events with touch events and keyboard events to help bring a more general way of interactivity to a project that will work on a wider range of client systems in a uniform kind of way. I have worked out a [canvas example that makes use of touch events as well as mouse and keyboard events](/2020/04/17/canvas-example-input-controller/) that acts as a kind of grand central input controller of sorts.

Still if you have a large volume of traffic coming to a project that is from clients that are using a mobile device it might be nice to add some custom functionality for those kinds of clients. For example making use of multi touch while making it so the project can still be used by systems that may not support touch events. So in this post I will be covering some basic examples of using touch events with javaScript.

<!-- more -->

## 1 - touch events basics, and touch start

Touch events differ a little from [mouse events](/2020/06/25/js-javascript-mouse/), for example with touch events there is the possibility of multi touch, rather than just a single mouse cursor position. In addition it is also true that there is not an equivalent to a mouse over event when it comes to touch events, so such things need to be simulated somehow, or just given an alternative way of doing what a mouse over event does.

However there is also a great deal in common with them as well, both mouse events and touch events can be though of as pointers. I can just not take into account the location of any of the additional touch objects that might be present when it comes to touch events and only look at the first touch object. I can also just use mouse down and touch start events to preform the same actions. However I still need to make slight adjustments to the event handers in order to get them to work with both touch and mouse events.

In this section I will be going over some of the very basics of touch events. In these examples I am just going to stick with just one event at a time when it comes to touch support, and not do anything to advanced at least not in this section just yet. Although I will be keeping these examples fairly simple this is still not a [getting started with javaScript](/2018/11/27/js-getting-started/) type post. So I assume that you have at least some background when it comes to the very basics of what should be known before hand. It is also a good idea to look more into [event listeners](/2019/01/16/js-event-listeners/) and [event objects](/2020/07/23/js-event-object/) in general also if you have not done so yet.

### - The source code examples in this post are on Github

The source code examples in this post can be found in my [test vjs repository on Github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-touch-events). The source code examples for my many other posts on [various javaScript topics](/categories/js/) can also be found there.

### 1.1 - Just the touch start event.

For a very basic example of touch events with plain vanilla javaScript, here is an example that involves a canvas element, and a single touch start event. The example will just draw a red circle to the canvas each time that the canvas is touched, but will do so only with the first finger, for now I am not going to do anything fancy with multi touch.

The touch start event is an event that fires each time a touch starts the very moment that one or more fingers touch the surface of the touch device. So it only fires once during the duration of an action that involves touching the surface of the screen moving and then lifting back up again.

```js
<html>
    <head>
        <title>touch events example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// fill black
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
var drawCircle = function(ctx, x, y, r, style){
    ctx.strokeStyle = style || 'red';
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.stroke();
};
 
// attach a touch start event for the canvas
canvas.addEventListener('touchstart', function(e){
    // prevent any default action for touch events
    e.preventDefault();
    // get the canvas relative rather than window relative
    // position of the first touch by making use of the
    // getBoundingClientRect method and the changedTouches array of
    // the touch event
    var bx = e.target.getBoundingClientRect(),
    x = e.changedTouches[0].clientX,
    y = e.changedTouches[0].clientY;
    // draw a circle centered there
    drawCircle(ctx, x, y, 15, 'red');
});
        </script>
    </body>
</html>
```

One major difference from mouse events is that the clientX, and clientY values are gained from an array of touch objects, this is because unlike a mouse a touch screen can support multi touch of course. There is however more than one array of touch objects though and it is impotent to know the differences between them when working out logic for touch events. In this example I am using the [changed touches](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches) array of the touch event object. Although it might not make much of a difference with this example the state of these touch objects may differ a little when it comes to the [touches array](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) when it comes to touch move events.

In this example I am also using the [getBoundingClientRect method](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) to get a canvas rather than window relative position of the touch event. This method will return a object that will contain metric for the position of the canvas element, I can then just use those values to adjust the values that are in the changed touches array that are relative to the window of the web page, and not the canvas element.

When it comes to touch events there is also the [preventDefault method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) as well that will cancel browser level type actions when a user interacts with the canvas. 

### 1.2 - Making a hander that will work with both touch and mouse events

One important thing to take into account is if I want to do something completely separate for touch events, or if I just want to make a single set of event handers that will work with both touch and mouse events. Often I just work out an interface that will work well with both pointer devices and just think in terms of a single pointer object.

When working out event handers that will work well with both touch and mouse events there are just a few little conditions to look for. There is of course looking at the type property of the event object, but another way is to look for the presence or absence of a touch array, such as the changed touches event.

```html
<html>
    <head>
        <title>touch events example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240" style="margin:100px;"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
var drawCircle = function(ctx, x, y, r, style){
    ctx.strokeStyle = style || 'red';
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.stroke();
};
// pointer down event that will work with Touch AND Mouse events
var pointerDown = function(e){
    e.preventDefault();
    var bx = e.target.getBoundingClientRect(),
    // assuming mouse to begin with
    x = e.clientX,
    y = e.clientY,
    color = 'lime';
    // checking for touch
    if(e.changedTouches){
        x = e.changedTouches[0].clientX,
        y = e.changedTouches[0].clientY;
        color = 'red'
    }
    // adjust to make values relative to target element
    // to which this hander is attached to rather than window
    x -= bx.left;
    y -= bx.top;
    drawCircle(ctx, x, y, 15, color);
};
 
canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('mousedown', pointerDown);
 
        </script>
    </body>
</html>
```

So with this example I am getting lime circles when I click the canvas, and red circles when I touch it. I am just setting the values for the x and y values to e.clientX and e.cleintY for starters. In the event that the event is a mouse event these will be the starting window relative values. In the event that it is a touch event there should be a changed touches array, this is then what I am setting the starting values for x and y then. I can the adjust the values with the metrics from bounding box like before.

## 2 - touch start, move, and end events

In addition to touch start events there are also the touch move and touch end events as well. In this example I have a simple project that will create the red circles in the previous example each time a touch move event fires as well on top of just the touch start event.

This time around I will be pulling what I am working on into an external javaScript file and linking to it from the html.

```html
<html>
    <head>
        <title>touch events example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="startendmove.js"></script>
    </body>
</html>
```

In the javaScript file I now have a more advanced version of the previous example. I now have a clean event that I call once the project starts and also each time a touch start event fires. For the touch end event I am not doing much of anything aside from just logging the time stamp value of the full touch event from start to end.

```js
// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// clear
var cls = function () {
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// get first pointer object
var getFirst = function (e) {
    var bx = e.target.getBoundingClientRect();
    return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    }
};
 
var touchStart = function (e) {
    var f = getFirst(e);
    e.preventDefault();
    cls();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(f.x, f.y, 15, 0, Math.PI * 2);
    ctx.stroke();
};
 
var touchMove = function (e) {
    var f = getFirst(e);
    e.preventDefault();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(f.x, f.y, 15, 0, Math.PI * 2);
    ctx.stroke();
};
 
var touchEnd = function (e) {
    console.log(e.timeStamp);
};
 
// attach a touch events
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('touchend', touchEnd);
canvas.addEventListener('touchmove', touchMove);
 
cls();
```

## 3 - Pinch to zoom and rotate example

I should have at least one of not more basic, and maybe not so bash project examples that make use of touch events. With that said the first project that came to mind would be to make a module that helps to create a system for creating and adjusting a pinch object. That is an object that can be used to add what needs to happen when the user pinches the canvas. There are two general factors that come to mind when doing this one would be a multiplier factor that can be used to scale an object for example, and the other is a radian value that can be used to rotate while scaling, or do just one or the other depending on how the pinch object is used.

So then in this section I will be going over source code that is my take on a [zoom pinch gesture](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures). There are many ways of going about making some kind of [pinch detection system](https://stackoverflow.com/questions/11183174/simplest-way-to-detect-a-pinch) when it comes to working with multi touch, but I have found that I just need to work out my own thing for this so I have all the features that I would want when it comes to adjusting certain values.

### 3.1 - A utility module

For this example I am going to want a distance formula, and also while I am at it I thing I will also barrow another method that I often have in a general untiles module. I have wrote a [javaScript example type post on this kind of module](/2021/08/06/js-javascript-example-utils/) when it comes to looming more into the various kinds of methods that one might have in a library such as this.

```js
var utils = {};
 
// get pos object with values relative to the given event object,
// and element that defaults to e.target by default
utils.getElementRelative = function (e, elTarget, index) {
    index = index === undefined ? 0 : index;
    var el = elTarget || e.target,
    bx = el.getBoundingClientRect(),
    pos = {
        x: (e.touches ? e.touches[index].clientX : e.clientX) - bx.left,
        y: (e.touches ? e.touches[index].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size if a canvas element
    if (el.nodeName === 'CANVAS') {
        pos.x = Math.floor((pos.x / el.scrollWidth) * el.width);
        pos.y = Math.floor((pos.y / el.scrollHeight) * el.height);
    }
    return pos;
};
 
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 3.2 - The pinch module

Now the the pinch module that is used to cerate and return a pinch object. This pinch object contains various values and settings for the state of the pinch. For example I want to have not just one value, but a few values for distance such as the starting distance between two touch points, as well as the current distance. I am then also going to want to have a distance delta that is the current change in distance which will be used to find out of the pinch should be active or not, and if so what the current multi value should be that will be applied to some kind of state object outside of the pinch object.

The way that I go about using the module is by calling the create method which is the one any only public method of this module at this time. When calling the create method I pass a canvas element as the first argument that should be a canvas element to attach to, followed by an option object. In the option object I can set values such as what the rate should be for the multi value, as well as what the minimum distance should be in order for the pinch to become active. While I am at it I can also set some methods for what should happen when the pinch is active and what should happen when it is done.

In the touch move event method I am checking of the current absolute value of the distance delta is greater than or equal to the min distance to set the pinch active. In the event that it is, I then set the active boolean value of the pinch object to true. In the event that the active boolean of the pinch object is true then I figure out what the multi value should be, and use the [Math.atan2 method](/2019/03/19/js-math-atan2/) to find out what the radian value should be for the pinch object and update that. After figuring out what the multi value and radian are I can now call the on pinch active method.

```js
(function (pinchMod) {
    /********* **********
    HELPERS
     ********** *********/
    // set pinch points of a pinch object with the given event object
    var setPinchPoints = function (e, pinch) {
        var pos = utils.getElementRelative(e, e.target, 0);
        var p1 = pinch.points.p1 = {
            x: pos.x,
            y: pos.y
        }
        var pos = utils.getElementRelative(e, e.target, 1);
        var p2 = pinch.points.p2 = {
            x: pos.x,
            y: pos.y
        }
        return pinch.points;
    };
    /********* **********
    EVENTS
     ********** *********/
    var EVENTS = {};
    // create for
    EVENTS.createFor = function (eventType, pinch) {
        return EVENTS[eventType];
    };
    // start
    EVENTS.touchstart = function (e) {
        pinch.active = false;
        if (e.touches.length >= 2) {
            e.preventDefault();
            var points = setPinchPoints(e, pinch);
            pinch.startDistance = utils.distance(points.p1.x, points.p1.y, points.p2.x, points.p2.y);
        }
    };
    // move
    EVENTS.touchmove = function (e) {
        if (e.touches.length >= 2) {
            var points = setPinchPoints(e, pinch);
            pinch.distance = utils.distance(points.p1.x, points.p1.y, points.p2.x, points.p2.y);
            pinch.distanceDelta = pinch.startDistance - pinch.distance;
            if (Math.abs(pinch.distanceDelta) >= pinch.minActiveDist) {
                pinch.active = true;
            }
            if (pinch.active) {
                // figure multi value
                var dd = pinch.distanceDelta + pinch.minActiveDist;
                pinch.multi = dd / pinch.multiRate;
                // get radian using Math.atan2
                pinch.radian = Math.atan2(points.p1.y - points.p2.y, points.p1.x - points.p2.x);
                // call on pinch active callback
                pinch.onPinchActive.call(pinch, pinch, pinch.multi, pinch.radian);
            }
        }
    };
    // end event
    EVENTS.touchend = function (e) {
        if (pinch.active) {
            pinch.onPinchEnd.call(pinch, pinch, pinch.multi, pinch.radian);
        }
        pinch.active = false;
    };
    /********* **********
    PUBLIC METHODS
     ********** *********/
    pinchMod.create = function (canvas, opt) {
        opt = opt || {};
        // the pinch object
        var pinch = {
            active: false,
            startDistance: 0,
            distance: 0,
            distanceDelta: 0,
            minActiveDist: opt.minActiveDist === undefined ? 40 : opt.minActiveDist,
            multiRate: opt.multiRate === undefined ? 16 : opt.multiRate,
            multi: 0,
            radian: 0,
            points: {
                p1: {
                    x: 0,
                    y: 0
                },
                p2: {
                    x: 0,
                    y: 0
                },
            },
            onPinchActive: opt.onPinchActive || function (pinch, multi, radian) {},
            onPinchEnd: opt.onPinchEnd || function (pinch, multi, radian) {}
        };
        // attach to the given canvas
        canvas.addEventListener('touchstart', EVENTS.createFor('touchstart', pinch));
        canvas.addEventListener('touchmove', EVENTS.createFor('touchmove', pinch));
        canvas.addEventListener('touchend', EVENTS.createFor('touchend', pinch));
        // return the pinch object
        return pinch;
    };
}
    (this['pinchMod'] = {}));
```

### 3.3 - Draw module

I will then want to have a draw module that will be used to draw the current state of a state object that will be the object that will be effected by the pinch, as well as debug info for the pinch object. For this example I just want to use the pinch object to change the size and rotation of a box object so I have a draw state method, I then also have my draw debug pinch method as a way to display the state of a pinch object. Like many other modules like this I also have a draw background method that is used as a way to clean the canvas each time I draw to it.

```js
var draw = {};
// background
draw.background = function (ctx, canvas) {
    // fill black
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// state
draw.state = function (ctx, canvas, state) {
    // fill black
    ctx.fillStyle = 'cyan';
    ctx.strokeStyle = 'white';
    var obj = state.obj;
    ctx.save();
    ctx.translate(obj.cx, obj.cy);
    ctx.rotate(obj.r);
    ctx.beginPath();
    ctx.rect(obj.size / 2 * -1, obj.size / 2 * -1, obj.size, obj.size);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};
// debug pinch
draw.debugPinch = function (ctx, canvas, pinch) {
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.fillText('multi: ' + pinch.multi.toFixed(2), 10, 10);
    ctx.fillText('radian: ' + pinch.radian.toFixed(2), 10, 25);
    // draw points
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'lime';
    Object.keys(pinch.points).forEach(function (ptKey) {
        var pt = pinch.points[ptKey];
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
};
```

### 3.4 - The main javaScript file

I then have a main javaScript example in which I am of course making use off all the above javaScript files including the utilities library, pinch module, and draw module. At the top of this module I am getting a reference to the canvas element and the 2d drawing context. After that I am crating my state object to which I will effect by the pinch object. Speaking of the ping object yes I cerate one here also passing a reference tot eh canvas element as the first argument followed by an options object that I use to adjusted some values for the pinch. 

I then set up some callbacks that will fire for when the pinch becomes active and ends. One such callback is of course the on pinch active method and with this example I am drawing the background, and then updating the values of the state object with the values from the pinch object. I am then drawing the current state of the state object, and of course also drawing the debug info to get a better idea of what is going on with the state of the pinch.

```js
// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// state
var state = {
    obj: {
        cx: canvas.width / 2,
        cy: canvas.height / 2,
        size: 50,
        r: 0
    }
};
// create pinch object
var pinch = pinchMod.create(canvas, {
        minActiveDist: 20,
        multiRate: 128
    });
// what to do when pinch is active
pinch.onPinchActive = function (pinch, multi, radian) {
    draw.background(ctx, canvas);
    state.obj.size = 50 * (1 + (1 - multi));
    state.obj.size = state.obj.size < 50 ? 50 : state.obj.size;
    state.obj.r = radian;
    draw.state(ctx, canvas, state);
    draw.debugPinch(ctx, canvas, pinch);
};
// when pinch is done
pinch.onPinchEnd = function (pinch, multi, radian) {
    draw.background(ctx, canvas);
    draw.state(ctx, canvas, state);
};
// draw background fro first time
draw.background(ctx, canvas);
draw.state(ctx, canvas, state);
```

### 3.5 - The index html file for this example of touch events

The last thing that I need is just a little html that will hold the canvas element, and have script tags to each of the files that I am using in this example.

```html
<html>
    <head>
        <title>touch events example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="640" height="480"></canvas>
        <script src="utils.js"></script>
        <script src="pinch.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

Then end result of all of this is what I would expect as it seems to work fine for me when I open this up in my web browser. I am able to rotate and scale the size of the box object, so it would seem to work just fine thus far.

## 4 - Conclusion

So this was just a brief overview of touch events in a client side javaScript environment. In my experience thus fat touch events are just part of what needs to be taken into account when working out a user interface. More often then not when I use them it is just to define some additional way to do what can also be done with mouse events. That is that when I make a javaScript project I can not just write code for  touch events alone, I need to assume that I am always dealing with a desktop client. In fact more often than not that is what I am dealing with when I look at my sites statistics when it comes to that.