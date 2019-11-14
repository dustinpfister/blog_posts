---
title: Vue on directive
date: 2019-11-14 16:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 563
updated: 2019-11-14 17:50:15
version: 1.3
---

The [vue on](https://vuejs.org/v2/api/#v-on) directive is what can be used in vue templates to preform [event attachment](https://vuejs.org/v2/guide/events.html). In line JavaScript can be given, however the typical use of the vue on directive is to call a method in the methods object. There are a number of event and key modifiers that can be used to help make it so the methods that I write are more about the actual logic of what the method does rather than having additional code that helps with DOM element related quirks. So lets take a look at a few quick examples of the vue on directive in action.

<!-- more -->

## 1 - vue on basic on click example

So then I have an example of the vue on directive here where I am just using the vue el option to mount to a single div element in the hard coded html. I then worked out a simple template with just a single input element that I made as a button type. This button element then uses the vue on directive to make it so that when the button is clicked a step method is called that steps a variable in the vue data object.

```html
<html>
  <head>
    <title>vue on example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
    <script>
new Vue({
    el:'#demo',
    template: '<div><input type="button" v-on:click="step" v-bind:value="mess" ></div>',
    data: {
        n : 0,
        mess: 'step (0)'
    },
    methods: {
        step: function(){
            var data = this.$data;
            data.n += 1;
            data.mess = 'step (' + data.n + ')';
        }
    }
});
  
    </script>
  </body>
</html>
```