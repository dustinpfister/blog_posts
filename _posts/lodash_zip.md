---
title: The lodash _.zip method
date: 2018-02-01 16:37:00
tags: [js,lodash]
layout: post
categories: lodash
id: 141
updated: 2018-02-04 20:17:40
version: 1.1
---

The [lodash](https://lodash.com/) [\_.zip method](https://lodash.com/docs/4.17.4#zip) can be used to zip some separate arrays into one array of arrays. It is one of several helpful methods in lodash for working with multi-definitional arrays, as \_.zip can be used as a way to create them. Another such method is [\_.chunk](/2017/09/13/lodash-chunk/) that can be used to make a multi deferential array from a single array, while \_.zip can make them from two, or more arrays.

<!-- more -->

## Some background on multi-deferential arrays in javaScript

In javaScript I can have an array of arrays, or just a single array that follows a certain formula.

```js
// array of arrays
var matrix = [
 
    [1,2,3,4],
    [1,0,5,1],
    [1,0,0,1],
    [2,1,1,3]
 
];
 
var x = 2, y = 1,
 
// I can get a single element like this
el = matrix[y][x];
 
console.log( el ); // 5
 
// just a single array
var matrix = [1,2,3,4,1,0,5,1,1,0,0,1,2,1,1,3],
w = 4;
 
var x = 2, y = 1,
 
// I can do the same thing with a single array
// if I know the width
el = matrix[ y * w + x];
 
console.log(el); // 5
```

## Basic example of \_.zip

\_.zip works by making the first element of the first array given to it also the first element of the first array in what is returned, but then the second element in what is returned comes from the first element in the second array given to it, and so forth. \_.unzip can then be used to unzip what is returned back into a collection of the original arrays that where given.

```js
var x = [10,20,30],
y = [8,16,32],
 
matrix = _.zip(x,y,[5,5,5],[3,3,3]);
 
_.each(matrix, function(pt){
 
    console.log(pt);
    // [10,8,5,3]
    // [20,16,5,3]
    // [30,32,5,3]
 
});
```

## \_.zip, \_.unzip, \_.flatten, and \_.chunk

So if I have a bunch of single stand alone arrays, and I want to zip them together into an array of arrays I can do that with \_.zip. I can then unzip them back into the way there where before using \_.unzip. Another method of interest is \_.flatten that will flatten an array of arrays into a single array, and then \_.chunk can be used to break it back down into an array of arrays with a given width.

```js
var r1 = [1,1,1,2],
r2 = [2,0,0,1],
r3 = [3,5,0,1],
r4 = [4,1,1,3];

// zip can be used to zip these arrays
// into the array of arrays example
var matrix = _.zip(r1,r2,r3,r4);

var x = 2, y = 1,
el = matrix[y][x];

console.log(el); // 5
console.log(matrix);
// [[1,2,3,4]
//  [1,0,5,1]
//  [1,0,0,1]
//  [2,1,1,3]]

// unzip will put them back
matrix = _.unzip(matrix);
console.log(matrix);
// [[1, 1, 1, 2]
//  [2, 0, 0, 1]
//  [3, 5, 0, 1]
//  [4, 1, 1, 3]]

// flatten can the me used to give me the single
// array example
matrix = _.flatten(_.zip(r1,r2,r3,r4));

var x = 2, y = 1,w=4;
el = matrix[ y * w + x];
console.log(el); // 5
console.log(matrix);
// [1, 2, 3, 4, 1, 0, 5, 1, 1, 0, 0, 1, 2, 1, 1, 3]

// and then _.chunk will give me the arrays, or arrays again.
console.log(_.chunk(_.flatten(_.zip(r1,r2,r3,r4)),w));
// [[1,2,3,4]
//  [1,0,5,1]
//  [1,0,0,1]
//  [2,1,1,3]]
```

Got all that? good.