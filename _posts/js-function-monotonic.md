---
title: Writing monotonic functions in JavaScript
date: 2021-07-26 09:14:00
tags: [js]
layout: post
categories: js
id: 918
updated: 2021-07-27 13:39:20
version: 1.8
---

I have been learning more about writing [functions in javascript](/2019/12/26/js-function/) as of late, not so much when it comes to what the options are when it comes to functions themselves in javaScript, but different styles of functions that have more to do with math in general. That is that I have a fairly solid grasp on what a function expression is compared to a function declaration, and why arrow functions are not a drop in replacement for all kinds of functions in source code. I also know a thing or two about the function prototype object and how to use methods in the function prototype like call or apply to get a function of one prototype to work with an object of another prototype. However this post is not on any of that, it is on the topic of what a [monotonic function](https://en.wikipedia.org/wiki/Monotonic_function) is compared to other kinds of functions that are not monotonic.

<!-- more -->


## 1 - Some basic monotonic function examples

In this section I will be starting out with just a few basic examples of writing a monotonic function in javaScript. The basic things to keep in mind is that with any set of arguments, the same output value should never repeat compared to any other set of arguments. On top of that the output value should also go up, but not down, at least when it comes to making a function that can be called monotonically strictly increasing function which seems to be the kinds of monotonic functions that I am most interested in making. 
There are many other definitions that allow for deviations from these rules though, some definitions allow for the same output value to repeat, but only in the sense that it stays the same, but not goes back down. There are some kinds of functions that are just not monotonic at all, one example might be the Math.sin function that will go up, but back down again as the given value for x in radians goes up. So the Math.sin function may be a good example of what a monotonic function is not.

### 1.1 - A monotonically strictly increasing function using Math.pow

A good basic example of a monotonic function may be to start out with something that just returns a value for y based off of given x argument using the Math.pow method. That is having a function that will just return the result of a call of Math.pow with a fixed value for base, and passing the x value as the value for the exponent. When it comes out testing a function argument domian with say that values 0 to 4, y will go up, and only up for each value of x as it goes up. So then this is the basic idea of what is meant by a strictly increasing form of a monotonic function.

```js
var pow = function (x) {
    return Math.pow(2, x);
};
var x = 0,
len = 5,
results = [];
while (x < len) {
    results.push({
        x: x,
        y: pow(x)
    });
    x += 1;
}
console.log(JSON.stringify(results));
//[{"x":0,"y":1},{"x":1,"y":2},{"x":2,"y":4},{"x":3,"y":8},{"x":4,"y":16}]
```

There is playing around with the other domains though, when it comes to having a higher range with larger numbers there is no problem, as the values will still just go up even higher. There is also no problem when it comes to pulling negative numbers into the domain also as the starting point will just be a value below that of 1. I might only run into problems when it comes to having a base argument for this pow function which might result in the same value for two different sets of arguments, but then it would only be possible for a different base, not a different value for x.

### 1.2 - Using a function that makes use of two or more arguments to create a monotonic function

Say I have a function that can be used in a monotonic way, but only if the domain of arguments that are used are restricted in such as way that the return values will only go up for values of x that go up from zero forward. One way to go about making sure that this will be the case is to create a monotonic function that will define what the arguments will be for the other function that makes use of more than on argument that will be called in the monotonic function. In other words I create what my monotonic function will be that will just take an x value, and the domain of x goes from 0 upward. In the body of this monotonic function I create arguments based off of the given x value. There is going this like using the modulo operator, as well as flooring values that are the results of division.

```js
// a function that uses three arguments, that can be used
// in a monotonic way, or not, depending on the argument domain
var threeArguments = function (x, min, max) {
    return min + (max - min) * (1 - (1 / (1 + x)));
};
// monotonic function that makes use of the three arguments function
// and uses it in a way that is strictly increasing, by making sure that
// proper values are used for the min and max arguments that will result in the
// return value only going up for all values of x 
var monotonic = function (x) {
    var a = x % 4,
    b = Math.floor(x / 4) * 5,
    c = b + 5;
    return threeArguments(a, b, c);
};
 
var x = 0,
len = 12,
results = [];
while (x < len) {
    results.push({
        x: x,
        y: parseFloat(monotonic(x).toFixed(2))
    });
    x += 1;
}
console.log(results.map((obj) => {
        return obj.y
    }));
```

Another way to go about doing something like this would be to just have a set collection of values for the other arguments.

## 2 - Conclusion

So then that will be it for now when it comes to monotonic functions in javaScript. There is getting into maybe making some additional examples for this sort of thing, but in order to do that I think I will want to work more on one or more projects in which I am actually making use of these kinds of functions. So far the main kind of project that comes to mind is coming up with some kind of experience point system type project. I have made one such project those far in the past, but I am not happy with it. I will then want to make at least a few more such systems until I have something that I like, and part of the process of making such a system, they way that I would like it will have to involve making some functions that will be monotonic in nature.