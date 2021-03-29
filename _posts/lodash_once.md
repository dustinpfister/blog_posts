---
title: The lodash _.once method use examples.
date: 2017-12-04 09:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 105
updated: 2021-03-29 16:00:17
version: 1.7
---

Part of my debugging process involves placing a console.log in my code at some point to log out to the console the status of some value. Often it might be placed in the body of some code that ends up getting called often, and as such it will get logged to the console a whole bunch of times real fast. So for this reason, along with many others this might not always be the best solution for debugging.

So when it comes to getting into situations where something is being logged to the console to fast this is where using something like the [\_.once](https://lodash.com/docs/4.17.4#once) in [lodash](https://lodash.com/) can be helpful when working on a project that uses lodash as part of it's code base. The method will return a new function that will call a given function only once when called, and any additional calls after that will not call the given function as an argument.

It is also not so hard to create a vanilla javaScript once method also, and if you have not done so at any time thus far I would say that it is a good idea to do so if you are still somewhat new to javaScript. A once method is a good, simple example of [closure](/2019/02/22/js-javascript-closure/) in javaScript.

<!-- more -->

## 1 - Basic use example of \_.once in lodash

The lodash \_.once method works by returning a function that will call the given function only once when called. Any additionally calls to the function will result in nothing happening.

```js
 
 var trap = _.once(function(mess){
 
    console.log(mess);
 
 });
 
 trap('okay'); // 'okay' logged to the console
 trap('nope'); // ( nothing )
```

So the lodash once method can come in handy when I want to log something to the console just once and only once inside a loop of some kind. That being said the lodash once method can come in handy as a kind of debugging tool.

## 2 - How \_.once works

If you have some experience with <a href="https://en.wikipedia.org/wiki/Closure_(computer_programming)">concept of closures</a>, and guessed that is how \_.once works then you would be right.

I often like to study the source code of very popular javaScript projects in oder to have at least some understanding as to how it works, as such the source code of \_.once in v4.17.4 of lodash looks like this:

```js
function before(n, func) {
    var result;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    n = toInteger(n);
    return function() {
        if (--n > 0) {
            result = func.apply(this, arguments);
        }
        if (n <= 1) {
            func = undefined;
        }
        return result;
    };
}
 
function once(func){
    return before(2,func);
}
```

So the \_.once method is a good example of how closures come in handy. Once returns a function within a function, and the value of result in the before helper is what gets returned each time \_.once is called.

## 3 - The nature of what is returned.

When it comes to whatever is returned with the method that is given to \_.once, the same value will be given each time it is called after it has been called once. The method given will never be called again, but the value returned when it was called will be returned each time.

```js
 var grab = _.once(function(val){
 
    return val;
 
 });
 
 console.log(grab(42)); // 42
 console.log(grab(43)); // 42
```

## 4- Be mindful of references when dealing with objects

There is still the matter of objects being references in javaScript though. This is why we have methods like [\_.cone](/2017/10/02/lodash_clone/) in lodash.

```js
var obj = {x:41};
 
obj.x += 1;
 
console.log(grab(obj)); // {x:42}
 
obj.x += 1;
 
console.log(grab(obj)); // {x:43}
```

No problem it's a simple fix.

```js
var grab = _.once(function(val){
 
    return _.clone(val);
 
});
 
var obj = {x:41};
 
obj.x += 1;
 
console.log(grab(obj)); // {x:42}
 
obj.x += 1;
 
console.log(grab(obj)); // {x:42}
```

## 5 - Using \_.once in a loop

As I mention earlier \_.once comes in handy when I am working with some kind of project that involves one or more instances of something like [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout), or [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) going on.

```js
var hold = _.once(function(obj){
 
    // I want a shallow copy of the given object
    // and not a reference so _.clone it
    return _.clone(obj);
 
});
 
var values = {
 
    x: 0,
    dx: 5
 
};
 
var loop = function(){
 
    values.x += values.dx;
 
    // because hold was made with _.once
    // hold with log {x:5,dx:5} on each tick
    console.log( hold(values) );

    // if I just use console.log
    // I get the latest values on each tick
    console.log(values);
 
    setTimeout(loop, 1000);
 
};
 
loop();
```

## 6 - Vanilla javaScript Once method

Writing a vanilla javaScript once method is not that hard at all. If you have a basic understanding of [closures in JavaScript](/2019/02/22/js-javascript-closure/) slapping together a vanilla ajvaScript alternative to the lodash once method is a snap. Just have a function that returns a function and inside the body of that inner function call a method that is given as an argument of the outer function, and change the state of a variable that is in the body of the outer function that is used to find out if the function should be called or not with a conditional statement.

```js
let once = (func) => {
    let calls = 1;
    return function(){
        if (calls > 0) {
            func.apply(null, arguments);
            calls--;
        }
    };
};
 
let trap = once((mess) => {
        console.log(mess);
    });
 
trap('okay'); // 'okay' logged to the console
trap('nope'); // (nothing)
```

## 7 - Conclusion

The \_.once method is a great example of closures in action. For me it was also a great experience to look into the source code of lodash to find that many of these methods work very much the same way as if I was to take the time t write them myself.