---
title: vue filter global level and asset options
date: 2019-05-10 09:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 440
updated: 2019-05-10 13:00:19
version: 1.5
---

A vue filter can be a filter in vuejs that is registered at the global level, or it can be an asset of a single Vue constructor instance. Filters can be used to help with formating tasks, and anything else that might require the use of them. In this post I will be going over some use case examples of filters in vuejs, and also about filtering in general in javaScript.

<!-- more -->

## 1 - Vue filter basics

This is a post on filters in vuejs, the popular front end javaScript framework. In vuejs filters are methods that are often used for text formating, but they can also be used to preform a wide range of things when are where needed.

## 2 - Vue filter as an Vue Constructor Option

When making a new instance of the Vue Constructor, one of the options that can be passed via the object that is passed as the first argument to the constructor is the filters option. This is one way to define some filters that apply just to the single instance of the Vue Constructor, rather than a filter that might be registered globally.

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