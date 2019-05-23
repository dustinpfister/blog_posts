---
title: Event listeners in javaScript
date: 2019-01-16 18:45:00
tags: [js]
layout: post
categories: js
id: 360
updated: 2019-05-23 14:59:25
version: 1.8
---

In javaScript event listeners are methods that fire when a given event happens, such as when a mouse button is clicked, or an element looses focus. In this post I will be covering the use of [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) as a way to attach events to elements in client side javaScript.

<!-- more -->

## 1 - Event listener basics

There is more than one way to attach event listeners in client side javaScript. For the most part it is a good idea to just stick to addEventListener method as a way to attach events. However there are also some alternative ways to do so as well that involve defining a method for certain properties as well.

## 2 - Attaching Event listeners using addEventListener

In this section I will be covering a simple example of an event listener using the addEventListener method. This works by gaining a reference to an element by whatever means, such as with document.getElementById, and then calling the addEventListener method of that element. The first argument that I give to addEventListener is the type of event I which to attach for, and the second argument is the method that I want to fire when this event occurs.

So I have some html for this example that looks like this.

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

And the html links to an external main.js file that looks like this.

```js
var button = document.getElementById('button');

button.addEventListener('click', function(e){
 
    console.log('foo');
 
});
```

For the most part addEventListener should be used as a way to attach events to an element. This way if I want I can attach more than one handler for the same event and element.

## 3 - The event Object of a call back when setting event listeners in javaScript

When setting an event listener there is the first argument of the callback that is given. This argument is the [event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) which contains all kinds of useful information about the event when the event triggers. This can contain things like a reference to the element that was clicked on an on click event, or the x and y position of where a canvas element was clicked and much more. In this section I will be going over some examples of event objects when working with event listeners.

### 3.1 - basic example of the event object

```js
<html>
    <head>
        <title>Event Listeners</title>
    </head>
    <body>
        <a id="link" href="/" >some link</a>
        <script>
var link = document.getElementById('link');
// using the target property of the event object
// to set the href property of a link
link.addEventListener('click', function(e){
   e.target.href='https://www.google.com/'
});
        </script>
    </body>
</html>
```