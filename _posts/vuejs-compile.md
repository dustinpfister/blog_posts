---
title: vue compile render function from a template
date: 2020-10-06 14:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 717
updated: 2020-10-06 17:11:46
version: 1.6
---

In vuejs there is the [vue compile](https://vuejs.org/v2/api/#Vue-compile) global api method that can be used to compile a template string into an object that will contain a render function of that template in string form. The render function of the object that is returned by the Vue compile method can then be used as the render option of a vuejs instance.

If you are not familiar with [render functions](/2019/05/12/vuejs-render/) just yet it might be a good idea to read up on them, same goes for [vue templates](/2019/05/07/vuejs-template/) also. 

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

I tent to like to make modules that are written in just a plain old vanilla javaScript type of coding style. I often just give up when it comes to the mind blowing number of options when it comes to frameworks and jjust starting coding with plain od vanilla javaScript by itself. However when I do bother with frameworks I would say that I do tent to like vuejs compared to many other options because I can quickly get up to speed using it with many of the plain old vanilla javaScript modules that I make.

In this section I will be going over the beginnings of a very simple javaScript module hat has a create method that is used to create a state object, and an update methods that will update that state. In addition I also have a template property in the module that can be used with the vue compile method to create a render function to use for a vue instance

### 2.1 - The javaScript module


### 2.2 - Now to make use of it thanks to vue compile

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

## 3 - Conclusion

Once a developer has a good grasp of render functions, templates and the compile global method they then have a good grasp on how to go about creating a view to be used with a vuejs project.