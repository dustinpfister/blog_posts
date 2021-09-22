---
title: javaScript closure examples
date: 2019-02-22 17:07:00
tags: [js]
layout: post
categories: js
id: 389
updated: 2021-09-22 11:46:34
version: 1.41
---

There are a number of subjects that some javaScript developers might considered an aspect of advanced javaScript, one such subject might be the subject of [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). When it comes to the question of what a closure is to begin with there are many ways to go about defining what a closure is, which right off the bat can lead to some confusion. Some definitions are very simple, yet technically still correct, however they might not help to give the full picture of what a closure is and why they are useful in many situations that will pop up when working on a project. Other more complex definitions are a bit of a mouth full but do a better job doing them justice when it comes to truly understanding them, and what their full potential may be when keeping them in mind as an option. 

There are all ready many posts on the open web on the subject of closures in javaScript, just about any javaScript developer that writes a blog will likely get around to writing at least one post on them sooner or later. It is just on of those topics like the [this keyword](/2017/04/14/js-this-keyword/), [pure functions](/2020/06/18/js-function-pure/), and the nature of [prototype inheritance when it comes to working with classes](/2019/02/27/js-javascript-constructor/). So it was only a matter of time until I wrote this post also, so as such, here it is. 

So then today I will be looking into closures in javaScript with some basic, and maybe not so basic examples of them. While doing so I might get around to touching base on some related topics that have to do with pure functions, classes, and other ways of storing a state.

<!-- more -->

## What to know first before getting into closures

This is not a post on javaScript for those that are still fairly new to javaScript. So with that said I think it would be good to read up more on functions in general first of you have not done so before hard.

### - The source code examples here are on github

The source code examples that I am writing about here are up on my [test vjs github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-closure). There I also have all of my other collections of source code examples for every other post on this website that has to do with javaScript by itself. I have got into the habit of making sure to link to the location each time I write a new post on javaScript or edit a new one. Not just for your convenience but also for my own each time I come around to edit this. Speaking of editing, yes that would be where you would want to make a pull request of you see something wrong. There is also leaving a comment at the bottom of this post.

## 1 - javaScript Closure Basics

One of the simplest definitions of a closure that I have come across in my travels on-line can be summarized like this.

* A closure is a function within a function*

This is defiantly true, but just saying that alone does leave a great deal to the imagination. To really do closures justice I would need to elaborate a bit more than just that. One way would be to give another definitional that is a little more long winded. Maybe something alone the lines of:

*A closure is a collection of two functions where there is an inner and outer function, the outer function closes over the inner function, and provides a function level scope that can be accessed from within the inner function, and in addition the inner function level scope can not be accessed from within the scope of the outer function.*

Okay that one was a little more intense, sure, but maybe it still does not cover everything there is to know about them, and why it is that they are useful. That being said maybe it is best to just study some code examples in order to really get the hang of closures, and also what the alternatives are. Some very simple, others maybe not so simple, but for this first section in the post I think I will start with some very simple code examples. In addition of course there is learning by doing, taking the time to reproduce your own unique examples of javaScript closures. 

In this section I will be covering a few javaScript examples that involve having a state in the form of an x and y value, and then updating that state with a function. I will be going over a few ways f doing this including the use of globals, a class, and of course a closure.

So lets take a look at some basic closure, and closure related javaScript examples then.

### 1.1 - Using globals

First off here is an example that makes use of global variables to create, store, and work with a single point value. When I first started out with javaScript I was making functions like this.

```js

var x = 15,
y = 5;
 
var movePoint = function(dx, dy) {
    return {
        x: x += dx,
        y: y += dy
    }
};
 
console.log( movePoint(-5,5) ); // { x: 10, y: 10 }
```

This will work find for just this simple little example, but there is all ready some draw backs to talk about. First off the x and y values are global values that might conflict with other code on the page. Another draw back that will drive some developers nuts is that I am making use of global variables inside the body of the move point function.

### 1.2 - Using a Class

So then another option for this sort of thing would be to make a Point Class. This works by creating what is called a constructor function that will be used with the new keyword to create an instance of the Point class. I can then add a move function to the prototype of the class and then call that method off of the Point instance.

```js
var Point = function (x, y) {
    this.x = x;
    this.y = y;
};
 
Point.prototype.move = function (dx, dy) {
   this.x += dx;
   this.y += dy;
   return this;
};
 
var pt = new Point(15, 5);
 
console.log(pt.move(-5, 5)); // Point { x: 10, y: 10 }
```

### 1.3 - Using pure functions

Another option is to get into the habit of writing pure functions. The basic idea of pure functions is to not mutate source values of function arguments, always return the same result for the same arguments, and to not use globals inside the body of the function.

```js
var createPoint = function (x, y) {
    return {
        x: x,
        y: y
    };
};
 
var newPointFrom = function (pt, dx, dy) {
    return createPoint(pt.x + dx, pt.y + dy);
};
 
var pt = createPoint(15, 5);
// new point at position with given deltas
console.log(newPointFrom(pt, -5, 5)); // { x: 10, y: 10 }
// source point was not mutated
console.log(pt); // { x: 15, y: 5 }
```

### 1.4 - Basic closure example

So then here is a basic example of a closure where the outer function is one where I pass and x and y argument that I want.The returned result of the outer function is then in turn also a function. When I do so those arguments that I give when calling the outer function become local variables within the scope of that outer function. The inner function that is returned then has parameters of it's own, that are used when calling the inner function that is returned. When passing arguments to the inner function that inner function has access to the values that are closed over into the scope of the outer function.

```js
var point = function (x, y) {
    return function (dx, dy) {
        return {
            x: x += dx,
            y: y += dy
        }
    }
};
 
var pt = point(15,5);
console.log( pt(-5,5) ); // { x: 10, y: 10 }
```

So now when I call this point function that is a closure, the returned function is then my move point function. I can then pass the delta values that I want to use to the returned inner function that will return a point object. This comes in handy now and then when a situation arises that calls for it, the nature of this is one that helps to sore a state, and keep things organized.

## 2 - JavaScript closure example involving setTimeout

So there are many javaScript examples out on the open web that have to do with the use of setTimeout that can be used to delay the execution of a javaScript function by a set amount of time.

First of take into account this little bit of javaScript.

```js
var arr = [1, 2, 3, 4],
len = arr.length,
i = -1;
do {
    i += 1;
    setTimeout(function () {
        console.log(arr[i]);
    }, 1000);

} while (i < len - 1);
// 4
// 4
// 4
// 4
```

This might not be the expected output when doing this. The reason why is because the while loop will step the i value to then end and finish long before the first settimeout function call runs the function that is given to it as a callback. So then the value of i will remain at the index value of the last index in the array. One way to go about resolving something  like this would be to use a closure.

```js
var arr = [1, 2, 3, 4],
len = arr.length,
i = -1;
do {
    i += 1;
    (function (n) {
        setTimeout(function () {
            console.log(arr[n]);
        }, 1000);
    }
        (i));
} while (i < len - 1);
// 1
// 2
// 3
// 4
```

By passing the value of i to the outer function the value of i is copied by value because it is a primitive. Things will get a little more complicated if we where taking about an object, but that might be a whole other can of worms when it comes to the subject of copying objects. Any way when each function is called one second later, the value of n is what will be used to get the element in the array, and the result is getting them in order rather than just the last element for each.

## 3 - Call once, and log once methods

I made a module in which I have some [basic custom, logging functions in the form of one of my javaScript example](/2021/03/29/js-javascript-example-log-once) posts that contains a long once method. In [lodash there is a once](/2017/12/04/lodash_once/) method that is similar to a log once method but will call a given function only once. That kind of function is not just a good example of closures, but also a nice simple example of a higher order function. Not only does the once method return a function it can also take a function as an argument. This kind of a method is not so hard to make in vanilla javaScript though, something like this can be slapped together in a flash for example.

```js
// call a function just one time
let callOnce = (func) => {
    let calls = 1;
    return function () {
        if (calls > 0) {
            func.apply(null, arguments);
            calls--;
        }
    };
};
 
// create a method that will just log a message once
let createLogOnce = () => {
    return callOnce((mess) => {
        console.log(mess);
    });
};
 
let trap = createLogOnce();
 
trap('okay'); // 'okay' logged to the console
trap('nope'); // (nothing)
trap('nope'); // (nothing)
trap('nope'); // (nothing)
```

## 4 - Random selection without replacement and closures

In my [post on the math random method](/2020/04/21/js-math-random/) I worked out a simple example that has to do with random selection without replacement. This is just something that comes up when it comes to the topic of random numbers, as often the situation is random selection with replacement. Often replacement is just fine in many cases, however in other situations I might want to go threw everything, just do so in a random rather than ordered way.

There are a number of ways of going about doing this sort of thing without using closures of course, however doing so might often involve the use of one or more global variables, or at least one that holds some kind of state object. Still this is very much a post on closures so of course I am going to go over the first examples that I made for that post here that makes use of a closure.

### 4.1 - A create hat method that uses a closure

Here is the create hat method along with a little additional code that demos the use of the method. This method is not just an examples of closure but also an example of a few other things that will come up when making javaScript solutions for various things. One example of this would be the subject of making a [copy of an array](/2020/09/03/js-array-copy/). When calling the create hat method I can give an array of numbers, this array of numbers is a sample to which the internal pull method will be used to pull a random number from. However the pull method will not pull directly from this given array, but a shallow copy of the array. This way it is the copy of the sample array that is mutated and the source sample array is not touched. So then at any moment the internal state can be reset to the original state of the source array.

```js
var createHat = function (sample) {
    sample = sample || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var inHat;
    var api = {
        pull: function () {
            if (inHat.length > 0) {
                var index = Math.floor(Math.random() * inHat.length);
                var result = inHat.splice(index, 1);
                return result[0];
            }
            // nothing in the hat
            return false;
        },
        start: function () {
            return inHat = sample.map(function (n) {
                    return n;
                });
        }
    };
    api.start();
    return api;
};
 
var hat = createHat();
var i = 0;
while (i < 15) {
    var n = hat.pull();
    if (n === false) {
        hat.start();
        n = hat.pull();
        console.log('');
        console.log('new hat');
        console.log(n)
    } else {
        console.log(n);
    }
    i += 1;
}
```

So the the result of running this script is random selection of elements in the copy of the source array. Once the copy is emoty the reset method is called and the copy is reset back to the state of the source array again.

## 5 - Conclusion

So closures are functions that return a function, or a collection of functions that can be used to work with an internal state. When doing so that inner function or API has access to the outer functions local variable scope. So then the use of closures is great for having private internal helper functions, objects, constants and so forth, while having a way to present this public API that can be used to work with the project as a whole.

The basic idea of a closure is not so hard to understand, but it can lead to things that might result in hard to debug code of they are used carelessly. One draw back is that a closure can result in this state that is separate from that of what might be passed using just arguments. In other words the use of a closure goes against the rules of the use of pure functions.

