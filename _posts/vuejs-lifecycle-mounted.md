---
title: vue mounted lifecycle hook
date: 2019-05-25 20:38:00
tags: [vuejs]
layout: post
categories: vuejs
id: 459
updated: 2019-05-26 15:01:33
version: 1.2
---

The vue mounted lifecycle hook is a way to define some logic that will run when a vue instance is mounted to a mount point in html with the vue el option or the $mount method. The vue mounted hook is one of several such hooks when working with vue class instances.

<!-- more -->

## 1 - Vue Mounted hook basic example

Here I have a basic example of the vue mounted lifecycle hook in vuejs. This hook is fired after the before create hook.

```js
new Vue({
    el: '#demo-lifecycle-mounted',
    template: '<p>n: {{ n }}</p>',
    data: {
        n: 4
    },
    // mounted lifecycle hook
    mounted: function () {
        console.log(this.$el.textContent); // n: 4
    }
});
```

```html
<html>
  <head>
    <title>vue mounted lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-mounted"></div>
  <script src="basic.js"></script>
  </body>
</html>
```