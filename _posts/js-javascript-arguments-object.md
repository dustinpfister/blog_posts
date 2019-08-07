---
title: javaScript arguments object in action
date: 2019-01-21 19:27:00
tags: [js]
layout: post
categories: js
id: 362
updated: 2019-08-07 15:19:08
version: 1.11
---

When writing a function in javaScript, inside the body of that function there is an special variable that can be used to access any and all arguments that have been passed to the function when it is called. This variable is known as the [javaScript arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) which is an array like object that can be used to find out things like the number of arguments that was given to the function when it was called, along with the values of course. Because it can be used as a way to know how many arguments where passed when the function was called the javaScript arguments object can be used to make functions that behave differently depending on the number of arguments given to the function. So if you every came across a function that behaves differently depending on the number of arguments given the arguments object is one way to go about making such a function.

<!-- more -->

## 1 - javaScript arguments object basic example

For a basic example of the javaScript arguments object here is a simple function that uses this as a way to return a different result depending on the number of arguments that is given when the function is called.

```js
var func1 = function (a, b) {
 
    if (arguments.length == 2) {
        return a + b;
    }
 
    return a;
 
};
 
console.log(func1(40,2)); // 42
 
console.log(func1(42)); // 42
```

Without using the arguments object to find the number of arguments that is given the function would return NaN when used with just a single argument in the event that just a single argument is given. So the arguments object is there to help write functions that will work differently depending on the number of arguments that is given, and it can also be used as an alternative way to get the values of argument apart from the named parameter names.

## 2 - Why it is the javaScript arguments object rather than arguments array

The arguments object is called the arguments object because it is not an instance of an Array. So it is actually just a plain old object, however it can be considered an array like object. This is because although it is not an instance of an Array it is structured like an array, so some Array methods can be used with it via something like Function.call.

```js
let func = function () {
 
    let i = 0;
 
    [].forEach.call(arguments, (n) => {
 
        i += n;
 
    });
 
    return i;
 
};
 
console.log( func(1,2,3,4,5)); // 15
```

## 3 - The length property of the javaScript arguments object

The length property can be used to know the number of arguments that where passed to the function when it was called. This can then be used as a way to have more than one expression that is used for something depending on the number of arguments that are given. For example say I want a method that will just get an element in an array by index if it is given one argument, but will use a more complex expression when given two arguments. 

```js
let mod = {
 
    grid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
 
    w: 3,
 
    get: function (xi, y) {
 
        if (arguments.length < 1) {
            return null;
        }
 
        if (arguments.length === 1) {
 
            return this.grid[xi];
 
        } else {
 
            return this.grid[y * this.w + xi];
 
        }
 
    }
 
};
console.log(mod.get(1)); // 2
console.log(mod.get(2,1)); // 6
```

## 4 - Make urls array example of argument object use

okay now for an example that might intrastate something that is actual useful in some cases. Say you want a method where you pass a base url as the first argument, and then an array of file names as the second argument, and what the function produces is an array of urls to each file name from the base url. However there is one more thing, you also have the option to pass each file name as an argument rather than an array. For this the javaScript arguments object can be used to create an array from arguments when the number of arguments is not always known before hand.

```js
let makeURLArray = function (base, fn) {
    let arr = [];
    // if typeof fn === object assume an array
    if (typeof fn === 'object') {
        return fn.map((str) => {
            return base + '/' + str;
        });
    }
    // if typeof fn === string then loop over
    // all elements of arguments object except the first
    // one of course
    if (typeof fn === 'string') {
        let len = arguments.length,
        i = 1;
        while (i < len) {
            arr.push(base + '/' + arguments[i]);
            i += 1;
        }
        return arr;
    }
    return arr;
};
console.log(makeURLArray('./img', ['foo.png', 'bar.png', 'baz.png']));
console.log(makeURLArray('./img', 'foo.png', 'bar.png', 'baz.png'));
// both ways of using the method result in:
// [ './img/foo.png', './img/bar.png', './img/baz.png' ]
```

## 5 - Conclusion

Hope this post helps to put some confusion to rest when it comes to the nature of the arguments object in javaScript. The arguments object does come in handy know and then whenever a situation arises where it is needed.