---
title: vue use method for using and making vuejs plugins
date: 2019-05-13 11:43:00
tags: [vuejs]
layout: post
categories: vuejs
id: 443
updated: 2019-05-13 12:06:00
version: 1.1
---

So the vue use global api method in vue.js is there to use plugins designed for vue.js. Vue.js can do a lot by itself, but chances are you are going to want to use at at least a few plugins as late versions of the framework even miss things like an http client. It seems like vue.js is following a more minimal approach with its design, pulling many features out of the framework itself, and leaving it up to the developer how to go about adding that feature.

<!-- more -->

## 1 - Vue use basic plugin example

```js
var basic ={
    // a Vue.js plug in must have an install property
    // that is a function. Vue and an optional options
    // object will be passed
    install: function (Vue, opt){
        // can define instance methods this way
        Vue.prototype.$foo = function (){
            return 'foobar';
        }
    }
};

```

```html
<html>
  <head>
    <title>vue use example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <h1 id="bar">{{mess}}</h1>
  <script src="./plugin_basic.js"></script>
  <script>
  
  // use the basic plugin
  Vue.use(basic);
  
  var vm = new Vue({
    el:'#bar',
    data: {
      mess: 'bar'
    }
  });
  
  vm.mess = vm.$foo();
  
  
  </script>
  </body>
</html>
```