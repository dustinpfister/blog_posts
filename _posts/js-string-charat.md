---
title: String charAt, the bracket syntax, and char code at in javaScript
date: 2020-07-06 13:36:00
tags: [js]
layout: post
categories: js
id: 676
updated: 2020-07-06 13:48:42
version: 1.3
---

In javaScript there is the [charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) string prototype method that can be used as a way to get a single character in a javaScrit string. There is also just using the bracket syntax as a way to get a single char, the same way that old would get an element in an array, or a public named object key value in any javaScript object for that matter. There is also the [char code at](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt) method that is also in the javaScript string prototype object that does more or less the same thing as charAt only it will give a number value for the char rather than a string of the char.

<!-- more -->

## 1 - basic charAt method example compared to the bracket syntax

One thing about just using the bracket syntax to get a char in a string in javaScript is that it will return undefined if there is no char at that index. That is that if an index value is given that is outside the range of the string length the value that is returned is the undefined value rather than something like and empty strung. This however is not the case with the charAt prototype method, which will return an empty string in those kinds of situations.

```js
var str = 'abc';
 
// bracket syntax and charAt
console.log(str[2], str.charAt(2)); 'c' 'c'
console.log(str[10], str.charAt(10)); undefined ''
```

## 2 - Conclusion

So the charAt method is a string method that just simply gets a single char in a string to which it is called off of. There are other methods that can be used to get not just one char, but a range of chars in a string that are more versatile though. In addition there is just using the bracket syntax to do so that can be used with strings to get a char, but it can also be used to get a single value with objects in general with javaScript. I can not say that I use the charAt string prototype method that much, as i seem to prefer to use the other options that I have outlined in this post.