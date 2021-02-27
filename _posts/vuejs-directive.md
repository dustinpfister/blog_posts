---
title: vue directive basics and beyond
date: 2019-05-14 11:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 445
updated: 2021-02-27 14:39:12
version: 1.24
---

If you start getting into vuejs the concept of a [vue directive](https://012.vuejs.org/guide/directives.html) is something that will come up, and it is important to understand what they are. There might be a range of ways of defining what a directive is, but maybe a good way of summing things up is that they are just a way to go about preforming some kind of an action on an html element in a static vue template. Actions such as changing what the text node is for a paragraph element, assigning a value for a style attribute of an element, or attaching an event handler for a button element.

There are many built in directives and an important part of vuejs development involves knowing how to use them first and formost before looking into taking the time to make a custom directive. However speaking of custom  directives, yes in addition to knowing about the built in ones it also goes without saying that it is a good idea to also know how to [make them also](https://vuejs.org/v2/guide/custom-directive.html). Directives are a great way to add features that act on elements that are needed for a project, but are not built into vuejs itself. 

If you have some background with angular chances are you will be able to get up and running with vue directives fairly fast. However in any case in this post I will be getting into some simple, and maybe not so simple vue directive examples. Starting out with some very basic hello world type examples, and then getting into some additional ones that are custom made.

<!-- more -->

## 1 - Vue directive basic v-text, and v-bind example

For a basic example of a vue directive I made this quick example that makes use of some built in directives in vuejs. There are a few of these, but for starters this example makes use of the v-text, and v-bind vuejs directives. The v-text directive can be used as an alternative to the mustache syntax when it comes to setting the value of a text node of an element. It is a fairly simple directive that just sets the text value of a property of the data object, and or a little javaScript, of a vue instance to the inner text node. So then the v-text directive it is a good one to start playing with if you are new to vuejs directives. 

The v-bind argument is another directive that comes with vuejs that comes in handy often. This one can be used to set the value of html attributes with values in the data object of a vue, or again a little javaScript. It takes one argument that is the name of the attribute to set, and then the value of the attribute is set to what is given via data object property that is assigned to it.

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

In the html here you will notice the v-text directive just sets the innerText of the p elements to the mess property of the data object in my Vue instance in the script tag. I am also using the v-bind directive to set the value of a p elements style attribute to what is in the red property of the data object as well.

When this example is up and running it results in the messages and style set in the data object of the vue being used in the text nodes and style attributes of the elements in which the v-text, and v-bind directives are being used. As such this should help to give you at least a basic idea of that a directive is in vuejs, it is a way to set the attributes and values of DOM elements.

Understanding directives along with templates, the data object, and other vuejs instance options is a major part of vuejs development. However the built in set of directives has its limitations, so there are ways of creating my own custom directives. In addition there is also how to go about ditching static templates all together in favor of render functions. However both of those options give a fair amount of control allowing me to do just about anything that comes to mind when it comes to DOM manipulation.

## 2 - Vue directive v-on directive

In this section I will be showing some examples of a built in [vue directive that can be used for event attachment called v-on](/2019/11/14/vuejs-on/). Understanding event attachment is an important part of designing user interfaces with vuejs, and javaScript in general actually for that matter. The v-on directive can be used to do just this, for example the v-on method can be used to set a method defined in the methods object of a vue to fire when an element is clicked. When doing so just the name can be given for the value of the directive, and when doing so the method will be treated as an event handler where the event object will be given as the first argument, however the value of the this keyword will refer to the vue instance.

So then this is a directive that should have at least a few examples here as this is one that I find myself using all the time.

### 2.1 - A Basic vue v-on:click directive example

The v-on directive can be used to call a method in the methods object. When doing so just the name of the method can be given, when the method is called this way the method will be used like an event handler. If you are not familiar with how to go about working with event handlers in native javaScript it might be a good idea to play around with a few simple examples of the addEventListener element method when it comes to having some knowledge of how this is done in plain vanilla javaScript. When creating a callback function for addEventListener this first element in the callback function will be an event object. When calling a method by just passing the name of the method for the value of v-on:click the method will be used in the same way in that the first argument of the method will be an event object. However the value of the this keyword will refer to the vue instance, which can prove to be helpful.

```html
<html>
  <head>
    <title>vue directive example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="interface"></div>
  <script>
new Vue({
    el: '#interface',
    template: '<div>' +
        '<input v-on:click="step" type="button" value="step">' +
        '<p>{{ frame }} / {{ maxFrame }} </p>' +
    '</div>',
    data: {
        frame: 0,
        maxFrame: 10
    },
    methods: {
        step: function (e) {
            var dat = this.$data
            dat.frame += 1;
            dat.frame %= dat.maxFrame;
        }
    }
});
  </script>
  </body>
</html>
```

### 2.2 - Call Click method example

I can call the method that I want to fire when binding the durective in the template. This way I can design my methods in a way in which they work as functions that take arguments other than an event object. For example I can use my step method in a way in which I can give a rate as the first argument, and I can have few buttons that will step at differnt rates.

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
        '<input v-on:click="step(1)" type="button" value="step 1">' +
        '<input v-on:click="step(10)" type="button" value="step 10">' +
        '<input v-on:click="step(100)" type="button" value="step 100">' +
        '<p>{{ frame }} / {{ maxFrame }} </p>' +
    '</div>',
    data: {
        frame: 0,
        maxFrame: 1000
    },
    methods: {
        step: function (rate) {
            var dat = this.$data
            dat.frame += (rate === undefined ? 1 : rate);
            dat.frame %= dat.maxFrame;
        }
    }
});
  </script>
  </body>
</html>
```

## 3 - A Custom vue directive to binary example

So now that we have a good grasp on how to go about using directives there is the question of making them. To do so I just need to call the Vue directive global api method and pass the name I want for the directive as the first argument followed by an object that will contain the logic of the directive. When doing so there are a number of hook functions that can be defined for a directive which include hook, inserted, update, componentUpdated, and unbind.

### 3.1 - Basic v-tobin example that makes use of the bind directive hook.

Here I have a simple directive that will take the inner text of an element and turn it into a binary string. The example makes used of the bind hook which will only fire once and is called when the directive is first bound to an element.

```html
<html>
  <head>
    <title>vue directive example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
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
 
new Vue({
    template: '<h1>There is a=a and then there is a=<span v-tobin >a</span></h1>',
    el: '#demo'
});
  </script>
  </body>
</html>
```

## 4 - Conclusion

In vuejs directives are a helpful tool for making use of built in logic, as well as defining my own logic when it comes to preforming actions on html elements and vuejs components. They are not a replacement for components though, in fact that is the first and for most way of going about breaking down code into smaller more reusable pieces. However there are many situations in which it might be called for to create one or two custom directives.
