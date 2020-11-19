---
title: IIFE or Immediately Invoked Function Expressions in javaScript
date: 2020-02-04 08:46:00
tags: [js]
layout: post
categories: js
id: 605
updated: 2020-11-19 10:24:23
version: 1.30
---

A [JS IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) or [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) is a way to make a javaScript [function expression](/2019/01/27/js-function-expression/) that self invokes right away when it is defined, rather than at a later point in time. Thus the name Immediately Invoked refers to the fact that it is defined and then invoked, it is also some times called a self executed function expression.

When it comes to older specs of javaScript an IIFE is a way to go about using the function level only variable scope of those specs to have a whole bunch of private, or local variables wrapped up inside the body of one of these kinds of functions. In late specs of javaScript there is now block level variable scope, but I still find myself often using and IIFE with, or in place of, block level scope. I am also mainly the kind of developer that still try to push things back as far as I can when it comes to supporting older platforms, so the use of IIFEs and closure in general is one thing to to to help go more in that direction.

Inside the body of an IIFE the return keyword can then be used as a way to go about returning something that can be stored in a variable outside of the IIFE. This something that is returned to an outside variable can be a plain old object with properties and methods, a function, or a function with static properties added that serves as a kind of public API. Private helper methods can then also be placed inside the IIFE that can then be used indirectly in the public methods.

The IIFE can also just be used as a way to not go about polluting the global name space, as everything that is defined within the body of an IIFE with var, let, or const will be local to the function rather than the top level or global object. Builds of projects are often made where all the front end code of a project is wrapped up into an IIFE. This helps to keep all the variables of a project from writing over anything else that might be global in a page.

These kinds of functions in javaScript are often used in module design, as private methods and other values can be in the body of the function, and a public set of methods and properties can be a product that is returned by the IIFE and stored in a single global variable, or attached to a single global object. So it goes without saying that a javaScript IIFE is something that any javaScript developer should become familiar with by paying around with a few code examples that make use of one. In this post I will be going over a few basic examples of an IIFE in javaScript, and maybe even touch base on some real examples also.

<!-- more -->

## 1 - JS IIFE Basics

In this section I will be going over some very simple basic examples of a IIFE, later in this post I will then be covering some more detailed examples that make use of a lot of other features in javaScript on top of just IIFE. Still just when it comes to very simple examples I will end up touching on a lot of other topics that have to do with javaScript. I will try my best to not go off in detail with them though, and link to other content here and there as needed.

Many of these basic examples are a quick review of the features of not just an IIFE, but function expressions, and functions in general in javaScript. If you are a javaScript developer with a few years of experience, you might want to skip over this section to get to the good stuff later in this post.

### 1.1 - Variables defined in the body of an IIFE with var, let, or const will be local to the IIFE

The first and for most thing to write about here is that any variable that is defined in the body of an IIFE with the var keyword, or the more modern alternatives, will be local to the scope of that IIFE. This is not just true of an IIFE, but functions in general.

```js
// global variable n
var n;
(function () {
    // local variable n
    var n = 42;
}
    ());
console.log(n); // undefined
```

### 1.2 - Global variables can still be accessed because they are lower on the scope chain.

It is still possible to access a variable that is lower down in the scope chain, including of course global variables. Again this is true of all functions in javaScript. Local variables are just in the scope of the function, but anything that is lower down in scope can still be accessed inside the function also.

```js
// global variable
var global = 40;
(function () {
    // local variable n
    var local = 2;
    console.log(global + local); // 42
}
    ());
```

### 1.3 - Arguments and copying by value and reference

Arguments can be passed when calling it just like any other function, the only real difference is that it is being called right away, and only once. When it comes to arguments and functions one thing to point out is that the values can be copied by value if the value is a primitive values such as a number or string, but objects are a different story.

```js
// Argument is a primitive
var global = 40;
(function (n) {
    // adding 2 to n WILL NOT effect global
    // because the value is a primitive which
    // is copied by value
    n += 2;
    console.log(n); // 42
    console.log(global); // 40
}
    (global));
 
// Argument is an Object
var global = {
    n: 40
};
(function (obj) {
    // adding 2 to obj.n WILL effect global.n
    // because the value is a object which
    // is copied by reference
    obj.n += 2;
    console.log(obj.n); // 42
    console.log(global.n); // 42
}
    (global));
```

### 1.4 - Something can be returned by the IIFE

Just like any other function in javaScript something can be returned by the IIFE. This can just be a primitive value such as a number, but it can also be an object. 
```js
var n = (function () {
    var result = [],
    len = 10,
    i = 0;
    while (i < len) {
        result.push(Math.pow(2, i));
        i += 1;
    }
    return result;
}
    ());
console.log( n.join(',') ); // '1,2,4,8,16,32,64,128,256,512'
```

Objects in javaScript do not begin and end with plain old objects created with the Object literal notation, Arrays, and Functions are also types of Objects. When using An IIFE to make a kind of module a function can be returned as a way to provide some kind of public function that makes use of everything and anything that is wrapped up in the IIFE. Static methods can be attached to a Function just like a plain old Object, and prototype methods can also be attached if the function that I am making is a constructor.

### 1.5 - methods of the prototype of the value that is returned can be called off of it

Whatever is returned by the IIFE will have a prototype object with it often. For example if what is returned by the IIFE is a Array then there will be Array prototype methods like map, and reduce to work with off of the result. Methods such as this can be called off of the end of the IIFE, inside the body of the IIFE when returning the result, or at a later point off of a variable if the result is stored to one.

```js
var sum = (function () {
    var result = [],
    len = 10,
    i = 0;
    while (i < len) {
        result.push(i);
        i += 1;
    }
    return result;
}
    ()).map(function (i) {
    return Math.pow(2, i);
}).reduce(function (acc, n) {
    return acc + n;
});
console.log(sum); // 1023
```

## 2 - JS IIFE example with an inner function returned as the public API

Lets start out with just a basic example of an IIFE in javaScript. I do so by just writing a function expression like always, but I then wrap the expression in parenthesis or a group operator if you prefer. I then call the function expression as well within the group operator, or outside of it if for some reason you find that might be better. So this results in a function where I define the function while also calling it invoking any code that may be within the body of the IIFE right away.

So for a simple example say I have a global variable called count, and I attach an IIFE to it. Inside the body of the IIFE I am returning another function that will be used as a way to work with an internal c variable. The public function that is returned can be called from the outside to get and set the local c variable,  but I can not directly work with it from the outside of the IIFE.

```js
var count = (function () {
    var c = 0;
    return function (opt, n) {
        if (opt === 'get') {
            return c;
        }
        c = opt === undefined || opt === 'count' ? c += 1 : c;
        c = opt === 'reset' ? 0 : c;
        c = opt === 'set' ? n : c;
        return c;
    };
}
    ());
 
count('set', -5);
count();
count('count');
console.log( count('get') ); // -3
```

In this example I have an inner function that is returned to the public count variable. I can then call that function from the outside of the IIFE however I can not directly work with the private c variable. I can however work with the local c variable indirectly by way of the public method that is returned.

## 3 - Making a public API as an object literal

A function can be used as a public API but a plain old object can also be used as one also. Say I have a whole bunch of methods that I want to have as my public API for a game module. One way would be to attach them to a prototype object of a function, but what if they do not need to be part of a class of a constructor function? Also what if I do not want or need a constructor function at all, or a function of any kind as the public API? No problem just using a plain od object will work just fine.

```js
var game = (function () {
 
    // private variables and methods
    var state;
    var makeNewState = function () {
        return {
            money: 0,
            manual: 1,
            auto: {
                tickRate: 1000,
                lt: new Date(),
                perTick: 1
            }
        };
    };
    var loadState = function () {
        var state = document.localStorage ? document.localStorage.state : false;
        if (state) {
            return state;
        }
        return makeNewState();
    };
 
    // public API as an Object literal
    return {
        init: function () {
            state = loadState;
        },
        userAction: function () {
            state.money += state.manual;
        },
        tick: function () {
            var now = new Date(),
            t = now - state.auto.lt,
            ticks = t / state.auto.tickRate;
            if (ticks >= 1) {
                state.money += state.auto.perTick * ticks;
                state.auto.lt = now;
            }
        }
    };
 
}
    ());
```

## 4 - A function can be passed as the public API with static methods attached

In javaScript functions are a kind of object, so just like any other object in javaScript additional methods and properties can be attached to them. If I attach methods to the prototype object they become part of a constructor functions prototype, however if I do not want to do that I can just add static methods as just properties of the function.

```js
var BX = (function () {
 
    // a private method
    var getCenterPoint = function (bx) {
        return {
            x: bx.x + bx.w / 2,
            y: bx.y + bx.h / 2
        };
    };
 
    // a public main api a function
    var api = function (opt) {
        opt = opt || {};
        opt.x = opt.x === undefined ? 0 : opt.x;
        opt.y = opt.y === undefined ? 0 : opt.y;
        opt.w = opt.w === undefined ? 32 : opt.w;
        opt.h = opt.h === undefined ? 32 : opt.h;
        return opt;
    };
 
    // a public static method
    api.distance = function (bx1, bx2) {
        var pos1 = getCenterPoint(bx1),
        pos2 = getCenterPoint(bx2);
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };
 
    return api;
 
}
    ());
 
bx1 = BX(),
bx2 = BX({
        x: 32,
        y: 32
    });
 
console.log(BX.distance(bx1, bx2).toFixed(2)); // 45.25
```

## 5 - Using a javaScript IIFE to just make everything private, and not pollute the global name space

So some times it might be desired to not pollute the global name space. One way to go about doing just that would be to contain all the code that composes your project in a javaScript IIFE. Maybe it would make sense to keep everything separated in certain files and define globals that are used in other files when it comes to developing a project. However when it comes to making a finished package for development, everything can be crunched down, and wrapped up in a single IIFE as a way to make sure that nothing else on the page ends up getting written over.

For example say I am making a canvas example, and I will have code that will be used to create and store a state, code that will draw that state to the canvas, and additional code that has to do with a main app loop as well as event attachment and so forth. I could just start pollution the global name space with a whole bunch of modules all of which define and return stuff to a new global. However when it comes to making a finished package I can copy and past everything into a javaScript IIFE as a way to make sure that everything will not overwrite or interactive with other stuff on the page that might use the same global variable name.

```html
<html>
    <head>
        <title>js iife</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// make everything private with a js iife
(function () {
    var canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');
    var cir = {
        x: 32,
        y: 16,
        r: 10,
        color: 'red'
    };
    var draw = function () {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = cir.color;
        ctx.beginPath();
        ctx.arc(cir.x, cir.y, cir.r, 0, Math.PI * 2);
        ctx.fill();
    };
    draw();
}
    ());
        </script>
    </body>
</html>
```

## 6 - Conclusion

So a js IIFE is often my first go to when it comes to generic module design in front end javaScript. I might not always use one when it comes to making a nodejs module though as I do not see the need, unless I am making the kind of javaScript module that is expected to work in node and the browser in the same state in which case chances are I would use an IIFE. Module design is a lengthy topic in javaScript, an IIFE is one way to go about making something that can be though of as one, but it is not the end of the line at all to say the least.