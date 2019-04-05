---
title: lodash replace
date: 2019-04-01 19:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 409
updated: 2019-04-05 12:05:24
version: 1.6
---

The [lodash \_.replace](https://lodash.com/docs/4.17.11#replace) method can be used to quickly replace instances of a text pattern in a string with another pattern. However it might be best to just know how to use regular expressions to do the same with the String.replace method in native javaScript by itself. So in this post I will be writing bout some quick examples on this subject that comes up a lot when working out a javaScript project.

<!-- more -->

## 1 - lodash replace basic example

So if I just want to replace the first instance of a text pattern in a string when reading it from left to right, and lodash is part of the stack, then the \_.replace method could be used to do just that very easily. Just pass in the string as the first argument, followed by the pattern to look for, and then finally the text to replace the pattern to look for.

```js
let _ = require('lodash');
 
let str = _.replace('Hello Mr Early Cuyler','Early Cuyler','Dan Halen');
 
console.log(str); // 'Hello Mr Dan Halen'
```

The text pattren to look for can be a string or a regular expression. More on that in the next session.


## 2 - Using regex to replace all instances of a text pattern

If I want to replace more than one instance with the lodash \_.replace method, that can be done by passing a regular expression with the global flag set.

```js
let strP = '<p>this is an element</p>';
 
let strS = _.replace(strP,/p>/g,'span>');
 
console.log(strS); '<span>this is an element</span>'
```

Regular expressions come in handy when it comes to replacing not just all instances of a pattern, but also more complex patterns that are not static fixed collections of characters, and more.