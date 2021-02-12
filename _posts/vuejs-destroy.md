---
title: vue destroy
date: 2019-06-01 11:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 469
updated: 2021-02-12 10:43:34
version: 1.4
---

The [vue destroy](https://vuejs.org/v2/api/#vm-destroy) instance method can be used to destroy a vue class instance in vuejs. This might not always work out as expected when you think of what might happen when calling a method called destroy, but it will to some extent do just that as the name would sugest.

<!-- more -->

## 1 - vue destroy method basic example

Here I have a basic example of the vue destroy method in action. When this example is up and running a step button can be clicked until the callback delayed by setTimeout files and calls the vue destroy method. Once this happens as expected the click method will no longer work. However the button itself as well as the current count before it is destroyed will remain.

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

## 2 - Conclusion

So far I can not say that I use the destroy method in projects as I often just reuse the same stack of resources over and over again rather than creating and destroying as needed.
