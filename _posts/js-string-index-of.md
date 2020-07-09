---
title: js string index of method and other ways of getting index values in strings
date: 2020-07-09 08:59:00
tags: [js]
layout: post
categories: js
id: 679
updated: 2020-07-09 18:03:58
version: 1.9
---

The javaScript [string index of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method was introduced to javaScript a real long time ago. It is one of these javaScript prototype methods that is very safe to use because it was around almost since the beginning as the method works even in versions of Internet explorer as old as version 3.

The string index of method will give an index value of a character in a string from the right to left that is the beginning of another string that is given as the first argument. In the event that at least one instance of the given string is found it will return an index value, in the event that it is not it will return the number negative one.

So then this string index of method in the string prototype object will work just fine when it comes to using strings rather than regular expressions, and if I am just interested in the first instance of a substring in another string from left to right. However in some situations I might want to get all index values of a fixed string, or even a pattern of sorts. When it comes to this the index of method falls short. To get all index values it would be better to use the [exec method](/2020/07/08/js-regex-exec/) of the [regular expression](/2019/03/20/js-regex/) class rather than string index of method.

In addition to the index of property method there are other string prototype methods of interest such as string match, and string replace. When it comes to getting the index value of strings that fit a non fixed static pattern the match method might be a better choice. In addition the replace method is a better choice if you want to replace all instances of a sub string. Still this is a post mainly on the index of method so lets look at a few simple examples of the string index method here, and also maybe touch based on some related topics without getting into to much detail as i would on my posts on those methods.

<!-- more -->

## 1 - String index of method basic example

So then the basic idea of the string index of method here is that if you have a string with at least one instance of a sub string in it then index of can be used to get the character index value of that sub string. Just call the index of method off of the instance of the string, and pass the sub string as the first argument. If the substring is there then it will return and index value.

```js
let str = 'This is all foobar and foo as well as bar',
i = str.indexOf('foo');
 
console.log(i); // 12
```

So it works as expected of course, but you might have noticed that there is more than one instance of the sub string in the source string that the method was called off of. The index of method can not be used to get an array of index values for a sub string if there is more than one instance. The method also always goes from left to right rather than the opposite of that. In addition it just gets an index value, and does not help with injecting or replacing something. There is also the fact that it will only work with a stri8ng value when it comes to giving something to look for. With that said it does have its short comings, but if that is all you want it will of course work, and also you do not have to worry at all about code breaking because this method has been around for ages.

## 2 - The String index of method will return -1 if the substring is not there

If a sub string is not found this will result in the index of method returning a value of negative one. This can be used in a simple expressions as a way to find out if some additional action should happen or not. Say for example filtering the values of an array that contains mixed values some of which are strings, and some of which might contain a fixed substring or not.

```js
let a = ['foobar', 'foo', '27bar', false, 'chew', 'madfoochew', 'fooish', 24, 42, null, 'fool'];
 
let b = a.filter((str) => {
        return String(str).indexOf('foo') >= 0;
    });
 
console.log(b);
// [ 'foobar', 'foo', 'madfoochew', 'fooish', 'fool' ]
```

So in some situations where we are dealing with a fixed string rather than some kind of pattern that might be subject to a degree of variation the index of method still of course works with what it was intended for. However there are still other options that might prove to be a better course of action in general anyway.

## 3 - Getting an array of index values by making a method with index of, split, map, and filter

So if I really want to I can get an array of index values with the index of method it is just that I can not do so with the index method by itself. I can of course make a method that would work with a string of words by pulling the string split method into the mix as a way to convert a string to an array. Once I have an array I can then use the map and filter array prototype methods. I can then use the index of method with each element in the resulting array that is a string to find out if one word in a string of words contains a substring or not. If so I can use the index value that is returned along with an additional value that I tabulate with the word length and the length of the separator that is a space. The result is a method that will return an array of index values for each sub string.

```js
let getIndexValues = (str, substr, sep) => {
    let index = 0;
    sep = sep === undefined ? ' ' : sep;
    return str.split(sep).map((word, wordIndex) => {
        let i = word.indexOf(substr),
        b;
        if (i >= 0) {
            b = index + i;
        } else {
            b = -1;
        }
        index += word.length + sep.length;
        return b;
    }).filter((i) => {
        return i != -1;
    });
};
 
let str = 'This is all foobar and foo as well as bar';
console.log(getIndexValues(str, 'foo')); // [ 12, 23 ]
```

It is crude yet effective, but a better way still as I have mentioned earlier is to use the exec method of a regular expression. A method like this will still not work with patterns rather than static strings, although I guess I could easily make some chances to this and use the string match method rather than index of.

## 4 - Conclusion

So the index of string method is a crude tired yet true way of getting the first index value of a sub string in a string that the method is called off of. There are other ways of doing the same thing such as with the string match method, but the index of method has been around for a long time, and will still work when just working with fixed string values as patterns to search for where I only care about the first match from left to right if any.