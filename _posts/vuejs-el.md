---
title: vue el option for selecting a vuejs DOM mount point
date: 2019-05-06 07:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 436
updated: 2019-05-06 09:07:11
version: 1.1
---

The [vue el](https://vuejs.org/v2/api/#el) option for a vuejs instance is what can be used to select a mount point for a vuejs project.

<!-- more -->

## 1 - vue el option basics and mounting by id


### 1.1 - Mount by id Example
```h
<html>
  <head>
    <title>vue el example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <p id="mess">{{message}}</p>
  <script>
  
  new Vue({
    el:'#mess',
    data: {
      message:'an element can be selected by id with the # symbol'
    }
  });
  
  </script>
  </body>
</html>tml
```

## 2 - vue el and selecting by class

### 2.1 - Mount by class Example 1 - Mounts to the first instance of the class

```html
<html>
  <head>
    <title>vue el example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <ul class="foo">
    <li class="bar" v-bind:style="style" >This is red text {{ mess }}</li>
    <li>This is not red</li>
    <li class="bar" v-bind:style="style">This text is not red {{ mess }}</li>
  </ul>
  <script>
  
  // mounts to the first element with 'bar' class
  new Vue({
    el:'.bar',
    data: {
      style: 'color:red;',
      mess: 'bar'
    }
  });
  
  // mounts to the first element with 'foo' class
  new Vue({
    el:'.foo',
    data: {
      style: 'color:blue;',
      mess: 'foo'
    }
  });
  
  </script>
  </body>
</html>
```

### 2.2 - Mount by class Example 2 - Nested elements example

```html
<html>
  <head>
    <title>vue el example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  
  <div class="wrap">
    <div>
      <p>{{ mess }}</p>
    </div>
  
    <div class="project">
      <p>{{ mess }}</p>
    </div>
  
    <div class="project">
      <p>{{ mess }}</p>
    </div>
  </div>
  
  
  <script>
  
  // mounting to '.project' results in the mess being displayed for the
  // first div of the 'project' class. If I where to mount to '.wrap' that
  // would result in mess being displayed for all divs
  new Vue({
    el:'.project',
    data: {
      style: 'color:red;',
      mess: 'This is the mounted vue project'
    }
  });
  
  </script>
  </body>
</html>
```