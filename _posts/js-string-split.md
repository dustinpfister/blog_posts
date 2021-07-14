---
title: The string split method in javaScript
date: 2021-07-14 10:39:00
tags: [js]
layout: post
categories: js
id: 910
updated: 2021-07-14 13:54:11
version: 1.4
---

There are still many basic features of javaScript that I have not got around to writing a post on still such as the [String Split prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split). The string split method is simple enough in the sense that I can just call the method off of an instance of a string and pass a string that is a separator char that will be used to split the string into an array of sub strings. However there is maybe a bit more to write about when it comes to using the string split method in conjunction with many other native javaScript features. For example there is the question of how to go about converting an array of substrings back to a string, when it comes to that there is the array join method. Also there is what to do with an array of substrings once it has been split into an array, so I should make a few examples that involve the other array methods such as array map.

<!-- more -->


## 1 - Basic examples of String Split

### 1.1 - Basic comma separator example

```js
// a string
var str = 'foo,man,chew';
// using String split method to create an array from the string
var arr = str.split(',');
console.log(arr[0]); // 'foo'
```

### 1.2 - Using a space

### 1.3 - Using an Empty String

### 1.4 - Using a regular expression

## 2 - The String Split method and the array join method

## 3 - Use case examples of String Split
