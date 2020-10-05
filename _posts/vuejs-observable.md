---
title: vue observable
date: 2020-10-05 10:01:00
tags: [vuejs]
layout: post
categories: vuejs
id: 716
updated: 2020-10-05 10:23:48
version: 1.6
---

When making a vuejs project there might end up being situations in which I might want to make an object observable, or reactive. When it comes to making a vue data object such an object is often observable to begin with at least when it comes to the top level of the object. In some situations I might have to do something to make sure that nested objects in the data object become observable when I add them to the data object. However what if I want to make a plain old object outside of a vuejs instance completely observable? Well one way is the use the [vue observable](https://vuejs.org/v2/api/#Vue-observable) Global API method.

So this will be a quick post on using the vue observable global API method, and in the process of doing so I guess I will end up touching base the the subject of [reactivity using vuejs](https://vuejs.org/v2/guide/reactivity.html) also.

<!-- more -->

## 1 - Basic vuejs observable example

In this section I will be going over a basic example of the vue observable global API method. This example involves using the [vue render](/2019/05/12/vuejs-render/) option as a way to create and update a vue rather than a simple [vue template](/2019/05/07/vuejs-template/). If you are not familiar with creating a render method let alone a static template in vuejs then you will want to brush up on that before hand.

So say I have a state object that is just a plain old object outside of a vuejs instance, and it is this object that I am using as a state for the project rater than the vue data object. If I do not make this state object observable then the vue will not just update each time a change is made to the object. However this can easily be fixed by just calling the Vue.observable method and passing the state object as the first argument for this method. Now when I make changes to the state object in one of my methods in the vuejs instance the change to the state object will cause the vue to render again.

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