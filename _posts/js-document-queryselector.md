---
title: document querySelector method and other ways of getting references to elements in javaScript
date: 2020-06-23 10:17:00
tags: [js]
layout: post
categories: js
id: 670
updated: 2020-06-23 10:21:26
version: 1.0
---

In late spects of client side javaScipt there is now the [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method as well as another method that can be used to get a collection of elements rather than just one. For the most part using this method is safe as of this writing, unless for some reason you want to have support for older browsers that are not used that often any more. There are other options that I find myself still using just for the hell of it, but the querySelector method works well at getting at an element that I want in an array of different ways other then that of just an id property value.

<!-- more -->

## 4 - Document.querySelector, and Document.querySelectorAll

If you are familiar with jQuery then you will like  when as a way to gain references to elements in javaScript. This allows for a wide range of possibilities for gaining accesses to dom elements, by Id, class, tag name, and more.

```html
<html>
    <head>
        <title>document getelementbyid </title>
    </head>
    <body>
        <span class="foo">one</span>
        <span class="foo">two</span>
        <span class="foo">three</span>
        <p id="out"></p>
        <script>
var foos = document.querySelectorAll('.foo');
 
console.log(foos[1].innerText); // two
 
        
        </script>
    </body>
</html>
```
