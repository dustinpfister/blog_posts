---
title: vue data in components and plain old vue instances
date: 2019-05-17 12:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 452
updated: 2019-05-18 13:20:12
version: 1.7
---

When working out a project with vuejs there will be heavy use of the [vue data](https://vuejs.org/v2/api/#data) option when making the vue components and plan old vue instances. When it comes to regular vue class instances the value of a vue data option can be just a plan old object, but in other situations involving components for example it will have to be a function. Vue data objects are what is used as the model of a vue instance, they are just plain old objects, but when something is changed the [vue updates](https://vuejs.org/v2/guide/reactivity.html). This post will center around the vue data option in vuejs, but it will also branch off into some other topics as well.

<!-- more -->

## 1 - vue data basic example

So then here is a basic example of the vue data option in action. In the hard coded html I am just linking to vuejs and an external javascript file that will contain the JavaScript code of this basic vue data example. I only have one div element in the body of the html file that will serve as a mount point for this example.

```html
<html>
  <head>
    <title>vue data example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-data"></div>
  <script src="./basic.js"></script>
  </body>
</html>
```

All other examples in this post use variations of this html where all I am changing is the filename. The focus here will be on javaScript code and not html.

The basic.js file looks like this. I am just creating a new instance of the Vue class constructor and using the data option to define some data that will be used in a template.

```js
new Vue({
    el: '#demo-data',
    template: '<p>{{foo}}</p>',
    data: {
        foo: 'bar'
    }
});

```

When this example is up and working the string bar is the inner text of the paragraph element in the template, and that is then used as the content for the mount point in the html which is of course that single div element with the id demo-data.

## 2 -Accessing vue data with $data

The $data property of a Vue instance can be used as a way to gain access to the data object from within methods. If the value of the this keyword is the instance of the Vue class that can be used as a way gain access to vie data properties. Otherwise a variable can be used to store the Vue class instance, and then that can be used as a way to change data values from outside of the instance.

```js
new Vue({
    el: '#demo-data',
    template: '<div><input type="button" value="step" v-on:click="bar" ><span> i: {{ i }}</span></div>',
    data: {
        i: 0
    },
    methods: {
        bar: function () {
            // the data object can be accessed via
            // the this.$data property
            this.$data.i += 1;
        }
    }
});

```

## 3 - vue data and components

in vuejs components are a way of making reusable collections of templates, methods, data and more. They allow for the creating of custom elements that can then be used in other vuejs templates. Here vue data plays an important role in the process of vuejs component design.

```js
Vue.component('stepper', {
    template: '<div><input type="button" value="step" v-on:click="bar" ><span> i: {{ i }}</span><slot></slot></div>',
    data: function () {
        return {
            i: 0
        }
    },
    methods: {
        bar: function () {
            this.$data.i += 1;
        }
    }
})
 
new Vue({
    el: '#demo-data',
    template: '<div><stepper></stepper><br><stepper></stepper></div>',
});
```

One not worth difference is that a function must be used that returns an object that will be the data object for the vue data option of the component. This is to the data object has its own function level variable scope. When making a single vue instance this is not a problem and just a plan old object can be used for data, however a component is something where there will often be more that one instance of, so we do not want all of those instances referencing the same data object.

## 4 - Adding in properties

```js
Vue.component('stepper', {
 
    // using props
    props: ['si'],
 
    // setting i to si prop if given
    data: function () {
        return {
            i: this.si === undefined ? 0 : parseInt(this.si)
        }
    },
 
    template: '<div><input type="button" value="step" v-on:click="stepit" ><span> {{i}} </span></div>',
    methods: {
        stepit: function () {
            this.$data.i += 1;
        }
    }
})
 
// can use a si attribute to set starting index
new Vue({
    el: '#demo-data',
    template: '<div>' +
    '<stepper si=\"5\"></stepper><br>' +
    '<stepper></stepper>' +
    '</div>'
});
```