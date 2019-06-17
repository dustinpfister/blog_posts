---
title: vue watch option in vuejs
date: 2019-05-28 10:50:00
tags: [vuejs]
layout: post
categories: vuejs
id: 462
updated: 2019-06-16 21:36:04
version: 1.5
---

Today I started playing around with the [vue watch](https://vuejs.org/v2/guide/computed.html) option that can be used to define some callbacks that fire when a property in the vue data object changes. Watchers can be defined in a number of ways in vuejs, they can just be function expressions, strings that refer to methods in the vue method option, or objects that can have a number of options along with a handler. So lets take a look at some vue watch option examples.

<!-- more -->

## 1 - vue watch basic example that just uses a function for the value

So lets start of with a fairly simple vue watch example that is just a function expression for the value of the key in the watch object for the vue watch option when making a vue class instance.

```js
var vm = new Vue({
        el: '#demo-watch',
        template: '<div><p> ( {{ x }} , {{ y }} )</p>' +
        '<p>{{ mess }}</p></div>',
        data: {
            x: 40,
            y: 2,
            mess: ''
        },
        watch: {
            x: function (newVal, oldVal) {
                //console.log('x changed');
                this.$data.mess = 'x has been changed from ' +
                    oldVal + ' to ' + newVal;
            }
        }
    });
 
// manual change
vm.x =  - 25;
```

In the html of this example I am of course linking to vuejs, and the external javaScript of the example above.

```html
<html>
  <head>
    <title>vue watch example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-watch"></div>
  <script src="./basic_function.js"></script>
  </body>
</html>
```

## 2 - Using a string for a vue watch option property

Another option for a vue watch option object property would be a string. When using this as a value the string should refer to a key in the methods object. The methodid at that key will then be used as the handler for the watcher for the vue data object property that is being watched.

```js
var vm = new Vue({
        el: '#demo-watch',
        template: '<div><p> ( {{ x }} , {{ y }} )</p>' +
        '<ul><li v-for=\"m in mess\" >{{ m }}</li></ul></div>',
        data: {
            x: 40,
            y: 2,
            mess: []
        },
        watch: {
            x: 'xChanged',
            y: 'yChanged'
        },
        methods: {
            xChanged: function (newVal, oldVal) {
                this.$data.mess.push('x has been changed from ' + oldVal + ' to ' + newVal);
            },
            yChanged: function (newVal, oldVal) {
                this.$data.mess.push('y has been changed from ' + oldVal + ' to ' + newVal);
            },
            movePoint: function (dx, dy) {
                this.$data.x += dx;
                this.$data.y += dy;
            }
        }
    });
vm.movePoint(-40, -2);
vm.movePoint(0, 20);
```

## 3 - Objects can be used for a vue watch property value as well

Although it is nice that function expressions and strings can be used as a way to define watchers for a vue watch option, maybe the best way to go about doing so would be to use objects for the values. The reason why I say this is that objects give the best degree of control, be defining more than just a handler for the watcher.

Using an object for the vue watch option is nice because by default a watcher will not fire for any nested property change in the event that the data object property is an object rather than a primitive value.

```js
new Vue({
    el: '#demo-watch',
    template: '<div><p> point: ( {{ point.x }} , {{ point.y }} )</p>' +
    '<p>ticks: {{ ticks }}</p>' +
    '<input type=\"button\" value=\"rand2\" v-on:click=\"rand2\">' +
    '<ul><li v-for=\"m in mess\" >{{ m }}</li></ul></div>',
    data: {
        point: {
            x: 40,
            y: 2
        },
        mess: [],
        ticks: 10
    },
    watch: {
        point: {
            handler: function (newVal, oldVal) {
                this.$data.mess.push('Point change to ( ' + newVal.x + ' , ' + newVal.y + ' )');
            },
            deep: true
        }
    },
    methods: {
        rand1: function () {
            this.$data.point.x = 25 + Math.floor(Math.random() * 75);
            this.$data.point.y = 75;
        },
        rand2: function () {
            this.$data.point.x = 10 + Math.floor(Math.random() * 90);
            this.$data.point.y = 95 + Math.floor(Math.random() * 5);
        },
        tickDown: function () {
            if (this.$data.ticks >= 1) {
                this.rand1();
                setTimeout(this.tickDown, 1000);
                this.$data.ticks -= 1;
            }
        }
    },
    mounted: function () {
        // change manually point
        this.$data.point.x = 0;
        this.$data.point.y = 0;
        // start tick down
        this.tickDown();
    }
});
```

## 4 - conclusion