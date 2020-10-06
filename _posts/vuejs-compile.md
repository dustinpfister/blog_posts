---
title: vue compile render function from a template
date: 2020-10-06 14:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 717
updated: 2020-10-06 16:36:12
version: 1.1
---

In vuejs there is the [vue compile](https://vuejs.org/v2/api/#Vue-compile) global api method that can be used to compile a template string into an object that will contain a render function of that template. 

If you are not familiar with [render functions](/2019/05/12/vuejs-render/) just yet it might be a good idea to read up on them, same goes for [vue templates](/2019/05/07/vuejs-template/) also.

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