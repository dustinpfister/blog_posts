---
title: vue next tick global method and DOM updates
date: 2019-05-23 09:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 457
updated: 2019-05-23 09:20:56
version: 1.2
---

In vuejs there is the [vue next](https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/) global api method that can come into play now and then when something needs to be done after a view is updated because of a change to the model. Vue updates the DOM in a [very async kind of way](https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue), and there might come a time now and then that something might need to happen with the post updated DOM state of the view. For this there is the vue next tick global api method as well as the $nextTick instance methods. these methods can be used to set a callback that will fire when a view has finished updating.

<!-- more -->

## 1 - vue next basic example

```js
var vm = new Vue({
        el: '#demo-nexttick',
        template: '<p>{{ figX() }}</p>',
        data: {
            radian: Math.PI / 4,
            radius: 25,
            offX: 0
        },
        methods: {
            figX: function () {
                return Number(Math.cos(this.radian) * this.radius + this.offX).toFixed(2);
            }
        }
    });

vm.radian = 0;
console.log(vm.$el.textContent); // 17.68
 
Vue.nextTick(function () {
    console.log(vm.$el.textContent); // 25
});
```

```html
<html>
  <head>
    <title>vue next tick example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-nexttick"></div>
  <script src="basic.js"></script>
  </body>
</html>
```