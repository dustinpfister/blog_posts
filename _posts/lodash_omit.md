---
title: lodash omit method for omitting properties from an object
date: 2019-08-19 16:10:00
tags: [js,lodash]
layout: post
categories: lodash
id: 525
updated: 2019-08-19 16:18:58
version: 1.3
---

The [lodash omit](https://lodash.com/docs/4.17.15#omit) method can be used to create a new object by omitting properties from an existing object that is give as the first argument. This method is like the lodash pick method only it creates a new object by omitting properties that are not wanted rather than picking properties that are wanted.

<!-- more -->

## 1 - lodash omit basic example

For a Basic example of the lodash omit method I have an example here where I use the lodash omit method to create a new object from an object that has and z,y,z, and index values. The new Object just has an x, and y values because I use the lodash omit method to omit all the other properties by giving an array of property names that I do not want as the second argument when using the method.
```js
let obj = {
    index: 0,
    x: 5,
    y: 12,
    z: 3
};
 
console.log(_.omit(obj, ['index', 'z']));
// { x: 5, y: 12 }
```
