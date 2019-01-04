---
title: Onchange event handler in action.
date: 2019-01-04 12:27:00
tags: [js]
layout: post
categories: js
id: 355
updated: 2019-01-04 13:09:06
version: 1.1
---

The [onchange](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange) event hander is for attaching call backs that will fire when the content of an input element changes. This is one of many events that a javaScript developer should be aware of when making any kind of client system that involves the use of html input tags. In this post I will be going over some quick examples of the onchnage event in client side javaScript.

<!-- more -->

## 1 - onchange example

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
