---
title: using requestAnimationFrame in javaScript
date: 2018-03-13 12:37:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 163
updated: 2018-03-13 19:38:51
version: 1.2
---

When making any kind of application there is often a need to have some kind of main update loop where the state of a model is updated, and then rendered using some kind of view. Unless the project is completely even driven there will typically be a need to have a way to run the same method over and over again, this is where things the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) come into play.

<!-- more -->

## Why requestAnimationFrame.

requestAnimationFrame is one of several ways I know of to get a method to fire over and over again, the other options being setInterval, and setTimeout. requestAnimationFrame differs from the other options in that it is generally the best way to go about making an app loop in a front end environment. It allows for smoother animation when using canvas elements, or anything that involves changes to the dom.

## Why not requestAnimationFrame?

Browser support is pretty good with requestAnimatinFrame, but the other options have been around much longer. If you really care about pushing backward compatibility back far that can easily be fixed with a polly fill. In addition requestAnimationFrame can not be used in a web worker environment, as such the other options mentioned are all that can be used in that kind of environment. Also requestAnimationFrame is very much a front end thing only, so if you make full stack applications with node.js you are limited to the other options.

## basic demo of requestAnimationFrame

For a basic demo of requestAnimationFrame I put together something that involves the updating of a model, and rendering of that model.

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