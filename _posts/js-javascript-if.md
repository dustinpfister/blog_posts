---
title: If statements in javaScript, and other control flow stuff
date: 2019-02-25 11:22:00
tags: [js]
layout: post
categories: js
id: 390
updated: 2021-11-12 10:28:58
version: 1.43
---

In this post I will be writing about [javaScript if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statements, and other related concerns when working with conditionals in general in a JavaScript programing environment. In many programing languages, in fact just about all of them actually and if statement can be used to check if a certain value, or expression evaluates to a true boolean value, and in the event that it is true, run some code that would otherwise not run. Thus an if statement is a kind of control flow statement along with other options that come to mind such as switch statements, and other clever ways of controlling the flow or execution of code.

So then in addition to if statements there are also switch statements in javaScript that can also be used as a kind of control flow structure. In addition to these two options there is also yet event more options such as a conditional operator as well that can be used as a short hand for if else statements for example, which is also often very useful when it comes to write expressions. Yet even more tools in the tool box that can be seen as a form of control flow would be various kinds of loops such as while and for loops, and various kinds of structures such as a state machine and so forth.

If statements are a fundamental component of javaScript code, or in any programing language for that matter. So having a solid grasp on how to go about using them is key to writing just about any kind of project. There are additional tolls to work with in javaScript that are also worth mentioning when it comes to controlling the flow of a program other then that of if statements, such as switch statements, or doing something to compartmentalize code into groups using functions and objects. So lets look as some basic examples of if statements in javaScript, and many some additional related things while in the process of doing so.

<!-- more -->

## 1 - The basics of if statements in javaScript

If you are reading this post I assume that you are still fairly new to javaScript, or maybe you are like me and have many years of experience but you are just looking for yet even more to learn about general programing topics. Whatever the case might be in this section I will be starting out with just some very basic javaScript if statement examples, as well as other simple examples of other control flow options in general in core javaScript. So these will be some fairly simple examples in this section, but if you have zero experience with javaScript you might still want to start out with a [getting started with javaScript](/2018/11/27/js-getting-started/) type post of some kind or another. If you are a more experience developer then you might consider skipping over this section to get to the good stuff later on in this content.

### - These source code examples are up on Github

The source code examples that I am writing about in this section as well as the rest of the post can be fund in my test [vjs Github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-if). This test vjs repository is also where I am parking all the various source code examples for my [many other posts on vanilla javaScript related topics](/categories/js/).

### 1.1 - First basic if statement example

A basic if statement in javaScript would involve using the if keyword followed by a set of parenthesis in which an expression or value will evaluated to a Boolean value that will be used as condition. If the condition is true then the code in the if statement will execute, else it will not.

```js
var str = 'foo';
// with brackets
if (str === 'foo') {
    console.log('bar');
}
// > 'bar'

```

So the value or expression that evaluates to a value does not have to be a boolean value, as just about any kind of value in javaScript has a true or false equivalent depending on the type and value of what is being evaluated. For example an empty string will evaluate to false, and a string with one or more characters will evaluate to true. So all kinds of expressions and values can be use as a way to control when a set of logic will execute or not in a javaScript if statement.

### 1.2 - Not using brackets

If statements can have brackets or not, I generally always do use brackets with if statements even if it does have only one line of code because I find that it helps to make things more clear to me. There are a number of other reasons why to avoid doing this that might prove to be more important than just person preference. However this is just one of many things that one might come across when reading code on the open web, and more often than not it might not present a note worthy problem.

```js
var n = 42;
// with brackets
if (n === 42) {
    console.log('the answer');
}
// > 'the answer'
// without brackets
if (n >= 40)
    console.log('the answer');
// > 'the answer'
```

These are all examples of javaScript if statements there is also the Conditional operator that can be used in expressions. More on that a little later in this post.

### 1.3 - else

```js
var n = 42;
// if statement with else block
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

### 1.4 - The ternary operator

```js
var n = 42;
var a = n > 40 ? 'foo' : 'bar';
var b = n < 40 ? 'foo' : 'bar';
console.log(a); // 'foo'
console.log(b); // 'bar'
```

### 1.5 - Using a switch

```js
var func = function (n) {
    switch (n) {
        case 40:
            return 'good';
            break;
        case 42:
            return 'great';
            break;
        default:
            return 'bad';
            break;
    }
};
console.log( func(40) ); // good
console.log( func(42) ); // great
console.log( func() );   // bad
```

### 1.6 - Object keys, functions, and if statements

I can not say that I use a switch often, in fact when I think about it I never use them. I am not necessary going to get on to some kind of anti switch war path about it mind you, it is just that there are other options that I seem to prefer when it comes to getting into more advanced control flow topics. A switch works by evaluating an expression as a value, and then comparing that value to one or more cases and if one is found that is a match that code will run, if not do code will run or a default case will run. That is all fine and good but why not have an object with key values, and use the [in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) with an if statement in the body of a function where I can use the [return keyword](/2019/03/01/js-javascript-return/)? In the event that a value is a key of the object return the corresponding key value, and if nothing is there just have some kind of default value for an additional return statement at the bottom of the function.

```js
// and object with keys and values
var obj = {
    40: 'good',
    42: 'great'
};
// a function that will use an if statement
// and the in operator to find out of there
// is a value to return, if not return 'bad'
var func = function (n) {
    if (n in obj) {
        return obj[n];
    }
    return 'bad';
};
console.log(func(40)); // good
console.log(func(42)); // great
console.log(func()); // bad
```

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

If statements and conditional operators are great, and they should be used when and where called for, which is often. However it is also a good idea to know when not to use them, as often the use of them might be a more complex solution to a problem that can be resolved with something not so complex. In this section I think I will go over at least one example of the use of Array prototype methods when working with an array as a way to do things that would otherwise involve a little more javaScript code and an if statement.

### 5.1 - The Array.filter prototype method

Say I have an array of mixed values that contain numbers, and all kinds of other types. What I want is to have an array of just numbers from this source array. I could work out a function that will make use of a while loop, to loop over the contents of this source array. Then inside the body of the while loop I can use an if statement with an expression that make use of the typeof operator to check the type of a current element in the source array. In the event that an element is indeed a number I can then push that element to a new array, and then when done return this new array.

That kind of method that makes use of all kinds of core javaScript features will work just fine, but so would another method that makes use of the Array.filter prototype method and a single expression involving the typeof operator in a function that I pass to it.

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

