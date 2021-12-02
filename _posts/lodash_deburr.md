---
title: The lodash deburr method, and Latin Unicode Block char removal
date: 2019-10-03 15:50:00
tags: [lodash]
layout: post
categories: lodash
id: 541
updated: 2021-12-02 10:26:30
version: 1.8
---

When it comes to Unicode blocks there are the first few blocks that have to do with Latin characters such as [Latin 1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_%28Unicode_block%29), and [Latin A Extended Unicode](https://en.wikipedia.org/wiki/Latin_Extended-A). These kinds of characters come up now and then for cretin words that come from languages like Spanish, and many other such latin based languages outside that of English. If for some reason I might be interested in just simply converting these kinds of strings into a string that contains just the first few ASCCI range characters I can used the [lodash deburr method](https://lodash.com/docs/4.17.15#deburr) to make quick work of that kind of task. This method in lodash just simply takes away any additional accent over a letter and just converts into a plain English style letters form of the word.

<!-- more -->

## 1 - Latin 1 Supplement, Latin Extended A, and Unicode blocks in general

The lodash deburr method has to do with converting certain characters in the [Unicode Blocks](https://en.wikipedia.org/wiki/Unicode_block) called Latin 1 Supplement and Latin A Extended Unicode into basic Latin characters that are found within plain old [ASCII](https://en.wikipedia.org/wiki/ASCII) or the [Basic Latin Unicode code block](https://en.wikipedia.org/wiki/Basic_Latin_%28Unicode_block%29).
### 1.1 - A basic example of the lodash deburr method

So a Basic example of the lodash deburr method might look like this then

```js
let spanish = 'Jalapeño';
 
console.log(_.deburr(spanish));
// Jalapeno
```

The word given is in spanish, and I just want the word to be in a form that just uses characters in the first Unicode Block

## 2 - Conclusion

So that is just about it for now at least. There is getting into Unicode to greater deal a depth, but there are other great sources on that so far. I guess there is also writing or finding a vanilla js alternative for this as well. If I get around to editing this maybe I will do just that.