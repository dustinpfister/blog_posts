---
title: Getting started with canvas basics
date: 2017-05-17 14:19:17
tags: [js,canvas]
layout: post
categories: canvas
id: 20
updated: 2020-07-12 10:25:40
version: 1.22
---

I thought it would be nice to write a few blog posts on the [html 5 canvas element](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) that can be used to create [raiser graphics](https://en.wikipedia.org/wiki/Raster_graphics), animations, user interfaces, and games in a client side javaScript environment with a little code. Mainly just some posts on doing some fun things with the 2d drawing context, but also some topics on game development, animations, and anything else that might come up when it comes to the basics of [canvas elements](https://en.wikipedia.org/wiki/Canvas_element), javaScript, and beyond.

As such maybe it is best to start with a post that is a kind of getting started post on the subject of canvas elements and with that to some extent at least client side javaScript. That is because in order to do anything interesting with canvas, at least some basic working knowledge of javaScript is also required. So lets get this getting started post out of the way so we can get to more interesting topics, and actual full [canvas examples](/2020/03/23/canvas-example/) that really help to show off what canvas is really all about.

<!-- more -->

## 1 - Getting started with Canvas basic example

When it comes to the basics of canvas there is not much to it to get stared assuming that you have at least some knowledge of html and javaScript to begin with. If not this post might not be the best starting point for getting started with javaScript and the other aspects of client side javaScript.

The basic process is to get a reference to a canvas element in html, or create and typically inject one into the html unless you want to do something headless but that is topic for a latter post. Anyway once you have a reference to the canvas element you can then use the get context method of the canvas element reference to get an instance of the [2d drawing context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). This drawing context or api then has all kinds of methods and properties that can be used to draw to the canvas element with javaScript code.

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

This results in just a simple black screen that has a actual native matrix width of 320, and a height of 240 pixels. A typical starting point for any vanilla js canvas project of mine when it comes to just getting the bsics of what the project are off the ground at least. When I mean native size what I really mean is the actual with and height of the canvas in terms of the dimensions of the 2d matrix, not any kind of scaled width and height that can be set with css via the [style api](/2019/02/12/js-javascript-style/) or any other means to set css rules for a canvas element.

In this example I am creating the canvas element, and then appending it to the body of an html document all with javaScript. Another option would be getting a reference to a canvas element that may exist before hand with one of several methods of doing so with canvas elements and elements in general such as the document get element by id method.

So far I am just using the fill style property to set the fill style of the canvas to black, and then using the fill rect method to fill the canvas with the color black. From here on out it is just a matter of getting used to all the other context properties and methods that there are to work with when it comes to rendering at least. 

So far I am not doing much of anything when it comes to having what is often called a model that contains display objects, and other data that may be rendered to the canvas by various means. In addition I am not doing anything with event attachment, or a main app update loop power by [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) for that matter. However you have to start somewhere, and just having a blank black canvas is one such starting point.

## 2 - Actual size vs scaled size

There is the actual width and height of a 2d matrix, and then there is the scaled width and height of the canvas I try to avoid calling theme pixels because in most cases that it not the case when getting into the deep of it when it comes to actual hardware pixels, screen resolution, scaling, and so forth. Often you  might hear the term logical pixels used as a way to describe the difference between the two.

You may regard this as a trivial matter, and to some extent it is, but sometimes it can get a bit confusing. In any case there is setting the actual matrix size of the canvas, and setting the scaled size of the canvas. If you want to set the scaled size with javaScript one way to do it is by way of the style api.

```js
 
// set matrix size
canvas.width = 320;
canvas.height = 240;
 
// set scaled size
canvas.style.width = 640 + 'px';
canvas.style.height = 480 + 'px';
 
```

You may choose to set the scaled size by some other means such as defining a CSS class. In some cases you might not want the scaled size to be static, but set by way of some javaScript code that will fire once and then again each time the window resizes, or when an area of the canvas is clicked. However for now those topics are a little more advanced.

## 3 - Having a one or more draw methods

After having the basic blank black canvas worked out, and the issue of native and scaled canvas size in order, it's now time to do some actual drawing on the canvas. For this example I will just be drawing a white circle in the center of the canvas element using the [canvas arc](/2019/03/05/canvas-arc/) method along with the begin path and stroke methods.

This time I will start pulling some code into functions as a way to keep this a little better organized. There is yet even more that can be done when it comes to not just puling code into functions, but also into modules, and in other files. However for now I will just be making some functions, and pulling code that has to do with setting things up into a setup function, code that has to do with drawing the the circle into a draw function, and also have a CLS or clear screen helper function also.

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

So now I have pulled things into functions, you do not have to do this of course, but it does help to keep things compartmentalized, and as a project grows I might be calling certain methods more than once that allows for be to reduce the volume of code that is being repeated. 

For now I am just using [ctx.strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle), [ctx.beginPath()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath), [ctx.arc](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc), and [ctx.stroke](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke) to draw a circle on the canvas. There are of course ways to go about drawing images from external files, or another canvas, and many other topics, but for now I just want to keep things simple. This is a getting started post on canvas after all.

The begin path method is how to go about starting out with drawing lines with canvas, there are many other options other than the canvas arc method such as move to and line to. I will not be getting into drawing lines in detail here as I have wrote another [post on canvas lines](/2019/03/03/canvas-line/) in which I do this topic a greater deal of justice. Still for a getting started post on canvas I should at least start to touch base on this one at least so lets get to it.


## 4 - Throwing in the loop method.

Now it's time to start getting into doing something fun. In this section I will be pulling everything together above and adding in a loop method that will be called over and over again. Just about all canvas project will involve some kind of main update loop, or will be event driven when it comes to the way that the content of the canvas will be updated.

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

## 5 - requestAnimationFrame, setTimeout, and setInterval

With a canvas project it is best to use [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) over setTimeout, or setInterval. Getting into the reasons why is a whole new post in itself, but for the most part the only reason why you might want to use setTimeout is if you want to push backward compatibility back farther. For the most part I would say that you do not have to worry about that these days though.

## 6 - Conclusion

The purpose of this post was to just set the basics on how I go about starting a canvas project. Doing canvas justice would require writing a whole book on the subject, and even then I am confident that I would not touch base on everything that one may need to be known on the subject of canvas elements and javaScript. 

I have not even mentioned layering, event attachment, how to go about exporting animations that you make, and a wide range of other topics on canvas. Still I hope that this post may get you interested in canvas at least, as it can become very fun to play with.

Be sure to check out my [other posts on canvas](/categories/canvas/).