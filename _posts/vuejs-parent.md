---
title: vue parent option examples and alternatives
date: 2019-05-29 06:43:00
tags: [vuejs]
layout: post
categories: vuejs
id: 464
updated: 2019-05-29 06:50:50
version: 1.1
---

In vuejs there are times when I am going to need some kind of parent child relationship with two or more vue instances, one option for this is the [vue parent](https://vuejs.org/v2/api/#parent) option. This option will result in a reference to a parent vue instance within the child vue instance in which the vue parent option is used, and will also result in the child vue instnace being added to the children property of the parent vue instance.

<!-- more -->

## 1 - vue parent example

```js
// parent
var vm = new Vue({
        data: {
            str: 'foo'
        },
        methods: {
            baz: function () {
                // when the parent option is used
                // this vue instance will have a child
                var child = this.$children[0];
                console.log(this.$data.str); // 'foo'
                console.log(child.str); // 'bar'
                console.log(child.mess); // 'foobar'
            }
        }
    });
 
// child
new Vue({
    parent: vm, // using the parent option to set a parent
    el: '#demo-parent',
    template: '<p>{{ mess }}</p>',
    data: {
        str: 'bar',
        mess: 'nope'
    },
    mounted: function () {
        var mess = this.$parent.$data.str + this.$data.str;
        this.$data.mess = mess;
        this.$parent.baz();
    }
});
```