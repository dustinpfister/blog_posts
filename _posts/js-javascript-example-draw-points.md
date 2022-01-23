---
title: Draw Points javaScript example
date: 2021-04-01 13:45:00
tags: [js]
layout: post
categories: js
id: 836
updated: 2022-01-23 13:31:16
version: 1.25
---

For todays [javaScript example](/2021/04/02/js-javascript-example/) I worked out a new draw points method, or actually a [draw line method rather](https://www.javascripttutorial.net/web-apis/javascript-draw-line/) as what I want is a way to draw a collection of points rather than just one. This kind of method would be a typical method that I might use in one or more canvas examples that I am working on that would call for such a method, and would work with one or more methods that I can use to create and mutate a state that would be used by such a draw points method. I have made a method like this many times, but I thought I should work out a half way decent method that will work well with certain situations where I want to have a display object that constitutes many lines. 

When I make a basic draw points method such a method will just draw an array of points in the form of a single array of numbers where each set of two numbers is another point to draw to. That is that the first two numbers in the array are a position to use with the ctx.moveTo method, and then each set of numbers from there is another point to draw to from there with the ctx.lineTo method. However there is much more to drawing lines to a canvas than just having an array of points for a line, such as if the line should be closed at the end or not, and if the what is drawn should just be stroked, filled, or stroked and filled. Also I might want to draw something that involves not just one line, but a whole bunch of lines, with all kinds of different settings for each line or shape. So a simple solution might work okay for starters, but sooner or alter I might want to move on to using something a little more advanced.

So then in this post I will be going over a more advanced draw points method, and a new format of object that I might use as a way to draw images to a canvas without having to bother with external images. This format will not just be a single array of numbers for points, but an [array of such arrays](/2020/03/31/js-array-multidimensional/), in addition I can add some string values that will change settings for each line. I have made a few solutions for this sort of thing, but I think I might like to work out a few more, and also improve the ones that I have all ready made.

<!-- more -->

## 1 - The draw_points.js file

So then here I have a draw.js file with my draw points method that will draw a collection of points following a certain standard that I have worked out that I seem to be using in a few projects for better or worse. The way that I make this draw.js file is the same way that I make just about all my other draw.js files when working gout a project so the process of adding or removing this from a project would just be a simple as adding or removing the function that I am assigning to the points property of the api variable that I end up returning as the public API of the draw library.

```js
var draw = (function(){
 
    var api = {};
 
    // draw a background
    api.background = function(ctx, canvas, style){
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
 
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
 
    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        // for each line in points
        points.forEach(function (pointArray) {
            // number of items in the array of point values/commands
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            // loop over the line
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    // step by two if numbers
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
                        if(parts[1].toLowerCase() === 'false'){
                            fill = false;
                        }
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    // step by one if one of these values
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
 
    // return the public api
    return api;
 
}());
```

When calling the method the first thing that I will want to give as an argument is the drawing context of the canvas element that I want to draw to. In some use case examples I might use this method to draw directly to a canvas element over and over again, however in other uses cases I might want to use this method to render a sprite sheet in the from of a canvas element just once.
The next argument that I pass when using the method is the points array that I want to use with the method. This time the points array should not just be an array of points, but an array of arrays of points. In addition for each array of points I can put in some string values that will set values for a single line such as the stroke color, fill color, and if the line should be closed or not.

After the points array I can then set the position of the center point for the drawing of the image, and also give an options options object at the end to set some default values for the various properties of each line. Now with all of this together the only thing that I want to do now is just put together a quick little demo to make sure that this method works the way I expected it to with the format of points arrays that I want to use with it.

## 2 - Demo of the draw points method

Now for a demo to try this draw points method out to make sure that it is working the way that I want it to. For this demo I will have a few files one of which is a utilities library, another is a points module, and the final javaScript file is a main javaScript file that will make use of all of the other files that i have wrote about in this post. The main file of interest in this example though would be the points.js file that is the current state of a module that I am using to cerate an instance of the kind of object that I use with this draw points method.

### 2.1 - utilities

Here I have a [general utilizes library](/2021/08/06/js-javascript-example-utils/) that I am using in the rest of the source code of this example.

```js
var utils = {};
 
//-------- ----------
//  Array
//-------- ----------
 
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
 
//-------- ----------
//  Object
//-------- ----------
 
// parse an object with defaults
utils.defaults = function(obj, defaults){
    return Object.assign({}, defaults, obj);
};
```

### 2.2 - The points module

This is then the current state of a points model that is used to create and return a collection of points that is formated in a way that will work with the draw points method. For now there are a few methods that have to do with creating a starting geometry one of which is to create a box, and the other is to create an ellipse that can also be used to create a box as well as a circle.

```js
var pointMod = (function(){
    var api = {};
    // create box method
    api.createBox = function(opt){
        // parse options
        opt = opt || {};
        opt = utils.defaults(opt, {
            x: 0, y: 0, w: 50, h: 50, fill: 'white', stroke: 'black', lineWidth: 6
        });
        // push points
        var points = [[]],
        i = 0,
        len = 2 * 4,
        hw = opt.w / 2,
        hh = opt.h / 2;
        while(i < len){
            var pi = Math.floor(i / 2),
            yi = Math.floor(pi / 2),
            y = (opt.y - hh) + yi * opt.h,
            x = (opt.x - hw) + ( yi === 0 ? pi % 2 : 1 - pi % 2 ) * opt.w;
            points[0].push(x, y);
            i += 2;
        }
        // push style opttions for the line
        points[0].push('fill:' + opt.fill);
        points[0].push('stroke:' + opt.stroke);
        points[0].push('lineWidth:' + opt.lineWidth);
        // return box points
        return points;
    };
    // a createBox2 method that almost creates the same output as createBox method using the createEllipse method
    api.createBox2 = function(opt){
        // parse options
        opt = opt || {};
        opt = utils.defaults(opt, {
            x: 0, y: 0, w: 50, h: 50, fill: 'white', stroke: 'black', lineWidth: 6, startDegree: 45 * 5
        });
        return api.createEllipse(utils.defaults({ r1: (opt.w / 2) * 1.4, r2: (opt.h / 2) * 1.4, points: 4 }, opt));
    };
    // create ellipse
    api.createEllipse = function(opt){
        // parse options
        opt = opt || {};
        opt = utils.defaults(opt, {
            x: 0, y: 0, startDegree: 0, r1: 160, r2: 120, points: 30, fill: 'white', stroke: 'black', lineWidth: 6
        });
        // push points
        var points = [[]],
        i = 0,
        len = opt.points * 2,
        radianStart = Math.PI / 180 * opt.startDegree;
        while(i < len){
            var radian = radianStart + Math.PI * 2 / opt.points * (i / 2),
            x = Math.round(opt.x + Math.cos(radian) * opt.r1),
            y = Math.round(opt.y + Math.sin(radian) * opt.r2);
            points[0].push(x, y);
            i += 2;
        }
        // push style options for the line
        points[0].push('fill:' + opt.fill);
        points[0].push('stroke:' + opt.stroke);
        points[0].push('lineWidth:' + opt.lineWidth);
        points[0].push('close:true');
        // return ellipse points
        return points;        
    };
    // return a new points object that is numbers only
    api.numbersOnly = function(points){
        return points.map(function(line){
            return line.filter(function(el){
                return typeof el === 'number';
            });
        });
    };
    api.newChunked = function(points){
        var nPoints = pointMod.numbersOnly( points );
        return nPoints.map(function(line){
            return utils.chunk( line, 2 );
        });
    };
    // translate a single point with the given points object along with line and point index values
    // by the given set of deltas
    api.translatePT = function(points, lineIndex, ptIndex, dx, dy){
        var line = points[lineIndex],
        i = ptIndex * 2;
        line[i] += dx;
        line[i + 1] += dy;
    };
    // translate points
    api.translatePoints = function(points, dx, dy){
        points.forEach(function(line){
            line.forEach(function(el, i){
                if(typeof el === 'number'){
                    if(i % 2 === 0){
                       el += dx;
                    }else{
                       el += dy;
                    }
                    line[i] = Math.round(el);
                }
            });
        });
    };
    // return the public api
    return api;
}());
```

### 2.3 - The main.js file

Here I have the main javaScript file of the demo of the draw points method. In this main file I create the canvas element, and append it to the hard coded html. I then test out the draw points methods with two examples of the format that I had in mind. One is a literal from where I am just creating a literal array of arrays, and placing some points and settings into the arrays. The other way of creating one of these arrays or arrays is with a method from that I call to create something like this.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640; canvas.height = 480;
var sm = {
   ver: 'r3',
   objects: []
};
// using the pointMod.createEllipse method
sm.objects.push(pointMod.createEllipse({
    points: 40,
    r1: 300, r2: 75,
    x: canvas.width / 2, y: canvas.height / 2
}));
// creating a points object manually
sm.objects.push([
    [25, 75, 175, 50, 17, 110, 'fill:red', 'stroke:lime'],
    [100, 20, 165, 25, 22, 130, 300, 130, 300, 20, 'fill:false', 'close:false']
]);
// drawing
draw.background(ctx, canvas, 'blue');
// using the draw points method
sm.objects.forEach(function(points){
    draw.points(ctx, points, 0, 0);
});
draw.ver(sm, ctx, canvas);
```

When this is up and running the demo seems to work just fine. I get the shapes and colors that I would expect, so this draw points method seems to work great. When it comes to using this method in a project doing so is just a matter of working out the methods that I want that will create the arrays of arrays the way that they should be. 

## 3 - Conclusion

There are maybe a few more things here and there that I would like to add, but maybe I should only get around to doing that once I start using this in a real project or two so I gain a better sense of what is actually needed for this. I do not care to spend time adding features that I think that I might want, or need, for now I just want to have want I know that I want and need. Which of of course just a better draw points method, and so far I think that I all ready have what it is that I wanted.

I all ready have one canvas example in mind that I am sure that I would like to use this with when I get around to putting a little more time into it. In time I am sure that I might want to use a method like this in a whole bunch of other projects that I might start at some point. It is just a question of creating methods that will create and return the array of arrays in the format that will work with this draw points method. When I get around to creating some new canvas examples, or updating some ones that I have all ready made then I might get around to edit this post a little, however I think there really is only so much more to add when it comes to this. For now you might want to check out my main post on [canvas examples](/2020/03/23/canvas-example/) if you have not done so all ready to see what I have together thus far.

It has been a little while sense the last time I have editing this post, so now I can take a moment to make a quick update with respect to some related posts that have to do with this draw method. First off one of the main canvas examples that come to mind that use a system such as this for points is my [canvas example on drawing stars](/2020/02/12/canvas-example-star/). While I am writing this I am also working on one prototype that I have yet to write about in a post, but it has to do with a corresponding library that has to do with creating and mutating the kind of object that is used with this drawing method so I should get around to editing  this post once again with that.

