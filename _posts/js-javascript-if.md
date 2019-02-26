---
title: javaScript if statements and related concerns
date: 2019-02-25 11:22:00
tags: [js]
layout: post
categories: js
id: 390
updated: 2019-02-25 20:56:28
version: 1.2
---

In this post I will be writing about javaScript if statements, and other related concerns when working with conditionals in general when making a javaScript project.

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
    console.log('the answser is a string');
} else {
    if (n === 42) {
        console.log('the answer is a number.')
    } else {
        console.log('no answer');
    }
}
// > 'the answer is a number'

```