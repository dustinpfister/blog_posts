---
title: On blur event in javaScript
date: 2019-01-08 13:59:00
tags: [js]
layout: post
categories: js
id: 358
updated: 2019-04-26 18:39:46
version: 1.6
---

The [on blur](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur) event in javaScript is the opposite of the on focus event. A focus event fires when the user focuses on an element like a text input element by clicking on it or cycling to it with the tab key on a keyboard. So then a blur event fires when an element losses this focus, once it has been acquired.

<!-- more -->

## 1 - on blur example

The use of a blur events might be used in conjunction with focus events as well. The focused element is the current element that the user is focused on in an html document. This typically might be something like an input tag in a form or something to that effect. So when an element looses focus that is what is known as a blur event.

In this example I am attaching some handlers for both the on focus, and on blur events for a single input element.

```html
<html>
    <head>
        <title>on blur example</title>
    </head>
    <body>
        <input id="foo" type="text" placeholder="foo">
        <script src="onblur.js"></script>
    </body>
</html>
```

The onblur.js file looks as follows.

```js
var foo = document.getElementById('foo');
 
foo.addEventListener('blur', function (e) {
    e.target.value = 'blur out';
});
foo.addEventListener('focus', function (e) {
    e.target.value = 'has focus';
});
```

When I open this up in the browser the on focus event fires for the input element when I click on it. When I click outside of the input element the on blur event will fire changing the value of the text in the input element  The on blur event does not bubble though so if I where to attach an on blur event to a div container it will not bubble down to an input element. The focus out event however will bubble down, which it would seem is the only note worth difference between on blur, and focus out.