---
title: String Replace prototype method in javaScript
date: 2019-04-08 15:03:00
tags: [js]
layout: post
categories: js
id: 413
updated: 2021-08-26 18:53:29
version: 1.22
---

The [String Replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method in the String prototype object of core javaScript comes in handy when it comes to most text search and replace tasks involving regular expressions. I just call the method off of the string, pass a regular expression as the first argument, and then a string, or method to generate a string as the second argument. The result is all instances of the pattern in the string being replaced with what I give as the second argument.

In order to really get into using replace it is important to get up to speed with [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), a subject that can prove to be a little frustrating for many, but never the less when it does come to text search and replace tasks, and just matching tasks, regular expressions are a very powerful tool for doing so. With that said if you are not up to speed with regular expressions you might want to read up on them a little more before continuing.


<!-- more -->

## 1 - String Replace method basics

In order to use the the String.replace string prototype method it is important to have a fairly solid grasp on regular expressions. I will be covering some examples of them here in this post of course, but I will not be getting into regular expressions in detail here, as I have a [post where I have done so when it comes to regex](/2019/03/20/js-regex/). Be sure to check out that post, or one or more additional resources in regular expressions before getting into methods that make use of them such as string replace.

The basic idea of String.replace is to come up with a regular expression that will match one or more instances of a pattern that I want to replace with something else, and use that regular expression as the first argument for String.replace. The second argument then is the string to replace all matches for the pattern in the string to which the prototype method is being called off of. On top of static strings, a function can be used when it comes to generating variable strings, but more on that later.

For now lets just start out with a very simple example of this, and then progress forward from there. Say I have a string with two or more instances of the static text pattern *bad* and I want to replace each of them with another fixed pattern that is *good*. I can call the replace method off of the string, and then pass a regular expression that will match *bad* with the global flag set to true as the first argument. I can then pass the fixed string *good* as the second argument, and a new string with all instances of the pattern *bad* replaced with *good* will be the result.

```js
let str = 'It is a bad day to do bad things for bad people',
result = str.replace(/bad/g, 'good');
 
console.log(result);
// 'It is a good day to do good things for good people'
```

In this example I used the regular expression literal syntax rather than the constructor function with the new keyword to create a pattern that has the global flag set to true. The global flag is the little g at the end of the literal syntax created with forward slashes. If I did not use the global search lag only the first instance of the pattern would have been replaced.

So now that we have the basic example out of the way lets get into some more aspects of the replace method that are not so basic.

## 2 - Using a function to create replacement strings

In place of a static string as the replacement, a function can be used to generate replacement strings that will differ depending on the nature of the instance of the pattern match. For example if the pattern contains numbers or dates they can be extracted and used to generate the result in the string that will be used to replace the instance of the pattern in the source string that the replace method is called off of.

So then say that you have a string that contains instances of a few numbers. You can use a regular expression to match each number, and for each match a function that is given as the second argument will be called. In the body of that function the string value of the match will be available via the first argument of the function. This of course can then be used to create a new value to replace the old one by say, using it in the Math.pow method to create a power based off of each number in the string.

```js
let str = 'Some numbers for you are 2, 6, and 10 also.',
 
result = str.replace(/\d+/g, (num) => Math.pow(2, num));
 
console.log(result);
// 'Some numbers for you are 4, 64, and 1024 also.'
```

So that is a neat tick for string replacement related tasks that I am sure can come in handy now and then. Just this simple example of it is one thing, but say I want to replace all uppercase instances of tag names in an HTML string with lower case ones, this can be used as a way to do so real quick and easy like. There are all kinds of additional examples of this that come to mind that might help to gain a better understand of why string replace is so useful, but for now at least you should get the basic idea of using functions to generate replacement strings for matches of a pattern in another string.
### 2.1 - The offset value of a function can also be used in the process of creating replacement strings

So there are up to three arguments that can be used in the body of a function that is given to the string replace method in place of what would otherwise be just a static string value. The first argument as we know now is the value of the match, the second value is the index value of the match in the source string, and third value is the original value of the source string, in other words just the value of the strung that we are calling the method off of.

So if I have a string with a pattern, and I want to inject the index value sof each into the string, then I can do so just like this.

```js
let replacer = (match, offset, str) => {
    return offset;
};
let str = 'This string injectOffset where an offset value will be injected injectOffset each time';
console.log( str.replace(/injectOffset/g, replacer) );
// This string 12 where an offset value will be injected 64 each time
```

In some cases this value might be useful in the process of generating replacements where the index values of each pattern match are of interest. However there might be additional uses for this also as we get into the thick of the string replace method.

## 3 - Replacing something that is between two patterns

A common task that a development might run into now and then is how to go about replacing something that is between two patterns of one kind or another. Say you have some markdown that has tables in it, but you want the tables removed from some source text. Such a task can be done with the string replace method, the right pattern, and passing an empty string as the value to replace each pattern instance.

I have come to find that something like the following works for me when I want to remove the beginning table of my mark down source files. Something that I find myself doing each time I write scripts that have t do with tabulating things with the content of my site here, including this post that5 you are reading right now. So now we are getting into something that migh prove to be a little practical when it comes to using the string replace method in actual projects.

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

The pattern will of course need to be tweaked a little now and then, but the basic idea is there. 

### 3.1 - Replacing what is between two patterns with something involving what is between them

So I could replace what is between the two patterns with just an empty string or other static text with just fixed string value, or I could do something involving the use of a function like i covered earlier. However I could also make something new with the content that is between them also of course. This just needs to involve using a function in place of a string as the value for what to replace, and on top of that I can use the string replace method again, along with anything else to create the new string value. The function will then be used as a way to generate the new content between the two opening and closing text patterns.

So say I have all these tables that have data between a *\-\-\-* and another *\-\-\-* text pattern, and I want to replace them with *\<pre\>* and *\<\/pre\>*. I can use a similar pattern as I have covered just before in this section, only now I am targeting these markdown patterns for tables, and I just want the data to be in preformatted text elements when it comes to converting to html rather than tables as a markdown parser would by default.

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

## 4 - Using string replace as a way to get index values

So then the string replace method could be used as a way to go about getting an array of index values for each match of a patter actually. By passing a function rather than a fixed value for what to replace, and just push the index values to an array in the body of that method. I can then also push the value of the match, and both the index value of the character position in the source string, as well as the pattern index by just stepping a variable. I can pull all of this into a nice need little method like this.


```js
let getIndexValues = (source, pattern) => {
    let matches = [],
    i = 0;
    source.replace(pattern, (match, offset) => {
        matches.push({
            match: match,
            offset: offset,
            index: i
        });
        i += 1;
    });
    return matches;
};
 
var ex = getIndexValues('foo bar 42 40 bar chew', /bar/g);
 
console.log(ex);
// [ { match: 'bar', offset: 4, index: 0 }, { match: 'bar', offset: 14, index: 1 } ]
```

There is the issue of having the word replace in the body of a method that does not actually replace anything, as nothing is returned in the method, and any value that is return dis just disregard. So it might not be the best option in terms of code readability. Still I have come to find that this is a nice concise solution at least when it comes to getting an array of offset values for a pattern.

## 5 - Alternatives to string replace method

The string replace method works great, but there are some alternatives to using the string replace method. In some cases I might want to make some kind of custom replace method. Also in some cases I might not want to replace all instances of a pattern right away, but create some kind of array of objects for each match.

In this section I will be going over some alternatives to using the string replace method. many of these examples might involve other prototype methods in native javaScript, and not just in the string prototype. may frameworks might have methods like the ones I am working with here, but in this section I am going to just be making vanilla javaScripot solutions that do nit require some kind of library.

### 5.1 - basic replace method using String.split, Array.map, and Array.join

```js
var replace = function (source, sep, what, replace) {
    return source.split(sep).map(function (el) {
        if (el === what) {
            return replace;
        }
        return el;
    }).join(sep);
};
 
var a = 'foo,bar,bar,foo,bar';
var b = replace(a, ',', 'foo', 'bar');
console.log(b);
// bar,bar,bar,bar,bar
```

## 6 - Conclusion

So the string replace method is what I would use right off the bat then it comes to replacing one pattern of something with another using regular expressions and javaScript code. The string replace method is of course not the only method of interest in the string prototype object when it comes to working with regular expressions ans text. There is also the [string match](/2019/04/06/js-string-match/) method that is useful when it comes to just checking for matches and where they are in terms of index values in a source string without replacing anything. Although the same can be done with replace as I have covered here by just pushing the values given by a method passed to the replace method, and just disregarding any value that is returned by string replace.

However the string match method might not be the best tool for the job when it comes to just matching as there are even more methods of interest not in just the string prototype object, but the [regular expression prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object actually. I am taking about the exec method of the regular expression prototype, I have found that is of better value when it comes to getting an array of index value for all instances of a pattern. I have wrote [posts on the exec method](/2020/07/08/js-regex-exec/), as well as the [string index of](/2020/07/09/js-string-index-of/) method when it comes to how to go about getting all the index values of a pattern without replacing that might be worth checking out if you want to read more about regular expressions and strings.