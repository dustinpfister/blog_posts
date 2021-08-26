---
title: javaScript return statement
date: 2019-03-01 17:56:00
tags: [js]
layout: post
categories: js
id: 393
updated: 2021-08-26 19:28:36
version: 1.29
---

The [javaScipt return statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) is used in the body of a function to return a product when the function is called. This [returned value](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values) can then be stored into a variable, or additional methods in the prototype of the value that is returned can be called off of it to returned yet another value. In addition the value that is returned can be a function, and this internal function can have access to the variable scope of the other function in which it is contained, a concept known as [closure](/2019/02/22/js-javascript-closure/).

The product that is returned can just be a simple primitive value such as a number or string, but things get more interesting when it is an object, or a function. The return statement can also be used as an alternative to the break keyword in the body of a function if looping is no longer required, and as stated is also an important part of creating closures. So the return keyword is something that a javaScript developer should get a solid grasp on, and maybe the best way to do so is to not just read a post such as this, but also just start playing around with ones own code examples when it co es to the whole learn by doing thing.

In this post I will be exploring some examples that have to do with the return statement in javaScript and touch base on some related topics surrounding the javaScript return keyword as well. I will not be getting into things like closure in detail here of course, but it is called for to touch base on a lot of these things at least here, so lets get to it.

<!-- more -->

## 1 - A return statement basic example style

For a very simple example of the return statement here I have a function declaration that just simply adds two numbers \(or concatenates a string\) and returns the product of that operation. The value that is returned can then be used in any capacity such as being stored in a variable, have additional methods called off of it depending on the prototype of the value, used in an expression, conditional statement, or in this case just simple be logged out to the console.

```js
// ES5- function deceleration that returns a product
function foo(a, b) {
    return a + b;
};
 
console.log(foo(5,2)); // 7
```

So the return statement is necessary when it comes to authoring any kind of function that will ultimately return a number, string or any kind of product in the form of an Object or another inner function. In this example it is just a simple single operation expression, but it could be a lengthly expression that I do not care to repeat each time I need to use it in a lengthy body of code.

So now that we have the basic idea of the javaScript return statement out of the way, lets look at a few far more interesting, and possibly useful examples of why the return keyword is a very important part of understanding how to use javaScript effectively when writing code.

### 1.1 - Another example of return with a lengthy expression

For a more practical example say you want to have a function that can be used to figure out an estimate on how much ad revenue potential a certain search keyword might have. 

If I know how much average monthly impression traffic a keyword has, and what the relative score and compare values of the keyword are at Google trends. Then I can use this data along with other averages for revenue per thousand and click threw rate to figure a crude estimate on keyword value.

```js
var figMoney = function (score, compare, rpm, imp, ctr) {
    ctr = ctr === undefined ? 0.5 : ctr;
    imp = imp === undefined ? 6.5 : imp;
    rpm = rpm === undefined ? 1.5 : rpm;
    compare = compare === undefined ? 1 : compare;
    score = score === undefined ? 0 : score;
 
    // lengthly expression
    return '$' + (score / compare * imp * ctr * rpm).toFixed(2);
};
 
console.log( figMoney() ); // '$0.00'
console.log( figMoney(77, 5, 2) ); // '$100.10'
console.log( figMoney(7, 5, 1.4,6.5,0.12) ); // '$1.53'
```

So then writing functions like this can come in handy, I have a length expression and I do not want to repeat it every time I used it in a body of code. So I pull that expression into a function, and just pass arguments to it each time I call it elsewhere in code. The value that I want is then returned by way of the javaScript return statement.

### 1.2 - Be careful when it comes to line breaks in code.

Make sure that nothing weird is going on with line beraks in the source code when it comes to using the return keyword. If the expression is on the next line after the return keyword the javaScript engine might disregard the expression completely on the next line, and the result will be that the default undefined value will be returned. This has to do with the fact that semicolons are optional in javaScript code.

```js
var foo = function (a, b, c) {
    return
    (a + b) * c;
};
 
console.log(foo(1, 2, 3)); // undefined
 
var baz = function (a, b, c) {
    return (a + b)
     * c;
};
 
console.log(baz(1, 2, 3)); // 9
```

## 2 - return and function types.

There is more than one way to define a function that returns something in javaScript. There are function expressions, function declarations, and arrow functions. Often the return keyword must be used in the body of a function, however in some cases the new arrow functions have what are called implicit returns.

```js
// ES5- Style function expression that returns a 
// product
var foo = function (a, b) {
    return a + b;
};
 
// ES2015+ style arrow function with brackets that 
// returns a product
let bar = (a, b) => {
    return a + b;
};
 
// ES2015+ style arrow function with an implicit 
// return of a product
 
let baz = (a, b) => a + b;
 
console.log(foo(5,2)); // 7
console.log(bar(5,2)); // 7
console.log(baz(5,2)); // 7
```

The return keyword must be used with function expressions, and function declarations. However with arrow functions it depends on how they are authored. If brackets are not used with an arrow function then a return is implicate and the return keyword is not needed. However if brackets are used with an arrow function then the return keyword must be used just like with expressions, and declarations.

So then in some cases the use of return in the body of a function is optional, but I tent to use it away just to help make things clear when it comes to readability of code.

## 3 - The javaScript return keyword and closures

One aspect of javaScript that is often considered advanced javaScript is the use of closures. A closure is a situation in which the function is what is returned by another function using the javaScript return keyword. In javaScript functions are also objects, so additional methods can also be attached to the main function that is returned to provide a robust api that can be used to work with a state that is stored inside the main function. In this section I will be going over some examples of closures that make used of the return keyword.

### 3.1 - Very basic count closure example

So lets start out with a very simple example of a closure that is just a basic counter. This example is then just a function that returns an inner function with the return keyword, and that function in turn also uses the javaScript return keyword to return the current value of a variable that is local to the outer most function.

```js
var count = function (si) {
    var i = si === undefined ? 0 : si;
    return function () {
        i += 1;
        return i;
    };
};
 
var c = count();
 
console.log( c() ); // 1
console.log( c() ); // 2
console.log( c() ); // 3
```

The current value of I can not be accessed from the outside, however the value is stepped and returned each time the inner function is called. This is the basic idea of a closure, there are variables that are location to an other function and then inner functions that work with those local variables.

### 3.2 - PPS example

So now here is an example that moves an object my a pixel per second value. There is a current PPS value as well as heading, an x and y position that can be set when the closure is called for the first time. There is also an internal variable that stores the last time the inner function was called that is used to find the number of seconds that has elapsed, and then that amount of time is then used to move the object.

This example returns an inner function just like before, but that function is stored to a variable, and an additional method is attached to it that can also be used to mutate the state of the object that is local to the outer function. In javaScript a function is a kind of object, so additional propertied including additional methods can be returns with the function that is returned.

```js
var pps = function (obj) {
    obj = obj || {};
    obj.pps = obj.pps === undefined ? 32 : obj.pps;
    obj.x = obj.x === undefined ? 0 : obj.x;
    obj.y = obj.y === undefined ? 0 : obj.y;
    obj.r = obj.r === undefined ? 0 : obj.r;
    var lastTime = new Date();
    // Main API Method
    var api = function () {
        var now = new Date(),
        t = now - lastTime,
        sec = t / 1000;
        obj.x += Math.cos(obj.r) * obj.pps * sec;
        obj.y += Math.sin(obj.r) * obj.pps * sec;
        lastTime = now;
        return obj;
    };
    // single static method
    api.set = function (opt) {
        opt = opt || {};
        obj.x = opt.x === undefined ? obj.x : opt.x;
        obj.y = opt.y === undefined ? obj.y : opt.y;
        obj.r = opt.r === undefined ? obj.r : opt.r;
        return obj;
    };
    // return the public API
    return api;
};
 
// Demo
var boxState = pps({
        x: 0,
        y: 50,
        r: 0,
        pps: 100
    }), bx;
var loop = function () {
    setTimeout(loop, 100);
    bx = boxState();
    if (bx.x >= 500) {
        boxState.set({
            x: 0,
            y: 50,
            r: Math.PI * 1.9 + Math.random() * (Math.PI * 0.2)
        });
    }
    console.log(bx.x.toFixed(2), bx.y.toFixed(2));
};
loop();
```

The basic idea here is a pattern that I see in a lot of projects, what is returned can just be function without anything else attached to it, or it could be just a plain old object that might have some methods, but why not both?

### 3.3 - Framed closure example that uses javaScript return keyword

Now that we understand the basics lets look at another example of closures and the javaScript return keyword that is not so basic. With this example I have a function that returns a function but also some additional static methods that are attached to the function that is returned. It also accepts a function as a property of an options argument that is passed to it when it is called.

```js
var framed = function (opt) {
    // local options
    opt = opt || {};
    opt.forFrame = opt.forFrame || function () {};
    opt.maxFrame = opt.maxFrame || 50;
    opt.frame = opt.frame === undefined ? 0 : opt.frame;
    // helpers
    var wrapFrame = function (frame) {
        if (frame >= opt.maxFrame) {
            return frame % opt.maxFrame;
        }
        if (frame < 0) {
            return opt.maxFrame - Math.abs(frame) % opt.maxFrame;
        }
        return frame;
    };
    var getState = function (frame, maxFrame) {
        var per = frame / maxFrame;
        return {
            frame: frame,
            maxFrame: maxFrame,
            per: per,
            bias: 1 - Math.abs(0.5 - per) / 0.5
        };
    };
    var step = function (delta) {
        opt.frame = wrapFrame(opt.frame + delta);
        return opt.frame;
    };
    var call = function () {
        var state = getState(opt.frame, opt.maxFrame);
        opt.forFrame.call(state, state, opt.frame, opt.maxFrame);
    };
 
    // the public api
    var api = function (frame) {
        opt.frame = wrapFrame(frame === undefined ? opt.frame : frame);
        call();
        step(1);
    };
    // make some additional methods public
    api.step = step;
    api.getState = getState;
    api.call = call;
    // return the public API that is a function
    // with some methods attached
    return api;
};
 
var ani = framed({
        maxFrame: 100,
        forFrame: function () {
            console.log(this.per);
        }
    });
 
setInterval(function () {
    ani();
}, 100);
```

## 4 - Stop code from continuing by using return

Once a value is returned then any additional code after the return keyword will not run. So then in the body of a function you do not need an else after an if statement if you are using return in the body of the if block. If the condition is true then the value in the if will be what is returned, and no additional code will run, and no additional return keywords in the function will be reached.

```js
var foo = function (a,b) {
    if (a === b) {
        return a;
    }
    return a + b;
};
 
console.log(foo(5,5)); // 5
console.log(foo(5,6)); // 11
```

In functions where a while or for loop are being used the return keyword can also be used as an alternative to the break keyword. There would be no need to use break unless it is nested looping with the use of labels and you just want to break a certain loop in a nest of loops. However if returned is used at any level in a nest of loops that will stop the looping at all levels, the value will be returned and that will stop everything.

## 5 - calling methods off of what is returned

Whatever is returned by a function has whatever there is in the prototype chain to work with. For example if I have a function that will return an array, then there is everything in the array prototype that can be used off of the project that is returned including methods like map. The Array map method then returns a new array, so once again there are the array methods to work with including reverse that will reveres the order of the array. There is then array methods like the join method that will return a string value at which point there is everything in the string prototype to work with then and so on.

```js
var filterNotNumber = function (arr) {
    return arr.filter((el) => {
        return typeof el === 'number';
    });
};
 
var arr = [null, 1, 2, 'foo', 3, {}, [], 4, 5];
 
var pows = filterNotNumber(arr).map((n) => {
        return Math.pow(2, n);
    }).reverse().join('-')
 
console.log(pows);
// 32-16-8-4-2
```

## 6 - Using the new keyword and not using the new keyword when making constructor functions

The new keyword comes into play when making [constructor functions](/2019/02/27/js-javascript-constructor/) that can also be used to create and return new types of objects without the use of the return keyword. However when making these kids of functions it is still possible to check if the function is being used with the new keyword or not, and if not use the return keyword to return an instance of the constructor anyway, or just a plain old object form of the find object that the constructor creates.

```js
var Point = function (x, y) {
    this.x = x;
    this.y = y;
    if (this.constructor.name != 'Point') {
        return {
            x: x,
            y: y
        };
    }
};
 
Point.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')';
};
 
var pt = new Point(5, 5),
obj = Point(5, 5);
 
console.log(pt.x, pt.y, String(pt), pt.constructor.name);
// 5,5 Point
console.log(obj.x, obj.y, String(obj), obj.constructor.name);
// [object Object] Object
```

## 7 - conclusion

So the javaScript return keyword is there as a way to return a value inside the body of a function. There are then many things that can be done with that returned value, making functions a great way to go about containing, and reusing code in a project.

In addition to this the returned keyword is needed when it comes to returning a public API in the from of an object with public methods, a public function, or a public function with additional static methods attached to it. This public API will then have access to everything inside the local variable scope of the module.