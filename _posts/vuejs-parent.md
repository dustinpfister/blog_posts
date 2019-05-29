---
title: vue parent option example
date: 2019-05-29 06:43:00
tags: [vuejs]
layout: post
categories: vuejs
id: 464
updated: 2019-05-29 09:17:48
version: 1.5
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

## 2 - vue parent example using vue extend

Now here is an example I worked out that involves using a constructor that is created with vue extend, that I can then used in another vue class that will be the parent by using the vue parent option when Calling that custom constructor made with vue extend.

```js
// using extend
var Foo = Vue.extend({
        data: function () {
            console.log(this.$parent);
            var data = {
                mess: 'foo-' + this.$parent.id
            };
            this.$parent.id += 1;
            return data;
        }
    });
 
// parent of Foos
new Vue({
    el: '#demo-parent',
    template: '<div><p v-for=\"child in $children\">{{ child.$data.mess }}</p></div>',
    data: {
        mess: 'nope',
        id: 0
    },
    created: function () {
        var i = 3;
        while (i--) {
            new Foo({
                parent: this
            });
        }
    }
});
```

So Something like this can be used as a way to make a whole bunch of children for something if needed. It would be nice to work out some kind of practical example for this if I can get the time to do so but you get the basic idea.