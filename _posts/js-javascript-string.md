---
title: javaScript Strings must know methods and more.
date: 2019-01-25 12:44:00
tags: [js]
layout: post
categories: js
id: 364
updated: 2021-02-04 12:23:09
version: 1.27
---

A [javaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) is one of the primitive values that there are to work with when working in a javaScript programming environment. A [string](https://en.wikipedia.org/wiki/String_%28computer_science%29) is a collection of characters that compose text, and as such can serve a number of purposes beyond just simply displaying human readable text.

Strings are a type of primitive value rather than an object, however there is a wrapper object to work with when it comes to a string which can give the allusion that a string is a kind of object. The wrapper object of a String is loaded with all kinds of useful methods to help worth with a string value. In addition the String wrapper object is array like, so often many array prototype methods can be used with a string by way of something like the Function call prototype method.

There is a great deal to write about when it comes to javaScript Strings, but in this post I will be going over just some of the basics of strings including some of the must know String prototype methods. In the process of doing so I might manage to cover some general quirks to look out for when working with a String in javaScript, and I might also branch off into some closely related topics where doing so might be called for.

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

This can be thought of as a string literal when the value of the string exists in the actual hard coded javaScript itself. In most real projects a string is a type of value that is obtained from and input element, or from a parsed object from JSON data that was pulled in via an http request. So there are many other ways to go about getting, or creating a string so lets look as some more examples.


### 1.2 - Making a javaScript string with backticks

There are also backticks that can be used as well as another form of string literal that allows for embedded jvaScript. These can be used in the same way as quotes, but expressions, values, and function calls the return a value and be embedded into the string literal. When it comes to regular string literals doing the same would involve more than one string literal with addition operators to concatanate a string value togeather.

```js
let getN = () => {
    return 17;
};
let str = `n=${getN()}`;
 
console.log(str); // 'n=17'
```

This is a newer feature in javaScript, but still goes back a few years all ready so it should be safe to use.

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

### 1.5 - Creating a javaScript string from an object

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

### 1.6 - Getting a string from an input tag in client side javaScript

So then there are input text tags in client side javaScript. In order to do this full justice I will need to get into the various event handlers that can be attached to an input element, as well as the event objects that are passed to the callbacks that fire when and event happens. Getting into this in depth will be a bit of subject for the tone of this post, so I will just be going over a simple little example here.

The target property of an event object is a reference to the element in which the event has occurred. Once that value has been obtained there is the value property of an input element. The value property is of course the current value of the input tag, and in the case of input tags the value is a javaScript string.

```html
<html>
    <head>
        <title>javaScript string from input element</title>
    </head>
    <body>
        <input type="text">
        <div id="out"></div>
        <script>
// get references to elements
var input = document.getElementsByTagName('input')[0],
out = document.getElementById('out');
// attach event
input.addEventListener('keyup', function(e){
    var str = e.target.value;
    console.log(typeof str); // 'string'
    // do something with it
    out.innerText = str.split('').map(function(ch){
        return ch.charCodeAt(0);
    }).join(':');
});
        </script>
    </body>
</html>
```

In many projects this is often the typical way of going about getting a string that is the result of user input. It is generally a better idea to use input tags rather that using prompt.

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

There is the process of converting an array to a string and doing the inverse of that as well. Typically this is doe with the Array.join method. With Array.join just call the prototype method off of the array instance and pass a string that will be the string that will be placed between each element in the array, this can be an empty string if nothing is desired to be between elements

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

The trim String prototype method can be used to remove any additional while space that may be at the beginning or end of a string.

```js
var str = '    this string has extra white space     ';
 
console.log(str.length); // 42
str = str.trim();
console.log(str.length); // 33
console.log(str);
```

## 6 - String.match pattern matching

If you are not familiar with regular expressions, it might be a good idea to look into them more at some point. Every now and then they do come in handy when it comes to doing anything complex with pattern detection with strings.

```js
var str = '<div><p>foo<\/p><\/div><div><span>bar<\/span><\/div>';
 
var m = str.match(/<div>(.*?)<\/div>/g);
 
console.log(m[1]); // <div><span>bar</span></div>
```

## 7 - String.replace for pattern matching and replacement

The String.replace prototype method is another very helpful and powerful method that can be used for advanced search and replace operations using regular expressions. The first argument is the regular expression and the second argument is what the pattern is to be replace with when found.

```js
var str = '<div><p>foo<\/p><\/div><div><span>bar<\/span><\/div>';
 
var r = str.replace(/<p>(.*?)<\/p>/g,'');
 
console.log(r); // <div></div><div><span>bar</span></div>
```

## 8 - Conclusion

So there are string prototype methods of the wrapper object, and other methods in other prototypes than can be used to produce strings fro other objects. The wrapper object of a string is array like so it is often easy to use array methods with strings.

I would say that there is an whole lot more to write about when it comes to working with strings in javaScript, but for now I think I covered a lot of basic things to know, and look our for when it comes to strings in javaScript.