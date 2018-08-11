---
title: The lodash _.fill method and the vanilla js Array.fill alternative
date: 2017-09-26 09:31:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 45
updated: 2018-08-11 14:12:00
version: 1.8
---

So lodash is one of those JavaScript projects that is a bit of a mystery when it comes to the question of it's value compared to just working within a plain old vanilla js environment. There are methods that come in handy, and really do provide something that is not just there in Array.prototype, however [\_.fill](https://lodash.com/docs/4.17.10#fill) is not one of those these days, unless of course you care about browser support. In this post I will be writing about the lodash \_.fill method, as well as some vanilla js alternatives to help with a situation in which you just want to fill an array with a given static value.

<!-- more -->

## 1 - what to know

This is a post on the lodash array method \_.fill, the corresponding es2015+ Array.fill, and vanilla js polly fill solutions for this task when making a project that involves the use of javaScript in which lodash may or may not be part of the stack. This is not a getting started post on lodash, and javaScript in general and I assume that you have some background on these topics. Also when I last updated this post I was using lodash 14.17.10.

## 2 - Basic fill example using \_.fill, and Array.fill

For a basic example of fill, say you have a situation in which you just want to quickly have an array that represents the bit values of a byte of data. So in other words you just want an Array with a length of eight, and have all of the elements default to zero. The lodash \_.fill, or equivalent solution, and be used to make quick work of this, and then allow for me to move on with what really matters with a project.

### 2.1 using the lodash _.fill method

So \_.fill can be used to quickly make such an array, by passing an array with the desired length, and then the value that I want to set to the whole of the array.

```js
var b = _.fill(new Array(8),0);
console.log(b); // [0,0,0,0,0,0,0,0]
```

This makes quick work of this, and also because I am using lodash I know that it will work in all browsers that are supported by the version of lodash that I am uisng. As of this writing lodash 4.17.10, supports browsers as old as IE11, and if I want I can make a custom fork, or use an older version of lodash to push that back even farther if need be.

### 2.2 - The Array.fill vanilla js Array prototype method

So Array.fill is a quick way to fill an array with the same value, say you have an array that represents the status of a byte of data, and you want all the elements set to 0 as well.

```js
var b = new Array(8).fill(0);
console.log(b); // [0,0,0,0,0,0,0,0]
```

It is also possible to set a start and end point with the fill, but you get the idea. When it comes to using a vanilla js method it is often important to know the browser support of that method, as such Array.fill is NOT supported in IE11 as it is an es2015+ method.

### 2.3 - Using Array.fill with a pollyfill

Because Array.fill is a es2015+ method one might want to use a pollyfill of some kind to make sure that it is there with older browsers maybe.

```js
Array.prototype.fill = Array.prototype.fill || function (val, start, end) {
 
    var i;
 
    start = start === undefined ? 0 : start;
    end = end === undefined ? this.length : end;
 
    i = start;
    while (i < end) {
 
        this[i] = val;
        i += 1;
    }
 
    return this;
 
};
 
var b = new Array(8).fill(0);
 
console.log(b); //[0,0,0,0,0,0,0,0]
```

Polly fills come in handy to push backward compatibility back farther when need be when it comes to working with native methods. Notice that you can also set start, and end index values for the fill process, more on that in the next section.

## 3 - Filling sections of an array with fill

So there are two additional arguments that can be given to fill to set the starting and ending array index values of where the filling is to take place. So once again say we have an array that represents a byte of data, and I want to set a certain bit range with \_.fill or Array.fill. No problem

## conclusion

So when I do come across methods like _.fill at that point there is the question about browser support. At that point it may be the only thing that comes to mind as to why it is that I should bother. If the support does go back a little then using methods like these do still make sense.

Be sure to check out my other [posts on lodash](/categories/lodash/)