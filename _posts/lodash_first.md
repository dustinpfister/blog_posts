---
title: loash first method and related topics
date: 2019-06-18 16:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 481
updated: 2022-01-19 08:54:28
version: 1.10
---

The [lodash first](https://lodash.com/docs/4.17.11#head) method which is also the lodash head method actually, is just a simple convenience method for getting the first element of an array that is passed to the method as the first argument. So then this is one of those methods in lodash that might make some question the worth of lodash a little when compared to just working with native javaScript by itself. After all getting the first element of an array with just native javaScript is just a matter of just grabbing at index 0 of the array with the bracket syntax. There is also the question of how to get the last element of an array, with this there is the [lodash last method](/2019/07/01/lodash_last/) that does that, and again this is something that is not all that hard and often be done by just simply subtracting 1 from the length of an array to do so.

So then in this post I will be going over a few quick examples of the lodash first method, and also a few additional topics that come to mind when preforming this kind of task. With that said I will be looking into some additional lodash methods that can be used to get the first element, as well as other typical elements of interest. Also there is taking a look at some additional examples that have to do with getting the first element of an array, and other related tasks using just native javaScript by itself.

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

## 2 - Getting first few elements of an array using other lodash methods

The lodash find method only takes one argument and only returns the element that is the first element of the array that it is given. If you want an array of elements from zero forward, and you want that array sorted, then there is the \_.slice, and \_.sortBy methods that can be used.

```js
let arr = ['c', 'f','e', 'a', 'd', 'b'];
firstFew = _.slice(_.sortBy(arr),0,3);
console.log(firstFew); // ['a','b','c']

```

But again doing so with just plain old vanilla javaScript is not all that hard.


So there is not much or a reason to bother with many of these lodash methods once a developer becomes used to what there is to work with when it comes to native methods. Maybe there are some talking points when it comes to using abstractions even for methods like this, but I would say it is largely a nit pick issue. The real concern is if what i am developing to begin with is something that is work my time after all.

## 3 - Using just native javaScript by itself

### 3.1 - sort and slice

```js

let arr = ['c', 'f','e', 'a', 'd', 'b'];
firstFew = arr.sort().slice(0,3);
console.log(firstFew); // ['a','b','c']
```

## 4 - Conclusion

So the lodash first method is not one of the most compelling methods to help build a case as to you developers should continue bothering with lodash. Do not get me wrong I do not care to hop on the kick lodash to the curb band wagon just yet necessary. It is just that I have to admit that if I just want to get the first element of an array, it is not such a big deal to just use the bracket syntax with the index value of zero.

The redeeming qualities of lodash have a lot to do with the idea of what functional programing is, and the benefits that are gained by having stand alone methods rather than native ones which it comes to things like monkey patching native methods compared to just using a complete stand alone method. However all of this is a matter for another post.