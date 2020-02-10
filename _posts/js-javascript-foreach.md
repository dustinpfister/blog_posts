---
title: JavaScript forEach with arrays and objects in general
date: 2019-02-16 10:39:00
tags: [js]
layout: post
categories: js
id: 384
updated: 2020-02-10 10:00:57
version: 1.28
---

In javaScript there is the [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method that is often used as a quick way to go about looping over the contents of an array. However there are other Array methods that do the same thing, but might be a better choice depending on what you want to do with an Array. Some such methods are Array prototype methods like [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), and [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). There are also plain old loops like while loops, and for loops that can also be used as a way to loop over all the contents of an array or just some of them, and in some cases prove to do so a little faster.

Then there are other objects in javaScript that are structured like arrays, but are not arrays, and thus are often referred to as array like obejcts. In addition there are just simply objects in general, that might have numbered index keys or named keys. So then there are Object static methods like the Object.keys method, that can be used to create an array of key values that can then be used as a way to loop over the contents of any objects public keys. Another option would be a for in loop that can be used as ways to help loop over the public contents of Objects in general in javaScript.

So then just when it comes to native javaScript alone there is a wealth of options when it comes to looping over the contents of an array, or object in general. However there is then getting into user space utility librarys and frameworks also. As of this writing lodash is still the most popular option in this regard, and the [\_.forEach method](/2017/11/20/lodash_foreach/) works more or less the same way as the native Array.prototype.forEach method, but it is what is called a collection method. In  other words it is a method that will work on objects in general, and also can be broken out of just like with loops combined with the use of the break keyword. 

There is a whole lot to cover when it comes to looping over the contents of an array or object in general in javaScript. So in this post I will be sticking to topics surrounding the native forEach array prototype method, and will be branching off into other related topics when it comes to user space options and other options with just plain old native javaScript bu itself.

<!-- more -->

## 1 - javaScript forEach and what to know before hand

The Array.forEach method in native javaScript is one of many ways to loop over the contents of a collection in javaScript. However Array.forEach is only generally useful for looping over the contents of an Array, unless some trickery with function call method is used with array like objects, or some processing is done before hand. However even it you can get it to work to loop over the contents of a collection it might not still always be the best solution when it comes to looping over named collections. 

Also simply put it might not always be the best choice for the job when it comes to looping over the contents of an array. There is not golden hammer as it where when it cones to looping over things. I tend to prefer the use of while loops, I have my reasons why that is, but I am not going to suggest that everyone should stop using array foreach and just use while loops and only while loops all the time everywhere and anywhere.

In any case there are many options when it comes to looping over collections that involve the use of a library like lodash, as well as other native javaScript solutions such as while loops. Some might be more readable, but performance takes a hit, others might be more flexible, but again performance takes a hit. While loops might be fast, but can be even faster depending on how and where they are used. Also regardless of how well coded some javaScript might be with regards to performance the real bottom line in my view is what an over all project does and if it is of any value to people regardless if it is well coded or poorly coded.

### 1.2 - ECMA rev5 compliant methods

As time goes by it is becoming less, and less of an issue to worry about code breaking on clients when delivering modern javaScript exclusively. Still depending on your websites analytics with browser versions, it might still be better to stick to the tired yet true way of doing things with client side javaScript.

Sticking to an older javaScript spec will help to assure that what it is that you are making will work on a larger range of clients. Also if you want to support very old browsers that do not support Array.forEach, then even this code example will break in which case and even older method of doing so will have to be used to loop over the contents of an array.

## 2 - javaScript forEach and other basic examples of similar array prototype methods

So there is the Array forEach method, but there are other array prototype methods like map, filter and reduce. In this section i will be going over some quick examples of these methods.

### 2.1 - First off javaScripts forEach array prototype method

So a basic example of Array.forEach might look something like this.

```js
let arr = [1, 2, 3],
sum = 0;
arr.forEach((n) => {
    sum += n;
});
console.log(sum); // 6
```

In real projects want might need to happen for each element in an array might end up being far more complex than just adding up each number in the array. There might come a time where I might not want to start at index 0 each time, or I might want to do something with each array index and so forth. So lets look as some more basic examples that are written differently, but do more or less the same thing for now before moving on to so more advanced examples.

### 2.2 - Array.reduce

When it comes to doing anything that might involve a sum of any kind, it might be better to use Array.reduce in place of Array.forEach. 


```js
let arr = [1, 2, 3],
sum = arr.reduce((s,r)=>{return s+r;});
console.log(sum); // 6

```

This is one of many other Array prototype methods that work in a very similar way to that of Array.forEach, but behave a little differently. For one thing the Array.reduce method does not start looping at index 0, but rather index 1. the reason why is that the first element at index 0 is the initial value of an accumulator argument that is the first argument that is given to the function that is passed to Array.reduce. So in this example the value of s starts out as 1 and the value of r is 2, then on the next call the value of s is 3 and the value of r is 3 making the final value that is reduced to 6;

### 2.3 - Array.map

Another way to loop over elements in an array is to use Array.map. This method works more or less the same way as Array.forEach but with one significant difference. That difference is that whatever is returned will become that element in the array, or at least a copy of it that can then be reassigned to the variable that is.

```js
var arr = [1, 2, 3],
sum = 0;
 
arr = arr.map((n)=>{sum+=n;return Math.pow(2,n);});
 
console.log(sum); // 6
console.log(arr); // [2,4,8]
```

## 3 - While loops

Another way to loop over all the contents of an array in javaScript would be to use a while loop, or any of the other loop options.

```js
var arr = [1, 2, 3],
sum = 0,
i = 0,
len = arr.length;
 
while (i < len) {
    sum += arr[i];
    i += 1;
}
console.log(sum); // 6
```

More than one way to skin a cat when it comes to while loops, and loops in general.

```js
var arr = [1, 2, 3],
sum = 0,
i = arr.length;
while (i--) {
    sum += arr[i];
}
console.log(sum); // 6
```

Loops are often more flexible then Array methods, for one think I can use the break and continue keywords as ways of breaking out of a loop when a condition is met, or spiking over values and additional blocks of logic along with it. A such when it comes to getting into things that involve a lot of heavy lifting they may prove to be a more efficient solution. However when it comes to simple things like this it does not make much difference.

## 4 - ForEach and Array like Objects

So in javaScript Arrays are a kind of object, but the typical situation is that an Array is a special kind of object that is formated in a way in which there are numbered key values with corresponding values. In addition to this there is a length property that reflects the number of these key value pairs, and there are a number of useful methods accessible via the Array prototype object. So an Array is not just an Object, it is an Object that is formated a certain way and is an instance of the Array constructor.

However often in javaScirpt I come across Objects that are formatted like an Array, but they are an instance of another kind of constructor. Sometimes the values of these objects might be read only, but even then it is possible to get a method like Array.froEach to work with these it just requires some trickery with Function.call, or Array.from.

An Example of an Array like object might look like this

```js
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// so this is just a plain object so it does not
// have the Array.prototype methods
console.log(obj.constructor.name); // 'Object'
console.log(obj.forEach); // undefined
```

So in this section I will be outlining some ways to loop over these kinds of objects.

The Array.from method is one way to go about converting one of these array like objects into an Array. Once that is done it is possible to use some Array prototype methods such as Array.forEach

### 4.1 - Array.from, and Array.forEach

The array from method is one way to go about creating an array from an array like object. I just pass the object to array from when calling it, the returned result is an instance of array to which I can then use the array for each method, or any array prototype method.

```js
var obj = {0:1, 1:2, 2:3, length: 3};
 
// Using Array.from can help change an array like
// object into an array
var arr = Array.from(obj);
console.log(arr.constructor.name); // 'Array'
 
// Now we have the methods
var sum = 0;
arr.forEach((n)=>{ sum += n; });
console.log(sum); // 6
```

### 4.2 - Function.call, and Array.forEach

Another trick is to leverage the power of Function.call. If you are not familiar with Function.call, Function.apply, and Function.bind it would be a good idea to look into them at some point. If any kind of object has properties that will work with a prototype method of another it can be done with these Function prototype methods.

```js
var obj = {0: 1,1: 2,2: 3,length: 3},
sum = 0;
Array.prototype.forEach.call(obj, (n) => {
    sum += n;
});
console.log(sum); // 6
```

## 5 - Named key Collections

Some times I am dealing with an object that is not an instance of an Array but it is a named collection of sorts. In these situations I need to loop over the contents of a collection of named keys and corresponding values rather than numbered ones.

### 5.1 - Object.values

The Object values method is one way to loop over the contents of an object in general. Assuming that all the key names that I want to loop over are public, and I do not care about anything that might be in the prototype chain.

```js
let obj = {
    foo: 1,
    bar: 2,
    foobar: 3
},
sum = 0;
Object.values(obj).forEach((n) => {
    sum += n;
});
console.log(sum); // 6
```

## 6 - Conclusion

The javaScript foreach method might work okay for quickly looping over an array, and it some cases it still works okay. Still I often find myself using other array methods, while loops, Promise.all, and many other similar tools. There is also trying to think for a moment if I even need a loop at all when it comes to using an expression rather than a loop when doing so will work.

It is true that the javaScript foreach method is not a magical one stop solution for looping over all the contents of an array. I see many developers writing posts in which they go on about how array foreach is the best solution for looping, and that everything else should not be used. I also often see chatter that while loops should always be used over for loops, and foreach because if used a certain way they are much faster. I am not interested in taking sides when it comes to these kinds of things, I like using array foreach now and then, but I also use map, filter, reduce, while loops and much more. 

Simply put I like to use different tools for the job, and also try to always pick the best choice depending on the situation. There is readability which I would say is of value, but of course the same is to be said  about performance. There is functional programing which is great, but there is also working with classes, state, and other ways of programing that are not necessary inherently inferior. There is trying to be perfect, and then there is just getting together a working proof of concept today rather than six months from now. So just pick a way to loop, and move on with your project, and your life.