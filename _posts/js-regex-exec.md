---
title: Get all index values of a RegExp with the exec RegExp prototype method in javaScript
date: 2020-07-08 12:15:00
tags: [js]
layout: post
categories: js
id: 678
updated: 2021-08-26 19:14:38
version: 1.16
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

So there is getting some basic info of the first match of a pattern in a string. However what if I want an array of objects for each instance of a pattern match in a string? The exec method can be used to make a method that can do just that, and in this section I will be going over a basic starting point for this kind of method. In addition I will also go over a few more examples of this kind of method that will start to be a little more refined.

### 2.1 - A first working example of a get all index values method

So say I have a pattern with a global flag set, and a string that has two or more instances of that pattern. What I want is an array of objects that each have an index property for the starting index value for each instance of the pattern in the given string. The exec method can be used in conjunction with a loop such as a while loop to keep looping, calling exec each time until a null value is returned. Each time a pattern is found the result can be pushed to an array, building this array of results for each match.


```js
var getIndexValues = function (str, regex) {
    var patt = new RegExp(regex), // creating a new regEx Object from the given one
    match,  // to hold a current match result
    matchArray = []; // the array of matches
    if (patt.global) {
        while (match = patt.exec(str)) {
            matchArray.push(match);
        }
    } else {
        match = patt.exec(str);
        if (match) {
            matchArray.push(match);
        }
    }
    return matchArray;
};
 
var str = 'so Then this is a only a tEst of String Things',
patt = /[A-Z]/g; // pattern to match for Capital letters
 
// using getIndexValues gives me an array of all pattern matches
var matches = getIndexValues(str, patt);
console.log(matches);
/*
[
    ['T', index: 3, input: 'so Then this is a only a tEst of String Things'], 
    ['E', index: 26, input: 'so Then this is a only a tEst of String Things'], 
    ['S', index: 33, input: 'so Then this is a only a tEst of String Things'], 
    ['T', index: 40, input: 'so Then this is a only a tEst of String Things']
];
*/
```

So great that is the basic idea of what I would want, now it is just a matter of just making a few simple changes when it comes to the state of the Objects. There are certain additional values that I might want, such as the ending index of each pattern match. In this example it might not matter, but with other patterns that would be needed. In addition I might not want or even really need the original text for each object. Still this is a good start when it comes to making this kind of method.

### 2.2 - Making a get all index values with custom formated objects

I would just need to make a single simple change to the basic get index values method to get a result that is a little cleaner. The only change really that I think helps right away is to just push a new object with my own set of properties rather than just pushing the raw result of the exec method. The result is a cleaner, eaiser to follow set of plain old objects where I have a text property for the text of the match, and not just an index value but and end index value also. This data can then be used to help with any search and replace options later.


```js
var getIndexValues = function (str, regex) {
    var patt = new RegExp(regex), // creating a new regEx Object from the given one
    match, // to hold a current match result
    matchArray = []; // the array of matches
    if (patt.global) {
        while (match = patt.exec(str)) {
            matchArray.push({
                text: match[0],
                index: match.index,
                endIndex: match.index + match[0].length
            });
        }
    } else {
        match = patt.exec(str);
        if (match) {
            matchArray.push(match);
        }
    }
    return matchArray;
};

var str = 'If a=400, a2=10, and b=a*a2 then b=4000',
patt = /\S+=\d+/g;

var matches = getIndexValues(str, patt);
console.log(matches);
/*
[{
        text: 'a=400',
        index: 3,
        endIndex: 8
    }, {
        text: 'a2=10',
        index: 10,
        endIndex: 15
    }, {
        text: 'b=4000',
        index: 33,
        endIndex: 39
    }
]
*/
```

## 5 - Conclusion

So the exec method of a RegExp instance is what there is to work with when it comes to getting all instances of a pattern in a string when it comes to using native javaScript by itself. There is of course the string methods such as [match](/2019/04/06/js-string-match/), and [replace](/2019/04/08/js-string-replace/). However those are string methods that will not effect the state of an RegExp instance, and also they do not give me the results that I want when it comes to global matching.