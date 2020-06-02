---
title: loash first method and related topics
date: 2019-06-18 16:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 481
updated: 2020-06-02 11:12:17
version: 1.7
---

The [lodash \_.first](https://lodash.com/docs/4.17.11#head) aka \_.head method is just a simple convenience method for getting the first element of an array. So then this is one of those methods in lodash that make me question the worth of lodash a little. The reason being that it is not such a big deal to gust simply get the first element of an array with javaScript by itself. Well anyway I thought I would write a short post on lodash first and some related topics, but it goes without say that this is not something that should end up eating up a great deal of my attention.

<!-- more -->

## 1 - lodash first example

So the lodash first method is an array method that can be used to just simple get the first element of an array at index zero. Just pass the array as the first argument when calling lodash first and the first element is returned.

```js
let arr = ['foo','bar', 'baz'];
 
// so yep it gets the first element of an array
console.log(_.first(arr) ); // 'foo'
 
// but do does this
console.log( arr[0] ); // 'foo'
```

However doing so is not so hard to understand when it comes to plain old javaScript itself, just get the zero index element by using the bracket syntax right? The only thing I can thing of that comes to mind in defense of this is that it does make it a little more clean when it comes to new javaScript developers, but using the word first. Aside from that, the lodash first method is not a method in lodash that helps support a string case to continue using it on top of native javaScript by itself.

## 2 - Getting first few elements of an array using lodash and native javaScript

The lodash find method only takes one argument and only returns the element that is the first element of the array that it is given. If you want an array of elements from zero forward, and you want that array sorted, then there is the \_.slice, and \_.sortBy methods that can be used.

```js
let arr = ['c', 'f','e', 'a', 'd', 'b'];
firstFew = _.slice(_.sortBy(arr),0,3);
console.log(firstFew); // ['a','b','c']

```

But again doing so with just plain old vanilla javaScript is not all that hard.

```js
let arr = ['c', 'f','e', 'a', 'd', 'b'];
firstFew = arr.sort().slice(0,3);
console.log(firstFew); // ['a','b','c']
```

So there is not much or a reason to bother with many of these lodash methods once a developer becomes used to what there is to work with when it comes to native methods. Maybe there are some talking points when it comes to using abstractions even for methods like this, but I would say it is largely a nit pick issue. The real concern is if what i am developing to begin with is something that is work my time after all.

## 3 - Conclusion

So the lodash first method is not one of the most compelling methods to help build a case as to you developers should continue bothering with lodash. Do not get me wrong I do not care to hop on the kick lodash to the curb band wagon just yet necessary. It is just that I have to admit that if I just want to get the first element of an array, it is not such a big deal to just use the bracket syntax with the index value of zero.

The redeeming qualities of lodash have a lot to do with the idea of what functional programing is, and the benefits that are gained by having stand alone methods rather than native ones which it comes to things like monkey patching native methods compared to just using a complete stand alone method. However all of this is a matter for another post.