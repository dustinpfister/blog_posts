---
title: The vue text directive
date: 2020-10-30 13:017:00
tags: [vuejs]
layout: post
categories: vuejs
id: 733
updated: 2020-10-30 13:58:59
version: 1.6
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

## 2 - Mustash syntax and expressions in templates

On top of the v-text directive there is also the mustache syntax in vuejs, this is also a way to go about setting the value for text content in an element of a template. When it comes to this mustache syntax A nested set of curly brackets is placed between the opening and closing tag of the element where I want text content to be. I can then pass a property name of the data object, or work out an expression consisting of strings, numbers, and methods that will then evaluate to the text content that I want.

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
    template: '<div><span>{{ \'hello \' }}</span><span>{{ \"count: \" + ct + \";\" }}<\/span></div>',
    data:{
      ct: 3
    }
  });
  </script>
  </body>
</html>
```

## 3 - innerText, $ref, and the mounted life cycle hook

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
    template: '<p ref=\"p\"></p>',
    mounted: function(){
        this.$refs.p.innerText = 'foo';
    }
  });
  </script>
  </body>
</html>
```

## 4 - Conclusion

So that is it for now when it comes to the v-text directive as well as other alternatives when it comes to updating text content of elements in vuejs. I have been neglecting my content of vuejs for much to long, and in the coming days I intend to try to focus on this subject a little more when it comes to writing new vuejs content, as well as editing some of the older stuff I have wrote thus far.

The best way to get up to speed with vuejs, and get used to how to go about addressing some of the more less trivial aspects of the framework would be to just start working on some basic projects, or application examples using vuejs. I only have a few vuejs project examples posts, and I would like to see abound expanding that soon.