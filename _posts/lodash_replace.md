---
title: lodash replace
date: 2019-04-01 19:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 409
updated: 2022-01-15 12:05:57
version: 1.23
---

The [lodash the replace](https://lodash.com/docs/4.17.11#replace) method can be used to quickly replace instances of a text pattern in a string with a static text value, or the result of a function call when it comes to generating some kind of replacement for each match. Although that pattern to look for can just be a simple string value, it might be best to just know how to use regular expressions to do the same with the [String.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method in native javaScript by itself. 

In any case both methods are fairly useful for search and replace operations with text in javaScript. There is not just being knowledgeable with the features of the methods, but also regular expressions, and advanced options when using a method for each instance of a pattern. So in this post I will be writing bout some quick examples on this subject of search and replace of text that comes up a lot when working out a javaScript project.

<!-- more -->

## 1 - lodash replace and what to know first

This is a post on the replace method in the javaScript utility library known as lodash. I assume that you know at least the very basics of how to get started with a user space library such as lodash in a client side or nodejs javaScript environment. If not getting into the very basics of lodash, and javaScript are outside the scope of this post. If you are still very new to javaScript in general you might want to take a step back and start out with some kind of [getting started with javaScript type post](/2018/11/27/js-getting-started/).

One or more of the examples in this section will also involve the use of regular expressions. Regular expressions come in handy when it comes to replacing not just all instances of a pattern, but also more complex patterns that are not static fixed collections of characters. I will not be getting into detail with regular expressions here, as I have [wrote a post on regex](/2019/03/20/js-regex/) where I do just that. So it would also be a good idea to read up more on regular expressions before looking into the lodash replace method, or any kind of other means to go about preforming search and replace tasks with text.

### 1.1 - basic example of lodash replace

So if I just want to replace the first instance of a text pattern in a string when reading it from left to right, and lodash is part of the stack, then the \_.replace method could be used to do just that very easily. Just pass in the string as the first argument, followed by the pattern to look for, and then finally the text to replace the pattern to look for.

```js
let str = _.replace('Hello Mr Early Cuyler','Early Cuyler','Dan Halen');
 
console.log(str); // 'Hello Mr Dan Halen'
```

So when it comes to simple examples like this then the lodash replace method is fairly easy and straight forward to use. However what if I want to replace all instances of a pattern? Also in some cases I might not be able to just use a fixed, static, text string as the pattern to look for, or for what is to be used as a replacement. For example you might want to replace the text pattern \-\- with \<hr\> but you do not want to replace \<\-\- with \<\<hr\>. So to not end up doing that you would want to use a regular expression to make sure that only the desired instances of something are changed. So lets look at some more examples that have to do with regular expressions, and the use of methods as a way to help with processing instances of a pattern.


### 1.2 - Using regex to replace all instances of a text pattern

If I want to replace more than one instance with the lodash \_.replace method, that can be done by passing a regular expression with the global flag set. However that is just one of the many other little features of regular expressions, they can be used to do just about everything and anything that will come up when it comes to these kinds of tasks.

```js
let strP = '<p>this is an element</p>';
 
let strS = _.replace(strP,/p>/g,'span>');
 
console.log(strS); '<span>this is an element</span>'
```

### 1.3 - Using a function to generate a replacement

One more note worthy feature of the lodash replace method is that the replacement does not need to be a fixed static string value, it can be a function that is used to generate a value for a match. Also in the body of the function that is given as a way to create a replacement, the match will be provided to the function as the first argument.

```js
let source = 'This {98} string has some {123} patterns with numbers {56} ';
let b = _.replace(source, /\{\d+\}/g, (a)=>{
    return _.chain(a).split('').map((el)=>{
        return el === '{' || el === '}' ? '' : Math.pow(2, parseInt(el)) + '-';
    }).join('').value();
});
console.log(b);
// 'This 512-256- string has some 2-4-8- patterns with numbers 32-64-'
```

## 2 - Vanilla javaScript and String.replace

Lodash replace is one of many methods in lodash that are somewhat redundant when it comes to what is available in plain old native javaScript by itself. The lodash \_.replace method is a String method, and in the [native javaScript String prototype there is the String.replace method](/2019/04/08/js-string-replace/) that works in more or less the same way as the lodash method.

Some methods in lodash do work a littler differently, for example the [\_.map](/2018/02/02/lodash_map/) method is a collection method that will work well on most objects in general while the Array.map method is just an Array prototype method. However when it comes to \_.replace there does not seem to be much of anything that really sets it apart. 

### 2.1 - Basic sample of String.replace

So the above basic example in the getting start with lodash replace can also be done with the native String replace prototype method. I can just call replace off of the string value, and then the string I want to match, then the replacement when it comes to that kind of example.

```js
let str = 'Hello Mr Early Cuyler'.replace('Early Cuyler','Dan Halen');
console.log(str); // 'Hello Mr Dan Halen'
```

### 2.2 - Regex example of String.replace

Just like with that of the lodash replace method, regular expressions can be used with the string replace method also. For example say that I want to replace all instances of a a paragraph element as a span element. This can be done by matching the common ending part of the paragraph element and setting the global flag for the regular expression.

```js
let strP = '<p>this is an element</p>',
strS = strP.replace(/p>/g,'span>');
 
console.log(strS); // '<span>this is an element</span>';
```

## 3 - Conclusion

That will be it for now when it comes to the lodash replace method, as well as the native counterpart method at least as far as this post is concerned between now and the time that I come around to do a little more editing at least. For now there is checking out one of my [many other posts on lodash](/categories/lodash/) if you like, but it might be best to look more into regular expressions if you have not done so all ready. With that said one good read on this might be my post on the [exec method of the built in expression class](/2020/07/08/js-regex-exec/) that is one method that is useful for finding all matches in a string value.
