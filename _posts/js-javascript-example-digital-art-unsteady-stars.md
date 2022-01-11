---
title: Unsteady Stars Digital Art javaScript example
date: 2022-01-10 14:10:00
tags: [js]
layout: post
categories: js
id: 950
updated: 2022-01-11 10:43:47
version: 1.17
---

Over the last few days I was working on yet another one of my [javaScript examples](/2021/04/02/js-javascript-example/) this time it is yet another Digital Art Projects based off of [revision 5 of my first Object Pool Reduction digital art example](/2021/12/31/js-javascript-example-digital-art-reduce-pool/) that I started late last year. This time around I wanted to make a quick project that was just a bunch of display objects moving around the canvas, each of which also contains a collection of points that form a star. However this is not just any star, but a kind of unsteady star that has more than one collection of points attached to it. One collection of points is a bunch of home points that are the pure position locations for each point in the star, then other collections of points have to do with old, target, and current positions. So then the points move from the home positions to random positions that are a certain random radius and angle from each home position. So then simply put they end up being collections of points that look like stars but the points will move around to these random locations within a range of each home point.

The main goal of this project was not just to create yet another digital art project, but also to continue to practice and refine the basic process that I started with in my first digital art javaScript example project. That is to come up with what the Core idea of a project is first, finish that, then move on to a few additional features. Also when it comes to additional features set a limit as to how many of them there will be, and try to focus on what I really want or need to add to the project. Then onces the few features are done, sop adding features and focus on code readability and fixing bugs. This kind of process combined with sticking to simple, artful projects will then result in me actually finishing a project, and then I will be free to move on to the next idea. With that said I would say that the main goal of this project was a success, now it is just doing the same of the next project, and the project after that. Keeping the ides simple and in the scope of something that I can complete in a few days, or at most a month if it is something that is a little involves.

<!-- more -->

## What to know first before continuing to read this post

This is one of my many posts on a full javaScript example that might be a fairly basic example, but still it is a fair amount of code stretched over several files. This is then not a post intended for people that are new to javaScript, but rather for people that have at least a little experience with javaScript and would like to now start working on some actually prototypes for various kinds of projects.

### The source code for this javaScript example as well as other notes and assets can be found on Github

The full up to date source code for this example can also be found on my [test vjs Github Repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-digital-art-unsteady-stars). This might also be the best way to pull down and use not just this javaScipt example, but all my other javaScript examples that I have made over the years for each [post I have wrote on javaScript in general](/categories/js/).

## 1 - The utilities library

The [utilities library](/2021/08/06/js-javascript-example-utils/) for this example contains a number of methods that I will be using throughout the other files in this over all project. So then many of these methods are usual suspect type methods that I end up using in just about any other javaScript example of mine, but I sill keep the example more or less custom cut for the specific project.

The create canvas method is something that I made for my collection of canvas example posts, for that collection of posts like this collection I was not using any kind of framework and writing all the code from the ground up sort of speak. However I did reuse code from example to example, just as I do with this example, and one thing I wanted to work out is a standard way to create a canvas element, and set up some values for such an element. So then this create canvas method is such a method, and will return an object with a reference to the canvas element, as well as the 2d drawing content of the canvas element.

Another usual suspect method for this utilizes library is the [mathematical modulo](/2017/09/02/js-whats-wrong-with-modulo/) method that is just another way to go about doing what the modulo operator does in native javaScript but it works better with negative numbers.

```js
var utils = {};
// create a canvas element
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};
// wrap a number
utils.wrapNumber = function(n, min, max){
    var r = max - min;
    return (min + ((((n - min) % r) + r) % r));
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
// chunk and array
utils.chunk = function (arr, size) {
    var chunkedArr = [];
    arr = arr || [];
    size = size === undefined ? 1 : size;
    for (var i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};
// PI * 2
utils.PI2 = Math.PI * 2;
// normalize an angle by half
utils.normalizeHalf = function (n, scale) {
    var c = scale || utils.PI2,
    h = c / 2;
    return utils.mod(n + h, c) - h;
};
// the angular distance between two angles
utils.angleDistance = function (a, b, scale) {
    var m = scale || utils.PI2,
    h = m / 2,
    diff = utils.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return utils.mod( Math.abs(diff), m);
};
// get -1, 1, or 0 depending on the the state of two angles
utils.shortestAngleDirection = function (a1, a2, scale) {
    var z = a1 - a2,
    x = utils.normalizeHalf(z, scale || utils.PI2);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};
```

## 2 - The star module

The star module that I am suing for this example is based off of what I worked out for my older [canvas example project and drawing stars](/2020/02/12/canvas-example-star/). It is more or less the same source code, but of course I made some additions to it when it comes to creating an instance of this unsteady star object that I want to use as the main feature of the over all digital art example.

The unsteady star object is just like the same object that is returned by the create1 method of the star module from before. I went with the cerate1 method that works by creating just one line to make a star by bounding between an outer ind inner radius, rather than the other method that words by creating one or two lines depending if the number of points is even or not. So then what is returned by the main unsteady star method is also an Array, but with some named keys attached to the array. As you might guess these additional keys and corresponding values have to do with updating the main collection of points for the star. Speaking of updating things I also of course have an update method for this unsteady star object.

```js
```

## 3 - The object pool module

The object pool module was copied over from the other digital art example that I started this out from. It started out with what what I put together with in my [canvas example on object pools](/2020/07/20/canvas-example-object-pool/). Sense then I keep making little changes to it here and there as needed, and over time I slowly but surly have a more solid module for this sort of thing.

```js
```

## 4 - The game module

I then have the main game state module for this example, which is what I make that is typically used to create and update a main game state object.

```js
```

## 5 - The draw module

I then have a draw module that contains all the methods that I will be using to draw the current state of the game object to a canvas element.

```js
```

## 6 - The main javaScript file

Now that I have everything that I need to create a state object, update that state object, and draw it to a canvas element I will just need a little more javaScript to make use of all of this in the form of a main javaScript file.

```js
```


## 7 - Conclusion

So then I am glad that I followed threw with this project and have completed it by working out the core of the idea first, and also completed just the two features that I hand planed out for this. Of course I could just keep going with this project even further adding yet even more features that have come to mind for the project in terms of other movement modes, and well as whole other kinds of modes that have to do with completely different behavior all together. There is more that could be done with how to go about switching between modes, and also more advanced features for the background, colors, and so forth. However I did only want to spend at most a few days on this and then move on to the next project, which is what I will be doing.

So then the current plans with this at the time of this writing at least is to just do a little clean up with the code in order to help make the over all project a little easier to follow. I fixed all the bugs that I know of at this point as of revision 4 of this project, but I am sure there might be at least one or two more maybe. So then for the most part I intended to just maintain what the project all ready is rather than add more to it, unless of course something happens that might change that for me.
