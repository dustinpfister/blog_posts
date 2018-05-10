---
title: Getting started with canvas
date: 2017-05-17 14:19:17
tags: [js,canvas]
layout: post
categories: canvas
id: 20
updated: 2017-09-30 18:29:02
version: 1.3
---

I thought it would be nice to write a few blog posts on html 5 canvas. Mainly just some posts on doing some fun things with the 2d drawing context. As such maybe it is best to start with a post that is a kind of getting started post on the subject.

<!-- more -->

## The black screen app

Whenever I start a new canvas project with plain old vanilla js, I often start with something like this.

```js
(function () {
 
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    // append to body
    document.body.appendChild(canvas);
 
    // set actual matrix size of the canvas
    canvas.width = 320;
    canvas.height = 240;
 
    // default the canvas to a solid back background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
}
    ());
```

This results in just a simple black screen that has a actual matrix width of 320, and a height of 240 pixels. A typical starting point for any vanilla js canvas project.

In this example I am creating the canvas, and appending it to the body of an html document all with javaScript, rather than getting a reference to a canvas element that may exist before hand.

By native size I mean the actual with and height of the canvas in terms of the dimentions of the 2d matrix, not any kind of scaled width and height.

## Actual size vs scaled size

There is the actual width and height of a 2d matrix, and then there is the size of each x, and y position in the matrix. I try to avoid calling theme pixels because in most cases that it not the case when getting into the deep of it when it comes to actual hardware pixels, screen resolution, scaling, and so forth.

You may regard this as a trivial matter, and to some extent it is, but sometimes it can get a bit confusing. In any case there is setting the actual matrix size of the canvas, and setting the scaled size of the canvas.

If you want to set the scaled size one way to do it is by way of the style api.
```js
 
// set matrix size
canvas.width = 320;
canvas.height = 240;
 
// set scaled size
canvas.style.width = 640 + 'px';
canvas.style.height = 480 + 'px';
 
```

You may choose to set the scaled size by some other means such as defining a CSS class. Whatever the case may be there is both the actual size, and the scaled size.

## Having a single draw method

After having the blank black canvas, and size in order it's now time to actual draw something on it, for this example I will just be drawing a white circle in the center of the canvas.

```js
(function() {
 
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
 
      // setup the canvas
      setup = function() {
 
        // append to body
        document.body.appendChild(canvas);
 
        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 240;
 
        cls();
        draw();
 
      },
 
      // a single draw method
      draw = function(){
      
          // draw a cirlce
          ctx.strokeStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(
              canvas.width / 2, // x
              canvas.height / 2, // y
              50, // radius
              0, // start radian
              Math.PI * 2 // end radian
          );
          ctx.stroke();
      
      },
 
      // clear screen method
      cls = function() {
 
        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
 
      };
 
      // run setup
      setup();
 
  }
  ());
```

So now I have pulled things into functions, You do not have to do this of course, but it does help to keep things compartmentalized. For now I am just using [ctx.strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle), [ctx.beginPath()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath), [ctx.arc](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc), and [ctx.stroke](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke) to draw a circle on the canvas.

Getting started with canvas is often just a means of knowing how to use the various methods, and properties on the [2d canvas drawing context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). It can take a little while, but assuming you have a basic working knowledge of javaScript to begin with, it should not take to long.

## Throwing in the loop method.

Now it's time to start getting into doing something fun.

```js
(function() {
 
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
 
      // the object to draw
      obj = {
 
        x: 0,
        y: 0,
        radius: 50,
        frame: 0,
        maxFrame: 50,
        update: function() {
 
          var per = this.frame / this.maxFrame,
            bias = 1 - Math.abs(per - .5) / .5
 
          this.x = canvas.width / 2 - 100 + 200 * bias;
          this.y = canvas.height / 2;
 
          // step frame
          this.frame += 1;
          if (this.frame >= this.maxFrame) {
 
            this.frame = 0;
 
          }
 
        }
 
      },
 
      setup = function() {
 
        // append to body
        document.body.appendChild(canvas);
 
        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 240;
 
        loop();
      },
 
      // the single draw function
      draw = function() {
 
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
 
      // clear screen
      cls = function() {
 
        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
 
      },
 
      // the loop
      loop = function() {
 
        requestAnimationFrame(loop);
 
        obj.update();
 
        cls();
        draw();
 
      };
 
    setup();
 
  }
  ());
```

So not I am putting together an object that contains values, and so far a single update method. Often I end up going in some kind of direction in which I try to separate a model or sorts from the way that it is being rendered. There is also now a loop method that keeps getting called over, and over again, that updates the model, and draws the current state of that model.

## requestAnimationFrame, setTimeout, and setInterval

With a canvas project it is best to use requestAnimationFrame over setTimeout, or setInterval. Getting into the reasons why is a whole new post in itself, but for the most part the only reason why you might want to use setTimeout is if you want to push backward compatibility back farther. For the most part I would say that you do not have to worry about that these days though.

## Conclusion

The purpose of this post was to just set the basics on how I go about starting a canvas project. Doing canvas justice would require writing a whole book on the subject, and even then I am confident that I would not touch base on everything that is need to be known on the matter. I have not even mentioned layering, event attachment, how to go about exporting animations that you make, and a wide range of other topics on canvas. Still I hope that this post may get you interested in canvas at least, as it can become very fun to play with.

Be sure to check out my [other posts on canvas](/categories/canvas/).