---
title: vue mixin and creating gloabl and local custom Vue options
date: 2019-05-15 12:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 447
updated: 2021-02-03 16:58:15
version: 1.13
---

There sure is a lot to cover to get up and running with vuejs to get into a space where a developer can start making some interesting and useful projects. In this post I will be writing about what a [vue mixin](https://vuejs.org/v2/guide/mixins.html) is, which is one of many little things that one should have a solid grasp on before diving making a complex vuejs project.

A mixin is a way to create functionality that can be used accross two or more compoents. If you do not have at least some background on vuejs compoents it might be a good idea to read up more on them to while you are at it. Anyway a mixin object can be passed to a mixins options when createing a component, or it can also be made global for all compoents and vuejs instances in general by using the Vue.mixin static method.

<!-- more -->

## 1 - Vue mixin basics

So a vue mixin is a way to go about defining custom Vue constructor options that will be used for two or more vuejs instances or compoents. Say that you want to have a create method that will fire for all componets, or a set of methods that yuo want to have for a number of compoents, or even all of them, for these kinds of sitautions it would be a good idea to try making such things a mixin. It is possible to define one or more mixins for a single Vue constructor instance via the [mixins option](https://vuejs.org/v2/api/#mixins), and the same can be done globally as well via the [Vue mixin global method](https://vuejs.org/v2/api/#Vue-mixin) also. So in this section I will be going over a few quick examples of the two general ways to add mixins.

## 1.1 - Vue mixin option for adding custom options just for a single Vue constructor instance

To add a mixin to a single vue constructor the vue mixin option should be used. When doing so the options that the mixin add will of course only work for that vue instance to which it is given. Say I have a object with a create hook method that will set the value for a mess property of a data object, and that is it. So yes just an object, with a single create hook method. Then say I have a number of vuejs instances, I can then pass this object with the create hook to two, but not all, or the vue insatnces. When doing so the create hook will fire for the vue instances that have the mixin object with the create hook, but it will not fire for the ones that I do not give it to.

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
    <span id="three">{{ mess }}</span><br>
  </div>
  <script>
var myMix ={
    created: function () {
       this.$data.mess = 'this has a mixin';
    },
    template: '<div style="background:green;padding:10px;">{{ mess }}</div>'
};
 
// useing myMix
new Vue({
    el: '#one',
    mixins: [myMix],
    data: {
        mess: ''
    }
});
 
// not using a mixin
new Vue({
    el: '#two',
    data: {
        mess: 'foo'
    }
});
 
// another using myMix
new Vue({
    el: '#three',
    mixins: [myMix],
    data: {
        mess: ''
    }
});
  </script>
  </body>
</html>
```

So then the vue instnaces to which I give the mixin object to will have the message set to what I have set in the create hook of the mixin. They will also use the template that I put in the hook also to style the message a little different. The vue instance that does not get this hook will just work with what is going on in the vue instance only.

This might just be a simple sillu little example, but the basic idea is there. I can have some vue options in an object, and then I can pass the object to one or more vuejs insatnces, or compoents, and then what I define in the object will be used for all the vue insatnces that I give it to. However if I want to define some options for everything that I will want to make use of the global Mixin method.

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

## 2 - Format money mixin example

One thing that I find myself doing so far with mixins is creating a set of methods that I am going to want to use in templates. I can make such methods part of the methods object of a vue instance, bit as a project grows I end up with a lot of componets, so I do not want to copy and past the same code over and over again for each component. I could refernce a main methods object for each insatnce that I make global, but the best way i think is to use a mixin, that is after all what it is there for.

```html
<html>
  <head>
    <title>vue mixin example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div>
    <span id="one"></span><br>
    <span id="two"></span><br>
  </div>
  <script>
Vue.mixin({
    methods: {
        format_money: function(money, curr){
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: curr || 'USD',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2
            });
            return formatter.format(money);
        }
    },
    template: '<div>{{ format_money(money, currency) }}</div>'
});
 
new Vue({
    el: '#one',
    data: {
        money: 100,
        currency: 'EUR'
    }
});
 
new Vue({
    el: '#two',
    data: {
        money: 3.50,
        currency: 'USD'
    }
});
 
  </script>
  </body>
</html>
```

## 3 - Conclusion

There are a few vuejs examples that I have made so far, and I do find myself using mixis once in a while. So far I find myself creating global mixins for certain methods that I want to be able to use accross all compoents that I am suing in a project. For example say I have this methods that will take a number as an argumnets and return a string that is formated in a way that is better for presenting the value in a view. Say that I want to use this methods in my templates, all of them not just the main vue instance. One way to go about having a global format money method would be to create global mixin with such a method in the vue methods object.

