---
title: Math max and min methods in javaScript
date: 2020-01-22 20:57:00
tags: [js]
layout: post
categories: js
id: 595
updated: 2021-08-28 10:58:08
version: 1.25
---

In core javaScript there is the [Math max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) and [Math min](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) methods that can be used to find the highest and lowest numbers in a set of numbers. The methods work by passing the set of numbers as arguments, but it is also possible to use an array by making use of the [apply function prototype method](/2017/09/21/js-call-aplly-and-bind/). The apply method can be called off of the Math.max or min method as it is a function prototype method, and then a null value can be given as the first argument, along with the array of numbers, more on that later.

The Math min and max methods can help save me from having to loop over the contents of an array to find the lowest or highest number in a array of numbers. The task of doing this does come up now and then when working out solutions for certain things that require the lowest and highest numbers in a collection of numbers. So lets take a look at some some examples, and a few additional use case examples of Math min and max.

<!-- more -->

<div id="canvas-min-max" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>
var points=(function(){var api={};api.gen=function(count,width,height){count=count===undefined?10:count;width=width===undefined?160:width;height=height===undefined?120:height;var points=[];var i=0;while(i<count){points.push({x:Math.floor(Math.random()*width),y:Math.floor(Math.random()*height),heading:Math.random()*(Math.PI*2),pps:16+Math.round(64*Math.random())});i+=1;}return points;};var getAxisValues=function(points,axis){axis=axis===undefined?'x':axis;return points.map(function(obj){return obj[axis];});};api.getLorH=function(points,minMax){minMax=minMax===undefined?'min':minMax;return{x:Math[minMax].apply(null,getAxisValues(points,'x')),y:Math[minMax].apply(null,getAxisValues(points,'y'))}};api.getAxisRanges=function(points){var xValues=getAxisValues(points,'x'),yValues=getAxisValues(points,'y'),xLow=Math.min.apply(null,xValues),yLow=Math.min.apply(null,yValues);return{x:(Math.max.apply(null,xValues)-Math.abs(xLow)),y:(Math.max.apply(null,yValues)-Math.abs(yLow))}};var normalize=function(points,canvas){var range=api.getAxisRanges(points);canvas=canvas||{width:range.x,height:range.y};return points.map(function(pt){return{x:pt.x/canvas.width,y:pt.y/canvas.height}});};api.move=function(points,x,y,w,h,canvas){return normalize(points,canvas).map(function(pt){return{x:x+pt.x*w,y:y+pt.y*h};});};api.wrap=function(points,canvas){return points.map(function(pt){var x=pt.x,y=pt.y;x=x<0?canvas.width+x:x;y=y<0?canvas.height+y:y;x=x>=320?x%320:x;y=y>=240?y%240:y;return{x:x,y:y,heading:pt.heading,pps:pt.pps}});};return api;}());var draw={};draw.background=function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);};draw.box=function(ctx,x,y,w,h,fill){ctx.fillStyle=fill||'black';ctx.fillRect(x,y,w,h);};draw.lowAndHigh=function(ctx,p){ctx.strokeStyle='white';var l=points.getLorH(p,'min'),h=points.getLorH(p,'max');ctx.beginPath();ctx.arc(l.x,l.y,3,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(h.x,h.y,9,0,Math.PI*2);ctx.stroke();};draw.points=function(ctx,p,fill,radius){radius=radius||6;ctx.fillStyle=fill||'red';ctx.strokeStyle='black';var i=p.length,pt;while(i--){pt=p[i];ctx.beginPath();ctx.arc(pt.x,pt.y,radius,0,Math.PI*2);ctx.fill();ctx.stroke();}};var container=document.getElementById('canvas-min-max'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');container.appendChild(canvas);canvas.width=320;canvas.height=240;var state={points:points.gen(20,canvas.width,canvas.height),canvas:canvas,lt:new Date(),FPS:16,moved:{x:32,y:32,w:64,h:64,points:[]}};var update=function(state,secs){var i=0,len=state.points.length,pt;while(i<len){pt=state.points[i];pt.x+=Math.cos(pt.heading)*pt.pps*secs;pt.y+=Math.sin(pt.heading)*pt.pps*secs;i+=1;}state.points=points.wrap(state.points,state.canvas);var m=state.moved;m.points=points.move(state.points,m.x,m.y,m.w,m.h,state.canvas);};var loop=function(){var now=new Date(),t=now-state.lt,secs=t/1000;requestAnimationFrame(loop);if(t>=1000/state.FPS){update(state,secs);var m=state.moved;draw.background(ctx,canvas);draw.points(ctx,state.points,' green ',6);draw.lowAndHigh(ctx,state.points);draw.box(ctx,m.x,m.y,m.w,m.h,' rgba(0, 0, 255, 0.4)');draw.points(ctx,m.points,' blue ',3);draw.lowAndHigh(ctx,m.points);state.lt=now;}};loop();
</script>

## 1 - Math min basic example

The Math min and Math max methods work by passing numbers as arguments to the methods and then the smallest or largest number that is passed is returned by the method. So if i give the Math min method the numbers 3, 0, and -7 as arguments then the number -7 is what will be returned.

```js
var min = Math.min(3, 0, -7);
console.log(min); // -7
```

Although this simple example works out okay for what it is, when it comes to any kind of real code example such code examples will often involve an array of values, and likely never a set of static number literals. So lets look at some more examples of using these methods to get the lowest and highest numbers in a collection of numbers in javaScript.

## 2- Using the apply function prototype method

If you are not familiar with the function apply prototype method yet as well as other such methods such as call and bind, now would be a good time to look into them. I will not be getting into these methods in depth here as I have written a post before hand in which I do so. However here is a simple example if using the apply function prototype method with Math min and max to get the lowest and highest numbers in an array of numbers.

```js

var nums = [7, -4, 0, 8, 12, -2];
 
console.log( Math.min.apply(null, nums) ); // -4
console.log( Math.max.apply(null, nums) ); // 12
```


## 3 - Range, as well as mean, median, sum

So there are many things than can be done with a set of numbers of course. However with the Math min and max methods one of the most common typical use case examples is to get the range of a set of numbers. For convenience in this section I will also be going over some examples of sum, mean, and median in this section also.

### 3.1 - Get the range of a set of numbers

So making a get range method with Math min, and Math max would involve just using the methods along with function apply to get the min and max numbers of a set of numbers. Then I just need to have the function return the max number less the min number. The returned result of the method would then be the range.

```js
// range
var getRange = function (nums) {
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums);
    return max - min;
};
var arr = [-5, 10, 8, 3, 0];
console.log(getRange(arr)); // 15
```

Getting the range of a set of numbers if often just one step in getting some other value. For example say that I want an array of numbers between the range of 320, based off of values of an array of numbers that are of a lower or higher range. I can use the range to loop over the source array of numbers and divide each value by the range of the source array, then multiply by 320 to get those values.

## 3.2 - Median, sum, and mean

So the range of a set of numbers is often just one value of interest along with a bunch of other typical values such as mean, median, and sum. There is having just one of these methods in a stand alone state of sorts, and then there is making what might be the beginnings of a utility library of sorts. For now lets just start out with some stand alone methods for all of these. I can then have a single method that will return an object that will give me everything there is that I would want with an array of numbers ore or less when it comes to just these few things at least.

```js
// median
var getMedian = function (nums) {
    var half = Math.floor(nums.length / 2);
    nums.sort();
    return nums.length % 2 ? nums[half] : (nums[half - 1] + nums[half]) / 2;
};
 
// sum
var getSum = function (nums) {
    var i = nums.length,
    sum = 0;
    while (i--) {
        sum += nums[i];
    }
    return sum;
};
 
// mean
var getMean = function (nums) {
    return getSum(nums) / nums.length;
};
 
// get everything
var getEverything = function (nums) {
    var e = {};
    e.min = Math.min.apply(null, nums);
    e.max = Math.max.apply(null, nums);
    e.range = getRange(nums);
    e.median = getMedian(nums);
    e.sum = getSum(nums);
    e.mean = getMean(nums);
    return e;
};
 
var nums = [1, 2, 4, 7];
 
var e = getEverything(nums);
 
console.log(e.median); // 3
console.log(e.min, e.max); // 1 7
console.log(e.range); // 6
console.log(e.sum); // 14
console.log(e.mean); // 3.5
```

There is more than one way to go about making a sum method, in this example I used a while loop to just loop over and add up the numbers. Other solutions might involve the use of the array reduce method, however getting into that might be off topic here. The thing about this is that I have a method that will give me all the basics when it comes to things of interest with a set of numbers, but not everything. 

One additional thing is to have a normalized set of numbers for the array of numbers, so lets look at an example of that. In addition it might be nice to get into some actual examples that make use of all of this to do something interesting, so lets start getting into the good stuff with this.


## 4 - Number normalization example of Math.min and Math.max

One use case example of Math.min and Math.max might be to make a method that is used to normalize numbers relative to a range between the min and max number. This sort of thing is often used as a way to normalize points for example so they can then easy be scaled up by just multiplying the normalized value by a scale.

This can be done by using the Math.min method to get the lowest number, then Math.Max to get the highest, and with that the range of course. Once I have the range I can then use the array map method to map over the array of numbers and create and return a new array where each value is divided over the range.

```js
var normalizeNums = function (nums) {
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums),
    range = max - min;
    return nums.map(function (n) {
        return n / range;
    });
};
 
var nums = [-37, 5, 42, 30, 43, 120, -40, 160];
console.log( normalizeNums(nums) );
// [ -0.185, 0.025, 0.21, 0.15, 0.215, 0.6, -0.2, 0.8 ]
```

## 5 - Working with an array of Objects

So now that we have figures out how to go about normalizing a set of numbers, lets see about working with an array of objects Say I have an array of points in the form of an array of objects where each object has an x and y property. I want to get the lowest and highest values for each axis in the set of points. For this one again the array map method can come in handy for getting all values of interest with that.

```js
// get an array of numbers from a set of objects
var getAxisValues = function (points, axis) {
    axis = axis === undefined ? 'x' : axis;
    return points.map(function (obj) {
        return obj[axis];
    });
};
 
// get low or high
var getLorHofAxis = function (points, axis, minMax) {
    axis = axis === undefined ? 'x' : axis;
    minMax = minMax === undefined ? 'min' : minMax;
    return Math[minMax].apply(null, getAxisValues(points, axis));
};
 
var points = [{x: 20, y: 35},{x: -15, y: 83},{x: 7, y: 0}],
xLow = getLorHofAxis(points),
yHi = getLorHofAxis(points, 'y', 'max');
console.log(xLow); // -15
console.log(yHi); // 83
```

## 6 - Canvas example using Math.max, and Math.min

So maybe now it is time for a canvas example that makes use of the Math.max, and Math.min methods, along with everything else this I covered in this post and much more.

This canvas example will have a point.js module that will contain methods for generating and array of points. In addition it will have methods that make use of  Math.max, and Math.min to help find the highest and lowest axis values for the x and y axis values of all the points. It will contain a while bunch of other methods that will help illustrate the was covered in this post when using it in a canvas example.

### 6.1 - The points.js module

So here is the points.js module that will be used to create the array of points. There are also a number of other public api methods for this module including a methods that is used to move an array of points, and also a methods that can be used to create a point object composed of the lowest x and y values that of course make use of Math.min, and Math.max.

```js
var points = (function () {
 
    var api = {};
 
    // generate some points
    api.gen = function (count, width, height) {
        count = count === undefined ? 10 : count;
        width = width === undefined ? 160 : width;
        height = height === undefined ? 120 : height;
        var points = [];
        var i = 0;
        while (i < count) {
            points.push({
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height),
                heading: Math.random() * (Math.PI * 2),
                pps: 16 + Math.round(64 * Math.random())
            })
            i += 1;
        }
        return points;
    };
 
    // get an array of numbers from a set of objects
    var getAxisValues = function (points, axis) {
        axis = axis === undefined ? 'x' : axis;
        return points.map(function (obj) {
            return obj[axis];
        });
    };
 
    api.getLorH = function (points, minMax) {
        minMax = minMax === undefined ? 'min' : minMax;
        return {
            x: Math[minMax].apply(null, getAxisValues(points, 'x')),
            y: Math[minMax].apply(null, getAxisValues(points, 'y'))
        }
    };
 
    // get ranges for each axis
    api.getAxisRanges = function (points) {
        var xValues = getAxisValues(points, 'x'),
        yValues = getAxisValues(points, 'y'),
        xLow = Math.min.apply(null, xValues),
        yLow = Math.min.apply(null, yValues);
        return {
            x: (Math.max.apply(null, xValues) - Math.abs(xLow)),
            y: (Math.max.apply(null, yValues) - Math.abs(yLow))
        }
    };
 
    // normalize points
    var normalize = function (points, canvas) {
        var range = api.getAxisRanges(points);
        //l = api.getLorH(points, 'min');
        canvas = canvas || {
            width: range.x,
            height: range.y
        };
        return points.map(function (pt) {
            return {
                //x: (pt.x - l.x) / range.x,
                //y: (pt.y - l.y) / range.y
                x: pt.x / canvas.width,
                y: pt.y / canvas.height
            }
        });
    };
 
    // move and scale points
    api.move = function (points, x, y, w, h, canvas) {
        return normalize(points, canvas).map(function (pt) {
            return {
                x: x + pt.x * w,
                y: y + pt.y * h
            };
        });
    };
 
    api.wrap = function (points, canvas) {
        return points.map(function (pt) {
            var x = pt.x,
            y = pt.y;
            x = x < 0 ? canvas.width + x : x;
            y = y < 0 ? canvas.height + y : y;
            x = x >= 320 ? x % 320 : x;
            y = y >= 240 ? y % 240 : y;
            return {
                x: x,
                y: y,
                heading: pt.heading,
                pps: pt.pps
            }
        });
    };
 
    return api;
 
}
    ());
```

### 6.2 - The draw.js module for drawing to a canvas element

So as with any of my canvas examples I made a draw.js module that will contain the draw methods that will be used to serve as a view for the model in this case an array of points created with the points module. With that said there is a draw method that will draw the current state of an array of points to a drawing context, but also many others that draw the background as well as the high and low points of a points array.

```js
var draw = {};
 
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.box = function (ctx, x, y, w, h, fill) {
    ctx.fillStyle = fill || 'black';
    ctx.fillRect(x, y, w, h);
};
 
draw.lowAndHigh = function (ctx, p) {
    ctx.strokeStyle = 'white';
    var l = points.getLorH(p, 'min'),
    h = points.getLorH(p, 'max');
    ctx.beginPath();
    ctx.arc(l.x, l.y, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(h.x, h.y, 9, 0, Math.PI * 2);
    ctx.stroke();
}
 
draw.points = function (ctx, p, fill, radius) {
    radius = radius || 6;
    ctx.fillStyle = fill || 'red';
    ctx.strokeStyle = 'black';
    var i = p.length,
    pt;
    while (i--) {
        pt = p[i];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
};
```

### 6.3 - Main.js and index.html

Now I just need a main.js file that will create and inject a canvas element into the html, and make use of the points.js module and draw.js file above.

Here in the main.js file I have a state object that contains an array of points created with the generate method of the points.js module. The update method will move the points by way of there current heading and pixels per second values. The seconds value must be passed to it with the state object.

There is also a main app loop method where I am calling the update method, as well as all the draw methods that I want to use to redner the current state of the state object.

```js
// get canvas can 2d context
var container = document.getElementById('canvas-min-max'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
 
var state = {
    points: points.gen(20, canvas.width, canvas.height),
    canvas: canvas,
    lt: new Date(),
    FPS: 16,
    moved: {
        x: 32,
        y: 32,
        w: 64,
        h: 64,
        points: []
    }
};
 
var update = function (state, secs) {
    var i = 0,
    len = state.points.length,
    pt;
    while (i < len) {
        pt = state.points[i];
        pt.x += Math.cos(pt.heading) * pt.pps * secs;
        pt.y += Math.sin(pt.heading) * pt.pps * secs;
        i += 1;
    }
    state.points = points.wrap(state.points, state.canvas);
    var m = state.moved;
    m.points = points.move(state.points, m.x, m.y, m.w, m.h, state.canvas);
};
 
var loop = function () {
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= 1000 / state.FPS) {
        update(state, secs);
        var m = state.moved;
        draw.background(ctx, canvas);
        draw.points(ctx, state.points, ' green ', 6);
        draw.lowAndHigh(ctx, state.points);
        draw.box(ctx, m.x, m.y, m.w, m.h, ' rgba(0, 0, 255, 0.4)')
        draw.points(ctx, m.points, ' blue ', 3);
        draw.lowAndHigh(ctx, m.points);
        state.lt = now;
    }
 
};
 
loop();
```

Now for just a little html to tie everything together with this.

```html
<html>
    <head>
        <title>js min max canvas app</title>
    </head>
    <body>
        <div id="canvas-min-max"></div>
        <script src="points.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So when this canvas example is up and running it will result in a bunch of points moving around the canvas that will wrap back ground when the go out of bounds. On top of that I am also drawing points to the canvas that are the lowest x and y positions as well as the highest.


## 7 - Conclusion

So the Math.min and Math.max methods re nice little methods for getting the lowest and highest value of two or more numbers. They have to be given via arguments when calling it, but apply can be sued as a way to just go ahead and use an array of numbers. There are all kinds of other values that come to mind that can then be obtained when you have both the lowest and highest numbers such as a range, or a mean.

The math object in core javaScript has a whole lot more to offer of course that is also worth looking into more at some point or another. There are methods like the [math atan2 method](/2019/03/19/js-math-atan2/) that will come up now and then when it comes to code examples that have to do with various things in trigonometry for example.