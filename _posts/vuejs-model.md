---
title: The vuejs model directive
date: 2020-07-28 20:49:00
tags: [vuejs]
layout: post
categories: vuejs
id: 688
updated: 2020-07-28 20:52:06
version: 1.1
---

This will be a quick post on the vuejs model directive that might need to be used now and then when doing something with input elements in a template.

<!-- more -->

## 1 - vue model basic example

```html
<html>
  <head>
    <title>vue model</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="app"></div>
  <script>
new Vue({
    el: '#app',
    template: '<div><input type="text" v-model="a"> + ' +
    '<input type="text" v-model="b" > = <span v-text="c" ></span></div>',
    data: {
        a: 1,
        b: 3,
        c: 0
    },
    mounted: function () {
        this.add();
    },
    updated: function () {
        this.add();
    },
    methods: {
        add: function () {
            this.c = parseInt(this.a) + parseInt(this.b);
        }
    }
});
  </script>
  </body>
</html>
```
