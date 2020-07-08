---
title: Get all index values of a RegExp with the exec RegExp prototype method in javaScript
date: 2020-07-08 12:15:00
tags: [js]
layout: post
categories: js
id: 678
updated: 2020-07-08 12:33:33
version: 1.2
---

The [exec method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) of the [RegExp class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) in javaScript is what I have come to find is useful for getting an array of index values for each instance of a pattern that can be found in a string.

The regexp exec method will execute a search for the pattern that it is call off of for the given string, and will return a result array if a match is found, or null if no match is found. In addition regular expressions have a [last index](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) property that will be updated each time the exec method is called. So the exec method can be used with a loop of some kind along with the global flag to get all index values of the pattern in a string that is passed as the first argument when calling exec.

<!-- more -->


## 1 - A Basic exec method example

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