---
title: Using _.flow as a way to chain methods with lodash, and javaScript
date: 2018-11-19 16:34:00
tags: [js,lodash]
layout: post
categories: lodash
id: 333
updated: 2021-12-31 08:33:31
version: 1.14
---

In [lodash](https://lodash.com/) there are a few options when  it comes to making use of more than one lodash method in a chain or sorts one of which is the [\_.flow](https://lodash.com/docs/4.17.4#flow) method. The lodash flow method works by calling the method and passing an array of functions that will be called on after another in order from the lowest index to the highest. For each call of each function the return value of the last function will be used for the argument value for the next and so forth.

There are other options to be aware of that can be deployed to use two or more lodash methods in order though such as calling the main lodash top level function, or using the [lodash chain method](/2018/11/11/lodash_chain/).

There are many ways to go about chaining methods together with just plain old javaScript by itself as well though, so I will be writing about vanilla js examples as well in this post. 

<!-- more -->

## 1 - lodash flow, other lodash methods, and what to know first

This is a post on the lodash method \_.flow, it is not a post for developers that are new to lodash, let alone javaScript in general. If you are new to lodash and javaScript in general this is not a good starting point. You should also be somewhat familiar with writing functions, and how many of theme can be used together. There is more than one way to do what can be accomplished with the lodash flow method, I am not suggesting that it is an inherently better or worse option for using many method together to create one final value or product.

### 1.1 - The flow method

```js
let func1 = _.flow([
    // chunk into an array of arrays
    (arr) => {
        return _.chunk(arr, 3)
    },
    // create objects and store element value as
    // a prop n prop of the new object
    (grid) => {
        return _.map(grid, (row, y) => {
            return row.map((n, x, col) => {
                return {
                    x: x,
                    y: y,
                    i: y * 3 + x,
                    n: n
                };
            })
        })
    },
    // flatten back
    _.flatten
]);
// demo
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(func1(a));
/*
[ 
  { x: 0, y: 0, i: 0, n: 1 },
  { x: 1, y: 0, i: 1, n: 2 },
  { x: 2, y: 0, i: 2, n: 3 },
  { x: 0, y: 1, i: 3, n: 4 },
  { x: 1, y: 1, i: 4, n: 5 },
  { x: 2, y: 1, i: 5, n: 6 },
  { x: 0, y: 2, i: 6, n: 7 },
  { x: 1, y: 2, i: 7, n: 8 },
  { x: 2, y: 2, i: 8, n: 9 }
]
*/
```

### 1.2 - The top level function of lodash

```js
let func1 = (a) => {
    return _(a)
    .chunk(3)
    .map((row, y) => {
        return row.map((n, x, col)=>{
            return {
                x: x,
                y: y,
                i: y * 3 + x,
                n: n
            };
        })
    })
    .flatten()
    .value();
};
// demo
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(func1(a));
/*
[ 
  { x: 0, y: 0, i: 0, n: 1 },
  { x: 1, y: 0, i: 1, n: 2 },
  { x: 2, y: 0, i: 2, n: 3 },
  { x: 0, y: 1, i: 3, n: 4 },
  { x: 1, y: 1, i: 4, n: 5 },
  { x: 2, y: 1, i: 5, n: 6 },
  { x: 0, y: 2, i: 6, n: 7 },
  { x: 1, y: 2, i: 7, n: 8 },
  { x: 2, y: 2, i: 8, n: 9 }
]
*/
```

### 1.3 - The lodash chain method

```js
let func1 = (a) => {
    return _.chain(a)
    .chunk(3)
    .map((row, y) => {
        return row.map((n, x, col)=>{
            return {
                x: x,
                y: y,
                i: y * 3 + x,
                n: n
            };
        })
    })
    .flatten()
    .value();
};
// demo
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(func1(a));
/*
[ 
  { x: 0, y: 0, i: 0, n: 1 },
  { x: 1, y: 0, i: 1, n: 2 },
  { x: 2, y: 0, i: 2, n: 3 },
  { x: 0, y: 1, i: 3, n: 4 },
  { x: 1, y: 1, i: 4, n: 5 },
  { x: 2, y: 1, i: 5, n: 6 },
  { x: 0, y: 2, i: 6, n: 7 },
  { x: 1, y: 2, i: 7, n: 8 },
  { x: 2, y: 2, i: 8, n: 9 }
]
*/
```

## 2 - A lodash flow distance example

The distance formula came to mind when thinking of a quick example of using flow. This might not be the best example of using \_.flow, as the formal is simple enough where it could just be expressed in a single line. Never the less if you do not have much experience with \_.flow this simple example should help give you the basic idea of why \_.flow can be useful.

### 2.1 - The vanilla js distance formula

So if I where to start working on something in javaScript that required the use of a distance formula I might add something like this in my project.

```js
let distance = function (x1, y1, x2, y2) {
    return Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
};
 
console.log(distance(10, 15, 90, 22)); // 80
```

Maybe this method would be part of a framework, or just a stand alone method like this. However for the sake of this post that involves the use of \_.flow this is an example of something that can be broken down into a situation in which a function is created that is the result of one function flowing into another. That is instead of doing everything in a single line, I could have a method that excepts the four arguments preforms a single step, and then passes the result to the next function and so forth.

### 2.2 - Using \_.flow to break things down

Another way of producing the same method would be to use \_.flow, by passing an array of methods to it. The first method in the array would accept the four arguments and return the product of Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2). That product will then be passed as the first argument for Math.sqrt, and then its product will be passed as the first argument of Math.round.

```js
let forA = function (a1, a2) {
    return Math.pow(a1 - a2, 2);
};
 
let dist = _.flow([
   function (x1, y1, x2, y2) {
       return forA(x1, x2) + forA(y1, y2)
   },
   Math.sqrt,
   Math.round
]);
 
console.log(dist(10, 15, 90, 22)); // 80
```

## 3 - Conclusion

So then the lodash flow is one of several options when it comes to making use of two or more methods on lodash. There are a whole lor of other tools in the toolbox also that are relevant to the use of a function such as flow such as the lodash mixin method that can eb used as a way to add my own methods to lodash that in turn can be used with methods like flow, but also methods like chain and the main lodash method. What is nice about flow though is that it is a little more friendly when it comes to adding my own functions without extending lodash with the mixin method.