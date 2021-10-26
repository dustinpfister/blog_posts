---
title: JavaScript undefined value and keyword what to know
date: 2019-01-30 16:16:00
tags: [js]
layout: post
categories: js
id: 368
updated: 2021-10-26 06:58:47
version: 1.28
---

In [javaScript undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is a value that comes up often. For one thing the undefined value is the default value for variables that are declared, but do not have any value assigned to them. In addition if I attempt to access an object property value that is not there, then the result is undefined. If I attempt to call an object property that I expect is a function, but turns out to be undefined, that can result in an Error that is the result of calling undefined. This can often be the case when choosing to go with [function expressions](/2019/01/27/js-function-expression/) rather than [declarations](/2019/04/11/js-function-declaration/) and neglect to do what is required to keep that from happening, or it could just be a simple typo.

When working with functions a value of undefined is what is returned by a function by default unless something else is returned by using the [return keyword](/2019/03/01/js-javascript-return/). This might be a good thing in some cases as undefined will evaluate to false, so when it comes to functions that return a boolean value it might not always present a problem. Still it might be a good idea to have the function return false anyway just for the sake of making things explicit.

There is also the undefined keyword that can be used to intentionally set a variable to undefined, and can also be used in expressions. This is often used as a way to test for undefined by combining the undefined keyword with an identity operator and a value that is to be tested.

So chances are if you have been fiddling with javaScript for at least a little while, chances are you have come across undefined a few times all ready. However there is much to be aware of when it comes to this value in javaScript. In this post I will be outlining some examples that point out some things that a javaScript developer should be aware of when it comes to undefined in javaScript.

<!-- more -->

## 1 - javaScript undefined defined

In javaScript undefined is a primitive value, and a global property that represents that value. In this section I will cover some examples that demonstrate some typical situations in which a javaScript developer will run into the undefined primitive. This might be a good staring point before moving on to other topics surrounding the undefined value.

### 1.1 - when a variable is declared, but not assigned anything.

When a variable is declare but is not assigned a value other than undefined, the default value for that variable is undefined.The same is true of object properties that have not been added to an object yet, this also includes array elements sense arrays are a kind of object in javaScript.

```js
var n;
 
console.log(typeof n); // undefined
```

### 1.2 - undefined is what is returned by a function by default

When writing a function that returns some kind of result, if nothing is returned then the default value that is returned is undefined. To have a function return something other than undefined the return keyword can be used inside the body of a function to define what it is that is to be returned.

```js
var noop = function () {};
var foo = function () {
    return 'bar';
};
 
console.log(noop()); // undefined
console.log(foo()); // 'bar'
```

### 1.3 - undefined is the default value for an argument

When writing a function that accepts one or more arguments if an argument is not given then the default value for the argument is undefined. So testing for undefined is often used as a way to determine of no argument is given,and then thus set a default for that argument when writing a function.

```js
var sum = function (a, b) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    return a + b;
};
 
console.log(sum()); // 0
console.log(sum(5)); // 5
console.log(sum(2,6)); // 8
```

## 2 - Calling javaScript undefined

When first starting out with javaScript you might find yourself running into errors that are the result of calling undefined. One reason why thins might happen could be a result of the difference between javaScript declarations and javaScript expressions. If a function is a javaScript expression then it can only be called after it is defined, and assigned to a variable. If it is not defined yet this can result in calling the undefined value which of course results in a kind of error.
So then there are two general ways to avoid this, if you are going to use expressions just make sure that they are set to the variable that you are calling them off first before calling them. The other way to avoid this is to not use function expressions, but function declarations in place of expressions.

```js
// function declaration
console.log(func1()); // 'foo'
function func1() {
    return 'foo';
};
console.log(func1()); // 'foo'
 
// function expression
try {
    console.log(func2());
} catch (e) {
    console.log(e.message); // func2 is not a function
    console.log(func2 === undefined); // true
}
var func2 = function () {
    return 'bar';
};
console.log(func2()); // 'bar'
```

There are a number of other reasons why calling undefined might happen. If for whatever the reason there is not a function in what is being called that will result in this kind of error. This can often be the result if you are using a new native javaScript feature that is not yet well supported in the browser that you are testing on. This is one of the reasons why it is a good idea to check the browser support for any and all native methods you might be using. Certain native methods have better legacy support than others.

## 3 - javaScript undefined will result in a true value when used with isNaN

One of the weird things about the isNaN method is that it will return true for some values that are not NaN including the undefined value. Because of this there are often isNaN methods in various frameworks besides the fact that there is a native method for doing so that do a better job of finding out if a value is nan or not.

```js
console.log(isNaN(undefined)); // true
```

## 4 - The undefined literal or keyword

There is also the undefined keyword or the undefined literal as it might sometimes be called. This is often used as a way to test for undefined by way of an expression using the identity operator. I can not say that there are many instances in which I set a variable or property to undefined as there are other ways to do what is often the case with that. Also I do not see the point of passing undefined as an argument as that is the default value for an argument after all. Still for the most part I find myself using a undefined literal now and then so in this section I will be going over some code examples of this.

### 4.1 - A Basic example of the undefined literal

Whenever I use the undefined literal it is just abut always for the sake of testing for an undefined value. This is done by using the undefined literal as one of the operands of the identity operator, the other operand being the value to test.

```js

var a,
b = 42,
c = 'hello';

console.log( a === undefined ); // true
console.log( b === undefined ); // false
console.log( c === undefined ); // false
```

### 4.2 - Argument object and testing for undefined

As mentioned in the basic section of this post, the default value for a function argument is undefined if none is given. In addition the default value for an object property is also undefined. The value of undefined will also evaluate to false when converted to a boolean value. So then all of this works as it should when it comes to setting default values for function arguments, and properties of argument objects when making a function.

```js
var create = function (opt) {
    var state = {};
    opt = opt || {};
    state.width = opt.width || 320;
    state.height = opt.height === undefined ? 240 : opt.height;
    return state;
};
// can not set width to zero when using ||
var s1 = create({
        width: 0,
        height: 0
    });
console.log(s1.width, s1.height); // 320 0
```

## 5 - Using typeof in an expression that tests for undefined can result in a false negative

It would seem that some developers at [stack overflow](https://stackoverflow.com/questions/3390396/how-to-check-for-undefined-in-javascript) like to use the typeof operator in expressions that test for undefined as it will not throw an error in the event that a variable is not declared.

```js
let r;
try {
    r = typeof myVar === undefined;
} catch (e) {
    console.log(e.toString());
}
console.log(r); // false
```

However if a variable is not undefined that would imply that a variable is defined, but that it not the case. The variable is not even declared, let alone defined.

So then in a way there are three possible states, a variable is not even declared, a variable is declared but undefined, and a variable is declared and is a value other than undefined.

```js
r = 0;
try {
    r = Number(myVar === undefined);
} catch (e) {
    r = -1;
}
console.log(r); // -1
```

In this above example the value of r can be zero which is the default and will remain so if the variable myVar is both declared and defined. It will have a value of one if the variable is declared but undefined, and a value of negative one if it is undeclared.

## 6 - The javaScript undefined value is one of several values that converts to a false boolean value

The boolean value of undefined is false, alone with a bunch of other values in javaScript. One way to confirm this is to use the not operator twice. The reason why the not operator show be used twice is because the operator converts a value to boolean, but it also negates its value. So the operator can then be used again to convert it back to is true boolean value.

```js
console.log(!!undefined); // false
console.log(!!null); // false
console.log(!!0); // false
console.log(!!''); // false
console.log(!!NaN); // false
console.log(!!false); // false
```

Because the javaScript undefined value is evaluates to false it can be used as a way to feature test if a property is present in an object.

### 6.1 - Comparing undefined to null

So null is another interesting value in javaScript. Just like undefined the null value is also a primitive value. Also they are two primitive values in javaScript that do not have objects wrapped around them such as the case with Strings and Numbers. 

When using the equality operator a value of true is the result. This is because the equality operator converts types to a common type and then compares the result. Both the null and undefined values convert to false, and false equals false, so the result is a true value.

```js
console.log(undefined == null); // true
console.log(undefined === null); // false
```

However when the identity operator is used to make a comparison a false value is the result. This is because when the identity value is used type conversion does not occur. The null and undefined values are two different types, so the result is false.

## 7 - Undefined is a primitive value in javaScript

In javaScript the undefined value is an example of a primitive value. A primitive value if a value that is not an object of any kind like objects, arrays, and functions. Some primitive values have objects that wrap around them, this is the case with Strings and Numbers for example. A String might have prototype methods, and as such it might seem like it is another kind of Object, but it is very much a primitive value. In any case the undefined value in javaScript is one of two primitive values in which this is not the case anyway the other being the null value.

## 8 - Conclusion

The undefined value in javaScript comes up a lot in discussions when learning javaScript for the first time. A common mistake most new javaScript developers make involves errors resulting in calling undefined that can happen because of the nature of function expressions as well as a wide rang of other reasons. There is also the undefined keyword that us often used to test for undefined.