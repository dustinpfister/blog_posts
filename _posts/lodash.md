---
title: lodash
date: 2019-02-15 07:41:00
tags: [lodash]
layout: post
categories: lodash
id: 382
updated: 2019-02-19 17:35:46
version: 1.16
---

[Lodash](https://en.wikipedia.org/wiki/Lodash) is a JavaScript library that provides over some hundred modular utility functions to help work with arrays, functions, and objects in general. Many of the methods are [functional](https://en.wikipedia.org/wiki/Functional_programming) in nature conforming to rules that are constant with the concept of a [pure function](https://en.wikipedia.org/wiki/Pure_function). It is true that many of the functions in lodash, and underscore the older library from which it was forked, are now part of core javaScript itself. However many of the functions in lodash to work a little differently, and there is still some people out there using older browsers. In addition many of the utility methods are still not part of core javaScript at all, so it is not necessarily a dead library.


<!-- more -->

## 1 - lodash

There is much to write about when it comes to [lodash](https://lodash.com/) beyond just writing about the methods themselves. Lodash branches off into many other topics of interested with javaScript development such as [functional programing](https://en.wikipedia.org/wiki/Functional_programming) compared to [imperative programing](https://en.wikipedia.org/wiki/Imperative_programming programing). There is also a lot of blog posts that I see on the web that seem to focus on the fact that many of the methods in lodash are now part of javaScript itself, and that lodash is no longer needed as part of a stack when making any kind of new project. Then there are of course posts that point out some of the redeeming qualities of lodash that still remain to this day. So in this post I will be just writing about lodash in general, and many of these topics that come to mind, this post will also serve as a sort of main index for all other lodash content on this site.

## 2 - lodash relevancy in light of ecmascript 2015+

Even before ecmascript 2015 there where many methods within lodash, and undescore that had a native counterpart method. There seem to be many developers that focus on methods in lodash like \_.concat or \_.isArray that in late versions of lodash just reference native methods and declare that lodash is no longer needed. In this section I will be addressing many of the talking points that bring into question of the relevancy of lodash in light of modern javaScript.

### 2.1 - Many lodash methods do not have a native counterpart.

First off there are many methods in lodash in which there is no native counterpart and as such having them there at the ready help save me the economy of time that I would spend writing my own solution. 

### 2.2 - Some lodash counterparts to native methods bring a bit more to the table

Second there are many lodash methods like [\_.map](/2018/02/02/lodash_map/), and [\_.forEach](/2017/11/20/lodash_foreach) that are collection methods rather than Array methods. Which means that they will work just fine with a wider range of objects that are objects with a collection of key value pairs in general. Also the \_.forEach method in lodash behaves a little differently allowing me to return a boolean value to break out of the forEach loop, so there is often additional functionality added that does sometimes bring a little more to the table compared to what the native method alone will do.

### 2.3 - lodash methods can be installed on an individual basis

You do not need to install the full lodash library if that bothers you. It is silly to do that if there is only one method of interest, and more often then not it is possible to quickly install that single method that is needed that is still absent in native javaScript.

## 3  - lodash methods

The lodash methods can be broken down into many categories that have to do with arrays, collections which can be javaScript arrays or objects, objects in general, functions, Strings and additional categories that have to do with other aspects of javaScript development.

### 3.1 - lodash array methods.

There are a number of [lodash array methods](/2019/02/14/lodash_array/) that are interned to be used with objects that are created with the javaScript Array constructor. This includes methods like [\_.chunk](/2017/09/13/lodash-chunk/) that can be used to break a linier array down into an array of arrays, as well as methods like [\_.concat](/2018/08/02/lodash_concat/) that does not add anything to the native Array.concat method and as such is just there for the sake of consistency it would seem. However the \_.map method is not a lodash array method as many may suspect, as that is an example of a lodash collection method.

### 3.2 - lodash collection methods

There are a number of methods in lodash that are considered collection methods. These are methods that will also work with javaScript arrays, but will also work with array like objects in most cases without using Function.call to do so as with native array methods. They also work with just plain old objects by themselves, in fact arrays in javaScript are just objects as well. So A collection is thinking not in terms of Arrays and Objects buy Just Collections that are either indexed or named.

The thing here is that regardless if I am dealing with an array that has numbered property keys and values, or just an object with names keys and values, in either case I am dealing with something that is a collection of sorts. So there is a desire to have robust collection methods that will work just fine with any kind of object that is treated as a collection.

### 3.3 - lodash object methods

Another category of lodash methods are [lodash object](/2019/02/13/lodash_object/) methods. These are methods that are intended to be used with any kind of object in javaScript, many of them have to do with cloning objects, as well as merging them together.

## 4 - Conclusion

This post like many others on my site here is a work in progress, as time progresses I will likely update this post several times. If you can think of anything that I should add please let me know in the comments. In any case thank you for reading.