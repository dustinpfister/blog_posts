---
title: lodash from pairs method and vanilla javaScript options
date: 2020-02-02 11:14:00
tags: [js,lodash]
layout: post
categories: lodash
id: 603
updated: 2022-01-03 09:34:13
version: 1.12
---

In [lodash there is the from pairs array method](https://lodash.com/docs/4.17.15#fromPairs) that can create a new object where each key is the value of the first element of a nested array in an array of arrays, and the value is the second element of an array nested in an array. It is the inversion of the lodash to pairs method that does the opposite of this by creating such an array of arrays from an object. 

Although that might sound like a mouthful if you take a moment to look at some quick code examples you will find that this is not something that is all that hard. In addition this is one of many lodash methods where doing the same with plain old vanilla javaScript is pretty quick and easy. So lets look at some code examples for the lodash from pairs method as well as some plain old vanilla javaScript code examples that do the same thing.

<!-- more -->

## 1 - Basic examples of the from pairs method, and other lodash methods

First off in this section I will be starting out with some quick simple examples that make use of the from pairs method. While I am at it I will also be going over some quick examples of various other lodash methods and features. So then I assume that you have at least a little background when it comes to working with native javaScript and how to make use of an external javaScript library such as lodash. If not you might want to take a step back and check out my [main post on lodash](/2019/02/15/lodash/), or one of my [getting started type posts](/2018/11/27/js-getting-started/) on javaScript in general.

### 1.1 - lodash \_.fromPairs method basic example

So lets say you have an array, and each element in that array is another array. In addition each nested array has a first element that you want to be a key value, and a second element that you want to be a value of that key value in a new object. The lodash from pairs method can be used to do just that.

just call the lodash from pairs method and pass the array of arrays to it. The result that is returned will be the object that you want where each key name is the first element of a nested array, and each value is then then second.

```js
let arr = [['x', 1],['y', 2], ['z', 3]];
 
console.log( _.fromPairs(arr) );
// { x: 1, y: 2, z: 3 }
```

Thats it, that is what the lodash from pairs method does. However there is also having a method that does the opposite of this that will create such an array of array from an object. Also it is not so hard to just do this with plain old javaScript in a number of ways, so lets look at some more related coded examples with and without the use of lodash.

### 1.2 - lodash \_.toPairs to do the opposite

The lodash \_.toPairs method is the inverse of the lodash \.FromPairs method. If I pass an object to it, I am given an array of arrays where the keys and values are the first and second elements of each nested array for each key value pair in the given object.

```js
let arr = [['x', 1],['y', 2], ['z', 3]];
 
let obj =  _.fromPairs(arr);
 
console.log(obj);
// { x: 1, y: 2, z: 3 }
 
let arr2 = _.toPairs(obj);
console.log(arr2);
// [['x', 1],['y', 2], ['z', 3]]
```

## 2 - vanilla javaScript alternative with a while loop

It is not so hard to just work out a little javaScript to make a method that does the same thing. Also it is silly to have a very extensive framework of methods like this that you might not be using. If for some reason you do need to use a method like this, and it is all you really need then a copy and past solution like this should work just fine in most situations.

```js
var fromPairs = function (arr) {
    let i = 0,
    len = arr.length,
    pair,
    obj = {};
    while (i < len) {
        pair = arr[i];
        obj[pair[0]] = pair[1];
        i += 1;
    }
    return obj;
};
 
let arr = [['x', 1], ['y', 2], ['z', 3]];
 
console.log(fromPairs(arr));
// { x: 1, y: 2, z: 3 }
```

I went with using var, a function expression, and a while loop to maximize javaScript engine support. However of course a similar method could easily be made in a flash with all kinds of more modern javaScript features.

## 3 - Conclusion

The lodash from pairs method is not the most compelling reason to use lodash of course. It is another one of the many methods that I either never use, or if I do need can be replicated very easily with just native javaScript by itself. There are still redeeming qualities with lodash though of course, however I would not say this method is the best talking point for defending the use of the full lodash library in new projects. What can be done with many of these methods can also often be done with a little quick javaScript by itself, also often there are native methods for much of the functionality as well.

There are still some methods that do take at least a little time to write though as there may not be a native counterpart method at all. Also there may be a native method, but it still may be relatively new, so often I might have to make use of a ploy fill method to make sure it is there. It is also possible to create customs builds of lodash which is often the root that a developer might utility want to go with a general utilities library. However getting into that may be a matter for a whole other post.


