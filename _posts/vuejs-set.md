---
title: vue set for setting reactive properties in vuejs
date: 2019-05-08 20:46:00
tags: [vuejs]
layout: post
categories: vuejs
id: 438
updated: 2019-05-09 14:52:57
version: 1.1
---

The [vue set](https://vuejs.org/v2/api/#Vue-set) global api method in vuejs can be used to set a property of a reactive object. In other words it is a way to add a property to an object in the data of a Vue constructor instance, and have the view update. The thing about this is that many frameworks have a method like this, because sometimes you can not just simply add a property to an object, sometimes some additional things need to happen on top of that.

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