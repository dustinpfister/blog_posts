---
title: Booleans in javaScript what to know
date: 2018-11-28 15:06:00
tags: [js]
layout: post
categories: js
id: 339
updated: 2018-11-28 19:15:27
version: 1.10
---

In [javaScript](https://en.wikipedia.org/wiki/JavaScript) one of the most important primitive values to work with is [booleans](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean). To create a boolean there is the boolean literal, the Boolean object. In addition booleans can happen as a result of an expression as well. There are some tricks that I have picked up here and there when it comes to booleans, so I will be sure to write about everything that I know about in this post when it comes to Booleans with javaScript.

<!-- more -->

## 1 - What to know

This is not a getting started post on javaScript, in this post I am writing just about booleans and how they are used with programming tasks with javaScript. If you are new to javaScript you might want to start with my [getting started post on javaScript](/2018/11/27/js-getting-started/).

## 2 - A Boolean literal

For the most part if I want to set a boolean value I just set it using a literal. The true and false boolean literals can be used do do just this. For this example I have a boolean called firstRun that is set to true, I then also have a loop that will fire once every second by way of using setTimeout. The first time that the loop fires, a 'first run' message will logg, and the firstRun bool will set back to false.

```js
var firstRun = true;
var loop = function () {
 
    setTimeout(loop, 1000);
 
    if (firstRun) {
        console.log('first run!');
        firstRun = false;
    }
 
    console.log('tick');
 
}
loop();
```

## 3 - Booleans from expressions

Boolean values can also be the result of an expression. For example say I have a x variable that holds a number value and I want another boolean that will be true when the x variable is in a certain range.

```js
var x = 5;
var inRange = x > 4 && x < 10;
console.log(inRange); // true
```

### 3.1 - Using !0 and !1

many projects that aim to make the source code as compact as possible take advantage of all kinds of tricks to reduce file size. Sometimes I see the use of the expression !0 to replace the boolean literal true.

```js
var g = !0; // true
var b = !1; // false
```

This works because the number 0 evaluates to false, and the ! operator both converts to boolean and negates the value as well. For projects where I really do want to crunch down file size it might be called for, but it reduces readability for some developers as well.

### 3.2 - Using !!

So the ! operator converts a non boolean value to a boolean, but it is also negated. So just calling the operator twice will then negate it back to its original value.

```js
var a = !!''; // false
var b = !!'foo'; // true
var c = !!1; // true
```
