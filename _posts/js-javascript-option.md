---
title: The javaScript Option constructor and select lists in general
date: 2019-11-06 13:24:00
tags: [js]
layout: post
categories: js
id: 557
updated: 2019-11-06 13:58:44
version: 1.6
---

So now and then when I work out various projects I sometimes want to use a [select element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement) to provide an interface to select two or more option elements. Just like any other html element, these option elements can be hard coded in the html itself, but they can also be added with javaScript when it comes to dom manipulation. There is the document.createElement method which is what is often used, but there is also the [javaScript Option](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option) constructor in the window object that can be used to quickly create an option element in client side javaScript. 

<!-- more -->

## 1 - JavaScript Option constructor basic example.

The javaScript Option constructor can be used as an alternative to document.createElement and given the additional parameters that can eb given to it, it can also result in a more concise solution when it comes to create Option elements for a select element.

Here I have some very basic example of both general options when it comes to creating an option element with javaScript, as well as some options when it comes to how to append such and element to a select element.

```html
<html>
    <head>
        <title>javaScript option</title>
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

So the javaScript Option constructor is yet another constructor like that of the Image constructor that is another way to go about creating an element in client side javaScript. The basic process is create the element, add some properties to it, and then append it to an existing mount point in the actual html by gaining a reference to a parent element in this case a select element.

So now that we have the very basics out of the way lets more on to some additional simple examples about using the javaScript Option constructor, such as the additional parameter options, and event handlers.

## 2 - Parameter options for the javaScript Option constructor

Here I have a simpe example of the Option constructor where I am using all the avalabule options.

```html
<html>
    <head>
        <title>javaScript option</title>
    </head>
    <body>
        <select id="select_modes">
            <option>default</option>
        </select>
        <script>
var sel = document.getElementById('select_modes');
// params to set the innerText, value, default element boolean, and the selected boolean
opt = new Option('mode2', '2', true, true);
sel.add(opt);
        </script>
    </body>
</html>
```

This results in an option element that has an inner text value of mode2, but a value of 2, more on that when we get into events. In addition there are two boolean values that can be passed to set the option as the default option and to make it selected when the page loads.