---
title: Get parent elements with javaScript
date: 2019-02-21 18:37:00
tags: [js]
layout: post
categories: js
id: 388
updated: 2019-02-21 18:50:39
version: 1.1
---

So this will be a quick post on getting parent elements for today. There are two properties of concern with this when it come to an element in javaScript which are parentElement and parentNode. The two of these more or less do the same thing but with just one little subtle difference.

<!-- more -->

## 1 - Get parent element

Once a reference to an element is gained by use of a method like getElementById or querySelector, there is the parentElement property of the elements parentElement if it has one.

```js
<html>
    <head>
        <title>parent element example</title>
    </head>
    <body>
        <div class="wrap">
            <div id="gamearea"></div>
        </div>
        <script>
var ga = document.querySelector('#gamearea'),
container = ga.parentElement;
console.log(container.className); // wrap
        </script>
    </body>
</html>
```

In the event that the element does not have a parent element, or the parent element is not a DOM element the property will have a value of null.