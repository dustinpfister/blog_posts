---
title: Draw Points javaScript example
date: 2021-04-01 13:45:00
tags: [js]
layout: post
categories: js
id: 836
updated: 2021-04-02 11:34:49
version: 1.17
---

For todays [javaScript example](/2021/04/02/js-javascript-example/) I worked out a new draw points method, or actually a [draw line method rather](https://www.javascripttutorial.net/web-apis/javascript-draw-line/) as what I want is a way to draw a collection of points rather than just one. This kind of method would be a typical method that I might use in one or more canvas examples that I am working on that would call for such a method, and would work with one or more methods that I can use to create and mutate a state that would be used by such a draw points method. I have made a method like this many times, but I thought I should work out a half way decent method that will work well with certain situations where I want to have a display object that constitutes many lines. 

When I make a basic draw points method such a method will just draw an array of points in the form of a single array of numbers where each set of two numbers is another point to draw to. That is that the first two numbers in the array are a position to use with the ctx.moveTo method, and then each set of numbers from there is another point to draw to from there with the ctx.lineTo method. However there is much more to drawing lines to a canvas than just having an array of points for a line, such as if the line should be closed at the end or not, and if the what is drawn should just be stroked, filled, or stroked and filled. Also I might want to draw something that involves not just one line, but a whole bunch of lines, with all kinds of different settings for each line or shape. So a simple solution might work okay for starters, but sooner or alter I might want to move on to using something a little more advanced.

So then in this post I will be going over a more advanced draw points method, and a new format of object that I might use as a way to draw images to a canvas without having to bother with external images. This format will not just be a single array of numbers for points, but an [array of such arrays](/2020/03/31/js-array-multidimensional/), in addition I can add some string values that will change settings for each line. I have made a few solutions for this sort of thing, but I think I might like to work out a few more, and also improve the ones that I have all ready made.

<!-- more -->

## 1 - The draw_points.js file

First off I want to go over the draw points javaScript file that will just create, or add to a draw object that it is used with. For this module I made a file where I place the draw points method in a javaScript iife, inside this iife I am going to create or append to a draw object that should be a property of the global object. This might not be the best way to go about doing this, in some projects I might add this method to a draw object in some other way, but for as far as this post is concerned I wanted to make a stand alone method.

```js

(function (global) {
 
    var api = global.draw = global.draw || {}
 
    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    i += 1;
                }
            }
            ctx.lineWidth = lineWidth;
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };
}
    (this));
```

When calling the method the first thing that I will want to give as an argument is the drawing context of the canvas element that I want to draw to. In some use case examples I might use this method to draw directly to a canvas element over and over again, however in other uses cases I might want to use this method to render a sprite sheet in the from of a canvas element just once.

The next argument that I pass when using the method is the points array that I want to use with the method. This time the points array should not just be an array of points, but an array of arrays of points. In addition for each array of points I can put in some string values that will set values for a single line such as the stroke color, fill color, and if the line should be closed or not.

After the points array I can then set the position of the center point for the drawing of the image, and also give an options options object at the end to set some default values for the various properties of each line. Now with all of this together the only thing that I want to do now is just put together a quick little demo to make sure that this method works the way I expected it to with the format of points arrays that I want to use with it.

## 2 - Demo of the draw points method

Now for a simple demo to try this draw points method out to make sure that it is working the way that I want it to. For this demo I will just have a simple draw.js file, and then add to it with my draw points file that I covered above. After that I think that I will just have everything else in the main.js file when it comes to creating the canvas element, creating an array of points arrays, and using the draw points method.

### 2.1 - A draw.js file

For this example I will have just a simple draw.js module that will just contain a draw background method. In a real canvas project often I will end up having far more than just this going on in the module, but for now I want something basic that does not take away from the main event here. The idea here is that I load this file first, and then the draw points method that will then in turn be appended to this object. When I use the draw points method in an actual project I might add the method to the main draw javaScript file of the canvas project rather than doing something like this.

```js
var draw = {};

draw.background = function(ctx, canvas, style){
    ctx.fillStyle = style || 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
```

### 2.2 - The main.js file

Here I have the main javaScript file of the demo of the draw points method. In this main file I create the canvas element, and append it to the hard coded html. I then test out the draw points methods with two examples of the format that I had in mind. One is a literal from where I am just creating a literal array of arrays, and placing some points and settings into the arrays. The other way of creating one of these arrays or arrays is with a method from that I call to create something like this.

```js

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);

canvas.width = 320;
canvas.height = 240;
 
// literal
var points = [
    [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
    [30, 80, 165, 55, 22, 200, 'fill:red']
];
 
// method
var demoMethod = function () {
    var i = 0,
    radius = 50,
    radian,
    arr,
    x,
    y,
    count = 5,
    points = [];
    while (i < count) {
        radian = Math.PI * 2 / count * i;
        x = Math.cos(radian) * radius;
        y = Math.sin(radian) * radius;
        arr = [Math.round(x), Math.round(y), 0, 0, 'stroke:white', 'close:false', 'lineWidth:' + (2 + i * 2)];
        points.push(arr);
        i += 1;
    }
    return points
};
 
draw.background(ctx, canvas, 'blue');
draw.points(ctx, points, 80, 5);
 
console.log(demoMethod());
 
draw.points(ctx, demoMethod(), 80, 100);
```

When this is up and running the demo seems to work just fine. I get the shapes and colors that I would expect, so this draw points method seems to work great. When it comes to using this method in a project doing so is just a matter of working out the methods that I want that will create the arrays of arrays the way that they should be. 

## 3 - Conclusion

There are maybe a few more things here and there that i would like to add, but maybe I should only get around to doing that once I start using this in a real projects or two so I gain a better sense of what is actually needed for this. I do not care to spend time adding features that I think that I might want, or need, for now I just want to have want I know that I want and need. Which of of course just a better draw points method, and so far I think that I all ready have what it is that I wanted.

I all ready have one canvas example in mind that I am sure that I would like to use this with whenI get around to putting a little more time into it. In time I am sure that I might want to use a method like this in a whole bunch of other projects that I might start at some point. It is just a question of creating methods that will create and return the array of arrays in the format that will work with this draw points method. When I get around to creating some new canvas examples, or updating some ones that I have all ready made then I might get around to edit this post a little, however I think there really is only so much more to add when it comes to this. For now you might want to check out my main post on [canvas examples](/2020/03/23/canvas-example/) if you have not done so all ready to see what I have together thus far.

