---
title: JavaScript mouse topics beyond just the events
date: 2020-06-25 11:44:00
tags: [js]
layout: post
categories: js
id: 671
updated: 2021-10-20 11:57:26
version: 1.23
---

In client side [javaScript mouse](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) events are a way to get mouse cursor positions as well as the state of one or more mouse buttons. The javaScript mouse events are a collection of several types of events that can be attached to the window object, or just about an html element with a method the [add event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

There are three general event types of interest when working something out with mouse events that are [onmousedown](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousedown), [onmosemove](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousemove), and [onmouseup](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseup). There are other events of interest, but for the most part I only bother with those three events when working out any kind of user interface that will make use of a mouse if present.

Mouse events alone are not the best way to go about making a truly universal input controller type module or component of an application. There are of course also touch events, and keyboard events that should be taken into consideration also when working on something to that effect. However mouse events would be best when it comes to attaching events that will allow for a great deal of control over what will happen for traditional desktop clients.

<!-- more -->

## 1 - JavaScript mouse events basics

So for a basic example of javaScript mouse events I quickly put together this example that will just display the current state of a the mouse position, and the state of the left mouse button.

In this example I just have a simple state object as well as some helper methods for setting the position of the state object, as well as rendering the state of the values to an html element. I am then just attaching event handlers to the window object with the add event listener method by calling the add event listener method off of the window object. Each time I call the add event listener method I pass a string value for the desired event type I want to attach for, and then a function that will fire each time the event happens.

### - The source code examples in this post are on github

Like all my other posts on vanilla javaScript the source code examples in this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-mouse) on Github. This post is still very much a work in progress as there is still a lot to cover when it comes to working with a mouse in client side javaScript beyond just that of the very basics at least. In the test vjs repository I have the latest source code examples, and other assets that may not always be included in the source code examples I embed into the content here. I also have my notes when it comes to future edits, and the Github repository would be a good place to make pull requests. There is also the comments section of this post that can eb sued to bring something up that is related to working with a mouse in client side javaScript.

### 1.1 - The window on click event

One way to go about getting started with the mouse in client side javaScript would be to set a function to the _onclick_ property of the window object in a script tag. Inside the body of the function I can define some logic that will be called each time any area of the window is clicked.

For this example I am just setting a simple count variable and setting the inner text of a div element that I have gained a reference to by way of the [document.getElementById method](/2018/12/27/js-document-getelementbyid/).

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div id="out">0<div>
        <script>
var c = 0;
window.onclick = function(e){
    c += 1;
    document.getElementById('out').innerText = c;
};
        </script>
    </body>
</html>
```

using the on click property of the window object, or any other node such as an element, can be though of as the old, tired yet true way of doing this sort of thing. If for some reason you want to get your code to work on what is now very old web browsers you would want to do something like this.

### 1.2 - Using addEventListener to attach an event to window

A more modern way of attaching [event listeners](/2019/01/16/js-event-listeners/) to the window object, as well as nodes in general including elements would be to use the add event listener method.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div id="out" style="background:gray;padding:10px;text-align:center;">0<div>
        <script>
var c = 0,
colors = ['red', 'green', 'blue'],
out = document.getElementById('out');
// adding an event listener to window for the click event
window.addEventListener('click', function(e){
    c += 1;
    out.innerText = c;
});
// adding another one
window.addEventListener('click', function(e){
    out.style.background = colors[c % colors.length];
});
        </script>
    </body>
</html>
```

### 1.3 - The mouse down, up, and move events

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

### 1.4 - Input elements and the on click event

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <input id="in_button" type="button" value="0">
        <script>
var c = 0;
document.getElementById('in_button').addEventListener('click', function(e){
    c += 1;
    e.target.value = c;
});
        </script>
    </body>
</html>
```

### 1.5 - clicking a div element

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
        <style>
.parent{
  position:absolute;
  background:gray;
  width:640px;
  height:480px;
}
.child{
  position:relative;
  top:20px;
  background: #afafaf;
  padding:20px;
}
        </style>
    </head>
    <body>
        <div class="parent" style="background:gray;"><div>
        <script>
document.querySelector('.parent').addEventListener('click', function(e){
    var parent = e.currentTarget,
    bx = parent.getBoundingClientRect(),
    pos = {
      x : e.clientX - bx.left,
      y : e.clientY - bx.top,
      bx: bx
    };
    parent.innerHTML = '<div class="child">' + pos.x + ', ' + pos.y + '</div>';
});
        </script>
    </body>
</html>
```

### 1.6 - parent and child divs

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
        <style>
div{
  position:absolute;
}
.parent{
  background:gray;
}
.child{
  top:0px;
  left:0px;
  background: #afafaf;
}
        </style>
    </head>
    <body>
        <div class="parent" style="background:gray;"><div>
        <script>
// some values
var PARENT = document.querySelector('.parent');
PARENT_WIDTH = 800,
PARENT_HEIGHT = 600,
CHILD_COUNT = 15,
CHILD_SIZE = 64;
// set with and height of parent by way of style api
PARENT.style.width = PARENT_WIDTH + 'px';
PARENT.style.height = PARENT_HEIGHT + 'px';
// set up children
var i = CHILD_COUNT;
while(i--){
   var child = document.createElement('div');
   child.className = 'child';
   child.id="child_" + ( CHILD_COUNT - i );
   PARENT.appendChild(child);
}
// random child position for the given child helper function
var randomChildPos = function(child){
   var x = Math.floor((PARENT_WIDTH - CHILD_SIZE) * Math.random());
   var y = Math.floor((PARENT_HEIGHT - CHILD_SIZE) * Math.random());
   child.style.left = x + 'px';
   child.style.top = y + 'px';
   child.style.width = CHILD_SIZE + 'px';
   child.style.height = CHILD_SIZE + 'px';
};
// random position for all children helper function
var randomParentChildren = function(parent){
    [].forEach.call(parent.children, function(child){
        randomChildPos(child);
    });
};
// call random parent children helper for the first time
randomParentChildren(PARENT);
// click event using e.currentTarget and e.target along with
// e.clientX, and e.clientY
PARENT.addEventListener('click', function(e){
    var parent = e.currentTarget,
    child = e.target,
    bx = parent.getBoundingClientRect(),
    pos = {
      x : e.clientX - bx.left,
      y : e.clientY - bx.top,
      bx: bx
    };
    if(child === parent){
        randomParentChildren(parent);
    }else{
        randomChildPos(child);
    }
});
        </script>
    </body>
</html>
```

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

## 4 - Mouse buttons

The [buttons property of the mouse event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button) object that is passed via events such as the mouse down event will give a number value that can be used as a way to know the button that was clicked on a mouse. 

```html
<html>
    <head>
        <title>javascript mouse buttons example</title>
    </head>
    <body>
        <div id="out" style="width:240px;height:240px;background:gray;"><div>
        <script>
var out = document.getElementById('out');
var render = function (button) {
    out.innerText = 'button: ' + button;
};
out.addEventListener('mousedown', function(e){
    e.preventDefault();
    render(e.button);
});
        </script>
    </body>
</html>
```

The return value of the button property should be a number with a value from 0 to 4 for up to five buttons on a mouse that where pressed. A value of 0 should mean the main button of the mouse, in other words the typical left click button. A value of 2 on the other had will be a right click actually as a value of 1 will refer to a center click, or scroll wheel click if you prefer. The values of 3 and 4 will refer to the back and forward buttons that are present on many mouses.


## 5 - Conclusion

So hopefully this post has helped you gain some basic insight into how to get going with a mouse when making a user interface with javaScript. However there is much more to learn and be aware of when it comes to using mouse events, as well as other events such as touch events, and keyboard events. This post does not outline a fully comprehensive input controller module or project or sorts after all as the focus here is just on things that have to do with working with the mouse.

When it comes to working out some kind of project that will work as something that will parse input from an array or sources I made a [canvas example post that is an input controller of sorts](/2020/04/17/canvas-example-input-controller/). This canvas example is one of many such canvas examples that I am working on a little now and then that serve as real projects examples of sorts. So for more on mouse events as well as many other related topics you might want to check that post out.