---
title: Event Objects in client side javaScript
date: 2020-07-23 12:11:00
tags: [js]
layout: post
categories: js
id: 686
updated: 2020-07-23 12:20:57
version: 1.1
---

This post will be on the ins and outs of [event objects](https://developer.mozilla.org/en-US/docs/Web/API/Event) in client side javaScript. There are several properties and methods that are of key interest many others such as the target property that is a reference to the element where the event happened, and the prevent default method that will stop default browser behavior for certain types of events like mouse and touch events. I forget about things like prevent default now and then too, so maybe writing a lengthly post about that and the event object in general will help me to remember better.

<!-- more -->

## 1 - Basic event object example in client side javaScript

So for starters when I add an event listener to an element with the addEventListner method I have to give a callback method that will fire each time that event happens. In this callback method the first argument will be a reference to an event object. This event objects has many useful properties and methods that can the be used in the body of this callback function.

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