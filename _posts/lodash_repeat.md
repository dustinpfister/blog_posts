---
title: lodash repeat method
date: 2019-06-28 19:06:00
tags: [js,lodash]
layout: post
categories: lodash
id: 494
updated: 2019-06-28 19:13:13
version: 1.1
---

This post is on the [lodash repeat](https://lodash.com/docs/4.17.11#repeat) method. The lodash repeat method is just a quick way of repeating a string a few times. This is something that comes up now and then when working with projects, and it is kind of nice to have a quick convenience method in place to save me the trouble of having to do this myself each time. Still it is not to hard to just do this vanilla javaScript style so lets look at more than one solution for this.

<!-- more -->

## 1 -

```js
let _ = require('lodash');
let bil = '1' + _.repeat('0', 9);
console.log(bil); // 1000000000
```

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