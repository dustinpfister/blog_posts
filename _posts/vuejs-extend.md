---
title: vue extend
date: 2019-05-09 13:07:00
tags: [vuejs]
layout: post
categories: vuejs
id: 439
updated: 2019-05-09 13:26:06
version: 1.2
---

The [vue extend](https://vuejs.org/v2/api/#Vue-extend) method can be used to extend the base Vue class constructor function. It can then be used to make custom constructors that have templates, base data, and methods for one or more instances of something in a project. To help elaborate with this it would be best to check out some examples of the vue extend global api method, so lets hop to it.

<!-- more -->

## 2 - Vue extend blog post Example

```html
<html>
  <head>
    <title>Vue extend example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  
  <div id="post"></div>
  
  <script>
var Post = Vue.extend({
    template: '<ul>'+
        '<li><h2>{{ title }}</h2></li><li>published: {{ date.publish }}</li>'+
        '<li>updated: {{ date.update }}</li>'+
       '</ul>',
    data: function () {
        return {
            title: 'Vue extend example',
            date: {
                publish: '2019/05/09',
                update: '2019/05/09'
            }
        }
    }
});
  
  new Post().$mount('#post');
  
  
  </script>
  </body>
</html>
```