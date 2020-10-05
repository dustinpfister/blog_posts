---
title: vue observable
date: 2020-10-05 10:01:00
tags: [vuejs]
layout: post
categories: vuejs
id: 716
updated: 2020-10-05 10:09:00
version: 1.1
---

When making a vuejs project there might end up being situations in which I might want to make an object observable, or reactive. When it comes to making a vue data object such an object is often observable to begin with at least when it comes to the top level of the object. In some situations I might have to do something to make sure that nested objects in the data object become observable when I add them to the data object. However what if I want to make a plain old object outside of a vuejs instance completely observable? Well one way is the use the [vue observable](https://vuejs.org/v2/api/#Vue-observable) Global API method.

<!-- more -->

## 1 - Basic vuejs observable example

```html
<html>
  <head>
    <title>vue on example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
    <script>
var state = Vue.observable({
    count: 0
});
 
var vm = new Vue({
    el:'#demo',
    render : function(createElement){
       return createElement('input', {
            attrs: {
                type: 'button',
                value: 'count: ' + state.count
            },
            on: {
                click: this.click
            }
        });
    },
    methods: {
       click : function(){
           state.count += 1;
       }
    }
});
 
    </script>
  </body>
</html>
```