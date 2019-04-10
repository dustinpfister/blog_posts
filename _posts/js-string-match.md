---
title: String Match prototype method in javaScript
date: 2019-04-06 16:30:00
tags: [js]
layout: post
categories: js
id: 412
updated: 2019-04-10 18:53:56
version: 1.11
---

The [String Match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) method in javaScript can be used in combination with a regular expression to find detailed information about the first pattern match in a string, or an array of results depending on the group flag of the regular expression used. It is a great method that come sin handy, but it might not always be the best option when it comes to pattern matching tasks with javaScript and regular expressions. Never the less this will be a quick post on the String.match method in javaScript, with some examples.

<!-- more -->

## 1 - String Match Basics

To know how to use the String.Match method to a fair amount of proficiency it is required to have at least some understanding of how to go about working with regular expressions. I will not be getting into regular expressions in depth in this post as I have [written a post on regex in general](/2019/03/20/js-regex/).

To get started with string.match the first thing is to work out the pattern that will match what you are looking for in the string. Once that is together you just need to pass that regular expression to the string.match method as the first argument when calling it off of a string.

```js
let patt = /dat_\d+.json/ig,
str = 'Here is one file called dat_2017.json, and another called dat_2018.json',
m = str.match(patt);
console.log(m);
// [ 'dat_2017.json', 'dat_2018.json' ]
```

## 2 - String.match returns an Array or null

One thing to be aware of when using String.match is that it will return an Array or null depending if one or more matches are found or not. So testing for null may be necessary in many use case examples of String.match. The null value converts to false, and in the event that one or more matches are found a non empty array will be returned that will covert to true. So the null value can be used as a flag of sorts to help define what to do in the event that a match is not found.

For example say you want to write a method that will return the index of the first instance of a pattern match, or negative one if it is not found that could be done like this.

```js
let str1 = 'This string has a foobar here',
str2 = 'this string does not have that',
 
// getFooIndex method using String.match that will
// return -1 when null is returned
getFooIndex = (str) => {
    let m = str.match(/foo/);
    // if not null return index
    if (m) {
        return m.index;
    }
    // else return -1
    return -1;
};
 
console.log(getFooIndex(str1)); // 18
console.log(getFooIndex(str2)); // -1
```

So the possibility of null being returned by the String.match method is something to look out for when using it.

## 3 - Single pattern match and many

When using the String.match method there might be some additional properties attached to the Array that might be returned when it is called depending on the flags set for the regular expression pattern. If the Group flag of the pattern is not set then additional properties for the index in the string in which the pattern was found will be set to the array as well.

This following example should help explain the situation with this. 

```js
// a string with many instances of 'foo'
let str = 'this string has a foo, as well as another foo, and yet another foo as well',
 
// two regex patterns one will match the first instance of 'foo'
// and another that will match all because of the 'g' flag
patt_foo = /foo/,
patt_foos = /foo/g,
 
// using string match to get results with 
// both patterns
oneFoo = str.match(patt_foo),
manyFoos = str.match(patt_foos);
 
// Both times String.match returns an Array
console.log(oneFoo.constructor.name); // 'Array';
console.log(manyFoos.constructor.name); // 'Array';
 
// but as expected the the /foo/ pattern just gets
// one instance while the /foo/g pattern gets them all
console.log(oneFoo.length); // 1
console.log(manyFoos.length); // 3
 
// the Array return by the String Match call that only gets
// one instance of the pattern has additional properties attached
// to it like index.
console.log(oneFoo.index); // 18
console.log(manyFoos.index); // undefined
```

In regex using the group flag will result in matching all the instances of a patter rather than just the first or last depending on the nature of the pattern. If you want an array of objects that each contain the index in which the pattern begins from the right to left of the string, then you will want to use the patt.exec method in place of String.match.

### 4 - Alternatives to String.match

For the most part the string.match method works great for simple pattern matching, but depending on what you want to do sometimes a more simple solution will work out okay. There are also some additional things that come to mind where string.match might not be the best tool for the job, so in this section I will be looking at some alternatives to String.match.

### 4.1 - Using exec to do a String Match

If you are trying to use string.match to create an array of objects for each instance of a pattern that contains additional information like the index in which each pattern is found, then you might want to consider RegExp.exec to do so. It might be possible to work out some kind of solution using string.match to do that, but you might find this method works great for doing so.

The RegExp.exec is like String.match only it is a prototype method of the regular expression that you pass the string to serach for the pattern. In addition each time it is called with a pattern that uses the group flag, the next instance is returned until null is reached.

```js
let patt = /dat_\d+.json/ig,
str = 'Here is one file called dat_2017.json, and another called dat_2018.json';

console.log(patt.exec(str)); // ['dat_2017.json...'
console.log(patt.exec(str)); // ['dat_2018.json...'
console.log(patt.exec(str)); // null
console.log(patt.exec(str)); // ['dat_2017.json...'
```

Each time an array is returned, it has the additional properties that are only received when the group flag is not used as with String.match. So this method can be used to build an array of objects that have detailed information about each instance of the pattern. Working out a solution to do so with String.macth will have to involve string manipulation.