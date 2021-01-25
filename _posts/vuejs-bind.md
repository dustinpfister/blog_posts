---
title: vue bind
date: 2019-05-31 21:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 468
updated: 2021-01-25 13:04:45
version: 1.8
---

The term [vue bind](https://vuejs.org/v2/guide/syntax.html) may refer to one of the many ways to bind some text to an element in a vue js template. There are text nodes, there are attribute names and values for elements, and then there is raw html as well. There are a few ways to go about binding something to a template in vue js depending on what it is that needs to be bound to a template, so it is a good idea to get these things worked out when it comes to working on a vuejs project.

There are ways to binding some kind of value to the text node of an element, for that there is the mustache syntax, and also the text dirrective. However what if i want to use some text not as a text node, but as a value for anattribute of an element in avuejs template? For these kinds of tasks there is the [vue bind dirrective](https://vuejs.org/v2/guide/syntax.html#v-bind-Shorthand). So lets take a look at a few simple examples of binidng text to elements in a vuejs template, using various ways inclduing the text, and bind dirrectives.

<!-- more -->

## 1 - Vue bind text

So when it comes to binding text to an element in a template there is the mustache syntax that can be used of course, however there is also the v-text built in directive as well that can be used as a way to bind text from a property in the vue data object to a text node in a template.

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

Binding text is one thing but what about attributes ans raw html, well lets take at some more examples that involve binding in vuejs.

## 2 - Attribute vue bind directive for element attributes

When it comes to binding a value in the vue data object to a text node that can be done with the mustache syntax just fine, bit it will not aways work out so great when attempting to bind a value to an html element attribute value in a template. If you are running into trouble when that one you will want to check out the v-bind directive.

```js
new Vue({
    el: '#demo-bind',
    template: '<p v-bind:style="red">red text</p>',
    data: {
        red: 'color:red;'
    }
});
```

## 3 - Binding raw html

Then there is of course raw html and how to go about binding that to a vue template. Well there was once a time when a special syntax similar to the mustache syntax could be used but in 2.x of vuejs that is no longer the case. However there is now the v-html directive that can be used as a way to bind raw html to a vue template.

```js
new Vue({
    el: '#demo-bind',
    template: '<div v-html="html"></div>',
    data: {
        html: 'This is some html'
    }
});
```