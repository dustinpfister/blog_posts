---
title: The lodash deburr method, and Latin Unicode Block char removal
date: 2019-10-03 15:50:00
tags: [lodash]
layout: post
categories: lodash
id: 541
updated: 2021-12-02 11:23:55
version: 1.20
---

When it comes to Unicode blocks there are the first few blocks that have to do with Latin characters such as [Latin 1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_%28Unicode_block%29), and [Latin A Extended Unicode](https://en.wikipedia.org/wiki/Latin_Extended-A). These kinds of characters come up now and then for cretin words that come from languages like Spanish, and many other such latin based languages outside that of English. If for some reason I might be interested in just simply converting these kinds of strings into a string that contains just the first few ASCCI range characters I can used the [lodash deburr method](https://lodash.com/docs/4.17.15#deburr) to make quick work of that kind of task. This method in lodash just simply takes away any additional accent over a letter and just converts into a plain English style letters form of the word.

There are many methods in lodash to which there is a native javaScript method counterpart, such as the deal with the lodash foreach method and the javaScript array for each method. However when it comes to the deal with for each the lodash method is not at all the same thing as the array for each method as the lodash for each method is a collection method that will work with objects in general, not just arrays. There may be some lodash methods that are just referencing native methods though, however the lodash deburr method is not one of those methods. It would seem that there is no native method for this sort of thing, so if you are not going to use lodash deburr then one will have to come up with some kind of vanilla javaScript solution for this.

<!-- more -->

## 1 - Latin 1 Supplement, Latin Extended A, and Unicode blocks in general

The lodash deburr method has to do with converting certain characters in the [Unicode Blocks](https://en.wikipedia.org/wiki/Unicode_block) called Latin 1 Supplement and Latin A Extended Unicode into basic Latin characters that are found within plain old [ASCII](https://en.wikipedia.org/wiki/ASCII) or the [Basic Latin Unicode code block](https://en.wikipedia.org/wiki/Basic_Latin_%28Unicode_block%29). In this section I will be starting out with just some basic examples of the deburr method in lodash, In a later section of this post I will then be getting into some vanilla javaScript source code examples of deburr.

The examples in this section should prove to be fairly simple, but I still assume that you know enough about javaScript to get up and running with using lodash in a javaScript environment of one kind or another. If nt you might want to take a step back and look into some kind of [getting started with javaScript](/2018/11/27/js-getting-started/) type post.


### 1.1 - A basic example of the lodash deburr method

The situation might be one where I am dealing with text that contains words like "Jalapeño", and I would like to run that text threw a method that will spit out "Jalapeno" So with that said a basic example of the lodash deburr method would just involve calling the lodash deburr method and passing the raw text to it as a first argument, the returned result will then be the same text but with the [diacritical marks](https://en.wikipedia.org/wiki/Diacritic) removed.

```js
let spanish = 'Jalapeño';
 
console.log(_.deburr(spanish));
// Jalapeno
```

The word given is in Spanish, and I just want the word to be in a form that just uses characters in the first Unicode Block

## 2 - Vanilla javaScript alternatives to lodash deburr

So you do not want to add lodash to the stack of your project just to use this one method, and maybe one or two others if that. I hear you, many of the methods in lodash strike me as unneeded clutter that I rarely and in many cases never use when working on an actual project rather than just some quick hello world style code examples for a post like this. The thing about this specif deburr method though is that it would seem that there is no way to create a vanilla javaScript solution that is just a simple one liner, or even just a few lines of code. It should not be to hard to understand why that is by just taking a moment to thing about what this method does. When doing so the basic idea of making a vanilla javaScript method would have to involve some kind of regular expression that will match the Latin characters that I want to replace, and then there is the matter of how to go about replacing them with the desired character in ASCII code block range.

So then I will need to use the string replace prototype method and pass a pattern that will match the Latin characters as the first argument, and then pass a function for the second argument that will map the wanted ASCII chars to the locations in the source string. The process will then be a little involve, and the solution that I have made for this involved diving deep into the lodash source code actually.

### 2.1 - Starting out with the regular expression

The first thing to work out, or discover in my case, is to have a regular expression that will match the Latin charterers. When it comes to reading the lodash source code there is the [deburr.js file](https://github.com/lodash/lodash/blob/master/deburr.js) at the root of the lodash source. This file contains a regular expression that seems to be the pattern that is used for the deburr method. When it comes to working with this directly with a little javaScript code that pattern seems to work as expected when it comes to matching at least.

```js
// pattern used to match Latin letters in lodash deburr source code
// https://github.com/lodash/lodash/blob/master/deburr.js
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g
 
let str = 'Jalapeño';
str = str.replace(reLatin, '*');
console.log(str); // Jalape*o
```

So that part was simple enough when it comes to just looking into the source code of lodash at least rather than coming up with my own pattern that will do the same thing in a different way, in which case even this part might not be so simple. In any case this as I see it is the easy part, just matching the letters with a regular expression. The hard part now is how to go about replacing these letters with the characters that I want in the ASCII range.

### 2.2 - 



## 3 - Conclusion

So that is just about it for now at when it comes to this deburr method in lodash at least. There is getting into Unicode to a greater deal of depth, but there are other great sources on that so far and I have many other posts to write as well as edit and expand on. If you enjoyed this read you might consider checking out my main post on lodash that I get around to editing now and then a little. There is also many other posts on lodash that I have written thus far each of which I am to make follow a certain pattern when it comes to not just writing bout a lodash method but also some vanilla javaScript alternatives.


