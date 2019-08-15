---
title: Canvas save and restore methods for saving and loading canvas state
date: 2019-08-14 20:13:00
tags: [canvas]
layout: post
categories: canvas
id: 522
updated: 2019-08-14 20:52:20
version: 1.5
---

The [canvas save](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save) 2dcontext method can be used to save the state of a 2d canvas drawing context that can later be restored with the canvas restore method. So this method can be used to save a current state of a drawing content, then changes can be made to the fill style, translations and rotations can be preformed, something can be drawn with these new settings, and then put back the way it was with the restore method. So in this post I will be going over some quick examples of the canvas save method to point out some reasons why the method is so useful.

<!-- more -->

## 1 - basic canvas save method example

For starters with the canvas save method in this example I am just using it to save the drawing context and then just changing the fill color of the context. I then call the restore method and then the old fill color is restored.

```html
<html>
    <head>
        <title>canvas save</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
ctx.fillStyle = 'red';
console.log(ctx.fillStyle); // '#ff0000'
 
ctx.save();
 
ctx.fillStyle = 'blue';
console.log(ctx.fillStyle); // '#0000ff'
 
ctx.restore();
console.log(ctx.fillStyle); // '#ff0000'
 
        </script>
    </body>
</html>
```

Using the canvas save method when this is the only change is kind of over kill, still you get the basic idea. The save method can be used to save the state of the drawing context. Maybe it is not called for when it just comes to a fill color change, but if many changes are made from a preferred state it can be useful to quickly restore back to that preferred state.

## 2 - canvas save rotate example

```html
<html>
    <head>
        <title>canvas save rotate example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas can 2d context
var state = {
  canvas : document.getElementById('the-canvas'),
  ctx : null,
  x: 160,
  y: 120,
  a: 0,
  lt: new Date(),
  aps: Math.PI / 180 * 45
};
state.ctx = state.canvas.getContext('2d');
 
var clear = function(state){
    state.ctx.fillRect(0,0,state.canvas.width, state.canvas.height);
};
 
var drawBox = function(state){
  var ctx = state.ctx;
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.translate(state.x,state.y);
  ctx.rotate(state.a);
  ctx.fillRect(-80,-80,160,160);
  ctx.restore();
};
 
var update = function(state){
   var time = new Date() - state.lt;
   state.lt = new Date();
   //state.a += Math.PI / 180 * 1;
   state.a += time / 1000 * state.aps;
   state.a %= Math.PI * 2;
}
 
var loop = function(){
   requestAnimationFrame(loop);
   clear(state);
   drawBox(state);
   update(state);
};
loop();
 
        </script>
    </body>
</html>
```
