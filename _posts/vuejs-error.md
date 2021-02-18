---
title: vue error handlers
date: 2019-05-27 18:12:00
tags: [vuejs]
layout: post
categories: vuejs
id: 461
updated: 2021-02-18 13:16:17
version: 1.15
---

In todays post I will be writing about some quick examples that have to do with [vue error](https://vuejs.org/v2/api/#errorHandler) handers. A main global error handler can be set at the global config object of the Vue global, however these kinds of errors can only catch rendering errors, so there is a need to also use plain old native javaScript as a way to catch errors in general also. So this post will be on handling Errors in vuejs, but I think I should also touch base on the subject in general with native javaScript also while I am at it. So this post will be on error handing in general with it comes to making a client side javaScript project not just with vuejs alone.

<!-- more -->

## 1 - vue error handler at global config

A global error handler can be set up in the config object of the main Vue global. These kinds of error handlers will work for some errors that happen in rendering and in watchers. However they might fall sort when it comes to other kinds of errors that might happen so it may not be a replacement for having a main error handler for the page as a whole when it comes to vanilla javaScript.

So a global error handler can be set up for vuejs like so.

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

## 3 - Setting a Vanilla JavaScript Global Error Handler

There is working with the config object in vuejs as a way to set up some error handlers. However doing so might still not be a replacement for everything that can go wrong on the front end. So not just with vuejs, but with javaScript in general it might be a good idea to get into the habit of having a global error handler in just plain old vanilla javaScript itself.

```html
<html>
  <head>
    <title>vue error example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo-error"></div>
    <script>
window.addEventListener('error', function (e) {
    var err = this.error;
    var out = document.getElementById('demo-error');
    out.innerText = e.message;
});
// trowning an error
throw new Error('My error');
// Uncaught Error: My error
    </script>
  </body>
</html>
```

There is using the throw statement as a way to simulate an Error when doing so it would be best to pass an Error object as a value after the keyword. This Error object follows a certain format, but at a minimum it should at least have a message property. Using the javaScript built in Error constructor is a way to make a generic Error object and the message value can be passed as the first argument when using this constructor.

## 4 - Conclusion

When I start to work on a real vuejs example there are going to be times where I am going to want to work out some kind of error handling system. Things do not always work they way that they should, also often things do work they way that they should but a user may not know how to use what I have made. In any case there should be some kind of system in place to let a user know what went wrong if something did in fact go wrong.
