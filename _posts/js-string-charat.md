---
title: String charAt, the bracket syntax, and char code at in javaScript
date: 2020-07-06 13:36:00
tags: [js]
layout: post
categories: js
id: 676
updated: 2021-07-14 15:09:32
version: 1.16
---

In javaScript there is the [charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) string prototype method that can be used as a way to get a single character in a javaScrit string, there is also just using the bracket syntax as a way to get a single char also though. I can not say that I use the charAt method often as the same effect can be achieved using the bracket syntax, the same way that one would get an element in an array, or any public named key value in any javaScript object for that matter not just the wrapper object of a string primative. So the bracket syntax strikes be as a better way to go about getting a single char in a string, as it is more versatile.

There is also the [char code at](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt) method that is also in the javaScript string prototype object that does more or less the same thing as charAt only with one important difference. The charCodeAt method will give a number value that is a UTF-16 code unit for the char rather than a string of the single char.

In this post I will be covering ways to go about getting a single char from a string, but also hopefully break ground into other ways of going about getting at what one might be after when it comes to getting something in a string, number, or any object.

<!-- more -->

## 1 - basic charAt method example compared to the bracket syntax

One thing about just using the bracket syntax to get a char in a string in javaScript is that it will return undefined if there is no char at that index. That is that if an index value is given that is outside the range of the string length the value that is returned is the undefined value rather than something like and empty strung. This however is not the case with the charAt prototype method, which will return an empty string in those kinds of situations.

```js
var str = 'abc';
 
// bracket syntax and charAt
console.log(str[2], str.charAt(2)); 'c' 'c'
console.log(str[10], str.charAt(10)); undefined ''
```

## 2 - Using the bracket syntax works with a string wrapper, but also arrays and objects in general.

I generally seem to prefer to just use the bracket syntax when getting at just a single char in a given string. The issue of it returning undefined may not be much of a draw back if I am doing something to prevent that from happening in the first place, which is what I should be doing anyway.

```js
var str = '123',
arr = ['1', '2', '3'],
obj = {
    a: 1,
    b: 2,
    c: 3
};
 
console.log(str[1]); // 2
console.log(arr[1]); // 2
console.log(obj['b']); // 2
```

In addition the bracket syntax will not just work with strings, but it also works when getting a single element of an array, or the value of a named key when giving that named key as the value when using the bracket syntax. So just using the bracket syntax is a more robust option that the charAt method, but there are other options to that can be used to get a single char in a string.

## 3 - Using string Match to get the index value of a char

So the charAt method alone with the bracket syntax are ways of getting a single char if you know the index value. However what if you do not know the index value to begin with? Then you would need some way to get one or more index values in a string first in order to know the index value to give. On top of that while you are at it should there be a way to just get the values to while we are at it?

### 3.1 - The string index of method

So one way of getting an index value to begin with would be using the string index of method. If you know the single char, or the value of the string that you want to find inside of the string this method will work fine for getting the first index value from left to right.

```js
var str = 'so Then this is a only a tEst of String Things';
 
console.log( str.indexOf('T')); // 3
```

This method will only get the first index value though, and it will not support the use of regular expressions rather than just a string value. SO with that said lets look at some additional examples of getting the index value before hand.

### 3.2 - The string match method for getting index values

So one way to get an index value of the first instance of a pattern including a one char pattern would be to use the [string match](/2019/04/06/js-string-match/) method. If the string match method is given a non global pattern then it will return an object that will contain an index property that is the index of the first instance of the given patter from left to right. However it will give an array of primitive values rather than objects with index values in the event it is given a pattern with the global flag set to true.

```js
var str = 'so Then this is a only a tEst of String Things';
 
var getIndex = function (str, regex) {
    var m = str.match(regex);
    if (m) {
        return m.index >= 0 ? m.index : -1;
    }
    return -1;
};
 
// might work for a pattern like this
console.log( getIndex(str, /[A-Z]/) ); 3
// but not with global patterns
console.log( getIndex(str, /[A-Z]/g) ); -1
```

So the string match method works okay at getting a single index value, but not more than one. It will work okay if you just care about getting and array of values where each value in the array is the char that you are looking for though.

### 3.3 - The regex ecec method might be best

So then there is the exec method of the regular expression prototype object. This might be the best option for getting an array of index values the match with a given regular expression that can just be a single char, or any given pattern actually.

```js
var getIndexValues = function (str, regex) {
    var r = new RegExp(regex),
    m,
    arr = [];
    if (r.global) {
        while (m = r.exec(str)) {
            arr.push(m);
        }
    } else {
        m = r.exec(str);
        if (m) {
            arr.push(m);
        }
    }
    return arr;
};
 
var formated = function (str, regex) {
    return getIndexValues(str, regex).map(function (m) {
        return m + m.index;
    }).join(',')
}
 
var str = 'so Then this is a only a tEst of String Things';
 
console.log(formated(str, /[A-Z]/));
// T3
console.log(formated(str, /[A-Z]/g));
// T3,E26,S33,T40
```

## 4 - Using string.substr to get a range of chars

The [string substr](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) method is also there in the string prototype object for getting not just one char, but a whole range of chars. That is if you know both the starting index, and number of chars that you want to get from the string.

```js
var str = 'This might be the best site on javaScript',
m = str.match(/best site/);
 
if (m) {
    console.log(str.substr(m.index, str.length - m.index));
    // best site on javaScript
}
```

## 5 - Using String.split, Array.splice, and Array.join

There is using the string methods to get a range of chars from a string rather than just a single char with charAT, but then there is using the array method splice also. One way that the array method splice can be used is by first converting the string into an array with the [split string prototype method](/2021/07/14/js-string-split/). Once I have an array of chars rather than a string I can then use the array splice method to return a new array from that array that is just a given set of chars from a given starting index value and a number of chars. I can then use the array join method to join the new array back into a string.

```js
var str = 'This might be the best site on javaScript';
// using split, splice, and join
var range = str.split('').splice(5, 5).join('');
 
console.log(range); // 'might'
```

There are other ways of using array prototype methods such as using the function call method. That way of doing it involves just directly using array methods on a string that often work because strings are array like objects.

In any case the point here is that you are not limited to what can be done with the string prototype methods. Strings can be easily converted to arrays with split, and convert back with join. In some cases yu can just directly use the method of another prototype object using the function call method.

## 6 - Conclusion

So the charAt method is a string method that just simply gets a single char in a string to which it is called off of. There are other methods that can be used to get not just one char, but a range of chars in a string that are more versatile though. In addition there is just using the bracket syntax to do so that can be used with strings to get a char, but it can also be used to get a single value with objects in general with javaScript. I can not say that I use the charAt string prototype method that much, as i seem to prefer to use the other options that I have outlined in this post.