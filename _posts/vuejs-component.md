---
title: vue components
date: 2019-05-16 19:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 450
updated: 2019-05-16 19:12:51
version: 1.0
---

A [vue component](https://vuejs.org/v2/guide/components.html) is a way to create reusable Vue constructor instances. A componenet has aname assigned to it, and can be used as a way to make custom elements that can be used in templates.

<!-- more -->

## 1 - vue component basic example

```html
<html>
  <head>
    <title>vue component example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="step-demo">
    <step></step>
    <step></step>
  </div>
  <script src="./basic.js"></script>
  </body>
</html>
```

```js
// A Basic step Component
Vue.component('step', {
    template: '<div><button v-on:click="step">step</button> i: {{ i }} </div>',
    data: function () {
        return {
            i: 0
        }
    },
    methods: {
        step: function (e) {
            this.$data.i += 1;
        }
    }
});

new Vue({
    el: '#step-demo'
})

```