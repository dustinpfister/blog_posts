---
title: javaScript if statements and related concerns
date: 2019-02-25 11:22:00
tags: [js]
layout: post
categories: js
id: 390
updated: 2019-02-25 21:21:54
version: 1.6
---

In this post I will be writing about [javaScript if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statements, and other related concerns when working with conditionals in general when making a javaScript project. In javaScript there is also a conditional operator as well that can be used as a short hand for if else statements as well.

<!-- more -->

## 1 - javaScript if

A basic if statement in javaScript might look something like this.

```js
var str = 'foo';
 
// with brackets
if (str === 'foo') {
    console.log('bar');
}
// > 'bar'

```

it must start out with the if keyword followed by parenthesis, and within the parentheses must be and expression of anything that will evaluate to a true of false value of one kind of another. It does not have to be a boolean value, as just about any kind of value in javaScript has a true or false equivalent depending on the type and value of what is being evaluated.

## 2 - Some more basic examples

if statements can have brackets or not, and can also be used with an option else block as well.

```js
var n = 42;

// with brackets
if (n === 42) {
    console.log('the answer');
}
// > 'the answer'

// without
if (n >= 40)
    console.log('the answer');
// > 'the answer'

if (n === '42') {
    console.log('the answer is a string');
} else {
    if (n === 42) {
        console.log('the answer is a number.')
    } else {
        console.log('no answer');
    }
}
// > 'the answer is a number'

```

## 3 - Else is not needed when making a function that returns something

If a function that is being made that is using the return keyword to return a result when called then else does not need to be used. The reason why is that return will stop any further execution of any additional code, so it can be used as a way to break out of a function. This differs from blocks of code where I might only want some code to run if and only if a condition is not met. 

```js
var isNeg = function (n) {
    // if type is number and less than zero
    if (typeof n === 'number' && n < 0) {
        // return true
        return true;
    }
    // if we get here return false
    return false;
};
 
console.log(isNeg(NaN)); // false
console.log(isNeg('foo')); // false
console.log(isNeg('-1')); // false
console.log(isNeg(42)); // false
console.log(isNeg(-1)); // true
```