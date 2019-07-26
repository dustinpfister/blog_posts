---
title: Canvas text positioning and styling
date: 2019-07-26 16:42:00
tags: [canvas]
layout: post
categories: canvas
id: 509
updated: 2019-07-26 16:45:01
version: 1.1
---

So in html 5 canvas text can be rendred with methods like the fill text 2d content method. There is a bit more to know about when it comes to setting the position of text, font and so forth, so lets look at some quick examples of working with text in canvas.

<!-- more -->

## 1 - Canvas text basic example with fillText

```html
<html>
    <head>
        <title>canvas text</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
ctx.fillStyle='red';
ctx.fillText('hello world', 10, 10);
```