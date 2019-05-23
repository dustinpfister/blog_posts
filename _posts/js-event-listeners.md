---
title: Event listeners in javaScript
date: 2019-01-16 18:45:00
tags: [js]
layout: post
categories: js
id: 360
updated: 2019-05-23 15:55:10
version: 1.11
---

In javaScript event listeners are methods that fire when a given event happens, such as when a mouse button is clicked, or an element looses focus. In this post I will be covering the use of [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) as a way to attach events to elements in client side javaScript.

<!-- more -->

## 1 - Event listener basics

There is more than one way to attach event listeners in client side javaScript. For the most part it is a good idea to just stick to addEventListener method as a way to attach events. However there are also some alternative ways to do so as well that involve defining a method for certain properties as well.

## 2 - Attaching Event listeners using addEventListener

In this section I will be covering a simple example of an event listener using the addEventListener method. This works by gaining a reference to an element by whatever means, such as with document.getElementById, and then calling the addEventListener method of that element. The first argument that I give to addEventListener is the type of event I which to attach for, and the second argument is the method that I want to fire when this event occurs.

So I have some html for this example that looks like this.

```html
<html>
    <head>
        <title>Event Listeners</title>
    </head>
    <body>
        <input id="button" type="button" value="click me">
        <script src="main.js"></script>
    </body>
</html>
```

And the html links to an external main.js file that looks like this.

```js
var button = document.getElementById('button');

button.addEventListener('click', function(e){
 
    console.log('foo');
 
});
```

For the most part addEventListener should be used as a way to attach events to an element. This way if I want I can attach more than one handler for the same event and element.

## 3 - The event Object of a call back when setting event listeners in javaScript

When setting an event listener there is the first argument of the callback that is given. This argument is the [event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) which contains all kinds of useful information about the event when the event triggers. This can contain things like a reference to the element that was clicked on an on click event, or the x and y position of where a canvas element was clicked and much more. In this section I will be going over some examples of event objects when working with event listeners.

### 3.1 - Basic example of the event object involving a hyper link

In this basic example of using an event object I am setting the href property of an anchor element using the target property of the event object. the target property is a reference to the element in which the event took place. In many cases this is the element where an event listener was attached, but it can also be a child of that element because of bubbling, more on that later.

```js
<html>
    <head>
        <title>Event Listeners</title>
    </head>
    <body>
        <a id="link" href="/" >some link</a>
        <script>
var link = document.getElementById('link');
// using the target property of the event object
// to set the href property of a link
link.addEventListener('click', function(e){
   e.target.href='https://www.google.com/'
});
        </script>
    </body>
</html>
```

### 3.2 - Not so basic example that uses canvas

Here I have a not so basic example of using event objects and event listeners that makes use of the canvas element. Here I am drawing some circles to a canvas with the [arc canvas](/2019/03/05/canvas-arc/) method. The position of the circles can be changed with the mouse click and mouse move event listeners.

When using mouse events the position of the mouse click,move event and so forth can be accessed via the event objects clientX, and clientY properties. However these values are window relative and not canvas element relative so I am using the getBoundingClientRect method to adjust those values to get a canvas relative x and y position.

```html
<html>
    <head>
        <title>Event Listeners</title>
    </head>
    <body>
        <div style="padding:50px;">
            <canvas id="thecanvas" width="320" height="240"></canvas>
        </div>
        <script>
var app = {
    canvas: document.getElementById('thecanvas'),
    ctx: null,
    circles: [],
    // Using the event object to get the canvas
    // relative position
    getCanvasPos: function (e) {
        var bx = app.canvas.getBoundingClientRect();
        return {
            x: e.clientX - bx.left,
            y: e.clientY - bx.top
        }
    },
    // set circle position based on event object
    // and given circle index
    setCircle: function(e, index){
        var circle = app.circles[index],
        pos = app.getCanvasPos(e);
        circle.x = pos.x;
        circle.y = pos.y;
        app.draw();
    },
    clicked: function (e) {
       app.setCircle(e,0);
    },
    move: function (e) {
        app.setCircle(e,1);
    },
    init: function () {
        this.ctx = this.canvas.getContext('2d');
        this.circles.push({
            x: 0,
            y: 0,
            radius: 25,
            color: 'lime'
        });
        this.circles.push({
            x: 0,
            y: 0,
            radius: 15,
            color: 'red'
        });
        this.draw();
    },
    draw: function () {
        var ctx = this.ctx;
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.circles.forEach(function (circle) {
            ctx.strokeStyle = circle.color;
            ctx.lineWidth = 3;
            ctx.beginPath()
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.stroke();
        });
    }
};
app.init();
// attach event listeners to the canvas
app.canvas.addEventListener('click', app.clicked);
app.canvas.addEventListener('mousemove', app.move);
        </script>
    </body>
</html>
```

When the example is up and running I can change the position of the circles by moving the mouse over the canvas, as well as clicking with the canvas with the click and mouse move event listeners.