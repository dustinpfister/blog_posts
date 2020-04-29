---
title: Array fill native and not in javaScript
date: 2020-04-23 15:26:00
tags: [js]
layout: post
categories: js
id: 650
updated: 2020-04-29 19:28:59
version: 1.8
---

These days there is not a native [array fill prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill), and unless you care a great deal about backward compatibility the native array fill method works just fine. Unless you do want to use a pony fill method of area fill because you want to make sure what you are making will work on a wider range of platforms then you might want to use something else. Also sometimes filling an array with something might mean something other than just filling it with the same value for each index. So lets look at some examples of filling an array with data.

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

## 5 - Fill with chars

Then there is filling an array with the same string pattern over and over again.

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
 
console.log(arr.join('')); // 'abcabca'
```

## 6 - Conclusion

The native array fill prototype method can be used to quickly fill an array with a single value for each element. However there are other options that might be a better for depending on the situation.