---
title: vue before create lifecycle hook
date: 2019-05-26 12:26:00
tags: [vuejs]
layout: post
categories: vuejs
id: 460
updated: 2019-05-26 12:32:19
version: 1.2
---

The [vue before create](https://vuejs.org/v2/api/#beforeCreate) lifecycle hook is the first of many hooks that fire throughout the lifecycle of a vuejs instance. It is in this hook that I would go about doing anything that I might want to happen before the data object is created in the created hook, and it is also the very first hook that fires in the lifecycle process of a vuejs class instance.

<!-- more -->

## 1 - Vue before create basic example

```js
new Vue({
    el: '#demo-lifecycle-before-create',
    template: '<p>n: {{ n }}</p>',
    data: {
        n: 42
    },
    beforeCreate: function () {
        // the data object is not yet created
        console.log(this.$data); // undefined
    },
    created: function () {
        // the data object is not created
        console.log(this.$data.n); // 42
    }
});
```

```html
<html>
  <head>
    <title>vue before create lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-before-create"></div>
  <script src="basic.js"></script>
  </body>
</html>
```

## 2 - Hard coded object vue before create example

```js
new Vue({
    el: '#demo-lifecycle-before-create',
    template: '<div><span>n:{{ n }} </span><br><span> mess: {{ mess }}</span></div>',
    data: {
        n: null,
        mess: ''
    },
 
    // default create hook
    beforeCreate: function () {
        // define hard coded data object
        this.hardData = {
            n: 21,
            mess: 'hard coded data is used'
        };
    },
 
    // create hook
    created: function () {
        var self = this;
        // fetch data
        fetch('/data')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // if all goes well use that
            self.$data.n = data.n;
            self.$data.mess = 'Got data from back end';
        })
        .catch (function (e) {
            // else use hard data
            self.$data.n = self.hardData.n;
            self.$data.mess = self.hardData.mess + ' : ' + e.message;
        });
    }
});
```