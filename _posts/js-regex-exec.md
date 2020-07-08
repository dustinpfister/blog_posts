---
title: Get all index values of a RegExp with the exec RegExp prototype method in javaScript
date: 2020-07-08 12:15:00
tags: [js]
layout: post
categories: js
id: 678
updated: 2020-07-08 12:39:44
version: 1.3
---

The [exec method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) of the [RegExp class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) in javaScript is what I have come to find is useful for getting an array of index values for each instance of a pattern that can be found in a string.

The RegExp exec method will execute a search for the pattern that it is call off of for the given string, and will return a result array if a match is found, or null if no match is found. In addition regular expressions have a [last index](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) property that will be updated each time the exec method is called. So the exec method can be used with a loop of some kind along with the global flag to get all index values of the pattern in a string that is passed as the first argument when calling exec.

<!-- more -->


## 1 - A Basic exec method example

Lets start out with just a basic example of this exec method of the RehExp Class in javaScript. So the first thing is to have a pattern, I will not be getting into regular expressions in detail here as I have all ready [wrote a post on the basics or the RegExp class](/2019/03/20/js-regex/). So just create a new regular expression by one means or another by way of the RegExp constructor function called with the new keyword, or the literal syntax. Once we have a pattern of what to look for then it is just a matter of calling the exec method off of the regular expression instance and passing a string to which we are going to look for the pattern. The result will be a result array, or the null value if an instance of the pattern is not found.

```js
var pat = /foo/,
m = pat.exec('This is all foobar');
 
console.log(m[0]); // 'foo'
console.log(m.index) // 12
console.log(m.input) // 'This is all foobar'
```

## 2 - Get all index values in a string

```js
var getIndexValues = function (str, regex) {
    var r = new RegExp(regex),
    m,
    arr = [];
    if (r.global) {
        while (m = r.exec(str)) {
            arr.push(m);
        }
    } else {
        m = r.exec(str);
        if (m) {
            arr.push(m);
        }
    }
    return arr;
};
 
var formated = function (str, regex) {
    return getIndexValues(str, regex).map(function (m) {
        return m + m.index;
    }).join(',')
}
 
var str = 'so Then this is a only a tEst of String Things';
 
console.log(formated(str, /[A-Z]/));
// T3
console.log(formated(str, /[A-Z]/g));
// T3,E26,S33,T40
```