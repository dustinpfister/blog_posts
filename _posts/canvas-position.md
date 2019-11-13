---
title: Canvas position
date: 2019-03-14 17:35:00
tags: [js,canvas]
layout: post
categories: canvas
id: 401
updated: 2019-11-13 13:14:47
version: 1.16
---

So then [canvas position](https://stackoverflow.com/questions/17265803/how-to-position-canvas-using-relative-absolute-positioning) might refer to positioning a canvas element using css style rules with the [position property](https://developer.mozilla.org/en-US/docs/Web/CSS/position) mainly. That means setting the position property to something other than the default for elements which is static positioning, to relative, absolute, or fixed positioning, and then using additional rules like top and left to position the actual canvas element that way. So then this would not really be a post on canvas alone, but the positioning of HTML elements in general.

However there are some other topics that come to mind as well. Such as repositioning a canvas element on a browser window resize, and also how to get a mouse or touch pointer event location relative to the current position of the canvas element rather than the window of the browser. The of course there is positioning things inside a canvas when it comes to drawing things in the canvas as well. 

So then in this post I will be covering some topics when it comes to canvas position related topics.

<!-- more -->

## 1 - Canvas position using css rules

So positioning a canvas element with css rules is more of a css topic rather than one that has to do working with the canvas drawing context, or anything that is exclusive to canvas rather than html dom elements in general. Still it is something that might have to do with the topic of canvas position, so one way is with inline css rules like so.

```html
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

This above example of course makes use of of relative positioning, but in some situations you might want to use absolute or fixed positioning as well.

## 2 - Canvas position on resize

Another canvas position topic might be to position the canvas when the window is resized. This can be done with the resize window event and a simple callback function that positions the canvas with the style api.

```html
<html>
    <head>
        <title>canvas position resize</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script>
// get canvas, set native size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// position canvas method
var positionCanvas = function(){
    canvas.style.position = 'absolute';
    canvas.style.top = window.innerHeight / 2 - canvas.height / 2 + 'px';
    canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + 'px';
};
 
// attach position canvas method to window resize event
window.addEventListener('resize', positionCanvas);
// call it for the first time
positionCanvas();
 
// draw
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
        </script>
    </body>
</html>
```

## 3 - Canvas mouse position

So another thing about canvas position is how to go about getting the mouse pointer position when clicking on a canvas. There is a need to get the canvas element relative position rather than the browser window relative position. This can be achieved with the [getBoundingCLientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) method. This is a useful method that can be used to adjust the window relative x and y position that is gained from the e.clientX, and e.clientY properties of an event object to a canvas relative position.

```html
<html>
    <head>
        <title>canvas position mouse</title>
    </head>
    <body>
        <canvas 
            id="the-canvas" 
            style="position:absolute;left:50px;top:50px;">
        </canvas>
        <script>
// get canvas, set native size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// get mouse position
var getPos = function(e){
    var bx = e.target.getBoundingClientRect(),
    x = e.clientX - bx.left,y = e.clientY - bx.top;
    console.log(x,y);
}
canvas.addEventListener('mousedown', getPos);
 
// draw
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
        </script>
    </body>
</html>
```

## 4 - Center the canvas position

A common task that is often encountered when starting to play around with canvas is to find a way to center the canvas in the middle of the browser window. There is a whole lot of ways to go about doing this for a canvas of any element in general really, way back in the day it was not frowned upon to do so with table elements for example. However most solutions that would be used today would involve just some quick css, or a more complex solution with javaScript.

### 4.1 - Using the margin auto trick to center a canvas

One way to center a canvas horizontally at least is the margin auto trick when setting the display css property of the canvas to block.

```html
<html>
    <head>
        <title>canvas center position </title>
    </head>
    <body>
           <canvas 
            id="the-canvas" 
             width="320" height="240" 
             style="display:block;margin-left:auto;margin-right:auto;">
           </canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
        </script>
    </body>
</html>
```

### 4.2 - Using window.innerWidth, height, fixed positioning and javaScript

Another approach to centering a canvas, or any dom element for that matter would be to use javaScript, fixed positioning, and the window inner width and height properties of the window object. This is a way to just get the inner size of the browser window, and then just do the math to set the position of the canvas to the center of the browser window.

```html
<html>
    <head>
        <title>canvas center position </title>
    </head>
    <body>
           <canvas 
            id="the-canvas" 
             width="320" height="240",
             style="position:fixed;">
           </canvas>
        <script>
 
var centerCanvasPosition = function(canvas){
  canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + 'px';
  canvas.style.top =window.innerHeight / 2 - canvas.height / 2 + 'px';
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
// center canvas for starters
centerCanvasPosition(canvas);
// and on every resize
window.addEventListener('resize',function(){
  centerCanvasPosition(canvas);
});
        </script>
    </body>
</html>
```

## 5 - Conclusion

So the canvas position could refer to a few things, but only so much. The positioning of a canvas is not all that different from that of positioning any other html element when it comes to setting the dom element position. It is a good idea to get up to speed with the differences between the various types of values for the position css property if you have not done so all ready at this point.