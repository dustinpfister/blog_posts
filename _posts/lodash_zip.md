---
title: The lodash _.zip method and other related topics
date: 2018-02-01 16:37:00
tags: [js,lodash]
layout: post
categories: lodash
id: 141
updated: 2020-07-30 15:51:25
version: 1.12
---

The [lodash](https://lodash.com/) [\_.zip method](https://lodash.com/docs/4.17.4#zip) can be used to zip some separate arrays into one array of arrays. It is one of several helpful methods in lodash for working with [multi-dimensional arrays](/2020/03/21/js-array-multidimensional/), as \_.zip can be used as a way to create them. Another such method that is helpful with these sorts of arrays is the [\_.chunk](/2017/09/13/lodash-chunk/) method that can be used to make a multi deferential array from a single array, while \_.zip can make them from two, or more arrays. In addition there is also the [lodash flatten](/2018/08/12/lodash_flatten/) method that can flatten and array of arrays into a single array that should also be worth checking out if you are now aware of it just yet.

<!-- more -->

## 1 - What to know with lodash zip and more before continuing

This is a post on the \_.zip method in lodash one of the many [array methods in lodash](/2019/02/14/lodash_array/). I will be writing about this method, some use case examples with it, as well as many other related topics. I assume that you have at least some background with javaScript, and are just currently exploring lodash, what lodash has to offer, and native javaScript alternatives to many of the lodash methods such as lodash zip. So in this section I will be going over a few things to be aware of, but will not be getting into the basics of javaScript and html in general.

### 1.1 - Multidimensional arrays as arrays of arrays in javaScript

In javaScript there are going to be times where I will want to structure data in a multidimensional kind of way. You might be wondering what this might have to do with the lodash zip method, well we will be getting to that shortly, but this is a related topic that you should be up to speed with before hand.

So then in javaScript one way to have a multidimensional array is as an array of arrays like this:

```js
// an array of arrays
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
```


### 1.2 - Multidimensional arrays as just a single linear array

Another way of having a Multidimensional is as just a single array that follows a pattern when it comes to the index values. In that case it is just a matter of knowing the proper expression that needs to be used to get and set elements in the matrix. For an example of this consider the following.

```js
// just a single array
var matrix = [1,2,3,4,1,0,5,1,1,0,0,1,2,1,1,3],
w = 4;
 
var x = 2, y = 1,
// I can do the same thing with a single array
// if I know the width
el = matrix[ y * w + x];
console.log(el); // 5
```


So you have arrays of arrays, and just arrays with elements positioned in a way in which they follow a pattern with respect to the index values. In other words there are just two different general ways of doing the same thing when it comes to having a multidimensional array. In lodash there are a few methods of interest that help make quick work of converting between these two ways have having data organized in arrays that I will be touching base on. However this is a post mainly on the lodash zip method so lets get to a basic example of that at least now that we have a basic understanding of arrays of arrays in javaScript.

## 2 - Basic example of \_.zip

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

## 3 - \_.zip, \_.unzip, \_.flatten, and \_.chunk

So if I have a bunch of single stand alone arrays, and I want to zip them together into an array of arrays I can do that with \_.zip. I can then unzip them back into the way there where before using \_.unzip. Another method of interest is \_.flatten that will flatten an array of arrays into a single array, and then [\_.chunk](/2017/09/13/lodash-chunk/) can be used to break it back down into an array of arrays with a given width.

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

## 4 - Conclusion

So \_.zip is a useful method, and it seems like a good match with the  [\_.chunk](/2017/09/13/lodash-chunk/), method that will break a linear array into an array of arrays. There is also the [\_.flatten](/2018/08/12/lodash_flatten/) method as well that can be used to flatten an array of arrays into a linear array.