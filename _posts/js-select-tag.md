---
title: javaScript and select tags
date: 2019-09-04 15:10:00
tags: [js]
layout: post
categories: js
id: 530
updated: 2019-09-04 15:28:32
version: 1.2
---

When working out some kind of interface for a client side javaScript project [select tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) are often used to give the user a range of options to choose from. In this post I will be writing about a few quick examples of select input tags and javaScript.

<!-- more -->

## 1 - Select tag basic example

```html
<html>
    <head>
        <title>javaScript create element</title>
    </head>
    <body>
        <select id="selections">
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
        <script>
var select = document.getElementById('selections');
select.addEventListener('change', function (e) {
  var sel = e.target;
  console.log(sel.value);
});
        </script>
    </body>
</html>
```