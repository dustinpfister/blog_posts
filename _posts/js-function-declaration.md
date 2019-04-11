---
title: Function Declarations in javaScript
date: 2019-04-11 14:14:00
tags: [js]
layout: post
categories: js
id: 414
updated: 2019-04-11 17:37:50
version: 1.2
---

In javaScript there is more than one way to define a function, depending on the nature of the function all the different ways of defining a function will work okay, or not. So it is important to understand the differences between them so you know which to use in a given situation. In this post I will be writing about function declarations, but for comparison I will also be touching base on function expressions and arrow functions as well.

<!-- more -->

## 1 - Function Declaration basics in javaScript

To create a function declaration start out by typing the function keyword followed by a name for the function, then parentheses and one or more  optional parameters followed by opening and closing brackets. This way of defining a function differs slightly from a function expression, and arrow functions, as well as other ways of defining a function such as using the Function constructor. 

So a function declaration might look something like this:

```js
function foo() {
    return 'bar';
};
 
console.log( foo() );
```

However there is more to a function declaration in javaScript than just the lexical structure of it, there differences in the way that they behave as well when compared to other ways of defining functions in javaScript. There are a significant number of ways to go about defining functions in javaScript, but for the most part it is mainly function declarations, function expressions, and arrow functions that are of interest. The reason why I say that is because those are the types of functions that a javaScript developer will run into most of the time when studying code examples in the wild. 

Sure there are some wried ways of defining them that involve passing a string to the Function constructor or making use of eval, but running into the use of that is rare, and I do not want to get to far off topic from function declarations.
