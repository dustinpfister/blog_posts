---
title: vue extend
date: 2019-05-09 13:07:00
tags: [vuejs]
layout: post
categories: vuejs
id: 439
updated: 2019-05-09 13:38:05
version: 1.5
---

The [vue extend](https://vuejs.org/v2/api/#Vue-extend) method can be used to extend the base Vue class constructor function. It can then be used to make custom constructors that have templates, base data, and methods for one or more instances of something in a project. To help elaborate with this it would be best to check out some examples of the vue extend global api method, so lets hop to it.

<!-- more -->

## 1 - Vue extend and what to know before hand

This is a post on the vuejs global api method vue extend, it is not a getting started post on vuejs, html, or javaScript. I assume that you have at least some experience when it comes to making web applications with javaScript, and are just in the process of getting up to speed with using vuejs as a way to do so when it comes to the use of front end frameworks rather than just vanilla javaScript.

## 2 - Vue extend blog post Example

Say I have a project in which I want to display the title, and date information of a blog post. I would like to abstract away a template, and data object shema away into a nice neet little package, and then use that where and when I want to in a page. One way to go about ddoing just that would be with vue extend.

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
            title: 'untitled',
            date: {
                publish: '2000/01/01',
                update: '2000/01/01'
            }
        }
    }
});
  
  new Post().$mount('#post');
  
  
  </script>
  </body>
</html>
```

Here I am just using string literals for starters but that of course can change to something more that pulls this info from a back end or so forth. The important thing to note here is that I am giving a function for data rather than an object. The reason why that is important is to provide an independent function level variable scope for each instance made with the constructor that returned by vue extend. Here it is had to see why this matters, but in other examples it will be clear as to why it matters.