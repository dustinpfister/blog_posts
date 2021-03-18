---
title: Using process.stdout in place of console.log
date: 2021-03-18 13:42:00
tags: [node.js]
layout: post
categories: node.js
id: 826
updated: 2021-03-18 15:15:38
version: 1.1
---

In some cases I might want to use process.stdout in place of console.log when working out a nodejs script. The console.log method works just fine for most typical user case examples, however it does append a line feed at the end of the output each time. Often this might be what I want to happen, however when it comes to having better control over the standard output of a script the write method of the strout stream in the process global is how to go about doing so.

<!-- more -->


## 1 - console.log and process.stdout

```js
console.log( 'Hello World' );
 
process.stdout.write('Hello World');
```