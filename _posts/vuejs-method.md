---
title: vue method event handers
date: 2019-05-20 09:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 454
updated: 2021-02-07 12:15:04
version: 1.12
---

In vuejs there is the [vue methods](https://v1.vuejs.org/guide/events.html) option of a vue class constructor that can be used to define event handers for a vuejs project, but they can also be generak methods that can be used within the vue instance. It is aslo possible to share a set of methods accrosss more than one vue instance by way of the mixin option of vue instances. In additin it is also possible to make a set of methods global by making use of the Vue.mixin static method.

In native client side javaScript events can be attached to DOM elements with [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), or some similar method. These event handlers are a way to define what needs to happen when a user clicks on something with a mouse, or preforms one of many other such actions. There are also a number of events that have to do with something that is not a user action such as the on load event. When it comes to working out a vuejs project though I end up having a lot of these kinds of methods as part of the methods object of a main vue instance, or a component.

However the methods in the methods option do not have to just be event handlers, the methods can be used in other methods, as well as in other functions such as life cycle hooks. In vuejs the methods option is one of many options that can be used to define what a Vue call instance of constructor is, keeping everything neat, tidy, and well structured. So in this post I will be going over some quick examples of using the vue methods option.

<!-- more -->

## 1 - vue method option basic examples

One of the major use case examples of the method option is to have a place to park event handers for use in a template. However there are a number of other places to which one of these methods can be used also. In this section I will be going over a few quick examples of the methods option that have to do with just a single vue instance.

### 1.1 - Using The v-on directive to use a method as an event handler

This basic example for the vue methods option is just a single clicker method that is fried when an input element in a template is clicked. So this is an example of using the methods option as a way to define the event handers for the one or more elements in a template of the vue instance which of some major use case for the methods option. The v-on:event directive must be used as a way to attach a method in the vue methods option object as an event hander when using a static template.

```html
<html>
  <head>
    <title>vue methods example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-methods"></div>
  <script>
new Vue({
    el: '#demo-methods',
    template: '<input v-on:click="clicker" type="button" v-bind:value="\'click count: \'+i" >',
    data: {
        i: 0
    },
    methods: {
        clicker: function () {
            this.i += 1;
        }
    }
});
  </script>
  </body>
</html>
```

### 1.2 - using methods as helpers for other methods.

```html
<html>
  <head>
    <title>vue methods example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
new Vue({
    el: '#demo',
    template: '<div>'+
        '<p v-bind:style="getColorStyle(1)">Red</p>' +
        '<p v-bind:style="getColorStyle(0,1)">Lime</p>' +
        '<p v-bind:style="getColorStyle(0,0,1)">Blue</p>' +
    '</div>',
    data: {
        i: 0
    },
    methods: {
        // return a value in the range of 0 to 255
        // based on a value per value in the range of [0, 1],
        // and where a value of undefined will default to 0
        toColorValue: function(per){
           per = per === undefined ? 0 : per;
           return Math.round(per * 255);
        },
        // return a CSS string that will set color with the given
        // percent values for red, green, blue, and alpha
        getColorStyle: function(rPer, gPer, bPer, aPer){
            aPer = aPer === undefined ? 1 : aPer;
            // using toColorValue method in this getColorStyle method
            return 'color:rgba(' + this.toColorValue(rPer) + 
                ',' + this.toColorValue(gPer) + 
                ',' + this.toColorValue(bPer) + 
                ',' + aPer.toFixed(2) + ');'
        }
    }
});
  </script>
  </body>
</html>
```

## 2 - vue method key mods

When using the v-on:event directive there is an additional modifier that can be used to set the key code that the event will fire for when using keyboard events. For example say that I want to call a submit method when a keup event fires for a text input method, but only for the enter key wich has a keycode of 13. There are a number of ways to go about doing this, but one way would be to use a key modifier when using the v-on directive.

```js
new Vue({
    el: '#demo-methods',
    template: '<div>' +
    '<input v-on:keyup.13="submit" v-on:change="change" type="text" v-bind:value="name" >' +
    '<input type="button" v-on:click="submit" value="submit">' +
    '<ul><li> name: {{ name }}</li><li>mess: {{ mess}}</li></ul>' +
    '</div>',
    data: {
        name: 'Dustin',
        mess: ''
    },
    methods: {
        change: function (e) {
            this.$data.name = e.target.value;
        },
        submit: function (e) {
            this.$data.mess = 'Hello ' + this.$data.name;
        }
    }
});
```