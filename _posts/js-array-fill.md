---
title: Array fill native and not in javaScript
date: 2020-04-23 15:26:00
tags: [js]
layout: post
categories: js
id: 650
updated: 2021-07-19 16:20:20
version: 1.11
---

These days there is now a native [array fill method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) in the core [javaScript array](/2018/12/10/js-array/) prototype object. Unless you care a great deal about backward compatibility the native array fill method works just fine, else one may have to use a Polly fill method of some kind or another in order to get the method to work on a wider range of platforms. When it comes to using lodash there is the [lodash fill](/2017/09/26/lodash_fill/) method that works more or less the same way. Also sometimes filling an array with something might mean something other than just filling it with the same value for each index, so lets look at some examples of filling an array with data in javascript and not just some simple examples of the native array fill method.

<!-- more -->

## 1 - The Basic array fill native array prototype method

When it comes to using the modern native array fill method, one can just call it off of an array instance and pass what you want the array to be filled with as the first argument.

```js

var byt = new Array(8).fill(1);
console.log(byt.join('')); // '11111111'
```

If you do not care about supporting older browser that do not support this method, and you do nit need or what some kind of method that will create the array to begin with then this will work just fine. However maybe there are still some additional taking points when it comes to filling an array with something. If you are not familiar with many of the other array prototype methods like map, then that might actually be what you want when it comes to filling an array with something other than just the same value for all elements, or elements in a certain index range.

So with that said lets look at some more examples of filling an array in javaScript.

## 2 - Using Function.Apply, and Array.map

If you are not familiar with the call, apply, and bind prototype methods of a Function in javaScript then you should take a moment to look into those methods when you get a chance.

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

With this example I am filling an array with the same string pattern over and over again.

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

If you want to push backward compatibility as far back as you can possible go, the you might want to work out some kind of solution that just involves a while loop and just the plain old array bracket syntax.

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

If this does not work in the target environment of interest then it is way to old, even for me.

## 4 - String Split

Do not forget about all the prototype methods in a String that there are to play with such as String.split. That kind of method can come in handy when it comes to creating a new Array filled with something from a string.

```js
var arr = '00000000'.split('');
 
arr[5] = 1;
arr[7] = 1;
 
console.log(arr.join('')); // '00000101'
```

## 5 - fill with an object

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