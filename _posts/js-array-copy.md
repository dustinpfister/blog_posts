---
title: js array copy methods both new and old
date: 2020-09-03 12:42:00
tags: [js]
layout: post
categories: js
id: 700
updated: 2021-07-19 16:15:03
version: 1.16
---

So now and then, when working with [arrays](/2018/12/10/js-array/), a javaScript developer might find themselves in a situation in which they will want to [copy and array](https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array/). If you are new to javaScript you might have just simply assigned an array from one variable to another variable and assumed that that would do the tick, as that is the case with numbers and strings after all. However that will of course not work with arrays, and objects in general actually in javaScript because just simply assigning an object to another variable will just create a new reference to the same array or object.

So to copy an array one of several tricks for doing so will need to be used to do so that will result in a while new array being created that will contain the same values. However talking about values, if the values themselves are nested objects then they do might needed to be coped also if a full copy of the state of the array is desired. So in this post I will be taking a look at a few ways to copy an array in javaScript with both old and new ways of doing so when it comes to what there is to work with in late javaScript specs.

<!-- more -->

## 1 - js array copy basics and shallow copying of arrays

In this section I will be touching base on the problem that many new javaScript developers might run into when trying to copy an array for the first time. In addition I will be going over a few solutions that will work okay as long as we are talking about an array of primitive values like numbers, and strings. Things can get a little involved when it comes to copying an array of nested objects, so that I will be getting to in a later section.

### 1.1 - The Problem with using assignment

When trying to copy an array for the first time many new developers might just try to assign an array value from one variable to another. The expectation might be that arrays can be copied in the same way as one might have grown accustomed to when it comes to primitive values like numbers and strings. However when trying to copy an array like this all that is happening is that the developer is creating a new reference to the same array, and not copying, or cloning if you prefer, a new array.

```js
// and array of numbers
var a = [1, 2, 3, 4],
// just assigning a to b will just create a new
// reference to the same array
b = a;
 
// so then a change to a will effect b
a[0] = 'a';
console.log(b.join());
// a,2,3,4
```

So then a salutation to this would be finding a way to preform what is often called a shallow clone, or a deep clone in the event of an array of arrays, or any amount of nested objects that would also need to be copied. For starters lets look at at some ways to create a shallow clone that will work fine when it comes to a simple array of primitive values such as in this above example.

### 1.2 - Just create a new array and add the elements from the source array

Just get it done any way possible and move on right? Sure thing with that said one way to go about copying an array is to just create a new array, and just loop over the contents of the source array and add each of the source array elements into the new array.

```js
var a = [1, 2, 3, 4],
// just make a new array
b = new Array();
// and add all the elements from the source array
a.forEach(function (n, i) {
    b[i] = n;
});
a[0] = 'a';
console.log(a.join());
// 'a,2,3,4'
console.log(b.join());
// '1,2,3,4'
```

This crude yet effective way of copying an array will work just fine with arrays with primitive values. However mayeb it would still be a good idea to look into some additional options for marking a shallow copy of an array.

### 1.3 - Using the array slice method

One way to create a [shallow clone or copy of an array would be to use the array slice method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) which will return a new array, with elements between a starting and ending index. If I give the value of zero for the first argument to array slice, and the length of the array as the second argument that should return a new array with all the values from the original source array.

```js
var a = [1, 2, 3, 4],
b = a.slice(0, a.length);
a[0] = 'a';
console.log(a.join());
// 'a,2,3,4'
console.log(b.join());
// '1,2,3,4'
```

### 1.4 - Array.from

In some cases I see people recommending the [Array.from](/2020/01/27/js-array-from/) method as a way to make a copy of an array. This will work okay as yet another option for just making shallow copies of an array. That is it will work with an array of numbers, strings, booleans and so forth. However once again this will fall short when it comes to making a deep copy when it comes to nested objects as elements in the array that is to be copied.

```js
// Array.from will work fine if making a shallow clone
var a = [1,2,3,4],
b = Array.from(a);
 
a[0] = 'a';
console.log(a);
// [ 'a', 2, 3, 4 ]
console.log(b);
// [ 1, 2, 3, 4 ]
 
// Array.from is only good for making a shallow copy
a = [{x:40},{x:50},{x:60}];
b = Array.from(a);
a[0].x = 0;
console.log(a);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
console.log(b);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
```

### 1.5 - Object.assign

The Object.assign method will come up a lot in discussions, it to is anther optiosn for makig a shallow clone of an array.

```js
// Object.assign  will work fine if making a shallow clone
let a = [1,2,3,4],
b = Object.assign([], a);
 
a[0] = 'a';
console.log(a);
// [ 'a', 2, 3, 4 ]
console.log(b);
// [ 1, 2, 3, 4 ]
 
// However Object.assign will not work well for making a deep clone
a = [{x:40},{x:50},{x:60}];
b = Object.assign([], a);
a[0].x = 0;
console.log(a);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
console.log(b);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
```

### 1.6 - The Spread syntax

A new javaScript feature in late javaScript specs is the spread operator syntax. This is yet another way to make a shallow copy of an array.

```js
// Spread syntax (...)  will work fine if making a shallow clone
let a = [1,2,3,4],
b = [...a];

a[0] = 'a';
console.log(a);
// [ 'a', 2, 3, 4 ]
console.log(b);
// [ 1, 2, 3, 4 ]
 
// However the Spread syntax (...)  will not work well for making a deep clone
a = [{x:40},{x:50},{x:60}];
b = [...a];
a[0].x = 0;
console.log(a);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
console.log(b);
// [ { x: 0 }, { x: 50 }, { x: 60 } ]
```

## 2 - Nested Objects

Now that I have covered how to make a shallow copy of an array in javaScript lets get into some examples that involve not just copying an array, but the nested objects of the array also.

### 2.1 The problem with using slice or any shallow clone method with nested objects in arrays

THe problem with using the array slice method, or any shallow clone method with an aray of objects is that doing so will create a new array rather than just a reference to the same array, but it will not do anything with additional references that are elements of the array.

So if I have an array of objects rather than just a simple array of numbers, and I use something like array slice to copy the array. It will create a new array, but it will still be the same references to the same objects when it comes to the arrays contents.

```js
var a = [{
        i: 1
    }, {
        i: 2
    }, {
        i: 3
    }, {
        i: 4
    }
];
 
// so using slice will create a new array
var b = a.slice(0, a.length);
 
// but it will not copy the nested objects
// just like before they are references to the same objects
a[0].i = 42;
 
console.log(b[0]); // 42
```

This is where it becomes necessary to do something that can be called deep cloning of an object or array. In these situations I often do not just want to copy the array itself, but also make copies of any and all nested objects in the array that are part of the arrays contents.

### 2.2 - Using map to create a new array, and objects

If I am dealing with an array of objects, and each array is just a shallow object that does not have any additional nested objects in each element, then it would not be to hard to just use something like the array map method. I could call the map method off of the source array, and then return a new object in the body of the method that I pass to array map. Like the array slice method the array mao will return a new array rather than mutating an array in place. On top of that I can returned whole new objects when it comes to defining the produce that is return for each element in the source array.

```js
var a = [{
        i: 1
    }, {
        i: 2
    }, {
        i: 3
    }, {
        i: 4
    }
];
 
// like slice array map will also return
// a new array rather than mutating the
// array it is called off of
var b = a.map(function (obj) {
        // returning a new Object
        // for each element
        return {
            i: Math.pow(obj.i, 2)
        }
    });
// so now we have two arrays, and with two
// independent sets of objects
console.log(a[3].i); // 4
console.log(b[3].i); // 16
```

The result is not just a new array, but new objects for each element also, not just references.

### 2.3 - Using JSON to Deep clone

Another crude yet effective deep clone trick is to use JSON.stringify to convert a whole object such as an array as well as all nested objects into a JSON string. Then I can just use the JSON.parse method to parse that string back into a workable object. In most cases this will work when dealing with plain old objects like this, and it will even work as a deep clone method for many levels of nested objects also.

```js
var a = [{
        pos: {
            x: 0,
            y: 0
        },
        hp: {
            current: 10,
            max: 100
        }
    }, {
        pos: {
            x: 45,
            y: 7
        },
        hp: {
            current: 100,
            max: 100
        }
    }
];
 
b = JSON.parse(JSON.stringify(a));
b[1].pos.y = 80;
b[1].hp.current = 0;
b[1].hp.max = 50;
b[1].hp.hpps = 10;
 
console.log(a[1]);
/*
{
    pos: {
        x: 45,
        y: 7
    },
    hp: {
        current: 100,
        max: 100
    }
}
*/
console.log(b[1]);
/*
{
    pos: {
        x: 45,
        y: 80
    },
    hp: {
        current: 0,
        max: 50,
        hpps: 10
    }
}
*/
```

## 3 - Conclusion

So this was just a quick post on how to go about copying an array in javaScript. However because arrays are a kind of object some of these methods can be used to copy, or clone objects in general. I have wrote posts a while back on the [lodash clone](/2017/10/02/lodash_clone) and [lodash clone deep](/2017/11/13/lodash_clonedeep/) methods, as well as cloning in general that might be worth checkout otu when it comes to reading more about cloning arrays and objects in general for that matter.