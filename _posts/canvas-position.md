---
title: Canvas position
date: 2019-03-14 17:35:00
tags: [js,canvas]
layout: post
categories: canvas
id: 401
updated: 2019-03-14 17:43:18
version: 1.2
---

Canvas position might refer to positioning a canvas element using css style rules, but there are some other topics that come to mind as well. Such as repositioning a canvas element on a browser window resize, and also how to get a mouse or touch pointer event location relative to the current position of the canvas element rather than the window of the browser. In this post I will be covering some topics when it comes to canvas position related topics.

<!-- more -->

## 1 - Canvas position using css rules

So positioning a canvas element with css rules is more of a css topics rather than one that has to do with canvas. One way is with inline css rules like so.

```js
<html>
    <head>
        <title>canvas position relative</title>
    </head>
    <body>
        <div style="position:relative;top:100px;">
        <canvas id="the-canvas" width="320" height="240" style="position:relative; left:50px;"></canvas>
        </div>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
        </script>
    </body>
</html>
```
