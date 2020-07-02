---
title: document querySelector method and other ways of getting references to elements in javaScript
date: 2020-06-23 10:17:00
tags: [js]
layout: post
categories: js
id: 670
updated: 2020-07-02 10:29:03
version: 1.3
---

In late specs of client side javaScipt there is now the [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method as well as another method called [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) that can be used to get a collection of elements rather than just one. 

For the most part using this method is safe as of this writing, unless for some reason you want to have support for older browsers that are not used that often any more. There are other options that I find myself still using just for the hell of it, but the querySelector method works well at getting at an element that I want in an array of different ways other then that of just an id property value which is often what I do using the tire yet true [document.getElementById](/2018/12/27/js-document-getelementbyid/) method.

<!-- more -->

## 1 - Document.querySelector, and Document.querySelectorAll

If you are familiar with jQuery then you will like document querySelector as a way to gain references to an element. This allows for a wide range of possibilities for gaining accesses to dom elements, by Id, class, tag name, and more. In addition there is also the document querySelectorAll method that works more or less the same, but as you would expect returns a collection of elements rather that just a single element.

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

If you do nit care at all about backward compatibility with other browsers that do not support these methods that one can just go ahead and use these methods as a way to get references to elements. Still there are other options when it comes to getting references to elements. I do still find myself using document.getElementById, and not always just because it has better backward compatibility. When I do just want to get an element by way of an id attribute it still woks just fine, and it makes the code more clear.

## 2 - Conclusion

So the document query selector method is one way to go about getting a single element in an HTML document. In addition there is also the query selector all method that can be used to get a collection of elements. One down side is that these methods have not been around as long as other options that there are to work with in client side javaScript, but if your sides browser stats show that it is safe to just go ahead and use them, maybe code will not break for that many visitors.