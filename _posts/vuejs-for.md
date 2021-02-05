---
title: vue for directive for looping in templates
date: 2019-05-21 09:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 455
updated: 2021-02-05 12:33:30
version: 1.15
---

The [vue for](https://vuejs.org/v2/guide/list.html) built in directive can be used to generate a collection of elements from an collection of items in the data object in vuejs in the form of an array or plain object in the form of named key value pairs. The directive is often used when I have to do something for each item in a collection in a static template. However there is also using render functions in some cases in place of a template and when doing so there is no need to bother with the v-for dirrective.

In this post I will be looking at some examples that I put together when it comes to using the v-for directive as a way to generate a list. In addition I will be getting to a whole bunch of other little isshues that come up that might be related to this kind of task in the process of doing so.

<!-- more -->

## 1 - Some Vuejs v-for directive basic examples

In this section I will be starting out with just some very basic examples of the v-for dirrective. There is just using the diretcive with a simple array, or object of public key value pairs. There is then a few other things that come to mind that maybe should be part of a basic getting started type section such as this.

### 1.1 - Basic v-for example of creating a unordered list from an array of strings

One good starting point with the v-for directive might be to just create a simple unordered list element where each neasted list item element contains a text node that is a value from a corespodning string in an array contained in the data object. For this example I am just using a ul element as the root element in the template then I just have a single li element nested in the root ul element. In this single li element I then use the v-for directive, for the value of the directive I will want to have a varaible name for the value of a current element in the array of strings, followed by the name of the collection in the data object. I can then use the variable name in the nested content of the list item to define what to do for each string in the array of strings.

```html
<html>
  <head>
    <title>vue for example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="list"></div>
  <script>
new Vue({
    el: '#list',
    template: '<ul><li v-for="kw in keywords" >{{ kw }}</li></ul>',
    data: {
        keywords: ['lodash find', 'canvas arc', 'vue for']
    }
});
  </script>
  </body>
</html>
```

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

