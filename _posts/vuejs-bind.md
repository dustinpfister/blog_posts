---
title: vue bind
date: 2019-05-31 21:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 468
updated: 2019-06-03 13:59:09
version: 1.2
---

As yes [vue bind](https://vuejs.org/v2/guide/syntax.html) may refer to one of the many ways to bind some text to an element in a vue js template. There are text nodes, there are attribute names and values for elements, and then there is raw html as well. There are a few ways to go about binding something to a template in vue js depending on what it is that needs to be bound to a template, so lets take a look at some vue bind examples today.

<!-- more -->

## 1 - Vue bind text

```js
new Vue({
    el: '#demo-bind',
    template: '<div>' +
    '<p>{{ mess1 }}</p>' +
    '<p v-text=\"mess2\"></p>' +
    '</div>',
    data: {
        mess1: 'mustache syntax',
        mess2: 'bind text directive'
    }
});
```

## 2 - Attribute vue bind directive

```js
new Vue({
    el: '#demo-bind',
    template: '<p v-bind:style="red">red text</p>',
    data: {
        red: 'color:red;'
    }
});```

## 3 - Binding raw html

```js
new Vue({
    el: '#demo-bind',
    template: '<div v-html="html"></div>',
    data: {
        html: 'This is some html'
    }
});
```