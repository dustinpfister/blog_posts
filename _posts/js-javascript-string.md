---
title: javaScript Strings must know methods and more.
date: 2019-01-25 12:44:00
tags: [js]
layout: post
categories: js
id: 364
updated: 2019-06-25 21:21:55
version: 1.18
---

A [javaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) is one of the primitive values that there are to work with when making a project with javaScript. A string is a collection of characters that compose a text pattern, and as such can serve a number of functions beyond just simply displaying text. In this post I will be covering some of the must know String prototype methods, as well as some general quirks to look out for when working with a String in javaScript.

<!-- more -->


## 1 - JavaScript string basics - creating strings

The basics of strings in JavaScript might include how to go about creating, and displaying Strings. There are a number of ways to create a string in javaScript the most basic and common way, and then there are some not so basic and common ways as well. In this section I will be going over the different ways I know how to go about creating a string with javaScript.

### 1.1 - Creating a string with quotes

The most common and basic way to go about creating a string in javaScript would be to use quotes. They can be single or double quotes in mode cases, but some times one or the other must be used, such is the case with JavaScript Object Notation.

```js
let str = 'foobar';
 
console.log(typeof str); // string
console.log(str.constructor.name); // String
console.log(str); // 'foobar'
```
Single or double quotes can be used.


### 1.2 - Making a javaScriot string with backticks

There are also backticks that can be used as well. These can be used in the same way as quotes, but also allow for things like function calls.

```js
let getN = () => {
    return 17;
};
let str = `n=${getN()}`;
 
console.log(str); // 'n=17'
```

### 1.3 - The result of an expression

Strings can often end up being the result of an expression with one or more operators. This can sometimes be an unintended result when respecting a number. When adding two strings together the result is another string, and when adding a string and a number together the result is also a string. Sometimes a method or property will supply a string where a number might be expected resulting in string concatenation where addition was expected. 

```js
let str = 7 + '2';
console.log(str); // '72'
 
let n = 7 + Number('2');
console.log(n); // 9
```

### 1.4 - From an Array

One way to create a string from an array is ti use the Array.join method. This is one of the many Array prototype methods that can be used to join all elements together and return a string when dealing with an array of strings.

```js
let arr = ['f', 'o', 'o', 'b', 'a', 'r'],
str = arr.join('');
console.log(str); // 'foobar'
```

In addition to the Array.join method there is also the String.split method that can do the revers of this spiting a string into an array of strings.

### 1.5 Creating a javaScript string from an object

There are a number of ways to create a string from an Object in general. There are many native methods to work with such as Object.keys, Array.map, and so forth. There is also for in loops and the JSON.stringify method that come to mind also just to name a few options.

```js
let obj = {
    intro: 'Hello, ',
    mess: 'This is Dustin. ',
    end: 'Have a nice day'
};
 
// Object.keys, Array.map, and Array.join
let str = Object.keys(obj).map((key) => {
        return obj[key];
    }).join('');
console.log(str);
// 'Hello, This is Dustin. Have a nice day'
 
// for in
let str2 = '';
for (let prop in obj) {
    str2 += obj[prop];
}
console.log(str2);
// 'Hello, This is Dustin. Have a nice day'
 
console.log(JSON.stringify(obj));
// {"intro":"Hello, ","mess":"This is Dustin. ","end":"Have a nice day"}
```

## 2 - String length

To get the character length of a string there is the length property of a string. Also strings can be worked with as if they are array like objects as well. When this is the case the character length of the string can also be though of as the corresponding array length as well. So in this post I will be showing some examples of how to convert a string to an array and vice versa as well.

```js
let str = 'foobar';
 
console.log(str.length); // 6
 
let arr = str.split('');
 
console.log(arr.constructor.name); // Array
console.log(arr); // [ 'f', 'o', 'o', 'b', 'a', 'r' ]
console.log(arr.length); // 6
 
let str2 = arr.join('');
 
console.log(str2.constructor.name); // String
console.log(str2); // 'foobar'
```

## 3 - Getting or setting a character

To get a character of a given index value from the left to the right of the string, one way is to do so the same way as if it where an array. There is also a Sting.charAt method as well in addition to a number of other ways.

```js
let str= '1234-test-4321';
 
console.log(str[5]); // 't'
console.log(str.charAt(5)); // 't'
 
str = str.slice(0,5) + 'b' + str.slice(6,str.length-1)
 
console.log(str); // '1234-best-4321'
```

Setting a char might prove to be a bit more complicated and may involve concatenation and the use of the String.slice prototype method.

## 4 - Converting an array to a string and back

There is the process of converting an array to a string and doing the inverse of that as well. Typically this is doe with the Arry.join method. With Array.join just call the prototype method off of the array instance and pass a string that will be the string that will be placed between each element in the array, this can be an empty string if nothing is desired to be between elements

```js
let arr =[1,2,3,4],
str = arr.join('');
 
console.log(str); // '1234';
console.log(typeof str); // string
 
let b = str.split('');
 
console.log(b); // [1,2,3,4]
console.log(b.constructor.name); // Array
```

To convert a string back to an array there is the String.split method. The argument that is given to the String.split method is what is to be used as an indicator as to where the various points in a string are to be split into elements in an array. This value as well can be an empty string which will result in each character being a single element in the array.

## 5 - String.trim

The trim String prorotype method can be used to remove any additional while space that may be at the beginning or end of a string.

```js
var str = '    this string has extra white space     ';
 
console.log(str.length); // 42
str = str.trim();
console.log(str.length); // 33
console.log(str);
```

## 6 - String.match

If you are not familiar with regular expressions, it might be a good idea to look into them more at some point. Every now and then they do come in handy when it comes to doing anything complex with pattern detection with strings.

```js
var str = '<div><p>foo<\/p><\/div><div><span>bar<\/span><\/div>';
 
var m = str.match(/<div>(.*?)<\/div>/g);
 
console.log(m[1]); // <div><span>bar</span></div>
```

## 7 - String.replace

The String.replace prototype method is another very helpful and powerful method that can be used for advanced search and replace operations using regular expressions. The first argument is the regular expression and the second argument is what the pattern is to be replace with when found.

```js
var str = '<div><p>foo<\/p><\/div><div><span>bar<\/span><\/div>';
 
var r = str.replace(/<p>(.*?)<\/p>/g,'');
 
console.log(r); // <div></div><div><span>bar</span></div>
```