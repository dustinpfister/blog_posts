---
title: vue if conditional directive and other options
date: 2019-05-22 06:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 456
updated: 2021-01-28 19:11:40
version: 1.11
---

The [vue if](https://vuejs.org/v2/guide/conditional.html) directive in vuejs can be used when making templates to make an element display or not based on a given condition. It can come in handy when working out a template, but there are other options as well when it comes to built in directives. Also when it comes to using render methods an actual javaScript if statement can be used as a way to define a condition to display and element or not. Never the less this will be a quick post on the vue if directive, and some alternative options as well in vuejs.

<!-- more -->

## 1 - Vue if basic example

So when working out a [template](/2019/05/07/vuejs-template/) the vue if directive can be used to define a condition that if true will result in the rendering of the element that it is used with, otherwise of false it will not render. the value that is used with the directive can be an expression or a data object property.

In this quick example if the type of a data object property is a number it will be fixed to two decimal points, else if it is a string then the full value of the number will be displayed. One element or another will be rendered, but not both depending on the type of the property.

So for this example I have a basic.js file that looks like this.
```js
new Vue({
    el: '#demo-if',
    template: '<div>' +
    '<p v-if=" typeof n === \'number\'" >{{ n.toFixed(2) }}</p>' +
    '<p v-if=" typeof n === \'string\'" >{{ n }}</p>' +
    '</div>',
    data: {
        n: Math.PI
    }
});
```

And html that makes use of it that looks like this.

```html
<html>
  <head>
    <title>vue if example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-if"></div>
  <script src="basic.js"></script>
  </body>
</html>
```

So then because the type of the data.n property is a number, the value of PI is fixed to two decimal points. A silly example but you get the idea, this directive can be used to set some conditions for the tendering of elements, and any children within them.

## 2 - Render methods as a vue if alternative

One alternative to the vue if directive is to get into using [render methods](/2019/05/12/vuejs-render/) in place of static templates. Within the body of a render method the full power of javaScript can be used including if statements and ternary operators.

```js
new Vue({
    el: '#demo-if',
    render: function (createElement) {
        return createElement('div',[createElement('p', typeof this.n === 'number' ? this.n.toFixed(2) : this.n)])
    },
    data: {
        n: Math.PI
    }
});
```

Directives like vue if can still be used in render methods as well, but why bother when you can just do anything that works with jvaScript when dealing with a render method.