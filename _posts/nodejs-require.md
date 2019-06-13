---
title: Nodejs require for importing modules and more
date: 2019-06-13 15:04:00
tags: [js,node.js]
layout: post
categories: node.js
id: 478
updated: 2019-06-13 15:11:53
version: 1.2
---

In nodejs the [require global](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_require) is something that will end up being used often in projects as a way to make use of built in as well as custom made nodejs modules. There is more to it then just a way to load modules though, it can also be used as a way to load json files and other assets, so lets take a look at some nodejs require examples today.

<!-- more -->

## 1 - nodejs require can be used for loading built in modules

```js
let os = require('os');
console.log(os.platform());
```

## 2 - nodejs require can also be used to load custom modules

```js
let api = function (a, b) {
    return a + b;
};
api.myFunc = api;
module.exports = api
```

```js
let mm = require('./mymod.js');
console.log( mm(5,1) ); // 6
console.log( mm.myFunc(5,1) ); // 6
```

## 3 - require can also be used to load json

```js
{
    "foo": "bar"
}
```

```js
let json = require('./foo.json');
console.log(json.foo); // 'bar'
```