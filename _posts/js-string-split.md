---
title: The string split method in javaScript
date: 2021-07-14 10:39:00
tags: [js]
layout: post
categories: js
id: 910
updated: 2021-12-11 09:20:18
version: 1.30
---

There are still many basic features of javaScript that I have not got around to writing a post on still such as the [String Split prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split). The string split method is simple enough in the sense that I can just call the method off of an instance of a string and pass a string that is a separator char that will be used to split the string into an array of sub strings. However there is maybe a bit more to write about when it comes to using the string split method in conjunction with many other native javaScript features. For example there is the question of how to go about converting an array of substrings back to a string, when it comes to that there is the array join method. Also there is what to do with an array of substrings once it has been split into an array, so I should make a few examples that involve the other array methods such as array map.

<!-- more -->


## 1 - Basic examples of String Split

To start off this post I think it might be best to start out with just some very basic examples of the string split method. The first step in the process of working with this method is to first have a string value to call the method off of in the from of a string literal or a string value stored in a variable, or as a return value of a function. In any case if there is a string value to work with the string split method can be called off of the string as with any other string prototype method. However after that I will also want to pass a value to the string split method that will be used as a way to find out what the separator should be to create the array of sub strings from the string.

### 1.1 - Basic comma separator example

In this example I have a string with some words that are separated with a comma. What I want is an array of strings where each element is a string of the word. To do this I just need to call the string split method off of the string and pass a comma as the first and only argument to the string split method.

```js
// a string
var str = 'foo,man,chew';
// using String split method to create an array from the string
var arr = str.split(',');
console.log(arr[0]); // 'foo'
```

### 1.2 - Using a space

I do not have to use commas only of course when it comes to a static value that will be used as a separator. In may situations I will want to create an array of words where a space is what will be between each word. The string split can then also be used to create this kind of array also, however there may also be additional steps I might want to take with this sort of thing, more on that later when I get into use case examples.

```js
var str = 'These are some words';
var arr = str.split(' ');
console.log(arr); // [ 'These', 'are', 'some', 'words' ]
```

### 1.3 - Using an Empty String

Another static value option that I think I should mention is an empty string. This will prove to be useful if I want each character in a string to become and element in the resulting array.

```js
var str = '123456';
var arr = str.split('');
console.log(arr); // [1,2,3,4,5,6]
```

### 1.4 - Using a regular expression

So far I have just covered simple example of the string split method that involve the use of a static string value to be used as a way to define what should be used to find what will be used to separator the substrings in the array. However what if what I want to split a string by is not a fixed static value like a comma or a space, but some kind of patter> For these kinds if situations a [regular expression](/2019/03/20/js-regex/) can be used as a way to create a separator that is a kind of pattern rather than a fixed static value.

```js
var str = 'This is some text 123 more text 7 also numbers 1 in here';
var arr = str.split(/\d+/);
console.log(arr);
// [ 'This is some text ', ' more text ', ' also numbers ', ' in here' ]
```

## 2 - Array prototype methods and string split

The String split method will create and return an array of substrings from a given array. So then it is called for to cover some of the [array prototype methods](/2018/12/10/js-array/) in this post and how they related to the use of the string split method. The reason why is that when it comes to creating some kind of real project I never just use the string split methods by itself. Often I will preform some additional actions on the return array of substrings with one or more array methods. In some cases there is also create a new single string again which in turn also brings up the subject of array prototype methods with in some to the array join method that comes to mind first and for most when it comes to thus subject.

### 2.1 - The String Split method and the array join method

The [array join](/2020/03/09/js-array-join/) method is something that I should also bring up when it comes to the string split method while I am at it. The reason why I say that is that what the string split method does is create an array of substrings from a string, so then there should be an array method that will create a string from an array of substrings. When it comes to this there is the array join method that can be used to do so.

```js
var nums = '1,2,3,4'.split(',').map((str)=>{ return Math.pow(2, parseInt(str))}).join('-');
console.log(nums); // 2-4-8-16
```

## 3 - Regular expressions and spslit split

I have covered a simple example of using a regular expression rather than just a simple static pattern in the basic section of this post. In this section I will be looking into the use of regular expressions and the string split method in greater detail as I thin it is called for to have more examples of this sort of thing.

### 3.1 - Creating an array from one or more date string formats

One thing that might come up is how to go about creating an [array of values from a date string that might have more than one kind of separator between the parts of the date](https://stackoverflow.com/questions/3559883/javascript-split-regex-question). For this kind of situation I can one again use a regular expression I will just want to use what square brackets to create a kind of [group or range of characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges) to look for.

```js
var createDateArray = function (dateString) {
    return dateString.split(/[.,\/ -]/)
};
 
console.log( createDateArray('05/25/2021') );
console.log( createDateArray('02.13.2020') );
```

### 3.2 - line breaks

Another good example of this would be a method that will create and return an array of lines a line break pattern is used as a way to create a separator. The kind of pattern to look for will change a little depending on the operating system used, but there are ways of looking for both.
 
```js
var createLinesArray = function (text) {
    return text.split(/\n|\r\n/);
};
 
// Linux / Mac
 
var text1 = 'This is a line\n' +
'and then this is anoter. \n' +
'The end.';
console.log(createLinesArray(text1));
// [ 'This is a line', 'and then this is anoter. ', 'The end.' ]
 
var text2 = 'In Windows\r\n' +
'There is another pattern,\r\n' +
'used.';
console.log(createLinesArray(text2));
// [ 'In Windows', 'There is another pattern,', 'used.' ]
```

## 4 - Use case examples of String Split

I have covered a whole bunch of simple examples of the string split method. However thus far I have not got into any actual use case examples that are simple examples of how this method will prove to be useful in certain situations. With that said there is a whole world of examples in which the string split method might prove to be useful, however in this section I will just be going over a few basic use case examples.

### 4.1 - create an array of words

One use case that might come up often is to create a method that will be used to create an array of words from a string of text. Making this kind of method might not always just simply involve using the string split method with a space as the separator. Additional tasks might also need to be preformed on the source text, or the resulting array, such as making sure the string is lowercase, and removing any unwanted characters. So then I might want to also use the to lower case method, and maybe also the [string replace method](/2019/04/08/js-string-replace/) with a regular expression that will help remove charterers that I do not want in the substrings.

```js

var tokens = function (string) {
    var patt_unwanted = /[,\?!]/g;
    return string.toLowerCase().replace(patt_unwanted, '').split(' ');
};
 
var text = 'Okay so then, this is some text! What do you think?',
arr = tokens(text),
wc = arr.length;
 
console.log(arr); 
// ['okay', 'so', 'then', 'this', 'is', 'some', 'text', 'what', 'do', 'you', 'think']
console.log(wc); // 11
```

### 4.2 - default arguments

One thing that I have seen when looking at source code examples is the use of the string split method as a way to make an array of values from string that will then be used as default values for a function. This might not be the most compelling use case example of the string split method, but I thought I would just add this in as just on eof these use case examples of string split.

```js
var foo = function (a, b, c, d) {
    var defaults = '2,4,5,10'.split(','),
    i = 0,
    len = foo.length,
    ar = arguments;
    while (i < len) {
        ar[i] = ar[i] === undefined ? defaults[i] : ar[i];
        i += 1;
    }
    return Math.pow(ar[0], ar[1]) + ar[2] * ar[3];
};
 
console.log( foo() ); // 66
console.log(foo(3, 2, 1, 1)); // 10
```

## 5 - Conclusion

So then the string split method is one of many useful prototype methods that can be called off of an [instance of a string](/2019/01/25/js-javascript-string/) in javaScript. A while back I also wrote a post on the [lodash split method](/2018/12/03/lodash_split/) that would seem to work more or less the same way as the string split method. There are some methods in lodash that add additional functionality beyond what there is to work with when it comes to javaScript alone, but I would not say that the split method in lodash is the best method to support a case for that.


The string split method by itself is not all that hard to work with, but things can get a little involved when it comes to using the string split method with every else there is to work with in order to preform some kind of task. With that said there are all kinds of examples that might involve spiting a string into an array, doing something with that array with the array prototype methods, and then join it back into a string. I may have cover a few of these such examples here, but I might get around to expanding this post with a few more such examples if and when I get around to doing so.