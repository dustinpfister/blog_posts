---
title: vue error handlers
date: 2019-05-27 18:12:00
tags: [vuejs]
layout: post
categories: vuejs
id: 461
updated: 2019-05-27 18:18:57
version: 1.1
---

In todays post I will be writing about some quick example that have to do with vue error handers.

<!-- more -->

## 1 - vue error handler at global config

```js
Vue.config.errorHandler = function (err, vm, info) {
 
    console.log('');
    console.log('ERROR:');
    console.log(err.message);
    console.log('');

};
 
Vue.component('point', {
    props: ['point'],
    template: '<div>x: {{ point.x }} y: {{ point.deltas.x }}</div>',
});
 
new Vue({
    el: '#demo-error',
    template: '<div><p is="point" v-for="point in points" :point="point"></p></div>',
    data: {
        points: [ 
        {x:40,y:5,deltas:{x:0,y:0}},
        {x:5,y:32,deltas:{x:1,y:2}},
        {x:40,y:5}]
    },
});
```