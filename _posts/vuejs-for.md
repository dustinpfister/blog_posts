---
title: vue for directive for looping in templates
date: 2019-05-21 09:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 455
updated: 2019-05-21 09:25:27
version: 1.7
---

The [vue for](https://vuejs.org/v2/guide/list.html) built in directive can be used to generate a collection of elements from an array of items in the data object in vuejs. In this post I will be looking at some examples that I put together when it comes to using this directive as a way to generate a list.

<!-- more -->

## 1 - Vue for basic example

To use the vue for directive I just need to use the v-for directive inside a child element of a template followed by an item in array syntax where the item is a name that will be used to refer to the current item in the array in the template, and the array is the name of the array in the data object.

If you are still a little confused maybe it would be best to just look at a code example.

```js
new Vue({
    el: '#list',
    template: '<ul><li v-for="kw in keywords" >{{ kw }}</li></ul>',
    data: {
        keywords: ['lodash find', 'canvas arc', 'vue for']
    }
});
```

In the example above it is just an array of strings, but they can also of course be objects, it is also possible to do nesting as well. In the html of this example I just have a div element with an id of list that I am using as the mount point and I am linking to this javaScript example with a script tag.

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

All additional examples in this post use html that is the same as this the only difference is the filename.

## 2 - Vue for and the second argument

It is possible for there to be a second argument to work with aside from the alias of the current array element. This second argument is the current array element index value. As you might exspect the index vaues are zero relative just like that of certain array prototype methods like forEach.

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