---
title: vue mixin and creating gloabl and local custom Vue options
date: 2019-05-15 12:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 447
updated: 2021-02-03 16:28:08
version: 1.11
---

There sure is a lot to cover to get up and running with vuejs to get into a space where a developer can start making some interesting and useful projects. In this post I will be writing about what a [vue mixin](https://vuejs.org/v2/guide/mixins.html) is, which is one of many little things that one should have a solid grasp on before diving making a complex vuejs project.

A mixin is a way to create functionality that can be used accross two or more compoents. If you do not have at least some background on vuejs compoents it might be a good idea to read up more on them to while you are at it. Anyway a mixin object can be passed to a mixins options when createing a component, or it can also be made global for all compoents and vuejs instances in general by using the Vue.mixin static method.

<!-- more -->

## 1 - Vue mixin basics

So a vue mixin is a way to go about defining custom Vue constructor options that will be used for two or more vuejs instances or compoents. Say that you want to have a create method that will fire for all componets, or a set of methods that yuo want to have for a number of compoents, or even all of them, for these kinds of sitautions it would be a good idea to try making such things a mixin. It is possible to define one or more mixins for a single Vue constructor instance via the [mixins option](https://vuejs.org/v2/api/#mixins), and the same can be done globally as well via the [Vue mixin global method](https://vuejs.org/v2/api/#Vue-mixin) also. So in this section I will be going over a few quick examples of the two general ways to add mixins.

## 1.1 - Vue mixin option for adding custom options just for a single Vue constructor instance

To add a mixin to a single vue constructor the vue mixin option should be used. When doing so the options that the mixin add will of course only work for that vue instance. In this basic vue mixin example I just have two span elements in an html document that will both display a mess data object property when a vue instance is set up for it.

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
  <script>
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
  </script>
  </body>
</html>
```

In this example as expected the Vue instance that has the mixin that defines the logic for the startMess option works, and displays the startMess option value as the value of the mess data object property. However this might not be the best example of a mxin becuase I am just adding the mxin object to a single vuejs instance. What I could do is assign the object that contains the create method to a varaible, and then pass that variable to any mixin arrays that I want to add the create method to.

## 1.2 - Adding a global Vue mixin for all Vue constructor instances.

Here I have an example that does more or less the same thing as the first basic example that just defines a simple local mixin with the mixin option. However when using the Vue mixin global api method this results in the mixin being available in all additional Vue constructor instances from then on.

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
  <script>
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
  </script>
  </body>
</html>
```

## 2 - Conclusion

There are a few vuejs examples that I have made so far, and I do find myself using mixis once in a while. So far I find myself creating global mixins for certain methods that I want to be able to use accross all compoents that I am suing in a project. For example say I have this methods that will take a number as an argumnets and return a string that is formated in a way that is better for presenting the value in a view. Say that I want to use this methods in my templates, all of them not just the main vue instance. One way to go about having a global format money method would be to create global mixin with such a method in the vue methods object.

