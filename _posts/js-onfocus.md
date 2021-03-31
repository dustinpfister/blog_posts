---
title: focus javaScript event and related topics.
date: 2019-01-05 19:29:00
tags: [js]
layout: post
categories: js
id: 356
updated: 2021-03-31 09:52:36
version: 1.33
---

The javaScript [onfocus event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onfocus) is an event that will fire when the user sets what is often called the focus on an element. This focus typically will happen when a user clicks on an element for example, but there are other things that can happen that would trigger such an event. For example it can also happen by using the tab button to cycle threw elements that can be focused in desktop environments such as input elements.

In addition to setting the focus of an element by clicking on an element, and using the tab key on a keyboard, there are also ways in which a focus event can fire by way of javaScript code. The typical way to do so would be by using an element reference object method such as the [HTMLElement.focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method. So there are ways that a focus event can fire by way of user action, and there are also ways to which a focus event can be simulated by way of javaScript code.
There is also the question of what elements can be focused on and why. There is also how to go about making an element an element that can be focused on with the tab index property.

In addition there is also the [on blur](/2019/01/08/js-onblur/) event that will happen when an element loses this focus after it has gained such a focus. The javaScript focus event along with blur, onkeydown, and on change are often used all together when working out some kind of user interface that makes use of one ore more input tags.

In this post I will be covering some quick examples when it comes to working with focus javaScript events, how to attach handers for such events, and how to simulate them, and also how to make elements that can not be focused by default focusable.

<!-- more -->

## 1 - focus javaScript method for simulating a focus event

The focus method of an element can be used to set the focus of an element if such a thing can be done with the element, as not all elements can gain a focus by default. Normally a focus event happens when the user sets the focus to an element by clicking on it, or using the tab key on desktops systems to cycle threw all elements that can be focused on in a page. However it is possible to also simulate this kind of event via javaScript as well by using the focus method of an element.

So in  this section I will be going over a simple example that simulates a focus event by gaining a reference to an input element that can be focused in the browser and calling the focus element method of that element.

```html
<html>
    <head>
        <title>simulate focus</title>
    </head>
    <body>
        <input id="foo" type="text" placeholder="foo">
        <input id="bar" type="text" placeholder="bar">
 
        <script>
 
// simulate a focus event got the 'bar' input element
document.getElementById('bar').focus();
 
        </script>
    </body>
</html>
```

Here I have a simple example where I am just setting the focus of the input element that has an id of bar. When I load this in the browser the bar element is focus on for starters as expected so the focus method is useful for setting focus via javaScript. However there is also doing something when a focus event happens when it is simulate like this, or my any other means, to do this we just need to define one ore more focus event handlers for the element.

## 2 - onfocus event hander for an element

There might be situations in which I will want to define some javaScript that will run each time a focus event happens for one or more elements. For this there is the onfocus event, and addEventListener. These days it might be best to stick with addEventLisneter for attaching an on focus event, or any event for that matter. However if you do want to push backward compatibility back farther for whatever the reason, there are other options that will work on old platforms.

Here in the html of a basic example that makes use of the javaScript focus event I have two input tags with ids assigned to them, I also have a script tag that links to some external javaScript that attaches some event handlers to the elements.

```html
<html>
    <head>
        <title>onfocus</title>
    </head>
    <body>
        <input id="foo" type="text" placeholder="foo">
        <input id="bar" type="text" placeholder="bar">
        <p id="out"></p>
        <script src="onfocus.js"></script>
    </body>
</html>
```

Here I have some javaScript that attaches event handers for the on focus event.

```js
// get a reference to the element
var el = document.getElementById('foo');
// a single focus event can be attached this way
el.onfocus = function (e) {
    console.log(e);
};
// attaching two or more will require the use of addEventListener
el.addEventListener('focus', function () {
    console.log('foo');
});

```

When I open this file up in the browser and click on the foo input tag the event tag of the element and the string 'foo' log to the console as expected.

## 3 - tabindex and the onfocus event

Another subject of interest when it comes to the on focus event is the tab index attribute of html elements. This tab index attribute is one way to make it so elements that can not be focused by default focusable such as canvas elements. This might not always be such a great idea, but it can be done with the tabindex property

```js
var draw = function (canvas, mode) {
    console.log(canvas);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = mode === 'focus' ? 'red' : 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
var onfocus = function (e) {
    var canvas = e.target;
    if (canvas.getContext) {
        draw(canvas, 'focus');
    }
};
 
var onblur = function (e) {
    var canvas = e.target;
    if (canvas.getContext) {
        draw(canvas, 'blur');
    }
};
 
var nodes = document.getElementsByTagName('canvas');
[].forEach.call(nodes, function (canvas) {
    canvas.addEventListener('focus', onfocus);
    canvas.addEventListener('blur', onblur);
    draw(canvas);
});
```

WHen it comes to things like canvas elements there are many other events to work with that might be more appropriate, but still for whatever reason if I want to make a canvas element something that can be focused on via the tab button this will work.

## 4 - JavaScript focus and blur events

So there is the focus event that fires when an element gets the focus, and then there is the [blur event](/2019/01/08/js-onblur/) that fires when that element looses the focus for whatever the reason. The focus can be lost for a wide range of reasons, but often it is because the user just simply moved on to another element in a form or click another area of the page.

In this example I will be making use of both the focus and blur events. I have two text input events that can be used to set some x and y values, and a div element that can be used to display messages. in the event that an input looses focus the message divs content is cleared, while the message div displays a message for the input element when it gains focus.

```html
<html>
    <head>
        <title>onfocus</title>
    </head>
    <body>
        <div id="container">
            <input id="x" type="text" placeholder="0">
            <input id="y" type="text" placeholder="0"><br>
            <input id="set" type="button" value="set">
        </div>
        <p id="out"></p>
        <script src="focus_and_blur.js"></script>
    </body>
</html>
```

Here in the javaScript for this example I have put together a quick way to go about getting references to all the elements that I want, and then I use addEvent listener to attach events to them. these are the kinds of things that I run into when making a vanilla javaScript project. If I where using a framework like vuejs things might be structured a little better.

```js
var get = function (id) {
    return document.getElementById(id);
};
 
var el = {
    x: get('x'),
    y: get('y'),
    set: get('set'),
    out: get('out'),
    con: get('container')
};
 
var add = function (id, eventName, cb) {
    el[id].addEventListener(eventName, cb);
}
 
var onTextBlur = function (e) {
    el.out.innerText = '';
};
 
var onTextFocus = function (mess) {
    return function (e) {
        el.out.innerText = mess;
    };
};
 
add('x', 'blur', onTextBlur);
add('y', 'blur', onTextBlur);
 
add('x', 'focus', onTextFocus('set the value of x'));
add('y', 'focus', onTextFocus('set the value of y'));
```

I am not suggesting that this is the best way of how to go about attaching events, in actually projects chances are I will be using some kind of framework when it comes to making the attachment of events more streamlined. In these posts I like to stick to vanilla javaScript by itself though, and when doing so I work out all kinds of ways of wrapping addEventListener, and experiment with different way to go about handing event attachment for on focus events, and events in general. 

## 5 - conclusion

So the javaScript focus event is used to define some logic that will fire when an element looses focus that is gained by a range or reasons such as clicking on the element. There is also the [blur event](/2019/01/08/js-onblur/) that is used to attach some logic that will do something when that focus is lost. There are also a wide rage of other events that come into play when making an actually user interface of one kind or another such as on change, on keyup and more.