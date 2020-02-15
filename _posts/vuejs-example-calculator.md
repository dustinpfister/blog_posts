---
title: vue calculator an example of vuejs and javaScript
date: 2020-02-14 18:46:00
tags: [vuejs]
layout: post
categories: vuejs
id: 613
updated: 2020-02-15 11:00:19
version: 1.2
---

I have not wrote a post on vuejs for a while, so I thought I would start a series of posts that are vue examples. So how about a vue calculator of sorts for starters. This will be a nice quick simple example that makes use of vue el, templates, methods and a few built in directives as well as the use of eval in javaScript to evaluate expressions.

<!-- more -->

## 1 - A simple vue calculator

In this section I will be starting out with a simple vue calculator example. It will involve a static template rather than a render method, and a single click method that is attached to a main from element via the v-on directive. There will be two main variables of interest in the data object, one that stores the current number value of an expression, and the other that that stores that expression. javaScript eval will be used as a way to evaluate the expression and update the number value.

### 1.1 - The calculator.js file

```js
new Vue({
    el: '#app',
    template: '<div>' +
    '<div v-text=\"expression\" v-bind:style=\"style_expression\"></div>' +
    '<div v-text=\"num\" v-bind:style=\"style_num\"></div>' +
    '<form v-on:click=\"click\">' +
    '<input type=\"button\" value=\"1\">' +
    '<input type=\"button\" value=\"2\">' +
    '<input type=\"button\" value=\"3\">' +
    '<input type=\"button\" value=\"4\"><br>' +
    '<input type=\"button\" value=\"5\">' +
    '<input type=\"button\" value=\"6\">' +
    '<input type=\"button\" value=\"7\">' +
    '<input type=\"button\" value=\"8\"><br>' +
    '<input type=\"button\" value=\"9\">' +
    '<input type=\"button\" value=\"0\">' +
    '<input type=\"button\" value=\"+\">' +
    '<input type=\"button\" value=\"-\"><br>' +
    '<input type=\"button\" value=\"*\">' +
    '<input type=\"button\" value=\"/\">' +
    '<input type=\"button\" value=\"CR\">' +
    '</form>' +
    '</div>',
    data: {
        style_expression: 'height: 20px',
        style_num: 'height: 20px',
        num: 0,
        expression: ''
    },
    methods: {
        click: function (e) {
            var str = e.target.value;
            var n = parseInt(e.target.value);
            // add number to expression
            if (typeof n === 'number' && String(n) != 'NaN') {
                this.$data.expression += n;
            } else {
                // add operator to expression
                if ('+-*/'.split('').some(function (ch) {
                        return ch === str;
                    })) {
                    this.$data.expression += str;
                }
                // clear expression
                if (str === 'CR') {
                    this.$data.expression = '';
                }
            }
            // eval expression
            try {
                this.$data.num = eval(this.$data.expression);
            } catch (e) {
                this.$data.num = e.message;
            }
        }
    }
})
```

### 1.2 - The html file

```js
<html>
  <head>
    <title>vue calculator example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script src="calculator.js"></script>
  </body>
</html>
```