---
title: vue method event handers
date: 2019-05-20 09:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 454
updated: 2019-05-20 12:31:55
version: 1.3
---

In vuejs there is the methods option of a vue class constructor that can be used to define event handers for a vuejs project. In native client side javaScript events can be attached to dome elements with addEventListener, or some similar method, as a way to define what needs to happen when a user clicks on something with a mouse, or preform one of many other such actions. In vuejs the methods option is one of many options that can be used to define what a Vue call instance of constructor is, keeping everything neat, tidy, and well structured. So in this post I will be going over some quick examples of using the vue methods option.

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

## 2 - vue method key mods

```js
new Vue({
    el: '#demo-methods',
    template: '<div>' +
    '<input v-on:keyup.13="submit" v-on:change="change" type="text" v-bind:value="name" >' +
    '<input type="button" v-on:click="submit" value="submit">' +
    '<ul><li> name: {{ name }}</li><li>mess: {{ mess}}</li></ul>' +
    '</div>',
    data: {
        name: 'Dustin',
        mess: ''
    },
    methods: {
        change: function (e) {
            this.$data.name = e.target.value;
        },
        submit: function (e) {
            this.$data.mess = 'Hello ' + this.$data.name;
        }
    }
});
```