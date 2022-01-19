---
title: loash first method and related topics
date: 2019-06-18 16:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 481
updated: 2022-01-19 09:42:05
version: 1.20
---

The [lodash first](https://lodash.com/docs/4.17.11#head) method which is also the lodash head method actually, is just a simple convenience method for getting the first element of an array that is passed to the method as the first argument. So then this is one of those methods in lodash that might make some question the worth of lodash a little when compared to just working with native javaScript by itself. After all getting the first element of an array with just native javaScript is just a matter of just grabbing at index 0 of the array with the bracket syntax. There is also the question of how to get the last element of an array, with this there is the [lodash last method](/2019/07/01/lodash_last/) that does that, and again this is something that is not all that hard and often be done by just simply subtracting 1 from the length of an array to do so.

So maybe there are still a few things to write about when it comes to a method like the lodash first method, after all there is not just getting the first element of an array when getting the first element of an array. For example there is getting the first element of an array, and also mutating the array in place while doing so. There is trying to get the first element of an array, but getting a default value in the event that the first element of an array is undefined. There is also sorting an array before getting the first element, and when doing so mutating in place and not mutating in place.

So then in this post I will be going over a few quick examples of the lodash first method, and also a few additional topics that come to mind when preforming this kind of task. With that said I will be looking into some additional lodash methods that can be used to get the first element, as well as other typical elements of interest. Also there is taking a look at some additional examples that have to do with getting the first element of an array, and other related tasks using just native javaScript by itself.

<!-- more -->

## 1 - The basics of lodash first, and other things to be aware of

To start out with in this section I will of course be going over a few basic examples of just the lodash first method. There is only so much to cover when it comes to using this method of course, I give it an array, it returned the first element in that array at index 0. So while I am at it I will also be writing about a few other lodash methods while using the lodash first method that address some of the draw backs of using this method alone.

### 1.1 - Basic lodash frist example

So the lodash first method is an array method that can be used to just simple get the first element of an array at index zero. Just pass the array as the first argument when calling lodash first and the first element is returned.

```js
let arr = ['foo','bar', 'baz'];
// so yep it gets the first element of an array
console.log(_.first(arr) ); // 'foo'
```

However doing so is not so hard to understand when it comes to plain old javaScript itself, just get the zero index element by using the bracket syntax right? The only thing I can thing of that comes to mind in defense of this is that it does make it a little more clean when it comes to new javaScript developers, but using the word first. Aside from that, the lodash first method is not a method in lodash that helps support a string case to continue using it on top of native javaScript by itself.

### 1.2 - Lodash first will not mutate in place, and the lodash pull at method

The lodash first method will not mutate an array in place, more often that not this is a desired effect. However if for some reason I do want to not just get the first element, but also remove that first element while doing so, then I will need to use some other method. One way to address this potential draw back of the lodash first method would be to use the lodash pullAt method that will create and return a new array with removed element form a source array by way of a given index value. SO I can call pullAt give the source array, and then the index 0 for the first element. The returned result from pullAt will then be an array so once again I can then use the bracket syntax to get the value of that first element.

```js
let arr = ['foo','bar', 'baz'];
// the lodash first method will not mutate in place
console.log( _.first(arr) ); // 'foo'
console.log( arr ); // ['foo','bar', 'baz'];
 
// other methods like pullAt will mutate in place
console.log(_.pullAt(arr, 0)[0]); // 'foo'
console.log( arr ); // ['foo','bar', 'baz'];
```

### 1.3 - Can not set a default value when using lodash first, but this can be done with lodash get

Another draw back of the lodash first method is that it will only take one argument, so then there is no additional arguments or options with this method, such as setting a default value in the event that the first element is undefined. Other methods in lodash will allow for this kind of feature such as the [lodash get collection method](/2018/09/24/lodash_get/).

```js
let arr = [];
// no way to set a default if undefined or empty
console.log( _.first(arr) ); // undefined
// with lodash get a default can be set
console.log( _.get(arr, '0', 0) ); // 0
```

## 2 - Getting first few elements of an array using other lodash methods

The lodash first method only takes one argument and only returns the element that is the first element of the array that it is given. If you want an array of elements from zero forward, and you want that array sorted, then there is the [slice](/2020/12/01/lodash_slice/), and [sortBy](/2018/07/06/lodash_sortby/) methods that can be used.

```js
let arr = ['c', 'f','e', 'a', 'd', 'b'];
firstFew = _.slice(_.sortBy(arr),0,3);
console.log(firstFew); // ['a','b','c']

```

But again doing so with just plain old vanilla javaScript is not all that hard.


So there is not much or a reason to bother with many of these lodash methods once a developer becomes used to what there is to work with when it comes to native methods. Maybe there are some talking points when it comes to using abstractions even for methods like this, but I would say it is largely a nit pick issue. The real concern is if what i am developing to begin with is something that is work my time after all.

## 3 - Using just native javaScript by itself

The lodash first or head method might be a nice little convenience method for just quickly getting the first element in an array without mutating in place. However this is a task that is really not all that hard to just do with native javaScript by itself. In fact many of the related tasks that I have wrote about in this post can also be done with just plain old javaScript by itself also. In this section I will then be going over some of the examples of doing what the lodash first method does without lodash, working just with native javaScript alone.

### 3.1 - Array sort and Array slice

The array sort method can be used to sort an array in place, the slice method can then be used to get a new array from that sorted array.

```js

let arr = ['c', 'f','e', 'a', 'd', 'b'];
firstFew = arr.sort().slice(0,3);
console.log(firstFew); // ['a','b','c']
```

## 4 - Conclusion

So the lodash first method is not one of the most compelling methods to help build a case as to you developers should continue bothering with lodash. Do not get me wrong I do not care to hop on the kick lodash to the curb band wagon just yet necessary. It is just that I have to admit that if I just want to get the first element of an array, it is not such a big deal to just use the bracket syntax with the index value of zero.

The redeeming qualities of lodash have a lot to do with the idea of what functional programing is, and the benefits that are gained by having stand alone methods rather than native ones which it comes to things like monkey patching native methods compared to just using a complete stand alone method. However all of this is a matter for another post, and with that said of you enjoyed this and would like to read more on lodash I have a lot more [posts on lodash beyond this one](/categories/lodash).

