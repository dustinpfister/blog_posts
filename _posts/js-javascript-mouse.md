---
title: JavaScript mouse topics beyond just the events
date: 2020-06-25 11:44:00
tags: [js]
layout: post
categories: js
id: 671
updated: 2021-11-02 12:27:15
version: 1.77
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
        <title>js mouse basic example</title>
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
        <title>js mouse basic example</title>
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

### 1.4 - parent and child divs

Now for an example where I am really starting to get into the whole parent and child element with with mouse events. For this example I have a single parent div, and I am creating and injecting a whole bunch of child elements into this parent element. This time around I am attaching just a single event hander to the parent element, and I am using the target and current target properties of the event object to find out if I am dealing with a child element or not. In the event that I am dealing with a child element that was clicked I am giving just the child a new random position, else if I am clicking the parent element then I set new random positions for all the children of the parent element.

```html
<html>
    <head>
        <title>js mouse basic example</title>
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

So one thing that might come up right away is that the position that is obtained from the clientX, and clientY properties might not always be what one might expect. The values are always going to be relative to the start of the browser window rather than an element in that window. So then there is a need to find a way to get a position that is relative to a specific element, rather than that of the window.

One way to go about resolving the issue of the position not being relative to an element rather than the window the get [bounding client rect method](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the target element of the event object can be used to get the position of the element in the window. These values can then be used to get a position that is relative to the element rather than the whole window by subtracting values in the object that is returned from the clientX, and clientY values. 

There may be additional ways of going about getting an element relative position, and also a whole bunch of other things that might come up when it comes to all kinds of related tasks that will branch off from this such as making methods that will work not just with mouse events but pointer events in general. So then in this section I will be getting into some basic examples, and then maybe some not so basic examples of making a system to get element relative positions from event objects of mouse and pointer event handers.

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

Working out how to get an element rather than window relative mouse cursor position is one thing, but often I will want to get such a position for touch events also. So then there is often a need to have some kind of simple helper method that will return an object with adjusted x and y values from a given event object from a mouse or touch event. If the event object is a mouse event I can just use clientX, and clientY, but if the event object is a touch event that makes things a little more involved. One major reason why is the because when it comes to touch devices there is of course muti touch. So With a touch event I have not think more in terms of an array of objects where each object contains a clientX, and clientY value.

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

One more example now this time I am getting the get element relative method to work well with canvas elements also. This will often require just one little adjustment that has to do with a weird issue when it comes to the scaled size of a canvas relative to the actual native size of the canvas. Aside from that the method seems to work well with canvas elements also when I made just one little revision to the source code of the get element relative method.

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

The [on click event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick) can be thought of as a mouse event in the sense that the name is click rather than touch. However the on [click event is actually an event that will fire for both mouse and touch events](https://stackoverflow.com/questions/37273142/would-onclick-event-work-on-touch-on-touch-screen-devices/37273344). This might not always be a problem if this is of course the behavior that you want when making an interface, however if I am making an interface where I want separate logic to fire for mouse events from that of touch events then it is a problem.

### 3.1 - A basic on click event example

So start off with this section I am going to just have a very basic example of the on click event. For this one I just quickly put together a quick example that involves just using the click event with a div element and making it so that clicking the div element will toggle the background color by way of the style api.

```html
<html>
    <head>
        <title>js mouse onclick example</title>
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

One major thing about the click event is that on systems that support both a mouse, as well as a touch screen the click event will fire for both a mouse click as well as a touch of the touch screen surface. In many cases in which I use the on click event this is not a problem as that is the kind of behavior that I want. However in some cases this is not what I want to happen, and I want to have separate code that will run just for a mouse click, and just for a touch "click" if I can call it such for a moment. So now that I have a basic example of the on click event out of the way I should now get into at least a few more examples that have to do with the click event and I kind of virtue click event.

### 3.2 - The type and pointerType properties of a click event

If I want to find out if I am dealing with a mouse click or a touch "click" if it can be called such, one way to do so would be to use the pointerType property of the event object for the click event handler. This should not be confused with the type property of the event object as that is the type of event which in this case is a click event.

```html
<html>
    <head>
        <title>js mouse onclick example</title>
    </head>
    <body>
        <div id="out" style="width:200px;height:200px;background:gray;padding:20px;"><div>
        <script>
var out = document.getElementById('out');
var state = {
    disp: 'Click or touch here',
    color: 'gray'
};
var render = function (state) {
    out.innerText = state.disp;
    out.style.background = state.color;;
};
 
var handler = function(e){
    console.log(e.type); // 'click'
    state.disp = e.pointerType;
    state.color = 'lime';
    if(e.pointerType === 'touch'){
       state.color = 'blue';
    }
    state.on = !state.on;
    render(state);
};
 
out.addEventListener('click', handler);
 
render(state);
        </script>
    </body>
</html>
```

So then the pointerType property is a good way to go about finding out if I am dealing with a mouse or a touch event when making an event hander that will be used with the click event.

### 3.3 - Prevent default and mousedown and touchstart events

The pointerType event is useful when it comes to finding out if I am dealing with a mouse or touch event in a on click event. However some times I need to make some kind of system where I need to attach events for mouse down and touch start events, along with maybe additional events. The [default behavior with this kind of situation](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent) is that the touch start event will fire first, and then a mouse down event will fire. If for some reason I do not want this to happen the prevent default method would seem to work okay to suppress this.

```html
<html>
    <head>
        <title>js mouse onclick example</title>
    </head>
    <body>
        <div id="out" style="width:200px;height:200px;background:gray;padding:20px;"><div>
        <script>
var out = document.getElementById('out');
var state = {
    on: false
};
var render = function (state) {
    out.innerText = 'on: ' + state.on;
    out.style.background = state.on ? 'green': 'red';
};
var handler = function(e){
    console.log(e.type);
    // e.preventDefault will suppress an additional mousedown when 
    e.preventDefault();
    state.on = !state.on;
    render(state);
};
out.addEventListener('touchstart', handler);
out.addEventListener('mousedown', handler);
render(state);
        </script>
    </body>
</html>
```

### 3.4 - Input elements and the on click event

So there is attaching a client event to the window object, but there is also attaching events to various other kinds of elements such as an input element. For this example I am attaching an event handler to an input element that is a button type input element. When it comes to input elements it is often the value property of the input element that is of interest. When it comes to button input elements the value property is the display value of the button. So in this example I am attaching and event hander to an input element that will update the display value of the button each time it is clicked with the value of a count variable.

In this example I am using the target property of the event object to get a reference to the button that was clicked rather than by some other means. One reason why is because I am making my event hander a stand alone function and then passing a reference to that function for more than one call of the add event listener method. Inside the body of an event hander the target property will be a reference to the element where the event has happened. There is also the current target property that is the current element to which the event element is firing, but that is something that I will be getting more into in a later example.

In this example I am also using the [parseInt method](/2019/05/15/js-parseint) as a way to make sure what might be a string value of a number is converted to a number. I am also making use of html data attributes as a way to store a count value for each element.

```html
<html>
    <head>
        <title>js mouse basic example</title>
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

### 3.5 - Simulate a on click event

While I am at it I think I should have at least one example in this section that involves simulating a click event. For this kind of thing there is a click method of an element object reference that can be called as a way to simulate a click event. So then for this example I am using that method as a way to do so. So then in this example there is clicking one of the input elements to step a count value in the data attribute of the input element, and also the event of doing so is being simulated in a function that is being called every second thanks to the [setInterval method](/2018/03/08/js-setinterval/).

```html
<html>
    <head>
        <title>js mouse onclick example</title>
    </head>
    <body>
        <input class="c_button" data-count="0" type="button" value="count: 0"><br><br>
        <input class="c_button" data-count="0" type="button" value="count: 0"><br><br>
        <script>
// step button handler
var stepButton = function(e){
    var button = e.target,
    count = parseInt(button.dataset.count);
    e.target.value = 'count: ' + ( button.dataset.count =  count += 1 );
};
// attach handler to input elements
var buttons = document.querySelectorAll('.c_button');
[].forEach.call(buttons, function(button){
    button.addEventListener('click', stepButton);
});
// simulate a click for button 1 event 1000ms
setInterval(function(){
    buttons[1].click();
}, 1000);
        </script>
    </body>
</html>
```

## 4 - Mouse buttons

There are a few things to be aware of when it comes to mouse buttons when working with mouse events, and also taking into account accessibility with touch events still. For example there is often both at least a left and right click mouse button, but often there is also a center click as well as scroll wheel of a mouse. Also there may be a few more buttons on a mouse such as a back and forward button, and even more buttons in some cases.

However there is also the fact that a lot of people that visit a web application might be using the application from a touch screen. So the for example there should also be ways of simulating a right click, or at least giving a way to do the same action as a right click.

There is also the question of the context menu that will pop up on a right click and how to stop that from happening when it comes to working with mouse buttons. With that said in this section I will be going over a few quick examples of working with buttons in client side javaScript.

### 4.1 - Basic mouse buttons example

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

### 4.2 - Stop the context menu from showing up on a right click

There is one think to be aware of when it comes to the subject of mouse events and right clicking and that is of course the context menu. By default when I right click a web page in a web browser I get a context menu that gives me some options such as viewing the source code of the web page, or saving an image in the page as a file on my local file system. That is all fine and good, but in some cases I might not want that to happen for a web application so there [should be a way to shop the context menu from showing up](https://stackoverflow.com/a/381848/2057445).

The way that I have found to do this is to not just make use of the mouse down and touch start events, but also the [on context menu event](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event). The main thing to do in a handler for this on context event is to call the prevent default method, however there are some additional things that I might also want to do on top of that when it comes to how things work on various other browsers.

```html
<html>
    <head>
        <title>javascript mouse buttons example</title>
    </head>
    <body>
        <div id="out" style="width:240px;height:240px;background:gray;"><div>
        <script>
var out = document.getElementById('out');
// render to the div
var render = function (button) {
    out.innerText = 'button: ' + button;
};
// for a pointer down event handler to be used with
// touchstart and mousedown events.
// button# 0:left click, 1:center click, 2:right click, -1: touch
var pointerdown = function(e){
    console.log(e);
    if(e.type === 'touchstart'){
        render(-1);
    }else{
        render(e.button);
    }
};
// on context event handler
var oncontext = function(e){
    e.preventDefault();
    if (event.stopPropagation){
        event.stopPropagation();
    }
    event.cancelBubble = true;
    //render(e.button);
    return false;
};
out.addEventListener('touchstart', pointerdown);
out.addEventListener('mousedown', pointerdown);
out.addEventListener('contextmenu', oncontext);
        </script>
    </body>
</html>
```

## 5 - Get elements by mouse position

When it comes to getting one or more elements from a mouse position there are a range of ways of going about doing so. When it comes to events such as the click event there is just using the target property of th event object. However things might prove to be a little more involved when I just want to get the top most element from a given window relative position, or get not just one element but all elements that might overlap at a given point. So then in this section I thought I would go over a few examples that have to do with getting one or more element references from a given window relative position or point if you prefer.

### 5.1 - Just using the on click event and the target property of the event object

As I have mentioned in previous examples the target property of an event object is the original element at which an event has happened. So then one way of going about getting an element by way of a window relative position would be to just attach a o client event to the window object and then just look at the target property of the event object.

```html
<html>
    <head>
        <title>javascript mouse example</title>
        <style>
div{
  position:relative;
}
.parent{
  width:640px;height:480px;background:gray;top:20px;
}
.child{
  position:absolute;width:128px;height:128px;background:lime;
}
        </style>
    </head>
    <body>
        <div id="disp_node">0,0</div>
        <div class="parent">
            <div class="child" style="left:50px;top:20px;"></div>
            <div class="child" style="left:85px;top:40px;"></div>
            <div class="child" style="left:235px;top:240px;"></div>
        <div>
        <script>
var colors = ['red', 'lime', 'blue', 'gray'],
dispNode = document.getElementById('disp_node');
var cycleColor = function(node){
    colorIndex = node.dataset.colorIndex === undefined ? -1 : parseInt(node.dataset.colorIndex);
    colorIndex += 1;
    colorIndex %= colors.length;
    node.dataset.colorIndex = colorIndex;
    node.style.background = colors[colorIndex];
};
window.addEventListener('click', function(e){
    var node = e.target;
    dispNode.innerText = e.clientX + ',' + e.clientY;
    cycleColor(node);
});
        </script>
    </body>
</html>
```

### 5.2 - The Document.elementFromPoint method

Another tool in the tool box that has to do with getting an element reference by way of a window relative point would be to use the [document.elementFromPoint](https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint) method to do so. This method can just be called from anywhere and then I just need to pass the x and y value at which I would like to get the top most element at that location.

```html
<html>
    <head>
        <title>javascript mouse example</title>
        <style>
div{
  position:relative;
}
.parent{
  width:640px;height:480px;background:gray;top:20px;
}
.child{
  position:absolute;width:128px;height:128px;background:lime;
}
        </style>
    </head>
    <body>
        <div id="disp_node">0,0</div>
        <div class="parent">
            <div class="child" style="left:50px;top:20px;"></div>
            <div class="child" style="left:85px;top:40px;"></div>
            <div class="child" style="left:235px;top:240px;"></div>
        <div>
        <script>
var colors = ['red', 'lime', 'blue', 'gray'],
dispNode = document.getElementById('disp_node');
var cycleColor = function(node){
    colorIndex = node.dataset.colorIndex === undefined ? -1 : parseInt(node.dataset.colorIndex);
    colorIndex += 1;
    colorIndex %= colors.length;
    node.dataset.colorIndex = colorIndex;
    node.style.background = colors[colorIndex];
};
 
var setAt = function(x, y){
    var node = document.elementFromPoint(x, y);
    dispNode.innerText = x + ',' + y;
    cycleColor(node);
};
 
setAt(100, 75);
 
        </script>
    </body>
</html>
```

One draw back of this solution as well as with the basic one that I started this section off with is that I can not get more than one element that my be at the same location all the way down to the body element. In that kind of situation I would need to make some kind of solution that involves filtering threw all the elements preforming bounding box collection for each maybe.

### 5.3 - Get all elements at a position

There is also a document method that can be used to get all elements at a given window relative position.

```html
<html>
    <head>
        <title>javascript mouse example</title>
        <style>
div{
  position:relative;
}
.parent{
  width:640px;height:480px;background:gray;top:20px;
}
.child{
  position:absolute;width:128px;height:128px;background:lime;
}
        </style>
    </head>
    <body>
        <div id="disp_node">0,0</div>
        <div class="parent">
            <div class="child" style="left:50px;top:20px;"></div>
            <div class="child" style="left:85px;top:40px;"></div>
            <div class="child" style="left:235px;top:240px;"></div>
        <div>
        <script>
var colors = ['red', 'lime', 'blue', 'gray'],
dispNode = document.getElementById('disp_node');
var cycleColor = function(node){
    colorIndex = node.dataset.colorIndex === undefined ? -1 : parseInt(node.dataset.colorIndex);
    colorIndex += 1;
    colorIndex %= colors.length;
    node.dataset.colorIndex = colorIndex;
    node.style.background = colors[colorIndex];
};
 
var setAt = function(x, y){
    var nodeCollection = document.elementsFromPoint(x, y);
    dispNode.innerText = x + ',' + y;
    console.log(nodeCollection)
    nodeCollection.forEach(function(node){
        console.log(node.nodeName);
        if(node.nodeName === 'DIV' && node.className === 'child'){
            console.log(node);
            cycleColor(node);
        }
    });
};
 
setAt(180, 105);
 
        </script>
    </body>
</html>
```

## 6 - The mouse wheel

On top of that of buttons a mouse often has a scroll wheel also, and with that said yes there is a [wheel event](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event) than can be used to attach some logic that will run each time the mouse wheel moves. So then I have started this section as a place to park at least one if not more examples making use of this event as a way to do something with the mouse wheel.

### 6.1 - Basic mouse wheel example

Like always I have to start out a section like this with a kind of hello world style example so then here it is. Do make use of this event I just need to use the add event listener method and attach for the wheel event. The inside the body of the event hander there is the deltaY value that can be used to apply as a delta value for a variable.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div id="out">0<div>
        <script>
var y = 0,
out = document.getElementById('out');
window.addEventListener('wheel', function(e){
    y += e.deltaY;
    out.innerText = y;
});
        </script>
    </body>
</html>
```

## 7 - Pointer events to work with mouse and touch events

Another option when it comes to working with a mouse, as well as pointer devices in general actually would be to use [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) in place of mouse and or touch events only. these kinds of events are then another way to work with a mouse in client side javaScript, any might also prove to be a good starting point when it comes to the concern that arise when it comes to making web applications that will not just work with a mouse only, which is a big mistake these days to say the least.

One down side of using these events is that I will not have access to the widest range of values and features to work with compared to the mouse events when it comes to things like what button was clicked and so forth. Also when it comes to touch events I do not see touch arrays in the event objects, so I can not do anything with multi touch. However most of the time when I make a project that will use the mouse and also work with touch devices I do not really do much if anything with these advanced features to work with actually so thee pointer events more often than not will work fine.

### 7.1 - Basic pointer event example using the pointer down event

For this example I am starring this section off with an example where I am just attaching a pointer down event to the window object. This is an event that will fire whenever a pointer device will be in what is called active buttons state. This active buttons state is a state in which a mouse button on a mouse was pressed down, or when a touch screen is touched by one or more digits.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div id="out" data-count="0" style="background:gray;width:200px;height:200px;padding:20px;">0<div>
        <script>
window.addEventListener('pointerdown', function(e){
    var node = e.target;
    if(node.dataset.count){
        var c = parseInt(node.dataset.count);
        c+= 1;
        node.dataset.count = c;
        node.innerText = c;
    }
});
        </script>
    </body>
</html>
```

So when I open up this example in my browser the count will step when I left client the div, but also when I click any other button also. When it comes to using a touch device to touch a div that two seems to work as expected by causing the count to step forward.

### 7.2 - Pointer id and type

There is then the pointer id and the type of the pointer in the event object that will often be of interest when it comes to working with these kinds of events.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div id="out" style="background:gray;width:200px;height:200px;padding:20px;"></div>
        <div id="disp"></div>
        <script>
var out = document.getElementById('out');
disp = document.getElementById('disp');
out.addEventListener('pointerdown', function(e){
    var node = e.target;
    disp.innerText = e.pointerId + ' : ' + e.pointerType + ' ( ' + e.clientX + ',' + e.clientY + ')';
});
        </script>
    </body>
</html>
```

### 7.3 - On pointer move event and the touch action css property

The pointer move event then works just fine when it comes to using a mouse as I get more or less the same effect as I have come to expect from the mouse move event. However when it comes to using the pointer move event for the first time you might run into [a problem compared to the touch move event when the pointer device is a touch device](https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not) rather than a mouse. One way to address this problem would be to use the [touch action css property](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) and be sure to set it to none for the node that one is attaching to for the pointer move event.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
        <style>
#out{
  touch-action: none;
  position:absolute;left:50px;top:20px;background:gray;width:200px;height:200px;padding:20px;
}
        </style>
    </head>
    <body>
        <div id="out"></div>
        <script>
var out = document.getElementById('out');
out.addEventListener('pointermove', function(e){
    var node = e.target,
    bx = node.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
    out.innerText = '( ' + x + ',' + y + ')';
});
        </script>
    </body>
</html>
```

## 8 - Conclusion

So hopefully this post has helped you gain some basic insight into how to get going with a mouse when making a user interface with javaScript. However there is much more to learn and be aware of when it comes to using mouse events, as well as other events such as touch events, and keyboard events. This post does not outline a fully comprehensive input controller module or project or sorts after all as the focus here is just on things that have to do with working with the mouse.

When it comes to working out some kind of project that will work as something that will parse input from an array or sources I made a [canvas example post that is an input controller of sorts](/2020/04/17/canvas-example-input-controller/). This canvas example is one of many such canvas examples that I am working on a little now and then that serve as real projects examples of sorts. So for more on mouse events as well as many other related topics you might want to check that post out.