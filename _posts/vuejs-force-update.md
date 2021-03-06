---
title: Vue force update method to make the view render when it will not
date: 2019-11-12 09:52:00
tags: [vuejs]
layout: post
categories: vuejs
id: 561
updated: 2021-02-28 12:49:05
version: 1.11
---

Most of the time when a value in the [data object](/2019/05/18/vuejs-data/) of a Vue Class instance changes, the view will render again automatically, but in some cases it will not. For this reason or any other extending circumstance I might want to force Vue to render the vue again. This is where the [force update](https://vuejs.org/v2/api/#vm-forceUpdate) method will come into play as a way to do just that. 

If I do find myself using it though I cant help but think that I should not be using it, most of the time the reason why a vue is not updating is because an object added to the vue is not reactive, so maybe a better solution would be to make it reactive in that case. So the force update method should not be a replacement for the [Vue.Observable](/2020/10/05/vuejs-observable/) and [Vue.set](/2019/05/08/vuejs-set/) methods. Simply put there is making sure that all nested objects in the data object that should be reactive are in fact reactive first and foremost.

Still there might be some situations now and then where I will just have to use the force update method. So lets look at some examples that make use of the force update method, and some others that do the same thing without the use of the method.

<!-- more -->


## 1 - vue force update basic example

One situation in which I have found that I need to use the vue force update method is when I have an array of objects that I am not directly rendering in the template, but is used to update a data object value that is used in the template in an updated hook. In such a situation a change or addition to the array will not cause the vue to render again, unless I call force update.

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

Now maybe I should completely change the whole way that I am going about doing this. For one thing maybe I should update the total value in the tick method rather than in the updated hook. However this is a post on the force update method so I do have to just come up with a weird situation in which it might need to be used. Still yes using the force update method is often an indication that there is something that I am doing that can and maybe should be done differently. So lets look at some additional examples of this sort of thing that might help avoid using the force update method.

### 1.1 - Using the array in the template

If I take the same example, and just use the nums array in the template then the vue force update method is not needed. This is one way to do about fixing the problem without having to restore to using the force update method. If a data object property is used in the vue then things will work as expected, it is only when a data object property that indirectly results in a value that is used in a view where there is a situation in which I might have to force update if I can not fine another work around.

```js
var app = new Vue({
        el: '#container',
        template: '<div>' +
            '<h3>total: {{ total }} </h3>' +
            '<p v-for="obj in nums"> n: {{obj.n}} </p>' + 
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
                // no need to fource update
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

I cant help but think that the vue force update method is a duck tape solution for something that should not be happening in the first place. I am not sure if changing the state of the vue data object in the updated life cycle hook is a bad practice or not. In any case I think I should be able to if I want to, it is just that does seems to be the source of the problem here.

For this example at least it would say that I do not have to tabulate the number values in the array in the updated hook, and only in the updated hook. I can just pull that logic into the tick method, or a new method of its own in an effort to keep things more fine grain.

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

The use of the force update method seems to center around the use of nested objects in the vue data object. When I add, remove, or change the state of a nested object it does not always trip and update. However often there may be a solution to the problem that will not require the use of the force update method, and more often than not I think that is the direction that I should go in.

## 2 - Conclusion

The force update method will often work okay in most situations where my vue is not updating when a value in the data object is not changing. However even if it works the use of it still strikes me as a quick temporary solution to a problem that should really be addressed with some major refactoring of code. So then when I do fine myself using the force update method I should take a deeper look at what it is that I am doing and why it is that I have to resort to using the force updated method to begin with.

