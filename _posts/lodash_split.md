---
title: _.split and String.split for splitting a string into substrings
date: 2018-12-03 16:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 343
updated: 2018-12-03 17:34:09
version: 1.4
---

So now and then when making a project with javaScript, there might be a need to split a string into an array of strings by a given separator pattern. In [lodash](https://lodash.com/) there is the [\_.split](https://lodash.com/docs/4.17.11#split) method, and there is also a [native javaScript split method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) as well in the String prototype that can be used to do just this. Use of this method comes up a lot when researching javaScript code examples for various things, so if you are new to javaScript this is one of many methods that should be well understood.

<!-- more -->

## 1 - Basic example of \_.split

For a basic example of the \_.split method in lodash say you have a serialized string of css property and value pairs and you want an array of pairs rather than just a string. The \_.split method can be used to break the string into such an array by using the semicolon as a separator.

```js
let css = 'color:red;font-size:12pt;font-family:arial;';
 
let props = _.split(css,';',2);
 
console.log(props);
// [ 'color:red', 'font-size:12pt' ]
```

## 2 - Using regex

```js
let names = 'foo_81628bar_42foobar_7771234';
 
let items = _.split(names, /_\d+/);
 
console.log(_.initial(items));
// [ 'foo', 'bar', 'foobar' ]
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

## 4 - Conclusion