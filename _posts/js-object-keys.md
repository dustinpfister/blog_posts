---
title: Object keys in javaScript
date: 2018-12-15 11:31:00
tags: [js]
layout: post
categories: js
id: 349
updated: 2018-12-20 18:16:18
version: 1.4
---

Object keys in javaScript are the property names of an object that correspond with a value that can be a primitive, or another nested object of one kind or another. There are a few things to know about object keys in javaScript, such as how to get an array of public key names, how to create and get hidden key names, and also the work with inherited keys as well. 

So in this post I will be writing about the basics, and also maybe some of the not so basic things to know about with object keys in javaScript. This includes the [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method as well as other [object prototype methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) like [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames).

<!-- more -->

## 1 - Object.keys method

The Object.keys method can be used to get the objects own key names.

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

### 2 - Using a for in loop

```js
var keys = [],
k;
 
for(k in obj){
 
    keys.push(k);
 
}
```

### 3 - Using Object.getOwnPropertyNames to get non enumerable own property object keys as well

```js
var point = {
    x: 15,
    y: 25
};
 
Object.defineProperty(point, 'color', {
    value: '#ff0000',
    writable: false,
    enumerable: false
});
 
console.log(Object.keys(point)); // ["x","y"]
console.log(Object.getOwnPropertyNames(point)); // ["x", "y", "color"]
```