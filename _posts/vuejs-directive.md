---
title: vue directive basics and beyond
date: 2019-05-14 11:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 445
updated: 2019-05-14 12:05:07
version: 1.5
---

If you start getting into vuejs the concept of a [vue directive](https://012.vuejs.org/guide/directives.html) is something that will come up, and it is important to understand what they are, how to use them, and also how to [make them as well](https://vuejs.org/v2/guide/custom-directive.html). If you have some background with angular chances are you will be able to get up and running with vue directives fairly fast. However in any case in this post I will be showing off some simple, and maybe not so simple vue directive examples.

<!-- more -->

## 1 - Vue directive basic v-text, and v-bind example

For a basic example of a vue directive I made this quick example that makes use of some built in directives in vuejs. There are a few of these, but for starters this example makes use of the v-text, and v-bind vuejs directives. 

The v-text directive can be used as an alternative to the mustache syntax when it comes to setting the value of a text node of an element. It is a fairly simple directive that just sets the text value of a property of the data object of a view to the inner text node, so it is a good one to start playing with if you are new to vuejs directives. 

The v-bind argument is another directive that comes with vuejs that comes in handy often. This one can be used to set the value of html attributes with values in the data object of a vue. It takes one argument that is the name of the attribute to set, and then the value of the attribute is set to what is given via data object property that is assigned to it.

If you find what I wrote a little confusing maybe it would be best to look at some code examples. Here I have an html file in which I am linking to vuejs, and an external javaScript file that has a Vue class instance.

```html
<html>
  <head>
    <title>vue directive example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="header">
    <h1 v-text="mess_h1" >Something went wrong.</h1>
    <p v-text="mess_p" v-bind:style="style_red"></p>
  </div>
  <script src="./text.js"></script>
  </body>
</html>
```

In the html here you will notice the v-text directive this just sets the innerText of the h1 element to the mess_h1 property of the data object in my Vue instance in the text.js file. I am also using the v-bind directive to set the value of the p elements style attribute to what is in the red property of the data object as well.

```js
var vm = new Vue({
    el: '#header',
    data: {
        mess_h1: 'This is a v-text directive example',
        mess_p: 'Uisng the v-text and v-bind:style directives here',
        style_red: 'color:red;'
    }
});
```

## 2 - Vue directive on:click event example

```html
<html>
  <head>
    <title>vue directive example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="interface">
    <input v-on:click="step" type="button" value="step">
    <p>{{ frame }}</p>
  </div>
  <script src="./event_click.js"></script>
  </body>
</html>
```

```js

var vm = new Vue({
    el: '#interface',
    data: {
        frame: 0,
        maxFrame: 10
    },
    methods: {
        step: function (e) {
            this.frame += 1;
            this.frame %= this.maxFrame;
        }
    }
});
```

## 3 - vue directive template example

```html
<html>
  <head>
    <title>vue directive example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="interface"></div>
  <script src="./template.js"></script>
  </body>
</html>
```

```js
var vm = new Vue({
    el: '#interface',
    template: '<div>' +
    '<input v-on:click="step" type="button" value="step">' +
    '<input v-on:click="reset" type="button" value="reset">' +
    '<p>frame: {{ frame }} / {{ maxFrame }}</p>' +
    '</div>',
    data: {
        frame: 0,
        maxFrame: 10
    },
    methods: {
        step: function (e) {
            this.frame += 1;
            this.frame %= this.maxFrame;
        },
        reset: function () {
            this.frame = 0;
        }
    }
});
```

## 4 - Custom vue directive to binary

```html
<html>
  <head>
    <title>vue directive example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="content">
     <h1>There is a=a and then there is a=<span v-tobin >a</span></h1>
  </div>
  <script src="./custom_tobin.js"></script>
  </body>
</html>
```

```js
Vue.directive('tobin', {
    bind: function (el, binding, vnode) {
        if (!el.dataset.text) {
            el.dataset.text = el.innerText;
        }
        el.innerText = [].map.call(el.dataset.text, (c) => {
            return c.charCodeAt(0).toString(2);
        }).join('');
    }
});
 
var vm = new Vue({
        el: '#content'
    });
```