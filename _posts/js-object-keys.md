---
title: Object keys in javaScript
date: 2018-12-15 11:31:00
tags: [js]
layout: post
categories: js
id: 349
updated: 2018-12-17 13:42:45
version: 1.1
---

Object keys in javaScript are the property names of an object that correspond with a value that can be a primitive, or another nested object of one kind or another. There are a few things to know about object keys in javaScript, such as how to get an array of public key names, how to create and get hidden key names, and also the work with inherited keys as well. So in this post I will be writing about the basics, and also maybe some of the not so basic things to know about with object keys in javaScript.

<!-- more -->

## 1 - Get an Array of Object keys

### 1.1 - Using Object.keys to enumerable object keys

```js
var obj = {
   x: 0,
   y: 35,
   attack: 12,
   hp : {
      current: 47,
      max: 50
   }
};
 
var keys = Object.keys(obj);
 
console.log(keys); // ["x", "y", "attack", "hp"]
```

### 1.2 - Using a for in loop

```js
var keys = [],
k;
 
for(k in obj){
 
    keys.push(k);
 
}
```