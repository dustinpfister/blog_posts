---
title: document location object in client side javaScript
date: 2019-01-26 12:34:00
tags: [js]
layout: post
categories: js
id: 365
updated: 2019-02-08 19:30:19
version: 1.3
---

The [document location](https://developer.mozilla.org/en-US/docs/Web/API/Document/location) object in client side javaScript is a read only object that contains the url of the current page. It can be used as a way to know the current url, as well as preform a redirect to a new location. That is because although the object itself is read only a new url can be set to the property that will cause the browser to load that url. So in this post I will be outlining some basic use case examples of the document.location property.

<!-- more -->

## 1 - document location basic example

For a basic example of document location here I have a basic html structurer and a single script tag. Inside the script tag I am using the document location href property to display the current htef of the document.

```html
<html>
    <head>
        <title>document location</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
let el = document.getElementById('out')
el.innerText = document.location.href;
        </script>
    </body>
</html>
```
