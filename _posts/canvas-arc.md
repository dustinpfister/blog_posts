---
title: The Canvas arc method for drawing arcs and circles with HTML and javaScript
date: 2019-03-05 18:37:00
tags: [js, canvas]
layout: post
categories: canvas
id: 396
updated: 2021-08-11 11:13:27
version: 1.79
---

When making a [canvas project](/2020/07/22/canvas/) with the html 5 canvas element and javaScript there is a [built in canvas arc method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc) in the 2d drawing context that can be used to draw [arcs and circles](https://mathbitsnotebook.com/Geometry/Circles/CRArcLengthRadian.html). Being able to draw circles and arcs is one of several basic shapes that a javaScript developer should be able to draw when working something out with a canvas project, and the canvas arc 2d drawing context method is the standard typical solution for doing so.

Drawing arcs and circles in canvas is important not just for the sake of drawing graphics, but to also get an idea where a certain range is from a given point outward to a certain radius that can be helpful sometimes with debugging things. There is also knowing how to go about positioning things in an arc like pattern though, and braking away from the convenience of the canvas arc method, to get into more complex alternatives that center around creating an array of points that are placed in an arc like pattern around a given center point. In other words there is not just using the built in canvas arc method to draw arcs, but to create an array of points and then just draw that.

So the canvas arc method can be used as a way to quickly draw circles and arcs in a canvas project, however there are also many other related topics to canvas arcs also such as the nature of radians, Math.cos, and Math.sin. In this post I will be covering what there is to be aware of when it comes to the canvas arc method and other related topics in client side javaScript and the 2d canvas drawing context so lets get to it.

<!-- more -->

## 1 - Canvas arc example starting with the basics

The canvas arc method can be used when drawing a line in canvas by using the beginPath method at which point the arc method can be used in conjunction with other methods like moveTo, lineTo, stroke, fill, and so forth to help draw shapes that involve one or more arcs.  The canvas arc method helps make quick work of drawing any shape that is or contains a circle or arc like line in it, however there are of course other ways of dong so that are a little more advanced. 

Another way of drawing arcs, curves, and lines in general is to create an array of points and then draw lines between them. When it comes to doing that of course arcs can be drawn, but a higher degree of control can be achieved by setting the number of points to use, making other kinds of curves, and shapes in general.

In order to use the canvas arc method it is important to have at least some background with html, javaScript, and canvas in general. This is not a getting started post with the subjects that are required to get something of value from this post on the canvas arc method. However if you have at least some background with these subjects, and want to learn more about the canvas arc method, and other ways to draw circles and place things in a circle like pattern this post might be of interest.

### 1.1 - Know a thing or two about radians

The arguments that canvas arc takes for the start and stop angles should be in [radians](https://en.wikipedia.org/wiki/Radian) and not [degrees](https://en.wikipedia.org/wiki/Degree_(angle). The concept of a radian is thinking of angles in terms of the value of pi times two rather than 360 degrees. If you prefer to think in degrees you will still want to know how to convert from degrees to radians as well as the inversion of that.

To convert a degree value to a radian value to be used with the canvas arc method just divide the degree value by 180 and then multiply that value by [Math.PI](/2020/06/05/js-math-pi/) to get the equivalent value in radians. Degrees can be obtained by dividing  180 by Math.PI and then multiplying that by the radian value. In any case it is just knowing what the relationship is to Math.PI.

```js
var rad = Math.PI / 4,
// radians to degrees
deg = 180 / Math.PI * rad;
console.log(deg); // 45
 
deg = 90;
// degrees to radians
rad = deg / 180 * Math.PI;
console.log(rad); // 1.57...
```

Radians come up a lot when it comes to anything having to do with angles in javaScript and not just with the canvas arc method. There are other methods of interest such as Math.sin, Math.cos, and Math.atan2 just to name a few, but I do not want to get to far off topic here. 

However when it comes to arcs the Math.cos, and Math.sin methods are also of interest as an alternative to the canvas arc method, and all of them accept radians when it comes to an angle. It would seem that radians are the preferred way to go about working with angles in javaScript, so take a moment to become familiar with them if you have not done so before hand.

### 1.2 - Using the canvas arc method

The canvas arc method takes up to six arguments. The first two arguments given to the arc method set the center x and center y values of the arc. The third argument is the radius of the arc from that center point set with the first two arguments, and then the next two arguments after that is the beginning and ending angle in radians. The last optional argument is used to set clockwise of counter clockwise direction of the arc between the start and ending angles of the arc, in other words drawing a pac man like shape or a wedge like shape that will fit in pac mans mouth.

```html
<html>
    <head>
        <title>canvas arc</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// create a canvas arc
// begin by calling ctx.beginPath
ctx.beginPath();
var x = 150,
y = 120,
radius = 100,
radianStart = 0,
radianEnd = Math.PI / 2,
clockwise = true;
 
// calling canvas src with all arguments
ctx.arc(x,y,radius,radianStart,radianEnd, clockwise);
 
// set stroke and fill style
ctx.strokeStyle = 'red';
ctx.fillStyle='black';
// fill, and stroke
ctx.fill();
ctx.stroke();
        </script>
    </body>
</html>
```

The canvas arc method can be used in conjunction with other line methods such as cts.mobveTo, and ctx.lineTo, more on that later. There is also the ctx.stroke, and ctx.fill methods and setting the style of lines and fills as well that you should be familiar with as well. So in other words the canvas arc method is just one of many methods of interest when it comes to drawing lines in canvas.

## 1.3 - There is also Math.cos, and Math.sin that can be used to draw arcs

So the canvas arc method will come in handy for most situations when it comes to drawing arcs, and circles in canvas. It is a nice native built in way to draw arcs in the 2d canvas drawing api, a task that does come up all the time when making a canvas project. 

However there is also the alternative that is using the Math.cos and Math.sin methods in combination with canvas methods like moveTo, lineTo, in place of the native canvas arc method. Sometimes for one reason or another I want better control over the drawing of arc like curves in canvas, and feel compelled to write my own solutions for drawing arcs and other types of curves.

```html
<html>
    <head>
        <title>canvas arc</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
// some values
i = 0,
maxI = 50,
cx = 160,
cy = 120,
radius = 50,
radian, x, y;
// draw
ctx.beginPath();
while (i < maxI) {
    radian = Math.PI / 2 * (i / maxI);
    x = Math.cos(radian) * radius + cx;
    y = Math.sin(radian) * radius + cy;
    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
    i += 1;
}
ctx.stroke();
        </script>
    </body>
</html>
```

The core javaScript Math sin and cos methods can be used to not just draw arcs, but also to position things in an arc like pattern. There is also of course all kinds of other expressions that can be worked out that involves these methods that will produce all kinds of curves such as sign and cos waves. So there is a far greater potential for control and flexibility when using these methods, and expressions over just a simple convenience method.

So the methods also come in handy when it comes to drawing and moving objects in arc like patterns when it comes to working out animations. More on that later in this post as there is a lot to cover when it comes to using Math.cos, and Math.sin as a way to draw canvas arcs and other arc like shapes in canvas.

Now that you know the basics of the canvas arc method, as well as other options for drawing arcs in canvas. Lets look at some more canvas code examples that have to do with this subject as it can branch off into a whole lot.

## 2 - Drawing a full circle with the canvas arc method

To draw a full circle with the canvas arc method just set radian values from zero to Math.Pi \* 2, apart from the usual values that set the center point an radius. The angular direction of the arc is of little consequence as long as the proper values for the starting and ending radian are set of course.

This is a much quicker option to taking the time to write a polygon method to draw a circle, although writing that kind of method would give a greater deal of control over various other factors such as the number of sides that will compose the so called circle when it comes to daring a circle in canvas.

```js
ctx.beginPath();

// a full circle is from 0 to 6.28... radians
var startRadian = 0,
endRadian = Math.PI * 2,
cx = 15,
cy = 15,
radius = 10;
ctx.arc(cx,cy,radius,startRadian,endRadian);
 
// set stroke and fill style
ctx.strokeStyle = 'red';
ctx.fillStyle='black';
 
// fill, and stroke
ctx.fill();
ctx.stroke();
```

So if I just want to draw a circle and be done with it, for the most part the canvas arc method will work just fine. It is not however and end all solution for doing so though. There is drawing a circle, and then there is drawing a polygon with a set number of sides. As the number of sides approaches positive infinity, a polygon approaches but never truly becomes a circle. With that said you might notice that there is no argument to set the number of sides for arc, if you want control over that you will just want to work out a methods for doing so, or use a framework. So with that, lets look at more examples of drawing arcs in canvas that involve and do not involve the use of this method.

## 3 - Drawing a canvas arc clockwise and counter clockwise

The sixth argument that can be passed to the canvas arc method is used to set clockwise or counter clockwise direction of the drawing of the canvas arc. The default value for this argument is false for a counter clockwise direction resulting in a clockwise direction from the starting radian to the ending radian value. This can be used in conjunction with proper values for the start and end radian values to do things like drawing a shape that looks like an eaten watermelon slice for example.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

ctx.strokeStyle = 'red';
ctx.beginPath();
ctx.arc(150,150,100,Math.PI,0,true);
ctx.arc(150,150,50,0,Math.PI,false);
ctx.closePath();
ctx.stroke();
```

More than one instance of the canvas arc method can be used, and the canvas arc method can be used in conjunction with other methods to draw shapes such as in this example. There is also creating a collection of points that would draw something like this when a line is drawn between the points though that might be preferred.

## 4 - Drawing chords and just plain arcs

Drawing both [chords](https://en.wikipedia.org/wiki/Chord_(geometry) and just plain arcs can be achieved with the canvas arc method by just simply including or excluding the closePath context method. The close path method will draw the final line back to the starting point, while not calling it will not do that of course.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// create Chord
ctx.beginPath();
ctx.arc(160, 120, 100, 0, Math.PI / 2);
ctx.closePath();
ctx.stroke();
```

## 5 - Wrapping the canvas arc method

Another topic that comes to mind is the idea of wrapping the canvas arc method in a function and then setting some hard coded defaults for the method so that I can have control over defaults and set them to values other than what is the browser default. In other words creating a kind of abstraction for the canvas arc method that provides an alternative interface for its use.

This can sometimes make sense not just with the canvas arc method, but many native methods in general when working with a javaScript project. For example the forEach method in lodash works a little differently from the native forEach array prototype method as it can be used with objects in general rather than just arrays, and a value of false can be returned to break out of the loop.

For example in just about all use case examples of the canvas arc method I am using the method to draw a circle. So why not make a method where there are some defaults for arguments that make the starting radian value zero, and the ending radian value the value of pi times two. This way I do not have to do so each time I call the canvas arc method, and if I need to I can still pass different values for the starting and ending radian.

```js
// wrapping canvas arc
var arc = function (opt) {
    opt = opt || {};
    // use given ctx, or attempt to get a global one
    opt.ctx = opt.ctx || ctx;
    opt.cx = opt.cx === undefined ? 0 : opt.cx;
    opt.cy = opt.cy === undefined ? 0 : opt.cy;
    opt.radius = opt.radius === undefined ? 50 : opt.radius;
    opt.radStart = opt.radStart === undefined ? 0 : opt.radStart;
    opt.radEnd = opt.radEnd === undefined ? Math.PI * 2 : opt.radEnd;
    ctx.arc(opt.cx, opt.cy, opt.radius, opt.radStart, opt.radEnd);
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

// now I can just call arc
ctx.strokeStyle='red';
ctx.beginPath();
arc();
ctx.stroke();
 
// or give just the values I want to give,
// if the hard coded values I set for myself work fine
ctx.beginPath();
arc({
  cx: canvas.width / 2,
  cy: canvas.height / 2,
});
ctx.stroke();
```

The general point is that just because there is a native method that does not mean that is what must always be what is used in a project. If I can still rationalize a reason to write my own method to do something that can be done with a native method, or in this case wrap a native method so that I can have control over default values and more, I might very well just do that.

## 6 - Using a custom method for drawing a canvas arc circle using Math.cos Math.sin and a drawPoints method

So now that we have a good feel for how to go about using the native canvas arc method in the 2d drawing context of the canvas api, lets take a moment to explore some more advanced ways to go about drawing circles arcs and circle like patterns. In the section I will be used Math.cos, and Math.sin as a way to create an array of points in the form of a linear array of x and y vales. In other words a one dimensional array where each first point of a split of two is the x value and the second is the y value. This seams to be a common format for an array of point value that is used in many framework as it it is a more efficient alternative to an array of objects.

So this will start out with using a method that will draw a collection of points. This method will just run threw a given array of point values and use method like lineTo, to draw the line for each set of points. Once I have that method worked out I will then create a method that can be used to create an array of points that will be used with a method like that, in this case a method that will create an array of points in a circle like pattern.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// draw a polygon for the given context
var drawPoints = function (ctx, points,close) {
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1]);
        i += 2;
    }
    if(close){ctx.closePath();}
    ctx.stroke();

};
 
var createPolygonPoints = function(cx,cy,r,s){
    var i = 0,points=[];
    while(i < s){
        a = Math.PI * 2 * (i/s);
        x = Math.cos(a) * r + cx;
        y = Math.sin(a) * r + cy;
       points.push(x,y);
     i += 1;
   }
    return points;
}
 
var pointCount = 50,
radius = 10;
drawPoints(ctx, createPolygonPoints(15,15,radius,pointCount), true);
```


It is fun to write these kind of methods now and then to gain a better degree of control over how the arc, or circle is drawn. Many canvas libraries have a polygon method built in, but with plain vanilla js it is not to hard to start to get together some methods for drawing a polygon with a set number or points.

This method can only be used to draw a circle, rather than say a half circle as I have choses to omit arguments for a start and end radian, and direction. It is true that writing a clone of the canvas arc method would not to be to hard, but doing so would not make sense, unless there are some additional features to add, such as being able to set the number of sides in the canvas arc.

## 7 - drawing an ellipse with canvas

So there is drawing arcs, chords and circles with the canvas arc method, as well as Math cos and sin methods, and then there is getting into drawing an ellipse and more complex curves which is where things can start to really get interesting. There is a native canvas ellipse method that can be used to just go ahead and draw an ellipse with the 2d canvas drawing api. However the browser support with that one goes back only so far. In any case it makes sense to have at least a basic idea of how to go about drawing an ellipse, and also how to go about positioning things in an elliptical like position. So then in this section I will be going over some examples of how to go about drawing an ellipse with canvas, as there is more than one way to skin a cat with this one like many things in programing.

### 7.1 - Drawing an ellipse with the native canvas method

On modern browsers that support the canvas ellipse method there is of course that option when drawing an ellipse in canvas. This method is somewhat similar to that of the canvas arc method, only it accepts two arguments for radius as one might expect. on top of that there is also a rotation argument after the second radius is given, after that it is just the start and end radian and the clockwise boolean just like the canvas arc method.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var cx = 160,
cy = 120,
radiusX = 100,
radiusY = 50,
rotation = Math.PI * 0.25,
startRadian = 0,
endRadian = Math.PI * 2;
 
ctx.beginPath();
ctx.ellipse(cx, cy, radiusX, radiusY, rotation, startRadian, endRadian);
ctx.stroke();
```

This solution might work out okay if you are all right with dropping support for any and all browsers that do not support this method. If you are not okay with that then you will just have to use some non native method alone solution using Math cos and Math sin methods in a similar way to that of drawing a circle with them only now we are just working with two different radius values. So with that said lets look at some other options when it comes to drawing and ellipse with canvas.

### 7.2 - Drawing an ellipse in canvas with Math sin and cos and giving a center point along with width and height

So then making my own method to draw an ellipse with canvas has not proved to be all that more complex then what is required to do the same for drawing an arc or circle. The one little difference is that I am just using two different radius values one for the x value and the other for y.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// a drawEllipse method that takes a center x and y point
// along with width and height
var drawEllipse = function(ctx, cx, cy, w, h, pointCount){
    var i = 0,
    x,y,r;
    pointCount = pointCount || 100,
    ctx.beginPath();
    while(i < pointCount){
        r = Math.PI * 2 * (i / pointCount);
        x = cx + Math.cos(r) * w;
        y = cy + Math.sin(r) * h;
        ctx.lineTo(x,y);
        i += 1;
    }
    ctx.closePath();
    ctx.stroke();
};
 
// looks good
drawEllipse(ctx, 160, 120, 100, 50, 25)
```

Just like with the custom canvas arc method I can do things like set the number of points that will be used.

## 8 - Time to have some fun with canvas arc by making deterministic animations

So I think it games without saying that canvas is one of the more fun an interesting aspects of programing with javaScript. Canvas can be used to make html 5 games, and interesting animations that can be a whole world of fun. In this section I will be going over some simple canvas animation examples that make use of the canvas arc method.

These animation examples make use of the requestAnimationFrame method as a way of creating a render loop for canvas that is often the standard method for doing so with canvas projects. I often like to make animations that are deterministic in nature so that they can potentially be turned into perfectly looping gifs or webm videos. In other words there are a fixed number of frames and I am just working out the logic that is to be applied for each frame with javaScript. This differs from other styles of animation that involve generating a new frame on each tick that will not necessarily be deterministic. I would like to get into the subject deeper, but I do not want to get to far off topic from the canvas arc method in this post.

### 8.1 - The canvas arc method in an animation

In this canvas animation example I am updating two variables that have to do with changing the starting and ending radian values when calling the canvas arc method in a draw method that is called on each frame tick.

The basic structure of a canvas animation or any kind of canvas project will likely include at least some kind of state that is updated on each frame tick, and a method that draws that state to the canvas. There are other ways of course that involve clumping everything together, developers do have all kinds of different coding styles when it comes to making a project after all. However I think it is a good idea to make at least some kind of effort to break things down when I start to get into something that is a little advanced.

```html
<html>
    <head>
        <title>canvas arc animation</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// state
var frame = 0,
maxFrame = 50,
startRad,
endRad;
 
// update
var update = function(){
   // do something cool with the start and end radians
   var per = frame / maxFrame,
   bias = Math.abs(per - 0.5) / 0.5;
   startRad = Math.PI * 2 * per;
   endRad = startRad + 1 + 2 * bias;
   // step frame
   frame += 1;
   frame = frame % maxFrame;
 
};
 
// draw
var draw = function(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(160, 120, 50, startRad, endRad);
    ctx.stroke();
};
 
// loop
var loop = function(){
    requestAnimationFrame(loop);
    update();
    draw();
 
};
loop();
 
        </script>
    </body>
</html>
```

In the canvas animations update method I am updating the state of the animation based on the current frame value relative to the total frame count that I have set, and then I also step the frame count. In the draw method of the animation I then use the canvas arc method with the startRad and endRad values that are updated in the update method. I then have a main loop method in which I am updating and drawing this canvas animation.

### 8.2 - Uisng Math.cos and Math.sin to create an arc like movement in canvas

In this post I also touched base on the Math.sin and Math.cos methods in core javaScript that can be used to create an arc as well in canvas. When it comes to making something move in an arc like pattern in canvas such as an array of box like objects that can be rendered using the fillRect method cos and sin can be used to move such objects in an arc like pattern.

```html
<html>
    <head>
        <title>canvas arc animation</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// state
var frame = 0,
maxFrame = 100,
bxCount = 5,
radPos,
bx;
// init
var init = function () {
    var i = 0;
    bx = [];
    while (i < bxCount) {
        bx.push({
            x: 0,
            y: 0,
            w: 32,
            h: 32
        });
        i += 1;
    }
};
// update
var update = function () {
    // do something cool with the start and end radians
    var per = frame / maxFrame,
    bias = Math.abs(per - 0.5) / 0.5;
    // update radPos
    radPos = Math.PI * 2 * per;
    // update boxes
    bx.forEach((b, i) => {
        var rOff = Math.PI * 2 / bx.length * i,
        radius = 25 + 50 * bias;
        var x = Math.cos(radPos + rOff) * radius + 160 - b.w / 2,
        y = Math.sin(radPos + rOff) * radius + 120 - b.h / 2;
        b.x = x;
        b.y = y;
    });
    // step frame
    frame += 1;
    frame = frame % maxFrame;
};
// draw
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bx.forEach((bx, i) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(bx.x, bx.y, 32, 32);
    });
};
// loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};
init();
loop();
        </script>
    </body>
</html>
```

When it comes to making cool little canvas projects like this I often do find myself moving things in arc like patterns. There is using the native canvas arc method to draw arcs, but if I want to just pan things out in an arc, and move them in an arc like fashion then I do of course need to write my own method for doing so often using the Math.cos, and Math.sin methods to do so.

### 8.3 - Using canvas arc as a way to track the location of points in an animation

So for this animation example that I started working out I am just using canvas arc as a way to track the movement of my points as I work out the expressions, logic, and structure of the animation. Compared to the previous animation examples I am now separating things into a state object, and having everything that has to do with rendering including the use of the canvas arc method outside the body of that state object.

```html
<html>
    <head>
        <title>canvas arc animation</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
(function () {
    // STATE
    var state = {
        frame: 0,
        frameMax: 50,
        per: 0,
        bias: 0,
        points: [],
        pointsMax: 9,
        cx: 160,
        cy: 120,
        updateValues: function () {
            this.per = this.frame / this.frameMax;
            this.bias = 1 - Math.abs(0.5 - this.per) / 0.5;
        },
        stepFrame: function () {
            this.frame += 1;
            this.frame %= this.frameMax;
        },
        update: function () {
            var i = 0,
            sx = this.pointsMax * 32 / 2 - 16,
            by = 32 * this.bias,
            h = 64 * this.bias,
            len = this.pointsMax;
            this.points = [];
            this.updateValues();
            while (i < len) {
                this.points[i] = {
                    x: this.cx - sx + 32 * i,
                    y: this.cy - by + h * (i % 2)
                }
                i += 1;
            }
            this.stepFrame();
        }
    };
    // RENDER
    var canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');
    // draw
    var draw = function (state, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw circles around each point with canvas arc
        ctx.strokeStyle = 'white';
        state.points.forEach(function (pt) {
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
            ctx.stroke();
        });
    };
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        state.update();
        draw(state, ctx, canvas);
    };
    loop();
}
    ());
        </script>
    </body>
</html>
```

I often do just use the canvas arc method as a way to just track the movement of points by just keeping the radius of the circle very small. I find doing so quick and easy compared to drawing two lines, and also like it over using the stroke rect method.

## 9 - The distance formula and canvas arc

I often end up using a distance formula in many of my projects that can be used to just simple find the distance between two points. This distance formula can be used as a way to find out if a user has clicked an area within a circle or not, or as a way to find out if two circles that are moving have hit each other or not. So in this section I will be going over some examples that have to do with the use of the distance formula to find distances, and the canvas arc method as a way to draw circle areas.

### 9.1 - A Basic example of distance and canvas arc

Here we have a basic example of what I am talking about when it comes to the distance formula and the canvas arc method. I have a distance formula, a draw method that will draw a circle using data in a state object, and a method that will create and return an event hander that will mutate the state object each time the circle is clicked by using the distance formula to find out if the area that was clicked is in the circle or not.

```html
<html>
    <head>
        <title>canvas arc and distance</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// the distance formula
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// draw
var draw = function (ctx, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = state.colors[state.colorIndex];
    ctx.beginPath();
    ctx.arc(state.cx, state.cy, state.radius, 0, Math.PI * 2);
    ctx.fill();
};
// create an event hander for mouse down
var createOnClick = function (state, ctx) {
    return function (e) {
       // get canvas relative point
        var bx = e.target.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        // if distance to point is less than or equal to radius
        if (distance(x, y, state.cx, state.cy) <= state.radius) {
            state.colorIndex += 1;
            state.colorIndex %= state.colors.length;
        }
        draw(ctx, state);
    };
};
// create canvas and state object, attach event and draw for first time
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
var state = {
    cx: canvas.width / 2,
    cy: canvas.height / 2,
    radius: canvas.height / 3,
    colors: ['red', 'green'],
    colorIndex: 0
};
canvas.addEventListener('mousedown', createOnClick(state, ctx));
draw(ctx, state);
        </script>
    </body>
</html>
```

## 10 - Conclusion

The canvas arc method is just one of many methods in the canvas 2d drawing context of course, however it is one that seems to come up often. Canvas is a lot of fun of course, and it can also be very helpful as well when it comes to working out basic graphics with javaScript code. 

There is also much more that can be done with canvas once you have a decent grasp on how to work with it when it comes to native javaScript by itself of course, but also when it comes to working with certain popular libraries in addition to plain old javaScript by itself. For example in [threejs a canvas element](/2018/04/17/threejs-canvas-texture/) can be used as a way to create a texture that can be used to skill faces on solid geometry objects.

I hope that you have gained something of value from reading this post on the canvas arc method, there is much more to write about when it comes to just canvas alone on top of everything that comes up with javaScript in general so it looks like I have my work cut out for me when it comes to writing additional canvas content. For more reading on canvas here you might want to check out [my main post on canvas](/2020/07/22/canvas/), as well as by [index post on all of my canvas example posts](/2020/03/23/canvas-example/). I have many canvas examples that make use of the canvas arc method some that might be worth checking out are [particles binary](/2020/03/18/canvas-example-particles-binary/), and [particles search destroy and spawn](/2020/04/13/canvas-example-particles-search-destroy-and-spawn). The best way to go about learning how to have fun with canvas though would be to start working on your own projects and learn by doing, so just buckle down and get to it.
