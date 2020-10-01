---
title: lodash constant and functions that return values
date: 2020-10-01 13:04:00
tags: [lodash]
layout: post
categories: lodash
id: 713
updated: 2020-10-01 13:42:49
version: 1.7
---

The [lodash constant](https://lodash.com/docs/4.17.15#constant) method is a method that will create a function that will return a given static constant value each time it is called. On the surface [lodash constant might seem pointless](https://stackoverflow.com/questions/49755476/why-would-one-need-to-use-lodash-fp-constant), but there are some situations in which I might actually want a method like this. Say for example I have a function that expects a function as one of its arguments, I can not just pass a static value to it, so instead I would need to pass a function that will return that static value.

There are a number of built in methods that will return a static value each time it is called to begin with in lodash, but the lodash constant method is the built in way to create my one such methods. It is also true that it is not so hard to just do the same things without the use of lodash, so I will be looking at some plain old vanilla javaScirpt alternatives to using the lodash constant method also here.

<!-- more -->

## 1 - lodash constant basic example

So the basic idea here is that I call the lodash constant method and a new function will be returned, when doing so I pass the lodash constant method a static value that I want the resulting function to return each time it is called. So I can call the lodash constant method and pass a true boolean value to it as the first argument. The result that is returned by the lodash constant method is then a new function that will return true each time it is called.

```
let returnTrue = _.constant(true);
console.log( returnTrue() ); // true
```

## 2 - Functions that take functions as arguments

In javaScript I often run into functions that accept functions as there arguments. These kinds of functions are one such thing that comes to mind in which a method like the lodash constant method might come into play.

```js
let high = (a, b) => {
    a = a || _.constant(0);
    b = b || _.constant(0);
    return a() + b();
};
 
let n = high(),
n2 = high(_.constant(5), function () {
        return 5;
    });
 
console.log(n, n2); // 0 10
```

## 3 - vjs alternative with arrow functions

So it is not so hard to just do the same things that the lodash constant method does with just plai javaScript by itself these days. For example I can just use arrow functions to create simple functions that return a constant value.

```js

let returnTrue = () => true;
console.log(returnTrue());
```

## 4 - vjs alternative to lodash constant with function expressions

It is not such a big deal to just do the same with old ES5 spec javaScript too when it comes to using function expressions. I can also make function expressions self executing if need be, but then what would be the point of that then right.

```js
// is it really hard to make them with function
// expressions too when it comes to ES5 javaScript?
var returnTrue = function () {
    return true;
};
console.log(returnTrue()); // true
// I can use IIFEs when it comes to making them on the spot
var n = (function () {
    return 42
}
    ());
console.log(n); // 42
```

## 5 - Conclusion

So the lodash constant method is not one of those must have methods in lodash, and I think that will just become even more the case as time goes on. When it comes to methods that I might actually use in a project there are only a hand full that come to mind actually that I think I would bother with and this is not one of them.