---
title: vue el option for selecting a vuejs DOM mount point
date: 2019-05-06 07:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 436
updated: 2019-05-06 10:01:14
version: 1.6
---

The [vue el](https://vuejs.org/v2/api/#el) option for a vuejs instance is what can be used to select a mount point for a vuejs project. A mount point is an element in a html structure in which all elements that are nested from that element will be subject to the vuejs instance in which the vue el option is being used. A mount point that is selected with the el option can be obtained by a query string that allows for selection by id, class and so forth. In addition an actual reference to the element of interest can be done as well if there is a need to do so for whatever the reason. There might be some things to be concerned about at this point when it comes to selection by class, and having more than one vue instance on a page as well.

<!-- more -->

## 1 - vue el option basics and mounting by id

The vue el option is used to give vuejs an existing html element to which to mount for the Vue instance that is created with the new keyword. The use of the el option will result in the Vue instance being compiled right away, which might be desirable in most use case examples. If for some reason you want to compile at a later point, the el option should be omitted and the mount method should be used instead.

### 1.1 - Mount by id Example

To mount an element by id just give a string beginning with a hash tag and then the name of the id, just like with jQuery or querSelectorAll. The vue el option expects a string or an object that is a reference to a dom element, so another option would be to use document.getElementById or any other means by which to select by id.

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

Selecting by class is just a matter of using a period rather than a hash tag as with any query selector string. The thing about selecting by class is that the vue el property will only make use of a single dom element. This is because there should be only one mount point per vuejs instance.

### 2.1 - Mount by class, nested Elements, and more than use Vue

In this example I am selecting by class and have more than one instance of vuejs. Things can get a little confusing when dealing with nested dom elements, selection by class, and more than one vue instance. It would be best to avoid these situations, but when they do happen what results does make sense to me at least.

my reasoning is that any Vue instance that exists before hand in the DOM tree should be ignored and it would appear that is what happens.

```html
<html>
  <head>
    <title>vue el example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <ul class="foo">
    <li class="bar" v-bind:style="style" >This is red text {{ mess }}</li>
    <li>This is not red or blue</li>
    <li class="bar" v-bind:style="style">This text is blue {{ mess }}</li>
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
