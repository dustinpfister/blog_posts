---
title: On blur event in javaScript
date: 2019-01-08 13:59:00
tags: [js]
layout: post
categories: js
id: 358
updated: 2019-01-21 13:07:29
version: 1.2
---

The [on blur](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur) event in javaScript is the opposite of the on focus event. A focus event fires when the user focuses on an element like a text input element by clicking on it or cycling to it with the tab key on a keyboard. So then a blur event fires when an element losses this focus, once it has been acquired.

<!-- more -->

## 1 - on blur example

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