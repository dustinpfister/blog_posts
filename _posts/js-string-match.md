---
title: String Match prototype method in javaScript
date: 2019-04-06 16:30:00
tags: [js]
layout: post
categories: js
id: 412
updated: 2020-10-04 09:21:50
version: 1.24
---

The [String Match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) prototype method in javaScript can be used in combination with a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to find one or more matches of a text pattern in a string. When making a regular expression instance a global flag can be used to get an array of matches for a given text pattern rather than just the first match from right to left.

If you are still new to javaScript you might be using methods like String.indexOf to find the index of a fixed text pattern in a string. This kind of method might work okay with fixed static patterns, where I am only interested in the first match from right to left, of if there is an instance of the pattern at all. However methods like that do have there limitations and in some cases it might be best to just get into regular expressions and methods like the string match method.

So this js string match method is a great method that comes in handy, but it might not always be the best option when it comes to pattern matching tasks with javaScript and regular expressions. There is another option that might be a better choice when it comes to [preforming a replacement task](/2019/04/08/js-string-replace/), but this post will focus more so on just matching. So then this post will be a quick outline on the String.match method in javaScript, with at least a few examples that should help with gaining greater knowledge of the use of this method.

<!-- more -->

## 1 - String Match Basics

To know how to use the String.Match method to a fair amount of proficiency it is required to have at least some understanding of how to go about working with regular expressions. I will not be getting into regular expressions in depth in this post as I have [written a post on regex in general](/2019/03/20/js-regex/) before hand. This post will focus more so on using regular expressions to match rather than replace text, and primary using the string match prototype methods rather than alternative methods such as the regular expression prototype method exec.

So in this section I will be going over just a few basic examples of the string match method. This should helper to get started with string match to know what it can do, and also what it can not do at least by itself. You might all ready be familiar with the String.index method, and with that said the String match method can be used to do the same thing, but it is a little more advanced. So lets get started with some basic examples of the string match method.

### 1.1 - just getting the first match using a string rather than a regular expression

So the string match method can be used in more or less the same way as the string index method in the sense that a string ca be given as a pattern to look for. However the result that will be returned in the event that a match is found will end up being an object rather than a number value for the index of the match.

```js
let str = 'foo bar baz bar 42 zoo bar';
 
// String.indexOf
console.log( str.indexOf('bar') );
// 4
 
// String.match
var match = str.match('bar');
console.log( match.index ); // 4
console.log( match[0] ); // 'bar'
//[ 'bar', index: 4, input: 'foo bar baz bar 42 zoo bar' ]
```

### 1.2 - Using the global flag with a regular expression and the first drawback of string match

```js
let str = 'foo bar baz bar 42 zoo bar';
// doing s global Match
let match = str.match(/bar/g);
console.log(match); // ['bar', 'bar', 'bar']
console.log(match.index); // undefined
```

### 1.3 - yet another basic example

To get started with string.match the first thing is to work out the pattern that will match what you are looking for in the string. Once that is together you just need to pass that regular expression to the string.match method as the first argument when calling it off of an instance of a string.

```js
let patt = /dat_\d+.json/ig,
str = 'Here is one file called dat_2017.json, and another called dat_2018.json',
m = str.match(patt);
console.log(m);
// [ 'dat_2017.json', 'dat_2018.json' ]
```

In this example I used the i and g regular expression flags. The i flag is used to set the pattern as case insensitive, and the g flag makes it so that a global search is what is preformed rather than just getting the first instance of a pattern. I also used the digit [character class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes) as a way to define a regular expression that will not just match a fixed text pattern, but a pattern that will contain a part that is subject to variation in the from of a number, in this case a year after a starting fixed text pattern.

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

## 3 - Single pattern match and more than one match with the String match method.

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

## 4 - Get all index values for a match

Although it might be better to use a method like RegExp.exec to do so it is possible to use String.match to create an array of index values for each instance of a pattern. The solution that I have worked out here seems to work okay for the one string that I have used it for, but it is not at all battle tested. In any case I just wanted something to show that it can be done of course by using the index values that are given when using a regular expression that does not use the group flag in conjunction with a method like String.substring.

```js
let createIndexObjects = (str) => {
 
    let patt = /\d+(\.js|\.html)/,
    arr = [],
    m,
    i = 0;
 
    // loop while m is true
    do {
 
        // get match from a substring from the current
        // index
        m = str.substring(i).match(patt);
 
        // break if null
        if (!m) {
            break;
        }
 
        // step index by index of match plus the size
        // of the pattern match string
        i += m.index + m[0].length;
 
        // adjust m.index to reflect index values
        // in original string rather than the substring
        m.index = i - m[0].length;
 
        // push the match object
        arr.push(m);
 
    } while (m);
 
    // return the array
    return arr;
 
};
 
// a string with many instances of 'foo'
let str = 'Okay so here is 20190410.js and 20190410.html, you might also want to check out 20180410.js';
 
console.log(createIndexObjects(str).map((m) => {
        return m.index;
    })); // [16,32,80]
```

Although these kinds of solutions might work okay for this, it does string me as being a bit to complex. So it might be better to work out or more simple solution involving the RegExp.exec method maybe.

## 5 - Alternatives to String.match

For the most part the string.match method works great for simple pattern matching, but depending on what you want to do sometimes a more simple solution will work out okay. There are also some additional things that come to mind where string.match might not be the best tool for the job, so in this section I will be looking at some alternatives to String.match.

### 5.1 - String.indexOf

So if I am just searching for instances of a simple static string rather than a more dynamic pattern that involves numbers or other forms of variance then the String.indexOf method can work okay for getting the first index of that pattern, and even all of them if use in a loop with an optional fromIndex argument that can be passed as the second argument.

```js
let str= 'okay so here is a foo, and another foo, and foo foo';
 
// returns the index of the first instance of the 
// string 'foo', or -1 if it is not found
console.log(str.indexOf('foo')); // 18
console.log('bar'.indexOf('foo')); // -1
```

### 5.2 - Using The RegExp exec method to do a String Match

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

## 6 - Conclusion

So the string match method is a good choice for looking for instances of a pattern in a string, however it is nit the only option. When it comes to making a real serious object that involves creating an array of indexes and lengths for patterns in a volume of text it might be best to go with the RegExp exec method for this sort of thing. Although it is still possible to create what I want using string match as long as I know how to get around some of its limitations.

There is getting into working out more regular expressions, or at least learning how existing regular expressions truly work rather than  just coping and pasting them from stack overflow, and blog posts such as this one. It might be best to just start a project where regular expressions are whats needed to get things working, and writing a few of them to learn by doing rather than just reading content like this.