---
title: regex patterns in javaScript
date: 2019-03-20 19:48:00
tags: [js]
layout: post
categories: js
id: 405
updated: 2019-03-24 20:07:10
version: 1.7
---

When working on a javaScript project there might be a need now and then to do some text pattern matching operations. This is true of sure then making some kind of parser, or something to that effect. So in this post I will be covering some basic examples of [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) in javaScript that can be used to text search and replace tasks.

<!-- more -->

## 1 - regex

In javaScript a regex, regexp or regular expression is a way to achieve text pattern matching, or search and replace tasks. There are ways of defining the patten to look for, and then there are String prototype methods that make use of these patterns to find one or more matches for that pattern in a given string, as well as replacing any and all matches with something else.

```js
let data = 'regexp is **good** for pattern matching tasks',
change = data.replace(/\*\*good\*\*/, 'great');
console.log(change); // 'regexp is great for pattern matching tasks'

```

## 2 - Some basic regex examples

In this section I will be going over some of the basics of regular expression pattern matching.

### 2.1 - Match the beginning of a string

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