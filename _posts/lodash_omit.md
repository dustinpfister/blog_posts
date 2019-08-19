---
title: lodash omit method for omitting properties from an object
date: 2019-08-19 16:10:00
tags: [js,lodash]
layout: post
categories: lodash
id: 525
updated: 2019-08-19 17:22:24
version: 1.6
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

### 1.1 - The lodash pick method can also be used to create a new object but by picking not omiting

So there is also the [lodash pick](/2018/07/11/lodash_pick/) method that works more or less the same way but by giving an array or properties that are to be picked for the new object from the given object rather than omitting properties.

```js
let obj = {
    index: 0,
    x: 5,
    y: 12,
    z: 3
};
 
console.log(_.pick(obj, ['x', 'y']));
// { x: 5, y: 12 }
```

## 2 - A native javaScript omit method

So working out a native method that does the same thing as the lodash omit method has proved to be a little time consuming, but did not take me a great deal of time. For this vanilla javaScript version of the lodash omit method I first started with making an in props method that makes use of the [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) native array method to return true if a give key is in an array of key names. Once I have that method worked out I used it to create my vanilla js omit method by using the in props method I made with the object keys static method.

```js
// in props method using Array.some
let inProps = (key, props) => {
    return props.some((omitKey) => {
        return omitKey === key;
    });
};
// omit method using my inProps method and Object.keys
let omit = (obj, props) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
        if (!inProps(key, props)) {
            newObj[key] = obj[key];
        }
    });
    return newObj
}
// works as expected
let obj = {
    index: 0,
    x: 5,
    y: 12,
    z: 3
};
console.log(omit(obj, ['index', 'z']));
// { x: 5, y: 12 }
```