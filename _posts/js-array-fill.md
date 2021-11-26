---
title: Array fill native and not in javaScript
date: 2020-04-23 15:26:00
tags: [js]
layout: post
categories: js
id: 650
updated: 2021-11-26 11:33:58
version: 1.28
---

In some cases I might want to just simply fill all element index values in an array with a set static value. For example I might want to start off an array of numbers to a starting value of zero for each element. However the idea of filling an array with values might have more than one meaning other than just that. For example I might want to start off an array with a range of numbers starting with 1 going up from there to the length of the array, and then use this kind of array with another method such as the a map method to create a final array with desired values. So then there is filling an array with static values, and then there is filling an array with values that are the result of some kind of pattern, or process such as a random process.

When it comes to filling an array with a fixed static value these days there is now a native [array fill method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) in the core [javaScript array](/2018/12/10/js-array/) prototype object. This array fill method is then just yet another useful [array prototype method](/2018/12/10/js-array/) long with other such methods such as [array map](/2020/06/16/js-array-map/), [reduce](/2021/07/13/js-array-reduce/), and [for each](/2019/02/16/js-javascript-foreach/) methods. Unless you care a great deal about backward compatibility the native array fill method works just fine, else one may have to use a Polly fill method of some kind or another in order to get the method to work on a wider range of platforms. 

When it comes to using lodash there is the [lodash fill](/2017/09/26/lodash_fill/) method that works more or less the same way as the native array fill method. When it comes to creating an array filled with a set of numbers that go up my a fixed delta value from a starting point upward there is also a [lodash range](/2018/10/02/lodash_range/) method that can be used to create that kind of array real quick. However in this post I will be sticking to just using javaScript alone as a way to create custom solutions for these sort of things. With that said there is the idea of making a kind of custom user space fill library.

<!-- more -->

## 1 - The basics of filling an array in javaScript

In this section I will be starting out with some basic examples that have to do with filling an array with a static value, or creating a new array with starting values. These examples will be fairly simple, but I do still assume that you have at least enough experience with javaScript to know how to make use of these examples in an environment of one kind or another. If not you might want to take a step back and look into how to [get started with javaScript in general](/2018/11/27/js-getting-started/).

### Source code examples are n Github

If you do not have a Github account, and have not yet looked into source control, you might want to take a moment to look into that at some point. On Github I have my test vjs repository that contains every source code example for [every post that I have written on javaScript in general](/categories/js) thus far. This post is no exception and as such the examples in this section as well as the rest of the post can be found there in the [folder that corresponds to this post](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-array-fill).

### 1.1 - The Basic array fill native array prototype method

When it comes to using the modern native array fill method, one can just call it off of an array instance and pass what you want the array to be filled with as the first argument.

```js

var byt = new Array(8).fill(1);
console.log(byt.join('')); // '11111111'
```

If you do not care about supporting older browser that do not support this method, and you do nit need or what some kind of method that will create the array to begin with then this will work just fine. However maybe there are still some additional taking points when it comes to filling an array with something. If you are not familiar with many of the other array prototype methods like map, then that might actually be what you want when it comes to filling an array with something other than just the same value for all elements, or elements in a certain index range. So with that said lets look at some more examples of filling an array in javaScript.

## 2 - Using Function.Apply, and Array.map

If you are not familiar with the [call, apply, and bind prototype methods](/2017/09/21/js-call-apply-and-bind/) of a Function in javaScript then you should take a moment to look into those methods when you get a chance. These methods allow for a developer to set what the value of the this keyword should be inside the body of a prototype method. With that said there is a lot to write about when it comes to this methods and the various ways that they can be used with built in as well as user space methods of class instances. However when it comes to the subject of filling an array, or creating a new array with a fixed value set for each element the apply method is one tick that can be used to do so.

```js
// fill an array
var fill = function (count, val) {
    return Array.apply(0, {
        length: count
    }).map(function () {
        return val
    })
};
 
var newByt = function () {
    return fill(8, 1);
};
 
var b = newByt();
 
b[0] = 0;
b[7] = 0;
 
console.log(b.join('')); // '01111110'
```


### 2.1 - Fill with chars

With this example I am filling an array with the same string pattern over and over again once again using the Function apply prototype trick to do so. There are a number of other options in modern javaScript for doing this sort of thing such as sing the array from method for example. However what is nice about apply is that it has been around longer, and will still work jusy as well for this sort of thing.

```js
var newFilledWithChars = function (count, str) {
    return Array.apply(null, {
        length: count
    }).map(function (e, i) {
        ci = i % str.length;
        return str[ci];
    });
};
 
var arr = newFilledWithChars(10, 'abc');
 
console.log(arr.join('')); // 'abcabcabca'
```

## 3 - Using just a while loop and the Array literal syntax

If you want to push backward compatibility as far back as you can possible go, then you might want to work out some kind of solution that just involves a while loop and just the plain old array bracket syntax. What is also great about this kind of approach is that I avoid the problems associated with using the Array constructor with a method such as map that will skip over undefined key index values of an array. I can just have a starting index value as well as an index value start at the starting index value and loop forward setting each index to a fixed static value, or any value that I want that follows a desired pattern to which I want to fill the array.

### 3.1 - Simple new filled array method example using a while loop

One way to start out with this is to maybe start with a simple function that will create and return a new array with a given length filled with a given value for each element. So then I just create a function in which I pass a length and value argument and use that length value as a way to find out if a current index value is below the length or not in order to know if looping should stop or not. Another option would be to start the index value off at the given length around and loop backwards which is what I decided to go with for this example. I can then just use the array bracket syntax and the assignment operator to set each value for the array to the desired static value to fill the array with.

```js
var newFilled = function (len, val) {
    var i = len,
    arr = []; ;
    while (i--) {
        arr[i] = val;
    }
    return arr;
};
 
var byt = newFilled(8, 0);
byt[0] = 1;
console.log(byt.join('')); // '10000000'
```


### 3.2 - Fill just an index range of an array made before hand

I can also use while loops as a way to create a function that will just fill a given index range with a given value. That is to have a function that will not create and return a new array filled with a value but to fill a value for a given starting index value to and ending index value for an array that all ready exists with elements.

```js
// fill range method
var fillRange = function (arr, val, si, ei) {
    val = val === undefined ? 0 : val;
    si = si === undefined ? 0 : si;
    ei = ei === undefined ? arr.length : ei;
    var i = si;
    while (i < ei) {
        arr[i] = val;
        i += 1;
    }
    return arr;
};
// working okay
var a = [1, 7, 8, 8, 2, 3, 1];
fillRange(a, 'a', 1, 3);
console.log(a); // [ 1, 'a', 'a', 8, 2, 3, 1 ]
```

### 3.3 - New range array example using a while loop

```js
// range method
var range = function (len, nStart, nDelta) {
    len = len || 0;
    nStart = nStart || 0;
    nDelta = nDelta === undefined ? 1 : nDelta;
    var arr = [],
    i = 0;
    while (i < len) {
        arr[i] = nStart + nDelta * i;
        i += 1;
    }
    return arr;
};
// demos
console.log( range(10) );       // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log( range(10, -5));    // [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4 ]
console.log( range(10, 5, -1)); // [ 5, 4, 3, 2, 1, 0, -1, -2, -3, -4 ]
```

### 3.4 - Fill with random numbers while loop example

```js
// range method
var filledRandom = function (len, min, max, roundFunc) {
    len = len || 0;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    roundFunc = roundFunc || Math.round;
    var arr = [],
    i = 0;
    while (i < len) {
        arr[i] = roundFunc(min + (max - min) * Math.random());
        i += 1;
    }
    return arr;
};
// examples
console.log( filledRandom(8) );        // [ 0, 0, 1, 0, 1, 0, 1, 0 ]
console.log( filledRandom(8, -5, 5) ); // [ 4, 1, -3, 2, 4, -4, 2, 4 ]
console.log( filledRandom(8, 0, 10, (n)=>{ return parseFloat(n.toFixed(2));}) );
// [ 6.8, 5.55, 8.1, 1.94, 5.62, 3.32, 4.67, 0.11 ]
```

## 4 - String Split

Do not forget about all the prototype methods in a String that there are to play with such as String.split. That kind of method can come in handy when it comes to creating a new Array filled with something from a string.

```js
var arr = '00000000'.split('');
 
arr[5] = 1;
arr[7] = 1;
 
console.log(arr.join('')); // '00000101'
```

## 5 - Fill with an object

When it comes to filling an array with an object you might run into problems that have to do with references to the same object rather than creating an array of objects. You see if you just pass an object to a method like array fill then you will end up with an array filled up with references to that same single object. In most cases when doing something like that chances are you would want an array of objects with the same starting values, not a bunch of references to the same object.
So to help with this one way or another it would be a good idea to find a way to go about cloning an object. In this example I am using the clone object trick that involves using the JSON parse method to parse a JSON string that was just created with the JSON strigify method. This might not be the best way to go about cloning an object in a situations, and getting into the details as to why and with cloning with objects in general is a matter for a whole other post. However for the sake of tha matter at hand here and now all I need is a way to create an independent new object from an object.

Now that I have a clone method I can then use the clone method in the body of a method that I am using with array map to map new objects with the same starting values for each element in an array. The result is an array of independent objects with the same starting values as the object that I filled with.

```js
var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
 
var fillWithClonedObject = function (obj) {
    return Array.apply(null, {
        length: 3
    }).map(function () {
        return clone(obj);
    });
};
 
var arr = fillWithClonedObject({
        x: 4,
        y: 7
    });
 
arr[1].x = 0;
console.log(arr);
// [ { x: 4, y: 7 }, { x: 0, y: 7 }, { x: 4, y: 7 } ]
```



## 6 - Conclusion

The native array fill prototype method can be used to quickly fill an array with a single value for each element. However there are other options that might be a better for this sort of task depending on the situation. Or maybe the array fill method is just want needs to be used for starters so that it ca then be used with another method like Array.map. However when it just simple comes to just filling an array with a certain static value then the array fill method does the trick just fine.