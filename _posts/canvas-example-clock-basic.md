---
title: A canvas example of a basic clock
date: 2019-12-13 12:39:00
tags: [canvas]
layout: post
categories: canvas
id: 580
updated: 2021-02-14 17:51:25
version: 1.41
---

For today I would like to write another post about a [canvas example](/2020/03/23/canvas-example/), because canvas is fun and life is short. Todays post on canvas examples will be an example of a [basic clock using canvas and javaScript](http://www.dhtmlgoodies.com/tutorials/canvas-clock/). Making clocks is fun because doing so is easy, but there is also lots of room when it comes to doing things that are original with it when it comes to getting creative with canvas and javaScript. 
Sure a starting point would be just a simple digital or analog clock but why stop there as there are so many things that a developer could do when it comes to working with date objects and using them to update the state of an object that can then be rendered using canvas. Still in this post I will be going over just a simple basic clock concept using canvas and javaScript that will involve a state object and then methods that are used to render that state object to a canvas element. However this basic idea can be expanded to do all kinds of interesting and creative things when it comes to making clocks.

If you want to get a copy of the source code of this basic clock example it can be found in the [canvas-examples repository](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-clock-basic) at my github account. Along with the source code for all my other canvas example for this series of posts.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/clock-basic/0.2.0/pkg.js"></script>

## 1 - The clock.js file for a basic canvas clock example

So lets start out with a very basic canvas clock example that will just be a digital clock along with some other little features. This will involve a module that has at least one public method that will create a clock object based on the passed date given as the first argument. The clock object will contain properties that are then used in one or more draw methods that are used to render the current state of that clock object to a canvas element.

I will want to have a clock that does display the current time in a certain format so the clock object will have a timeText property that is just simply that. The clock object will also have a day percent property also though that I will be using as another way of expressing the current time. This is one thing that comes to mind as to why getting into clocks with javaScrit and canvas can be fun and interesting, instead of having just a simple digital or analog clock why not have a ring that expresses the percent of the day that is over.

```js
var clockMod = (function () {
    // pad a value
    var pad = function (a) {
        return String('00' + a).slice(-2);
    };
 
    var getTimeText = function (clock) {
        return pad(clock.now.getHours()) + ' : ' +
        pad(clock.now.getMinutes()) + ' : ' +
        pad(clock.now.getSeconds());
    };
 
    var getDayStart = function (clock) {
        return new Date(clock.now.getFullYear(), clock.now.getMonth(), clock.now.getDate(), 0, 0, 0, 0)
    };
 
    // return a public method that creates a clock object
    return {
        create: function (date) {
            var clock = {};
            clock.now = date || new Date(0);
            clock.timeText = getTimeText(clock);
            var dayStart = getDayStart(clock);
            clock.dayPer = (clock.now - dayStart) / 86400000;
            clock.secPer = clock.now.getMilliseconds() / 1000;
            clock.minPer = clock.now.getSeconds() / 60;
            clock.hourPer = clock.now.getMinutes() / 60;
            clock.AMPMPer = clock.now.getHours() % 12 / 12;
            return clock;
        }
    }
 
}
    ());
```

So then this module returns an object that has thus far just one method that I will be using to create a clock object in my main.js file. The aim here is to work out the basic idea of what I should be doing when it comes to making a canvas clock in terms of what I need it terms of a state object rather than rendering. I want to keep the state of the clock separate from methods that are used to draw it, and also I would like to have a create clock method designed in a way in which the same state object is returned for the same arguments that are given. Also in the event that no arguments are given it will always return a state object that reflects the same point in time. In other words a pure function of sorts, even though it is a state object that is returned.

So now that I have my get clock method I will n ow want to work out at least one method that will render the state of this clock object.

## 2 - Draw the clock status object with a draw.js module

Now that I have my javaScript module that will be used to create a clock state object I will now want a draw module that will render something using data from the clock state object that is returned with my create method of the clock module. This basic clock canvas example will display the time text property of the clock object in the center of the canvas element. The current time will be displayed in a finer size text below some larger text that is the percent of the day that has passed on top of that also. In addition I worked out some other draw methods to render things like hands, and other ways of displaying the current time.

In addition to displaying the time in just plain text in the canvas I think it would be nice to express the time in other ways beyond just that this is a canvas example of course. With that said I think having a circle that will have an arc in it that will grow to the full size of the circle as the day progress would be a nice additional touch. So I can then work out another draw module that uses that percent value to find out what the current radian value will be for that. In addition there is also jumping back to by clock state module to add additional data that can then be rendered that is updated based on the current time. So with that said lets take a look at the code here.

### 2.1 - The start of the draw module, and the clear method

So for this draw.js module I am just using a object literal and attaching a bunch of static draw methods to that object that accept a canvas and drawing context reference along with a reference to a clock state object for most of them. The first method that I have is just a clear method that will clear the canvas. It is just a wrapper for the clearRect method more or less. In many other canvas examples I might have a draw background method in place of this, but for this example I wanted to go with a transparent background and just clear the canvas.

```js
var draw = {};
 
draw.clear = function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
```

### 2.2 - Draw the clock text

I will want to have a method to draw the digital part of this basic canvas clock example. For that I have my draw clock text method. In the body of this method I am just using the fill text 2d drawing context method to draw the text of the timeTex property as well as the day percentage value also.

At the top of the clock text method I am using a bunch of canvas properties to set the format of the text. There is the fill style property that is what will be used to set the fill color of the text, and then the stroke style property also that will be used to set the clock of the lines that will be around the text also. The reason for this is that I will be using the fill text method first, and then the stroke text method afterworlds so that there is an outline around the text that is of a different color.

The font property is used to set the font size, and the font that will be used for the text for this example I went with arial. The base line property is used to set the base line to which the text will be positioned from, I often set this to top. And the text align property I set to center because I want the text centered to the point that I use.

```js
// draw a clock to a canvas
draw.clockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '40px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // percent done of day
    var text = Math.floor(clock.dayPer * 100) + '%';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 20);
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2 - 20);
    // time
    ctx.font = '20px arial';
    ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
    ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
};
```

### 2.3 - Draw the clock hands

For this basic clock example I decided to make it both a digital clock, and an analog clock. So on top of the draw clock text method there is also a draw hands method. For this method I use a trick that involves having a string or property names for each of the percent values in the clock object, and using the string split method to split that into an array.
```js
draw.hands = function (canvas, ctx, clock) {
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    'secPer,minPer,hourPer,AMPMPer'.split(',').forEach(function (perName, i) {
        var r = Math.PI * 2 * clock[perName] - Math.PI / 2,
        radius = (canvas.height - 50 - 100 * (i / 4)) / 2,
        cx = canvas.width / 2,
        cy = canvas.height / 2;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(r) * radius, cy + Math.sin(r) * radius);
        ctx.stroke();
    });
 
};
```

### 2.2 - Draw the day progress circle

There is the day percent property of the clock stat object then. Wheh it comes to this property of the clock stat object I could use this as a way to create and update all kinds of things in the state object, that can the be used to render a scene when it comes to working out these methods. However this is a basic canvas clock example, so for this example I have a draw method that renders a progress circle for the current day.

```js
// draw day circle
draw.clockDayCircle = function (canvas, ctx, clock) {
    var r = Math.PI * 2 * clock.dayPer;
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, r);
    ctx.stroke();
};
```

So now I have my clock module that I can use to create a clock object, and my draw.js module that can be used to render a clock face based of the current state of that clock object. That just leaves a little more javaScriopt to make use of these two modules, and a little html to tie this all together so lets get to that now.

## 3 - The main.js and index.html files

So then I have the rest of the code that gets a reference to a canvas element that I have in the HTML of the example, sets the size, and then makes use of what I have worked out by just calling the loop method over and over again using the request animation frame method. 

I then have the main app loop of the canvas example,in this main loop method I am just getting a clock object with the create method of my clock module with the current time. Once I do that I then using my draw module methods to clear the canvas, and then call the additional draw methods in the draw module to render the clock face in the way I want to.


```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

// loop
var loop = function () {
    requestAnimationFrame(loop);
    var clock = clockMod.create(new Date());
    draw.clear(canvas, ctx);
    draw.hands(canvas, ctx, clock);
    draw.clockDayCircle(canvas, ctx, clock);
    draw.clockText(canvas, ctx, clock);
};
// start loop
loop();

```

So now I just need a little html here I have a single container element alone with a bunch of script tags where I like to my clock, and draw modules as well as the additional javaScript in the main.js file.

```html
<html>
    <head>
        <title>canvas example clock basic</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="./lib/clock.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```


So then when I have this canvas example up and running it just displays a simple digital clock text below a percentage of the amount of time that has passed for the day thus far. 

## 4 - Conclusion

So making clocks in canvas can be pretty fun, and there is much room for originality with this. There are of course all kinds of ideas that come to mind when it comes to using a date object as a way to drive the progress of some kind of state object. Just having some simple properties as part of the state object is one thing, but how about some proprieties that are use to set the position of a background, and on top of that the background changes depending on the time of day or year. Also there is making clocks that have to do with very ling progression of time, such as a clock that has to do with average human lifespan or the about of time that it takes for the solar system to revolve around galactic central point.

In addition I would say that making simple clock canvas examples like this is a good starting point for just giving ones self a project to work on when it comes to javaScript and canvas elements. Other ideas for canvas examples such as games can end up becoming very complicated and time consuming, unless they are kept simple. Making clocks on the other hand more often then not just seems to be the kind of project that just flows nicely.

I have made another [canvas clock particles example](/2020/05/06/canvas-example-clock-particles/) that is a slightly more advanced version of this one that has a bunch or objects that move around and the count and speed of them change over the course of the day and week. In time I am sure I will make even more clock examples like this one, some of which might prove to be a little more interesting.