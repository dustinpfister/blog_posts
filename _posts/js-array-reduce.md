---
title: Array Reduce method in native javaScript
date: 2021-07-13 13:32:00
tags: [js]
layout: post
categories: js
id: 909
updated: 2021-11-25 11:48:00
version: 1.25
---

When it comes to the various [javaScript array](/2018/12/10/js-array/) prototype methods the [Array reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method is one such method that will come in handy often. As the name suggests the main thing about he array reduce method is to reduce an array of elements down into a smaller array, or event a single primitive value. The way it works is by having a value in  the body of the function that is given to array reduce that is an accumulator variable which can have a starting value that is an array, number, string or any value that one would add to using data from the array elements. So then it is a good choice if I need to come up with some kind of sum of a whole bunch of values in an array of objects or something to that effect.

I have got around to writing a post on the [lodash reduce](/2018/07/25/lodash_reduce/) method when I was writing a little content on that library, but I find myself using lodash less and less these days. Still there are some talking points as to why the lodash reduce method is not just a user space method that does the same thjng as array reduce. For one thig the array reduce method is an array method while the lodash method is a so called collection method, which means that the method works with objects in general not just arrays. However when it comes to becoming very familiar with everything there is to work with in native javaScript alone it is not always so hard to do the same with array reduce the trick is just coming up with an array first, or figuring out how to get array reduce to work with something that is not an array.

So I think it is called for now to write at least one [post on the array reduce method](https://dmitripavlutin.com/javascript-array-reduce/) in native core javaScript, and touch base on all kinds of little subjects that might come up as I work out a few basic examples and beyond.

<!-- more -->


## 1 - The basics of array reduce in javaScript

So to start off with in this section I will be going over some very simple examples of the array reduce method. Understanding the basic idea of the method is maybe not as simple as what is going on with some other array prototype methods. If you find yourself in a situation in which you are getting a little frustrated with array reduce, it might be called for to take a breath, step back for a moment, and just work out a few simple examples of the method to get a better sense of what the core functionally of the array reduce method is.

### 1.1 - Simple sum example

One typical use case of the array reduce method is to create some kind of sum with an array of numbers. TO do this I can just call the array reduce method off of the array of numbers and pass a single function that will be the so called reduce function. In the body of this reducer function I just need to return the sum of the accumulator argument that is the first argument with the current value which would be the second argument.

```js
let nums = [10, 5, 5, 4];
let sum = nums.reduce(function (acc, n) {
        return acc + n;
    });
console.log(sum); // 24
```

### 1.2 - An array of strings

If I have an array of strings I could use the array reduce method as a way to create a single string from the array of strings, but in many typical use case examples I might want to go with using the [array join](/2020/03/09/js-array-join/) method in place of doing so. That is that maybe there are some situations in which I would want to use reduce, but if I just want to have a fixed separator or not between each substring and that is it the array join method will work just fine.

```js
let strs = ['foo', 'man', 'chew'];
 
// so reduce can be used to join an array of strings
let reducer = (acc, str, i, arr) => {
    let term = i === arr.length - 1 ? '' : '-';
    return acc + str + term;
};
let s = strs.reduce(reducer, '');
console.log( s ); // 'foo-man-chew'
 
// however there is the array join method that can be used
console.log( strs.join('-') ); // 'foo-man-chew'
```

### 1.3 - An array of objects

There is also working with an array of objects, and wanting to create some kind of reduced value from one or more properties.

```js
let objs = [
    { a: 5},
    { a: 2},
    { a: 3}
];
 
let reducer = (acc, n) => {
    return acc + n.a;
};
 
let n = objs.reduce(reducer, 0);
 
console.log(n);
```

## 2 - Setting the start value for the accumulator

In this section I will be focus on the toping of setting a start value for the accumulator value or not. Be default if not starting value is given for the accumulator the first element in the array will be used for such a value,  as such the starting element index for the reducer will not be the first element, but the second one. As such this can case some problems if one does not know how to adjust for it. Typically type checking is used in the body of the reducer, or another way is to just set a starting value and then all the elements will be called with the reducer function.

### 2.2 - Setting an accumulator start value and not

In this example I worked out two simple examples of the array reduce method that do the same thing in two slightly different ways. One way is to not give a starting value for the accumulator value, which can present a problem when it comes to reducing an array of objects but I want the final result to be a number or string. One way to address this would be to use the [javaScript type of](/2019/02/15/js-javascript-typeof/) operator to check the type of the accumulator and set it to the desired value in that case. However another way would be to use the second argument of the array reduce method to set a starting value for the accumulator value.

```js
let objs = [
    { clicks: 15},
    { clicks: 10},
    { clicks: 25}
];
 
// one way is to do type checking
let a = objs.reduce(function (acc, rec) {
    acc = typeof acc === 'object' ? acc.clicks : acc;
    return acc + rec.clicks;
});
 
// the other way is to set a custom starting value for acc
let b = objs.reduce(function (acc, rec) {
    return acc + rec.clicks;
}, 0);
 
console.log(a); // 50
console.log(b); // 50
```

### 2.1 - index values

One again I am doing more or less the same thing as the first example here the only different is that I am logging the index value in the reducer functions. If I do not give a starting value then the starting index for the reducer function will be 1, because the element of index 0 is used as the starting value. As such it is typically a good index to give some kind of starting value for the array reduce method.

```js
let objs = [{
        clicks: 15
    }, {
        clicks: 10
    }, {
        clicks: 25
    }
];
 
let a = objs.reduce(function (acc, rec, index) {
        acc = typeof acc === 'object' ? acc.clicks : acc;
        console.log(index); // 1 2
        return acc + rec.clicks;
    });
 
let b = objs.reduce(function (acc, rec, index) {
        console.log(index); // 0 1 2
        return acc + rec.clicks;
    }, 0);
 
console.log(a); // 50
console.log(b); // 50
```

## 3 - The reducer function

There is then taking a closer look at the reducer function that is given when it comes to the full scope of arguments to work with in each call of the render function. The set of arguments will differ a little from other functions that are given to other array prototype methods like array for each and array map. Often the first argument is the current value of the current element, but with array reduce the first argument is the current value of the accumulator value. After that it is then the current element value, followed by the element index, and then a reference to the source array that array reduce is called off of.

```js
let reducer = (acc, el, index, array) => {
    console.log(acc, el, index, array);
    return acc + el;
};
 
let arr = [7, 8, 9, 10]
 
let n = arr.reduce(reducer, 0);
//0 7 0 [ 7, 8, 9, 10 ]
//7 8 1 [ 7, 8, 9, 10 ]
//15 9 2 [ 7, 8, 9, 10 ]
//24 10 3 [ 7, 8, 9, 10 ]
```

## 4 - Using The Array reduce method with any object like the lodash reduce collection method

One draw back of the reduce array prototype method is that it is an array prototype method so then it will only work with arrays, at least on its own anyway. Often I might be in a situation in which I will want to do some kind of array reduce like thing with an object in general or some other kind of value. In these situations I will need to just make use of various other core javaScrio features to produce an array first that I can all the method off of, or one way or another get the object to work with the array reduce method even though it is not an array.

### 4.1 - Using function call with Array like objects

When it comes to an array like object one option would be to use the call function prototype method. The call method of the function prototype is [one of several methods in the function prototype](/2017/09/21/js-call-apply-and-bind/) that can be used to set what the value of the this keyword should be inside the body of a prototype function.

```js
// an 'array like' object that has
// properties key names like that of a
// javaScript Array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// The Call Function prototype method can be used with these kinds of objects
// to get the array reduce method to work with them
let sum = Array.prototype.reduce.call(obj, (acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
```

### 4.2 - Using the Array from method with Array like Objects

Another option when it comes to dealing with array like objects would be to use the Array from method.

```js
// an 'array like' object that has
// properties key names like that of a
// javaScript Array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// The Array.from method would be another option when it comes
// to creating an array from this kind of 'array like' object
let sum = Array.from(obj).reduce((acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
```

### 4.3 - The Object values static method

The object values method is a static method of the Main Object global in core javaSscript that will return an array of values for each public key in a given object.

```js
// An array with just public names keys
// with no length property.
let obj = {
    'foo': 1,
    'bar': 2,
    'baz': 3
};
// the Object.values static method can be used to create an array
// of values from an object like this. Then the reduce method can be used
// off of the returned array.
let sum = Object.values(obj).reduce((acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
```

### 4.4 - The Object keys static method

The Object keys method is just like Object values only it will give an array of key names rather than values.

```js
// An array with info I want to reduce
// with encoded into the key names, but
// I also need to work with the values
let obj = {
    'foo_1': true,
    'bar_2': true,
    'chw_7': false,
    'baz_3': true
};
// The Object.keys method can be used to create an
// array of key names from the object. I can then use
// the array map method to create a new array based off
// of this array of key names that is composed of objects.
// each object in this array contains a key and value prop
// I can then use the reduce method off of that array to
// produce the final desired product
let sum = Object.keys(obj).map((key) => {
    return {
        key: key,
        value: obj[key]
    };
}).reduce((acc, el) => {
    if (el.value) {
        acc += parseInt(el.key.split('_')[1]);
    }
    return acc;
}, 0);
console.log(sum); // 6
```

### 4.5 - A string of numbers and the String split method

When it comes to strings a useful method is the [split string prototype method](/2021/07/14/js-string-split/) that is one method that comes to mind right away when I thing of ways to create an array from a string. This split method can just be called off of a string, and then a string values that is used to split the string into sub strings can be given as an argument. If an empty string is given to the string split that will result in each letter being its own element in the resulting array. This can then be used as a way to call reduce for each letter in the source sting then.

```js
// a string of numbers
let str = '123';
// The string split method can be used with an empty string
// I will then want to use parseInt or some method of 
// converting the string values to numbers
let sum = str.split('').reduce((acc, el) => {
    return acc + parseInt(el);
}, 0);
console.log(sum);
```

## 5 - Some use case examples of array reduce

So now that I thing I did an okay job of getting the simple, basic, and boring stuff out of the way I can not start getting into a few use case examples of the array reduce method.

### 5.1 - create a mean

One thing that comes to mind right away is to create a mean from an array of numbers.

```js
let getArthMean = (nums) => {
    return nums.reduce((acc, n) => {
        return acc + n;
    }, 0) / nums.length;
};
let nums = [10, 5, 7, 10, 10, 8];
console.log(getArthMean(nums).toFixed(2)); // '8.33'
```

### 5.2 - Add up array of object props helper

Often I might want to create a sum from a single property of a standard object to which I have an array of.

```js
let sumObjects = (objs, prop) => {
    prop = prop === undefined ? 'clicks' : prop;
    return objs.reduce(function (acc, rec) {
        acc = typeof acc === 'object' ? acc[prop] : acc;
        return acc + rec[prop];
    });
};
 
let objs = [
    { clicks: 15, money: 0.75 },
    { clicks: 10, money: 1.50 },
    { clicks: 25, money: 3.35 }
];
 
console.log(sumObjects(objs));          // 24
console.log(sumObjects(objs, 'money')); // 5.6
```

## 6 - Conclusion

So then the array reduce method is great for many little situations in which I might want to create a single simple value from an array of values. However there is a great number of other array prototype methods that also come into play, such as the [array for each method](/2019/02/16/js-javascript-foreach/) that is just a more generic way of just looping over all the elements of an array.
