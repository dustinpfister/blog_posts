---
title: vue filter global level and asset options
date: 2019-05-10 09:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 440
updated: 2021-02-23 04:56:20
version: 1.17
---

In [Vuejs](/2021/02/05/vuejs/) a [Filter](https://vuejs.org/v2/guide/filters.html) can be used to help with formating tasks, and can be used when working out a template. Filters differ from methods in that they can only be used in  mustache interpolations and when using the v-bind directive. 

A [vue filter](https://vuejs.org/v2/api/#Vue-filter) can be registered at the global level, or it can be an [asset of a single Vue constructor](https://vuejs.org/v2/api/#filters) instance. So in other words like many other features in vuejs like methods, and components there can be both global and local sets of these filters. 

In this post I will be going over some use case examples of filters in vuejs, and also about filtering in general in javaScript. 

<!-- more -->

## 1 - Vue filter basics

This is a post on filters in vuejs, the popular front end javaScript framework. In vuejs filters are methods that are often used for text formating. So they are like methods, but they are not as flexabule as they can only be used for formatting with a few features when working out a sttaic template. 

Filters in vuejs might differ slightly from what you might be familial with when it comes to methods like the [lodash \_.filter collection method](/2018/05/18/lodash_filter/) or the [filter array prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) in native javaScript. When it comes to vuejs a filter has to do more with filtering some text into a method that will do something to that text such as making all the letters uppercase.

## 2 - Vue filter as an Vue Constructor Option

When making a new instance of the Vue Constructor, one of the options that can be passed via the object that is passed as the first argument to the constructor is the filters option. The value for this filters option can be an object with one or more additional properties that each contain a method that can then be used in templates to apply filters to values. 

So when using vuejs by calling the main constructor that is of course one way to define some filters that apply just to the single instance of the Vue Constructor, rather than a filter that might be registered globally. This is what I will be starring out with in this section.

### 2.1 - vue filter option basic example

For a basic example of a vue filter option here I have just a filter that appends the string 'foo' to the beginning of anything that it is used with via the pipe symbol when using the mustache interpolation syntax. 

```js
<html>
  <head>
    <title>vue filter example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <p id="bar">{{ mess | fooanate }}</p>
  <script>
  
  new Vue({
    el:'#bar',
    data: {
      mess: 'bar'
    },
    filters: {
      fooanate : function(val){
        return 'foo' + val;
      }
    }
  });
  
  </script>
  </body>
</html>
```

### 2.2 - vue filter option to text example

For a more advanced example of a vue filter that is used via the filters Vue constructor option, here is an example that creates a plain text presentation of data from an array of objects.

```html
<html>
  <head>
    <title>vue filter example list</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <pre id="list">{{ items | toText }}</pre>
    <script src="./totext.js"></script>
  </body>
</html>
```

```js
new Vue({
    el: '#list',
    data: {
        items: [{
                name: 'fooBox',
                cost: '$20'
            }, {
                name: 'bazAnaTer',
                cost: '$35'
            }
        ]
    },
    filters: {
        toText: function (items) {
            return items.map(function (item) {
                return 'name: ' + item.name + '\ncost: ' + item.cost + '\n\n';
            })
            .reduce(function (acc, item) {
                return acc + item;
            });
        }
    }
});
```

## 3 - Global Filters

So there is making filters that are for just a single instance of view, but what of you are doing something that involves more than one instance of vuejs in a page? With that said it is also possible to define filters at a global level as well by using the Vue.filter global api method rather than the filters Vue Constructor option. This will result in a filter that can be used across multipliable instances of Vue in a page or project as a whole.

```html
<html>
  <head>
    <title>vue filter global example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="guesswork">
      <p>{{ 'The wind in your hair!' | answerCheck }}</p>
      <p>{{ '42' | answerCheck }}</p>
      <p>{{ 'To crush your enemies, see them driven before you, and to hear the lamentation of their women' | answerCheck }}</p>
      <p>{{ 42 | answerCheck }}</p>
      <p>{{ 40 + 2 | answerCheck }}</p>
    </div>
  <script>
  
  // registering answer check as a global filter
  Vue.filter('answerCheck', function(val){
     if(parseInt(val) === 42){
        return 'YES that is the answer to everything!'
     }
     return 'Nope, sorry';
  });
  
  
  new Vue({
    el: '#guesswork'
  })
  
  
  </script>
  </body>
</html>
```

## 5 - Conclusion

So this this post I just wanted to work out a few quick examples of filters when using vuejs as part of a client side javaScript project. The filters in vuejs are not to be confused with other methods in other frameworks such as [lodash filter](/2018/05/18/lodash_filter/), and native prototype methods like Array.filter. Those methods have to do with filtering out elements from collections rather that text formatting. When it comes to text formatting it does not always have to be done this way of course, but it seems like it might be the best choice if I am using vuejs as part of the stack compared to any other way to go about doing so.