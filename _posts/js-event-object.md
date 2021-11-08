---
title: Event Objects in vanilla javaScript
date: 2020-07-23 12:11:00
tags: [js]
layout: post
categories: js
id: 686
updated: 2021-11-08 13:01:25
version: 1.66
---

This post will be on the ins and outs of [event objects](https://developer.mozilla.org/en-US/docs/Web/API/Event) in client side javaScript. There are several properties and methods that are of key interest many others such as the [target property](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) that is a reference to the element where the event happened. There are also a number of methods that are of interest also such as the [prevent default](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) method that will stop default browser behavior for certain types of events like mouse and touch events. 

I forget about things like prevent default now and then, so maybe writing a lengthly post about that and the event object in general will help me to remember better. There is also a great deal to cover when it comes to these events objects, such as the fact that the properties and methods will differ a little from kind of event to another. There are also some advanced topics that come up when it comes to working with these objects, such as creating them with javaScript code and using them to simulate an event by way of a script.

<!-- more -->

## 1 - Some Basic event object examples in client side javaScript

When I add [an event listener](/2019/01/16/js-event-listeners/) to an element with the addEventListner method, or one of the many element properties such as the on click property, I have to give a [callback method](/2019/03/25/js-javascript-callback/) that will fire each time that event happens. In this callback method the first argument will be a reference to an event object. This event objects has many useful properties and methods that can the be used in the body of this callback function. 

Two major aspects of this kind of object that I use all the time is the target property, and the prevent default method, just to name a few things to work with when it comes to the typical kinds of event objects that I work with in client side javaScript. So maybe a good starting point would make use of those two properties and methods when it comes to some quick basic examples for just getting  started with event objects. When it comes to mouse events there is also the client x and client y properties also that can be used to get a window relative position of the event. 

So in this basic getting started type section I will be going over just a few simple getting started type examples of event attachment, and working with event objects in the event handlers that will be used. Although I will be keeping these examples very simple, this is still not a [getting started with javaScript](/2018/11/27/js-getting-started/) from an absolute beginner. Even in this basic section i assume that you have at least a little experience when it comes to the first steps of client side javaScript as well as [nodejs](/2017/04/05/nodejs-helloworld/).

### - The source code examples in this post are on Gihub

The source code examples in this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-event-object) on Gihub along with the source code examples for my [many other posts on vanilla javaScript](/categories/js/). If you see something wrong with one of the source code examples in this post, and you are on github, that would be a good place to make a pull request. There is also the comments section at the bottom of this post that can be used to bring something up.


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

In this example I have a state object that contains properties like a current pointer position, and I have a draw method that will render the current values of this state object to a div element as the inner text content of the div.

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

### 4.1 - Basic mouse event simulation example

Often I might want to have some kind of method where I call it, and pass an x, and y position as arguments. The result of doing so will then be a simulated click event are the given window relative position. So then in the body of such a method I could use the document element from point method to get a reference to any element that may have been click at that location. I then just need to create an event object with the Event Constructor and make any needed changes to that object. After that I just call the dispatch event off of the reference to the element and pass the event object.

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

## 5 - Pointer event objects

In the basic section I started out with some mouse events, and it might be called for to look into these kinds of event objects for the various mouse events in detail. However in this advanced section on event objects I will be taking a look at event objects that have to do with [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) in client side javaScript. These pointer events are the kinds of events that would be a good starting point when it comes to preforming some logic that will need to happen for a pointer event that was caused by a mouse, or some other pointer device such as a touch screen. The reason why is because visitors to a web site might be using a desktop, or mobile device and as such might not have a mouse to touch screen. So using point events are one way to go about thinking in terms of pointers in general rather than specific features that are exclusive to just one kind of pointer device.

Do not get me wrong there are situations in which pointer events will fall short, for example if I want to do something with multi touch I can not do so with pointer events, and would need to look into touch events and how thous event objects are structured. If I want some code to run each time the user moves the scroll wheel of there mouse again this is an area where the pointer events and there event objects will fall short also.

Still pointer events are great when it comes to writing some code to run for certain pointer in general type events, so in this section I will be going over some examples. Of course I will be looking into what there is to work with when it comes to what there is in the event objects of these events. Also I will be touching base on some other related topics when it comes to some things that need to happen with CSS, and other issues that pop up when getting started with pointer events.

### 5.1 - Basic pointer down event example

The basic hello world style example of pointer events might make use of the [pointer down event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/pointerdown_event), and maybe the clientX, and clientY properties of the event object to work with in an event such as this. One thing to be aware of from the start is that these point events extend the [Mouse event object](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), so then just like with mouse events there is a clientX and clientY properties of a pointer event.

```html
<html>
    <head>
        <title>Event Object</title>
    </head>
    <body>
        <div id="out" style="width:280px;height:200px;background-color:green;padding:20px;cursor:hand;"></div>
        <script>
var el = document.getElementById('out');
el.addEventListener('pointerdown', function(e){
   e.target.innerText = e.clientX + ',' + e.clientY;
});
        </script>
    </body>
</html>
```

These clientX, and clientY properties are still very much window rather than element relative though. Also there is looking into some issues that might come up when it comes to using a touch device rather than a mouse and so forth. So lets look at a few more examples of these pointer events and the event objects of them

### 5.2 - Get element relative position with e.target and get bounding client rect method

AAfter event just a hello world there are all ready a few things that need to be address, one of which is the nature of the values that are stored in the clientX, and clientY properties. They are relative to the window, but not the element in which the event happened. So then in this example I am once again using the pointer down event to get a position where the pointer event happened. However this time I am using the target property of the event object to get an element reference to the element in which the event happened. I am then using the [get bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) to get a box object that contains margins from th other edged of the element to the edges of the window. I can then use these box vales to adjust the clientX, and clientY values to get an element rather than window relative position.

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
#out{
  touch-action:none;
  position:relative;left:100px;top:50px;
  width:280px;height:200px;background-color:green;padding:20px;cursor:hand;
}
        </style>
    </head>
    <body>
        <div id="out"></div>
        <script>
var el = document.getElementById('out');
el.addEventListener('pointerdown', function(e){
   var bx = e.target.getBoundingClientRect(),
   x = e.clientX - bx.left,
   y = e.clientY - bx.top,
   html = '<span>el relative pos: ( ' + x + ',' + y + ' )</span><br>';
   html += '<span>window rel pos: ( ' + e.clientX + ',' + e.clientY + ' )</span><br>';
   html += '<span>box t,l,r,b   :  ' + bx.top + ',' + bx.left + ',' + bx.right + ',' + bx.bottom +'</span><br>';
   e.target.innerHTML = html;
});
        </script>
    </body>
</html>
```

### 5.3 - The pointer move event and CSS touch action

The pointer down event might be a good starting point, but there is also the [pointer move event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/pointermove_event). One thing to be aware of when it comes to this kind of event is to make sure that things are set the way that I want them with the [touch action css property](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action). If not this event might not always work as one might expect it to when it comes to using a touch device at least.

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
#out{
  touch-action: none;
  position:relative;left:100px;top:50px;
  width:280px;height:200px;background-color:green;padding:20px;cursor:hand;
}
        </style>
    </head>
    <body>
        <div id="out"></div>
        <script>
var el = document.getElementById('out');
el.addEventListener('pointermove', function(e){
   var bx = e.target.getBoundingClientRect(),
   x = e.clientX - bx.left,
   y = e.clientY - bx.top,
   html = '<span>el relative pos: ( ' +x + ',' + y + ' )</span><br>';
   e.target.innerHTML = html;
});
        </script>
    </body>
</html>
```

## 6 - js event objects when working with keyboard events

When it comes to JavaScript event objects, and keyboard events there are a number of events to attach for, and also a number of properties of interest when it comes to the event objects to work with in the handers. For the most part typically I just want to know if a key is down or not, and if so what key is indeed down. So then there is the [key down event](https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event), and the [key up event](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event). 

When it comes to knowing what key is pressed there are two options that are of interest in the [event objects for these keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) which are the key, and code properties. There are many other properties that you might see being used in various source code examples on the open web, but many of these examples might be a bot out of date. It is best to just stick to using the key property generally, and make use of the get char code at string prototype method if a char coded is need from the key property value. The main reason why one might want to use the code value is that it is not effected by case, where the key properties value will change depending if caps lock is on or the shift key is used.

### 6.1 - Basic key down event example and the key property of the event object

Here I have a simple getting started type example with keyboard event objects where I am attaching a key down event for the window object and just stetting the inner text of a div element to the value of the key property when a key is pressed.

```html
<html>
    <head>
        <title>js e object</title>
    </head>
    <body>
        <div id="out">Press a key any key</div>
        <script>
window.addEventListener('keydown', function(e){
    document.getElementById('out').innerText = 'key: ' + e.key;
});
        </script>
    </body>
</html>
```

### 6.2 - The event object keyCode property and setting booleans for each code

When it comes to working out something for multi key the first step might be to work out a system for storing the status of an array of keys. So in this example I am starting out with a keys array, and to set what array index value to set to a true or false value I am using the charCodeAt method of the string prototype to key the char code from the key property of the event object. So then I can press and hold a number of keys and the corresponding index values will be true. The index values can then be used to preform some kind of multi key function in the event that a certain collection of index values in this key array is true or not.

```html
<html>
    <head>
        <title>js e object</title>
    </head>
    <body>
        <div id="out">Press a key any key</div>
        <script>
var keys = [];
var printKeyArray = function(keys){
    var text = '';
    keys.forEach(function(keyBool, i){
        text += i + ':' + keyBool + ', '
    });
    document.getElementById('out').innerText = text;
};
window.addEventListener('keydown', function(e){
    keys[e.key.charCodeAt(0)] = true;
    printKeyArray(keys);
});
window.addEventListener('keyup', function(e){
    keys[e.key.charCodeAt(0)] = false;
    printKeyArray(keys);
});
        </script>
    </body>
</html>
```

## 7 - Event propagation, event object target, current target, and stop propagation method

Yet another topic that is relative to event objects would be the topic of event propagation, also often known as event bubbling. This is where one has one or more child elements in a parent element and when an event happens in one of the child elements it will fire any event handers for that child, but also for the parent element of that child element, and so on. This is why there is a target, and current target property in an event object as this will come into play for any and all events that will propagate such as an on click event. The target property is a reference to where the event started, while the current target property is a reference to the current element in a propagation of even handlers firing for this event that happened in the target.

### 7.1 - Basic example of event propagation, target and current target properties of an event object

First off a basic example of this event propagation with a client event, and also some code that will hep to show what the difference is between the target and current target properties of an event object.

```html
<html>
    <head>
        <title>Get parent element on event</title>
        <style>
div{position:relative;}
.parent{width:200px;height:200px;background:gray;}
.child{width:32px;height:32px;background:lime;}
        </style>
    </head>
    <body>
        <div class="parent">
            <div class="child" style="left:157px;top:0px;"></div>
            <div class="child" style="left:25px;top:70px;"></div>
            <div class="child" style="left:98px;top:12px;"></div>
        </div>
        <div class="out"></div>
        <script>
var parent = document.querySelector('.parent'),
out = document.querySelector('.out');
parent.addEventListener('click', function(e){
    if(e.target.className === 'child'){
        out.innerText = 'clicked child';
    }
    if(e.target === e.currentTarget){
        out.innerText = 'clicked parent';
    }
});
        </script>
    </body>
</html>
```

### 7.2 - Stop propagation

To stop propagation I will need to call the [stop propagation method](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).

```html
<html>
    <head>
        <title>Get parent element on event</title>
        <style>
div{position:relative;}
.parent{width:200px;height:200px;background:gray;}
.child{width:32px;height:32px;background:lime;}
        </style>
    </head>
    <body>
        <div class="parent">
            <div class="child" style="left:157px;top:0px;"></div>
            <div class="child" data-mess="Hello I have something to say!" style="left:25px;top:70px;"></div>
            <div class="child" style="left:98px;top:12px;"></div>
        </div>
        <div class="out"></div>
        <script>
var parent = document.querySelector('.parent'),
out = document.querySelector('.out');
// click hander for a child
var clickChild = function(e){
    if(e.target.dataset.mess){
        out.innerText = e.target.dataset.mess;
        e.stopPropagation();
    }
};
// click hander for a parent
var clickParent = function(e){
    if(e.target.className === 'child'){
        out.innerText = 'Nothing here!';
    }
    if(e.target === e.currentTarget){
        out.innerText = 'clicked parent net';
    }
};
// attaching for each child
[].forEach.call(parent.children, function(child){
    console.log(child);
    child.addEventListener('click', clickChild);
});
// attaching just once for the parent
parent.addEventListener('click', clickParent);
        </script>
    </body>
</html>
```

### 7.3 - Get parent element example

So then this event propagation can be used as one of many ways to go about [getting a reference to a parent element](/2019/02/21/js-get-parent-element/). Although there may be a whole lot of other ways of doing so that are far less complex such as just making use of the parentNode or parent element properties of a child element when having such a reference before hand is the case.

```html
<html>
    <head>
        <title>Get parent element on event</title>
        <style>
#wrap_main{
  width:640px;height:480px;background:black;
}
#wrap_header{
  height:120px;background:green;
}
#wrap_logo{
  width:120px;height:120px;background:blue;
}
#wrap_content{
  width:360px;height:auto;background:red;
  margin: 20px;padding:20px;
}
.block_div{
  display:inline-block;width:64px;height:64px;background:cyan;
  margin:10px;
}
canvas{
  display:inline-block;width:64px;height:64px;background:black;
  margin:10px;
}
        </style>
    </head>
    <body>
        <div id="wrap_main">
            <div id="wrap_header" class="custom_action">
                <div id="wrap_logo"></div>
            </div>
            <div id="wrap_content">
                <div class="block_div custom_action"></div>
                <div class="block_div"></div>
                <div class="block_div custom_action"></div>
                <canvas width="64" height="64"></canvas>
            </div>
        </div>
        <script>
var forParentChildren = function(parent, opt){
    opt = opt || {};
    opt.forOnly = opt.forOnly || ['*']
    opt.forChild = opt.forChild || function(){};
    opt.forParent = opt.forParent || function(){};
    // if parent is a string assume it is a query string to get one
    if(typeof parent === 'string'){
        parent = document.querySelector(parent);
    }
    // the listener
    var listener = function(e){
        var callForChild = false,
        child = e.target,
        i = opt.forOnly.length;
        while(i--){
            // if first char === '*' set true and break
            if(opt.forOnly[i][0] === '*'){
                callForChild = true;
                break;
            }
            // if first char === '.' check className prop
            if(opt.forOnly[i][0] === '.'){
                var classNames = child.className.split(' '),
                ci = classNames.length;
                while(ci--){
                    if('.' + classNames[ci] === opt.forOnly[i]){
                        callForChild = true;
                        break;
                    }
                }
            }
            // if first char === '#' check id prop
            if(opt.forOnly[i][0] === '#'){
                if(opt.forOnly[i] === '#' + child.id){
                    callForChild = true;
                    break;
                }
            }
            // check node name
            if(opt.forOnly[i].toUpperCase() === child.nodeName.toUpperCase()){
                    callForChild = true;
                    break;
            }
        }
        // call forChild only if e.target is not e.currentTarget
        if(child != e.currentTarget && callForChild){
            opt.forChild.call(e, child, e.currentTarget, e, opt);
        }
        // always call forParent for what should be the parent element at e.currentTarget
        opt.forParent.call(e, e.currentTarget, e.currentTarget.children, e, opt);
    };
    parent.addEventListener('click', listener);
};
// using the method
forParentChildren('#wrap_main', {
   forOnly: ['.custom_action', '#wrap_logo', 'canvas'],
   forChild: function(child, parent, e, opt){
        var colors = ['orange', 'white', 'lime'],
        style = colors[Math.floor(Math.random() * colors.length)];
       // change color if div
       if(child.nodeName === 'DIV'){
           child.style.background = style
       }
       if(child.nodeName === 'CANVAS'){
           var box = child.getBoundingClientRect(),
           x = e.clientX - box.left,
           y = e.clientY - box.top,
           ctx = child.getContext('2d');
           //child.width = 64;
           //child.height = 64;
           ctx.beginPath();
           ctx.fillStyle = style;
           ctx.arc(x,y,5,0, Math.PI * 2);
           ctx.closePath();
           ctx.fill();
       }
   },
   forParent: function(parent, children, e, opt){
        //console.log(parent.id)
   }
});
        </script>
    </body>
</html>
```

## 8 - Event Objects in mouse events

It might be best to check out my [post on using the mouse in javaScript](/2020/06/25/js-javascript-mouse/) to really get into the depth of what there is to known when it comes to working with a mouse in javaScript. Often when bother to work with a mouse the idea is to work out some specific code that will just apply to the mouse, and only the mouse, as when it comes to thinking in terms of pointers in general there are of course the pointer events that I covered in a section above. 

So then when going this way with events and working with event objects I often will work out code that I want to work only with touch events, and then code that I want to work only with mouse events. So then in this section I should also touch base on touch events at least, but only for the sake of disabling touch events so that the code will not run for touch events as a touch screen will trigger mouse events actually.

### 8.1 - A basic mouse down event example

Sense I all ready coved the click event, and also because that event is more of a pointer event, I think I will start off with the mouse down event. This as the same suggest is an event that will fire when a mouse button is pressed, but not yet released. 

Even though this is a mouse event when working on a system that has both a mouse as well as a touch screen I have found that the mouse down event will fire for both mouse button clicks as well as when I use the touch screen. So the way to deal with this is to start out with a touch start event actually, and be sure to call the prevent default method in the body of the hander. The idea here is that I work out separate logic for touch events, otherwise why bother with these events right> I could just go with pointer events.


After the touch start event I then attach for the mouse down event. Inside the body of the lander I can use the client x and y properties to get the window relative position where the mouse down event has happened. Also I can take a look at the button property of the event object that will give me a number value that corresponds with what button was clicked on the mouse.

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
#wrap{
  width:280px;height:200px;background-color:green;padding:20px;
}
        </style>
    </head>
    <body>
        <div id="wrap" style=""></div>
        <script>
// get a ref to the element one way or another
var el = document.getElementById('wrap');
// prevent default for touch start as I want this to only
// apply to the mouse
el.addEventListener('touchstart', function(e){
    e.preventDefault();
});
// mouse down
el.addEventListener('mousedown', function(e){
   e.preventDefault();
   e.target.innerText = e.button + ',' + e.clientX + ',' + e.clientY;
});
        </script>
    </body>
</html>
```

### 8.2 - Right clicking an element and the content menu event

One thing that will come up right away is what happens when I right click an element, when doing so there is the default browser context menu that comes up. If I wan to do something custom with a right click button of a mouse I will need to find a way to disable that. So for this sort of thing there is the context menu event, inside the body of a hander of this context menu event I can call the prevent default method off of the event object to get that context menu to stop.

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
#wrap{
  width:280px;height:200px;background-color:green;padding:20px;
}
        </style>
    </head>
    <body>
        <div id="wrap" style=""></div>
        <script>
// get a ref to the element one way or another
var el = document.getElementById('wrap');
// context menu handler
el.addEventListener('contextmenu', function(e){
    e.preventDefault();
    if (e.stopPropagation){
        e.stopPropagation();
    }
    e.cancelBubble = true;
    return false;
});
// prevent default for touch start as I want this to only
// apply to the mouse
el.addEventListener('touchstart', function(e){
    e.preventDefault();
});
// on mouse down
el.addEventListener('mousedown', function(e){
   e.preventDefault();
   e.target.innerText = e.button + ',' + e.clientX + ',' + e.clientY;
});
        </script>
    </body>
</html>
```

### 8.3 - The mouse up event

So now that I know how to get mouse events to only work with the mouse and not touch events as well as how to disable the context menu there is now also doing something with the mouse up event. So in this example I am using everything that I have covered thus far in this section but I am now also using the mouse down event as a way to figure out an amount of time between the firing of a mouse down and then mouse up event.

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
#wrap{
  width:280px;height:200px;background-color:green;padding:20px;
}
        </style>
    </head>
    <body>
        <div id="wrap" style=""></div>
        <script>
var state = {
   dst : null,
   secs: 0
};
var el = document.getElementById('wrap');
// prevent default for touch start as I want this to only
// apply to the mouse
el.addEventListener('touchstart', function(e){
    e.preventDefault();
});
// on mouse down
el.addEventListener('mousedown', function(e){
    state.dst = new Date();
    e.target.innerText = 'down';
});
el.addEventListener('mouseup', function(e){
   state.secs = (new Date() - state.dst) / 1000;
   e.target.innerText = 'up, secs: ' + state.secs.toFixed(2);
});
// context menu handler
el.addEventListener('contextmenu', function(e){
    e.preventDefault();
    if (e.stopPropagation){
        e.stopPropagation();
    }
    e.cancelBubble = true;
    return false;
});
        </script>
    </body>
</html>
```

## 9 - Conclusion

So I work with event objects all the time when working out front end code mainly when dealing with user input, but also a wide range of other kinds of events. So knowing about the key properties and methods that there are to work with in an event object are key to understating how to create front end web applications. 

There is not just the core set of properties and methods like the target property, but also the many different properties that will change depending on the type of event. For example there is just the clientX property in mouse events, but with touch events there are arrays of objects and each object in that array has a clientX property because with touch events you can end up having to do something with multi touch.

This is a post that is on my radar when it comes to additional future edits, and expansion. There is a whole lot more to write about when it comes to events objects in javaScript as there are w hole lot of different kinds of events beyond what is is that I have coved in this post thus far. I do have a whole lot of there content pieces also thought that need some attention also though, so it might be a while until I come bake to expanding this content.
