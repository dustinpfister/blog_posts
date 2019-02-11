---
title: Javascript svg graphics the basics and more
date: 2019-02-11 10:03:00
tags: [js]
layout: post
categories: js
id: 376
updated: 2019-02-11 16:35:42
version: 1.3
---

<!-- more -->

When it comes to making graphics with javaScript there are a number of options these days, such as the 2d canvas drawing api. However in this post I will be writing about a vector rather than raster base alternative called [Scalable Vector Graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) or just svg for short.

## 1 - javaScript svg graphics basics

In this section I will be just starting out with the basics of svg graphics. There is creating svg graphics inline in html itself, and then there is having an external svg file that can then be loaded into the html via and object tag.

### 1.1 - inline svg graphics

### 1.2 - external svg graphics

It may be preferable to have svg graphics as an external file that can then be loaded into an html file, and accessed with javaScript. Here I have an example of going just that, with the html there needs to be an object element that is used to load the external svg data. To load the svg I only need a data attribute that points to the url of the external svg file.

```html
<html>
    <head>
        <title>javascript svg external</title>
    </head>
    <body>
        <object id="svg-external" data="external.svg" type="image/svg+xml"></object>
        <script src="external.js"></script>
    </body>
</html>
```

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" width="320" height="240" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect x="5" y="5" width="200" height="200" fill="green" stroke-width="4" stroke="black" />
  <line x1="5" y1="5" x2="205" y2="205" stroke="black" stroke-width="2" />
  <circle id="cir" cx="50" cy="50" r="25" fill="red" />
  <polyline points="50,50,50,175,125,175,125,125,175,125" stroke="blue" stroke-width="4" fill="none" />
  <use xlink:href="external.svg#the_svg"/>
</svg>
```

```js
var obj = document.getElementById('svg-external');
obj.addEventListener('load', function () {
    var svg = obj.contentDocument;
    var cir = svg.getElementById('cir');
    cir.setAttributeNS(null, 'r', 75);
});

```