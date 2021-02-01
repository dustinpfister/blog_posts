---
title: vue if conditional directive and other options
date: 2019-05-22 06:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 456
updated: 2021-02-01 10:57:53
version: 1.15
---

The [vue if](https://vuejs.org/v2/guide/conditional.html) or v-if directive in vuejs can be used when making templates to make an element display or not based on a given condition. It can come in handy when working out a template that contains elements that do not need to be displayed all the time, or only under certain conditions such as a menu system of some kind. However there are other options as well when it comes to built in directives that provide this kind of function such as v-show directive, and there are other realted directives to v-if such as v-else, and v-else-if. 

Also There is yet another option to considerd when starting to use lots of directives with a static template, there is the idea of droping templates all togertaher in favor of render methods. When it comes to using render methods an actual javaScript if statement can be used as a way to define a condition to display and element or not, and redner methods are generaly more powered in general actually becuase javaScript can be used in a full unchained kind of way. Never the less this will be a quick post on the vue if directive, and some alternative options, and examples that related to the use of vue-if when workong on a project that amkes use of vuejs as a client side framework.

<!-- more -->

## 1 - Some Vue v-if basic examples

So when working out a [template](/2019/05/07/vuejs-template/) the vue if directive can be used to define a condition that if true will result in the rendering of the element that it is used with, otherwise of false it will not render. The value that is used with the directive can be an expression, a data object property, or some kind of combination of the two. In this section I will just be going over a few quick basic examples of this v-if dirrective as well as a few closlely realated directeives such as the v-else dirrective.

### 1.1 - A Basic example of v-if.

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

### 1.2 - v-if and v-else


```html
<html>
  <head>
    <title>vue if example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-if"></div>
  <script>
new Vue({
    el: '#demo-if',
    template: '<div>' +
        '<div v-for="a in arr">' +
            '<p v-if=" typeof a === \'number\' ">{{ a.toFixed(2) }}</p>' +
            '<p v-else>{{ String(a) }}</p>' +
        '</div>' +
    '</div>',
    data: {
        arr: ['foo', 3.14159, NaN]
    }
});
  </script>
  </body>
</html>
```

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

Directives like vue if can still be used in render methods as well, but why bother when you can just do anything that works with javaScript when dealing with a render method.

## 3 - Conclusion

The v-if dirrective is then a good way to go about quickly flaging an element as being currently visisble or not. So far I often use it when making a teample where there might be a number of divisions that act as part of an interface, but I only need to have one part of that interface visisble at a time.

