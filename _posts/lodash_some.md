---
title: lodash some
date: 2019-04-01 17:11:00
tags: [js,lodash]
layout: post
categories: lodash
id: 408
updated: 2021-11-19 15:24:38
version: 1.14
---

The [lodash \_.some](https://lodash.com/docs/4.17.11#some) collection method can be used to test to see if just one element of an array, or key value pair of an object in general meets a given condition. There is another collection method known as \_.every that works in a similar way to that of the \_.some method but will only return true when all elements of a collection meet a given condition. 

In this post I will be going over some simple examples of both the lodash some and every methods. Also there are as some ways of doing the same thing so with just plain old vanilla js also that are worth covering. There are native javaScript equivalents for both the some and every methods although these are array prototype methods rather than collection methods. Still it is not to hard to just go with using those and count these lodash methods as just yet another example of a kind of methods that brings the relevancy of lodash into question.

<!-- more -->

## 1 - lodash some basic example

The lodash some method is used to quickly find out if at least one element in a collection meets a given condition. To use it just call the \_.some method followed by the collection that is to be tested, followed by a function that will be used to test potentially all elements in the collection for a certain condition.

```js
let _ = require('lodash');
 
// some arrays
let arr1 = ['foo', null, 42, 'bar'],
arr2 = ['foo', 'man', 'chew'],
 
// what to test for
tester = function (el) {
    return typeof el === 'number';
};
 
console.log(_.some(arr1, tester)); // true
console.log(_.some(arr2, tester)); // false
```

## 2 - lodash some vanilla JavaScript alternatives

In this section I will be covering some quick vanilla ja examples of how to do what the \_.some method in lodash can do with just plain old javaScript by itself. In some situations it is not to hard to just loop over the contents of an array or Object and just test to see if one object key value meets a given condition. So lets take  look at some quick examples of doing what the \_.some method can do with just plain vanilla javaScript.

### 2.1 - Just use a loop

So it is not to hard to just use a while loop for example to loop over the contents of an array and check to see if one element in the array meets a certain condition of course.

```js
let arr = ['foo', 42, null, 'baz'];

let i = arr.length,
some = false;
while (i--) {
    if (arr[i] === null) {
        some = true;
        break;
    }
}
 
console.log(some); // true
```

This kind of code could be pulled into a function so it can be used over and over again. Such methods should be part of a custom trailered utility library. However there is also the question of native support when it comes to a some method, and in late javaScript specs there is such a method. So depending on what the state of affairs is when it comes to client support, you might not even need to deal with having a stand alone some method. In any case lets look at some more examples of using a some method in just plain of vanilla javaScript.


### 2.2 - Writing a some method

It is not to hard to write a some method of my own. The Object.keys method can be used to get all publc keys of an Object in general. This can then be used as a way to loop over all they keys and call a given test function that will return true if an element meets the desired condition. Such a method will work just fine with most Arrays and Object collections in general.

```js
let some = function (col, tester) {
    let i = 0,
    keys = Object.keys(col),
    len = keys.length;
    while (i < len) {
        if (tester(col[keys[i]], keys[i], i)) {
            return true;
        }
        i += 1;
    }
    return false;
};
 
// works with arrays
let arr = [null, 'foo', 'baz', 42, {}, false, true];
console.log(some(arr, function (el) {
        return typeof el === 'number';
    })); // true
console.log(some(arr, function (el) {
        return typeof el > 50
    })); // false
 
// works with objects in general
let obj = {
    x: 42,
    y: 17,
    z: -12
};
 
console.log(some(obj, function (n) {
        return n > 50 || n < -50
    })); // false
console.log(some(obj, function (n) {
        return n <0
    })); // true
```

## 2.3 - Native Array.some and an Arrays

So if all clients that are of concern support it, there is also a native option for this sort of thing in the Array prototype.

```js
let arr = ['foo', 42, null, 'baz'];
 
let test = (el) => {
    return el === null;
};
 
console.log(arr.some(test)); // true
```

One draw back might be that it is an array prototype method and not a collection method like in lodash. No problem thous as this is easily fixed with just the use of one more additional native method which would be the Object.values static Object method.

### 2.4 - Native Array.some and Objects in general

So the native Array.some method works okay on all clients concerned and you want to just go ahead and use that as a way to preform these kinds of tests. There is just one little problem and that is that it is an array prototype method rather than a collection method like in lodash. So when you want to use it with objects in general, you can not just go ahead and do so with just the native array some method.

So there is then a need to make a stand alone some method that is part of you r own framework for you pro9ject just like in lodash once again. If you do not just want to use lodash and move on with it then it is not to hard to just make a native equivalent with just the native array some method and then the object.values static Object method.

```js
let test = (el) => {
    return el === null;
};
 
let some = (obj) => {
    return Object.values(obj).some(test)
};
 
let arr = [1, null, 2],
arr2 = [3, 4, 5],
obj = {
    a: 'foo',
    b: 'bar',
    c: null,
    d: 42
},
obj2 = {
    a: 3,
    b: 3
}
 
// works with objects
console.log(some(obj)); // true
console.log(some(obj2)); // false
 
// and arrays to just like with lodash
console.log(some(arr)); // true
console.log(some(arr2)); // false
```

## 3 - Conclusion

The lodash some method as well as the native equivalent, or any other non lodash user space solution for what is often refer to as some, is just a way to check if all elements in an array meet a given condition. Preforming such a task really just involves just looping over all elements of an array, or collection, and preform a test for each element. If just one test results in a true result, then the process can be stopped and a true value for the some operation can be observed.
