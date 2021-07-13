---
title: The lodash _.reduce method and Array.reduce.
date: 2018-07-25 09:36:00
tags: [js,lodash]
layout: post
categories: lodash
id: 242
updated: 2021-07-13 13:39:39
version: 1.8
---

For todays post on [lodash](https://lodash.com/) I thought I should write a post on the [\_.reduce](https://lodash.com/docs/4.17.10#reduce) collection method, and also of course the corresponding [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method in core javaScript itself. Speaking of the native array reduce method I have now wrote a [post on the native array reduce method](/2021/07/13/js-array-reduce/) also, but I will be touching base on that method on this post also. 

The Array.reduce method works just fine, however if you are using lodash in a project the \_.reduce method is a little more robust, as it is one of the many lodash collection methods that will work on arrays and many object collections in general and it also has some baked in shorthands for cretin common use case examples of it also. In any case the two solutions work very similar, and this post should help gain some insight as to why reduce is useful in some situations that call for it.

<!-- more -->

## 1 - Before continuing

This is a post on the \_.reduce method in lodash a fairly popular javaScript framework that has many useful methods for working with objects, arrays, and more. Much of the functionality in lodash is now more often then not included in native javaScript itself these days, but not always with all lodash methods. In addition some times the native solutions do not work the same, and with less features compared to the lodash counterparts. In any case this is not a getting started post using lodash or on javaScript in general, and I assume that you have at least some background with javaScript and working with external libraries such as lodash when needed.

## 2 - Some basic examples of reduce that just reduces an array of numbers into a sum

For a basic example of using reduce, it would be good to start with just an array of numbers. Often there ends up being a situation it which something needs to be done that involves [summation](https://en.wikipedia.org/wiki/Summation), such as when figuring out an [arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean) for example. Although other more specific methods like [\_.sum](/2018/11/15/lodash_sum/), and native loops can be used, this is a post on reduce so...

### 2.1 - Using \_.reduce in lodash

With the lodash \_.reduce method I just give the array of numbers as the first argument, and then a iteratee method as the second argument. In this method the first argument is the accumulator, the second is the current key or index value, the third argument is the key or index, and then the fourth argument is the collection (array or object).

```js
let sum = _.reduce([1, 1, 1, 1], function (acc, cur) {
 
    return acc + cur;
 
});
 
console.log(sum); // 4
```

This works fine because the first element in the collection is a number, so then the starting value of acc is a number, and then all additional values are numbers as well, so I do not have to do anything fancy with type detection, or recursive processing with this example. In other words the function is only called three times, and on the first call the value of acc is the value of the first element in the array, so I can just add.

### 2.2 - Using Array.reduce

So if I am only working with arrays then there is not much need for \_.reduce, because in most cases the Array prototype equivalent of this will work just fine.

```js
let sum = [1, 1, 1, 1].reduce((sum, cur)=> {
 
    return sum + cur;
 
});
 
console.log(sum); // 4
```

However this is just a simple example that involves working with an array, and not an object in general, or an array like object such as an instance of HTMLCollection.

## 3 - Basic example of using reduce with an array like object.

So Arrays in javaScript are Objects that are an instance of Array. So it should be possible to use reduce with array like objects, that is objects that are structured in the same way as Arrays, but are not an instance of Array therefor do not have the Array methods attached to it's prototype including reduce. In this section I will show why some of these methods in lodash are a little more robust, and that doing the same with just vanilla js can be a little more involved to gain the same functionality.

## 3.1 - Using \_.reduce it does not even have to have a length property.

In most cases an array like object will have a length property just like with an Object created with the Array constructor, but with \_.reduce in lodash it does not even have to have that.

```js
let sum = _.reduce({0:1,1:1,2:1,3:1}, function (sum, cur) {
 
    return sum + cur;
 
});
 
console.log(sum); // 4
```

Also the object does not have to have key values that are consistent with index numbers as well. The \_.reduce method will find all that out for me behind the senses, and I do not have to spend time writing, or hunting down a vanilla js solution for thouse kinds of situations as well.

## 3.2 - The same can be done with Array.reduce, but I need to use call, and the object must have a length property.

So [call (also apply, and bind)](/2017/09/21/js-call-apply-and-bind/) come in handy when trying to make a prototype method work with another object that does not have that method in it's prototype. So this does allow for me to get Array.reduce to work, assuming the object does have a length property, and the key values are constant with what would be an Array.

```js
let sum = Array.prototype.reduce.call({0: 1,1: 1,2: 1,3: 1,length: 4},(sum, cur)=>{
 
    return sum + cur;
 
});
 
console.log(sum); // 4
```

## 4 - conclusion

So the reduce method is a great way to go about reducing a collection into a single value of some kind. I do find it a little awkward to work with some times when it comes to the accumulator argument, but once I get the hand of it the reduce method is one such method that always comes to mind in situations where it is called for.

The reduce method is of course just one tool in the toolbox though, as there are many other such options that might be a better choice when working with arrays r collections of some kind in general. There is of course the [filter](/2018/05/18/lodash_filter/), and [map methods](/2018/02/02/lodash_map/) also of course that come to mind often.