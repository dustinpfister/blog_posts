---
title: lodash includes method to check Strings, Arrays, and Objects for a value
date: 2017-11-21 10:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 96
updated: 2020-01-31 11:13:22
version: 1.14
---

Time for yet another [one of my posts](/categories/lodash/) on [lodash](https://lodash.com/), today I will be writing about the [\_.includes](https://lodash.com/docs/4.17.4#includes) method, and why It might be useful in some situations when working on a project where lodash is part of the stack. The lodash \_.includes method is one of the collection methods in lodash that will work with Arrays, and Objects in general, and even strings. The nature of the lodash includes method is that it can be used as a way to test if a value is included in a collection or not.

<!-- more -->

## 1 - lodash includes basics

This is a post on the \_.includes method in the popular javaScript utility library known as lodash. I assume that you have at least some background in javaScript, and how to work with libraries such as lodash in a client side javaScript and nodejs environment. If not this is not a good starting location for getting started with the basics of javaScript in general let alone lodash.

## 2 - Example of \_.includes With arrays

The includes method can be used as a way to find if a value is in an array, as it is a collection method that can be used with any object in general including arrays. In this case I just need to call the lodash includes method and pass an the array as the first argument followed by the value that I want to test if it is included or not.

```js
// Arrays
var arr = ['a','b','c'];
console.log( _.includes(arr,42) ); // false
console.log( _.includes(arr,'d') ); // false
console.log( _.includes(arr,'c') ); // true
```

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