---
title: regex patterns in javaScript
date: 2019-03-20 19:48:00
tags: [js]
layout: post
categories: js
id: 405
updated: 2019-04-06 15:50:45
version: 1.10
---

When working on a javaScript project there might be a need now and then to do some text pattern matching operations. This is true of sure then making some kind of parser, or something to that effect. So in this post I will be covering some basic examples of [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) in javaScript that can be used to text search and replace tasks.

<!-- more -->

## 1 - regex basics

In javaScript a regex, regexp or regular expression is a way to achieve text pattern matching, or search and replace tasks. There are ways of defining the patten to look for, and then there are String prototype methods that make use of these patterns to find one or more matches for that pattern in a given string, as well as replacing any and all matches with something else. In this section I will be going over the very basics of regular expression in javaScript including how to make one and how to use one.

### 1.1 - Creating a regex pattern

To create a regular expression the RegExp constructor can be used to create an expression from a string, the other way is to use the regular expression literal syntax.

```js
// when using the RegEx constructor backslashes must be doubled up.
let pat_datfile = new RegExp('dat_\\d+\\.json','gi');
 
console.log('filename: dat_20120822.json'.match(pat_datfile)[0]);
// 'dat_20120822.json'
 
// or the literal syntax can be used.
let pat_datfile_lit = /dat_\d+.json/gi;
 
console.log('-- dat_20120822.json -- dat_2013.json'.match(pat_datfile)[1]);
// 'dat_2013.json'
```

### 1.2 - Using a regular expression

```js
let data = 'regexp is **good** for pattern matching tasks',
change = data.replace(/\*\*good\*\*/, 'great');
console.log(change); // 'regexp is great for pattern matching tasks'

```


## 2 - Match the beginning of a string

To match the begging of a string.I just need to use the ^ symbol followed be the pattern I want to match for.

```js
let data = ['foobar', 'baz', 'foo'];

data.forEach(function (str,i) {
    var beginFoo = str.match(/^foo/);
    if (beginFoo) {
        console.log(i,beginFoo.index);
    }
});
// 0 0
// 2 0

```

## 3 - Match the end of a string


The dollar sign symbol can be used to test for a pattern that is to be expected at the end of a string.
```js
let str = 'foo,bar,baz',
 
m = str.match(/baz$/);
 
console.log(m.index); // 8
```