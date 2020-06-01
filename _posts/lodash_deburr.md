---
title: lodash deburr and latin 1 Unicode car removal
date: 2019-10-03 15:50:00
tags: [lodash]
layout: post
categories: lodash
id: 541
updated: 2020-06-01 15:33:08
version: 1.5
---

When it comes to Unicode blocks there are the first few blocks that have to do with Latin characters. These kinds of characters come up now and then for cretin words that come from languages like Spanish. If for some reason I might be interested in just simply converting these kinds of strings into a string that contains just the first few ASCCI range characters I can used the [lodash deburr method](https://lodash.com/docs/4.17.15#deburr). This method in lodash just simply takes away any additional accent over a letter and just converts into a plain English style form of the word.

<!-- more -->

## 1 - Latin 1 Supplement, Latin Extended A, and Unicode blocks in general

The lodash deburr method has to do with converting certain characters in the [Unicode Blocks](https://en.wikipedia.org/wiki/Unicode_block) called [Latin 1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table) and [Latin A Extended Unicode](https://en.wikipedia.org/wiki/Latin_Extended-A) into basic Latin characters that are found within plain old [ASCII](https://en.wikipedia.org/wiki/ASCII) or the [Basic Latin Unicode code block](https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)).


So A Basic example of the lodash deburr method might look like this then

```js
let spanish = 'Jalapeño';
 
console.log(_.deburr(spanish));
// Jalapeno
```

The word given is in spanish, and I just want the word to be in a form that just uses characters in the first Unicode Block

## 2 - Conclusion

So that is just about it for now at least. There is getting into Unicode to greater deal a depth, but there are other great sources on that so far. I guess there is also writing or finding a vanilla js alternative for this as well. If I get around to editing this maybe I will do just that.