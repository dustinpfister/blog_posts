---
title: The vuejs model directive
date: 2020-07-28 20:49:00
tags: [vuejs]
layout: post
categories: vuejs
id: 688
updated: 2020-07-28 21:03:29
version: 1.3
---

This will be a quick post on the [vuejs model](https://vuejs.org/v2/api/#v-model) directive that might need to be used now and then when doing something with input elements in a template. The model directive may not need to always be used when working out an interface in a template but I have found that I need to use it with input, select, and textarea tags. The vue model directive will make it so that you have [two way bindings](https://vuejs.org/v2/guide/forms.html) between input tags, and a value in the data object of a vue instance. So that when something changes in the data object, that change will effect the value of an input tag, and that if the user changes the value in the input tag that will change the value in the data object.

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
