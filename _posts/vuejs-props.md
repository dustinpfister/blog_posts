---
title: vue props in vue components
date: 2019-05-19 06:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 453
updated: 2019-05-20 15:24:13
version: 1.1
---

When making a vue component there is sometimes a need to have properties for the custom element that is made when developing a component. This is where the vue props option comes into play.

<!-- more -->

## 1 - vue props basics

```html
<html>
  <head>
    <title>vue props example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-props"></div>
  <script src="./basic.js"></script>
  </body>
</html>
```

```js
Vue.component('custom', {
    props: ['foo'],
    template: '<div>{{ foo }}</div>'
});
 
new Vue({
    el: '#demo-props',
    template: '<div><custom foo="baz"></custom><custom></custom></div>'
});
```