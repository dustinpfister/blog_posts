---
title: The lodash deburr method, and Latin Unicode Block char removal
date: 2019-10-03 15:50:00
tags: [lodash]
layout: post
categories: lodash
id: 541
updated: 2021-12-02 11:30:07
version: 1.22
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

### 2.2 - Replacing the letters

The full deal when it comes to just raiding the lodash source code will involve some additional code in two other source files of interest. One of which is the [deburrLetter file](https://github.com/lodash/lodash/blob/master/.internal/deburrLetter.js) in the internal folder, and the other is the [base property of file](https://github.com/lodash/lodash/blob/master/.internal/basePropertyOf.js) also in the internal folder.

```js
// pattern used to match Latin letters in lodash deburr source code
// https://github.com/lodash/lodash/blob/master/deburr.js
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g

// https://github.com/lodash/lodash/blob/master/.internal/deburrLetter.js
/** Used to map Latin Unicode letters to basic Latin letters. */
const deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};
 
// https://github.com/lodash/lodash/blob/master/.internal/basePropertyOf.js
const basePropertyOf = function(object) {
  return (key) => object == null ? undefined : object[key]
}
 
const deburrLetter = basePropertyOf(deburredLetters)
 
let str = 'Jalapeño';
str = str.replace(reLatin, deburrLetter);
console.log(str); // Jalapeno
```



## 3 - Conclusion

So that is just about it for now at when it comes to this deburr method in lodash at least. There is getting into Unicode to a greater deal of depth, but there are other great sources on that so far and I have many other posts to write as well as edit and expand on. If you enjoyed this read you might consider checking out my [main post on lodash](/2019/02/15/lodash/) that I get around to editing now and then a little. There is also [many other posts on lodash](/categories/lodash/) that I have written thus far each of which I am to make follow a certain pattern when it comes to not just writing bout a lodash method but also some vanilla javaScript alternatives.


