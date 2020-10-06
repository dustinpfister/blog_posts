---
title: vue compile render function from a template
date: 2020-10-06 14:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 717
updated: 2020-10-06 14:58:38
version: 1.0
---

In vuejs there is the [vue compile](https://vuejs.org/v2/api/#Vue-compile) global api method that can be used to complie a template string into a render function that can then be used in a Vuejs instance.

<!-- more -->

## 1 - Vue complie basic example

```html
<html>
  <head>
    <title>vue component example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo">
  </div>
  <script>
  var res = Vue.compile('<div><h1>{{title}}</h1></div>');
  new Vue({
    el:'#demo',
    data: {
      title: 'vue complie'
    },
    render : res.render
  });
  </script>
  </body>
</html>
```