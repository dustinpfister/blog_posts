---
title: vue next tick global method and DOM updates
date: 2019-05-23 09:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 457
updated: 2021-02-08 18:15:43
version: 1.12
---

In vuejs there is the [vue next tick](https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/) global api method that can come into play now and then when something needs to be done after a view is updated because of a change to the model. So far I can not say that this is a method that I find myself using that often, but it is still something that I should be aware of when it comes to creating a project with vuejs as a client side framework.

Vue updates the DOM in a [very async kind of way](https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue), and there might come a time now and then that something might need to happen with the post updated DOM state of the view. For this there is the vue next tick global API method as well as the $nextTick instance methods. These methods can be used to set a callback that will fire when a view has finished updating. There are also a number of other vuejs features that one should be aware of when it comes to life cycle hooks that can also often be used as a way to define logic that is to fire before and after the dom is updated to a current state of the data object.

<!-- more -->

## 1 - Basic example of the Vue.nextTick global method

So for now how about a simple example of the Vue.nextTick global api method as a way to just know what the next tick method is all about. When I change a value in the data object the corresponding value in the dom will not update just there and then. It will be updated on the next update tick. If for some reason I need to get at the value in dom right away that will result in a problem because at that very moment it will still be the old value. 

Now maybe the best thing to do is to not be in this situation to begin with, because any value in the dom should just be a display value that might not always be up to date to the very moment. However if I do need to get at that updated value in the dom, then I will want to do so at a later point when it is up to date, and one way to do so would be to use the Vue.nextTick method.

```html
<html>
  <head>
    <title>vue next tick example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-nexttick"></div>
  <script>
var vm = new Vue({
        el: '#demo-nexttick',
        template: '<p>{{ radian }}</p>',
        data: {
            radian: Math.PI / 180 * 45
        }
    });
// the value of the textContent will still be the old
// value when I set radian to 0
vm.radian = 0;
console.log(Number(vm.$el.textContent).toFixed(2)); // 0.79
// I can however use Vue.nextTick as a way to take a look
// after the next text is done, at which point the textContent
// is now the new value
Vue.nextTick(function () {
    console.log(Number(vm.$el.textContent).toFixed(2)); // 0.00
});
  </script>
  </body>
</html>
```

## 2 - Updated and mounted lifecycle hooks

In many cases I will not need to bother with the next tick method. In fact if I am using it I often think that is a sign that I am doing something wrong. There are the life cycle hooks that I always use before bothering with something such as the next tick method. life cycle hooks are a way to define some javaScript code that I want to run at certain points in the life cycle of a vue instance such as when the data object is there but the dom of the instance is not yet mounted, and also each time that the data object is updated.

The mounted hook will fire once when the data object, and the html dom are ready to work with. The update hook will fire each time that the data object is updated, and the corresponding dom is up to date with that value as well. If for some reason I need to do something with an up to date data object value, but before the dom is updated, then there is the before update hook. So most of the time I can do everything that I want to do with data object values and the dom with just hooks, and there is almost never a need to delay something until the next update tick.

```html
<html>
  <head>
    <title>vue next tick example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
var vm = new Vue({
        el: '#demo',
        template: '<p>{{ degree }}</p>',
        data: {
            degree: 45
        },
        mounted: function(){
            console.log(this.degree); // 45
            console.log(this.$el.textContent); // 45
        },
        beforeUpdate: function(){
            console.log(this.degree); // 0
            console.log(this.$el.textContent); // 45
        },
        updated: function(){
            console.log(this.degree); // 0
            console.log(this.$el.textContent); // 0
        }
    });
vm.degree = 0;
  </script>
  </body>
</html>
```

## 3 - Vue next tick example using the global API method

So for my first example of the vue next tick global method I wanted to do something a little more advanced then the very simple examples that I often make for these posts. In any example about vue next tick I will at least want a data object, and some kind of template or hard coded html. However in this example I am also using a method defined in the vue methods option as well.

Anyway when I change the value of a property in the data object of the vue class instance the view does not update the very instance after the fact, and the inner text of the view will still retain the old state of the model. If for some reason this presents a problem, the Global Vue.nextTick method can be used to set a callback that will fire when the view has finished updating to the new model state.

```js
var vm = new Vue({
        el: '#demo-nexttick',
        template: '<p>{{ figX() }}</p>',
        data: {
            radian: Math.PI / 4,
            radius: 25,
            offX: 0
        },
        methods: {
            figX: function () {
                return Number(Math.cos(this.radian) * this.radius + this.offX).toFixed(2);
            }
        }
    });
 
vm.radian = 0;
console.log(vm.$el.textContent); // 17.68
 
Vue.nextTick(function () {
    console.log(vm.$el.textContent); // 25
});
```

```html
<html>
  <head>
    <title>vue next tick example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-nexttick"></div>
  <script src="basic.js"></script>
  </body>
</html>
```

## 4 - vue next tick example using the instance method version

It is also possible to use a instance method example of the next tick method. This is more or less the same thing as the global static method, but will only fire for updates to a single vue class instance that it is used for.

```js
var vm = new Vue({
        el: '#demo-nexttick',
        template: '<p>{{ mess }}</p>',
        data: {
            mess: 'bar'
        },
        methods: {
            setMess: function (mess) {
                var self = this;
                self.mess = mess;
                // The $nextTick instance method can
                // also be used
                self.$nextTick(function () {
                    console.log(self.$el.textContent); // 'foo'
                });
            }
        }
    });
vm.setMess('foo');
```

## 5 - Conclusion

Use of the vue next tick method in actual projects will most likely be rare, but never the less this is just one of many things to be aware of when working with vuejs. I pretty much never use the next tick method, and if I do I often stop to think about what I am doing and how I can go about doing what I want to do without using next tick. The method is not a replacement for hooks, and it also does not strike me as a way to go about creating an app loop for vuejs project. So this method is a bit of an odd addition to the framework, but maybe it does still have a place for some rare use case examples. So far I can not think of much though.
