---
title: Getting started with deterministic systems using javaScript and canvas.
date: 2017-08-09 14:38:40
tags: [js,discovery,deterministic,canvas,animation]
layout: post
categories: discovery
id: 30
updated: 2017-09-30 18:46:06
version: 1.2
---

Now that I have a decent understanding of a certain programing environment I find myself facing a new kind of problem with respect to what it is that I want to do with my coding ability, that is why I stared the [discovery category](/categories/discovery/) of [this site](/). 


Anyway in my efforts to find something interesting to work on, I have come across the concept of something called a [deterministic system](https://en.wikipedia.org/wiki/Deterministic_system). From what I have found out so far it is a fancy name for a system in which there is no randomness, or variation of any kind when the system exists in a state with the same time index, and initial model values.

<!-- more -->

Think of it this way, a deterministic system is more like a movie than that of a video game, but it is not just a fixed collection of frames. Each frame is the result of some kind of procedure, and although each frame is the same every time given the same time index value, this is only true if the initial state is the same. I can play around with the initial state values, changing the outcome of all the frames of the movie.

## The criteria.

Do not let the fancy name fool you, a deterministic system can be very complicated, but they can also be stupid simple as well. Regardless of how simple or complex this kind of system is, it should meet certain criteria which I would say follows these rules.

* It has a certain initial state
* It has one or more methods that change that state over time (it's a kind of animation).
* The methods do not make use of any kind of randomness, user input, or any other kind of data that will result in variations in future states.
* Any frame will be the same as it was last time the simulation ran, assuming the initial state has not changed.
* variation of any kind is only achieved by way of manipulation of the initial state.

## The basic box deterministic system

So I [put together a jsfiddle](https://jsfiddle.net/dustinpfister/qqorw23h/6/) for a simple hello world example of what I am taking about here.

### HTML

For this example I will be using some hard coded html.

```html
<div>
  <canvas id="ds_canvas"></canvas>
  <br>
  <div id="ds_control">
    <span>time: <input id="ds_slide_time" type="range" value="0"></span><br>
    <span>size: <input id="ds_slide_size" type="range" value="0"></span><br>
  </div>
</div>
```

### JS

Now for the javaScript that helps to make magic happen.

```js
// the box module that will contain the system state,
// and some methods to work with it
let box = {
 
  // frame, and maxFrames
  frame: 0,
  maxFrame: 50,
 
  // for now just deltaSize will be a value that can 
  // be played with other than time
  deltaSize: 0,
 
  // what to find an a for frame basis
  forFrame: function() {
 
    // percent done (0 to 1)
    this.per = this.frame / this.maxFrame;
 
    // what I have been calling bias (0 to 1 back to 0)
    this.bias = 1 - Math.abs(.5 - this.per) / .5;
 
    // apply delta size
    let size = 16 + this.deltaSize * this.bias;
    this.w = size;
    this.h = size;
 
    // what will change for each frame
    this.x = (320 - this.w) * this.bias;
    this.y = 20;
 
  },
 
  // set state by value of 0 to 1
  set: function(per) {
 
    this.frame = Math.floor(per * this.maxFrame);
    this.forFrame();
 
  },
 
  // draw the state of the box to the canvas
  draw: function(ctx) {
 
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.w, this.h);
 
  },
 
  // controls
  change: {
 
    // change time
    time: function(e) {
 
      box.set(e.target.value / 100);
 
    },
 
    // change start size
    delta_size: function(e) {
 
      box.deltaSize = e.target.value / 100 * 64 + 32;
 
      box.forFrame();
 
    }
 
  }
 
};
 
box.set(0);
 
(function() {
 
    // create and inject a canvas
    let get = function(id) {
 
        return document.getElementById(id);
 
      },
 
      canvas = get('ds_canvas'),
      ctx = canvas.getContext('2d'),
 
      setup = function() {
 
        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 150;
 
        draw();
 
      },
 
      // the single draw function
      draw = function() {
 
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
 
        box.draw(ctx);
 
      },
 
      change = function(e) {
 
        let key = e.target.id.replace(/ds_slide_/, '');
 
        box.change[key](e);
 
        draw();
 
      };
 
    // event handlers
    get('ds_slide_time').addEventListener('input', change);
    get('ds_slide_delta_size').addEventListener('input', change);
 
    setup();
 
  }
  ());
```

So In this application I thought it would be nice to just have a range input element that can be used to control time rather than having a flashy application just run. For now the only thing that can be changed is the deltaSize value I put in there just so there is some initial state value that can be changed.

With the nature of this kind of system, any change to the initial state will change all other states of the system, both past, and future.

# The Box app in action.

<div>
  <canvas id="ds_canvas"></canvas>
  <br>
  <div id="ds_control">
    <span>time: <input id="ds_slide_time" type="range" value="0"></span>
    <br>
    <span>size: <input id="ds_slide_delta_size" type="range" value="0"></span>
    <br>
  </div>
</div>

<script>

// the box module that will contain the system state,
// and some methods to work with it
let box = {

  // frame, and maxFrames
  frame: 0,
  maxFrame: 50,

  // for now just deltaSize will be a value that can 
  // be played with other than time
  deltaSize: 0,

  // what to find an a for frame basis
  forFrame: function() {

    // percent done (0 to 1)
    this.per = this.frame / this.maxFrame;

    // what I have been calling bias (0 to 1 back to 0)
    this.bias = 1 - Math.abs(.5 - this.per) / .5;

    // apply delta size
    let size = 16 + this.deltaSize * this.bias;
    this.w = size;
    this.h = size;

    // what will change for each frame
    this.x = (320 - this.w) * this.bias;
    this.y = 20;

  },

  // set state by value of 0 to 1
  set: function(per) {

    this.frame = Math.floor(per * this.maxFrame);
    this.forFrame();

  },

  // draw the state of the box to the canvas
  draw: function(ctx) {

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.w, this.h);

  },

  // controls
  change: {

    // change time
    time: function(e) {

      box.set(e.target.value / 100);

    },

    // change start size
    delta_size: function(e) {

      box.deltaSize = e.target.value / 100 * 64 + 32;

      box.forFrame();

    }

  }

};

box.set(0);

(function() {

    // create and inject a canvas
    let get = function(id) {

        return document.getElementById(id);

      },

      canvas = get('ds_canvas'),
      ctx = canvas.getContext('2d'),

      setup = function() {

        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 150;

        draw();

      },

      // the single draw function
      draw = function() {
 
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
 
        box.draw(ctx);
 
      },
 
      change = function(e) {
 
        let key = e.target.id.replace(/ds_slide_/, '');
 
        box.change[key](e);
 
        draw();
 
      };
 
    // event handlers
    get('ds_slide_time').addEventListener('input', change);
    get('ds_slide_delta_size').addEventListener('input', change);
 
    setup();
 
  }
  ());

</script>

## conclusion

In a future post I may write about how to go about making a more interesting example, but for now this post is just about the basic idea of how I go about making this kind of project. Deterministic systems can be very interesting, and fun to play with when they are something other than just a white box moving across the screen. They can also be useful when you start to get into complex ones that illustrate the process of a chemical reaction or problem with complex geometry.

Be sure to check out my many other [posts on discovery](/categories/discovery/).