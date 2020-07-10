---
title: Gen and set Canvas position, and canvas relative values
date: 2019-03-14 17:35:00
tags: [js,canvas]
layout: post
categories: canvas
id: 401
updated: 2020-07-10 08:48:47
version: 1.29
---

So then [canvas position](https://stackoverflow.com/questions/17265803/how-to-position-canvas-using-relative-absolute-positioning) might refer to positioning a canvas element using css style rules with the [position property](https://developer.mozilla.org/en-US/docs/Web/CSS/position) mainly. That means setting the position property to something other than the default value for elements which is static positioning, to relative, absolute, or fixed positioning for starters. Once the position property of the canvas is set to something other than static then additional rules like top and left can be used to position the actual canvas element in the container element of the canvas. So then this would not really be a post on canvas alone, but the positioning of HTML elements in general if that is what is meant by canvas position.

However there are some other topics that come to mind as well when it comes to what canvas position might mean. Such as repositioning a canvas element on a browser window resize, and also how to get a mouse or touch pointer event location relative to the current position of the canvas element rather than the window of the browser.

Then of course there is also positioning things inside a canvas when it comes to drawing things in the canvas such as images, paths, text, and so forth. That is having an object that is acting like a display object of sorts, and now to go about positioning that inside the canvas relative to an abstract map of some kind. For the most part a lot of this is simple, but sometimes these sort of things can lead to a time consuming rabbit hole when working out the code for a canvas project.

So then in this post I will be covering some topics when it comes to canvas position topics. That is positioning the canvas itself, getting the canvas rather than window relative position of pointer event objects, and how to go about positioning things inside a canvas element.

<!-- more -->

## 1 - Canvas position using css rules and thee style attribute

So positioning a canvas element with css rules is more of a css topic rather than one that has to do with just canvas elements alone. So then the position css property is not a property that is exclusive to canvas elements alone, but other html elements like divs, images, and just about any other html element that will be displayed in the page for that matter.

Still it is something that does have to do with the topic of canvas position, and it might prove to be a good starting point for this kind of topic. So with that said one way to set canvas position with css is with inline css rules by way of the style attribute of the hard coded canvas element.

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

This above example of course makes use of of relative positioning, but in some situations you might want to use absolute or fixed positioning. I will not be getting into the differences in depth, but those three values for positioning are still the most common and typical values for the position property. I would say that at least those three should be solid in the mind of a jaavScript developer, when it comes to css positioning.

So for a brief overview static positioning is the default position property for elements where the div can not be moved with rules like top and left. Relative positioning is about the same as static but the element can be moved from what would otherwise be the normal default static position with rules like top and left. Absolute positioning breaks the element free from the normal flow of rendering and now positioning happens relative to the parent element that contains the element, and just like with relative positioning properties like top and left can be used. Fixed positioning is also like absolute positioning, but the element can become fixed to the browser window rather than the content of the page, and will remain so even when the user scrolls threw the content of the page.

The style attribute is of course not the only way to go about setting position values by way of some hard coded css in the html itself outside of javaScript. There is using style elements in the head of the html page as a way to define classes that can be applied to the canvas element and any other element. There is of course also using external css files and linking to them also. However in this section I just wanted to get this part out of the way, and get more into what can be done with javaScript code when it comes to positioning the canvas element, and also things that are being rendered inside the canvas.

## 2 - Canvas position on resize

Another canvas position topic might be to position the canvas when the window is resized. This can be done with the resize window event and a simple callback function that positions the canvas with the style api. The [style api](/2019/02/12/js-javascript-style/) is one way to go about setting css rules with javaScript, so it is a way that the canvas can be resized, and positioned by way of some kind of event or condition with javaScript rather than static css rules.

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

This is not just an example of canvas position but of canvas scale also. When it comes to canvas scale that is another rabbit hole of sorts, so I have a [post on the topic of canvas scale](/2019/03/06.canvas-scale/) where I have a lot of that worked out.

## 3 - Canvas mouse position

So another thing about canvas position is how to go about getting the mouse pointer position when clicking on a canvas element. There is a need to get the canvas element relative position of the point that was clicked, or touched, rather than the browser window relative position. So this is another canvas position related topic that will come up now and then when working out a canvas project.

The canvas element relative position of a mouse click, touch start, or similar event can be achieved with the use of the [getBoundingCLientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) method. This is a useful method that can be used to get values that can be used to adjust the window relative x and y position that is gained from the e.clientX, and e.clientY properties of a mouse event object to a canvas relative position.

Something like this might be a good example of that when it just comes to mouse events at least.

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

### 3.1 - Making A Get canvas relative position helper method that will work with both mouse and touch events

The above example will work fine if I just care about a mouse position, however things work a litter differently when it comes to touch events. So it might be a good idea to have some kind of helper method that can be passed an event object and then return a canvas relative position from a mouse or touch event. This kind of method would use the clientX and clientY properties of the event object of they are there, if not it will make use of the first touch object in the event of a touch event.

```js
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};
```


## 4 - Center the canvas position

A common task that is often encountered when starting to play around with canvas is to find a way to center the canvas in the middle of the browser window. There is a whole lot of ways to go about doing this for a canvas of any element in general really. Way back in the day it was not frowned upon to do so with table elements for example, but now that would likely always be considered poor practice. 

So most solutions that would be used today would involve just some quick css. I is also of course possible to do so with javaScript, but more often than not that might prove to be an over complicated solution to a simple problem. Always start with simple HTML, and CSS first if you can not solve the problem with that then look into javaScript powered solutions.

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