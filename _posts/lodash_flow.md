---
title: Using _.flow as a way to chain methods with lodash, and javaScript
date: 2018-11-19 16:34:00
tags: [js,lodash]
layout: post
categories: lodash
id: 333
updated: 2018-11-23 10:02:09
version: 1.1
---

These days I have been doing more reading on lodash and have found that I have not yet wrote a post on [\_.flow](https://lodash.com/docs/4.17.4#flow) which can be used as a way to make a new function that is actually a bunch of functions that work together. There are many ways to go about chaining methods together with just plain old javaScript by itself as well though so I will be writing about vanilla js examples as well, but mainly this post is about \_.flow.

<!-- more -->

## 2 - \_.flow example involving a distance formula

The distance formula came to mind when thinking of a quick example of using flow. This might not be the best example of using \_.flow, as the formal is simple enough where it could just be expressed in a single line. Never the less if you do not hve much experence with \_.flow this simple example should help give you the basic idea of why \_.flow can be useful.

### 2.1 - The vanilla js distance formula

```js
let distance = function (x1, y1, x2, y2) {
    return Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
};
 
console.log(distance(10, 15, 90, 22)); // 80
```

### 2.2 - Using \_.flow to break things down

```js
let forA = function (a1, a2) {
    return Math.pow(a1 - a2, 2);
};
 
let dist = _.flow([
   function (x1, y1, x2, y2) {
       return forA(x1, x2) + forA(y1, y2)
   },
   Math.sqrt,
   Math.round
]);
 
console.log(dist(10, 15, 90, 22)); // 80
```