---
title: On blur event in javaScript
date: 2019-01-08 13:59:00
tags: [js]
layout: post
categories: js
id: 358
updated: 2019-01-21 15:51:57
version: 1.4
---

The [on blur](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur) event in javaScript is the opposite of the on focus event. A focus event fires when the user focuses on an element like a text input element by clicking on it or cycling to it with the tab key on a keyboard. So then a blur event fires when an element losses this focus, once it has been acquired.

<!-- more -->

## 1 - on blur example

The use of a blur events might be used in conjunction with focus events as well. The focused element is the current element that the user is focused on in an html document. This typically might be something like an input tag in a form or something to that effect. So when an element looses focus that is what is known as a blur event.

In this example I am attaching some handlers for both the on focus, and on blur events.

```html
<html>
    <head>
        <title>on blur example</title>
    </head>
    <body>
        <input id="foo" type="text" placeholder="foo">
        <input id="bar" type="text" placeholder="bar">
        <script src="onblur.js"></script>
    </body>
</html>
```

The main.js file looks as follows.

```js
var forBlur = function (e) {
    console.log(e.target.id + ' blur');
};
 
var forFocus = function (e) {
    console.log(e.target.id + ' focus');
};
 
var foo = document.getElementById('foo');
foo.addEventListener('blur', forBlur);
foo.addEventListener('focus', forFocus);
 
var bar = document.getElementById('bar');
bar.addEventListener('blur', forBlur);
bar.addEventListener('focus', forFocus);
```

When I open this up in the browser the on focus event fires for the input element that I clicked on. When I click on the other input element, or anything else that will result in a loss of focus for that event the blur event for that element fires.