---
title: vue mounted lifecycle hook
date: 2019-05-25 20:38:00
tags: [vuejs]
layout: post
categories: vuejs
id: 459
updated: 2019-05-26 20:35:48
version: 1.5
---

The vue mounted lifecycle hook is a way to define some logic that will run when a vue instance is mounted to a mount point in html with the vue el option or the $mount method. The vue mounted hook is one of several such hooks when working with vue class instances.

<!-- more -->

## 1 - Vue Mounted hook basic example

Here I have a basic example of the vue mounted lifecycle hook in vuejs. This hook is fired after the before create, and created hooks when the vue instance is mounted to the htl document. The Vue instance can be mounted to the html with the $mount instance method, or via the vue el option such as in this example.

here is the javaScript

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

and here is the html

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

## 2 - Firing the Vue mounted hook with $mount

One way to mount a vue instance to html is with the vue el option, but another option is to use the $mount instance method. If the vue el option is not used then the whole lifecycle process will no progress beyond the created hook until the $mount method is used. So then the $mount method can be used as a way to mount the vue instance to html when you want to after some kind of condition is satisfied.