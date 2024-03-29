---
title: JavaScript undefined value and keyword what to know
date: 2019-01-30 16:16:00
tags: [js]
layout: post
categories: js
id: 368
updated: 2021-11-30 10:44:40
version: 1.48
---

In [javaScript undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is a value that comes up often when working with various code examples, and projects. For one thing the undefined value is the default value for variables that are declared, but do not have any value assigned to them. In addition if I attempt to access an object property value that is not defined, then the result is undefined. However an object key and a variable can be both declared, and intensionally assigned the value undefined bu using the undefined keyword, or preforming any kind of action that will result in the value of undefined being set to the variable or object property.

If I attempt to call an object property that I expect is a function, but turns out to be undefined, that can result in an Error that is the result of calling undefined. This can often be the case when choosing to go with [function expressions](/2019/01/27/js-function-expression/) rather than [declarations](/2019/04/11/js-function-declaration/) and neglect to do what is required to keep that from happening, or it could just be a simple typo.

When working with functions a value of undefined is what is returned by a function by default unless something else is returned by using the [return keyword](/2019/03/01/js-javascript-return/). This might be a good thing in some cases as undefined will evaluate to false, so when it comes to functions that return a boolean value it might not always present a problem. Still it might be a good idea to have the function return false anyway just for the sake of making things explicit.

There is also the undefined keyword that can be used to intentionally set a variable to undefined, and can also be used in expressions when it comes to testing for undefined. That is that I often find myself using the undefined keyword as a way to test for undefined by combining the undefined keyword with an [identity operator](/2019/02/06/js-javascript-equals/) and a value that is to be tested for undefined.

So chances are if you have been fiddling with javaScript for at least a little while, are you have come across undefined a few times all ready. However there is much to be aware of when it comes to this value in javaScript, not just with the value itself, but of course with many things in core javaScript that branch off from it. For example there is the fact that undefined will evaluate to false, and that the undefined value is just one of many other values that will do so. So in this post I will be outlining some examples that point out some things that a javaScript developer should be aware of when it comes to undefined in javaScript, and I am sure that I will at least touch base on all kinds of other things in the process of doing so.

<!-- more -->

## 1 - javaScript undefined defined

In javaScript the undefined value is a primitive value, and a global property that represents that value. In this section I will cover some examples that demonstrate some typical situations in which a javaScript developer will run into the undefined primitive. This might be a good staring point before moving on to other topics surrounding the undefined value.

Although I will be keeping these examples relatively simple, I assume that you have at least some experience with javaScript when it comes to the very basics of how to [get started with javaScript](/2018/11/27/js-getting-started/).

### - The examples in this post are on github

The source code examples on the undefined keyword that are found in this post can also be found in my [test vjs Github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-undefined). This repository also includes all the other source code examples for my [various posts on javaScript in general](/categories/js/).

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

When first starting out with javaScript you might find yourself running into errors that are the result of [calling undefined](http://net-informations.com/js/err/function.htm). This could happen for a few reasons that I will take a moment to outline here in this section.

### 2.1 - It may just be a simple typo

One reason why a developer might run into this kind of problem might just be because they made a simple mistake when it comes to the name of the function that they are calling. This is one that I find myself still doing now and then also when I am going a little to fast and being careless. You see javaScript is very much a case sensitive language so a function named foo is not the same thing as a function named Foo with an upper case F. So then if function is set to the foo property of an object, and I am calling the Foo property of the object then I am calling undefined, or any other separate value that might be assigned to that separate public key name.

```js
var obj = {
    foo: function () {
        return 'bar';
    }
};
// calling obj.foo
console.log(obj.foo()); // bar
// calling obj.Foo with an uppercase F
try {
    obj.Foo();
} catch (e) {
    console.log(e.message); //obj.Foo is not a function
}
```

### 2.2 - Use of function expressions can result in calling undefined if used carelessly

One reason why one might end up calling undefined could be a result of the difference between javaScript declarations and javaScript expressions. If a function is a javaScript expression then it can only be called after it is defined, and assigned to a variable, object, or called right away such as with an [IIFE](/2020/02/04/js-iife/). If it is not defined yet this can result in calling the undefined value which of course results in a kind of error that might say something like calling undefined, or that the name of the function is not a function.

So then there are two general ways to avoid this, if you are going to use expressions just make sure that they are set to the variable, of object property that you are calling them off first before calling them. The other way to avoid this is to not use function expressions, but function declarations in place of expressions. When using declarations the function can actually be called above the array at which it was defined, which is of course one major talking point when it comes to the differences between function expressions and declarations.

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

### 6.1 - Using the double not operator with some values including undefined

When the double not operator is used with the undefined value the resulting boolean value is false.

```js
console.log(!!undefined); // false
console.log(!!null); // false
console.log(!!0); // false
console.log(!!''); // false
console.log(!!NaN); // false
console.log(!!false); // false
```

Because the javaScript undefined value is evaluates to false it can be used as a way to feature test if a property is present in an object.

### 6.2 - Comparing undefined to null

So null is another interesting value in javaScript. Just like undefined the null value is also a primitive value. Also they are two primitive values in javaScript that do not have objects wrapped around them such as the case with Strings and Numbers. 

When using the equality operator a value of true is the result. This is because the equality operator converts types to a common type and then compares the result. Both the null and undefined values convert to false, and false equals false, so the result is a true value.

```js
console.log(undefined == null); // true
console.log(undefined === null); // false
```

However when the identity operator is used to make a comparison a false value is the result. This is because when the identity value is used type conversion does not occur. The null and undefined values are two different types, so the result is false.

## 7 - Sparse arrays and the undefined value

I have mentioned that the default value for an object key is the undefined value, which will be the case when it comes to working with an object that has numbered rather than named keys such as an array. You see the thing about arrays in javaScript is that they are really just a certain kind of object, and they cane be sparse in some situations. That is that it is possible to have an array of a certain element length such as ten, and only have one actual public key with a value attached to it, thus the other 9 values will default to undefined. In some situations this can result in some problems, so in this section I am addressing the issue of sparse arrays and the undefined value in javaScript.

### 7.1 - Basic sparse array example

First off there is starting out with at least one basic example that shows how it is possible to even end up with a sparse array to begin with. One way to end up with one is to just create a new empty array by way of the Array constructor or the bracket syntax. Then use the bracket syntax to set a new element index that is above zero, say at index 9. This would then result in an [array with a length](/2018/12/14/js-array-length/) of ten, but with only one public key that is set to the numbered key value of 9. Each of the other index values in the array are undefined as no value has been set for the index, thus this would be a kind of sparse array.

```js
var a = [];
a[9] = 42;
console.log(a.length); // 10
console.log(a[0] === undefined); // true
```

### 7.2 - Creating a sparse array with Array.from

The [array from method](/2020/01/27/js-array-from/) is a static method of the Array Global object in core javaScript that can be used as a way to create a new array from an array like object. An array like object is any object that is formated like an array in terms of the own properties of the object, but the prototype of the object is not Array. For this example I am creating a plain old Object with a prototype of Object by way of the curly bracket syntax, and setting some properties that are formated like an array, but not just any array, a sparse array. So then this object contains a 9 key, and a length key that has a value of 10, but then that is it in terms of public keys. A such every other value in the index range of the resulting array that is returned by Array from will be undefined.

```js
var a = Array.from({
    9: 42,
    length: 10
});
console.log(a.length); // 10
console.log(a[0] === undefined); // true
```

### 7.3 - Seeing what the public keys are of an array with Object.keys

One way to go about checking out what the deal is with public keys of an array is would be to use a method like the [Object.keys](/2018/12/15/js-object-keys/) method. This method will return an array of public key names for the given object, so then if a sparse array is given to this method the returned result will not end up being an array of numbers from zero to one less of the length.

```js
var a = [];
a[9] = 42;
console.log( Object.keys(a) ); // [ '9' ]
```

### 7.4 - Array map and sparse arrays

One thing that can cause problem with sparse arrays is how the [array map prototype method](/2020/06/16/js-array-map/) will work with sparse arrays. One might assume that the function will be called for each element index in the array from index 0 to one less of the length of the array as arrays in javaScript are zero relative. However it would seem that this assumption would be wrong actually. It seems that what is really going on is that the map method will only be called for each numbered public key in the range of the array, and if no key is set for the array, then the function will not fire for that index.

```js
var a = [];
a[9] = 42;
var c = 0;
var b = a.map(function (el) {
        c += 1;
        return el * 2;
    });
console.log(b); // [ <9 empty items>, 84 ]
console.log(c); // 1
```

### 7.5 - Using a while loop and making a custom map method

So then there is making a custom array map method using a while loop as one way to go about addressing this issue with sparse arrays and the array map method. By setting a variable to a value of zero, and then using the length of the array as a limit to stop looping, I can then call a given function for each index value, rather than each public key like the array map method does.

```js
var custMap = function (arr, func) {
    var i = 0,
    newArr = [],
    len = arr.length;
    while (i < len) {
        newArr[i] = func(arr[i], i, arr);
        i += 1;
    }
    return newArr;
};
// demo
var a = [];
a[9] = 42;
var c = 0;
// using this custom map method
var b = custMap(a, function (el, i, arr) {
        c += 1;
        if (el === undefined) {
            return 0;
        }
        return el * 5;
    });
console.log(b); // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 210 ]
console.log(c); // 10
```

## 8 - Undefined is a primitive value in javaScript

In javaScript the undefined value is an example of a primitive value. A primitive value if a value that is not an object of any kind like objects, arrays, and functions. Some primitive values have objects that wrap around them, this is the case with Strings and Numbers for example. A String might have prototype methods, and as such it might seem like it is another kind of Object, but it is very much a primitive value. In any case the undefined value in javaScript is one of two primitive values in which this is not the case anyway the other being the null value.

## 9 - Conclusion

The undefined value in javaScript comes up a lot in discussions when learning javaScript for the first time. A common mistake most new javaScript developers make involves errors resulting in calling undefined that can happen because of the nature of function expressions as well as a wide rang of other reasons. There is also the undefined keyword that us often used to test for undefined.