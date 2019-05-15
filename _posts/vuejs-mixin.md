---
title: vue mixin and creating gloabl and local custom Vue options
date: 2019-05-15 12:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 447
updated: 2019-05-15 13:08:59
version: 1.3
---

There sure is a lot to cover to get up and running with vuejs to get into a space where a developer can start making some interesting and useful projects. In this post I will be writing about what a vue mixin is, one of many little things that one should have a solid grasp on before diving into making or using vuejs plug-ins and client systems with vuejs as the front end framework of choice.

<!-- more -->

## 1 - Vue mixin basics

So a vue mixin is a way to go about defining custom Vue constructor options like that of the vue data, and vue el options. It is possible to define one or more mixins for a single Vue constructor instance via the mixins option, and the same can be done globally as well via the Vue mixin global method also.

## 1.1 - Vue mixin option for adding custom options just for a single Vue constructor instance

```html
<html>
  <head>
    <title>vue mixin example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div>
    <span id="one">{{ mess }}</span><br>
    <span id="two">{{ mess }}</span><br>
  </div>
  <script src="./basic_mixin_option.js"></script>
  </body>
</html>
```

```js
// Vue Instance with a Mixin that
// gives vue an custom option
new Vue({
    el: '#one',
    mixins: [
        // a mixin for just this view
        {
            created: function () {
                var startMess = this.$options.startMess;
                console.log(this.$data.mess);
                if (startMess) {
                    this.$data.mess = startMess;
                } else {
                    this.$data.mess = 'no start mess option given.';
                }
            }
        }
    ],
    data: {
        mess: '' // 'hello'
    },
    startMess: 'hello'
});
 
// Another Vue instance that does not have the mixin, so the
// option does not do anything.
new Vue({
    el: '#two',
    data: {
        mess: 'foo' // 'foo'
    },
    startMess: 'nope this no work, not a global mixin'
});
```

## 1.2 - Adding a global Vue mixin for all Vue constructor instances.

```html
<html>
  <head>
    <title>vue mixin example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div>
    <span id="one">{{ mess }}</span><br>
    <span id="two">{{ mess }}</span><br>
  </div>
  <script src="./basic_global.js"></script>
  </body>
</html>
```

```js
Vue.mixin({
    created: function () {
        var startMess = this.$options.startMess;
        console.log(this.$data.mess);
        if (startMess) {
            //console.log(startState);
            this.$data.mess = startMess;
        } else {
            this.$data.mess = 'no start mess option given.';
        }
    }
});
 
new Vue({
    el: '#one',
    data: {
        mess: '' // 'hello'
    },
    startMess : 'hello'
});
 
new Vue({
    el: '#two',
    data: {
        mess: '' // 'no start mess option given'
    }
});
```