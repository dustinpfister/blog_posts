---
title: lodash
date: 2019-02-15 07:41:00
tags: [lodash]
layout: post
categories: lodash
id: 382
updated: 2019-02-15 09:36:17
version: 1.5
---

[Lodash](https://en.wikipedia.org/wiki/Lodash) is a JavaScript library that provides over three hundred modular utility functions to help work with arrays, functions, and objects in general. Many of the methods are [functional](https://en.wikipedia.org/wiki/Functional_programming) in nature conforming to rules that are constant with the concept of a [pure function](https://en.wikipedia.org/wiki/Pure_function). It is true that many of the functions in lodash, and underscore the older library from which it was forked, are now part of core javaScript itself. However many of the functions in lodash to work a little differently, and there is still some people out there using older browsers. In addition many of the utility methods are still not part of core javaScript at all, so it is not necessarily a dead library.


<!-- more -->

## 1 - lodash

There is much to write about when it comes to [lodash](https://lodash.com/) beyond just writing about the methods themselves. Lodash branches off into many other topics of interested with javaScript development such as functional programing compared to [imperative programing](https://en.wikipedia.org/wiki/Imperative_programming programing). There is also a lot of blog posts that I see on the web that seem to focus on the fact that many of the methods in lodash are now part of javaScript itself, and that lodash is no longer needed as part of a stack when making any kind of new project. Then there are of course posts that point out some of the redeeming qualities of lodash that still remain to this day. So in this post I will be just writing about lodash in general, and many of these topics that come to mind, this post will also serve as a sort of main index for all other lodash content on this site.

## 2  - lodash methods

The lodash methods can be broken down into many categories that have to do with arrays, collections which can be javaScript arrays or objects, objects in general, functions, Strings and additional categories that have to do with other aspects of javaScript development.

### 2.1 - lodash array methods.

There are a number of [lodash array methods](/2019/02/14/lodash_array/) that are interned to be used with objects that are created with the javaScript Array constructor. This includes methods like [\_.chunk](/2017/09/13/lodash-chunk/) that can be used to break a linier array down into an array of arrays, as well as methods like [\_.concat](/2018/08/02/lodash_concat/) that does not add anything to the native Array.concat method and as such is just there for the sake of consistency it would seem. However the \_.map method is not a lodash array method as many may suspect, as that is an example of a lodash collection method.