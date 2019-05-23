---
title: vue if conditional directive and other options
date: 2019-05-22 06:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 456
updated: 2019-05-23 19:29:54
version: 1.5
---

The [vue if](https://vuejs.org/v2/guide/conditional.html) directive in vuejs can be used when making templates to create an element or not based on a condition.It can come in handy when working out a template, but there are other options as well when it comes to using render methods for example an actual javaScript if statement can be used. Never the less this will be q quick post on the vue if directive, and some alternative options as well in vuejs.

<!-- more -->

## 1 - Vue if basic example

So when working out a template the vue if directive can be used to define a condition that if true will result in the rendering of the element that it is used with, otherwise of false it will not render. the value that is used with the directive can be an expression or a data object property.

In this quick example if the type of a data object property is a number it will be fixed to two decimal points, else if it is a string then the full value of the number will be displayed. One element or another will be rendered, but not both depending on the type of the property.

```js
new Vue({
    el: '#demo-if',
    template: '<div>' +
    '<p v-if=" typeof n === \'number\'" >{{ n.toFixed(2) }}</p>' +
    '<p v-if=" typeof n === \'string\'" >{{ n }}</p>' +
    '</div>',
    data: {
        n: Math.PI
    }
});
```

```html
<html>
  <head>
    <title>vue if example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-if"></div>
  <script src="basic.js"></script>
  </body>
</html>
```