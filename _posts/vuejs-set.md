---
title: vue set for setting reactive properties in vuejs
date: 2019-05-08 20:46:00
tags: [vuejs]
layout: post
categories: vuejs
id: 438
updated: 2019-05-08 20:47:47
version: 1.0
---

<!-- more -->

## 1 - vue set example

```html
<html>
  <head>
    <title>vue set example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  
  <p id="foo">{{ u.mess ? u.mess : 'no mess' }}</p>

  <script>
  var vm = new Vue({
    el:'#foo',
    data: {
    u:{}
    }
  });
  
  // set mess property and trigger update of the view
  Vue.set(vm.u,'mess', 'bar')
  
  </script>
  </body>
</html>
```