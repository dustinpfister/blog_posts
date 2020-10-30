---
title: The vue text directive
date: 2020-10-30 13:017:00
tags: [vuejs]
layout: post
categories: vuejs
id: 733
updated: 2020-10-30 13:35:06
version: 1.2
---

The [vue text](https://vuejs.org/v2/api/#v-text) directive is one of the first directives that one might start to use when getting [started with vue directives](/2019/05/14/vuejs-directive/). The vue text directive just updates the text content of an element to the value that is given when using it in a vue template. 

There are other ways of updating the text content of an element in vuejs, as well as native javaScript, and there are also some related topics to this such as the vue html directive that might also need to be covered here also. So this post will be just a few quick examples on the vue text directive in vuejs, but I also will be touching base on Mustache syntax, native javaScript methods for editing a text node, and other vuiejs directives and features that might come up when it comes to text and vuejs.

<!-- more -->

## 1 - basic vue text example

The basic idea of the vue text directive is that I just type v-text=\"mess\" in an element where mess is a value in my data object, or something that will evaluate to text that I want to be the inner text of an element. So for a very basic hello word style example of the vue text directive there is just having a simple one element template, and a value in a data object that I want to be the inner text of that element.

```html
<html>
  <head>
    <title>vue bind example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<p v-text="mess"><\/p>',
    data: {
      mess: 'bar'
    }
  });
  </script>
  </body>
</html>
```

That is about it when it comes to the very basics, but there is more than one way to go about doing this, and not just with vuejs. Also the v-text directive is just for text nodes, it can not be used to set the text of element attributes for that another directive is needed such as the v-bind directive. However when it comes to this post at least I am mainly just going to be going over some other examples of updating text nodes, and maybe other things that might be touch of as such at least.