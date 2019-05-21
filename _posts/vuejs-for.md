---
title: vue for directive for looping in templates
date: 2019-05-21 09:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 455
updated: 2019-05-21 09:10:55
version: 1.4
---

The [vue for](https://vuejs.org/v2/guide/list.html) built in directive can be used to generate a collection of elements from an array of items in the data object in vuejs. In this post I will be looking at some examples that I put together when it comes to using this directive as a way to generate a list.

<!-- more -->

## 1 - vue for basic example

```html
<html>
  <head>
    <title>vue for example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="list"></div>
  <script src="basic.js"></script>
  </body>
</html>
```

```js
new Vue({
    el: '#list',
    template: '<ul><li v-for="kw in keywords" >{{ kw }}</li></ul>',
    data: {
        keywords: ['lodash find', 'canvas arc', 'vue for']
    }
});
```

## 2 - Vue for alias

```js
new Vue({
    el: '#list',
    template: '<ul><li v-for="( kw, i) in keywords" >{{ i + 1 }} )  {{ kw }}</li></ul>',
    data: {
        keywords: ['lodash find', 'canvas arc', 'vue for']
    }
});
```

## 3 - Nested use of the vue for directive

```js
new Vue({
    el: '#list',
    template: '<ul>' +
    '<li v-for="(cat,ci) in cats" >{{ ci+1 }} ) {{ cat.name }}<ul>' +
    '<li v-for="(kw,ki) in cat.keywords" >' +
    '<a v-bind:href="\'https://www.google.com/search?q=\' + kw">' +
    '{{ ( ci + 1 ) + \'.\' + ( ki + 1) }} ) {{ kw }}' +
    '</a></li>' +
    '</ul></li>' +
    '</ul>',
    data: {
        cats: [{
                name: 'lodash',
                keywords: ['lodash find', 'lodash map']
            }, {
                name: 'vue',
                keywords: ['vue for']
            }
        ]
    }
});
```