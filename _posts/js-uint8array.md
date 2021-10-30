---
title: Uint8arrays in javaScript
date: 2020-04-02 13:03:00
tags: [js]
layout: post
categories: js
id: 640
updated: 2021-10-30 13:34:44
version: 1.27
---

In javaScript there are a number of constructors that provide [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), one such constructor is the [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) constructor. These kinds of constructors create index collections similar to that of a regular javaScript array, only they are a little different when it comes to the values that can be held in them.

For starters the length of the collections is static, and the values that the collections can hold is restricted to number values. On top of that the number values are also restricted depending on the kind of typed array, for example a uint8 array is restricted to a one byte number range between 0 and 255. So these typed arrays are not a replacement for regular javScript arrays that do not have these restrictions and can hold any kind of value, but typed arrays still come in handy when working with binary data.

So then typed arrays are helpful when working out something that is an underlaying binary data buffer value of some kind for one thing, and more often then not that is what they are used for. The reason why is because of the fixed size, and the fact that values are restricted to numbers only, and on top of that additional rules for the integers, or float values depending on the kind of typed array that is used. 

There is also both clamped, and un-clamped versions for many of these typed arrays that has to do with what happens when a value goes out of the number range. There is clamping a value so that a value higher then 255 end up being 255, and a value below 0 will be 0. Then there is warping, or in other words allowing for a value to wrap around and work out to what is left when dividing.

So there is a bit to cover when it comes to a uint8 array, and typed arrays in general. In this post I will be looking mainly at the Uint8Array constructor, but much of what is written here can be applied to other type array constructors.

<!-- more -->

## 1 - The Uint8Array basics

For starters there is juts knowing [how to create and use a Uinit8Array](https://stackoverflow.com/questions/38718202/how-to-use-uint8array-uint16array-uin32array) with the constructor, and static methods that can be used to do so. It is also worth mentioning some additional basics with these kinds of arrays. So in this section I will just be starting out with a few quick basic examples of this kind of array constructor in javaScript.

The general basic idea to keep in mind with these arrays is that they are restricted to just one type that is Numbers, and the range for the numbers is restricted to the value range of one byte, this the name of unit8. I will be keeping these examples fairly simple of course but I assume that you have at least some experience when  it comes to [getting started with javaScript](/2018/11/27/js-getting-started/).

### 1.1 - Playing with the Uint8Array constructor for the first time

To create a Uint8Array call the constructor with the new keyword, and pass an argument that will be the number of elements for the array, just like with the usual plain javaScript array Constructor. Once there is an instance of this kind of typed array, I can then set byte values for it by using the bracket syntax just like that of a regular array. When setting a value to it that is a number values will be converted to a number range between 0 and 255.

```js
var arr = new Uint8Array(3);

arr[0] = 128;
arr[1] = -1;
arr[2] = 199.75;
 
console.log(arr[0], arr[1], arr[2]); // 128 255 199
```

### 1.2 - Clamped and not Clamped

There is a [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) constructor on top of the plain Uint8Array constructor. The only difference between the Uint8ClampedArray and the plain Uint8Array constructor is that values are clamped rather then warped when they go out of range.

For example is I set an element value to 258 with a regular Uint8Array the resulting value will end up being 2. The reason why is that the values for a Uint8Array are wrapped rather than clamped, and the numbers are zero relative. So then the numbers go 255, 0, 1, 2 when we are wrapping rather than clamping. With a Clamped array the resulting value will just be clamped at 255 the highest value for a Uint8Array.

```js
var clamped = new Uint8ClampedArray(3),
notClamped = new Uint8Array(3);
 
clamped[0] = 258;
notClamped[0] = 258;
 
console.log(clamped[0]); // 255
console.log(notClamped[0]); // 2
```

So in some situations it would be better to go with clamped rather than wrapped arrays, but there is also juts making sure that things do not go out of range to begin with.

### 1.3 - The Uint8.from static method

Most clients will support the typed array from method that works in a similar way tot hat of the [Array from](/2020/01/27/js-array-from/) method. That is it is a static method of the Uint8Array constructor or any type array constructor that can be used to create a new typed array from a regular array like object.

```js
let arr = ['foo','255','128', 64, null, false, NaN],
uint8 = Uint8Array.from(arr);
 
console.log(uint8); // [0,255,128,64,0,0,0]
```

### 1.4 - The of static method

The of method is yet another way to go about creating an instance of this kind of typed array, but it is how to go about making one by way of function arguments rather than passing an array.

```js
uint8 = Uint8Array.of(255, 128, 0, 128, 155);
console.log(uint8.join(','));
// 255,128,0,128,155
```

### 1.5 - The byte and element length

When it comes to the [array length](/2018/12/14/js-array-length/) property in regular javaScript arrays there is a lot to look out for such as the fact that regular javaScript arrays a sparse, and that any element can be of any type including another array, or object in general. However these issues are not so much a problem when it comes to types arrays. All the elements are numbers, only numbers, and nothing else but numbers. Also I do not have to worry about a typed array being spare as all the elements will have some kind of default value for each integer value of the array.

However that is not to say that there are not still things to be mindful about when it comes to the element length, and the byte length of these kinds of arrays. If it is a uinit8 array, then for the most part the element length should be the same as the byte length. Unless of course there is some weird reason why that would not be the case when it comes to uinit8 arrays, however when it comes to other typed arrays such as 16 unit arrays there is a clear reason why I would want to maybe ave some kind of byte length property on top of just the length property.

```js
// uinit8 and byteLength compared to length
var uint8 = Uint8Array.of(255, 128, 0, 128, 155);
console.log(uint8.length);     // 5
console.log(uint8.byteLength); // 5
 
// uint16 and byteLength compared to length
var uint16 = Uint16Array.of(255, 128, 0, 128, 155);
console.log(uint16.length);     // 5
console.log(uint16.byteLength); // 10
```

### 2 - Instance methods

Just like with regular [javaScript arrays](/2018/12/10/js-array/) there are a number of instance methods to use with an instance of a typed array such as a Uinit8Array. There might not be a direct equivalent for each method mind you, but many of them are there.

### 2.1 - The Uint8Array map method

One method that I use all the time in the array prototype would be the array map method, and with that said a map method that works more or less the same way can also be used in the type array prototype. Of course the return value of the typed array map method is that it will return a new typed array, rather than a regular javaScript array. However aside from just a few simple differences between the map method of a typed array works more or less the same way as the map method in the array prototype. I just call the ma method off of the typed array, and then pass the function that I want to use that will figure the new integer values for each number value in the new typed array that will be returned.

```js
let byts = Uint8Array.of(128, 32, 220, 8);
 
let invert = byts.map((byt) => {
        return byt + 128;
    });
 
console.log(invert);
```

### 2.2 - Filter method

```js
let a = Uint8Array.of(128, 32, 220, 8);
let b = a.filter((byt) => {
        return byt >= 128;
    });
console.log(b.join('-')); // '128-220'
```

### 2.3 - Join elements together into a string

```js
let a = Uint8Array.of(128, 0, 255);
console.log(a.join()); // '128,220'
console.log(a.join('-')); // '128-220'
console.log(a.join('')); // '128220'
```

## 3 - Some examples on hash code methods, or at least trying to make such methods

### 3.1 - First From string method

```js
let stepCountsForChar = (counts, ci, ch) => {
    var n = typeof ch === 'string' ? ch.charCodeAt(0) : ch;
    var c = counts[ci],
    d = c + n,
    e = 0,
    oc = d / 255;
 
    //console.log('e: ' + e);
    //console.log('oc: ' + oc);
    if (d >= 256) {
        e = d % 255;
        counts[ci] = 0;
    } else {
        counts[ci] = d;
    }
    if (e > 0) {
        ci += 1;
        ci %= counts.length;
        stepCountsForChar(counts, ci, e);
    }
};
 
let stringToCounts = (str) => {
    let counts = Uint8Array.of(0, 0, 0, 0, 0, 0);
    let ch,
    i = 0;
    while (ch = str[i]) {
        stepCountsForChar(counts, 0, ch);
        i += 1;
    }
    return counts;
};
 
let str = [9, 255].map((n) => {
    return String.fromCharCode(n);
}).join('');
console.log(stringToCounts(str));
```

### 3.2 - A sum char codes method

```js
// just sum all the char codes for a string
let sumCharCodes = (str) => {
    var n = 0,
    i = 0,
    len = str.length;
    while (i < len) {
        n += str[i].charCodeAt(0)
        i += 1;
    }
    return n;
};

// can get a sum for some text
let sum = sumCharCodes('So then this is some text that can add up to a large number, by just adding up the char codes.');
console.log(sum); // 8443

// can break it down into some values like this:
let a = Math.floor(sum / 256),
b = sum % 256,
c = a * 256 + b;
console.log('\nBreak down values:');
console.log(a); // 32
console.log(b); // 251
console.log(c); // 8443
```

### 3.3 - Sum pow method

```js// just sum all the char codes for a string
let sumCharCodes = (str) => {
    var n = 0,
    i = 0,
    len = str.length;
    while (i < len) {
        n += str[i].charCodeAt(0);
        i += 1;
    }
    return n;
};
 
let createSumBytes = (str, byteCount) => {
    let uint8 = new Uint8Array(byteCount === undefined ? 4 : byteCount),
    sum = sumCharCodes(str),
    i = 0,
    len = uint8.length;
    while (i < len) {
        uint8[i] = Math.floor(sum / Math.pow(256, i)) % 256;
        i += 1;
    }
    return uint8;
};
 
// can get a sum for some text
let bytes = createSumBytes('This seems to work okay', 3);
console.log(bytes); // Uint8Array [ 143, 8, 0 ]
 
// however this might not work well if I want unique
// values for each possible string value
let a = createSumBytes('ab', 3).join(''),
b = createSumBytes('ba', 3).join('');
console.log(a === b); // true
```

## 4 - Conclusion

So Uint8Arrays are a way of having an array of number values that range between 0 and 255 making it an appropriate options when it comes to anything that has to do with raw binary data. So any project that will need to work with data in a raw binary from a type array might be a good choice as it will enforce rules for the elements that are appropriate for this kind of application. There might be some cross browser concerns when it comes to front end development though on cretin platforms, but if you are suing a late version of node then there should be little to no problem just working with theme there of course.

I have made an effort to try to keep my javaScript content fresh, and as such I am aiming to keep this post and all other javaScript posts fresh within a year. So it will only be a matter of time until I get around to editing this post again when I get around to it. In the mean time I have [found a post on typed arrays](https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/) that does a decent job of outlining one decent use case examples with typed arrays. There are a number of things that one might run into where a knowledge of how to go about working with this kind of array is required, such as WebGl, and the canvas imagData class, just to name a few things that come to mind.