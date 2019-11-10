---
title: Canvas save and restore methods for saving and loading canvas state
date: 2019-08-14 20:13:00
tags: [canvas]
layout: post
categories: canvas
id: 522
updated: 2019-11-10 14:14:52
version: 1.13
---

The [canvas save](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save) 2d draw context method can be used to save the state of a 2d canvas drawing context. Once a context has been saved it can later be restored with the canvas restore method. 

Because the canvas save method can be used to save a current state of a drawing context, it can come in handy when using other 2d context methods like [canvas translate](/2019/10/09/canvas-translate/), and [canvas rotate](/2019//11/05/canvas-rotate/) which are two that come to mind right off the bat when it comes to using the canvas save method. The canvas save method can be used to save the current state of the drawing context, and then changes can be made to the fill style, translations, and rotations. Something can then be drawn with these new settings, and then put back the way it was with the canvas restore method. 

So in this post I will be going over some quick examples of the canvas save method, and may other related context methods to point out some reasons why the method is so useful.

<!-- more -->

## 1 - Basic canvas save method example

For starters with the canvas save method, in this example I am just using it to save the drawing context and then just changing the fill color of the context. I then call the restore method and then the old fill color is restored.

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

Using the canvas save method when this is the only change is kind of over kill, still you get the basic idea. The save method can be used to save the state of the drawing context. Maybe it is not called for when it just comes to a fill color change, but if many changes are made from a preferred state it can be useful to quickly restore back to that preferred state once I am done drawing.

## 2 - Canvas save rotate example

One use case example of the canvas save method that comes up often is using the canvas save method when doing on the fly rotations in a canvas project with the canvas translate and rotate methods. The process of doing so typically requires many state chances to the context, starting with a translate to a fixed point of interest in the canvas, followed by the rotation and other state changes.

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

This way of doing rotations works okay with some projects but it does eat up some processing overhead compared to alternatives that involve the use of a sprite sheet. Still computers are fairly fast these days, and as long as heavy use of it is avoided it gets the job done.

## 3 - Conclusion

So then the canvas save method just saves the state of the 2d drawing context. Once the context is saved changes can be made to the various properties of the 2d canvas drawing context. When the older state of the context is to be restored the restore method can then be used to put everything back to the way it was when the save method was called. The canvas save method is then a great way to go back to a default drawing state that does not involve having to go threw each property and set things back for each property that was changed.
