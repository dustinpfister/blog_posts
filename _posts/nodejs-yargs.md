---
title: The yargs option parser for node.js
date: 2018-07-24 19:53:00
tags: [js,node.js]
layout: post
categories: node.js
id: 241
updated: 2018-07-30 18:34:28
version: 1.3
---

So this week I have been looking into option parsers, for the sake of expanding my horizons when it comes to what the options are for parsing options. I have writing a [post on nopt](/2017/05/05/nodejs-nopt/) a long time ago, which was one of the first option parsers I have dealt with. It works fine, but so far I think I am liking [commander](/2018/07/10/nodejs-commander/) the best. However this post is about another popular option parser for node.js called [yargs](https://www.npmjs.com/package/yargs).

<!-- more -->

## 1. - What to know

This is a quick post on the [node.js](https://nodejs.org/en/) option parser known as [yargs](https://www.npmjs.com/package/yargs). This is not a getting started post on node.js in general, or any additional skills that are required before hand. However if you are someone that has at least some background with node.js, and javaScript, and are using node.js to make some command line tools then an option parser like yargs might be of interest.

## 2 - Some basic examples of yargs

When making on of my posts on an npm package I start out with simple examples, then I might progress into some more advanced stuff from there. When it comes to an option parser at a minimum I would want to know how to define one or more options, and then I would want to also know how to set some defaults for them as well.

## 2.1 - just a single boolean option.

For starters I made a basic.js file where I just log to the console the value of a single option that I have called basic. When options are parsed with yargs they will be a value of the argv object when bringing yargs into a project with require.

```js
console.log(require('yargs').argv.basic);
```

So when I call my basic.js file from the command line with node it works as exspected. When I give the basic option the value is true, and if I give a no-basic option then it has a value of false.

```
$ node basic --basic
true
$ node basic --no-basic
false
```

