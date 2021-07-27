---
title: Writing monotonic functions in JavaScript
date: 2021-07-26 09:14:00
tags: [js]
layout: post
categories: js
id: 918
updated: 2021-07-27 12:19:16
version: 1.3
---

I have been learning more about writing [functions in javascript](/2019/12/26/js-function/) as of late, not so much when it comes to what the options are when it comes to functions themselves in javaScript, but different styles of functions that have more to do with math in general. That is that I have a fairly solid grasp on what a function expression is compared to a function declaration, and why arrow functions are not a drop in replacement for all kinds of functions in source code. I also know a thing or two about the function prototype object and how to use methods in the function prototype like call or apply to get a function of one prototype to work with an object of another prototype. However this post is not on any of that, it is on the topic of what a [monotonic function](https://en.wikipedia.org/wiki/Monotonic_function) is compared to other kinds of functions that are not monotonic.

<!-- more -->


## 1 - Some basic monotonic function examples

In this section I will be starting out with just a few basic examples of writing a monotonic function in javaScript. The basic things to keep in mind is that with any set of arguments, the same output value should never repeat compared to any other set of arguments. On top of that the output value should also go up, but not down, at least when it comes to making a function that can be called monotonically strictly increasing function which seems to be the kinds of monotonic functions that I am most interested in making. 
There are many other definitions that allow for deviations from these rules though, some definitions allow for the same output value to repeat, but only in the sense that it stays the same, but not goes back down. There are some kinds of functions that are just not monotonic at all, one example might be the Math.sin function that will go up, but back down again as the given value for x in radians goes up. So the Math.sin function may be a good example of what a monotonic function is not.

### 1.1 - A function using Math.pow

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

## 2 - Conclusion

