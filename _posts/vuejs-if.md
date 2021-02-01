---
title: vue if conditional directive and other options
date: 2019-05-22 06:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 456
updated: 2021-02-01 11:22:41
version: 1.17
---

The [vue if](https://vuejs.org/v2/guide/conditional.html) or v-if directive in vuejs can be used when making templates to make an element display or not based on a given condition. It can come in handy when working out a template that contains elements that do not need to be displayed all the time, or only under certain conditions such as a menu system of some kind. However there are other options as well when it comes to built in directives that provide this kind of function such as v-show directive, and there are other realted directives to v-if such as v-else, and v-else-if. 

Also There is yet another option to considerd when starting to use lots of directives with a static template, there is the idea of droping templates all togertaher in favor of render methods. When it comes to using render methods an actual javaScript if statement can be used as a way to define a condition to display and element or not, and redner methods are generaly more powered in general actually becuase javaScript can be used in a full unchained kind of way. Never the less this will be a quick post on the vue if directive, and some alternative options, and examples that related to the use of vue-if when workong on a project that amkes use of vuejs as a client side framework.

<!-- more -->

## 1 - Some Vue v-if basic examples

So when working out a [template](/2019/05/07/vuejs-template/) the vue if directive can be used to define a condition that if true will result in the rendering of the element that it is used with, otherwise of false it will not render. The value that is used with the directive can be an expression, a data object property, or some kind of combination of the two. In this section I will just be going over a few quick basic examples of this v-if dirrective as well as a few closlely realated directeives such as the v-else dirrective.

### 1.1 - A Basic example of v-if.

For a first basic example as to how the v-if directive can be useful say I have an array of values and I only want to render a some html for each element that fits a given condition. This array contains numbers and other values that by themselfs may not evaluate to a true boolean value. I can use the v-for durrective as a way to redner html for each element in the array, and I can use the v-if dirrective to actaully redner some html if it meets a condition. When using the v-if dirrective I can use the value itself as a way to redner something or not, and I can also use expressions that will evalue to a true or false value as a way to find out if I want to render for the given element.

```js
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
        '<div v-for="a in arr" style="margin-bottom:20px;">' +
            // it can just be the value itself that will convert to a true or false value
            '<div v-if="a"> value is true: {{ a }}  <br></div>' +
            // it can be an expression that will evaluate to true or value
            '<div v-if=" typeof a === \'number\' ">is a number: {{ a.toFixed(2) }}<br></div>' +
        '</div>' +
    '</div>',
    data: {
        arr: [false, 2, 3, null, 6.5, 8, 'foo']
    }
});
  </script>
  </body>
</html>
```

This might not be the best example when it comes to real life use case examples, but basic examples are often like that. In any case the basic idea is there. I have a value in the data object that will convert to a true or false value, or can be used in a simple expression that will evalute to a treu or false boolean value. If the value is false then the html element, and any chindren it it, should not redner. If the resuting boolean value is true then the html for that value will render, and that is about it. However baybe it is called for to look at least a few more examples of the v-if direcrtive, and other dirrectives to get a better feel for how to go about unsing this in a real project of some kind.

### 1.2 - v-if and v-else

When using an if statement in javaScript, or any lanague for that matter there is often an else statement that can be used with an if statement. That is there is a way to define some code that will fire when a condition evalues to false, and only false. So it stands to reason that there should be a kind of v-else directive on top of the v-if directive, and there is.

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

