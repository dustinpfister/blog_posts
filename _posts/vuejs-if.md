---
title: vue if conditional directive
date: 2019-05-22 06:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 456
updated: 2019-05-23 19:24:01
version: 1.3
---

The [vue if](https://vuejs.org/v2/guide/conditional.html) directive in vuejs can be used when making templates to create an element or not based on a condition.It can come in handy when working out a template, but there are other options as well when it comes to using render methods for example an actual javaScript if statement can be used.

<!-- more -->

## 1 - Vue if basic example


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