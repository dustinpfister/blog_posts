---
title: Event listeners in javaScript
date: 2019-01-16 18:45:00
tags: [js]
layout: post
categories: js
id: 360
updated: 2019-01-16 18:57:25
version: 1.1
---

In javaScript event listeners are methods that fire when a given event fires, such as when a mouse button is clicked, or an element looses focus. In this post I will be covering the use of [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) as a way to attach events to elements in client side javaScript.

<!-- more -->

## 1 - Event listeners in client side javaScript

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