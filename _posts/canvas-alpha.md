---
title: Canvas alpha transparency
date: 2019-10-11 19:00:00
tags: [canvas]
layout: post
id: 545
categories: canvas
updated: 2019-11-10 09:54:44
version: 1.6
---

In [canvas alpha](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha) transparency can be achieved in a number of ways. There is the global alpha property of the 2d drawing context, and then there is also using the rgba way of setting a web color. There are a number of other topics to canvas and alpha transparency also, such as using a png image with an alpha channel, and using the clear react method and having a background behind the canvas element. So lets look at some example that have to do with alpha transparency in html 5 canvas and javaScript.

<!-- more -->

## 1 - canvas alpha transparency using the global alpha property

The global alpha property of the 2d drawing canvas context is maybe the most common typical way to go about setting transparency for something that is going to be rendered in canvas. Just set a value from zero to one for the property and anything that will be drawn or stroked will have the degree of transparency.

```html
<html>
    <head>
        <title>canvas line</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),ctx;
ctx = canvas.getContext('2d');
 
// solid black background
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
// fully opacity red circle
ctx.fillStyle='red';
ctx.beginPath();
ctx.arc(160,120, 40, 0, Math.PI * 2);
ctx.fill();
 
// half opacity green circle using globalAlpha
ctx.fillStyle='green';
ctx.globalAlpha = 0.5;
ctx.beginPath();
ctx.arc(180,140, 40, 0, Math.PI * 2);
ctx.fill();
        </script>
    </body>
</html>
```

When done set the value back to one, or use save and restore to set opacity back to what it was before hand.

## 2 - Using a css color value

A css color value can also be used to set an alpha-channel transparency value Suing the rgba functional notation for example. This way it is just a matter of setting the desired color value when setting the fill or stroke style when making graphics with the 2d context drawing methods.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// solid black background
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
// fully opacity red circle
ctx.fillStyle='red';
ctx.beginPath();
ctx.arc(160,120, 40, 0, Math.PI * 2);
ctx.fill();
// half opacity green circle using globalAlpha
ctx.fillStyle='rgba(0,128,0,0.5)';
ctx.beginPath();
ctx.arc(180,140, 40, 0, Math.PI * 2);
ctx.fill();
```

## 3 - Conclusion

So there are some basic when it comes to working with canvas alpha transparency, there is much more to write about on this topic as well as many other canvas related topics.