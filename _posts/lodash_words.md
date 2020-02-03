---
title: Get an array of words from a string using Lodash or native javaScript AKA Lexical Analysis Tokenization
date: 2019-09-17 14:10:00
tags: [lodash]
layout: post
categories: lodash
id: 535
updated: 2020-02-03 05:32:05
version: 1.6
---

In lodash there is the words method that can be used to quickly preform [lexical analysis tokenization](https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization) of a string. In other words the [lodash words](https://lodash.com/docs/4.17.15#words) method is used to split a string into an array of words. In some cases this could be easily done with the split method, but it is not always so cut and dry. There are text samples that might contain certain characters that are to be cut out or included in the process for example. So that being said there is a need for some kind of Tokenizer method that is better suited for the task of creating an array of words from a text sample. 
The lodash words is one such method that seems to work okay, but there are other methods of doing this with plain old native javaScript by itself also. In addition if you really want to get into lexical analysis there are of course additional javaScript dependencies outside of lodash that are of interest when it comes to this. So with that said lets take a look at the lodash words method as well as some additional alternatives when it comes to getting an array of words from a string with javaScript.

<!-- more -->

## 1 - What to know before hand with lexical Tokenization in javaScript

So there is just simply getting an array of words from a string, which can be a somewhat trivial matter that at times might prove to be not so trivial some times. In this post I am mainly going to just be writing about doing just that with lodash, and native javaScript. If you really want to get into lexical analysis there is a javaScript dependency called natural that might be of interest. This package has of course a tokenizer, but it also has many other methods that have to do with lexical analysis. I will not be getting into that id depth here, but I did write a [post on natural](/2017/12/11/nodejs-natural-language-facility/) a while back.

## 2 - The javaScript get words method in lodash

If The full lodash version of lodash is part of the stack of the project that you are working on there is the \_.words method that can be used to quickly get an array of words from a text sample in a string. The default pattern that is used should work okay in most situations, but if for some reason it does not it is possible to override that pattern by passing a pattern to use as the second argument when using the method.

```js
let text = 'So lets have some fun today',
words = _.words(text);
console.log(words);
// ['So', 'lets', 'have', 'some', 'fun', 'today']
```

So for the most part the lodash words method works okay as a basic javaScript get words method if you prefer to just call it that, but it might also be referred to as a lexical analysis tokenizer method that is something that comes into play of course when it comes to getting into lexical analysis when can be an interesting topic.

## 3 - Using a custom pattern

In some situations I might want to do some processing for the text before hand, or use a custom pattern that can be given as the second argument to lodash words. Say that I have some text that has camel case words in it, or in other words it has some words that start out lower case but then have an upper case letter in it. The default pattern that is used in lodash words will break that kind of word into two or more words, which might not be the result that I want.

```js
let text = 'This has the word javaScript in it';

// just using lodash words by itself will give an unexpected result
console.log( _.words(text) );
// [ 'This', 'has', 'the', 'word', 'java', 'Script', 'in', 'it' ]

// I could make all the words lowercase, but another option would be to use
// a regular expression pattern
console.log(  _.words(text.toLowerCase()) );
// [ 'this', 'has', 'the', 'word', 'javascript', 'in', 'it' ]
console.log(  _.words(text, /\w+/g) );
// [ 'this', 'has', 'the', 'word', 'javascript', 'in', 'it' ]
```

So then the solution is to make all the text lowercase before I pass it to lodash words, or use a custom pattern that will not split up words like that.