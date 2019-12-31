---
title: node util inspect object method and other options for converting an object to a string.
date: 2019-12-30 19:43:00
tags: [node.js]
layout: post
categories: node.js
id: 586
updated: 2019-12-31 14:31:29
version: 1.2
---

When making a nodejs project or any javaScript project for that matter there comes a time now and then to convert an object to a string representation of that object. In nodejs there is the [node inspect](https://nodejs.org/en/knowledge/getting-started/how-to-use-util-inspect/) method in the core nodejs util module, there are other ways of doing so such as using the JSON stringify method.

<!-- more -->

## 1 - Util inspect method

For a basic example of the node util inspect object method here I have just a plain old object literal that I am passing to the util inspect method. The returned result is then as expected, a string representation of the object.

```js
let obj = {
    x: 42,
    y: 30
};

let str = util.inspect(obj);
console.log(typeof str); // string
console.log(str); // { x: 42, y: 30 }
```