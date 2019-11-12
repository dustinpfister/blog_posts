---
title: vue force update method to make the view render when it will not
date: 2019-11-12 09:52:00
tags: [vuejs]
layout: post
categories: vuejs
id: 561
updated: 2019-11-12 12:00:36
version: 1.5
---

Most of the time when a value in the data object of a Vue Class instance changes the view with render again automatically, but it some cases it will not, or for whatever the reason I might want to force Vue to render again. This is where the [force update](https://vuejs.org/v2/api/#vm-forceUpdate) method will come into play as a way to do just that.

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

### 1.1 - Using the array in the template

If I take the same example, and just use the nums array in the template then the vue force update method is not needed.

```js
var app = new Vue({
        el: '#container',
        template: '<div>'+
            '<p>total: {{ total }}</p>'+
            '<ul><li v-for="obj in nums">{{ obj.n }}</li></ul>'+
        '</div>',
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
                // force update is not needed because nums array
                // is being used in the template
            }
        }
    });
// app loop
setInterval(function () {
    app.tick();
}, 1000);
```

I am still tabulating the total of the data object in the updated lifecycle hook, I am not sure of that is a bad thing or not, but in any case it does not have to happen there. So lets look at yet another revision of this basic example in which I am just pulling that logic out of the updated hook.

### 1.2 - Do away with the updated hook completely

I cant help but thing that the vue force update method is a duck tape solution for something that should not be happening in the first place. I am not sure if changing the state of the vue data object in the updated life cycle hook is a bad practice or not. In any case I think I should be able to if I want to, it is just that seems to be the source of the problem here.

For this example at least it would say that I do not have to tabulate the number values in the array in the updated hook, and only in the updated hook. I can just pull that logic into the tick method, or a new method of its own.

```js
var app = new Vue({
        el: '#container',
        template: '<div>total: {{ total }}</div>',
        data: {
            total: 0,
            nums: []
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
                // no force update, just tabulate with other method
                this.tabulate();
            },
            // tabulate nums array
            tabulate: function () {
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
            }
        }
    });
// app loop
setInterval(function () {
    app.tick();
}, 1000);
```

In this revision you will notice that I went back to the template that I was using in the first example in which I needed the force update method to get it to work. However now this too seems to work just fine without any problems and allows for me to avoid having to use the vue force update method. 

The use of the force update method seems to center around the use of nested objects in the vue data object. When I add, remove, or change the state of a nested object it does not always trip and update.