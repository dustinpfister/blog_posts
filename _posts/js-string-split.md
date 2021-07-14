---
title: The string split method in javaScript
date: 2021-07-14 10:39:00
tags: [js]
layout: post
categories: js
id: 910
updated: 2021-07-14 14:06:20
version: 1.8
---

There are still many basic features of javaScript that I have not got around to writing a post on still such as the [String Split prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split). The string split method is simple enough in the sense that I can just call the method off of an instance of a string and pass a string that is a separator char that will be used to split the string into an array of sub strings. However there is maybe a bit more to write about when it comes to using the string split method in conjunction with many other native javaScript features. For example there is the question of how to go about converting an array of substrings back to a string, when it comes to that there is the array join method. Also there is what to do with an array of substrings once it has been split into an array, so I should make a few examples that involve the other array methods such as array map.

<!-- more -->


## 1 - Basic examples of String Split

To start off this post I think it might be best to start out with just some very basic examples of the string split method. The first step in the process of working with this method is to first have a string value to call the method off of in the from of a string literal or a string value stored in a variable, or as a return value of a function. In any case if there is a string value to work with the string split method can be called off of the string as with any other string prototype method. However after that I will also want to pass a value to the string split method that will be used as a way to find out what the separator should be to create the array of sub strings from the string.

### 1.1 - Basic comma separator example

In this example I have a string with some words that are separated with a comma. What I want is an array of strings where each element is a string of the word. To do this I just need to call the string split method off of the string and pass a comma as the first and only argument to the string split method.

```js
// a string
var str = 'foo,man,chew';
// using String split method to create an array from the string
var arr = str.split(',');
console.log(arr[0]); // 'foo'
```

### 1.2 - Using a space

I do not have to use commas only of course when it comes to a static value that will be used as a separator. In may situations I will want to create an array of words where a space is what will be between each word. The string split can then also be used to create this kind of array also, however there may also be additional steps I might want to take with this sort of thing, more on that later when I get into use case examples.

```js
var str = 'These are some words';
var arr = str.split(' ');
console.log(arr); // [ 'These', 'are', 'some', 'words' ]
```

### 1.3 - Using an Empty String

```js
var str = '123456';
var arr = str.split('');
console.log(arr); // [1,2,3,4,5,6]
```

### 1.4 - Using a regular expression

```js
var str = 'This is some text 123 more text 7 also numbers 1 in here';
var arr = str.split(/\d+/);
console.log(arr);
// [ 'This is some text ', ' more text ', ' also numbers ', ' in here' ]
```

## 2 - The String Split method and the array join method

```js
var nums = '1,2,3,4'.split(',').map((str)=>{ return Math.pow(2, parseInt(str))}).join('-');
console.log(nums); // 2-4-8-16
```

## 3 - Use case examples of String Split


### 2.1 - default arguments

```js
var foo = function (a, b, c, d) {
    var defaults = '2,4,5,10'.split(','),
    i = 0,
    len = foo.length,
    ar = arguments;
    while (i < len) {
        ar[i] = ar[i] === undefined ? defaults[i] : ar[i];
        i += 1;
    }
    return Math.pow(ar[0], ar[1]) + ar[2] * ar[3];
};
 
console.log( foo() ); // 66
console.log(foo(3, 2, 1, 1)); // 10
```

### 2.2 - create an array of words

```js
var tokens = function (string) {
    return string.toLowerCase().split(' ');
};
 
var text = 'This is some text',
arr = tokens(text),
wc = arr.length;
 
console.log(arr); // [ 'this', 'is', 'some', 'text' ]
console.log(wc); // 4
```