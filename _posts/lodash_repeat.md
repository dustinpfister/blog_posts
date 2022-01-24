---
title: lodash repeat method
date: 2019-06-28 19:06:00
tags: [js,lodash]
layout: post
categories: lodash
id: 494
updated: 2022-01-24 10:51:38
version: 1.16
---

This post is on the [lodash repeat](https://lodash.com/docs/4.17.11#repeat) method which is a string method that is just a quick way of creating a new string that is a product of repeating another given string a number of given times. This is something that comes up now and then when working with projects, and it is kind of nice to have a quick convenience method in place to save me the trouble of having to do this myself each time. 

Still it is not to hard to just do the same thing vanilla javaScript style so lets look at more than one solution for repeating a string a number of times whe it comes to just using native javaScript by itself also.

<!-- more -->

## 1 - lodash repeat basic example

So say I want to create a string that is a single string repeated a few times. For example I want to have a string that is a one with a whole bunch of zeros after it. I could do something like just having two strings one of which is a string of the number one and the other is a bunch of zeros, and just add them together. However what if the number of number one might change to something else, or the number of zeros will change? In that case I will want some kind of method where I can pass a string, and a number of times I want that string repeated, and then add my first value to the result of that method.

With that said if the full lodash utility library is available there is the lodash repeat method to work with then it comes to this sort of thing. I can  then use the lodash repeat method as a way to do just that and just get a string that is a fixed number of zeros. Just call the lodash repeat method and pass the string 0 as the first argument followed by the number of zeros I want after the string.

```js
let bil = '1' + _.repeat('0', 9);
console.log(bil); // 1000000000
```

Simple enough, but how hard is it to just do this with plain old vanilla javaScript? not so hard, so lets look at some vanilla javaScript examples that do the same thing. Also lets explore some other topics as well such as how to go about doing the same thing only with arrays and objects.

## 2 - Other lodash methods

The lodash fill method will create and return a new string with a given source string and a number of times you would like to have that string repeated. However there are a whole lot of other methods in lodash to be aware of when it comes to preforming similar tasks, as well as various other related tasks to what it is that the lodash repeat method does. In this section then I will be going over some additional lodash methods beyond just simply that of the lodash repeat method, but at this time I will not be getting into what there is to work with when it comes to javaScript alone. That I will reserve for a later section in this post if you would like to skip ahead to that though.

### 2.1 - What about arrays and objects? Check out \_.times

A similar method that comes to mind is the [lodash times](/2017/10/11/lodash_times/) method. This method is a method that just simply called a given function a number of given times. It is a quick convenient way of doing something that would otherwise require writing a loop.

```js
// the same can be done as
// with repeat
let str = '1';
_.times(9, () => {
    str += '0';
});
console.log(str);
// 1000000000
 
// but it can also be used
// with anything that can be
// placed in a function
let arr = [1, 2, 3],
str2 = '';
_.times(3, () => {
    str2 += _.join(arr, ',') + ',';
});
let arr2 = _.dropRight(_.split(str2,','),1);
console.log(arr2);
```

## 3 - Repeating with other lodash methods like fill, and join to create a string

So there is the lodash repeat method when it comes to string methods, but then there are other methods such as the lodash fill array method. The lodash fill method is another method to be aware of when using lodash as it does more or less the same thing as lodash repeat only with arrays rather than strings.

There is using the main lodash function as a way to wrap a new array that has a given element length, then using the fill method off of that to fill the array with zeros. After that I can then call the join method that will unwrap the whole thing and return a string. When using the join method I can pass an empty string that will result in nothing between the zeros.

```js
let str = 1 + _(new Array(8)).fill('0').join('');
console.log(str); // '100000000'
```

## 4 - vanilla javaScript alternatives to lodash \_.repeat and \_.times

In this section I will be looking at some options when it comes to doing the same ting as the \_.repeat method only with just plain old vanilla javaScript by itself.

### 4.1 - Making a repeat method with a while loop.

No to hard to just making my own repeat method with a while loop after all. Sometimes I like to do this when it comes to lodash methods, most of the time it is supper easy to just put something together. However I have to admit doing this does have a tenancy to eat up a little time.

```js
let repeat = (str, c) => {
    str = str || '0';
    c = c || 1;
    let i = c,
    result = '';
    while (i--) {
        result += str;
    }
    return result;
}
 
let bil = '1' + repeat('0', 9);
console.log(bil); // 1000000000
```

### 4.2 - Making a times, and repeat array method without lodash

Making my own times method is not a big deal as well. The thing about it is that making a lot of these methods from the ground up is not so hard. It is not always the case with some lodash methods, such as merge, but it is not a big deal to make a high order function that accepts a function as an argument and then calls that function inside a few times.

```js
let times = (count, func) => {
    let i = count;
    while (i--) {
        func();
    }
};
 
let repeatArray = (arr, count) => {
    let str = '',
    arr2;
    times(3, () => {
        str += arr.join(',') + ',';
    });
    arr2 = str.split(',');
    arr2.pop();
    return arr2;
};
 
console.log( repeatArray([1,2,3], 3));
```

## 5 - Conclusion

So the lodash repeat method is just a quick convenience method that can help to quickly do something that is not to hard with just plain old vanilla javaScript my itself. There is a lot of talk about the relevance of lodash these days as a lot of the functionality is baked into javaScripot itself. In addition a lot of the methods are like this that do not make a great case for the use of lodash compared to just working within the scope of native javaScript by itself.
