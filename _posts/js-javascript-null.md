---
title: javaScript null
date: 2019-03-11 19:47:00
tags: [js]
layout: post
categories: js
id: 399
updated: 2021-11-19 10:59:20
version: 1.24
---

So [javaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) is one of many possible values that a variable can be at any given time that stands the absence of an object value. On the surface it might seem that null is more or less the same as the [undefined](/2019/01/30/js-javascript-undefined/) value, but this is not the case. There are some subtle differences between undefined and null, and as such null is not meant to be a replacement for undefined or vice versa. 

A null value can be thought of as a lack of an identification value for what should be an object. This might be the main reason why the type of null is object when using the [javaScript typeof operator](/2019/02/15/js-javascript-typeof/) with a null value. This is then also something that a developer needs to test for when trying to access something that might nit be there. For example there is not just testing for the type of a value to see if it is an object and then moving on, there is testing for an object and on top of that testing to make sure that a value is not null also.

In addition it is true that null is a value that must be assigned, rather than a value such as that is the undefined value. The thing about undefined is that it is often the assumed default for variables that have been declared but not assigned anything, it is also a value that is obtained for object keys that have not been defined also. 

In this post I will be writing around some of the things to know about the javaScript null value when working out a project of some kid. There may only be so much to write about when it comes to null itself, but there might be a whole lot of ground to cover then it comes to various things that branch off from null. So then in the process of learning more about null, it might be possible to learn a thing or two about some other related topics in javaScript while we are at it here.

<!-- more -->

## 1 - javaScript null and undefined

The null value is one of several javaScripts primitive values such as numbers, and strings that represents the absence of any object value. There is some confusion surrounding null and a similar primitive value known as undefined in javaScript which might lead one to question why it is necessity to have two kinds of values that seem more or less the same in many ways. They are similar but there are reasons why a null value is part of javaScript, in some cases using null as a default value might be a better option compared to something like the number zero, or leaving an object property as undeclared and undefined, or declared but set to undefined.

In this section then I will be starting out with a few simple examples of null in core javaScript. Although I will be keeping these examples fairly simple, I still assume that you have at least some experience with javaScript before hand. If not you do have no experience, or you are still fairly new to javaScript you might want to take a step back and start with a post that has to do with the basics of [getting started with javaScript](/2018/11/27/js-getting-started/).

### - Source code examples are up on Github

My [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-null) on Github is where I have parked my source code examples for this post, this is also where I park source code for my many [other posts on javaScript](/categories/js/).

### 1.1 - null must be assigned.

One major difference to undefined is that the null value must be assigned to a variable or object property. By default the undefined value is what the value of an variable that is declared but has not been assigned anything. Same is true of object properties, and what is returned by a function, in any case the null value must be assigned.

```js
var a,
obj = {},
func = function () {};
 
console.log(a); // undefined
console.log(obj.foo); // undefined
console.log(func()); // undefined
 
var b = null,
obj2 = {
    foo: null
},
func2 = function () {
    return null;
};
 
console.log(b); // null
console.log(obj2.foo); // null
console.log(func2()); // null
```

### 1.2 - In some cases null can be set as a value, but undefined can not.

In some cases it is possible to set an argument to null, but not to undefined. For example many functions are designed in a way in which there is a default value that is assigned to an argument when do argument is given. Often this works by testing for the undefined value by way of strict type equality. In the event that the argument is undefined a default value is assigned for the argument, so it can not be set to undefined, but it can be set to null.

```js
var foo = function (bar) {
    bar = bar === undefined ? 'foobar' : bar;
    return bar;
};
 
console.log( foo() ); // 'foobar'
console.log( foo(undefined) ); // 'foobar'
console.log( foo(null) ); // null
```

## 2 - Typeof null is object.

So when the typeof operator is used to find the type of a value that is null, the result is an object.

```js
console.log(typeof null); // 'object'
```

Apparently this is a bug that has been around sense the beginning of javaScript way back in the day. However given that the meaning of null is the absence of an object value, then maybe it is not such a bad thing. Still this can result in problems in some situations, requiring something like this to fix it.

```js
var func = function (obj,dx) {
    if (typeof obj === 'object' && obj != null) {
        return obj.x += dx;
    }
    return -1;
};
 
console.log(func({x:5},5)); // 10
console.log(func(null,5)); // -1
```

Without a check for nul then what will result is an error when trying to access a property of null.

## 3 - Adding one to null vs doing the same with undefined

One note worthy difference between null and and undefined is what happens when you add a number to null compared to doing the same with an undefined value. When adding a number to an undefined value the result is NaN, where doing the same with a null value will result in the number that was added to null. For this reason alone it might be better to use null as a define value fo sorts compared to undefined.

```js
console.log( null + 1 ); // 1
console.log( undefined + 1 ); // NaN
```

## 4 - Conclusion

So null in javaScript is one of several primitive values in javaScript that a developer should be aware of. It will evaluate to false when it comes to converting to boolean, and has a type of object. It is often confused with the undefined value but there are many little deferences between the two types of values.

