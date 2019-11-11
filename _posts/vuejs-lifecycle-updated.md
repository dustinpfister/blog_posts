---
title: vue updated lifecycle hook
date: 2019-11-11 15:21:00
tags: [vuejs]
layout: post
categories: vuejs
id: 560
updated: 2019-11-11 15:30:10
version: 1.1
---

The vue update life cycle hook is one of several hooks that can be used to define logic that is to be executed at various stages of the vue instance life cycle. The vue update hook will fire after the before update hook when a reactive property data state of the vue instance has changed, or the force update method is called.

<!-- more -->


## 1 - vue updated array example

```html
<html>
  <head>
    <title>vue updated lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script src="array.js"></script>
  </body>
</html>
```

```js
var app = new Vue({
        el: '#demo',
        template: '<div>' +
        '<p>money: {{ money }}</p>' +
        '<p> ticks: {{ ticks }} works: {{ works }} </p>' +
        '<input type="button" value="work" v-on:click="work" >' +
        '</div>',
        data: {
            money: 0,
            ticks: 0,
            works: 0,
            log: []
        },
        // what to do on an update
        updated: function () {
            var data = this.$data;
            console.log('update')
            if (data.log.length === 1) {
                data.money += data.log[0].money;
                data[data.log[0].type] += 1;
            }
            if (data.log.length > 1) {
                data.money += data.log.reduce(function (acc, obj) {
                    acc = typeof acc === 'object' ? Number(acc.money) : acc;
                    return acc + Number(obj.money);
                });
                data.log.forEach(function (obj) {
                    data[obj.type] += 1;
                });
            }
            if (data.log.length >= 1) {
                data.log = [];
            }
        },
        methods: {
            tick: function () {
                var obj = {
                    type: 'ticks',
                    money: 1
                };
                this.$data.log.push(obj);
                this.$forceUpdate();
            },
            work: function () {
                var obj = {
                    type: 'works',
                    money: 25
                };
                this.$data.log.push(obj);
            }
        }
    });
 
setInterval(function () {
    app.tick();
}, 1000);
```