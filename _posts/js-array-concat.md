---
title: The array concat method and some other ways of adding two arrays together
date: 2020-07-13 14:11:00
tags: [js]
layout: post
categories: js
id: 681
updated: 2021-07-12 17:15:10
version: 1.20
---

So there is adding two strings or numbers together with the addition operator in javaScript, but then there is adding two or more objects together including [Arrays](/2018/12/10/js-array/) and how such an operation should be handled. In the array prototype object there is the [array concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method that can be used to create a new array that is the concatenation of two or more arrays, or values by themselves actually. Simply put the Array.concat method is one way to go about adding two or more arrays together into a single array. 

There are then also ways of going about doing the same thing, such as converting an array to a string and then back again using something like the [array join](/2020/03/09/js-array-join/), and then [string split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) methods. There are also methods in popular utility libraries, such as the [concat method in lodash](/2018/08/02/lodash_concat/) and well as join and split methods. Another thing that comes to mind is what is really intended by adding two arrays together, typically that would be just creating a new array with the elements of one or more arrays, but in some cased one might want a [sum of one or more arrays of numbers](/2018/11/15/lodash_sum/).

There are also a number of things to look out for when concatenating arrays together when it comes to the values in the arrays. For example when it comes to having to arrays of objects the resulting array will be a new array, but the objects in the arrays will still reference the same objects in memory. So lets look at some examples of array concatenation with the array concat method, as well as other ways to go about getting a similar effect.

<!-- more -->

## 1 - Basic array concat example

So the basic idea of the concat method is that I just call it off of an instance of a javaScript array, and then pass one or more arrays that I want to concatenate with the array that I call the method off of. A new array will be returned by the array concat method, and none of the source arrays including the array that the method is called off of will be mutated.

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = a.concat(b);
 
console.log(a, b, c);
// [ 1, 2, 3 ] [ 4, 5, 6 ] [ 1, 2, 3, 4, 5, 6 ]
```

So then that is the basic idea of the array concat method, it is there for just going ahead and adding one array to another. When it comes to simple arrays or primitive values like this it will work just fine as expected. It is only when coping arrays of nested objects that maybe a developing might run into some problems though when it comes to copying references to objects, but maybe that is a [matter for another post](/2017/11/13/js-copying-vs-referencing-objects-in-javascript/). In any case lets look at least a few more examples of adding two or more arrays together into one.

## 2 - Can pass arrays, and just values also as arguments

So the array concat method can be used to concatenate two or more arrays, but values can also be added via arguments also. So then this concat method also works as an alternative to the array push method then also on top of just a way to add to arrays together into one array.

```js
var a = [1, 2, 3],
b = a.concat(4, 5, '6', null, false, {}, [7, 8], [9, 10, 11], [12]);
 
console.log(b);
// [ 1, 2, 3, 4, 5, '6', null, false, {}, 7, 8, 9, 10, 11, 12 ]
```

speaking of the array push method it is actually possible to use array push in the same way as concat when it comes to just one array at least when it comes to using array push with something like the function apply method. More on that later in this post.

## 3 - Using array like objects and array concat

So with many array prototype methods it is possible to use the Function call prototype method to get an array method to work with array like objects. However when using the array concat method on an array like object with function call I end up getting a result that might not end up being expected. So when working with array like objects, it might be better to use the array from static method to convert an array like object to an array, and then use concat off of the resulting array.

```js
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
 
var a = Array.prototype.concat.call(obj, 4, 5, [6, 7]),
b = Array.from(obj).concat(4, 5, [6, 7]);
 
console.log(a);
// [ { '0': 1, '1': 2, '2': 3, length: 3 }, 4, 5, 6, 7 ]
console.log(b);
// [ 1, 2, 3, 4, 5, 6, 7 ]
```

## 4 - The addition operator, strings, and the string split method

So one might think that the addition operator can just be used to add to arrays together. The funny thing about it is that in some cases you actually can if we are talking about an array of primitive values at least maybe. When adding two arrays together by default the value of methods will return a string value of the array. So by adding a comma between the two arrays you might end up with a formatted string that can then be split back into an array.

In other words something like this:

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = a + b;
 
console.log(c, c.constructor.name);
// 1,2,34,5,6 String
 
var d = String(a + ',' + b).split(',');
console.log(d, d.constructor.name);
// [ '1', '2', '3', '4', '5', '6' ] 'Array'
```

I can not recommend that doing this is a good practice, but in some cases it seems to work okay, so I guess it is worth writing about at least. It is also worth mentioning the nature of valueOf and ToString methods of objects, and why they come in handy in some situations. When working with the addition of objects a toString method defines logic that will be used to create a string primitive value of the object, and the valueOf method can be used to define what a number primitive value is for the object. However maybe getting into the depth of that is a matter for other blog posts.

## 5 - Using array.push and Function.apply to concatenate arrays

Another way to concatenate arrays would be to use the array push method with the apply function prototype method. the thing about the push method is that it can be used to add one or more elements to an array, but only by way of one element at a time, or more than one but by way of two or more arguments when calling array push. So the apply function method can be called off of the push method, and the array that you to concatenate to can be passed as the first argument followed by the other array that you want at the end of the one given the first argument to apply.

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = [];
 
[].push.apply(c, a);
[].push.apply(c, b);
 
console.log(a);
// [ 1, 2, 3 ]
console.log(b);
// [ 4, 5, 6 ]
console.log(c);
//[ 1, 2, 3, 4, 5, 6 ] 
```

The same should also work when it comes to using the array unshift method that is the same as push only it adds element to the beginning of an array rather than the end.

Apply, call and bind are worth writing more about, but I will not be getting into detail with those methods here. I have [wrote a post on these methods before hand anyway](/2017/09/21/js-call-apply-and-bind/) a long time ago, so there is just reading over that post if you want my take on these methods. Yes they come in handy a lot when working with javaScript code, so you should take a moment to read up on them more if you have not done so all ready.

## 6 - Arrays of objects and copying by reference

When working with two arrays of objects it is a good idea to keep in mind that the Array.concat method, and many other ways of concatenating arrays will result in a new array, but the new array will be a shallow copy. A shallow copy, or clone if you prefer, is a new array, but any nested objects in the array as elements might still be references to the same objects in memory.

```js
var a = [{x:0, y: 42},{x:50, y: 30},{x:75, y: 7}];
var b = [{x:20, y: 40},{x:8, y: 89},{x:63, y: 4}];
 
var c = a.concat(b);
 
// Array.concat does not mutate in place and
// returns a new array
console.log(a.length, b.length, c.length);
// 3 3 6
 
// however the objects will still be references to the same
// objects in memory. Mutating the value of a property in an 
// object in one of the arrays will effect the same object in
// other arrays
 
c[0].x=99;
c[0].y=99;
console.log(a[0], c[0]);
// { x: 99, y: 99 } { x: 99, y: 99 }
```

In many cases this might be what I want to happen actually, but in other cases I might want new objects in the resulting array. One way to do so would be to map over the array, and create a new object for each.

```js
var a = [{x:0, y: 42},{x:50, y: 30},{x:75, y: 7}];
var b = [{x:20, y: 40},{x:8, y: 89},{x:63, y: 4}];
 
c = a.concat(b).map(function(obj){
    return {
        x: obj.x,
        y: obj.y
    };
});
 
c[0].x=99;
c[0].y=99;
console.log(a[0], c[0]);
// { x: 0, y: 42 } { x: 99, y: 99 }
```

For more on this topic you might want to check out my post in which I get into the process of [copying arrays](/2020/09/03/js-array-copy/) in detail.

## 7 - Add arrays of numbers together

What if I want to add two arrays of numbers together, but add values rather than just append values to the end of a new array? So in order words I want to create a new array, but I want to add the corresponding values that have the same element index in each of them. Then there is also create a final sum of all the numbers in the form of a number rather than an array. So in this section I will be going over a quick source code example of this sort of thing when it comes to adding two arrays together.

```js
let addArrays = (arr1, arr2) => {
    let arr = [],
    bigger = arr1.length > arr2.length ? arr1 : arr2,
    smaller = arr1.length < arr2.length ? arr1 : arr2;
    return bigger.map((n1, i) => {
        var n2 = smaller[i];
        if (typeof n2 === 'number') {
            return n1 + n2;
        }
        return n1;
    });
};
let a1 = [1, 2, 3, 4],
a2 = [5, 6, 7],
a3 = addArrays(a1, a2);
// create an array with the values added
console.log(a3); // [6, 8, 10, 4]
// create a sum
let a4 = a3.reduce((acc, n) => {
        return acc + n;
    });
console.log(a4); // 28
```

## 8 - Conclusion

So the array concat method is the main goto method when it comes to creating a new array that is the product of two or more additional arrays. There is always more than one way of solving the same problem thous, not that any of the other methods of adding two or more arrays outline here are better choices or not though. It is generally a good idea to look into more than one way to go about doing something though, even if I end up just going with what it typical though.
