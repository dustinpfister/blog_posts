---
title: If statements in javaScript, and other control flow stuff
date: 2019-02-25 11:22:00
tags: [js]
layout: post
categories: js
id: 390
updated: 2021-03-30 12:38:26
version: 1.28
---

In this post I will be writing about [javaScript if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statements, and other related concerns when working with conditionals in general in a JavaScript programing environment. In javaScript there are JavaScript statements that start with an if statement, and can include else and elseif statements. In addition there are also switch statements in javaScript that can also be used as a kind of control flow structure. In addition to these options there is also a conditional operator as well that can be used as a short hand for if else statements for example.
If statements are a fundamental component of javaScript code, or in any programing language for that matter. So having a solid grasp on how to go about using them is key to writing just about any kind of project. There are additional tolls to work with in javaScript that are also worth mentioning when it comes to controlling the flow of a program other then that of if statements, such as switch statements, or doing something to compartmentalize code into groups using functions and objects. So lets look as some basic examples of if statements in javaScript, and many some additional related things while in the process of doing so.

<!-- more -->

## 1 - Start out with a basic javaScript if example

In this section I will be starting out with just some very basic javaScript if statement examples.

### 1.1 - First basic if statement example

A basic if statement in javaScript would involve using the if keyword followed by a set of parenthesis in which an expression or value will evaluated to or contain a value that will be used as condition. If the condition is true then the code in the if statement will execute else it will not.

```js
var str = 'foo';
 
// with brackets
if (str === 'foo') {
    console.log('bar');
}
// > 'bar'

```

So the value or expression that evaluates to a value does not have to be a boolean value, as just about any kind of value in javaScript has a true or false equivalent depending on the type and value of what is being evaluated. For example an empty string will evaluate to false, and a string with one or more characters will evaluate to true. So all kinds of expressions and values can eb use as a way to control when a set of logic will execute or not in a javaScript if statement.

### 1.2 - Some more basic examples of javaScript if statements

If statements can have brackets or not, and can also be used with an optional else block that will fire if the condition is only not true. I generally always do use brackets with if statements even if it does have only one line of code because I find that it helps to make things more clear to me, but it is just one of many things that one might come across when reading code on the open web.

```js
var n = 42;

// with brackets
if (n === 42) {
    console.log('the answer');
}
// > 'the answer'

// without
if (n >= 40)
    console.log('the answer');
// > 'the answer'

if (n === '42') {
    console.log('the answer is a string');
} else {
    if (n === 42) {
        console.log('the answer is a number.')
    } else {
        console.log('no answer');
    }
}
// > 'the answer is a number'

```

These are all examples of javaScript if statements there is also the Conditional operator that can be used in expressions. More on that a little later in this post.

## 2 - Else is not needed when making a function that returns something

If a function that is being made that is using the return keyword to return a result when called then else does not need to be used. The reason why is that return will stop any further execution of any additional code, so it can be used as a way to break out of a function. This differs from blocks of code where I might only want some code to run if and only if a condition is not met. 

```js
var isNeg = function (n) {
    // if type is number and less than zero
    if (typeof n === 'number' && n < 0) {
        // return true
        return true;
    }
    // if we get here return false
    return false;
};
 
console.log(isNeg(NaN)); // false
console.log(isNeg('foo')); // false
console.log(isNeg('-1')); // false
console.log(isNeg(42)); // false
console.log(isNeg(-1)); // true
```

## 3 - Conditional operator

There is also a [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) in JavaScript this is an operator that takes three operands and returns one of two values depending on the boolean value of the left most operand before the question mark symbol that is used. For example say I have an obj value that can end up having a value of undefined in some cases, but I always want it to end up being at least an empty object. One way to do so would be to use a conditional operator to test for undefined, and then return an empty object in that case, or the value that it is all ready in the event that it is not undefined.

```js
var obj = undefined;
 
obj = obj === undefined ? {} : obj;
 
console.log(typeof obj); // 'object'
```

Because the conditional operator is a kind of expression it can be used in conjunction with if statements. 

```js
var func = function (g) {
    if (g = g < -25 ? false : true) {
        return 'high';
    } else {
        return 'low';
    }
};
 
console.log( func(0) ); // 'high'
console.log( func(10) ); // 'high'
console.log( func(-20) ); // 'high'
console.log( func(-32) ); // 'low'
```

So the conditional operator is helpful because I can use it in an expression, doing so with if statements is a little complicated often involving the use of an IIFE in the expression with results in hard to read code that is harder to debug.

## 4 - State machines as a way to control logic

Another way to control the flow of logic is to use what is often called a state machine. This is typically a collection of two or more methods that will fire only when a variable or object property is a given value that will cause the method to fire, or at least that might be what one is in a very basic form. Really getting into this subject can end up getting a little complex, and as such truly doing it justace would require writitng a whole other post on the topic alone, and maybe event a few such posts.

However the basic idea of a state machine is simple enough, with that said I could just have an object, and a bunch of methods for a bunch of key names of this object. I can then have a property that will be the key name of the current method to fire when a main tick or update method is called. I then have some kind of way to change the value of this property that will control what method to fire each time an update method is called.

In other words something like this maybe.

```js
var state = {
    current: 'init',
    i: 0,
    // init state
    init: function () {
        console.log('this is the init state.');
        state.i = 0;
        // changing the current value will cause
        // the tick method to call another state function
        state.current = 'count';
    },
    // count state
    count: function () {
        state.i += 1;
        console.log('this is count state. i=' + state.i);
        if (state.i >= 3) {
            state.current = 'end';
        }
    },
    // end state
    end: function () {
        console.log('this is the end state');
        console.log('i=' + state.i);
    },
    // calls the current state
    tick: function () {
        state[state.current]();
    }
};
 
state.tick();
state.tick();
state.tick();
state.tick();
state.tick();
/*
this is the init state.
this is count state. i=1
this is count state. i=2
this is count state. i=3
this is the end state
i=3
*/
```

There are a number of other ways that a state machine could be made like this. There is also thinking more in terms of a collection of objects like this other than just one. So yest this subject can get a little advanced.

State machines come into play when working on some kind of project that is a little advanced in which there are many application states. Such as a state in which assets need to be loaded, and a state that will run when all those assets are done loading. I often work out this kind of system when making canvas games, even ones that do not involve such a task, because it is often just needs to break things down into many different states. For example there might be a main game state, but then there will be another state that will set up some settings before starting a new game in the main game state, and yet another state that is a main title menu, and so forth.

Speaking of canvas examples I have a main post on canvas examples that might be worth checking out, but when it comes to [state machines alone I have a single canvas example](/2020/01/28/canvas-example-state-machine/) where that is the focus. In addition I have many canvas examples where a state machine is very much a part of the over all project, one of my best examples thus far might be my [pop the lock game that features a fairly complex state machine](/2019/11/26/canvas-example-pop-the-lock/) module.

## 5 - Array methods, and A word on when not to use if statements

### 5.1 - The Array.filter prototype method

```js
// say I have a source array like this
// and I want a new array that is just numbers
let sourceArray = [1, 'a', null, 2, {}, 3];
 
// I could work out something like this, using a function,
// while loop, and an if statement.
let onlyNums = (source) => {
    let newArr = [],
    el,
    len = source.length,
    i = len;
    while (i--) {
        el = source[len - 1 - i];
        if (typeof el === 'number') {
            newArr.push(el);
        }
    }
    return newArr;
};
 
// and that of course will work just fine
console.log(onlyNums(sourceArray)); // [1,2,3]
 
// however another option would be to just use array.filter
// with just the expression of interest that will produce the return
// value for the method that I pass to Array.filter
let onlyNums_filter = (source) => {
    return source.filter((el) => {
        return typeof el === 'number'
    });
};
 
// which also works just fine
console.log(onlyNums_filter(sourceArray)); // [1,2,3]
```

## 6 - Conclusion

So the javaScript if statement is one of the many core aspects of javaScript programing, and programing in general actually as just about any language is going to have them. There are other ways of controlling the flow of code though that a new developer should be aware of such the use of switch statements, loops, and state machines. In any case getting comfortable with if statements is a must when it comes to getting up to speed with javaScript, but it is also just one of many little features to be aware of.

