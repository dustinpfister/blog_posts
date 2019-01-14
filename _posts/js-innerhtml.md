---
title: innerhtml and alternatives for creating and appending html with javaScript
date: 2019-01-13 17:27:00
tags: [js]
layout: post
categories: js
id: 359
updated: 2019-01-14 17:55:09
version: 1.6
---

With client side javaScript projects the [innerHtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property of an element can be used as a way to create and append html. The nice thing about innerHtml is that it is very easy to use, but there are some security concerns with the use of innerHTML so in this post I will also be coverning some alternative ways of injecting html into a page with javaScript. 

<!-- more -->

## 1 - innerHTML example for beginners

The innerHTML property of an element is one way to go abount changing the content of an element. There are other ways that are considered more profesional by many devlopers becuase of some security conserns, but the nice thing about innerHTML is that it is fairly easy to use. The use of just involves creating a string repersentation of the html that you want, and set that string to the value of innerHTML.

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="out"></div>
        <script src="main.js"></script>
    </body>
</html>
```

```js
var el = document.getElementById('out'),
arr = [1,2,3,4];
html = '<ul>';
 
arr.forEach(function(n){
 
html += '<li>'+n+'</li>'
 
});
 
el.innerHTML = html += '<\/ul>';
```

In this example I am just createing an unordered list from elements in an array.

## 2 - Security concerns with innerHTML

The isshue of security concerns with innerHTML often comes up in. The thing about innerHTML is that when script tags are used in the html string, the code in the string will run. As such this can potentaly result in code injecttion attacks compared to the use of an alternative like createTextNode, or innerText.

```js
var el = document.getElementById('out');
 
el.innerHTML = "<input type=\"button\" value=\"click it\" onclick='alert(\"bad times\")'>";
```