---
title: Removing false values from an array with lodash _.compact and native javaScript.
date: 2018-08-09 13:41:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 254
updated: 2021-11-24 08:46:09
version: 1.28
---

For today I will be writing another one of my quick little posts on [lodash](https://lodash.com/), when I do so it is often on the topic of a specific method in lodash, and for today that method is the [lodash compact](https://lodash.com/docs/4.17.10#compact) method. My approach with writing content on lodash is that when I write a post on a certain lodash method, I am not just writing about lodash, but a certain way to preform a certain task often involving arrays, array like objects, or collections in terms of objects in general. So under that light I think it is a good idea to write some content on the topic of the compact method and any additional lodash methods and native javaScript features that will come up while in the process of doing so.

The main idea about the \_.compact method is that it can be used to quickly remove false values away from an array. With that said the compact method is one of the array rather than collection methods in lodash, so then the compact method is not a replacement for other lodash methods like that of the [lodash filter](/2018/05/18/lodash_filter/) method. Also there are other array method options in lodash such as the [lodash remove](/2017/09/19/lodash_remove/) method that allows for a little more flexibility when it comes to defining what should not be in the new array that is to be cerated. Covering the method by itself is not that involved, but it can branch off into some additional topics when it comes to doing the same with just plain old vanilla js.

<!-- more -->

## 1 - Basics of lodash compact and what to know first

This is a post centered around the \_.compact method in lodash, a popular javaScript utility library that is packed with useful methods that help with common tasks when working with objects, arrays, functions and so forth in a jaavScript project. It is not a getting started post on lodash, or [javaScript in general](/2018/11/27/js-getting-started/) as that is outside the scope of this post. The \_.compact method can be used to remove elements fro an array that evaluate as false, there are many other ways to do this with lodash, as well as javaScript by itself.

### Source code is on github

The source code examples in this post can be found in my [test lodash](https://github.com/dustinpfister/test_lodash/tree/master/forpost/lodash_compact) repository on Github. This test lodash repository is the current repository where I intend to have the source code examples for my many [other posts on lodash](/categories/lodash/) as I go threw and edit my content on lodash.

### 1.1 - Using lodash \_.compact

For a basic example of this say we just have a simple array with some values in it. Some of these values will evaluate to false if you where to convert them to boolean, others will not. Say you want to just remove all the values that will evaluate to false, and keep the ones that do not. there are many ways to go about doing this, but if lodash is part of your projects stack the \_.compact method can be used to make quick work of this. There are of course other methods in lodash, and doing so with plain old vanilla js is not big deal as well, so lets take a look at some examples.

So of course lets start of with using lodash \_.compact method first, doing so is stupid simple just call the method passing the array that you want false values removed, and the desired array will be returned.

```js
let arr = [null,1,'foo',NaN,false,'bar',undefined,undefined,42];
 
console.log(_.compact(arr)); // [ 1, 'foo', 'bar', 42 ]
```

So then it is a very simple method to just go about moving false methods from and array. However sometimes what should count as false, or just simply what should not be part of an array might differ from time to time depending on the situation. SO with that said lets take a look as some other ways of how to go abut compacting an array down with lodash and native javaScript.

### 1.2 - Using lodash remove in place of compact

Another option in lodash for making an array more compact would be the lodash remove method. One draw back of this lodash remove method compared to the compact method is that the remove method will mutate an array in place. If this is a problem though such an issue can often easily be filed by using a method like [lodash clone](/2017/10/02/lodash_clone), or [lodash clone deep](/2017/11/13/lodash_clonedeep/) when it comes to situations involving nested objects that also need to be cloned. 

The main advantage that is gained from using remove over compact is that I can define a custom method to figure out what should and should not be removed. With that said I can use that as a way to remove what I want gone when it comes to mutating an array in place, but I can also create a clone of the source array, and invert the logic to get a return value with a desired outcome also.

```js
let a = [null,1,'foo',NaN,false,'bar',0,undefined,undefined,42];
// lodash remove can work just like lodash compact in that the return value
// of return well be the elements that are removed. However lodash remove
// will also mutate the source array in place
let b = _.remove( a, (el) => { return !!el; } );
console.log(b); // [ 1, 'foo', 'bar', 42 ]
console.log(a); // [ null, NaN, false, 0, undefined, undefined ]
// there are ways of addressing the mutation in place problem though such as using
// the lodash clone method, also I have control of the condition that is used to remove
// elements.
a = [null,1,'foo',NaN,false,'bar',0,undefined,undefined,42];
let c = _.remove( _.clone(a), (el) => { return typeof el === 'number' && !_.isNaN(el); } );
console.log(c); // [ 1, 0, 42 ]
console.log(a); // [ null, 1, 'foo', NaN, false, 'bar', 0, undefined, undefined, 42 ]
```

## 2 - Native javaScript solutions for removing false values from an array to compact it

When it comes to using native javaScript alone there are a number of options for removing false elements from an array also. In this section I will be going over a few options on how to go about compacting an array down with just core javaScript itself. Some of these solutions will work not just with arrays but objects in general which is one of the draw backs of using the compact method when it comes to dealing with array like objects and objects with named rather than numbers key names.

### 2.1 - Using Array.forEach

It is not to hard to make a vanilla js solution using [Array forEach](/2019/02/16/js-javascript-foreach/), and drop the use of lodash for this kind of task. It is true that all we are doing here is that we are looping over the contents of an array, and applying a condition for each element, if that condition is true, the element is then pushed to a new array.

```js
var arr = [null, 1, 'foo', NaN, false, 'bar', undefined, undefined, 42];

var compact = function (a) {
    var n = [];
    a.forEach(function (el) {
        if (!!el) {n.push(el)}
    });
    return n;
};
 
console.log( compact(arr) ); // [ 1, 'foo', 'bar', 42 ]
```

So the basic idea of compacting an array can be done in a wide range of different ways, event when it comes to just using native javaScript and being done with it.

### 2.2 - Using Array.splice

The use of the [Array splice method](/2021/07/20/js-array-splice/) is another option when it comes to writing my own method that is like lodash compact with plain old native javaScript. The method also mutates the array in place, which in some cases might not be desired as it violates the rules of functional programing with respect to features of pure functions. One nice thing about the compact method is that it does not mutate a given source array in place like that of the array splice method.

```js
var compact = function (a) {
    var i = a.length;
    while (i--) {
        if (!a[i]) {
            a.splice(i, 1);
        }
    }
    return a;
};

var arr = [null, 1, 'foo', NaN, false, 'bar', undefined, undefined, 42];
console.log(compact(arr)); // [ 1, 'foo', 'bar', 42 ]
// splice will also mutate in place though
console.log(arr);  // [ 1, 'foo', 'bar', 42 ]
```

However it is yet another option when it comes to removing false values from an array in javaScript.

### 2.3 - The native javaScript filter array prototype can be used to easily compact an array

So lets not forget about the [filter array prototype](/2020/10/03/js-array-filter/) method that is well supported these days as it is an ecma r5 spec javaScript feature. That being said the following can be done with native javaScript real easy like without lodash.

```js
var arr = [null, 1, 'foo', NaN, false, 'bar', undefined, undefined, 42];
arr = arr.filter(function (el) {
    return !!el;
});
console.log(arr); // [ 1, 'foo', 'bar', 42 ]
```

## 3 - Conclusion

The lodash compact method will quickly create a new array that is a source array wit all the false elements removed. However there are a number of draw backs with this compared to other options like the remove method in lodash that is a bit more flexible compared to compact when it comes to defining some custom logic of what it is that should not be in a new array. There are other methods such as that of the lodash filter method that is an examples of a collection method in lodash that will work with arrays as well as objects in general.

