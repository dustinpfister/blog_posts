---
title: vue filter global level and asset options
date: 2019-05-10 09:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 440
updated: 2019-05-10 12:47:43
version: 1.2
---

A vue filter can be a filter in vuejs that is registered at the global level, or it can be an asset of a single Vue constructor instance. Filters can be used to help with formating tasks, and anything else that might require the use of them. In this post I will be going over some use case examples of filters in vuejs, and also about filtering in general in javaScript.

<!-- more -->

## 2 - Vue filter as an Vue Constructor Option

### 2.1 - vue filter option basic example

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