---
title: _.split and String.split for splitting a string into substrings
date: 2018-12-03 16:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 343
updated: 2018-12-03 17:15:02
version: 1.2
---

So now and then when making a project with javaScript, there might be a need to split a string into an array of strings by a given separator pattern. In [lodash](https://lodash.com/) there is the [\_.split](https://lodash.com/docs/4.17.11#split) method, and there is also a [native javaScript split method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) as well in the String prototype that can be used to do just this. Use of this method comes up a lot when researching javaScript code examples for various things, so if you are new to javaScript this is one of many methods that should be well understood.

<!-- more -->

## 1 - what to know


## 2 - Basic example of \_.split

```js
let css = 'color:red;font-size:12pt;font-family:arial;';
 
let props = _.split(css,';',2);
 
console.log(props);
// [ 'color:red', 'font-size:12pt' ]
```

## 3 - Chaining with \_.split

```js
let css = 'color:red;font-size:12pt;font-family:arial;';
 
let arr = _.chain(css)
.split(';')
.join(':')
.split(':')
.chunk(2)
.initial()
.value();
 
console.log(arr);
// [ [ 'color', 'red' ],
//  [ 'font-size', '12pt' ],
//  [ 'font-family', 'arial' ] ]
```