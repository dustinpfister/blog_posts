---
title: lodash repeat method
date: 2019-06-28 19:06:00
tags: [js,lodash]
layout: post
categories: lodash
id: 494
updated: 2019-06-28 19:07:39
version: 1.0
---

This post is on the lodash repeat method.

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