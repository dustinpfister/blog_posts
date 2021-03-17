---
title: The current working dir and other dirs of interest in Nodejs with Process.cwd()
date: 2021-03-17 12:34:00
tags: [node.js]
layout: post
categories: node.js
id: 825
updated: 2021-03-17 12:39:27
version: 1.1
---

One thing that I wish that I got solid early on when I was first starting out with nodejs is how to get the current working directoy, and also how to always get the directory where a script is located, along with oter typical paths of interest on a system.

<!-- more -->

## 1 -

```js
console.log( process.cwd() );
```

## 2 -

```js
console.log( process.cwd() );
console.log( __dirname );
```

## 3 -

```js
let os = require('os');
 
console.log( process.cwd() );
console.log( __dirname );
console.log( os.homedir() );
```

## 4 -

```js
let path = require('path');
let fooMod = require(path.resolve(__dirname, 'lib/foo.js'));
let os = require('os');
let f = fooMod();
 
console.log( process.cwd() );
console.log( __dirname );
console.log( os.homedir() );
console.log( f.dirname );
console.log( f.mess );
```

## 5 - Conclusion

