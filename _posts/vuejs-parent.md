---
title: vue parent option examples and alternatives
date: 2019-05-29 06:43:00
tags: [vuejs]
layout: post
categories: vuejs
id: 464
updated: 2019-05-29 08:33:53
version: 1.3
---

In vuejs there are times when I am going to need some kind of parent child relationship with two or more vue instances, one option for this is the [vue parent](https://vuejs.org/v2/api/#parent) option. This option will result in a reference to a parent vue instance within the child vue instance in which the vue parent option is used, and will also result in the child vue instance being added to the children property of the parent vue instance.

<!-- more -->

## 1 - vue parent example

The vue parent option can be used by just making it a key of the object that is passed to the Vue class constructor, and giving the parent Vue class instance as the value for that key. That is just about all there is to it, once that is done the parent is accessible via the $parent property in the child, and the parent can access the child from the $children array.

To get a better sense of how this works check out the following vue parent example.

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

Although this kind of solution works okay the official vuejs documentation recommends that you should only use this as a last resort solution for establishing a parent child relationship between two or more Vue instances.