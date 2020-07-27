---
title: lodash omit method for omitting properties from an object
date: 2019-08-19 16:10:00
tags: [js,lodash]
layout: post
categories: lodash
id: 525
updated: 2020-07-27 09:47:28
version: 1.9
---

The [lodash omit](https://lodash.com/docs/4.17.15#omit) method can be used to create a new object by omitting properties from an existing object that is give as the first argument. So then the lodash omit method is like the [lodash pick](/2018/07/11/lodash_pick/) method only it creates a new object by omitting properties that are not wanted rather than picking properties that are wanted.

So there is using the lodash omit and or the lodash pick methods as ways to create new objects from other objects, but there are also ways of doing the same with just native javaScript itself. So in this post I will not juts be taking a quick look at the lodash methods for this, but also touch base on some additional solutions that do not make use of lodash.

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

## 2 - Using lodash map, some, remove, and fromPairs for a way more complex way of doing something fairly simple

So there are many other lodash methods that could also be used to create a new object from and object like this right? Well yes but sometimes I just end up making something far more complicated then it needs to be when doing that. For this example I was able to do the same thing but I ended up using lodash map to create an array of false values for properties that will be omitted and key value pairs for properties that will remain using the lodash some method to do file if that is the case or not. I then used the lodash remove method to remove the false index values from the array and have a clean set of key value pairs. Then once I have a set of key value pairs I can then use the lodash from pairs method to create the new object.

```js
let obj = {
    index: 0,
    x: 5,
    y: 12,
    z: 3
};
 
// start out with _.map and _.some
let pairs = _.map(obj, (prop, key) => {
        return !_.some(['index', 'z'], (omitKey) => {
            return omitKey === key;
        }) ? [key, prop]: false;
    });
 
// This gives me something to start with
console.log(pairs);
// [ false, [ 'x', 5 ], [ 'y', 12 ], false ]
 
// then I use remove to have a clean set of pairs
pairs = _.remove(pairs);
console.log(pairs);
// [ [ 'x', 5 ], [ 'y', 12 ] ]
 
// now I can use that with _.fromPairs to get the new object
let newObj = _.fromPairs(pairs);
console.log(newObj);
// { x: 5, y: 12 }
```

So then methods like the lodash omit methods can help keep me from making far more complex solutions like this for such a simple task right.

## 3 - A native javaScript omit method

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

This way of making an omit method should work okay on most browsers as the array some method works on versions of ie that are as old as ie 9, and the object keys method also works on a wide range of browsers also. I could make another set of methods that would work on even older browser of need be but you get the idea. The lodash omit methods helps out a little because writing something like this over and over again when and where I need it can end up being a little time consuming.