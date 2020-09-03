---
title: js array copy methods both new and old
date: 2020-09-03 12:42:00
tags: [js]
layout: post
categories: js
id: 700
updated: 2020-09-03 13:18:24
version: 1.1
---

So now and then a javaScript developer might find themselves in a situation in which they will want to [copy and array](https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array/). If you are new to javaScript you might have just simply assigned an array from one variable to another variable and assumed that that would do the tick, as that is the case with numbers and strings after all. However that will of course not work with arrays, and objects in general actually in javaScript because just simply assigning an object to another variable will just create a new reference to the same array or object.

So to copy an array one of several tricks for doing so will need to be used to do so that will result in a while new array being created that will contain the same values. However talking about values, if the values themselves are nested objects then they do might needed to be coped also if a full copy of the state of the array is desired. So in this post I will be taking a look at a few ways to copy an array in javaScript with both old and new ways of doing so when it comes to what there is to work with in late javaScript specs.

<!-- more -->

## 1 - js array copy basics

### 1.1 - The Problem with using assignment

```js
// and array of numbers
var a = [1, 2, 3, 4],
// just assigning a to b will just create a new
// refernce to the same array
b = a;
 
// so then a change to a will effect b
a[0] = 'a';
console.log(b.join());
// a,2,3,4
```

### 1.2 - Using the array slice method

```js
var a = [1, 2, 3, 4],
b = a.slice(0, a.length);
a[0] = 'a';
console.log(a.join());
// 'a,2,3,4'
console.log(b.join());
// '1,2,3,4'
```

## 2 - Nested Objects

### 2.1 The problem with using slice or any shallow clone method

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

### 2.2 - Using map to create a new array, and objects

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

### 2.3 - Using JSON to Deep clone

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

So this was just a quick post on how to go about copying an array in javaScript. However because arrays are a kind of object some of these methods can be used to copy, or clone objects in general.