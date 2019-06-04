---
title: vue error handlers
date: 2019-05-27 18:12:00
tags: [vuejs]
layout: post
categories: vuejs
id: 461
updated: 2019-06-03 20:48:38
version: 1.6
---

In todays post I will be writing about some quick examples that have to do with [vue error](https://vuejs.org/v2/api/#errorHandler) handers. A main global error handler can be set at the global config object of the Vue global. However these kinds of errors can only catch rendering errors, so there is a need to also use plain old native javaScript as a way to catch errors in general.

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

## 2 - Handle all errors in the page

Although the error handlers in vuejs will work okay with some errors that happen during rendering they will not work for errors in general within the vuejs instance or in the page in general. To handle all errors in the page you will want to attach an event to the window object.

```js
var vmError = new Vue({
        el: '#demo-error',
        template: '<div>' +
        '<span>Error: {{ error.mess }}</span></br>' +
        '<span>Source: {{ error.source }}</span></br>' +
        '<span>line,col: {{ error.line }} , {{ error.col }}</span></br>' +
        '</div>',
        data: {
            error: {
                mess: '',
                source: '',
                line: '',
                col: ''
            }
        },
        methods: {
            onError: function (mess, source, line, col) {
                var err = this.error;
                err.mess = mess;
                err.source = source;
                err.line = line;
                err.col = col;
            }
        }
    });
window.onerror = vmError.onError;
// trowning an error
throw new Error('My error');
```