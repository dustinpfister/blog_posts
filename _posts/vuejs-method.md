---
title: vue method event handers
date: 2019-05-20 09:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 454
updated: 2019-05-20 11:06:55
version: 1.1
---

In vuejs there is the methods option of a vue class constructor that can be used to define event handers for a vuejs project.

<!-- more -->

## 1 - vue method basic example

```html
<html>
  <head>
    <title>vue methods example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-methods"></div>
  <script src="./basic.js"></script>
  </body>
</html>
```

```js
new Vue({
    el: '#demo-methods',
    template: '<input v-on:click="clicker" type="button" v-bind:value="\'click count: \'+i" >',
    data: {
        i: 0
    },
    methods: {
        clicker: function () {
            this.i += 1;
        }
    }
});

```