---
title: The lodash _.join method, and Array.join
date: 2018-08-11 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 256
updated: 2020-06-21 10:52:12
version: 1.15
---

So with [lodash](https://lodash.com/) as well as with plain old vanilla js there are the methods [\_.join](https://lodash.com/docs/4.17.15#join) in lodash, and [Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) when it comes to native javaScript. After taking a look at the source code for [lodash 4.17.15](https://raw.githubusercontent.com/lodash/lodash/4.17.15-npm/core.js) it would appear that the lodash \_.join method is just one of several methods in lodash that is just a wrapper for a native javaScript method in this case Array.prototype.join. This might seem pointless, but it does help to keep things consistent when it comes to just referencing native javaScript methods from within lodash.

In any case this is a method that come sup a lot when working out all kinds of solutions for problems when working in a javaScript programing environment. The join method can be used to join all the elements of an array together with a given separator between each element, furnishing a string from those array elements. It can be thought of as the opposite of [\_.split](/2018/12/03/lodash_split/), or [String.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) that can be used to split a string down into an array of elements with a given separator. In any case this post will outline some examples of joining the elements of a javaScript array together into a string using the join method.

<!-- more -->

## 1 - what to know

This is a post on the lodash method \_.join, as well as the corresponding Array.prototype.join method that is being referenced. The join method in general then in javaScript is used to join an array of elements together into an string. So this will not be a getting started post on lodash, or javaScript in general. In addition to this I assume that you have at least a little background with javaScript, and how to get started with lodash or any javaScript asset before hand.

## 2 - Basic example of joining an Array in javaScript with \_.join, and Array.join.

For a basic example of the join methods I put together some examples that involve an array of folder names that need to be combined together into an string that can be used as a corresponding path with a '\/' separator. Maybe not the best use case example, especially if you are working in a nodejs environment as the [path.join method](/2017/12/27/nodejs-paths) should be used there for something like this, but still it should server the purpose of a simple example.

### 2.1 - joining an array of strings that represent folder names into a path using \_.join

To use the lodash method I just need to call \_.join, pass the array, and then give the separator that I want between elements when making the string. This will give me a string that will work okay as a path in some cases. If I all ready have a string that is formated in a way in which there is a '\/' separator between folder names I can use the \_.split method to split that string into an array of elements, reversing the process.

```js
var str = _.join(['home','dustin','github','test_lodash'], '/');
console.log('str:', str);
console.log('join:', str); 
console.log('split back:', _.split(str,'/'));
 
// 'str:' 'home/dustin/github/test_lodash'
// 'join:' 'home/dustin/github/test_lodash'
// 'split back:' [ 'home', 'dustin', 'github', 'test_lodash' ]
```

### 2.2 - The same example using Array.join

The [native Array.join method](/2020/03/09/js-array-join/) works in very much the same manor only it is a prototype method of Array, so I call it as such, and only give the separator.

```js
var str = ['home','dustin','github','test_lodash'].join('/');
console.log(str); 
console.log(str.split('/'));
//'home/dustin/github/test_lodash'
// [ 'home', 'dustin', 'github', 'test_lodash' ]
```

## 3 - lodash join and chaining methods

So in lodash one way to go about chaining methods together is by using the [\_.chain](/2018/11/11/lodash_chain/) method. To do this I call the \_.chain method, pass the array, and then I can call lodash methods off of the resulting object just like in native javaScript. I just need to call value at the end to get the final value in the case a string.

```js
let arr = [0, 1, 2, 3, 4, 5]
// simple chain example
// using _.map, _.join and then
// creating the string value
let str = _.chain(arr)
    .map((n) => {
        return Math.pow(n, 2);
    })
    .join(':')
    .value();
console.log(str);
// 0:1:4:9:16:25
```

## 4 - Conclusion

The Array.join method has been in the javaScript spec for ages making \_.join one of the method in lodash where there is not much point of it being there aside from just making this consistent in the code, as this native method has great browser support going way back. Do not assume that this is the case of all lodash methods though, with some of them like [\_.map](/2018/02/02/lodash_map/), and [\_.fill](/2017/09/26/lodash_fill/) this is not the case.