---
title: vue compile render function from a template
date: 2020-10-06 14:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 717
updated: 2021-02-25 09:56:33
version: 1.11
---

In vuejs there is the [vue compile](https://vuejs.org/v2/api/#Vue-compile) global api method that can be used to compile a template string into an object that will contain a render function of that template in string form. The render function of the object that is returned by the Vue compile method can then be used as the render option of a vuejs instance.

If you are not familiar with [render functions](/2019/05/12/vuejs-render/) just yet it might be a good idea to read up on them, same goes for simple static [vue templates](/2019/05/07/vuejs-template/) also. However the general process that I follow thus far is that I always start out with a static template, and if for some reason I need to switch to a render function I do so. I can not say that I use the compile method that much thus far, however I do often use render functions that I write manually.

<!-- more -->

## 1 - Vue compile basic example

A basic example of the vue compile method might be to just call the vue compile method and bass a simple template string that makes use of a value that will be in a data object when used with a vue instance. The result of calling the vue compile method will be an object that will contain a render function as one of its arguments. The render function of the object can then be referenced to in a vuejs instance.

```html
<html>
  <head>
    <title>vue component example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo">
  </div>
  <script>
  var res = Vue.compile('<div><h1>{{title}}</h1></div>');
  new Vue({
    el:'#demo',
    data: {
      title: 'vue compile'
    },
    render : res.render
  });
  </script>
  </body>
</html>
```

## 2 - Creating a plain javaScript module that can be used with vuejs

I tent to like to make modules that are written in just a plain old vanilla javaScript type of coding style. I often just give up when it comes to the mind blowing number of options when it comes to frameworks and just starting coding with plain od vanilla javaScript by itself. However when I do bother with frameworks I would say that I do tent to like vuejs compared to many other options because I can quickly get up to speed using it with many of the plain old vanilla javaScript modules that I make.

In this section I will be going over the beginnings of a very simple javaScript module hat has a create method that is used to create a state object, and an update methods that will update that state. In addition I also have a template property in the module that can be used with the vue compile method to create a render function to use for a vue instance

### 2.1 - The javaScript module

So here I have the code for a simple javaScript module that will create a very basic state object that just contains a count property, and an update method that will just add one to that state object. When it comes to using vuejs I can use the create object of this module to create a vue data object for the vuejs instance, and I can call the update method in the body of an update method in the vuejs instance methods option. In addition I also have a template string for this module that can be used with the vuejs compile method to create a render method for the vuejs instance.

```js
var Mod = (function () {
    var api = {};
    // create a state object
    api.create = function () {
        return {
            count: 0
        }
    };
    // update a state object
    api.update = function (state) {
        state.count += 1;
    };
    // a vuejs template
    api.template = '<div><input type="button" value="step" v-on:click="update"><span> {{count}} </span></div>';
    return api;
}
    ());
```

### 2.2 - Now to make use of it thanks to vue compile

So then my external javaScript module could be used with a main vuejs instance of a project. When doing so I could just reference the template string in the module, however another option would be to use the Vue.compile method and create a render function.

```html
<html>
  <head>
    <title>vue component example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo">
  </div>
  <script src="./module.js" ></script>
  <script>
  new Vue({
    el:'#demo',
    data: Mod.create(),
    render : Vue.compile(Mod.template).render,
    methods: {
       update: function(){
           Mod.update(this.$data)
       }
    }
  });
  </script>
  </body>
</html>
```

So this might be yet another basic example of what compile can be used for but I get the basic idea at least. If I have a template string in an external module and I want to create a render function from that string one way to do so would be to use the vue compile method.

## 3 - Conclusion

Once a developer has a good grasp of render functions, templates and the compile global method they then have a good grasp on how to go about creating a view to be used with a vuejs project. I do not always go with render functions thus far, but when I do it is often because I am in a situation in which I have to. Static templates do have there limitations and render functions are there to help address those limitations.