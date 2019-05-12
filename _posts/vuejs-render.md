---
title: vue render method for client side rendering
date: 2019-05-12 16:40:00
tags: [vuejs]
layout: post
categories: vuejs
id: 442
updated: 2019-05-12 16:58:30
version: 1.3
---

So for the most part vue templates work find for most projects, but it is not always the best solution when it comes to taking full advantage of javaScript to render DOM elements. If a template will not cut it than an alternative would be a [vue render](https://vuejs.org/v2/api/#render) method. When working out a render method a createElement method can be used to create virtual dom elements that can then be used to render a view rather that of a static template.

<!-- more -->

## 1 - Vue render basics

A basic example of using a vue render method will involve using it as an option when making a new instance of Vue. It just needs to be a function with a single argument, which is the createElement method that can be used to create instances of vNode. What the method returns is then is one or more of these virtual node elements than can then be used by vuejs to create an actual DOM tree when updating the view.

```html
<html>
  <head>
    <title>vue render example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="bar">
  </div>
  <script>
  
  var vm = new Vue({
    el:'#bar',
    render : function(createElement){
       return createElement('p', 'Hello World');
    }
  });
  
  
  </script>
  </body>
</html>
```

## 2 - Vue render list example

```js
var vm = new Vue(
 
    {
        el: '#bar',
 
        render: function (createElement){
 
            var i = 0,
            len = 10,
            children = [];
 
            // some javaScript
            figForI = function (i){
                return (i - len / 2) / len * Math.pow(2, i);
            };
 
            // create vNodes
            while (i < len){
                children.push(createElement('li', i + ') : ' + figForI(i)));
                i += 1;
            }
 
            // return ui with vNodes
            return createElement('ul', children);
 
        }
 
    }
 
);

```