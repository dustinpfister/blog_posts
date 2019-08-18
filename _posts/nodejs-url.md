---
title: The Node URL Module for working with URLS in nodejs
date: 2019-08-12 16:26:00
tags: [js,node.js]
layout: post
categories: node.js
id: 520
updated: 2019-08-18 14:51:29
version: 1.4
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

## 2 - The node url format method

The node url format method can be used to create a url from an object

```js
let url = require('url');
 
let page = url.format({
        protocol: 'https',
        hostname: 'en.wikipedia.org',
        pathname: 'wiki/Node.js',
        hash: 'Overview'
    });

console.log(page);
// https://en.wikipedia.org/wiki/Node.js#Overview
```

## 3 - The URL constructor

The module returns a constructor function that can be used to create an object from a given URL. This object contains properties for all the various parts of a url that it might have including the port number, path, the query string and more.

```js
let url = require('url');
 
let page = new url.URL('http://myname:1234@localhost:8080/edit/posts?k=foobar#text');
 
console.log(page.origin);
// http://localhost:8080
console.log(page.protocol);
// http:
console.log(page.username);
// myname
console.log(page.password);
// 1234
console.log(page.host);
// localhost:8080
console.log(page.hostname);
// localhost
console.log(page.port);
// 8080
console.log(page.pathname);
// /edit/posts
console.log(page.search);
// ?k=foobar
console.log(page.hash);
// #text
console.log(page.href);
// http://myname:1234@localhost:8080/edit/posts?k=foobar#text
console.log(page.toString());
//http://myname:1234@localhost:8080/edit/posts?k=foobar#text
```