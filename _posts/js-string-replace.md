---
title: String Replace prototype method in javaScript
date: 2019-04-08 15:03:00
tags: [js]
layout: post
categories: js
id: 413
updated: 2020-07-18 07:59:24
version: 1.11
---

The [String Replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method in the String prototype object of core javaScript comes in handy when it comes to most text search and replace tasks involving regular expressions. I just call the method off of the string, pass a regular expression as the first argument, and then a string, or method to generate a string as the second argument. The result is all instances of the pattern in the string being replaced with what I give as the second argument.

In order to really get into using replace it is important to get up to speed with [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), a subject that I hate, but never the less when it does come to search and replace, and matching tasks with text regular expressions are a very powerful tool for doing so.


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

## 3 - Replacing something that is between two patterns

A command task that a development might run into now and then is how to go about replacing something that is between two patterns of one kind or another. Say you have some markdown that has tables in it, but you want the tables removed. Such a task can be done with the string replace method and the right pattern.

I have come to find that something like the following works for me when I want to remove the beginning table of my mark down source files.

```js
let str = 'This is some text that also ' +
'---\n' +
'foo: bar \n' +
'n: 42 \n' +
'---\n' + 
'has some tables in it, but I do not want theme there for some reason.';
 
let result = str.replace(/---\n[\s|\S]*?---\n/, '');
 
console.log(result);
// 'This is some text that also has some tables in it, but I do not want theme there for some reason.'
```

The pattern will of course need to be tweaked a little down and then, but the basic idea is there. 

### 3.1 - Replacing what is between two patterns with something involving what is between them

So I could replace what is between the two patterns with just an empty string or other static text. However I could also make something new with the content that is between then also of course. This just needs to involve using a function in place of a string as the value for what to replace. The function will then be used as a way to generate content.

So I could use the string replace method as a way to start replacing instances of a table in some markdown, but then I can use the string replace method again in the body of the function that I give the string replace method.

```js
let str = 'foo bar foo bar \n' +
    '---\n' +
    'foo: bar \n' +
    'n: 42 \n' +
    '---\n' +
    'foo bar foo bar';

let result = str.replace(/---\n[\s|\S]*?---\n/, (table) => {
        return table.replace(/---/, '<pre>')
        .replace(/---/, '</pre>');
    });

console.log(result);
// 'foo bar foo bar 
// <pre>
// foo: bar
// n: 42
// </pre>
// foo bar foo bar'
```