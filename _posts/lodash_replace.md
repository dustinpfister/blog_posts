---
title: lodash replace
date: 2019-04-01 19:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 409
updated: 2020-06-02 08:39:11
version: 1.11
---

The [lodash \_.replace](https://lodash.com/docs/4.17.11#replace) method can be used to quickly replace instances of a text pattern in a string with a static text value of another text pattern. However it might be best to just know how to use regular expressions to do the same with the [String.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method in native javaScript by itself. 

In any case both methods are fairly useful for search and replace operations with text in javaScript. There is not just being knowledgeable with the features of the methods, but also regular expressions, and advanced options when using a method for each instance of a pattern. So in this post I will be writing bout some quick examples on this subject of search and replace of text that comes up a lot when working out a javaScript project.

<!-- more -->

## 1 - lodash replace basic example

So if I just want to replace the first instance of a text pattern in a string when reading it from left to right, and lodash is part of the stack, then the \_.replace method could be used to do just that very easily. Just pass in the string as the first argument, followed by the pattern to look for, and then finally the text to replace the pattern to look for.

```js
let str = _.replace('Hello Mr Early Cuyler','Early Cuyler','Dan Halen');
 
console.log(str); // 'Hello Mr Dan Halen'
```

The text pattern to look for can be a string or a regular expression. More on that in the next session.


## 2 - Using regex to replace all instances of a text pattern

If I want to replace more than one instance with the lodash \_.replace method, that can be done by passing a regular expression with the global flag set.

```js
let strP = '<p>this is an element</p>';
 
let strS = _.replace(strP,/p>/g,'span>');
 
console.log(strS); '<span>this is an element</span>'
```

Regular expressions come in handy when it comes to replacing not just all instances of a pattern, but also more complex patterns that are not static fixed collections of characters, and more. I will not be getting into detail with regular expressions here, as I have [wrote a post on regex](/2019/03/20/js-regex/) where I do just that.

## 3 - Vanilla javaScript and String.replace

Lodash replace is one of many methods in lodash that are somewhat redundant when it comes to what is available in plain old native javaScript by itself. The lodash \_.replace method is a String method, and in the native javaScript String prototype there is the String.replace method that works in more or less the same way as the lodash method.

Some methods in lodash do work a littler differently, for example the [\_.map](/2018/02/02/lodash_map/) method is a collection method that will work well on most objects in general while the Array.map method is just an Array prototype method. However when it comes to \_.replace there does not seem to be much of anything that really sets it apart. 

### 3.1 - Basic sxample of String.replace

So the above basic example can also be done with the native String.replace like this.

```js
let str = 'Hello Mr Early Cuyler'.replace('Early Cuyler','Dan Halen');
console.log(str); // 'Hello Mr Dan Halen'
```

### 3.2 - Regex example of String.replace

And regular expressions can be done with it as well.

```js
let strP = '<p>this is an element</p>',
strS = strP.replace(/p>/g,'span>');
 
console.log(strS); // '<span>this is an element</span>';
```