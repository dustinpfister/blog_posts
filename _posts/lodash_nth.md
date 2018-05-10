---
title: The lodash _.nth method use case example
date: 2017-10-12 08:52:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 60
updated: 2017-10-12 11:10:46
version: 1.1
---

When grabbing an element from an Array I need to give a zero relative index value between and including zero, and one less of the length of the Array. A trivial matter for even a beginer javaScript developer. There is a question of how to handle index values that fall outside the index range of the array though, it's not hard to resolve it in vanilla js, but if I am using  [lodash](https://lodash.com/) in a project there is [\_.nth](https://lodash.com/docs/4.17.4#nth).

<!-- more -->

## The Situation

When grabbing an index from an array if I give an index that is below zero, or above the length of the array, it does not wrap around and give me whatever element it would be if I adjusted the index value.

That is if I think about an array being this thing like that of a circle, rather than an infinite line than I am going to be disappointed without some kind of helper method.

```js
 var arr = ['fear','the','foo','man','chew'];
 
 console.log(arr[0]); // 'fear'
 console.log(arr[4]); // 'chew'
 console.log(arr[-3]); // undefined
 console.log(arr[5]); // undefined
```

## \_.nth's lodash method will help here.


```js
 var arr = ['fear','the','foo','man','chew'];
 
 console.log(arr[-3]); // undefined
 console.log(_.nth(arr,-3)); // 'foo'
```

## Running into trouble with making my own method, because javaScripts modulo operator

I [wrote a post](/2017/09/02/js-whats-wrong-with-modulo/) on the nature of the modulo operator, and why it does not work the way that you might expect it to. So if you attempt to correct the given index value like this:

```js
 var nth = function(arr,index){
 
    return arr[ index % arr.length];
 
 }
```

You are going to have a bad time. That would be a pretty sleek one liner if it worked, and it will work with positive values that go equal to or beyond the length of the array, but not with negative index values.

```js
 console.log('js mod:');
 console.log( nth(arr,7)  ); // 'foo'
 console.log( nth(arr,-1)  ); // undefined
```

As such you would need to do something else.

## Working vanilla js alternative to \_.nth

Making a vanilla js alternative to \_.nth just involves working out how to [make a modulo operation]((/2017/09/02/js-whats-wrong-with-modulo/)) that works a different way in which a positive, valid, in range value is always given.

```js
 var nth = function(arr, index){
 
    // ajust index
    index = (index % arr.length + arr.length) % arr.length;
 
    // return that element
    return arr[index];
 
 };
```

## Conclusion

These lodash methods are helpful, many even though many of them can be written quickly, it still saves time. I know that lodash is now one of those projects like jQuery where much of this is no longer needed, but even when a method like that comes along lodash still helps with backward compatibility with those older browsers people still use.
