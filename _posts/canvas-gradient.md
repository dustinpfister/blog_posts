---
title: Canvas Gradient basic example and more
date: 2020-02-05 15:11:00
tags: [canvas]
categories: canvas
layout: post
id: 606
updated: 2020-05-19 12:15:44
version: 1.20
---

A [Canvas Gradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) can be created in HTML 5 canvas with two drawing context methods of interest which are [create Linear Gradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient), and [create Radial Gradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient). 

Once a Gradient object is created it is possible to add color stops to it, once done it can be used as a fill or stroke style in a 2d drawing context using [gradient color](https://en.wikipedia.org/wiki/Color_gradient) rather than just simple static colors. A gradient style is a nice change from just simple solid colors when it comes to drawing with the context methods, but it might not be the end all solution for this sort of thing. There are ways of working out custom logic for making gradient like effects which can be a fun project as well as a good example for creating a model and a way to go about drawing that model using canvas. So lets look at some examples of creating gradients using canvas and javaScript code.

<!-- more -->

## 1 - Canvas Gradient basic example with the Create Linear Gradient method

It might be best to start out with a linear gradient so in this section I will be doing just that. I start out making a canvas element, and getting a drawing context just like any other canvas example. Once I have a drawing context to work with I can call the create linear gradient method of the drawing context. When I do so I will want to pass a starting point and end point of the linear gradient.

After calling the create linear gradient method I will end up getting a gradient object as a product that is returned by calling the method to which I will want to store in a variable. I can then call the add color stop method of that gradient object to set the colors for the gradient by passing the percentage of the linear gradient at which the given color will stop from the beginning or another color stop as the first argument followed by the desired color as the second argument. Once that is done I can then use the gradient as a style for setting the fill and stroke colors.

If you are still confused maybe the best way of understanding what is going on with this would be to just copy and past some code and play around with it. The bellow javaScript example is more or less what I have in mind here when it comes to a simple linear gradient color example.

```js
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// Create a linear gradient
var sp = { // start point
    x: 50,
    y: 50
},
ep = { // end point
    x: canvas.width - 50,
    y: canvas.height - 50
},
gradient = ctx.createLinearGradient(sp.x, sp.y, ep.x, ep.y);
 
// Add color stops
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'orange');
gradient.addColorStop(0.4, 'yellow');
gradient.addColorStop(0.6, 'blue');
gradient.addColorStop(0.8, 'cyan');
gradient.addColorStop(1, 'lime');
 
// use the gradient as a style
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

Simple linear gradients are fine but what about gradients that change in all directions from a fixed point? Well when it comes to working with what there is with the 2d drawing context alone there is another type of built in gradient to work with so lets take a look at that for a moment next.

## 2 - Radial canvas gradient

On top of a simple linear gradient another option is to have a radial gradient. This gradient constructor takes six arguments which are two sets for x y and radian values for two circles that are used to make the gradient. Aside from that it can be used in more or less the same way as a linear gradient when it comes to adding color stops, and using it as a style.

```js
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var x1 = 120,
y1 = 120,
r1 = 25,
x2 = 80,
y2 = 80,
r2 = 100;
gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
 
// Add color stops
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1, 'blue');
 
// use the gradient as a style
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

## 3 - Using the image data constructor and a distance formula

I wrote a post on using the get image data 2d drawing context method, in there I also touched base on the image data constructor and the put image data method. These canvas methods are the standard way to go about working out some logic for drawing something on a pixel per pixel basis. For the most part the built in methods for working out gradients will work just fine, but if I want more control I just have to work out something that will be used to generate image data.

The image data constructor can be used to create an instance of image data that can then be passed to the put image data 2d drawing context method. The unit 8 clamped array constructor most be used to create the array that is to be passed to the image data constructor as the first argument followed by the width and height of the image. I can however juts use a plain old array first and then pass it to the unit 8 clamped array constructor. In  any cause I want to produce a valid instance of image data by way of some javaScript code rather than using the get image data constructor.

When working out the values for the elements of the array I need to think in terms of multiples of four elements when it comes to the red, green, blue, and alpha channels. When looping I can use the distance formula, or any other logic to help with the process of defining what the gradations of color will be.

```js
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

var makeGradiantData = function (w, h, fx, fy, maxDist) {
    var data = [],
    y = 0,
    x,
    i = 0;
    w = w || 128;
    h = h || 64;
    fx = fx || 0;
    fy = fy || 0;
    maxDist = maxDist || 200;
    while (y < w) {
        x = 0;
        while (x < h) {
            // expressions for r,g,b, and alpha
            var d = distance(x, y, fx, fy);
            var dPer = d / maxDist >= 1 ? 1 : d / maxDist;
            var c = 255-Math.floor(dPer * 200 + 55);
            data[i] = c;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;
            i += 4;
            x += 1;
        }
        y += 1;
    }
    return new ImageData(new Uint8ClampedArray(data), w, h)
};
 
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
 
var imgData = makeGradiantData(250, 250, 0,0, 200);
ctx.putImageData(imgData, 0, 0);
```

This example results in a kind of color gradient that is similar to that of the radian color gradient. The dereference of course thorough is that I can tweak the logic that defines the gradation f color any way I see fit.

## 4 - Check out my canvas example of a grid gradient where I am using custom logic to create a gradient effect

I have [started a whole series of canvas example posts](/2020/03/23/canvas-example/) where I am writing about full canvas examples of sorts rather than simple copy and past code examples. One such [post is on a grid gradient](/2020/03/26/canvas-example-grid-gradient/) type thing that came out pretty good that involves a plug-in system and I like they way it came out. 

In the example I am creating a state object that is completely separate from additional javaScript code that renders the current state of that state object to the canvas. The modules that creates and updates the state object contains all the code that is used to create and update color channel values for a bunch of cells in a grid. I am just using a simple distance formula, but there are all finds of ways that I could go about working out custom logic to make gradient like effects.

So far it is one of several projects in my canvas example series that I come back to now and then.

## 5 - Conclusion

Plain old canvas gradients are okay for just quickly painting a gradient, but it takes away from the run of diving deeper into the math that is involved behind them. This is something that I have been toying with for years when it comes to just experimenting and letting my mind flow. There are many ways to go about creating custom gradient like effects where some kind of interesting and novel logic is used to set the color values for a whole bunch of pixels.