---
title: String Replace prototype method in javaScript
date: 2019-04-08 15:03:00
tags: [js]
layout: post
categories: js
id: 413
updated: 2019-11-15 20:11:37
version: 1.8
---

The [String Replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) String prototype method in javaScript comes in handy when it comes to most text search and replace tasks involving regular expressions. In order to really get into using replace it is important to get up to speed with [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), a subject that I hate, but never the less when it does come to search and replace, and matching tasks with text regular expressions are a very powerful tool for doing so.


<!-- more -->

## 1 - String Replace method basics

In order to use the the String.replace string prototype method it is important to have a fairly solid grasp on regular expressions. I will be covering some examples of them here in this post of course, but I will not be getting into regular expressions in detail here, as I have a [post where I have done so when it comes to regex](/2019/03/20/js-regex/).

The basic idea of String.replace is to come up with a regular expression that will match the one or more patterns that I want to replace with something else, and use that pattern as the first argument for String.replace. The second argument then is the string to replace all matches for the pattern in the string to which the prototype method is being called off of.

```js
let str = 'It is a bad day to do bad things for bad people',
result = str.replace(/bad/g, 'good');
 
console.log(result);
// 'It is a good day to do good things for good people'
```

In this example I used a pattern that has the global flag set, that is what the little g at the end of the pattern is. If I did not use that only the first instance of the pattern would have been replaced.

## 2 - Using a function to create replacement strings

In place of a static string as the replacement, a function can be used to generate replacement strings that will differ depending on the nature of the instance of the pattern match. For example if the pattern contains numbers or dates they can be extracted and used to generate the result in the resulting string.

```js
let str = 'Some numbers for you are 2, 6, and 10 also.',
 
result = str.replace(/\d+/g, (num) => Math.pow(2, num));
 
console.log(result);
// 'Some numbers for you are 4, 64, and 1024 also.'
```

So that is a neat tick for string replacement related tasks that I am sure can come in handy now and then. Just this simple example of it is one thing, but say I want to replace all uppercase instances of tag names in an HTML string with lower case ones, this can be used as a way to do so real easy.