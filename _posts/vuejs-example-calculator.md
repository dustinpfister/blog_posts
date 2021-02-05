---
title: vue calculator an example of vuejs and javaScript
date: 2020-02-14 18:46:00
tags: [vuejs]
layout: post
categories: vuejs
id: 613
updated: 2021-02-05 15:41:17
version: 1.10
---

I have not wrote a post on vuejs for a while, so I thought I would start a series of posts that are [vuejs examples](/2021/02/04/vuejs-example/). So how about a [vue calculator](https://vuejsexamples.com/tag/calculator/) of sorts for starters. This will be a nice quick simple example that makes use of vue el, templates, methods and a few built in directives as well as the use of eval in javaScript to evaluate expressions.

<!-- more -->

## 1 - A simple vue calculator

In this section I will be starting out with a simple vue calculator example. It will involve a static template rather than a render method, and a single click method that is attached to a main from element via the v-on directive. There will be two main variables of interest in the data object, one that stores the current number value of an expression, and the other that that stores that expression. javaScript eval will be used as a way to evaluate the expression and update the number value.

### 1.1 - The calculator.js file

So I made a javaScript file called calculator.js and created a new vue instance. In the options object of the new vue instance I am binding to a container element in my html with an id of app via the vue el directive. I then have a simple static template where I have an text input element for the current expression that I want to evaluate. I also have a div element in the template that is used to display the current value of the the expression, as well as a number of additional button input elements that can be used to create an expression by way of clicking on the buttons.

I then have two methods one is used to evaluate the current expression using eval which is then used to update the value of the num property of the data object. I am using the keyup event in the text input element as a way to directly call the method and update the number when using the text element as a way to create an expression. The click method is used for the buttons that I have made that can also be used to create an expression that way.

```js
new Vue({
    el: '#app',
    template: '<div>' +
    '<input v-model=\"expression\" v-on:keyup=\"eval\" v-bind:style=\"style_expression\"></br>' +
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
    '<input type=\"button\" value=\".\">' +
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
        // evaluate the expression
        eval: function () {
            try {
                this.$data.num = eval(this.$data.expression);
            } catch (e) {
                this.$data.num = e.message;
            }
        },
        // a button was clicked
        click: function (e) {
            var str = e.target.value;
            var n = parseInt(e.target.value);
            // add number to expression
            if (typeof n === 'number' && String(n) != 'NaN') {
                this.$data.expression += n;
            } else {
                // add operator to expression
                if ('+-*/.'.split('').some(function (ch) {
                        return ch === str;
                    })) {
                    this.$data.expression += str;
                }
                // clear expression
                if (str === 'CR') {
                    this.$data.expression = '';
                }
            }
            this.eval();
        }
    }
})
```

### 1.2 - The html file

Now for some html that links to vuejs and of course my calculator.js file that I have above.

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

When this vue calculator example is up and running it works okay. I am able to create an expression by editing the text of the text input element for the expression, or use the buttons. There is all ready a great deal I would change when it comes to using a render method rather than a static template, and adding additional features, but the basic idea of a general vue calculator is there.

## 2 - Conclsuion

Of course there are many other types of calculators other than what it is that I covered in this post. There are many other ways to design these with vuejs by using render methods, in place of templates, and making use of other ways to work with user input such as a canvas tag combines with mouse and touch events. There are of course all kids of calculators, such as scientific ones, and ones that are justg used to compute how much money a loan payment will be. Hopefully this will help to give you some ideas as to how to get going with this though.