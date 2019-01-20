---
title: focus javaScript event and related topics.
date: 2019-01-05 19:29:00
tags: [js]
layout: post
categories: js
id: 356
updated: 2019-01-20 18:17:03
version: 1.9
---

The [onfocus event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onfocus) in javaScript is an event that will fire when the user focus on an element. This often happens when a user clicks on an element, but the event does behave a little different from a click event. In this post I will be covering some quick examples when it comes to working with focus javaScript events, how to attach handers for such events, and how to simulate them as well with the [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method of an element.

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

Here I have a simple example where I am just setting the focus of the input element that has an id of bar. When I load this in the browser the bar element is focus on for starters as exspected so the focus method is useful for setting focus via javaScript.

## 2 - onfocus event hander for an element

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

```js
 
var onfocus = function (e) {
 
    console.log(e);
 
};
 
document.getElementById('foo').addEventListener('focus', function () {
 
    console.log('foo');
 
});
```


