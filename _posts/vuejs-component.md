---
title: vue components
date: 2019-05-16 19:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 450
updated: 2019-11-11 09:20:39
version: 1.8
---

A [vue component](https://vuejs.org/v2/guide/components.html) is a way to create an asset of sorts for a vuejs instance. It is similar to but also very different from [vue extend](/2019/05/09/vuejs-extend/) that can be used to create custom vuejs constructors.

A component has a name assigned to it, and can be used as a way to make custom elements that can be used in templates. There is a great deal to cover about components, as well as the many other vuejs related topics that a developer should be up to speed with before hand, but lets take a look at some basic vue component examples for starters. 

<!-- more -->

## 1 - vue component basic example

Here is a simple counter example of a vue component, it makes use of template, data, and method options. Many of the options that are used when making a plain old Vue instance can also be used with components as well, with some exceptions such as vue el.

In the html here I have some custom step elements the actual html and functionality will be defined in the step component that is defined in the basic.js file that I am also linking to.

```html
<html>
  <head>
    <title>vue component example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="step-demo">
    <step></step>
    <step></step>
  </div>
  <script src="./basic.js"></script>
  </body>
</html>
```

Here in the basic.js file I call the vue component method, followed by the name I want to set for the component, then an object. In this object I can used most of the options that I would also use for a regular plain old Vue Instance including templates, render methods, data and more.

```js
// A Basic step Component
Vue.component('step', {
    template: '<div><button v-on:click="step">step</button> i: {{ i }} </div>',
    data: function () {
        return {
            i: 0
        }
    },
    methods: {
        step: function (e) {
            this.$data.i += 1;
        }
    }
});

new Vue({
    el: '#step-demo'
})

```

## 2 - Adding properties to a custom vue component tag

To add properties to a component I just need to use the props option. The value for the props option can be an array of strings for each property name or an object syntax.

```html
<html>
  <head>
    <title>vue component example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="step-demo">
    <step></step>
    <step si="5"></step>
  </div>
  <script src="./props.js"></script>
  </body>
</html>
```

In this example I am defining an si property that can be used to set the starting index of the step element. With the object syntax it is possible to set defaults and much more, but that is a matter for another post.

```js
// A Basic step Component
Vue.component('step', {
    props: ['si'],
    template: '<div><button v-on:click="step">step</button> i: {{ i }} </div>',
    data: function (a) {
        return {
            i: parseInt(this.si === undefined ? 0 : this.si)
        }
    },
    methods: {
        step: function (e) {
            this.$data.i += 1;
        }
    }
});
 
new Vue({
    el: '#step-demo'
})
```

## 3 - Conclusion

That is it for not of course there is a great deal more to write about with vue components. My content on vuejs is still new, and I could stand to log some more hours writing demos, and some actual projects with vuejs. This is a post that I will likely come back to at some point and expand this one, if you have anything to add in the comments that might help to expedite that 