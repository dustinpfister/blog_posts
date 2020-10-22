---
title: regex patterns in javaScript
date: 2019-03-20 19:48:00
tags: [js]
layout: post
categories: js
id: 405
updated: 2020-10-22 12:55:37
version: 1.31
---

When working on a javaScript project there might be a need now and then to do some text pattern matching operations with [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). For example in the event that I am making some kind of parser I would need to find patterns for beginning and ending tags, or other elements of the language that I am parsing. Regular expressions can be combined with various methods in the RegExp class as well as other classes to get an array of character index values of various patterns that have to do with the nature of the language.

There is not just the nature of the regular expressions themselves, but also the nature of the methods that are used that will take a regular expression as an argument, or can be called off an instance of a regular expression. So in this post I will be covering some basic examples of regular expressions in javaScript that can be used to text search and replace tasks.

<!-- more -->

## 1 - regex basics

In javaScript a regex, regexp or regular expression is a way to achieve text pattern matching, or search and replace tasks. There are ways of defining the patten to look for, and then there are String prototype methods that make use of these patterns to find one or more matches for that pattern in a given string, as well as replacing any and all matches with something else. In this section I will be going over the very basics of regular expression in javaScript including how to make one and how to use one.

### 1.1 - Creating a regex pattern

To create a regular expression the [RegExp constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) can be used to create an expression from a string, the other way is to use the regular expression literal syntax. When using the constructor the first argument will be a string of the pattern, and the second argument will contain one or more option flags for the pattern, more on that later. When creating a string representation of the pattern make sure to double up on the backslashes when they are needed, more on backslashes later as well.

```js
// when using the RegEx constructor backslashes must be doubled up.
let pat_datfile = new RegExp('dat_\\d+\\.json','gi');
 
console.log('filename: dat_20120822.json'.match(pat_datfile)[0]);
// 'dat_20120822.json'
 
// or the literal syntax can be used.
let pat_datfile_lit = /dat_\d+.json/gi;
 
console.log('-- dat_20120822.json -- dat_2013.json'.match(pat_datfile)[1]);
// 'dat_2013.json'
```

I generally prefer to go with the literal syntax, but a javaScript developer should be familiar with both options.


### 1.2 - Using a regular expression

There is knowing how to create a pattern, and then there is knowing how to use one. For the most part there are two String prototype methods to be aware of then it comes to this [String.match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match), and [String.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace). 

```js
let data = 'regexp is **good** for pattern matching tasks',
change = data.replace(/\*\*good\*\*/, 'great');
console.log(change); // 'regexp is great for pattern matching tasks'
```

I will not be getting into these methods in detail here as I have wrote posts on both the [match](/2019/04/06/js-regex/), and [replace](/2019/04/08/js-string-replace/) methods. However I will be going over a few typical regular expression patterns and examples that I find myself using from time to time in the remainder of this post.

## 2 - regular expression flags

When it comes to creating a regular expression it is possible to st one or more [flags for the pattern](https://javascript.info/regexp-introduction). These flags can be used as a way to indicate things like if all instances of a pattern should be match or not.

### 2.1 - the global search flag

The global search flag is more often then not the way to go about searching for all instances of a pattern rather than just the first in the string. For example just searching for the pattern foo in a string with two foo patterns will result in just the first foo from the left of the string forward. However the use of the global flag will result in both instances of the foo pattern being matched.

```
let text = 'this is some foo text that contains more than one foo';
 
let a = text.replace(/foo/, 'bar');
let b = text.replace(/foo/g, 'bar');
 
console.log(a);
// 'this is some bar text that contains more than one foo'
console.log(b);
// 'this is some bar text that contains more than one bar'
```

## 3 - Assertions in regular expressions

With [regular expressions Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions) are one element of a regular expression that have to do with setting boundaries. Such as creating a pattern that will only look at the very beginning of a string for a pattern rather than the whole of the text.

### 3.1 - Match the beginning of a string

To match the begging of a string I just need to use the ^ symbol followed be the pattern I want to match for. There are many instances where I need to check for some kind of pattern that should start are each line, such is the case with the output of a command such as the [Linux Aspell](/2020/10/20/linux-aspell/) command for example. So this feature of a regular expression will come into play often when it comes to filtering threw some output of a command or something such as that.

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

### 3.2 - Match the end of a string

The dollar sign symbol can be used to test for a pattern that is to be expected at the end of a string rather than that of the beginning. So often I might use this to look for something that is used to end a line such as a line break or a semicolon.

```js
let str = 'foo,bar,baz',
 
m = str.match(/baz$/);
 
console.log(m.index); // 8
```

### 3.3 - Match a word boundary

Yet another assertion that can prove to be useful now and then is the word boundary assertion. This assertion is created with a backslash followed by a lower case b. What is nice about this assertion is that it can be used to match only the beginning or ends of words in a string, or anything that is separated by whitespace.

```js
let text = 'thats excellent that we have some example text';
// pattern with a \b world bounder assertion
let patt = /\be\S+/ig;
console.log( text.replace(patt, 'match') );
// 'thats match that we have some match text'
```

## 4 - Use case examples of regular expressions in javaScript

Learn by example, and lean by doing, that might be the best way to go about getting regular expressions in javaScript solid once and for all. In other words it is best to just start creating and maintaining some projects that make use of regular expressions. Just reading about them alone is just not enough speaking from my experience at least. Although it would be best to come up with your own ideas for projects that ake use of regular expressions, in this section I might touch base on at least a few starting points that come to mind.

Also in this section I might just park a bunch of examples that are common solutions for common problems that can be solved with regular expressions. Such as a pattern that can eb used to match the content between to instances of a kind of pattern for example.

### 4.1 - Matching html tags, and negated character sets

A task that comes up often for me is to find a way to match html tags in a string and replace them with something else, or remove them completely. For this I have found that a a negated character set is a good way to go about matching anything and everything that might be in the tag except the ending pointy bracket.

```js
let html = '<p>This is some html with a <a href=\"https://foo.com\">link<\/a> in it<\/p>',
html_nolinks = html.replace(/<a [^>]*>|<\/a>/gi,'');
 
console.log(html);
// <p>This is some html with a <a href="https://foo.com">link</a> in it</p>
console.log(html_nolinks);
// <p>This is some html with a link in it</p>
```

### 4.2 - Match all between two instances of a string

When it comes to the mark down of my blog posts there is from data at the top of each file that is between two instances of three dashes. If I want to match that I have worked out this pattern.

```js
let text = '--- title: foo --- bla bla beween --- other: stuff ---'
console.log(text.match(/---[\s|\S]*?---/g)[0]);
// --- title: foo ---
```

## 5 -Conclusion

Of course this post does not do regular expressions justice, as there is way more to write about when it comes to them. I will update this post from time to time of course as I keep running into more note worthy things to write about when it comes to them, but it might be best to just keep paying around with them in order to get a sound grasp on regex. There are also other tools at your disposal when it comes to these kinds of tasks, and sometimes it is necessary to make use of those as well rather than depending completely on regex.

