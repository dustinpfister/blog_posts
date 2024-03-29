---
title: JavaScript Call object, local variables, and the Function prototype
date: 2019-02-01 15:17:00
tags: [js]
layout: post
categories: js
id: 370
updated: 2021-11-07 10:23:13
version: 1.19
---

The Call object in javaScript is used as a way to store local variables, this call object contrasts with the global object which is the top most name space where variables are stored. So the call object is a way to help keep the global name space from becoming polluted by giving javaScript developers a way to have a separate collection of variables that are only local to a functions call object. Another term for the call object in javaScript would be the [activation object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/#variable-object-in-function-context), this term might also be used as a way to eliminate confusion with the [call function prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

What is gained by way of a js call object is of course on top of the block scope that also helps with reducing the changes of name space collisions, and pollution of global variable space. Block variable scope is however a feature of javaScript that was introduced in modern specs of javaScript, in the bast javaScript had function level only variable scope.

So in this post I will be writing about the call object, and function scope local variables in javaScript. Also I will be at least touching base on some related topics such as the Function call prototype method, and the nature of the [this keyword](/2017/04/14/js-this-keyword/) in core javaScript while I am at it.

<!-- more -->

## 1 - Call Object basics in javaScript

In this section I will be going over a few basic examples of the javaScript call object, or activation object which might be a better way or referring to it. The reason why is because there seems to be some confusion when it comes to what the js call object is as when I search for it a lot comes up with the [call method of the function prototype](/2017/09/21/js-call-apply-and-bind/). The subject of the function call method is not to far off from the subject of the activation object, they both have to do with the inner value of things inside the body of a function. However the function call prototype method has more to do with setting the value of the this keyword inside a function, and not so much with any local variables defined inside the body of the function that are part of the function level variable scope of that function which is more what the activation or call object is all about.

Although this section will contain very basic examples, it is not a [getting started with javaScript post](/2018/11/27/js-getting-started/) which is where you might want to start if you are still very new with javaScript. Also even if you have some expected with javaScript it might also be a good idea to learn a thing or two more about [functions in general with javaScript](/2019/12/26/js-function/).

### - The source code examples in this post are on Github

The source code examples in this post can be [found in my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-call-object) on Github. I have got into the habit of making sure that all of the source code that I write and gather is in a for post folder in that repository so this should be, or at some point will be the case with all [my other posts on vanilla javaScript](/categories/js/) also.

### 1.1 - A basic example of the call object

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

### 1.2 - The function call prototype method

The call method of the function prototype is one of a few function prototype methods that can be used to change what the value of the this keyword is in the body of a Class prototype method. This includes built in prototype methods like the [for each method](/2019/02/16/js-javascript-foreach/) of the array prototype.

```js
let func = function () {
    let p = 0;
    [].forEach.call(arguments, function (n) {
        p += n;
    });
    return p;
};
console.log(func(5,2,3)); // 10 
```

## 2 - Values of the call object can be affected by globals

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

There may be some more things to write about when it comes to the javaScript call object, and maybe it is possible to frame things in a different way that helps to given a better idea of what the situation is here when it comes to this specific topic. I do get around to editing my content now and then, and with that said there is making a pull request in the test vjs repository, or maybe better yet leaving a comment on this post when  it comes to bring something up that might need to be addressed.