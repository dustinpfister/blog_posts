---
title: document querySelector method and other ways of getting references to elements in javaScript
date: 2020-06-23 10:17:00
tags: [js]
layout: post
categories: js
id: 670
updated: 2020-11-11 09:24:57
version: 1.8
---

In late specs of client side javaScipt there is now the [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method as well as another method called [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll). The query selector method can be used to get a single element by way of an id, class name, or tag name. The query selector all method works in a similar way but can be used to get a collection of elements rather than just one. So these methods are yet another way to go about getting a reference to a single element, or an HTMLCollection that is a kind of array of elements.

For the most part using this method is safe as of this writing, unless for some reason you want to have support for older browsers that are not used that often any more. There are other options that I find myself still using just for the hell of it, for example if I do just want to get an element by id then I still find myself using [document.getElementById](/2018/12/27/js-document-getelementbyid/) to do so. Still the querySelector method works well at getting at an element not just by id t, but also in an array of different ways other then that of just an id property value of an element.

I thing that it is not a good idea to get caught up in this nit puck issues though, regardless if query selector is used, or a more tired yet true option, the end result is the same. One way or another I want to gain a reference to an element, or a collection of elements.

<!-- more -->

## 1 - The basics of Document.querySelector, and Document.querySelectorAll

If you are familiar with jQuery then you will like document querySelector as a way to gain references to an element. This allows for a wide range of possibilities for gaining accesses to dom elements. An element reference can be obtained by Id, class, and tag name. In addition there is also the document querySelectorAll method that works more or less the same, but as you would expect returns a collection of elements rather that just a single element.

### 1.1 - Query selector will return a single element reference

The query selector method will return an element reference just like a method such as document.getElementById.


```html
<html>
    <head>
        <title>document querySelector</title>
    </head>
    <body>
        <div id="foo"></div>
        <p id="out"></p>
        <script>
var el = document.querySelector('#foo');
el.style.width = '320px';
el.style.height = '320px';
el.style.background = 'black';
        </script>
    </body>
</html>
```

### 1.2 - Query Selector all will return an HTMLCollection

The query selector all method will not return a single element reference, but an HTML collection of element references.

```html
<html>
    <head>
        <title>document querySelectorAll </title>
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

If you do not care at all about backward compatibility with other browsers that do not support these methods that one can just go ahead and use these methods as a way to get references to elements. Still there are other options when it comes to getting references to elements. I do still find myself using document.getElementById, and not always just because it has better backward compatibility. When I do just want to get an element by way of an id attribute it still woks just fine, and it makes the code more clear.

## 2 - The tired yet true get element by id method

The tired yet true way of getting a reference to a single element by way of an id attribute is the get element by id method. I do often still find myself using this method as a way of getting a reference to a single element if there is an id for it.

```html
<html>
  <head>
    <title>Demo</title>
  </head>
  <body>
    <div id="foo"><p>bar</p></div>
    <script>
 
    var el = document.getElementById('foo');
    console.log( el.children[0].innerText ); // bar
 
    </script>
  </body>
</html>
```

Of course I can also get a single element by way of id using query selector, but as long as this is here there is the added advantage of it still working on older clients. I can not say that it is an issue that concerns me that much these days when I look at the browser stats of this website at least. However I still find myself using this method over all others just for the hell of it anyway.

## 3 - Conclusion

So the document query selector method is one way to go about getting a single element in an HTML document. In addition there is also the query selector all method that can be used to get a collection of elements. One down side is that these methods have not been around as long as other options that there are to work with in client side javaScript, but if your sides browser stats show that it is safe to just go ahead and use them, maybe code will not break for that many visitors.