---
title: js Onchange event handler in action.
date: 2019-01-04 12:27:00
tags: [js]
layout: post
categories: js
id: 355
updated: 2021-10-31 06:59:12
version: 1.36
---

The [onchange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) event is for [attaching events](/2019/01/16/js-event-listeners/) to an input element that will fire when the value of an input element changes. A handler for this kind of event can be attached via the [onchange property](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange) of an input element, or via [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and using the change value for the type argument. This is one of many events that a client side javaScript developer should be aware of when making any kind of user interface that involves the use of html input tags to gather information or change settings for a client system. 

So then there are many other events that come to mind also that are important to the process of user Interface design such as [onblur](/2019/01/08/js-onblur/) and [onfocus](/2019/01/05/js-onfocus/), just to name a few. In addition events like onkeyup can be used to track changes to the value of an input tag as they happen on a per key stroke basis. Still the onchange event might prove to be an important event un the process of making a user interface as it is the event that will fire when a value actually changes in the input tag, rather then it being in the process of changing. 

So then in this post I will be going over some quick examples of the onchange event in client side javaScript, and I will also be touching base on a whole bunch of related topics. This post will start out with a [real basic onchnage event example for beginners](https://stackoverflow.com/questions/5024056/how-to-pass-parameters-on-onchange-of-html-select), but then progress into some more interesting examples at the bottom of this post.

<!-- more -->

## 1 - Basics of the js on change event

In this section I will be quickly going over just a few basic getting started type examples of the on change event in client side javaScript.

### 1.1 - js onchange event basic example

For a simple example of the onchange event hander here is an example that uses the [document.querySelector](/2020/06/23/js-document-queryselector/) method to get references to an input tag, as well as a paragraph tag. When the text of the text input element changes the event fires, and the value of the input element can be used to update the output that is set in the paragraph element.

```html
<html>
    <head>
        <title>on change</title>
    </head>
    <body>
        <input class="pow" type="text" placeholder="4">
        <p id="out"></p>
        <script>
 
        var inputPow = document.querySelector('input.pow'),
        out = document.querySelector('#out');
 
        // set to the giver power
        var set = function(pow){
            out.innerText = Math.pow(2,pow);
        };
 
        // set the new power when input changes
        inputPow.addEventListener('change', function(e){
           set(e.target.value);
        });
 
        // start out at placeholder
        set(inputPow.placeholder);
 
        </script>
    </body>
</html>
```

When adding an event listener for the onchange event with the addEventListener element object method the first argument is the event that I want to attach for, in this case it is onchange. The second argument is a call back method that will fire each time this event occurs for the input element. The first argument that is suppled to this callback method is an [event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) that can be used to gain the value of the element from which the event fired via the target property of the event object which is a reference to the input element where this onchange event happened. 

With that said in this event object I am using the target property of the event object as a way to gain a reference to the input element completely. In this example it is not a big deal to just use the inputPow global, however in a more complex project that involves a lot of elements it is often better to use the target property inside the body of a callback method as a way to gain access to the element from which an event like onchange as fired in a situation in which there might be many such elements.

There are other ways of going about attaching events, although I would go with add event listener for the most part. In addition when making a real interface the onchnage event is just one such event that comes to mind. So lets look at some more examples that make use of other ways of attaching, as well as additional events.

### 1.2 - The onchange attribute and addEventListener

For input elements there is an [onchange attribute](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Attribute/onchange) that can be used to reference a single change event handler for the element. This attribute may not be depreciated, , but generally most of the time I prefer the use of addEventListener because I can add more than one handler, and it is generally the way that I prefer to attach events for elements and nodes in general. The one thing that comes to mind about this is that it would result in greater backward support for old browsers. However these days we are talking very out dated platforms that most people are just not using any more, at least that is the case when I look at my stats when it comes to that.

```js
var el = document.querySelector('input.pow'),
out = document.querySelector('#out');
 
var func1 = function(e){
    out.innerHTML = Math.pow(2,e.target.value);
};
 
var func2 = function(e){
console.log('change event for ');
console.log(e.target);
}
 
// the onchange attribute can be used to set a single handler
el.onchange = func1;
 
// however add event listener can be used to set more
// than one onchange event for the same element
el.addEventListener('change', func1);
el.addEventListener('change', func2);
```



## 2 - On change event example making an Revenue Per Mille calculator

For a more advanced example of the onchange event, I made a quick little app that can be used to estimate the amount of money that a blog can make if the revenue per mille, and page views counts are known. In this example I am attaching the same event handler for more than one input element.

So I just have a simple html file that has some input elements for rpm and page views, and then I am linking o an external javaScript file that makes use of the onchange event to update the output via the inner text of a div element each time the value of the rpm or page views input elements changes.

```html
<html>
    <head>
        <title>on change</title>
    </head>
    <body>
        <div id="controls">
            <input class="rpm" type="text" placeholder="1.95">
            <input class="pageviews" type="text" placeholder="20000">
        </div>
        <p id="out"></p>
        <script src="onchange.js"></script>
    </body>
</html>
```

Here I have the code in my onchange.js file that makes use of the onchange event to update the text each time a change event fires. I have a state object that holds the current values for money, page views and rpm.

```js
var state = {
    onChange: function (e) {
        state[e.target.className] = e.target.value;
        state.figure();
    },
    figure: function () {
        this.money = this.rpm * (this.pageviews / 1000);
        document.getElementById('out').innerText = 'money: ' + this.money;
    }
};
 
[].forEach.call(document.getElementById('controls').children, function (el) {
    if (el.nodeName == 'INPUT') {
        el.addEventListener('change', state.onChange);
        state[el.className] = el.placeholder;
    }
});
 
state.figure();
```

Here I am using Function.call to use the Array.forEach method as a way to loop over the children property of my controls div. This is necessary if I want to use an Array method like Array.forEach with the children property because it is not an Array but rather an HTMLCollection.

## 3 - onchange event handler example with on focus, on blur, events as well and more

For this section I wanted to make a quick little project that is more of an actual project rather than a simple little example. Still it is not much of a project, but it is something a bit more advanced that takes into account more than one type of event on top of just the on change event.

Here I have made a function that when called will create a container and inject some input elements and a canvas element into the container. The container element will then be appended to the actual html when called. I have on change events attached for both the input elements, as well as handlers for when they both gain and loose focus. When focus is gained the canvas element will be shown, when they loose focus the canvas element will no longer be shown. The canvas element can also be used as a way to set the values for the input elements as well.

```js
var aTaner = function (opt) {
    // set up state
    opt = opt || {};
    var state = {
        appendTo: opt.appendTo || document.body,
        x: opt.x === undefined ? 45 : opt.x,
        y: opt.y === undefined ? 45 : opt.y,
        a: 0,
        cx: 0,
        cy: 0,
        figureAngle: function () {
            this.a = Math.atan2(this.y - this.cy, this.x - this.cx)
        },
        draw: opt.draw || function (ctx, canvas) {
            // fill
            ctx.fillStyle = 'black';
            ctx.lineWidth = 3;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // stroke point that can change
            ctx.beginPath();
            ctx.strokeStyle = 'green';
            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
            ctx.stroke();
            // center
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.arc(this.cx, this.cy, 10, 0, Math.PI * 2);
            ctx.stroke();
            // draw line
            ctx.beginPath();
            ctx.moveTo(this.cx, this.cy);
            ctx.lineTo(
                Math.cos(this.a) * 100 + this.cx,
                Math.sin(this.a) * 100 + this.cy);
            ctx.stroke();
        }
    };
    // set up canvas and input elements
    var input_y = document.createElement('input');
    input_y.value = state.y;
    input_y.className = 'input_y';
    var input_x = document.createElement('input');
    input_x.value = state.x;
    input_x.className = 'input_x';
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div');
    canvas.width = opt.width === undefined ? 320 : opt.width;
    canvas.height = opt.height === undefined ? 240 : opt.height;
    state.cx = canvas.width / 2;
    state.cy = canvas.height / 2;
    canvas.style.display = 'none';
    container.appendChild(input_x);
    container.appendChild(input_y);
    container.appendChild(canvas);
    container.style.width = canvas.width + 'px';
    container.className = 'wrap_taner';
    state.appendTo.appendChild(container);
    // ON CHANGE, focus, and blur for input element
    var onFocus = function (e) {
        canvas.style.display = 'block';
    },
    onBlur = function (e) {
        canvas.style.display = 'none';
    },
    onChange = function (e) {
        var el = e.target,
        axis = el.className.split('_')[1];
        state[axis] = e.target.value;
        state.figureAngle();
        state.draw.call(state, ctx, canvas);
    };
    input_y.addEventListener('change', onChange);
    input_y.addEventListener('focus', onFocus);
    input_y.addEventListener('blur', onBlur);
    input_x.addEventListener('change', onChange);
    input_x.addEventListener('focus', onFocus);
    input_x.addEventListener('blur', onBlur);
    // canvas event for mouse down
    canvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var box = e.target.getBoundingClientRect();
        input_x.value = state.x = e.clientX - box.left;
        input_y.value = state.y = e.clientY - box.top;
        state.figureAngle();
        state.draw.call(state, ctx, canvas);
    });
    // first draw
    state.figureAngle();
    state.draw.call(state, ctx, canvas);
};
```

```html
<html>
    <head>
        <title>on change</title>
        <style>
.wrap_taner{
  background:grey;
  margin-bottom:50px;
}
        </style>
    </head>
    <body>
        <div id="taners"></div>
        <script src="ataner.js"></script>
        <script>
aTaner({
  appendTo: document.getElementById('taners'),
});
aTaner({
  appendTo: document.getElementById('taners'),
});
        </script>
    </body>
</html>
```

So this project was just a simple little project that I made to just show what can be made when using the on change event along with many other events and other native methods available in client side javaScript to make an interesting project. When I click on an input take a canvas element shows up that displays the position of a point that is the x and w values that can be set with the input elements. I can also click on the canvas to change the position of the point to the point on that canvas and update the value of the input tags in the process.

This example might be kind of still and pointless, but taking just a moment to use my imagination of course there are all kinds of things that comes to might that might prove to be more practical, or interesting. An input element is a way of letting a user set some kind of value, what is to be done with that value depends on the nature of the application.

## 4 - Conclusion

So the onchange event is useful for setting one or more callbacks for an element that will fire when the value of the element changes. The onchange event can be used in conjunction with a wide range of other events such as on blur, and on focus to define a user interface that can be used to do things like gather information that will be posted back to a server, or update the position of something in a canvas element, or anything else that can be set or changed with an input element.