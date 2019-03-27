---
title: javaScript callbacks and more
date: 2019-03-25 13:36:00
tags: [js]
layout: post
categories: js
id: 406
updated: 2019-03-26 20:20:36
version: 1.3
---

In [javaScript callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) are often used as a way to define some logic that is to execute later on. They are often used with, or as a replacement for other options such as promises. In many javaScript projects, code examples, and so forth chances are you will be encountering at least one or tow callbacks now and then so it is important to know a thing or two about them.

<!-- more -->


## 1 - javaScript callback basics

```js
var delay = function (delay, cb) {
    delay = delay === undefined ? 0 : delay;
    cb = cb === undefined ? function () {}: cb;
    return setTimeout(cb, delay);
};
 
// 'no delay logs first'
delay(1000, function(){
    console.log('delay');
});
console.log('no delay')

```
