---
title: vue destroy
date: 2019-06-01 11:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 469
updated: 2021-02-12 11:24:41
version: 1.5
---

The [vue destroy](https://vuejs.org/v2/api/#vm-destroy) instance method can be used to destroy a vue class instance in vuejs. This might not always work out as expected when you think of what might happen when calling a method called destroy, but it will to some extent do just that as the name would sugest.

I think that the vue destroy method should generaly not be used, unless I am in a situation in which it would seem that I have to use it which might come up now and then in future projects. I often like to create client systems with a fixed set of resources and then just result thouse resources over and over again. For example there is having an array and then pushing objects into that array, and purging them out as needed. However I prefer to have a set array of objects, and then have an active property for each object. With that said often I think that I should try using directives like v-if, and f-for before looking into using the vue destroy method.

This vue instance method will trigger the before destroy and destroyed lifecycle hooks when called bring about the end of a vue instance lifecycle.


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
