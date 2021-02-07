---
title: vue next tick global method and DOM updates
date: 2019-05-23 09:09:00
tags: [vuejs]
layout: post
categories: vuejs
id: 457
updated: 2021-02-07 16:37:39
version: 1.6
---

In vuejs there is the [vue next](https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/) global api method that can come into play now and then when something needs to be done after a view is updated because of a change to the model. So far I can not say that this is a method that I find myself uisng that often, but it is still something that I should be aware of when it comes to creating a project with vuejs as a client side framework.

Vue updates the DOM in a [very async kind of way](https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue), and there might come a time now and then that something might need to happen with the post updated DOM state of the view. For this there is the vue next tick global api method as well as the $nextTick instance methods. these methods can be used to set a callback that will fire when a view has finished updating.

<!-- more -->

## 1 - vue next tick example using the global api

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

## 2 - vue next tick example using the instance method version

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

## 3 - Conclusion

Use of the vue next tick method in actual projects will most likely be rare, but never the less this is just one of many things to be aware of when working with vuejs.
