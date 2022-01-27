---
title: The lodash _.join method, and Array.join
date: 2018-08-11 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 256
updated: 2022-01-27 11:03:56
version: 1.23
---

So with [lodash](https://lodash.com/) as well as with plain old vanilla js there are the methods [\_.join](https://lodash.com/docs/4.17.15#join) in lodash, and [Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) when it comes to native javaScript. After taking a look at the source code for [lodash 4.17.15](https://raw.githubusercontent.com/lodash/lodash/4.17.15-npm/core.js) it would appear that the lodash \_.join method is just one of several methods in lodash that is just a [wrapper for a native javaScript method](/2019/11/01/lodash_wrapper_methods/) in this case the join method in the [array prototype](/2018/12/10/js-array/). This might seem pointless, but it does help to keep things consistent when it comes to just referencing native javaScript methods from within lodash, it also will come into play often when chaining lodash methods.

In any case this is join method is a method that comes up a lot when working out all kinds of solutions for problems when working in a javaScript programing environment, with, or without lodash as part of a collection of libraries to work with. The join method can be used to join all the elements of an array together with a given separator between each element, furnishing a string from those array elements. It can be thought of as the opposite of [\_.split](/2018/12/03/lodash_split/), or the [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) string prototype method that can be used to split a string down into an array of elements with a given separator. 

In any case this post will outline some examples of joining the elements of a javaScript array together into a string using the join method inside and outside of lodash. In the process of doing so I will also end up touching base on a lot or related topics as well surrounding the use of arrays and strings in general.

<!-- more -->

## 1 - basics of lodash join and what to know

This is a post on the lodash method \_.join, as well as the corresponding Array.prototype.join method that is being referenced. The join method in general then in javaScript is used to join an array of elements together into an string. So this will not be a getting started post on lodash, or javaScript in general. In addition to this I assume that you have at least a little background with javaScript, and how to get started with lodash or any javaScript asset before hand.

### 1.1 - Basic example of joining an Array in javaScript with \_.join

For a basic example of the join methods I put together some examples that involve an array of folder names that need to be combined together into an string that can be used as a corresponding path with a '\/' separator. Maybe not the best use case example, especially if you are working in a nodejs environment as the [path.join method](/2017/12/27/nodejs-paths) should be used there for something like this, but still it should server the purpose of a simple example.

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

## 2 - Other lodash methods

Now that I got the basics of the lodash join method out of the way, in this section I will be going over a few more examples that involve the use of more than just the lodash join method. I will still be sticking mainly with lodash methods here, reserving pure vanilla javaScript solutions for a latter section in this post.

### 2.2 - lodash join and chaining methods

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

## 3 - Vanilla javaScript solutions

Well I covered the basic of lodash join, and a whole bunch of other lodash features. However now there is the question of doing what lodash join does, as well as some other related tasks outside of lodash while one is at it. With that said in this section I will be going over some vanilla javaScript solutions that make use of just core javaScript features alone, to join an array into a single string and more.

### 3.1 - The same example using Array.join

The [native Array.join method](/2020/03/09/js-array-join/) works in very much the same manor only it is a prototype method of Array, so I call it as such, and only give the separator.

```js
var str = ['home','dustin','github','test_lodash'].join('/');
console.log(str); 
console.log(str.split('/'));
//'home/dustin/github/test_lodash'
// [ 'home', 'dustin', 'github', 'test_lodash' ]
```

### 3.2 - The split method

Just as with the lodash split method there is also the native string split method.

```js
var str = '/home/dustin/github/test_lodash/';
var folders = str.split('/');
console.log(folders);
// [ '', 'home', 'dustin', 'github', 'test_lodash', '' ]
```

### 3.3 - The filter method

When I split a string into an array, in some cases I will end up with additional empty elements. This then gives rise for a need to have a way to filter out these typically unwanted extra elements. One way to go about doing this would be to make use of the array filter method.

```js
var str = '/home/dustin/github/test_lodash/';
var folders = str.split('/').filter(function(str){
    return str != '';
});
console.log(folders);
//[ 'home', 'dustin', 'github', 'test_lodash' ]
```

## 4 - Conclusion

The Array.join method has been in the javaScript spec for ages making \_.join one of the method in lodash where there is not much point of it being there aside from just making this consistent in the code, as this native method has great browser support going way back. Do not assume that this is the case of all lodash methods though, with some of them like [\_.map](/2018/02/02/lodash_map/), and [\_.fill](/2017/09/26/lodash_fill/) this is not the case and it will still make more sense when it comes to the safely net aspect of lodash at least. Even if native methods are always going to be there for the target platforms of interest it still might make sense to continue using lodash, or some other user space solution for something rather than a native method, as it is not always just the safely net aspect that is a driving force to use methods like this. 

Using a user space solution allows for me to use a non spec compliant method for something, which in some cases might be what I want actually, also when it comes to making my own user space solutions for something that allows for me to add any and add additional features that I might want or need. There is also the readability aspect of using a user space method over monkey patching something into javaScript itself that might not be a standard method, or is but am monkey patching it with something that is not spec compliant. In any case this is all stuff that constitutes [matters for other posts on lodash](/categories/lodash/), and maybe the lodash join method is not the best example of any of this.

