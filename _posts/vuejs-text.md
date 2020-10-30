---
title: The vue text directive
date: 2020-10-30 13:017:00
tags: [vuejs]
layout: post
categories: vuejs
id: 733
updated: 2020-10-30 13:27:32
version: 1.1
---

The vue text directive is one of the first directives that one might start to use when getting started with vue directives. The vue text directive just updates the text content of an element to the value that is given when using it in a vue template. 

There are other ways of updating the text content of an element in vuejs, as well as native javaScript, and there are also some related topics to this such as the vue html directive that might also need to be covered here also. So this post will be just a few quick examples on the vue text directive in vuejs, but I also will be touching base on Mustache syntax, native javaScript methods for editing a text node, and other vuiejs directives and features that might come up when it comes to text and vuejs.

<!-- more -->

## 1 - basic vue text example

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