---
title: lodash last method and other ways to get the last element in an array in javaScript
date: 2019-07-01 13:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 495
updated: 2022-01-27 11:50:13
version: 1.19
---

The [lodash last](https://lodash.com/docs/4.17.11#last) method is an array method that can be used to get the last element in an array. On thing about the lodash last method is that this method will not mutate the source array that is given when compared to other similar methods such as the [array pop method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) in the native javaScript [array prototype](/2018/12/10/js-array/) that will not just give the last element in an array, but also remove that element from the source array to which the pop method is called off of. So even though this last method might prove to be very simple, it does something very simple in a specific way, and other methods might also again do a very specific kind of something in a slightly different kind of way.

So then the act of getting the last element in an array is a fairly simple task, so the lodash last method is not a great example of why javaScript developers should bother with lodash. Still in this post I will be taking a look at the \_.last method in lodash as well as other options when it comes to getting the last element in an array with just plain old vanilla javaScript by itself. So this will of course not just be a post on the lodash last method alone, as that would not be much of a post as there really is only so much to write about with this one.

<!-- more -->


## 1 - lodash last

The lodash last method works by just calling the method, and then passing the array to which I want the last element. When doing so it will give the last element in the array without removing it from the given source array.


```js
let arr = [1, 2, 3, 4],
last = _.last(arr);
// this will give the last argument
// and will leave the array unchanged
console.log(last); // 4
console.log(arr); // [1,2,3,4]
```

Simple enough, but what if I want the last element, and I want it to be removed from the array also in the process of doing so? Also do I really need lodash to do this? Seems like this should be a simple enough task when it just comes to using javaScript by itself. Well there are other ways of getting the last element in the array, and removing it as well when doing so, with and without lodash. So lets look at some more examples of how to to get that last element in an array in javaScript.

## 2 - Other lodash methods

The lodash last method is one option for getting the last element in an array, and doing so without mutating the array in place. However there are also a whole lot of other methods in lodash that can also be used to do this, with, and without mutating in place. So then in this section I will be exploring some of the other options for getting the last element in an array, still using lodash methods without event getting into what there is to work with when it comes to native javaScript by itself.

### 2.1 - lodash remove

So there is also the lodash \_.remove method that can be used to get the last element of an array. However it is a far more complex solution for something that is fairly simple. The lodash remove method works by passing the array as the first argument and then a function that will be called for each element. In the body of the function that is called I could give an expression that will return true when it is the last index in the array.

```js
let arr = [1, 2, 3, 4],
last = _.remove(arr, (el,i)=>{
    return i === arr.length -1
})
// lodash remove could be used as well
// for getting the last element. However it will
// also mutate the array, and is a complex 
// solution for a fairly simple task
console.log(last[0]); // 4
console.log(arr); // [1,2,3,4]
```

It works sure, but for something so simple it is a bit much. The lodash remove method should be used when there is some far more complex set of criteria that is required when it comes to removing and returning the last element in an array.

## 3 - Vanilla javaScript alternatives to lodash last

So now that we looked at some examples of using lodash as a way of getting and or removing the last element in an array, lets looks at some examples of doing the same thing with just plain old javaScript by itself.

### 3.1 - Just use Array.length -1

So if I want to just get the last element in the array, and not remove it. There there is just using the Array length property minus one as a way to get the zero relative index value of the last element like so.

```js
let arr = [1, 2, 3, 4],
last = arr[arr.length - 1];
// same effect as with lodash last
console.log(last); // 4
console.log(arr); // [1,2,3,4]
```

### 3.2 - Array.pop to both get an remove

So then there is the [Array pop method](/2020/05/30/js-array-pop/). This array prototype method will return the last element in an array, and it will also remove it at the same time.

```js
let arr = [1, 2, 3, 4],
last = arr.pop();
// array.pop will give the last element
// but it will also mutate the array
console.log(last); // 4
console.log(arr); // [1,2,3]
```

### 3.3 - Array.splice

Of course there is also [Array splice](/2021/07/20/js-array-splice/) that can be used to return a a new array that is a slice of the array from which it is used. So then this can be used as an alternative that works just like lodash last as well sense it does not remove the last element just gives it to you.

```js
let arr = [1, 2, 3, 4],
last = arr.splice(arr.length-1,1);
// array.splice will have the same effect as
// arrar.pop
console.log(last[0]); // 4
console.log(arr); // [1,2,3]
```

### 3.4 - Array.slice

The [array slice method](/2018/12/08/js-array-slice/) works in a similar way to that of slice, but index values must be given for both arguments. In addition this will also mutate the array from which it is called.

```js
let arr = [1, 2, 3, 4],
last = arr.slice(arr.length-1,arr.length);
// array.slice will work like lodash last
console.log(last[0]); // 4
console.log(arr); // [1,2,3,4]
```

## 4 - Conclusion

Well there you have it, the lodash last method is to just get the last element in the array. So there is really not much more to say about it beyond additional ways of doing so with and without lodash. I do not use lodash that much these days, and when I do it is often to just use one or two methods like that of [merge](/2017/11/17/lodash_merge), or [chunk](/2017/09/13/lodash-chunk/). I can nit say that the lodash last method is a great talking point as to why we should keep using lodash, but I suppose it does still have its redeeming qualities.