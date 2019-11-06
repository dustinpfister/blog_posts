---
title: The javaScript Option constructor and select lists in general
date: 2019-11-06 13:24:00
tags: [js]
layout: post
categories: js
id: 557
updated: 2019-11-06 13:35:53
version: 1.3
---

So now and then when I work out various projects I sometimes want to use a [select element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement) to provide an interface to select two or more option elements. Just like any other html element, these option elements can be hard coded in the html itself, but they can also be added with javaScript when it comes to dom manipulation. There is the document.createElement method which is what is often used, but there is also the [javaScript Option](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option) constructor in the window object that can be used to quickly create an option element in client side javaScript. 

<!-- more -->

## 1 - JavaScript Option constructor basic example.

```html
<html>
    <head>
        <title>javascript option</title>
    </head>
    <body>
        <select id="select_modes">
            <option>default</option>
        </select>
        <script>
// get a reference to the select method one way
// or another
var sel = document.getElementById('select_modes');
 
// there is the document.createElement method
// that can be used to create an option element
// and then append child can be used to append
// the element to the select element
var opt = document.createElement('option');
opt.innerText = 'mode2';
sel.appendChild(opt)
 
// there is also window.Option constructor
// and the first param can be used to set the
// inner text of the element.
// also the add method of a select element
// that will also work in most clients
sel.add(new Option('mode3'));
        </script>
    </body>
</html>
```