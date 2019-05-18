---
title: vue data in components and plain old vue instances
date: 2019-05-17 12:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 452
updated: 2019-05-18 12:58:46
version: 1.4
---

When working out a project with vuejs there will be heavy use of the vue data option when making the vue components and plan old vue instances. When it comes to regular vue class instances the value of a vue data option can be just a plan old object, but in other situations involving components for example it will have to be a function. This post will center around the vue data option in vuejs, but it will also branch off into some other topics as well.

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