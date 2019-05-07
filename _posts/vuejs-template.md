---
title: vue template option for defining templates in vuejs
date: 2019-05-07 15:21:00
tags: [vuejs]
layout: post
categories: vuejs
id: 437
updated: 2019-05-07 15:32:48
version: 1.4
---

The [vue template option](https://vuejs.org/v2/api/#template) is one of the DOM options when making an instance of Vue in [vuejs](https://vuejs.org/). It is a way of defining a template that will be used in place of any content that might be in the mount point set with the [vue el](/2019/05/06/vuejs-el/) option. There are a few options when it comes to defining a template, but in this post I will just be writing about the string and X-Template options for templates in vuejs.

<!-- more -->

## 1 - vue templates in string form

Using a string template just simply involves setting a string form of the template to the template DOM option property. This string from template will then be used to compile the contents that will be used in the mount point set with the vue el DOM option.

```html
<html>
  <head>
    <title>vue template example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="foo"></div>
  <script>
  new Vue({
    el:'#foo',
    template: '<p v-bind:style="redness">{{mess}}<\/p>',
    data: {
      mess: 'bar',
      redness: 'color:red;'
    }
  });
  </script>
  </body>
</html>
```

## 2 - vue templates on x-template form

```html
<html>
  <head>
    <title>vue template example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="foo"></div>
  <script type="text/x-template" id="xtemp">
    <p v-bind:style="redness">{{mess}}</p>
  </script>
  <script>
  new Vue({
    el:'#foo',
    template: '#xtemp',
    data: {
      mess: 'bar',
      redness: 'color:blue;'
    }
  });
  </script>
  </body>
</html>
```