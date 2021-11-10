---
title: regex patterns in javaScript
date: 2019-03-20 19:48:00
tags: [js]
layout: post
categories: js
id: 405
updated: 2021-11-10 10:33:41
version: 1.51
---

When working on a javaScript project there might be a need now and then to do some text pattern matching operations with [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). For example in the event that I am making some kind of parser I would need to find patterns for beginning and ending tags, or other elements of the language that I am parsing. Another thing might come up where I have a certain pattern in text that needs to be replaced with something else, and this pattern that I am looking for is not a fixed static text pattern. Regular expressions can be combined with various methods in the RegExp prototype as well as other build in prototypes, mainly the String prototype to get an array of character index values of various patterns that have to do with the nature of the language. Simply put to find Matches in a string, just for the sake of knowing if a pattern is in a string or not, or to preform some kind of replacement option, or creating some kind of result from one or more pattern matches.

So in this post I will be covering some basic examples of regular expressions in javaScript that can be used to text search and replace tasks, just for the sake of getting started with Regular expressions in javaScript. AFter that I will be getting into some of the various aspects of these patterns when  it comes to the many components that form one of these patterns. After that at the bottom of this post I will be getting into at least a few basic use case examples that I have made thus far when it comes to pattern matching. So then this post should start out simple enough for those of you that are new to this sort of thing, and then progress into various other aspects of regular expressions that might prove to be more up to speed with where I might be with pattern matching in javaScript.

<!-- more -->

## 1 - Some regex basic examples and other basic things to know

In javaScript a regex, regexp, or regular expression is a way to achieve text pattern matching, and search and replace tasks with strings. There are ways of defining the patten to look for, by using the [Regexp constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) or a regular expression literal pattern, and then there are String prototype methods that make use of these patterns to find one or more matches for that pattern in a given string. The two string prototype methods of interest would be the String Match, and String replace methods. There are also though a number of regular expression prototype methods that might also be of use in certain situations also though such as the [RegExp.exec method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

In this section I will be going over the very basics of regular expression in javaScript including how to make one and how to use one. This will very much be a basic section for people that are still fairly new to javaScript. However I still assume that you have at least some background on using javaScript, as this is not any kind of [getting started type post on javaScript](/2018/11/27/js-getting-started/) in general. It might also be a good idea to look more into String prototype methods more first of you have not done so thus far. If you just want to find out if a fixed static text pattern is in a string or not, using regular expressions might prove to be a bit overkill as there are methods like the [String indexOf method](/2020/07/09/js-string-index-of/) that will work fine for that by using a sub string value rather than a regular expression.

### - The source code examples here are on Github

If you want to you might want to check out my [test vjs github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-regex) where I store the source code examples I am writing about here in this post. This is also where I am parking all the source code examples on my other posts on vanilla javaScript, and I then to keep working on it a little often.

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

## 2 - Regular expression flags

When it comes to creating a regular expression it is possible to set one or more [flags for the pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags). These flags can be used as a way to indicate things like if all instances of a pattern should be match or not which would be the Global Search flag, or if the matching should not be case sensitive sense case sensitivity is the default for matching. Some of these flags have been an option for a log time, while others are more recent additions in late specs of javaScript. So when using them there is taking a moment to think in terms of how far back you want to go when it comes to supporting older platforms, and maybe fine other ways of doing what these flags do if you want to match things back farther. In any case flags are a major part of creating a regular expression instance so of course I will need to go over a few examples of flags here in this section.

### 2.1 - The Generate indices of matches flag - d 

The d flag can be used to generate index values for each sub string match in javaScript environments that support this flag. This can prove as a quick and convenient way to get index values for matches. However it might still be require to use other ways of doing this for the sake of getting code to work n older platforms. That is unless you do not need to worry about that in which case I have to say this is a very nice feature when it comes to flags.

```js
let text = 'this is some foo text that contains more than one foo';
let b = text.match(/foo/dg);
console.log(b.length); // 2
```

### 2.2 - The Global Search flag - g 

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

## 4 - Quantifiers

There are also [Quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers) that can be used to set a number of letters or expressions to match. For example I might be looking for a pattern that is composed of three dashes, but not 1, 2 or 4 dashes. I count just make a pattern that is three dashes, but a quantifier can also be used to do so with just one dash in the pattern. When it comes to a simple pattern such as this maybe it is not such a bing deal but if we are taking about some var more complex pattern then I do not want to have to repeat it a few times when writing the Regex. So then in this section I will be going over a few simple examples of Quantifiers with Regular expressions that might help to scratch the surface on this specific topic.

### 4.1 - Using an asterisk to match zero of more instances

Using an asterisk after something to match will mean to match the given pattern zero or more times. Say I am looking for a pattern that is of two dashes, but I want to also setter for a single dash actually if that is all there is. If I just use a double dash pattern alone with a sing that only has one dash that will result in null, if I use the plus sign qualifier that also will result in null as that will match one or more instances of a double dash. However if I use a asterisk that will work with matching just a single dash.

```js
let str = 'This is - text with some - stuff going on';
console.log( str.match(/--/) );  // null
console.log( str.match(/--*/) ); // ['-', index: 8]
console.log( str.match(/--+/) ); // null
```

### 4.2 - Matches at least n and at most m occurrences of a preceding item x{n,m}

Often I might want to match something between and including a certain minimum and max count of occurrences. For this there is using a Quantifier that starts out with an opening curly bracket, followed by a min number, then comma, max number and finally a closing query bracket that is placed after what it is that I want to quantify.

```js
let str = '- This - is a -- test --- -- - -';
let patt = /-{2,3}/g;
console.log( str.match(patt) );
// [ '--', '---', '--' ]
```

## 5 - Use case examples of regular expressions in javaScript

Learn by example, and lean by doing, that might be the best way to go about getting regular expressions in javaScript solid once and for all. In other words it is best to just start creating and maintaining some projects that make use of regular expressions. Just reading about them alone is just not enough speaking from my experience at least. Although it would be best to come up with your own ideas for projects that ake use of regular expressions, in this section I might touch base on at least a few starting points that come to mind.

Also in this section I might just park a bunch of examples that are common solutions for common problems that can be solved with regular expressions. Such as a pattern that can eb used to match the content between to instances of a kind of pattern for example.

### 5.1 - Matching html tags, and negated character sets

A task that comes up often for me is to find a way to match html tags in a string and replace them with something else, or remove them completely. For this I have found that a a negated character set is a good way to go about matching anything and everything that might be in the tag except the ending pointy bracket.

```js
let html = '<p>This is some html with a <a href=\"https://foo.com\">link<\/a> in it<\/p>',
html_nolinks = html.replace(/<a [^>]*>|<\/a>/gi,'');
 
console.log(html);
// <p>This is some html with a <a href="https://foo.com">link</a> in it</p>
console.log(html_nolinks);
// <p>This is some html with a link in it</p>
```

### 5.2 - Match all between two instances of a string

When it comes to the mark down of my blog posts there is from data at the top of each file that is between two instances of three dashes. If I want to match that I have worked out this pattern.

```js
let text = '--- title: foo --- bla bla between --- other: stuff ---'
console.log(text.match(/---[\s|\S]*?---/g)[0]);
// --- title: foo ---
```

### 5.3 - Wrap text method example

I was working where I needed to wrap text and have [found this solution for wrapping text](https://stackoverflow.com/questions/14484787/wrap-text-in-javascript) that seems to work well. So I made my own method that is based off of it that does not change much. If I want to break the result of it into an array of sub strings then I just need to call the [string split method](/2021/07/14/js-string-split/) off of the resulting string and use a line break as what to split by.

```js
var wrapText = function (str, width) {
    var patt = new RegExp('(?![^\\n]{1,' + width + ')([^\\n]{1,' + width + '})\\s', 'g');
    return str.replace(patt, '$1\n');
};
 
console.log(wrapText('this is some test text', 10).split('\n'));
// [ 'this is', 'some test', 'text' ]
```

## 6 -Conclusion

Of course this post does not do regular expressions justice, as there is way more to write about when it comes to using them in various types of projects that call for them. I will update this post from time to time of course as I keep running into more note worthy things to write about when it comes to them, but it might be best to just keep paying around with them in order to get a sound grasp on regex. There are also other tools at your disposal when it comes to these kinds of tasks, and sometimes it is necessary to make use of those as well rather than depending completely on regex.

