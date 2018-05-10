---
title: Separation of concerns, Model and View with HTML 5 Canvas
tags: [js, canvas]
categories: canvas
date: 2017-08-29 10:23:00
id: 33
updated: 2018-04-17 09:59:18
version: 1.5
---

In my first [getting started post](/2017/05/17/canvas-getting-started/) on html 5 canvas I made a simple example on how to quickly throw together a canvas project in a way in which I usually do so. If it is something stupid simple things like [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) does not strike me as something that is that important. However if I do start to put together something that is a little advanced, it does become important as a means of avoiding writing the dreaded spaghetti code.

<!-- more -->

The main thing of concern it seems is to try to find a way to keep a model independent from a view. That is that
you have javaScript that has to do with the state, and manipulation of a model, and a completely separate chuck of JavaScript that renders that model in some way, and then typically some code that ties everything together.

So I will put together a [jsfiddle](https://jsfiddle.net/dustinpfister/mf215hrn/4/) and talk about it in detail here.

## The Model

First off is the model this is what makes up the current state of data, and it also might contain some additional code that has to do with it's storage, retrieval, and manipulation. Yet again maybe not, maybe you might break things down further. The idea here though is to try to break things down into independent parts that may or may not depend on each other.

In this post I will just work with a hacked over version of what I was dealing with in my first canvas post, that looks like this:

```js
// the object to draw
var obj = {
 
  x: 0,
  y: 0,
  radius: 50,
  frame: 0,
  maxFrame: 100,
  per : 0,
  bias : 0,
  update: function(w, h) {
 
    this.per = this.frame / this.maxFrame;
    this.bias = 1 - Math.abs(this.per - .5) / .5;
 
    w = w || 640;
    h = h || 480;
 
    this.x = w / 2 - 100 + 200 * this.bias;
    this.y = h / 2;
 
    // step frame
    this.frame += 1;
    if (this.frame >= this.maxFrame) {
 
      this.frame = 0;
 
    }
 
  }
 
};
```

In the old post this was part of a whole project all warped together in a signal [immediately invoked function expression (IIFE) ](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression). However now it is pulled out of that, and is now it's own little module. References to the canvas have been removed, and replaced with arguments, as doing so is more in line with separating concerns.

So obj will serve as the model, it's job is to just simply serve as the storage of the current state of the model, and provide a method that has to do with the manipulation of that model.

## The View(s)

When you have a given model there is more than one way you can often render data from that model. Yes I can just make a view that displays the current state of the circle, and nothing else. However I can also write a view that displays the current values of all variables concerned, display just a progress bar of two variables concerned, or a whole bunch of things at once.

As such something like this comes to mind.

```js
var obj_canvas = {
 
  // draw the object itself
  draw_obj: function(obj, canvas, ctx) {
 
    // draw a cirlce
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(
      obj.x, // x
      obj.y, // y
      obj.radius, // radius
      0, // start radian
      Math.PI * 2 // end radian
    );
    ctx.stroke();
 
  },
 
  // draw a progress and bias bars
  draw_pb: function(obj, canvas, ctx,x,y,w,h) {
 
      x = x || 0;
      y = y || canvas.height - 10;
      w = w || canvas.width;
      h = h || 10;
 
      ctx.fillStyle = '#000000';
      ctx.fillRect(x,y,w,h);
      ctx.fillStyle = '#0000ff';
 
      // progress
      ctx.fillRect(x,y,w* (obj.frame / obj.maxFrame),h/2);
 
      // bias
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(x,y+h/2,w* obj.bias,h/2);
 
  },
 
  // draw info about the object
  draw_info: function(obj, canvas, ctx,fs) {
 
    fs = fs || 15;
 
    ctx.strokeStyle = '#00ff00';
    ctx.textBaseline = 'top';
    ctx.font = fs+'px arial';
    ctx.strokeText('obj info: ',10,fs*1);
    ctx.strokeText('obj pos: (' + Math.floor(obj.x) + ',' + Math.floor(obj.y)+')',10,fs*2);
    ctx.strokeText('frame: ' + obj.frame + '/' +obj.maxFrame,10,fs*3);
 
  },
 
  // clear screen
  cls: function(canvas, ctx) {
 
    // default the canvas to a solid back background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
  }
 
};
```

This is just a simple example of what I mean, but maybe a better example would have to do with something 3D. When it comes to 3D objects there is the way that we see them, and the way that they actually exist in space. A cube that is the size of yourself on all sides will appear smaller as it moves away from you, but it does not actually get smaller now does it? Software that has to do with the size, position, and manipulation of the cube can be thought of as a Model, while software that has to do with the display of that cube can be though of as a view. Yes you can do what is typical with the view, and make it so it gets smaller as it moves away from a camera, but you don't have to, you can design your view any way you want, you can make (or use) more than one with the same Model if you want.


## The App

So for this post I will just be covering the Model and having at least one or more Views, but I will not be getting into Controllers. I am not going there, at least not today. Still I will need something that fills a void when it comes to how this all ties together. So here it is:

```js
// the app
(function() {
 
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
 
      setup = function() {
 
        // append to body
        document.body.appendChild(canvas);
 
        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 240;
 
        loop();
      },
 
      // the loop
      loop = function() {
 
        requestAnimationFrame(loop);
 
        obj.update(canvas.width, canvas.height);
 
        obj_canvas.cls(canvas, ctx);
        obj_canvas.draw_obj(obj, canvas, ctx);
        obj_canvas.draw_info(obj, canvas, ctx);
        obj_canvas.draw_pb(obj, canvas, ctx);
 
      };
 
    setup();
 
  }
  ());
 
```

So now I just have a simple loop that for now will act as a Controller in the [Model View Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) software architectural pattern. Just with the View I can have more that one Controller, one that updates a model by way of user input, and another by way of some kind of AI script, but that is a whole other ball of wax.

## Conclusion

The goal I had in mind here was to just express the first step with writing better code when in comes to getting into making canvas projects vanilla js style. If a project is very simple it is not that important to think in modular terms, but as things start to get a little complicated, yes it is a good idea to start breaking things down.

Be sure to check out my [other posts on canvas](/categories/canvas/).