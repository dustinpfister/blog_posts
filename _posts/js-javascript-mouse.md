---
title: JavaScript mouse topics beyond just the events
date: 2020-06-25 11:44:00
tags: [js]
layout: post
categories: js
id: 671
updated: 2021-10-20 15:29:47
version: 1.41
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

A more modern way of attaching [event listeners](/2019/01/16/js-event-listeners/) to the window object, as well as nodes in general including elements would be to use the add event listener method. One major improvement with this is that it can be used as a way to attach more than one hander. Although it may not be one of the oldest ways of going about preforming event attachment, at this point it is only fairly old browsers that will result in code breaking changes.

Once again I am just stepping a count variable in the body of one event hander, but in the other event hander I am using the [style API](/2019/02/12/js-javascript-style) as a way to change a CSS value for the div. For this example I am just using the style api to change the background color of a div, but it can also be used to change any css value such as the left and top properties when using an absolute positioned div. 

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

### 1.3 - The mouse down, up, move events, and event objects

On top of the click event there are also a number of other mouse events such as the mousedown event that will fire the very moment that a mouse button is clicked, and the mouseup button that will fire once a mouse button is released. This is also the mouse move method that wil fire each time the mouse pointer location changes. On top of the additional events beyond that of just the click event there is also the [event object](/2020/07/23/js-event-object/) that is passed to a hander that contains all kinds of useful information about the event. Such as the position relative to the window, and references to the elements or nodes in which the event happed.

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

So there is attaching a client event to the window object, but there is also attaching events to various other kinds of elements such as an input element. For this example I am attaching an event handler to an input element that is a button type input element. When it comes to input elements it is often the value property of the input element that is of interest. When it comes to button input elements the value property is the display value of the button. So in this example I am attaching and event hander to an input element that will update the display value of the button each time it is clicked with the value of a count variable.

In this example I am using the target property of the event object to get a reference to the button that was clicked rather than by some other means. One reason why is because I am making my event hander a stand alone function and then passing a reference to that function for more than one call of the add event listener method. Inside the body of an event hander the target property will be a reference to the element where the event has happened. There is also the current target property that is the current element to which the event element is firing, but that is something that I will be getting more into in a later example.

In this example I am also using the [parseInt method](/2019/05/15/js-parseint) as a way to make sure what might be a string value of a number is converted to a number. I am also making use of html data attributes as a way to store a count value for each element.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <input class="c_button" data-count="0" type="button" value="count: 0"><br><br>
        <input class="c_button" data-count="0" type="button" value="count: 0"><br><br>
        <input class="c_button" data-count="0" type="button" value="count: 0"><br><br>
        <input class="c_button" data-count="0" type="button" value="count: 0"><br><br>
        <script>
// step a button
var stepButton = function(e){
    var button = e.target,
    count = parseInt(button.dataset.count);
    e.target.value = 'count: ' + ( button.dataset.count =  count += 1 );
};
// for all buttons of class '.c_button'
var buttons = document.querySelectorAll('.c_button');
[].forEach.call(buttons, function(button){
    button.addEventListener('click', stepButton);
});
        </script>
    </body>
</html>
```

### 1.5 - parent and child divs

Now for an example where I am really starting to get into the whole parent and child element with with mouse events. For this example I have a single parent div, and I am creating and injecting a whole bunch of child elements into this parent element. This time around I am attaching just a single event hander to the parent element, and I am using the target and current target properties of the event object to find out if I am dealing with a child element or not. In the event that I am dealing with a child element that was clicked I am giving just the child a new random position, else if I am clicking the parent element then I set new random positions for all the children of the parent element.

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
// click event using e.currentTarget and e.target
PARENT.addEventListener('click', function(e){
    var parent = e.currentTarget,
    child = e.target;
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

To resolve the issue of the position not being relative to a nested element the get bounding client rect method of the target element of the event object can be used to get the position of the element in the window. These values can then be used to get a position that is relative to the element rather than the whole window. So in this section I will be getting into some basic examples, and then maybe some not so basic examples of making a system to get element relative positions from event objects of mouse and pointer event handers.

### 2.1 - Basic get element relative position example

For this example I am attaching an event hander to a div element, and using the [inner html property](/2019/01/13/js-innerhtml/) as a way to create, and recreate a child div each time the parent div is clicked. For this example I am making sure to use the current target property rather than the target property to get a reference to the parent element. The reason why is because the target property might end up referring to the child element that I am creating for the inner html value of the parent element.

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

### 2.2 - Method to get an element relative position for mouse and touch events

Working out how to get an element rather than window relative mouse cursor position is one thing, but often I will want to get such a position for touch events also.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
        <style>
.parent{
  position:absolute;
  left:50px;
  top: 50px;
  padding:50px;
  width:540px;
  height:380px;
  background:gray;
}
        </style>
    </head>
    <body>
        <div class="parent" style="background:gray;"><div>
        <script>
 
// get pos object with values relative to the given event object, 
// and element that defaults to e.target by default
var getElementRelative = function (e, elTarget) {
    var el = elTarget || e.target,
    bx = el.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    return pos;
};
 
// pointer move
var pointerMove = function(e){
    var parent = e.currentTarget,
    bx = parent.getBoundingClientRect(),
    pos = getElementRelative(e, e.target);
    parent.innerText = pos.x + ', ' + pos.y;
};
 
var parent = document.querySelector('.parent');
parent.addEventListener('mousemove', pointerMove);
parent.addEventListener('touchmove', pointerMove);
        </script>
    </body>
</html>
```

### 2.3 - Canvas element example with mouse and touch events

One more example now this time I am getting the get element relative method to work well with canvas elements also.

```html
<html>
    <head>
        <title>javascript mouse get element relative</title>
    </head>
    <body>
        <canvas id="out" width="320" height="240" style="position:absolute;left:50px;top:50px;"><canvas>
        <script>
// canvas
var canvas = document.getElementById('out'),
ctx = canvas.getContext('2d');
// state object
var state = {
    down: false,
    x: 0,
    y: 0
};
// get pos object with values relative to the given event object, 
// and element that defaults to e.target by default
var getElementRelative = function (e, elTarget) {
    var el = elTarget || e.target,
    bx = el.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size if a canvas element
    if(el.nodeName === 'CANVAS'){
        pos.x = Math.floor((pos.x / el.scrollWidth) * el.width);
        pos.y = Math.floor((pos.y / el.scrollHeight) * el.height);
    }
    return pos;
};
// render to the canvas
var render = function (ctx, canvas, state) {
    var text = 'pos: (' + state.x + ',' + state.y + ' ); down: ' + state.down + ';';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText(text, 32, 32);
};
// set position helper
var setPos = function (state, e) {
    var pos = getElementRelative(e, e.currentTarget);
    state.x = pos.x;
    state.y = pos.y;
};
// attach events to canvas
var pointer = {
   start: function (e) {
        state.down = true;
        setPos(state, e);
        render(ctx, canvas, state);
    },
    move: function (e) {
        setPos(state, e);
        render(ctx, canvas, state);
    },
    end: function(e){
        state.down = false;
        setPos(state, e);
        render(ctx, canvas, state);
    }
}
// attaching for both mouse and touch events
canvas.addEventListener('mousedown', pointer.start);
canvas.addEventListener('mousemove', pointer.move);
canvas.addEventListener('mouseup', pointer.end);
canvas.addEventListener('touchstart', pointer.start);
canvas.addEventListener('touchmove', pointer.move);
canvas.addEventListener('touchend', pointer.end);
// render for first time
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