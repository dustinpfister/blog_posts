---
title: js eval function for executing a string representation of javaScript
date: 2019-09-09 20:31:19
tags: [js]
layout: post
categories: js
id: 532
updated: 2020-06-19 15:01:22
version: 1.8
---

In javaScript and many other programing languages there is the [eval function](https://en.wikipedia.org/wiki/Eval) that can be used to execute a string representation of some javaScript code. The eval function is a way to interpret javaScript from within javaScript itself. The eval function should not be used if it can be avoided, the use of the eval function can slow things down, and can also open up some security concerns. Still in some situations the use of it can not be avoided, and it is there for a reason after all. So then this will be a post on some of the ins and outs of the js [eval function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval).

<!-- more -->

## 1 - js eval basic example

For a basic example of the js eval function I just stared out with a string of a very simple javaScript expression and passed that to the eval function. After doing so the result of that expression is returned to which I then just logged to the console.

```js
var str = '2+2';
console.log(str);
// '2+2'
console.log(eval(str));
// 4
```

So that is the basic idea of eval, but there is of course much more to write about it.

## 2 - js eval can create variables in the scope in which it is used

When the js eval function is used with a string of javaScript that contains the use of the var keyword to create a variable, and it is not used in string mode this can result in a variable being created in the scope in which eval is used.

```js
// when using var in Non-strict mode eval
// can create variables in the scope in which it is used
eval('var n = 42;');
console.log(n);
```

## 3 - Conclusion

The use of eval is something that I can not say I use very often, or at all actually. There is generally always a way to go about not using it, and if so that is most likely the way that it should be done. Still it is nice to know that it is there when and if I am in a situation in which there is no other option. Using eval and the function constructor just does not strike me as a way that I should be writing and using javaScript, and there are additional concerns about using it that I have not covered in this post.