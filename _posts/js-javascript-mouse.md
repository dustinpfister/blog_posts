---
title: JavaScript mouse topics beyond just the events
date: 2020-06-25 11:44:00
tags: [js]
layout: post
categories: js
id: 671
updated: 2022-01-07 16:18:26
version: 1.104
---

In client side [javaScript mouse](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) events are a way to get a mouse cursor position as well as the state of one or more mouse buttons. The javaScript mouse events are a collection of several types of events that can be attached to the window object, or just about any html element with the [add event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) method.

There are three general event types of interest when working something out with mouse events that are [on mouse down](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousedown), [on mouse move](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousemove), and [on mouse up](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseup). There are other events of interest, such as [mouse out](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event) and [mouse over](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event) events, but for the most part I only bother with those first three events when working out any kind of user interface that will make use of a mouse if present.

Mouse events are not always the best way to go about making a truly universal input controller type module, or any kind of component of an application that has to do with user input, at least not by them selfs anyway. There are of course also touch events, and keyboard events that should be taken into consideration also when working on something to that effect. So then when it comes to working out an interface that will work with pointer devices in general it might be better to start out with pointer events actually. Pointer events are as the same suggests about pointers in general not just in terms of a mouse, but touch and pen devices also. There is then only bothering with mouse and touch events when it comes to making separate user interfaces for desktop and mobile devices.

However mouse events work great when it comes to attaching events that will allow for a great deal of control over what will happen for traditional desktop clients. When doing so it is impotent to be aware of how browsers simulate mouse events for touch scripts, and how to prevent that default behavior. It should also go without saying that one should also use touch events, and or pointer events as a fall back for mouse events to make a user interface work with all clients that will visit a page. In any case in this post I will be covering a great deal about mouse events, but also pointer events in general while I am at it.

<!-- more -->

## 1 - JavaScript mouse events basics

In this section I will be starting out with some simple examples of mouse events, and various other client side JavaScript features that will pop up while working with them.

The main element object and nice method to be aware of when it comes to attaching mouse events and events in general is the add event listener method. Each time I call the add event listener method I pass a string value for the desired event type I want to attach for, and then a function that will fire each time the event fires. Inside the body of this function I will have access to an event object that contains useful info about the event. For mouse events this event object contains information about where in the browser window the event happened, the mouse button that was clicked of any, and a reference to an element where it happened to name just a few features of interest with these event objects.

I will be trying my best to keep these examples as simple as possible but I still assume that you have at least some background with client side JavaScript. If not you might want to start out with some kind of getting started guide with JavaScript in general and embedding JavaScript into a page using script tags.

### - The source code examples in this post are on github

Like all my other posts on vanilla javaScript the source code examples in this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-mouse) on Github. This post is still very much a work in progress as there is still a lot to cover when it comes to working with a mouse in client side javaScript beyond just that of the very basics at least.

In the test vjs repository I have the latest source code examples, and other assets that may not always be included in the source code examples I embed into the content here. I also have my notes when it comes to future edits, and the Github repository would be a good place to make pull requests. There is also the comments section of this post that can be used to bring up something that is related to working with a mouse in client side javaScript.

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

Using the on click property of the window object, or any other node such as an element, can be thought of as the old, tired yet true way of doing this sort of thing. If for some reason you want to get your code to work on what are now very old web browsers you would want to do something like this. However for the most part I find myself just using the add event listener method as the method is well supported these days.

### 1.2 - Using addEventListener to attach an event to window

A more modern way of attaching [event listeners](/2019/01/16/js-event-listeners/) to the window object, as well as nodes in general including elements would be to use the add event listener method. One major improvement with this is that it can be used as a way to attach more than one hander. Although it may not be one of the oldest ways of going about performing event attachment, at this point it is only fairly old browsers that will result in code breaking changes.

Once again I am just stepping a count variable in the body of one event handler, but in this event handler I am using the [style API](/2019/02/12/js-javascript-style) as a way to change a CSS value for the div rather than just setting the value of a text node.

For this example I am just using the style api to change the background color of a div, but it can also be used to change any css value such as the left and top properties when using an absolute positioned div. 

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

On top of the click event there are also a number of other mouse events such as the mousedown event that will fire the very moment that a mouse button is clicked, and the mouseup button that will fire once a mouse button is released. There is also the mouse move method that will fire each time the mouse pointer location changes. 

On top of the additional events beyond that of just the click event there is also the [event object](/2020/07/23/js-event-object/) that is passed to a handler that contains a fair amount of data about the mouse event. For this example then I will be using the client x and client y properties to find the window relative position of the mouse cursor when these events happen.

In this example I am adding a state object that will be used to store an x and y value as well as a down boolean value. I then aim to mutate this state object's values with mouse events, and update a view for this state object each time an event happens.

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

When this example is up and running in the browser I end up with the current values of the state object being displayed. Moving the mouse around will result in the position being updated, and clicking the mouse button will change the value of the down boolean value.

### 1.4 - parent and child divs

Now for an example where I am starting to get into the whole parent and child element thing with mouse events. For this example I have a single parent div, and I am creating and injecting a whole bunch of child elements into this parent element. This time around I am attaching just a single event handler to the parent element, and I am using the target and current target properties of the event object to find out if I am dealing with a child element or not. 

In the event that I am dealing with a child element that was clicked I am giving just the child a new random position, else if I am clicking the parent element then I set new random positions for all the children of the parent element. So then this is just another example of what there is to work with when it comes to event objects in mouse events. I can get a window relative position, and I can get references to elements.

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

There may be additional ways of going about getting an element relative position, and also a whole bunch of other things that might come up when it comes to all kinds of related tasks that will branch off from this such as making methods that will work not just with mouse events but pointer events in general. So then in this section I will be getting into some basic examples, and then maybe some not so basic examples of making a system to get element relative positions from event objects of mouse and pointer event handlers.

### 2.1 - Basic get element relative position example

For this example I am attaching an event handler to a div element, and using the [inner html property](/2019/01/13/js-innerhtml/) as a way to create, and recreate a child div each time the parent div is clicked. For this example I am making sure to use the current target property rather than the target property to get a reference to the parent element. The reason why is because the target property might end up referring to the child element that I am creating for the inner html value of the parent element.

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

Working out how to get an element rather than window relative mouse cursor position is one thing, but often I will want to get such a position for touch events also. So then there is often a need to have some kind of simple helper method that will return an object with adjusted x and y values from a given event object from a mouse or touch event. If the event object is a mouse event I can just use clientX, and clientY, but if the event object is a touch event that makes things a little more involved. One major reason why is because when it comes to touch devices there is of course multi touch. So With a touch event I have to think more in terms of an array of objects where each object contains a clientX, and clientY value.

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

One more example now, this time I am getting the get element relative method to work well with canvas elements also. This will often require just one little adjustment that has to do with a weird issue when it comes to the scaled size of a canvas relative to the actual native size of the canvas. Aside from that the method seems to work well with canvas elements also when I made just one little revision to the source code of the get element relative method.

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

To start off with this section I am going to just have a very basic example of the on click event. For this one I just quickly put together a quick example that involves just using the click event with a div element and making it so that clicking the div element will toggle the background color by way of the style api.

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

So then the pointerType property is a good way to go about finding out if I am dealing with a mouse or a touch event when making an event handler that will be used with the click event.

### 3.3 - Prevent default and mousedown and touchstart events

The pointerType event is useful when it comes to finding out if I am dealing with a mouse or touch event in a click event. However sometimes I need to make some kind of system where I need to attach events for mouse down and touch start events, along with maybe additional events. The [default behavior with this kind of situation](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent) is that the touch start event will fire first, and then a mouse down event will fire. If for some reason I do not want this to happen the prevent default method would seem to work okay to suppress this.

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

So there is attaching a client event to the window object, but there is also attaching events to various other kinds of elements such as an input element. For this example I am attaching an event handler to an input element that is a button type input element. When it comes to input elements it is often the value property of the input element that is of interest. When it comes to button input elements the value property is the display value of the button. So in this example I am attaching an event handler to an input element that will update the display value of the button each time it is clicked with the value of a count variable.

In this example I am using the target property of the event object to get a reference to the button that was clicked rather than by some other means. One reason why is because I am making my event handler a stand alone function and then passing a reference to that function for more than one call of the add event listener method. Inside the body of an event handler the target property will be a reference to the element where the event has happened. There is also the current target property that is the current element to which the event element is firing, but that is something that I will be getting more into in a later example.

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

There are a few things to be aware of when it comes to mouse buttons when working with mouse events, and also taking into account accessibility with touch events still. For example there is often both a left and right click mouse button, but there is also a center click as well as a scroll wheel of a mouse typicality. Also there may be a few more buttons on a mouse such as a back and forward button, and even more buttons in some cases.

However there is also the fact that a lot of people that visit a web application might be using the application from a touch screen. So for example there should also be ways of simulating a right click, or at least giving a way to do the same action as a right click.

There is also the question of the context menu that will pop up on a right click and how to stop that from happening when it comes to working with mouse buttons. With that said in this section I will be going over a few quick examples of working with buttons in client side javaScript.

### 4.1 - Basic mouse buttons example

The [buttons property of the mouse event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button) object that is passed via events such as the mouse down event will give a number value that can be used as a way to know the button that was clicked on a mouse. There are a few things to be aware of when it comes to getting a right click to work the way a client side javaScript developer would typically like to get it to work but for now I am going to assume that you just care about knowing if it is a left or center click.

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

The value of the button property should be a number with a value from 0 to 4 for up to five buttons on a mouse that was pressed. A value of 0 should mean the left click button of the mouse, while a value of 2 on the other hand will be a right click actually. So then a value of 1 will refer to a center click, or scroll wheel click if you prefer. The values of 3 and 4 will refer to the back and forward buttons that are present on many mouses these days. That is about it as far as I know, it might be possible to find a way to work with even more buttons that might be on some kinds of mice that people might use, however there is mainly thinning just in terms of what there is to work with for most people using desktop systems. When it comes to using the track pad of a laptop often there is only a right and left click and that is all.

### 4.2 - Stop the context menu from showing up on a right click

There is one thing to be aware of when it comes to the subject of mouse events and right clicking and that is of course the context menu. By default when I right click a web page in a web browser I get a context menu that gives me some options such as viewing the source code of the web page, or saving an image in the page as a file on my local file system. That is all fine and good, but in some cases I might not want that to happen for a web application so there [should be a way to stop the context menu from showing up](https://stackoverflow.com/a/381848/2057445).

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

There might be even more to write about when it comes to additional logic that will define what to do for a application when the user right clicks a location on a canvas, or use one of the other buttons that there may be there to work with. However that of course will depend on the application that is being used.

## 5 - Get elements by mouse position

When it comes to getting one or more elements from a mouse position there are a range of ways of going about doing so. When it comes to events such as the click event there is just using the target property of the event object. However things might prove to be a little more involved when I just want to get the top most element from a given window relative position, or get not just one element but all elements that might overlap at a given point. So then in this section I thought I would go over a few examples that have to do with getting one or more element references from a given window relative position or point if you prefer.

### 5.1 - Just using the on click event and the target property of the event object

As I have mentioned in previous examples the target property of an event object is the original element at which an event has happened. So then one way of going about getting an element by way of a window relative position would be to just attach a click event to the window object and then just look at the target property of the event object.

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

One drawback of this solution as well as with the basic one that I started this section off with is that I can not get more than one element that may be at the same location all the way down to the body element. In that kind of situation I would need to make some kind of solution that involves filtering through all the elements performing bounding box collection for each maybe.

### 5.3 - Get all elements at a position

There is also a document method that can be used to get all elements at a given window relative position. So just like that of the document get element from point method, there is also a document get elements from point method. One cool thing about this method is that it will return a plain old array when it comes to the collection of elements that are found overlapping at the given point. It is then just a matter of looping over the nodes and doing whatever is necessary to filter, or perform some checks to make sure that I am just performing a desired action with the nodes that I actually want to work with at the given point in the browser window.

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

Like always I have to start out a section like this with a kind of hello world style example so then here it is. To make use of this event I just need to use the add event listener method and attach for the wheel event. Inside the body of the event handler there is the deltaY value that can be used to apply as a delta value for a variable.

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

### 6.2 - Disabling scrolling in a mouse wheel event

One will want to take care when trying to [disable page scrolling when using mouse wheel events](https://stackoverflow.com/questions/25909341/disable-mouse-wheel-to-scroll-up-or-down). Thinking from a user experience perspective for a moment I would not want to disabled page scrolling by way of a mouse wheel for the page as a whole, at least nit in mouse use case examples of the mouse wheel event. However I would often want to disable it when the user hovers their mouse over a canvas element, division, or any other kind of element to which I am attaching an event hander for the mouse wheel event.

I have run into problems when it comes to trying to disable page scrolling my way of a hander that is attached to the window object. However when it comes to attaching a hander to an element, and just using the prevent default method in the handler that seems to produce a desired end result.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div><br><br></div>
        <div id="out" style="width:600px;height:440px;outline:1px solid #000000;padding:20px;">0</div>
        <div style="height:1000px;width:100px;background:gray;"></div>
        <script>
var y = 0,
out = document.getElementById('out');
// attaching to the out div
out.addEventListener('wheel', function(e){
    e.preventDefault();
    y += e.deltaY;
    out.innerText = y;
    return;
});
        </script>
    </body>
</html>
```

### 6.3 - Full screen trick using css

So then there is the idea of having a way to switch between a full screen mode of sorts as well as a window mode. What makes things a little involved is that when I switch to full screen mode I can do something like set a container div to absolute, or fixed positing and adjust the width and hight of the container. However when doing so the page content will still case scroll bars to appear on the side of the browser window. If I just care about the mouse wheel and that is all then maybe this is not a problem, but when it comes to taking into account other ways of scrolling and so forth I should have a way to disable the page content when the container div is in this full screen mode of sorts.

There may be a number of ways of gong about setting up the kind of system that I have in mind for having a mouse wheel event and various other events attached to a container div that is can then be changed by some kind of action made by the user. That is that having the mouse wheel event work the way that I want it to when the container is in window mode as well as full screen mode, and for the content of the page to not be displayed when the container is in full screen mode. However for this example at least I am going to just start out with something fairly simple that might prove to just be a decent starting point for this sort of thing, by just using a little CSS.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
        <style>
.app{
  display: block;outline:1px solid #000000;background:gray;
}
.app-full{
  position:absolute;top:0px;left:0px;width:100%;height:100%;
}
.app-window{
  position:relative;width:640px;height:480px;
}
.page-content{
  height:1000px;width:100px;background:gray;
}
.page-content-active{
  display:block;
}
.page-content-inactive{
  display:none;
}
        </style>
    </head>
    <body>
        <div><br><br></div>
        <div id="out" class="app app-window" >0</div>
        <div class="page-content page-content-active" style=""></div>
        <script>
var y = 0,
full = false,
div_content = document.querySelector('.page-content')
out = document.getElementById('out');
// attaching to the out div
out.addEventListener('wheel', function(e){
    e.preventDefault();
    y += e.deltaY;
    out.innerText = y;
    return;
});
out.addEventListener('click', function(e){
    full = !full;
    var div = e.target;
    if(full){
        div.className = 'app app-full';
        div_content.className = 'page-content page-content-inactive';
    }else{
        div.className = 'app app-window';
        div_content.className = 'page-content page-content-active';
    }
});
        </script>
    </body>
</html>
```

So then this is the basic idea that I more or less have in mind that seems to work okay thus far. Now there is just the question of how to go about making this into something that will work in any page. Such a solution might have to involve a fair amount of code to run threw the page content setting the display css prop of all page content to none, accept for of course the container div. Then it would have to set all of the display properties back to what they where when it comes to going back to the window mode. However there might prove to be another solution that is less complex, and well supported in browsers these days, such an option might be to look into the [full screen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).

## 7 - Pointer events to work with mouse and touch events

Another option when it comes to working with a mouse, as well as pointer devices in general actually would be to use [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) in place of mouse and or touch events only. these kinds of events are then another way to work with a mouse in client side javaScript, any might also prove to be a good starting point when it comes to the concern that arise when it comes to making web applications that will not just work with a mouse only, which is a big mistake these days to say the least.

One downside of using these events is that I will not have access to the widest range of values and features to work with compared to the mouse events when it comes to things like what button was clicked and so forth. Also when it comes to touch events I do not see touch arrays in the event objects, so I can not do anything with multi touch. However most of the time when I make a project that will use the mouse and also work with touch devices I do not really do much if anything with these advanced features to work with actually so these pointer events more often than not will work fine.

### 7.1 - Basic pointer event example using the pointer down event

For this example I am starting this section off with an example where I am just attaching a pointer down event to the window object. This is an event that will fire whenever a pointer device will be in what is called active buttons state. This active button state is a state in which a mouse button on a mouse is pressed down, or when a touch screen is touched by one or more digits.

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

## 8 - Simulation of mouse events

I will often be in a situation in which I would want to simulate a client event by way of some javaScript code rather than by actually using my mouse. So then in this section I will be going over a few examples that have to do with simulating mouse events using javaScript. When it comes to element object references there is a [click method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click) that can be called that will work well enough in most cases when I just want to simulate a client event at an element, and I do not care about various details. However another way is by creating a custom event object and then passing that event object to the [dispatch event method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) of an element object reference which is a great way to go about simulating all kind of events in general beyond just that of mouse events.

### 8.1 - basic example just using the client method

For this example I just have an event handler attached to the window object that will step a count when clicked. I am then just calling the click method off of the body element by way of the reference attached to the document object.

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
// the click method of an element object can be used to perform a click
document.body.click();
        </script>
    </body>
</html>
```

### 8.2 - Using the dispatch event method

For this example I am using the dispatch event method rather than just the click method. In order to use the dispatch event method I must have an event object to pass as an argument n for the method. So then I first need to create an event object, and set the properties that I want for the object.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div id="out">0<div>
        <script>
var simClickFor = function(el, x, y){
    el = el || document.body;
    var event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x === undefined ? 0 : x,
        clientY: y === undefined ? 0 : y
    });
    el.dispatchEvent(event);
};
// hander on window
window.onclick = function(e){
    document.getElementById('out').innerText = e.clientX + ',' + e.clientY;
};
// simulating a click with position
simClickFor(document.body, 37, 8);
 
        </script>
    </body>
</html>
```

### 8.3 - Simulating a mouse move event

If I can simulate a click event, and also set a position as to where the click happened then I should be able to do the same for other mouse events such as a mouse move event also. With that said in this example I am looking into simulating a mouse move event, to do so I just need to change a few tings with the same code that I worked out for simulating a click. The event name that I need to give to the Mose Event constructor is just mousemove rather than click, I then need to set up at least one event hander for a mouse move event rather than just for the click event, and that is about it.

With this example I also took a moment to use the style api to change the position of a fixed position div that is also updated in the body of the event hander that I am attaching for a mouse move event. I also added a loop that makes used of the setTimeout method to call my simulate mouse helper over and over again in a loop function. The result is then a circular motion being simulated with the mouse move event.

```html
<html>
    <head>
        <title>javaScript mouse basic example</title>
    </head>
    <body>
        <div id="div_pos" style="position:fixed;width:32px;height:32px;background:rgba(0,255,0,0.5);"></div>
        <div id="out">0<div>
        <script>
var simMouseFor = function(el, x, y){
    el = el || document.body;
    var event = new MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x === undefined ? 0 : x,
        clientY: y === undefined ? 0 : y
    });
    el.dispatchEvent(event);
};
// hander on window
window.addEventListener('mousemove', function(e){
    document.getElementById('out').innerText = e.clientX + ',' + e.clientY;
    var div = document.getElementById('div_pos');
    div.style.left = e.clientX + 'px';
    div.style.top = e.clientY + 'px';
});
// simulating a mouse move with position
var i = 0,
iMax = 100;
var loop = function(){
    setTimeout(loop, 100);
    var a = Math.PI * 2 * (i / iMax),
    x = 50 + Math.cos(a) * 50,
    y = 50 + Math.sin(a) * 50;
    simMouseFor(document.body, x, y);
    i += 1;
    i %= iMax;
};
loop();
 
        </script>
    </body>
</html>
```

## 9 - Using both mouse and touch events rather than pointer events

Using pointer events might be great as a starting point for user interface design, however often I might want to make a user interface where there is logic that will work just for mouse events, and then completely separate logic for touch events. For example I might want to work out a whole lot of code that will work well with multi touch, and then other code that will make use of mouse features such as a right click button. So then in this section I will be exploring how to go about getting started with this kind of system when it comes to working with a mouse, as well as touch events in a client side web application.

For more on the subject of touch events in detail you might want to check out my post on the subject of [touch events in client side javaScript](/2019/02/13/js-touch-events/).

### 9.1 - A starting point using touch start and mouse down events

For this example I am starting out with a system that uses touch start events to create an object pool by way of multi touch. That is that when I touch the screen I will get an object for each touch point on the surface of the canvas. In the event of a mouse down event I will create a new pool with just one object, but only for a mouse down event in which the left click button is pressed. Allowing me to use center and right click events to push as many objects as I want to the pool.

```html
<html>
    <head>
        <title>js mouse and touch events</title>
        <style>
        </style>
    </head>
    <body>
        <div id="canvas-app"><div>
        <script>
// HELPERS
var getElRel = function(el, clientX, clientY){
    var bx = el.getBoundingClientRect();
    return  {
      x : clientX - bx.left,
      y : clientY - bx.top
    };
}
// DRAW
var draw = {};
draw.back = function(ctx, canvas, sm){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
}
draw.pool = function(ctx, canvas, sm){
    draw.back(ctx, canvas, sm);
    sm.pool.forEach(function(obj){
       ctx.beginPath();
       ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2)
       ctx.fillStyle = obj.fillStyle || 'lime';
       ctx.fill();
       ctx.stroke();
    })
};
// CANVAS SETUP
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
container.appendChild(canvas);
// STATE
var sm = {
  canvas: canvas,
  ctx: ctx,
  pool: []
};
// WHAT TO DO FOR A TOUCH START EVENT
var touchStart = function(e){
    // create pool of objects from touch array
    sm.pool = [].map.call(e.touches, function(touch){
        var obj = getElRel(e.target, touch.clientX, touch.clientY);
        obj.r = 64;
        return obj;
    });
    // draw pool
    draw.pool(ctx, canvas, sm);
    // e.preventDefault will suppress an additional mouse down event
    // that will fire if not suppresses
    e.preventDefault();
};
var mouseDown = function(e){
    var obj = getElRel(e.target, e.clientX, e.clientY);
    obj.r = 64;
    obj.fillStyle = 'red';
    // if left click start a new pool
    if(e.button === 0){
        obj.fillStyle = 'cyan';
        sm.pool = [];
    }
    sm.pool.push(obj);
    // draw pool
    draw.pool(ctx, canvas, sm);
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
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('contextmenu', oncontext);
// draw for first time
draw.back(ctx, canvas, sm);
        </script>
    </body>
</html>
```

## 10 - Conclusion

So hopefully this post has helped you gain some basic insight into how to get going with a mouse when making a user interface with javaScript. However there is much more to learn and be aware of when it comes to using mouse events, as well as other events such as touch events, and keyboard events. This post does not outline a fully comprehensive input controller module or project or sorts after all as the focus here is just on things that have to do with working with the mouse.

When it comes to working out some kind of project that will work as something that will parse input from an array or sources I made a [canvas example post that is an input controller of sorts](/2020/04/17/canvas-example-input-controller/). This canvas example is one of many such canvas examples that I am working on a little now and then that serve as real projects examples of sorts. So for more on mouse events as well as many other related topics you might want to check that post out.
