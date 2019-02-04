---
title: Call object and local variables in javaScript
date: 2019-02-01 15:17:00
tags: [js]
layout: post
categories: js
id: 370
updated: 2019-02-04 14:16:35
version: 1.3
---

The Call object in javaScript is used as a way to store local variables this contrasts with the global object which is the top most name space where variables are stored. So the call object is a way to help keep the global name space from becoming polluted by giving javaScript developers as way to have a separate collection of variables that are only local to a functions call object. this is not to be confused with the [call method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) of a function that can be used to set the value of the this keyword for a function. Another term for the call object in javaScript would be the [activation object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/#variable-object-in-function-context), this term might also be used as a way to eliminate confusion. So in this post I will be writing about the call object, and function scope local variables in javaScript.

<!-- more -->

## 1 - Call Object basics in javaScript

The call object or activation object of you prefer is created when a function is called. It is populated with the arguments object, as well as named arguments for the function, and any local variables that are defined with a keyword such as var, let, or const within the body of the function.

```js
let func = function (a, b) {
 
    let c = 5;
 
    if (arguments.length >= 2) {
 
        c += 5;
 
    }
 
    return a + b + c;
 
};
 
console.log(func(3, 2)); // 15

```

This example shows just about everything there is to be aware of when it comes to the call object when it comes to the properties that it defines for the functions context. In a nut shell the call or activation object refers to arguments, the arguments object, and any local variables defined in the body of the function.