---
title: basic vue list example
date: 2020-02-18 17:26:00
tags: [vuejs]
layout: post
categories: vuejs
id: 615
updated: 2020-02-18 18:18:55
version: 1.3
---

This will be a quick post on a basic vue list example. When working with unordered or ordered list elements in a template, typically I will end up using the [vue for](/2019/05/21/vuejs-for/) directive to bind to an array in the [vue data](/2019/05/18/vuejs-data/) object.

<!-- more -->


## 1 - A Basic vue list example

So here is the basic copy and past vue list example that I put together for this post. The only fix you might have to do is the link to vuejs as needed. The basic process is to start out with a vue instance by calling the main vue constructor with the new keyword, and then pass an options object. In that options object I am using the vue el directive to mount to a div element in my html, I have a template, data object, and methods object also.

In the template I have a div as a root element because I must have one for a vue template, I then have an text input element and a a button type input element that when clicked will add a new list item with a message value given in the text input element. I then have a ul element and I am using the vue for directive to create li elements for each element in the items array.

```html
<html>
  <head>
    <title>vue example list</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script>
new Vue({
    el: '#app',
    template: '<div>' +
    '<input type=\"text\" v-model=\"textInput\"> '+
    '<input type=\"Button\" value=\"Push\" v-on:click=\"pushNew\"></br>' +
    '<ul>'+
        '<li v-for=\"item in items\"><input v-model=\"item.mess\"> '+
        '<input v-bind:id=\"item.id+\'-del\'\" type=\"button\" v-on:click=\"delItem\" value=\"Del\"></li>'+
    '</ul>' +
    '</div>',
    data: {
        textInput: 'Enter new item text',
        items: []
    },
    methods: {
        delItem: function(e){
            var id = e.target.id.replace(/-del/, ''),
            i = this.$data.items.length,
            item;
            while(i--){
                item = this.$data.items[i];
                if(item.id === id){
                    this.$data.items.splice(i, 1);
                }
            }
        },
        pushNew: function () {
            var id = this.$data.items.length;
            this.$data.items.push({
                id: 'list-item-' + id,
                mess: this.$data.textInput,
                done: false
            });
        }
    }
});
  </script>
  </body>
</html>
```