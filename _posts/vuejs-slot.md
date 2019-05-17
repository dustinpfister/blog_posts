---
title: vue slots
date: 2019-05-17 12:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 451
updated: 2019-05-17 16:55:57
version: 1.2
---

When making vue components there might be a time now and then to use a [vue slot](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) when working out a template, or render method for a component. A vue slot is what can be used to define in the template where anything that is passed inside the custom element of the component should go. If you still are a little confused, maybe it would be a good idea to look at a few simple code examples. So lets take a look at one or two then.

<!-- more -->

## 1 - vue slot basic example

```html
<html>
  <head>
    <title>vue data example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-data"></div>
  <script src="./basic.js"></script>
  </body>
</html>
```

```js
// very simple component with a slot
Vue.component('foo', {
    template: '<div><slot></slot></div>'
})
 
// a Vue instance using the component element
// that has some inner content in the form of a
// simple text node
new Vue({
    el: '#demo-data',
    template: '<foo>hello</foo>',
    data: {
        foo: 'bar'
    }
});
```