---
title: vue force update method to make the view render when it will not
date: 2019-11-12 09:52:00
tags: [vuejs]
layout: post
categories: vuejs
id: 561
updated: 2019-11-12 10:42:02
version: 1.1
---

Most of the time when a value in the data object of a Vue Class instance changes the view with render again automatically, but it some cases it will not, or for whatever the reason I might want to force Vue to render again. This is where the force update method will come into play as a way to do just that.

<!-- more -->


## 1 - vue force update basic example

One situation in which I have found that I need to use the vue force update method is when I have an array of objects that I am not directly rendering in the template, but is used to update a data object in the updated life cycle hook. Maybe I should not be updating the data object in the life cycle hook, but any any case there are some situations in which I may need to use the force update method and this is one example that comes to mind.

```js
<html>
  <head>
    <title>vue force update example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="container"></div>
  <script>
var app = new Vue({
        el: '#container',
        template: '<div>total: {{ total }}</div>',
        data: {
            total: 0,
            nums: []
        },
        // updated hook
        updated: function () {
            var data = this.$data;
            if (data.nums.length === 0) {
                data.total = 0;
            }
            if (data.nums.length === 1) {
                data.total = data.nums[0].n
            }
            if (data.nums.length >= 2) {
                data.total = data.nums.reduce(function (acc, obj) {
                        acc = typeof acc === 'object' ? acc.n : acc;
                        return acc + obj.n;
                    });
            }
        },
        methods: {
            // tick method
            tick: function () {
                var data = this.$data;
                if (data.nums.length < 3) {
                    data.nums.push({
                        n: 10 + Math.floor(Math.random() * 10)
                    });
                }
                // force update to make sure update hook fires
                this.$forceUpdate();
            }
        }
    });
// app loop
setInterval(function () {
    app.tick();
}, 1000);
  </script>
  </body>
</html>
```