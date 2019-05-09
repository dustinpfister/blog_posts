---
title: On blur event in javaScript
date: 2019-01-08 13:59:00
tags: [js]
layout: post
categories: js
id: 358
updated: 2019-05-09 15:16:21
version: 1.8
---

The [on blur](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur) event in javaScript is the opposite of the on [focus event](/2019/01/05/js-onfocus/). A focus event fires when the user focuses on an element like a text input element by clicking on it or cycling to it with the tab key on a keyboard. So then a blur event fires when an element losses this focus, once it has been acquired. In this post I will be going over some examples using the on blur event with plain old vanilla javaScript, rather than a certain front end frame work.

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

## 2 - On blur and on focus out

The on blur event works find, but there is just one little difference between on blur and on focus out. That difference has to do with event bubbling. The focus out event when attached to a container element will bubble down the DOM tree until it finds an inut element, it will then fire for any element that has focus in the tree.

```html
<html>
    <head>
        <title>bubble example</title>
    </head>
    <body>
        <div id="container" style="background:red;height:200px;">
            <input id="foo" type="text" placeholder="foo">
        </div>
        <script src="bubble.js"></script>
    </body>
</html>
```

```js
var container = document.getElementById('container');

// when focusout and focusin are attached to the container
// of an input element they will work because of bubbling
container.addEventListener('focusout', function (e) {
    e.target.value = 'focus out';
});
container.addEventListener('focusin', function (e) {
    e.target.value = 'has focus';
});
 
// blur will not fire when attached to a div container
// because the blur event does not bubble
container.addEventListener('blur', function (e) {
    console.log('will not fire on blur');
});
 
// blur will only work if it is attached to the input
// element directly
document.getElementById('foo')
.addEventListener('blur', function (e) {
    console.log('will fire on blur');
});
```