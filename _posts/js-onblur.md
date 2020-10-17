---
title: On blur event in javaScript and basic interface design
date: 2019-01-08 13:59:00
tags: [js]
layout: post
categories: js
id: 358
updated: 2020-10-17 07:48:02
version: 1.43
---

The [on blur](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onblur) event in javaScript is an event that fires when an element no longer has focus, in other words it is the opposite of the [on focus event](/2019/01/05/js-onfocus/). However if you do not know what it means for an element to have focus, then maybe we should back up a bit and start with that before moving on with some code examples on this one.

A focus event fires when the user focuses on an element like a text input element by clicking on it or cycling to it with the tab key on a keyboard. When working out a user interface you might want some code to run when an element that can be focused on gains this focus, but you might also want some code to run when that element looses this focus, and that is where the on blur event comes into play.

So then a blur event fires when an element losses this focus, once it has been acquired in the first place. An on blur event will only fire for elements that can gain a focus, such as input elements. However it is possible to set other elements that can not be focus by default with the [tab index](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/tabIndex) property. In this post I will be going over some examples that make use of the on blur event with plain old vanilla client side javaScript, rather than a certain front end frame work.

<!-- more -->

## 1 - On blur basics and what to know before continuing to read

This is a post on the on blur event in client side javaScript, one of many events to which an event handler can be attached for an element. An on blur event can be attached to an element using the on blur property of an element, or a method like addEventListener to attach event handers that will fire when the blur event happens. 

I will not be going over [event listeners](/2019/01/16/js-event-listeners/) in general in this post as I have wrote a post on that subject in the past. So then this post will be focusing on mainly the on blur event and related topics such as the tab index property. I assume that you have at least some background with javaScript and HTML as this is required in order to get anything of value from this post.

### 1.1 - On blur basic example

The use of an on blur event might be used in conjunction with an on focus event, as well as a whole range of other events to create a user interface for a form, single input element, or anything else for the matter to which focus events apply. 

The focused element in the interface is the current element that the user is focused on, and as such the value of the element can be manipulated with input from the keyboard. So with that being said the [on change event](/2019/01/04/js-onchange/) is also yet another event of interest when it comes to setting events for that kind of change. So the on focus event will fire when an element gets this focus, and the on blur event will fire when this focus is lost.

So with that being said here is a basic example of the on blur event in which I am attaching some event handlers for both the on focus, and on blur events for a single input element. I will be keeping this example simple so it will just involve changing the value of an text input tag.

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

So in the script tag I am just getting a reference to a single input element, and then attaching some event handers for the on blur event, as well as the corresponding on focus event as well. In there I will be grabbing a reference to the input element and will be attaching events for on blur, and on focus.

When I open this up in the browser the on focus event fires for the input element when I click on it. When I click outside of the input element the on blur event will fire changing the value of the text in the input element  The on blur event does not bubble though so if I where to attach an on blur event to a div container it will not bubble down to an input element. The focus out event however will bubble down, which it would seem is the only note worth difference between on blur, and focus out.

## 2 - On blur, on focus out and bubbling

The on blur event works fine, and so does [the on focus out](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event) event. On the surface it would seem that they both work the same way, these events happen when an element looses focus. However there is just one little difference between on blur and on focus out, and that difference has to do with [event bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture). The focus out event when attached to a container element will fire when a child element inside of it has lost focus and nothing is done to cancel the bubbling.

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

## 3 - Canvas elements and the tab index property

By default canvas elements and a whole bunch of other elements can not be focused by default. There is however the [tab index](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) html element attribute. Once a tab index attribute is set for an element then it can be focused just like an input element or any other kind of element that can be focused by default. So the on focus event will fire when the canvas element gains focus, and the on blur event will fire when it looses focus as well.

In this example I have a canvas project where I define some event handers for the on blur, and on focus events once it has become focusable in the browser thanks to the tab index attribute.

```html
<html>
    <head>
        <title>on blur canvas example</title>
    </head>
    <body>
        <canvas id="the-canvas" tabindex="0" width="320" height="240"></canvas>
        <script>
// get CANVAS
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// some handers and state for the canvas project
var state = {
   focused : false,
   onBlur : function(){
       state.focused = false;
   },
   onFocus : function(){
       state.focused = true;
   }
};
canvas.addEventListener('blur', state.onBlur);
canvas.addEventListener('focus', state.onFocus);
// DRAW
var draw = function(canvas, ctx){
   // crear screen
   ctx.fillStyle = 'black';
   ctx.fillRect(0,0,canvas.width,canvas.height);
   
   // focused or not info
   ctx.fillStyle='white';
   ctx.textBaseline='top';
   ctx.fillText('focused: ' + state.focused,10,10);
};
// LOOP
var loop = function(){
   requestAnimationFrame(loop);
   draw(canvas,ctx);
};
loop();
        </script>
    </body>
</html>
```

It just displays if the canvas has the users focus or not, but of course I could have it do something else when the project has focus. Generally you want to avoid using the tab index property with canvas elements, unless you take the time to make the element keyboard friendly. There are of course accessibility concerns when it comes to cycling throw things on a page with the tab key on desktop systems. The on blur event does not need to be used with everything something else could be worked out when it comes to canvas elements with other events.

## 4 - Simulating blur and focus events

It is possible to simulate a blur event, or in other words to trigger a blur event without the user causing a blur event to happen the element themselves by way of some javaScript code. Each element has a [blur method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/blur) that when called will simulate the blur event for the element triggering any blur events that are attached to it. There is also a [focus method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus) for events that will set the focus for an element. So the focus method can be used as a way to set the focus to a single element, and then the blur method of that element can be used as a way to loose it.

```html
<html>
    <head>
        <title>blur method example</title>
    </head>
    <body>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
        <script>
var input = document.getElementsByTagName('input');
var i = 2;
// set focus to input 2
input[i].focus();
setTimeout(function(){
    // blur it
    input[i].blur();
}, 3000);
        </script>
    </body>
</html>
```

There is also the [onblur property of an element that of course should not be confused with the blue method](https://stackoverflow.com/questions/5212651/blur-vs-onblur). The onblur method can be redefined with some custom javaScript to define a single event handler for the blur event, but the blur method is a way to trigger not just the onblur method but any additional event handers that where attached by way of the use of the add event listener method.

## 5 - Conclusion

One thing to briefly mention is that the browser support for the on blur event only goes back so far. I know that there are not a lot of people using IE 8 these days, but [some resources on line list that the answer to on blur](https://www.w3schools.com/jsref/event_onblur.asp) IE support is _yes_ which is a bit misleading. Yes there is IE support when it comes to the on blur event, but only for a certain version range. This of course does not just apply to the on blur event, any native feature in javaScript that is used may break on older platforms that do not support it.

So the the on blur event is useful for defining some logic that will fire when a user moves the focus of an element away from an element. It is often used in conjunction with the on focus event that will fore when the focus of an element is gained. If I get some more time sooner or later I might get around to writing some better examples that involve a great deal more going on when it comes to using the on blur event in a project. For now I hope you enjoyed this post and got at least something of value out of reading it.