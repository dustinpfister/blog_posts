---
title: vue components
date: 2019-05-16 19:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 450
updated: 2019-05-16 19:42:54
version: 1.3
---

A [vue component](https://vuejs.org/v2/guide/components.html) is a way to create reusable Vue constructor instances. A component has a name assigned to it, and can be used as a way to make custom elements that can be used in templates.

<!-- more -->

## 1 - vue component basic example

Here is a simple counter example of a vue component, it makes use of template, data, and method options. Many of the options that are used when making a plain old Vue instance can also be used with components as well, with some exceptions such as vue el.

In the html here I have some custom step elements the actual html and functionality will be defined in the step component that is defined in the basic.js file that I am also linking to.

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

Here in the basic.js file I call the vue component method, followed by the name I want to set for the component, then an object. In this object I can used most of the options that I would also use for a regular plain old Vue Instance including templates, render methods, data and more.

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