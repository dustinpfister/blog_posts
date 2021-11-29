---
title: String Match prototype method in javaScript
date: 2019-04-06 16:30:00
tags: [js]
layout: post
categories: js
id: 412
updated: 2021-11-29 11:17:51
version: 1.43
---

The [String Match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) prototype method in javaScript can be used in combination with a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to find one or more matches of a text pattern in a string. When making a regular expression instance a global flag can be used to get an array ofall  matches for a given text pattern rather than just the first match from left to right.

If you are still new to javaScript you might be using methods like the String index of method to find the index of a fixed text pattern in a string. This kind of method might work okay with fixed static patterns, where I am only interested in the first match from right to left, or if there is an instance of the pattern at all and thats it. However methods like that do have there limitations and in some cases it might be best to just get into regular expressions and methods like the string match method.
So this string match method is a great method that comes in handy, but it might not always be the best option when it comes to pattern matching tasks with javaScript and regular expressions. There is another option that might be a better choice when it comes to preforming a replacement task called the [string replace method](/2019/04/08/js-string-replace/), but this post will focus more so on just matching. So then this will be a quick outline on the String match method in javaScript, with at least a few examples that should help with gaining greater knowledge of the use of this method as well as regular expressions in general in the process of doing so.

<!-- more -->

## 1 - String Match Basics

To know how to use the String.Match method to a fair amount of proficiency it is required to have at least some understanding of how to go about working with regular expressions. I will not be getting into regular expressions in depth in this post as I have [written a post on regex in general](/2019/03/20/js-regex/) before hand. This post will focus more so on using regular expressions to match rather than replace text, and primary using the string match prototype methods rather than alternative methods such as the [regular expression prototype method exec](/2020/07/08/js-regex-exec/).

So in this section I will be going over just a few basic examples of the string match method. This should help to get started with string match to know what it can do, and also what it can not do at least by itself. You might all ready be familiar with the [String index of method](/2020/07/09/js-string-index-of/), and with that said the String match method can be used to do the same thing, but it is a little more advanced. So lets get started with some basic examples of the string match method.

### The examples here can be found on github

The source code examples here can be found in my [test vjs Github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-string-match). Every now and the I get around to editing this post, and with that said the latest notes, and source code examples can be found there.

### 1.1 - Just getting the first match using a string rather than a regular expression

So the string match method can be used in more or less the same way as the string index method in the sense that a string ca be given as a pattern to look for. However the result that will be returned in the event that a match is found will end up being an object rather than a number value for the index of the match.

```js
let str = 'foo bar baz bar 42 zoo bar';
 
// String.indexOf
console.log( str.indexOf('bar') ); // 4
 
// String.match
var match = str.match('bar');
console.log( match.index ); // 4
console.log( match[0] ); // 'bar'
```

The object that is returned will have an index property this is what will contain the index value of the match in the string like that of the index value. The object can also be used like an Array and the first and only element of the array will contain the text of the first any one match when used this way.

### 1.2 - No Match with String Match

When using the String index of method a value of -1 will be returned when no match for a pattern is obtained. The string match method will return [null](/2019/03/11/js-javascript-null/) in the event that there is no instance of the given pattern in the source string. This two just like -1 can be used as a way to know if one or more matches have been found or not.

```js
let str = 'foo bar baz bar 42 zoo bar';
// String.indexOf
console.log( str.indexOf('nope') ); // -1
// String.match
console.log(str.match('nope')); // null
```

### 1.3 - Using the global flag with a regular expression and the first drawback of string match

A regular expression can be given as a pattern to look for rather than a string. When giving a pattern it is possible to set a global flag that will result in the string match method looking for all instances of the pattern rather than just the first.

```js
let str = 'foo bar baz bar 42 zoo bar';
// doing s global Match
let match = str.match(/bar/g);
console.log(match); // ['bar', 'bar', 'bar']
console.log(match.index); // undefined
```

However there is a problem the result is an array of matches for the pattern that contain the text of the pattern match, but not the index values in the source string. This is one of the reasons why one might want to take a look at what there is to work with in the Regular expression prototype, namely the RegExp.exec method. More on that later on in this post when I get to alternatives to the string match method. For now lets look at just some more basic examples of string match.

### 1.4 - Yet another basic example

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

### 2.1 - Making a method that will work like the index of method

For example say you want to write a method that will return the index of the first instance of a pattern match, or negative one if it is not found just like that of the index of method. For this I would just set the value of the result of a match to a variable and then just use the result as the expression in an if statement. In the event that the value is null that will evaluate to false, and the code in the if statement will not run, at which point I can use the return keyword to return a value of -1. In the event that one or more matches are returned that will result in a non empty array that evaluates to true, and the code inside the if statement will run. Inside the body of this if statement I can return the index of the match.

```js
// getFooIndex method using String.match that will
// return -1 when null is returned
let getFooIndex = (str, patt) => {
    let m = str.match(patt);
    // if not null return index
    if (m) {
        return m.index;
    }
    // else return -1
    return -1;
};
let str1 = 'This string has a foobar here';
 
console.log(getFooIndex(str1, /foo/)); // 18
console.log(getFooIndex(str1, /baz/)); // -1
```

So the possibility of null being returned by the String.match method is something to look out for when using it.

### 2.2 - Return an empty array in place of -1, and get all indices with a little help from exec

The above method is just like the index of method, but one draw back is that this method will always just return the first index from left to right and then -1 of nothing is found. However what if I want a method that will return an empty array if no matches are found, an array with just one element for a non global flagged pattern, and an array for all matches in the event that there is a global flag set for the pattern? When trying to find out how to do this with the string match method alone one will run into problems when it comes to trying to get an array of index values rather than values for the pattern. This is just one of the limitations of the string match method, and is therefor a reason to look into the exec method of the Regex class.

```js
// getFooIndices method using String.match that will
// return [] when null is returned, else one or more index
// values in an array for each match if global
let getFooIndices = (str, patt) => {
    let m = str.match(patt);
    // if not null return index
    if (m) {
        if (m.index === undefined) {
            var result,
            indices = [];
            // use exec to get all
            while (result = patt.exec(str)) {
                indices.push(result.index);
            }
            return indices;
        }
        // just the one
        return [m.index];
    }
    // none
    return [];
};
 
let str1 = 'This foo example string is a string that has more than one foo';
console.log(getFooIndices(str1, /foo/g)); // [5, 59]
console.log(getFooIndices(str1, /foo/)); // [5]
console.log(getFooIndices(str1, /bar/g)); // []
```

I can still start with the string match method though, and use the fact that it will return null as a way to find out if I should return an empty array or not. Things just get a little tricky when it comes to what needs to happen when there is more than one match, and to be able to handle things with global and non global patterns. I first need to check if the index property of a match is undefined or not, as I can not just uses exec in a while loop the way I would like to as that would result in an infinite loop with non global patterns. So if there is an index prop, then I just need to use that to get by array with just one index value. If the index prop is undefined though, that means that there was more than one match, and then I can use the exec method.

There is more than one way of doing this sort of thing of course, and I will be getting more into this subject later in this post.

## 3 - Single pattern match and more than one match with the String match method.

When using the String.match method there might be some additional properties attached to the Array that might be returned when it is called depending on the flags set for the regular expression pattern, and if there is more than one match or not when using a global pattern. So the return value possibles for String.match is a little weird depending on the situation with the pattern that is given as well as the nature of the string that the method is called off of. If there is no match at all the return value is null, if there is one match there is an array with an index and input keys attached, and if there is more than one match when using a global pattern there will be an array of results with the string values for each match, and no properties attached. So then in this section I will be going over the nature of the object that is returned.

### 3.1 - The type and class of the response when there is one or more matches

I have covered what the return value is when there is no match which is of course a null value, but when it comes to what is returned when there is a match the type of the value is an object. When it comes to checking out the constructor name it would seem that it is an array, but it is an array with some additional values attached that I will be getting to.

```js
let str = 'This is some foo text';
 
let a = str.match(/foo/);
console.log(typeof a, a.constructor.name); 'object' 'array'
```

### 3.2 - For a single match we have some additional properties

If there is one match, and only one match there is an index and input value attached to the array. However if I amusing a global pattern these values become undefined.

```js
let str = 'This foo text is some foo type text';
 
let a = str.match(/foo/);
console.log(a.index); // 5
console.log(a.input); // 'This foo text is some foo type text'
 
let b = str.match(/foo/g);
console.log(b.index); // undefined
console.log(b.input); // undefined
```

### 3.3 - Yet another examples

Here is yet another example of the situation with this.

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