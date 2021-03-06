---
title: Event Objects in client side javaScript
date: 2020-07-23 12:11:00
tags: [js]
layout: post
categories: js
id: 686
updated: 2020-07-23 15:47:16
version: 1.9
---

This post will be on the ins and outs of [event objects](https://developer.mozilla.org/en-US/docs/Web/API/Event) in client side javaScript. There are several properties and methods that are of key interest many others such as the target property that is a reference to the element where the event happened, and the prevent default method that will stop default browser behavior for certain types of events like mouse and touch events. I forget about things like prevent default now and then too, so maybe writing a lengthly post about that and the event object in general will help me to remember better.

<!-- more -->

## 1 - Basic event object example in client side javaScript

So for starters when I add an event listener to an element with the addEventListner method I have to give a callback method that will fire each time that event happens. In this callback method the first argument will be a reference to an event object. This event objects has many useful properties and methods that can the be used in the body of this callback function. Two major aspects of this kind of object that I use all the time is the target property, and the [preventDefault method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault), so maybe a good starting point would make use of those two.

So say I have a div element style a little style set with some inline CSS rules. I can attach and event to it in a script tag by getting a reference to that div element, and attaching an event hander with the addEventLisneter method by calling the method off of a reference to that div element. When doing so I pass an event type as the first argument such as the mousedown type that will fire each time a mouse button is clicked over the div element. I then pass a callback as the second argument that is my callback function, and in the body of that callback function I have an event object to work with via the first argument of that callback. I can the use the target property as another way to reference that div element, and because it is a mouse event there are also properties like clienX, and clientY that will give me the window position of where the mouse event happened. I can then do something with this such as set the innerText of the div element to a string that contains some of these values.

```js
<html>
    <head>
        <title>Event Object</title>
    </head>
    <body>
        <div id="out" style="width:280px;height:200px;background-color:green;padding:20px;cursor:hand;"></div>
        <script>
document.getElementById('out').addEventListener('mousedown', function(e){
   e.preventDefault();
   e.target.innerText = e.target.id + 
   ', ' + e.type +
   ', ' + e.clientX + 
   ', ' + e.clientY;
});
        </script>
    </body>
</html>
```

When clicking and dragging the mouse over the text you will notice that you can not highlight the text, that is because I called the prevetDefault method of the event object. This methods will stop any kind of default browser behavior for the event such as text highlighting. this can come in handy when making some kind of game that involve user input for example. when someone clicks and drags over a canvas element I do not want any default browser behavior to happen when they do so.

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

## 3 - Netsed elements, the current target property, and the stop propagation method

So there is the target property and then there is the [current target](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget) property of an event object. The target property will be the element where the event happened, and the current target property will be the element where the current event hander is firing. A good way to know the difference would be to play around with something that has to do with a nested collection of elements.

Say I have a collection of divs where each div is nested inside of each other and I have an mouse down event hander attached to each of them. If I click the inner most element the target and current target properties will refer to the same div, but then the events will bubble up to the top level. As the other handers fire the current target property will refer to the current div element, but the target property will still just refer to the div that was clicked. So it is a good idea to know about the differences between the two properties in an event object that have to do with element references, if not it is easy to understand how this can cause some confusion.

So there is this thing going on that is called event bubbling, and you might be asking yourself is there a way to shop this from happening? the answer is yes and the method of interest with that in the vent object is the [stopPropagation method](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).

```html
<html>
    <head>
        <title>Event Object</title>
        <style>
div{
  position:relative;
  background-color:black;
  outline:1px solid #ffffff;
  cursor:hand
}
#one{
  width:280px;
  height:200px;
}
#two{
  width:120px;
  height:100px;
}
#three{
  width:60px;
  height:50px;
}
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
var divClick = function(e){
  var div = e.currentTarget,
  c = div.style.backgroundColor;
  e.stopPropagation();
  div.style.backgroundColor = c === 'grey' ? 'black': 'grey';
};
var get = function(id){
    return document.getElementById(id);
};
get('one').addEventListener('mousedown',divClick);
get('two').addEventListener('mousedown',divClick);
get('three').addEventListener('mousedown',divClick);
        </script>
    </body>
</html>
```


## 4 - Conclusion

So I work with event objects all the time when working out front end code. So yet knowing about the key properties and methods that there are to work with in an event object are key to understating how to create front end web applications. There is not just the core set of properties and methods like the target property, but also the many different properties that will change depending on the type of event. For example there is just the clientX property in mouse events, but with touch events there are arrays of objects and each object in that array has a clientX property because with touch events you can end up having to do something with multi touch.