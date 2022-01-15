---
title: lodash replace
date: 2019-04-01 19:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 409
updated: 2022-01-15 11:41:10
version: 1.18
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

If I want to replace more than one instance with the lodash \_.replace method, that can be done by passing a regular expression with the global flag set.

```js
let strP = '<p>this is an element</p>';
 
let strS = _.replace(strP,/p>/g,'span>');
 
console.log(strS); '<span>this is an element</span>'
```


## 2 - Vanilla javaScript and String.replace

Lodash replace is one of many methods in lodash that are somewhat redundant when it comes to what is available in plain old native javaScript by itself. The lodash \_.replace method is a String method, and in the [native javaScript String prototype there is the String.replace method](/2019/04/08/js-string-replace/) that works in more or less the same way as the lodash method.

Some methods in lodash do work a littler differently, for example the [\_.map](/2018/02/02/lodash_map/) method is a collection method that will work well on most objects in general while the Array.map method is just an Array prototype method. However when it comes to \_.replace there does not seem to be much of anything that really sets it apart. 

### 2.1 - Basic sample of String.replace

So the above basic example can also be done with the native String.replace like this.

```js
let str = 'Hello Mr Early Cuyler'.replace('Early Cuyler','Dan Halen');
console.log(str); // 'Hello Mr Dan Halen'
```

### 2.2 - Regex example of String.replace

And regular expressions can be done with it as well.

```js
let strP = '<p>this is an element</p>',
strS = strP.replace(/p>/g,'span>');
 
console.log(strS); // '<span>this is an element</span>';
```

## 3 - Conclusion

That will be it for now when it comes to the lodash replace method, as well as the native counterpart method at least as far as this post is concerned between now and the time that I come around to do a little more editing at least.
