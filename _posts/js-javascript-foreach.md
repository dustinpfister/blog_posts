---
title: JavaScript forEach with arrays and objects in general
date: 2019-02-16 10:39:00
tags: [js]
layout: post
categories: js
id: 384
updated: 2020-06-23 12:03:52
version: 1.45
---

In javaScript there is the [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method that is often used as a quick way to go about looping over the contents of an array. However there are other Array prototype methods that do the same thing, but might be a better choice depending on what you want to do with an Array. Some such methods are Array prototype methods like [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), that can be used to create a new array based off of each element value in an array that it is called off for example.Another array prototype method that comes to mind would be [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) that will, as the same suggests, filter out any elements that are not wanted in the array given a certain condition that is given in the body of a method. 

There are also plain old loops like while loops, and for loops that can also be used as a way to loop over all the contents of an array or just some of the elements. Loops often prove to do so a little faster, and they are also far more flexible when it it comes to an initial index value, how stepping of an index value will happen, and also continuing and breaking of the loop. For these reasons I often find myself using loops over the array forEach method, and often over many other prototype methods for that matter, but I would not necessary say that loops are the end all solution for looping over the contents of an array.
Then there are other objects in javaScript that are structured like arrays, but are not arrays, and thus are often referred to as array like objects. In addition there are just simply objects in general, that might have numbered index keys or named keys. So to help loop over these kinds of objects there are Object static methods like the Object.keys method, that can be used to create an array of key values that can then be used as a way to loop over the contents of any objects public keys. Another option would be a for in loop that can be used as ways to help loop over the public contents of Objects in general in javaScript.

So with all that said just when it comes to native javaScript alone there is a wealth of options when it comes to looping over the contents of an array, or object in general. However there is then getting into user space utility libraries and frameworks also on top of what is to work with in core javaScript alone. As of this writing lodash is still the most popular general utility library of sorts, and the [\_.forEach method](/2017/11/20/lodash_foreach/) works more or less the same way as the native Array.prototype.forEach method. However the lodash foreach has some additional  features, and is a little more robust of a solution for looping over not just arrays, but objects in general in javaScript. The lodash foreach method is what is called a collection method. In  other words it is a method that will work on objects in general, and also can be broken out of just like with loops combined with the use of the return keyword in the body of the method that is given to it. 

So there are native methods, utility library methods that are in popular frameworks like lodash, and then there is the idea of making your own custom solutions for the nature of the project. That is using any or all of these solutions to make some kind of methods of module that loops over the contents of a given array, but allows for a custom API to be provided on each loop, and has all the features that I want without any unnecessary bloat.

That was a mouth full, so it goes without saying that there is a whole lot to cover when it comes to looping over the contents of an array or object in general in javaScript. So this post will be a bit lengthy, and I will be sticking mainly to topics surrounding the native forEach array prototype method. It will not just be on the array foreach method alone of course, but all kinds of ways to do javaScript foreach like tasks with everything that is available to work with more or less. So I will be branching off into other related topics to array foreach when it comes to user space options and other options with just plain old native javaScript by itself.

<!-- more -->

## 1 - javaScript forEach and what to know before hand

The Array.forEach method in native javaScript is one of many ways to loop over the contents of a collection in javaScript. However Array.forEach is only generally useful for looping over the contents of an Array, unless some trickery with function call method is used with array like objects, or some processing is done before hand. However even it you can get it to work to loop over the contents of a collection it might not still always be the best solution when it comes to looping over named collections. 

Also simply put it might not always be the best choice for the job when it comes to looping over the contents of an array. There is not golden hammer as it where when it cones to looping over things. I tend to prefer the use of while loops, I have my reasons why that is, but I am not going to suggest that everyone should stop using array foreach and just use while loops and only while loops all the time everywhere and anywhere.

In any case there are many options when it comes to looping over collections that involve the use of a library like lodash, as well as other native javaScript solutions such as while loops. Some might be more readable, but performance takes a hit, others might be more flexible, but again performance takes a hit. While loops might be fast, but can be even faster depending on how and where they are used. Also regardless of how well coded some javaScript might be with regards to performance the real bottom line in my view is what an over all project does and if it is of any value to people regardless if it is well coded or poorly coded.

### 1.2 - ECMA rev5 compliant methods and Array forEach backward support

As time goes by it is becoming less, and less of an issue to worry about code breaking on clients when delivering modern javaScript exclusively when working out some kind of client system. Still depending on your websites analytics with browser versions, it might still be better to stick to a tired yet true way of doing things with client side javaScript.

Sticking to an older javaScript spec will help to assure that what it is that you are making will work on a larger range of clients. The javaScript array foreach method is an ECMA rev5 spec javaScript feature, so using it without any polyfill of sorts is fairly safe these days. However if for some reason you do want to push backward support back even farther there are of course other options that are yet even older and safer. Again I do tend to like sticking to while loops, but not just for this reason.

In any case taking a moment to understand browser support for an native or user space option for looping over the contents of a collection is an essential part of making smart informed decisions in these matters. The array for each method is a good choice in this regard, however a while loop would of course be and even better option.

## 2 - javaScript forEach and other basic examples of similar array prototype methods

So there is the Array forEach method, but there are other array prototype methods like map, filter and reduce. In this section I will be going over some quick examples of these array prototype method options.

### 2.1 - First off javaScripts forEach array prototype method

So a basic example of Array.forEach might just involve using it to loop over the contents if an array of numbers and add up the numbers in the array to a sum variable. So such an example might look something like this then.

```js
var arr = [1, 2, 3],
sum = 0;
arr.forEach(function(n){
    sum += n;
});
console.log(sum); // 6
```

Although this might work just fine with such a trivial task, there are many other ways to go about doing a simple sum of numbers in an array. The reduce method might prove to be a more appropriate way of going about doing so actually for example. There are of course more options to work with in the array prototype other than just the array for each method after all.

Also In real projects what might need to happen for each element in an array might end up being far more complex than just adding up each number in the array. There might come a time where I might not want to start at index 0 each time, or I might want to do something with each array index and so forth. Once again these are reasons while I tend to prefer while loops, however I do fine myself using these convenience methods now and then. So lets look as some more basic examples that are written differently, but do more or less the same thing for now before moving on to so more advanced examples.

### 2.2 - Array.reduce

When it comes to doing anything that might involve a sum of any kind, it might be better to use Array.reduce in place of Array.forEach. 


```js
let arr = [1, 2, 3],
sum = arr.reduce((s,r)=>{return s+r;});
console.log(sum); // 6

```

This is one of many other Array prototype methods that work in a very similar way to that of Array.forEach, but behave a little differently. For one thing the Array.reduce method does not start looping at index 0, but rather index 1. the reason why is that the first element at index 0 is the initial value of an accumulator argument that is the first argument that is given to the function that is passed to Array.reduce. So in this example the value of s starts out as 1 and the value of r is 2, then on the next call the value of s is 3 and the value of r is 3 making the final value that is reduced to 6;

### 2.3 - Array.map

Another way to loop over elements in an array is to use Array.map. This method works more or less the same way as Array.forEach but with one significant difference. That difference is that whatever is returned in the method that is given as an argument this time will become that element in the array. Actually the new element will be in a new copy of the array that can then be reassigned to the array or not. So in a way the array map method is in line with functional programing in the sense that the array that that the prototype method is called off is not mutated in place.

```js
var arr = [1, 2, 3],
sum = 0;
 
arr = arr.map((n)=>{sum+=n;return Math.pow(2,n);});
 
console.log(sum); // 6
console.log(arr); // [2,4,8]
```

### 2.4 - Array filter

Let another alternative array prototype method to the foreach method is the filter method. As the name would suggest this can be used to filter out elements from an array that are not wanted. 

```js
let arr = [7, 'foo', 13, 'bar', false, -15, null, NaN, 120, 20];
 
arr = arr.filter((el) => {
        return typeof el === 'number' && String(el) != 'NaN' && el >= 0 && el <= 100;
    });
 
console.log(arr);
// [ 7, 13, 20 ]
```

### 2.5 - Array some

There are also methods like array some, and array every that can be used to create and return a boolean value for an array depending on the condition returned in the method given. Say you want to test if just one element in an array meets a given condition for that there is the array some method. In addition there is the array every method that will return true if all elements in the array meet a given condition.

```js
var a = [1, 2, '3', 4],
b = [1, 2, 3, 4];
 
var test = function (el) {
    return typeof el === 'string';
};
 
console.log(a.some(test)); // true
console.log(b.some(test)); // false
```

## 3 - While loops as a javaScript for each solution.

Another way to loop over all the contents of an array in javaScript would be to use a while loop. While loops have many advantages compared to the array forEach method or any other such method like array map. For example different expressions can be used to step an index variable that is used to get an element in an array. So then I can just loop over every other element in an array rather than all of them if I want. In addition keywords such as break and continue can be used to skip things completely which can come in handy how and then. Another thing about loops is that I am not defining logic in a method so I can use the return keyword in the body of the logic in the while loop if it is in the body of a function. Yet another advantage is that while loops can often prove to be a little faster then array for each when it comes to benchmark testing.

### 3.1 - The basic while loop example

So the a basic example of a while loop could just be using an index variable that is set at zero for starters. Then I check if the index variable is greater than the length of the array as the condition for the while loop. Inside the body of the while loop I will want to step the index variable or else I will end up with an infinite loop. I can then use the bracket syntax inside the body of the while loop to get the current element of the array by using the index value as the value to use with the bracket syntax of the array.

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

Simple enough right, but lets look at some more examples of while loops in action as a way to preform javaScript for each like tasks on arrays and objects in general.

### 3.2 - Looping backwards from the end of an array

There is of course more than one way to skin a cat when it comes to while loops, and loops in general. What is great about loops is that I have control over the conditions for how to go about breaking the loop, how to go about stepping an index value, and also how to start looping in the first place. For example I can just start off the index variable at the end of an array, and loop backwards. Also because the number zero evaluates to false I can also have the index variable double as a way to break the loop.

```js
var arr = [1, 2, 3],
sum = 0,
i = arr.length;
while (i--) {
    sum += arr[i];
}
console.log(sum); // 6
```

## 4 - Array like objects, the Function call prototype method, and array for each.

So in javaScript Arrays are a kind of object that is formated in a way in which there are numbered key values with corresponding values. In addition to this there is a length property that reflects the number of these key value pairs, and there are a number of useful methods accessible via the Array prototype object. So an Array is not just an Object, it is an Object that is formated a certain way and is an instance of the Array constructor.

However often in javaScirpt I come across Objects that are formatted like an Array, but they are an instance of another kind of constructor. these kinds of objects have key value pairs where each key name is a number rather than a named key, and there is a length property that reflects the number of these key value pairs. Sometimes the values of these objects might be read only, but even then it is possible to get a method like Array.froEach to work with these it just requires some trickery with Function.call, or Array.from.

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