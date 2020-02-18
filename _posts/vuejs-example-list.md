---
title: basic vue list example
date: 2020-02-18 17:26:00
tags: [vuejs]
layout: post
categories: vuejs
id: 615
updated: 2020-02-18 17:29:15
version: 1.1
---

This will be a quick post on a basic vue list example

<!-- more -->


## 1 - A Basic vue list example

So here is the basic copy and past vue list example that I put together for this post. The only fix you might have to do is the link to vuejs as needed.

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