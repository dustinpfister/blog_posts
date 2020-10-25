---
title: JavaScript mouse basics including events and pit falls.
date: 2020-06-25 11:44:00
tags: [js]
layout: post
categories: js
id: 671
updated: 2020-10-25 09:25:48
version: 1.12
---

In client side [javaScript mouse](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) events are a way to get mouse cursor positions as well as the state of one or more mouse buttons. The javaScript mouse events are a collection of several types of events that can be attached to the window object, or just about an html element with a method the [add event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

There are three general event types of interest when working something out with mouse events that are [onmousedown](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousedown), [onmosemove](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousemove), and [onmouseup](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseup). There are other events of interest, but for the most part I only bother with those three events when working out any kind of user interface that will make use of a mouse if present.

Mouse events alone are not the best way to go about making a truly universal input controller type module or component of an application. There are of course also touch events, and keyboard events that should be taken into consideration also when working on something to that effect. However mouse events would be best when it comes to attaching events that will allow for a great deal of control over what will happen for traditional desktop clients.

<!-- more -->

## 1 - JavaScript mouse events basics

So for a basic example of javaScript mouse events I quickly put together this example that will just display the current state of a the mouse position, and the state of the left mouse button.

In this example I just have a simple state object as well as some helper methods for setting the position of the state object, as well as rendering the state of the values to an html element. I am then just attaching event handlers to the window object with the add event listener method by calling the add event listener method off of the window object. Each time I call the add event listener method I pass a string value for the desired event type I want to attach for, and then a function that will fire each time the event happens.

```html
<html>
    <head>
        <title>JavaScript mouse basic example</title>
    </head>
    <body>
        <div id="out"><div>
        <script>
// basic state and render stuff
var state = {
    down: false,
    x: null,
    y: null
};
var setPos = function (state, e) {
    state.x = e.clientX;
    state.y = e.clientY;
};
var render = function (state) {
    var out = document.getElementById('out');
    out.innerText = 'pos: (' + state.x + ',' + state.y + ' ); down: ' + state.down + ';';
};
// attach events to window
window.addEventListener('mousedown', function (e) {
    state.down = true;
    setPos(state, e);
    render(state);
});
window.addEventListener('mousemove', function (e) {
    setPos(state, e);
    render(state);
});
window.addEventListener('mouseup', function (e) {
    state.down = false;
    setPos(state, e);
    render(state);
});
render(state);
        </script>
    </body>
</html>
```

When this example is up and running in the browser I end up with the current values of the state object being displayed. moving the mouse around will result in the position being updated, and clicking the mouse button will change the value of the down boolean value.

## 2 - Get element relative position

So one thing that might come up right away is that the position that is obtained from the clientX, and clientY properties might not always be what one might expect. The values are always going to be relative to the start of the browser window rather than an element in that window.

To resolve the issue of the position not being relative to a nested element the get bounding client rect method of the target element of the event object can be used to get the position of the element in the window. These values can then be used to get a position that is relative to the element rather than the whole window.

```html
<html>
    <head>
        <title>javascript mouse get element relative</title>
    </head>
    <body>
        <canvas id="out" width="320" height="240" style="position:absolute;left:50px;top:50px;"><canvas>
        <script>
// Gte El relative
var getElRelative = function (e) {
    var el = e.target,
    bx = el.getBoundingClientRect();
    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top,
        bx: bx
    };
};
var setPos = function (state, e) {
    var pos = getElRelative(e);
    state.x = pos.x;
    state.y = pos.y;
};
var render = function (ctx, canvas, state) {
    var text = 'pos: (' + state.x + ',' + state.y + ' ); down: ' + state.down + ';';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText(text, 32, 32);
};
// state object
var state = {
    down: false,
    x: null,
    y: null
};
// attach events to canvas
var canvas = document.getElementById('out'),
ctx = canvas.getContext('2d');
canvas.addEventListener('mousedown', function (e) {
    state.down = true;
    setPos(state, e);
    render(ctx, canvas, state);
});
canvas.addEventListener('mousemove', function (e) {
    setPos(state, e);
    render(ctx, canvas, state);
});
canvas.addEventListener('mouseup', function (e) {
    state.down = false;
    setPos(state, e);
    render(ctx, canvas, state);
});
render(ctx, canvas, state);
        </script>
    </body>
</html>
```

This time I went with attaching the events to a canvas element that is the nested element of interest. I could leave the events attached to the window object, but that would result in the events continuing to fire even when I do something with the mouse outside of the canvas element.

## 3 - The onclick mouse and touch event

The [on click event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick) can be thought of as a mouse event in the sense that they name is click rather than touch. However the on [click event is actually an event that will fire for both mouse and touch events](https://stackoverflow.com/questions/37273142/would-onclick-event-work-on-touch-on-touch-screen-devices/37273344). This might not always be a problem if this is of course the behavior that you want when making an interface, however if I am making an interface where I want separate logic to fire for mouse events from that of touch events then it is a problem.

```html
<html>
    <head>
        <title>javascript mouse onclick example</title>
    </head>
    <body>
        <div id="out" style="width:240px;height:240px;background:gray;"><div>
        <script>
var out = document.getElementById('out');
var state = {
    on: false
};
var render = function (state) {
    out.innerText = 'on: ' + state.on;
    out.style.background = state.on ? 'green': 'red';
};
out.addEventListener('click', function(e){
    state.on = !state.on;
    render(state);
});
render(state);
        </script>
    </body>
</html>
```

Another factor of concern when it comes to using this event is that it will fire after mouse down and mouse up events, as well as touch start and touch end events for that matter. So if I want to have some code that will fore the very moment that something is touched, or when a mouse button is pressed, but yet not released, I can not separate that by using on click. So I generally do not use it, and when I do it is because I do not need to preform something different for pointer down and up events.

## 4 - Conclusion

So hopefully this post has helped you gain some basic insight into how to get going with a mouse when making a user interface with javaScript. However there is much more to learn and be aware of when it comes to using mouse events, as well as other events such as touch events, and keyboard events. This post does not outline a fully comprehensive input controller module or project or sorts after all as the focus here is just on things that have to do with working with the mouse.

When it comes to working out some kind of project that will work as something that will parse input from an array or sources I made a [canvas example post that is an input controller of sorts](/2020/04/17/canvas-example-input-controller/). This canvas example is one of many such canvas examples that I am working on a little now and then that serve as real projects examples of sorts. So for more on mouse events as well as many other related topics you might want to check that post out.