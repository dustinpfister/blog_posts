---
title: Canvas keyboard events
date: 2020-02-20 21:31:00
tags: [canvas]
layout: post
id: 617
categories: canvas
updated: 2020-02-21 18:42:45
version: 1.1
---

With canvas keyboard events.

<!-- more -->


```html
<html>
    <head>
        <title>canvas keyboard</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
var draw = function(ctx, canvas, state){
   ctx.fillStyle = 'black';
   ctx.fillRect(0,0,canvas.width, canvas.height);
   ctx.fillStyle = 'white';
   ctx.textBaseline = 'middle';
   ctx.textAlign = 'center';
   ctx.font = '60px courier';
   ctx.fillText(state.keydown, canvas.width/ 2, canvas.height/2);
};
var state = {
    keydown: false
};
var keyDown = function(e){
   state.keydown = true;
   draw(ctx, canvas, state);
};
var keyUp = function(e){
   state.keydown = false;
   draw(ctx, canvas, state);
};
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
draw(ctx, canvas, state);
        </script>
    </body>
</html>
```