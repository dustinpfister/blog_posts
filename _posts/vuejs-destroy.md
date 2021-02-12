---
title: vue destroy
date: 2019-06-01 11:22:00
tags: [vuejs]
layout: post
categories: vuejs
id: 469
updated: 2021-02-12 11:44:15
version: 1.8
---

The [vue destroy](https://vuejs.org/v2/api/#vm-destroy) instance method can be used to destroy a vue class instance in vuejs. This might not always work out as expected when you think of what might happen when calling a method called destroy, but it will to some extent do just that as the name would sugest.

I think that the vue destroy method should generaly not be used, unless I am in a situation in which it would seem that I have to use it which might come up now and then in future projects. I often like to create client systems with a fixed set of resources and then just result thouse resources over and over again. For example there is having an array and then pushing objects into that array, and purging them out as needed. However I prefer to have a set array of objects, and then have an active property for each object. With that said often I think that I should try using directives like v-if, and f-for before looking into using the vue destroy method.

This vue instance method will trigger the before destroy and destroyed lifecycle hooks when called bring about the end of a vue instance lifecycle.


<!-- more -->

## 1 - vue destroy method basic example

Here I have a basic example of the vue destroy method in action. When this example is up and running a step button can be clicked until the kill button is clicked and calls the vue destroy method. Once this happens as expected the click method will no longer work, however the button itself as well as the current count before it is destroyed will remain.

```html
<html>
  <head>
    <title>vue destroy example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-destroy"></div>
  <script>
var vm = new Vue({
        el: '#demo-destroy',
        template: '<div>' +
        '<input type="button" v-on:click="step" value="step"> | ' +
        '<input type="button" v-on:click="kill" value="kill">' +
        '<p>i:{{i}}</p>' +
        '</div>',
        data: {
            i: 0
        },
        methods: {
            step: function () {
                this.$data.i += 1;
            },
            // kill this instance
            kill: function(){
                this.$destroy();
            }
        }
    });
  </script>
  </body>
</html>
```

So the destroy method will do several things that can be thought of as destroying a vuejs instance, but the use of it alone will not do everything that you might exspect.

## 2 - The before destroy and destroyed Hooks

When a vue instance is destroyed the html for that vue instance will still be there. So there should be at least one additional step to be made when destroying a vue instnace and that is changing or removing any html for the instnace. One place to do this, and any additional things that should be done would be in the before destroy and destroyed life cycle hooks.

```html
<html>
  <head>
    <title>vue destroy example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-destroy"></div>
  <script>
var vm = new Vue({
        el: '#demo-destroy',
        template: '<div>' +
            '<input type="button" v-on:click="step" value="step"> | ' +
            '<input type="button" v-on:click="kill" value="kill">' +
        '<p>i:{{i}}</p>' +
        '</div>',
        data: {
            i: 0
        },
        beforeDestroy: function(){
            console.log('almost done');
        },
        destroyed: function(){
            console.log('done');
            this.$el.innerHTML = '<p>done</p>';
        },
        methods: {
            step: function () {
                this.$data.i += 1;
            },
            // kill this instance
            kill: function(){
                this.$destroy();
            }
        }
    });
  </script>
  </body>
</html>
```

## 3 - Conclusion

So far I can not say that I use the destroy method in projects as I often just reuse the same stack of resources over and over again rather than creating and destroying as needed.
