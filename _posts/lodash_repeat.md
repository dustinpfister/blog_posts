---
title: lodash repeat method
date: 2019-06-28 19:06:00
tags: [js,lodash]
layout: post
categories: lodash
id: 494
updated: 2019-06-28 19:19:10
version: 1.3
---

This post is on the [lodash repeat](https://lodash.com/docs/4.17.11#repeat) method. The lodash repeat method is just a quick way of repeating a string a few times. This is something that comes up now and then when working with projects, and it is kind of nice to have a quick convenience method in place to save me the trouble of having to do this myself each time. Still it is not to hard to just do this vanilla javaScript style so lets look at more than one solution for this.

<!-- more -->

## 1 - lodash repeat basic example

So say I want to create a string that is a single string repeated a few times. For example I want to have a string that is a one with a whole bunch of zeros after it. I can use the lodash repeat method as a way to do just that. Just call the lodash repeat method and pass the string 0 as the first argument followed by the number of zeros I want after the string.

```js
let _ = require('lodash');
let bil = '1' + _.repeat('0', 9);
console.log(bil); // 1000000000
```

Simple enough, but how hard is it to just do this with plain old vanilla javaScript? not so hard, so lets look at some vanilla javaScript examples that do the same thing. Also lets explore some other topics as well such as how to go about doing the same thing only with arrays and objects.

## 2 -

```js
let repeat = (str, c) => {
    str = str || '0';
    c = c || 1;
    let i = c,
    result = '';
    while (i--) {
        result += str;
    }
    return result;
}
 
let bil = '1' + repeat('0', 9);
console.log(bil); // 1000000000
```