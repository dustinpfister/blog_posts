---
title: vue bind
date: 2019-05-31 21:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 468
updated: 2019-06-03 13:55:39
version: 1.1
---

As yes vue bind

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