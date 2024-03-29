---
title: lodash some
date: 2019-04-01 17:11:00
tags: [js,lodash]
layout: post
categories: lodash
id: 408
updated: 2021-11-23 11:09:07
version: 1.30
---

The [lodash \_.some](https://lodash.com/docs/4.17.11#some) collection method can be used to test to see if just one element of an array, or key value pair of an object in general meets a given condition. In the event that just one or more puplic keys of the collection is true then the return value for the lodash some method will in turn also be true. There is another collection method known as [\_.every](/2019/08/01/lodash_every/) that works in a similar way to that of the \_.some method but will only return true when all elements of a collection meet a given condition rather than just one. 

In this post I will be going over some simple examples of both the lodash some and every methods. Also there are as some ways of doing the same thing so with just plain old vanilla js also that are worth covering. There are native javaScript equivalents for both the [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) and [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) methods although these are [array prototype methods](/2018/12/10/js-array/) rather than collection methods. Still it is not to hard to just go with using those and count these lodash methods as just yet another example of a kind of methods that brings the relevancy of lodash into question.

<!-- more -->

## 1 - lodash some basic example

The lodash some method is used to quickly find out if at least one element in a collection meets a given condition. To use it just call the \_.some method followed by the collection that is to be tested, followed by a function that will be used to test potentially all elements in the collection for a certain condition. In this section I will be starting out with a few basic examples of the lodash some method and while I am at it I will be touching base on other related lodash features and aspects of javaScript in general in the process of doing so. 

I will be keeping the basic examples in this post, well some what basic, but I still assume that you have at least some experience wit javaScript when it comes to getting started with javaScript and as such how to make use of an external library such as lodash in a client side or nodejs environment. If nit you might want to take a step back and start out with some kind of [getting started type post on javaScript](/2018/11/27/js-getting-started/) in general. Also in order to make use of the lodash some method, and any other method like lodash some it might be a good idea to look into higher order functions more. A higher order function is a function that will take a function as an argument, and or return  function. With that said the lodash some method would be an example of a higher order function as it takes a function as an argument and I am also make use of such functions in some of these examples. I have wrote a [post on functions in general](/2019/12/26/js-function/) in javaScript if you think you might need to learn more about how to work with functions in general in javaScript first.

### Source is on github

I have the source code examples for this post in my [test lodash](https://github.com/dustinpfister/test_lodash/tree/master/forpost/lodash_some) repository on Github which is the standard location in which I will be placing my source code examples on my various [other posts on lodash now](/categories/lodash/).

### 1.1 - Using lodash some with an array

The lodash some method will work just fine with an array, for example say I have two arrays and I want to find out which one of the two has at least one if not more numbers in it. I can come up with a tester function that uses the [type of operator](/2019/02/15/js-javascript-typeof/) to find the type of a current element in an array and then compare that to the string 'number'. I then just need to call the lodash some method passing the array that i want to test as the first argument, and then the tester function as the second argument.

```js
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

### 1.2 - The lodash some method can be used with any object

The lodash some is an example of a collection method in lodash, which means that the method can be used with objects in general rather than just arrays, or objects of a given prototype. The native counter part of the lodash some method is not this kind of method but a method that is in the array prototype which means that out of the box it will only work with arrays. Some might say that the various collection methods in lodash are a talking point for continuing to use lodash over just working with native javaScript. However getting array methods to work with objects in general is not all that hard once one become familiar of various tools to work with to get around this. This is something that I will be getting to in depth in a later section in this post, but for now just take into account the following with the lodash some method.

```js
let testType = function (type) {
    type = type || 'number';
    return function (el) {
        return typeof el === type;
    };
};
// lodash some works fine with plain Objects
let obj = {
    foo: 42,
    bar: 10
};
console.log( _.some(obj, testType('number')) ); // true
console.log( _.some(obj, testType('string')) ); // false
```

In this example I have a test type helper function that will create and return a method that I can then use with the lodash some method, or many other methods like it. Both this test type method as well as the lodash some method are examples of what is called a higher order function. The lodash some method is a higher order function just because it takes a function as an argument, but this test type function is one because it returns a function. A higher order function takes a function as an argument, returns a function as a return value, or does both of these things.

### 1.3 - Lodash some compared to lodash every method

Another closely related method to the lodash some method would be the lodash every method. Where the lodash some method will return true if just one or more elements in a collection are true, the every method will only return true if all the elements in the collection meet the given condition. In this example I have a test type method that will now return true if a current element is of one of the types in a given array of types. I then have an object that contains two numbers, and one string. So then if I use the lodash some method with this object and create a test function with the test type helper that will work with numbers, strings, or numbers and strings the result will be true for the object. However in order to get a true result when using the every method I will need to make it so that the test is for both numbers an strings.

```js
// test an array of types
let testType = function (types) {
    types = types || ['number'];
    return function (el) {
        let i = types.length;
        while (i--) {
            let typeStr = types[i];
            if (typeof el === typeStr) {
                return true;
            }
        }
        return false;
    };
};
let obj = {
    foo: 42,
    bar: 10,
    chew: 'foo'
};
// lodash some will return true of just one element meets
// a given condition, while every will only return true of all elements
// meet a given condition
console.log(_.some(obj, testType(['number']))); // true
console.log(_.every(obj, testType(['number']))); // false
console.log(_.every(obj, testType(['number', 'string'])) ); // true
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
