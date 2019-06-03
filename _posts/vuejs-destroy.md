---
title: vue destroy
date: 2019-06-01 11:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 469
updated: 2019-06-03 15:45:22
version: 1.1
---

The vue destroy instance method can be used to completely destroy a vue class instance in vuejs.

<!-- more -->

## 1 - vue destroy method basic example

```js
var vm = new Vue({
        el: '#demo-destroy',
        template: '<div>' +
        '<input type="button" v-on:click="step" value="step">' +
        '<p>i:{{i}}</p>' +
        '</div>',
        data: {
            i: 0
        },
        methods: {
            step: function () {
                this.$data.i += 1;
            }
        }
    });
 
setTimeout(function () {
    vm.$destroy();
}, 5000);
```
