---
title: The lodash _.times method as an alternative to loops, forEach.
date: 2017-10-11 16:35:00
tags: [js,lodash]
layout: post
categories: lodash
id: 59
updated: 2020-07-27 10:01:38
version: 1.21
---

How often do I need to use a while loop, or something like [Array.forEach](/2019/02/06/js-javascript-foreach/) in a project? All the time of course, it seems to come up at every twist and turn actually. I could write a post about what way of looping is the fastest, or what way is the most concise when it comes to making code a little more readable. However I am not going to bother with that sort of thing here, at least not today.

This is yet another one of my lodash posts, so I will be writing about the [\_.times](https://lodash.com/docs/4.17.4#times) method in [lodash](https://lodash.com/) naturally. This method is a way to call a method that is given as a first argument a number of times that is given as the second argument. However I will also touch base on some vanilla js alternatives as well when it comes to making my own lodash times style method with plain old javaScript by itself.

<!-- more -->

## 1 - What to know

This is a lodash post on the \_.times method that can be used to call a given method a number of times, as well as plain old vanilla js alternatives that bring forth a similar effect. The lodash \_.times method is a nice concise solution, but if you care about speed the most first and for most it might be best to stick with native looping.

## 2 - Some Basic \_.times examples

In this section I will be covering some basic examples of \_.times along with some quick vanilla js alternatives. Keep in mind that more concise solutions are not always better solutions all around. I have not taken the time to do synthetic testing with performance in this post, juts throwing together examples.

### 2.1 - Just call a method a number of times

So here is a quick brainless example of of \_.times where I am just calling a method four times. To do this I just call the method and pass the number of times that a function should be called followed by the function.

```js
_.times(4, ()=> console.log('foo')); // 'foo' (4x)
```
#### 2.1.1 - Just using a while looop

A while loop example that does the same would look like this.

```js
let log = (text) => {
    console.log(text);
};
let i = 0;
while (i < 4) {
    log('foo');
    i += 1;
}
```

Some times just using a good old while loop is just whats called for, no need for lodash, and if I just replace let with var, and use old function literals in place of arrow functions this will work on a wide range of browsers as well.

#### 2.1.2 - Array.from

The native array.from method can also be used to call a method a bunch of times as well.

```js
Array.from({length:4},(_,i)=> console.log('foo'));
```

So many solutions like this are a little longer, and maybe Array.from does not have the best browser support when it comes to supporting older non every green browsers. However if most of your site traffic is up to date with there software, using solutions like this can lead to no longer needing lodash as part of a stack.

### 2.2 - Use return to build a results array with \_.times, and alternatives

So there is a bit more that can be done compared to just a simple while loop, such as building a results array by using return in the body of the function passed to \_.times. The return keyword can be used in the body of a function to return a value for each element in an array that is returned when using \_.times. In this section I will be going over using \_.times to do this, as well as vanilla js alternatives for doing so as well.

#### 2.2.1 - Using \_.times to build an array

The times method can be used to build an array, in fact one is always returned when using it, its just by default the values for each element will be undefined if nothing is returned.

```js
// using a native method that returns something
let arr = _.times(4, (i) => Math.pow(2, i));
console.log(arr); //[1,2,4,8]
 
// using return keyword
let rnd = _.times(4, (i) => {
    return 10 + i * 10;
});
console.log(rnd); // [ 10, 20, 30, 40 ]
```

This can be useful for a lot of situations, but it is also unnecessary if it is a situation in which I just need to call a method a few times, and the method is not used to build elements in an array.

#### 2.2.2 - A while loop for building an array

It's not like just using a while loop takes that much more effort as well though. So it might not be as concise, by just sticking to while loops I can work just fine without lodash. Also when it comes to working with larger arrays a while loop solution may prove to be faster as well.

```js
// a while loop for building an array
let arr = [],
i = 0;
while (i < 4) {
    arr.push(Math.pow(2, i));
    i += 1;
}
console.log(arr); //[1,2,4,8]
```

## 3 - Plain old vanilla js clones of the lodash times method

It is not to hard to make a plain old native javaScript clone of the lodash times method. In addition by doing so it is possible to make all kinds of custom tailored functionality of course. Writing a clone of the lodash times method is a great simple example of high ordered functions. So writing at least one or two is a great way of getting used to writing high order functions which comes in handy all the time in javaScript development. So in this section I will be going over some examples of a vanilla js lodash times method clones.

### 3.1 - A Basic lodash times clone

For starters here is a basic example of a times method clone. A number will be given as the first argument and a method that will be called the number of times as the second. 

```js
// basic vanilla javaScript lodash times method clone
let times = (count, func) => {
    var i = 0,
    results = [];
    while (i < count) {
        results.push(func(i));
        i += 1;
    }
    return results;
};
 
// looks good
let nums = times(10, (i) => {
        return Math.pow(2, i);
    });
console.log(nums);
// [ 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 ]
```

### 3.2 - vanilla js custom times method with a custom api

Here is a vanilla js example I put together in a flash. Not only does it have the same features, In addition is has the beginnings of a custom api. This is achieved by using the power of [Function.call](/2017/09/21/js-call-apply-and-bind/) to set the value of the [this keyworld](/2017/04/14/js-this-keyword/) in the body of the function that I pass to my times method. In this example the api has some properties that reflect things like the current percentage value between 0 and 1 relative to the current index and count. That is of course one of many usual suspects when it comes to making anything creative with javaScript in my experience most of the time. The method could be hacked over to add all kinds of additional properties and methods depending on the project.

So here is the times method I put together

```js
// my own custom times method with a ccustom api
let times = (count, func)=> {
    var i = 0,
    per,
    results = [];
    count = count || 0;
    func = func || function () {};
 
    // while i is less than len
    while (i < count) {
        per = i / count;
 
        // call function with a custom api that can be
        // used via the this keyword
        results.push(func.call({
                i: i,
                count: count,
                per: per,
                bias: 1 - Math.abs(.5 - per) / .5,
                results: results
            }, i, count, per));
        i += 1;
    }
    return results;
};
```

And here is a use case example.

```js
let points = times(10, function () {
 
        var s = this;
 
        return {
            i: s.i,
            x: 320 / s.count * s.i,
            y: Math.floor(120 * s.per + 120 * s.bias)
        }
 
    });
 
console.log(points);
/*
[ { i: 0, x: 0, y: 0 },
  { i: 1, x: 32, y: 35 },
  { i: 2, x: 64, y: 72 },
  { i: 3, x: 96, y: 108 },
  { i: 4, x: 128, y: 144 },
  { i: 5, x: 160, y: 180 },
  { i: 6, x: 192, y: 168 },
  { i: 7, x: 224, y: 156 },
  { i: 8, x: 256, y: 144 },
  { i: 9, x: 288, y: 132 } ]
*/
```

## 4 - The lodash repeat method

Another lodash method that comes to mind that is like the times method is the [repeat method](/2019/06/28/lodash_repeat). The repeat method in lodash is a way to just repeat a string a bunch of times. It is less advanced then the times method as it will only work with a string, but in many situations in which I just need to repeat a text pattern a few times it gets the job done okay.

```js
let _ = require('lodash');
let bil = '1' + _.repeat('0', 9);
console.log(bil); // 1000000000
```

## 5 - Conclusion

So the times might be a nice quick way to create an array of a fixed length, of call a method a few times. However it might not be the best solution in many cases. There is the issue of speed, and also I can not say that this is one of the best methods that lodash has to offer. Some of them do come in handy, and help me to save a fair amount of time writing a solution from the ground up, or hunting something down at stack overflow. 

If you liked this post maybe check out my [many other posts on lodash](/categories/lodash/), also if you have anything more to add I would like to hear from you as well, let me know whats up in the comments. In any case that you for reading.