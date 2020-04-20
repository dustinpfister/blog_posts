---
title: Canvas save and restore methods for saving and loading canvas state
date: 2019-08-14 20:13:00
tags: [canvas]
layout: post
categories: canvas
id: 522
updated: 2020-04-20 18:12:55
version: 1.20
---

The [canvas save](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save) 2d draw context method can be used to save the state of a 2d canvas drawing context. Once a context has been saved it can later be restored with the [canvas restore method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore). 

Because the canvas save method can be used to save a current state of a drawing context, it can come in handy when using other 2d context methods like [canvas translate](/2019/10/09/canvas-translate/), and [canvas rotate](/2019//11/05/canvas-rotate/) which are two that come to mind right off the bat when it comes to using the canvas save method. For example the canvas save method can be used to save the current state of the drawing context, and then changes can be made to the fill style, translations, and rotations. Something can then be drawn with this new mutated 2d drawing context state, and then put back the way it was with the canvas restore method once I am done drawing to it.

So in this post I will be going over some quick examples of the canvas save method, and may other related context methods to point out some reasons why the method is so useful.

<!-- more -->

## 1 - Basic canvas save method example

For starters with the canvas save method, in this example I am just using it to save the drawing context and then just change the fill color of the drawing context. I set the drawing fill style of the daring context to red and draw a square first, then call the canvas save method to save that context state. I then change the fill style of the saved context to blue, and draw another square. I then call the restore method and then the old fill color is restored at which point I draw another square that sure enough is red the original color that is was set to before calling save.

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

Using the canvas save method when this is the only change is kind of over kill, still you get the basic idea of what the canvas save and restore methods are used for. The save method can be used to save the state of the drawing context, and then the restore can set it back. 

Maybe it is not called for when it just comes to a fill color change, but if many changes are made from a preferred standard state it can be useful to quickly restore back to that preferred state once I am done drawing with a different state consisting of many changes beyond that of just the fill color. With that said lets look at some additional examples of the canvas save method in action.

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

So the use of the canvas save method combined with restore helps when it comes to making these kinds of changes to the drawing context. This way of doing rotations works okay with some projects but it does eat up some processing overhead compared to alternatives that involve the use of a sprite sheet. Still computers are fairly fast these days, and as long as heavy use of it is avoided it gets the job done.

## 3 - Center a square over a point in the canvas and the canvas save method

Another use case example with the canvas save method would be to draw something relative to a point in the canvas other then the upper left corner of the canvas. In other words to make it so that the point 0,0 actually ends up being another point of interest in the canvas then draw something relative to 0,0, but have it drawn at that point of interest other that what is the default.

To put it another way say I want a draw method that will draw a box centered over a point in the canvas. One way to do so would be to pass adjusted x and y values to the fillrect context method, or whatever other methods I might use to draw the box. However another way would be to use canvas save to save the context, translate to the point of interest, and then use half the width of the box multiplied by negative one and do the same for height.

```html
<html>
    <head>
        <title>canvas save rotate example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas =document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var drawBackground = function(ctx, canvas){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
};
 
var drawBoxOverPoint = function(ctx, x,y, w, h){
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.translate(x, y);
  ctx.fillRect(w / 2 * -1,h / 2 * -1, w, h);
  ctx.restore();
};
 
drawBackground(ctx, canvas);
drawBoxOverPoint(ctx, 16, 16, 32, 32);
 
        </script>
    </body>
</html>
```

So the canvas save method can be used whenever I want to do anything that involves the process of changing the position of the origin in the canvas.

## 4 - Conclusion

So then the canvas save method just saves the state of the 2d drawing context. Once the context is saved changes can be made to the various properties of the 2d canvas drawing context. When the older state of the context is to be restored the restore method can then be used to put everything back to the way it was when the save method was called. The canvas save method is then a great way to go back to a default drawing state that does not involve having to go threw each property and set things back for each property that was changed.
