---
title: The Node URL Module for working with URLS in nodejs
date: 2019-08-12 16:26:00
tags: [js,node.js]
layout: post
categories: node.js
id: 520
updated: 2019-08-18 13:58:02
version: 1.2
---

In node js there is the path module that is there for working with file system paths, but there is also the [node url](https://nodejs.org/api/url.html) module as well for working for web adders urls.

<!-- more -->


## 1 - The node url resolve method

Just like with path.resolve there is also a node resolve method that can be used it more or less the same way. I just have to give a base url as the first argument, and then the rest of the desired url as the second argument.

```js
let url = require('url');
 
let base = 'https://nodejs.org/docs/';
 
let v = 8,
urls = [];
while (v <= 12) {
    urls.push(url.resolve(base, 'latest-v' + v + '.x/api/'));
    v += 1;
}
 
console.log(urls);
/*
['https://nodejs.org/docs/latest-v8.x/api/',
'https://nodejs.org/docs/latest-v9.x/api/',
'https://nodejs.org/docs/latest-v10.x/api/',
'https://nodejs.org/docs/latest-v11.x/api/',
'https://nodejs.org/docs/latest-v12.x/api/']
*/
```