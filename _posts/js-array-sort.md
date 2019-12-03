---
title: The Array sort method  in javaScript
date: 2019-12-02 21:40:00
tags: [js]
layout: post
categories: js
id: 574
updated: 2019-12-03 14:47:57
version: 1.6
---

In native javaScript there is the [array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method in the array prototype object. This method can be used to sort an array in place, but will not create and return a new sorted array, which is one reason why you might want to use an alternative such as the [lodash \_.sortBy](/2018/07/06/lodash_sortby/) collection method. 

<!-- more -->


## 1 - Array sort basic examples

In this section I will be going over a few quick basic examples of the array sort prototype method. In the event that I am working with an array of numbers or strings, and I want to sort by value of alphabetically I can just call the array sort method off of the array instance and be done with it. However in most real cases I need to give a sort method as the first argument to the array sort method.

### 1.1 - Arrays of primitives and array sort without a function

If you are just working with a simple array of numbers just calling the array sort method of the array instance will sort the array of numbers by value from lowest to highest.

```js
var arr = [7,4,2,5,8,6,3,1];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

An Array of strings will be sorted by alphabetic order.

```js
var arr = ['c','b','a','d'];
arr.sort();
console.log(arr);
// [ 'a', 'b', 'c', 'd']
```

### 1.2 - Array sort and objects

If I am working working with an array of objects, or for whatever the reason I want to define some logic for sorting I am going to want to give the array sort method a sorting function. This function Will be given two arguments that can be used to compare two elements in the array. The function Should return a number value that is zero if the position is not to change negative if it is to go down towards the zero index value, and positive if it is to go up in index value.

```js
var arr = [
    {hp: 0}, 
    {hp: 57}, 
    {hp: 50},
    {hp: 0},
    {hp: 7}
];
 
arr.sort(function (a, b) {
    if (a.hp > b.hp) {
        return -1;
    }
    if (a.hp < b.hp) {
        return 1;
    }
    return 0;
});
 
console.log(arr.map((e) => e.hp).join(':'));
// 57:50:7:0:0
```