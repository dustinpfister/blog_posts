---
title: javaScript arguments object in action
date: 2019-01-21 19:27:00
tags: [js]
layout: post
categories: js
id: 362
updated: 2020-11-18 10:32:24
version: 1.25
---

When writing a [function in javaScript](/2019/12/26/js-function/), inside the body of that function there is an special local variable that can be used to access any and all arguments that have been passed to the function when it is called. This variable contains a value that I have come to known as the [javaScript arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments).

The javaScript arguments object is an array like object that is formated like and Array, but is not actually an instance of an Array. What I mean by that is that it is an object with numbered public key names, and a length property just like that of an array. However because it is not actually an array it does not have array prototype methods at the ready like Array.map, Array.filter, and so forth.

This object of arguments can be used to find out things like the number of arguments that was given to the function when it was called, along with the values of each argument as one might expect. Because it can be used as a way to know how many arguments where passed when the function was called the javaScript arguments object can be used to make functions that behave differently depending on the number of arguments given to the function when it is called. So if you ever come across a function that behaves differently depending on the number of arguments given to it when it is used, then the arguments object is one way to go about making such a function.

So then this post will be on a few quick examples that make use of the arguments object to help show why this object is useful in many situations when writing functions. In the process I might also manage to touch base on some related topics such as the Function.length property that might also come into play when doing something with this special object in javaScript functions.

<!-- more -->

## 1 - javaScript arguments object basic example

In this section I will be starting out with some very basic examples of the argumnets object in javaScript.

### 1.1 - The arguments.length property is the number of arguments given

One basic feature of the arguments object is the length property, for an example of this feature here is a function that uses the arguments object as a way to return a different result depending on the number of arguments that is given when the function is called. In the event that two arguments are given then the returned result is the sum of those two arguments, however if just one argument is given then the returned result is just that number rather than adding it to undefined.

```js
let func1 = function (a, b) {
    if (arguments.length == 2) {
        return a + b;
    }
    return a;
};
console.log(func1(40,2)); // 42
console.log(func1(42)); // 42
```

It might be very basic, but you get the basic idea. The length property of the arguments object will give the number of arguments. There is a bit more to the arguments object though when it comes to the basics, so maybe just a few more basic examples of the arguments object is in order for this section before moving on.

### 1.2 - The numbered keys of the arguments object contains the values of the arguments

The keys of the arguments are numbered from zero forward just like an array, and the values for each key are the given values for the arguments.

```js
let sum = function (a, b) {
    let sum = 0,
    i = 0,
    len = arguments.length;
    if (len >= 1) {
        while (i < len) {
            sum += arguments[i];
            i += 1;
        }
    }
    return sum;
};
 
console.log(sum()); // 0
console.log(sum(5)); // 5
console.log(sum(5, 10, 7)); // 22
```

### 1.3 - The function length property will given the expected number of arguments

The function length property will give the expected number of arguments for a function.

```js
let func = function (x1, y1, x2, y2) {
    return {
        nums: Array.from(arguments),
        paramCount: func.length,
        argumentCount: arguments.length,
        per: arguments.length / func.length
    };
};
let r = func(5, 6);
console.log(r);
// { nums: [ 5, 6 ], paramCount: 4, argumentCount: 2, per: 0.5 }
```

## 2 - Why it is the javaScript arguments object rather than arguments array

The arguments object is called the arguments object because it is not an instance of an Array. So it is actually just a plain old object, however it can be considered an array like object because of the way that it is formated. This is because although it is not an instance of an Array it is structured like an array, because its key values are numbered and it has a length property that reflects the number of those numbered key values just like an array. So some Array methods can be used with it via something like Function.call or a similar Function prototype method.

For example say I want to make a method that just adds up all the numbers that I give it as arguments. I can use the Array.forEach method by way of creating an empty array, and then using the call Function prototype method off of the forEach array prototype method and give the arguments object as the first argument. I can then pass a function to call for each javaScript argument just like usual as if it was an array.

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

Okay now for an example that might illustrate something that is actual useful in some cases. Say you want a method where you pass a base url as the first argument, and then an array of file names as the second argument, and what the function produces is an array of urls to each file name from the base url. However there is one more thing, you also have the option to pass each file name as an argument rather than an array. For this the javaScript arguments object can be used to create an array from arguments when the number of arguments is not always known before hand.

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

I see methods like this all the time, there might be other ways of doing so such as checking if the second argument is an object or a primitive value. However it is nice to know that the arguments object is there as an option when it comes to making a function that behaves such as this.

## 5 - Weight example

In one of the projects that I am working on I am making all kinds of functions that have to do with figuring how much weight a piece of content has in relation to a given keyword. There are all kinds of ways of how to go about writing such functions that take into account all kinds of factors that might have to do with how relevant a piece of content is in relation to a certain keyword or search term.

In this example I made a weight function that takes a text sample as the first argument and a search term as the second, after that any number of functions that get passed the text and term and figure a weight value that it then returned. The weight function calls each of them that are given and tabulates all of the weight values. naturally I use the arguments object as a way to go about looping over the functions that are given via arguments after the text and search term.

```js
// a weight function that adds up any number
// of weight metric functions
let weight = function (text, keyword) {
    let w = 0,
    i = 2,
    len = arguments.length;
    while (i < len) {
        w += arguments[i](text.toLowerCase(), keyword.toLowerCase());
        i += 1;
    }
    return w;
 
};
 
// 100 point for each total match
let totalMatch = (text, keyword) => {
    let w = 0,
    m = text.match(new RegExp(keyword, 'g'));
    if (m) {
        w = m.length * 100;
    }
    return w;
};
 
// 25 points for each word
let keywords = (text, keyword) => {
    let w = 0,
    kwArr = keyword.split(' ')
        text.split(' ').forEach((tw) => {
            kwArr.forEach((kw) => {
                w += kw === tw ? 25 : 0;
            });
        });
    return w;
};
 
// 1 point for each word
let wordCount = (text, keyword) => {
    return text.split(' ').length;
};
 
// the text and keyword to find the weight for
let text = 'this is some text about fuzzy cats in action becuase cats are cool',
kw = 'fuzzy cats';
 
// find the weight
let w1 = weight(
        text,
        kw,
        totalMatch,
        keywords,
        wordCount);
console.log(w1);
// 188
```

## 6 - Example making use of an angle, and other optional arguments to set x and y poison of a point

If just one argument is given then that angle is used to find the values for x and y and then that is all. However if a second argument is given this is treated as a distance from the origin, and the additional arguments are used to offset the point object with additional optional offset values.

```js
let func1 = function (angle, distance, offsetX, offsetY) {
    angle = angle === undefined ? 0 : angle;
    distance = distance === undefined ? 0 : distance;
    offsetX = offsetX === undefined ? 0 : offsetX;
    offsetY = offsetY === undefined ? 0 : offsetY;
    let point = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
 
    // if two or more arguments are given
    if (arguments.length >= 2) {
        point.x = point.x * distance + offsetX;
        point.y = point.y * distance + offsetY;
    }
 
    return point;
};
 
console.log(func1(Math.PI / 2, 10, 5, 5));
// { x: 5.000000000000001, y: 15 }
 
console.log(func1(Math.PI / 2));
// { x: 6.123233995736766e-17, y: 1 }
```

If I where to comment out the lines of code that have to do with the conditional that checks the arguments object length, then the second use example will result in a point value of zero for both x and y. However because of the check that does not happen, and I am given something more useful. So the arguments object is there to help write functions that will work differently depending on the number of arguments that is given, and it can also be used as an alternative way to get the values of argument apart from the named parameter names when it comes to accessing the key values of this object.


## 7 - Conclusion

Hope this post helps to put some confusion to rest when it comes to the nature of the arguments object in javaScript. The arguments object does come in handy now and then whenever a situation arises where it is needed to find the number of arguments that where used when a function was called. Although the arguments object is not an instance of an array it is still an array like object and can be used with array prototype methods by using the function prototype methods call, apply and bind.