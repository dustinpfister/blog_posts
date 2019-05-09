---
title: vue set for setting reactive properties in vuejs
date: 2019-05-08 20:46:00
tags: [vuejs]
layout: post
categories: vuejs
id: 438
updated: 2019-05-09 14:57:01
version: 1.2
---

The [vue set](https://vuejs.org/v2/api/#Vue-set) global api method in vuejs can be used to set a property of a reactive object. In other words it is a way to add a property to an object in the data of a Vue constructor instance, and have the view update. The thing about this is that many frameworks have a method like this, because sometimes you can not just simply add a property to an object, sometimes some additional things need to happen on top of that.

<!-- more -->

## 1 - vue set example

For a quick example of vue set, I put something together that makes use of a property in the data object but only if it is there. So in the example there is a root property in the data option object that is also an object, this is impotent because there is no way to add root properties to the data object with vue set. However vue set can be used to add properties to an object that is nested in the data object.

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