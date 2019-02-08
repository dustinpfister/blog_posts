---
title: Javascript new operator examples
date: 2019-02-08 14:15:00
tags: [js]
layout: post
categories: js
id: 373
updated: 2019-02-08 14:24:00
version: 1.1
---

The javaScript new operator is something that will come up in the occasional code example here and there, knowing what it does, and being aware of the many other subjects that branch off from it is a must for any javaScript developer. In this post I will be touching base with some examples that make use of the new operator, and some related subjects to the use of the new operator.

<!-- more -->

## 1 - javaScript new operator a basic example.

The new operator is used in conjunction with a constructor function to create an instance of that constructor function. There are many such constructor functions built into core javaScript itself such as the Date constructor that can be used to create an instance of a javaScript Date Object.

```js
let d = new Date(2017,3,6,10,5);
 
console.log( d.getDate() ); // 6
```

In this example the d variable is an instance of Date that was created using the new operator with the Date constructor function. Once I have my instance of Date I can use any of the prototype methods of the Date constructor, as well as any additional methods that may be in the prototype chain as well, such as Date.getDate