---
title: On blur event in javaScript
date: 2019-01-08 13:59:00
tags: [js]
layout: post
categories: js
id: 358
updated: 2019-06-21 11:26:17
version: 1.16
---

The [on blur](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur) event in javaScript is the opposite of the on [focus event](/2019/01/05/js-onfocus/). A focus event fires when the user focuses on an element like a text input element by clicking on it or cycling to it with the tab key on a keyboard. So then a blur event fires when an element losses this focus, once it has been acquired. In this post I will be going over some examples using the on blur event with plain old vanilla javaScript, rather than a certain front end frame work.

<!-- more -->

## 1 - On blur and what to know before continuing to read

This is a post on the on blur event in client side javaScript, one of many events that can be attached to an element using the onblur property of an element or a method like addEventListener to attach event handers that will fore when the bur event happens. I assume that you have at least some background with javaScript and html as this is required in order to get anything of value from this post.

This post will be on just using native javaScript by itself rather than a particular frame work.

## 2 - On blur basic example

The use of a blur events might be used in conjunction with focus events as well. The focused element is the current element that the user is focused on in an html document. This typically might be something like an input tag in a form or something to that effect. So when an element looses focus that is what is known as a blur event.

In this example I am attaching some handlers for both the on focus, and on blur events for a single input element.

```html
<html>
    <head>
        <title>on blur example</title>
    </head>
    <body>
        <input id="foo" type="text" placeholder="foo">
        <script>
var foo = document.getElementById('foo');
foo.addEventListener('blur', function (e) {
    e.target.value = 'blur out';
});
foo.addEventListener('focus', function (e) {
    e.target.value = 'has focus';
});
        </script>
    </body>
</html>
```

So in the script tag I am just getting a reference to a single input element, and then attaching some event handers for the on blur event, as well as the corresponding on focus event as well.In there I will be grabbing a reference to the input element and will be attaching events for on blur, and on focus.

When I open this up in the browser the on focus event fires for the input element when I click on it. When I click outside of the input element the on blur event will fire changing the value of the text in the input element  The on blur event does not bubble though so if I where to attach an on blur event to a div container it will not bubble down to an input element. The focus out event however will bubble down, which it would seem is the only note worth difference between on blur, and focus out.

## 3 - On blur, on focus out ans bubbling

The on blur event works fine, and so does the on focus out method. On the surface it would seem that they both work the same way, firing when an element looses focus. However there is just one little difference between on blur and on focus out, and that difference has to do with [event bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture). The focus out event when attached to a container element will fire when a child element inside of it has lost focus and nothing is done to cancel the bubbling.

Say you have a container element that has two or more elements in it that can gain and loose focus. The on blur event can be used to attach event handers for when the elements lose focus, but a handler must be attached for each element. However a single focus out event can be attached to the container of the elements of interest.

```html
<html>
    <head>
        <title>bubble example</title>
    </head>
    <body>
        <div id="container" style="background:red;height:200px;">
            Name: <input id="user_name" type="text" placeholder="Dustin">
            Name: <input id="user_say" type="text" placeholder="Hello there">
            <div id="out"></div>
        </div>
        <script src="bubble.js"></script>
    </body>
</html>
```

The focus in event can be attached to the container that will fire whenever an element inside the container gains focus, and the focus out event can be attached for when any element in the container losses focus just like with on blur.

```js
var container = document.getElementById('container'),
out = document.getElementById('out');
// when focusout and focusin are attached to the container
// of an input element they will work because of bubbling
container.addEventListener('focusout', function (e) {
    out.innerText = 'Focused out from ' + e.target.id + ' in the container';
});
container.addEventListener('focusin', function (e) {
    out.innerText = 'The ' + e.target.id + ' element is now focused in the container.';
});
```

If I where to use on blur and on focus in place of these events when attaching to the container element this example will not work. So the on blur event is something that must be used on a per element bases.