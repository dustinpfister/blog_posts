---
title: vue destroyed lifecycle hook
date: 2020-08-03 13:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 691
updated: 2020-08-03 14:08:31
version: 1.2
---

I have been neglecting my content on vuejs, so to help get me in gear for changing that I thought I would write a quick post on the [vue destroyed](https://vuejs.org/v2/api/#destroyed) life cycle hook as a way to continue expanding on vuejs. There are several other life cycle hooks that are worth mentioning also such as the create, mounted, and updated hooks, so it makes sense that I should write one where I am focusing on the destroyed hook.

<!-- more -->

## 1 - Basic Vue destroyed hook example

So the basic idea of the destroyed hook is that it is the last hook of interest the the full range of lice cycle hooks there are to work with in a vuejs instance. When this hook is called that is it for the vuejs instance, so it makes sense to preform any file work that should be done before all is lost and the vm is completely destroyed.

The destroy instance method can be used as a way to trigger the begging of the end for a vuejs instance. Once the destroy method is called the before destroy hook will be called followed by the destroyed hook. So say I have a simple vuejs instance that just displays a simple interface that can be used to step a count property value in the data object. Once I am done just stepping this data object I can then call a purge method that wil destroy the vm. This will then fire the destroy hook where I set the inner html of the container element to the last value of the count property in the data object.

```html
<html>
  <head>
    <title>vue destroyed lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
new Vue({
    el: '#demo',
    template: '<div>' +
    '<p>count: {{c}}</p>' +
    '<input type=\"button\" value=\"step\" v-on:click=\"step\">' +
    '<input type=\"button\" value=\"purge\" v-on:click=\"done\"></div>',
    destroyed: function () {
        // make the innerhtml of DEMO div just the count value
        this.$el.innerHTML = this.$data.c;
    },
    data: {
        c: 0
    },
    methods: {
        step: function () {
            this.c += 1;
        },
        done: function () {
            // start destroy
            this.$destroy();
        }
    }
});
  </script>
  </body>
</html>
```