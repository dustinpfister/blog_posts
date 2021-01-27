---
title: vue mounted lifecycle hook
date: 2019-05-25 20:38:00
tags: [vuejs]
layout: post
categories: vuejs
id: 459
updated: 2021-01-27 15:46:28
version: 1.12
---

The [vue mounted lifecycle hook](https://v3.vuejs.org/api/options-lifecycle-hooks.html#mounted) is a way to define some logic that will run when a vue instance is mounted to a mount point in html with the vue el option or the $mount method. The vue mounted hook is one of several such hooks when working with vue class instances. This is then a hook that is fired after the create hook, and before additional hooks that will fire at end of life states for the vue instance. So then the mount hook strikes me as a decent hook to place code that I want to fire once, and at a state when both the data object, and the template are there to work with.

<!-- more -->

## 1 - Vue Mounted hook and the vue el option

Here I have a basic example of the vue mounted lifecycle hook in vuejs. This hook is fired after the before create, and created hooks when the vue instance is mounted to the html document. The Vue instance can be mounted to the html with the $mount instance method, or via the vue el option such as in this example.

here is the javaScript

```js
new Vue({
    el: '#demo-lifecycle-mounted',
    template: '<p>n: {{ n }}</p>',
    data: {
        n: 4
    },
    // mounted lifecycle hook
    mounted: function () {
        console.log(this.$el.textContent); // n: 4
    }
});
```

and here is the html

```html
<html>
  <head>
    <title>vue mounted lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-mounted"></div>
  <script src="basic.js"></script>
  </body>
</html>
```

## 2 - Firing the Vue mounted hook with the $mount method

One way to mount a vue instance to html is with the vue el option as I have covered in the first section, but another option is to use the $mount instance method. If the vue el option is not used then the whole lifecycle process will not progress beyond the created hook until the $mount method is used. So then the $mount method can be used as a way to mount the vue instance to html when you want to after some kind of condition is satisfied. In this section I will be going over some basic examples of using the mount vue instance method over the vue option to start a mount life cycle hook.

### 2.1 - basic mount method example

For starters there is just using the mount instance method in place of the vue option. One way is to save an instance of the main vue class to a variable, and then call the mount instance method outside of the vue instance completely.

```html
<html>
  <head>
    <title>vue mounted lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-mounted"></div>
  <script>
var vm = new Vue({
        template: '<p>mess: {{ mess }}</p>',
        data: {
            mess: 'Hello World'
        },
        // mounted lifecycle hook
        mounted: function () {
            console.log(this.$el.textContent); // n: 4
        }
    });
 
// mounting outside of vue instance
// with the $mount method
vm.$mount('#demo-lifecycle-mounted');
 
  </script>
  </body>
</html>
```

In this basic example I am just calling the method right away, so it will not make all that much of a difference compared to just using the vue el option when creating the vue instance. However one thing I could do is define any kind of condition with vanilla javaScript, outside of vuejs, as a condition to call the mount method. Also when it comes to having an instance that is not mounted yet there are additional hooks, such as the create hook, where the mount method could also be called. So maybe we should take a look at just a few more examples here.

### 2.2 - Delay and call later with something like setTimeout

One thing that I can do is just delay the mount process by calling the mount method in the body of a function that I pass to something like the setTimeout method.

```html
<html>
  <head>
    <title>vue mounted lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-mounted"></div>
  <script>
var vm = new Vue({
        template: '<p>n: {{ n }}</p>',
        data: {
            n: 4
        },
        // mounted lifecycle hook
        mounted: function () {
            console.log(this.$el.textContent); // n: 4
        }
    });
// calling mount after a delay
setTimeout(function () {
    vm.$mount('#demo-lifecycle-mounted');
}, 10 * 1000);
  </script>
  </body>
</html>
```

### 2.3 - The created hook

Again if the vue el option is not given, then the mount method must be called one way or another as the alternative way to mount the vue instance, and thus start the mounted life cycle hook. If the mount method is not called one way or another outside of the vue instance then only life cycle hooks up to the created hook will fire. With that said the created hook is then once place to which I could call the mount method, or start some kind of thread that will keep testing for a condition that is to be made before the vue will mount.

```html
<html>
  <head>
    <title>vue mounted lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-mounted"></div>
  <script>
new Vue({
    template: '<p>mess: {{ mess }}</p>',
    data: {
        mess: 'Hello'
    },
    created: function(){
        // calling mount in the create hook
        this.$mount('#demo-lifecycle-mounted');
    },
    // mounted lifecycle hook
    mounted: function () {
        this.$el.textContent += ' World.';
    }
});
  </script>
  </body>
</html>
```

There are a number of other hooks, but for the most part thus far I find myself just using created, and mounted hooks.


## 3 - Conclusion

So that is it for now when it comes to the mounted lifecycle hook of a vuejs instance. There are a number of other hooks to chose from though that might prove to be a better choice then others in come cases. If for example I want some code to run when the data object is there to work with, but the template is not yet mounted then I might want to use the created hook.
