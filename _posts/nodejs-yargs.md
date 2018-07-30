---
title: The yargs option parser for node.js
date: 2018-07-24 19:53:00
tags: [js,node.js]
layout: post
categories: node.js
id: 241
updated: 2018-07-30 18:25:26
version: 1.1
---

So this week I have been looking into option parsers, for the sake of expanding my horizons when it comes to what the options are for parsing options. I have writing a [post on nopt](/2017/05/05/nodejs-nopt/) a long time ago, which was one of the first option parsers I have dealt with. It works fine, but so far I think I am liking [commander](/2018/07/10/nodejs-commander/) the best. However this post is about another popular option parser for node.js called [yargs](https://www.npmjs.com/package/yargs).

<!-- more -->


## 2 - Some basic examples of yargs

When making on of my posts on an npm package I start out with simple examples, then I might progress into some more advanced stuff from there. When it comes to an option parser at a minimum I would want to know how to define one or more options, and then I would want to also know how to set some defaults for them as well.


## 2.1 - just a single boolean option,

```js
console.log(require('yargs').argv.basic);
```

```
$ node basic --basic
true
$ node basic --no-basic
false
```

