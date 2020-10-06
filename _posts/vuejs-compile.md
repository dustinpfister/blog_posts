---
title: vue compile render function from a template
date: 2020-10-06 14:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 717
updated: 2020-10-06 16:46:38
version: 1.4
---

In vuejs there is the [vue compile](https://vuejs.org/v2/api/#Vue-compile) global api method that can be used to compile a template string into an object that will contain a render function of that template in string form. The render function of the object that is returned by the Vue compile method can then be used as the render option of a vuejs instance.

If you are not familiar with [render functions](/2019/05/12/vuejs-render/) just yet it might be a good idea to read up on them, same goes for [vue templates](/2019/05/07/vuejs-template/) also. 

<!-- more -->

## 1 - Vue compile basic example

A basic example of the vue compile method might be to just call the vue compile method and bass a simple template string that makes use of a value that will be in a data object when used with a vue instance. The result of calling the vue complile method will be an object that will contain a render function as one of its arguments. The render function of the object can then be referenced to in a vuejs instance.

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

## 2 - Conclusion

Once a developer has a good grasp of render functions, templates and the compile global method they then have a good grasp on how to go about creating a view to be used with a vuejs project.