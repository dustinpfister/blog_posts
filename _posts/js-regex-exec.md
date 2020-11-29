---
title: Get all index values of a RegExp with the exec RegExp prototype method in javaScript
date: 2020-07-08 12:15:00
tags: [js]
layout: post
categories: js
id: 678
updated: 2020-11-29 09:07:25
version: 1.10
---

The [exec method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) of the [RegExp class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) in javaScript is what I have come to find is useful for getting an array of index values for each instance of a pattern that can be found in a string. There might be a number of other ways to go about doing this, however the use of exec might be the best way to go about doing so rather than working out a solution with the string match method.

The RegExp exec method will execute a search for the pattern that it is call off of for the given string, and will return a result array if a match is found, or null if no match is found. In addition regular expression Object instances have a [last index](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) property that will be updated each time the exec method is called. So the exec method can be used with a loop of some kind along with the global flag to get all index values of the pattern in a string that is passed as the first argument when calling exec. 

So because each time the exec method is called an object with the index value of the beginning of a pattern  match is obtained, the exec method is great for creating an array of Objects with detailed information with each pattern match. So this makes the exec method a great solution for projects that are parsers, or any kind of project where an array of detailed pattern matching data is needed.

<!-- more -->


## 1 - A Basic exec method example

Lets start out with just a basic example of this exec method of the RegExp Class just to get the general idea of how it works. So the first thing is to have a pattern that will be used with a string value, I will not be getting into regular expressions in detail here as I have all ready [wrote a post on the basics or the RegExp class](/2019/03/20/js-regex/). So just create a new regular expression by one means or another by way of the RegExp constructor function called with the new keyword, or the literal syntax. 

Once we have a pattern of what to look for then it is just a matter of calling the exec method off of the regular expression instance and passing a string to which we are going to look for the pattern. The result will be a result array, or the null value if an instance of the pattern is not found.

```js
var pat = /foo/,
m = pat.exec('This is all foobar');
 
console.log(m[0]); // 'foo'
console.log(m.index) // 12
console.log(m.input) // 'This is all foobar'
```

The result array that is returned might be a little weird as the text of the pattern match is attached via a numbed index value, but the index of the pattern and the full original string value is attached via named key values. This sort of thing can be done with arrays in general as an array if just a kind of object in javaScript, although I am not sure I can say doing so is always such a great idea. In any case that is a matter for another post as getting into that would be off topic.

Anyway now that we have a basic example of exec out of the way we can get into something a little more involves that can be used as a way to get all instances of a pattern. The basic info that I would want is there with just one match, so now it is just a matter of getting the same set of info for all matches of a pattern in some given text.

## 2 - Get all index values in a string

So say I have a pattern with a global flag set, and a string that has two or more instances of that pattern. What I want is an array of objects that each have an index property for the starting index value for each instance of the pattern in the given string. The exec method can be used un conjunction with a loop such as a while loop to keep looping until a null value is reached. Each time a pattern is found the result can be pushed to an array, building this array of results for each match.

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

## 5 - Conclusion

So the exec method of a RegExp instance is what there is to work with when it comes to getting all instances of a pattern in a string when it comes to using native javaScript by itself. There is of course the string methods such as [match](/2019/04/06/js-string-match/), and [replace](/2019/04/08/js-string-replace/). However those are string methods that will not effect the state of an RegExp instance, and also they do not give me the results that I want when it comes to global matching.