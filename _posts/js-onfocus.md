---
title: focus javaScript event and related topics.
date: 2019-01-05 19:29:00
tags: [js]
layout: post
categories: js
id: 356
updated: 2019-05-23 12:32:20
version: 1.16
---

The [onfocus event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onfocus) in javaScript is an event that will fire when the user focus on an element. This often happens when a user clicks on an element for example, but it can also happen by other means as well. These other ways in which a focus event can fire is if the user cycles to it with the tab key, and also if the focus is set to the element with an element method like [HTMLElement.focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus).

In this post I will be covering some quick examples when it comes to working with focus javaScript events, how to attach handers for such events, and how to simulate them as well with the focus HTML Element method of an element.

<!-- more -->

## 1 - focus javaScript method for simulating a focus

The focus method of an element can be used to set the focus of an element it such a thing can be done with the element. Normally a focus event happens when the user sets the focus to an element by clicking on it, or using the tab key on desktops systems to cycle threw all elements that can be focused on in a page. However it is possible to also simulate this kind of event via javaScript as well by using the focus method of an element.

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

Here I have a simple example where I am just setting the focus of the input element that has an id of bar. When I load this in the browser the bar element is focus on for starters as expected so the focus method is useful for setting focus via javaScript.

## 2 - onfocus event hander for an element

There might be situations in which I will want to define some javaScript that will run each time a focus event happens for one or more elements. For this there is the onfocus event, and addEventListener. These days it might be best to stick with addEventLisneter for attaching an on focus event, or any event for that matter. However if you do want to push backward compatibility back farther, there are other options.

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

## 3 - JavaScript focus and blur events

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