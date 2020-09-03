---
title: Booleans in javaScript what to know
date: 2018-11-28 15:06:00
tags: [js]
layout: post
categories: js
id: 339
updated: 2020-09-03 11:03:51
version: 1.28
---

In [javaScript](https://en.wikipedia.org/wiki/JavaScript) one of the most important primitive values to work with is a [js boolean value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean). To create a boolean there is the boolean literal, and the Boolean object. In addition booleans are often what is returned when using a method such as isArray and can happen as a result of an evaluation of an expression as well. 

A boolean is a value that only has two possible values true, or false, and as such numbers, and other values can often be used as a replacement for boolean values, although doing so will eat up more memory, and often a boolean is just the appropriate choice for simple true and false values. There are some tricks that I have picked up here and there when it comes to booleans, so I will be sure to write about everything that I know about in this post when it comes to Booleans and how to work with them is a javaScript programing environment.

<!-- more -->

## 1 - js booleans and what to know before hand

This is not a getting started post on javaScript, in this post I am writing just about booleans and how they are used with programming tasks with javaScript. If you are new to javaScript you might want to start with my [getting started post on javaScript](/2018/11/27/js-getting-started/). 

Also if you are not so new to javaScript but are still not sure that you are ware of every little tip and tick surrounding boolean values in javaScript this post might still be of value to you.

## 2 - A Boolean literal

For the most part if I want to set a boolean value I just set it using a literal. When it comes to creating a boolean value by way of a literal then true and false boolean literals can be used do do just this. For this example I have a boolean called firstRun that is set to true, I then also have a loop that will fire once every second by way of using [setTimeout](/2018/12/06/js-settimeout/) to delay the next call of the method. The first time that the loop fires, a 'first run' message will log to the console, and the firstRun boolean will set back to false. Because I am using the firstRun boolean in an if statement, the 'first run' message will only fire once.

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

So literals are one way to end up with a boolean value, that is by just simply setting it to a variable with one of these true or false keywords. There are however several other ways to end up with a boolean value, for example they are often the result of expressions, and function calls. Also it might help to just look over a few more examples of booleans anyway so lets continue with this.

## 3 - Booleans from expressions

Boolean values can also be the result of an expression, that is a collection of numbers, strings, variables that contains such values combined with one or more operators. I will not be getting into operators and expressions in general here, that is a matter for another post. However I will be going over a few examples of expressions that evaluate to a boolean value in this section. 

For example say I have a x variable that holds a number value and I want another boolean that will be true when the x variable is in a certain range, otherwise the value will be false.

```js
var x = 5;
var inRange = x > 4 && x < 10;
console.log(inRange); // true
```

### 3.1 - Using !0 and !1

Many projects that aim to make the source code as compact as possible take advantage of all kinds of tricks to reduce file size. There is using a library that does a decent job of reducing the file size by removing all whitespace, and preforming replace operations for all variable names to smaller variable names that are just one character. However there is then going beyond that and trying to find yet even more ways to crunch things down even more. 

Sometimes I see the use of the expression !0 to replace the boolean literal true, and !1 to replace false as one way t go about crunching down file size even more.

```js
var g = !0; // true
var b = !1; // false
```

This works because the number 0 evaluates to false, and the ! operator both converts to boolean and negates the value as well. For projects where I really do want to crunch down file size it might be called for, but it reduces readability for some developers also. You would think that doing this would not make a big difference, and in many cases you might very well be right about that. However if the volume of source code is large enough, little tricks like this could add up a bit. In any case there is still just understanding out very simple expressions such as this work.

### 3.2 - Using !! to negate back

So the ! operator converts a non boolean value to a boolean, but it is also negated. So just calling the operator twice will then negate it back to its original value.

```js
var a = !!''; // false
var b = !!'foo'; // true
var c = !!1; // true
```

This is yet another tick I see used often as a way to convert something to a boolean value, and then convert that boolean value back to the original boolean value that it will evaluate to.

## 4 - The Boolean Object

In javaScript there is the Boolean global object that can be used as a constructor with the new keyword, or not. When used with the new keyword it will return an object and not a primitive Boolean value. The primitive value of the object can be retrieved with the valueOf method, but I can not think of much of any reason to create a Boolean variable this way.

### 4.1 - Using the Boolean Object as a constructor

When using the Boolean Object as a constructor it returns an object, and not a boolen. However the valueOf method can be used to get the boolean value of the Object.

```js
var b = typeof new Boolean(false); // 'object'
var c = typeof new Boolean(false).valueOf(); // 'boolean'
```

Making booleans this way is not such a great idea. It makes doing so far more complicated than it needs to be, and can lean to unexpected results if you are not aware of the fact that an object evaluates to true.

```js
var foo = new Boolean(false),
n = 0;
if (foo) {
    n += 1;
}
console.log(n); // 1
```

### 4.2 - Using the Boolean Object as a method

When omitting the new keyword a boolean primitive value will be returned rather than an object, making it a way to convert to a boolean.

```js
var a = Boolean(null); // false
```

I do not use this as well, because the !! operator works just fine to get such a task done. Still the Boolean Object is something to be aware of as it is often used in examples.

## 5 - Conclsuion

So hopefully this post helped you with some of the basics of boolean values in javaScript. There is much more to learn when it comes to the use of Boolean values though, the bulk of which is only gained by experience I would say. Just keep working on projects, learning by doing is by far the best way to learn.