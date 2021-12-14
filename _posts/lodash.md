---
title: lodash main post from why bother to getting started and beyond.
date: 2019-02-15 07:41:00
tags: [lodash]
layout: post
categories: lodash
id: 382
updated: 2021-12-14 11:11:53
version: 1.35
---

When it comes to javaScript utility libraries [Lodash](https://en.wikipedia.org/wiki/Lodash) is such a library that provides over three hundred modular utility functions to help work with arrays, functions, and objects in general. On top of having just array methods and plain object methods there are a number of collection methods that will work with arrays and objects in general. There are also many methods that will work well with primitive values as well such as Strings and Numbers. There are also a lot of other useful various utility methods that one would expect to find in a library such as this.

Many of the methods in lodash are in line with the concepts of [functional programming](https://en.wikipedia.org/wiki/Functional_programming) such as conforming to rules that are constant with the concept of a [pure function](https://en.wikipedia.org/wiki/Pure_function). That is a function in which the same result is returned for the same set of arguments that are given when the function is called.

It is true that many of the functions in lodash are from [underscore the older library from which lodash was forked](https://en.wikipedia.org/wiki/Underscore.js#History). At first it was stated that lodash would work as a drop in replacement for underscore, but with late versions of lodash that is no longer the case as there are many differences when it comes to the public APIS of these two projects.

One major talking point as to why developers should not bother with lodash any more is that much of the functionality in lodash is now part of core native javaScript itself. However there is still some people out there using older browsers that do not support all of these native methods, and I also like to get my code to work on a wide range of versions numbers when it comes to making nodejs scripts. There is also a lot to talk about when it comes to other reasons why using lodash still makes sense beyond just that of the safety net aspect of the library. I mentioned that many of the methods are more in line with functional programing, and that many of the methods are collection methods that will work out of the box with a wider range of objects beyond just that of arrays. In addition many of the utility methods are still not part of core javaScript at all, so it is not necessarily a dead library, and there is still a desire to abstract and wrap away many native methods and have something that conforms to the ides of a [pony fill rather than a poly fill](https://github.com/sindresorhus/ponyfill).

<!-- more -->

## 1 - lodash basics and what to know first

There is much to write about when it comes to [lodash](https://lodash.com/) beyond just writing about the methods themselves. Lodash branches off into many other topics of interested with javaScript development such as [functional programing](https://en.wikipedia.org/wiki/Functional_programming) compared to [imperative programing](https://en.wikipedia.org/wiki/Imperative_programming). There is also [a lot of blog posts that I see on the web that seem to focus on the fact that many of the methods in lodash are now part of javaScript itself](https://codeburst.io/why-you-shouldnt-use-lodash-anymore-and-use-pure-javascript-instead-c397df51a66), and that lodash is no longer needed as part of a stack when making any kind of new project. 

Still there are the redeeming qualities of lodash that still remain to this day, and as such it still is very much in use, even with new projects. For example the lodash forEach method will work with objects in general rather than just arrays, and if the method that is passed to it returns false it will stop the loop. The idea that lodash helps to function as a safety net of sorts still remains true to this day to some extent, and it is still nice to abstract things away into a single framework or sorts. In addition even if you choose to not use lodash in new projects it is still a project that is worth studying because of the way that it is designed.

So in this post I will be just writing about lodash in general, and many of these topics that come to mind, this post will also serve as a sort of main index for all other lodash content on this site.

### 1.1 - The deal with array prototype methods and collections in general

When learning a thing or two about native javaScript by itself it is only a matter of time until one breaks some ground with the built in [Array class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). When doing so one will end up becoming familiar with a number of [array prototype methods](/2018/12/10/js-array/) to work with. One popular example of this kind of array method that comes up a lot in discussions in various forums is the [array for each method](/2019/02/16/js-javascript-foreach/). This for each method as the name implies will simply call a given function for each element in the array to which the for each methods is called off of. ALthough a method such as this will work fine with arrays, there are a number of other collections to work with in javaScript code such as various types of array like objects, and collections with named rather than index key names.

It is possible to get these various array prototype methods to work with these other kinds of collections, but doing so requires a little extra leg work involving various other native javaScript features. For example to get array for each to work with an array like object I can use the [Function call prototype method](/2017/09/21/js-call-apply-and-bind/), or the [array from](/2020/01/27/js-array-from/) static method. When it comes to collections that are composed of objects that have named rather than index public key names there is making use of the [Object.keys and or Object.values methods](/2018/12/15/js-object-keys/), or a for in loop that would be an even older tired yet true means of doing so.

```js
// a 'collection' that is an 'array'
let a = [1, 2, 3];
// a 'collection' that is an 'array like object'
let b = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// a 'collection' that is an 'object with named public keys'
let c = {
    'zero': 1,
    'one': 2,
    'two': 3
};
// array for each will work fine with an array of course
a.forEach((n) => {
    console.log(n);
});
// for each will not just work with an array like object though
// as such I need to use something like the function call method

[].forEach.call(b, (n) => {
    console.log(n);
});
// or the array from static method
Array.from(b).forEach((n) => {
    console.log(n);
});
// Array for each will not just work with objects that have a named
// rather than numbered set of public keys, and no length property so
// something like the Object.values method needs to be used, or some kind
// of alternative to get it to work
Object.values(c).forEach((n) => {
    console.log(n);
});
```

Addressing this is not so hard for someone that has many years of experience working with javaScript, but for newer developers running into these kinds of problems can prove to be a major time consuming pitfall. If I need to have some kind of collection for something do I make it an array, or an object with named keys? If I make it an array I can use all these array prototype methods, but then I can not just quickly ref an item by a named key name also. Even if a developer has years of experience it is kind of nice to have a set of methods that will just work with collections in any form by just calling the method.

## 2 - lodash relevancy in light of ecmascript 2015+

Even before ecmascript 2015 there where many methods within lodash, and underscore that had a native counterpart method. There seem to be many developers that focus on methods in lodash like \_.concat or \_.isArray that in late versions of lodash just reference native methods and declare that lodash is no longer needed. In this section I will be addressing many of the talking points that bring into question of the relevancy of lodash in light of modern javaScript.

### 2.1 - Many lodash methods do not have a native counterpart.

First off there are many methods in lodash in which there is no native counterpart and as such having them there at the ready help save me the economy of time that I would spend writing my own solution. 

### 2.2 - Some lodash counterparts to native methods bring a bit more to the table

Second there are many lodash methods like [\_.map](/2018/02/02/lodash_map/), and [\_.forEach](/2017/11/20/lodash_foreach) that are collection methods rather than Array methods. Which means that they will work just fine with a wider range of objects that are objects with a collection of key value pairs in general. Also the \_.forEach method in lodash behaves a little differently allowing me to return a boolean value to break out of the forEach loop, so there is often additional functionality added that does sometimes bring a little more to the table compared to what the native method alone will do.

### 2.3 - lodash methods can be installed on an individual basis

You do not need to install the full lodash library if that bothers you. It is silly to do that if there is only one method of interest, and more often then not it is possible to quickly install that single method that is needed that is still absent in native javaScript.

## 3  - lodash methods

The lodash methods can be broken down into many categories that have to do with arrays, collections which can be javaScript arrays or objects, objects in general, functions, Strings and additional categories that have to do with other aspects of javaScript development.

### 3.1 - lodash array methods.

There are a number of [lodash array methods](/2019/02/14/lodash_array/) that are interned to be used with objects that are created with the javaScript Array constructor. This includes methods like [\_.chunk](/2017/09/13/lodash-chunk/) that can be used to break a linear array down into an array of arrays, as well as methods like [\_.concat](/2018/08/02/lodash_concat/) that does not add anything to the native Array.concat method and as such is just there for the sake of consistency it would seem. However the \_.map method is not a lodash array method as many may suspect, as that is an example of a lodash collection method.

### 3.2 - lodash collection methods

There are a number of methods in lodash that are considered collection methods. These are methods that will also work with javaScript arrays, but will also work with array like objects in most cases without using Function.call to do so as with native array methods. They also work with just plain old objects by themselves, in fact arrays in javaScript are just objects as well. So A collection is thinking not in terms of Arrays and Objects buy Just Collections that are either indexed or named.

The thing here is that regardless if I am dealing with an array that has numbered property keys and values, or just an object with names keys and values, in either case I am dealing with something that is a collection of sorts. So there is a desire to have robust collection methods that will work just fine with any kind of object that is treated as a collection.

### 3.3 - lodash object methods

Another category of lodash methods are [lodash object](/2019/02/13/lodash_object/) methods. These are methods that are intended to be used with any kind of object in javaScript, many of them have to do with cloning objects, as well as merging them together.

## 4 - Conclusion

This post like many others on my site here is a work in progress, as time progresses I will likely update this post several times. If you can think of anything that I should add please let me know in the comments. In any case thank you for reading.