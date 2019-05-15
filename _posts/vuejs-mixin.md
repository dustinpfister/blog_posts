---
title: vue mixin and creating gloabl and local custom Vue options
date: 2019-05-15 12:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 447
updated: 2019-05-15 13:25:38
version: 1.6
---

There sure is a lot to cover to get up and running with vuejs to get into a space where a developer can start making some interesting and useful projects. In this post I will be writing about what a [vue mixin](https://vuejs.org/v2/guide/mixins.html) is, which is one of many little things that one should have a solid grasp on before diving into making or using vuejs plug-ins and client systems with vuejs as the front end framework of choice.

<!-- more -->

## 1 - Vue mixin basics

So a vue mixin is a way to go about defining custom Vue constructor options like that of the vue data, and [vue el](/2019/05/06/vuejs-el/) options. It is possible to define one or more mixins for a single Vue constructor instance via the [mixins option](https://vuejs.org/v2/api/#mixins), and the same can be done globally as well via the [Vue mixin global method](https://vuejs.org/v2/api/#Vue-mixin) also.

## 1.1 - Vue mixin option for adding custom options just for a single Vue constructor instance

To add a mixin to a single vue constructor the vue mixin option should be used. When doing so the options that the mixin add will of course only work for that vue instance.

In this basic vue mixin example I just have two span elements in an html document that will both display a mess data object property when a vue instance is set up for it.

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

In the external basic_mixin_option.js file I have two Vue constructor instances. One has a mixin that allows for a startMess option to be defined for the instance, and the other does not event though they both have a startMess option.

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

In this example as expected the Vue instance that has the mixin that defines the logic for the startMess option works, and displays the startMess option value as the value of the mess data object property.

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