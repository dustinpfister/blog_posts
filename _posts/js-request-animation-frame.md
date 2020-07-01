---
title: using requestAnimationFrame in javaScript
date: 2018-03-13 12:37:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 163
updated: 2020-07-01 12:12:08
version: 1.8
---

When making any kind of HTML canvas application there is often a need to have some kind of main update loop where the state of a model is updated, and then rendered using some kind of view. Unless the project is completely event driven there will typically be a need to have a way to run the same method over and over again. There is more than one way to go about having a main  app loop with a canvas project, but one such option is the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) method. For the most part this is the one you will want to go with when it comes to anything involving canvas and an app loop. Generally the other options are only used for other enviorments outside of the main event loop of a front end project, such as webworker, or doing something with nodejs.

<!-- more -->

## 1 - Why requestAnimationFrame.

The request animation frame is one of several ways I know of to get a method to fire over and over again at a certain rate, the other options being setInterval, and setTimeout. The request animation frame method differs from the other options in that it is generally the best way to go about making an app loop in a front end environment. However in some environments and situations it is not available, or the other ways of doing so might still be more appropriate. There is also having a project that is event driven where the view only updates when an event such as a mouse click happens.

## 2 - Why not requestAnimationFrame?

Browser support is pretty good with requestAnimatinFrame, but the other options have been around much longer. If you really care about pushing backward compatibility back far that can easily be fixed with a polly fill. In addition requestAnimationFrame can not be used in a web worker environment, as such the other options mentioned are all that can be used in that kind of environment. Also requestAnimationFrame is very much a front end thing only, so if you make full stack applications with node.js you are limited to the other options.

## 3 - basic demo of requestAnimationFrame

For a basic demo of requestAnimationFrame I put together something that involves the updating of a model, and rendering of that model to a canvas element. The module if you can call it that is just an object literal with an x, y and r properties that are used for the values of a circle. An update method is used to update the position of this module in an app loop that will be made using request animation frame.

```js
(function() {
 
  // a canvas view
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lt = new Date();
 
  canvas.width = 320;
  canvas.height = 240;
 
  document.body.appendChild(canvas);
 
  // a model
  var obj = {
      x: 0,
      y: 0,
      r: 15
    },
    frame = 0,
    maxFrame = 100;
 
  var update = function() {
 
    var per = frame / maxFrame,
      bias = 1 - Math.abs(0.5 - per) / 0.5,
      cx = canvas.width / 2,
      cy = canvas.height / 2,
      
      a = Math.PI * 2 * bias;
 
    obj.x = cx + Math.cos(a) * 100 * bias;
    obj.y = cy + Math.sin(a) * 50;
 
    frame += 1;
 
    if (frame >= maxFrame) {
 
      frame = frame % maxFrame;
 
    }
 
  };
 
  var draw = function() {
 
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
 
  };
 
  var loop = function() {
 
    requestAnimationFrame(loop);
 
    if (new Date() - lt >= 1000 / 60) {
 
      update();
      draw();
 
      lt = new Date();
 
    }
 
  };
 
  loop();
 
}());
```

RequestAnimation frame takes only one argument that is the method to call when it is time to update the animation. Often it is used in a recursive fashion like this, and because it only takes one argument something else must be done in order to set a frame rate.

So now it is just a matter of saving the javaScript code in a basic.js file, and then create an index.html file like this.

```html
<html>
    <head>
        <title>request animation frame</title>
    </head>
    <body>
        <script src="basic.js"></script>
    </body>
</html>
```

When I open the index.html file in my browser I get a looping animation as expected.

## 4 - Conclusion

So request animation frame is the method of choice that I always go with when working out a canvas example of any kind. I have found that it is generaly a better choice than any other options such as set time out or set inteval methods.