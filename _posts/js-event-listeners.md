---
title: Event listeners in javaScript
date: 2019-01-16 18:45:00
tags: [js]
layout: post
categories: js
id: 360
updated: 2021-04-01 15:21:46
version: 1.31
---

In javaScript [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) are methods that fire some javaScript code when a given event happens such as the user clicking an element, resizing a window, or leaving a page for another. There are all kinds of addition events that have to do with user input when working with input elements such as [on focus](/2019/01/05/js-onfocus/), [on blur](/2019/01/08/js-onblur/), [on change](/2019/01/04/js-onchange/), and events that have to to with keyboard events, and pointer devices such as a mouse and touch screens.

Event listeners can be used to create an application that is event driven in place of, or in combination with, some kind of of main update loop that mutates state and renders that state to a view. In many projects events are used at least to some extent as a way to capture user input from mouse clicks, changes to text area or input elements, or any other means in client side javaScript. In this post I will be covering the use of [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) as a way to attach events to elements in client side javaScript. 

There will be a few examples where when it comes to just using that event to attach handler functions, but I will not be getting into detail about every little event, as well as real full blown examples that make use of event handers and many other aspects of a full application. For that it might be better to look at some of my [canvas examples](/2020/03/23/canvas-example/), many of which use event handlers when it is some kind of project the  works with user input or anything that requires the use of event attachment.

<!-- more -->

## 1 - Event listener basics

There is more than one way to attach event listeners to html elements and the window object in client side javaScript. For the most part it is a good idea to just stick to the addEventListener method as a way to attach events. The reason why is because more than one handler can be attach for a single event type when using that method. 

However there are also some alternative ways to do so as well that involve defining a method for certain properties of the window object, or a single given element reference. There is also the fact that the add event listener method only goes back so far then it comes to browser support, but if you only care about modern every green browsers that is not much of an issue these days. unless for some reason you are getting a lot of traffic from a country where there are a lot of people still using very old versions of Internet explorer for some reason in which case I guess that is an issue.

### 1.1 - Attaching Event listeners using addEventListener

So lets start out with event listeners using the addEventListener method which is well supported with most modern web browsers these days. This works by gaining a reference to an element by whatever means, such as with document.getElementById, and then calling the addEventListener method of that element. The first argument that I give to addEventListener is the type of event I which to attach for, and the second argument is the method that I want to fire when this event occurs.

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

For the most part addEventListener should be used as a way to attach events to an element. This way if I want I can attach more than one handler for the same event and element. The only reason why I might want to bother with another way of doing so is maybe over backward compatibility concerns with older version of Internet explorer.

### 1.2 - element and window event properties

Another way of attaching event handlers is to set a function to one of many named properties of an element or the window object. One of the down sides of this is that only one event can be attached at a time. However doing so will work on a wide range of clients.

The process is more or less the same for elements in the sense that a reference to the element must be obtained first. Once a reference is gained an event listener function just needs to be set to a property name of the desired  event.

```html
<html>
    <head>
        <title>Event Listeners</title>
    </head>
    <body>
        <input id="button" type="button" value="click me">
        <script>
var button = document.getElementById('button');
button.onclick = function(e){
    console.log('foo');
}
        </script>
    </body>
</html>
```

There are also a range of events that can be attached to the window object also.

## 2 - The event Object of a call back when setting event listeners in javaScript

When setting an event listener there is the first argument of the callback that is given. This argument is the [event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) which contains all kinds of useful information about the event when the event triggers. This can contain things like a reference to the element that was clicked on an on click event, or the x and y position of where a canvas element was clicked on such an event and much more. Some parts of an event object depend on the type of event, for example you would not find a touches array of points on a touch screen for a keyboard event. However many other parts of such an event object are more or less consistent across different types. In this section I will be going over some examples of event objects when working with event listeners.

### 2.1 - event object target property event handler example involving a hyper link

In this basic example of using an event object I am setting the href property of an anchor element using the target property of the event object. The target property is a reference to the element in which the event took place. So the target property can generally be used as a way to reference the element to which the event listener was attached inside the body of the event listener.

For this example I am just attaching a click event listener that will set the href property of a link when it is clicked.

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

### 2.2 - Stop propagation

When I have a situation in which I have a bunch of nested elements, and I have a handler attached for each of them. If an event happens in a child event, that event listener will of course fire. However each event listener all the way up to the parent event will also fire as well on top of that. If I want to prevent this from happening I will want to use the stop propagation event object method. 

```html
<html>
    <head>
        <title>Event Listeners</title>
    </head>
    <body>
        <div id="container" style="width:640px;height:240px;background:red;">
            <div id="child1" style="width:240px;height:120px;background:green;">
                <div id="child2" style="width:120px;height:60px;background:blue;">
            </div>
            </div>
        </div>
        <script>
[].forEach.call(document.getElementsByTagName('div'), function(div){
div.addEventListener('click', function(e){
   e.stopPropagation();
   console.log(e.target.id);
   console.log(e.currentTarget.id);
});
});
        </script>
    </body>
</html>
```

## 4 - Not so basic example that uses canvas

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

When the example is up and running I can change the position of the circles by moving the mouse over the canvas, as well as clicking with the canvas with the click and mouse move event listeners. I could add many more listeners and make the project far more interesting, but you get the idea.

## 5 - Conclusion

There is way more to write about when it comes to event listeners in javaScript, there are a wide range of different types that have to do with all kinds of events. Events such as touch events, mouse events and there are even ways to write my own events and define what it is that triggers such custom events. There is also how to go about simulating such events also, for example each html element has a click method that when called will trigger any on click events that my be attached to that element.