---
title: Event Objects in client side javaScript
date: 2020-07-23 12:11:00
tags: [js]
layout: post
categories: js
id: 686
updated: 2020-07-23 12:28:11
version: 1.2
---

This post will be on the ins and outs of [event objects](https://developer.mozilla.org/en-US/docs/Web/API/Event) in client side javaScript. There are several properties and methods that are of key interest many others such as the target property that is a reference to the element where the event happened, and the prevent default method that will stop default browser behavior for certain types of events like mouse and touch events. I forget about things like prevent default now and then too, so maybe writing a lengthly post about that and the event object in general will help me to remember better.

<!-- more -->

## 1 - Basic event object example in client side javaScript

So for starters when I add an event listener to an element with the addEventListner method I have to give a callback method that will fire each time that event happens. In this callback method the first argument will be a reference to an event object. This event objects has many useful properties and methods that can the be used in the body of this callback function. Two major aspects of this kind of object that I use all the time is the target property, and the preventDefault method, so maybe a good starting point would make use of those two.

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