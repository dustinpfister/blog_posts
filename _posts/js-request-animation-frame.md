---
title: using requestAnimationFrame in javaScript
date: 2018-03-13 12:37:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 163
updated: 2021-10-28 09:08:12
version: 1.22
---

When making any kind of HTML canvas application there is often a need to have some kind of main update loop where the state of a model is updated, and then rendered using some code that can be thought of as a kind of view when drawing to the canvas elements context. Unless the project is completely event driven there will typically be a need to have a way to run the same method over and over again. There is more than one way to go about having a main app loop with a canvas project, but one such option that might be the best choice these days is the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) method. 

For the most part the request animation frame method is the one you will want to go with when it comes to anything involving canvas elements and an app loop. Generally the other options such as the [setTimout](/2018/12/06/js-settimeout/) and [setInterval](/2018/03/08/js-setinterval/) methods are only used for other environments outside of the main event loop of a front end project, such as webworker, or doing something with nodejs.

<!-- more -->


## 1 - Request Animation Frame basics

The request animation frame is one of several ways I know of to get a method to fire over and over again at a certain rate. When it comes to client side javaScript, more often then not I would use requestAnimationFrame, but the other options still have there place such as when working with webWorker, and also some situations in which I just want to update a model in the background.

Never the less in this section I will be going over some details when it comes to requestAnimationFrame by starting out with just a few basic examples of the method, and all the various other little things to be aware of when it comes to starting out with a canvas project application loop. I will be doing by best to try to keep the examples in this section fairly simple but I assume that you have at least some background when it comes to [getting started with javaScript](/2018/11/27/js-getting-started/).

When I first got started with javaScript I was creating simple projects that would work by way of the [file protocol](/2020/09/21/js-request-animation-frame/). With that said these examples will work fine that way, however when continuing to work with canvas sooner or later you might run into problems creating and working with projects that way and thus will need to fine a way to [host files by way of the http protocol](/2017/12/04/nodejs-simple-static-server-file/) even if you just want to work on them, and view them locally.

### - These source code examples are on Github

The source code examples in this post as well as all my [other posts on vanilla javaScript topics](/categories/js/) can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-request-animation-frame) on Github.

### 1.1 - Basic request animation frame method example

To start off this section a very basic example of the request animation frame method might be a good idea, so in this example I made an example that is a single stand alone html file with embedded javaScript.

```html
<html>
    <head>
        <title>request animation frame</title>
    </head>
    <body>
        <canvas id="the_canvas" width="640" height="480"></canvas>
        <script>
var canvas = document.getElementById('the_canvas'),
ctx = canvas.getContext('2d'),
x = 0;
var loop = function(now){
    requestAnimationFrame(loop);
    // update x
    x += 5; x %= canvas.width;
    // draw to the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, 240 - 32, 64, 64);
};
loop();
        </script>
    </body>
</html>
```

### 1.2 - Moving something by pixels per second requestAnimationFrame example

Most of the time the basic idea is to call the request animation frame method inside the body of a loop function, and pass a reference to the loop function as the first argument when calling request animation frame. Inside the loop functionI will want to do something that will update the state of an animation, and then render the result.

Often I use request animation frame with canvas projects, but it can also be used with any kind of animation effect in web page. This includes the use of things like the style api that can be used to change css values of elements. Which is what I will be using in this basic request animation frame example.

```html
<html>
    <head>
        <title>request animation frame</title>
    </head>
    <body>
        <div id="thediv" style="position:fixed;width:32px;height:32px;background:red;top:0px;"></div>
        <script>
var lt = new Date(),
div = document.getElementById('thediv'),
x = 0, pps = 128;
// loop function
var loop = function(now){
    var t = secs = (now - lt) / 1000;
    if(secs > 0){
        x += pps * secs;
        x %= window.innerWidth;
    }
    div.style.left =  Math.floor(x) + 'px';
    // calling loop function with requestAnimationFrame
    requestAnimationFrame(loop);
    lt = now;
};
loop();
        </script>
    </body>
</html>
```

So I have an HTML document, and a div element with fixed positioning set, along with some additional fixed style with in-line style. In a script tag I have some variables that will store things like the last time the loop updated, a reference to the div element I want to move, and the current position, and pixel per second rate of movement.

I then have the loop method, which is the method that I will be using with request animation frame, as such there will be a time stamp given via the first argument of the loop method. This time stamp value will just be a number value in milliseconds of the current time. So it is just a way to help keep me from having to create a new date object in each call of the loop function. I can then use this time stamp value with my last time value to get the number of seconds that have passed sense the last update. This seconds value can the be used as a way to update the state of a value by time rather then the rate at which the function calls.

### 1.2 - Why requestAnimationFrame.

The request animation frame method differs from the other options in that it is generally the best way to go about making an app loop in a front end environment. However in some environments and situations it is not available, or the other ways of doing so might still be more appropriate. There is also having a project that is event driven where the view only updates when an event such as a mouse click happens.

### 1.3 - Why not requestAnimationFrame?

Browser support is pretty good with requestAnimatinFrame, but the other options have been around much longer. If you really care about pushing backward compatibility back far that can easily be fixed with a polly fill. In addition requestAnimationFrame can not be used in a web worker environment, as such the other options mentioned are all that can be used in that kind of environment. Also requestAnimationFrame is very much a front end thing only, so if you make full stack applications with node.js you are limited to the other options.

## 2 - Example of requestAnimationFrame

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

## 3 - Conclusion

So request animation frame is the method of choice that I always go with when working out a canvas example of any kind, or to do anything that can be a kind of HTML animation in general actually when it comes to CSS effects. I have found that it is generally a better choice than any other options such as set time out or set interval methods, as the request animation frame is designed for this sort of thing in mind rather than just simply updating a model that does not need to be rendered right alway.

In this post I did not get into canvas animation in depth, but I do have a few posts on canvas including [canvas animation](/2019/10/10/canvas-example-animation-basics/) that might be worth checking out if you are new to canvas, requestAnimationFrame and javaScript in general.