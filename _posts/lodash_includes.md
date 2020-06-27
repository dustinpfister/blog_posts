---
title: lodash includes method to check Strings, Arrays, and Objects for a value
date: 2017-11-21 10:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 96
updated: 2020-06-27 13:30:18
version: 1.20
---

Time for yet another [one of my posts](/categories/lodash/) on [lodash](https://lodash.com/), today I will be writing about the [\_.includes](https://lodash.com/docs/4.17.4#includes) method, and why It might be useful in some situations when working on a project where lodash is part of the stack. 

The lodash \_.includes method is one of the collection methods in lodash that will work with Arrays, and Objects in general, and even strings. The nature of the lodash includes method is that it can be used as a way to test if a value is included in a collection or not. There are many other lodash methods as well as native javaScript solutions for doing the same thing as what the lodash includes method does. So with that said the lodash includes method might not be one of the methods in lodash that helps to build the most convincing case to use the full lodash utility library in a project.

Still there is what the lodash includes methods does, and there are all the other ways of doing the same thing both with and without lodash, so I thought I would take a moment to write a post around this topic for what it is worth.

<!-- more -->

## 1 - lodash includes basics

This is a post on the \_.includes method in the popular javaScript utility library known as lodash. I assume that you have at least some background in javaScript, and how to work with libraries such as lodash in a client side javaScript and nodejs environment. If not this is not a good starting location for getting started with the basics of javaScript in general let alone lodash.

There are many other options when it comes do doing more or less the same thing with native javaScript by itself and kicking lodash to the curb. I will be touching base on some of these options, and will try to keep things objective without showing favoritism to lodash, or just working with native javaScript by itself.

## 2 - Example of \_.includes With arrays

The includes method can be used as a way to find if a value is in an array, as it is a collection method that can be used with any object in general including arrays. In this case I just need to call the lodash includes method and pass an the array as the first argument followed by the value that I want to test if it is included or not.

```js
// Arrays
let arr = ['a','b','c'];
console.log( _.includes(arr,42) ); // false
console.log( _.includes(arr,'d') ); // false
console.log( _.includes(arr,'c') ); // true
```

### 2.1 - Using the native Array.includes method in vanilla javaScript to do the same thing

So in late specs of native javaScript there is now a native equivalent of sorts of the lodash includes method in the array prototype that is the [Array includes prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes). It would seem that this method does work more or less the same as lodash includes if you only care about arrays rather than objects in general. Because it is a prototype method it is just a means of calling it off of an array instance and then passing the value that you want to check to see if it is included in the array.

```js
let arr = ['a','b','c'];
 
console.log( arr.includes(42) ); // false
console.log( arr.includes('d') ); // false
console.log( arr.includes('c') ); // true
```

One issue of concern is that it is a late method, so it will not work in older clients without a polyfill. If you do care a great deal about supporting older clients it is not just a matter of using lodash though also. However getting into that would be off topic.

### 2.2 - The native Array some method

There is also the native array some method in the native javaScript array prototype that can also be used to see if an array contains a value or not. The includes method is really just a convenience method of sorts when compared to the array some method. The reason why is because the array some method will give a grater degree of control over what the condition is that is used to find out if a value equals another given value or not.

```js
let tester = (val) => {
    return function (el) {
        return el === val;
    };
};
 
let arr = ['a', 'b', 'c'];
 
console.log(arr.some( tester(42) )); // false
console.log(arr.some( tester('d') )); // false
console.log(arr.some( tester('c') )); // true
```

When just comparing a given value to all values in an array that is one thing. However in other cases I might need to do some more complex expression for each element in an array, and when it comes to that the array some method gives me that greater flexibility when it comes to having control over what is used to find if an array includes something.

## 3 - Example of \_.includes With objects

When working with an object the method will return true if one of the object values is equal to the value given, but not with the key names.

```js
// Objects
var obj = {name:'jack'};
console.log( _.includes(obj,'name') ); // false
console.log( _.includes(obj,'jill') ); // false
console.log( _.includes(obj,'jack') ); // true
```


## 4 - Example of \_.includes With strings

Here I have an example of the \_.includes method that is used to find if a string contains a given substring.

```js
// Strings
var str = 'foo;man;chew';
console.log( _.includes(str,'man') ); // true
console.log( _.includes(str,'bar') ); // false
```

## 5 - Giving a from index value

An index value can be given as the third argument to the method. This index value will be observed as a starting index value when it comes to checking the values from left to right.

```js
console.log(_.includes(['a','b','c'],'b',1)); // true
console.log(_.includes(['a','b','c'],'b',2)); // false
```

## 6 - Negative from index values

When I give a negative from index value it counts as the index value from the end of the collection.

```js
console.log(_.includes(['a','b','c'],'b',-1)); // false
```

## 7 - Conclusion

The includes method in lodash can be used as a quick way to find if a given value is in a collection in general. It is not like there are other ways of doing this in plain old javaScript by itself, but if lodash is part of the stack it is there to help with this sort of thing. If you enjoyed this post you might want to check out my main post on [lodash](/2019/02/15/lodash/) in general.