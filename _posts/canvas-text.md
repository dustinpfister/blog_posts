---
title: Canvas text positioning and styling
date: 2019-07-26 16:42:00
tags: [canvas]
layout: post
categories: canvas
id: 509
updated: 2019-11-10 09:48:17
version: 1.8
---

So in html 5 canvas text can be rendered with methods like the [fill text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText) 2d drawing context method. There is also the [stroke text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText) method as well that can be used as a replacement of or in addition to the fill text method when it comes to the style of a text outline. There is a bit more to know about when it comes to setting the position of text, font and so forth, so lets look at some quick examples of working with text in canvas.

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

## 2 - The text base line property

When working with text in the 2d canvas drawing context the base line property can be used to set the vertical alignment of text when setting the position of a fill text method call.

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// some variables for the example
// baseY is used to position a baseline
// and is also the same y value that will
// be used for the fill text method
var mess = 'Hello',
baseY = 10,
stepX = 30;
 
// drawing a line across the canvas
// with a y value of baseY
ctx.strokeStyle = 'blue';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(0, baseY);
ctx.lineTo(canvas.width, baseY);
ctx.stroke();
 
// looping over all values for baseLine to
// compare the differences.
ctx.fillStyle = 'red';
[
    'alphabetic',
    'bottom',
    'hanging',
    'ideographic',
    'middle',
    'top'
].forEach(function (baseLineValue, index) {
    ctx.textBaseline = baseLineValue;
    ctx.fillText(mess, stepX * index, baseY);
});
```

## 3 - The canvas text align property

The text baseline property is what I would want to use in a canvas project to set the vertical alignment of text. However there is also the question of horizontal alignment also, and for this there is the text align property of the 2d drawing context. For this property there are values such as left right and center that can be used to set how text is to be rendered relative to the x value that is given when using a method like fill text..

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 150;
 
ctx.fillStyle = 'back';
ctx.fillRect(0, 0, canvas.width, canvas.height);
 
ctx.fillStyle = 'white';
ctx.font = '120px arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);
```