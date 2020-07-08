---
title: Call object and local variables in javaScript
date: 2019-02-01 15:17:00
tags: [js]
layout: post
categories: js
id: 370
updated: 2020-07-08 09:49:35
version: 1.7
---

The Call object in javaScript is used as a way to store local variables this contrasts with the global object which is the top most name space where variables are stored. So the call object is a way to help keep the global name space from becoming polluted by giving javaScript developers as way to have a separate collection of variables that are only local to a functions call object. 

This is not to be confused with the [call function prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) of a function that can be used to set the value of the this keyword for a function. Another term for the call object in javaScript would be the [activation object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/#variable-object-in-function-context), this term might also be used as a way to eliminate confusion. So in this post I will be writing about the call object, and function scope local variables in javaScript.

<!-- more -->

## 1 - Call Object basics in javaScript

The call object or activation object if you prefer is created when a function is called. It is populated with the arguments object, as well as named arguments for the function, and any local variables that are defined with a keyword such as var, let, or const within the body of the function.

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

This example shows just about everything there is to be aware of when it comes to the call object. In a nut shell the call or activation object refers to arguments, the arguments object, and any local variables defined in the body of the function. The values of the properties of the call object depend on the values that are passed at the time that the function was called, and any additional logic inside the body of the function as well as the current values of any additional global variables that are used as well.

## 2 - values of the call object can be affected by globals of course

For developers that are keen with the practices associated with functional programing it is frowned upon to do so as what I am covering in this section is not consistent with the nature of pure functions. However never the less it is possible to set the values of the local variables of the call object within the body of a function depending the the current value of global variables outside the body of that function.

```js
// a global variable
var x = 0,
func = function () {
    // a local variable that makes
    // use of a global
    var y = Math.pow(2, x);
    console.log(x, y);
};
// loop
var loop = function () {
    if (x < 5) {
        setTimeout(loop, 100)
    }
    func();
    x += 1;
};
loop();
// 0 1
// 1 2
// 2 4
// 3 8
// 4 16
// 5 32
```

To make functions in line with functional programing, globals should be passed as arguments when calling the function. In addition to that noting else inside the body of the function or outside of it should have an effect on the end result aside from what is given by way of the functions arguments.

## 3 - Conclusion

So in other words the call object is something that is also often called local variables. That is local variables that are local to the body of a function and are then at the front of the scope chain. A call object is created each time a function is called and it contains the current state of arguments that where passed when it was called along with any local variables that are defined within the body of the function, and the arguments object.