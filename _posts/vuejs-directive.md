---
title: vue directive basics and beyond
date: 2019-05-14 11:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 445
updated: 2021-02-26 11:03:12
version: 1.14
---

If you start getting into vuejs the concept of a [vue directive](https://012.vuejs.org/guide/directives.html) is something that will come up, and it is important to understand what they are. There are many built in directives and an important part of vuejs development involves knowing how to use them. In addition it also goes without saying that it is a good idea to also know how to [make them as well](https://vuejs.org/v2/guide/custom-directive.html) as a way to add features that are needed for a project, but are not built into vuejs itself. 

If you have some background with angular chances are you will be able to get up and running with vue directives fairly fast. However in any case in this post I will be showing off some simple, and maybe not so simple vue directive examples.

<!-- more -->

## 1 - Vue directive basic v-text, and v-bind example

For a basic example of a vue directive I made this quick example that makes use of some built in directives in vuejs. There are a few of these, but for starters this example makes use of the v-text, and v-bind vuejs directives. The v-text directive can be used as an alternative to the mustache syntax when it comes to setting the value of a text node of an element. It is a fairly simple directive that just sets the text value of a property of the data object, and or a little javaScript, of a vue instance to the inner text node. So then the v-text directive it is a good one to start playing with if you are new to vuejs directives. 

The v-bind argument is another directive that comes with vuejs that comes in handy often. This one can be used to set the value of html attributes with values in the data object of a vue, or angain a little javaScript. It takes one argument that is the name of the attribute to set, and then the value of the attribute is set to what is given via data object property that is assigned to it.

If you find what I wrote a little confusing maybe it would be best to look at some code examples. Here I have an html file in which I am linking to vuejs, and then using just a single vue instance in a script tag that makes use of these v-text, and v-bind directives.

```html
<html>
  <head>
    <title>vue directive example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
new Vue({
    el: '#demo',
    template: '<div>' +
        '<p>{{ mess }}</p>' +
        '<p v-text="mess" >Something went wrong.</p>' +
        '<p v-text="mess" v-bind:style="style_red"></p>' +
    '</div>',
    data: {
        mess: 'Directives are great',
        style_red: 'color:red;'
    }
});
  </script>
  </body>
</html>
```

In the html here you will notice the v-text directive this just sets the innerText of the h1 element to the mess_h1 property of the data object in my Vue instance in the text.js file. I am also using the v-bind directive to set the value of the p elements style attribute to what is in the red property of the data object as well.

Here is the text.js file in which I am mounting the div with an id of header thanks to the el option.

When this example is up and running it results in the messages and style set in the data object of the vue being used in the text nodes and style attributes of the elements in which the v-text, and v-bind directives are being used. As such this should help to give you at least a basic idea of that a directive is in vuejs, it is a way to set the attributes and values of dome elements.

Understanding directives along with templates, render functions, and the Vue use method can lead to an understanding of how to go about making vuejs plug ins.

## 2 - Vue directive on:click event example

In this example I will be showing another example of a built in vue directive that can be used for event attachment. understanding event attachment is an important part of designing user interfaces with vuejs. The v-on directive can be used to do just this, for example the v-on method can be used to set a method defined in the methods object of a view to file when an element is clicked by passing an argument to it like in the v-bind directive

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

Directives can be used in conjunction with templates as a way to pull html away from the hard coded html file and into an instance of Vue. This helps to make it so the html, data, and methods are all wrapped up in a single nice neat little package.

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

## 4 - A Custom vue directive to binary example

So now that we have a good grasp on how to go about using directives there is the question of making them. T do So I just need to call the Vue directive global api method and pass the name I want for the directive as the first argument followed by and object that will contain the logic of the directive.

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

## 5 - Conclusion

In vuejs directives are a helpful tool for making use of built in logic, as well as defining my own logic when it comes to prefroming actions on html elements and vuejs components.
