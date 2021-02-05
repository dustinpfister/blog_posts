---
title: vue for directive for looping in templates
date: 2019-05-21 09:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 455
updated: 2021-02-05 12:18:08
version: 1.12
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

It is possible for there to be a second argument to work with aside from the alias of the current array element. This second argument is the current array element index value. As you might expect the index values are zero relative just like that of certain array prototype methods like forEach.

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

If I have an array for each object in an array it is possible to nest the use of of the vue for directive.

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

## 4 - Uisng a render function in place of v-for

The v-for directive is really only needed for static templates, if I am using a render function then I can just dirrectly work with the data object and call createElement for each item in a collection. When doing so if the collection object I want to loop over is an array I can use something like Array.forEach as a way to loop over all the items. In addition I can also use other array prototype methods like filter, and map to run the collection over some kind of process first. So render functions themsevles can prove to be a replacment for the v-for directive, and in many respects they prove themselfs to be far more flexabule compared to simple static templates.

However I might not sugest that it is a good idea to just start using render functions as a full replacement for templates actually. Working with redner functions unlocks the full flexability of javaScript, but they are also a little more intense to work with, so genearlly they should only be used if I find myself in a situtsion where it seems like I have to. In addition when it comes to starting to make components I can use bolth render functions and static templates.

In this section I will be going over some examples of using render functions as a replacement for the v-for directive, as well as a tool to help with situations in which something needs to happen before using v-for in another component.

### 4.1 - Basic render function example

First off there is starting with just a basic example of a render function that will create an element for each item in a simple collection.

```js
new Vue({
    el: '#list',
    render: function(createElement){
        var children = [];
        this.$data.arr.forEach(function(item, index){
            var child = createElement('p', index + ') ' + item);
            children.push(child);
        });
        return createElement('div', children);
    },
    data: {
        arr: ['foo', 'man', 'chew']
    }
});
```

## 5 - Conclusion

The v-for directive is one of many built in vuejs directives that I find myself using often when making a template. If I find myself in a situation in which I need to have some html for a collection of items the v-for directive is the first and formost aspect of the vuejs framework that comes to mind, at least when it comes to simple static templates.

