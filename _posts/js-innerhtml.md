---
title: innerhtml and alternatives for creating and appending html with javaScript
date: 2019-01-13 17:27:00
tags: [js]
layout: post
categories: js
id: 359
updated: 2019-01-14 14:52:07
version: 1.1
---

With javaScript projects innerHtml can be used as a way to create and append html. The nice thing about innerHtml is that it is very easy to use, but there are some security concerns with the use of innerHTML so in this post I will also be coverning some alternative ways of injecting html into a page with javaScript. 

<!-- more -->

## 1 - 

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