---
title: The domain of a function in javaScript
date: 2021-07-27 16:52:00
tags: [js]
layout: post
categories: js
id: 919
updated: 2021-07-27 19:33:42
version: 1.14
---

When getting into writing [functions in javaScript](/2019/12/26/js-function/) there are the things that have to do with how functions work in javaScript, but then there are all kinds of things that have to do with functions in general. That is things that do not just apply to functions in javaScript, but any language for that matter. With that said todays post is on the subject of the [domain of a function](https://en.wikipedia.org/wiki/Domain_of_a_function) in javaScript. 

A function domain as it some times might be called is the full range of arguments that are possible for a given function. So say I have a function that accepts a single argument that represents a singe side of a six sided die, in that case the range for the one argument would be the whole numbers 1 threw 6. However many functions will have a very wide range for an argument, and on top of that float numbers can be used. ALso often a function will have more than one argument, on top of having a wide range for one or more arguments. This can result in w very wide range of possibles for the domain of a function, making it hard to create a way to graph all possibles, or run threw all possible combinations of calls to make sure the function will always work as expected for all possible input values.

<!-- more -->

## 1 - Basics of function domain in javaScript

In this section I will just be going over a few simple examples of function domain in javaScript. These will include examples that involve creating the whole range of possible input values for a function when it is possible to do so without eating up to much overhead. In other cases some other means will have to be used to run threw just a fraction of the function domain because there are just way to many possible input values.

### 1.1 - Creating a function domain

Lets say I just have a very simple function that will just take the numbers 0 there 10 as the first and only argument. On top of that the numbers that are expected are whole numbers so that means that the full function domain can just be a small array of numbers.

```js
// create a domain for a function
var createDomain = function(sx, ex, step){
    var x = sx,
    domain = [];
    while(x < ex){
        domain.push(x);
        x += step;
    }
    return domain;
};
// the function that I am creating a domain for.
var func1 = function(x){
   x = x < 0 ? 0: x;
   x = x > 10 ? 10 : x;
   return Math.round(x) / 10;
};
 
// creating an array for arguments values that I
// will act as a domain
var domain = createDomain(0, 11, 1);
console.log(domain);
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 
// I can now use array map with the function func1 
// to create an array or return values for the domain
console.log( domain.map(func1) );
// [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ]
```

### 1.2 - Example using Math.sin

The full scope of the function domain for the Math.sin method might be to high to create an array for, because in a way it is any number between negative and positive infinity for the range of javaScript numbers. However there is not always creating the full domain for a function, just a given range that reflects some kind of typical use case. When it comes to using the Math.sin function I often one use case is to use it to get the y axis value for a point relative to a given origin. So I might not need to do the full possible domain as that would be way to large, but I can do it for say, just 8 directions.

```js
// create a domain for a Math.sin
var createDomain = function(totalDivs){
    var div = 0,
    domain = [];
    while(div < totalDivs){
        domain.push( Math.PI * 2 / totalDivs * div );
        div += 1;
    }
    return domain;
};
 
// eight directions
var domain = createDomain(8);
console.log(domain);
/*
[ 0,
  0.7853981633974483,
  1.5707963267948966,
  2.356194490192345,
  3.141592653589793,
  3.9269908169872414,
  4.71238898038469,
  5.497787143782138 ]
*/
console.log( domain.map(Math.sin) );
/*
[ 0,
  0.7071067811865475,
  1,
  0.7071067811865476,
  1.2246467991473532e-16,
  -0.7071067811865475,
  -1,
  -0.7071067811865477 ]
*/
```

## 2 - Conclusion

The domain of a function is something that I want to run threw when it comes to testing a function that I wrote to make sure that I get experted results for all possible calls. However some times it might not be possible to do so, or it would require a whole lot of processing power and time to do so at least. So some times I test out a function by just going threw part of a range, or by a certain stepping value.

Often it might be a good idea to graph output, or create some kind of visual aid as a way to make sure that a function is working the way that it should for at least some kind of domain. Typically there is creating a simple graph using a canvas element for example.
