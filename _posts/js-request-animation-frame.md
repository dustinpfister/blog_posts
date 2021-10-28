---
title: Using requestAnimationFrame for canvas element loops
date: 2018-03-13 12:37:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 163
updated: 2021-10-28 10:58:35
version: 1.40
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

To start off this section a very basic example of the request animation frame method might be a good idea. So in this example I made an example that is a single stand alone html file with embedded javaScript in a script tag element. In the html I have a hard coned canvas element with the native with and height set by way of the canvas element attributes. Then in the body of the script element I am using the [document.getElementById method](/2018/12/27/js-document-getelementbyid/) as a way to get a reference to the canvas element, once I have the canvas element reference I can use the get context method of the canvas element reference to get an instance of the 2d drawing context for the element. Now that I have a canvas element reference, and a drawing context I will want something that will sever as a crude yet functional model, for this simple example I will just have an x variable that will be used to move a box in the canvas.

I then have my main app loop that makes used of the request animation frame method. Inside the body of this loop method I call the request animation frame method, and pass the loop method itself as the first argument to the method. I then do what I want to do for a single frame such as add a fixed delta value to the x variable, and also maybe used the modulo operator as a way to get the x variable to loop back to zero when it comes out of bounds. There is then the question of drawing to the context using this x variable such as using the [clear rect method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect) of the 2d drawing context, followed by the [fill rect method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect) as a way to draw the box.

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

### 1.2 - The Style API and moving something by pixels per second with requestAnimationFrame example

Often I use request animation frame with canvas projects, but it can also be used with any kind of animation effect in web page. This includes the use of things like the [style api](/2019/02/12/js-javascript-style/) that can be used to change css values of elements by way of javaScript code. With that said in this example I will be using the style api as a way to update the state of a div element that has fixed positioning by mutating the left css property with a variable that I am updating in the body of a loop method powered by request animation frame.

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

## 2 - Simple animation loop example of requestAnimationFrame

For a basic demo of requestAnimationFrame I put together something that involves the updating of a model, and rendering of that model to a canvas element. For this example I am breaking things down into a few javaScript files, on top of the hard coded html that is used to tie everything together. The main javaScript file contains the app loop that makes use of the request animation frame method, but I then have other files that are used to just create and update a state object, and another that is just one way to go about drawing that state object to the canvas elements 2d drawing context. So then in this section I will be going over the source code of these files, and get into detail with any additional topics that come up when doing so.

### 2.1 - The model.js file that creates and updates the state

The source code for the module is wrapped my in what is called an [IIFE or Immediately Invoked Function Expression](/2020/02/04/js-iife/) this is one way of making a module in client side javaScript by having a way so that I define everything as a single object or function that will be returned to just a single [global variable](/2019/01/31/js-javascript-global/). When it comes to making a final product I can event wrap all the various files into a single IIFE to make it so that there are no global variables at all, but getting into that might be a bit to much off topic for this post.

The first public method of note for this example is the create method which I can use in a main javaScript file to create a state object. I can then pass this state object, along with a seconds delta value, to the other public method that is the update method of this module to update the state object. So then for this example I am still keeping things relatively simple in the sense that I have just two public methods for this model module, one to create a state object, and another to update that state object by a seconds delta value.

```js
// A simple Model example
var Model = (function (api) {
    // public api
    var api = {};
    // create a new state
    api.create = function (canvas) {
        var state = {
            canvas: canvas,
            x: 0,
            y: 0,
            r: 25,
            f: 0,
            frame: 0,
            maxFrame: 120,
            fps: 30
        };
        return state;
    };
    // update the state
    api.update = function (state, secs) {
        var per = state.frame / state.maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        cx = state.canvas.width / 2,
        cy = state.canvas.height / 2,
        a = Math.PI * 2 * bias;
        // move x and y by a and bias
        state.x = cx + Math.cos(a) * 100 * bias;
        state.y = cy + Math.sin(a) * 50;
        // step frame
        state.f += state.fps * secs;
        state.f = state.f % state.maxFrame;
        state.frame = Math.floor(state.f);
    };
    // return the public api
    return api;
}
    ());
```

### 2.2 - The draw.js file that draws the current state to a canvas element

I have a module that I can use to create and mutate a state object, but now I am going to want to have a module that will draw that model to a canvas element.

```js
var draw = (function () {
    // draw background
    var background = function (state, ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
    };
    // draw ball
    var ball = function (state, ctx) {
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    // public api is a function
    var api = function (state, ctx) {
        background(state, ctx);
        ball(state, ctx);
    };
    // return the public API
    return api;
}
    ());
```

### 2.3 - The main javaScript file that will create the canvas and use the model and draw modules

Now for the main javaScript file, here in this file I am creating the canvas element, and setting the native size with some javaScript code, and then appending it to the hard coded html of the example. I then create a state object with the create method of my model module, and after that I have my main app loop that is making use of the request animation frame method.

```js
// a canvas element
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
lt = new Date();
canvas.width = 320;
canvas.height = 240;
document.body.appendChild(canvas);
// create the state object
var state = Model.create(canvas);
// loop method using request animation frame
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    Model.update(state, secs);
    draw(state, ctx);
    lt = now;
};
loop();
```

### 2.4 - The html

I will then just need a little HTML that will make use of all of these javaScript files then. For this example I am creating the canvas element and appending it with javaScript code in the main.js file, and when doing so I am appending to the body element. So then this time at least there is just going to need to be a few script tags and that is all.

```html
<html>
    <head>
        <title>request animation frame</title>
    </head>
    <body>
        <script src="model.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When I open the index.html file in my browser I get a looping animation with a ball moving out from the center of the canvas out to the edge of the canvas and back again as expected. There is a great deal that I might add and change here and there, and in time when I come around to editing this post again I might make those changes. However I think for this example at least there is not that much more to do as I just wanted and example that is a very basic project example that is just a simple looping animation, and this is more or less what that is.

## 3 - Conclusion

So request animation frame is the method of choice that I always go with when working out a canvas example of any kind, or to do anything that can be a kind of HTML animation in general actually when it comes to CSS effects. I have found that it is generally a better choice than any other options such as set time out or set interval methods, as the request animation frame is designed for this sort of thing in mind rather than just simply updating a model that does not need to be rendered right alway.

In this post I did not get into canvas animation in depth, but I do have a few posts on canvas including [canvas animation](/2019/10/10/canvas-example-animation-basics/) that might be worth checking out if you are new to canvas, requestAnimationFrame and javaScript in general.