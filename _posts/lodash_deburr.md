---
title: The lodash deburr method, and Latin Unicode Block char removal
date: 2019-10-03 15:50:00
tags: [lodash]
layout: post
categories: lodash
id: 541
updated: 2021-12-02 10:57:57
version: 1.13
---

When it comes to Unicode blocks there are the first few blocks that have to do with Latin characters such as [Latin 1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_%28Unicode_block%29), and [Latin A Extended Unicode](https://en.wikipedia.org/wiki/Latin_Extended-A). These kinds of characters come up now and then for cretin words that come from languages like Spanish, and many other such latin based languages outside that of English. If for some reason I might be interested in just simply converting these kinds of strings into a string that contains just the first few ASCCI range characters I can used the [lodash deburr method](https://lodash.com/docs/4.17.15#deburr) to make quick work of that kind of task. This method in lodash just simply takes away any additional accent over a letter and just converts into a plain English style letters form of the word.

<!-- more -->

## 1 - Latin 1 Supplement, Latin Extended A, and Unicode blocks in general

The lodash deburr method has to do with converting certain characters in the [Unicode Blocks](https://en.wikipedia.org/wiki/Unicode_block) called Latin 1 Supplement and Latin A Extended Unicode into basic Latin characters that are found within plain old [ASCII](https://en.wikipedia.org/wiki/ASCII) or the [Basic Latin Unicode code block](https://en.wikipedia.org/wiki/Basic_Latin_%28Unicode_block%29). In this section I will be starting out with just some basic examples of the deburr method in lodash, In a later section of this post I will then be getting into some vanilla javaScript source code examples of deburr.

The examples in this section should prove to be fairly simple, but I still assume that you know enough about javaScript to get up and running with using lodash in a javaScript environment of one kind or another. If nt you might want to take a step back and look into some kind of [getting started with javaScript](/2018/11/27/js-getting-started/) type post.


### 1.1 - A basic example of the lodash deburr method

The situation might be one where I am dealing with text that contains words like "Jalapeño", and I would like to run that text thre a method that will spit out "Jalapeno" So with that said a basic example of the lodash deburr method would just involve calling the lodash deburr method and passing the raw text to it as a first argument, the returned result will then be the same text but with the [diacritical marks](https://en.wikipedia.org/wiki/Diacritic) removed.

```js
let spanish = 'Jalapeño';
 
console.log(_.deburr(spanish));
// Jalapeno
```

The word given is in Spanish, and I just want the word to be in a form that just uses characters in the first Unicode Block

## 2 - Conclusion

So that is just about it for now at when it comes to this deburr method in lodash at least. There is getting into Unicode to greater deal of depth, but there are other great sources on that so far and I have many other posts to write as well as edit and expand on.