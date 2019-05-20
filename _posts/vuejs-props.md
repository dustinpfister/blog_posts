---
title: vue props in vue components
date: 2019-05-19 06:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 453
updated: 2019-05-20 15:55:25
version: 1.6
---

When making a vue component there is sometimes a need to have properties for the custom element that is made when developing a component. This is where the [vue props](https://vuejs.org/v2/guide/components-props.html) option comes into play, it can be used as a way to set some properties for a component just like attributes when it comes to actual html elements. There is a little bit to cover when it comes to vue props such as how to set default values for them an so fort so lets take a look at some examples.

<!-- more -->

## 1 - vue props basics

Here I have a basic example of vue props in action. In my html I am just linking to vuejs, and another external javaScript file where I will be placing my original code. I also have a single div element that will serve as a mount point for the example, additional html will be rendered with vuejs via a template.

```html
<html>
  <head>
    <title>vue props example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-props"></div>
  <script src="./basic.js"></script>
  </body>
</html>
```

Here I have the javaScript that is in the basic.js file that I am linking ot in my html. I just use the vue props option to define a single property for my custom component. The vue props option can also be define with an object notation that might be a better play when it comes to making a more serious vue component, but for a simple example such as this just an array of string names for the properties should work just fine.

```js
Vue.component('custom', {
    props: ['foo'],
    template: '<div>{{ foo }}</div>'
});
 
new Vue({
    el: '#demo-props',
    template: '<div><custom foo="baz"></custom><custom></custom></div>'
});
```

Once I have the property for my component define I can the use it in other templates that use the custom element in a template.

## 2 - Setting defaults for a vue prop

```js
Vue.component('custom', {
    props: {
        foo: {
        default:
            'foobar'
        }
    },
    template: '<div>{{ foo }}</div>'
});
 
new Vue({
    el: '#demo-props',
    template: '<div>' +
    '<custom foo="baz"></custom>' + // 'baz'
    '<custom></custom>' + // 'foobar'
    '</div>'
});
```