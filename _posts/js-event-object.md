---
title: Event Objects in client side javaScript
date: 2020-07-23 12:11:00
tags: [js]
layout: post
categories: js
id: 686
updated: 2021-08-30 12:41:40
version: 1.30
---

This post will be on the ins and outs of [event objects](https://developer.mozilla.org/en-US/docs/Web/API/Event) in client side javaScript. There are several properties and methods that are of key interest many others such as the [target property](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) that is a reference to the element where the event happened. There are also a number of methods that are of interest also such as the [prevent default](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) method that will stop default browser behavior for certain types of events like mouse and touch events. 

I forget about things like prevent default now and then, so maybe writing a lengthly post about that and the event object in general will help me to remember better. There is also a great deal to cover when it comes to these events objects, such as the fact that the properties and methods will differ a little from kind of event to another. There are also some advanced topics that come up when it comes to working with these objects, such as creating them with javaScript code and using them to simulate an event by way of a script.

<!-- more -->

## 1 - Some Basic event object examples in client side javaScript

When I add [an event listener](/2019/01/16/js-event-listeners/) to an element with the addEventListner method, or one of the many element properties such as the on click property, I have to give a callback method that will fire each time that event happens. In this callback method the first argument will be a reference to an event object. This event objects has many useful properties and methods that can the be used in the body of this callback function. 

Two major aspects of this kind of object that I use all the time is the target property, and the prevent default, so maybe a good starting point would make use of those two properties and methods. When it comes to mouse events there is also the client x and client y properties also that can be used to get a window relative position of the event. 

So in this basic getting type section I will be going over just a few simple getting started type examples of event attachment, and working with event objects in the event handlers that will be used.

### 1.1 - The on click property of an element

The first step when it comes to working with event objects is to have a way to end up with one. One typical way to get one to work with would be to just set a function to the on click property of an element such as a div element. When doing so the first argument for this function will be a reference to the event object that will be available in the event that the div element is clicked.

```html
<html>
    <head>
        <title>Event Object</title>
    </head>
    <body>
        <div id="out" style="width:280px;height:200px;background-color:green;padding:20px;cursor:hand;"></div>
        <script>
// get a ref to the element one way or another
var el = document.getElementById('out');
// attach for the onclick event
el.onclick = function(e){
   // using the event object to get a reference to the target element,
   // in this case the div again, and using the e.clientX, and e.clientY
   // properties of the event object to get the position of the click 
   // relative to the window
   e.target.innerText = e.clientX + ',' + e.clientY;
};
        </script>
    </body>
</html>
```

### 1.2 - Using the add event listener method

Many javaScript examples on the open web use element properties like the on click property as a way to set a single event hander for an element. However it is often better to go with the add event listener method to attach events as that method will allow for attaching more than one handler to an element. To use it I just need to get a reference to a node that I want to attach to and then call the add event listener method off of that node or element. I then pass a string that is the kind of event that I want to attach for, and then pass the call back function as a second argument.

```html
<html>
    <head>
        <title>Event Object</title>
    </head>
    <body>
        <div id="out" style="width:280px;height:200px;background-color:green;padding:20px;cursor:hand;"></div>
        <script>
// get a ref to the element one way or another
var el = document.getElementById('out');
// attach an event handler to the element for the on click event
el.addEventListener('click', function(e){
   e.target.innerText = e.clientX + ',' + e.clientY;
});
        </script>
    </body>
</html>
```

### 1.3 - Mouse down event and target property

The click event works great, but in some cases I might want to attach for when a mouse button is pressed down, but not up yet. So when it comes to this there is the mouse down event that will fire just when the mouse button is pressed down. With that said there are also mouse up, and mouse move events that will fire when the mouse button is released and when the mouse is moved.

In this example I have a state object that contains properties like a current pointer position, and I have a draw method that will redner the current values of this state object to a div element as the inner text content of the div.

```html
<html>
    <head>
        <title>Event Object</title>
    </head>
    <body>
        <div id="out" style="width:280px;height:200px;background-color:green;padding:20px;cursor:hand;"></div>
        <script>
// ref to div
var div = document.getElementById('out');
// draw
var draw = function(el, state){
   el.innerText = 'down: ' + state.down + '; pos: ( ' + state.pos.x + ', ' + state.pos.y +' );';
};
// state object
var state = {
   down: false,
   pos: {
       x: -1,
       y: -1
   }
};
// handlers
state.events = {};
state.events.pointerDown = function(e){
   e.preventDefault();
   state.down = true;
   draw(e.target, state);
};
state.events.pointerMove = function(e){
   e.preventDefault();
   if(state.down){
       state.pos.x = e.clientX;
       state.pos.y = e.clientY;
       draw(e.target, state);
   }
};
state.events.pointerUp = function(e){
   e.preventDefault();
   state.down = false;
   draw(e.target, state);
};
// attaching handlers
div.addEventListener('mousedown', state.events.pointerDown);
div.addEventListener('mousemove', state.events.pointerMove);
div.addEventListener('mouseup', state.events.pointerUp);
// draw for first time
draw(div, state);
        </script>
    </body>
</html>
```

When clicking and dragging the mouse over the text you will notice that you can not highlight the text, that is because I called the prevetDefault method of the event object. This method will stop any kind of default browser behavior for the event such as text highlighting. This can come in handy when making some kind of game that involve user input for example. when someone clicks and drags over a canvas element I do not want any default browser behavior to happen when they do so.

There is a great deal more to write about when it comes to setting up some kind of system like this. For example there is the question of having touch and keyboard events be a way to also mutate the values of the state object for example. When it comes to doing so I need to know how to work with many various aspects of event objects. For example in touch events I can not just use the client x and client y properties like in mouse events because of the nature of multi touch.

## 2 - The target property in depth

It might be called for to take a closer look at the [target property](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) to really get a better understanding of what the target property is all about. Say you have a whole bunch of nested elements in a container element. For example a grid of div elements position in a grid like pattern in a container element by way of absolute positioning and the style API. Say I want to have an event hander that will fire when an div element in the gird is clicked, I could attach event handers to each of the div elements, or I could just attach one event hander to the main container element because of something know as event bubbling.

Here I have a little example that is that gird of divs that I have mentioned with a single event hander attached to the container div. the event hander will change the background color of a div that is the element that is reference by the target property. So when I click one of the nested divs the event bubbles up o the container element, the event hander fires there, and the target property refers to the element where the event happen not the current element where the hander is attached. For that there is another property of interest called the currentTarget property that in the case would refer to the container element rather than one of the divs in the grid.

```html
<html>
    <head>
        <title>Event Object</title>
    </head>
    <body>
        <div id="out" style="position:relative;width:280px;height:200px;background-color:grey;padding:20px;cursor:hand;"></div>
        <script>
var divClick = function(e){
  var div = e.target,
  c = div.style.backgroundColor;
  div.style.backgroundColor = c === 'grey' ? 'black': 'grey';
};
var container = document.getElementById('out'),
div,
i = 0,x,y, 
len = 8 * 8,
w = container.scrollWidth / 8,
h = container.scrollHeight / 8;
while(i < len){
   x = i % 8 * w;
   y = Math.floor(i / 8) * h;
   div = document.createElement('div');
   div.style.position = 'absolute';
   div.style.left = x + 'px';
   div.style.top = y + 'px';
   div.style.width = w + 'px';
   div.style.height = h + 'px';
   div.style.backgroundColor = 'grey';
   container.appendChild(div);
   i += 1;
}
container.addEventListener('mousedown',divClick);
        </script>
    </body>
</html>
```

## 3 - Nested elements, the current target property, and the stop propagation method

So there is the target property and then there is the [current target](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget) property of an event object. The target property will be the element where the event happened, and the current target property will be the element where the current event hander is firing. A good way to know the difference would be to play around with something that has to do with a nested collection of elements.

Say I have a collection of divs where each div is nested inside of each other and I have an mouse down event hander attached to each of them. If I click the inner most element the target and current target properties will refer to the same div, but then the events will bubble up to the top level. As the other handers fire the current target property will refer to the current div element, but the target property will still just refer to the div that was clicked. So it is a good idea to know about the differences between the two properties in an event object that have to do with element references, if not it is easy to understand how this can cause some confusion.

So there is this thing going on that is called event bubbling, and you might be asking yourself is there a way to shop this from happening? the answer is yes and the method of interest with that in the vent object is the [stopPropagation method](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).

### 3.1 - The current target property of an event object

The current target property of an event object is the current target for the current call of an event handler, rather than the target element where the event has started. So if I want to use the current target property in this example then I will want to attach an event handler for each element, and I will want to call the stop propagation method for each handler.

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
div{position:relative;background-color:black;outline:1px solid #ffffff;cursor:hand}
#one{width:280px;height:200px;}
#two{width:120px;height:100px;}
#three{width:60px;height:50px;}
        </style>
    </head>
    <body>
        <div id="one">
            <div id="two">
                <div id="three">
                </div>
            </div>
        </div>
        <script>
// div click handler
var divClick = function(e){
  var div = e.currentTarget, // selecting a div by e.currentTarget
  c = div.style.backgroundColor;
  e.stopPropagation(); // I will want to stop propagation for this
  div.style.backgroundColor = c === 'grey' ? 'black': 'grey';
};
var get = function(id){
    return document.getElementById(id);
};
// because I am using current target I will want to attach for all divs
get('one').addEventListener('mousedown',divClick);
get('two').addEventListener('mousedown',divClick);
get('three').addEventListener('mousedown',divClick);
        </script>
    </body>
</html>
```

### 3.2 - The target property of an event object

The target property of an event object is a reference to the element to which an event has started. So when it comes to using this property I will only need to attach a single handler to the root element, and call stop propagation.

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
div{position:relative;background-color:black;outline:1px solid #ffffff;cursor:hand}
#one{width:280px;height:200px;}
#two{width:120px;height:100px;}
#three{width:60px;height:50px;}
        </style>
    </head>
    <body>
        <div id="one">
            <div id="two">
                <div id="three">
                </div>
            </div>
        </div>
        <script>
// div click handler
var divClick = function(e){
  var div = e.target, // selecting a div by e.target
  c = div.style.backgroundColor;
  e.stopPropagation();
  div.style.backgroundColor = c === 'grey' ? 'black': 'grey';
};
var get = function(id){
    return document.getElementById(id);
};
get('one').addEventListener('mousedown',divClick);
        </script>
    </body>
</html>
```

## 4 - Simulating events by creating an event object, and calling the dispatch event method

So then there is getting a reference to an event object by attaching an event handler to an element, and then doing something that will result in that event being dispatched such as clicking on the element if it is a click, or mouse down event for example. However what if I want to simulate this with javaScript code? There are a [number of examples on the open web that will still work](https://stackoverflow.com/a/16509592), however many of them might make use of features that are being deprecated.

The way that I have found to do so as of this writing is to use the [Event Constructor](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event), and make any additional changes to the event object that need to happen. I then just need to get a reference to the element to which I want to emit and event, and call the dispatch event method of that element, passing the cerated event object as the first and only argument.

```html
<html>
    <head>
        <title>Event Object</title>
    </head>
    <body>
        <div id="out" style="width:280px;height:200px;background-color:green;padding:20px;cursor:hand;"></div>
        <script>
var el = document.getElementById('out');
el.onclick = function(e){
    e.target.innerText = e.clientX + ',' + e.clientY;
};
// simulate a click method
var simClick = function(x, y){
    var el = document.elementFromPoint(x,y);
    var ev = new Event('click');
    // setting clientX and clientY props
    ev.clientX = x;
    ev.clientY = y;
    console.log(ev);
    // dispatching the event
    el.dispatchEvent(ev);
};
// simulating a click
simClick(35, 21);
        </script>
    </body>
</html>
```

## 5 - Conclusion

So I work with event objects all the time when working out front end code. So yet knowing about the key properties and methods that there are to work with in an event object are key to understating how to create front end web applications. There is not just the core set of properties and methods like the target property, but also the many different properties that will change depending on the type of event. For example there is just the clientX property in mouse events, but with touch events there are arrays of objects and each object in that array has a clientX property because with touch events you can end up having to do something with multi touch.