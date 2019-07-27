---
title: Canvas text positioning and styling
date: 2019-07-26 16:42:00
tags: [canvas]
layout: post
categories: canvas
id: 509
updated: 2019-07-27 10:43:38
version: 1.3
---

So in html 5 canvas text can be rendered with methods like the [fill text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText) 2d content method. There is a bit more to know about when it comes to setting the position of text, font and so forth, so lets look at some quick examples of working with text in canvas.

<!-- more -->

## 1 - Canvas text basic example with fillText

To use the fill text method I just need to gain a reference to a canvas element by one way or another, and also get a reference to the 2d drawing context just like any other canvas project. Once I have a reference to the drawing content I can then set a fill style for the context and then call the fill text method. When calling the fill text method I pass the string that I want to display as the first argument followed by the x and y position that I want to place the text at.

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

There is more to cover when it comes to the text base line as well as centering text, and controlling the size and font of text. So now that we have a basic example covered we can now get to those examples as well now.