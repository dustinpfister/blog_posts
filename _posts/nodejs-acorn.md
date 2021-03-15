---
title: The acorn javaScript parser
date: 2018-01-31 14:05:00
tags: [js,node.js]
layout: post
categories: node.js
id: 139
updated: 2021-03-15 16:42:50
version: 1.3
---

For some projects it might be required to parse javaScript, often doing so might be a task that is done my a javaScript engine, but sometimes I might want to parse javaScript with javaScript. A popular and well know project for doing just that is [acorn](https://www.npmjs.com/package/acorn) which is one of many user space nodejs project that can be used for this sort of thing.

<!-- more -->

## 1 - Getting started

When I first started writing this post the latest [version of acorn was 5.3.0](https://github.com/acornjs/acorn/tree/5.3.0), however as of the latest edit of this post there is now an 8.x of this project. So if the code examples I have here break that might be a good reason why. Always check what version is being used, and not just with Acorn, often code breaking changes can be introduced into a project, and this should almost be expected when it is a new major version.


Just like any other node.js project I just created a new folder, did an npm init, and installed the latest version of acorn. 
```
$ mkdir test_acorn
$ cd test_acorn
$ npm init
$ npm install acorn@5.3.0 -- save
$ mkdir demos
```

I then also made a demos folder, and made my first demo called basic.js. It is a usual practice of mine to start out with a demo like that when trying out a project of any kind.

### 1.1 - Basic example of acorn

```js
let acorn = require('acorn'),
 
node = acorn.parse('var n = 42;');
 
console.log(node);
```

When calling this script from the command line I end up getting this:

```
Node {
  type: 'Program',
  start: 0,
  end: 11,
  body:
   [ Node {
       type: 'VariableDeclaration',
       start: 0,
       end: 11,
       declarations: [Array],
       kind: 'var' } ],
  sourceType: 'script' }
```

So acorn will give me an array of objects in a body property that is all the content of my javaScript, broken down into objects that give me useful info like the start, and end character position.