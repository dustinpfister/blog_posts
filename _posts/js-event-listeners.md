---
title: Event listeners in javaScript
date: 2019-01-16 18:45:00
tags: [js]
layout: post
categories: js
id: 360
updated: 2019-01-17 19:54:46
version: 1.2
---

In javaScript event listeners are methods that fire when a given event happens, such as when a mouse button is clicked, or an element looses focus. In this post I will be covering the use of [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) as a way to attach events to elements in client side javaScript.

<!-- more -->

## 1 - Event listeners in client side javaScript

In this section I will be covering a simple example of an event listener using the addEventListener method. This works by gaining a reference to an element by whatever means, such as with document.getElementById, and then calling the addEventListener method of that element. The first argument that I give to addEventListener is the type of event I wich to attach for, and the second argument is the method that I want to fire when this event occures.

```html
<html>
    <head>
        <title>Event Listeners</title>
    </head>
    <body>
        <input id="button" type="button" value="click me">
        <script src="main.js"></script>
    </body>
</html>
```

```js
var button = document.getElementById('button');

button.addEventListener('click', function(e){
 
    console.log('foo');
 
});
```