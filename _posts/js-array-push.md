---
title: JS Array push and other ways of adding elements to an array
date: 2020-06-17 17:33:00
tags: [js]
layout: post
categories: js
id: 668
updated: 2021-11-20 08:44:17
version: 1.37
---

So in javaScript there is the [array push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) prototype method that is typically what is used as a way to push new elements to the end of a [javaScript array](/2018/12/10/js-array/). There are many other ways of going about adding elements to an array also though, such as just using the object bracket syntax, as well as a range of other methods. 

So I thought I would write a quick post on this when it comes to the basics of adding elements to an array in javaScript. This is after all a major part of working with arrays in javaScript so it is a good idea to get what the options are fairly solid.

<!-- more -->

## 1 - The array push method and what to know

So to start off with in this section I will just be going over a few use case examples of the array push method only. While I am at it I also often use this section to mention various things that you should know about before continuing to read the rest of the post. Although the examples are fairly basic for this section and the rest of this post, I still assume that you have at least some background when it comes to [getting started with javaScript](/2018/11/27/js-getting-started/).

### 1.1 - Basic array push method

So the array push method will add a new element to the end of the array to which it is called off of, and it will also return the length of the new array. So if I just create a new array with say the array bracket syntax, I can then just call push off of that array instance and pass a new element value that is to be added to the end of the array.

```js
var arr = [16, 32];
arr.push(64)
 
console.log(arr.join('-')); // '16-32-64'
```

So then there is just pushing one new element at a time, but there is also pushing more than one element, and also looking into what can be done with the return value of array push. So lets look at a few more basic examples before moving on to some alternatives to adding elements to an array in javaScript.

### 1.2 - Push many at once

So if I would like to push more than one element at a time I can do so by just passing more than one argument. In other words the first argument will be added to the end of the array, and then the second will be added after the first argument and so forth. However if I have an array of values and pass that array as the first argument to the array push method that will result in the array being the new element in the array that I called push off of. In some cases this might be what I want, however if I want the elements of the array that I am giving to push to be new elements in the array that I am pushing to then one way to do this would be to use the function apply prototype method.

```js
var arr = [16, 32];
arr.push(64, 128, 256)
 
console.log(arr.join('-')); // '16-32-64-128-256'
 
var b = [1, 2, 3];
[].push.apply(b, [4, 5, 6]);
 
console.log(b.join('-')); // '1-2-3-4-5-6'
```

Of course when it comes to concatenating arrays there is the array concat method that might be a more appropriate choice, more on that method later in  this post, but I thought I would just point out why the function apply prototype method is useful. If you are not familiar with [apply, as well as call and bind then you should take a moment to read up](/2017/09/21/js-call-apply-and-bind/) on those function prototype methods. The methods allow for me to change what the value of the [this keyword](/2017/04/14/js-this-keyword/) is for prototype methods including array prototype methods like that of array push.

### 1.3 - Returns the length of the array

I did mention this, but I would say that it is worth another sub section in this post, that is the fact that the array push method will return the new length of the array. So this might come in handy when using the length property that is returned as a way to know if it is time to break out of a loop or not. For example I can create an object in the body of a do while loop, and push this object into an array with the array push method and then use the returned length value to compare to a value at which I would want to stop pushing objects.

```js
var arr = [], obj;
do {
    obj = {};
    obj.n = 0;
} while (arr.push(obj) < 10)
console.log(arr);
//[{n:0},{n:0},{n:0},{n:0},{n:0},{n:0},{n:0},{n:0},{n:0}]
```


### 1.4 - The source code examples here are up on guthub

The source code examples in this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-array-push) on github. This is where you would want to go if for some reason you want to make a pull request over one of the examples that I am writing about here. There is also the comments section fo this post in which you can bring something up when it comes to something that maybe should change, or be added on top of what I have covered here.

## 2 - The unshift method

So you might think that because there is a method that can be used to add elements to the end of an array, there should be a method that can be used to push elements to the beginning of the array also. Well you would be right about that because that is what the [array unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method is for. It works more or less the same way as array push, but the order of the arguments is inverted. In other words the last argument that you give will be added to the beginning of the array, and then each argument back to the first one will be added behind that one, and so forth.

```js
var arr = [16, 32];
arr.unshift(1, 2, 3, 4, 8)
 
console.log(arr.join('-')); // '1-2-4-8-16-32-64'
```

## 3 - Using the array concat method

So there are other ways to go about adding array elements such as just using the array bracket syntax, or doing something with the [array concat method](/2020/07/13/js-array-concat/) as a way to create a new array and then save that to a variable for example. This array concat method is then great when I have two or more arrays and I want to just join them together at some point.


### 3.1 - Basic array concat example

So then for a basic example of array concat say I have a simple array of values that are 4, 5, and 6. I then just want to join an additional array of values of 1, 2, and 3 at the beginning of the array, and another array of values at the end of the array. The array concat method can be done to do just this by calling the concat method off of the array that I want to be at the begging of the new array, and then just pass the arrays as arguments.

```js
var array = [4,5,6];
 
array[array.length] = 7;
array = [3].concat(array);
 
console.log(array.join('-')); // 3-4-5-6-7
```

### 3.2 - The concat method will flatten arrays that are given, but only by one level

The concat method will flatten an array of values given to it, but only by one level. What I mean by this is that if I just give primitive values at arguments to array concat they will just be added on as new elements, if I give an array of elements that will result in the same effect. However if I give an array of arrays any and all nested arrays after one level will be arrays rather that primitives. If you are still confused by what I am saying take a look at this code example.

```js
var array = [1, 2, 3];
array = array.concat([4, 5, [6, 7]]);
console.log(array); // [ 1, 2, 3, 4, 5, [ 6, 7 ] ]
```

## 4 - Array splice method can also be used to mutate in place, and inject at any index

Yet another option for injecting new elements to the end of an array would be the [array splice method](/2021/07/20/js-array-splice/). This method will mutate an array in place, and is also often used to remove one or more elements at a given element index. However when it comes to removing elements one does have the option of setting zero for the value, on top of that the splice method can also be used to inject new elements as this element index location.

### 4.1 - Array splice basic example

So then the basic idea here is to call the array slice method off of an array that I want to inject elements into. I then given the element index location of the array where I want to inject, and then I give a value of zero for the amount of elements to remove at that location. I can then inject one or more elements at that index by way of one or more additional arguments after that.

```js
var array = [1, 3];
array.splice(1, 0, 2);
console.log(array.join('-')); // 1-2-3
```

### 4.2 - An insert at method along with push and unshift methods

It is then possible to create an insert at method by using the array splice method along with the apply function prototype method, and the array concat method. This insert at method can take the array I want to insert elements into as the first argument, and then an index as to where to insert at, followed by an array of values to insert there. I can then create a new array and call the splice method off of that new array with the function apply prototype method. Sense I am calling apply off of the splice function I can given the array argument as the value of this for apply and then I need to given an array of arguments. For this I can create an array where the first element will be the index to insert at, followed by the number of elements to remove which is zero. After that I can call the array concat method of this array of arguments and pass the array of values to insert.

```js
var array = [4, 5, 6];
 
var insertAt = function (array, index, what) {
    [].splice.apply(array, [index, 0].concat(what));
};
// push
var push = function (array, what) {
    insertAt(array, array.length, what);
};
// unshift
var unshift = function (array, what) {
    insertAt(array, 0, what);
};
 
push(array, [7, 8, 9]);
unshift(array, [1, 2, 3]);
 
console.log(array); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

So then the array splice method is often my go to method for mutating arrays as it is fairly versatile. I can do the same as with push and shift, but I can also insert as well as remove at any element index location with it. The main drawback though that it will mutate in place which is one reason why I might chose to do something with the array slice method and concat in place of the array splice method if I do not want to mutate a source array.

## 5 - Conclusion

So the array push method is often what is used to add elements to a new array, but it is not the only way to go about doing so. There is the unshift method that can also be used when it comes to adding new elements to the begging of an array, and then there are a whole bunch of other ways of getting elements in and out of any index value such as with using the array splice method.

There is a great deal more to cover when it comes to working with arrays of course. There is not just the subject of adding elements to an array but also removing them. I have mentioned that the array splice methods can be used to do so by just giving a number for element to remove by a value greater than zero. There are a number of other options though such as the array pop method that will remove and return an element from the end of an array, and the array shift method that will do the same from the beginning of an array. However there is also the [array filter](/2020/10/03/js-array-filter/) method which is yet another great option for removing elements that can remove elements from an array by a given condition.

Also there is not just adding or removing elements from an array, but changing the state, or order of elements in an array. When it comes to creating a new array based off of a source array of values there is of course the [array map](/2020/06/16/js-array-map/) method. When it comes to changing the order of elements the first go to function in vanilla javaScript would be the [array sort](/2019/12/02/js-array-sort/) method.



