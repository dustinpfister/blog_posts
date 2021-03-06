---
title: Using scatter plots to gain a better understanding of statistics 
date: 2018-02-23 21:20:00
tags: [js,statistics]
layout: post
categories: statistics
id: 158
updated: 2021-03-06 14:56:11
version: 1.8
---

The subject of [Statistics](https://en.wikipedia.org/wiki/Statistics) can become a little complicated, but if you are like me visualizing what is going on can help to make something complicated easier to understand. In this post I will be using [scatter plots](https://en.wikipedia.org/wiki/Scatter_plot) to help gain a better understanding of certain subjects in statistics.

A scatter plot is a good way to go about visualizing data where each data element in a population or sample has at least two values that can be mapped to the x and y axis. It can also be used as a way to make sense of things like the differences between the various means, and all kinds of various values that can come up in such a graph. 

I have made lots of projects that involve having a lot of display objects that are placed in various locations within a canvas matrix. This is a common tasks when it comes to making a wide rang of games after all, so having a scatter plot is not to dissimilar to that of having an object pool. The only difference then is applying some meaning to the position of the objects, rather than having them just randomly move around the canvas like I usually do.

<!-- more -->

## 1 - The basic idea of a scatter plot

A scatter plot is just a collection of points in a plain. It can be just a collection of 2d points, making it a common choice to visualize data that can be expressed with two dimensions. However there can also have a 3d scatter plot, as well as use colors, and shapes to add additional dimensions if needed.

To get started playing around with scatter plots in javaScript I will need some kind of module that will store the data that will be graphed, and a way to render it.

```js
var data = [12, 24, 38, 20, 40, 42, 57]
 
var scatter = (function() {
 
  var api = {
 
    points: []
 
  };
 
  api.plotRand = function(count, bx) {
 
    count = count || 10;
    bx = bx || {};
 
    bx.x = bx.x || 10;
    bx.y = bx.y || 10;
    bx.w = bx.w || 310;
    bx.h = bx.h || 220;
 
    this.points = [];
 
    var i = count;
 
    while (i--) {
 
      this.points.push({
 
        x: Math.random() * (bx.w - bx.x) + bx.x,
        y: Math.random() * (bx.h - bx.y) + bx.y
 
      });
 
    }
 
  };
 
  // a plot data method
  api.plotData = function(data, func) {
 
    api.points = [];
 
    data.forEach(function(n, i) {
 
      var pt = func(n, i);
 
      api.points.push(pt);
 
    });
 
  };
 
  return api;
 
}());
 
// start by plotting some random numbers
scatter.plotRand();
 
// and of course I need a way to render the scatter plot
var canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');
 
canvas.width = 320;
canvas.height = 240;
 
ctx.fillStyle = '#afafaf';
ctx.fillRect(0, 0, canvas.width, canvas.height);
 
ctx.strokeStyle = '#000000';
scatter.points.forEach(function(pt) {
 
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
 
});
 
document.body.appendChild(canvas);
```

So now with this example I am just plotting some random points all over the canvas just as a way to test this out. The result is what I would expected, and this is just then yet another way to go about doing what I have all ready done a number of times many different ways. The only thing to do now is work out another example that will make use of some kind of real data when it comes to making a scatter plot.

## 2 - Conclusion

Sorry for the short post for now. I am postponing development of my posts on statistics for now, but will defiantly get back to this one at some point. Scatter plots strike me as a very nice graphical way of making sense of data, and concepts in statistics such as standard deviation, and the various types of means in statistics.

The best thing that I could do is get into some kind of project where I have some real data to work with that I then need to create some kind of graphical representation of. There is then just getting creative when it comes to all the various was I can then make sense of data with graphs and various ways of making artful things that work with data.
