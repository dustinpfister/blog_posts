---
title: innerhtml and alternatives for creating and appending html with javaScript
date: 2019-01-13 17:27:00
tags: [js]
layout: post
categories: js
id: 359
updated: 2019-02-26 10:48:37
version: 1.10
---

With client side javaScript projects the [innerHtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property of an element can be used as a way to create and append html. The nice thing about innerHtml is that it is very easy to use, but there are some security concerns with the use of innerHTML as well that are not a big deal when it comes to simple examples, but might present problems when working on a more complex project. That being said using innerHTML is not the only option when it comes to creating and adding elements in javaScript, so I have another post in which I get into [this subject in general](/2019/02/26/js-add-element/) if interested.

<!-- more -->

## 1 - innerHTML example for beginners

The innerHTML property of an element is one way to go about changing the content of an element. There are other ways that are considered more professional by many developers because of some security concerns, but the nice thing about innerHTML is that it is fairly easy to use. The use of just involves creating a string representation of the html that you want, and set that string to the value of innerHTML.

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

In this example I am just creating an unordered list from elements in an array.

## 2 - Security concerns with innerHTML

The issue of security concerns with innerHTML often comes up in. The thing about innerHTML is that when script tags are used in the html string, the code in the string will run. As such this can potentially result in code injection attacks compared to the use of an alternative like createTextNode, or innerText.

```js
var el = document.getElementById('out');
 
el.innerHTML = "<input type=\"button\" value=\"click it\" onclick='alert(\"bad times\")'>";
```

## 3 - innerHTML alternatives

In this section I will be covering alternatives to innerHTML. This includes the use of many methods that are used together, and simple alternatives that work in a similar way as is the case with innerText.

### 3.1 - document.createElement, document.createTextNode, and el.appendChild

If you are not familiar with document.createElement, then you should play around with that one a little at some point. The createElement method as the name suggests is what can be used in client side javaScript to create an element with javaScript. The method can be used with additional methods like document.createTextNode, and el.appendChild to do the same thing as innerHTML.

```js
var el = document.getElementById('out');

var p = document.createElement('p');
p.appendChild(document.createTextNode('foo'));
el.appendChild(p);
```