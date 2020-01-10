---
title: _.split and String.split for splitting a string into substrings
date: 2018-12-03 16:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 343
updated: 2020-01-10 09:23:57
version: 1.12
---

So now and then when making a project with javaScript, there might be a need to split a string into an array of strings by a given separator pattern. In [lodash](https://lodash.com/) there is the [\_.split](https://lodash.com/docs/4.17.11#split) method, and there is also a [native javaScript split method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) as well in the String prototype object that can be used to do break a string down into an array of sub strings. 

This is not a method in lodash that does a good job of supporting a case to use the full lodash library these days as the native array split method is well supported, and the lodash split method does not really bring anything more to the table compared to other lodash methods where that is the case at least.

Use of a split method in lodash or vanilla javaScript comes up a lot when researching javaScript code examples for various things, so if you are new to javaScript this is one of many methods that should be well understood. 
<!-- more -->

## 1 - Basic example of \_.split

For a basic example of the \_.split method in lodash say you have a serialized string of css property and value pairs and you want an array of pairs rather than just a string. The \_.split method can be used to break the string into such an array by using the semicolon as a separator. Just pass the string as the first argument, and then the semicolon as the second argument. 
The resulting array that will be returned is then an array of substrings of property and value pairs for css rules.

```js
let css = 'color:red;font-size:12pt;font-family:arial;';
 
let props = _.split(css,';', 2);
 
console.log(props);
// [ 'color:red', 'font-size:12pt' ]
```

Although the lodash spit method works just fine for this sort of thing it is not so hard to do the saem with just plain old vanilla javaScript. There is the string split prototype method, and then there is using other methods, and regular expressions as a way to break a string down and get what you want out of it. So lets look at some more examples using lodash, and plain old javaScript for spiting strings and other related topics.


## 2 - Chaining with \_.split

To chain with split the \_.chain method can be used as one way to do so in lodash. Just call the chain method and pass the string as the first argument to the chain method. Lodash methods such as lodash split, as well as many other lodash methods such as join and chunk can also be used just like that of native javaScript.

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

The one difference is that you will want to end the chain by calling value so that a value is returned.

## 3 - Using regex

A regular expression can be used as the separator, rather than a static string. This is useful if I want some kind of pattern to be used as a way to break the string down rather than a static fixed string value.

```js
let names = 'foo_81628bar_42foobar_7771234';
 
let items = _.split(names, /_\d+/);
 
console.log(_.initial(items));
// [ 'foo', 'bar', 'foobar' ]
```
