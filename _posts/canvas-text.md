---
title: Canvas text positioning and styling
date: 2019-07-26 16:42:00
tags: [canvas]
layout: post
categories: canvas
id: 509
updated: 2020-02-05 20:16:48
version: 1.17
---

So in html [canvas text](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text) can be rendered with methods like the [fill text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText) 2d drawing context method. There is also the [stroke text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText) method as well that can be used as a replacement of or in addition to the fill text method when it comes to the style of text when working with a 2d drawing context of a canvas element. 

There is a bit more to know about when it comes to setting the position of text, canvas text color, canvas text font, and so forth of canvas text. There are at least a few properties that a javaScript developer should be aware of when it comes to using canvas to render text. So lets look at some quick examples of working with text and HTML 5 canvas elements.

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

## 2 - Setting the canvas text font

There is the [canvas font](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font) 2d drawing context property that will come into play when I want to set the font size, and font-family of the text. I do so by setting the font property to a string value where I set a pixel value for the text size followed by the string 'px' to set the value in pixels. After that I can use a space followed by the web safe font I would like to use for the text such as courier.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
ctx.fillStyle='red';
ctx.font = '20px courier';
ctx.fillText('hello world', 0, 20);
```

## 3 - Canvas text color with fillStyle strokeStyle.

The canvas text color can be set a number of ways. There is the fill style and stroke style properties that can be used to set the text color depending on what methods are being used to draw the text. There is also the values that are used for these properties and other canvas drawing context methods that have an impact on canvas text color such as the [global alpha](/2019/10/11/canvas-alpha/) property.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 270;
 
var mess = 'Hello World';
 
ctx.font = '50px arial';
ctx.lineWidth = 3;
ctx.translate(-0.5, -0.5);
 
// just using fillStyle and fillText
ctx.fillStyle='red';
ctx.fillText(mess, 0, 50);
 
// just using strokeStyle and strokeText
ctx.strokeStyle='red';
ctx.strokeText(mess, 0, 100);
 
// using fillStyle and strokeStyle
ctx.fillStyle='red';
ctx.strokeStyle='black';
ctx.fillText(mess, 0, 150);
ctx.strokeText(mess, 0, 150);
 
// using Global alpha for transparency
ctx.globalAlpha = 0.2;
ctx.strokeStyle='red';
ctx.strokeText(mess, 0, 200);
ctx.globalAlpha = 1;
 
// using RGBA color style values for transparency
ctx.strokeStyle='rgba(255,0,0,0.2)';
ctx.strokeText(mess, 0, 250);
```

## 3 - The text base line property

When working with text in the 2d canvas drawing context the [canvas text base line](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline) property can be used to set the vertical alignment of text when setting the position of a fill text method call.

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

## 4 - The canvas text align property

The text baseline property is what I would want to use in a canvas project to set the vertical alignment of text. However there is also the question of horizontal alignment also, and for this there is the [text align](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign) property of the 2d drawing context. For this property there are values such as left right and center that can be used to set how text is to be rendered relative to the x value that is given when using a method like fill text..

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

## 5 - Measure text

If I need to measure text metrics there is the [measure text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText) context method.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 40;

var mess = 'Hello World',
m,
dx = 0;

ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='red';
ctx.font = '20px courier';
ctx.textBaseline = 'top';
ctx.textAlign='left';
m = ctx.measureText(mess);
dx = m.width;
ctx.fillText('hello world', canvas.width - dx, 10);
```