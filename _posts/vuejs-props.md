---
title: vue props in vue components
date: 2019-05-19 06:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 453
updated: 2019-05-20 15:26:39
version: 1.2
---

When making a vue component there is sometimes a need to have properties for the custom element that is made when developing a component. This is where the vue props option comes into play, it can be used as a way to set some properties for a component just like attributes when it comes to actual html elements. There is a little bit to cover when it comes to vue props such as how to set default values for them an so fort so lets take a look at some examples.

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