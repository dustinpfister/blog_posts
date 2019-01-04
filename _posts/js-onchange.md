---
title: Onchange event handler in action.
date: 2019-01-04 12:27:00
tags: [js]
layout: post
categories: js
id: 355
updated: 2019-01-04 13:12:26
version: 1.2
---

The [onchange](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange) event hander is for attaching call backs that will fire when the content of an input element changes. This is one of many events that a javaScript developer should be aware of when making any kind of client system that involves the use of html input tags. In this post I will be going over some quick examples of the onchnage event in client side javaScript.

<!-- more -->

## 1 - onchange example

For a simple example of the onchange event hander here is a simple example that uses document.querySelector to get references to an input tag, and a paragraph tag. When the text of the text input element changes the event fires, and the value of the input element can be used to update the output that is set in the paragraph element.

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
