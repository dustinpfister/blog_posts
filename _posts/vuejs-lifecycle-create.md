---
title: vue created lifecycle hook
date: 2019-05-24 10:23:00
tags: [vuejs]
layout: post
categories: vuejs
id: 458
updated: 2021-02-08 13:06:26
version: 1.9
---

In vuejs there is the [vue created](https://vuejs.org/v2/api/#created) lifecycle hook method that can be used to define some logic that should run after the vue instance is created, but before the vue is mounted to a mount point in html via the vue el option or the mount instance method. 

This created option of life cycle hook if you prefer is one of many hook methods that can be used when creating a vue instance to define some logic that will happen at the various statges of the [vue instance lifecycle](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks). There is another hook that can be used to do something before even the data object is there to work with, and there is also a mounted hook that can be used to define something to do once that data object is there to work with, and the the vue instance is mounted to the hard coded html. There is also an before updated, and updated hooks that wil fire each time a change is made to an observabule property of the data object.

In this post I will be focusing mostly on just the created hook, but I will also be touching base on life cycle hooks in general actually.

<!-- more -->

## 1 - Vue create lifecycle hook basic example

For a basic example of the vue created lifecycle hook here is a quick example that logs the value of a vue data object property, and the current value of the $el property as well. The vue created hook fires after the vue instance is created, so the value in the data object is present at this time. However the value of $el is undefined because the vue instance has not yet been mounted to the html document mount point selected via the vue el option, or the $mount instance method.

```js
new Vue({
    el: '#demo-lifecycle-created',
    template: '<p>n: {{ n }}</p>',
    data: {
        n: 4
    },
    // created lifecycle hook
    created: function () {
        console.log(this.$data.n); // 4
        console.log(this.$el); // undefined
    },
    // mounted lifecycle hook
    mounted: function () {
        console.log(this.$el.textContent); // n: 4
    }
});
```

```html
<html>
  <head>
    <title>vue created lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-created"></div>
  <script src="basic.js"></script>
  </body>
</html>
```

## 2 - Vue created is called synchronously

The vue created hook is called synchronously so anything that might envolve heavy listing that is not delayed some how will delay the lifecycle from preceding to the mount hook.

```js
new Vue({
    template: '<p>time: {{ time }}</p>',
    el: '#demo-lifecycle-created',
    data: {
        st: 0,
        time: 0
    },
    // vue create is called synchronously
    created: function () {
        // so this will delay the mount hook
        var i = Math.pow(10, 9),
        st = Date.now();
        while (i--) {};
        this.$data.time = Date.now() - st;
    },
    mounted: function () {
        console.log('mounted');
    }
});
```

## 3 -Vue el, vue $mount, and the vue create hook

If the vue el option is not used when creating the vue instance then the lifecyle process will come to a halt after the created hook until the $mount method is used to mount the instance to a mount point in the html document. So then the created hook is the last hook that will fire until the mounted method is used, at which point the life cycle of the instance will progress the the mounted hook.

```js
var vm = new Vue({
        template: '<p>time: {{ time }}</p>',
        data: {
            st: 0,
            time: 0
        },
        // created lifecycle hook
        created: function () {
            // called right away
            console.log('created');
            this.$data.st = Date.now();
        },
        // mounted lifecycle hook
        mounted: function () {
            // called after $mount because no
            // el option is given
            console.log('mounted');
            this.$data.time = Date.now() - this.$data.st;
        }
    });
 
setTimeout(function () {
    vm.$mount('#demo-lifecycle-created')
}, 2500);
```

## 4 - Conclusion

The created lifecycle hook is fired after the vue instance is created, but before the instance is mounted to the hard coded html. Often I find myself using the mounted lifecycle hook so that I have everything to work with when it comes to doing something for the first time such as calling a draw method for a canvas element or something to that effect. Still the created hook is there for when I want to do something with the data object before the instance is mounted to html.
