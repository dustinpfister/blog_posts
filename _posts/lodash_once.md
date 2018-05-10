---
title: The lodash _.once method use examples.
date: 2017-12-04 09:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 105
updated: 2017-12-04 10:00:05
version: 1.2
---

Part of my debugging process involves placing a console.log in my code at some point to log out to the console the status of some value. Often it might be placed in the body of some code that ends up getting called often, and as such it will get logged to the console a whole bunch of times real fast. This is where using something like [\_.once](https://lodash.com/docs/4.17.4#once) in [lodash](https://lodash.com/) can be helpful when working on a project that uses lodash as part of it's codebase.

<!-- more -->

## Basic use example of \_.once in lodash

\_.once works by returning a function that will call the given function only once when called.

```js
 
 var trap = _.once(function(mess){
 
    console.log(mess);
 
 });
 
 trap('okay'); // 'okay' logged to the console
 trap('nope'); // ( nothing )
```

## How \_.once works

If you have some experience with [concept of closures](https://en.wikipedia.org/wiki/Closure_(computer_programming)), and guessed that is how \_.once works then you would be right.

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

## The nature of what is returned.

When it comes to whatever is returned with the method that is given to \_.once, the same value will be given each time it is called after it has been called once. The method given will never be called again, but the value returned when it was called will be returned each time.

```js
 var grab = _.once(function(val){
 
    return val;
 
 });
 
 console.log(grab(42)); // 42
 console.log(grab(43)); // 42
```

## Be mindful of references when dealing with objects

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

## Using \_.once in a loop

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

## Conclusion

The \_.once method is a great example of closures in action. For me it was also a great experience to look into the source code of lodash to find that many of these methods work very much the sme way as if I was to take the time t write them myself.