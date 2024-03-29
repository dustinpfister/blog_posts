---
title: lodash split and String.split for splitting a string into substrings
date: 2018-12-03 16:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 343
updated: 2022-01-24 11:09:46
version: 1.21
---

So now and then when making a project with javaScript, there might be a need to split a string into an array of strings by a given separator pattern in the form of a string or a regular expression. In [lodash](https://lodash.com/) there is the [\_.split](https://lodash.com/docs/4.17.11#split) method, and there is also a [native javaScript split method](/2021/07/14/js-string-split/) as well in the String prototype object that can be used to do break a string down into an array of sub strings. 

This is not a method in lodash that does a good job of supporting a case to use the full lodash library these days as the native array split method is well supported, and the lodash split method does not really bring anything more to the table compared to other lodash methods where that is the case at least.

Use of a split method in lodash or vanilla javaScript comes up a lot when researching javaScript code examples for various things, so if you are new to javaScript this is one of many methods that should be well understood. 
<!-- more -->

## 1 - Basic example of \_.split

For a basic example of the \_.split method in lodash say you have a serialized string of css property and value pairs and you want an array of pairs rather than just a string. The \_.split method can be used to break the string into such an array by using the semicolon as a separator. Just pass the string as the first argument, and then the semicolon as the second argument. 
The resulting array that will be returned is then an array of substrings of property and value pairs for css rules.

```js
let css = 'color:red;font-size:12pt;font-family:arial;';
 
let props = _.split(css,';', 2);
 
console.log(props);
// [ 'color:red', 'font-size:12pt' ]
```

Although the lodash spit method works just fine for this sort of thing it is not so hard to do the saem with just plain old vanilla javaScript. There is the string split prototype method, and then there is using other methods, and regular expressions as a way to break a string down and get what you want out of it. So lets look at some more examples using lodash, and plain old javaScript for spiting strings and other related topics.


## 2 - Chaining with \_.split

### 2.1 - The lodash chain method

To chain with split the [lodash \_.chain method](/2018/11/11/lodash_chain/) can be used as one way to do so in lodash. Just call the chain method and pass the string as the first argument to the chain method. Lodash methods such as lodash split, as well as many other lodash methods such as join and chunk can also be used just like that of native javaScript.

```js
let css = 'color:red;font-size:12pt;font-family:arial;';
 
let arr = _.chain(css)
.split(';')
.join(':')
.split(':')
.chunk(2)
.initial()
.value();
 
console.log(arr);
// [ [ 'color', 'red' ],
//  [ 'font-size', '12pt' ],
//  [ 'font-family', 'arial' ] ]
```

The one difference is that you will want to end the chain by calling value so that a value is returned.

### 2 2 - The lodash flow method

ANother option for chaining is the [lodash flow method](/2018/11/19/lodash_flow/) that works by passing an array of functions that are to be preformed in order, the return value of flow is then a function that will use this array of functions.

```js
let css = 'color:red;font-size:12pt;font-family:arial;';
 
let toArr = _.flow([
    (css) => {
        return _.split(css, ';')
    },
    (arr) => {
        return _.compact(arr);
    },
    (arr) => {
        return _.map(arr, (str) =>{
            return _.split(str, ':');
        })
    }
]);
 
console.log(toArr(css));
// [['color', 'red'], ['font-size', '12pt'], ['font-family', 'arial']]
```

## 3 - Using regex

A regular expression can be used as the separator, rather than a static string. This is useful if I want some kind of pattern to be used as a way to break the string down rather than a static fixed string value. I will not be getting into depth with regular expressions here in this section of course as I have all ready [wrote a post in which I am dong that with regular expressions](/2019/03/20/js-regex/) in which I keep editing and expanding. However I think at least one if not more examples are called for when it comes to this subject.

```js
let names = 'foo_81628bar_42foobar_7771234';
 
let items = _.split(names, /_\d+/);
 
console.log(_.initial(items));
// [ 'foo', 'bar', 'foobar' ]
```

## 4 - Conclusion

That is all for now when it comes to lodash split, as well as some related topics such as the native string split method. If you are using lodash just for this method alone doing so is very silly, as such a task can be done with javaScript by itself just fine. The lodash split method is there more or less for the sake of consistency, because it is often desired to use the method in a chain alone with other lodash methods where there may not be a native counter part such as with [lodash chunk](/2017/09/13/lodash-chunk/).

If you enjoyed this post there is checking out my [main post on lodash](/2019/02/15/lodash/), as well as maybe one of my many other [posts on various other lodash methods and lodash related topics](/categories/lodash). However it would seem that a lot of developers are loosing interest in lodash, or think that it is no longer needed. So then there is also the idea of looking more into what there is to work with when it comes to javaScript by itself also. With that said I have a lot of posts in which I am [writing about native javaScript features](/categories/js), that include posts on simple [javaScript projects examples](/2021/04/02/js-javascript-example/) in which I am just making a simple projects with vanilla javaScript alone.

